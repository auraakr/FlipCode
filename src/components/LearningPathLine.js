import React from 'react';
import { Platform } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export default function LearningPathLine({ width, height, d }) {
  if (Platform.OS === 'web') {
    return (
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: width,
          height: height,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        <path
          d={d}
          stroke="#C2DCF9"
          strokeWidth="4.5"
          strokeDasharray="8 8"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    );
  }

  return (
    <Svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: width,
        height: height,
        zIndex: 0,
      }}
      pointerEvents="none"
    >
      <Path
        d={d}
        stroke="#C2DCF9"
        strokeWidth={4.5}
        strokeDasharray={[8, 8]}
        strokeLinecap="round"
        fill="none"
      />
    </Svg>
  );
}
