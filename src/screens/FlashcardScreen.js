import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
  Easing,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ContentRepository } from '../storage/ContentRepository';
import { FlashcardManager } from '../logic/FlashcardManager';
import { FALLBACK_CARDS } from '../data/screenConfigs';
import {
  FlashcardCompletedView,
  FlashcardReviewView,
} from '../components/FlashcardSubViews';
import {
  FlipArrowsIcon,
  FaceEmojiIcon,
  CloseIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  LinkChainIcon,
  CodeSlashIcon,
  OpenBookOutlineIcon,
  CheckIcon,
  LightbulbIcon,
  UndoCornerLeftIcon,
} from '../../assets/icons/AppIcons';
import s from '../styles/FlashcardScreen.styles';

export default function FlashcardScreen({ route, navigation }) {
  const topicId = route?.params?.topicId || 'variabel';
  const fromQuiz = Boolean(route?.params?.fromQuiz);
  const questionNumber = route?.params?.questionNumber || 2;
  const topik = ContentRepository.getTopicById(topicId);
  const namaTopik = topik?.nama || 'Variabel';

  // Mulai pada index 3 ("4 dari 10") sesuai desain wireframe Figma
  const [idx, setIdx] = useState(3);
  const [step, setStep] = useState('card');
  const [isFlipped, setIsFlipped] = useState(fromQuiz);
  const [rating, setRating] = useState('mudah');

  // Animasi flip kartu utama (08 <-> 09)
  const flipAnim = useRef(new Animated.Value(0)).current;
  const isAnimatingRef = useRef(false);

  const triggerCardFlip = (targetFlipped) => {
    if (isAnimatingRef.current) return;
    const nextState =
      typeof targetFlipped === 'boolean' ? targetFlipped : !isFlipped;
    isAnimatingRef.current = true;

    Animated.timing(flipAnim, {
      toValue: 0.5,
      duration: 150,
      easing: Easing.in(Easing.quad),
      useNativeDriver: true,
    }).start(() => {
      setIsFlipped(nextState);
      Animated.timing(flipAnim, {
        toValue: 1,
        duration: 170,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }).start(() => {
        flipAnim.setValue(0);
        isAnimatingRef.current = false;
      });
    });
  };

  const cardScaleX = flipAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0.04, 1],
  });

  const cardScaleY = flipAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0.96, 1],
  });

  const cards = FALLBACK_CARDS;
  const current = cards[idx] || cards[3];
  const totalCardsCount = 10;
  const pct = ((idx + 1) / totalCardsCount) * 100;

  const handleBack = () => {
    if (step === 'completed') {
      setStep('review');
      return;
    }
    if (step === 'review') {
      setStep('assessment');
      return;
    }
    if (step === 'assessment') {
      setStep('card');
      setIsFlipped(true);
      return;
    }
    if (step === 'card' && isFlipped) {
      triggerCardFlip(false);
      return;
    }
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('TopicDetail', { topicId });
    }
  };

  const handleSaveAssessment = async () => {
    try {
      if (rating === 'mudah') {
        await FlashcardManager.markPaham(current.id);
      } else {
        await FlashcardManager.markUlangi(current.id);
      }
    } catch (e) {
      // Abaikan jika penyimpanan lokal gagal pada mode preview
    }
    setStep('review');
  };

  if (step === 'completed') {
    return (
      <FlashcardCompletedView
        namaTopik={namaTopik}
        onClose={() => navigation.navigate('TopicDetail', { topicId })}
        onStartQuiz={() => navigation.navigate('Quiz', { topicId })}
        onRepeatCards={() => {
          setIsFlipped(false);
          setStep('review');
        }}
      />
    );
  }

  if (step === 'review') {
    return (
      <FlashcardReviewView
        namaTopik={namaTopik}
        onBack={handleBack}
        onRepeatCard={() => {
          setIsFlipped(false);
          setStep('card');
        }}
        onContinueCompleted={() => setStep('completed')}
      />
    );
  }

  return (
    <SafeAreaView style={s.safeArea}>
      <View style={s.header}>
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={() => (fromQuiz ? navigation.goBack() : handleBack())}
          style={s.backButton}
          accessibilityLabel="Kembali"
        >
          <ArrowLeftIcon size={18} color="#1F2A44" strokeWidth={2.3} />
        </TouchableOpacity>

        <View style={s.headerCenter}>
          <Text style={s.headerOverline}>
            {fromQuiz ? 'KARTU TERKAIT' : 'FLASHCARD'}
          </Text>
          <Text style={s.headerTitle}>{namaTopik}</Text>
          {fromQuiz && (
            <View style={s.fromQuizPill}>
              <LinkChainIcon size={12} color="#E11D48" />
              <Text style={s.fromQuizPillText}>
                Dari Kuis • Soal {questionNumber}
              </Text>
            </View>
          )}
        </View>

        {fromQuiz ? (
          <View style={{ width: 38 }} />
        ) : (
          <View style={s.counterPill}>
            <Text style={s.counterPillText}>
              {idx + 1} dari {totalCardsCount}
            </Text>
          </View>
        )}
      </View>

      {!fromQuiz && (
        <View style={s.progressTrack}>
          <View style={[s.progressFill, { width: `${pct}%` }]} />
        </View>
      )}

      <ScrollView
        style={s.scroll}
        contentContainerStyle={[
          s.scrollContent,
          step === 'assessment' && s.scrollContentCentered,
        ]}
        showsVerticalScrollIndicator={false}
      >
        {step === 'card' && (
          <View style={s.stageWrap}>
            <Animated.View
              style={[
                s.animatedCardContainer,
                {
                  transform: [
                    { scaleX: cardScaleX },
                    { scaleY: cardScaleY },
                  ],
                },
              ]}
            >
              {!isFlipped ? (
                <TouchableOpacity
                  activeOpacity={0.94}
                  onPress={() => triggerCardFlip(true)}
                  style={s.questionCard}
                >
                  <View style={s.cardTopRow}>
                    <View style={s.codeIconBox}>
                      <CodeSlashIcon size={16} color="#FFFFFF" />
                    </View>

                    <View style={s.statusPill}>
                      <View style={s.statusDotGreen} />
                      <Text style={s.statusPillText}>{current.statusLabel}</Text>
                    </View>
                  </View>

                  <View style={s.questionCenterBlock}>
                    <Text style={s.questionOverline}>PERTANYAAN</Text>
                    <View style={s.questionFlowRow}>
                      {current.pertanyaanParts.map((part, i) => {
                        if (part.type === 'codeValid') {
                          return (
                            <View key={i} style={s.inlineCodeValid}>
                              <Text style={s.inlineCodeValidText}>
                                {part.text}
                              </Text>
                            </View>
                          );
                        }
                        if (part.type === 'codeInvalid') {
                          return (
                            <View key={i} style={s.inlineCodeInvalid}>
                              <Text style={s.inlineCodeInvalidText}>
                                {part.text}
                              </Text>
                            </View>
                          );
                        }
                        return (
                          <Text key={i} style={s.questionMainText}>
                            {part.text}
                          </Text>
                        );
                      })}
                    </View>
                  </View>

                  <View style={s.cardBottomHintWrap}>
                    <View style={s.cardDivider} />
                    <View style={s.cardFlipHintRow}>
                      <FlipArrowsIcon color="rgba(255,255,255,0.85)" size={14} />
                      <Text style={s.cardFlipHintText}>
                        Ketuk kartu untuk membalik
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  activeOpacity={0.95}
                  onPress={() => triggerCardFlip(false)}
                  style={s.explanationCard}
                >
                  <View style={s.cardTopRow}>
                    <View style={s.explanationBadge}>
                      <OpenBookOutlineIcon size={13} color="#60A5FA" />
                      <Text style={s.explanationBadgeText}>Penjelasan</Text>
                    </View>

                    <TouchableOpacity
                      activeOpacity={0.75}
                      onPress={() => triggerCardFlip(false)}
                      style={s.miniFlipCircle}
                      accessibilityLabel="Balik ke pertanyaan"
                    >
                      <FlipArrowsIcon color="#94A3B8" size={14} />
                    </TouchableOpacity>
                  </View>

                  <Text style={s.explanationTitle}>
                    {current.judulPenjelasan}
                  </Text>
                  <Text style={s.explanationDesc}>{current.penjelasan}</Text>

                  <View style={s.codeExamplesGroup}>
                    <View style={[s.codeRowBox, s.codeRowValid]}>
                      <View style={s.codeStatusCircleGreen}>
                        <CheckIcon size={12} color="#FFFFFF" strokeWidth={3} />
                      </View>
                      <Text style={s.codeSnippetText}>
                        <Text style={{ color: '#4ADE80' }}>
                          {current.kodeBenar.lhs}
                        </Text>
                        <Text style={{ color: '#94A3B8' }}>{' = '}</Text>
                        <Text style={{ color: '#FDE68A' }}>
                          {current.kodeBenar.rhs}
                        </Text>
                      </Text>
                    </View>

                    <View style={[s.codeRowBox, s.codeRowInvalid]}>
                      <View style={s.codeStatusCircleRed}>
                        <CloseIcon size={12} color="#FFFFFF" strokeWidth={3} />
                      </View>
                      <Text style={s.codeSnippetText}>
                        <Text style={{ color: '#FB7185' }}>
                          {current.kodeSalah.lhs}
                        </Text>
                        <Text style={{ color: '#94A3B8' }}>{' = '}</Text>
                        <Text style={{ color: '#E2E8F0' }}>
                          {current.kodeSalah.rhs}
                        </Text>
                      </Text>
                    </View>
                  </View>

                  <View style={s.tipsYellowBox}>
                    <LightbulbIcon
                      size={15}
                      color="#D97706"
                      style={{ marginTop: 1, marginRight: 8 }}
                    />
                    <Text style={s.tipsYellowText}>
                      <Text style={s.tipsYellowBold}>Tips: </Text>
                      {current.tipsHighlight ? (
                        <>
                          {current.tipsPrefix}
                          <Text style={s.tipsInlineUnderscore}>
                            {` ${current.tipsHighlight} `}
                          </Text>
                          {current.tipsSuffix}
                        </>
                      ) : (
                        current.tips
                      )}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            </Animated.View>

            {!isFlipped && (
              <View style={s.belowCardHintRow}>
                <LightbulbIcon size={14} color="#94A3B8" />
                <Text style={s.belowCardHintText}>
                  Coba jawab sebelum melihat penjelasan.
                </Text>
              </View>
            )}
          </View>
        )}

        {step === 'assessment' && (
          <View style={s.assessmentContainer}>
            <Text style={s.assessmentTitle}>Seberapa paham kamu?</Text>
            <Text style={s.assessmentSubtitle}>
              Jujur saja, Flip akan menyesuaikan ulangannya.
            </Text>

            <View style={s.ratingRow}>
              {[
                { key: 'sulit', label: 'Sulit', activeBg: '#EF4444' },
                { key: 'sedang', label: 'Sedang', activeBg: '#F59E0B' },
                { key: 'mudah', label: 'Mudah', activeBg: '#10B981' },
              ].map((opt) => {
                const isSelected = rating === opt.key;
                return (
                  <TouchableOpacity
                    key={opt.key}
                    activeOpacity={0.85}
                    onPress={() => setRating(opt.key)}
                    style={[
                      s.ratingCard,
                      isSelected && {
                        backgroundColor: opt.activeBg,
                        borderColor: opt.activeBg,
                      },
                    ]}
                  >
                    {isSelected && (
                      <View style={s.selectedCornerBadge}>
                        <CheckIcon size={11} color="#FFFFFF" strokeWidth={3} />
                      </View>
                    )}

                    <FaceEmojiIcon type={opt.key} selected={isSelected} />

                    <Text
                      style={[
                        s.ratingLabel,
                        isSelected && s.ratingLabelSelected,
                      ]}
                    >
                      {opt.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <View
              style={[
                s.markedPill,
                rating !== 'mudah' && { backgroundColor: '#FEF3C7' },
              ]}
            >
              <Text style={s.markedPillPrefix}>Kartu ini ditandai </Text>
              <View
                style={[
                  s.markedPillDot,
                  {
                    backgroundColor:
                      rating === 'mudah' ? '#10B981' : '#D97706',
                  },
                ]}
              />
              <Text
                style={[
                  s.markedPillStatus,
                  {
                    color: rating === 'mudah' ? '#10B981' : '#B45309',
                  },
                ]}
              >
                {rating === 'mudah' ? 'Dikuasai' : 'Sedang dipelajari'}
              </Text>
            </View>

            <Text style={s.assessmentFootnote}>
              Sulit / Sedang → Sedang dipelajari • Mudah → Dikuasai
            </Text>
          </View>
        )}
      </ScrollView>

      <View style={s.footer}>
        {fromQuiz ? (
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => navigation.goBack()}
            style={s.primaryBtnOuter}
          >
            <View style={s.primaryBtnInner}>
              <ArrowLeftIcon size={18} color="#FFFFFF" strokeWidth={2.5} />
              <Text style={[s.primaryBtnText, { marginLeft: 8 }]}>
                Kembali ke Kuis
              </Text>
            </View>
          </TouchableOpacity>
        ) : (
          step === 'card' &&
          isFlipped && (
            <View style={s.explanationFooterRow}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => triggerCardFlip(false)}
                style={s.undoButton}
                accessibilityLabel="Kembalikan kartu"
              >
                <UndoCornerLeftIcon size={20} color="#1F2A44" />
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => setStep('assessment')}
                style={[s.primaryBtnOuter, { flex: 1, marginLeft: 12 }]}
              >
                <View style={s.primaryBtnInner}>
                  <Text style={s.primaryBtnText}>Nilai Pemahamanku</Text>
                </View>
              </TouchableOpacity>
            </View>
          )
        )}

        {step === 'assessment' && (
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleSaveAssessment}
            style={s.primaryBtnOuter}
          >
            <View style={s.primaryBtnInner}>
              <Text style={[s.primaryBtnText, { marginRight: 8 }]}>
                Simpan & Lanjut
              </Text>
              <ArrowRightIcon size={18} color="#FFFFFF" strokeWidth={2.5} />
            </View>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}
