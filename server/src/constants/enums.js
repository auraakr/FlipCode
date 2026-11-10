// Daftar nilai tetap (enumerasi) yang dipakai di seluruh aplikasi.
// Diambil dari class diagram FlipCode.

export const Level = Object.freeze({
  MUDAH: 'Mudah',
  SEDANG: 'Sedang',
  SULIT: 'Sulit',
});

export const CardStatus = Object.freeze({
  BARU: 'Baru',
  SEDANG_DIPELAJARI: 'Sedang dipelajari',
  DIKUASAI: 'Dikuasai',
});

export const TopicState = Object.freeze({
  BELUM_MULAI: 'Belum mulai',
  SEDANG_DIPELAJARI: 'Sedang dipelajari',
  DIKUASAI: 'Dikuasai',
});

export const QuestionType = Object.freeze({
  PILIHAN_GANDA: 'pilihan_ganda',
});

// Jumlah soal dalam satu sesi kuis.
export const QUIZ_SIZE = 5;

// Urutan level untuk perhitungan naik/turun di AdaptiveEngine.
export const LEVEL_ORDER = [Level.MUDAH, Level.SEDANG, Level.SULIT];
