// Navigasi FlipCode.
// Alur: Welcome -> PlacementTest -> PlacementResult -> MainTabs
// MainTabs berisi Beranda (LearningPath), Progres, dan Pengaturan.
// Flashcard, Kuis, QuizResult, Feedback dibuka sebagai stack screen.

import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import WelcomeScreen from '../screens/WelcomeScreen';
import PlacementTestScreen from '../screens/PlacementTestScreen';
import PlacementResultScreen from '../screens/PlacementResultScreen';
import HomeScreen from '../screens/HomeScreen';
import FlashcardScreen from '../screens/FlashcardScreen';
import QuizScreen from '../screens/QuizScreen';
import QuizResultScreen from '../screens/QuizResultScreen';
import ProgressScreen from '../screens/ProgressScreen';
import SettingsScreen from '../screens/SettingsScreen';

import { ProgressRepository } from '../storage/ProgressRepository';
import { colors } from '../constants/theme';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: '#fff',
        tabBarActiveTintColor: colors.primary,
      }}
    >
      <Tab.Screen name="Beranda" component={HomeScreen} />
      <Tab.Screen name="Progres" component={ProgressScreen} />
      <Tab.Screen name="Pengaturan" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const [initial, setInitial] = useState(null);

  useEffect(() => {
    (async () => {
      const done = await ProgressRepository.isPlacementDone();
      setInitial(done ? 'MainTabs' : 'Welcome');
    })();
  }, []);

  if (!initial) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName={initial}
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: '700' },
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="PlacementTest" component={PlacementTestScreen} options={{ title: 'Tes Awal' }} />
      <Stack.Screen name="PlacementResult" component={PlacementResultScreen} options={{ title: 'Hasil Tes Awal', headerBackVisible: false }} />
      <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
      <Stack.Screen name="Flashcard" component={FlashcardScreen} options={{ title: 'Flashcard' }} />
      <Stack.Screen name="Quiz" component={QuizScreen} options={{ title: 'Kuis' }} />
      <Stack.Screen name="QuizResult" component={QuizResultScreen} options={{ title: 'Hasil Kuis', headerBackVisible: false }} />
    </Stack.Navigator>
  );
}
