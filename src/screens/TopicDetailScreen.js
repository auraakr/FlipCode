import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
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
import s from '../styles/TopicDetailScreen.styles';

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
