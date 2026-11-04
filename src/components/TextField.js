import React from 'react';
import { View, Text, TextInput } from 'react-native';

// Kolom isian sederhana dengan label dan pesan error di bawahnya.
export default function TextField({ label, error, className = '', ...inputProps }) {
  return (
    <View className={`mb-4 ${className}`}>
      <Text className="mb-1.5 text-sm font-semibold text-ink">{label}</Text>
      <TextInput
        placeholderTextColor="#94A3B8"
        autoCapitalize="none"
        autoCorrect={false}
        className={`h-12 rounded-xl border bg-white px-4 text-base font-normal text-ink ${
          error ? 'border-red-400' : 'border-slate-200'
        }`}
        {...inputProps}
      />
      {error ? <Text className="mt-1 text-xs font-normal text-red-500">{error}</Text> : null}
    </View>
  );
}
