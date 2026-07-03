import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PillButton } from '@/components/ui/pill-button';
import { Colors, Shadow, Spacing, Type } from '@/constants/theme';
import { resetDraft } from '@/state/onboarding-draft';

export default function Welcome() {
  const insets = useSafeAreaInsets();
  return (
    <View style={styles.root}>
      <LinearGradient
        colors={['rgba(76, 184, 255, 0.18)', 'rgba(7, 11, 18, 0)']}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.center}>
        <View style={[styles.emblem, Shadow.glow(Colors.primary, 28, 0.5)]}>
          <Ionicons name="flash" size={54} color={Colors.primary} />
        </View>
        <Text style={[Type.hero, styles.title]}>Welcome to LevelUp.</Text>
        <Text style={styles.subtitle}>Your real life is now your game.</Text>

        <View style={styles.pillars}>
          {[
            { icon: 'barbell' as const, label: 'Train' },
            { icon: 'flame' as const, label: 'Streak' },
            { icon: 'trending-up' as const, label: 'Level up' },
          ].map((p) => (
            <View key={p.label} style={styles.pillar}>
              <Ionicons name={p.icon} size={18} color={Colors.textSecondary} />
              <Text style={Type.small}>{p.label}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.footer, { paddingBottom: insets.bottom + Spacing.xl }]}>
        <PillButton
          label="Start My Transformation"
          icon="arrow-forward"
          onPress={() => {
            resetDraft();
            router.push('/onboarding/goal');
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bg },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: Spacing.xxl },
  emblem: {
    width: 110,
    height: 110,
    borderRadius: 32,
    backgroundColor: Colors.primarySoft,
    borderWidth: 1,
    borderColor: 'rgba(76, 184, 255, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xxl,
  },
  title: { fontSize: 36, textAlign: 'center' },
  subtitle: {
    marginTop: Spacing.md,
    fontSize: 17,
    color: Colors.textSecondary,
    textAlign: 'center',
    fontWeight: '500',
  },
  pillars: { flexDirection: 'row', gap: Spacing.xl, marginTop: Spacing.xxl },
  pillar: { alignItems: 'center', gap: 6 },
  footer: { paddingHorizontal: Spacing.xl },
});
