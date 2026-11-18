import { Router } from 'express';
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
