import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import contentRoutes from './routes/content.js';
import quizRoutes from './routes/quiz.js';
import placementRoutes from './routes/placement.js';
import progressRoutes from './routes/progress.js';
import swaggerUi from 'swagger-ui-express';
import { openapi } from './docs/openapi.js';

export const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => res.json({ ok: true }));
app.get('/openapi.json', (_req, res) => res.json(openapi));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapi, { swaggerOptions: { persistAuthorization: true } }));
app.use('/auth', authRoutes);
app.use('/quiz', quizRoutes);
app.use('/placement', placementRoutes);
app.use('/', contentRoutes);
app.use('/', progressRoutes);

app.use((_req, res) => res.status(404).json({ error: 'Endpoint tidak ditemukan' }));
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Terjadi kesalahan di server' });
});
