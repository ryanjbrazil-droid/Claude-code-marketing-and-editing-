import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Colors, Radius, Spacing, Type } from '@/constants/theme';
import type { IconName } from '@/lib/types';

/**
 * Friendly empty state — never a dead end. Always says what belongs here
 * and, when there's an action, hints at it.
 */
export function EmptyState({ icon, message, hint }: { icon: IconName; message: string; hint?: string }) {
  return (
    <View style={styles.root}>
      <View style={styles.iconWrap}>
        <Ionicons name={icon} size={20} color={Colors.textMuted} />
      </View>
      <Text style={[Type.secondary, { textAlign: 'center' }]}>{message}</Text>
      {hint ? <Text style={[Type.small, { textAlign: 'center' }]}>{hint}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.lg,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    borderStyle: 'dashed',
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
