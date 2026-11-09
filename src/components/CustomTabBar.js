import { fonts } from '../constants/theme';
import React from 'react';
import { View, Text, TouchableOpacity , StyleSheet } from 'react-native';
import {
  BelajarTabIcon,
  ProgresTabIcon,
  PengaturanTabIcon,
} from '../../assets/icons/AppIcons';

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

const s = StyleSheet.create({
  outerWrapper: {
    backgroundColor: '#FDFCF7',
  },
  tabBarCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 10,
    paddingBottom: 14,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderColor: '#F0F4FA',
    shadowColor: '#0F172A',
    shadowOpacity: 0.06,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: -4 },
    elevation: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBox: {
    width: 42,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  iconBoxActive: {
    backgroundColor: '#EDF2FF',
  },
  tabLabel: {
    fontFamily: fonts.medium,
    fontSize: 11.5,
    color: '#7C8BA1',
  },
  tabLabelActive: {
    fontFamily: fonts.bold,
    color: '#2554E8',
  },
});
