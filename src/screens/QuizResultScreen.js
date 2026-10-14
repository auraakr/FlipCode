import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import LevelBadge from '../components/LevelBadge';
import { colors, radius, spacing, typography } from '../constants/theme';

export default function QuizResultScreen({ route, navigation }) {
  const { hasil, level } = route.params;
  const { benar, total, adapt } = hasil;
  const deltaText =
    adapt.delta > 0 ? 'Level kamu NAIK' :
    adapt.delta < 0 ? 'Level kamu TURUN' :
    'Level kamu TETAP';

  return (
    <ScrollView contentContainerStyle={s.wrap}>
      <Text style={typography.title}>Hasil Kuis</Text>
      <View style={s.card}>
        <Text style={typography.small}>Skor</Text>
        <Text style={s.skor}>{benar} / {total}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: spacing.sm }}>
          <Text style={typography.small}>Dari</Text>
          <LevelBadge level={level} />
          <Text style={typography.small}>ke</Text>
          <LevelBadge level={adapt.nextLevel} />
        </View>
        <Text style={[typography.body, { marginTop: spacing.md, fontWeight: '700' }]}>{deltaText}</Text>
        {adapt.saranUlang && (
          <Text style={[typography.small, { marginTop: spacing.xs }]}>
            Saran: pelajari ulang flashcard sebelum kuis berikutnya.
          </Text>
        )}
      </View>
      <PrimaryButton title="Kembali ke Beranda" onPress={() => navigation.replace('MainTabs')} />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  wrap: { padding: spacing.lg, gap: spacing.lg },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  skor: { fontSize: 48, fontWeight: '800', color: colors.primary },
});
