// Klien API tes penempatan (9 soal, 3 per topik). Penilaian ada di server.

import { api } from './client';
import { toApiAnswers } from './answers';

export const PlacementApi = {
  // Mengembalikan { sessionId, questions }
  // ulang: true hanya dikirim dari Pengaturan > Ulangi Tes Awal.
  start: (ulang = false) => api.post('/placement/start', ulang ? { ulang: true } : {}),

  // Mengembalikan { perTopic, perTopicLevel, detail }
  submit: ({ sessionId, questions, jawaban }) =>
    api.post('/placement/submit', { sessionId, jawaban: toApiAnswers(questions, jawaban) }),
};
