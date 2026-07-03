import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useMemo, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors, Radius, Shadow, Spacing } from '@/constants/theme';
import { useApp } from '@/state/app-context';

const CONFETTI_COLORS = [Colors.xp, Colors.primary, Colors.success, Colors.purple, Colors.flame];

/** Confetti burst — reserved for level-ups only, so it stays special. */
function Confetti() {
  const { width } = useWindowDimensions();
  const pieces = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        x: (i / 18) * width + (i % 3) * 9,
        delay: (i % 6) * 70,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        size: 5 + (i % 3) * 2,
        drift: (i % 2 === 0 ? 1 : -1) * (16 + (i % 4) * 10),
      })),
    [width],
  );
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(anim, { toValue: 1, duration: 1500, easing: Easing.out(Easing.quad), useNativeDriver: true }).start();
  }, [anim]);

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      {pieces.map((p, i) => (
        <Animated.View
          key={i}
          style={{
            position: 'absolute',
            top: -12,
            left: p.x,
            width: p.size,
            height: p.size * 1.8,
            borderRadius: 2,
            backgroundColor: p.color,
            opacity: anim.interpolate({ inputRange: [0, 0.15, 0.85, 1], outputRange: [0, 1, 1, 0] }),
            transform: [
              { translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [0, 260 + (i % 5) * 40] }) },
              { translateX: anim.interpolate({ inputRange: [0, 1], outputRange: [0, p.drift] }) },
              { rotate: anim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', `${p.drift * 14}deg`] }) },
            ],
          }}
        />
      ))}
    </View>
  );
}

/** Floating XP reward toast, driven by app state. Level-ups add confetti. */
export function RewardToast() {
  const { state, dispatch } = useApp();
  const insets = useSafeAreaInsets();
  const anim = useRef(new Animated.Value(0)).current;
  const reward = state.reward;
  const isLevelUp = !!reward?.sub;

  useEffect(() => {
    if (!reward) return;
    anim.setValue(0);
    Animated.sequence([
      Animated.spring(anim, { toValue: 1, useNativeDriver: true, friction: 7 }),
      Animated.delay(isLevelUp ? 2800 : 1700),
      Animated.timing(anim, { toValue: 0, duration: 220, useNativeDriver: true }),
    ]).start(() => dispatch({ type: 'CLEAR_REWARD' }));
  }, [reward, isLevelUp, anim, dispatch]);

  if (!reward) return null;

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      {isLevelUp ? <Confetti /> : null}
      <Animated.View
        style={[
          styles.wrap,
          {
            top: insets.top + 8,
            opacity: anim,
            transform: [{ translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [-20, 0] }) }],
          },
        ]}>
        <View style={[styles.toast, isLevelUp && styles.toastLevelUp, isLevelUp && Shadow.glow(Colors.xp, 18, 0.4)]}>
          <View style={styles.iconWrap}>
            <Ionicons name={isLevelUp ? 'trophy' : 'sparkles'} size={15} color={Colors.xp} />
          </View>
          <View style={{ flexShrink: 1 }}>
            <Text style={styles.text}>{reward.text}</Text>
            {reward.sub ? <Text style={styles.sub}>{reward.sub}</Text> : null}
          </View>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 100,
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.bgElevated,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: Colors.borderStrong,
    paddingVertical: 10,
    paddingHorizontal: Spacing.lg,
    maxWidth: '88%',
    ...Shadow.card,
  },
  toastLevelUp: {
    borderColor: 'rgba(247, 201, 72, 0.5)',
  },
  iconWrap: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: Colors.xpSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: { color: Colors.text, fontSize: 14, fontWeight: '700', fontVariant: ['tabular-nums'] },
  sub: { color: Colors.xp, fontSize: 12, fontWeight: '700', marginTop: 2 },
});
