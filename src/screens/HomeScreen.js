// Beranda = Learning Path. Menampilkan daftar topik; tiap topik memberi
// akses ke Flashcard dan Kuis beserta level saat ini.

import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import LevelBadge from '../components/LevelBadge';
import { colors, radius, spacing, typography } from '../constants/theme';
import { ContentRepository } from '../storage/ContentRepository';
import { ProgressRepository } from '../storage/ProgressRepository';
import { TopicState } from '../constants/enums';

export default function HomeScreen({ navigation }) {
  const [rows, setRows] = useState([]);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const topics = ContentRepository.getAllTopics();
        const data = await Promise.all(
          topics.map(async (t) => ({
            ...t,
            progress: await ProgressRepository.getTopicProgress(t.id),
          }))
        );
        setRows(data);
      })();
    }, [])
  );

  return (
    <ScrollView contentContainerStyle={s.wrap}>
      <Text style={typography.title}>Jalur Belajar</Text>
      <Text style={[typography.small, { marginBottom: spacing.lg }]}>
        Pilih topik, pelajari flashcard, lalu kerjakan kuisnya.
      </Text>
      {rows.map((t) => (
        <View key={t.id} style={s.card}>
          <View style={s.rowBetween}>
            <Text style={typography.heading}>{t.nama}</Text>
            <LevelBadge level={t.progress.level} />
          </View>
          <Text style={typography.small}>{t.deskripsi}</Text>
          <View style={s.rowBetween}>
            <Text style={[typography.small, {
              color: t.progress.state === TopicState.DIKUASAI ? colors.success : colors.textSecondary,
              fontWeight: '600',
            }]}>
              {t.progress.state}
            </Text>
            {t.progress.lastQuizScore && (
              <Text style={typography.small}>Kuis terakhir: {t.progress.lastQuizScore}</Text>
            )}
          </View>
          <View style={s.actions}>
            <Pressable
              style={[s.btn, { backgroundColor: colors.primary }]}
              onPress={() => navigation.navigate('Flashcard', { topicId: t.id })}
            >
              <Text style={s.btnText}>Flashcard</Text>
            </Pressable>
            <Pressable
              style={[s.btn, { backgroundColor: colors.accent }]}
              onPress={() => navigation.navigate('Quiz', { topicId: t.id })}
            >
              <Text style={[s.btnText, { color: '#1a1a1a' }]}>Kuis</Text>
            </Pressable>
          </View>
        </View>
      ))}
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
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  actions: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.sm },
  btn: { flex: 1, paddingVertical: 12, borderRadius: radius.md, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '700' },
});
