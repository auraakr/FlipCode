import React from 'react';
import { Text, View } from 'react-native';
import { Level } from '../constants/enums';
import { colors, radius, fonts } from '../constants/theme';
import s from '../styles/LevelBadge.styles';

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
