import { fonts } from '../constants/theme';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity , StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ChevronLeftIcon,
  SlidersIcon,
  LayersIcon,
  BulletListIcon,
  CubeOutlineIcon,
} from '../../assets/icons/AppIcons';
import { AboutHeroRobotIllustration } from '../../assets/illustrations/MascotIllustrations';

export default function AboutScreen({ navigation }) {
  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('MainTabs', { screen: 'Pengaturan' });
    }
  };

  return (
    <SafeAreaView style={s.safeArea} edges={['top', 'bottom']}>
      <ScrollView
        style={s.scroll}
        contentContainerStyle={s.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Blue Hero Banner */}
        <View style={s.heroBanner}>
          {/* Top Bar: Back Button + Tentang Title */}
          <View style={s.heroTopRow}>
            <TouchableOpacity
              activeOpacity={0.75}
              onPress={handleBack}
              style={s.backButton}
              accessibilityLabel="Kembali"
            >
              <ChevronLeftIcon size={18} color="#FFFFFF" strokeWidth={2.4} />
            </TouchableOpacity>

            <Text style={s.heroHeaderTitle}>Tentang</Text>
          </View>

          {/* Bottom Content inside Hero */}
          <View style={s.heroBodyRow}>
            <View style={s.heroLeftCol}>
              {/* White Brand Pill: </> FlipCode */}
              <View style={s.brandWhitePill}>
                <Text style={s.brandCodeSymbol}>{'</>'}</Text>
                <Text style={s.brandNameText}>FlipCode</Text>
              </View>

              <Text style={s.heroTagline}>Coding jadi lebih seru!</Text>
            </View>

            <View style={s.heroRightRobot}>
              <AboutHeroRobotIllustration />
            </View>
          </View>
        </View>

        {/* Body Content */}
        <View style={s.body}>
          {/* Main Description */}
          <Text style={s.descriptionText}>
            FlipCode membantu siswa SMA/SMK belajar{' '}
            <Text style={s.descriptionBold}>Algoritma & Pemrograman</Text> lewat
            flashcard interaktif, kuis singkat, dan level yang menyesuaikan
            kemampuanmu.
          </Text>

          {/* Section 1: Tujuan belajar */}
          <Text style={s.sectionTitle}>Tujuan belajar</Text>

          <View style={s.goalsRow}>
            {/* Goal 1: Belajar adaptif */}
            <View style={[s.goalCard, s.goalCardBlue]}>
              <View style={[s.goalIconSquare, { backgroundColor: '#2554E8' }]}>
                <SlidersIcon size={20} color="#FFFFFF" />
              </View>
              <Text style={s.goalLabel}>{'Belajar\nadaptif'}</Text>
            </View>

            {/* Goal 2: Flashcard interaktif */}
            <View style={[s.goalCard, s.goalCardPurple]}>
              <View style={[s.goalIconSquare, { backgroundColor: '#7C3AED' }]}>
                <LayersIcon size={20} color="#FFFFFF" />
              </View>
              <Text style={s.goalLabel}>{'Flashcard\ninteraktif'}</Text>
            </View>

            {/* Goal 3: Kuis singkat */}
            <View style={[s.goalCard, s.goalCardGreen]}>
              <View style={[s.goalIconSquare, { backgroundColor: '#10B981' }]}>
                <BulletListIcon size={20} color="#FFFFFF" />
              </View>
              <Text style={s.goalLabel}>{'Kuis\nsingkat'}</Text>
            </View>
          </View>

          {/* Section 2: Topik yang didukung */}
          <Text style={s.sectionTitle}>Topik yang didukung</Text>

          <View style={s.topicsList}>
            {/* Topic 1: Variabel */}
            <View style={s.topicCard}>
              <View style={s.topicLeftRow}>
                <View
                  style={[s.topicIconBox, { backgroundColor: '#EDF2FF' }]}
                >
                  <CubeOutlineIcon size={20} color="#2554E8" />
                </View>
                <Text style={s.topicName}>Variabel</Text>
              </View>
              <View style={[s.topicDot, { backgroundColor: '#2554E8' }]} />
            </View>

            {/* Topic 2: Tipe Data */}
            <View style={s.topicCard}>
              <View style={s.topicLeftRow}>
                <View
                  style={[s.topicIconBox, { backgroundColor: '#FEF7E0' }]}
                >
                  <Text style={s.topicCodeYellow}>123</Text>
                </View>
                <Text style={s.topicName}>Tipe Data</Text>
              </View>
              <View style={[s.topicDot, { backgroundColor: '#F59E0B' }]} />
            </View>

            {/* Topic 3: Operator */}
            <View style={s.topicCard}>
              <View style={s.topicLeftRow}>
                <View
                  style={[s.topicIconBox, { backgroundColor: '#FFF1EE' }]}
                >
                  <Text style={s.topicCodeOrange}>+-=</Text>
                </View>
                <Text style={s.topicName}>Operator</Text>
              </View>
              <View style={[s.topicDot, { backgroundColor: '#F43F5E' }]} />
            </View>
          </View>

          {/* Footer Version Info */}
          <View style={s.footerWrap}>
            <View style={s.versionPill}>
              <Text style={s.versionPillText}>Versi 2.0</Text>
            </View>
            <Text style={s.footerSubText}>Untuk siswa SMA/SMK Indonesia</Text>
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
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  heroBanner: {
    backgroundColor: '#2554E8',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    paddingHorizontal: 22,
    paddingTop: 14,
    paddingBottom: 22,
    borderBottomWidth: 4,
    borderBottomColor: '#1B3FB8',
  },
  heroTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  heroHeaderTitle: {
    fontFamily: fonts.extrabold,
    fontSize: 19,
    color: '#FFFFFF',
    letterSpacing: -0.3,
  },
  heroBodyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heroLeftCol: {
    flex: 1,
    paddingRight: 10,
  },
  brandWhitePill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 7,
    gap: 6,
    marginBottom: 14,
    shadowColor: '#0F172A',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  brandCodeSymbol: {
    fontFamily: fonts.mono,
    fontSize: 13.5,
    fontWeight: '700',
    color: '#2554E8',
  },
  brandNameText: {
    fontFamily: fonts.extrabold,
    fontSize: 14,
    color: '#2554E8',
  },
  heroTagline: {
    fontFamily: fonts.extrabold,
    fontSize: 19,
    color: '#FFFFFF',
    letterSpacing: -0.3,
  },
  heroRightRobot: {
    marginRight: -4,
    marginBottom: -6,
  },
  body: {
    paddingHorizontal: 22,
    paddingTop: 22,
  },
  descriptionText: {
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 22,
    color: '#475569',
    marginBottom: 22,
  },
  descriptionBold: {
    fontFamily: fonts.extrabold,
    color: '#1F2A44',
  },
  sectionTitle: {
    fontFamily: fonts.extrabold,
    fontSize: 14.5,
    color: '#1F2A44',
    marginBottom: 12,
  },
  goalsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 24,
  },
  goalCard: {
    flex: 1,
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  goalCardBlue: {
    backgroundColor: '#F0F5FF',
    borderColor: '#DCE7FF',
  },
  goalCardPurple: {
    backgroundColor: '#F8F2FF',
    borderColor: '#EDE0FF',
  },
  goalCardGreen: {
    backgroundColor: '#EDFCF4',
    borderColor: '#D3F8E2',
  },
  goalIconSquare: {
    width: 42,
    height: 42,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  goalLabel: {
    fontFamily: fonts.bold,
    fontSize: 12.5,
    lineHeight: 17,
    color: '#1F2A44',
    textAlign: 'center',
  },
  topicsList: {
    gap: 12,
    marginBottom: 28,
  },
  topicCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#F0F4FA',
    shadowColor: '#0F172A',
    shadowOpacity: 0.03,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  topicLeftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  topicIconBox: {
    width: 42,
    height: 42,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topicCodeYellow: {
    fontFamily: fonts.extrabold,
    fontSize: 13.5,
    color: '#D97706',
  },
  topicCodeOrange: {
    fontFamily: fonts.extrabold,
    fontSize: 13.5,
    color: '#EA580C',
  },
  topicName: {
    fontFamily: fonts.bold,
    fontSize: 14.5,
    color: '#1F2A44',
  },
  topicDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 4,
  },
  footerWrap: {
    alignItems: 'center',
    marginTop: 6,
  },
  versionPill: {
    backgroundColor: '#FFFFFF',
    borderRadius: 999,
    paddingHorizontal: 18,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: '#E6ECF5',
    marginBottom: 8,
  },
  versionPillText: {
    fontFamily: fonts.bold,
    fontSize: 12.5,
    color: '#475569',
  },
  footerSubText: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: '#94A3B8',
  },
});
