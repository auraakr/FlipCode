// Tes penempatan awal (9 soal, 3 per topik). Pemilihan soal, penilaian, dan
// penentuan level awal dikerjakan server; klien hanya memanggil API.

import { api } from '../api/client';
import { toApiAnswers } from './answers';

export const PlacementTest = {
  // Mengembalikan { sessionId, questions }
  async start() {
    return api.post('/placement/start');
  },

  // Mengembalikan { perTopic, perTopicLevel, detail }
  async submit({ sessionId, questions, jawaban }) {
    return api.post('/placement/submit', {
      sessionId,
      jawaban: toApiAnswers(questions, jawaban),
    });
  },
};
