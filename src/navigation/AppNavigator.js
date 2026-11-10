// Navigasi FlipCode.
// Belum login: Login <-> Register. Setelah login berhasil, alur di bawah dipakai.
// Alur: Welcome (selalu tampil pertama) -> PlacementTest (jika belum) / MainTabs -> PlacementResult -> MainTabs
// MainTabs berisi Belajar (LearningPath), Progres, dan Pengaturan.
// Flashcard, Kuis, QuizResult, Feedback dibuka sebagai stack screen.

import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import PlacementTestScreen from '../screens/PlacementTestScreen';
import PlacementResultScreen from '../screens/PlacementResultScreen';
import HomeScreen from '../screens/HomeScreen';
import TopicDetailScreen from '../screens/TopicDetailScreen';
import UpdatedLearningPathScreen from '../screens/UpdatedLearningPathScreen';
import FlashcardScreen from '../screens/FlashcardScreen';
import QuizScreen from '../screens/QuizScreen';
import QuizResultScreen from '../screens/QuizResultScreen';
import TopicCompletedScreen from '../screens/TopicCompletedScreen';
import ResetCompletedScreen from '../screens/ResetCompletedScreen';
import AboutScreen from '../screens/AboutScreen';
import ProgressScreen from '../screens/ProgressScreen';
import SettingsScreen from '../screens/SettingsScreen';
import CustomTabBar from '../components/CustomTabBar';

import { colors, fonts } from '../constants/theme';
import { useAuth } from '../context/AuthContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Belajar" component={HomeScreen} />
      <Tab.Screen name="Progres" component={ProgressScreen} />
      <Tab.Screen name="Pengaturan" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const { status } = useAuth();

  // Memeriksa token tersimpan.
  if (status === 'loading') {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FDFCF7' }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: '#fff',
        headerTitleStyle: { fontFamily: fonts.bold },
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="PlacementTest" component={PlacementTestScreen} />
      <Stack.Screen name="PlacementResult" component={PlacementResultScreen} options={{ gestureEnabled: false }} />
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="TopicDetail" component={TopicDetailScreen} />
      <Stack.Screen name="Flashcard" component={FlashcardScreen} />
      <Stack.Screen name="Quiz" component={QuizScreen} />
      <Stack.Screen name="QuizResult" component={QuizResultScreen} options={{ gestureEnabled: false }} />
      <Stack.Screen name="TopicCompleted" component={TopicCompletedScreen} />
      <Stack.Screen name="UpdatedLearningPath" component={UpdatedLearningPathScreen} />
      <Stack.Screen name="ResetCompleted" component={ResetCompletedScreen} />
      <Stack.Screen name="About" component={AboutScreen} />
    </Stack.Navigator>
  );
}
