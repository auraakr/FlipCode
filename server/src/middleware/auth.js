import jwt from 'jsonwebtoken';

export function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Token tidak ada' });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.sub;
    next();
  } catch {
    res.status(401).json({ error: 'Token tidak valid atau kedaluwarsa' });
  }
}

// Bungkus handler async supaya error masuk ke error handler Express.
export const wrap = (fn) => (req, res, next) => fn(req, res, next).catch(next);
