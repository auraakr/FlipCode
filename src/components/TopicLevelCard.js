import { fonts } from '../constants/theme';
import React from 'react';
import { View, Text , StyleSheet } from 'react-native';
import { Level } from '../constants/enums';
import { LockIcon } from '../../assets/icons/AppIcons';

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

const s = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#E6ECF5',
    marginBottom: 12,
  },
  cardUnlocked: {
    borderColor: '#93B4FF',
    borderWidth: 1.5,
    shadowColor: '#2554E8',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconSymbol: {
    fontFamily: fonts.mono,
    fontSize: 13.5,
    fontWeight: '700',
  },
  centerCol: {
    flex: 1,
    marginRight: 10,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 8,
  },
  topicTitle: {
    fontFamily: fonts.bold,
    fontSize: 14.5,
    color: '#1F2A44',
  },
  levelPill: {
    paddingHorizontal: 8,
    paddingVertical: 2.5,
    borderRadius: 999,
  },
  levelPillText: {
    fontFamily: fonts.bold,
    fontSize: 10.5,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressTrack: {
    width: 68,
    height: 6,
    borderRadius: 999,
    backgroundColor: '#EDF2F7',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
  },
  scoreText: {
    fontFamily: fonts.medium,
    fontSize: 11.5,
    color: '#64748B',
  },
  statusPillActive: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8FBF0',
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 999,
    gap: 5,
  },
  greenDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#16A34A',
  },
  statusActiveText: {
    fontFamily: fonts.bold,
    fontSize: 10.5,
    color: '#15803D',
  },
  statusPillLocked: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 999,
    gap: 4,
  },
  statusLockedText: {
    fontFamily: fonts.semibold,
    fontSize: 10.5,
    color: '#94A3B8',
  },
});
