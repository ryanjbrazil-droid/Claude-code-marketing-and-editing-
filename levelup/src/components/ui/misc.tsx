import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View, type ViewStyle } from 'react-native';

import { Colors, Radius, Spacing, TouchTarget, Type } from '@/constants/theme';
import { hapticSelect } from '@/lib/haptics';
import type { IconName } from '@/lib/types';

// ---------- SectionHeader ----------

export function SectionHeader({ title, right }: { title: string; right?: React.ReactNode }) {
  return (
    <View style={styles.sectionHeader} accessibilityRole="header">
      <Text style={Type.label}>{title}</Text>
      {right}
    </View>
  );
}

// ---------- StreakFlame ----------

export function StreakFlame({ days, compact }: { days: number; compact?: boolean }) {
  return (
    <View
      style={[styles.flamePill, compact && { paddingVertical: 6, paddingHorizontal: 12 }]}
      accessibilityLabel={`${days} day streak`}>
      <Ionicons name="flame" size={compact ? 14 : 18} color={Colors.flame} />
      <Text style={[styles.flameText, compact && { fontSize: 14 }]}>{days}</Text>
      {!compact && <Text style={styles.flameSub}>day streak</Text>}
    </View>
  );
}

// ---------- Chip (selectable option) ----------

interface ChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  icon?: IconName;
  style?: ViewStyle;
}

export function Chip({ label, selected, onPress, icon, style }: ChipProps) {
  return (
    <Pressable
      onPress={() => {
        hapticSelect();
        onPress?.();
      }}
      accessibilityRole="button"
      accessibilityState={{ selected: !!selected }}
      hitSlop={6}
      style={({ pressed }) => [styles.chip, selected && styles.chipSelected, pressed && { opacity: 0.75 }, style]}>
      {icon ? <Ionicons name={icon} size={15} color={selected ? Colors.primary : Colors.textSecondary} /> : null}
      <Text style={[styles.chipLabel, selected && styles.chipLabelSelected]}>{label}</Text>
    </Pressable>
  );
}

// ---------- Segmented control ----------

export function Segmented<T extends string>({
  options,
  value,
  onChange,
}: {
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <View style={styles.segmentTrack} accessibilityRole="tablist">
      {options.map((opt) => {
        const active = value === opt;
        return (
          <Pressable
            key={opt}
            onPress={() => {
              hapticSelect();
              onChange(opt);
            }}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            style={[styles.segment, active && styles.segmentActive]}>
            <Text style={[styles.segmentLabel, active && styles.segmentLabelActive]}>{opt}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

// ---------- Stat row (character stats) — value animates on change ----------

export function StatRow({
  label,
  value,
  max = 100,
  color,
  note,
}: {
  label: string;
  value: number;
  max?: number;
  color: string;
  /** Why this trait moved — the Identity Engine's transparency line. */
  note?: string;
}) {
  const anim = useRef(new Animated.Value(value / max)).current;

  useEffect(() => {
    Animated.spring(anim, { toValue: Math.min(1, value / max), useNativeDriver: false, friction: 9 }).start();
  }, [value, max, anim]);

  return (
    <View style={{ gap: 7 }} accessibilityLabel={note ? `${label} ${value}. ${note}` : `${label} ${value}`}>
      <View style={styles.statRowTop}>
        <Text style={Type.secondary}>{label}</Text>
        <Text style={[Type.cardTitle, { fontVariant: ['tabular-nums'] }]}>{value}</Text>
      </View>
      <View style={styles.statTrack}>
        <Animated.View
          style={[
            styles.statFill,
            {
              backgroundColor: color,
              width: anim.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }),
            },
          ]}
        />
      </View>
      {note ? <Text style={[Type.small, { fontSize: 11 }]}>{note}</Text> : null}
    </View>
  );
}

// ---------- Icon bubble ----------

export function IconBubble({ icon, color, size = 40 }: { icon: IconName; color: string; size?: number }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.32,
        backgroundColor: `${color}1E`,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Ionicons name={icon} size={size / 2} color={color} />
    </View>
  );
}

// ---------- Row (settings-style) ----------

export function SettingRow({
  icon,
  color = Colors.textSecondary,
  label,
  value,
  onPress,
  right,
}: {
  icon: IconName;
  color?: string;
  label: string;
  value?: string;
  onPress?: () => void;
  right?: React.ReactNode;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityLabel={value ? `${label}, ${value}` : label}
      style={({ pressed }) => [styles.settingRow, pressed && { opacity: 0.65 }]}>
      <IconBubble icon={icon} color={color} size={32} />
      <Text style={[Type.body, { flex: 1 }]} numberOfLines={1}>
        {label}
      </Text>
      {value ? (
        <Text style={[Type.secondary, { maxWidth: '45%' }]} numberOfLines={1}>
          {value}
        </Text>
      ) : null}
      {right ?? (onPress ? <Ionicons name="chevron-forward" size={15} color={Colors.textMuted} /> : null)}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.md,
    marginBottom: 2,
    minHeight: 18,
  },
  flamePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.flameSoft,
    borderColor: 'rgba(255, 158, 87, 0.28)',
    borderWidth: 1,
    borderRadius: Radius.full,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  flameText: { color: Colors.flame, fontSize: 16, fontWeight: '800', fontVariant: ['tabular-nums'] },
  flameSub: { color: Colors.textSecondary, fontSize: 12, fontWeight: '600' },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    minHeight: 40,
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: Colors.borderStrong,
    backgroundColor: 'transparent',
  },
  chipSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primarySoft,
  },
  chipLabel: { color: Colors.textSecondary, fontSize: 14, fontWeight: '600' },
  chipLabelSelected: { color: Colors.primary },
  segmentTrack: {
    flexDirection: 'row',
    backgroundColor: Colors.bgElevated,
    borderRadius: Radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderStrong,
    padding: 3,
  },
  segment: {
    flex: 1,
    minHeight: 36,
    borderRadius: Radius.md - 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentActive: { backgroundColor: Colors.card },
  segmentLabel: { color: Colors.textMuted, fontSize: 13, fontWeight: '600' },
  segmentLabelActive: { color: Colors.text, fontWeight: '700' },
  statRowTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  statTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
    overflow: 'hidden',
  },
  statFill: { height: '100%', borderRadius: 3 },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    minHeight: TouchTarget,
    paddingVertical: 6,
  },
});
