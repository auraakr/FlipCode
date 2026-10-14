import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { colors, radius, spacing, typography } from '../constants/theme';

export default function PrimaryButton({ title, onPress, variant = 'primary', disabled, style }) {
  const bg =
    variant === 'danger' ? colors.danger :
    variant === 'ghost' ? 'transparent' :
    colors.primary;
  const textColor = variant === 'ghost' ? colors.primary : '#fff';
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        s.btn,
        { backgroundColor: bg, opacity: disabled ? 0.5 : pressed ? 0.85 : 1 },
        variant === 'ghost' && { borderWidth: 1, borderColor: colors.primary },
        style,
      ]}
    >
      <Text style={[typography.button, { color: textColor }]}>{title}</Text>
    </Pressable>
  );
}

const s = StyleSheet.create({
  btn: {
    paddingVertical: 14,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
