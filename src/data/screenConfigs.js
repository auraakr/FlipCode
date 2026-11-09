import { Level, CardStatus } from '../constants/enums';
import { ContentRepository } from '../storage/ContentRepository';

// ============================================================================
// 1. WELCOME SCREEN TOPICS CONFIG
// ============================================================================
export const WELCOME_TOPICS = [
  {
    id: 'variabel',
    title: 'Variabel',
    symbol: 'x =',
    bg: '#EEF3FF',
    color: '#2F65F5',
  },
  {
    id: 'tipe_data',
    title: 'Tipe Data',
    symbol: '123',
    bg: '#FFF6DC',
    color: '#D97706',
  },
  {
    id: 'operator',
    title: 'Operator',
    symbol: '+ -',
    bg: '#FFEFE9',
    color: '#EA580C',
  },
];

// ============================================================================
// 2. HOME SCREEN HERO BANNER CONFIGS (Variabel, Tipe Data, Operator)
// ============================================================================
export const HOME_HERO_CONFIGS = {
  variabel: {
    bg: '#2554E8',
    lip: '#1B3FB5',
    badgeText: 'Topik saat ini • Mudah',
    badgeBg: 'rgba(255, 255, 255, 0.16)',
    badgeDot: '#FACC15',
    badgeTextColor: '#FFFFFF',
    title: 'Variabel',
    titleColor: '#FFFFFF',
    subColor: 'rgba(255, 255, 255, 0.85)',
    btnBg: '#FFFFFF',
    btnTextColor: '#2554E8',
    robotBadge: '#2554E8',
    completedNote: null,
    tipsText:
      'Selesaikan minimal 7 kartu variabel hari ini agar streak belajarmu tetap aktif! 🔥',
  },
  tipe_data: {
    bg: '#F5B82E',
    lip: '#D99B16',
    badgeText: 'Topik saat ini • Sedang',
    badgeBg: 'rgba(120, 53, 15, 0.14)',
    badgeDot: '#78350F',
    badgeTextColor: '#78350F',
    title: 'Tipe Data',
    titleColor: '#1F2A44',
    subColor: '#78350F',
    btnBg: '#1E293B',
    btnTextColor: '#FFFFFF',
    robotBadge: '#D97706',
    completedNote: 'Variabel selesai dengan 80% kartu dikuasai',
    tipsText:
      'Pahami perbedaan Integer, String, dan Boolean agar tidak salah mengolah data! 🔥',
  },
  operator: {
    bg: '#F26B50',
    lip: '#C94A32',
    badgeText: 'Topik saat ini • Mudah',
    badgeBg: 'rgba(255, 255, 255, 0.2)',
    badgeDot: '#FACC15',
    badgeTextColor: '#FFFFFF',
    title: 'Operator',
    titleColor: '#FFFFFF',
    subColor: 'rgba(255, 255, 255, 0.9)',
    btnBg: '#FFFFFF',
    btnTextColor: '#E04F33',
    robotBadge: '#E04F33',
    completedNote: 'Tipe Data selesai dengan 80% kartu dikuasai',
    tipsText:
      'Latih operator aritmatika dan perbandingan untuk membangun logika program! 🔥',
  },
};

// ============================================================================
// 3. TOPIC DETAIL LEARNED ITEMS (Tipe Data & Operator)
// ============================================================================
export const TOPIC_LEARNED_ITEMS = {
  tipe_data: [
    {
      title: 'Integer',
      code: 'umur = 16',
      pillBg: '#EDF2FF',
      pillColor: '#2554E8',
    },
    {
      title: 'String',
      code: 'nama = "Aura"',
      pillBg: '#FFF1F2',
      pillColor: '#E11D48',
    },
    {
      title: 'Boolean',
      code: 'lulus = True',
      pillBg: '#ECFDF5',
      pillColor: '#10B981',
    },
  ],
  operator: [
    {
      title: 'Aritmatika',
      code: 'x = 10 + 5',
      pillBg: '#EDF2FF',
      pillColor: '#2554E8',
    },
    {
      title: 'Perbandingan',
      code: 'skor >= 75',
      pillBg: '#FFF1F2',
      pillColor: '#E11D48',
    },
    {
      title: 'Logika',
      code: 'a and b',
      pillBg: '#ECFDF5',
      pillColor: '#10B981',
    },
  ],
};

// ============================================================================
// 4. FLASHCARD FALLBACK CARDS
// ============================================================================
export const FALLBACK_CARDS = [
  {
    id: 'var-01',
    topicId: 'variabel',
    statusLabel: 'Dikuasai',
    pertanyaanParts: [
      { type: 'text', text: 'Apa fungsi utama ' },
      { type: 'codeValid', text: 'variabel' },
      { type: 'text', text: ' di dalam program?' },
    ],
    judulPenjelasan: 'Pengertian Variabel',
    penjelasan:
      'Variabel adalah wadah bernama di memori komputer untuk menyimpan nilai yang bisa digunakan kembali.',
    kodeBenar: { lhs: 'umur', rhs: '16' },
    kodeSalah: { lhs: '16', rhs: 'umur' },
    tips: 'Bayangkan variabel seperti kotak berlabel tempat menyimpan barang.',
    tipsHighlight: null,
  },
  {
    id: 'var-02',
    topicId: 'variabel',
    statusLabel: 'Dikuasai',
    pertanyaanParts: [
      { type: 'text', text: 'Bagaimana cara mengisi nilai ke dalam variabel ' },
      { type: 'codeValid', text: 'x' },
      { type: 'text', text: '?' },
    ],
    judulPenjelasan: 'Assignment (Pengisian Nilai)',
    penjelasan:
      'Gunakan tanda sama dengan (=) untuk menyimpan nilai di sebelah kanan ke nama variabel di sebelah kiri.',
    kodeBenar: { lhs: 'x', rhs: '10' },
    kodeSalah: { lhs: '10', rhs: 'x' },
    tips: 'Nama variabel selalu berada di sebelah kiri tanda =.',
    tipsHighlight: '=',
  },
  {
    id: 'var-03',
    topicId: 'variabel',
    statusLabel: 'Dikuasai',
    pertanyaanParts: [
      { type: 'text', text: 'Apakah nilai di dalam ' },
      { type: 'codeValid', text: 'skor' },
      { type: 'text', text: ' bisa diubah saat program berjalan?' },
    ],
    judulPenjelasan: 'Mengubah Nilai Variabel',
    penjelasan:
      'Nilai variabel dapat diperbarui kapan saja dengan memberikan nilai baru ke nama variabel tersebut.',
    kodeBenar: { lhs: 'skor', rhs: '100' },
    kodeSalah: { lhs: 'skor ==', rhs: '100' },
    tips: 'Nilai lama akan otomatis tergantikan oleh nilai yang baru.',
    tipsHighlight: null,
  },
  {
    id: 'var-04',
    topicId: 'variabel',
    statusLabel: 'Baru',
    pertanyaanParts: [
      { type: 'text', text: 'Kenapa ' },
      { type: 'codeValid', text: 'nama_siswa' },
      { type: 'text', text: ' valid, tetapi ' },
      { type: 'codeInvalid', text: '1nama' },
      { type: 'text', text: ' tidak?' },
    ],
    judulPenjelasan: 'Aturan Nama Variabel',
    penjelasan:
      'Nama variabel tidak boleh diawali angka atau mengandung spasi.',
    kodeBenar: { lhs: 'nama_siswa', rhs: '"Alya"' },
    kodeSalah: { lhs: '1nama', rhs: '"Alya"' },
    tipsPrefix: 'pakai huruf kecil dan garis bawah ',
    tipsHighlight: '_',
    tipsSuffix: ' untuk memisahkan kata.',
  },
  {
    id: 'var-05',
    topicId: 'variabel',
    statusLabel: 'Baru',
    pertanyaanParts: [
      { type: 'text', text: 'Kenapa ' },
      { type: 'codeInvalid', text: 'total harga' },
      { type: 'text', text: ' menyebabkan error pada program?' },
    ],
    judulPenjelasan: 'Larangan Spasi pada Variabel',
    penjelasan:
      'Nama variabel tidak boleh memiliki spasi karena komputer akan membacanya sebagai dua perintah terpisah.',
    kodeBenar: { lhs: 'total_harga', rhs: '25000' },
    kodeSalah: { lhs: 'total harga', rhs: '25000' },
    tipsPrefix: 'gunakan tanda garis bawah ',
    tipsHighlight: '_',
    tipsSuffix: ' sebagai pengganti spasi.',
  },
];

// ============================================================================
// 5. QUIZ FALLBACK QUESTIONS
// ============================================================================
export const FALLBACK_QUIZ_QUESTIONS = [
  {
    id: 'q-var-01',
    topicId: 'variabel',
    level: Level.MUDAH,
    tipe: 'PILIHAN GANDA',
    pertanyaan: 'Apa fungsi utama variabel di dalam program?',
    pilihan: [
      'Menyimpan nilai data',
      'Menghapus kode program',
      'Mematikan layar komputer',
      'Membuat koneksi internet',
    ],
    jawabanBenar: 0,
    petunjuk: 'ingat, variabel bekerja seperti kotak penyimpanan berlabel.',
    benarHighlight: 'Menyimpan nilai data',
    benarPenjelasan:
      ' adalah fungsi utama variabel agar nilai dapat dipanggil dan diolah kembali.',
    salahPenjelasanPrefix:
      ' bukan fungsi dari variabel. Variabel digunakan untuk menyimpan data di memori.',
    relatedCardTitle: 'Pengertian Variabel',
    relatedCardNumber: 'Kartu 1',
  },
  {
    id: 'q-var-02',
    topicId: 'variabel',
    level: Level.MUDAH,
    tipe: 'PILIHAN GANDA',
    pertanyaan: 'Manakah nama variabel yang valid?',
    pilihan: ['1nama', 'nama_siswa', 'nama siswa', 'nama-siswa'],
    jawabanBenar: 1,
    petunjuk: 'ingat, tanpa spasi dan tidak diawali angka.',
    benarHighlight: 'nama_siswa',
    benarPenjelasan:
      ' hanya memakai huruf dan garis bawah, tidak diawali angka, dan tanpa spasi.',
    salahHighlight: 'nama siswa',
    salahPenjelasanMid:
      ' mengandung spasi, jadi dibaca sebagai dua nama terpisah. Gunakan ',
    salahCodeInline: '_',
    salahPenjelasanSuffix: ' sebagai pemisah.',
    relatedCardTitle: 'Aturan Nama Variabel',
    relatedCardNumber: 'Kartu 4',
  },
  {
    id: 'q-var-03',
    topicId: 'variabel',
    level: Level.MUDAH,
    tipe: 'PILIHAN GANDA',
    pertanyaan: 'Simbol apa yang digunakan untuk mengisi nilai ke variabel?',
    pilihan: ['==', '=', '!=', '->'],
    jawabanBenar: 1,
    petunjuk: 'gunakan satu tanda sama dengan untuk assignment.',
    benarHighlight: '=',
    benarPenjelasan:
      ' adalah operator assignment untuk memasukkan nilai di kanan ke variabel di kiri.',
    salahPenjelasanPrefix: ' bukan operator pengisian nilai variabel.',
    relatedCardTitle: 'Assignment (Pengisian Nilai)',
    relatedCardNumber: 'Kartu 2',
  },
  {
    id: 'q-var-04',
    topicId: 'variabel',
    level: Level.MUDAH,
    tipe: 'PILIHAN GANDA',
    pertanyaan:
      'Jika skor = 70 lalu diubah menjadi skor = 85, berapa nilai skor?',
    pilihan: ['70', '85', '155', '15'],
    jawabanBenar: 1,
    petunjuk: 'nilai terbaru akan menggantikan nilai yang lama.',
    benarHighlight: '85',
    benarPenjelasan:
      ' menggantikan nilai lama 70 karena variabel selalu menyimpan nilai terakhir yang diberikan.',
    salahPenjelasanPrefix:
      ' kurang tepat karena nilai lama langsung tertimpa oleh nilai baru.',
    relatedCardTitle: 'Mengubah Nilai Variabel',
    relatedCardNumber: 'Kartu 3',
  },
  {
    id: 'q-var-05',
    topicId: 'variabel',
    level: Level.MUDAH,
    tipe: 'PILIHAN GANDA',
    pertanyaan:
      'Manakah penulisan pengisian variabel teks (string) yang tepat?',
    pilihan: [
      'nama = "Alya"',
      'nama = Alya',
      '"Alya" = nama',
      'nama == "Alya"',
    ],
    jawabanBenar: 0,
    petunjuk: 'nama variabel di kiri dan nilai teks diapit tanda kutip.',
    benarHighlight: 'nama = "Alya"',
    benarPenjelasan:
      ' menempatkan variabel di sisi kiri dan nilai string di dalam tanda kutip.',
    salahPenjelasanPrefix:
      ' tidak sesuai dengan aturan assignment nilai string.',
    relatedCardTitle: 'Aturan Nama Variabel',
    relatedCardNumber: 'Kartu 4',
  },
];

// ============================================================================
// 6. PROGRESS SCREEN VIEW-MODELS & MAPPER (FlipCode - 25 & 26)
// ============================================================================
export const DEFAULT_DASHBOARD_DATA = {
  statusLabel: 'Berkembang',
  totalProgressPct: 25,
  activeSegments: 1,
  totalSegments: 4,
  topics: [
    {
      id: 'variabel',
      title: 'Variabel',
      pct: 75,
      levelLabel: 'Sedang',
      unlocked: true,
      accentColor: '#2554E8',
      levelColor: '#D97706',
    },
    {
      id: 'tipe_data',
      title: 'Tipe Data',
      pct: 0,
      levelLabel: '0%',
      unlocked: false,
      lockBg: '#FFF7ED',
      lockBorder: '#FFEDD5',
      lockColor: '#F59E0B',
    },
    {
      id: 'operator',
      title: 'Operator',
      pct: 0,
      levelLabel: '0%',
      unlocked: false,
      lockBg: '#FFF1F2',
      lockBorder: '#FFE4E6',
      lockColor: '#F43F5E',
    },
  ],
  quizPerformance: {
    averagePct: 65,
    levelBadge: 'Level Sedang',
    history: [
      {
        id: 'q1',
        label: 'Kuis 1',
        score: 3,
        total: 5,
        trackBg: '#FEF9E7',
        fillBg: '#FCD34D',
      },
      {
        id: 'q2',
        label: 'Kuis 2',
        score: 2,
        total: 5,
        trackBg: '#FFF1EE',
        fillBg: '#FB9274',
      },
      {
        id: 'q3',
        label: 'Kuis 3',
        score: 4,
        total: 5,
        trackBg: '#E8FBF0',
        fillBg: '#34D399',
      },
      {
        id: 'q4',
        label: 'Kuis 4',
        score: 4,
        total: 5,
        trackBg: '#E8FBF0',
        fillBg: '#34D399',
      },
    ],
  },
  flashcardSummary: {
    mastered: 6,
    learning: 3,
    total: 30,
  },
  repeatConcept: {
    topicId: 'variabel',
    title: 'Nilai lama tertimpa',
    countLabel: '1 konsep',
  },
};

export const DEFAULT_BY_TOPIC_DATA = {
  completedBadgeLabel: '1 topik selesai',
  totalProgressPct: 47,
  legend: [
    {
      id: 'variabel',
      title: 'Variabel',
      meta: '100% • Selesai',
      pct: 100,
      color: '#2554E8',
      unlocked: true,
    },
    {
      id: 'tipe_data',
      title: 'Tipe Data',
      meta: '40% • Berjalan',
      pct: 40,
      color: '#F59E0B',
      unlocked: true,
    },
    {
      id: 'operator',
      title: 'Operator',
      meta: '0% • Terkunci',
      pct: 0,
      color: '#CBD5E1',
      unlocked: false,
    },
  ],
  masteredTopic: {
    id: 'variabel',
    title: 'Variabel',
    cardsPill: '8/10 kartu',
    quizPill: '4/5 di Sulit',
  },
  activeTopicCard: {
    id: 'tipe_data',
    iconText: '123',
    title: 'Tipe Data',
    levelBadge: 'SEDANG',
    subtitle: 'Flashcard 4 dari 10',
    pct: 40,
  },
  summaryCards: {
    masteredCards: 12,
    totalCards: 30,
    quizAveragePct: 72,
  },
};

export function mapRepositoryToProgressModels(rawAll, activeTopicId) {
  const dashboard = JSON.parse(JSON.stringify(DEFAULT_DASHBOARD_DATA));
  const byTopic = JSON.parse(JSON.stringify(DEFAULT_BY_TOPIC_DATA));

  if (!rawAll) {
    return { dashboard, byTopic };
  }

  const varCards = ContentRepository.getFlashcardsByTopic('variabel') || [];
  const tdCards = ContentRepository.getFlashcardsByTopic('tipe_data') || [];
  const opCards = ContentRepository.getFlashcardsByTopic('operator') || [];

  const countMastered = (cards) =>
    cards.filter((c) => rawAll.cards?.[c.id]?.status === CardStatus.DIKUASAI)
      .length;

  const varMastered = countMastered(varCards);
  const tdMastered = countMastered(tdCards);
  const opMastered = countMastered(opCards);
  const totalMastered = varMastered + tdMastered + opMastered;

  if (totalMastered > 0) {
    const varTotal = varCards.length || 10;
    const varPct = Math.round((varMastered / varTotal) * 100);
    dashboard.topics[0].pct = varPct > 0 ? varPct : 75;
    dashboard.flashcardSummary.mastered = totalMastered;
  }

  if (activeTopicId === 'operator') {
    byTopic.completedBadgeLabel = '2 topik selesai';
    byTopic.totalProgressPct = 70;
    byTopic.legend[1].meta = '100% • Selesai';
    byTopic.legend[1].pct = 100;
    byTopic.legend[2].meta = '10% • Berjalan';
    byTopic.legend[2].pct = 10;
    byTopic.legend[2].color = '#F26B50';
    byTopic.legend[2].unlocked = true;
    byTopic.activeTopicCard = {
      id: 'operator',
      iconText: '+ -',
      title: 'Operator',
      levelBadge: 'MUDAH',
      subtitle: 'Flashcard 1 dari 10',
      pct: 10,
    };
    byTopic.summaryCards.masteredCards = 18;
  }

  return { dashboard, byTopic };
}

