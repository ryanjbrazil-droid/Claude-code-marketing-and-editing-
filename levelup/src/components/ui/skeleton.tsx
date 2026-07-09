import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

import { Colors, Radius, Spacing } from '@/constants/theme';

/** Pulsing placeholder block for loading states. */
export function Skeleton({ width, height, radius = Radius.sm, style }: { width?: number | `${number}%`; height: number; radius?: number; style?: object }) {
  const pulse = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 0.9, duration: 700, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0.4, duration: 700, useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);

  return (
    <Animated.View
      style={[
        { width: width ?? '100%', height, borderRadius: radius, backgroundColor: 'rgba(255,255,255,0.07)', opacity: pulse },
        style,
      ]}
    />
  );
}

/** Skeleton layout shown while persisted state hydrates — mirrors the Today screen. */
export function TodaySkeleton() {
  return (
    <View style={styles.root}>
      <Skeleton width={140} height={12} />
      <Skeleton width={220} height={28} style={{ marginTop: Spacing.sm }} />
      <Skeleton height={104} radius={Radius.lg} style={{ marginTop: Spacing.xl }} />
      <Skeleton height={96} radius={Radius.lg} style={{ marginTop: Spacing.md }} />
      <Skeleton height={72} radius={Radius.lg} style={{ marginTop: Spacing.md }} />
      {[0, 1, 2].map((i) => (
        <Skeleton key={i} height={64} radius={Radius.lg} style={{ marginTop: Spacing.md }} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.bg,
    paddingTop: 72,
    paddingHorizontal: Spacing.gutter,
  },
});
