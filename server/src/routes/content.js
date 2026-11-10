import { Router } from 'express';
import { rows, first } from '../db.js';
import { requireAuth, wrap } from '../middleware/auth.js';
import { Level, QUIZ_SIZE } from '../constants/enums.js';

const router = Router();
router.use(['/topics', '/cards'], requireAuth);

const mapCard = (c) => ({
  id: c.id,
  topicId: c.topic_id,
  depan: c.depan,
  belakang: c.belakang,
  relatedQuestionIds: c.related_question_ids || [],
});

router.get('/topics', wrap(async (_req, res) => {
  res.json({ topics: await rows('SELECT * FROM topics ORDER BY urutan') });
}));

router.get('/topics/:id/cards', wrap(async (req, res) => {
  const list = await rows('SELECT * FROM cards WHERE topic_id = $1 ORDER BY id', [req.params.id]);
  res.json({ cards: list.map(mapCard) });
}));

// Info kuis topik pada level user saat ini: jumlah soal yang akan keluar & jumlah pilihan.
router.get('/topics/:id/quiz-info', wrap(async (req, res) => {
  const topic = await first('SELECT id FROM topics WHERE id = $1', [req.params.id]);
  if (!topic) return res.status(404).json({ error: 'Topik tidak ditemukan' });
  const prog = await first(
    'SELECT level FROM user_topic_progress WHERE user_id = $1 AND topic_id = $2',
    [req.userId, req.params.id]
  );
  const level = prog?.level || Level.MUDAH;
  const qs = await rows(
    `SELECT pilihan FROM questions
     WHERE topic_id = $1 AND level = $2 AND is_placement = FALSE AND btrim(pertanyaan) <> ''`,
    [req.params.id, level]
  );
  res.json({
    level,
    jumlahSoal: Math.min(QUIZ_SIZE, qs.length),
    soalTersedia: qs.length,
    jumlahPilihan: qs.reduce((m, q) => Math.max(m, (q.pilihan || []).length), 0),
  });
}));

router.get('/cards/:id', wrap(async (req, res) => {
  const card = await first('SELECT * FROM cards WHERE id = $1', [req.params.id]);
  if (!card) return res.status(404).json({ error: 'Kartu tidak ditemukan' });
  res.json({ card: mapCard(card) });
}));

export default router;
