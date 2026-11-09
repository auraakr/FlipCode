import { fonts } from '../constants/theme';
import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity , StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ContentRepository } from '../storage/ContentRepository';
import { setGlobalActiveTopic } from './HomeScreen';
import { TOPIC_LEARNED_ITEMS } from '../data/screenConfigs';
import {
  ArrowLeftIcon,
  LevelBarsIcon,
  SwapHorizontalIcon,
  QuizClipboardIcon,
  ChevronRightIcon,
  FlashcardDeckIcon,
} from '../../assets/icons/AppIcons';
import { CircularProgress } from '../../assets/illustrations/MascotIllustrations';

export default function TopicDetailScreen({ route, navigation }) {
  const topicId = route?.params?.topicId || 'variabel';
  const topik = ContentRepository.getTopicById(topicId);
  const isTipeData = topicId === 'tipe_data';
  const isOperator = topicId === 'operator';

  const namaTopik =
    topik?.nama || (isTipeData ? 'Tipe Data' : isOperator ? 'Operator' : 'Variabel');
  const urutanTopik =
    topik?.urutan || (isTipeData ? 2 : isOperator ? 3 : 1);

  useEffect(() => {
    setGlobalActiveTopic(topicId);
  }, [topicId]);

  const handleBack = () => {
    setGlobalActiveTopic(topicId);
    navigation.navigate('MainTabs', {
      screen: 'Belajar',
      params: { activeTopic: topicId },
    });
  };

  // ============================================================================
  // RENDER TOPIC 2 (TIPE DATA - Frame 23) & TOPIC 3 (OPERATOR)
  // ============================================================================
  if (isTipeData || isOperator) {
    const heroBg = isTipeData ? '#F5B82E' : '#F26B50';
    const heroLip = isTipeData ? '#D99B16' : '#C94A32';
    const levelLabel = isTipeData ? 'Sedang' : 'Mudah';
    const descText = isTipeData
      ? 'Kenali jenis nilai yang bisa disimpan dalam program.'
      : 'Pelajari cara melakukan perhitungan dan perbandingan nilai.';

    const learnedItems = isTipeData
      ? TOPIC_LEARNED_ITEMS.tipe_data
      : TOPIC_LEARNED_ITEMS.operator;

    return (
      <SafeAreaView style={s.safeArea} edges={['top', 'bottom']}>
        <ScrollView
          style={s.scroll}
          contentContainerStyle={s.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Top Hero Banner (Yellow for Tipe Data, Coral for Operator) */}
          <View
            style={[
              s.heroBanner,
              { backgroundColor: heroBg, borderBottomColor: heroLip },
            ]}
          >
            {/* Top Bar inside Hero */}
            <View style={s.heroTopRow}>
              <TouchableOpacity
                activeOpacity={0.75}
                onPress={handleBack}
                style={s.backButtonWhite}
                accessibilityLabel="Kembali"
              >
                <ArrowLeftIcon size={18} color="#1F2A44" strokeWidth={2.3} />
              </TouchableOpacity>

              <View style={s.levelPillDark}>
                <LevelBarsIcon
                  size={12}
                  activeBars={2}
                  activeColor="#FACC15"
                  inactiveColor="rgba(255,255,255,0.35)"
                />
                <Text style={s.levelPillText}>{levelLabel}</Text>
              </View>
            </View>

            {/* Bottom Content inside Hero */}
            <View style={s.heroBodyRow}>
              <View style={s.heroTextCol}>
                <Text
                  style={[
                    s.topicOverline,
                    { color: isTipeData ? '#78350F' : 'rgba(255,255,255,0.85)' },
                  ]}
                >
                  TOPIK {urutanTopik}
                </Text>
                <Text
                  style={[
                    s.topicTitle,
                    { color: isTipeData ? '#1F2A44' : '#FFFFFF' },
                  ]}
                >
                  {namaTopik}
                </Text>
                <Text
                  style={[
                    s.topicDesc,
                    { color: isTipeData ? '#475569' : 'rgba(255,255,255,0.9)' },
                  ]}
                >
                  {descText}
                </Text>
              </View>

              {/* Right Graphic: 123 / Aa Box + </> Type Pill */}
              <View style={s.tdGraphicWrap}>
                <View
                  style={[
                    s.tdSquareBox,
                    isOperator && {
                      backgroundColor: 'rgba(255,255,255,0.2)',
                    },
                  ]}
                >
                  <Text
                    style={[
                      s.tdBoxTopText,
                      isOperator && { color: '#FFFFFF' },
                    ]}
                  >
                    {isTipeData ? '123' : '+ -'}
                  </Text>
                  <Text
                    style={[
                      s.tdBoxSubText,
                      isOperator && { color: '#FFE4E6' },
                    ]}
                  >
                    {isTipeData ? 'Aa' : '=='}
                  </Text>
                </View>

                <View style={s.tdTypeBadge}>
                  <Text style={s.tdTypeBadgeText}>
                    {isTipeData ? '</> Type' : '</> Calc'}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Body Content Container */}
          <View style={s.bodyContainer}>
            {/* 1. Progres Belajar Card (0%) */}
            <View style={s.card}>
              <CircularProgress percentage={0} />
              <View style={s.progressTextCol}>
                <Text style={s.cardTitle}>Progres belajar</Text>
                <Text style={s.progressSubtitle}>
                  Kuasai <Text style={s.boldInk}>≥70% kartu</Text> &{' '}
                  <Text style={s.boldInk}>4 benar</Text> di level Sulit untuk
                  menyelesaikan topik.
                </Text>
              </View>
            </View>

            {/* 2. Nilai / Operator yang Dipelajari Card */}
            <View style={s.learnedCard}>
              <View style={s.learnedHeaderRow}>
                <Text style={s.learnedHeaderTitle}>
                  {isTipeData ? 'NILAI YANG DIPELAJARI' : 'OPERATOR YANG DIPELAJARI'}
                </Text>
                <Text style={s.learnedBracesIcon}>{'{ }'}</Text>
              </View>

              <View style={s.learnedColumnsRow}>
                {learnedItems.map((item, idx) => (
                  <View key={idx} style={s.learnedColBox}>
                    <Text style={s.learnedColTitle}>{item.title}</Text>
                    <View
                      style={[
                        s.learnedCodePill,
                        { backgroundColor: item.pillBg },
                      ]}
                    >
                      <Text
                        style={[
                          s.learnedCodeText,
                          { color: item.pillColor },
                        ]}
                        numberOfLines={1}
                      >
                        {item.code}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>

            {/* 3. Flashcard Card */}
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => navigation.navigate('Flashcard', { topicId })}
              style={s.flashcardCard}
            >
              <View style={s.flashcardHeaderRow}>
                <View style={s.flashcardHeaderLeft}>
                  <View style={s.flashcardIconBox}>
                    <SwapHorizontalIcon size={18} color="#2554E8" />
                  </View>
                  <View>
                    <Text style={s.cardTitle}>Flashcard</Text>
                    <Text style={s.flashcardSubtext}>
                      Konsep visual interaktif
                    </Text>
                  </View>
                </View>

                <View style={s.countPillGrey}>
                  <Text style={s.countPillGreyText}>10 kartu</Text>
                </View>
              </View>

              <View style={[s.legendRow, { marginTop: 14 }]}>
                <View style={s.legendItem}>
                  <View style={[s.legendDot, { backgroundColor: '#2ED47A' }]} />
                  <Text style={s.legendLabel}>
                    Dikuasai <Text style={s.legendValue}>0</Text>
                  </Text>
                </View>

                <View style={s.legendItem}>
                  <View style={[s.legendDot, { backgroundColor: '#FACC15' }]} />
                  <Text style={s.legendLabel}>
                    Dipelajari <Text style={s.legendValue}>0</Text>
                  </Text>
                </View>

                <View style={s.legendItem}>
                  <View style={[s.legendDot, { backgroundColor: '#CBD5E1' }]} />
                  <Text style={s.legendLabel}>
                    Baru <Text style={s.legendValue}>10</Text>
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* 4. Kuis Card */}
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => navigation.navigate('Quiz', { topicId })}
              style={s.card}
            >
              <View style={s.quizIconBox}>
                <QuizClipboardIcon size={19} color="#7C3AED" />
              </View>

              <View style={s.quizTextCol}>
                <Text style={s.cardTitle}>Kuis {namaTopik}</Text>
                <Text style={s.quizSubtitle}>
                  5 soal • Level {levelLabel} • 4 pilihan
                </Text>
              </View>

              <View style={s.chevronCircleGrey}>
                <ChevronRightIcon size={15} color="#64748B" strokeWidth={2.4} />
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Bottom CTA Button */}
        <View style={s.footer}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => navigation.navigate('Flashcard', { topicId })}
            style={s.ctaOuter}
          >
            <View style={s.ctaInner}>
              <FlashcardDeckIcon size={18} color="#FFFFFF" />
              <Text style={s.ctaText}>Mulai Flashcard</Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // ============================================================================
  // RENDER TOPIC 1: VARIABEL (Frame 07)
  // ============================================================================
  return (
    <SafeAreaView style={s.safeArea} edges={['top', 'bottom']}>
      <ScrollView
        style={s.scroll}
        contentContainerStyle={s.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Blue Hero Banner */}
        <View style={s.heroBanner}>
          <View style={s.watermarkWrap} pointerEvents="none">
            <Text style={s.watermarkText}>{'x = 10'}</Text>
            <Text style={s.watermarkText}>{'kelas = "XI"'}</Text>
            <Text style={s.watermarkText}>{'       42'}</Text>
          </View>

          <View style={s.heroTopRow}>
            <TouchableOpacity
              activeOpacity={0.75}
              onPress={handleBack}
              style={s.backButton}
              accessibilityLabel="Kembali"
            >
              <ArrowLeftIcon size={18} color="#FFFFFF" strokeWidth={2.3} />
            </TouchableOpacity>

            <View style={s.levelPill}>
              <LevelBarsIcon
                size={12}
                activeBars={2}
                activeColor="#FFFFFF"
                inactiveColor="rgba(255,255,255,0.45)"
              />
              <Text style={s.levelPillText}>Mudah</Text>
            </View>
          </View>

          <View style={s.heroBodyRow}>
            <View style={s.heroTextCol}>
              <Text style={s.topicOverline}>TOPIK {urutanTopik}</Text>
              <Text style={s.topicTitle}>{namaTopik}</Text>
              <Text style={s.topicDesc}>
                Kenali cara menyimpan dan menggunakan nilai dalam program.
              </Text>
            </View>

            <View style={s.varGraphicWrap}>
              <View style={s.varOuterBox}>
                <View style={s.varInnerBox}>
                  <Text style={s.varXText}>x</Text>
                </View>
              </View>
              <View style={s.var42Badge}>
                <Text style={s.var42Text}>42</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={s.bodyContainer}>
          <View style={s.card}>
            <CircularProgress percentage={30} />
            <View style={s.progressTextCol}>
              <Text style={s.cardTitle}>Progres belajar</Text>
              <Text style={s.progressSubtitle}>
                Kuasai <Text style={s.boldInk}>≥ 70%</Text> kartu & 4 benar di
                level Sulit untuk menyelesaikan topik.
              </Text>
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => navigation.navigate('Flashcard', { topicId })}
            style={s.flashcardCard}
          >
            <View style={s.flashcardHeaderRow}>
              <View style={s.flashcardHeaderLeft}>
                <View style={s.flashcardIconBox}>
                  <SwapHorizontalIcon size={18} color="#2554E8" />
                </View>
                <Text style={s.cardTitle}>Flashcard</Text>
              </View>

              <View style={s.countPill}>
                <Text style={s.countPillText}>10 kartu</Text>
              </View>
            </View>

            <View style={s.segmentedBar}>
              <View style={[s.segmentItem, s.segmentGreen]} />
              <View style={[s.segmentItem, s.segmentYellow]} />
              <View style={[s.segmentItem, s.segmentBlueGrey]} />
            </View>

            <View style={s.legendRow}>
              <View style={s.legendItem}>
                <View style={[s.legendDot, { backgroundColor: '#2ED47A' }]} />
                <Text style={s.legendLabel}>
                  Dikuasai <Text style={s.legendValue}>3</Text>
                </Text>
              </View>

              <View style={s.legendItem}>
                <View style={[s.legendDot, { backgroundColor: '#FACC15' }]} />
                <Text style={s.legendLabel}>
                  Dipelajari <Text style={s.legendValue}>2</Text>
                </Text>
              </View>

              <View style={s.legendItem}>
                <View style={[s.legendDot, { backgroundColor: '#B8C7FC' }]} />
                <Text style={s.legendLabel}>
                  Baru <Text style={s.legendValue}>5</Text>
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => navigation.navigate('Quiz', { topicId })}
            style={s.card}
          >
            <View style={s.quizIconBox}>
              <QuizClipboardIcon size={19} color="#7C3AED" />
            </View>

            <View style={s.quizTextCol}>
              <Text style={s.cardTitle}>Kuis {namaTopik}</Text>
              <Text style={s.quizSubtitle}>
                5 soal • Level Mudah • 4 pilihan
              </Text>
            </View>

            <View style={s.chevronCircle}>
              <ChevronRightIcon size={15} color="#2554E8" strokeWidth={2.4} />
            </View>
          </TouchableOpacity>

          <Text style={s.learnSectionTitle}>Yang akan kamu pelajari</Text>

          <View style={s.chipsContainer}>
            <View style={s.chip}>
              <View style={[s.chipDot, { backgroundColor: '#2554E8' }]} />
              <Text style={s.chipCodeBlue}>nama_variabel</Text>
            </View>

            <View style={s.chip}>
              <View style={[s.chipDot, { backgroundColor: '#FACC15' }]} />
              <Text style={s.chipCodeDark}>x = 10</Text>
            </View>

            <View style={s.chip}>
              <Text style={s.chipText}>Aturan penamaan</Text>
            </View>

            <View style={s.chip}>
              <Text style={s.chipText}>Mengubah nilai</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom CTA Button: Mulai Flashcard */}
      <View style={s.footer}>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => navigation.navigate('Flashcard', { topicId })}
          style={s.ctaOuter}
        >
          <View style={s.ctaInner}>
            <FlashcardDeckIcon size={18} color="#FFFFFF" />
            <Text style={s.ctaText}>Mulai Flashcard</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FDFCF7',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  heroBanner: {
    backgroundColor: '#2554E8',
    borderRadius: 28,
    borderBottomWidth: 4,
    borderBottomColor: '#1B3FB5',
    paddingHorizontal: 22,
    paddingTop: 18,
    paddingBottom: 24,
    overflow: 'hidden',
    position: 'relative',
  },
  watermarkWrap: {
    position: 'absolute',
    top: 16,
    right: 14,
    alignItems: 'flex-end',
  },
  watermarkText: {
    fontFamily: fonts.bold,
    fontSize: 11,
    lineHeight: 15,
    color: 'rgba(255, 255, 255, 0.1)',
  },
  heroTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonWhite: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  levelPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 13,
  },
  levelPillDark: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 13,
  },
  levelPillText: {
    fontFamily: fonts.bold,
    fontSize: 12,
    color: '#FFFFFF',
    marginLeft: 6,
  },
  heroBodyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 22,
  },
  heroTextCol: {
    flex: 1,
    paddingRight: 14,
  },
  topicOverline: {
    fontFamily: fonts.bold,
    fontSize: 11,
    letterSpacing: 0.8,
    color: 'rgba(255, 255, 255, 0.72)',
  },
  topicTitle: {
    fontFamily: fonts.extrabold,
    fontSize: 28,
    color: '#FFFFFF',
    marginTop: 2,
  },
  topicDesc: {
    fontFamily: fonts.medium,
    fontSize: 12.5,
    lineHeight: 18,
    color: 'rgba(255, 255, 255, 0.86)',
    marginTop: 6,
  },
  varGraphicWrap: {
    width: 78,
    height: 68,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  varOuterBox: {
    width: 66,
    height: 52,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.32)',
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '-5deg' }],
  },
  varInnerBox: {
    width: 34,
    height: 30,
    borderRadius: 9,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  varXText: {
    fontFamily: fonts.extrabold,
    fontSize: 16,
    color: '#2554E8',
  },
  var42Badge: {
    position: 'absolute',
    top: -2,
    right: 0,
    backgroundColor: '#FACC15',
    borderRadius: 8,
    paddingVertical: 3,
    paddingHorizontal: 7,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
  },
  var42Text: {
    fontFamily: fonts.extrabold,
    fontSize: 11,
    color: '#1F2A44',
  },
  tdGraphicWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tdSquareBox: {
    width: 66,
    height: 62,
    borderRadius: 16,
    backgroundColor: '#FDE68A',
    borderWidth: 1.8,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tdBoxTopText: {
    fontFamily: fonts.extrabold,
    fontSize: 15,
    color: '#1F2A44',
  },
  tdBoxSubText: {
    fontFamily: fonts.extrabold,
    fontSize: 12.5,
    color: '#D97706',
    marginTop: 1,
  },
  tdTypeBadge: {
    marginTop: -8,
    backgroundColor: '#2554E8',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    borderRadius: 999,
    paddingVertical: 3,
    paddingHorizontal: 10,
  },
  tdTypeBadgeText: {
    fontFamily: fonts.extrabold,
    fontSize: 10,
    color: '#FFFFFF',
  },
  bodyContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#E6ECF5',
    padding: 16,
    marginBottom: 12,
  },
  progressTextCol: {
    flex: 1,
    marginLeft: 14,
  },
  cardTitle: {
    fontFamily: fonts.extrabold,
    fontSize: 15,
    color: '#1F2A44',
  },
  progressSubtitle: {
    fontFamily: fonts.medium,
    fontSize: 12,
    lineHeight: 17.5,
    color: '#64748B',
    marginTop: 3,
  },
  boldInk: {
    fontFamily: fonts.extrabold,
    color: '#1F2A44',
  },
  learnedCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#E6ECF5',
    padding: 15,
    marginBottom: 12,
  },
  learnedHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  learnedHeaderTitle: {
    fontFamily: fonts.extrabold,
    fontSize: 10.5,
    letterSpacing: 0.6,
    color: '#64748B',
  },
  learnedBracesIcon: {
    fontFamily: fonts.extrabold,
    fontSize: 12,
    color: '#64748B',
  },
  learnedColumnsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  learnedColBox: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    paddingVertical: 10,
    paddingHorizontal: 6,
    alignItems: 'center',
  },
  learnedColTitle: {
    fontFamily: fonts.extrabold,
    fontSize: 12,
    color: '#1F2A44',
    marginBottom: 6,
  },
  learnedCodePill: {
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 6,
    width: '100%',
    alignItems: 'center',
  },
  learnedCodeText: {
    fontFamily: fonts.bold,
    fontSize: 10,
  },
  flashcardCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#E6ECF5',
    padding: 16,
    marginBottom: 12,
  },
  flashcardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flashcardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flashcardIconBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#EDF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  flashcardSubtext: {
    fontFamily: fonts.medium,
    fontSize: 11.5,
    color: '#64748B',
    marginTop: 1,
  },
  countPill: {
    backgroundColor: '#EDF2FF',
    borderRadius: 999,
    paddingVertical: 4,
    paddingHorizontal: 11,
  },
  countPillText: {
    fontFamily: fonts.extrabold,
    fontSize: 11.5,
    color: '#2554E8',
  },
  countPillGrey: {
    backgroundColor: '#F1F5F9',
    borderRadius: 999,
    paddingVertical: 5,
    paddingHorizontal: 11,
  },
  countPillGreyText: {
    fontFamily: fonts.extrabold,
    fontSize: 11.5,
    color: '#1F2A44',
  },
  segmentedBar: {
    flexDirection: 'row',
    height: 8,
    borderRadius: 999,
    overflow: 'hidden',
    marginTop: 14,
    gap: 3,
  },
  segmentItem: {
    height: '100%',
  },
  segmentGreen: {
    flex: 3,
    backgroundColor: '#2ED47A',
    borderTopLeftRadius: 999,
    borderBottomLeftRadius: 999,
  },
  segmentYellow: {
    flex: 2,
    backgroundColor: '#FACC15',
  },
  segmentBlueGrey: {
    flex: 5,
    backgroundColor: '#C7D7FE',
    borderTopRightRadius: 999,
    borderBottomRightRadius: 999,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    marginRight: 6,
  },
  legendLabel: {
    fontFamily: fonts.medium,
    fontSize: 11.5,
    color: '#64748B',
  },
  legendValue: {
    fontFamily: fonts.extrabold,
    color: '#1F2A44',
  },
  quizIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F3E8FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quizTextCol: {
    flex: 1,
    marginLeft: 12,
  },
  quizSubtitle: {
    fontFamily: fonts.medium,
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  chevronCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#EDF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chevronCircleGrey: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  learnSectionTitle: {
    fontFamily: fonts.extrabold,
    fontSize: 14.5,
    color: '#1F2A44',
    marginTop: 8,
    marginBottom: 10,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E6ECF5',
    borderRadius: 999,
    paddingVertical: 7,
    paddingHorizontal: 14,
  },
  chipDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 7,
  },
  chipCodeBlue: {
    fontFamily: fonts.bold,
    fontSize: 12,
    color: '#2554E8',
  },
  chipCodeDark: {
    fontFamily: fonts.bold,
    fontSize: 12,
    color: '#1F2A44',
  },
  chipText: {
    fontFamily: fonts.semibold,
    fontSize: 12,
    color: '#475569',
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 18,
    paddingTop: 6,
  },
  ctaOuter: {
    backgroundColor: '#1B3FB5',
    borderRadius: 18,
    paddingBottom: 4,
  },
  ctaInner: {
    backgroundColor: '#2554E8',
    borderRadius: 18,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaText: {
    fontFamily: fonts.extrabold,
    fontSize: 15,
    color: '#FFFFFF',
    marginLeft: 8,
  },
});
