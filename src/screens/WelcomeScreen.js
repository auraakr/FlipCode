import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/Button';
import Logo from '../../assets/logo.svg';
import WelcomeIllustration from '../../assets/splash.svg';
import { ProgressRepository } from '../storage/ProgressRepository';

export default function WelcomeScreen({ navigation }) {
  const mulai = async () => {
    const done = await ProgressRepository.isPlacementDone();
    navigation.replace(done ? 'MainTabs' : 'PlacementTest');
  };

  return (
    <SafeAreaView className="flex-1 bg-cream">
      <View className="items-center">
        <Text className="text-2xl font-extrabold text-ink">
          <Logo width={150} height={150} />
        </Text>
      </View>

      <View className="flex-1 items-center justify-center px-6">
        <WelcomeIllustration width="100%" height={280} />

        <View className="mt-4 rounded-full border border-brand/20 bg-brand-light px-4 py-1.5">
          <Text className="text-xs font-bold text-brand">Belajar sesuai levelmu</Text>
        </View>
        <Text className="mt-4 text-center text-3xl font-extrabold text-ink">
          Coding jadi lebih seru!
        </Text>
        <Text className="mt-3 text-center text-base leading-6 text-slate-500">
          Belajar pemrograman lewat kartu dan kuis singkat.
        </Text>
      </View>

      <View className="px-6 pb-6">
        <Button title="Mulai" onPress={mulai} />
      </View>
    </SafeAreaView>
  );
}
