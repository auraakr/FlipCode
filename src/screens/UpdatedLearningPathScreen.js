import { fonts } from '../constants/theme';
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet
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
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E6ECF5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: {
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: fonts.extrabold,
    fontSize: 16,
    color: '#1F2A44',
  },
  headerSubRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  greenDotSmall: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#2ED47A',
    marginRight: 5,
  },
  headerSubtitle: {
    fontFamily: fonts.medium,
    fontSize: 11.5,
    color: '#64748B',
  },
  fractionBadge: {
    backgroundColor: '#EDF2FF',
    borderRadius: 999,
    paddingVertical: 5,
    paddingHorizontal: 11,
  },
  fractionBadgeText: {
    fontFamily: fonts.extrabold,
    fontSize: 11.5,
    color: '#2554E8',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 26,
    paddingTop: 10,
    paddingBottom: 24,
    alignItems: 'center',
  },
  completedTopicCard: {
    width: '92%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#2ED47A',
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  completedIconWrap: {
    position: 'relative',
  },
  completedIconBox: {
    width: 44,
    height: 44,
    borderRadius: 13,
    backgroundColor: '#E3F8EE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  completedCornerCheck: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#2ED47A',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  completedInfoCol: {
    flex: 1,
    marginLeft: 13,
  },
  completedTopicTitle: {
    fontFamily: fonts.extrabold,
    fontSize: 15,
    color: '#1F2A44',
  },
  completedTopicMeta: {
    fontFamily: fonts.bold,
    fontSize: 11.5,
    color: '#2ED47A',
    marginTop: 2,
  },
  curveDownRightWrap: {
    width: '100%',
    alignItems: 'center',
    marginVertical: -2,
  },
  middleStageRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 2,
  },
  unlockedNodeCol: {
    alignItems: 'center',
  },
  newlyOpenedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 999,
    paddingVertical: 4,
    paddingHorizontal: 11,
    marginBottom: 8,
  },
  newlyOpenedText: {
    fontFamily: fonts.extrabold,
    fontSize: 10.5,
    color: '#FFFFFF',
    marginLeft: 4,
  },
  levelSquareOuter: {
    backgroundColor: '#D99B16',
    borderRadius: 24,
    paddingBottom: 5,
    shadowColor: '#F5B82E',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 5,
  },
  levelSquareInner: {
    width: 104,
    height: 100,
    borderRadius: 24,
    backgroundColor: '#FACC15',
    borderWidth: 2,
    borderColor: '#FEF08A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  codeWhitePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  codeWhitePillBold: {
    fontFamily: fonts.extrabold,
    fontSize: 14,
    color: '#1F2A44',
  },
  codeWhitePillAccent: {
    fontFamily: fonts.extrabold,
    fontSize: 14,
    color: '#D97706',
  },
  levelSquareSub: {
    marginTop: 8,
    fontFamily: fonts.extrabold,
    fontSize: 10,
    letterSpacing: 0.6,
    color: '#78350F',
  },
  unlockedNodeTitle: {
    marginTop: 10,
    fontFamily: fonts.extrabold,
    fontSize: 16,
    color: '#1F2A44',
  },
  unlockedStatusPill: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    borderRadius: 999,
    paddingVertical: 4,
    paddingHorizontal: 11,
  },
  unlockedStatusDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#D97706',
    marginRight: 5,
  },
  unlockedStatusText: {
    fontFamily: fonts.bold,
    fontSize: 10.5,
    color: '#92400E',
  },
  lockedOperatorCard: {
    marginTop: 26,
    width: '92%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#F1F5F9',
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  lockedOperatorIconWrap: {
    position: 'relative',
  },
  lockedOperatorIconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tinyLockBadge: {
    position: 'absolute',
    top: -3,
    right: -3,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lockedOperatorTitle: {
    fontFamily: fonts.extrabold,
    fontSize: 14.5,
    color: '#94A3B8',
  },
  lockedOperatorSub: {
    fontFamily: fonts.medium,
    fontSize: 11,
    color: '#CBD5E1',
    marginTop: 2,
  },
  trailingCurveWrap: {
    marginTop: 2,
    alignItems: 'center',
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
