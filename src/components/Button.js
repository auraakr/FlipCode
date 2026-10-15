import React from 'react';
import { Pressable, Text, View } from 'react-native';

// Tombol utama bergaya "3D" (ada bayangan tebal di bawah) dengan Tailwind.
export default function Button({ title, onPress, disabled, className = '' }) {
  return (
    <View className={`rounded-2xl bg-brand-dark ${disabled ? 'opacity-50' : ''} ${className}`}>
      <Pressable
        onPress={onPress}
        disabled={disabled}
        className="h-14 items-center justify-center rounded-2xl bg-brand active:translate-y-0.5"
        style={{ marginBottom: 4 }}
      >
        <Text className="text-base font-bold text-white">{title}</Text>
      </Pressable>
    </View>
  );
}
