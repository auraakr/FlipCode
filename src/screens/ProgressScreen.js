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
import Svg, { Path } from 'react-native-svg';
import { fonts } from '../constants/theme';
import { ContentRepository } from '../storage/ContentRepository';
import { ProgressRepository } from '../storage/ProgressRepository';
import { CardStatus } from '../constants/enums';

export default function ProgressScreen({ navigation }) {
  const [variabelData, setVariabelData] = useState({
    mastered: 0,
    total: 10,
    pct: 0,
    level: 'Belum ada',
    lastQuiz: 'Belum ada',
    statusBadge: 'Belum dimulai',
  });

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          const all = await ProgressRepository.getAll();
          const topicProg = await ProgressRepository.getTopicProgress('variabel');
          const cards = ContentRepository.getFlashcardsByTopic('variabel');
          const masteredCount = cards.filter(
            (c) => all.cards[c.id]?.status === CardStatus.DIKUASAI
          ).length;

          // Jika sudah ada progres riil di database, tampilkan progres riil
          if (masteredCount > 0) {
            const total = cards.length || 10;
            const pct = Math.round((masteredCount / total) * 100);
            setVariabelData({
              mastered: masteredCount,
              total,
              pct,
              level: topicProg.level || 'Sedang',
              lastQuiz: topicProg.lastQuizScore || 'Belum ada',
              statusBadge: pct >= 80 ? 'Dikuasai' : 'Perlu diulang',
            });
          }
        } catch (e) {
          console.warn('Gagal memuat progres:', e);
        }
      })();
    }, [])
  );

  return (
    <SafeAreaView style={s.safeArea} edges={['top']}>
      {/* Top Header Bar */}
      <View style={s.header}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Belajar')}
          style={s.headerButton}
        >
          <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <Path
              d="M19 12H5M5 12L12 19M5 12L12 5"
              stroke="#2F66EE"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </TouchableOpacity>

        {/* Center Logo FlipCode */}
        <View style={s.logoContainer}>
          <Image
            source={require('../../assets/nama_logo.png')}
            style={s.logo}
            resizeMode="contain"
          />
        </View>

        {/* Right Streak Fire Icon */}
        <View style={s.headerButtonRight}>
          <Text style={s.fireIcon}>🔥</Text>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView
        style={s.scrollView}
        contentContainerStyle={s.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Title Section */}
        <Text style={s.pageTitle}>Progres Belajar</Text>
        <Text style={s.pageSubtitle}>Sedikit demi sedikit, makin jago!</Text>

        {/* Card 1: Variabel */}
        <View style={s.card}>
          <View style={s.cardHeaderRow}>
            <Text style={s.cardTitle}>Variabel</Text>
            <View style={variabelData.level === 'Belum ada' ? s.badgeLocked : s.badgeLevel}>
              <Text style={variabelData.level === 'Belum ada' ? s.badgeLockedText : s.badgeLevelText}>
                Level: {variabelData.level}
              </Text>
            </View>
          </View>

          <View style={s.cardMetaRow}>
            <Text style={variabelData.pct > 0 ? s.cardMetaText : s.cardMetaTextLocked}>
              {variabelData.mastered} dari {variabelData.total} kartu dikuasai
            </Text>
            <Text style={variabelData.pct > 0 ? s.cardPctText : s.cardPctTextLocked}>
              {variabelData.pct}%
            </Text>
          </View>

          {/* Progress Bar */}
          <View style={s.progressTrack}>
            <View style={[s.progressFill, { width: `${variabelData.pct}%` }]} />
          </View>

          {/* Card Footer */}
          <View style={s.cardFooterRow}>
            <Text style={variabelData.pct > 0 ? s.cardScoreText : s.cardScoreTextLocked}>
              Skor terakhir: {variabelData.lastQuiz}
            </Text>
            <View style={variabelData.statusBadge === 'Belum dimulai' ? s.badgeMuted : s.badgeWarning}>
              <Text style={variabelData.statusBadge === 'Belum dimulai' ? s.badgeMutedText : s.badgeWarningText}>
                {variabelData.statusBadge}
              </Text>
            </View>
          </View>
        </View>

        {/* Card 2: Tipe Data (Terkunci) */}
        <View style={s.card}>
          <View style={s.cardHeaderRow}>
            <View style={s.titleWithLock}>
              <Text style={s.cardTitleLocked}>Tipe Data</Text>
              <Image
                source={require('../../assets/home_screen/icon_lock.png')}
                style={s.lockIcon}
                resizeMode="contain"
              />
            </View>
            <View style={s.badgeLocked}>
              <Text style={s.badgeLockedText}>Terkunci</Text>
            </View>
          </View>

          <View style={s.cardMetaRow}>
            <Text style={s.cardMetaTextLocked}>0 dari 10 kartu dikuasai</Text>
            <Text style={s.cardPctTextLocked}>0%</Text>
          </View>

          {/* Progress Bar 0% */}
          <View style={s.progressTrack}>
            <View style={[s.progressFill, { width: '0%' }]} />
          </View>

          <View style={s.cardFooterRow}>
            <Text style={s.cardScoreTextLocked}>Skor terakhir: Belum ada</Text>
            <View style={s.badgeMuted}>
              <Text style={s.badgeMutedText}>Belum dimulai</Text>
            </View>
          </View>
        </View>

        {/* Card 3: Operator (Terkunci) */}
        <View style={s.card}>
          <View style={s.cardHeaderRow}>
            <View style={s.titleWithLock}>
              <Text style={s.cardTitleLocked}>Operator</Text>
              <Image
                source={require('../../assets/home_screen/icon_lock.png')}
                style={s.lockIcon}
                resizeMode="contain"
              />
            </View>
            <View style={s.badgeLocked}>
              <Text style={s.badgeLockedText}>Terkunci</Text>
            </View>
          </View>

          <View style={s.cardMetaRow}>
            <Text style={s.cardMetaTextLocked}>0 dari 10 kartu dikuasai</Text>
            <Text style={s.cardPctTextLocked}>0%</Text>
          </View>

          {/* Progress Bar 0% */}
          <View style={s.progressTrack}>
            <View style={[s.progressFill, { width: '0%' }]} />
          </View>

          <View style={s.cardFooterRow}>
            <Text style={s.cardScoreTextLocked}>Skor terakhir: Belum ada</Text>
            <View style={s.badgeMuted}>
              <Text style={s.badgeMutedText}>Belum dimulai</Text>
            </View>
          </View>
        </View>

        {/* Section: Yuk, ulangi konsep ini! */}
        <Text style={s.sectionTitle}>Yuk, ulangi konsep ini!</Text>
        <View style={s.repeatCard}>
          <View style={s.repeatList}>
            <View style={s.repeatItem}>
              <View style={s.bulletDot} />
              <Text style={s.repeatItemText}>Aturan Nama Variabel</Text>
            </View>
            <View style={[s.repeatItem, { marginTop: 8 }]}>
              <View style={s.bulletDot} />
              <Text style={s.repeatItemText}>Pengertian Variabel</Text>
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => navigation.navigate('Flashcard', { topicId: 'variabel' })}
            style={s.repeatButton}
          >
            <Text style={s.repeatButtonText}>Ulangi Kartu</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAF8F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 8,
    backgroundColor: '#FAF8F5',
    borderBottomWidth: 1,
    borderBottomColor: '#EEF2F6',
  },
  headerButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerButtonRight: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  logoContainer: {
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 155,
    height: 78,
  },
  fireIcon: {
    fontSize: 20,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 100,
  },
  pageTitle: {
    fontSize: 22,
    fontFamily: fonts.extrabold,
    color: '#0F172A',
  },
  pageSubtitle: {
    fontSize: 13,
    fontFamily: fonts.medium,
    color: '#64748B',
    marginTop: 4,
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EEF2F6',
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 17,
    fontFamily: fonts.bold,
    color: '#0F172A',
  },
  cardTitleLocked: {
    fontSize: 17,
    fontFamily: fonts.bold,
    color: '#64748B',
  },
  titleWithLock: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lockIcon: {
    width: 14,
    height: 14,
    marginLeft: 6,
    tintColor: '#64748B',
  },
  badgeLevel: {
    backgroundColor: '#EDF3FE',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  badgeLevelText: {
    fontSize: 11,
    fontFamily: fonts.bold,
    color: '#2F66EE',
  },
  badgeLocked: {
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  badgeLockedText: {
    fontSize: 11,
    fontFamily: fonts.semibold,
    color: '#94A3B8',
  },
  cardMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  cardMetaText: {
    fontSize: 13,
    fontFamily: fonts.medium,
    color: '#475569',
  },
  cardMetaTextLocked: {
    fontSize: 13,
    fontFamily: fonts.medium,
    color: '#94A3B8',
  },
  cardPctText: {
    fontSize: 13,
    fontFamily: fonts.extrabold,
    color: '#2F66EE',
  },
  cardPctTextLocked: {
    fontSize: 13,
    fontFamily: fonts.bold,
    color: '#94A3B8',
  },
  progressTrack: {
    height: 7,
    borderRadius: 4,
    backgroundColor: '#E8EFF8',
    marginTop: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: '#2F66EE',
  },
  cardFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  cardScoreText: {
    fontSize: 12,
    fontFamily: fonts.medium,
    color: '#64748B',
  },
  cardScoreTextLocked: {
    fontSize: 12,
    fontFamily: fonts.medium,
    color: '#94A3B8',
  },
  badgeWarning: {
    backgroundColor: '#FEF9C3',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  badgeWarningText: {
    fontSize: 11,
    fontFamily: fonts.bold,
    color: '#B45309',
  },
  badgeMuted: {
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  badgeMutedText: {
    fontSize: 11,
    fontFamily: fonts.semibold,
    color: '#94A3B8',
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: fonts.bold,
    color: '#0F172A',
    marginTop: 8,
    marginBottom: 12,
  },
  repeatCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EEF2F6',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  repeatList: {
    flex: 1,
    paddingRight: 12,
  },
  repeatItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bulletDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#FF6B4A',
    marginRight: 8,
  },
  repeatItemText: {
    fontSize: 13,
    fontFamily: fonts.bold,
    color: '#1E293B',
  },
  repeatButton: {
    backgroundColor: '#2F66EE',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#2F66EE',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  },
  repeatButtonText: {
    color: '#FFFFFF',
    fontFamily: fonts.bold,
    fontSize: 13,
  },
});
