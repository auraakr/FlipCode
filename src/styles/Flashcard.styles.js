import { StyleSheet } from 'react-native';
import { colors, fonts, radius } from '../constants/theme';

export default StyleSheet.create({
  wrap: { width: '100%' },
  card: {
    minHeight: 320,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
  },
  inner: { gap: spacing.sm },
  hint: { ...typography.small, color: colors.primary, fontFamily: fonts.bold, textTransform: 'uppercase', letterSpacing: 1 },
  depan: { fontSize: 22, fontFamily: fonts.bold, color: colors.textPrimary, marginVertical: spacing.md },
  tap: { ...typography.small, color: colors.textMuted, textAlign: 'center', marginTop: spacing.md },
  code: {
    backgroundColor: '#111',
    borderRadius: radius.sm,
    padding: spacing.md,
    marginTop: spacing.sm,
  },
  codeText: { color: '#9EEAF9', fontFamily: 'Courier', fontSize: 13 },
});
