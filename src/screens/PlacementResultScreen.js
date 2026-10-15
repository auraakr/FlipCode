import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import Button from '../components/Button';
import TopicLevelCard from '../components/TopicLevelCard';
import HasilIllustration from '../../assets/icon_tesawal.svg';
import { ContentRepository } from '../storage/ContentRepository';

export default function PlacementResultScreen({ route, navigation }) {
  const { hasil } = route.params || { hasil: { perTopicLevel: {} } };
  const topics = ContentRepository.getAllTopics();

  return (
    <SafeAreaView className="flex-1 bg-cream">
      <ScrollView className="flex-1" contentContainerClassName="items-center px-4 pb-4 pt-6">
        <HasilIllustration width="100%" height={220} />
        <Text className="mt-4 text-center text-3xl font-extrabold text-ink">Yeay, levelmu ketemu!</Text>
        <Text className="mt-1 text-center text-sm font-normal text-slate-500">
          Ini level awal yang cocok buat kamu.
        </Text>

        <View className="mt-6 w-full">
          {topics.map((t) => (
            <TopicLevelCard
              key={t.id}
              topicId={t.id}
              nama={t.nama}
              level={hasil.perTopicLevel[t.id]}
              className="mb-3"
            />
          ))}
        </View>
      </ScrollView>

      <View className="px-4 pb-4">
        <Button
          title="Mulai Belajar"
          onPress={() => navigation.replace('MainTabs')}
          rightIcon={
            <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
              <Path d="M5 12h14M13 6l6 6-6 6" stroke="#fff" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
            </Svg>
          }
        />
      </View>
    </SafeAreaView>
  );
}
