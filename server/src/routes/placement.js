import { Router } from 'express';
import { rows, first, withTx } from '../db.js';
import { requireAuth, wrap } from '../middleware/auth.js';
import { shuffle, toClientQuestion, gradeAnswers } from '../services/grading.js';
import { Level, TopicState } from '../constants/enums.js';

const router = Router();
router.use(requireAuth);

const PER_TOPIC = 3;

// Aturan level awal per topik: benar 0-1 Mudah, 2 Sedang, 3 Sulit.
function levelFromBenar(benar) {
  if (benar <= 1) return Level.MUDAH;
  if (benar === 2) return Level.SEDANG;
  return Level.SULIT;
}

router.post('/start', wrap(async (req, res) => {
  // Tes awal hanya sekali, kecuali user sengaja mengulang dari Pengaturan ({ ulang: true }).
  // Flag placement_done tetap true sampai tes ulang selesai dikirim.
  const me = await first('SELECT placement_done FROM users WHERE id = $1', [req.userId]);
  if (me?.placement_done && req.body?.ulang !== true) {
    return res.status(409).json({
      error: 'Tes awal sudah dikerjakan. Untuk mengulang, pilih Ulangi Tes Awal di Pengaturan.',
    });
  }
  const topics = await rows('SELECT id FROM topics ORDER BY urutan');
  // Soal kerangka/kosong (pertanyaan belum diisi) tidak ikut dipilih.
  const all = await rows("SELECT * FROM questions WHERE is_placement = TRUE AND btrim(pertanyaan) <> ''");
  const picked = topics.flatMap((t) =>
    shuffle(all.filter((q) => q.topic_id === t.id)).slice(0, PER_TOPIC)
  );
  const session = await first(
    'INSERT INTO placement_sessions (user_id, question_ids) VALUES ($1, $2) RETURNING id',
    [req.userId, JSON.stringify(picked.map((q) => q.id))]
  );
  res.status(201).json({ sessionId: session.id, questions: picked.map(toClientQuestion) });
}));

router.post('/submit', wrap(async (req, res) => {
  const { sessionId, jawaban } = req.body || {};
  const session = await first(
    'SELECT * FROM placement_sessions WHERE id = $1 AND user_id = $2',
    [sessionId, req.userId]
  );
  if (!session) return res.status(404).json({ error: 'Sesi tidak ditemukan' });
  if (session.submitted_at) return res.status(409).json({ error: 'Sesi sudah dikirim' });

  const ids = session.question_ids;
  const qs = await rows('SELECT * FROM questions WHERE id = ANY($1)', [ids]);
  const ordered = ids.map((id) => qs.find((q) => q.id === id));
  const detail = gradeAnswers(ordered, jawaban);

  // Semua topik dimulai dari 0 benar, supaya topik tanpa soal tetap dapat level Mudah.
  const topicRows = await rows('SELECT id FROM topics ORDER BY urutan');
  const perTopic = Object.fromEntries(topicRows.map((t) => [t.id, { benar: 0, total: 0 }]));
  detail.forEach((d) => {
    perTopic[d.topicId] ||= { benar: 0, total: 0 };
    perTopic[d.topicId].total += 1;
    if (d.benar) perTopic[d.topicId].benar += 1;
  });
  const perTopicLevel = {};
  Object.entries(perTopic).forEach(([tid, { benar }]) => {
    perTopicLevel[tid] = levelFromBenar(benar);
  });

  await withTx(async (db) => {
    for (const [tid, level] of Object.entries(perTopicLevel)) {
      await db.query(
        `INSERT INTO user_topic_progress (user_id, topic_id, level, state, last_quiz_score)
         VALUES ($1, $2, $3, $4, NULL)
         ON CONFLICT (user_id, topic_id) DO UPDATE SET level = EXCLUDED.level,
           state = EXCLUDED.state, last_quiz_score = NULL`,
        [req.userId, tid, level, level === Level.SULIT ? TopicState.DIKUASAI : TopicState.BELUM_MULAI]
      );
    }
    await db.query('UPDATE placement_sessions SET submitted_at = now() WHERE id = $1', [session.id]);
    await db.query('UPDATE users SET placement_done = TRUE WHERE id = $1', [req.userId]);
  });

  res.json({ perTopic, perTopicLevel, detail });
}));

export default router;
