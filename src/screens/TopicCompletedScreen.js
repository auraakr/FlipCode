import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
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
import s from '../styles/TopicCompletedScreen.styles';

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
