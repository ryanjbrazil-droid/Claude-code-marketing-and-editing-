import React, { useCallback, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors, Spacing, Type } from '@/constants/theme';

interface ScreenProps {
  title?: string;
  subtitle?: string;
  right?: React.ReactNode;
  children: React.ReactNode;
  scroll?: boolean;
  /** Optional pull-to-refresh handler. Resolve the promise when done. */
  onRefresh?: () => Promise<void> | void;
}

/** Standard dark screen shell: safe-area, 20pt gutter, optional refresh. */
export function Screen({ title, subtitle, right, children, scroll = true, onRefresh }: ScreenProps) {
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
  },
});
