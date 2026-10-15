import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import LevelBadge from '../components/LevelBadge';
import ProgressBar from '../components/ProgressBar';
import { colors, radius, spacing, typography, fonts } from '../constants/theme';
import { ContentRepository } from '../storage/ContentRepository';
import { ProgressRepository } from '../storage/ProgressRepository';
import { CardStatus } from '../constants/enums';

export default function ProgressScreen() {
  const [rows, setRows] = useState([]);
  useFocusEffect(
    useCallback(() => {
      (async () => {
        const topics = ContentRepository.getAllTopics();
        const all = await ProgressRepository.getAll();
        const data = topics.map((t) => {
          const cards = ContentRepository.getFlashcardsByTopic(t.id);
          const mastered = cards.filter(
            (c) => all.cards[c.id]?.status === CardStatus.DIKUASAI
          ).length;
          return {
            ...t,
            progress: all.topics[t.id] || {},
            masteredPct: cards.length ? mastered / cards.length : 0,
            totalCards: cards.length,
            mastered,
          };
        });
        setRows(data);
      })();
    }, [])
  );

  return (
    <ScrollView contentContainerStyle={s.wrap}>
      <Text style={typography.title}>Progres Belajar</Text>
      {rows.map((t) => (
        <View key={t.id} style={s.card}>
          <View style={s.rowBetween}>
            <Text style={typography.heading}>{t.nama}</Text>
            {t.progress.level && <LevelBadge level={t.progress.level} />}
          </View>
          <Text style={typography.small}>
            Kartu dikuasai: {t.mastered}/{t.totalCards} ({Math.round(t.masteredPct * 100)}%)
          </Text>
          <ProgressBar value={t.masteredPct} max={1} />
          {t.progress.lastQuizScore && (
            <Text style={typography.small}>Kuis terakhir: {t.progress.lastQuizScore}</Text>
          )}
          <Text style={[typography.small, { fontFamily: fonts.semibold, color: colors.primary }]}>
            Status: {t.progress.state || 'Belum mulai'}
          </Text>
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
});
