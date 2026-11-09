import React from 'react';
import { Pressable, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

// Input pilihan jawaban (satu pilihan dari banyak) dengan Tailwind.
// Props: label (teks jawaban), letter (A/B/C/D), selected, onPress, disabled.
export default function ChoiceOption({ label, letter, selected = false, onPress, disabled, className = '' }) {
  return (
    <View
      className={`rounded-2xl ${selected ? 'bg-brand' : 'bg-slate-200'} ${className}`}
    >
      <Pressable
        onPress={onPress}
        disabled={disabled}
        accessibilityRole="radio"
        accessibilityState={{ selected, disabled }}
        className={`flex-row items-center rounded-2xl border-2 px-4 py-4 ${
          selected ? 'border-brand bg-[#EEF2FF]' : 'border-slate-200 bg-white'
        }`}
        style={{ marginBottom: 3 }}
      >
        <Text className={`w-7 text-base font-bold ${selected ? 'text-brand' : 'text-slate-500'}`}>
          {letter}.
        </Text>
        <Text className="flex-1 text-base font-bold text-ink">{label}</Text>
        <View
          className={`h-6 w-6 items-center justify-center rounded-full ${
            selected ? 'bg-brand' : 'border-2 border-slate-200 bg-white'
          }`}
        >
          {selected && (
            <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
              <Path d="M5 12.5l4.5 4.5L19 7.5" stroke="#fff" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" />
            </Svg>
          )}
        </View>
      </Pressable>
    </View>
  );
}
