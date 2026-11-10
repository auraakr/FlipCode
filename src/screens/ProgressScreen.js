import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { fonts } from '../constants/theme';
import { ContentRepository } from '../storage/ContentRepository';
import { ProgressRepository } from '../storage/ProgressRepository';
import { CardStatus, Level, TopicState } from '../constants/enums';
import { getGlobalActiveTopic } from './HomeScreen';
import {
  TrophyIcon,
  CardPlusBadgeIcon,
  ChartBarBadgeIcon,
  TrendUpIcon,
  LockIcon,
  FlashcardTileIcon,
  RepeatCycleIcon,
} from '../../assets/icons/AppIcons';
import {
  DashboardRobotMascot,
  MiniTopicRing,
  MultiSegmentDonut,
  IsometricBoxIcon,
} from '../../assets/illustrations/MascotIllustrations';

// ============================================================================
// VIEW-MODEL: dibentuk dari data progres di server (GET /progress).
// Level per topik berasal dari hasil tes awal, lalu berubah mengikuti hasil kuis.
// ============================================================================
const TOPIC_STYLE = {
  variabel: { color: '#2554E8', iconText: 'x=' },
  tipe_data: { color: '#F59E0B', iconText: '123' },
  operator: { color: '#F26B50', iconText: '+ -' },
};
const LEVEL_COLOR = {
  [Level.MUDAH]: '#16A34A',
  [Level.SEDANG]: '#D97706',
  [Level.SULIT]: '#DC2626',
};
const EMPTY_PROGRESS = { topics: {}, cards: {}, quizSessions: [] };

function barColors(ratio) {
  if (ratio >= 0.8) return { trackBg: '#E8FBF0', fillBg: '#34D399' };
  if (ratio >= 0.6) return { trackBg: '#FEF9E7', fillBg: '#FCD34D' };
  return { trackBg: '#FFF1EE', fillBg: '#FB9274' };
}

// Memetakan data progres dari server ke struktur tampilan.
function mapRepositoryToProgressModels(rawAll) {
  const raw = { ...EMPTY_PROGRESS, ...(rawAll || {}) };

  const infos = ContentRepository.getAllTopics().map((t) => {
    const cards = ContentRepository.getFlashcardsByTopic(t.id) || [];
    const statusOf = (c) => raw.cards?.[c.id]?.status;
    const mastered = cards.filter((c) => statusOf(c) === CardStatus.DIKUASAI).length;
    const learning = cards.filter((c) => statusOf(c) === CardStatus.SEDANG_DIPELAJARI).length;
    const prog = raw.topics?.[t.id];
    const level = prog?.level || Level.MUDAH;
    const done = prog?.state === TopicState.DIKUASAI;
    const cardPct = cards.length ? Math.round((mastered / cards.length) * 100) : 0;
    const style = TOPIC_STYLE[t.id] || { color: '#2554E8', iconText: '' };
    return {
      id: t.id,
      title: t.nama,
      cards: cards.length,
      mastered,
      learning,
      level,
      done,
      pct: done ? 100 : cardPct,
      ...style,
    };
  });

  const totalPct = infos.length
    ? Math.round(infos.reduce((sum, t) => sum + t.pct, 0) / infos.length)
    : 0;
  const doneCount = infos.filter((t) => t.done).length;
  const totalCards = infos.reduce((sum, t) => sum + t.cards, 0);
  const totalMastered = infos.reduce((sum, t) => sum + t.mastered, 0);
  const totalLearning = infos.reduce((sum, t) => sum + t.learning, 0);
  const activeInfo = infos.find((t) => !t.done) || null;

  // Riwayat kuis dari server (terbaru dulu) -> 4 terakhir, urut lama ke baru.
  const sessions = raw.quizSessions || [];
  const history = sessions
    .slice(0, 4)
    .reverse()
    .map((q, i) => ({
      id: String(q.id ?? i),
      label: `Kuis ${i + 1}`,
      score: q.benar,
      total: q.total || 5,
      ...barColors(q.total ? q.benar / q.total : 0),
    }));
  const sumBenar = sessions.reduce((sum, q) => sum + (q.benar || 0), 0);
  const sumTotal = sessions.reduce((sum, q) => sum + (q.total || 0), 0);
  const quizAveragePct = sumTotal ? Math.round((sumBenar / sumTotal) * 100) : 0;

  const repeatTopic = infos.find((t) => t.learning > 0) || infos[0];

  const dashboard = {
    statusLabel: totalPct >= 60 ? 'Mahir' : totalPct >= 25 ? 'Berkembang' : 'Baru mulai',
    totalProgressPct: totalPct,
    activeSegments: Math.min(4, Math.round(totalPct / 25)),
    totalSegments: 4,
    topics: infos.map((t) => ({
      id: t.id,
      title: t.title,
      pct: t.pct,
      levelLabel: t.level,
      unlocked: true,
      accentColor: t.color,
      levelColor: LEVEL_COLOR[t.level],
    })),
    quizPerformance: {
      averagePct: quizAveragePct,
      levelBadge: `Level ${(activeInfo || infos[infos.length - 1] || { level: Level.MUDAH }).level}`,
      history,
    },
    flashcardSummary: { mastered: totalMastered, learning: totalLearning, total: totalCards },
    repeatConcept: {
      topicId: repeatTopic?.id || 'variabel',
      title: totalLearning > 0 ? 'Kartu yang masih dipelajari' : 'Belum ada kartu',
      countLabel: `${totalLearning} kartu`,
    },
  };

  const masteredInfo = infos.find((t) => t.done) || null;
  const lastSession = masteredInfo && sessions.find((q) => q.topicId === masteredInfo.id);

  const byTopic = {
    completedBadgeLabel: `${doneCount} topik selesai`,
    totalProgressPct: totalPct,
    legend: infos.map((t) => ({
      id: t.id,
      title: t.title,
      meta: `${t.pct}% • ${t.done ? 'Selesai' : t.pct > 0 ? 'Berjalan' : 'Belum mulai'}`,
      pct: t.pct,
      color: t.color,
      unlocked: true,
    })),
    masteredTopic: masteredInfo && {
      id: masteredInfo.id,
      title: masteredInfo.title,
      cardsPill: `${masteredInfo.mastered}/${masteredInfo.cards} kartu`,
      quizPill: lastSession
        ? `${lastSession.benar}/${lastSession.total} di ${lastSession.level}`
        : 'Dikuasai di tes awal',
    },
    activeTopicCard: activeInfo && {
      id: activeInfo.id,
      iconText: activeInfo.iconText,
      title: activeInfo.title,
      levelBadge: activeInfo.level.toUpperCase(),
      subtitle: `${activeInfo.mastered} dari ${activeInfo.cards} kartu dikuasai`,
      pct: activeInfo.pct,
    },
    summaryCards: { masteredCards: totalMastered, totalCards, quizAveragePct },
  };

  return { dashboard, byTopic };
}

// ============================================================================
// MAIN COMPONENT: ProgressScreen (FlipCode - 25 & FlipCode - 26)
// ============================================================================
export default function ProgressScreen({ route, navigation }) {
  // Mode tampilan: 'dashboard' (FlipCode - 25) | 'by_topic' (FlipCode - 26)
  const [viewMode, setViewMode] = useState('dashboard');
  const [models, setModels] = useState(() => mapRepositoryToProgressModels(null));

  useFocusEffect(
    useCallback(() => {
      const currentTopic = getGlobalActiveTopic();
      // Jika user sudah menyelesaikan Variabel (aktif di Tipe Data / Operator),
      // tampilkan FlipCode - 26 secara otomatis, atau ikuti param jika ada
      if (route?.params?.mode) {
        setViewMode(route.params.mode);
      } else if (currentTopic === 'tipe_data' || currentTopic === 'operator') {
        setViewMode('by_topic');
      } else {
        setViewMode('dashboard');
      }

      (async () => {
        try {
          const all = await ProgressRepository.getAll();
          setModels(mapRepositoryToProgressModels(all));
        } catch (e) {
          console.warn('Gagal memuat progres:', e);
        }
      })();
    }, [route?.params?.mode])
  );

  const toggleViewMode = () => {
    setViewMode((prev) => (prev === 'dashboard' ? 'by_topic' : 'dashboard'));
  };

  const { dashboard, byTopic } = models;

  // ==========================================================================
  // RENDER FRAME 26: PROGRESS BY TOPIC (viewMode === 'by_topic')
  // ==========================================================================
  if (viewMode === 'by_topic') {
    return (
      <SafeAreaView style={s.safeArea} edges={['top']}>
        <ScrollView
          style={s.scroll}
          contentContainerStyle={s.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Top Header Row */}
          <View style={s.topHeaderRow}>
            <Text style={s.pageTitle}>Progres Belajar</Text>

            {/* Ketuk badge ini untuk beralih antara Frame 25 & Frame 26 */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={toggleViewMode}
              style={s.completedTopPill}
              accessibilityLabel="Ganti tampilan progres"
            >
              <Text style={s.trophyEmoji}>🏆</Text>
              <Text style={s.completedTopPillText}>
                {byTopic.completedBadgeLabel}
              </Text>
            </TouchableOpacity>
          </View>

          {/* 1. Donut Chart Total Progress Card */}
          <View style={s.donutCard}>
            <MultiSegmentDonut totalPct={byTopic.totalProgressPct} />

            <View style={s.legendCol}>
              {byTopic.legend.map((item, idx) => (
                <TouchableOpacity
                  key={item.id}
                  activeOpacity={0.75}
                  onPress={() =>
                    navigation.navigate('TopicDetail', { topicId: item.id })
                  }
                  style={[s.legendItemRow, idx > 0 && { marginTop: 12 }]}
                >
                  <View
                    style={[s.legendDot, { backgroundColor: item.color }]}
                  />
                  <View style={s.legendTextWrap}>
                    <Text
                      style={[
                        s.legendTopicName,
                        !item.unlocked && { color: '#94A3B8' },
                      ]}
                    >
                      {item.title}
                    </Text>
                    <Text style={s.legendTopicMeta}>{item.meta}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* 2. Green Mastered Topic Banner (hanya jika ada topik dikuasai) */}
          {byTopic.masteredTopic && (
          <TouchableOpacity
            activeOpacity={0.88}
            onPress={() =>
              navigation.navigate('TopicDetail', {
                topicId: byTopic.masteredTopic.id,
              })
            }
            style={s.masteredBanner}
          >
            <View style={s.masteredLeftCol}>
              <View style={s.masteredOverlineRow}>
                <TrophyIcon size={12} color="rgba(255,255,255,0.9)" />
                <Text style={s.masteredOverlineText}>TOPIK DIKUASAI</Text>
              </View>

              <Text style={s.masteredTitle}>{byTopic.masteredTopic.title}</Text>

              <View style={s.masteredPillsRow}>
                <View style={s.masteredDarkPill}>
                  <Text style={s.masteredDarkPillText}>
                    {byTopic.masteredTopic.cardsPill}
                  </Text>
                </View>
                <View style={s.masteredDarkPill}>
                  <Text style={s.masteredDarkPillText}>
                    {byTopic.masteredTopic.quizPill}
                  </Text>
                </View>
              </View>
            </View>

            <View style={s.masteredBoxIllustWrap}>
              <IsometricBoxIcon />
            </View>
          </TouchableOpacity>
          )}

          {/* 3. Active Topic Row Card (topik yang sedang dipelajari) */}
          {byTopic.activeTopicCard && (
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() =>
              navigation.navigate('TopicDetail', {
                topicId: byTopic.activeTopicCard.id,
              })
            }
            style={s.activeTopicRowCard}
          >
            <View style={s.activeTopicSquareIcon}>
              <Text style={s.activeTopicSquareText}>
                {byTopic.activeTopicCard.iconText}
              </Text>
            </View>

            <View style={s.activeTopicMiddleCol}>
              <View style={s.activeTopicTitleRow}>
                <Text style={s.activeTopicName}>
                  {byTopic.activeTopicCard.title}
                </Text>
                <View style={s.activeTopicLevelPill}>
                  <Text style={s.activeTopicLevelPillText}>
                    {byTopic.activeTopicCard.levelBadge}
                  </Text>
                </View>
              </View>
              <Text style={s.activeTopicSubtitle}>
                {byTopic.activeTopicCard.subtitle}
              </Text>
            </View>

            <Text style={s.activeTopicPctText}>
              {byTopic.activeTopicCard.pct}%
            </Text>
          </TouchableOpacity>
          )}

          {/* 4. Bottom 2-Column Summary Cards */}
          <View style={s.bottomTwoCols}>
            {/* Left: Kartu dikuasai */}
            <View style={s.summaryWhiteCard}>
              <View style={s.summaryHeaderRow}>
                <View style={s.summaryBlueIconBox}>
                  <CardPlusBadgeIcon size={14} color="#2554E8" />
                </View>
                <Text style={s.summaryCardLabel}>Kartu dikuasai</Text>
              </View>

              <View style={s.summaryValueRow}>
                <Text style={s.summaryBigNumber}>
                  {byTopic.summaryCards.masteredCards}
                </Text>
                <Text style={s.summaryTotalNumber}>
                  {' '}
                  / {byTopic.summaryCards.totalCards}
                </Text>
              </View>
            </View>

            {/* Right: Rata-rata kuis */}
            <View style={s.summaryWhiteCard}>
              <View style={s.summaryHeaderRow}>
                <View style={s.summaryPurpleIconBox}>
                  <ChartBarBadgeIcon size={14} color="#9333EA" />
                </View>
                <Text style={s.summaryCardLabel}>Rata-rata kuis</Text>
              </View>

              <View style={s.summaryValueRow}>
                <Text style={s.summaryBigNumber}>
                  {byTopic.summaryCards.quizAveragePct}%
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ==========================================================================
  // RENDER FRAME 25: PROGRESS DASHBOARD (viewMode === 'dashboard')
  // ==========================================================================
  const masteredWidthPct = Math.round(
    (dashboard.flashcardSummary.mastered / dashboard.flashcardSummary.total) *
      100
  );
  const learningWidthPct = Math.round(
    (dashboard.flashcardSummary.learning / dashboard.flashcardSummary.total) *
      100
  );

  return (
    <SafeAreaView style={s.safeArea} edges={['top']}>
      <ScrollView
        style={s.scroll}
        contentContainerStyle={s.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Header Row */}
        <View style={s.topHeaderRow}>
          <Text style={s.pageTitle}>Progres Belajar</Text>

          {/* Ketuk badge ini untuk beralih ke Frame 26 (Progress by Topic) */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={toggleViewMode}
            style={s.growingPill}
            accessibilityLabel="Ganti tampilan progres"
          >
            <TrendUpIcon size={13} color="#7C3AED" />
            <Text style={s.growingPillText}>{dashboard.statusLabel}</Text>
          </TouchableOpacity>
        </View>

        {/* 1. Dark Navy Hero Banner: Total progres 25% */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={toggleViewMode}
          style={s.navyHeroCard}
        >
          <View style={s.navyHeroLeft}>
            <Text style={s.navyHeroOverline}>Total progres</Text>

            <View style={s.navyHeroPctRow}>
              <Text style={s.navyHeroBigNum}>{dashboard.totalProgressPct}</Text>
              <Text style={s.navyHeroPctSymbol}>%</Text>
            </View>

            {/* 4 Segmented Indicator Bars */}
            <View style={s.navySegmentsRow}>
              {Array.from({ length: dashboard.totalSegments }).map((_, idx) => {
                const isActive = idx < dashboard.activeSegments;
                return (
                  <View
                    key={idx}
                    style={[
                      s.navySegmentPill,
                      {
                        backgroundColor: isActive
                          ? '#3B82F6'
                          : 'rgba(255, 255, 255, 0.18)',
                      },
                    ]}
                  />
                );
              })}
            </View>
          </View>

          <View style={s.navyHeroRight}>
            <DashboardRobotMascot />
          </View>
        </TouchableOpacity>

        {/* 2. 3 Topic Mini-Cards Row (Variabel, Tipe Data, Operator) */}
        <View style={s.threeTopicsRow}>
          {dashboard.topics.map((item) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.85}
              onPress={() =>
                navigation.navigate('TopicDetail', { topicId: item.id })
              }
              style={[
                s.miniTopicCard,
                !item.unlocked && s.miniTopicCardLocked,
              ]}
            >
              {item.unlocked ? (
                <MiniTopicRing pct={item.pct} color={item.accentColor} />
              ) : (
                <View
                  style={[
                    s.miniLockCircle,
                    {
                      backgroundColor: item.lockBg,
                      borderColor: item.lockBorder,
                    },
                  ]}
                >
                  <LockIcon
                    size={15}
                    color={item.lockColor}
                    keyholeColor={null}
                  />
                </View>
              )}

              <Text
                style={[
                  s.miniTopicTitle,
                  !item.unlocked && { color: '#475569' },
                ]}
                numberOfLines={1}
              >
                {item.title}
              </Text>

              <Text
                style={[
                  s.miniTopicSub,
                  { color: item.unlocked ? item.levelColor : '#94A3B8' },
                ]}
              >
                {item.levelLabel}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 3. Quiz Performance Card (Performa kuis) */}
        <View style={s.quizPerfCard}>
          <View style={s.quizPerfTopRow}>
            <Text style={s.quizPerfLabel}>Performa kuis</Text>
            <View style={s.quizLevelBadge}>
              <Text style={s.quizLevelBadgeText}>
                {dashboard.quizPerformance.levelBadge}
              </Text>
            </View>
          </View>

          <View style={s.quizAvgRow}>
            <Text style={s.quizAvgBigPct}>
              {dashboard.quizPerformance.averagePct}%
            </Text>
            <Text style={s.quizAvgSubText}> rata-rata</Text>
          </View>

          {/* 4 Bar Columns */}
          <View style={s.barsRow}>
            {dashboard.quizPerformance.history.map((bar) => {
              const fillPct = Math.round((bar.score / bar.total) * 100);
              return (
                <View key={bar.id} style={s.barCol}>
                  <Text style={s.barTopScoreText}>
                    {bar.score}/{bar.total}
                  </Text>

                  <View
                    style={[
                      s.barTrackBox,
                      { backgroundColor: bar.trackBg },
                    ]}
                  >
                    <View
                      style={[
                        s.barFillBox,
                        {
                          height: `${fillPct}%`,
                          backgroundColor: bar.fillBg,
                        },
                      ]}
                    />
                  </View>

                  <Text style={s.barBottomLabel}>{bar.label}</Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* 4. Bottom 2-Column Row: Flashcard & Perlu diulang */}
        <View style={s.bottomTwoCols}>
          {/* Left Card: Flashcard */}
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() =>
              navigation.navigate('Flashcard', { topicId: 'variabel' })
            }
            style={s.flashcardBlueCard}
          >
            <View style={s.summaryHeaderRow}>
              <View style={s.summaryBlueIconBox}>
                <FlashcardTileIcon size={14} color="#2554E8" />
              </View>
              <Text style={s.summaryCardLabel}>Flashcard</Text>
            </View>

            <View style={s.summaryValueRow}>
              <Text style={s.summaryBigNumber}>
                {dashboard.flashcardSummary.mastered}
              </Text>
              <Text style={s.summaryTotalNumber}>
                {' '}
                / {dashboard.flashcardSummary.total}
              </Text>
            </View>

            {/* Segmented Mini Bar */}
            <View style={s.fcMiniTrack}>
              <View
                style={[
                  s.fcMiniSegmentGreen,
                  { width: `${Math.max(masteredWidthPct, 24)}%` },
                ]}
              />
              <View
                style={[
                  s.fcMiniSegmentAmber,
                  { width: `${Math.max(learningWidthPct, 12)}%` },
                ]}
              />
            </View>
          </TouchableOpacity>

          {/* Right Card: Perlu diulang */}
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() =>
              navigation.navigate('Flashcard', {
                topicId: dashboard.repeatConcept.topicId,
              })
            }
            style={s.repeatCreamCard}
          >
            <View style={s.summaryHeaderRow}>
              <View style={s.repeatAmberIconBox}>
                <RepeatCycleIcon size={13} color="#D97706" />
              </View>
              <Text style={s.repeatHeaderLabel}>Perlu diulang</Text>
            </View>

            <Text style={s.repeatConceptTitle} numberOfLines={2}>
              {dashboard.repeatConcept.title}
            </Text>

            <Text style={s.repeatConceptCount}>
              {dashboard.repeatConcept.countLabel}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 32,
  },
  topHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  pageTitle: {
    fontFamily: fonts.extrabold,
    fontSize: 22,
    color: '#1F2A44',
  },
  growingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3E8FF',
    borderWidth: 1,
    borderColor: '#E9D5FF',
    borderRadius: 999,
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  growingPillText: {
    fontFamily: fonts.bold,
    fontSize: 11.5,
    color: '#7C3AED',
    marginLeft: 5,
  },
  completedTopPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F8EE',
    borderWidth: 1,
    borderColor: '#B8F0D5',
    borderRadius: 999,
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  trophyEmoji: {
    fontSize: 11,
    marginRight: 5,
  },
  completedTopPillText: {
    fontFamily: fonts.extrabold,
    fontSize: 11.5,
    color: '#10B981',
  },

  // ==========================================================================
  // FRAME 25 STYLES
  // ==========================================================================
  navyHeroCard: {
    backgroundColor: '#132A56',
    borderRadius: 24,
    paddingVertical: 18,
    paddingLeft: 22,
    paddingRight: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.14,
    shadowRadius: 12,
    elevation: 4,
  },
  navyHeroLeft: {
    flex: 1,
  },
  navyHeroOverline: {
    fontFamily: fonts.medium,
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.72)',
  },
  navyHeroPctRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 2,
  },
  navyHeroBigNum: {
    fontFamily: fonts.extrabold,
    fontSize: 36,
    color: '#FFFFFF',
  },
  navyHeroPctSymbol: {
    fontFamily: fonts.bold,
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.85)',
    marginLeft: 2,
  },
  navySegmentsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 10,
  },
  navySegmentPill: {
    width: 28,
    height: 6,
    borderRadius: 999,
  },
  navyHeroRight: {
    width: 98,
    height: 92,
    alignItems: 'center',
    justifyContent: 'center',
  },

  threeTopicsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 14,
  },
  miniTopicCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#E6ECF5',
    paddingVertical: 14,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  miniTopicCardLocked: {
    backgroundColor: '#FAFBFD',
    borderColor: '#E2E8F0',
    borderStyle: 'dashed',
  },
  miniRingWrap: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  miniRingText: {
    position: 'absolute',
    fontFamily: fonts.extrabold,
    fontSize: 11,
    color: '#1F2A44',
  },
  miniLockCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  miniTopicTitle: {
    marginTop: 10,
    fontFamily: fonts.extrabold,
    fontSize: 12.5,
    color: '#1F2A44',
    textAlign: 'center',
  },
  miniTopicSub: {
    marginTop: 2,
    fontFamily: fonts.bold,
    fontSize: 10.5,
    textAlign: 'center',
  },

  quizPerfCard: {
    marginTop: 14,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: '#E6ECF5',
    padding: 18,
  },
  quizPerfTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quizPerfLabel: {
    fontFamily: fonts.semibold,
    fontSize: 12.5,
    color: '#64748B',
  },
  quizLevelBadge: {
    backgroundColor: '#FEF3C7',
    borderRadius: 999,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  quizLevelBadgeText: {
    fontFamily: fonts.extrabold,
    fontSize: 10.5,
    color: '#B45309',
  },
  quizAvgRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 4,
  },
  quizAvgBigPct: {
    fontFamily: fonts.extrabold,
    fontSize: 28,
    color: '#1F2A44',
  },
  quizAvgSubText: {
    fontFamily: fonts.medium,
    fontSize: 12,
    color: '#94A3B8',
  },
  barsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 16,
  },
  barCol: {
    flex: 1,
    alignItems: 'center',
  },
  barTopScoreText: {
    fontFamily: fonts.bold,
    fontSize: 11,
    color: '#64748B',
    marginBottom: 6,
  },
  barTrackBox: {
    width: '100%',
    height: 66,
    borderRadius: 14,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  barFillBox: {
    width: '100%',
    borderRadius: 12,
  },
  barBottomLabel: {
    marginTop: 7,
    fontFamily: fonts.medium,
    fontSize: 11,
    color: '#94A3B8',
  },

  bottomTwoCols: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 14,
  },
  flashcardBlueCard: {
    flex: 1,
    backgroundColor: '#F3F7FF',
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#E0EAFF',
    padding: 15,
    justifyContent: 'space-between',
  },
  repeatCreamCard: {
    flex: 1,
    backgroundColor: '#FFFDF5',
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#FDE68A',
    padding: 15,
    justifyContent: 'space-between',
  },
  summaryHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryBlueIconBox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    backgroundColor: '#DCE7FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 7,
  },
  summaryPurpleIconBox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    backgroundColor: '#F3E8FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 7,
  },
  repeatAmberIconBox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 7,
  },
  summaryCardLabel: {
    fontFamily: fonts.semibold,
    fontSize: 12,
    color: '#64748B',
  },
  repeatHeaderLabel: {
    fontFamily: fonts.bold,
    fontSize: 12,
    color: '#D97706',
  },
  summaryValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 10,
  },
  summaryBigNumber: {
    fontFamily: fonts.extrabold,
    fontSize: 25,
    color: '#1F2A44',
  },
  summaryTotalNumber: {
    fontFamily: fonts.semibold,
    fontSize: 13,
    color: '#94A3B8',
  },
  fcMiniTrack: {
    marginTop: 12,
    height: 6,
    borderRadius: 999,
    backgroundColor: '#DCE6F7',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  fcMiniSegmentGreen: {
    height: '100%',
    backgroundColor: '#2ED47A',
  },
  fcMiniSegmentAmber: {
    height: '100%',
    backgroundColor: '#F59E0B',
  },
  repeatConceptTitle: {
    marginTop: 8,
    fontFamily: fonts.extrabold,
    fontSize: 13.5,
    lineHeight: 18,
    color: '#1F2A44',
  },
  repeatConceptCount: {
    marginTop: 10,
    fontFamily: fonts.medium,
    fontSize: 11.5,
    color: '#94A3B8',
  },

  // ==========================================================================
  // FRAME 26 STYLES
  // ==========================================================================
  donutCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: '#E6ECF5',
    paddingVertical: 20,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  donutWrap: {
    width: 114,
    height: 114,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  donutCenter: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  donutBigPct: {
    fontFamily: fonts.extrabold,
    fontSize: 22,
    color: '#1F2A44',
  },
  donutSubLabel: {
    fontFamily: fonts.medium,
    fontSize: 11,
    color: '#94A3B8',
    marginTop: -2,
  },
  legendCol: {
    flex: 1,
    marginLeft: 20,
  },
  legendItemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  legendDot: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
    marginTop: 4,
    marginRight: 10,
  },
  legendTextWrap: {
    flex: 1,
  },
  legendTopicName: {
    fontFamily: fonts.extrabold,
    fontSize: 13.5,
    color: '#1F2A44',
  },
  legendTopicMeta: {
    fontFamily: fonts.medium,
    fontSize: 11.5,
    color: '#94A3B8',
    marginTop: 1,
  },

  masteredBanner: {
    marginTop: 14,
    backgroundColor: '#18A96B',
    borderRadius: 22,
    paddingVertical: 18,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  masteredLeftCol: {
    flex: 1,
    paddingRight: 12,
  },
  masteredOverlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  masteredOverlineText: {
    fontFamily: fonts.extrabold,
    fontSize: 10,
    letterSpacing: 0.6,
    color: 'rgba(255, 255, 255, 0.9)',
    marginLeft: 5,
  },
  masteredTitle: {
    fontFamily: fonts.extrabold,
    fontSize: 24,
    color: '#FFFFFF',
    marginTop: 4,
  },
  masteredPillsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
  },
  masteredDarkPill: {
    backgroundColor: 'rgba(10, 75, 45, 0.36)',
    borderRadius: 999,
    paddingVertical: 5,
    paddingHorizontal: 11,
  },
  masteredDarkPillText: {
    fontFamily: fonts.bold,
    fontSize: 11,
    color: '#FFFFFF',
  },
  masteredBoxIllustWrap: {
    width: 64,
    height: 64,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.14)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  activeTopicRowCard: {
    marginTop: 14,
    backgroundColor: '#FEF7E0',
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#FDE68A',
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeTopicSquareIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#F5C451',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTopicSquareText: {
    fontFamily: fonts.extrabold,
    fontSize: 14,
    color: '#78350F',
  },
  activeTopicMiddleCol: {
    flex: 1,
    marginLeft: 13,
  },
  activeTopicTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeTopicName: {
    fontFamily: fonts.extrabold,
    fontSize: 15.5,
    color: '#1F2A44',
    marginRight: 8,
  },
  activeTopicLevelPill: {
    backgroundColor: '#FDE68A',
    borderRadius: 6,
    paddingVertical: 2,
    paddingHorizontal: 7,
  },
  activeTopicLevelPillText: {
    fontFamily: fonts.extrabold,
    fontSize: 9.5,
    color: '#92400E',
  },
  activeTopicSubtitle: {
    fontFamily: fonts.medium,
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  activeTopicPctText: {
    fontFamily: fonts.extrabold,
    fontSize: 16,
    color: '#1F2A44',
    marginLeft: 8,
  },

  summaryWhiteCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#E6ECF5',
    padding: 16,
  },
});
