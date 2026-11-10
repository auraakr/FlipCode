import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import { fonts } from '../constants/theme';

export default function Button({ title, onPress, disabled, rightIcon, className = '' }) {
  return (
    <View style={btnStyles.outer}>
      <Pressable
        onPress={onPress}
        disabled={disabled}
        style={({ pressed }) => [
          btnStyles.inner,
          pressed && btnStyles.innerPressed,
          disabled && btnStyles.disabled,
        ]}
      >
        <Text style={btnStyles.text}>{title}</Text>
        {rightIcon ? <View style={btnStyles.iconWrap}>{rightIcon}</View> : null}
      </Pressable>
    </View>
  );
}

const btnStyles = StyleSheet.create({
  outer: {
    width: '100%',
    backgroundColor: '#1B3FB8',
    borderRadius: 999,
    paddingBottom: 4,
    shadowColor: '#2554E8',
    shadowOpacity: 0.28,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5,
  },
  inner: {
    width: '100%',
    height: 54,
    backgroundColor: '#2957F5',
    borderRadius: 999,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerPressed: {
    transform: [{ translateY: 2 }],
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: '#FFFFFF',
  },
  iconWrap: {
    marginLeft: 8,
  },
});
