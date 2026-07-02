import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors, Radius, Shadow, Spacing } from '@/constants/theme';
import { useApp } from '@/state/app-context';

/** Floating "+350 XP — Workout Complete" toast, driven by app state. */
export function RewardToast() {
  const { state, dispatch } = useApp();
  const insets = useSafeAreaInsets();
  const anim = useRef(new Animated.Value(0)).current;
  const reward = state.reward;

  useEffect(() => {
    if (!reward) return;
    anim.setValue(0);
    Animated.sequence([
      Animated.spring(anim, { toValue: 1, useNativeDriver: true, friction: 7 }),
      Animated.delay(reward.sub ? 2600 : 1800),
      Animated.timing(anim, { toValue: 0, duration: 250, useNativeDriver: true }),
    ]).start(() => dispatch({ type: 'CLEAR_REWARD' }));
  }, [reward, anim, dispatch]);

  if (!reward) return null;

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.wrap,
        {
          top: insets.top + 8,
          opacity: anim,
          transform: [{ translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [-24, 0] }) }],
        },
      ]}>
      <View style={[styles.toast, Shadow.glow(Colors.xp, 16, 0.35)]}>
        <View style={styles.iconWrap}>
          <Ionicons name="sparkles" size={16} color={Colors.xp} />
        </View>
        <View style={{ flexShrink: 1 }}>
          <Text style={styles.text}>{reward.text}</Text>
          {reward.sub ? <Text style={styles.sub}>{reward.sub}</Text> : null}
        </View>
      </View>
    </Animated.View>
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
    backgroundColor: '#141D30',
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: 'rgba(250, 204, 21, 0.45)',
    paddingVertical: 10,
    paddingHorizontal: Spacing.lg,
    maxWidth: '88%',
  },
  iconWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.xpSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: { color: Colors.text, fontSize: 14, fontWeight: '800' },
  sub: { color: Colors.xp, fontSize: 12, fontWeight: '700', marginTop: 2 },
});
