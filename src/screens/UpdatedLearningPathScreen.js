import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeftIcon,
  ArchiveBoxIcon,
  CheckIcon,
  ChevronRightIcon,
  LightningBoltIcon,
  CalculatorSheetIcon,
  LockIcon,
  ArrowRightIcon,
} from '../../assets/icons/AppIcons';
import {
  FlipGuideAvatar,
  LearningPathCurveDownRight,
  LearningPathTrailingCurve,
} from '../../assets/illustrations/MascotIllustrations';
import s from '../styles/UpdatedLearningPathScreen.styles';

export default function UpdatedLearningPathScreen({ route, navigation }) {
  const nextTopicId = route?.params?.nextTopicId || 'tipe_data';
  const isOperatorNext = nextTopicId === 'operator';

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('MainTabs', {
        screen: 'Belajar',
        params: { activeTopic: nextTopicId },
      });
    }
  };

  const handleStartTopic = () => {
    navigation.navigate('TopicDetail', { topicId: nextTopicId });
  };

  return (
    <SafeAreaView style={s.safeArea} edges={['top', 'bottom']}>
      {/* Top Header */}
      <View style={s.header}>
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={handleBack}
          style={s.backButton}
          accessibilityLabel="Kembali"
        >
          <ArrowLeftIcon size={18} color="#1F2A44" strokeWidth={2.3} />
        </TouchableOpacity>

        <View style={s.headerCenter}>
          <Text style={s.headerTitle}>Jalur Belajar</Text>
          <View style={s.headerSubRow}>
            <View style={s.greenDotSmall} />
            <Text style={s.headerSubtitle}>
              {isOperatorNext ? '2 dari 3 topik selesai' : '1 dari 3 topik selesai'}
            </Text>
          </View>
        </View>

        <View style={s.fractionBadge}>
          <Text style={s.fractionBadgeText}>
            {isOperatorNext ? '2/3' : '1/3'}
          </Text>
        </View>
      </View>

      <ScrollView
        style={s.scroll}
        contentContainerStyle={s.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. Completed Topic Card: Variabel */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => navigation.navigate('TopicDetail', { topicId: 'variabel' })}
          style={s.completedTopicCard}
        >
          <View style={s.completedIconWrap}>
            <View style={s.completedIconBox}>
              <ArchiveBoxIcon size={20} color="#2ED47A" />
            </View>
            <View style={s.completedCornerCheck}>
              <CheckIcon size={10} color="#FFFFFF" strokeWidth={3} />
            </View>
          </View>

          <View style={s.completedInfoCol}>
            <Text style={s.completedTopicTitle}>Variabel</Text>
            <Text style={s.completedTopicMeta}>Selesai • 80%</Text>
          </View>

          <ChevronRightIcon size={16} color="#94A3B8" strokeWidth={2.2} />
        </TouchableOpacity>

        {/* Green Dashed Curve from Variabel down to Tipe Data */}
        <View style={s.curveDownRightWrap} pointerEvents="none">
          <LearningPathCurveDownRight />
        </View>

        {/* 2. Middle Section: Flip Guide (Left) + Newly Unlocked Topic (Right) */}
        <View style={s.middleStageRow}>
          <FlipGuideAvatar />

          {/* Right Unlocked Level 2 Card: Tipe Data */}
          <View style={s.unlockedNodeCol}>
            <View style={s.newlyOpenedPill}>
              <LightningBoltIcon size={10} color="#FACC15" />
              <Text style={s.newlyOpenedText}>Baru dibuka!</Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.88}
              onPress={handleStartTopic}
              style={[
                s.levelSquareOuter,
                isOperatorNext && { backgroundColor: '#C94A32' },
              ]}
            >
              <View
                style={[
                  s.levelSquareInner,
                  isOperatorNext && {
                    backgroundColor: '#F26B50',
                    borderColor: '#FF9E8A',
                  },
                ]}
              >
                <View style={s.codeWhitePill}>
                  <Text style={s.codeWhitePillBold}>
                    {isOperatorNext ? '+ -' : '123 '}
                  </Text>
                  <Text
                    style={[
                      s.codeWhitePillAccent,
                      isOperatorNext && { color: '#F26B50' },
                    ]}
                  >
                    {isOperatorNext ? '==' : 'Aa'}
                  </Text>
                </View>
                <Text
                  style={[
                    s.levelSquareSub,
                    isOperatorNext && { color: '#FFFFFF' },
                  ]}
                >
                  {isOperatorNext ? 'LEVEL 3' : 'LEVEL 2'}
                </Text>
              </View>
            </TouchableOpacity>

            <Text style={s.unlockedNodeTitle}>
              {isOperatorNext ? 'Operator' : 'Tipe Data'}
            </Text>

            <View style={s.unlockedStatusPill}>
              <View style={s.unlockedStatusDot} />
              <Text style={s.unlockedStatusText}>Terbuka • Sedang</Text>
            </View>
          </View>
        </View>

        {/* 3. Locked Topic Card: Operator */}
        {!isOperatorNext && (
          <>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                Alert.alert(
                  'Topik Terkunci',
                  'Kuasai topik Tipe Data terlebih dahulu untuk membuka Operator.'
                )
              }
              style={s.lockedOperatorCard}
            >
              <View style={s.lockedOperatorIconWrap}>
                <View style={s.lockedOperatorIconBox}>
                  <CalculatorSheetIcon size={18} color="#94A3B8" />
                </View>
                <View style={s.tinyLockBadge}>
                  <LockIcon size={9} color="#64748B" filled />
                </View>
              </View>

              <View style={s.completedInfoCol}>
                <Text style={s.lockedOperatorTitle}>Operator</Text>
                <Text style={s.lockedOperatorSub}>
                  Terkunci • Kuasai Tipe Data
                </Text>
              </View>

              <LockIcon size={16} color="#CBD5E1" keyholeColor={null} />
            </TouchableOpacity>

            {/* Bottom Trailing Dashed Line */}
            <View style={s.trailingCurveWrap} pointerEvents="none">
              <LearningPathTrailingCurve />
            </View>
          </>
        )}
      </ScrollView>

      {/* Bottom CTA Button */}
      <View style={s.footer}>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleStartTopic}
          style={s.primaryBtnOuter}
        >
          <View style={s.primaryBtnInner}>
            <Text style={s.primaryBtnText}>
              {isOperatorNext ? 'Mulai Operator' : 'Mulai Tipe Data'}
            </Text>
            <ArrowRightIcon size={18} color="#FFFFFF" strokeWidth={2.5} />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
