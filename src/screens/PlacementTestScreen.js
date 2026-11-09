import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ContentRepository } from '../storage/ContentRepository';
import { PlacementEngine } from '../logic/PlacementEngine';
import { CloseIcon, CheckIcon, ArrowRightIcon } from '../../assets/icons/AppIcons';
import s from '../styles/PlacementTestScreen.styles';

const HURUF = ['A', 'B', 'C', 'D'];
const TOTAL_SEGMENTS = 9;

function getTopicLabel(topicId) {
  const topik = ContentRepository.getTopicById(topicId);
  if (topik?.nama) return topik.nama.toUpperCase();
  if (topicId === 'variabel') return 'VARIABEL';
  if (topicId === 'tipe_data') return 'TIPE DATA';
  if (topicId === 'operator') return 'OPERATOR';
  return 'PEMROGRAMAN';
}

function getPromptHeading(kode) {
  if (kode) return 'Perhatikan kode berikut:';
  return 'Jawablah pertanyaan berikut:';
}

export default function PlacementTestScreen({ navigation }) {
  const questions = ContentRepository.getPlacementQuestions();
  const [idx, setIdx] = useState(0);
  const [pilih, setPilih] = useState(null);
  const [jawaban, setJawaban] = useState([]);

  const q = questions[idx];
  const total = questions.length;
  const sudahPilih = pilih !== null;

  const lanjut = async () => {
    if (!sudahPilih) return;

    const baru = [...jawaban, { questionId: q.id, pilihanIndex: pilih }];
    if (idx < total - 1) {
      setJawaban(baru);
      setPilih(null);
      setIdx(idx + 1);
    } else {
      const hasil = await PlacementEngine.evaluate(baru);
      navigation.replace('PlacementResult', { hasil });
    }
  };

  const handleClose = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('Welcome');
    }
  };

  const renderSyntaxCode = (codeStr) => {
    const lines = codeStr.split('\n');
    return lines.map((line, lineIdx) => {
      const eqIdx = line.indexOf('=');
      if (eqIdx !== -1 && !line.trim().startsWith('//')) {
        const left = line.slice(0, eqIdx);
        const right = line.slice(eqIdx + 1);
        return (
          <View key={lineIdx} style={s.codeLineRow}>
            <Text style={s.codeLineNum}>{lineIdx + 1}</Text>
            <Text style={s.codeText}>
              <Text style={s.codeVar}>{left}</Text>
              <Text style={s.codeOp}>=</Text>
              <Text style={s.codeNum}>{right}</Text>
            </Text>
          </View>
        );
      }

      return (
        <View key={lineIdx} style={s.codeLineRow}>
          <Text style={s.codeLineNum}>{lineIdx + 1}</Text>
          <Text style={s.codeText}>
            <Text style={s.codeDefault}>{line}</Text>
          </Text>
        </View>
      );
    });
  };

  return (
    <SafeAreaView style={s.safeArea} edges={['top', 'bottom']}>
      {/* Top Bar: Close Button + Topic Pill + Question Counter */}
      <View style={s.topBar}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleClose}
          style={s.closeButton}
          accessibilityLabel="Tutup tes"
        >
          <CloseIcon size={16} color="#1F2A44" strokeWidth={2.2} />
        </TouchableOpacity>

        <View style={s.topicBadge}>
          <View style={s.topicDot} />
          <Text style={s.topicBadgeText}>{getTopicLabel(q.topicId)}</Text>
        </View>

        <Text style={s.counterText}>
          {idx + 1}/{total}
        </Text>
      </View>

      {/* 9-Segment Progress Bar */}
      <View style={s.segmentRow}>
        {Array.from({ length: total || TOTAL_SEGMENTS }).map((_, i) => {
          const isCompleted = i < idx;
          const isCurrent = i === idx;
          return (
            <View
              key={i}
              style={[
                s.segmentBar,
                isCompleted && s.segmentCompleted,
                isCurrent && s.segmentCurrent,
              ]}
            />
          );
        })}
      </View>

      <ScrollView
        style={s.scroll}
        contentContainerStyle={s.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={s.subPrompt}>{getPromptHeading(q.kode)}</Text>
        <Text style={s.questionText}>{q.pertanyaan}</Text>

        {q.kode ? (
          <View style={s.codeCard}>
            <View style={s.codeHeader}>
              <View style={s.trafficDots}>
                <View style={[s.dot, { backgroundColor: '#FF5F56' }]} />
                <View style={[s.dot, { backgroundColor: '#FFBD2E' }]} />
                <View style={[s.dot, { backgroundColor: '#27C93F' }]} />
              </View>
              <Text style={s.codeLangLabel}>pseudocode</Text>
            </View>
            <View style={s.codeBody}>{renderSyntaxCode(q.kode)}</View>
          </View>
        ) : null}

        <View style={s.optionsList}>
          {q.pilihan.map((opsi, i) => {
            const aktif = pilih === i;
            return (
              <TouchableOpacity
                key={i}
                activeOpacity={0.8}
                onPress={() => setPilih(i)}
                style={[s.optionCard, aktif && s.optionCardSelected]}
              >
                <View style={s.optionLeft}>
                  <View style={[s.letterBadge, aktif && s.letterBadgeSelected]}>
                    <Text style={[s.letterText, aktif && s.letterTextSelected]}>
                      {HURUF[i]}
                    </Text>
                  </View>
                  <Text style={[s.optionText, aktif && s.optionTextSelected]}>
                    {opsi}
                  </Text>
                </View>

                {aktif ? (
                  <View style={s.radioSelected}>
                    <CheckIcon size={12} color="#FFFFFF" strokeWidth={2.8} />
                  </View>
                ) : (
                  <View style={s.radioUnselected} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Bottom Footer Action */}
      <View style={s.footer}>
        {sudahPilih ? (
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={lanjut}
            style={s.ctaActiveOuter}
          >
            <View style={s.ctaActiveInner}>
              <Text style={s.ctaActiveText}>
                {idx === total - 1 ? 'Lihat Hasil' : 'Selanjutnya'}
              </Text>
              <ArrowRightIcon size={18} color="#FFFFFF" strokeWidth={2.5} />
            </View>
          </TouchableOpacity>
        ) : (
          <View style={s.ctaDisabled}>
            <Text style={s.ctaDisabledText}>Pilih jawaban dulu</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
