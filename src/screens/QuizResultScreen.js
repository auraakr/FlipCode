import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fonts } from '../constants/theme';
import { ContentRepository } from '../storage/ContentRepository';
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
import s from '../styles/QuizResultScreen.styles';

export default function QuizResultScreen({ route, navigation }) {
  const topicId = route?.params?.topicId || 'variabel';
  const hasil = route?.params?.hasil;
  const topik = ContentRepository.getTopicById(topicId);
  const namaTopik = topik?.nama || 'Variabel';

  // Tentukan mode awal berdasarkan skor kuis ('up' = Frame 18, 'same' = Frame 19, 'down' = Frame 20)
  const initialMode = () => {
    const b = hasil?.benar;
    if (typeof b === 'number') {
      if (b >= 4) return 'up';
      if (b === 3) return 'same';
      return 'down';
    }
    return 'up';
  };

  const [mode, setMode] = useState(initialMode);

  // Memudahkan berganti antara Frame 18 (up), Frame 19 (same), dan Frame 20 (down)
  const cycleMode = () => {
    setMode((prev) =>
      prev === 'up' ? 'same' : prev === 'same' ? 'down' : 'up'
    );
  };

  const handleClose = () => {
    navigation.replace('MainTabs');
  };

  // ============================================================================
  // FRAME 18: LEVEL INCREASED (mode === 'up')
  // ============================================================================
  if (mode === 'up') {
    const dots = [true, true, false, true, true];
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
                onPress={cycleMode}
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
          <ScoreBadgeRing score={4} total={5} mode="up" onPress={cycleMode} />

          {/* Main Content */}
          <View style={s.bodyWrap}>
            <Text style={s.title}>Level naik! 🚀</Text>
            <Text style={s.subtitle}>
              Kamu siap untuk tantangan berikutnya.
            </Text>

            {/* Level Transition & Score Dots Card */}
            <View style={s.mainCard}>
              <View style={s.levelRow}>
                <View style={s.levelCol}>
                  <Text style={s.levelColLabel}>SEBELUMNYA</Text>
                  <View style={s.levelBoxGreenSoft}>
                    <Text style={s.levelTextGreen}>Mudah</Text>
                  </View>
                </View>

                <View style={s.arrowCircleBlue}>
                  <ArrowRightIcon size={15} color="#FFFFFF" strokeWidth={2.5} />
                </View>

                <View style={s.levelCol}>
                  <Text style={s.levelColLabel}>SEKARANG</Text>
                  <View style={s.levelBoxYellowSoft}>
                    <Text style={s.levelTextYellow}>Sedang</Text>
                  </View>
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
                <Text style={s.ruleNoteText}>Skor 4–5 menaikkan level</Text>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Bottom Actions */}
        <View style={s.footer}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => navigation.navigate('TopicCompleted', { topicId })}
            style={s.primaryBtnOuter}
          >
            <View style={s.primaryBtnInner}>
              <Text style={[s.primaryBtnText, { marginRight: 8 }]}>
                Lanjut ke Level Sedang
              </Text>
              <ArrowRightIcon size={17} color="#FFFFFF" strokeWidth={2.5} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.75}
            onPress={cycleMode}
            style={s.secondaryLinkBtn}
          >
            <Text style={s.secondaryLinkText}>Lihat Pembahasan</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // ============================================================================
  // FRAME 19: LEVEL MAINTAINED (mode === 'same')
  // ============================================================================
  if (mode === 'same') {
    const dots = [true, true, true, false, false];
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
                onPress={cycleMode}
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
          <ScoreBadgeRing score={3} total={5} mode="same" onPress={cycleMode} />

          <View style={s.bodyWrap}>
            <Text style={s.title}>Levelmu tetap Mudah</Text>
            <Text style={s.subtitle}>Bagus! Pemahamanmu sudah stabil.</Text>

            {/* Card 1: Level Comparison */}
            <View style={s.mainCard}>
              <View style={s.levelRow}>
                <View style={s.levelCol}>
                  <Text style={s.levelColLabel}>SEBELUMNYA</Text>
                  <View style={s.levelBoxGreenSoft}>
                    <Text style={s.levelTextGreen}>Mudah</Text>
                  </View>
                </View>

                <View style={s.equalCircleYellow}>
                  <Text style={s.equalSignText}>=</Text>
                </View>

                <View style={s.levelCol}>
                  <Text style={s.levelColLabel}>SEKARANG</Text>
                  <View style={s.levelBoxGreenSolid}>
                    <Text style={s.levelTextWhite}>Mudah</Text>
                  </View>
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
                Skor 3 mempertahankan level
              </Text>
            </View>

            {/* Card 3: Target Tip Box */}
            <View style={s.targetInfoCard}>
              <View style={s.targetIconBox}>
                <TargetBullseyeIcon size={18} color="#FFFFFF" />
              </View>
              <Text style={s.targetInfoText}>
                Sedikit lagi! Jawab 4 soal dengan benar untuk naik ke{' '}
                <Text style={s.boldInk}>Sedang.</Text>
              </Text>
            </View>
          </View>
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
  const downDots = [true, true, false, false, false];
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
              onPress={cycleMode}
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
        <ScoreBadgeRing score={2} total={5} mode="down" onPress={cycleMode} />

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
                <View style={s.levelBoxYellowSoft}>
                  <Text style={s.levelTextYellow}>Sedang</Text>
                </View>
              </View>

              <View style={s.arrowCircleRed}>
                <ArrowDownIcon size={15} color="#FFFFFF" strokeWidth={2.5} />
              </View>

              <View style={s.levelCol}>
                <Text style={s.levelColLabel}>Sekarang</Text>
                <View style={s.levelBoxGreenSoft}>
                  <Text style={s.levelTextGreen}>Mudah</Text>
                </View>
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
                Skor 0–2 menurunkan level
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
              Ulangi <Text style={{ fontFamily: fonts.extrabold, color: '#2554E8' }}>3 kartu</Text> yang masih{' '}
              <Text style={{ fontFamily: fonts.extrabold, color: '#D97706' }}>Sedang</Text> dipelajari dulu.
            </Text>
          </TouchableOpacity>
        </View>
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
