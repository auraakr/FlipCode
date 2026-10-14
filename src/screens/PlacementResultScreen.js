import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import LevelBadge from '../components/LevelBadge';
import { colors, spacing, typography } from '../constants/theme';
import { ContentRepository } from '../storage/ContentRepository';

export default function PlacementResultScreen({ route, navigation }) {
  const { hasil } = route.params || { hasil: { perTopicLevel: {} } };
  const topics = ContentRepository.getAllTopics();
  return (
    <ScrollView contentContainerStyle={s.wrap}>
      <Text style={typography.title}>Hasil Tes Awal</Text>
      <Text style={[typography.small, { marginBottom: spacing.lg }]}>
        Level awal menyesuaikan jawaban kamu di tiap topik.
      </Text>
      {topics.map((t) => {
        const level = hasil.perTopicLevel[t.id];
        return (
          <View key={t.id} style={s.row}>
            <Text style={typography.heading}>{t.nama}</Text>
            {level ? <LevelBadge level={level} /> : <Text style={typography.small}>—</Text>}
          </View>
        );
      })}
      <PrimaryButton
        title="Lanjut ke Beranda"
        onPress={() => navigation.replace('MainTabs')}
        style={{ marginTop: spacing.lg }}
      />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  wrap: { padding: spacing.lg },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
});
