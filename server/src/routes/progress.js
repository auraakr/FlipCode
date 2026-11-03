import { Router } from 'express';
import { rows, first, withTx } from '../db.js';
import { requireAuth, wrap } from '../middleware/auth.js';
import { CardStatus } from '../constants/enums.js';

const router = Router();
router.use(requireAuth);

const VALID_STATUS = Object.values(CardStatus);

// Bentuknya sengaja sama dengan data lama ProgressRepository.getAll().
router.get('/progress', wrap(async (req, res) => {
  const topicRows = await rows('SELECT * FROM user_topic_progress WHERE user_id = $1', [req.userId]);
  const cardRows = await rows('SELECT * FROM user_card_status WHERE user_id = $1', [req.userId]);
  const sessions = await rows(
    `SELECT id, topic_id, level, benar, total, submitted_at FROM quiz_sessions
     WHERE user_id = $1 AND submitted_at IS NOT NULL ORDER BY submitted_at DESC LIMIT 100`,
    [req.userId]
  );
  const user = await first('SELECT placement_done FROM users WHERE id = $1', [req.userId]);

  const topics = {};
  topicRows.forEach((r) => {
    topics[r.topic_id] = { level: r.level, state: r.state, lastQuizScore: r.last_quiz_score };
  });
  const cards = {};
  cardRows.forEach((r) => {
    cards[r.card_id] = { status: r.status, lastSeenAt: new Date(r.last_seen_at).getTime() };
  });
  res.json({
    topics,
    cards,
    quizSessions: sessions.map((s) => ({
      id: s.id,
      topicId: s.topic_id,
      level: s.level,
      benar: s.benar,
      total: s.total,
      timestamp: new Date(s.submitted_at).getTime(),
    })),
    placementDone: !!user?.placement_done,
    placementResult: Object.fromEntries(topicRows.map((r) => [r.topic_id, r.level])),
  });
}));

router.put('/cards/:id/status', wrap(async (req, res) => {
  const { status } = req.body || {};
  if (!VALID_STATUS.includes(status)) return res.status(400).json({ error: 'Status tidak valid' });
  const card = await first('SELECT id FROM cards WHERE id = $1', [req.params.id]);
  if (!card) return res.status(404).json({ error: 'Kartu tidak ditemukan' });
  await first(
    `INSERT INTO user_card_status (user_id, card_id, status) VALUES ($1, $2, $3)
     ON CONFLICT (user_id, card_id) DO UPDATE SET status = EXCLUDED.status, last_seen_at = now()`,
    [req.userId, req.params.id, status]
  );
  res.json({ ok: true });
}));

router.delete('/progress', wrap(async (req, res) => {
  await withTx(async (db) => {
    await db.query('DELETE FROM user_topic_progress WHERE user_id = $1', [req.userId]);
    await db.query('DELETE FROM user_card_status WHERE user_id = $1', [req.userId]);
    await db.query('DELETE FROM quiz_sessions WHERE user_id = $1', [req.userId]);
    await db.query('DELETE FROM placement_sessions WHERE user_id = $1', [req.userId]);
    await db.query('UPDATE users SET placement_done = FALSE WHERE id = $1', [req.userId]);
  });
  res.json({ ok: true });
}));

export default router;
