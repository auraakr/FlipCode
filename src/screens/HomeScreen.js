import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
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
import s from '../styles/HomeScreen.styles';

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
