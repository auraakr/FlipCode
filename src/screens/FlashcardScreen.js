import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Easing,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fonts } from '../constants/theme';
import { ContentRepository } from '../storage/ContentRepository';
import { FlashcardApi } from '../api/flashcards';
import {
  FlipArrowsIcon,
  FaceEmojiIcon,
  CloseIcon,
  QuizClipboardIcon,
  RotateCcwIcon,
  ChevronLeftIcon,
  LightningBoltIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  LinkChainIcon,
  CodeSlashIcon,
  OpenBookOutlineIcon,
  CheckIcon,
  LightbulbIcon,
  UndoCornerLeftIcon,
} from '../../assets/icons/AppIcons';
import {
  ReviewBannerRobot,
  CompletedHeroIllustration,
} from '../../assets/illustrations/MascotIllustrations';

// Data fallback 10 kartu sesuai wireframe Figma (dimulai dari kartu ke-4: "4 dari 10")
const FALLBACK_CARDS = [
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

export default function FlashcardScreen({ route, navigation }) {
  const topicId = route?.params?.topicId || 'variabel';
  const fromQuiz = Boolean(route?.params?.fromQuiz);
  const questionNumber = route?.params?.questionNumber || 2;
  const topik = ContentRepository.getTopicById(topicId);
  const namaTopik = topik?.nama || 'Variabel';

  // Mulai pada index 3 ("4 dari 10") sesuai desain wireframe Figma
  const [idx, setIdx] = useState(3);
  // Tahap tampilan:
  // 'card' (08 Question <-> 09 Explanation dengan animasi flip)
  // -> 'assessment' (10 Self-assessment)
  // -> 'review' (11 Flashcard: Review)
  // -> 'completed' (12 Flashcard Session Completed)
  const [step, setStep] = useState('card');
  const [isFlipped, setIsFlipped] = useState(fromQuiz);
  const [rating, setRating] = useState('mudah');

  // Animasi flip kartu utama (08 <-> 09)
  const flipAnim = useRef(new Animated.Value(0)).current;
  const isAnimatingRef = useRef(false);

  const triggerCardFlip = (targetFlipped) => {
    if (isAnimatingRef.current) return;
    const nextState =
      typeof targetFlipped === 'boolean' ? targetFlipped : !isFlipped;
    isAnimatingRef.current = true;

    Animated.timing(flipAnim, {
      toValue: 0.5,
      duration: 150,
      easing: Easing.in(Easing.quad),
      useNativeDriver: true,
    }).start(() => {
      setIsFlipped(nextState);
      Animated.timing(flipAnim, {
        toValue: 1,
        duration: 170,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }).start(() => {
        flipAnim.setValue(0);
        isAnimatingRef.current = false;
      });
    });
  };

  const cardScaleX = flipAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0.04, 1],
  });

  const cardScaleY = flipAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0.96, 1],
  });

  const cards = FALLBACK_CARDS;
  const current = cards[idx] || cards[3];
  const totalCardsCount = 10;
  const pct = ((idx + 1) / totalCardsCount) * 100;

  const handleBack = () => {
    if (step === 'completed') {
      setStep('review');
      return;
    }
    if (step === 'review') {
      setStep('assessment');
      return;
    }
    if (step === 'assessment') {
      setStep('card');
      setIsFlipped(true);
      return;
    }
    if (step === 'card' && isFlipped) {
      triggerCardFlip(false);
      return;
    }
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('TopicDetail', { topicId });
    }
  };

  const handleSaveAssessment = async () => {
    try {
      if (rating === 'mudah') {
        await FlashcardApi.markPaham(current.id);
      } else {
        await FlashcardApi.markUlangi(current.id);
      }
    } catch (e) {
      // Abaikan jika penyimpanan lokal gagal pada mode preview
    }
    // Lanjut ke halaman Ulasan Kartu (FlipCode - 11)
    setStep('review');
  };

  // ============================================================================
  // RENDER FRAME 12: FLASHCARD SESSION COMPLETED
  // ============================================================================
  if (step === 'completed') {
    return (
      <SafeAreaView style={s.safeArea} edges={['top', 'bottom']}>
        <ScrollView
          style={s.scroll}
          contentContainerStyle={s.completedScrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Top Blue Hero Banner */}
          <View style={s.completedHeroBanner}>
            <TouchableOpacity
              activeOpacity={0.75}
              onPress={() => navigation.navigate('TopicDetail', { topicId })}
              style={s.completedCloseBtn}
              accessibilityLabel="Tutup"
            >
              <CloseIcon size={16} color="#FFFFFF" strokeWidth={2.3} />
            </TouchableOpacity>

            <CompletedHeroIllustration />
          </View>

          {/* Body Content */}
          <View style={s.completedBody}>
            <Text style={s.completedTitle}>Sesi flashcard selesai!</Text>
            <Text style={s.completedSubtitle}>{namaTopik} • Mudah</Text>

            {/* 3 Stat Cards Row */}
            <View style={s.statsRow}>
              <View style={[s.statBox, s.statBoxBlue]}>
                <Text style={[s.statNumber, { color: '#2554E8' }]}>10</Text>
                <Text style={s.statLabel}>{'Kartu\ndipelajari'}</Text>
              </View>

              <View style={[s.statBox, s.statBoxGreen]}>
                <Text style={[s.statNumber, { color: '#10B981' }]}>7</Text>
                <Text style={s.statLabel}>{'Kartu\ndikuasai'}</Text>
              </View>

              <View style={[s.statBox, s.statBoxYellow]}>
                <Text style={[s.statNumber, { color: '#D97706' }]}>3</Text>
                <Text style={s.statLabel}>{'Perlu\ndiulang'}</Text>
              </View>
            </View>

            {/* Mastery Progress Card */}
            <View style={s.masteryCard}>
              <View style={s.masteryHeaderRow}>
                <Text style={s.masteryTitle}>Penguasaan kartu</Text>
                <Text style={s.masteryPct}>70%</Text>
              </View>

              <View style={s.masteryTrack}>
                <View style={s.masteryFill} />
              </View>

              <Text style={s.masteryNote}>
                Syarat 70% kartu dikuasai tercapai
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* Bottom Actions: Mulai Kuis & Ulangi Kartu */}
        <View style={s.completedFooter}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => navigation.navigate('Quiz', { topicId })}
            style={s.primaryBtnOuter}
          >
            <View style={s.primaryBtnInner}>
              <QuizClipboardIcon size={17} color="#FFFFFF" />
              <Text style={[s.primaryBtnText, { marginLeft: 8 }]}>
                Mulai Kuis
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.75}
            onPress={() => {
              setIsFlipped(false);
              setStep('review');
            }}
            style={s.repeatLinkBtn}
          >
            <RotateCcwIcon size={15} color="#2554E8" />
            <Text style={s.repeatLinkText}>Ulangi Kartu</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // ============================================================================
  // RENDER FRAME 11: FLASHCARD REVIEW (ULASAN KARTU)
  // ============================================================================
  if (step === 'review') {
    return (
      <SafeAreaView style={s.safeArea}>
        {/* Header: ULASAN KARTU */}
        <View style={s.header}>
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={handleBack}
            style={s.backButton}
            accessibilityLabel="Kembali"
          >
            <ChevronLeftIcon size={18} color="#1F2A44" strokeWidth={2.3} />
          </TouchableOpacity>

          <View style={s.headerCenter}>
            <Text style={s.headerOverline}>ULASAN KARTU</Text>
            <Text style={s.headerTitle}>{namaTopik}</Text>
          </View>

          <View style={s.threeDotsRow}>
            <View style={[s.dotSmall, { backgroundColor: '#F59E0B' }]} />
            <View style={[s.dotSmall, { backgroundColor: '#F59E0B' }]} />
            <View style={[s.dotSmall, { backgroundColor: '#FDE68A' }]} />
          </View>
        </View>

        <ScrollView
          style={s.scroll}
          contentContainerStyle={s.reviewScrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Cream Encouragement Banner with Robot */}
          <View style={s.reviewBanner}>
            <View style={s.reviewBannerLeft}>
              <View style={s.reviewCountPill}>
                <View style={s.reviewCountDot} />
                <Text style={s.reviewCountText}>3 kartu perlu diulang</Text>
              </View>
              <Text style={s.reviewBannerTitle}>
                Tidak apa-apa! Mengulang bikin makin paham.
              </Text>
            </View>
            <ReviewBannerRobot />
          </View>

          {/* Main Blue Review Card */}
          <View style={s.reviewBlueCard}>
            {/* Top Pills Row */}
            <View style={s.cardTopRow}>
              <View style={s.studyingYellowPill}>
                <LightningBoltIcon size={12} color="#1F2A44" />
                <Text style={s.studyingYellowText}>Sedang dipelajari</Text>
              </View>

              <View style={s.selfRatedPill}>
                <View style={s.selfRatedDot} />
                <Text style={s.selfRatedPrefix}>Kamu menilai: </Text>
                <Text style={s.selfRatedValue}>Sedang</Text>
              </View>
            </View>

            {/* Review Question Text */}
            <Text style={s.reviewQuestionText}>
              Apa yang terjadi pada nilai lama saat variabel diberi nilai baru?
            </Text>

            {/* Dark Code Box */}
            <View style={s.reviewCodeBox}>
              <Text style={s.codeCommentLine}># ulangi kartu ini</Text>
              <Text style={s.codeLine}>
                <Text style={{ color: '#60A5FA' }}>skor</Text>
                <Text style={{ color: '#E2E8F0' }}>{' = '}</Text>
                <Text style={{ color: '#4ADE80' }}>70</Text>
              </Text>
              <Text style={s.codeLine}>
                <Text style={{ color: '#60A5FA' }}>skor</Text>
                <Text style={{ color: '#E2E8F0' }}>{' = '}</Text>
                <Text style={{ color: '#4ADE80' }}>85</Text>
              </Text>
              <Text style={s.codeLine}>
                <Text style={{ color: '#C084FC' }}>print</Text>
                <Text style={{ color: '#E2E8F0' }}>(skor) </Text>
                <Text style={{ color: '#FACC15' }}># ?</Text>
              </Text>
            </View>

            {/* Bottom Concept & Counter Row */}
            <View style={s.reviewCardFooter}>
              <Text style={s.reviewConceptText}>
                Konsep: Variable Reassignment
              </Text>
              <Text style={s.reviewCardCountText}>Kartu 2 dari 5</Text>
            </View>
          </View>
        </ScrollView>

        {/* Bottom Footer Buttons: Ulangi Lagi & Lanjutkan -> */}
        <View style={s.footer}>
          <View style={s.explanationFooterRow}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                setIsFlipped(false);
                setStep('card');
              }}
              style={s.repeatOutlineBtn}
            >
              <RotateCcwIcon size={16} color="#2554E8" />
              <Text style={s.repeatOutlineText}>Ulangi Lagi</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => setStep('completed')}
              style={[s.primaryBtnOuter, { flex: 1, marginLeft: 12 }]}
            >
              <View style={s.primaryBtnInner}>
                <Text style={[s.primaryBtnText, { marginRight: 8 }]}>
                  Lanjutkan
                </Text>
                <ArrowRightIcon size={17} color="#FFFFFF" strokeWidth={2.5} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // ============================================================================
  // RENDER FRAMES 08, 09, 10: QUESTION <-> EXPLANATION (ANIMATED FLIP) & ASSESSMENT
  // ============================================================================
  return (
    <SafeAreaView style={s.safeArea}>
      {/* Top Header */}
      <View style={s.header}>
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={() => (fromQuiz ? navigation.goBack() : handleBack())}
          style={s.backButton}
          accessibilityLabel="Kembali"
        >
          <ArrowLeftIcon size={18} color="#1F2A44" strokeWidth={2.3} />
        </TouchableOpacity>

        <View style={s.headerCenter}>
          <Text style={s.headerOverline}>
            {fromQuiz ? 'KARTU TERKAIT' : 'FLASHCARD'}
          </Text>
          <Text style={s.headerTitle}>{namaTopik}</Text>
          {fromQuiz && (
            <View style={s.fromQuizPill}>
              <LinkChainIcon size={12} color="#E11D48" />
              <Text style={s.fromQuizPillText}>
                Dari Kuis • Soal {questionNumber}
              </Text>
            </View>
          )}
        </View>

        {fromQuiz ? (
          <View style={{ width: 38 }} />
        ) : (
          <View style={s.counterPill}>
            <Text style={s.counterPillText}>
              {idx + 1} dari {totalCardsCount}
            </Text>
          </View>
        )}
      </View>

      {/* Progress Bar */}
      {!fromQuiz && (
        <View style={s.progressTrack}>
          <View style={[s.progressFill, { width: `${pct}%` }]} />
        </View>
      )}

      {/* Main Content Area */}
      <ScrollView
        style={s.scroll}
        contentContainerStyle={[
          s.scrollContent,
          step === 'assessment' && s.scrollContentCentered,
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* STEP 'card': ANIMATED FLIP BETWEEN QUESTION (08) & EXPLANATION (09) */}
        {step === 'card' && (
          <View style={s.stageWrap}>
            <Animated.View
              style={[
                s.animatedCardContainer,
                {
                  transform: [
                    { scaleX: cardScaleX },
                    { scaleY: cardScaleY },
                  ],
                },
              ]}
            >
              {!isFlipped ? (
                /* FRONT SIDE: QUESTION CARD (FlipCode - 08) */
                <TouchableOpacity
                  activeOpacity={0.94}
                  onPress={() => triggerCardFlip(true)}
                  style={s.questionCard}
                >
                  {/* Top Row inside Card */}
                  <View style={s.cardTopRow}>
                    <View style={s.codeIconBox}>
                      <CodeSlashIcon size={16} color="#FFFFFF" />
                    </View>

                    <View style={s.statusPill}>
                      <View style={s.statusDotGreen} />
                      <Text style={s.statusPillText}>{current.statusLabel}</Text>
                    </View>
                  </View>

                  {/* Middle Question Block */}
                  <View style={s.questionCenterBlock}>
                    <Text style={s.questionOverline}>PERTANYAAN</Text>
                    <View style={s.questionFlowRow}>
                      {current.pertanyaanParts.map((part, i) => {
                        if (part.type === 'codeValid') {
                          return (
                            <View key={i} style={s.inlineCodeValid}>
                              <Text style={s.inlineCodeValidText}>
                                {part.text}
                              </Text>
                            </View>
                          );
                        }
                        if (part.type === 'codeInvalid') {
                          return (
                            <View key={i} style={s.inlineCodeInvalid}>
                              <Text style={s.inlineCodeInvalidText}>
                                {part.text}
                              </Text>
                            </View>
                          );
                        }
                        return (
                          <Text key={i} style={s.questionMainText}>
                            {part.text}
                          </Text>
                        );
                      })}
                    </View>
                  </View>

                  {/* Bottom Flip Hint inside Card */}
                  <View style={s.cardBottomHintWrap}>
                    <View style={s.cardDivider} />
                    <View style={s.cardFlipHintRow}>
                      <FlipArrowsIcon color="rgba(255,255,255,0.85)" size={14} />
                      <Text style={s.cardFlipHintText}>
                        Ketuk kartu untuk membalik
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ) : (
                /* BACK SIDE: EXPLANATION CARD (FlipCode - 09) */
                <TouchableOpacity
                  activeOpacity={0.95}
                  onPress={() => triggerCardFlip(false)}
                  style={s.explanationCard}
                >
                  {/* Top Row inside Dark Card */}
                  <View style={s.cardTopRow}>
                    <View style={s.explanationBadge}>
                      <OpenBookOutlineIcon size={13} color="#60A5FA" />
                      <Text style={s.explanationBadgeText}>Penjelasan</Text>
                    </View>

                    <TouchableOpacity
                      activeOpacity={0.75}
                      onPress={() => triggerCardFlip(false)}
                      style={s.miniFlipCircle}
                      accessibilityLabel="Balik ke pertanyaan"
                    >
                      <FlipArrowsIcon color="#94A3B8" size={14} />
                    </TouchableOpacity>
                  </View>

                  {/* Title & Description */}
                  <Text style={s.explanationTitle}>
                    {current.judulPenjelasan}
                  </Text>
                  <Text style={s.explanationDesc}>{current.penjelasan}</Text>

                  {/* Code Examples (Valid & Invalid) */}
                  <View style={s.codeExamplesGroup}>
                    <View style={[s.codeRowBox, s.codeRowValid]}>
                      <View style={s.codeStatusCircleGreen}>
                        <CheckIcon size={12} color="#FFFFFF" strokeWidth={3} />
                      </View>
                      <Text style={s.codeSnippetText}>
                        <Text style={{ color: '#4ADE80' }}>
                          {current.kodeBenar.lhs}
                        </Text>
                        <Text style={{ color: '#94A3B8' }}>{' = '}</Text>
                        <Text style={{ color: '#FDE68A' }}>
                          {current.kodeBenar.rhs}
                        </Text>
                      </Text>
                    </View>

                    <View style={[s.codeRowBox, s.codeRowInvalid]}>
                      <View style={s.codeStatusCircleRed}>
                        <CloseIcon size={12} color="#FFFFFF" strokeWidth={3} />
                      </View>
                      <Text style={s.codeSnippetText}>
                        <Text style={{ color: '#FB7185' }}>
                          {current.kodeSalah.lhs}
                        </Text>
                        <Text style={{ color: '#94A3B8' }}>{' = '}</Text>
                        <Text style={{ color: '#E2E8F0' }}>
                          {current.kodeSalah.rhs}
                        </Text>
                      </Text>
                    </View>
                  </View>

                  {/* Yellow Tips Box inside Card */}
                  <View style={s.tipsYellowBox}>
                    <LightbulbIcon
                      size={15}
                      color="#D97706"
                      style={{ marginTop: 1, marginRight: 8 }}
                    />
                    <Text style={s.tipsYellowText}>
                      <Text style={s.tipsYellowBold}>Tips: </Text>
                      {current.tipsHighlight ? (
                        <>
                          {current.tipsPrefix}
                          <Text style={s.tipsInlineUnderscore}>
                            {` ${current.tipsHighlight} `}
                          </Text>
                          {current.tipsSuffix}
                        </>
                      ) : (
                        current.tips
                      )}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            </Animated.View>

            {/* Sub-card Hint (only shown on Question side) */}
            {!isFlipped && (
              <View style={s.belowCardHintRow}>
                <LightbulbIcon size={14} color="#94A3B8" />
                <Text style={s.belowCardHintText}>
                  Coba jawab sebelum melihat penjelasan.
                </Text>
              </View>
            )}
          </View>
        )}

        {/* STEP 'assessment': SELF-ASSESSMENT (FlipCode - 10) */}
        {step === 'assessment' && (
          <View style={s.assessmentContainer}>
            <Text style={s.assessmentTitle}>Seberapa paham kamu?</Text>
            <Text style={s.assessmentSubtitle}>
              Jujur saja, Flip akan menyesuaikan ulangannya.
            </Text>

            {/* 3 Option Cards: Sulit, Sedang, Mudah */}
            <View style={s.ratingRow}>
              {[
                { key: 'sulit', label: 'Sulit', activeBg: '#EF4444' },
                { key: 'sedang', label: 'Sedang', activeBg: '#F59E0B' },
                { key: 'mudah', label: 'Mudah', activeBg: '#10B981' },
              ].map((opt) => {
                const isSelected = rating === opt.key;
                return (
                  <TouchableOpacity
                    key={opt.key}
                    activeOpacity={0.85}
                    onPress={() => setRating(opt.key)}
                    style={[
                      s.ratingCard,
                      isSelected && {
                        backgroundColor: opt.activeBg,
                        borderColor: opt.activeBg,
                      },
                    ]}
                  >
                    {isSelected && (
                      <View style={s.selectedCornerBadge}>
                        <CheckIcon size={11} color="#FFFFFF" strokeWidth={3} />
                      </View>
                    )}

                    <FaceEmojiIcon type={opt.key} selected={isSelected} />

                    <Text
                      style={[
                        s.ratingLabel,
                        isSelected && s.ratingLabelSelected,
                      ]}
                    >
                      {opt.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Status Indicator Pill */}
            <View
              style={[
                s.markedPill,
                rating !== 'mudah' && { backgroundColor: '#FEF3C7' },
              ]}
            >
              <Text style={s.markedPillPrefix}>Kartu ini ditandai </Text>
              <View
                style={[
                  s.markedPillDot,
                  {
                    backgroundColor:
                      rating === 'mudah' ? '#10B981' : '#D97706',
                  },
                ]}
              />
              <Text
                style={[
                  s.markedPillStatus,
                  {
                    color: rating === 'mudah' ? '#10B981' : '#B45309',
                  },
                ]}
              >
                {rating === 'mudah' ? 'Dikuasai' : 'Sedang dipelajari'}
              </Text>
            </View>

            {/* Footnote */}
            <Text style={s.assessmentFootnote}>
              Sulit / Sedang → Sedang dipelajari • Mudah → Dikuasai
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Bottom Footer Actions */}
      <View style={s.footer}>
        {fromQuiz ? (
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => navigation.goBack()}
            style={s.primaryBtnOuter}
          >
            <View style={s.primaryBtnInner}>
              <ArrowLeftIcon size={18} color="#FFFFFF" strokeWidth={2.5} />
              <Text style={[s.primaryBtnText, { marginLeft: 8 }]}>
                Kembali ke Kuis
              </Text>
            </View>
          </TouchableOpacity>
        ) : (
          step === 'card' &&
          isFlipped && (
            <View style={s.explanationFooterRow}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => triggerCardFlip(false)}
                style={s.undoButton}
                accessibilityLabel="Kembalikan kartu"
              >
                <UndoCornerLeftIcon size={20} color="#1F2A44" />
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => setStep('assessment')}
                style={[s.primaryBtnOuter, { flex: 1, marginLeft: 12 }]}
              >
                <View style={s.primaryBtnInner}>
                  <Text style={s.primaryBtnText}>Nilai Pemahamanku</Text>
                </View>
              </TouchableOpacity>
            </View>
          )
        )}

        {step === 'assessment' && (
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleSaveAssessment}
            style={s.primaryBtnOuter}
          >
            <View style={s.primaryBtnInner}>
              <Text style={[s.primaryBtnText, { marginRight: 8 }]}>
                Simpan & Lanjut
              </Text>
              <ArrowRightIcon size={18} color="#FFFFFF" strokeWidth={2.5} />
            </View>
          </TouchableOpacity>
        )}
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
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E6ECF5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: {
    alignItems: 'center',
  },
  headerOverline: {
    fontFamily: fonts.bold,
    fontSize: 10,
    letterSpacing: 1,
    color: '#94A3B8',
  },
  headerTitle: {
    fontFamily: fonts.extrabold,
    fontSize: 15.5,
    color: '#1F2A44',
    marginTop: 1,
  },
  fromQuizPill: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF1F2',
    borderWidth: 1,
    borderColor: '#FECDD3',
    borderRadius: 999,
    paddingVertical: 4,
    paddingHorizontal: 11,
  },
  fromQuizPillText: {
    fontFamily: fonts.bold,
    fontSize: 11,
    color: '#E11D48',
    marginLeft: 5,
  },
  counterPill: {
    backgroundColor: '#EDF2FF',
    borderRadius: 999,
    paddingVertical: 5,
    paddingHorizontal: 11,
  },
  counterPillText: {
    fontFamily: fonts.extrabold,
    fontSize: 11.5,
    color: '#2554E8',
  },
  threeDotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 4,
  },
  dotSmall: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  progressTrack: {
    height: 6,
    borderRadius: 999,
    backgroundColor: '#E2ECFF',
    marginHorizontal: 20,
    marginTop: 4,
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
    paddingHorizontal: 22,
    paddingTop: 26,
    paddingBottom: 20,
  },
  scrollContentCentered: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  stageWrap: {
    alignItems: 'center',
    width: '100%',
  },
  animatedCardContainer: {
    width: '100%',
  },
  questionCard: {
    width: '100%',
    minHeight: 380,
    backgroundColor: '#2554E8',
    borderRadius: 26,
    padding: 24,
    justifyContent: 'space-between',
    transform: [{ rotate: '-1.2deg' }],
    shadowColor: '#2554E8',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 8,
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  codeIconBox: {
    width: 36,
    height: 36,
    borderRadius: 11,
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.24)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    borderRadius: 999,
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  statusDotGreen: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#2ED47A',
    marginRight: 6,
  },
  statusPillText: {
    fontFamily: fonts.bold,
    fontSize: 11.5,
    color: '#FFFFFF',
  },
  questionCenterBlock: {
    marginVertical: 20,
  },
  questionOverline: {
    fontFamily: fonts.bold,
    fontSize: 10.5,
    letterSpacing: 1,
    color: 'rgba(255, 255, 255, 0.72)',
    marginBottom: 10,
  },
  questionFlowRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    rowGap: 6,
  },
  questionMainText: {
    fontFamily: fonts.extrabold,
    fontSize: 22,
    lineHeight: 31,
    color: '#FFFFFF',
  },
  inlineCodeValid: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    paddingHorizontal: 9,
    paddingVertical: 2,
    marginHorizontal: 2,
  },
  inlineCodeValidText: {
    fontFamily: fonts.bold,
    fontSize: 19,
    color: '#FFFFFF',
  },
  inlineCodeInvalid: {
    backgroundColor: 'rgba(244, 63, 94, 0.35)',
    borderRadius: 8,
    paddingHorizontal: 9,
    paddingVertical: 2,
    marginHorizontal: 2,
  },
  inlineCodeInvalidText: {
    fontFamily: fonts.bold,
    fontSize: 19,
    color: '#FECDD3',
  },
  cardBottomHintWrap: {
    width: '100%',
  },
  cardDivider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    marginBottom: 14,
  },
  cardFlipHintRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardFlipHintText: {
    fontFamily: fonts.semibold,
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.85)',
    marginLeft: 7,
  },
  belowCardHintRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 22,
  },
  belowCardHintText: {
    fontFamily: fonts.medium,
    fontSize: 12,
    color: '#94A3B8',
    marginLeft: 5,
  },
  explanationCard: {
    width: '100%',
    minHeight: 385,
    backgroundColor: '#132247',
    borderRadius: 26,
    padding: 22,
    justifyContent: 'space-between',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 18,
    elevation: 6,
  },
  explanationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(56, 189, 248, 0.14)',
    borderRadius: 999,
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  explanationBadgeText: {
    fontFamily: fonts.bold,
    fontSize: 11.5,
    color: '#93C5FD',
    marginLeft: 6,
  },
  miniFlipCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  explanationTitle: {
    fontFamily: fonts.extrabold,
    fontSize: 21,
    lineHeight: 27,
    color: '#FFFFFF',
    marginTop: 14,
  },
  explanationDesc: {
    fontFamily: fonts.medium,
    fontSize: 13,
    lineHeight: 19.5,
    color: '#94A3B8',
    marginTop: 6,
  },
  codeExamplesGroup: {
    marginTop: 16,
    gap: 10,
  },
  codeRowBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0B152E',
    borderRadius: 14,
    paddingVertical: 11,
    paddingHorizontal: 14,
    borderWidth: 1,
  },
  codeRowValid: {
    borderColor: 'rgba(46, 212, 122, 0.3)',
  },
  codeRowInvalid: {
    borderColor: 'rgba(244, 63, 94, 0.3)',
  },
  codeStatusCircleGreen: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#22C55E',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },
  codeStatusCircleRed: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#EF4444',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },
  codeSnippetText: {
    fontFamily: fonts.bold,
    fontSize: 13,
  },
  tipsYellowBox: {
    marginTop: 18,
    backgroundColor: '#FEF3C7',
    borderRadius: 14,
    paddingVertical: 11,
    paddingHorizontal: 13,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  tipsYellowText: {
    flex: 1,
    fontFamily: fonts.medium,
    fontSize: 11.5,
    lineHeight: 17,
    color: '#78350F',
  },
  tipsYellowBold: {
    fontFamily: fonts.extrabold,
    color: '#92400E',
  },
  tipsInlineUnderscore: {
    backgroundColor: '#FDE68A',
    fontFamily: fonts.extrabold,
    color: '#78350F',
  },
  assessmentContainer: {
    alignItems: 'center',
    width: '100%',
    paddingVertical: 12,
  },
  assessmentTitle: {
    fontFamily: fonts.extrabold,
    fontSize: 20,
    color: '#1F2A44',
    textAlign: 'center',
  },
  assessmentSubtitle: {
    fontFamily: fonts.medium,
    fontSize: 12.5,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 10,
    marginTop: 22,
  },
  ratingCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#E6ECF5',
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  selectedCornerBadge: {
    position: 'absolute',
    top: -7,
    right: -5,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#1E293B',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5,
  },
  emojiOuterCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emojiInnerCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingLabel: {
    fontFamily: fonts.bold,
    fontSize: 13,
    color: '#475569',
    marginTop: 12,
  },
  ratingLabelSelected: {
    fontFamily: fonts.extrabold,
    color: '#FFFFFF',
  },
  markedPill: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  markedPillPrefix: {
    fontFamily: fonts.semibold,
    fontSize: 11.5,
    color: '#64748B',
  },
  markedPillDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 5,
  },
  markedPillStatus: {
    fontFamily: fonts.extrabold,
    fontSize: 11.5,
  },
  assessmentFootnote: {
    marginTop: 10,
    fontFamily: fonts.medium,
    fontSize: 10.5,
    color: '#94A3B8',
    textAlign: 'center',
  },
  // ============================================================================
  // STYLES FOR FRAME 11 (REVIEW)
  // ============================================================================
  reviewScrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 20,
  },
  reviewBanner: {
    backgroundColor: '#FDF6E2',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#F9E8B8',
    paddingVertical: 12,
    paddingLeft: 16,
    paddingRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  reviewBannerLeft: {
    flex: 1,
    paddingRight: 10,
  },
  reviewCountPill: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FCE39D',
    borderRadius: 999,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  reviewCountDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#D97706',
    marginRight: 5,
  },
  reviewCountText: {
    fontFamily: fonts.extrabold,
    fontSize: 10.5,
    color: '#92400E',
  },
  reviewBannerTitle: {
    fontFamily: fonts.extrabold,
    fontSize: 12.5,
    lineHeight: 18,
    color: '#1F2A44',
    marginTop: 8,
  },
  reviewBlueCard: {
    marginTop: 14,
    backgroundColor: '#2554E8',
    borderRadius: 26,
    padding: 20,
    shadowColor: '#2554E8',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.22,
    shadowRadius: 16,
    elevation: 6,
  },
  studyingYellowPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FACC15',
    borderRadius: 999,
    paddingVertical: 5,
    paddingHorizontal: 11,
  },
  studyingYellowText: {
    fontFamily: fonts.extrabold,
    fontSize: 11,
    color: '#1F2A44',
    marginLeft: 4,
  },
  selfRatedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    borderRadius: 999,
    paddingVertical: 5,
    paddingHorizontal: 11,
  },
  selfRatedDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#FACC15',
    marginRight: 5,
  },
  selfRatedPrefix: {
    fontFamily: fonts.semibold,
    fontSize: 10.5,
    color: 'rgba(255, 255, 255, 0.85)',
  },
  selfRatedValue: {
    fontFamily: fonts.extrabold,
    fontSize: 10.5,
    color: '#FFFFFF',
  },
  reviewQuestionText: {
    marginTop: 16,
    fontFamily: fonts.extrabold,
    fontSize: 18,
    lineHeight: 25,
    color: '#FFFFFF',
  },
  reviewCodeBox: {
    marginTop: 16,
    backgroundColor: '#0D1B3E',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    gap: 5,
  },
  codeCommentLine: {
    fontFamily: fonts.medium,
    fontStyle: 'italic',
    fontSize: 12,
    color: '#94A3B8',
    marginBottom: 2,
  },
  codeLine: {
    fontFamily: fonts.bold,
    fontSize: 13,
    lineHeight: 19,
  },
  reviewCardFooter: {
    marginTop: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  reviewConceptText: {
    fontFamily: fonts.medium,
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.72)',
  },
  reviewCardCountText: {
    fontFamily: fonts.bold,
    fontSize: 11,
    color: '#FFFFFF',
  },
  repeatOutlineBtn: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    paddingVertical: 15,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  repeatOutlineText: {
    fontFamily: fonts.extrabold,
    fontSize: 13.5,
    color: '#2554E8',
    marginLeft: 7,
  },
  // ============================================================================
  // STYLES FOR FRAME 12 (COMPLETED)
  // ============================================================================
  completedScrollContent: {
    paddingBottom: 16,
  },
  completedHeroBanner: {
    backgroundColor: '#2554E8',
    borderRadius: 28,
    height: 245,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  completedCloseBtn: {
    position: 'absolute',
    top: 16,
    left: 18,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  completedBody: {
    paddingHorizontal: 22,
    paddingTop: 22,
    alignItems: 'center',
  },
  completedTitle: {
    fontFamily: fonts.extrabold,
    fontSize: 22,
    color: '#1F2A44',
    textAlign: 'center',
  },
  completedSubtitle: {
    fontFamily: fonts.semibold,
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 4,
  },
  statsRow: {
    flexDirection: 'row',
    width: '100%',
    gap: 10,
    marginTop: 20,
  },
  statBox: {
    flex: 1,
    borderRadius: 18,
    borderWidth: 1,
    paddingVertical: 14,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  statBoxBlue: {
    backgroundColor: '#EEF2FF',
    borderColor: '#DDE7FF',
  },
  statBoxGreen: {
    backgroundColor: '#ECFDF5',
    borderColor: '#D1FAE5',
  },
  statBoxYellow: {
    backgroundColor: '#FFFBEB',
    borderColor: '#FDE68A',
  },
  statNumber: {
    fontFamily: fonts.extrabold,
    fontSize: 22,
  },
  statLabel: {
    fontFamily: fonts.semibold,
    fontSize: 11,
    lineHeight: 15,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 4,
  },
  masteryCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#E6ECF5',
    padding: 16,
    marginTop: 14,
  },
  masteryHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  masteryTitle: {
    fontFamily: fonts.extrabold,
    fontSize: 13,
    color: '#1F2A44',
  },
  masteryPct: {
    fontFamily: fonts.extrabold,
    fontSize: 13,
    color: '#1F2A44',
  },
  masteryTrack: {
    height: 9,
    borderRadius: 999,
    backgroundColor: '#E2E8F0',
    marginTop: 10,
    overflow: 'hidden',
  },
  masteryFill: {
    width: '70%',
    height: '100%',
    borderRadius: 999,
    backgroundColor: '#10B981',
  },
  masteryNote: {
    fontFamily: fonts.medium,
    fontSize: 11.5,
    color: '#64748B',
    marginTop: 8,
    marginLeft: 10,
  },
  completedFooter: {
    paddingHorizontal: 22,
    paddingBottom: 20,
    paddingTop: 6,
  },
  repeatLinkBtn: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
  },
  repeatLinkText: {
    fontFamily: fonts.extrabold,
    fontSize: 13.5,
    color: '#2554E8',
    marginLeft: 6,
  },
  // ============================================================================
  // SHARED FOOTER BUTTONS
  // ============================================================================
  footer: {
    paddingHorizontal: 22,
    paddingBottom: 20,
    paddingTop: 6,
  },
  explanationFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  undoButton: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E6ECF5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtnOuter: {
    backgroundColor: '#1B3FB5',
    borderRadius: 18,
    paddingBottom: 4,
  },
  primaryBtnInner: {
    backgroundColor: '#2554E8',
    borderRadius: 18,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtnText: {
    fontFamily: fonts.extrabold,
    fontSize: 15,
    color: '#FFFFFF',
  },
});
