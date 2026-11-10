import { Router } from 'express';
import { rows, first, withTx } from '../db.js';
import { requireAuth, wrap } from '../middleware/auth.js';
import { AdaptiveEngine } from '../services/AdaptiveEngine.js';
import { shuffle, toClientQuestion, gradeAnswers } from '../services/grading.js';
import { CardStatus, Level, TopicState, QUIZ_SIZE } from '../constants/enums.js';

const router = Router();
router.use(requireAuth);


router.post('/start', wrap(async (req, res) => {
  const { topicId } = req.body || {};
  const topic = await first('SELECT id FROM topics WHERE id = $1', [topicId]);
  if (!topic) return res.status(404).json({ error: 'Topik tidak ditemukan' });

  const prog = await first(
    'SELECT level FROM user_topic_progress WHERE user_id = $1 AND topic_id = $2',
    [req.userId, topicId]
  );
  const level = prog?.level || Level.MUDAH;

  const candidates = await rows(
    "SELECT * FROM questions WHERE topic_id = $1 AND level = $2 AND is_placement = FALSE AND btrim(pertanyaan) <> ''",
    [topicId, level]
  );
  const picked = shuffle(candidates).slice(0, QUIZ_SIZE);
  if (!picked.length) return res.status(404).json({ error: 'Belum ada soal untuk topik/level ini' });

  const session = await first(
    `INSERT INTO quiz_sessions (user_id, topic_id, level, question_ids)
     VALUES ($1, $2, $3, $4) RETURNING id`,
    [req.userId, topicId, level, JSON.stringify(picked.map((q) => q.id))]
  );
  res.status(201).json({
    sessionId: session.id,
    topicId,
    level,
    questions: picked.map(toClientQuestion),
  });
}));

// Cek satu jawaban untuk umpan balik langsung (Benar / Belum tepat). Membuka kunci dan
// penjelasan HANYA untuk soal yang baru dijawab. Nilai akhir tetap dihitung di /submit.
router.post('/check', wrap(async (req, res) => {
  const { sessionId, questionId, pilihan } = req.body || {};
  const session = await first(
    'SELECT * FROM quiz_sessions WHERE id = $1 AND user_id = $2',
    [sessionId, req.userId]
  );
  if (!session) return res.status(404).json({ error: 'Sesi tidak ditemukan' });
  if (session.submitted_at) return res.status(409).json({ error: 'Sesi sudah dikirim' });
  if (!session.question_ids.includes(questionId) || !Number.isInteger(pilihan)) {
    return res.status(400).json({ error: 'Soal atau pilihan tidak valid' });
  }
  const q = await first('SELECT * FROM questions WHERE id = $1', [questionId]);
  res.json({
    benar: pilihan === q.jawaban_benar,
    jawabanBenar: q.jawaban_benar,
    penjelasan: q.penjelasan || '',
    relatedCardIds: q.related_card_ids || [],
  });
}));

router.post('/submit', wrap(async (req, res) => {
  const { sessionId, jawaban } = req.body || {};
  const session = await first(
    'SELECT * FROM quiz_sessions WHERE id = $1 AND user_id = $2',
    [sessionId, req.userId]
  );
  if (!session) return res.status(404).json({ error: 'Sesi tidak ditemukan' });
  if (session.submitted_at) return res.status(409).json({ error: 'Sesi sudah dikirim' });

  const ids = session.question_ids;
  const qs = await rows('SELECT * FROM questions WHERE id = ANY($1)', [ids]);
  const ordered = ids.map((id) => qs.find((q) => q.id === id));
  const detail = gradeAnswers(ordered, jawaban);
  const benar = detail.filter((d) => d.benar).length;
  const total = ordered.length;

  const adapt = AdaptiveEngine.evaluateQuiz({ currentLevel: session.level, benar, total });

  const { n: totalCards } = await first(
    'SELECT COUNT(*) AS n FROM cards WHERE topic_id = $1',
    [session.topic_id]
  );
  const { n: mastered } = await first(
    `SELECT COUNT(*) AS n FROM user_card_status s JOIN cards c ON c.id = s.card_id
     WHERE s.user_id = $1 AND c.topic_id = $2 AND s.status = $3`,
    [req.userId, session.topic_id, CardStatus.DIKUASAI]
  );
  const pct = totalCards ? mastered / totalCards : 0;

  const cur = await first(
    'SELECT state FROM user_topic_progress WHERE user_id = $1 AND topic_id = $2',
    [req.userId, session.topic_id]
  );
  const nextState = AdaptiveEngine.nextTopicState({
    currentState: cur?.state || TopicState.BELUM_MULAI,
    benar,
    total,
    pctDikuasai: pct,
  });

  await withTx(async (db) => {
    await db.query(
      `INSERT INTO user_topic_progress (user_id, topic_id, level, state, last_quiz_score)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (user_id, topic_id) DO UPDATE SET level = EXCLUDED.level,
         state = EXCLUDED.state, last_quiz_score = EXCLUDED.last_quiz_score`,
      [req.userId, session.topic_id, adapt.nextLevel, nextState, `${benar}/${total}`]
    );
    await db.query(
      'UPDATE quiz_sessions SET benar = $1, total = $2, submitted_at = now() WHERE id = $3',
      [benar, total, session.id]
    );
  });

  res.json({ benar, total, detail, adapt, pct, topicState: nextState });
}));

export default router;
