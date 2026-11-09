import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, radius } from '../constants/theme';

export default function ProgressBar({ value = 0, max = 1 }) {
  const pct = Math.max(0, Math.min(1, max === 0 ? 0 : value / max));
  return (
    <View style={s.track}>
      <View style={[s.fill, { width: `${pct * 100}%` }]} />
    </View>
  );
}

const s = StyleSheet.create({
  track: { height: 8, backgroundColor: colors.border, borderRadius: radius.sm, overflow: 'hidden' },
  fill: { height: '100%', backgroundColor: colors.primary },
});
