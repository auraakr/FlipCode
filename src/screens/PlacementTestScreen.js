import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fonts } from '../constants/theme';
import { ContentRepository } from '../storage/ContentRepository';
import { PlacementEngine } from '../logic/PlacementEngine';
import { CloseIcon, CheckIcon, ArrowRightIcon } from '../../assets/icons/AppIcons';

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

const s = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FDFCF7',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    paddingTop: 10,
    paddingBottom: 14,
  },
  closeButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8EDF5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topicBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDF2FF',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
  },
  topicDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#2F65F5',
    marginRight: 6,
  },
  topicBadgeText: {
    fontFamily: fonts.bold,
    fontSize: 11,
    color: '#2F65F5',
    letterSpacing: 0.6,
  },
  counterText: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: '#1F2A44',
    minWidth: 32,
    textAlign: 'right',
  },
  segmentRow: {
    flexDirection: 'row',
    paddingHorizontal: 22,
    gap: 6,
    marginBottom: 22,
  },
  segmentBar: {
    flex: 1,
    height: 6,
    borderRadius: 999,
    backgroundColor: '#E6ECF5',
  },
  segmentCompleted: {
    backgroundColor: '#2ED47A',
  },
  segmentCurrent: {
    backgroundColor: '#2F65F5',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 22,
    paddingBottom: 20,
  },
  subPrompt: {
    fontFamily: fonts.medium,
    fontSize: 13,
    color: '#7C8BA1',
    marginBottom: 4,
  },
  questionText: {
    fontFamily: fonts.extrabold,
    fontSize: 21,
    lineHeight: 29,
    color: '#1F2A44',
    marginBottom: 18,
    letterSpacing: -0.3,
  },
  codeCard: {
    backgroundColor: '#161F33',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    marginBottom: 20,
    shadowColor: '#0F172A',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  codeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  trafficDots: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
  },
  codeLangLabel: {
    fontFamily: fonts.mono,
    fontSize: 11,
    color: '#64748B',
  },
  codeBody: {
    gap: 4,
  },
  codeLineRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  codeLineNum: {
    fontFamily: fonts.mono,
    fontSize: 13,
    color: '#475569',
    width: 24,
  },
  codeText: {
    fontFamily: fonts.mono,
    fontSize: 14,
    lineHeight: 22,
  },
  codeVar: {
    color: '#7DD3FC',
  },
  codeOp: {
    color: '#F472B6',
  },
  codeNum: {
    color: '#FDE047',
  },
  codeDefault: {
    color: '#E2E8F0',
  },
  optionsList: {
    gap: 12,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 13,
    paddingHorizontal: 14,
    borderWidth: 1.5,
    borderColor: '#E8EDF5',
  },
  optionCardSelected: {
    backgroundColor: '#F3F7FF',
    borderColor: '#2F65F5',
    borderWidth: 2,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  letterBadge: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  letterBadgeSelected: {
    backgroundColor: '#2F65F5',
  },
  letterText: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: '#475569',
  },
  letterTextSelected: {
    color: '#FFFFFF',
  },
  optionText: {
    fontFamily: fonts.bold,
    fontSize: 15,
    color: '#1F2A44',
    flexShrink: 1,
  },
  optionTextSelected: {
    color: '#2F65F5',
  },
  radioUnselected: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.8,
    borderColor: '#CBD5E1',
    backgroundColor: '#FFFFFF',
  },
  radioSelected: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#2F65F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    paddingHorizontal: 22,
    paddingTop: 10,
    paddingBottom: 18,
    backgroundColor: '#FDFCF7',
  },
  ctaDisabled: {
    width: '100%',
    backgroundColor: '#E6ECF5',
    borderRadius: 999,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaDisabledText: {
    fontFamily: fonts.bold,
    fontSize: 15,
    color: '#94A3B8',
  },
  ctaActiveOuter: {
    width: '100%',
    backgroundColor: '#1B3FB8',
    borderRadius: 999,
    paddingBottom: 4,
    shadowColor: '#2554E8',
    shadowOpacity: 0.28,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5,
  },
  ctaActiveInner: {
    width: '100%',
    backgroundColor: '#2957F5',
    borderRadius: 999,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  ctaActiveText: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: '#FFFFFF',
  },
});
