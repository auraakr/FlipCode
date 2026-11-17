import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Circle, Rect, G } from 'react-native-svg';
import Button from '../components/Button';
import { fonts } from '../constants/theme';

function WelcomeRobotHero() {
  return (
    <View style={s.heroBox}>
      {/* Top Center Brand Pill (FlipCode - 01) */}
      <View style={s.brandPill}>
        <View style={s.brandIconSmall}>
          <Text style={s.brandCodeSymbol}>{'</>'}</Text>
        </View>
        <Text style={s.brandTitle}>FlipCode</Text>
      </View>

      {/* Floating Badges */}
      {/* 1. Upper Left: { } */}
      <View style={s.badgeBraces}>
        <Text style={s.badgeBracesText}>{'{ }'}</Text>
      </View>

      {/* 2. Upper Right: </> */}
      <View style={s.badgeCode}>
        <Text style={s.badgeCodeText}>{'</>'}</Text>
      </View>

      {/* 3. Middle Right Sparkle */}
      <View style={s.badgeSparkle}>
        <Svg width={28} height={28} viewBox="0 0 24 24" fill="none">
          <Path
            d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4L12 2z"
            fill="#FACC15"
          />
        </Svg>
      </View>

      {/* 4. Lower Left: true */}
      <View style={s.badgeTrue}>
        <Text style={s.badgeTrueText}>true</Text>
      </View>

      {/* 5. Lower Right: x = 5 */}
      <View style={s.badgeVar}>
        <Text style={s.badgeVarText}>x = 5</Text>
      </View>

      {/* Center Mascot: 3D Blue Robot Waving */}
      <View style={s.robotContainer}>
        <Svg width={230} height={240} viewBox="0 0 230 240" fill="none">
          {/* Subtle Glow Behind Robot */}
          <Circle cx="115" cy="125" r="95" fill="rgba(255, 255, 255, 0.08)" />
          <Circle cx="115" cy="125" r="70" fill="rgba(255, 255, 255, 0.1)" />

          {/* Golden Yellow Antenna */}
          <Rect x="112" y="18" width="6" height="18" rx="3" fill="#93C5FD" />
          <Circle cx="115" cy="12" r="14" fill="rgba(250, 204, 21, 0.28)" />
          <Circle cx="115" cy="12" r="9.5" fill="#FACC15" />

          {/* Left Ear Spheres */}
          <Circle cx="44" cy="94" r="14" fill="#60A5FA" />
          <Circle cx="44" cy="94" r="10" fill="#FFFFFF" />

          {/* Right Ear Spheres */}
          <Circle cx="186" cy="94" r="14" fill="#60A5FA" />
          <Circle cx="186" cy="94" r="10" fill="#FFFFFF" />

          {/* Robot Torso */}
          <Rect
            x="72"
            y="148"
            width="86"
            height="68"
            rx="26"
            fill="#2563EB"
            stroke="#60A5FA"
            strokeWidth={1.5}
          />
          {/* Torso Screen / Belly Core Light */}
          <Circle cx="115" cy="180" r="12" fill="#1E3A8A" />
          <Circle cx="115" cy="180" r="8" fill="#38BDF8" />
          <Circle cx="115" cy="180" r="4" fill="#E0F2FE" />

          {/* Left Arm / Hand (Resting) */}
          <G transform="rotate(18 64 164)">
            <Rect x="44" y="148" width="22" height="42" rx="11" fill="#3B82F6" />
            <Circle cx="55" cy="192" r="12" fill="#FFFFFF" />
          </G>

          {/* Right Arm / Hand (Raised High Waving) */}
          <G transform="rotate(-32 170 140)">
            <Rect x="166" y="104" width="22" height="52" rx="11" fill="#3B82F6" />
            <Circle cx="177" cy="100" r="15" fill="#FFFFFF" />
          </G>

          {/* Left Foot */}
          <Rect x="82" y="210" width="26" height="24" rx="12" fill="#3B82F6" />
          <Circle cx="95" cy="226" r="10" fill="#FFFFFF" />

          {/* Right Foot */}
          <Rect x="122" y="210" width="26" height="24" rx="12" fill="#3B82F6" />
          <Circle cx="135" cy="226" r="10" fill="#FFFFFF" />

          {/* Big Rounded Robot Head Outer Helmet */}
          <Rect
            x="48"
            y="36"
            width="134"
            height="116"
            rx="42"
            fill="#2563EB"
            stroke="#93C5FD"
            strokeWidth={2.5}
          />

          {/* Head Visor / Dark Glossy Screen */}
          <Rect
            x="60"
            y="48"
            width="110"
            height="90"
            rx="32"
            fill="#0F172A"
          />

          {/* Screen Gloss Reflection */}
          <Path
            d="M74 54h82c8 0 14 6 14 14v4c-32-8-66-8-96 0v-4c0-8 6-14 14-14z"
            fill="rgba(255, 255, 255, 0.12)"
          />

          {/* Cute Cyan Smiling Curved Eyes (^  ^) */}
          {/* Left Eye */}
          <Path
            d="M78 94c2-12 18-12 20 0"
            stroke="#38BDF8"
            strokeWidth={4.5}
            strokeLinecap="round"
          />
          {/* Right Eye */}
          <Path
            d="M132 94c2-12 18-12 20 0"
            stroke="#38BDF8"
            strokeWidth={4.5}
            strokeLinecap="round"
          />

          {/* Cute Blush on Cheeks */}
          <Circle cx="76" cy="112" r="4.5" fill="rgba(244, 114, 182, 0.45)" />
          <Circle cx="154" cy="112" r="4.5" fill="rgba(244, 114, 182, 0.45)" />

          {/* Small Cyan Smile */}
          <Path
            d="M110 110c2 3 8 3 10 0"
            stroke="#38BDF8"
            strokeWidth={2.4}
            strokeLinecap="round"
          />
        </Svg>
      </View>
    </View>
  );
}

export default function WelcomeScreen({ navigation }) {
  const handleMulai = () => {
    navigation.navigate('PlacementIntro');
  };

  return (
    <SafeAreaView style={s.safeArea} edges={['top', 'bottom']}>
      <ScrollView
        contentContainerStyle={s.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Blue Hero Card (FlipCode - 01 Welcome) */}
        <WelcomeRobotHero />

        {/* Carousel / Pagination Dots */}
        <View style={s.dotsRow}>
          <View style={s.activeDot} />
          <View style={s.inactiveDot} />
          <View style={s.inactiveDot} />
        </View>

        {/* Title: Coding jadi lebih seru! */}
        <Text style={s.title}>
          Coding jadi <Text style={s.titleHighlight}>lebih seru!</Text>
        </Text>

        {/* Subtitle */}
        <Text style={s.subtitle}>
          Belajar pemrograman lewat kartu dan kuis singkat.
        </Text>

        {/* Bottom CTA Button: Mulai -> */}
        <View style={s.footer}>
          <Button
            title="Mulai"
            onPress={handleMulai}
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
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FDFCF7',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heroBox: {
    width: '100%',
    height: 420,
    backgroundColor: '#2554E8',
    borderRadius: 34,
    paddingTop: 16,
    paddingHorizontal: 16,
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#2554E8',
    shadowOpacity: 0.28,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  brandPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 7,
    gap: 7,
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    zIndex: 10,
  },
  brandIconSmall: {
    backgroundColor: '#EEF2FF',
    borderRadius: 999,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  brandCodeSymbol: {
    fontFamily: fonts.mono,
    fontSize: 12,
    fontWeight: '800',
    color: '#2554E8',
  },
  brandTitle: {
    fontFamily: fonts.extrabold,
    fontSize: 14,
    color: '#1F2A44',
  },
  badgeBraces: {
    position: 'absolute',
    top: 70,
    left: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    zIndex: 10,
  },
  badgeBracesText: {
    fontFamily: fonts.mono,
    fontSize: 14,
    fontWeight: '800',
    color: '#1F2A44',
  },
  badgeCode: {
    position: 'absolute',
    top: 64,
    right: 22,
    backgroundColor: '#F59E0B',
    borderRadius: 14,
    paddingHorizontal: 11,
    paddingVertical: 7,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    zIndex: 10,
  },
  badgeCodeText: {
    fontFamily: fonts.mono,
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  badgeSparkle: {
    position: 'absolute',
    top: 130,
    right: 18,
    zIndex: 10,
  },
  badgeTrue: {
    position: 'absolute',
    bottom: 24,
    left: 22,
    backgroundColor: '#22C55E',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 6,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    zIndex: 10,
  },
  badgeTrueText: {
    fontFamily: fonts.bold,
    fontSize: 13,
    color: '#FFFFFF',
  },
  badgeVar: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 6,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    zIndex: 10,
  },
  badgeVarText: {
    fontFamily: fonts.mono,
    fontSize: 13,
    fontWeight: '700',
    color: '#1F2A44',
  },
  robotContainer: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 22,
    marginBottom: 14,
  },
  activeDot: {
    width: 26,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#2554E8',
  },
  inactiveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#CBD5E1',
  },
  title: {
    fontFamily: fonts.extrabold,
    fontSize: 27,
    color: '#1F2A44',
    textAlign: 'center',
    letterSpacing: -0.4,
  },
  titleHighlight: {
    color: '#2554E8',
  },
  subtitle: {
    marginTop: 10,
    paddingHorizontal: 16,
    fontFamily: fonts.medium,
    fontSize: 14.5,
    lineHeight: 22,
    color: '#64748B',
    textAlign: 'center',
  },
  footer: {
    width: '100%',
    marginTop: 24,
  },
});
