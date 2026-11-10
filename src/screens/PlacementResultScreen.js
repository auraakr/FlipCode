import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Circle, Rect, Ellipse, G, Polygon } from 'react-native-svg';
import Button from '../components/Button';
import TopicLevelCard from '../components/TopicLevelCard';
import { ContentRepository } from '../storage/ContentRepository';
import { Level } from '../constants/enums';
import { fonts } from '../constants/theme';

function ResultBannerIllustration() {
  return (
    <Svg width="100%" height="100%" viewBox="0 0 340 196" fill="none">
      {/* Background Decorative Blobs */}
      <Circle cx="65" cy="155" r="88" fill="rgba(255, 255, 255, 0.06)" />
      <Circle cx="285" cy="52" r="82" fill="rgba(255, 255, 255, 0.06)" />

      {/* Top-Left 4-Point Yellow Sparkle */}
      <Path
        d="M32 22L34 27.5L39.5 29.5L34 31.5L32 37L30 31.5L24.5 29.5L30 27.5L32 22Z"
        fill="#FFD43B"
      />

      {/* Mid-Left Small Translucent Dot */}
      <Circle cx="22" cy="58" r="3" fill="rgba(255, 255, 255, 0.55)" />

      {/* Bottom-Left Small Triangle */}
      <Polygon
        points="42,154 38,161 46,161"
        fill="rgba(255, 255, 255, 0.55)"
      />

      {/* Top-Right White 5-Point Star */}
      <Path
        d="M298 28L299.6 32.2L304 32.5L300.6 35.3L301.7 39.6L298 37.2L294.3 39.6L295.4 35.3L292 32.5L296.4 32.2L298 28Z"
        fill="#FFFFFF"
      />

      {/* Bottom-Right 4-Point Yellow Sparkle */}
      <Path
        d="M308 143L309.6 147.2L313.8 148.8L309.6 150.4L308 154.6L306.4 150.4L302.2 148.8L306.4 147.2L308 143Z"
        fill="#FFD43B"
      />

      {/* White Oval Platform Shadow Under Robot */}
      <Ellipse
        cx="170"
        cy="160"
        rx="32"
        ry="5.5"
        fill="rgba(255, 255, 255, 0.88)"
      />

      {/* Robot Celebration Illustration */}
      <G transform="translate(0, 2)">
        {/* Antenna Stem */}
        <Rect x="167.5" y="42" width="5" height="12" fill="#1F2A44" />
        {/* Antenna Ball */}
        <Circle
          cx="170"
          cy="37"
          r="6.5"
          fill="#FFC83D"
          stroke="#1F2A44"
          strokeWidth="2.2"
        />

        {/* Left Raised Arm */}
        <G transform="rotate(-42 130 78)">
          <Rect
            x="123"
            y="58"
            width="13"
            height="30"
            rx="6.5"
            fill="#2554E8"
            stroke="#1F2A44"
            strokeWidth="2.5"
          />
        </G>
        {/* Star in Left Hand */}
        <Path
          d="M114 48L116.8 53.6L123 54.5L118.5 58.9L119.6 65L114 62.1L108.4 65L109.5 58.9L105 54.5L111.2 53.6L114 48Z"
          fill="#FFC83D"
        />

        {/* Right Raised Arm */}
        <G transform="rotate(42 210 78)">
          <Rect
            x="204"
            y="58"
            width="13"
            height="30"
            rx="6.5"
            fill="#2554E8"
            stroke="#1F2A44"
            strokeWidth="2.5"
          />
        </G>
        {/* Orange Ball in Right Hand */}
        <Circle cx="225" cy="54" r="5.5" fill="#FF785A" />

        {/* Robot Feet */}
        <Path
          d="M147 141H163V146C163 148.8 160.8 151 158 151H152C149.2 151 147 148.8 147 146V141Z"
          fill="#1F2A44"
        />
        <Path
          d="M177 141H193V146C193 148.8 190.8 151 188 151H182C179.2 151 177 148.8 177 146V141Z"
          fill="#1F2A44"
        />

        {/* Robot Main Body */}
        <Rect
          x="126"
          y="53"
          width="88"
          height="90"
          rx="22"
          fill="#2554E8"
          stroke="#1F2A44"
          strokeWidth="2.8"
        />

        {/* Robot Face Visor */}
        <Rect x="139" y="75" width="62" height="44" rx="13" fill="#1F2A44" />

        {/* Eyes */}
        <Rect x="154" y="89" width="11" height="13" rx="5.5" fill="#FFFFFF" />
        <Rect x="175" y="89" width="11" height="13" rx="5.5" fill="#FFFFFF" />

        {/* Cute Smile */}
        <Path
          d="M165.5 106C166.8 108.2 173.2 108.2 174.5 106"
          stroke="#FFFFFF"
          strokeWidth="2.2"
          strokeLinecap="round"
        />

        {/* Rosy Cheeks */}
        <Rect
          x="145"
          y="107"
          width="8"
          height="4.8"
          rx="2.4"
          fill="#FF8068"
        />
        <Rect
          x="187"
          y="107"
          width="8"
          height="4.8"
          rx="2.4"
          fill="#FF8068"
        />

        {/* Lightning Bolt on Chest */}
        <Path
          d="M166.5 135L167.2 130.5H164.2L169.5 123H170.8L170.1 127.8H173.5L167.6 135H166.5Z"
          fill="#FFC83D"
        />
      </G>
    </Svg>
  );
}

export default function PlacementResultScreen({ route, navigation }) {
  const { hasil } = route.params || {};
  const topics = ContentRepository.getAllTopics();

  // Level dari hasil server; topik tanpa data (mis. belum ada soal) mulai dari Mudah.
  const getLevelForTopic = (topicId) => hasil?.perTopicLevel?.[topicId] || Level.MUDAH;

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.replace('PlacementTest');
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

      {/* Main Scrollable Content */}
      <ScrollView
        style={s.scroll}
        contentContainerStyle={s.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Blue Hero Illustration Banner */}
        <View style={s.heroBanner}>
          <ResultBannerIllustration />
        </View>

        {/* Green Completed Badge: ✓ 9 soal selesai */}
        <View style={s.completedPill}>
          <View style={s.completedCheckCircle}>
            <Svg width={10} height={10} viewBox="0 0 24 24" fill="none">
              <Path
                d="M5 12.5l4.5 4.5L19 7.5"
                stroke="#FFFFFF"
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </View>
          <Text style={s.completedPillText}>9 soal selesai</Text>
        </View>

        {/* Title & Subtitle */}
        <Text style={s.title}>Yeay, levelmu ketemu!</Text>
        <Text style={s.subtitle}>Flip sudah menyiapkan materi yang pas.</Text>

        {/* Topic Level Cards */}
        <View style={s.cardsList}>
          {topics.map((t) => (
            <TopicLevelCard
              key={t.id}
              topicId={t.id}
              nama={t.nama}
              level={getLevelForTopic(t.id)}
            />
          ))}
        </View>
      </ScrollView>

      {/* Bottom CTA Button */}
      <View style={s.footer}>
        <Button
          title="Mulai Belajar"
          onPress={() => navigation.replace('MainTabs')}
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
    paddingBottom: 10,
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
  scroll: {
    flex: 1,
  },
  scrollContent: {
    alignItems: 'center',
    paddingHorizontal: 22,
    paddingTop: 4,
    paddingBottom: 16,
  },
  heroBanner: {
    width: '100%',
    height: 192,
    borderRadius: 26,
    backgroundColor: '#2B59FF',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  completedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F8EE',
    borderRadius: 999,
    paddingVertical: 5,
    paddingHorizontal: 12,
    marginTop: 16,
  },
  completedCheckCircle: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: '#22A06B',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  completedPillText: {
    fontFamily: fonts.bold,
    fontSize: 12,
    color: '#22A06B',
  },
  title: {
    marginTop: 10,
    fontFamily: fonts.extrabold,
    fontSize: 24,
    color: '#1F2A44',
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 4,
    fontFamily: fonts.medium,
    fontSize: 13.5,
    color: '#64748B',
    textAlign: 'center',
  },
  cardsList: {
    marginTop: 18,
    width: '100%',
  },
  footer: {
    paddingHorizontal: 22,
    paddingBottom: 22,
  },
});
