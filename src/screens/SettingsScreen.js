import React, { useState } from 'react';
import {
  View,
  Text,
  Alert,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
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
import s from '../styles/SettingsScreen.styles';

// ============================================================================
// MAIN COMPONENT: SettingsScreen (FlipCode - 27, 28, & 29)
// ============================================================================
export default function SettingsScreen() {
  const navigation = useNavigation();
  const { user } = useAuth();
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
    navigation.navigate('PlacementTest');
  };

  // Konfirmasi "Ya, Reset" pada modal Reset semua progres? (Frame 29 -> Frame 30)
  const handleConfirmResetProgress = async () => {
    setShowResetModal(false);
    await ProgressRepository.reset();
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

        {/* Blue Profile Hero Card (Frame 27) - Ketuk untuk preview halaman Login/Register */}
        <TouchableOpacity
          activeOpacity={0.88}
          onPress={() => navigation.navigate('Login')}
          style={s.heroProfileCard}
        >
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
        </TouchableOpacity>

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
