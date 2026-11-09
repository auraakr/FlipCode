import React from 'react';
import { View } from 'react-native';
import s from '../styles/ProgressBar.styles';

export default function ProgressBar({ value = 0, max = 1 }) {
  const pct = Math.max(0, Math.min(1, max === 0 ? 0 : value / max));
  return (
    <View style={s.track}>
      <View style={[s.fill, { width: `${pct * 100}%` }]} />
    </View>
  );
}
