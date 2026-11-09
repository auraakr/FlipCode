import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import Button from '../components/Button';
import WelcomeIllustration from '../../assets/splash.svg';
import { ProgressRepository } from '../storage/ProgressRepository';
import { fonts } from '../constants/theme';

export default function WelcomeScreen({ navigation }) {
  const mulai = async () => {
    const done = await ProgressRepository.isPlacementDone();
    navigation.replace(done ? 'MainTabs' : 'PlacementTest');
  };

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={s.safeArea}>
      {/* Top Header */}
      <View style={s.header}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleBack}
          style={s.backButton}
          accessibilityLabel="Kembali"
        >
          <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
            <Path
              d="M19 12H5M11 6l-6 6 6 6"
              stroke="#1F2A44"
              strokeWidth={2.3}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </TouchableOpacity>

        <View style={s.brandRow}>
          <View style={s.brandIconCircle}>
            <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
              <Path
                d="M9.5 8L5.5 12L9.5 16M14.5 8L18.5 12L14.5 16"
                stroke="#FFFFFF"
                strokeWidth={2.4}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </View>
          <Text style={s.brandText}>FlipCode</Text>
        </View>

        <View style={s.headerSpacer} />
      </View>

      {/* Main Content */}
      <View style={s.content}>
        {/* Illustration Box */}
        <View style={s.illustrationCard}>
          <WelcomeIllustration width="100%" height={245} />
        </View>

        {/* Title & Subtitle */}
        <Text style={s.title}>Kenali level belajarmu!</Text>
        <Text style={s.subtitle}>
          Jawab beberapa soal untuk menemukan tingkat kesulitan yang cocok untukmu.
        </Text>

        {/* Topic Badges */}
        <View style={s.pillsRow}>
          {/* Variabel */}
          <View style={[s.pill, s.pillVariabel]}>
            <View style={[s.pillIconCircle, { backgroundColor: '#2554E8' }]}>
              <Svg width={10} height={10} viewBox="0 0 16 16" fill="none">
                <Rect
                  x="2"
                  y="3"
                  width="12"
                  height="10"
                  rx="2"
                  stroke="#FFFFFF"
                  strokeWidth={1.6}
                />
                <Path
                  d="M5 7h6M5 10h4"
                  stroke="#FFFFFF"
                  strokeWidth={1.4}
                  strokeLinecap="round"
                />
              </Svg>
            </View>
            <Text style={[s.pillText, { color: '#2554E8' }]}>Variabel</Text>
          </View>

          {/* Tipe Data */}
          <View style={[s.pill, s.pillTipeData]}>
            <View style={[s.pillIconCircle, { backgroundColor: '#F5B82E' }]}>
              <Svg width={10} height={10} viewBox="0 0 16 16" fill="none">
                <Rect x="2.5" y="2.5" width="4.5" height="4.5" rx="1" fill="#1F2A44" />
                <Rect x="9" y="2.5" width="4.5" height="4.5" rx="1" fill="#1F2A44" />
                <Rect x="2.5" y="9" width="4.5" height="4.5" rx="1" fill="#1F2A44" />
                <Rect x="9" y="9" width="4.5" height="4.5" rx="1" fill="#1F2A44" />
              </Svg>
            </View>
            <Text style={[s.pillText, { color: '#8C5E0A' }]}>Tipe Data</Text>
          </View>

          {/* Operator */}
          <View style={[s.pill, s.pillOperator]}>
            <View style={[s.pillIconCircle, { backgroundColor: '#F26B50' }]}>
              <Svg width={10} height={10} viewBox="0 0 16 16" fill="none">
                <Rect
                  x="2"
                  y="2"
                  width="12"
                  height="12"
                  rx="2.5"
                  stroke="#FFFFFF"
                  strokeWidth={1.6}
                />
                <Path
                  d="M5.5 6.5h2M6.5 5.5v2M9.5 6.5h2M5.5 10.5h5"
                  stroke="#FFFFFF"
                  strokeWidth={1.4}
                  strokeLinecap="round"
                />
              </Svg>
            </View>
            <Text style={[s.pillText, { color: '#C94A32' }]}>Operator</Text>
          </View>
        </View>

        {/* Meta Info: 9 soal • 3 topik */}
        <View style={s.metaRow}>
          <View style={s.metaItem}>
            <Svg width={15} height={15} viewBox="0 0 24 24" fill="none">
              <Circle cx="12" cy="13" r="8" stroke="#64748B" strokeWidth={2} />
              <Path
                d="M12 9v4l2.5 1.5M9.5 3h5"
                stroke="#64748B"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
            <Text style={s.metaText}>9 soal</Text>
          </View>

          <Text style={s.metaDot}>•</Text>

          <View style={s.metaItem}>
            <Svg width={15} height={15} viewBox="0 0 24 24" fill="none">
              <Path
                d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"
                stroke="#64748B"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
            <Text style={s.metaText}>3 topik</Text>
          </View>
        </View>
      </View>

      {/* Bottom CTA Button */}
      <View style={s.footer}>
        <Button
          title="Mulai Tes"
          onPress={mulai}
          rightIcon={
            <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
              <Path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="#FFFFFF"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FDFCF7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5EAF2',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandIconCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#2554E8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  brandText: {
    fontFamily: fonts.extrabold,
    fontSize: 20,
    color: '#1F2A44',
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 22,
    paddingTop: 6,
  },
  illustrationCard: {
    width: '100%',
    height: 260,
    borderRadius: 28,
    backgroundColor: '#EEF3FF',
    borderWidth: 1,
    borderColor: '#E2ECFF',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  title: {
    marginTop: 26,
    fontFamily: fonts.extrabold,
    fontSize: 25,
    color: '#1F2A44',
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 10,
    paddingHorizontal: 12,
    fontFamily: fonts.medium,
    fontSize: 14,
    lineHeight: 21,
    color: '#64748B',
    textAlign: 'center',
  },
  pillsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 22,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 11,
    borderWidth: 1,
  },
  pillVariabel: {
    backgroundColor: '#E8EEFF',
    borderColor: '#C9D8FF',
  },
  pillTipeData: {
    backgroundColor: '#FFFBEB',
    borderColor: '#FDE68A',
  },
  pillOperator: {
    backgroundColor: '#FFF0ED',
    borderColor: '#FFD5CC',
  },
  pillIconCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  pillText: {
    fontFamily: fonts.bold,
    fontSize: 12,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontFamily: fonts.semibold,
    fontSize: 12,
    color: '#64748B',
    marginLeft: 5,
  },
  metaDot: {
    fontFamily: fonts.bold,
    fontSize: 12,
    color: '#CBD5E1',
    marginHorizontal: 10,
  },
  footer: {
    paddingHorizontal: 22,
    paddingBottom: 22,
  },
});
