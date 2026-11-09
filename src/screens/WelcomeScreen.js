import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ClockIcon, ArrowRightIcon } from '../../assets/icons/AppIcons';
import { WELCOME_TOPICS } from '../data/screenConfigs';
import s from '../styles/WelcomeScreen.styles';

export default function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaView style={s.safeArea} edges={['top', 'bottom']}>
      <ScrollView
        style={s.scroll}
        contentContainerStyle={s.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Brand Row */}
        <View style={s.headerRow}>
          <View style={s.brandRow}>
            <Image
              source={require('../../assets/icon_welcome/logo_flipcode.png')}
              style={s.brandLogo}
              resizeMode="contain"
            />
            <Text style={s.brandName}>FlipCode</Text>
          </View>

          <View style={s.stepBadge}>
            <Text style={s.stepBadgeText}>Langkah 1/2</Text>
          </View>
        </View>

        {/* Hero Banner Card */}
        <View style={s.heroWrapper}>
          <Image
            source={require('../../assets/icon_welcome/Maskot_Tes Awal.png')}
            style={s.heroImage}
            resizeMode="contain"
          />
        </View>

        {/* Pill: TES PENEMPATAN */}
        <View style={s.placementBadge}>
          <View style={s.placementDot} />
          <Text style={s.placementBadgeText}>TES PENEMPATAN</Text>
        </View>

        {/* Main Heading */}
        <Text style={s.title}>Yuk, mulai Tes Awal!</Text>

        {/* Subtitle Description */}
        <Text style={s.subtitle}>
          Jawab <Text style={s.subtitleBold}>9 soal singkat</Text> untuk
          menentukan level belajarmu di 3 topik dasar pemrograman.
        </Text>

        {/* 3 Topic Cards Row */}
        <View style={s.topicsRow}>
          {WELCOME_TOPICS.map((topic) => (
            <View key={topic.id} style={s.topicCard}>
              <View style={[s.topicIconBox, { backgroundColor: topic.bg }]}>
                <Text style={[s.topicSymbol, { color: topic.color }]}>
                  {topic.symbol}
                </Text>
              </View>
              <Text style={s.topicTitle}>{topic.title}</Text>
              <Text style={s.topicSubtitle}>3 soal</Text>
            </View>
          ))}
        </View>

        {/* Time & Info Note Pill */}
        <View style={s.infoBar}>
          <ClockIcon size={14} color="#64748B" />
          <Text style={s.infoText}>±3 menit</Text>
          <Text style={s.infoSeparator}>•</Text>
          <Text style={s.infoText}>Tenang, bukan ujian nilai rapor</Text>
        </View>

        {/* Primary CTA Button with 3D Bottom Lip */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => navigation.navigate('PlacementTest')}
          style={s.ctaOuter}
        >
          <View style={s.ctaInner}>
            <Text style={s.ctaText}>Mulai Tes</Text>
            <ArrowRightIcon size={18} color="#FFFFFF" strokeWidth={2.5} />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
