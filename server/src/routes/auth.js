import crypto from 'node:crypto';
import { Router } from 'express';
import { sendResetCode } from '../services/mailer.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { first } from '../db.js';
import { requireAuth, wrap } from '../middleware/auth.js';

const router = Router();

const JENJANG = ['SMA', 'SMK'];

function sign(userId) {
  return jwt.sign({ sub: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '30d',
  });
}

const publicUser = (u) => ({
  id: u.id,
  nama: u.nama,
  email: u.email,
  jenjang: u.jenjang,
  placementDone: !!u.placement_done,
});

router.post('/register', wrap(async (req, res) => {
  const { nama, email, password, jenjang } = req.body || {};
  if (jenjang !== undefined && !JENJANG.includes(jenjang)) {
    return res.status(400).json({ error: 'Jenjang harus SMA atau SMK' });
  }
  if (!nama || !email || !password || password.length < 6) {
    return res.status(400).json({ error: 'Nama, email, dan password (min 6 karakter) wajib diisi' });
  }
  const exist = await first('SELECT id FROM users WHERE email = $1', [email]);
  if (exist) return res.status(409).json({ error: 'Email sudah terdaftar' });

  const hash = await bcrypt.hash(password, 10);
  const user = await first(
    'INSERT INTO users (nama, email, password_hash, jenjang) VALUES ($1, $2, $3, $4) RETURNING *',
    [nama, email, hash, jenjang || 'SMA']
  );
  res.status(201).json({ token: sign(user.id), user: publicUser(user) });
}));

router.post('/login', wrap(async (req, res) => {
  const { email, password } = req.body || {};
  const user = await first('SELECT * FROM users WHERE email = $1', [email || '']);
  if (!user || !(await bcrypt.compare(password || '', user.password_hash))) {
    return res.status(401).json({ error: 'Email atau password salah' });
  }
  res.json({ token: sign(user.id), user: publicUser(user) });
}));

const RESET_TTL_MIN = 10;
const RESET_MAX_ATTEMPTS = 5;

// Minta kode reset. Respons selalu sama agar email terdaftar tidak bisa ditebak.
router.post('/forgot-password', wrap(async (req, res) => {
  const email = String(req.body?.email || '').trim();
  if (!email) return res.status(400).json({ error: 'Email wajib diisi' });

  const user = await first('SELECT * FROM users WHERE email = $1', [email]);
  if (user) {
    const code = String(crypto.randomInt(0, 1000000)).padStart(6, '0');
    const hash = await bcrypt.hash(code, 8);
    await first(
      `INSERT INTO password_resets (user_id, code_hash, expires_at, attempts)
       VALUES ($1, $2, now() + make_interval(mins => $3), 0)
       ON CONFLICT (user_id) DO UPDATE
         SET code_hash = $2, expires_at = now() + make_interval(mins => $3), attempts = 0, created_at = now()
       RETURNING user_id`,
      [user.id, hash, RESET_TTL_MIN]
    );
    try {
      await sendResetCode(user.email, user.nama, code);
    } catch (e) {
      console.error('Gagal kirim email reset:', e.message);
      return res.status(502).json({ error: 'Gagal mengirim email. Coba lagi nanti.' });
    }
  }
  res.json({ ok: true });
}));

router.post('/reset-password', wrap(async (req, res) => {
  const email = String(req.body?.email || '').trim();
  const code = String(req.body?.code || '').trim();
  const password = req.body?.password;
  if (!email || !code || typeof password !== 'string' || password.length < 6) {
    return res.status(400).json({ error: 'Email, kode, dan password baru (min 6 karakter) wajib diisi' });
  }
  const invalid = () => res.status(400).json({ error: 'Kode salah atau sudah kedaluwarsa' });

  const user = await first('SELECT id FROM users WHERE email = $1', [email]);
  if (!user) return invalid();
  const reset = await first('SELECT * FROM password_resets WHERE user_id = $1', [user.id]);
  if (!reset || new Date(reset.expires_at) < new Date() || reset.attempts >= RESET_MAX_ATTEMPTS) {
    return invalid();
  }
  if (!(await bcrypt.compare(code, reset.code_hash))) {
    await first('UPDATE password_resets SET attempts = attempts + 1 WHERE user_id = $1 RETURNING user_id', [user.id]);
    return invalid();
  }

  const hash = await bcrypt.hash(password, 10);
  await first('UPDATE users SET password_hash = $1 WHERE id = $2 RETURNING id', [hash, user.id]);
  await first('DELETE FROM password_resets WHERE user_id = $1 RETURNING user_id', [user.id]);
  res.json({ ok: true });
}));

router.get('/me', requireAuth, wrap(async (req, res) => {
  const user = await first('SELECT * FROM users WHERE id = $1', [req.userId]);
  if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });
  res.json({ user: publicUser(user) });
}));

// Ubah profil: nama dan/atau jenjang. Email tidak bisa diubah.
router.patch('/me', requireAuth, wrap(async (req, res) => {
  const { nama, jenjang } = req.body || {};
  const newNama = typeof nama === 'string' ? nama.trim() : undefined;

  if (newNama === undefined && jenjang === undefined) {
    return res.status(400).json({ error: 'Tidak ada data yang diubah' });
  }
  if (newNama !== undefined && (newNama.length < 1 || newNama.length > 100)) {
    return res.status(400).json({ error: 'Nama wajib diisi (maksimal 100 karakter)' });
  }
  if (jenjang !== undefined && !JENJANG.includes(jenjang)) {
    return res.status(400).json({ error: 'Jenjang harus SMA atau SMK' });
  }

  const user = await first(
    `UPDATE users
        SET nama = COALESCE($1, nama),
            jenjang = COALESCE($2, jenjang)
      WHERE id = $3
      RETURNING *`,
    [newNama ?? null, jenjang ?? null, req.userId]
  );
  if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });
  res.json({ user: publicUser(user) });
}));

export default router;
