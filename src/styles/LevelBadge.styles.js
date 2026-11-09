import { StyleSheet } from 'react-native';
import { fonts, radius } from '../constants/theme';

export default StyleSheet.create({
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: radius.sm, alignSelf: 'flex-start' },
  text: { color: '#fff', fontFamily: fonts.bold, fontSize: 12 },
});
