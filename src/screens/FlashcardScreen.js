import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Flashcard from '../components/Flashcard';
import PrimaryButton from '../components/PrimaryButton';
import ProgressBar from '../components/ProgressBar';
import { colors, spacing, typography, fonts } from '../constants/theme';
import { FlashcardManager } from '../logic/FlashcardManager';

export default function FlashcardScreen({ route, navigation }) {
  const { topicId } = route.params;
  const [cards, setCards] = useState(null);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    (async () => setCards(await FlashcardManager.buildSession(topicId)))();
  }, [topicId]);

  if (!cards) return null;
  if (cards.length === 0) {
    return (
      <View style={s.center}>
        <Text style={typography.body}>
          Belum ada kartu untuk topik ini. Isi di{' '}
          <Text style={{ fontFamily: fonts.bold }}>src/data/flashcards.json</Text>.
        </Text>
      </View>
    );
  }

  const current = cards[idx];
  const paham = async () => {
    await FlashcardManager.markPaham(current.id);
    nextOrFinish();
  };
  const ulangi = async () => {
    await FlashcardManager.markUlangi(current.id);
    // pindahkan ke akhir tumpukan
    const sisanya = cards.filter((_, i) => i !== idx);
    const baru = [...sisanya, current];
    setCards(baru);
    setIdx((i) => (i >= baru.length ? 0 : i));
  };
  const nextOrFinish = () => {
    if (idx < cards.length - 1) setIdx(idx + 1);
    else navigation.goBack();
  };

  return (
    <View style={s.wrap}>
      <Text style={typography.small}>
        Kartu {idx + 1} dari {cards.length}
      </Text>
      <ProgressBar value={idx + 1} max={cards.length} />
      <View style={{ marginTop: spacing.lg }}>
        <Flashcard card={current} />
      </View>
      <View style={s.actions}>
        <PrimaryButton title="Ulangi lagi" variant="ghost" onPress={ulangi} style={{ flex: 1 }} />
        <PrimaryButton title="Sudah paham" onPress={paham} style={{ flex: 1 }} />
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  wrap: { flex: 1, padding: spacing.lg, backgroundColor: colors.background },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.lg },
  actions: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.lg },
});
