import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Pressable, StyleSheet, Text, View, type ViewStyle } from 'react-native';

import { Colors, Radius, Shadow, Spacing } from '@/constants/theme';
import type { IconName } from '@/lib/types';

interface PillButtonProps {
  label: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  icon?: IconName;
  disabled?: boolean;
  style?: ViewStyle;
}

export function PillButton({ label, onPress, variant = 'primary', icon, disabled, style }: PillButtonProps) {
  const content = (
    <View style={styles.row}>
      {icon ? (
        <Ionicons
          name={icon}
          size={18}
          color={variant === 'primary' ? '#04121D' : Colors.text}
        />
      ) : null}
      <Text style={[styles.label, variant === 'primary' ? styles.labelPrimary : null]}>{label}</Text>
    </View>
  );

  if (variant === 'primary') {
    return (
      <Pressable onPress={onPress} disabled={disabled} style={({ pressed }) => [pressed && styles.pressed, disabled && styles.disabled, style]}>
        <LinearGradient
          colors={[Colors.primary, Colors.primaryDeep]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.base, Shadow.glow(Colors.primary, 14, 0.45)]}>
          {content}
        </LinearGradient>
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        variant === 'secondary' ? styles.secondary : styles.ghost,
        pressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}>
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
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
  label: { fontSize: 15, fontWeight: '700', color: Colors.text, letterSpacing: 0.2 },
  labelPrimary: { color: '#04121D' },
  pressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
  disabled: { opacity: 0.4 },
});
