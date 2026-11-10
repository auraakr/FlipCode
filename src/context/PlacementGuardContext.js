// Penjaga tes awal: tes hanya boleh dikerjakan sekali per akun.
// guardPlacement() mengecek status ke server (bukan data lokal yang bisa basi).
// Jika tes sudah dikerjakan, tampil modal info dan fungsi mengembalikan true (diblokir).

import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { fonts } from '../constants/theme';
import { useAuth } from './AuthContext';
import { ModalMascotRobot } from '../../assets/illustrations/MascotIllustrations';

const PlacementGuardContext = createContext(null);

export function PlacementGuardProvider({ children }) {
  const { user, refreshUser } = useAuth();
  const [visible, setVisible] = useState(false);

  const showLocked = useCallback(() => setVisible(true), []);

  const guardPlacement = useCallback(async () => {
    let done = !!user?.placementDone;
    try {
      done = !!(await refreshUser())?.placementDone;
    } catch {
      /* offline: pakai data lokal; server tetap menolak lewat 409 */
    }
    if (done) setVisible(true);
    return done;
  }, [user, refreshUser]);

  const value = useMemo(() => ({ guardPlacement, showLocked }), [guardPlacement, showLocked]);

  return (
    <PlacementGuardContext.Provider value={value}>
      {children}
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <Pressable style={s.backdrop} onPress={() => setVisible(false)}>
          <Pressable style={s.card} onPress={() => {}}>
            <View style={s.mascotWrap}>
              <ModalMascotRobot />
            </View>
            <Text style={s.title}>Tes awal sudah dikerjakan</Text>
            <Text style={s.desc}>
              Tes awal hanya bisa dikerjakan sekali. Jika ingin mengulang, buka Pengaturan lalu pilih
              Ulangi Tes Awal.
            </Text>
            <TouchableOpacity activeOpacity={0.85} onPress={() => setVisible(false)} style={s.btn}>
              <Text style={s.btnText}>Mengerti</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </PlacementGuardContext.Provider>
  );
}

export function usePlacementGuard() {
  const ctx = useContext(PlacementGuardContext);
  if (!ctx) throw new Error('usePlacementGuard harus dipakai di dalam PlacementGuardProvider');
  return ctx;
}

const s = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.56)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 26,
  },
  card: {
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
  mascotWrap: { position: 'absolute', top: -48, alignSelf: 'center' },
  title: { fontFamily: fonts.extrabold, fontSize: 20, color: '#1F2A44', textAlign: 'center' },
  desc: {
    marginTop: 8,
    fontFamily: fonts.medium,
    fontSize: 12.5,
    lineHeight: 19,
    color: '#64748B',
    textAlign: 'center',
    paddingHorizontal: 4,
  },
  btn: {
    width: '100%',
    marginTop: 22,
    backgroundColor: '#2554E8',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: { fontFamily: fonts.extrabold, fontSize: 14, color: '#FFFFFF' },
});
