// Klien API kuis. Pemilihan soal, penilaian, dan aturan adaptif ada di server.

import { api } from './client';
import { toApiAnswers } from './answers';

export const QuizApi = {
  // Mengembalikan { sessionId, topicId, level, questions }
  start: (topicId) => api.post('/quiz/start', { topicId }),

  // Umpan balik satu soal. Mengembalikan { benar, jawabanBenar, penjelasan, relatedCardIds }
  check: ({ sessionId, questionId, pilihan }) =>
    api.post('/quiz/check', { sessionId, questionId, pilihan }),

  // jawaban: array index pilihan, urutan sama dengan questions
  // Mengembalikan { benar, total, detail, adapt, pct, topicState }
  submit: ({ sessionId, questions, jawaban }) =>
    api.post('/quiz/submit', { sessionId, jawaban: toApiAnswers(questions, jawaban) }),
};
