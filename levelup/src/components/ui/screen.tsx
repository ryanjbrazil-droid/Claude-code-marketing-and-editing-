import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors, Spacing, TouchTarget, Type } from '@/constants/theme';

interface ScreenProps {
  title?: string;
  subtitle?: string;
  right?: React.ReactNode;
  children: React.ReactNode;
  scroll?: boolean;
  /** Renders a back chevron before the title (for pushed stack screens). */
  back?: boolean;
  /** Optional pull-to-refresh handler. Resolve the promise when done. */
  onRefresh?: () => Promise<void> | void;
}

/** Standard dark screen shell: safe-area, 20pt gutter, optional refresh. */
export function Screen({ title, subtitle, right, children, scroll = true, back, onRefresh }: ScreenProps) {
  const insets = useSafeAreaInsets();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await onRefresh?.();
    } finally {
      setRefreshing(false);
    }
  }, [onRefresh]);

  const header = title ? (
    <View style={styles.header}>
      {back ? (
        <Pressable
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Back"
          hitSlop={10}
          style={styles.backBtn}>
          <Ionicons name="chevron-back" size={22} color={Colors.text} />
        </Pressable>
      ) : null}
      <View style={{ flex: 1 }}>
        <Text style={Type.title}>{title}</Text>
        {subtitle ? <Text style={[Type.secondary, { marginTop: 4 }]}>{subtitle}</Text> : null}
      </View>
      {right}
    </View>
  ) : null;

  if (!scroll) {
    return (
      <View style={[styles.root, { paddingTop: insets.top + Spacing.md }]}>
        <View style={{ paddingHorizontal: Spacing.gutter }}>{header}</View>
        <View style={styles.fill}>{children}</View>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <ScrollView
        contentContainerStyle={{
          paddingTop: insets.top + Spacing.md,
          paddingHorizontal: Spacing.gutter,
          paddingBottom: 120,
          gap: Spacing.md,
        }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          onRefresh ? (
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor={Colors.textSecondary}
              progressBackgroundColor={Colors.card}
              colors={[Colors.primary]}
            />
          ) : undefined
        }>
        {header}
        {children}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bg },
  fill: { flex: 1, paddingHorizontal: Spacing.gutter },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
    gap: Spacing.sm,
  },
  backBtn: {
    width: 36,
    height: TouchTarget - 8,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
});
