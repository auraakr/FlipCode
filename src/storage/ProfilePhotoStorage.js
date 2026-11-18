// Foto profil disimpan HANYA di perangkat ini (tidak dikirim ke server).
// File disalin ke folder dokumen aplikasi (aman dari pembersihan cache sistem),
// path-nya dicatat di AsyncStorage per user supaya akun lain di HP yang sama tidak berbagi foto.
// Di web, foto disimpan sebagai data URI karena sistem file tidak tersedia.

import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { File, Paths } from 'expo-file-system';
import { StorageKeys } from '../constants/storageKeys';

const isWeb = Platform.OS === 'web';
const keyFor = (userId) => `${StorageKeys.PROFILE_PHOTO_PREFIX}${userId}`;

function safeDelete(uri) {
  if (isWeb || !uri || uri.startsWith('data:')) return;
  try {
    const f = new File(uri);
    if (f.exists) f.delete();
  } catch (e) {
    console.warn('Hapus foto lama gagal:', e);
  }
}

export const ProfilePhotoStorage = {
  // Buka kamera/galeri. Mengembalikan URI sementara, atau null jika dibatalkan.
  // Melempar Error (pesan siap tampil) jika izin ditolak.
  async pick(source) {
    const options = {
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
      base64: isWeb,
    };
    let result;
    if (source === 'camera') {
      const perm = await ImagePicker.requestCameraPermissionsAsync();
      if (!perm.granted) throw new Error('Izin kamera ditolak. Aktifkan lewat pengaturan perangkat.');
      result = await ImagePicker.launchCameraAsync(options);
    } else {
      result = await ImagePicker.launchImageLibraryAsync(options);
    }
    if (result.canceled || !result.assets?.length) return null;
    const asset = result.assets[0];
    return isWeb && asset.base64 ? `data:image/jpeg;base64,${asset.base64}` : asset.uri;
  },

  // URI foto tersimpan milik user ini, atau null.
  async load(userId) {
    try {
      const uri = await AsyncStorage.getItem(keyFor(userId));
      if (!uri) return null;
      if (!isWeb && !uri.startsWith('data:') && !new File(uri).exists) return null;
      return uri;
    } catch (e) {
      console.warn('ProfilePhotoStorage.load gagal:', e);
      return null;
    }
  },

  // Simpan hasil pick() secara permanen; mengembalikan URI baru.
  async save(userId, pickedUri) {
    const old = await AsyncStorage.getItem(keyFor(userId));
    let finalUri = pickedUri;
    if (!isWeb && !pickedUri.startsWith('data:')) {
      // Nama unik supaya komponen Image tidak memakai cache foto lama.
      const dest = new File(Paths.document, `profile-${userId}-${Date.now()}.jpg`);
      new File(pickedUri).copy(dest);
      finalUri = dest.uri;
    }
    await AsyncStorage.setItem(keyFor(userId), finalUri);
    if (old && old !== finalUri) safeDelete(old);
    return finalUri;
  },

  async remove(userId) {
    const old = await AsyncStorage.getItem(keyFor(userId));
    await AsyncStorage.removeItem(keyFor(userId));
    safeDelete(old);
  },
};
