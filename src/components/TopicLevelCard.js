import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';
import { Level } from '../constants/enums';
import { fonts } from '../constants/theme';

const TOPIC_THEME = {
  variabel: {
    iconBg: '#EDF2FF',
    strokeColor: '#365CFF',
  },
  tipe_data: {
    iconBg: '#FFF8E5',
    strokeColor: '#E5A000',
  },
  operator: {
    iconBg: '#FFF0ED',
    strokeColor: '#F26B50',
  },
};

function TopicIcon({ topicId }) {
  const theme = TOPIC_THEME[topicId] || TOPIC_THEME.variabel;
  const strokeProps = {
    stroke: theme.strokeColor,
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    fill: 'none',
  };

  return (
    <Svg width={22} height={22} viewBox="0 0 24 24">
      {topicId === 'tipe_data' ? (
        <>
          <Path
            d="M8 4C6 4 5 5 5 7v2c0 1.5-1 3-2 3 1 0 2 1.5 2 3v2c0 2 1 3 3 3"
            {...strokeProps}
          />
          <Path
            d="M16 4c2 0 3 1 3 3v2c0 1.5 1 3 2 3-1 0-2 1.5-2 3v2c0 2-1 3-3 3"
            {...strokeProps}
          />
        </>
      ) : topicId === 'operator' ? (
        <>
          <Rect x={4} y={3} width={16} height={18} rx={3} {...strokeProps} />
          <Path
            d="M8 8.5h3M9.5 7v3M13.5 8.5h3M8.2 14.2l2.6 2.6M10.8 14.2l-2.6 2.6M13.5 14h3M13.5 16.8h3"
            {...strokeProps}
          />
        </>
      ) : (
        <>
          <Rect x={3} y={4} width={18} height={5} rx={1.5} {...strokeProps} />
          <Path
            d="M5 9v9a2 2 0 002 2h10a2 2 0 002-2V9M10 13h4"
            {...strokeProps}
          />
        </>
      )}
    </Svg>
  );
}

const LEVEL_CONFIG = {
  [Level.MUDAH]: {
    pillBg: '#E3F8EE',
    pillText: '#22A06B',
    bars: ['#2ED47A', '#2ED47A', '#2ED47A'],
  },
  [Level.SEDANG]: {
    pillBg: '#FCF3CF',
    pillText: '#8C5E0A',
    bars: ['#F5B82E', '#F5B82E', '#CBD5E1'],
  },
  [Level.SULIT]: {
    pillBg: '#FDE4E4',
    pillText: '#D64545',
    bars: ['#F26B50', '#F26B50', '#F26B50'],
  },
};

export default function TopicLevelCard({ topicId, nama, level, style }) {
  const theme = TOPIC_THEME[topicId] || TOPIC_THEME.variabel;
  const effectiveLevel = level || Level.MUDAH;
  const cfg = LEVEL_CONFIG[effectiveLevel] || LEVEL_CONFIG[Level.MUDAH];

  return (
    <View style={[s.card, style]}>
      {/* Left Topic Icon Box */}
      <View style={[s.iconBox, { backgroundColor: theme.iconBg }]}>
        <TopicIcon topicId={topicId} />
      </View>

      {/* Middle Topic Title & 3 Level Bars */}
      <View style={s.infoCol}>
        <Text style={s.topicName}>{nama}</Text>
        <View style={s.barsRow}>
          {cfg.bars.map((barColor, idx) => (
            <View
              key={idx}
              style={[s.barItem, { backgroundColor: barColor }]}
            />
          ))}
        </View>
      </View>

      {/* Right Level Badge Pill */}
      <View style={[s.levelPill, { backgroundColor: cfg.pillBg }]}>
        <Text style={[s.levelPillText, { color: cfg.pillText }]}>
          {effectiveLevel}
        </Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#E6ECF5',
    borderBottomWidth: 3.5,
    borderBottomColor: '#DAE2EE',
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoCol: {
    flex: 1,
    marginLeft: 14,
  },
  topicName: {
    fontFamily: fonts.extrabold,
    fontSize: 15,
    color: '#1F2A44',
  },
  barsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 7,
    gap: 5,
  },
  barItem: {
    width: 16,
    height: 4.5,
    borderRadius: 999,
  },
  levelPill: {
    borderRadius: 999,
    paddingVertical: 5,
    paddingHorizontal: 13,
  },
  levelPillText: {
    fontFamily: fonts.bold,
    fontSize: 11.5,
  },
});
