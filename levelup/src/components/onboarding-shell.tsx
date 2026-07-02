import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PillButton } from '@/components/ui/pill-button';
import { Colors, Spacing, Type } from '@/constants/theme';

const TOTAL_STEPS = 7;

interface OnboardingShellProps {
  step: number; // 1-based
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  ctaLabel?: string;
  onNext?: () => void;
  ctaDisabled?: boolean;
}

export function OnboardingShell({
  step,
  title,
  subtitle,
  children,
  ctaLabel = 'Continue',
  onNext,
  ctaDisabled,
}: OnboardingShellProps) {
  const insets = useSafeAreaInsets();
  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={[styles.progressRow, { marginTop: insets.top + Spacing.xl }]}>
        {Array.from({ length: TOTAL_STEPS }, (_, i) => (
          <View key={i} style={[styles.dot, i < step && styles.dotActive]} />
        ))}
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <Text style={Type.hero}>{title}</Text>
        {subtitle ? <Text style={[Type.secondary, styles.subtitle]}>{subtitle}</Text> : null}
        <View style={styles.body}>{children}</View>
      </ScrollView>

      {onNext ? (
        <View style={[styles.footer, { paddingBottom: insets.bottom + Spacing.lg }]}>
          <PillButton label={ctaLabel} onPress={onNext} disabled={ctaDisabled} />
        </View>
      ) : null}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bg },
  progressRow: {
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: Spacing.xl,
  },
  dot: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(148, 184, 255, 0.14)',
  },
  dotActive: { backgroundColor: Colors.primary },
  content: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xxl,
    paddingBottom: Spacing.xxl,
  },
  subtitle: { marginTop: Spacing.sm, fontSize: 16, lineHeight: 23 },
  body: { marginTop: Spacing.xxl, gap: Spacing.md },
  footer: { paddingHorizontal: Spacing.xl, paddingTop: Spacing.sm },
});
