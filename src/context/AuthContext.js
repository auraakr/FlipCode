// Status login seluruh aplikasi.
// status: 'loading' (cek token tersimpan) | 'signedOut' | 'signedIn'

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { api, setAuthToken, setUnauthorizedHandler } from '../api/client';
import { AuthStorage } from '../storage/AuthStorage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [status, setStatus] = useState('loading');
  const [user, setUser] = useState(null);

  const clearSession = useCallback(async () => {
    setAuthToken(null);
    await AuthStorage.clearToken();
    setUser(null);
    setStatus('signedOut');
  }, []);

  const startSession = useCallback(async ({ token, user: u }) => {
    await AuthStorage.setToken(token);
    setAuthToken(token);
    setUser(u);
    setStatus('signedIn');
  }, []);

  // Saat aplikasi dibuka: pulihkan sesi dari token tersimpan.
  useEffect(() => {
    setUnauthorizedHandler(clearSession);
    (async () => {
      const token = await AuthStorage.getToken();
      if (!token) {
        setStatus('signedOut');
        return;
      }
      setAuthToken(token);
      try {
        const { user: u } = await api.get('/auth/me');
        setUser(u);
        setStatus('signedIn');
      } catch (e) {
        // 401 sudah membersihkan sesi lewat handler; gagal jaringan -> minta login ulang.
        setAuthToken(null);
        setStatus('signedOut');
      }
    })();
  }, [clearSession]);

  const value = useMemo(
    () => ({
      status,
      user,
      // login/register mengembalikan user (berisi placementDone) untuk menentukan layar tujuan.
      async login(email, password) {
        const res = await api.post('/auth/login', { email: email.trim(), password });
        await startSession(res);
        return res.user;
      },
      async register(nama, email, password) {
        const res = await api.post('/auth/register', {
          nama: nama.trim(),
          email: email.trim(),
          password,
        });
        await startSession(res);
        return res.user;
      },
      // Muat ulang data user (mis. placementDone setelah tes awal selesai / progres direset).
      async refreshUser() {
        const { user: u } = await api.get('/auth/me');
        setUser(u);
        return u;
      },
      logout: clearSession,
    }),
    [status, user, startSession, clearSession]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth harus dipakai di dalam AuthProvider');
  return ctx;
}
