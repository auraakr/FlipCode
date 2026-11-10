import React, { useEffect, useState } from 'react';
import {
  Alert,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Circle } from 'react-native-svg';
import Button from '../components/Button';
import { PlacementApi } from '../api/placement';
import { ContentRepository } from '../storage/ContentRepository';
import { fonts } from '../constants/theme';

const HURUF = ['A', 'B', 'C', 'D', 'E', 'F'];

// Data tampilan sementara (fallback) sesuai desain Figma karena backend/database belum diisi
const FALLBACK_QUESTIONS = [
  {
    id: 'pt-var-01',
    topicId: 'variabel',
    tipe: 'pilihan_ganda',
    pertanyaan: 'Apa fungsi variabel dalam program?',
    pilihan: [
      'Menyimpan nilai',
      'Menghapus program',
      'Mengubah warna layar',
      'Menyalakan komputer',
    ],
    jawabanBenar: 0,
  },
  {
    id: 'pt-var-02',
    topicId: 'variabel',
    tipe: 'pilihan_ganda',
    pertanyaan: 'Manakah penulisan nama variabel yang benar?',
    pilihan: ['nama_siswa', '2nama', 'nama siswa', 'nama-siswa'],
    jawabanBenar: 0,
  },
  {
    id: 'pt-var-03',
    topicId: 'variabel',
    tipe: 'pilihan_ganda',
    pertanyaan: 'Jika x = 5 lalu diubah menjadi x = 10, maka nilai x sekarang adalah...',
    pilihan: ['10', '5', '15', '0'],
    jawabanBenar: 0,
  },
  {
    id: 'pt-td-01',
    topicId: 'tipe_data',
    tipe: 'pilihan_ganda',
    pertanyaan: 'Tipe data yang digunakan untuk menyimpan bilangan bulat adalah...',
    pilihan: ['Integer', 'String', 'Boolean', 'Char'],
    jawabanBenar: 0,
  },
  {
    id: 'pt-td-02',
    topicId: 'tipe_data',
    tipe: 'pilihan_ganda',
    pertanyaan: 'Nilai "Halo Dunia" termasuk ke dalam tipe data...',
    pilihan: ['String', 'Integer', 'Float', 'Boolean'],
    jawabanBenar: 0,
  },
  {
    id: 'pt-td-03',
    topicId: 'tipe_data',
    tipe: 'pilihan_ganda',
    pertanyaan: 'Tipe data Boolean hanya memiliki dua nilai, yaitu...',
    pilihan: [
      'True dan False',
      '0 dan 100',
      'Huruf dan Angka',
      'Positif dan Negatif',
    ],
    jawabanBenar: 0,
  },
  {
    id: 'pt-op-01',
    topicId: 'operator',
    tipe: 'pilihan_ganda',
    pertanyaan: 'Simbol operator yang digunakan untuk perkalian dalam pemrograman adalah...',
    pilihan: ['*', 'x', ':', '^'],
    jawabanBenar: 0,
  },
  {
    id: 'pt-op-02',
    topicId: 'operator',
    tipe: 'pilihan_ganda',
    pertanyaan: 'Hasil dari operasi 10 % 3 (modulo / sisa bagi) adalah...',
    pilihan: ['1', '3', '0', '2'],
    jawabanBenar: 0,
  },
  {
    id: 'pt-op-03',
    topicId: 'operator',
    tipe: 'pilihan_ganda',
    pertanyaan: 'Operator perbandingan untuk mengecek apakah dua nilai sama adalah...',
    pilihan: ['==', '=', '!=', '>='],
    jawabanBenar: 0,
  },
];

export default function PlacementTestScreen({ navigation }) {
  // Soal diambil dari server (POST /placement/start). Selama belum tersedia
  // (atau server tidak terjangkau), tampilkan data fallback sesuai wireframe.
  const [questions, setQuestions] = useState(FALLBACK_QUESTIONS);
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    let alive = true;
    PlacementApi.start()
      .then((res) => {
        if (!alive || !res?.questions?.length) return;
        setQuestions(res.questions);
        setSessionId(res.sessionId);
      })
      .catch((e) => console.warn('Gagal memuat tes penempatan:', e.message));
    return () => {
      alive = false;
    };
  }, []);

  const [idx, setIdx] = useState(0);
  const [jawaban, setJawaban] = useState({});

  const q = questions[idx];
  const terpilih = jawaban[idx];
  const topik = ContentRepository.getTopicById(q.topicId);
  const namaTopik = topik?.nama || 'Variabel';
  const terakhir = idx === questions.length - 1;
  const pct = ((idx + 1) / questions.length) * 100;

  const pilih = (i) => {
    setJawaban((prev) => ({
      ...prev,
      [idx]: prev[idx] === i ? undefined : i,
    }));
  };

  const handleClose = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.replace('Welcome');
    }
  };

  const next = async () => {
    if (!terakhir) {
      setIdx(idx + 1);
      return;
    }
    const arr = questions.map((_, i) => jawaban[i] ?? -1);
    try {
      const hasil = await PlacementApi.submit({ sessionId, questions, jawaban: arr });
      navigation.replace('PlacementResult', { hasil });
    } catch (e) {
      Alert.alert('Gagal mengirim jawaban', e.message || 'Coba lagi.');
    }
  };

  return (
    <SafeAreaView style={s.safeArea}>
      {/* Top Header with Close Button & Progress Bar */}
      <View style={s.header}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleClose}
          style={s.closeButton}
          accessibilityLabel="Tutup"
        >
          <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
            <Path
              d="M18 6L6 18M6 6l12 12"
              stroke="#1F2A44"
              strokeWidth={2.3}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </TouchableOpacity>

        <View style={s.progressSection}>
          <View style={s.progressLabelRow}>
            <Text style={s.headerTitle}>Tes Awal</Text>
            <Text style={s.stepCounter}>
              {idx + 1} dari {questions.length}
            </Text>
          </View>
          <View style={s.progressTrack}>
            <View style={[s.progressFill, { width: `${pct}%` }]} />
          </View>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView
        style={s.scroll}
        contentContainerStyle={s.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Blue Question Banner Card */}
        <View style={s.questionCard}>
          {/* Decorative Concentric Circles on the Right */}
          <View style={s.cardDecor} pointerEvents="none">
            <Svg width={180} height={180} viewBox="0 0 180 180" fill="none">
              <Circle
                cx="115"
                cy="90"
                r="82"
                stroke="rgba(255, 255, 255, 0.12)"
                strokeWidth={1.5}
              />
              <Circle
                cx="115"
                cy="90"
                r="62"
                fill="rgba(255, 255, 255, 0.04)"
                stroke="rgba(255, 255, 255, 0.14)"
                strokeWidth={1.5}
              />
            </Svg>
          </View>

          {/* Topic Badge Pill */}
          <View style={s.topicBadge}>
            <Svg width={13} height={13} viewBox="0 0 24 24" fill="none">
              <Path
                d="M9 8L5 12L9 16M15 8L19 12L15 16"
                stroke="#FFFFFF"
                strokeWidth={2.3}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
            <Text style={s.topicBadgeText}>{namaTopik}</Text>
          </View>

          {/* Question Text */}
          <Text style={s.questionText}>{q.pertanyaan}</Text>
        </View>

        {/* Instruction Label */}
        <Text style={s.sectionHint}>Pilih satu jawaban</Text>

        {/* Answer Options */}
        <View accessibilityRole="radiogroup">
          {q.pilihan.map((pilihanText, i) => {
            const isSelected = terpilih === i;
            return (
              <TouchableOpacity
                key={i}
                activeOpacity={0.8}
                onPress={() => pilih(i)}
                accessibilityRole="radio"
                accessibilityState={{ checked: isSelected }}
                style={[s.optionCard, isSelected && s.optionCardSelected]}
              >
                {/* Left Letter Circle (A, B, C, D) */}
                <View
                  style={[
                    s.letterBadge,
                    isSelected && s.letterBadgeSelected,
                  ]}
                >
                  <Text
                    style={[
                      s.letterText,
                      isSelected && s.letterTextSelected,
                    ]}
                  >
                    {HURUF[i]}
                  </Text>
                </View>

                {/* Option Text */}
                <Text
                  style={[
                    s.optionLabel,
                    isSelected && s.optionLabelSelected,
                  ]}
                >
                  {pilihanText}
                </Text>

                {/* Right Checkmark Circle (only visible when selected) */}
                {isSelected && (
                  <View style={s.checkCircle}>
                    <Svg width={13} height={13} viewBox="0 0 24 24" fill="none">
                      <Path
                        d="M5 12.5l4.5 4.5L19 7.5"
                        stroke="#FFFFFF"
                        strokeWidth={2.8}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </Svg>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Bottom CTA Button */}
      <View style={s.footer}>
        <Button
          title={terakhir ? 'Selesai' : 'Berikutnya'}
          onPress={next}
        />
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FDFCF7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 8,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5EAF2',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  progressSection: {
    flex: 1,
    marginLeft: 12,
  },
  progressLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  headerTitle: {
    fontFamily: fonts.extrabold,
    fontSize: 13,
    color: '#1F2A44',
  },
  stepCounter: {
    fontFamily: fonts.bold,
    fontSize: 12,
    color: '#64748B',
  },
  progressTrack: {
    height: 7,
    borderRadius: 999,
    backgroundColor: '#DCE6FF',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: '#2554E8',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 20,
  },
  questionCard: {
    backgroundColor: '#2554E8',
    borderRadius: 24,
    paddingHorizontal: 22,
    paddingTop: 20,
    paddingBottom: 24,
    minHeight: 154,
    borderBottomWidth: 4,
    borderBottomColor: '#1B3FB5',
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
  },
  cardDecor: {
    position: 'absolute',
    right: -10,
    top: -12,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topicBadge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    borderColor: 'rgba(255, 255, 255, 0.28)',
    borderWidth: 1,
    borderRadius: 999,
    paddingVertical: 5,
    paddingHorizontal: 11,
  },
  topicBadgeText: {
    fontFamily: fonts.bold,
    fontSize: 12,
    color: '#FFFFFF',
    marginLeft: 5,
  },
  questionText: {
    marginTop: 14,
    fontFamily: fonts.extrabold,
    fontSize: 21,
    lineHeight: 29,
    color: '#FFFFFF',
    paddingRight: 16,
  },
  sectionHint: {
    marginTop: 22,
    marginBottom: 12,
    fontFamily: fonts.semibold,
    fontSize: 13,
    color: '#94A3B8',
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#EAEEF4',
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  optionCardSelected: {
    backgroundColor: '#EBF1FF',
    borderWidth: 2,
    borderColor: '#2554E8',
  },
  letterBadge: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  letterBadgeSelected: {
    backgroundColor: '#2554E8',
  },
  letterText: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: '#475569',
  },
  letterTextSelected: {
    fontFamily: fonts.extrabold,
    color: '#FFFFFF',
  },
  optionLabel: {
    flex: 1,
    fontFamily: fonts.semibold,
    fontSize: 15,
    color: '#1F2A44',
  },
  optionLabelSelected: {
    fontFamily: fonts.bold,
    color: '#1F2A44',
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#2554E8',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 22,
  },
});
