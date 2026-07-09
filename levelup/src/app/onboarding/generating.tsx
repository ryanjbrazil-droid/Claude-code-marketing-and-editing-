import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

import { ProgressRing } from '@/components/ui/progress-ring';
import { Colors, Spacing, Type } from '@/constants/theme';
import { useApp } from '@/state/app-context';
import { onboardingDraft } from '@/state/onboarding-draft';

const STEPS = [
  'Analyzing your goals…',
  'Balancing training and recovery…',
  'Setting macro targets…',
  'Calibrating your coach…',
  'Building your first 7-day transformation plan…',
];

export default function GeneratingScreen() {
  const { dispatch } = useApp();
  const [progress, setProgress] = useState(0);
  const pulse = useRef(new Animated.Value(1)).current;
  const done = useRef(false);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1.12, duration: 700, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1, duration: 700, useNativeDriver: true }),
      ]),
    ).start();
  }, [pulse]);

  useEffect(() => {
    const interval = setInterval(() => setProgress((p) => Math.min(1, p + 0.03)), 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 1 && !done.current) {
      done.current = true;
      dispatch({ type: 'COMPLETE_ONBOARDING', profile: onboardingDraft });
      router.replace('/');
    }
  }, [progress, dispatch]);

  const stepIndex = Math.min(STEPS.length - 1, Math.floor(progress * STEPS.length));

  return (
    <View style={styles.root}>
      <ProgressRing size={170} strokeWidth={10} progress={progress} color={Colors.primary}>
        <Animated.View style={{ transform: [{ scale: pulse }] }}>
          <Ionicons name="flash" size={48} color={Colors.primary} />
        </Animated.View>
      </ProgressRing>

      <Text style={[Type.heading, styles.step]}>{STEPS[stepIndex]}</Text>
      <Text style={[Type.secondary, { marginTop: Spacing.sm }]}>{Math.round(progress * 100)}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xxl,
  },
  step: { marginTop: Spacing.xxl, textAlign: 'center' },
});
