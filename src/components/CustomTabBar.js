import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {
  BelajarTabIcon,
  ProgresTabIcon,
  PengaturanTabIcon,
} from '../../assets/icons/AppIcons';
import s from '../styles/CustomTabBar.styles';

export default function CustomTabBar({ state, descriptors, navigation }) {
  return (
    <View style={s.outerWrapper}>
      <View style={s.tabBarCard}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              onPress={onPress}
              activeOpacity={0.75}
              style={s.tabItem}
            >
              <View style={[s.iconBox, isFocused && s.iconBoxActive]}>
                {route.name === 'Belajar' && (
                  <BelajarTabIcon focused={isFocused} />
                )}
                {route.name === 'Progres' && (
                  <ProgresTabIcon focused={isFocused} />
                )}
                {route.name === 'Pengaturan' && (
                  <PengaturanTabIcon focused={isFocused} />
                )}
              </View>
              <Text style={[s.tabLabel, isFocused && s.tabLabelActive]}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
