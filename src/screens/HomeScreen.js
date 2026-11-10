import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { fonts } from '../constants/theme';
import { ContentRepository } from '../storage/ContentRepository';
import { ProgressRepository } from '../storage/ProgressRepository';
import { CardStatus, Level, TopicState } from '../constants/enums';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';
import { usePlacementGuard } from '../context/PlacementGuardContext';
import {
  WavingHandIcon,
  MiniRobotNodeIcon,
  CheckIcon,
  LockIcon,
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

// Tampilan tiap topik (warna hero, kartu aktif, dan kartu terkunci).
const THEMES = {
  variabel: {
    bg: '#2554E8',
    lip: '#1B3FB5',
    badgeBg: 'rgba(255, 255, 255, 0.16)',
    badgeDot: '#FACC15',
    badgeTextColor: '#FFFFFF',
    titleColor: '#FFFFFF',
    subColor: 'rgba(255, 255, 255, 0.85)',
    btnBg: '#FFFFFF',
    btnTextColor: '#2554E8',
    robotBadge: '#2554E8',
    activeBorder: null,
    activeIconBg: null,
    activeText: null,
    lockBg: '#EEF2FF',
    lockColor: '#2554E8',
    tips: 'Selesaikan minimal 7 kartu variabel hari ini agar streak belajarmu tetap aktif! 🔥',
  },
  tipe_data: {
    bg: '#F5B82E',
    lip: '#D99B16',
    badgeBg: 'rgba(120, 53, 15, 0.14)',
    badgeDot: '#78350F',
    badgeTextColor: '#78350F',
    titleColor: '#1F2A44',
    subColor: '#78350F',
    btnBg: '#1E293B',
    btnTextColor: '#FFFFFF',
    robotBadge: '#D97706',
    activeBorder: '#F5B82E',
    activeIconBg: '#F5B82E',
    activeText: '#D97706',
    lockBg: '#FEF6DF',
    lockColor: '#B7811F',
    tips: 'Pahami perbedaan Integer, String, dan Boolean agar tidak salah mengolah data! 🔥',
  },
  operator: {
    bg: '#F26B50',
    lip: '#C94A32',
    badgeBg: 'rgba(255, 255, 255, 0.2)',
    badgeDot: '#FACC15',
    badgeTextColor: '#FFFFFF',
    titleColor: '#FFFFFF',
    subColor: 'rgba(255, 255, 255, 0.9)',
    btnBg: '#FFFFFF',
    btnTextColor: '#E04F33',
    robotBadge: '#E04F33',
    activeBorder: '#F26B50',
    activeIconBg: '#F26B50',
    activeText: '#E04F33',
    lockBg: '#FFF0ED',
    lockColor: '#F28B76',
    tips: 'Latih operator aritmatika dan perbandingan untuk membangun logika program! 🔥',
  },
};

export default function HomeScreen({ navigation }) {
  const { user } = useAuth();
  const { guardPlacement } = usePlacementGuard();
  const displayName = user?.nama || 'Aura';

  // Satu daftar topik yang dibangun dari data server (progres + kartu).
  const [infos, setInfos] = useState(() =>
    ContentRepository.getAllTopics().map((t) => ({
      id: t.id,
      title: t.nama,
      level: Level.MUDAH,
      done: false,
      mastered: 0,
      total: 0,
      pct: 0,
    }))
  );
  const [notice, setNotice] = useState(null);

  useFocusEffect(
    useCallback(() => {
      let alive = true;
      (async () => {
        try {
          const topics = ContentRepository.getAllTopics();
          const [all, ...lists] = await Promise.all([
            ProgressRepository.getAll(),
            ...topics.map((t) => api.get(`/topics/${t.id}/cards`)),
          ]);
          if (!alive) return;
          const next = topics.map((t, i) => {
            const cards = lists[i].cards || [];
            const mastered = cards.filter(
              (c) => all.cards?.[c.id]?.status === CardStatus.DIKUASAI
            ).length;
            const prog = all.topics?.[t.id];
            const done = prog?.state === TopicState.DIKUASAI;
            return {
              id: t.id,
              title: t.nama,
              level: prog?.level || Level.MUDAH,
              done,
              mastered,
              total: cards.length,
              pct: done ? 100 : cards.length ? Math.round((mastered / cards.length) * 100) : 0,
            };
          });
          setInfos(next);
          // Samakan topik aktif untuk layar lain (Progres).
          const current = next.find((t) => !t.done) || next[next.length - 1];
          if (current) setGlobalActiveTopic(current.id);
        } catch (e) {
          console.warn('Gagal memuat progres:', e);
        }
      })();
      return () => {
        alive = false;
      };
    }, [])
  );

  // Topik aktif = topik pertama yang belum dikuasai. Topik setelahnya terkunci
  // sampai topik sebelumnya dikuasai.
  const activeIdx = infos.findIndex((t) => !t.done);
  const featuredIdx = activeIdx === -1 ? infos.length - 1 : activeIdx;
  const featured = infos[featuredIdx];
  const statusOf = (i) => (infos[i].done ? 'done' : i === activeIdx ? 'active' : 'locked');
  const theme = THEMES[featured?.id] || THEMES.variabel;
  const prevDone = featuredIdx > 0 && infos[featuredIdx - 1].done ? infos[featuredIdx - 1] : null;
  const startedTopicsCount = infos.filter((_, i) => statusOf(i) !== 'locked').length;
  const heroSubtitle = featured?.total
    ? `Flashcard ${featured.mastered} dari ${featured.total}`
    : 'Belum ada kartu';

  const openTopicDetail = (topicId) => {
    setGlobalActiveTopic(topicId);
    navigation.navigate('TopicDetail', { topicId });
  };

  const handleTopicPress = (i) => {
    if (statusOf(i) === 'locked') {
      const prev = infos[i - 1];
      setNotice(`Kuasai topik ${prev ? prev.title : 'sebelumnya'} dulu untuk membuka ${infos[i].title}.`);
      setTimeout(() => setNotice(null), 3500);
      return;
    }
    openTopicDetail(infos[i].id);
  };

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

      </View>

      {/* Main Content ScrollView */}
      <ScrollView
        style={s.scrollView}
        contentContainerStyle={s.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Banner Card (Desain konsisten dengan HomeScreen awal) */}
        <View
          style={[
            s.heroCard,
            {
              backgroundColor: theme.bg,
              borderBottomColor: theme.lip,
            },
          ]}
        >
          <View style={s.heroLeft}>
            <View
              style={[s.heroBadge, { backgroundColor: theme.badgeBg }]}
            >
              <View
                style={[
                  s.heroBadgeDot,
                  { backgroundColor: theme.badgeDot },
                ]}
              />
              <Text
                style={[
                  s.heroBadgeText,
                  { color: theme.badgeTextColor },
                ]}
              >
                {`Topik saat ini • ${featured?.level}`}
              </Text>
            </View>

            <Text style={[s.heroTitle, { color: theme.titleColor }]}>
              {featured?.title}
            </Text>
            <Text style={[s.heroSubtitle, { color: theme.subColor }]}>
              {heroSubtitle}
            </Text>

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => openTopicDetail(featured.id)}
              style={[s.heroButton, { backgroundColor: theme.btnBg }]}
            >
              <Text
                style={[
                  s.heroButtonText,
                  { color: theme.btnTextColor },
                ]}
              >
                Lanjutkan
              </Text>
              <ArrowRightIcon
                size={15}
                color={theme.btnTextColor}
                strokeWidth={2.5}
              />
            </TouchableOpacity>
          </View>

          <View style={s.heroRight}>
            <HeroRobotIllustration badgeColor={theme.robotBadge} />
          </View>
        </View>

        {/* Banner Pencapaian Hijau saat topik sebelumnya sudah dikuasai */}
        {prevDone && (
          <View style={s.achievementBanner}>
            <View style={s.trophyCircle}>
              <TrophyIcon size={14} color="#10B981" />
            </View>
            <Text style={s.achievementText}>
              {prevDone.title} <Text style={s.achievementHighlight}>sudah dikuasai</Text>
            </Text>
          </View>
        )}

        {notice && (
          <View style={s.noticeBanner}>
            <LockIcon size={14} color="#B45309" />
            <Text style={s.noticeText}>{notice}</Text>
          </View>
        )}

        {/* Section Header: Jalur Belajar */}
        <View style={s.sectionHeader}>
          <Text style={s.sectionTitle}>Jalur Belajar</Text>
          <View style={s.sectionCountPill}>
            <Text style={s.sectionCountText}>
              {startedTopicsCount} dari {infos.length} topik dimulai
            </Text>
          </View>
        </View>

        {/* Zig-Zag Learning Path: dibangun dari status tiap topik di server */}
        <View style={s.pathContainer}>
          {/* Tes Awal */}
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={async () => {
              if (await guardPlacement()) return;
              navigation.navigate('Welcome');
            }}
            style={[s.stepCard, s.stepCardLeft]}
          >
            <View style={s.doneIconBox}>
              <CheckIcon size={22} color="#FFFFFF" strokeWidth={2.8} />
            </View>
            <View style={s.stepTextCol}>
              <Text style={s.stepTitle}>Tes Awal</Text>
              <View style={s.statusRow}>
                <View style={s.doneDot} />
                <Text style={s.doneStatusText}>
                  {user?.placementDone ? 'Selesai' : 'Belum dikerjakan'}
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          {infos.map((t, i) => {
            const status = statusOf(i);
            const th = THEMES[t.id] || THEMES.variabel;
            const sideStyle = i % 2 === 0 ? s.stepCardRight : s.stepCardLeft;
            // Konektor dari kartu sebelumnya (Tes Awal ada di kiri) ke kartu ini.
            const fromRight = i > 0 && (i - 1) % 2 === 0;
            return (
              <React.Fragment key={t.id}>
                <CurvedConnector fromRight={fromRight} active={status !== 'locked'} />

                {status === 'active' ? (
                  <View style={[s.activeCardWrapper, sideStyle]}>
                    <View style={s.hereBadge}>
                      <View style={s.hereBadgeDot} />
                      <Text style={s.hereBadgeText}>Kamu di sini</Text>
                    </View>

                    <TouchableOpacity
                      activeOpacity={0.85}
                      onPress={() => handleTopicPress(i)}
                      style={[
                        s.stepCard,
                        s.stepCardActive,
                        th.activeBorder && { borderColor: th.activeBorder },
                      ]}
                    >
                      <View style={s.activeIconWrapper}>
                        <View
                          style={[
                            s.activeIconBox,
                            th.activeIconBg && { backgroundColor: th.activeIconBg },
                          ]}
                        >
                          <MiniRobotNodeIcon />
                        </View>
                        <View style={s.stepCountBadge}>
                          <Text style={s.stepCountBadgeText}>{t.mastered}</Text>
                        </View>
                      </View>

                      <View style={s.stepTextCol}>
                        <Text style={s.stepTitle}>{t.title}</Text>
                        <Text style={[s.activeStatusText, th.activeText && { color: th.activeText }]}>
                          Sedang belajar • {t.pct}%
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                ) : status === 'done' ? (
                  <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() => handleTopicPress(i)}
                    style={[s.stepCard, sideStyle]}
                  >
                    <View style={s.doneIconBox}>
                      <CheckIcon size={22} color="#FFFFFF" strokeWidth={2.8} />
                    </View>
                    <View style={s.stepTextCol}>
                      <Text style={s.stepTitle}>{t.title}</Text>
                      <View style={s.statusRow}>
                        <View style={s.doneDot} />
                        <Text style={s.doneStatusText}>Dikuasai • {t.level}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => handleTopicPress(i)}
                    style={[s.stepCard, s.stepCardLocked, sideStyle]}
                  >
                    <View style={[s.lockedIconBox, { backgroundColor: th.lockBg }]}>
                      <LockIcon size={20} color={th.lockColor} />
                    </View>
                    <View style={s.stepTextCol}>
                      <Text style={s.lockedTitle}>{t.title}</Text>
                      <Text style={s.lockedStatusText}>Terkunci</Text>
                    </View>
                  </TouchableOpacity>
                )}
              </React.Fragment>
            );
          })}
        </View>

        {/* Bottom Tips Card */}
        <View style={s.tipsCard}>
          <View style={s.tipsIconCircle}>
            <LightbulbIcon size={18} color="#2554E8" />
          </View>
          <View style={s.tipsTextCol}>
            <Text style={s.tipsTitle}>Tips Belajar Flip</Text>
            <Text style={s.tipsBody}>{theme.tips}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  noticeBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    borderWidth: 1,
    borderColor: '#FDE68A',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 14,
  },
  noticeText: {
    flex: 1,
    marginLeft: 8,
    fontFamily: fonts.bold,
    fontSize: 12.5,
    color: '#92400E',
  },
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
  connectorWrap: {
    width: '100%',
    height: 40,
    marginVertical: -2,
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
