import React from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import { colors, radius, spacing, typography } from '../constants/theme';
import { ProgressRepository } from '../storage/ProgressRepository';
import { CommonActions, useNavigation } from '@react-navigation/native';

export default function SettingsScreen() {
  const navigation = useNavigation();

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

  return (
    <ScrollView contentContainerStyle={s.wrap}>
      <Text style={typography.title}>Pengaturan</Text>
      <View style={s.card}>
        <Text style={typography.heading}>Aktivitas Belajar</Text>
        <PrimaryButton title="Ulang Tes Awal" variant="ghost" onPress={ulangTesAwal} />
        <PrimaryButton title="Atur Ulang Progres" variant="danger" onPress={resetProgres} />
      </View>
      <View style={s.card}>
        <Text style={typography.heading}>Tentang FlipCode</Text>
        <Text style={typography.small}>Versi 0.1.0</Text>
        <Text style={typography.small}>Kelompok 8 — IK300 Mobile Programming</Text>
        <Text style={typography.small}>Universitas Pendidikan Indonesia</Text>
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  wrap: { padding: spacing.lg, gap: spacing.md },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm,
  },
});
