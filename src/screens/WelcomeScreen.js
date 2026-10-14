import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PrimaryButton from '../components/PrimaryButton';
import { colors, spacing } from '../constants/theme';
import { ProgressRepository } from '../storage/ProgressRepository';

export default function WelcomeScreen({ navigation }) {
  const mulai = async () => {
    const done = await ProgressRepository.isPlacementDone();
    navigation.replace(done ? 'MainTabs' : 'PlacementTest');
  };
  return (
    <SafeAreaView style={s.safe}>
      <View style={s.hero}>
        <Text style={s.logo}>FlipCode</Text>
        <Text style={s.tag}>Adaptive Flashcard Learning App</Text>
        <Text style={s.mascot}>🦉 Flip</Text>
      </View>
      <View style={s.footer}>
        <PrimaryButton title="Mulai" onPress={mulai} />
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.primary },
  hero: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: spacing.sm },
  logo: { fontSize: 48, fontWeight: '800', color: '#fff' },
  tag: { color: '#E5EDFB', fontSize: 15 },
  mascot: { fontSize: 72, marginTop: spacing.xl },
  footer: { padding: spacing.lg },
});
