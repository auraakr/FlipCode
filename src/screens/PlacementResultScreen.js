import { fonts } from '../constants/theme';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity , StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ContentRepository } from '../storage/ContentRepository';
import { Level } from '../constants/enums';
import TopicLevelCard from '../components/TopicLevelCard';
import { ArrowRightIcon } from '../../assets/icons/AppIcons';
import { ResultBannerIllustration } from '../../assets/illustrations/MascotIllustrations';

export default function PlacementResultScreen({ route, navigation }) {
  const hasil = route?.params?.hasil || {};
  const topics = ContentRepository.getTopics();

  return (
    <SafeAreaView style={s.safeArea} edges={['top', 'bottom']}>
      <ScrollView
        style={s.scroll}
        contentContainerStyle={s.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Hero Banner Card */}
        <View style={s.heroCard}>
          <ResultBannerIllustration />
        </View>

        {/* Green Status Badge: • TES AWAL SELESAI */}
        <View style={s.doneBadge}>
          <View style={s.doneDot} />
          <Text style={s.doneBadgeText}>TES AWAL SELESAI</Text>
        </View>

        {/* Heading & Subtitle */}
        <Text style={s.title}>Level belajarmu siap!</Text>
        <Text style={s.subtitle}>
          Flip menyesuaikan titik mulai tiap topik dari hasil jawabanmu.
        </Text>

        {/* Topic Level Cards */}
        <View style={s.cardsList}>
          {topics.map((t, index) => {
            const info = hasil[t.id];
            return (
              <TopicLevelCard
                key={t.id}
                id={t.id}
                nama={t.nama}
                level={info?.level || Level.MUDAH}
                skor={info?.skor ?? 1}
                total={info?.total ?? 3}
                unlocked={index === 0}
              />
            );
          })}
        </View>

        {/* Primary CTA Button */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => navigation.replace('MainTabs')}
          style={s.ctaOuter}
        >
          <View style={s.ctaInner}>
            <Text style={s.ctaText}>Mulai Belajar Variabel</Text>
            <ArrowRightIcon size={18} color="#FFFFFF" strokeWidth={2.5} />
          </View>
        </TouchableOpacity>
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
    flexGrow: 1,
    paddingHorizontal: 22,
    paddingTop: 14,
    paddingBottom: 24,
    alignItems: 'center',
  },
  heroCard: {
    width: '100%',
    height: 170,
    backgroundColor: '#2554E8',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
    overflow: 'hidden',
    borderBottomWidth: 4,
    borderBottomColor: '#1B3FB8',
    shadowColor: '#2554E8',
    shadowOpacity: 0.22,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  doneBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8FBF0',
    paddingHorizontal: 13,
    paddingVertical: 6,
    borderRadius: 999,
    marginBottom: 10,
  },
  doneDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#16A34A',
    marginRight: 7,
  },
  doneBadgeText: {
    fontFamily: fonts.bold,
    fontSize: 11,
    color: '#15803D',
    letterSpacing: 0.6,
  },
  title: {
    fontFamily: fonts.extrabold,
    fontSize: 24,
    color: '#1F2A44',
    textAlign: 'center',
    marginBottom: 6,
    letterSpacing: -0.4,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: 13.5,
    lineHeight: 20,
    color: '#5A6982',
    textAlign: 'center',
    paddingHorizontal: 12,
    marginBottom: 18,
  },
  cardsList: {
    width: '100%',
    marginBottom: 14,
  },
  ctaOuter: {
    width: '100%',
    backgroundColor: '#1B3FB8',
    borderRadius: 999,
    paddingBottom: 4,
    marginTop: 'auto',
    shadowColor: '#2554E8',
    shadowOpacity: 0.28,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5,
  },
  ctaInner: {
    width: '100%',
    backgroundColor: '#2957F5',
    borderRadius: 999,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  ctaText: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: '#FFFFFF',
  },
});
