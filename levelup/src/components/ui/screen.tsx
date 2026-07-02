import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors, Spacing, Type } from '@/constants/theme';

interface ScreenProps {
  title?: string;
  subtitle?: string;
  right?: React.ReactNode;
  children: React.ReactNode;
  scroll?: boolean;
}

/** Standard dark screen shell with safe-area padding and optional header. */
export function Screen({ title, subtitle, right, children, scroll = true }: ScreenProps) {
  const insets = useSafeAreaInsets();
  const header = title ? (
    <View style={styles.header}>
      <View style={{ flex: 1 }}>
        <Text style={Type.title}>{title}</Text>
        {subtitle ? <Text style={[Type.secondary, { marginTop: 2 }]}>{subtitle}</Text> : null}
      </View>
      {right}
    </View>
  ) : null;

  if (!scroll) {
    return (
      <View style={[styles.root, { paddingTop: insets.top + Spacing.md }]}>
        <View style={{ paddingHorizontal: Spacing.lg }}>{header}</View>
        <View style={styles.fill}>{children}</View>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <ScrollView
        contentContainerStyle={{
          paddingTop: insets.top + Spacing.md,
          paddingHorizontal: Spacing.lg,
          paddingBottom: 120,
          gap: Spacing.md,
        }}
        showsVerticalScrollIndicator={false}>
        {header}
        {children}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bg },
  fill: { flex: 1, paddingHorizontal: Spacing.lg },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
    paddingHorizontal: 0,
  },
});
