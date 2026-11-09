import { StyleSheet } from 'react-native';
import { colors, radius } from '../constants/theme';

export default StyleSheet.create({
  track: { height: 8, backgroundColor: colors.border, borderRadius: radius.sm, overflow: 'hidden' },
  fill: { height: '100%', backgroundColor: colors.primary },
});
