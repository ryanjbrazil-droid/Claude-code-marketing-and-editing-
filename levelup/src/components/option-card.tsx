import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors, Radius, Spacing, Type } from '@/constants/theme';
import type { IconName } from '@/lib/types';

interface OptionCardProps {
  label: string;
  description?: string;
  icon: IconName;
  color?: string;
  selected: boolean;
  onPress: () => void;
}

/** Large selectable option card used across onboarding. */
export function OptionCard({ label, description, icon, color = Colors.primary, selected, onPress }: OptionCardProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      accessibilityLabel={description ? `${label}. ${description}` : label}
      style={({ pressed }) => [styles.card, selected && styles.selected, pressed && { backgroundColor: Colors.cardPressed }]}>
      <View style={[styles.icon, { backgroundColor: `${color}22` }]}>
        <Ionicons name={icon} size={22} color={color} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[Type.body, { fontWeight: '700' }]}>{label}</Text>
        {description ? <Text style={[Type.small, { marginTop: 2 }]}>{description}</Text> : null}
      </View>
      <View style={[styles.radio, selected && styles.radioSelected]}>
        {selected ? <Ionicons name="checkmark" size={14} color="#06131D" /> : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    borderWidth: 1.5,
    borderColor: Colors.border,
    padding: Spacing.lg,
    minHeight: 72,
  },
  selected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primarySoft,
  },
  icon: {
    width: 44,
    height: 44,
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: Colors.borderStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
});
