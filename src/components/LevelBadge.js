import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Level } from '../constants/enums';
import { colors, radius, fonts } from '../constants/theme';

export default function LevelBadge({ level }) {
  const bg =
    level === Level.MUDAH ? colors.levelMudah :
    level === Level.SEDANG ? colors.levelSedang :
    colors.levelSulit;
  return (
    <View style={[s.badge, { backgroundColor: bg }]}>
      <Text style={s.text}>{level}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: radius.sm, alignSelf: 'flex-start' },
  text: { color: '#fff', fontFamily: fonts.bold, fontSize: 12 },
});
