import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  CloseIcon,
  QuizClipboardIcon,
  RotateCcwIcon,
  ChevronLeftIcon,
  LightningBoltIcon,
  ArrowRightIcon,
} from '../../assets/icons/AppIcons';
import {
  ReviewBannerRobot,
  CompletedHeroIllustration,
} from '../../assets/illustrations/MascotIllustrations';
import { s } from '../screens/FlashcardScreen';

// ============================================================================
// SUB-VIEW 1: FLASHCARD SESSION COMPLETED (FlipCode - 12)
// ============================================================================
export function FlashcardCompletedView({
  namaTopik,
  onClose,
  onStartQuiz,
  onRepeatCards,
}) {
  return (
    <SafeAreaView style={s.safeArea} edges={['top', 'bottom']}>
      <ScrollView
        style={s.scroll}
        contentContainerStyle={s.completedScrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={s.completedHeroBanner}>
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={onClose}
            style={s.completedCloseBtn}
            accessibilityLabel="Tutup"
          >
            <CloseIcon size={16} color="#FFFFFF" strokeWidth={2.3} />
          </TouchableOpacity>

          <CompletedHeroIllustration />
        </View>

        <View style={s.completedBody}>
          <Text style={s.completedTitle}>Sesi flashcard selesai!</Text>
          <Text style={s.completedSubtitle}>{namaTopik} • Mudah</Text>

          <View style={s.statsRow}>
            <View style={[s.statBox, s.statBoxBlue]}>
              <Text style={[s.statNumber, { color: '#2554E8' }]}>10</Text>
              <Text style={s.statLabel}>{'Kartu\ndipelajari'}</Text>
            </View>

            <View style={[s.statBox, s.statBoxGreen]}>
              <Text style={[s.statNumber, { color: '#10B981' }]}>7</Text>
              <Text style={s.statLabel}>{'Kartu\ndikuasai'}</Text>
            </View>

            <View style={[s.statBox, s.statBoxYellow]}>
              <Text style={[s.statNumber, { color: '#D97706' }]}>3</Text>
              <Text style={s.statLabel}>{'Perlu\ndiulang'}</Text>
            </View>
          </View>

          <View style={s.masteryCard}>
            <View style={s.masteryHeaderRow}>
              <Text style={s.masteryTitle}>Penguasaan kartu</Text>
              <Text style={s.masteryPct}>70%</Text>
            </View>

            <View style={s.masteryTrack}>
              <View style={s.masteryFill} />
            </View>

            <Text style={s.masteryNote}>
              Syarat 70% kartu dikuasai tercapai
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={s.completedFooter}>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={onStartQuiz}
          style={s.primaryBtnOuter}
        >
          <View style={s.primaryBtnInner}>
            <QuizClipboardIcon size={17} color="#FFFFFF" />
            <Text style={[s.primaryBtnText, { marginLeft: 8 }]}>
              Mulai Kuis
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.75}
          onPress={onRepeatCards}
          style={s.repeatLinkBtn}
        >
          <RotateCcwIcon size={15} color="#2554E8" />
          <Text style={s.repeatLinkText}>Ulangi Kartu</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// ============================================================================
// SUB-VIEW 2: FLASHCARD REVIEW / ULASAN KARTU (FlipCode - 11)
// ============================================================================
export function FlashcardReviewView({
  namaTopik,
  onBack,
  onRepeatCard,
  onContinueCompleted,
}) {
  return (
    <SafeAreaView style={s.safeArea}>
      <View style={s.header}>
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={onBack}
          style={s.backButton}
          accessibilityLabel="Kembali"
        >
          <ChevronLeftIcon size={18} color="#1F2A44" strokeWidth={2.3} />
        </TouchableOpacity>

        <View style={s.headerCenter}>
          <Text style={s.headerOverline}>ULASAN KARTU</Text>
          <Text style={s.headerTitle}>{namaTopik}</Text>
        </View>

        <View style={s.threeDotsRow}>
          <View style={[s.dotSmall, { backgroundColor: '#F59E0B' }]} />
          <View style={[s.dotSmall, { backgroundColor: '#F59E0B' }]} />
          <View style={[s.dotSmall, { backgroundColor: '#FDE68A' }]} />
        </View>
      </View>

      <ScrollView
        style={s.scroll}
        contentContainerStyle={s.reviewScrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={s.reviewBanner}>
          <View style={s.reviewBannerLeft}>
            <View style={s.reviewCountPill}>
              <View style={s.reviewCountDot} />
              <Text style={s.reviewCountText}>3 kartu perlu diulang</Text>
            </View>
            <Text style={s.reviewBannerTitle}>
              Tidak apa-apa! Mengulang bikin makin paham.
            </Text>
          </View>
          <ReviewBannerRobot />
        </View>

        <View style={s.reviewBlueCard}>
          <View style={s.cardTopRow}>
            <View style={s.studyingYellowPill}>
              <LightningBoltIcon size={12} color="#1F2A44" />
              <Text style={s.studyingYellowText}>Sedang dipelajari</Text>
            </View>

            <View style={s.selfRatedPill}>
              <View style={s.selfRatedDot} />
              <Text style={s.selfRatedPrefix}>Kamu menilai: </Text>
              <Text style={s.selfRatedValue}>Sedang</Text>
            </View>
          </View>

          <Text style={s.reviewQuestionText}>
            Apa yang terjadi pada nilai lama saat variabel diberi nilai baru?
          </Text>

          <View style={s.reviewCodeBox}>
            <Text style={s.codeCommentLine}># ulangi kartu ini</Text>
            <Text style={s.codeLine}>
              <Text style={{ color: '#60A5FA' }}>skor</Text>
              <Text style={{ color: '#E2E8F0' }}>{' = '}</Text>
              <Text style={{ color: '#4ADE80' }}>70</Text>
            </Text>
            <Text style={s.codeLine}>
              <Text style={{ color: '#60A5FA' }}>skor</Text>
              <Text style={{ color: '#E2E8F0' }}>{' = '}</Text>
              <Text style={{ color: '#4ADE80' }}>85</Text>
            </Text>
            <Text style={s.codeLine}>
              <Text style={{ color: '#C084FC' }}>print</Text>
              <Text style={{ color: '#E2E8F0' }}>(skor) </Text>
              <Text style={{ color: '#FACC15' }}># ?</Text>
            </Text>
          </View>

          <View style={s.reviewCardFooter}>
            <Text style={s.reviewConceptText}>
              Konsep: Variable Reassignment
            </Text>
            <Text style={s.reviewCardCountText}>Kartu 2 dari 5</Text>
          </View>
        </View>
      </ScrollView>

      <View style={s.footer}>
        <View style={s.explanationFooterRow}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onRepeatCard}
            style={s.repeatOutlineBtn}
          >
            <RotateCcwIcon size={16} color="#2554E8" />
            <Text style={s.repeatOutlineText}>Ulangi Lagi</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={onContinueCompleted}
            style={[s.primaryBtnOuter, { flex: 1, marginLeft: 12 }]}
          >
            <View style={s.primaryBtnInner}>
              <Text style={[s.primaryBtnText, { marginRight: 8 }]}>
                Lanjutkan
              </Text>
              <ArrowRightIcon size={17} color="#FFFFFF" strokeWidth={2.5} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

