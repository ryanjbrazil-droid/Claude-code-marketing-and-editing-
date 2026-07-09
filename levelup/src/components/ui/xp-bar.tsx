import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

import { Colors, Radius, Shadow } from '@/constants/theme';

interface XPBarProps {
  value: number;
  max: number;
  height?: number;
  colors?: [string, string];
  /** Glow is reserved for the XP bar itself; utility bars pass false. */
  glow?: boolean;
}

/** Animated progress bar. Springs to its new value so gains feel earned. */
export function XPBar({ value, max, height = 10, colors = [Colors.xp, Colors.xpDeep], glow = true }: XPBarProps) {
  const pct = max > 0 ? Math.min(1, Math.max(0, value / max)) : 0;
  const anim = useRef(new Animated.Value(pct)).current;

  useEffect(() => {
    Animated.spring(anim, { toValue: pct, useNativeDriver: false, friction: 9, tension: 40 }).start();
  }, [pct, anim]);

  return (
    <View
      style={[styles.track, { height, borderRadius: height / 2 }]}
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max, now: Math.round(value) }}>
      <Animated.View
        style={[
          styles.fill,
          glow ? Shadow.glow(colors[0], 6, 0.5) : null,
          {
            borderRadius: height / 2,
            width: anim.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }),
          },
        ]}>
        <LinearGradient
          colors={colors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[StyleSheet.absoluteFill, { borderRadius: height / 2 }]}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
    overflow: 'hidden',
    borderRadius: Radius.full,
  },
  fill: {
    height: '100%',
    minWidth: 4,
  },
});
