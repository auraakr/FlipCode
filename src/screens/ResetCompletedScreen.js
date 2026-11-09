import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { setGlobalActiveTopic } from './HomeScreen';
import {
  CheckIcon,
  FolderIcon,
  ClipboardCheckIcon,
} from '../../assets/icons/AppIcons';
import { ResetCompletedHeroIllustration } from '../../assets/illustrations/MascotIllustrations';
import s from '../styles/ResetCompletedScreen.styles';

export default function ResetCompletedScreen({ navigation }) {
  const handleStartPlacementTest = () => {
    setGlobalActiveTopic('variabel');
    navigation.replace('PlacementTest');
  };

  return (
    <SafeAreaView style={s.safeArea} edges={['top', 'bottom']}>
      <ScrollView
        style={s.scroll}
        contentContainerStyle={s.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Green Badge: ✓ Progres berhasil direset */}
        <View style={s.successTopPill}>
          <CheckIcon size={14} color="#16A34A" strokeWidth={2.8} />
          <Text style={s.successTopPillText}>Progres berhasil direset</Text>
        </View>

        {/* Center Robot Illustration with Floating Pills */}
        <ResetCompletedHeroIllustration />

        {/* Title & Subtitle */}
        <Text style={s.title}>Yuk, mulai perjalanan baru!</Text>
        <Text style={s.subtitle}>
          Ikuti tes awal lagi supaya Flip bisa{'\n'}menyiapkan level yang pas
          untukmu.
        </Text>

        {/* 3 Topic Reset Cards: Variabel (Baru), Tipe Data (Baru), Operator (Baru) */}
        <View style={s.topicsRow}>
          {/* 1. Variabel */}
          <View style={s.topicMiniCard}>
            <View style={[s.topicMiniIconCircle, { backgroundColor: '#EDF2FF' }]}>
              <FolderIcon size={14} color="#2554E8" />
            </View>
            <View style={s.topicMiniTextCol}>
              <Text style={s.topicMiniTitle}>Variabel</Text>
              <Text style={[s.topicMiniStatus, { color: '#2554E8' }]}>
                Baru
              </Text>
            </View>
          </View>

          {/* 2. Tipe Data */}
          <View style={s.topicMiniCard}>
            <View style={[s.topicMiniIconCircle, { backgroundColor: '#FEF9E7' }]}>
              <Text style={s.hashSymbolText}>#</Text>
            </View>
            <View style={s.topicMiniTextCol}>
              <Text style={s.topicMiniTitle}>{'Tipe\nData'}</Text>
              <Text style={[s.topicMiniStatus, { color: '#D97706' }]}>
                Baru
              </Text>
            </View>
          </View>

          {/* 3. Operator */}
          <View style={s.topicMiniCard}>
            <View style={[s.topicMiniIconCircle, { backgroundColor: '#FFF1F2' }]}>
              <Text style={s.plusSymbolText}>+</Text>
            </View>
            <View style={s.topicMiniTextCol}>
              <Text style={s.topicMiniTitle}>Operator</Text>
              <Text style={[s.topicMiniStatus, { color: '#E11D48' }]}>
                Baru
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom CTA Button: Mulai Tes Awal */}
      <View style={s.footer}>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleStartPlacementTest}
          style={s.primaryBtnOuter}
        >
          <View style={s.primaryBtnInner}>
            <ClipboardCheckIcon size={16} color="#FFFFFF" />
            <Text style={s.primaryBtnText}>Mulai Tes Awal</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
