import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { fonts } from '../constants/theme';
import { ContentRepository } from '../storage/ContentRepository';
import { ProgressRepository } from '../storage/ProgressRepository';
import { CardStatus } from '../constants/enums';
import LearningPathLine from '../components/LearningPathLine';

export default function HomeScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const [studiedCards, setStudiedCards] = useState(3);
  const [totalCards, setTotalCards] = useState(5);
  const [pathHeight, setPathHeight] = useState(880);

  const [positions, setPositions] = useState({
    n1: 142,
    btn1: 280,
    n2: 354,
    title2: 412,
    pill3: 475,
    n3: 537,
    sub3: 594,
    pill4: 657,
    n4: 719,
    sub4: 776,
  });

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          const all = await ProgressRepository.getAll();
          const cards = ContentRepository.getFlashcardsByTopic('variabel');
          const count = cards.filter(
            (c) =>
              all.cards[c.id]?.status === CardStatus.DIKUASAI ||
              all.cards[c.id]?.status === CardStatus.SEDANG
          ).length;

          setStudiedCards(count > 0 ? count : 3);
          setTotalCards(cards.length >= 5 ? cards.length : 5);
        } catch (e) {
          console.warn('Gagal memuat progres:', e);
        }
      })();
    }, [])
  );

  const cx = width / 2;
  const kuisX = cx + 42;

  const y1 = positions.n1;
  const yBtn1 = positions.btn1;
  const y2 = positions.n2;
  const yTitle2 = positions.title2;
  const yPill3 = positions.pill3;
  const y3 = positions.n3;
  const ySub3 = positions.sub3;
  const yPill4 = positions.pill4;
  const y4 = positions.n4;
  const ySub4 = positions.sub4;

  const pathD = [
    `M ${cx} ${y1}`,
    `L ${cx} ${yBtn1}`,
    `C ${cx} ${(yBtn1 + y2) / 2}, ${kuisX} ${(yBtn1 + y2) / 2}, ${kuisX} ${y2}`,
    `L ${kuisX} ${yTitle2}`,
    `C ${kuisX} ${(yTitle2 + yPill3) / 2}, ${cx} ${(yTitle2 + yPill3) / 2}, ${cx} ${yPill3}`,
    `L ${cx} ${y3}`,
    `L ${cx} ${ySub3}`,
    `C ${cx + 16} ${(ySub3 + yPill4) / 2}, ${cx - 16} ${(ySub3 + yPill4) / 2}, ${cx} ${yPill4}`,
    `L ${cx} ${y4}`,
    `L ${cx} ${ySub4}`,
    `C ${cx + 16} ${ySub4 + 30}, ${cx} ${ySub4 + 50}, ${cx} ${ySub4 + 75}`,
  ].join(' ');

  return (
    <SafeAreaView style={s.safeArea} edges={['top']}>
      {/* Top Header */}
      <View style={s.header}>
        <View style={s.headerLeft}>
          <View style={s.avatarContainer}>
            <Text style={s.avatarText}>A</Text>
          </View>
          <View style={s.greetingContainer}>
            <Text style={s.greetingSubtitle}>Hai, Azmi Cihuy</Text>
            <Text style={s.greetingTitle}>Yuk, lanjut belajar!</Text>
          </View>
        </View>

        <View style={s.streakBadge}>
          <Text style={s.streakText}>🔥</Text>
        </View>
      </View>

      {/* Learning Path Scroll View */}
      <ScrollView
        style={s.scrollView}
        contentContainerStyle={s.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={s.pathArea}
          onLayout={(e) => {
            const h = e.nativeEvent.layout.height;
            if (h > 600) setPathHeight(h);
          }}
        >
          {/* Background curved dashed flow path */}
          <LearningPathLine width={width} height={pathHeight} d={pathD} />

          {/* Topik 1 Capsule Pill */}
          <View style={s.topicPill}>
            <View style={s.blueDot} />
            <Text style={s.topicPillText}>TOPIK 1: VARIABEL</Text>
          </View>

          {/* Tooltip Bubble */}
          <View style={s.bubbleContainer}>
            <View style={s.bubble}>
              <Text style={s.bubbleText}>Mulai dari sini! ✨</Text>
              <View style={s.bubbleArrowBorder} />
              <View style={s.bubbleArrowInner} />
            </View>
          </View>

          {/* Node 1: Flashcard Variabel */}
          <View
            style={s.nodeWrapper}
            onLayout={(e) => {
              const { y, height } = e.nativeEvent.layout;
              setPositions((prev) => ({
                ...prev,
                n1: y + 42,
                btn1: y + height,
              }));
            }}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Flashcard', { topicId: 'variabel' })}
              style={s.node1Glow}
            >
              <View style={s.node1Circle}>
                <Image
                  source={require('../../assets/home_screen/icon_Flashcard_Variable.png')}
                  style={s.flashcardIcon}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>

            <Text style={s.nodeTitle}>Flashcard Variabel</Text>
            <Text style={s.nodeSubtitle}>
              {studiedCards}/{totalCards} Kartu Dipelajari
            </Text>

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => navigation.navigate('Flashcard', { topicId: 'variabel' })}
              style={s.continueButton}
            >
              <Text style={s.continueButtonText}>Lanjut Belajar  ➔</Text>
            </TouchableOpacity>
          </View>

          {/* Node 2: Kuis Variabel */}
          <View
            style={[s.nodeWrapper, { transform: [{ translateX: 42 }], marginTop: 42 }]}
            onLayout={(e) => {
              const { y, height } = e.nativeEvent.layout;
              setPositions((prev) => ({
                ...prev,
                n2: y + 32,
                title2: y + height,
              }));
            }}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Quiz', { topicId: 'variabel' })}
              style={s.quizCircle}
            >
              <Image
                source={require('../../assets/home_screen/icon_kuis_variable.png')}
                style={s.quizIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text style={s.nodeTitle}>Kuis Variabel</Text>
          </View>

          {/* Node 3: Topik 2 (Tipe Data) */}
          <View
            style={[s.nodeWrapper, { marginTop: 48 }]}
            onLayout={(e) => {
              const { y, height } = e.nativeEvent.layout;
              setPositions((prev) => ({
                ...prev,
                pill3: y + 16,
                n3: y + 62,
                sub3: y + height,
              }));
            }}
          >
            <View style={s.lockedTopicPill}>
              <Image
                source={require('../../assets/home_screen/icon_lock.png')}
                style={s.miniLockIcon}
                resizeMode="contain"
              />
              <Text style={s.lockedTopicText}>Topik 2: Tipe Data</Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                Alert.alert(
                  'Topik Terkunci',
                  'Selesaikan Flashcard dan Kuis Topik 1 (Variabel) terlebih dahulu untuk membuka topik ini.'
                )
              }
              style={s.lockedCircle}
            >
              <Image
                source={require('../../assets/home_screen/icon_lock.png')}
                style={s.lockIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text style={s.lockedSubtitle}>Integer, String & Boolean</Text>
          </View>

          {/* Node 4: Topik 3 (Operator) */}
          <View
            style={[s.nodeWrapper, { marginTop: 48 }]}
            onLayout={(e) => {
              const { y, height } = e.nativeEvent.layout;
              setPositions((prev) => ({
                ...prev,
                pill4: y + 16,
                n4: y + 62,
                sub4: y + height,
              }));
            }}
          >
            <View style={s.lockedTopicPill}>
              <Image
                source={require('../../assets/home_screen/icon_lock.png')}
                style={s.miniLockIcon}
                resizeMode="contain"
              />
              <Text style={s.lockedTopicText}>Topik 3: Operator</Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                Alert.alert(
                  'Topik Terkunci',
                  'Selesaikan Topik 2 terlebih dahulu untuk membuka topik ini.'
                )
              }
              style={s.lockedCircle}
            >
              <Image
                source={require('../../assets/home_screen/icon_lock.png')}
                style={s.lockIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text style={s.lockedSubtitle}>Aritmatika & Logika</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAF8F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 16,
    backgroundColor: '#FAF8F5',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#DCE8FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 18,
    fontFamily: fonts.bold,
    color: '#2F66EE',
  },
  greetingContainer: {
    marginLeft: 12,
  },
  greetingSubtitle: {
    fontSize: 13,
    fontFamily: fonts.medium,
    color: '#64748B',
  },
  greetingTitle: {
    fontSize: 18,
    fontFamily: fonts.extrabold,
    color: '#0F172A',
    marginTop: 1,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF0EB',
    borderColor: '#FFE0D6',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  streakText: {
    fontSize: 13,
    fontFamily: fonts.bold,
    color: '#EA580C',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  pathArea: {
    position: 'relative',
    alignItems: 'center',
    paddingTop: 8,
    minHeight: 880,
  },
  topicPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E0EAFA',
    borderRadius: 24,
    paddingVertical: 7,
    paddingHorizontal: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
    zIndex: 1,
  },
  blueDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2F66EE',
    marginRight: 8,
  },
  topicPillText: {
    fontSize: 12,
    fontFamily: fonts.bold,
    color: '#1E293B',
    letterSpacing: 0.6,
  },
  bubbleContainer: {
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 6,
    zIndex: 1,
  },
  bubble: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#2F66EE',
    borderRadius: 14,
    paddingVertical: 6,
    paddingHorizontal: 16,
    alignItems: 'center',
    position: 'relative',
    shadowColor: '#2F66EE',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  bubbleText: {
    fontSize: 12,
    fontFamily: fonts.bold,
    color: '#2F66EE',
  },
  bubbleArrowBorder: {
    position: 'absolute',
    bottom: -8,
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 8,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#2F66EE',
  },
  bubbleArrowInner: {
    position: 'absolute',
    bottom: -5.5,
    width: 0,
    height: 0,
    borderLeftWidth: 4.5,
    borderRightWidth: 4.5,
    borderTopWidth: 6,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#FFFFFF',
  },
  nodeWrapper: {
    alignItems: 'center',
    zIndex: 1,
  },
  node1Glow: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: '#D6E4FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  node1Circle: {
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: '#2F66EE',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#2F66EE',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 5,
  },
  flashcardIcon: {
    width: 28,
    height: 28,
    tintColor: '#FFFFFF',
  },
  nodeTitle: {
    fontSize: 15,
    fontFamily: fonts.bold,
    color: '#1E293B',
    textAlign: 'center',
    marginTop: 8,
  },
  nodeSubtitle: {
    fontSize: 12,
    fontFamily: fonts.semibold,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 2,
  },
  continueButton: {
    backgroundColor: '#2F66EE',
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 22,
    marginTop: 10,
    shadowColor: '#2F66EE',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  continueButtonText: {
    fontSize: 13,
    fontFamily: fonts.bold,
    color: '#FFFFFF',
  },
  quizCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#DCE8F8',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  quizIcon: {
    width: 26,
    height: 26,
  },
  lockedTopicPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF3F8',
    borderWidth: 1,
    borderColor: '#DEE6EE',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 14,
  },
  miniLockIcon: {
    width: 12,
    height: 14,
    tintColor: '#64748B',
    marginRight: 6,
  },
  lockedTopicText: {
    fontSize: 12,
    fontFamily: fonts.semibold,
    color: '#64748B',
  },
  lockedCircle: {
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: '#E8EFF8',
    borderWidth: 2,
    borderColor: '#D2DEEC',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 14,
  },
  lockIcon: {
    width: 22,
    height: 24,
    tintColor: '#738093',
  },
  lockedSubtitle: {
    fontSize: 13,
    fontFamily: fonts.semibold,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 6,
  },
});
