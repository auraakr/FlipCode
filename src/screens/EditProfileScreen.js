import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  Modal,
  Pressable,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fonts } from '../constants/theme';
import {
  ArrowLeftIcon,
  CameraOutlineIcon,
  UserIcon,
  MailIcon,
  UnlockedOutlineIcon,
  CheckCircleFilledIcon,
  GalleryImageIcon,
  TrashOutlineIcon,
} from '../../assets/icons/AppIcons';
import { useUserProfile } from './ProfileScreen';
import { ProfilePhotoStorage } from '../storage/ProfilePhotoStorage';
import { useAuth } from '../context/AuthContext';

export default function EditProfileScreen({ navigation }) {
  const profile = useUserProfile();
  const { updateProfile, savePhoto, removePhoto } = useAuth();
  const [nama, setNama] = useState(profile.nama);
  const [jenjang, setJenjang] = useState(profile.jenjang);
  const [showPhotoSheet, setShowPhotoSheet] = useState(false);
  // Pratinjau foto: undefined = tidak diubah, string = foto baru (URI sementara), null = dihapus.
  // Baru disimpan ke perangkat saat tombol "Simpan Perubahan" ditekan.
  const [pendingPhoto, setPendingPhoto] = useState(undefined);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const previewUri = pendingPhoto !== undefined ? pendingPhoto : profile.photoUri;

  const handlePickPhoto = async (source) => {
    setShowPhotoSheet(false);
    try {
      const uri = await ProfilePhotoStorage.pick(source);
      if (uri) setPendingPhoto(uri);
    } catch (e) {
      Alert.alert('Foto profil', e.message || 'Gagal memuat foto.');
    }
  };

  const initialLetter = ((nama || profile.nama)?.trim()?.[0] || 'A').toUpperCase();

  const handleSave = async () => {
    if (saving) return;
    const trimmed = nama.trim();
    if (!trimmed) {
      setError('Nama lengkap tidak boleh kosong');
      return;
    }

    const changes = {};
    if (trimmed !== profile.nama) changes.nama = trimmed;
    if (jenjang !== profile.jenjang) changes.jenjang = jenjang;

    const photoChanged = pendingPhoto !== undefined;

    // Tidak ada perubahan: tidak perlu menyimpan apa pun.
    if (Object.keys(changes).length === 0 && !photoChanged) {
      navigation.goBack();
      return;
    }

    setError('');
    setSaving(true);
    try {
      // Nama & jenjang -> server (Supabase). Foto -> hanya di perangkat ini.
      if (Object.keys(changes).length > 0) await updateProfile(changes);
      if (photoChanged) {
        if (pendingPhoto) await savePhoto(pendingPhoto);
        else await removePhoto();
      }
      navigation.goBack();
    } catch (e) {
      setError(e.message || 'Gagal menyimpan perubahan');
      Alert.alert('Gagal menyimpan', e.message || 'Coba lagi nanti.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView style={s.safeArea} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={s.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Top Header */}
        <View style={s.header}>
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={() => navigation.goBack()}
            style={s.backBtn}
          >
            <ArrowLeftIcon size={18} color="#1F2A44" />
          </TouchableOpacity>

          <Text style={s.headerTitle}>Edit Profil</Text>

          <View style={s.headerSpacer} />
        </View>

        <ScrollView
          style={s.flex}
          contentContainerStyle={s.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Avatar & Ganti Foto Section */}
          <View style={s.avatarSection}>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => setShowPhotoSheet(true)}
              style={s.avatarCircle}
            >
              {previewUri ? (
                <Image
                  source={{ uri: previewUri }}
                  style={s.avatarImage}
                />
              ) : (
                <Text style={s.avatarInitial}>{initialLetter}</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.75}
              onPress={() => setShowPhotoSheet(true)}
              style={s.changePhotoBtn}
            >
              <CameraOutlineIcon size={15} color="#2554E8" strokeWidth={2.2} />
              <Text style={s.changePhotoText}>Ganti foto</Text>
            </TouchableOpacity>
          </View>

          {/* Form Fields */}
          <View style={s.formSection}>
            {/* 1. Nama lengkap */}
            <View style={s.fieldGroup}>
              <Text style={s.fieldLabel}>Nama lengkap</Text>
              <View style={s.activeInputBox}>
                <UserIcon size={18} color="#2554E8" />
                <TextInput
                  value={nama}
                  onChangeText={(t) => {
                    setNama(t);
                    if (error) setError('');
                  }}
                  placeholder="Masukkan nama lengkap"
                  placeholderTextColor="#94A3B8"
                  autoCapitalize="words"
                  style={s.textInput}
                />
              </View>
              {!!error && <Text style={s.errorText}>{error}</Text>}
            </View>

            {/* 2. Email (Disabled / Read-only) */}
            <View style={s.fieldGroup}>
              <Text style={s.fieldLabel}>Email</Text>
              <View style={s.disabledInputBox}>
                <MailIcon size={18} color="#64748B" />
                <Text style={s.disabledEmailText} numberOfLines={1}>
                  {profile.email}
                </Text>
                <UnlockedOutlineIcon size={16} color="#64748B" />
              </View>
              <Text style={s.helperText}>Email tidak bisa diubah</Text>
            </View>

            {/* 3. Jenjang sekolah */}
            <View style={s.fieldGroup}>
              <Text style={s.fieldLabel}>Jenjang sekolah</Text>
              <View style={s.jenjangRow}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setJenjang('SMA')}
                  style={[
                    s.jenjangCard,
                    jenjang === 'SMA' && s.jenjangCardActive,
                  ]}
                >
                  {jenjang === 'SMA' && (
                    <CheckCircleFilledIcon size={17} color="#2554E8" />
                  )}
                  <Text
                    style={[
                      s.jenjangCardText,
                      jenjang === 'SMA' && s.jenjangCardTextActive,
                    ]}
                  >
                    SMA
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setJenjang('SMK')}
                  style={[
                    s.jenjangCard,
                    jenjang === 'SMK' && s.jenjangCardActive,
                  ]}
                >
                  {jenjang === 'SMK' && (
                    <CheckCircleFilledIcon size={17} color="#2554E8" />
                  )}
                  <Text
                    style={[
                      s.jenjangCardText,
                      jenjang === 'SMK' && s.jenjangCardTextActive,
                    ]}
                  >
                    SMK
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Bottom CTA: Simpan Perubahan */}
          <View style={s.footerSection}>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={handleSave}
              disabled={saving}
              style={[s.saveBtnOuter, saving && { opacity: 0.7 }]}
            >
              <View style={s.saveBtnInner}>
                {saving ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={s.saveBtnText}>Simpan Perubahan</Text>
                )}
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* ====================================================================
          MODAL: FOTO PROFIL BOTTOM SHEET (FlipCode - 44 Ganti Foto)
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
              onPress={() => handlePickPhoto('camera')}
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
              onPress={() => handlePickPhoto('gallery')}
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
                setPendingPhoto(null);
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
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FDFCF7',
  },
  flex: {
    flex: 1,
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
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 22,
    paddingTop: 10,
    paddingBottom: 28,
    justifyContent: 'space-between',
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 26,
  },
  avatarCircle: {
    width: 106,
    height: 106,
    borderRadius: 53,
    backgroundColor: '#EBF1FF',
    borderWidth: 4,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    shadowColor: '#0F172A',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  avatarInitial: {
    fontFamily: fonts.extrabold,
    fontSize: 38,
    color: '#2554E8',
  },
  changePhotoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  changePhotoText: {
    fontFamily: fonts.bold,
    fontSize: 13,
    color: '#2554E8',
  },
  formSection: {
    width: '100%',
  },
  fieldGroup: {
    marginBottom: 18,
  },
  fieldLabel: {
    fontFamily: fonts.bold,
    fontSize: 13,
    color: '#1F2A44',
    marginBottom: 8,
  },
  activeInputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    borderWidth: 1.4,
    borderColor: '#2554E8',
    paddingHorizontal: 14,
    height: 50,
  },
  textInput: {
    flex: 1,
    fontFamily: fonts.medium,
    fontSize: 13.5,
    color: '#1F2A44',
    marginLeft: 10,
    paddingVertical: 0,
  },
  disabledInputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2F7',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 14,
    height: 50,
  },
  disabledEmailText: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: 13.5,
    color: '#64748B',
    marginLeft: 10,
    marginRight: 8,
  },
  errorText: {
    fontFamily: fonts.regular,
    fontSize: 11.5,
    color: '#DC2626',
    marginTop: 6,
  },
  helperText: {
    fontFamily: fonts.regular,
    fontSize: 11.5,
    color: '#64748B',
    marginTop: 6,
  },
  jenjangRow: {
    flexDirection: 'row',
    gap: 12,
  },
  jenjangCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 7,
  },
  jenjangCardActive: {
    backgroundColor: '#EBF1FF',
    borderColor: '#2554E8',
    borderWidth: 1.5,
  },
  jenjangCardText: {
    fontFamily: fonts.bold,
    fontSize: 13.5,
    color: '#334155',
  },
  jenjangCardTextActive: {
    color: '#2554E8',
  },
  footerSection: {
    marginTop: 'auto',
    paddingTop: 32,
  },
  saveBtnOuter: {
    width: '100%',
    backgroundColor: '#1B3FB8',
    borderRadius: 16,
    paddingBottom: 4,
    shadowColor: '#2554E8',
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 4,
  },
  saveBtnInner: {
    width: '100%',
    backgroundColor: '#2957F5',
    borderRadius: 16,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveBtnText: {
    fontFamily: fonts.bold,
    fontSize: 15,
    color: '#FFFFFF',
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
});

