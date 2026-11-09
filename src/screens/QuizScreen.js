import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ContentRepository } from '../storage/ContentRepository';
import { QuizManager } from '../logic/QuizManager';
import { Level } from '../constants/enums';
import { useAuth } from '../context/AuthContext';
import { FALLBACK_QUIZ_QUESTIONS } from '../data/screenConfigs';
import {
  CloseIcon,
  BookmarkFilledIcon,
  CheckIcon,
  LightbulbIcon,
  ArrowRightIcon,
  CodeSlashIcon,
} from '../../assets/icons/AppIcons';
import {
  QuizBannerRobot,
  MiniFeedbackRobot,
} from '../../assets/illustrations/MascotIllustrations';
import s from '../styles/QuizScreen.styles';

const HURUF = ['A', 'B', 'C', 'D'];

export default function QuizScreen({ route, navigation }) {
  const { user } = useAuth();
  const topicId = route?.params?.topicId || 'variabel';
  const topik = ContentRepository.getTopicById(topicId);
  const namaTopik = topik?.nama || 'Variabel';
  const displayName = user?.nama || 'Aura';

  // Mulai pada index 1 ("2/5" — "Manakah nama variabel yang valid?") sesuai gambar Figma
  const [idx, setIdx] = useState(1);
  const [pilih, setPilih] = useState(null);
  const [jawaban, setJawaban] = useState([0]);
  const [showFeedback, setShowFeedback] = useState(false);

  const questions = FALLBACK_QUIZ_QUESTIONS;
  const q = questions[idx] || questions[1];
  const benar = pilih === q.jawabanBenar;

  const handleSelectOption = (i) => {
    setPilih(i);
  };

  const handleCheckAnswer = () => {
    if (pilih === null) return;
    setShowFeedback(true);
  };

  const handleNextQuestion = async () => {
    const arr = [...jawaban];
    arr[idx] = pilih ?? -1;
    setJawaban(arr);
    setPilih(null);
    setShowFeedback(false);

    if (idx < questions.length - 1) {
      setIdx(idx + 1);
    } else {
      try {
        const hasil = await QuizManager.submit({
          topicId,
          level: Level.MUDAH,
          questions,
          jawaban: arr,
        });
        navigation.replace('QuizResult', {
          topicId,
          hasil,
          level: Level.MUDAH,
        });
      } catch (e) {
        navigation.replace('QuizResult', {
          topicId,
          hasil: { benar: 4, total: 5 },
          level: Level.MUDAH,
        });
      }
    }
  };

  const handleClose = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('TopicDetail', { topicId });
    }
  };

  return (
    <SafeAreaView style={s.safeArea} edges={['top', 'bottom']}>
      {/* Top Header */}
      <View style={s.header}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleClose}
          style={s.closeButton}
          accessibilityLabel="Tutup Kuis"
        >
          <CloseIcon size={18} color="#475569" strokeWidth={2.2} />
        </TouchableOpacity>

        <View style={s.topicPill}>
          <BookmarkFilledIcon size={12} color="#2554E8" />
          <Text style={s.topicPillText}>{namaTopik} — Mudah</Text>
        </View>

        <Text style={s.stepFraction}>
          {idx + 1}/{questions.length}
        </Text>
      </View>

      {/* 5-Segment Progress Bar */}
      <View style={s.segmentedBarRow}>
        {questions.map((_, segIdx) => {
          const active = segIdx <= idx;
          return (
            <View
              key={segIdx}
              style={[
                s.segmentBar,
                active ? s.segmentBarActive : s.segmentBarInactive,
              ]}
            />
          );
        })}
      </View>

      {/* Scrollable Quiz Content */}
      <ScrollView
        style={s.scroll}
        contentContainerStyle={[
          s.scrollContent,
          showFeedback && { paddingBottom: 24 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={s.questionOverline}>
          SOAL {idx + 1} DARI {questions.length}
        </Text>

        <View style={s.questionCard}>
          <View style={s.questionCardLeft}>
            <View style={s.questionTypePill}>
              <Text style={s.questionTypeText}>{q.tipe}</Text>
            </View>
            <Text style={s.questionTitle}>{q.pertanyaan}</Text>
          </View>

          <QuizBannerRobot />
        </View>

        {/* 4 Answer Options */}
        <View style={s.optionsList} accessibilityRole="radiogroup">
          {q.pilihan.map((optText, i) => {
            const isPicked = pilih === i;
            const isCorrectOption = showFeedback && i === q.jawabanBenar;
            const isWrongPicked = showFeedback && isPicked && !benar;
            const isSelectedPreCheck = !showFeedback && isPicked;

            return (
              <TouchableOpacity
                key={i}
                activeOpacity={0.82}
                onPress={() => handleSelectOption(i)}
                accessibilityRole="radio"
                accessibilityState={{ checked: isPicked }}
                style={[
                  s.optionCard,
                  isSelectedPreCheck && s.optionCardSelected,
                  isCorrectOption && s.optionCardCorrect,
                  isWrongPicked && s.optionCardWrong,
                ]}
              >
                <View
                  style={[
                    s.letterBadge,
                    isSelectedPreCheck && s.letterBadgeSelected,
                    isCorrectOption && s.letterBadgeCorrect,
                    isWrongPicked && s.letterBadgeWrong,
                  ]}
                >
                  <Text
                    style={[
                      s.letterText,
                      (isSelectedPreCheck ||
                        isCorrectOption ||
                        isWrongPicked) &&
                        s.letterTextWhite,
                    ]}
                  >
                    {HURUF[i]}
                  </Text>
                </View>

                <Text
                  style={[
                    s.optionLabel,
                    isSelectedPreCheck && s.optionLabelSelected,
                    isCorrectOption && s.optionLabelCorrect,
                    isWrongPicked && s.optionLabelWrong,
                  ]}
                >
                  {optText}
                </Text>

                {isSelectedPreCheck && (
                  <View style={s.radioBullseyeOuter}>
                    <View style={s.radioBullseyeInner} />
                  </View>
                )}

                {isCorrectOption && (
                  <View style={s.checkCircleGreen}>
                    <CheckIcon size={13} color="#FFFFFF" strokeWidth={3} />
                  </View>
                )}

                {isWrongPicked && (
                  <View style={s.crossCircleRed}>
                    <CloseIcon size={12} color="#EF4444" strokeWidth={2.6} />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={s.hintCard}>
          <View style={s.hintIconCircle}>
            <LightbulbIcon size={15} color="#D97706" />
          </View>
          <Text style={s.hintText}>
            <Text style={s.hintBold}>Petunjuk: </Text>
            {q.petunjuk}
          </Text>
        </View>
      </ScrollView>

      {/* BOTTOM AREA */}
      {!showFeedback ? (
        <View style={s.footerPreCheck}>
          <TouchableOpacity
            activeOpacity={pilih !== null ? 0.8 : 1}
            onPress={handleCheckAnswer}
            style={[
              s.checkAnswerBtn,
              pilih !== null && s.checkAnswerBtnReady,
            ]}
          >
            <Text
              style={[
                s.checkAnswerBtnText,
                pilih !== null && s.checkAnswerBtnTextReady,
              ]}
            >
              Periksa Jawaban
            </Text>
          </TouchableOpacity>
        </View>
      ) : benar ? (
        <View style={s.correctSheetWrapper}>
          <View style={s.peekingRobotWrap} pointerEvents="none">
            <MiniFeedbackRobot happy={true} />
          </View>

          <View style={s.correctSheet}>
            <View style={s.correctHeaderRow}>
              <View style={s.correctBigCheck}>
                <CheckIcon size={16} color="#FFFFFF" strokeWidth={3} />
              </View>
              <View>
                <Text style={s.correctTitle}>Benar!</Text>
                <Text style={s.correctSubtitle}>
                  Kerja bagus, {displayName}!
                </Text>
              </View>
            </View>

            <View style={s.correctExplainBox}>
              <Text style={s.correctExplainText}>
                <Text style={s.inlineCodeGreen}>{` ${q.benarHighlight} `}</Text>
                {q.benarPenjelasan}
              </Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={handleNextQuestion}
              style={s.greenNextBtn}
            >
              <Text style={s.greenNextBtnText}>Soal Berikutnya</Text>
              <ArrowRightIcon size={17} color="#FFFFFF" strokeWidth={2.5} />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={s.incorrectSheet}>
          <View style={s.incorrectTopRow}>
            <View style={s.incorrectTextCol}>
              <Text style={s.incorrectTitle}>Belum tepat, tetap semangat!</Text>
              <Text style={s.incorrectDesc}>
                {q.salahHighlight ? (
                  <>
                    <Text style={s.inlineCodeRed}>
                      {` ${q.pilihan[pilih] || q.salahHighlight} `}
                    </Text>
                    {q.salahPenjelasanMid}
                    <Text style={s.inlineCodeGrey}>{` ${q.salahCodeInline} `}</Text>
                    {q.salahPenjelasanSuffix}
                  </>
                ) : (
                  <>
                    <Text style={s.inlineCodeRed}>
                      {` ${q.pilihan[pilih]} `}
                    </Text>
                    {q.salahPenjelasanPrefix}
                  </>
                )}
              </Text>
            </View>

            <MiniFeedbackRobot happy={false} />
          </View>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() =>
              navigation.navigate('Flashcard', {
                topicId,
                fromQuiz: true,
                questionNumber: idx + 1,
              })
            }
            style={s.relatedCardBox}
          >
            <View style={s.relatedIconSquare}>
              <CodeSlashIcon size={16} color="#FFFFFF" />
            </View>

            <View style={s.relatedInfoCol}>
              <Text style={s.relatedOverline}>KARTU TERKAIT</Text>
              <Text style={s.relatedTitle}>{q.relatedCardTitle}</Text>
            </View>

            <View style={s.relatedBadgePill}>
              <Text style={s.relatedBadgeText}>{q.relatedCardNumber}</Text>
            </View>
          </TouchableOpacity>

          <View style={s.incorrectActionsRow}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleNextQuestion}
              style={s.whiteNextBtn}
            >
              <Text style={s.whiteNextBtnText}>Soal Berikutnya</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() =>
                navigation.navigate('Flashcard', {
                  topicId,
                  fromQuiz: true,
                  questionNumber: idx + 1,
                })
              }
              style={s.blueRelatedBtn}
            >
              <Text style={s.blueRelatedBtnText}>Buka Kartu Terkait</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
