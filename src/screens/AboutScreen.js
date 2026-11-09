import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ChevronLeftIcon,
  SlidersIcon,
  LayersIcon,
  BulletListIcon,
  CubeOutlineIcon,
} from '../../assets/icons/AppIcons';
import { AboutHeroRobotIllustration } from '../../assets/illustrations/MascotIllustrations';
import s from '../styles/AboutScreen.styles';

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
