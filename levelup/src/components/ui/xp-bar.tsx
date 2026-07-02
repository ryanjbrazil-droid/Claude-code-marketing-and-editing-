import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

import { Colors, Radius, Shadow } from '@/constants/theme';

interface XPBarProps {
  value: number;
  max: number;
  height?: number;
  colors?: [string, string];
}

/** Glowing animated XP / progress bar. */
export function XPBar({ value, max, height = 12, colors = [Colors.xp, Colors.flameDeep] }: XPBarProps) {
  const pct = max > 0 ? Math.min(1, Math.max(0, value / max)) : 0;
  const anim = useRef(new Animated.Value(pct)).current;

  useEffect(() => {
    Animated.spring(anim, { toValue: pct, useNativeDriver: false, friction: 8 }).start();
  }, [pct, anim]);

  return (
    <View style={[styles.track, { height, borderRadius: height / 2 }]}>
      <Animated.View
        style={[
          styles.fill,
          Shadow.glow(colors[0], 8, 0.6),
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
    backgroundColor: 'rgba(148, 184, 255, 0.10)',
    overflow: 'hidden',
    borderRadius: Radius.full,
  },
  fill: {
    height: '100%',
    minWidth: 6,
  },
});
