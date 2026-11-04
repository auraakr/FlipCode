import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CommonActions, useNavigation } from '@react-navigation/native';
import Svg, { Path } from 'react-native-svg';
import { fonts } from '../constants/theme';
import { ProgressRepository } from '../storage/ProgressRepository';
import { useAuth } from '../context/AuthContext';

export default function SettingsScreen() {
  const navigation = useNavigation();
  const { user, logout } = useAuth();

  // Alert dengan tombol tidak berfungsi di web, jadi langsung keluar di sana.
  const keluar = () =>
    Platform.OS === 'web'
      ? logout()
      : Alert.alert('Keluar', 'Kamu akan keluar dari akunmu di perangkat ini.', [
          { text: 'Batal', style: 'cancel' },
          { text: 'Keluar', style: 'destructive', onPress: logout },
        ]);

  const confirm = (title, action) =>
    Alert.alert(title, 'Yakin? Tindakan ini tidak bisa dibatalkan.', [
      { text: 'Batal', style: 'cancel' },
      { text: 'Lanjut', style: 'destructive', onPress: action },
    ]);

  const ulangTesAwal = () =>
    confirm('Ulang Tes Awal', async () => {
      await ProgressRepository.reset();
      navigation.dispatch(
        CommonActions.reset({ index: 0, routes: [{ name: 'PlacementTest' }] })
      );
    });

  const resetProgres = () =>
    confirm('Reset Semua Progres', async () => {
      await ProgressRepository.reset();
      navigation.dispatch(
        CommonActions.reset({ index: 0, routes: [{ name: 'Welcome' }] })
      );
    });

  const tentangFlipCode = () => {
    Alert.alert(
      'Tentang FlipCode',
      'Versi 1.0.0\nKelompok 8 — IK300 Mobile Programming\nUniversitas Pendidikan Indonesia\n\nMedia Belajar Komputasional untuk SMA/SMK Indonesia.'
    );
  };

  const bukaPreferensi = () => {
    Alert.alert('Preferensi Akun', 'Fitur pengaturan preferensi akun & penyimpanan FlipCode.');
  };

  return (
    <SafeAreaView style={s.safeArea} edges={['top']}>
      {/* Top Header Bar (disamakan dengan ProgressScreen) */}
      <View style={s.header}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Belajar')}
          style={s.headerButton}
        >
          <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <Path
              d="M19 12H5M5 12L12 19M5 12L12 5"
              stroke="#2F66EE"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </TouchableOpacity>

        {/* Center Logo FlipCode */}
        <View style={s.logoContainer}>
          <Image
            source={require('../../assets/nama_logo.png')}
            style={s.logo}
            resizeMode="contain"
          />
        </View>

        {/* Right Streak Fire Icon */}
        <View style={s.headerButtonRight}>
          <Text style={s.fireIcon}>🔥</Text>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView
        style={s.scrollView}
        contentContainerStyle={s.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Title Row with Filter/Settings Icon */}
        <View style={s.titleRow}>
          <View>
            <Text style={s.pageTitle}>Pengaturan</Text>
            <Text style={s.pageSubtitle}>Preferensi akun & data lokal</Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={bukaPreferensi}
            style={s.filterButton}
          >
            <Image
              source={require('../../assets/pengaturan/icon_pengaturan_preferensiakun.png')}
              style={s.filterIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* Profile Card */}
        <View style={s.profileCard}>
          <View style={s.profileLeft}>
            <View style={s.avatarWrapper}>
              <View style={s.avatarCircle}>
                <Image
                  source={require('../../assets/pengaturan/icon_dumy_profile.png')}
                  style={s.avatarIcon}
                  resizeMode="contain"
                />
              </View>
              <View style={s.statusDot} />
            </View>

            <View style={s.profileInfo}>
              <View style={s.nameRow}>
                <Text style={s.profileName}>{user?.nama || 'Pengguna'}</Text>
                <View style={s.classBadge}>
                  <Text style={s.classBadgeText}>SMA Kelas 10</Text>
                </View>
              </View>
              <Text style={s.profileMotto}>Semangat terus{'\n'}belajarnya!</Text>
            </View>
          </View>

          <View style={s.streakPill}>
            <Text style={s.streakPillText}>🔥 7 Hari</Text>
          </View>
        </View>

        {/* Curriculum Banner */}
        <View style={s.curriculumCard}>
          <View style={s.curriculumLeft}>
            <View style={s.curriculumIconBox}>
              <Image
                source={require('../../assets/pengaturan/icon_kurikulum.png')}
                style={s.curriculumIcon}
                resizeMode="contain"
              />
            </View>
            <View style={s.curriculumTextBox}>
              <Text style={s.curriculumTitle}>Kurikulum Merdeka: Informatika</Text>
              <Text style={s.curriculumSubtitle}>Logika Algoritma Dasar • Modul 2</Text>
            </View>
          </View>

          {/* Verified rosette badge */}
          <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <Path
              d="M9 12L11 14L15 10M12 3L13.9 4.3L16.2 3.8L17.5 5.7L19.8 6.1L20.1 8.4L22 9.7L21.2 11.9L22.5 13.8L20.8 15.3L21.1 17.6L18.9 18.2L18.1 20.4L15.9 20L14.3 21.6L12.3 20.3L10.3 21.6L8.7 20L6.5 20.4L5.7 18.2L3.5 17.6L3.8 15.3L2.1 13.8L3.4 11.9L2.6 9.7L4.5 8.4L4.8 6.1L7.1 5.7L8.4 3.8L10.7 4.3L12 3Z"
              stroke="#A0BEEB"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </View>

        {/* Section Title */}
        <Text style={s.sectionHeader}>AKTIVITAS & PEMBELAJARAN</Text>

        {/* Action List Group */}
        <View style={s.actionGroup}>
          {/* Action 1: Ulangi Tes Awal */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={ulangTesAwal}
            style={s.actionRow}
          >
            <View style={s.actionLeft}>
              <View style={[s.actionIconBox, { backgroundColor: '#E0ECFF' }]}>
                <Image
                  source={require('../../assets/pengaturan/icon_ulangi_test.png')}
                  style={[s.actionIcon, { tintColor: '#2F66EE' }]}
                  resizeMode="contain"
                />
              </View>
              <View style={s.actionTextBox}>
                <Text style={s.actionTitle}>Ulangi Tes Awal</Text>
                <Text style={s.actionSubtitle}>Sesuaikan kembali tingkat kesulitan kuis</Text>
              </View>
            </View>
            <Text style={s.chevron}>›</Text>
          </TouchableOpacity>

          <View style={s.divider} />

          {/* Action 2: Reset Progres */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={resetProgres}
            style={s.actionRow}
          >
            <View style={s.actionLeft}>
              <View style={[s.actionIconBox, { backgroundColor: '#FEE2E2' }]}>
                <Image
                  source={require('../../assets/pengaturan/icon_reset_progress.png')}
                  style={[s.actionIcon, { tintColor: '#EF4444' }]}
                  resizeMode="contain"
                />
              </View>
              <View style={s.actionTextBox}>
                <Text style={[s.actionTitle, { color: '#DC2626' }]}>Reset Progres</Text>
                <Text style={s.actionSubtitle}>Hapus riwayat kartu & poin latihan offline</Text>
              </View>
            </View>
            <Text style={[s.chevron, { color: '#F87171' }]}>›</Text>
          </TouchableOpacity>

          <View style={s.divider} />

          {/* Action 3: Tentang FlipCode */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={tentangFlipCode}
            style={s.actionRow}
          >
            <View style={s.actionLeft}>
              <View style={[s.actionIconBox, { backgroundColor: '#EDF2F7' }]}>
                <Image
                  source={require('../../assets/pengaturan/icon_tentang.png')}
                  style={[s.actionIcon, { tintColor: '#475569' }]}
                  resizeMode="contain"
                />
              </View>
              <View style={s.actionTextBox}>
                <Text style={s.actionTitle}>Tentang FlipCode</Text>
                <Text style={s.actionSubtitle}>Visi edukasi dan pembuat aplikasi</Text>
              </View>
            </View>
            <Text style={s.chevron}>›</Text>
          </TouchableOpacity>

          <View style={s.divider} />

          {/* Action 4: Keluar */}
          <TouchableOpacity activeOpacity={0.7} onPress={keluar} style={s.actionRow}>
            <View style={s.actionLeft}>
              <View style={[s.actionIconBox, { backgroundColor: '#FEE2E2' }]}>
                <Text style={{ fontSize: 18, color: '#EF4444' }}>⎋</Text>
              </View>
              <View style={s.actionTextBox}>
                <Text style={[s.actionTitle, { color: '#DC2626' }]}>Keluar</Text>
                <Text style={s.actionSubtitle}>{user?.email || 'Keluar dari akun'}</Text>
              </View>
            </View>
            <Text style={[s.chevron, { color: '#F87171' }]}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Daily Tips Card */}
        <View style={s.tipsCard}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
            }}
            style={s.tipsImage}
            resizeMode="cover"
          />
          <View style={s.tipsTextBox}>
            <Text style={s.tipsTag}>Tips Belajar Harian</Text>
            <Text style={s.tipsTitle}>Kuasai pseudocode 10 menit per hari</Text>
            <Text style={s.tipsSubtitle}>Algoritma jadi seru & mudah dipahami</Text>
          </View>
        </View>

        {/* Footer Attribution */}
        <View style={s.footerBox}>
          <Text style={s.footerTitle}>&lt; &gt; FlipCode v1.0</Text>
          <Text style={s.footerSubtitle}>
            Media Belajar Komputasional • SMA/SMK Indonesia
          </Text>
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
    paddingHorizontal: 18,
    paddingVertical: 8,
    backgroundColor: '#FAF8F5',
    borderBottomWidth: 1,
    borderBottomColor: '#EEF2F6',
  },
  headerButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerButtonRight: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  logoContainer: {
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 155,
    height: 78,
  },
  fireIcon: {
    fontSize: 20,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 24,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  pageTitle: {
    fontSize: 22,
    fontFamily: fonts.extrabold,
    color: '#0F172A',
  },
  pageSubtitle: {
    fontSize: 13,
    fontFamily: fonts.medium,
    color: '#64748B',
    marginTop: 2,
  },
  filterButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#E0ECFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterIcon: {
    width: 18,
    height: 18,
    tintColor: '#2F66EE',
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EEF2F6',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  profileLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatarCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#3062F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarIcon: {
    width: 26,
    height: 26,
    tintColor: '#FFFFFF',
  },
  statusDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 13,
    height: 13,
    borderRadius: 6.5,
    backgroundColor: '#F59E0B',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  profileInfo: {
    marginLeft: 12,
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileName: {
    fontSize: 16,
    fontFamily: fonts.extrabold,
    color: '#0F172A',
  },
  classBadge: {
    backgroundColor: '#EDF3FE',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 8,
  },
  classBadgeText: {
    fontSize: 10,
    fontFamily: fonts.bold,
    color: '#2F66EE',
  },
  profileMotto: {
    fontSize: 11,
    fontFamily: fonts.medium,
    color: '#64748B',
    marginTop: 3,
    lineHeight: 15,
  },
  streakPill: {
    backgroundColor: '#FEF3C7',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  streakPillText: {
    fontSize: 11,
    fontFamily: fonts.bold,
    color: '#B45309',
  },
  curriculumCard: {
    backgroundColor: '#F0F5FF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E0EBFC',
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  curriculumLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  curriculumIconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#DBE8FC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  curriculumIcon: {
    width: 20,
    height: 16,
    tintColor: '#2F66EE',
  },
  curriculumTextBox: {
    flex: 1,
  },
  curriculumTitle: {
    fontSize: 13,
    fontFamily: fonts.bold,
    color: '#0F172A',
  },
  curriculumSubtitle: {
    fontSize: 11,
    fontFamily: fonts.medium,
    color: '#64748B',
    marginTop: 2,
  },
  sectionHeader: {
    fontSize: 11,
    fontFamily: fonts.bold,
    color: '#64748B',
    letterSpacing: 0.8,
    marginTop: 22,
    marginBottom: 10,
  },
  actionGroup: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EEF2F6',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  actionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  actionIconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  actionIcon: {
    width: 18,
    height: 18,
  },
  actionTextBox: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 14,
    fontFamily: fonts.bold,
    color: '#0F172A',
  },
  actionSubtitle: {
    fontSize: 11,
    fontFamily: fonts.medium,
    color: '#64748B',
    marginTop: 2,
  },
  chevron: {
    fontSize: 22,
    color: '#CBD5E1',
    fontFamily: fonts.bold,
    marginLeft: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginLeft: 70,
  },
  tipsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EEF2F6',
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  tipsImage: {
    width: 58,
    height: 58,
    borderRadius: 14,
    backgroundColor: '#E2E8F0',
  },
  tipsTextBox: {
    flex: 1,
    marginLeft: 12,
  },
  tipsTag: {
    fontSize: 12,
    fontFamily: fonts.bold,
    color: '#2F66EE',
  },
  tipsTitle: {
    fontSize: 13,
    fontFamily: fonts.bold,
    color: '#0F172A',
    marginTop: 2,
  },
  tipsSubtitle: {
    fontSize: 11,
    fontFamily: fonts.medium,
    color: '#64748B',
    marginTop: 2,
  },
  footerBox: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 8,
  },
  footerTitle: {
    fontSize: 12,
    fontFamily: fonts.bold,
    color: '#64748B',
  },
  footerSubtitle: {
    fontSize: 11,
    fontFamily: fonts.medium,
    color: '#94A3B8',
    marginTop: 3,
  },
});
