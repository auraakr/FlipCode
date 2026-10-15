import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import Button from '../components/Button';
import ChoiceOption from '../components/ChoiceOption';
import { PlacementTest } from '../logic/PlacementTest';
import { ContentRepository } from '../storage/ContentRepository';

const HURUF = ['A', 'B', 'C', 'D', 'E', 'F'];

export default function PlacementTestScreen({ navigation }) {
  const questions = useMemo(() => PlacementTest.loadQuestions(), []);
  const [idx, setIdx] = useState(0);
  const [jawaban, setJawaban] = useState({});

  if (questions.length === 0) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-cream px-6">
        <Text className="text-center text-base font-normal text-ink">
          Soal tes awal belum diisi. Tambahkan soal di{' '}
          <Text className="font-bold">src/data/placementTest.json</Text>.
        </Text>
      </SafeAreaView>
    );
  }

  const q = questions[idx];
  const terpilih = jawaban[idx];
  const topik = ContentRepository.getTopicById(q.topicId);
  const terakhir = idx === questions.length - 1;
  const pct = ((idx + 1) / questions.length) * 100;

  const pilih = (i) => setJawaban((prev) => ({ ...prev, [idx]: i }));

  const kembali = () => {
    if (idx > 0) setIdx(idx - 1);
    else navigation.replace('Welcome');
  };

  const next = async () => {
    if (!terakhir) {
      setIdx(idx + 1);
      return;
    }
    const arr = questions.map((_, i) => jawaban[i] ?? -1);
    const hasil = await PlacementTest.submit(questions, arr);
    navigation.replace('PlacementResult', { hasil });
  };

  return (
    <SafeAreaView className="flex-1 bg-cream">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 pt-2">
        <Pressable onPress={kembali} hitSlop={12} accessibilityLabel="Kembali" className="h-10 w-10 justify-center">
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
            <Path d="M19 12H5M11 6l-6 6 6 6" stroke="#1F2A44" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        </Pressable>
        <Text className="text-lg font-extrabold text-ink">Tes Awal</Text>
        <Text className="w-16 text-right text-xs font-bold text-slate-400">
          {idx + 1} dari {questions.length}
        </Text>
      </View>

      {/* Progress */}
      <View className="mx-4 mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
        <View className="h-full rounded-full bg-brand" style={{ width: `${pct}%` }} />
      </View>

      <ScrollView className="flex-1" contentContainerClassName="px-4 pb-4 pt-6">
        {topik && (
          <View className="self-start rounded-full bg-[#DDE5FF] px-3 py-1">
            <Text className="text-[11px] font-bold uppercase tracking-wide text-brand-dark">
              {topik.nama}
            </Text>
          </View>
        )}
        <Text className="mt-3 text-2xl font-extrabold leading-8 text-ink">
          {q.pertanyaan || '(soal belum diisi)'}
        </Text>

        <View className="mt-6" accessibilityRole="radiogroup">
          {q.pilihan.map((p, i) => (
            <ChoiceOption
              key={i}
              letter={HURUF[i]}
              label={p || `(pilihan ${i + 1} kosong)`}
              selected={terpilih === i}
              onPress={() => pilih(i)}
              className="mb-3"
            />
          ))}
        </View>
      </ScrollView>

      <View className="px-4 pb-4">
        <Button title={terakhir ? 'Selesai' : 'Berikutnya'} onPress={next} disabled={terpilih === undefined} />
      </View>
    </SafeAreaView>
  );
}
