import React from 'react';
import { View, Text } from 'react-native';
import { Level } from '../constants/enums';
import { LockIcon } from '../../assets/icons/AppIcons';
import s from '../styles/TopicLevelCard.styles';

function getTopicVisuals(topicId) {
  switch (topicId) {
    case 'variabel':
      return {
        symbol: 'x =',
        iconBg: '#EDF2FF',
        iconColor: '#2554E8',
        barColor: '#2554E8',
      };
    case 'tipe_data':
      return {
        symbol: '123',
        iconBg: '#FEF7E0',
        iconColor: '#D97706',
        barColor: '#F59E0B',
      };
    case 'operator':
      return {
        symbol: '+ -',
        iconBg: '#FFF0ED',
        iconColor: '#EA580C',
        barColor: '#2ED47A',
      };
    default:
      return {
        symbol: '</>',
        iconBg: '#EDF2FF',
        iconColor: '#2554E8',
        barColor: '#2554E8',
      };
  }
}

function getLevelPillStyle(level) {
  if (level === Level.SULIT) {
    return {
      label: 'Level Sulit',
      bg: '#DCFCE7',
      textColor: '#15803D',
    };
  }
  if (level === Level.SEDANG) {
    return {
      label: 'Level Sedang',
      bg: '#FEF3C7',
      textColor: '#B45309',
    };
  }
  return {
    label: 'Level Mudah',
    bg: '#EDF2FF',
    textColor: '#2554E8',
  };
}

export default function TopicLevelCard({
  id,
  nama,
  level,
  skor = 1,
  total = 3,
  unlocked = false,
}) {
  const visual = getTopicVisuals(id);
  const pill = getLevelPillStyle(level);
  const ratio = total > 0 ? Math.min(1, Math.max(0, skor / total)) : 0;

  return (
    <View style={[s.card, unlocked && s.cardUnlocked]}>
      <View style={s.topRow}>
        <View style={[s.iconBox, { backgroundColor: visual.iconBg }]}>
          <Text style={[s.iconSymbol, { color: visual.iconColor }]}>
            {visual.symbol}
          </Text>
        </View>

        <View style={s.centerCol}>
          <View style={s.titleRow}>
            <Text style={s.topicTitle}>{nama}</Text>
            <View style={[s.levelPill, { backgroundColor: pill.bg }]}>
              <Text style={[s.levelPillText, { color: pill.textColor }]}>
                {pill.label}
              </Text>
            </View>
          </View>

          <View style={s.progressRow}>
            <View style={s.progressTrack}>
              <View
                style={[
                  s.progressFill,
                  {
                    width: `${ratio * 100}%`,
                    backgroundColor: visual.barColor,
                  },
                ]}
              />
            </View>
            <Text style={s.scoreText}>
              {skor}/{total} benar
            </Text>
          </View>
        </View>

        {unlocked ? (
          <View style={s.statusPillActive}>
            <View style={s.greenDot} />
            <Text style={s.statusActiveText}>Mulai di sini</Text>
          </View>
        ) : (
          <View style={s.statusPillLocked}>
            <LockIcon size={11} color="#94A3B8" keyholeColor={null} />
            <Text style={s.statusLockedText}>Terkunci</Text>
          </View>
        )}
      </View>
    </View>
  );
}
