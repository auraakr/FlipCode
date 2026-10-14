// Layar Kuis: 5 soal, umpan balik langsung.
// Setelah menjawab, tombol lanjut membuka panel feedback.
// Jika salah dan soal punya relatedCardIds, tampil tombol "Buka kartu terkait".

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import ProgressBar from '../components/ProgressBar';
import LevelBadge from '../components/LevelBadge';
import { colors, radius, spacing, typography } from '../constants/theme';
import { QuizManager } from '../logic/QuizManager';
import { ContentRepository } from '../storage/ContentRepository';

export default function QuizScreen({ route, navigation }) {
  const { topicId } = route.params;
  const [sesi, setSesi] = useState(null);
  const [idx, setIdx] = useState(0);
  const [pilih, setPilih] = useState(null);
  const [jawaban, setJawaban] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    (async () => setSesi(await QuizManager.buildSession(topicId)))();
  }, [topicId]);

  if (!sesi) return null;
  if (sesi.questions.length === 0) {
    return (
      <View style={s.center}>
        <Text style={typography.body}>
          Belum ada soal kuis untuk level ini. Isi di{' '}
          <Text style={{ fontWeight: '700' }}>src/data/questions.json</Text>.
        </Text>
      </View>
    );
  }

  const q = sesi.questions[idx];
  const benar = pilih === q.jawabanBenar;

  const jawab = (i) => {
    if (showFeedback) return;
    setPilih(i);
    setShowFeedback(true);
  };

  const lanjut = async () => {
    const arr = [...jawaban];
    arr[idx] = pilih;
    setJawaban(arr);
    setPilih(null);
    setShowFeedback(false);
    if (idx < sesi.questions.length - 1) {
      setIdx(idx + 1);
    } else {
      const hasil = await QuizManager.submit({
        topicId, level: sesi.level, questions: sesi.questions, jawaban: arr,
      });
      navigation.replace('QuizResult', { topicId, hasil, level: sesi.level });
    }
  };

  const bukaKartuTerkait = () => {
    // Buka layar flashcard untuk topik ini. Pengembang dapat mengganti
    // dengan navigasi langsung ke kartu tertentu kalau diinginkan.
    const relId = q.relatedCardIds && q.relatedCardIds[0];
    const card = relId ? ContentRepository.getFlashcardById(relId) : null;
    navigation.navigate('Flashcard', { topicId: card?.topicId || topicId });
  };

  return (
    <ScrollView contentContainerStyle={s.wrap}>
      <View style={s.rowBetween}>
        <Text style={typography.small}>Soal {idx + 1} dari {sesi.questions.length}</Text>
        <LevelBadge level={sesi.level} />
      </View>
      <ProgressBar value={idx + 1} max={sesi.questions.length} />
      <Text style={[typography.heading, { marginTop: spacing.lg }]}>
        {q.pertanyaan || '(soal belum diisi)'}
      </Text>
      <View style={{ gap: spacing.sm, marginTop: spacing.md }}>
        {q.pilihan.map((p, i) => {
          const isPicked = pilih === i;
          const isCorrect = showFeedback && i === q.jawabanBenar;
          const isWrong = showFeedback && isPicked && !benar;
          return (
            <Pressable
              key={i}
              onPress={() => jawab(i)}
              style={[
                s.opt,
                isPicked && !showFeedback && { borderColor: colors.primary, backgroundColor: colors.primaryLight },
                isCorrect && { borderColor: colors.success, backgroundColor: '#E6F4EB' },
                isWrong && { borderColor: colors.danger, backgroundColor: '#FBE8E8' },
              ]}
            >
              <Text style={typography.body}>{p || `(pilihan ${i + 1} kosong)`}</Text>
            </Pressable>
          );
        })}
      </View>

      {showFeedback && (
        <View style={[s.feedback, { borderColor: benar ? colors.success : colors.danger }]}>
          <Text style={{ fontWeight: '700', color: benar ? colors.success : colors.danger }}>
            {benar ? 'Benar!' : 'Masih kurang tepat.'}
          </Text>
          {!!q.penjelasan && <Text style={[typography.body, { marginTop: spacing.sm }]}>{q.penjelasan}</Text>}
          {!benar && q.relatedCardIds?.length > 0 && (
            <PrimaryButton
              title="Buka kartu terkait"
              variant="ghost"
              onPress={bukaKartuTerkait}
              style={{ marginTop: spacing.sm }}
            />
          )}
        </View>
      )}

      {showFeedback && (
        <PrimaryButton
          title={idx < sesi.questions.length - 1 ? 'Soal berikutnya' : 'Lihat hasil'}
          onPress={lanjut}
          style={{ marginTop: spacing.lg }}
        />
      )}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  wrap: { padding: spacing.lg },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.lg },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  opt: {
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  feedback: {
    marginTop: spacing.lg,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    backgroundColor: colors.surface,
  },
});
