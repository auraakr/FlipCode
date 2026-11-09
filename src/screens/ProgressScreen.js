import React, { useCallback, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { ProgressRepository } from '../storage/ProgressRepository';
import { getGlobalActiveTopic } from './HomeScreen';
import { mapRepositoryToProgressModels } from '../data/screenConfigs';
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
import s from '../styles/ProgressScreen.styles';

export default function ProgressScreen({ route, navigation }) {
  const [viewMode, setViewMode] = useState('dashboard');
  const [models, setModels] = useState(() =>
    mapRepositoryToProgressModels(null, 'variabel')
  );

  useFocusEffect(
    useCallback(() => {
      const currentTopic = getGlobalActiveTopic();
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
          setModels(mapRepositoryToProgressModels(all, currentTopic));
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
          <View style={s.topHeaderRow}>
            <Text style={s.pageTitle}>Progres Belajar</Text>

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

          {/* 2. Green Mastered Topic Banner: Variabel */}
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

          {/* 3. Active Topic Row Card: Tipe Data */}
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

          {/* 4. Bottom 2-Column Summary Cards */}
          <View style={s.bottomTwoCols}>
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
        <View style={s.topHeaderRow}>
          <Text style={s.pageTitle}>Progres Belajar</Text>

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

        {/* 1. Dark Navy Hero Banner */}
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

        {/* 2. 3 Topic Mini-Cards Row */}
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

        {/* 3. Quiz Performance Card */}
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

        {/* 4. Bottom 2-Column Row */}
        <View style={s.bottomTwoCols}>
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
