import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ContentRepository } from '../storage/ContentRepository';
import { Level } from '../constants/enums';
import TopicLevelCard from '../components/TopicLevelCard';
import { ArrowRightIcon } from '../../assets/icons/AppIcons';
import { ResultBannerIllustration } from '../../assets/illustrations/MascotIllustrations';
import s from '../styles/PlacementResultScreen.styles';

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
