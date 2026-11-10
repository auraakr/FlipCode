// Pengelola kuis. Pemilihan soal, penilaian, dan aturan adaptif (naik/turun level,
// status topik) dikerjakan server; klien hanya memanggil API.

import { api } from '../api/client';
import { toApiAnswers } from './answers';

export const QuizManager = {
  // Mengembalikan { sessionId, level, questions }
  async buildSession(topicId) {
    return api.post('/quiz/start', { topicId });
  },

  // jawaban: array index pilihan, urutan sama dengan questions
  // Mengembalikan { benar, total, detail, adapt, pct, topicState }
  async submit({ sessionId, questions, jawaban }) {
    return api.post('/quiz/submit', {
      sessionId,
      jawaban: toApiAnswers(questions, jawaban),
    });
  },
};
