// AdaptiveEngine: aturan adaptif FlipCode.
// Semua keputusan level & status topik ada di sini supaya mudah diubah dan diuji.
//
// Level kuis berikutnya ditentukan oleh PERSENTASE benar pada kuis yang baru selesai
// (bukan naik/turun satu tingkat dari level sekarang):
//   benar <= 20%        -> level MUDAH   (tidak membuka level Sedang)
//   benar 30% - 70%     -> level SEDANG  (Mudah tidak diberikan lagi; flashcard boleh dilewati)
//   benar >= 80%        -> level SULIT
// Contoh untuk 5 soal: 0-1 benar = Mudah, 2-3 benar = Sedang, 4-5 benar = Sulit.
// Di antara batas (mis. 20%-30%, 70%-80%) nilai dibulatkan ke level Sedang.
//
// Karena kuis selalu diambil dari level user sekarang, user hanya bisa mengakses
// kuis pada level yang diberikan hasil kuis terakhirnya.
//
// Topik dinyatakan DIKUASAI kalau:
//   kuis dikerjakan DI LEVEL SULIT dengan benar >= 80%, DAN
//   minimal 70% kartu di topik itu berstatus Dikuasai.
// Jadi lolos level Sulit dulu; mencapai level Sulit saja (dari kuis Mudah/Sedang) belum cukup.
// Topik berikutnya baru terbuka setelah topik ini Dikuasai.
// Kalau hasil kuis menurunkan level di bawah Sulit, status Dikuasai dicabut (kembali
// Sedang dipelajari) sehingga topik berikutnya terkunci lagi.

import { Level, LEVEL_ORDER, TopicState } from '../constants/enums.js';

const BATAS_MUDAH = 0.2; // <= 20% -> Mudah
const BATAS_SULIT = 0.8; // >= 80% -> Sulit
const BATAS_SARAN_ULANG = 0.6; // < 60% benar -> sarankan ulang flashcard
const PCT_KUASAI = 0.7;

const EPS = 1e-9;

export const AdaptiveEngine = {
  // Level berikutnya dari persentase benar (0..1).
  levelFromRatio(ratio) {
    if (ratio <= BATAS_MUDAH + EPS) return Level.MUDAH;
    if (ratio >= BATAS_SULIT - EPS) return Level.SULIT;
    return Level.SEDANG;
  },

  // Mengembalikan { nextLevel, delta, saranUlang }
  evaluateQuiz({ currentLevel, benar, total = 5 }) {
    const ratio = total > 0 ? benar / total : 0;
    const next = this.levelFromRatio(ratio);
    return {
      nextLevel: next,
      delta: LEVEL_ORDER.indexOf(next) - LEVEL_ORDER.indexOf(currentLevel),
      saranUlang: ratio < BATAS_SARAN_ULANG - EPS,
    };
  },

  // Menentukan apakah topik sudah dikuasai.
  // pctDikuasai: angka 0..1 (kartu dikuasai per topik)
  isTopicMastered({ levelKuis, benar, total = 5, pctDikuasai }) {
    const ratio = total > 0 ? benar / total : 0;
    return (
      levelKuis === Level.SULIT &&
      ratio >= BATAS_SULIT - EPS &&
      pctDikuasai >= PCT_KUASAI
    );
  },

  // nextLevel: level hasil kuis ini (dari evaluateQuiz).
  nextTopicState({ currentState, levelKuis, nextLevel, benar, total = 5, pctDikuasai }) {
    if (this.isTopicMastered({ levelKuis, benar, total, pctDikuasai })) {
      return TopicState.DIKUASAI;
    }
    // Dikuasai hanya bertahan kalau kuis dikerjakan di Sulit dan levelnya tetap Sulit.
    // (Juga membersihkan status Dikuasai yang tidak sah, mis. dari aturan lama.)
    if (
      currentState === TopicState.DIKUASAI &&
      (levelKuis !== Level.SULIT || nextLevel !== Level.SULIT)
    ) {
      return TopicState.SEDANG_DIPELAJARI;
    }
    return currentState === TopicState.BELUM_MULAI
      ? TopicState.SEDANG_DIPELAJARI
      : currentState;
  },

  BATAS_MUDAH,
  BATAS_SULIT,
  BATAS_SARAN_ULANG,
  PCT_KUASAI,
};
