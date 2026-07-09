import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, View, type ViewStyle } from 'react-native';

import { Colors, Radius, Shadow, Spacing, TouchTarget, Type } from '@/constants/theme';
import type { IconName } from '@/lib/types';
import { ScalePress } from './motion';

interface PillButtonProps {
  label: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  icon?: IconName;
  disabled?: boolean;
  style?: ViewStyle;
}

/**
 * The app's one button. Primary = the single most important action on a
 * screen (gradient + glow); secondary = quiet outline; ghost = text-level.
 */
export function PillButton({ label, onPress, variant = 'primary', icon, disabled, style }: PillButtonProps) {
  const content = (
    <View style={styles.row}>
      {icon ? <Ionicons name={icon} size={18} color={variant === 'primary' ? '#06131D' : Colors.text} /> : null}
      <Text style={[styles.label, variant === 'primary' ? styles.labelPrimary : null]}>{label}</Text>
    </View>
  );

  if (variant === 'primary') {
    return (
      <ScalePress
        onPress={onPress}
        disabled={disabled}
        accessibilityLabel={label}
        style={style}>
        <LinearGradient
          colors={[Colors.primary, Colors.primaryDeep]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.base, Shadow.glow(Colors.primary, 14, 0.35)]}>
          {content}
        </LinearGradient>
      </ScalePress>
    );
  }

  return (
    <ScalePress
      onPress={onPress}
      disabled={disabled}
      accessibilityLabel={label}
      style={[styles.base, variant === 'secondary' ? styles.secondary : styles.ghost, style]}>
      {content}
    </ScalePress>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: TouchTarget + 8,
    borderRadius: Radius.full,
    paddingVertical: 14,
    paddingHorizontal: Spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondary: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.borderStrong,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  label: { ...Type.button, color: Colors.text },
  labelPrimary: { color: '#06131D' },
});
