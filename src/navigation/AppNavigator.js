// Navigasi FlipCode.
// Alur: Welcome (selalu tampil pertama) -> PlacementTest (jika belum) / MainTabs -> PlacementResult -> MainTabs
// MainTabs berisi Beranda (LearningPath), Progres, dan Pengaturan.
// Flashcard, Kuis, QuizResult, Feedback dibuka sebagai stack screen.

import React from 'react';
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

import { colors, fonts } from '../constants/theme';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: '#fff',
        headerTitleStyle: { fontFamily: fonts.bold },
        tabBarLabelStyle: { fontFamily: fonts.medium },
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
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: '#fff',
        headerTitleStyle: { fontFamily: fonts.bold },
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="PlacementTest" component={PlacementTestScreen} options={{ headerShown: false }} />
      <Stack.Screen name="PlacementResult" component={PlacementResultScreen} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
      <Stack.Screen name="Flashcard" component={FlashcardScreen} options={{ title: 'Flashcard' }} />
      <Stack.Screen name="Quiz" component={QuizScreen} options={{ title: 'Kuis' }} />
      <Stack.Screen name="QuizResult" component={QuizResultScreen} options={{ title: 'Hasil Kuis', headerBackVisible: false }} />
    </Stack.Navigator>
  );
}
