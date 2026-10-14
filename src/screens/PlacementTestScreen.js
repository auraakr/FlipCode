import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import ProgressBar from '../components/ProgressBar';
import { colors, radius, spacing, typography } from '../constants/theme';
import { PlacementTest } from '../logic/PlacementTest';

export default function PlacementTestScreen({ navigation }) {
  const questions = useMemo(() => PlacementTest.loadQuestions(), []);
  const [idx, setIdx] = useState(0);
  const [jawaban, setJawaban] = useState([]);

  if (questions.length === 0) {
    return (
      <View style={s.center}>
        <Text style={typography.body}>
          Soal tes awal belum diisi. Tambahkan soal di{' '}
          <Text style={{ fontWeight: '700' }}>src/data/placementTest.json</Text>.
        </Text>
      </View>
    );
  }

  const q = questions[idx];
  const pilih = (i) => setJawaban((prev) => ({ ...prev, [idx]: i }));
  const terpilih = jawaban[idx];

  const next = async () => {
    if (idx < questions.length - 1) {
      setIdx(idx + 1);
    } else {
      const arr = questions.map((_, i) => jawaban[i] ?? -1);
      const hasil = await PlacementTest.submit(questions, arr);
      navigation.replace('PlacementResult', { hasil });
    }
  };

  return (
    <ScrollView contentContainerStyle={s.wrap}>
      <Text style={typography.small}>
        Soal {idx + 1} dari {questions.length}
      </Text>
      <ProgressBar value={idx + 1} max={questions.length} />
      <Text style={[typography.heading, { marginTop: spacing.lg }]}>
        {q.pertanyaan || '(soal belum diisi)'}
      </Text>
      <View style={{ gap: spacing.sm, marginTop: spacing.md }}>
        {q.pilihan.map((p, i) => (
          <Pressable
            key={i}
            onPress={() => pilih(i)}
            style={[
              s.opt,
              terpilih === i && { borderColor: colors.primary, backgroundColor: colors.primaryLight },
            ]}
          >
            <Text style={typography.body}>{p || `(pilihan ${i + 1} kosong)`}</Text>
          </Pressable>
        ))}
      </View>
      <PrimaryButton
        title={idx < questions.length - 1 ? 'Lanjut' : 'Selesai'}
        onPress={next}
        disabled={terpilih === undefined}
        style={{ marginTop: spacing.lg }}
      />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  wrap: { padding: spacing.lg },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.lg },
  opt: {
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
});
