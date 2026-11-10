import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fonts } from '../constants/theme';
import { ContentRepository } from '../storage/ContentRepository';
import { QuizManager } from '../logic/QuizManager';
import { Level } from '../constants/enums';
import { useAuth } from '../context/AuthContext';
import {
  CloseIcon,
  BookmarkFilledIcon,
  CheckIcon,
  LightbulbIcon,
  ArrowRightIcon,
  CodeSlashIcon,
} from '../../assets/icons/AppIcons';
import {
  QuizBannerRobot,
  MiniFeedbackRobot,
} from '../../assets/illustrations/MascotIllustrations';

const HURUF = ['A', 'B', 'C', 'D'];

// Data fallback 5 soal kuis sesuai wireframe Figma (dimulai pada Soal 2 dari 5)
const FALLBACK_QUIZ_QUESTIONS = [
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
    salahPenjelasanPrefix:
      ' bukan operator pengisian nilai variabel.',
    relatedCardTitle: 'Assignment (Pengisian Nilai)',
    relatedCardNumber: 'Kartu 2',
  },
  {
    id: 'q-var-04',
    topicId: 'variabel',
    level: Level.MUDAH,
    tipe: 'PILIHAN GANDA',
    pertanyaan: 'Jika skor = 70 lalu diubah menjadi skor = 85, berapa nilai skor?',
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
    pertanyaan: 'Manakah penulisan pengisian variabel teks (string) yang tepat?',
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

export default function QuizScreen({ route, navigation }) {
  const { user } = useAuth();
  const topicId = route?.params?.topicId || 'variabel';
  const topik = ContentRepository.getTopicById(topicId);
  const namaTopik = topik?.nama || 'Variabel';
  const displayName = user?.nama || 'Aura';

  // Mulai pada index 1 ("2/5" — "Manakah nama variabel yang valid?") sesuai gambar Figma
  const [idx, setIdx] = useState(1);
  const [pilih, setPilih] = useState(null);
  const [jawaban, setJawaban] = useState([0]);
  const [showFeedback, setShowFeedback] = useState(false);

  const questions = FALLBACK_QUIZ_QUESTIONS;
  const q = questions[idx] || questions[1];
  const benar = pilih === q.jawabanBenar;

  const handleSelectOption = (i) => {
    setPilih(i);
    // Jika feedback sedang terbuka dan user klik opsi lain, izinkan berganti
    // agar mudah melihat tampilan Benar (Frame 15) maupun Salah (Frame 16).
  };

  const handleCheckAnswer = () => {
    if (pilih === null) return;
    setShowFeedback(true);
  };

  const handleNextQuestion = async () => {
    const arr = [...jawaban];
    arr[idx] = pilih ?? -1;
    setJawaban(arr);
    setPilih(null);
    setShowFeedback(false);

    if (idx < questions.length - 1) {
      setIdx(idx + 1);
    } else {
      try {
        const hasil = await QuizManager.submit({
          topicId,
          level: Level.MUDAH,
          questions,
          jawaban: arr,
        });
        navigation.replace('QuizResult', {
          topicId,
          hasil,
          level: Level.MUDAH,
        });
      } catch (e) {
        navigation.replace('QuizResult', {
          topicId,
          hasil: { benar: 4, total: 5 },
          level: Level.MUDAH,
        });
      }
    }
  };

  const handleClose = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('TopicDetail', { topicId });
    }
  };

  return (
    <SafeAreaView style={s.safeArea} edges={['top', 'bottom']}>
      {/* Top Header */}
      <View style={s.header}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleClose}
          style={s.closeButton}
          accessibilityLabel="Tutup Kuis"
        >
          <CloseIcon size={18} color="#475569" strokeWidth={2.2} />
        </TouchableOpacity>

        {/* Center Topic & Level Pill */}
        <View style={s.topicPill}>
          <BookmarkFilledIcon size={12} color="#2554E8" />
          <Text style={s.topicPillText}>{namaTopik} — Mudah</Text>
        </View>

        <Text style={s.stepFraction}>
          {idx + 1}/{questions.length}
        </Text>
      </View>

      {/* 5-Segment Progress Bar */}
      <View style={s.segmentedBarRow}>
        {questions.map((_, segIdx) => {
          const active = segIdx <= idx;
          return (
            <View
              key={segIdx}
              style={[
                s.segmentBar,
                active ? s.segmentBarActive : s.segmentBarInactive,
              ]}
            />
          );
        })}
      </View>

      {/* Scrollable Quiz Content */}
      <ScrollView
        style={s.scroll}
        contentContainerStyle={[
          s.scrollContent,
          showFeedback && { paddingBottom: 24 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={s.questionOverline}>
          SOAL {idx + 1} DARI {questions.length}
        </Text>

        {/* Question Banner Card with Robot */}
        <View style={s.questionCard}>
          <View style={s.questionCardLeft}>
            <View style={s.questionTypePill}>
              <Text style={s.questionTypeText}>{q.tipe}</Text>
            </View>
            <Text style={s.questionTitle}>{q.pertanyaan}</Text>
          </View>

          <QuizBannerRobot />
        </View>

        {/* 4 Answer Options */}
        <View style={s.optionsList} accessibilityRole="radiogroup">
          {q.pilihan.map((optText, i) => {
            const isPicked = pilih === i;
            const isCorrectOption = showFeedback && i === q.jawabanBenar;
            const isWrongPicked = showFeedback && isPicked && !benar;
            const isSelectedPreCheck = !showFeedback && isPicked;

            return (
              <TouchableOpacity
                key={i}
                activeOpacity={0.82}
                onPress={() => handleSelectOption(i)}
                accessibilityRole="radio"
                accessibilityState={{ checked: isPicked }}
                style={[
                  s.optionCard,
                  isSelectedPreCheck && s.optionCardSelected,
                  isCorrectOption && s.optionCardCorrect,
                  isWrongPicked && s.optionCardWrong,
                ]}
              >
                {/* Left Letter Badge (A, B, C, D) */}
                <View
                  style={[
                    s.letterBadge,
                    isSelectedPreCheck && s.letterBadgeSelected,
                    isCorrectOption && s.letterBadgeCorrect,
                    isWrongPicked && s.letterBadgeWrong,
                  ]}
                >
                  <Text
                    style={[
                      s.letterText,
                      (isSelectedPreCheck ||
                        isCorrectOption ||
                        isWrongPicked) &&
                        s.letterTextWhite,
                    ]}
                  >
                    {HURUF[i]}
                  </Text>
                </View>

                {/* Option Text */}
                <Text
                  style={[
                    s.optionLabel,
                    isSelectedPreCheck && s.optionLabelSelected,
                    isCorrectOption && s.optionLabelCorrect,
                    isWrongPicked && s.optionLabelWrong,
                  ]}
                >
                  {optText}
                </Text>

                {/* Right Status Icon */}
                {isSelectedPreCheck && (
                  <View style={s.radioBullseyeOuter}>
                    <View style={s.radioBullseyeInner} />
                  </View>
                )}

                {isCorrectOption && (
                  <View style={s.checkCircleGreen}>
                    <CheckIcon size={13} color="#FFFFFF" strokeWidth={3} />
                  </View>
                )}

                {isWrongPicked && (
                  <View style={s.crossCircleRed}>
                    <CloseIcon size={12} color="#EF4444" strokeWidth={2.6} />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Yellow Petunjuk Card */}
        <View style={s.hintCard}>
          <View style={s.hintIconCircle}>
            <LightbulbIcon size={15} color="#D97706" />
          </View>
          <Text style={s.hintText}>
            <Text style={s.hintBold}>Petunjuk: </Text>
            {q.petunjuk}
          </Text>
        </View>
      </ScrollView>

      {/* BOTTOM AREA: Either "Periksa Jawaban" (Frames 13 & 14) or Feedback Sheet (Frames 15 & 16) */}
      {!showFeedback ? (
        <View style={s.footerPreCheck}>
          <TouchableOpacity
            activeOpacity={pilih !== null ? 0.8 : 1}
            onPress={handleCheckAnswer}
            style={[
              s.checkAnswerBtn,
              pilih !== null && s.checkAnswerBtnReady,
            ]}
          >
            <Text
              style={[
                s.checkAnswerBtnText,
                pilih !== null && s.checkAnswerBtnTextReady,
              ]}
            >
              Periksa Jawaban
            </Text>
          </TouchableOpacity>
        </View>
      ) : benar ? (
        /* FRAME 15: CORRECT FEEDBACK SHEET */
        <View style={s.correctSheetWrapper}>
          {/* Peeking Robot on Top Right */}
          <View style={s.peekingRobotWrap} pointerEvents="none">
            <MiniFeedbackRobot happy={true} />
          </View>

          <View style={s.correctSheet}>
            <View style={s.correctHeaderRow}>
              <View style={s.correctBigCheck}>
                <CheckIcon size={16} color="#FFFFFF" strokeWidth={3} />
              </View>
              <View>
                <Text style={s.correctTitle}>Benar!</Text>
                <Text style={s.correctSubtitle}>
                  Kerja bagus, {displayName}!
                </Text>
              </View>
            </View>

            {/* White Explanation Box inside Correct Sheet */}
            <View style={s.correctExplainBox}>
              <Text style={s.correctExplainText}>
                <Text style={s.inlineCodeGreen}>{` ${q.benarHighlight} `}</Text>
                {q.benarPenjelasan}
              </Text>
            </View>

            {/* Green CTA Button: Soal Berikutnya -> */}
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={handleNextQuestion}
              style={s.greenNextBtn}
            >
              <Text style={s.greenNextBtnText}>Soal Berikutnya</Text>
              <ArrowRightIcon size={17} color="#FFFFFF" strokeWidth={2.5} />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        /* FRAME 16: INCORRECT FEEDBACK SHEET */
        <View style={s.incorrectSheet}>
          <View style={s.incorrectTopRow}>
            <View style={s.incorrectTextCol}>
              <Text style={s.incorrectTitle}>Belum tepat, tetap semangat!</Text>
              <Text style={s.incorrectDesc}>
                {q.salahHighlight ? (
                  <>
                    <Text style={s.inlineCodeRed}>
                      {` ${q.pilihan[pilih] || q.salahHighlight} `}
                    </Text>
                    {q.salahPenjelasanMid}
                    <Text style={s.inlineCodeGrey}>{` ${q.salahCodeInline} `}</Text>
                    {q.salahPenjelasanSuffix}
                  </>
                ) : (
                  <>
                    <Text style={s.inlineCodeRed}>
                      {` ${q.pilihan[pilih]} `}
                    </Text>
                    {q.salahPenjelasanPrefix}
                  </>
                )}
              </Text>
            </View>

            <MiniFeedbackRobot happy={false} />
          </View>

          {/* Related Flashcard Card */}
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() =>
              navigation.navigate('Flashcard', {
                topicId,
                fromQuiz: true,
                questionNumber: idx + 1,
              })
            }
            style={s.relatedCardBox}
          >
            <View style={s.relatedIconSquare}>
              <CodeSlashIcon size={16} color="#FFFFFF" />
            </View>

            <View style={s.relatedInfoCol}>
              <Text style={s.relatedOverline}>KARTU TERKAIT</Text>
              <Text style={s.relatedTitle}>{q.relatedCardTitle}</Text>
            </View>

            <View style={s.relatedBadgePill}>
              <Text style={s.relatedBadgeText}>{q.relatedCardNumber}</Text>
            </View>
          </TouchableOpacity>

          {/* Bottom 2 Action Buttons */}
          <View style={s.incorrectActionsRow}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleNextQuestion}
              style={s.whiteNextBtn}
            >
              <Text style={s.whiteNextBtnText}>Soal Berikutnya</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() =>
                navigation.navigate('Flashcard', {
                  topicId,
                  fromQuiz: true,
                  questionNumber: idx + 1,
                })
              }
              style={s.blueRelatedBtn}
            >
              <Text style={s.blueRelatedBtnText}>Buka Kartu Terkait</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
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
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 6,
  },
  closeButton: {
    width: 34,
    height: 34,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  topicPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDF2FF',
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  topicPillText: {
    fontFamily: fonts.extrabold,
    fontSize: 12,
    color: '#2554E8',
    marginLeft: 6,
  },
  stepFraction: {
    fontFamily: fonts.bold,
    fontSize: 12.5,
    color: '#475569',
    minWidth: 34,
    textAlign: 'right',
  },
  segmentedBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 20,
    marginTop: 8,
  },
  segmentBar: {
    flex: 1,
    height: 5,
    borderRadius: 999,
  },
  segmentBarActive: {
    backgroundColor: '#2554E8',
  },
  segmentBarInactive: {
    backgroundColor: '#E2E8F0',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
  },
  questionOverline: {
    fontFamily: fonts.bold,
    fontSize: 10.5,
    letterSpacing: 0.8,
    color: '#94A3B8',
    marginBottom: 8,
  },
  questionCard: {
    backgroundColor: '#F3F6FF',
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: '#E2ECFF',
    paddingVertical: 14,
    paddingLeft: 18,
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  questionCardLeft: {
    flex: 1,
    paddingRight: 8,
  },
  questionTypePill: {
    alignSelf: 'flex-start',
    backgroundColor: '#DCE7FF',
    borderRadius: 999,
    paddingVertical: 3.5,
    paddingHorizontal: 10,
  },
  questionTypeText: {
    fontFamily: fonts.extrabold,
    fontSize: 9.5,
    letterSpacing: 0.5,
    color: '#2554E8',
  },
  questionTitle: {
    marginTop: 10,
    fontFamily: fonts.extrabold,
    fontSize: 17,
    lineHeight: 24,
    color: '#1F2A44',
  },
  optionsList: {
    marginTop: 16,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: '#EAEEF4',
    paddingVertical: 13,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  optionCardSelected: {
    backgroundColor: '#F2F6FF',
    borderWidth: 2,
    borderColor: '#2554E8',
  },
  optionCardCorrect: {
    backgroundColor: '#ECFDF5',
    borderWidth: 2,
    borderColor: '#10B981',
  },
  optionCardWrong: {
    backgroundColor: '#FFF1F2',
    borderWidth: 1.8,
    borderColor: '#EF4444',
  },
  letterBadge: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 13,
  },
  letterBadgeSelected: {
    borderRadius: 16,
    backgroundColor: '#2554E8',
  },
  letterBadgeCorrect: {
    borderRadius: 16,
    backgroundColor: '#10B981',
  },
  letterBadgeWrong: {
    borderRadius: 10,
    backgroundColor: '#EF4444',
  },
  letterText: {
    fontFamily: fonts.bold,
    fontSize: 13.5,
    color: '#475569',
  },
  letterTextWhite: {
    fontFamily: fonts.extrabold,
    color: '#FFFFFF',
  },
  optionLabel: {
    flex: 1,
    fontFamily: fonts.semibold,
    fontSize: 14,
    color: '#1F2A44',
  },
  optionLabelSelected: {
    fontFamily: fonts.bold,
    color: '#1E3A8A',
  },
  optionLabelCorrect: {
    fontFamily: fonts.extrabold,
    color: '#064E3B',
  },
  optionLabelWrong: {
    fontFamily: fonts.bold,
    color: '#BE123C',
  },
  radioBullseyeOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#2554E8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioBullseyeInner: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
    backgroundColor: '#2554E8',
  },
  checkCircleGreen: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
  },
  crossCircleRed: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#FFE4E6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hintCard: {
    marginTop: 4,
    backgroundColor: '#FEFCE8',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FEF08A',
    paddingVertical: 11,
    paddingHorizontal: 13,
    flexDirection: 'row',
    alignItems: 'center',
  },
  hintIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FEF08A',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  hintText: {
    flex: 1,
    fontFamily: fonts.medium,
    fontSize: 11.5,
    lineHeight: 17,
    color: '#475569',
  },
  hintBold: {
    fontFamily: fonts.extrabold,
    color: '#1F2A44',
  },
  footerPreCheck: {
    paddingHorizontal: 20,
    paddingBottom: 18,
    paddingTop: 6,
  },
  checkAnswerBtn: {
    backgroundColor: '#EDF2F7',
    borderRadius: 16,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkAnswerBtnReady: {
    backgroundColor: '#E2E8F0',
  },
  checkAnswerBtnText: {
    fontFamily: fonts.extrabold,
    fontSize: 14,
    color: '#94A3B8',
  },
  checkAnswerBtnTextReady: {
    color: '#64748B',
  },
  // ============================================================================
  // FRAME 15: CORRECT FEEDBACK SHEET
  // ============================================================================
  correctSheetWrapper: {
    position: 'relative',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  peekingRobotWrap: {
    position: 'absolute',
    top: -32,
    right: 26,
    zIndex: 10,
  },
  correctSheet: {
    backgroundColor: '#ECFDF5',
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: '#A7F3D0',
    padding: 16,
  },
  correctHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  correctBigCheck: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  correctTitle: {
    fontFamily: fonts.extrabold,
    fontSize: 15,
    color: '#064E3B',
  },
  correctSubtitle: {
    fontFamily: fonts.medium,
    fontSize: 11.5,
    color: '#047857',
  },
  correctExplainBox: {
    marginTop: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#D1FAE5',
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  correctExplainText: {
    fontFamily: fonts.medium,
    fontSize: 12,
    lineHeight: 18,
    color: '#334155',
  },
  inlineCodeGreen: {
    backgroundColor: '#D1FAE5',
    fontFamily: fonts.bold,
    color: '#065F46',
  },
  greenNextBtn: {
    marginTop: 12,
    backgroundColor: '#10B981',
    borderRadius: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  greenNextBtnText: {
    fontFamily: fonts.extrabold,
    fontSize: 14,
    color: '#FFFFFF',
    marginRight: 8,
  },
  // ============================================================================
  // FRAME 16: INCORRECT FEEDBACK SHEET
  // ============================================================================
  incorrectSheet: {
    marginHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#FFF1F2',
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: '#FECDD3',
    padding: 16,
  },
  incorrectTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  incorrectTextCol: {
    flex: 1,
    paddingRight: 10,
  },
  incorrectTitle: {
    fontFamily: fonts.extrabold,
    fontSize: 14.5,
    color: '#991B1B',
  },
  incorrectDesc: {
    marginTop: 5,
    fontFamily: fonts.medium,
    fontSize: 11.5,
    lineHeight: 17.5,
    color: '#475569',
  },
  inlineCodeRed: {
    backgroundColor: '#FFE4E6',
    fontFamily: fonts.bold,
    color: '#BE123C',
  },
  inlineCodeGrey: {
    backgroundColor: '#E2E8F0',
    fontFamily: fonts.bold,
    color: '#1E293B',
  },
  relatedCardBox: {
    marginTop: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    paddingVertical: 10,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  relatedIconSquare: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#2554E8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  relatedInfoCol: {
    flex: 1,
  },
  relatedOverline: {
    fontFamily: fonts.bold,
    fontSize: 9,
    letterSpacing: 0.6,
    color: '#94A3B8',
  },
  relatedTitle: {
    fontFamily: fonts.extrabold,
    fontSize: 12.5,
    color: '#1F2A44',
    marginTop: 1,
  },
  relatedBadgePill: {
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  relatedBadgeText: {
    fontFamily: fonts.bold,
    fontSize: 10.5,
    color: '#64748B',
  },
  incorrectActionsRow: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  whiteNextBtn: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  whiteNextBtnText: {
    fontFamily: fonts.extrabold,
    fontSize: 12.5,
    color: '#1F2A44',
  },
  blueRelatedBtn: {
    flex: 1.15,
    backgroundColor: '#2554E8',
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blueRelatedBtnText: {
    fontFamily: fonts.extrabold,
    fontSize: 12.5,
    color: '#FFFFFF',
  },
});
