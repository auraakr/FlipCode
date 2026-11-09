import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path, Rect, Circle } from 'react-native-svg';
import { fonts } from '../constants/theme';

function TabIcon({ name, focused }) {
  const color = focused ? '#2554E8' : '#7C8BA1';

  if (name === 'Belajar' || name === 'Beranda') {
    return (
      <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
        {focused ? (
          <>
            <Path
              d="M2 6.5C2 5.4 2.9 4.5 4 4.5H9.5C10.9 4.5 12 5.6 12 7V19.5C12 18.7 11.3 18 10.5 18H4C2.9 18 2 17.1 2 16V6.5Z"
              fill="#2554E8"
            />
            <Path
              d="M22 6.5C22 5.4 21.1 4.5 20 4.5H14.5C13.1 4.5 12 5.6 12 7V19.5C12 18.7 12.7 18 13.5 18H20C21.1 18 22 17.1 22 16V6.5Z"
              fill="#2554E8"
              fillOpacity={0.25}
              stroke="#2554E8"
              strokeWidth={1.8}
              strokeLinejoin="round"
            />
            <Path
              d="M12 6.5V19"
              stroke="#FFFFFF"
              strokeWidth={1.6}
              strokeLinecap="round"
            />
          </>
        ) : (
          <Path
            d="M12 6.5C12 5.4 10.9 4.5 9.5 4.5H4C2.9 4.5 2 5.4 2 6.5V16C2 17.1 2.9 18 4 18H10.5C11.3 18 12 18.7 12 19.5M12 6.5C12 5.4 13.1 4.5 14.5 4.5H20C21.1 4.5 22 5.4 22 6.5V16C22 17.1 21.1 18 20 18H13.5C12.7 18 12 18.7 12 19.5M12 6.5V19.5"
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </Svg>
    );
  }

  if (name === 'Progres') {
    return (
      <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
        <Rect x="4" y="10" width="4" height="10" rx="1.5" fill={color} />
        <Rect x="10" y="5" width="4" height="15" rx="1.5" fill={color} />
        <Rect x="16" y="13" width="4" height="7" rx="1.5" fill={color} />
      </Svg>
    );
  }

  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="3" stroke={color} strokeWidth={2} />
      <Path
        d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

const TAB_LABELS = {
  Belajar: 'Belajar',
  Beranda: 'Belajar',
  Progres: 'Progres',
  Pengaturan: 'Pengaturan',
};

export default function CustomTabBar({ state, navigation }) {
  const insets = useSafeAreaInsets();
  const bottomInset = Math.max(insets.bottom, Platform.OS === 'ios' ? 12 : 8);

  return (
    <View style={[styles.container, { paddingBottom: bottomInset }]}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const label = TAB_LABELS[route.name] || route.name;

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
            <View style={[styles.iconBox, isFocused && styles.iconBoxActive]}>
              <TabIcon name={route.name} focused={isFocused} />
            </View>
            <Text
              style={[
                styles.label,
                isFocused ? styles.labelActive : styles.labelInactive,
              ]}
            >
              {label}
            </Text>
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
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderTopWidth: 1,
    borderTopColor: '#EEF2F7',
    paddingTop: 8,
    alignItems: 'center',
    justifyContent: 'space-around',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 8,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBox: {
    width: 38,
    height: 34,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 3,
  },
  iconBoxActive: {
    backgroundColor: '#E8EEFF',
  },
  label: {
    fontSize: 11,
    textAlign: 'center',
  },
  labelActive: {
    color: '#2554E8',
    fontFamily: fonts.bold,
  },
  labelInactive: {
    color: '#7C8BA1',
    fontFamily: fonts.semibold,
  },
});
