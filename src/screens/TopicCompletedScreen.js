import { fonts } from '../constants/theme';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity , StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { setGlobalActiveTopic } from './HomeScreen';
import {
  CloseIcon,
  LayersIcon,
  CheckIcon,
  FlameIcon,
  UnlockedIcon,
  ChevronRightIcon,
  ArrowRightIcon,
} from '../../assets/icons/AppIcons';
import { TopicCompletedIllustration } from '../../assets/illustrations/MascotIllustrations';

export default function TopicCompletedScreen({ route, navigation }) {
  const completedTopicId = route?.params?.topicId || 'variabel';
  const isTipeDataCompleted = completedTopicId === 'tipe_data';
  const nextTopicId =
    completedTopicId === 'variabel'
      ? 'tipe_data'
      : completedTopicId === 'tipe_data'
      ? 'operator'
      : 'operator';

  const completedTitle = isTipeDataCompleted
    ? 'Tipe Data dikuasai!'
    : 'Variabel dikuasai!';
  const nextTopicTitle = isTipeDataCompleted ? 'Operator' : 'Tipe Data';
  const nextTopicSub = isTipeDataCompleted
    ? 'Aritmatika, Perbandingan, Logika'
    : 'Integer, String, Boolean';

  const handleClose = () => {
    setGlobalActiveTopic(nextTopicId);
    navigation.navigate('MainTabs', {
      screen: 'Belajar',
      params: { activeTopic: nextTopicId },
    });
  };

  const handleContinueNextTopic = () => {
    setGlobalActiveTopic(nextTopicId);
    navigation.navigate('TopicDetail', { topicId: nextTopicId });
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
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={handleClose}
            style={s.closeButton}
            accessibilityLabel="Tutup"
          >
            <CloseIcon size={15} color="#FFFFFF" strokeWidth={2.3} />
          </TouchableOpacity>

          <TopicCompletedIllustration />
        </View>

        {/* Body Content */}
        <View style={s.body}>
          {/* Green Badge: • TOPIK SELESAI */}
          <View style={s.completedBadge}>
            <View style={s.completedBadgeDot} />
            <Text style={s.completedBadgeText}>TOPIK SELESAI</Text>
          </View>

          {/* Title */}
          <Text style={s.title}>{completedTitle}</Text>

          {/* Card 1: Kartu dikuasai (8/10 • 80%) */}
          <View style={s.metricCard}>
            <View style={[s.metricIconCircle, { backgroundColor: '#EDF2FF' }]}>
              <LayersIcon size={18} color="#2554E8" filledTop />
            </View>

            <View style={s.metricMiddleCol}>
              <Text style={s.metricTitle}>Kartu dikuasai</Text>
              <View style={s.miniBarTrack}>
                <View style={s.miniBarFill} />
              </View>
            </View>

            <View style={s.metricRightRow}>
              <Text style={s.metricValueText}>8/10 • 80%</Text>
              <View style={s.greenCheckCircle}>
                <CheckIcon size={12} color="#FFFFFF" strokeWidth={3} />
              </View>
            </View>
          </View>

          {/* Card 2: Benar di level Sulit (4/5) */}
          <View style={s.metricCard}>
            <View style={[s.metricIconCircle, { backgroundColor: '#FFF0ED' }]}>
              <FlameIcon size={18} color="#EF4444" />
            </View>

            <View style={s.metricMiddleCol}>
              <Text style={s.metricTitle}>Benar di level Sulit</Text>
              <View style={s.segmentsRow}>
                {[true, true, true, true, false].map((ok, i) => (
                  <View
                    key={i}
                    style={[
                      s.segmentPill,
                      { backgroundColor: ok ? '#2ED47A' : '#E2E8F0' },
                    ]}
                  />
                ))}
              </View>
            </View>

            <View style={s.metricRightRow}>
              <Text style={s.metricValueText}>4/5</Text>
              <View style={s.greenCheckCircle}>
                <CheckIcon size={12} color="#FFFFFF" strokeWidth={3} />
              </View>
            </View>
          </View>

          {/* Card 3: TOPIK BARU TERBUKA — Tipe Data / Operator */}
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleContinueNextTopic}
            style={s.unlockedCard}
          >
            <View
              style={[
                s.unlockedIconSquare,
                isTipeDataCompleted && { backgroundColor: '#F26B50' },
              ]}
            >
              <Text style={s.unlockedIconTopText}>
                {isTipeDataCompleted ? '+ -' : '123'}
              </Text>
              <Text style={s.unlockedIconBottomText}>
                {isTipeDataCompleted ? '==' : 'Aa'}
              </Text>
            </View>

            <View style={s.unlockedMiddleCol}>
              <View style={s.unlockedOverlineRow}>
                <UnlockedIcon size={11} color="#EF4444" />
                <Text style={s.unlockedOverlineText}>TOPIK BARU TERBUKA</Text>
              </View>
              <Text style={s.unlockedTitle}>{nextTopicTitle}</Text>
              <Text style={s.unlockedSubtitle}>{nextTopicSub}</Text>
            </View>

            <ChevronRightIcon size={16} color="#D97706" strokeWidth={2.4} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom CTA Button: Lanjut ke Tipe Data / Operator -> */}
      <View style={s.footer}>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleContinueNextTopic}
          style={s.primaryBtnOuter}
        >
          <View style={s.primaryBtnInner}>
            <Text style={s.primaryBtnText}>Lanjut ke {nextTopicTitle}</Text>
            <ArrowRightIcon size={18} color="#FFFFFF" strokeWidth={2.5} />
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
    paddingBottom: 16,
  },
  heroBanner: {
    backgroundColor: '#2554E8',
    borderRadius: 28,
    height: 245,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    left: 18,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  body: {
    paddingHorizontal: 22,
    paddingTop: 20,
    alignItems: 'center',
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F8EE',
    borderWidth: 1,
    borderColor: '#B8F0D5',
    borderRadius: 999,
    paddingVertical: 5,
    paddingHorizontal: 13,
  },
  completedBadgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
    marginRight: 6,
  },
  completedBadgeText: {
    fontFamily: fonts.extrabold,
    fontSize: 10.5,
    letterSpacing: 0.6,
    color: '#10B981',
  },
  title: {
    marginTop: 10,
    marginBottom: 8,
    fontFamily: fonts.extrabold,
    fontSize: 23,
    color: '#1F2A44',
    textAlign: 'center',
  },
  metricCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#E6ECF5',
    paddingVertical: 14,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  metricIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  metricMiddleCol: {
    flex: 1,
    marginLeft: 12,
  },
  metricTitle: {
    fontFamily: fonts.semibold,
    fontSize: 13,
    color: '#1F2A44',
  },
  miniBarTrack: {
    marginTop: 7,
    width: 92,
    height: 6,
    borderRadius: 999,
    backgroundColor: '#E2E8F0',
    overflow: 'hidden',
  },
  miniBarFill: {
    width: '80%',
    height: '100%',
    borderRadius: 999,
    backgroundColor: '#2ED47A',
  },
  segmentsRow: {
    marginTop: 7,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  segmentPill: {
    width: 14,
    height: 5,
    borderRadius: 999,
  },
  metricRightRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metricValueText: {
    fontFamily: fonts.bold,
    fontSize: 12,
    color: '#334155',
    marginRight: 8,
  },
  greenCheckCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#2ED47A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  unlockedCard: {
    width: '100%',
    backgroundColor: '#FEF9E7',
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#FDE68A',
    paddingVertical: 14,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  unlockedIconSquare: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#F5B82E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  unlockedIconTopText: {
    fontFamily: fonts.extrabold,
    fontSize: 11,
    lineHeight: 13,
    color: '#FFFFFF',
  },
  unlockedIconBottomText: {
    fontFamily: fonts.extrabold,
    fontSize: 11,
    lineHeight: 13,
    color: '#FFFFFF',
  },
  unlockedMiddleCol: {
    flex: 1,
    marginLeft: 14,
  },
  unlockedOverlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  unlockedOverlineText: {
    fontFamily: fonts.extrabold,
    fontSize: 9.5,
    letterSpacing: 0.5,
    color: '#E05A47',
    marginLeft: 4,
  },
  unlockedTitle: {
    fontFamily: fonts.extrabold,
    fontSize: 15.5,
    color: '#1F2A44',
    marginTop: 2,
  },
  unlockedSubtitle: {
    fontFamily: fonts.medium,
    fontSize: 11.5,
    color: '#64748B',
    marginTop: 1,
  },
  footer: {
    paddingHorizontal: 22,
    paddingBottom: 20,
    paddingTop: 6,
  },
  primaryBtnOuter: {
    backgroundColor: '#1B3FB5',
    borderRadius: 18,
    paddingBottom: 4,
  },
  primaryBtnInner: {
    backgroundColor: '#2554E8',
    borderRadius: 18,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtnText: {
    fontFamily: fonts.extrabold,
    fontSize: 15,
    color: '#FFFFFF',
    marginRight: 8,
  },
});
