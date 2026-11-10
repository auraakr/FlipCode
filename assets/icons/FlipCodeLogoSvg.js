import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';

export function FlipCodeLogoSvg({ size = 32 }) {
  return (
    <View style={[styles.brandLogoBox, { width: size, height: size, borderRadius: size * 0.3 }]}>
      <Svg width={size * 0.65} height={size * 0.65} viewBox="0 0 24 24" fill="none">
        <Path
          d="M7 8L3 12L7 16"
          stroke="#FFFFFF"
          strokeWidth={2.8}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M17 8L21 12L17 16"
          stroke="#FFFFFF"
          strokeWidth={2.8}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M14 4L10 20"
          stroke="#FACC15"
          strokeWidth={2.6}
          strokeLinecap="round"
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  brandLogoBox: {
    backgroundColor: '#2554E8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    shadowColor: '#2554E8',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
});

