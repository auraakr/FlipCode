// AdaptiveEngine: aturan adaptif FlipCode.
// Semua keputusan naik/turun level ada di sini supaya mudah diubah dan diuji.
//
// Aturan kuis (5 soal per sesi):
//   benar 4-5 -> level NAIK
//   benar 3   -> level TETAP
//   benar 0-2 -> level TURUN + saran ulang flashcard
//
// Topik dinyatakan DIKUASAI kalau:
//   kuis level Sulit benar 4-5, DAN
//   minimal 70% kartu di topik itu berstatus Dikuasai.

import { Level, LEVEL_ORDER, TopicState } from '../constants/enums';

const THRESHOLD_NAIK = 4;
const THRESHOLD_TETAP = 3;
const PCT_KUASAI = 0.7;

function nextLevel(level) {
  const idx = LEVEL_ORDER.indexOf(level);
  return LEVEL_ORDER[Math.min(idx + 1, LEVEL_ORDER.length - 1)];
}
function prevLevel(level) {
  const idx = LEVEL_ORDER.indexOf(level);
  return LEVEL_ORDER[Math.max(idx - 1, 0)];
}

export const AdaptiveEngine = {
  // Mengembalikan { nextLevel, delta, saranUlang }
  evaluateQuiz({ currentLevel, benar }) {
    if (benar >= THRESHOLD_NAIK) {
      return { nextLevel: nextLevel(currentLevel), delta: +1, saranUlang: false };
    }
    if (benar >= THRESHOLD_TETAP) {
      return { nextLevel: currentLevel, delta: 0, saranUlang: false };
    }
    return { nextLevel: prevLevel(currentLevel), delta: -1, saranUlang: true };
  },

  // Menentukan apakah topik sudah dikuasai.
  // pctDikuasai: angka 0..1
  // levelKuis: level sesi kuis yang baru saja dikerjakan
  // benar: jumlah benar dari 5 soal
  isTopicMastered({ levelKuis, benar, pctDikuasai }) {
    return (
      levelKuis === Level.SULIT &&
      benar >= THRESHOLD_NAIK &&
      pctDikuasai >= PCT_KUASAI
    );
  },

  nextTopicState({ currentState, levelKuis, benar, pctDikuasai }) {
    if (this.isTopicMastered({ levelKuis, benar, pctDikuasai })) {
      return TopicState.DIKUASAI;
    }
    return currentState === TopicState.BELUM_MULAI
      ? TopicState.SEDANG_DIPELAJARI
      : currentState;
  },

  THRESHOLD_NAIK,
  THRESHOLD_TETAP,
  PCT_KUASAI,
};
