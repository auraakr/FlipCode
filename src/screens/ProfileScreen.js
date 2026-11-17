import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { fonts } from '../constants/theme';
import { useAuth } from '../context/AuthContext';
import {
  ArrowLeftIcon,
  CameraOutlineIcon,
  EditPencilIcon,
  UnlockedOutlineIcon,
  ChevronRightIcon,
  LogoutDoorIcon,
  GalleryImageIcon,
  TrashOutlineIcon,
  BelajarTabIcon,
  ProgresTabIcon,
  PengaturanTabIcon,
} from '../../assets/icons/AppIcons';
import { ModalMascotRobot } from '../../assets/illustrations/MascotIllustrations';

// ============================================================================
// SHARED GLOBAL PROFILE STATE (Synchronizes Settings, Profile, & EditProfile)
// ============================================================================
let globalProfileOverrides = {
  nama: null,
  email: null,
  jenjang: 'SMA',
  useCustomPhoto: false,
};
const profileListeners = new Set();

export function updateGlobalProfile(partial) {
  globalProfileOverrides = { ...globalProfileOverrides, ...partial };
  profileListeners.forEach((fn) => fn(globalProfileOverrides));
}

export function useUserProfile() {
  const { user } = useAuth();
  const [overrides, setOverrides] = useState(globalProfileOverrides);

  useEffect(() => {
    const listener = (next) => setOverrides({ ...next });
    profileListeners.add(listener);
    return () => profileListeners.delete(listener);
  }, []);

  const rawUserNama =
    user?.nama && user.nama !== 'Aura Siswa' ? user.nama : 'Aura Putri Kireina';
  const rawUserEmail =
    user?.email && user.email !== 'aura@flipcode.id'
      ? user.email
      : 'aura@email.com';

  return {
    nama: overrides.nama || rawUserNama,
    email: overrides.email || rawUserEmail,
    jenjang: overrides.jenjang || 'SMA',
    useCustomPhoto: !!overrides.useCustomPhoto,
  };
}

// ============================================================================
// MAIN COMPONENT: ProfileScreen (FlipCode - 42 Setting Profile & 45 Logout)
// ============================================================================
export default function ProfileScreen({ navigation }) {
  const { logout } = useAuth();
  const profile = useUserProfile();
  const insets = useSafeAreaInsets();
  const [showPhotoSheet, setShowPhotoSheet] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const initialLetter = (profile.nama?.trim()?.[0] || 'A').toUpperCase();

  const handleConfirmLogout = async () => {
    setShowLogoutModal(false);
    try {
      await logout();
    } catch (_e) {
      // Ignore logout storage errors
    }
    navigation.replace('Login');
  };

  return (
    <SafeAreaView style={s.safeArea} edges={['top']}>
      {/* Top Header */}
      <View style={s.header}>
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={() => navigation.goBack()}
          style={s.backBtn}
        >
          <ArrowLeftIcon size={18} color="#1F2A44" />
        </TouchableOpacity>

        <Text style={s.headerTitle}>Profil</Text>

        <View style={s.headerSpacer} />
      </View>

      <ScrollView
        style={s.scrollView}
        contentContainerStyle={s.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Main Profile Banner Card */}
        <View style={s.profileCard}>
          <View style={s.profileBlueStrip} />

          <View style={s.avatarWrap}>
            <View style={s.avatarCircle}>
              {profile.useCustomPhoto ? (
                <Image
                  source={require('../../assets/pengaturan/icon_dumy_profile.png')}
                  style={s.avatarImage}
                />
              ) : (
                <Text style={s.avatarInitial}>{initialLetter}</Text>
              )}
            </View>

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => setShowPhotoSheet(true)}
              style={s.cameraBadge}
            >
              <CameraOutlineIcon size={13} color="#FFFFFF" strokeWidth={2.2} />
            </TouchableOpacity>
          </View>

          <Text style={s.userName}>{profile.nama}</Text>
          <Text style={s.userEmail}>{profile.email}</Text>

          <View style={s.jenjangPill}>
            <Text style={s.jenjangPillText}>{profile.jenjang}</Text>
          </View>
        </View>

        {/* 3 Stat Cards Row */}
        <View style={s.statsRow}>
          <View style={[s.statCard, s.statCardStreak]}>
            <Text style={[s.statValue, { color: '#92400E' }]}>3</Text>
            <Text style={[s.statLabel, { color: '#92400E' }]}>hari streak</Text>
          </View>

          <View style={[s.statCard, s.statCardMastered]}>
            <Text style={[s.statValue, { color: '#15803D' }]}>7</Text>
            <Text style={[s.statLabel, { color: '#15803D' }]}>
              kartu dikuasai
            </Text>
          </View>

          <View style={[s.statCard, s.statCardTopic]}>
            <Text style={[s.statValue, { color: '#2554E8' }]}>1/3</Text>
            <Text style={[s.statLabel, { color: '#2554E8' }]}>topik</Text>
          </View>
        </View>

        {/* Action Menu Card: Edit profil & Ubah password */}
        <View style={s.menuGroupCard}>
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={() => navigation.navigate('EditProfile')}
            style={s.menuRow}
          >
            <View style={s.menuRowLeft}>
              <View style={s.menuIconBox}>
                <EditPencilIcon size={16} color="#2554E8" />
              </View>
              <Text style={s.menuRowTitle}>Edit profil</Text>
            </View>
            <ChevronRightIcon />
          </TouchableOpacity>

          <View style={s.menuDivider} />

          <TouchableOpacity
            activeOpacity={0.75}
            onPress={() =>
              navigation.navigate('ForgotPassword', { email: profile.email })
            }
            style={s.menuRow}
          >
            <View style={s.menuRowLeft}>
              <View style={s.menuIconBox}>
                <UnlockedOutlineIcon size={17} color="#2554E8" />
              </View>
              <Text style={s.menuRowTitle}>Ubah password</Text>
            </View>
            <ChevronRightIcon />
          </TouchableOpacity>
        </View>

        {/* Logout Button: Keluar akun */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setShowLogoutModal(true)}
          style={s.logoutBtn}
        >
          <LogoutDoorIcon size={17} color="#DC2626" />
          <Text style={s.logoutBtnText}>Keluar akun</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Tab Bar (Belajar, Progres, Pengaturan Active) */}
      <View
        style={[
          s.tabBarContainer,
          { paddingBottom: Math.max(insets.bottom, 8) },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate('MainTabs', { screen: 'Belajar' })}
          style={s.tabButton}
        >
          <View style={s.tabIconBox}>
            <BelajarTabIcon focused={false} />
          </View>
          <Text style={s.tabLabelInactive}>Belajar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate('MainTabs', { screen: 'Progres' })}
          style={s.tabButton}
        >
          <View style={s.tabIconBox}>
            <ProgresTabIcon focused={false} />
          </View>
          <Text style={s.tabLabelInactive}>Progres</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
          style={s.tabButton}
        >
          <View style={[s.tabIconBox, s.tabIconBoxActive]}>
            <PengaturanTabIcon focused={true} />
          </View>
          <Text style={s.tabLabelActive}>Pengaturan</Text>
        </TouchableOpacity>
      </View>

      {/* ====================================================================
          MODAL 1: FOTO PROFIL BOTTOM SHEET (FlipCode - 44 Ganti Foto)
         ==================================================================== */}
      <Modal
        visible={showPhotoSheet}
        transparent
        animationType="fade"
        onRequestClose={() => setShowPhotoSheet(false)}
      >
        <Pressable
          style={s.sheetBackdrop}
          onPress={() => setShowPhotoSheet(false)}
        >
          <Pressable style={s.sheetCard} onPress={() => {}}>
            <View style={s.sheetHandle} />
            <Text style={s.sheetTitle}>Foto profil</Text>

            <TouchableOpacity
              activeOpacity={0.75}
              onPress={() => {
                updateGlobalProfile({ useCustomPhoto: true });
                setShowPhotoSheet(false);
              }}
              style={s.sheetRow}
            >
              <View style={[s.sheetIconBox, { backgroundColor: '#EEF3FF' }]}>
                <CameraOutlineIcon size={18} color="#2554E8" />
              </View>
              <Text style={s.sheetRowText}>Ambil dari kamera</Text>
            </TouchableOpacity>

            <View style={s.sheetDivider} />

            <TouchableOpacity
              activeOpacity={0.75}
              onPress={() => {
                updateGlobalProfile({ useCustomPhoto: true });
                setShowPhotoSheet(false);
              }}
              style={s.sheetRow}
            >
              <View style={[s.sheetIconBox, { backgroundColor: '#EEF3FF' }]}>
                <GalleryImageIcon size={18} color="#2554E8" />
              </View>
              <Text style={s.sheetRowText}>Pilih dari galeri</Text>
            </TouchableOpacity>

            <View style={s.sheetDivider} />

            <TouchableOpacity
              activeOpacity={0.75}
              onPress={() => {
                updateGlobalProfile({ useCustomPhoto: false });
                setShowPhotoSheet(false);
              }}
              style={s.sheetRow}
            >
              <View style={[s.sheetIconBox, { backgroundColor: '#FEF2F2' }]}>
                <TrashOutlineIcon size={18} color="#DC2626" />
              </View>
              <Text style={[s.sheetRowText, { color: '#DC2626' }]}>
                Hapus foto
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.75}
              onPress={() => setShowPhotoSheet(false)}
              style={s.sheetCancelBtn}
            >
              <Text style={s.sheetCancelText}>Batal</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>

      {/* ====================================================================
          MODAL 2: KELUAR DARI AKUN? (FlipCode - 45)
         ==================================================================== */}
      <Modal
        visible={showLogoutModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowLogoutModal(false)}
      >
        <Pressable
          style={s.modalBackdrop}
          onPress={() => setShowLogoutModal(false)}
        >
          <Pressable style={s.modalCard} onPress={() => {}}>
            <View style={s.modalMascotWrap}>
              <ModalMascotRobot />
            </View>

            <Text style={s.modalTitle}>Keluar dari akun?</Text>

            <Text style={s.modalSubtitle}>
              {'Progres kamu tetap tersimpan di akun ini.\nKamu bisa masuk lagi kapan saja.'}
            </Text>

            <View style={s.modalActionsRow}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setShowLogoutModal(false)}
                style={s.modalCancelBtn}
              >
                <Text style={s.modalCancelBtnText}>Batal</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.85}
                onPress={handleConfirmLogout}
                style={s.modalConfirmDangerOuter}
              >
                <View style={s.modalConfirmDangerInner}>
                  <Text style={s.modalConfirmDangerText}>Ya, Keluar</Text>
                </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 14,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E6ECF5',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0F172A',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  headerTitle: {
    fontFamily: fonts.extrabold,
    fontSize: 17,
    color: '#1F2A44',
  },
  headerSpacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 28,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E8EEF7',
    alignItems: 'center',
    overflow: 'hidden',
    paddingBottom: 18,
    marginBottom: 14,
    shadowColor: '#0F172A',
    shadowOpacity: 0.03,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  profileBlueStrip: {
    width: '100%',
    height: 68,
    backgroundColor: '#2554E8',
  },
  avatarWrap: {
    marginTop: -43,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarCircle: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: '#EBF1FF',
    borderWidth: 4,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  avatarInitial: {
    fontFamily: fonts.extrabold,
    fontSize: 32,
    color: '#2554E8',
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 0,
    right: -2,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#2554E8',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    fontFamily: fonts.extrabold,
    fontSize: 18,
    color: '#1F2A44',
    marginTop: 10,
    textAlign: 'center',
  },
  userEmail: {
    fontFamily: fonts.regular,
    fontSize: 12.5,
    color: '#94A3B8',
    marginTop: 3,
    textAlign: 'center',
  },
  jenjangPill: {
    backgroundColor: '#EBF1FF',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 4.5,
    marginTop: 10,
  },
  jenjangPillText: {
    fontFamily: fonts.bold,
    fontSize: 11.5,
    color: '#2554E8',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    paddingVertical: 14,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statCardStreak: {
    backgroundColor: '#FEF6E0',
    borderColor: '#FDE68A',
  },
  statCardMastered: {
    backgroundColor: '#E8FBF0',
    borderColor: '#BBF7D0',
  },
  statCardTopic: {
    backgroundColor: '#EBF1FF',
    borderColor: '#C7D7FE',
  },
  statValue: {
    fontFamily: fonts.extrabold,
    fontSize: 20,
    marginBottom: 2,
  },
  statLabel: {
    fontFamily: fonts.bold,
    fontSize: 11,
    textAlign: 'center',
  },
  menuGroupCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E8EEF7',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },
  menuRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuIconBox: {
    width: 36,
    height: 36,
    borderRadius: 11,
    backgroundColor: '#EEF3FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuRowTitle: {
    fontFamily: fonts.bold,
    fontSize: 13.5,
    color: '#1F2A44',
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FECACA',
    paddingVertical: 14,
    gap: 8,
  },
  logoutBtnText: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: '#DC2626',
  },
  tabBarContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderTopWidth: 1,
    borderTopColor: '#EEF2F7',
    paddingTop: 8,
    alignItems: 'center',
    justifyContent: 'space-around',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 8,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIconBox: {
    width: 38,
    height: 34,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 3,
  },
  tabIconBoxActive: {
    backgroundColor: '#E8EEFF',
  },
  tabLabelActive: {
    fontSize: 11,
    color: '#2554E8',
    fontFamily: fonts.bold,
  },
  tabLabelInactive: {
    fontSize: 11,
    color: '#7C8BA1',
    fontFamily: fonts.semibold,
  },
  sheetBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.55)',
    justifyContent: 'flex-end',
  },
  sheetCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 22,
    paddingTop: 12,
    paddingBottom: 26,
  },
  sheetHandle: {
    width: 42,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#CBD5E1',
    alignSelf: 'center',
    marginBottom: 18,
  },
  sheetTitle: {
    fontFamily: fonts.extrabold,
    fontSize: 17,
    color: '#1F2A44',
    marginBottom: 10,
  },
  sheetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    gap: 14,
  },
  sheetIconBox: {
    width: 38,
    height: 38,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheetRowText: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: '#1F2A44',
  },
  sheetDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
  },
  sheetCancelBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    marginTop: 6,
  },
  sheetCancelText: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: '#475569',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 26,
  },
  modalCard: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: '#FFFFFF',
    borderRadius: 26,
    paddingHorizontal: 22,
    paddingTop: 48,
    paddingBottom: 22,
    alignItems: 'center',
    position: 'relative',
  },
  modalMascotWrap: {
    position: 'absolute',
    top: -38,
    alignSelf: 'center',
  },
  modalTitle: {
    fontFamily: fonts.extrabold,
    fontSize: 19,
    color: '#1F2A44',
    textAlign: 'center',
    marginBottom: 8,
  },
  modalSubtitle: {
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: 19.5,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 22,
  },
  modalActionsRow: {
    flexDirection: 'row',
    width: '100%',
    gap: 12,
  },
  modalCancelBtn: {
    flex: 1,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCancelBtnText: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: '#1F2A44',
  },
  modalConfirmDangerOuter: {
    flex: 1,
    backgroundColor: '#B91C1C',
    borderRadius: 14,
    paddingBottom: 3,
  },
  modalConfirmDangerInner: {
    height: 43,
    borderRadius: 14,
    backgroundColor: '#EF4444',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalConfirmDangerText: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: '#FFFFFF',
  },
});

