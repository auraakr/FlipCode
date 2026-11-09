import { fonts } from '../constants/theme';
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image , StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { ContentRepository } from '../storage/ContentRepository';
import { ProgressRepository } from '../storage/ProgressRepository';
import { CardStatus } from '../constants/enums';
import { useAuth } from '../context/AuthContext';
import { HOME_HERO_CONFIGS } from '../data/screenConfigs';
import {
  WavingHandIcon,
  MiniRobotNodeIcon,
  CheckIcon,
  LockIcon,
  CodeBracketsIcon,
  ArrowRightIcon,
  TrophyIcon,
  LightbulbIcon,
} from '../../assets/icons/AppIcons';
import {
  HeroRobotIllustration,
  CurvedConnector,
} from '../../assets/illustrations/MascotIllustrations';

// Shared state agar topik aktif ('variabel' | 'tipe_data' | 'operator') selalu sinkron
// ketika berpindah halaman atau menekan tombol Back dari TopicDetail / TopicCompleted
let globalActiveTopic = 'variabel';

export function getGlobalActiveTopic() {
  return globalActiveTopic;
}

export function setGlobalActiveTopic(topicId) {
  if (
    topicId === 'variabel' ||
    topicId === 'tipe_data' ||
    topicId === 'operator'
  ) {
    globalActiveTopic = topicId;
  }
}

export default function HomeScreen({ route, navigation }) {
  const { user } = useAuth();
  const [studiedCards, setStudiedCards] = useState(3);
  const [totalCards, setTotalCards] = useState(10);
  const [activeTopic, setActiveTopic] = useState(() => getGlobalActiveTopic());

  useEffect(() => {
    if (route?.params?.activeTopic) {
      setGlobalActiveTopic(route.params.activeTopic);
      setActiveTopic(route.params.activeTopic);
    }
  }, [route?.params?.activeTopic]);

  useFocusEffect(
    useCallback(() => {
      setActiveTopic(getGlobalActiveTopic());

      (async () => {
        try {
          const current = getGlobalActiveTopic();
          const all = await ProgressRepository.getAll();
          const cards = ContentRepository.getFlashcardsByTopic(current);
          const count = cards.filter(
            (c) =>
              all.cards[c.id]?.status === CardStatus.DIKUASAI ||
              all.cards[c.id]?.status === CardStatus.SEDANG
          ).length;

          setStudiedCards(count > 0 ? count : current === 'variabel' ? 3 : 1);
          setTotalCards(cards.length >= 10 ? cards.length : 10);
        } catch (e) {
          console.warn('Gagal memuat progres:', e);
        }
      })();
    }, [])
  );

  const updateTopic = (nextTopic) => {
    setGlobalActiveTopic(nextTopic);
    setActiveTopic(nextTopic);
  };

  const cycleActiveTopic = () => {
    const next =
      activeTopic === 'variabel'
        ? 'tipe_data'
        : activeTopic === 'tipe_data'
        ? 'operator'
        : 'variabel';
    updateTopic(next);
  };

  const openTopicDetail = (topicId) => {
    updateTopic(topicId);
    navigation.navigate('TopicDetail', { topicId });
  };

  const progressPct = Math.round((studiedCards / totalCards) * 100) || 30;
  const displayName = user?.nama || 'Aura';

  const isVariabelActive = activeTopic === 'variabel';
  const isTipeDataActive = activeTopic === 'tipe_data';
  const isOperatorActive = activeTopic === 'operator';

  const heroConfig = HOME_HERO_CONFIGS[activeTopic] || HOME_HERO_CONFIGS.variabel;
  const startedTopicsCount = isOperatorActive ? 3 : isTipeDataActive ? 2 : 1;

  return (
    <SafeAreaView style={s.safeArea} edges={['top']}>
      {/* Top Header */}
      <View style={s.header}>
        <View style={s.headerLeft}>
          <Image
            source={require('../../assets/pengaturan/icon_dumy_profile.png')}
            style={s.avatarImage}
          />
          <View style={s.greetingContainer}>
            <View style={s.greetingSubRow}>
              <Text style={s.greetingSubtitle}>Hai, {displayName}! </Text>
              <WavingHandIcon />
            </View>
            <Text style={s.greetingTitle}>Yuk, lanjut belajar!</Text>
          </View>
        </View>

        {/* Tombol < > di kanan atas untuk berpindah fase Variabel / Tipe Data / Operator */}
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={cycleActiveTopic}
          style={s.codeHeaderButton}
          accessibilityLabel="Ganti tampilan topik aktif"
        >
          <CodeBracketsIcon size={18} color="#2554E8" strokeWidth={2.2} />
        </TouchableOpacity>
      </View>

      {/* Main Content ScrollView */}
      <ScrollView
        style={s.scrollView}
        contentContainerStyle={s.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Banner Card */}
        <View
          style={[
            s.heroCard,
            {
              backgroundColor: heroConfig.bg,
              borderBottomColor: heroConfig.lip,
            },
          ]}
        >
          <View style={s.heroLeft}>
            <View
              style={[s.heroBadge, { backgroundColor: heroConfig.badgeBg }]}
            >
              <View
                style={[
                  s.heroBadgeDot,
                  { backgroundColor: heroConfig.badgeDot },
                ]}
              />
              <Text
                style={[
                  s.heroBadgeText,
                  { color: heroConfig.badgeTextColor },
                ]}
              >
                {heroConfig.badgeText}
              </Text>
            </View>

            <Text style={[s.heroTitle, { color: heroConfig.titleColor }]}>
              {heroConfig.title}
            </Text>
            <Text style={[s.heroSubtitle, { color: heroConfig.subColor }]}>
              Flashcard {studiedCards} dari {totalCards}
            </Text>

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => openTopicDetail(activeTopic)}
              style={[s.heroButton, { backgroundColor: heroConfig.btnBg }]}
            >
              <Text
                style={[
                  s.heroButtonText,
                  { color: heroConfig.btnTextColor },
                ]}
              >
                Lanjutkan
              </Text>
              <ArrowRightIcon
                size={15}
                color={heroConfig.btnTextColor}
                strokeWidth={2.5}
              />
            </TouchableOpacity>
          </View>

          <View style={s.heroRight}>
            <HeroRobotIllustration badgeColor={heroConfig.robotBadge} />
          </View>
        </View>

        {/* Banner Pencapaian Hijau saat topik sebelumnya sudah dikuasai */}
        {heroConfig.completedNote && (
          <View style={s.achievementBanner}>
            <View style={s.trophyCircle}>
              <TrophyIcon size={14} color="#10B981" />
            </View>
            <Text style={s.achievementText}>
              {isTipeDataActive ? 'Variabel' : 'Tipe Data'} selesai dengan{' '}
              <Text style={s.achievementHighlight}>80%</Text> kartu dikuasai
            </Text>
          </View>
        )}

        {/* Section Header: Jalur Belajar */}
        <View style={s.sectionHeader}>
          <Text style={s.sectionTitle}>Jalur Belajar</Text>
          <View style={s.sectionCountPill}>
            <Text style={s.sectionCountText}>
              {startedTopicsCount} dari 3 topik dimulai
            </Text>
          </View>
        </View>

        {/* Zig-Zag Learning Path Cards */}
        <View style={s.pathContainer}>
          {/* 1. Tes Awal (Left - Selesai) */}
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => navigation.navigate('Welcome')}
            style={[s.stepCard, s.stepCardLeft]}
          >
            <View style={s.doneIconBox}>
              <CheckIcon size={22} color="#FFFFFF" strokeWidth={2.8} />
            </View>
            <View style={s.stepTextCol}>
              <Text style={s.stepTitle}>Tes Awal</Text>
              <View style={s.statusRow}>
                <View style={s.doneDot} />
                <Text style={s.doneStatusText}>Selesai</Text>
              </View>
            </View>
          </TouchableOpacity>

          <CurvedConnector fromRight={false} active={true} />

          {/* 2. Variabel */}
          {isVariabelActive ? (
            <View style={[s.activeCardWrapper, s.stepCardRight]}>
              <View style={s.hereBadge}>
                <View style={s.hereBadgeDot} />
                <Text style={s.hereBadgeText}>Kamu di sini</Text>
              </View>

              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => openTopicDetail('variabel')}
                style={[s.stepCard, s.stepCardActive]}
              >
                <View style={s.activeIconWrapper}>
                  <View style={s.activeIconBox}>
                    <MiniRobotNodeIcon />
                  </View>
                  <View style={s.stepCountBadge}>
                    <Text style={s.stepCountBadgeText}>{studiedCards}</Text>
                  </View>
                </View>

                <View style={s.stepTextCol}>
                  <Text style={s.stepTitle}>Variabel</Text>
                  <Text style={s.activeStatusText}>
                    Sedang belajar • {progressPct}%
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => openTopicDetail('variabel')}
              style={[s.stepCard, s.stepCardRight]}
            >
              <View style={s.doneIconBox}>
                <CheckIcon size={22} color="#FFFFFF" strokeWidth={2.8} />
              </View>
              <View style={s.stepTextCol}>
                <Text style={s.stepTitle}>Variabel</Text>
                <View style={s.statusRow}>
                  <View style={s.doneDot} />
                  <Text style={s.doneStatusText}>Selesai • 80%</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}

          <CurvedConnector
            fromRight={true}
            active={isTipeDataActive || isOperatorActive}
          />

          {/* 3. Tipe Data */}
          {isTipeDataActive ? (
            <View style={[s.activeCardWrapper, s.stepCardLeft]}>
              <View style={s.hereBadge}>
                <View style={s.hereBadgeDot} />
                <Text style={s.hereBadgeText}>Kamu di sini</Text>
              </View>

              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => openTopicDetail('tipe_data')}
                style={[
                  s.stepCard,
                  s.stepCardActive,
                  { borderColor: '#F5B82E' },
                ]}
              >
                <View style={s.activeIconWrapper}>
                  <View
                    style={[s.activeIconBox, { backgroundColor: '#F5B82E' }]}
                  >
                    <MiniRobotNodeIcon />
                  </View>
                  <View style={s.stepCountBadge}>
                    <Text style={s.stepCountBadgeText}>{studiedCards}</Text>
                  </View>
                </View>

                <View style={s.stepTextCol}>
                  <Text style={s.stepTitle}>Tipe Data</Text>
                  <Text style={[s.activeStatusText, { color: '#D97706' }]}>
                    Sedang belajar • {progressPct}%
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : isOperatorActive ? (
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => openTopicDetail('tipe_data')}
              style={[s.stepCard, s.stepCardLeft]}
            >
              <View style={s.doneIconBox}>
                <CheckIcon size={22} color="#FFFFFF" strokeWidth={2.8} />
              </View>
              <View style={s.stepTextCol}>
                <Text style={s.stepTitle}>Tipe Data</Text>
                <View style={s.statusRow}>
                  <View style={s.doneDot} />
                  <Text style={s.doneStatusText}>Selesai • 80%</Text>
                </View>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => openTopicDetail('tipe_data')}
              style={[s.stepCard, s.stepCardLocked, s.stepCardLeft]}
            >
              <View style={[s.lockedIconBox, { backgroundColor: '#FEF6DF' }]}>
                <LockIcon size={20} color="#B7811F" />
              </View>
              <View style={s.stepTextCol}>
                <Text style={s.lockedTitle}>Tipe Data</Text>
                <Text style={s.lockedStatusText}>Terkunci</Text>
              </View>
            </TouchableOpacity>
          )}

          <CurvedConnector fromRight={false} active={isOperatorActive} />

          {/* 4. Operator */}
          {isOperatorActive ? (
            <View style={[s.activeCardWrapper, s.stepCardRight]}>
              <View style={s.hereBadge}>
                <View style={s.hereBadgeDot} />
                <Text style={s.hereBadgeText}>Kamu di sini</Text>
              </View>

              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => openTopicDetail('operator')}
                style={[
                  s.stepCard,
                  s.stepCardActive,
                  { borderColor: '#F26B50' },
                ]}
              >
                <View style={s.activeIconWrapper}>
                  <View
                    style={[s.activeIconBox, { backgroundColor: '#F26B50' }]}
                  >
                    <MiniRobotNodeIcon />
                  </View>
                  <View style={s.stepCountBadge}>
                    <Text style={s.stepCountBadgeText}>{studiedCards}</Text>
                  </View>
                </View>

                <View style={s.stepTextCol}>
                  <Text style={s.stepTitle}>Operator</Text>
                  <Text style={[s.activeStatusText, { color: '#E04F33' }]}>
                    Sedang belajar • {progressPct}%
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => openTopicDetail('operator')}
              style={[s.stepCard, s.stepCardLocked, s.stepCardRight]}
            >
              <View style={[s.lockedIconBox, { backgroundColor: '#FFF0ED' }]}>
                <LockIcon size={20} color="#F28B76" />
              </View>
              <View style={s.stepTextCol}>
                <Text style={s.lockedTitle}>Operator</Text>
                <Text style={s.lockedStatusText}>Terkunci</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>

        {/* Bottom Tips Card */}
        <View style={s.tipsCard}>
          <View style={s.tipsIconCircle}>
            <LightbulbIcon size={18} color="#2554E8" />
          </View>
          <View style={s.tipsTextCol}>
            <Text style={s.tipsTitle}>Tips Belajar Flip</Text>
            <Text style={s.tipsBody}>{heroConfig.tipsText}</Text>
          </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 14,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    backgroundColor: '#E2E8F0',
  },
  greetingContainer: {
    marginLeft: 12,
  },
  greetingSubRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greetingSubtitle: {
    fontSize: 12.5,
    fontFamily: fonts.semibold,
    color: '#7C8BA1',
  },
  greetingTitle: {
    fontSize: 18,
    fontFamily: fonts.extrabold,
    color: '#1F2A44',
    marginTop: 1,
  },
  codeHeaderButton: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E6ECF5',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 28,
  },
  heroCard: {
    backgroundColor: '#2554E8',
    borderRadius: 24,
    paddingVertical: 18,
    paddingLeft: 20,
    paddingRight: 10,
    borderBottomWidth: 4,
    borderBottomColor: '#1B3FB5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  heroLeft: {
    flex: 1,
    paddingRight: 6,
  },
  heroBadge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    borderRadius: 999,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  heroBadgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FACC15',
    marginRight: 6,
  },
  heroBadgeText: {
    fontFamily: fonts.bold,
    fontSize: 11,
    color: '#FFFFFF',
  },
  heroTitle: {
    fontFamily: fonts.extrabold,
    fontSize: 26,
    color: '#FFFFFF',
    marginTop: 10,
  },
  heroSubtitle: {
    fontFamily: fonts.medium,
    fontSize: 12.5,
    color: 'rgba(255, 255, 255, 0.85)',
    marginTop: 2,
  },
  heroButton: {
    marginTop: 16,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 999,
    paddingVertical: 9,
    paddingHorizontal: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  heroButtonText: {
    fontFamily: fonts.extrabold,
    fontSize: 13,
    color: '#2554E8',
    marginRight: 6,
  },
  heroRight: {
    width: 132,
    height: 134,
    alignItems: 'center',
    justifyContent: 'center',
  },
  achievementBanner: {
    marginTop: 12,
    backgroundColor: '#E3F8EE',
    borderWidth: 1,
    borderColor: '#B8F0D5',
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  trophyCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#D1FAE5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  achievementText: {
    flex: 1,
    fontFamily: fonts.semibold,
    fontSize: 12,
    color: '#1F2A44',
  },
  achievementHighlight: {
    fontFamily: fonts.extrabold,
    color: '#10B981',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 14,
  },
  sectionTitle: {
    fontFamily: fonts.extrabold,
    fontSize: 18,
    color: '#1F2A44',
  },
  sectionCountPill: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E6ECF5',
    borderRadius: 999,
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  sectionCountText: {
    fontFamily: fonts.bold,
    fontSize: 11,
    color: '#64748B',
  },
  pathContainer: {
    width: '100%',
  },
  stepCard: {
    width: '63%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#E6ECF5',
    paddingVertical: 13,
    paddingHorizontal: 14,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 5,
    elevation: 1,
  },
  stepCardLeft: {
    alignSelf: 'flex-start',
  },
  stepCardRight: {
    alignSelf: 'flex-end',
  },
  activeCardWrapper: {
    width: '66%',
    position: 'relative',
    marginTop: 6,
  },
  hereBadge: {
    position: 'absolute',
    top: -12,
    alignSelf: 'center',
    zIndex: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 999,
    paddingVertical: 4,
    paddingHorizontal: 11,
  },
  hereBadgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FACC15',
    marginRight: 5,
  },
  hereBadgeText: {
    fontFamily: fonts.bold,
    fontSize: 10.5,
    color: '#FFFFFF',
  },
  stepCardActive: {
    width: '100%',
    borderWidth: 2,
    borderColor: '#2554E8',
    paddingTop: 16,
    paddingBottom: 14,
    shadowColor: '#2554E8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  stepCardLocked: {
    backgroundColor: '#FAFBFD',
    borderColor: '#DCE4F0',
    borderStyle: 'dashed',
    shadowOpacity: 0,
    elevation: 0,
  },
  doneIconBox: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#2ED47A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeIconWrapper: {
    position: 'relative',
  },
  activeIconBox: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#2554E8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepCountBadge: {
    position: 'absolute',
    right: -4,
    bottom: -4,
    width: 19,
    height: 19,
    borderRadius: 9.5,
    backgroundColor: '#FACC15',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepCountBadgeText: {
    fontFamily: fonts.extrabold,
    fontSize: 9.5,
    color: '#1F2A44',
  },
  lockedIconBox: {
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepTextCol: {
    flex: 1,
    marginLeft: 12,
  },
  stepTitle: {
    fontFamily: fonts.extrabold,
    fontSize: 15,
    color: '#1F2A44',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },
  doneDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#2ED47A',
    marginRight: 5,
  },
  doneStatusText: {
    fontFamily: fonts.bold,
    fontSize: 12,
    color: '#2ED47A',
  },
  activeStatusText: {
    fontFamily: fonts.bold,
    fontSize: 11.5,
    color: '#2554E8',
    marginTop: 3,
  },
  lockedTitle: {
    fontFamily: fonts.extrabold,
    fontSize: 15,
    color: '#7C8BA1',
  },
  lockedStatusText: {
    fontFamily: fonts.medium,
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 2,
  },
  tipsCard: {
    marginTop: 22,
    backgroundColor: '#F4F7FF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2ECFF',
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tipsIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#E5EDFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  tipsTextCol: {
    flex: 1,
  },
  tipsTitle: {
    fontFamily: fonts.extrabold,
    fontSize: 12.5,
    color: '#1F2A44',
  },
  tipsBody: {
    fontFamily: fonts.medium,
    fontSize: 11.5,
    lineHeight: 17,
    color: '#475569',
    marginTop: 2,
  },
});
