import { Router } from 'express';
import { rows, first } from '../db.js';
import { requireAuth, wrap } from '../middleware/auth.js';

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

router.get('/cards/:id', wrap(async (req, res) => {
  const card = await first('SELECT * FROM cards WHERE id = $1', [req.params.id]);
  if (!card) return res.status(404).json({ error: 'Kartu tidak ditemukan' });
  res.json({ card: mapCard(card) });
}));

export default router;
