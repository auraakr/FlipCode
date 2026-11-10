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
import { Level, TopicState } from '../constants/enums';
import {
  CloseIcon,
  LightningBoltIcon,
  ChevronLeftIcon,
  StarOutlineIcon,
  ArrowUpRightIcon,
  ArrowRightIcon,
  CheckIcon,
  TargetBullseyeIcon,
  RotateCcwIcon,
  ArrowDownIcon,
} from '../../assets/icons/AppIcons';
import {
  QuizResultMascot,
  ScoreBadgeRing,
} from '../../assets/illustrations/MascotIllustrations';

export default function QuizResultScreen({ route, navigation }) {
  const topicId = route?.params?.topicId || 'variabel';
  const hasil = route?.params?.hasil;
  const topik = ContentRepository.getTopicById(topicId);
  const namaTopik = topik?.nama || 'Variabel';

  const [showReview, setShowReview] = useState(false);

  if (!hasil) {
    return (
      <SafeAreaView style={[s.safeArea, { alignItems: 'center', justifyContent: 'center', padding: 24 }]}>
        <Text style={{ fontFamily: fonts.bold, fontSize: 15, color: '#1F2A44', textAlign: 'center' }}>
          Hasil kuis tidak tersedia.
        </Text>
        <TouchableOpacity onPress={() => navigation.replace('MainTabs')} style={{ marginTop: 16 }}>
          <Text style={{ fontFamily: fonts.extrabold, fontSize: 14, color: '#2554E8' }}>Kembali</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  // Semua nilai di bawah ini berasal dari respons POST /quiz/submit.
  const total = hasil.total ?? 0;
  const benarCount = hasil.benar ?? 0;
  const pctBenar = total ? Math.round((benarCount / total) * 100) : 0;
  const prevLevel = route?.params?.level || Level.MUDAH;
  const nextLevel = hasil.adapt?.nextLevel || prevLevel;
  const detail = hasil.detail || [];
  const questions = route?.params?.questions || [];
  const mastered = hasil.topicState === TopicState.DIKUASAI;
  const resultDots = detail.length
    ? detail.map((d) => !!d.benar)
    : Array.from({ length: total }, (_, i) => i < benarCount);
  const scoreNote = `Benar ${benarCount} dari ${total} • ${pctBenar}%`;

  // Arah perubahan level ditentukan server (adapt.delta).
  const delta = hasil.adapt?.delta ?? 0;
  const mode = delta > 0 ? 'up' : delta === 0 ? 'same' : 'down';

  // Syarat naik level: >20% benar -> Sedang, >=80% benar -> Sulit.
  const needSedang = Math.floor(total * 0.2 + 1e-9) + 1;
  const needSulit = Math.ceil(total * 0.8 - 1e-9);
  const targetText =
    nextLevel === Level.MUDAH
      ? `Jawab minimal ${needSedang} soal dengan benar untuk naik ke Sedang.`
      : nextLevel === Level.SEDANG
      ? `Jawab minimal ${needSulit} soal dengan benar untuk naik ke Sulit.`
      : mastered
      ? 'Topik ini sudah kamu kuasai.'
      : 'Pertahankan nilai ≥80% dan kuasai ≥70% kartu untuk menguasai topik.';

  // Kartu terkait soal yang salah (dari server) -> saran ulang flashcard.
  const repeatIds = new Set();
  detail.forEach((d) => !d.benar && (d.relatedCardIds || []).forEach((id) => repeatIds.add(id)));
  const repeatText = repeatIds.size
    ? `Ulangi ${repeatIds.size} kartu terkait soal yang salah dulu.`
    : 'Ulangi flashcard topik ini dulu.';

  const toggleReview = () => setShowReview((v) => !v);
  const continueAction = () =>
    mastered
      ? navigation.navigate('TopicCompleted', { topicId })
      : navigation.replace('Quiz', { topicId });

  // Kotak level (Sebelumnya / Sekarang) sesuai level asli.
  const LEVEL_BOX = {
    [Level.MUDAH]: { soft: s.levelBoxGreenSoft, text: s.levelTextGreen, solid: '#10B981' },
    [Level.SEDANG]: { soft: s.levelBoxYellowSoft, text: s.levelTextYellow, solid: '#F59E0B' },
    [Level.SULIT]: {
      soft: [s.levelBoxYellowSoft, { backgroundColor: '#FFE4E6' }],
      text: [s.levelTextYellow, { color: '#E11D48' }],
      solid: '#EF4444',
    },
  };
  const levelBox = (level, solid) => {
    const cfg = LEVEL_BOX[level] || LEVEL_BOX[Level.MUDAH];
    return solid ? (
      <View style={[s.levelBoxGreenSolid, { backgroundColor: cfg.solid }]}>
        <Text style={s.levelTextWhite}>{level}</Text>
      </View>
    ) : (
      <View style={cfg.soft}>
        <Text style={cfg.text}>{level}</Text>
      </View>
    );
  };

  // Pembahasan tiap soal (soal dikirim dari layar kuis, kunci & penjelasan dari server).
  const reviewList = showReview ? (
    <View style={s.reviewList}>
      {questions.map((q, i) => {
        const d = detail.find((x) => x.questionId === q.id) || {};
        return (
          <View key={q.id} style={s.reviewItem}>
            <Text style={s.reviewQ}>
              {i + 1}. {q.pertanyaan}
            </Text>
            <Text style={[s.reviewA, { color: d.benar ? '#10B981' : '#EF4444' }]}>
              Jawabanmu: {q.pilihan?.[d.dipilih] ?? '—'}
            </Text>
            {!d.benar && (
              <Text style={[s.reviewA, { color: '#10B981' }]}>
                Jawaban benar: {q.pilihan?.[d.jawabanBenar]}
              </Text>
            )}
            {d.penjelasan ? <Text style={s.reviewExp}>{d.penjelasan}</Text> : null}
          </View>
        );
      })}
    </View>
  ) : null;
  const reviewToggle = (
    <TouchableOpacity activeOpacity={0.75} onPress={toggleReview} style={s.reviewToggle}>
      <Text style={s.secondaryLinkText}>{showReview ? 'Sembunyikan Pembahasan' : 'Lihat Pembahasan'}</Text>
    </TouchableOpacity>
  );

  const handleClose = () => {
    navigation.replace('MainTabs');
  };

  // ============================================================================
  // FRAME 18: LEVEL INCREASED (mode === 'up')
  // ============================================================================
  if (mode === 'up') {
    const dots = resultDots;
    return (
      <SafeAreaView style={s.safeArea} edges={['top', 'bottom']}>
        <ScrollView
          style={s.scroll}
          contentContainerStyle={s.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Blue Hero Banner */}
          <View style={[s.heroBanner, { backgroundColor: '#2554E8' }]}>
            {/* Top Bar inside Banner */}
            <View style={s.bannerTopBar}>
              <TouchableOpacity
                activeOpacity={0.75}
                onPress={handleClose}
                style={s.closeCircleTranslucent}
              >
                <CloseIcon size={15} color="#FFFFFF" strokeWidth={2.3} />
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                style={s.quizPillTranslucent}
              >
                <LightningBoltIcon size={12} color="#FFFFFF" />
                <Text style={s.quizPillTextWhite}>Kuis {namaTopik}</Text>
              </TouchableOpacity>
            </View>

            {/* Decorative Sparkles inside Blue Banner */}
            <View style={[s.decorItem, { top: 64, left: 26 }]}>
              <ChevronLeftIcon size={14} color="#FACC15" strokeWidth={3} />
            </View>
            <View style={[s.decorItem, { top: 72, right: 28 }]}>
              <StarOutlineIcon size={16} color="#FFFFFF" />
            </View>
            <View style={[s.decorItem, { bottom: 48, left: 32 }]}>
              <View
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: 'rgba(255,255,255,0.7)',
                }}
              />
            </View>
            <View style={[s.decorItem, { bottom: 52, right: 34 }]}>
              <ArrowUpRightIcon size={16} color="rgba(255,255,255,0.65)" />
            </View>

            <QuizResultMascot mode="up" />
          </View>

          {/* Overlapping Score Ring: 4/5 */}
          <ScoreBadgeRing score={benarCount} total={total} mode="up" />

          {/* Main Content */}
          <View style={s.bodyWrap}>
            <Text style={s.title}>Level naik! 🚀</Text>
            <Text style={s.subtitle}>
              {mastered ? 'Topik ini sudah kamu kuasai! 🎉' : 'Kamu siap untuk tantangan berikutnya.'}
            </Text>

            {/* Level Transition & Score Dots Card */}
            <View style={s.mainCard}>
              <View style={s.levelRow}>
                <View style={s.levelCol}>
                  <Text style={s.levelColLabel}>SEBELUMNYA</Text>
                  {levelBox(prevLevel)}
                </View>

                <View style={s.arrowCircleBlue}>
                  <ArrowRightIcon size={15} color="#FFFFFF" strokeWidth={2.5} />
                </View>

                <View style={s.levelCol}>
                  <Text style={s.levelColLabel}>SEKARANG</Text>
                  {levelBox(nextLevel)}
                </View>
              </View>

              <View style={s.cardDivider} />

              <View style={s.dotsFooterRow}>
                <View style={s.dotsGroup}>
                  {dots.map((ok, i) => (
                    <View
                      key={i}
                      style={[
                        s.dotCircleSolid,
                        { backgroundColor: ok ? '#2ED47A' : '#EF4444' },
                      ]}
                    >
                      {ok ? (
                        <CheckIcon size={11} color="#FFFFFF" strokeWidth={3} />
                      ) : (
                        <CloseIcon size={11} color="#FFFFFF" strokeWidth={3} />
                      )}
                    </View>
                  ))}
                </View>
                <Text style={s.ruleNoteText}>{scoreNote}</Text>
              </View>
            </View>
          </View>
        {reviewList}
        </ScrollView>

        {/* Bottom Actions */}
        <View style={s.footer}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={continueAction}
            style={s.primaryBtnOuter}
          >
            <View style={s.primaryBtnInner}>
              <Text style={[s.primaryBtnText, { marginRight: 8 }]}>
                {mastered ? 'Selesaikan Topik' : `Lanjut ke Level ${nextLevel}`}
              </Text>
              <ArrowRightIcon size={17} color="#FFFFFF" strokeWidth={2.5} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.75}
            onPress={toggleReview}
            style={s.secondaryLinkBtn}
          >
            <Text style={s.secondaryLinkText}>{showReview ? 'Sembunyikan Pembahasan' : 'Lihat Pembahasan'}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // ============================================================================
  // FRAME 19: LEVEL MAINTAINED (mode === 'same')
  // ============================================================================
  if (mode === 'same') {
    const dots = resultDots;
    return (
      <SafeAreaView style={s.safeArea} edges={['top', 'bottom']}>
        <ScrollView
          style={s.scroll}
          contentContainerStyle={s.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Warm Cream-Yellow Hero Banner */}
          <View style={[s.heroBanner, { backgroundColor: '#FDF2D0' }]}>
            <View style={s.bannerTopBar}>
              <TouchableOpacity
                activeOpacity={0.75}
                onPress={handleClose}
                style={s.closeCircleWhite}
              >
                <CloseIcon size={15} color="#1F2A44" strokeWidth={2.3} />
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                style={s.quizPillYellow}
              >
                <View
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: '#D97706',
                    marginRight: 6,
                  }}
                />
                <Text style={s.quizPillTextYellow}>Kuis {namaTopik}</Text>
              </TouchableOpacity>
            </View>

            <QuizResultMascot mode="same" />
          </View>

          {/* Overlapping Score Ring: 3/5 */}
          <ScoreBadgeRing score={benarCount} total={total} mode="same" />

          <View style={s.bodyWrap}>
            <Text style={s.title}>{`Levelmu tetap ${nextLevel}`}</Text>
            <Text style={s.subtitle}>Bagus! Pemahamanmu sudah stabil.</Text>

            {/* Card 1: Level Comparison */}
            <View style={s.mainCard}>
              <View style={s.levelRow}>
                <View style={s.levelCol}>
                  <Text style={s.levelColLabel}>SEBELUMNYA</Text>
                  {levelBox(prevLevel)}
                </View>

                <View style={s.equalCircleYellow}>
                  <Text style={s.equalSignText}>=</Text>
                </View>

                <View style={s.levelCol}>
                  <Text style={s.levelColLabel}>SEKARANG</Text>
                  {levelBox(nextLevel, true)}
                </View>
              </View>
            </View>

            {/* Card 2: 5 Score Circles Centered */}
            <View style={[s.mainCard, { alignItems: 'center', marginTop: 10 }]}>
              <View style={[s.dotsGroup, { gap: 8 }]}>
                {dots.map((ok, i) => (
                  <View
                    key={i}
                    style={[
                      s.dotCircleMedium,
                      { backgroundColor: ok ? '#2ED47A' : '#EF4444' },
                    ]}
                  >
                    {ok ? (
                      <CheckIcon size={12} color="#FFFFFF" strokeWidth={3} />
                    ) : (
                      <CloseIcon size={12} color="#FFFFFF" strokeWidth={3} />
                    )}
                  </View>
                ))}
              </View>
              <Text style={[s.ruleNoteText, { marginTop: 8 }]}>
                {scoreNote}
              </Text>
            </View>

            {/* Card 3: Target Tip Box */}
            <View style={s.targetInfoCard}>
              <View style={s.targetIconBox}>
                <TargetBullseyeIcon size={18} color="#FFFFFF" />
              </View>
              <Text style={s.targetInfoText}>{targetText}</Text>
            </View>
          </View>
        {reviewToggle}
          {reviewList}
        </ScrollView>

        {/* Bottom Actions */}
        <View style={s.footer}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => navigation.replace('Quiz', { topicId })}
            style={s.primaryBtnOuter}
          >
            <View style={s.primaryBtnInner}>
              <RotateCcwIcon size={16} color="#FFFFFF" />
              <Text style={[s.primaryBtnText, { marginLeft: 8 }]}>
                Coba Kuis Lagi
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.75}
            onPress={() => navigation.replace('Flashcard', { topicId })}
            style={s.secondaryLinkBtn}
          >
            <Text style={s.secondaryLinkText}>Ulangi Flashcard</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // ============================================================================
  // FRAME 20: LEVEL DECREASED (mode === 'down')
  // ============================================================================
  const downDots = resultDots;
  return (
    <SafeAreaView style={s.safeArea} edges={['top', 'bottom']}>
      <ScrollView
        style={s.scroll}
        contentContainerStyle={s.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Soft Blush Pink Hero Banner */}
        <View style={[s.heroBanner, { backgroundColor: '#FFE8E8' }]}>
          <View style={s.bannerTopBar}>
            <TouchableOpacity
              activeOpacity={0.75}
              onPress={handleClose}
              style={s.closeCircleWhite}
            >
              <CloseIcon size={15} color="#64748B" strokeWidth={2.3} />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={s.quizPillPink}
            >
              <View
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: '#EF4444',
                  marginRight: 6,
                }}
              />
              <Text style={s.quizPillTextPink}>Kuis {namaTopik}</Text>
            </TouchableOpacity>
          </View>

          <QuizResultMascot mode="down" />
        </View>

        {/* Overlapping Score Ring: 2/5 */}
        <ScoreBadgeRing score={benarCount} total={total} mode="down" />

        <View style={s.bodyWrap}>
          <Text style={s.title}>Kita ulang pelan-pelan, ya</Text>
          <Text style={s.subtitle}>
            Level disesuaikan agar kamu makin paham.
          </Text>

          {/* Card 1: Level Transition (Sedang ↓ Mudah) + Score Dots */}
          <View style={s.mainCard}>
            <View style={s.levelRow}>
              <View style={s.levelCol}>
                <Text style={s.levelColLabel}>Sebelumnya</Text>
                {levelBox(prevLevel)}
              </View>

              <View style={s.arrowCircleRed}>
                <ArrowDownIcon size={15} color="#FFFFFF" strokeWidth={2.5} />
              </View>

              <View style={s.levelCol}>
                <Text style={s.levelColLabel}>Sekarang</Text>
                {levelBox(nextLevel)}
              </View>
            </View>

            <View style={s.cardDivider} />

            <View style={{ alignItems: 'center' }}>
              <View style={[s.dotsGroup, { gap: 8 }]}>
                {downDots.map((ok, i) => (
                  <View
                    key={i}
                    style={[
                      s.dotCirclePastel,
                      {
                        backgroundColor: ok ? '#DCFCE7' : '#FFE4E6',
                      },
                    ]}
                  >
                    {ok ? (
                      <CheckIcon size={10} color="#10B981" strokeWidth={3} />
                    ) : (
                      <CloseIcon size={10} color="#EF4444" strokeWidth={3} />
                    )}
                  </View>
                ))}
              </View>
              <Text style={[s.ruleNoteText, { marginTop: 8 }]}>
                {scoreNote}
              </Text>
            </View>
          </View>

          {/* Card 2: Repeat 3 Cards Suggestion */}
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => navigation.replace('Flashcard', { topicId })}
            style={s.repeatCardsBanner}
          >
            <View style={s.targetIconBox}>
              <RotateCcwIcon size={16} color="#FFFFFF" />
            </View>
            <Text style={s.repeatCardsBannerText}>
              {repeatText}
            </Text>
          </TouchableOpacity>
        </View>
      {reviewToggle}
      {reviewList}
      </ScrollView>

      {/* Bottom Actions */}
      <View style={s.footer}>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => navigation.replace('Flashcard', { topicId })}
          style={s.primaryBtnOuter}
        >
          <View style={s.primaryBtnInner}>
            <RotateCcwIcon size={16} color="#FFFFFF" />
            <Text style={[s.primaryBtnText, { marginLeft: 8 }]}>
              Ulangi Flashcard
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.75}
          onPress={() => navigation.replace('TopicDetail', { topicId })}
          style={s.secondaryLinkBtn}
        >
          <Text style={s.secondaryLinkText}>Kembali ke Topik</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  reviewToggle: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  reviewList: {
    marginHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  reviewItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E8ECF4',
    padding: 14,
  },
  reviewQ: {
    fontFamily: fonts.extrabold,
    fontSize: 13.5,
    color: '#1F2A44',
    marginBottom: 6,
  },
  reviewA: {
    fontFamily: fonts.bold,
    fontSize: 12.5,
    marginTop: 2,
  },
  reviewExp: {
    fontFamily: fonts.medium,
    fontSize: 12,
    lineHeight: 18,
    color: '#64748B',
    marginTop: 8,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#FDFCF7',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 16,
    alignItems: 'center',
  },
  heroBanner: {
    width: '100%',
    height: 235,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    paddingTop: 18,
  },
  bannerTopBar: {
    position: 'absolute',
    top: 16,
    left: 18,
    right: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 10,
  },
  closeCircleTranslucent: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeCircleWhite: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  quizPillTranslucent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 13,
  },
  quizPillTextWhite: {
    fontFamily: fonts.bold,
    fontSize: 11.5,
    color: '#FFFFFF',
    marginLeft: 5,
  },
  quizPillYellow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FDE68A',
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 13,
  },
  quizPillTextYellow: {
    fontFamily: fonts.bold,
    fontSize: 11.5,
    color: '#92400E',
  },
  quizPillPink: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 13,
  },
  quizPillTextPink: {
    fontFamily: fonts.bold,
    fontSize: 11.5,
    color: '#E11D48',
  },
  decorItem: {
    position: 'absolute',
  },
  scoreBadgeOuter: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#FFFFFF',
    marginTop: -36,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
    zIndex: 15,
  },
  scoreTextRow: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  scoreMainNumber: {
    fontFamily: fonts.extrabold,
    fontSize: 18,
    color: '#1F2A44',
  },
  scoreTotalNumber: {
    fontFamily: fonts.bold,
    fontSize: 12,
    color: '#94A3B8',
  },
  bodyWrap: {
    width: '100%',
    paddingHorizontal: 22,
    paddingTop: 12,
    alignItems: 'center',
  },
  title: {
    fontFamily: fonts.extrabold,
    fontSize: 22,
    color: '#1F2A44',
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: fonts.medium,
    fontSize: 12.5,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 4,
  },
  mainCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: '#E6ECF5',
    padding: 16,
    marginTop: 16,
  },
  levelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  levelCol: {
    flex: 1,
    alignItems: 'center',
  },
  levelColLabel: {
    fontFamily: fonts.bold,
    fontSize: 9.5,
    letterSpacing: 0.5,
    color: '#94A3B8',
    marginBottom: 6,
  },
  levelBoxGreenSoft: {
    width: '100%',
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#A7F3D0',
    borderRadius: 14,
    paddingVertical: 10,
    alignItems: 'center',
  },
  levelTextGreen: {
    fontFamily: fonts.extrabold,
    fontSize: 13.5,
    color: '#10B981',
  },
  levelBoxGreenSolid: {
    width: '100%',
    backgroundColor: '#2ED47A',
    borderRadius: 14,
    paddingVertical: 10,
    alignItems: 'center',
  },
  levelTextWhite: {
    fontFamily: fonts.extrabold,
    fontSize: 13.5,
    color: '#FFFFFF',
  },
  levelBoxYellowSoft: {
    width: '100%',
    backgroundColor: '#FEF9C3',
    borderWidth: 1,
    borderColor: '#FDE68A',
    borderRadius: 14,
    paddingVertical: 10,
    alignItems: 'center',
  },
  levelTextYellow: {
    fontFamily: fonts.extrabold,
    fontSize: 13.5,
    color: '#B45309',
  },
  arrowCircleBlue: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#2554E8',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    marginTop: 16,
  },
  equalCircleYellow: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    marginTop: 16,
  },
  equalSignText: {
    fontFamily: fonts.extrabold,
    fontSize: 15,
    color: '#B45309',
  },
  arrowCircleRed: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#EF4444',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    marginTop: 16,
  },
  cardDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 14,
  },
  dotsFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dotsGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dotCircleSolid: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotCircleMedium: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotCirclePastel: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ruleNoteText: {
    fontFamily: fonts.medium,
    fontSize: 11,
    color: '#94A3B8',
  },
  targetInfoCard: {
    width: '100%',
    backgroundColor: '#EEF2FF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#DCE7FF',
    padding: 12,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  targetIconBox: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#2554E8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },
  targetInfoText: {
    flex: 1,
    fontFamily: fonts.medium,
    fontSize: 11.5,
    lineHeight: 17,
    color: '#334155',
  },
  boldInk: {
    fontFamily: fonts.extrabold,
    color: '#1F2A44',
  },
  repeatCardsBanner: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: '#E6ECF5',
    padding: 12,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  repeatCardsBannerText: {
    flex: 1,
    fontFamily: fonts.medium,
    fontSize: 11.5,
    lineHeight: 17,
    color: '#334155',
  },
  footer: {
    paddingHorizontal: 22,
    paddingBottom: 20,
    paddingTop: 6,
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
  secondaryLinkBtn: {
    marginTop: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  secondaryLinkText: {
    fontFamily: fonts.extrabold,
    fontSize: 13.5,
    color: '#2554E8',
  },
});
