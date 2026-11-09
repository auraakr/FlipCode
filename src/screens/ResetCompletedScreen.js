import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fonts } from '../constants/theme';
import { setGlobalActiveTopic } from './HomeScreen';
import {
  CheckIcon,
  FolderIcon,
  ClipboardCheckIcon,
} from '../../assets/icons/AppIcons';
import { ResetCompletedHeroIllustration } from '../../assets/illustrations/MascotIllustrations';

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

const s = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FDFCF7',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    alignItems: 'center',
    paddingHorizontal: 22,
    paddingTop: 22,
    paddingBottom: 24,
  },
  successTopPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8FBF0',
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 6,
    marginBottom: 18,
  },
  successTopPillText: {
    fontFamily: fonts.bold,
    fontSize: 12.5,
    color: '#15803D',
  },
  title: {
    fontFamily: fonts.extrabold,
    fontSize: 23,
    color: '#1F2A44',
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 10,
    letterSpacing: -0.4,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: 13.5,
    lineHeight: 21,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 26,
  },
  topicsRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    gap: 10,
  },
  topicMiniCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#F0F4FA',
    shadowColor: '#0F172A',
    shadowOpacity: 0.03,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  topicMiniIconCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  hashSymbolText: {
    fontFamily: fonts.extrabold,
    fontSize: 14,
    color: '#D97706',
  },
  plusSymbolText: {
    fontFamily: fonts.extrabold,
    fontSize: 15,
    color: '#E11D48',
  },
  topicMiniTextCol: {
    flex: 1,
  },
  topicMiniTitle: {
    fontFamily: fonts.bold,
    fontSize: 11.5,
    lineHeight: 15,
    color: '#1F2A44',
  },
  topicMiniStatus: {
    fontFamily: fonts.bold,
    fontSize: 10.5,
    marginTop: 2,
  },
  footer: {
    paddingHorizontal: 22,
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: '#FDFCF7',
  },
  primaryBtnOuter: {
    width: '100%',
    backgroundColor: '#1B3FB8',
    borderRadius: 999,
    paddingBottom: 4,
    shadowColor: '#2554E8',
    shadowOpacity: 0.28,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5,
  },
  primaryBtnInner: {
    width: '100%',
    backgroundColor: '#2957F5',
    borderRadius: 999,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  primaryBtnText: {
    fontFamily: fonts.bold,
    fontSize: 15.5,
    color: '#FFFFFF',
  },
});
