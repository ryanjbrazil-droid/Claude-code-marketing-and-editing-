import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, type PressableProps, type StyleProp, type ViewStyle } from 'react-native';

import { Motion } from '@/constants/theme';
import { hapticImpact } from '@/lib/haptics';

/**
 * FadeSlideIn — standard entrance for screen sections.
 * A quiet 10px rise + fade; stagger with `delay` so screens build top-down.
 */
export function FadeSlideIn({
  delay = 0,
  children,
  style,
}: {
  delay?: number;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: 1,
      duration: Motion.durationSlow,
      delay,
      useNativeDriver: true,
    }).start();
  }, [anim, delay]);

  return (
    <Animated.View
      style={[
        style,
        {
          opacity: anim,
          transform: [{ translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [10, 0] }) }],
        },
      ]}>
      {children}
    </Animated.View>
  );
}

/**
 * ScalePress — the app-wide press affordance. Everything tappable shrinks to
 * the same 0.97 with the same spring, so touch feedback feels like one hand
 * designed it. Also fires the haptic placeholder.
 */
export function ScalePress({
  children,
  style,
  onPress,
  disabled,
  haptic = true,
  ...rest
}: PressableProps & { children: React.ReactNode; style?: StyleProp<ViewStyle>; haptic?: boolean }) {
  const scale = useRef(new Animated.Value(1)).current;

  const to = (v: number) =>
    Animated.spring(scale, { toValue: v, useNativeDriver: true, speed: 40, bounciness: 4 }).start();

  return (
    <Pressable
      accessibilityRole="button"
      onPressIn={() => to(Motion.pressScale)}
      onPressOut={() => to(1)}
      onPress={(e) => {
        if (haptic) hapticImpact();
        onPress?.(e);
      }}
      disabled={disabled}
      {...rest}>
      <Animated.View style={[style, { transform: [{ scale }] }, disabled && { opacity: 0.4 }]}>
        {children}
      </Animated.View>
    </Pressable>
  );
}
