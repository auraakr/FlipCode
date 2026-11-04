// Penyimpanan token login. Di HP memakai SecureStore (terenkripsi);
// di web SecureStore tidak ada, jadi memakai AsyncStorage.

import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from '../constants/storageKeys';

const KEY = StorageKeys.AUTH_TOKEN;
const useSecure = Platform.OS !== 'web';

export const AuthStorage = {
  async getToken() {
    try {
      return useSecure ? await SecureStore.getItemAsync(KEY) : await AsyncStorage.getItem(KEY);
    } catch (e) {
      console.warn('AuthStorage.getToken gagal:', e);
      return null;
    }
  },
  async setToken(token) {
    if (useSecure) await SecureStore.setItemAsync(KEY, token);
    else await AsyncStorage.setItem(KEY, token);
  },
  async clearToken() {
    try {
      if (useSecure) await SecureStore.deleteItemAsync(KEY);
      else await AsyncStorage.removeItem(KEY);
    } catch (e) {
      console.warn('AuthStorage.clearToken gagal:', e);
    }
  },
};
