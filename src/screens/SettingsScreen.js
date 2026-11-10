import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { fonts } from '../constants/theme';
import { ProgressRepository } from '../storage/ProgressRepository';
import { useAuth } from '../context/AuthContext';
import { setGlobalActiveTopic } from './HomeScreen';
import {
  ChevronRightIcon,
  GraduationCapIcon,
  DocumentLinesIcon,
  RotateCcwIcon,
  InfoCircleIcon,
  SmartphoneIcon,
  ClockIcon,
  SmallBookIcon,
} from '../../assets/icons/AppIcons';
import {
  SettingsHeroRobot,
  ModalMascotRobot,
  ResetModalMascotRobot,
} from '../../assets/illustrations/MascotIllustrations';

// ============================================================================
// MAIN COMPONENT: SettingsScreen (FlipCode - 27, 28, & 29)
// ============================================================================
export default function SettingsScreen() {
  const navigation = useNavigation();
  const { user, refreshUser } = useAuth();
  const [jenjang, setJenjang] = useState('SMA');
  const [showRepeatModal, setShowRepeatModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  const displayName = user?.nama || 'Aura';

  const handleToggleJenjang = () => {
    setJenjang((prev) => (prev === 'SMA' ? 'SMK' : 'SMA'));
  };

  // Konfirmasi "Ya, Ulangi" pada modal Ulangi Tes Awal (Frame 28)
  // Sesuai keterangan wireframe: "Kamu akan menjawab soal tes lagi dan level tiap topik
  // akan disesuaikan. Status kartu flashcard tetap tersimpan."
  const handleConfirmRepeatTest = async () => {
    setShowRepeatModal(false);
    setGlobalActiveTopic('variabel');
    navigation.navigate('PlacementTest', { ulang: true });
  };

  // Konfirmasi "Ya, Reset" pada modal Reset semua progres? (Frame 29 -> Frame 30)
  const handleConfirmResetProgress = async () => {
    setShowResetModal(false);
    try {
      await ProgressRepository.reset();
    } catch (e) {
      Alert.alert('Gagal mereset progres', e.message || 'Coba lagi.');
      return;
    }
    await refreshUser().catch(() => {});
    setGlobalActiveTopic('variabel');
    navigation.navigate('ResetCompleted');
  };

  const handleAboutFlipCode = () => {
    navigation.navigate('About');
  };

  return (
    <SafeAreaView style={s.safeArea} edges={['top']}>
      <ScrollView
        style={s.scrollView}
        contentContainerStyle={s.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Page Title */}
        <Text style={s.pageTitle}>Pengaturan</Text>

        {/* Blue Profile Hero Card (Frame 27) */}
        <View style={s.heroProfileCard}>
          <View style={s.heroLeftRow}>
            <View style={s.avatarOuterRing}>
              <Image
                source={require('../../assets/pengaturan/icon_dumy_profile.png')}
                style={s.avatarImage}
              />
            </View>

            <View style={s.profileTextCol}>
              <Text style={s.profileName} numberOfLines={1}>
                {displayName}
              </Text>

              <View style={s.schoolPill}>
                <GraduationCapIcon size={12} color="#1E293B" filled />
                <Text style={s.schoolPillText}>{jenjang}</Text>
              </View>
            </View>
          </View>

          <View style={s.heroRightRobot}>
            <SettingsHeroRobot />
          </View>
        </View>

        {/* ====================================================================
            SECTION 1: PROFIL
           ==================================================================== */}
        <Text style={s.sectionLabel}>PROFIL</Text>

        <View style={s.groupCard}>
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={handleToggleJenjang}
            style={s.rowItem}
          >
            <View style={s.rowLeft}>
              <View style={[s.iconCircle, { backgroundColor: '#F3E8FF' }]}>
                <GraduationCapIcon size={18} color="#7C3AED" />
              </View>
              <Text style={s.rowTitle}>Jenjang sekolah</Text>
            </View>

            <View style={s.rowRight}>
              <Text style={s.rowRightValue}>{jenjang}</Text>
              <ChevronRightIcon />
            </View>
          </TouchableOpacity>
        </View>

        {/* ====================================================================
            SECTION 2: BELAJAR
           ==================================================================== */}
        <Text style={s.sectionLabel}>BELAJAR</Text>

        <View style={s.groupCard}>
          {/* Action 1: Ulangi Tes Awal -> Membuka Modal Frame 28 */}
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={() => setShowRepeatModal(true)}
            style={s.rowItem}
          >
            <View style={s.rowLeft}>
              <View style={[s.iconCircle, { backgroundColor: '#EAF1FF' }]}>
                <DocumentLinesIcon size={18} color="#2554E8" />
              </View>

              <View style={s.rowTextCol}>
                <Text style={s.rowTitle}>Ulangi Tes Awal</Text>
                <Text style={s.rowSubtitle}>
                  Tentukan ulang level belajarmu
                </Text>
              </View>
            </View>

            <ChevronRightIcon />
          </TouchableOpacity>

          <View style={s.divider} />

          {/* Action 2: Reset Progres -> Membuka Modal Frame 29 */}
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={() => setShowResetModal(true)}
            style={s.rowItem}
          >
            <View style={s.rowLeft}>
              <View style={[s.iconCircle, { backgroundColor: '#FEECEC' }]}>
                <RotateCcwIcon size={18} color="#EF4444" />
              </View>

              <View style={s.rowTextCol}>
                <Text style={[s.rowTitle, { color: '#EF4444' }]}>
                  Reset Progres
                </Text>
                <Text style={s.rowSubtitle}>Hapus semua progres belajar</Text>
              </View>
            </View>

            <ChevronRightIcon />
          </TouchableOpacity>
        </View>

        {/* ====================================================================
            SECTION 3: INFO
           ==================================================================== */}
        <Text style={s.sectionLabel}>INFO</Text>

        <View style={s.groupCard}>
          {/* Row 1: Tentang FlipCode */}
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={handleAboutFlipCode}
            style={s.rowItem}
          >
            <View style={s.rowLeft}>
              <View style={[s.iconCircle, { backgroundColor: '#FEF7E0' }]}>
                <InfoCircleIcon size={18} color="#D97706" />
              </View>
              <Text style={s.rowTitle}>Tentang FlipCode</Text>
            </View>

            <ChevronRightIcon />
          </TouchableOpacity>

          <View style={s.divider} />

          {/* Row 2: Versi aplikasi */}
          <View style={s.rowItem}>
            <View style={s.rowLeft}>
              <View style={[s.iconCircle, { backgroundColor: '#E6F8EF' }]}>
                <SmartphoneIcon size={18} color="#10B981" />
              </View>
              <Text style={s.rowTitle}>Versi aplikasi</Text>
            </View>

            <View style={s.versionBadge}>
              <Text style={s.versionBadgeText}>2.0</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* ======================================================================
           MODAL FRAME 28: CONFIRM REPEAT TEST ("Ulangi tes awal?")
         ====================================================================== */}
      <Modal
        visible={showRepeatModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowRepeatModal(false)}
      >
        <Pressable
          style={s.modalBackdrop}
          onPress={() => setShowRepeatModal(false)}
        >
          <Pressable style={s.modalCard} onPress={() => {}}>
            {/* Floating Robot Mascot on Top of Modal */}
            <View style={s.modalMascotWrap}>
              <ModalMascotRobot />
            </View>

            {/* Modal Title */}
            <Text style={s.modalTitle}>Ulangi tes awal?</Text>

            {/* Modal Description */}
            <Text style={s.modalDesc}>
              Kamu akan menjawab soal tes lagi dan level tiap topik akan
              disesuaikan. Status kartu flashcard tetap tersimpan.
            </Text>

            {/* 2 Info Pills: 9 soal & 3 topik */}
            <View style={s.modalPillsRow}>
              {/* Pill 1: 9 soal */}
              <View style={s.quizCountPill}>
                <ClockIcon size={12} color="#2554E8" />
                <Text style={s.quizCountPillText}>9 soal</Text>
              </View>

              {/* Pill 2: 3 topik */}
              <View style={s.topicCountPill}>
                <SmallBookIcon size={12} color="#D97706" />
                <Text style={s.topicCountPillText}>3 topik</Text>
              </View>
            </View>

            {/* Action Buttons: Batal & Ya, Ulangi */}
            <View style={s.modalButtonsRow}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setShowRepeatModal(false)}
                style={s.cancelBtn}
              >
                <Text style={s.cancelBtnText}>Batal</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.85}
                onPress={handleConfirmRepeatTest}
                style={s.confirmBtn}
              >
                <Text style={s.confirmBtnText}>Ya, Ulangi</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>

      {/* ======================================================================
          MODAL FRAME 29: CONFIRM RESET PROGRESS ("Reset semua progres?")
         ====================================================================== */}
      <Modal
        visible={showResetModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowResetModal(false)}
      >
        <Pressable
          style={s.modalBackdrop}
          onPress={() => setShowResetModal(false)}
        >
          <Pressable style={s.modalCard} onPress={() => {}}>
            {/* Floating Robot Mascot with Warning Badge on Top of Modal */}
            <View style={s.modalMascotWrap}>
              <ResetModalMascotRobot />
            </View>

            {/* Modal Title */}
            <Text style={s.modalTitle}>Reset semua progres?</Text>

            {/* Modal Description */}
            <Text style={s.modalDesc}>
              Perjalanan belajarmu akan dimulai lagi dari awal, termasuk tes
              awal.
            </Text>

            {/* Soft Peach/Red Warning List Box */}
            <View style={s.resetWarningBox}>
              {[
                'Progres semua topik',
                'Status kartu flashcard',
                'Riwayat kuis & level',
              ].map((item, idx) => (
                <View
                  key={idx}
                  style={[s.resetBulletRow, idx > 0 && { marginTop: 10 }]}
                >
                  <View style={s.resetBulletDot} />
                  <Text style={s.resetBulletText}>{item}</Text>
                </View>
              ))}
            </View>

            {/* Irreversible Action Note */}
            <Text style={s.resetIrreversibleText}>
              Tindakan ini tidak bisa dibatalkan.
            </Text>

            {/* Action Buttons: Batal & Ya, Reset */}
            <View style={[s.modalButtonsRow, { marginTop: 16 }]}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setShowResetModal(false)}
                style={s.cancelBtn}
              >
                <Text style={s.cancelBtnText}>Batal</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.85}
                onPress={handleConfirmResetProgress}
                style={s.resetConfirmBtn}
              >
                <Text style={s.confirmBtnText}>Ya, Reset</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FDFCF7',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 36,
  },
  pageTitle: {
    fontFamily: fonts.extrabold,
    fontSize: 22,
    color: '#1F2A44',
    marginBottom: 16,
  },

  // ==========================================================================
  // HERO PROFILE CARD
  // ==========================================================================
  heroProfileCard: {
    backgroundColor: '#2554E8',
    borderRadius: 24,
    borderBottomWidth: 4,
    borderBottomColor: '#1B3FB5',
    paddingVertical: 16,
    paddingLeft: 18,
    paddingRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  heroLeftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarOuterRing: {
    width: 58,
    height: 58,
    borderRadius: 29,
    borderWidth: 2.5,
    borderColor: '#FFFFFF',
    backgroundColor: '#E2E8F0',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImage: {
    width: 54,
    height: 54,
    borderRadius: 27,
  },
  profileTextCol: {
    marginLeft: 14,
    flex: 1,
  },
  profileName: {
    fontFamily: fonts.extrabold,
    fontSize: 18,
    color: '#FFFFFF',
  },
  schoolPill: {
    marginTop: 6,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 999,
    paddingVertical: 3.5,
    paddingHorizontal: 10,
  },
  schoolPillText: {
    fontFamily: fonts.extrabold,
    fontSize: 10.5,
    color: '#1F2A44',
    marginLeft: 5,
  },
  heroRightRobot: {
    width: 92,
    height: 86,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ==========================================================================
  // SECTIONS & CARDS
  // ==========================================================================
  sectionLabel: {
    marginTop: 20,
    marginBottom: 8,
    marginLeft: 4,
    fontFamily: fonts.extrabold,
    fontSize: 11,
    letterSpacing: 0.8,
    color: '#94A3B8',
  },
  groupCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#E6ECF5',
    overflow: 'hidden',
  },
  rowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: 10,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 13,
  },
  rowTextCol: {
    flex: 1,
  },
  rowTitle: {
    fontFamily: fonts.extrabold,
    fontSize: 14,
    color: '#1F2A44',
  },
  rowSubtitle: {
    fontFamily: fonts.medium,
    fontSize: 11.5,
    color: '#94A3B8',
    marginTop: 2,
  },
  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowRightValue: {
    fontFamily: fonts.semibold,
    fontSize: 13,
    color: '#64748B',
    marginRight: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginHorizontal: 16,
  },
  versionBadge: {
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  versionBadgeText: {
    fontFamily: fonts.bold,
    fontSize: 11.5,
    color: '#64748B',
  },

  // ==========================================================================
  // MODAL CONFIRM REPEAT TEST (FRAME 28)
  // ==========================================================================
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.56)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 26,
  },
  modalCard: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    paddingHorizontal: 22,
    paddingTop: 52,
    paddingBottom: 22,
    alignItems: 'center',
    position: 'relative',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 10,
  },
  modalMascotWrap: {
    position: 'absolute',
    top: -48,
    alignSelf: 'center',
  },
  modalTitle: {
    fontFamily: fonts.extrabold,
    fontSize: 20,
    color: '#1F2A44',
    textAlign: 'center',
  },
  modalDesc: {
    marginTop: 8,
    fontFamily: fonts.medium,
    fontSize: 12.5,
    lineHeight: 19,
    color: '#64748B',
    textAlign: 'center',
    paddingHorizontal: 4,
  },
  modalPillsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginTop: 16,
  },
  quizCountPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF4FF',
    borderWidth: 1,
    borderColor: '#DCE7FF',
    borderRadius: 999,
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  quizCountPillText: {
    fontFamily: fonts.extrabold,
    fontSize: 11.5,
    color: '#2554E8',
    marginLeft: 5,
  },
  topicCountPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF9E7',
    borderWidth: 1,
    borderColor: '#FDE68A',
    borderRadius: 999,
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  topicCountPillText: {
    fontFamily: fonts.extrabold,
    fontSize: 11.5,
    color: '#D97706',
    marginLeft: 5,
  },
  modalButtonsRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 22,
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelBtnText: {
    fontFamily: fonts.extrabold,
    fontSize: 14,
    color: '#1F2A44',
  },
  confirmBtn: {
    flex: 1,
    backgroundColor: '#2554E8',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmBtnText: {
    fontFamily: fonts.extrabold,
    fontSize: 14,
    color: '#FFFFFF',
  },
  resetWarningBox: {
    width: '100%',
    backgroundColor: '#FFF3EE',
    borderWidth: 1,
    borderColor: '#FDD8CE',
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginTop: 16,
  },
  resetBulletRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resetBulletDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#F26B50',
    marginRight: 10,
  },
  resetBulletText: {
    fontFamily: fonts.medium,
    fontSize: 12.5,
    color: '#334155',
  },
  resetIrreversibleText: {
    marginTop: 14,
    fontFamily: fonts.semibold,
    fontSize: 11.5,
    color: '#E05A47',
    textAlign: 'center',
  },
  resetConfirmBtn: {
    flex: 1,
    backgroundColor: '#F26B50',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
