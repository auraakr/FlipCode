import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { fonts } from '../constants/theme';

const TAB_CONFIG = {
  Belajar: {
    label: 'Belajar',
    icon: require('../../assets/navbar/icon_belajar.png'),
    size: 20,
  },
  Beranda: {
    label: 'Belajar',
    icon: require('../../assets/navbar/icon_belajar.png'),
    size: 20,
  },
  Progres: {
    label: 'Progres',
    icon: require('../../assets/navbar/icon_progres.png'),
    size: 18,
  },
  Pengaturan: {
    label: 'Pengaturan',
    icon: require('../../assets/navbar/icon_pengaturan.png'),
    size: 19,
  },
};

export default function CustomTabBar({ state, descriptors, navigation }) {
  const insets = useSafeAreaInsets();
  const bottomInset = Math.max(insets.bottom, Platform.OS === 'ios' ? 12 : 8);

  return (
    <View style={[styles.container, { paddingBottom: bottomInset }]}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const config = TAB_CONFIG[route.name] || {
          label: route.name,
          icon: null,
          size: 20,
        };

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            activeOpacity={0.7}
            onPress={onPress}
            style={styles.tabButton}
          >
            <View style={[styles.pill, isFocused && styles.pillActive]}>
              {config.icon && (
                <Image
                  source={config.icon}
                  style={[
                    styles.icon,
                    {
                      width: config.size,
                      height: config.size,
                      tintColor: isFocused ? '#FFFFFF' : '#738094',
                    },
                  ]}
                  resizeMode="contain"
                />
              )}
              <Text
                style={[
                  styles.label,
                  isFocused ? styles.labelActive : styles.labelInactive,
                ]}
              >
                {config.label}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EEF2F6',
    paddingTop: 8,
    alignItems: 'center',
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 8,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pill: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 7,
    paddingHorizontal: 20,
    borderRadius: 14,
    minWidth: 78,
  },
  pillActive: {
    backgroundColor: '#3062F9',
  },
  icon: {
    marginBottom: 3,
  },
  label: {
    fontSize: 11,
    textAlign: 'center',
  },
  labelActive: {
    color: '#FFFFFF',
    fontFamily: fonts.bold,
  },
  labelInactive: {
    color: '#738094',
    fontFamily: fonts.medium,
  },
});

