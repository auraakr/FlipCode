// Alamat server API.
// Prioritas: EXPO_PUBLIC_API_URL (file .env di root proyek) -> tebak otomatis saat dev.
// Saat dev lewat Expo Go, IP laptop diambil dari alamat Metro bundler, jadi HP
// di Wi-Fi yang sama bisa langsung terhubung ke server di laptop (port 3000).

import { Platform } from 'react-native';
import Constants from 'expo-constants';

const API_PORT = 3000;

function guessDevUrl() {
  const hostUri = Constants.expoConfig?.hostUri || Constants.expoGoConfig?.debuggerHost;
  const host = hostUri ? hostUri.split(':')[0] : null;
  if (host) return `http://${host}:${API_PORT}`;
  // Emulator Android memakai 10.0.2.2 untuk menjangkau localhost laptop.
  if (Platform.OS === 'android') return `http://10.0.2.2:${API_PORT}`;
  return `http://localhost:${API_PORT}`;
}

export const API_URL = (process.env.EXPO_PUBLIC_API_URL || guessDevUrl()).replace(/\/+$/, '');
