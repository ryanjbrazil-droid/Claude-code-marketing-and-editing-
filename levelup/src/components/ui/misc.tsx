import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, View, type ViewStyle } from 'react-native';

import { Colors, Radius, Spacing, Type } from '@/constants/theme';
import type { IconName } from '@/lib/types';

// ---------- SectionHeader ----------

export function SectionHeader({ title, right }: { title: string; right?: React.ReactNode }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={Type.label}>{title}</Text>
      {right}
    </View>
  );
}

// ---------- StreakFlame ----------

export function StreakFlame({ days, compact }: { days: number; compact?: boolean }) {
  return (
    <View style={[styles.flamePill, compact && { paddingVertical: 4, paddingHorizontal: 10 }]}>
      <Ionicons name="flame" size={compact ? 14 : 18} color={Colors.flame} />
      <Text style={[styles.flameText, compact && { fontSize: 13 }]}>{days}</Text>
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
      onPress={onPress}
      style={({ pressed }) => [styles.chip, selected && styles.chipSelected, pressed && { opacity: 0.8 }, style]}>
      {icon ? <Ionicons name={icon} size={16} color={selected ? Colors.primary : Colors.textSecondary} /> : null}
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
    <View style={styles.segmentTrack}>
      {options.map((opt) => (
        <Pressable
          key={opt}
          onPress={() => onChange(opt)}
          style={[styles.segment, value === opt && styles.segmentActive]}>
          <Text style={[styles.segmentLabel, value === opt && styles.segmentLabelActive]}>{opt}</Text>
        </Pressable>
      ))}
    </View>
  );
}

// ---------- Stat row (character stats) ----------

export function StatRow({ label, value, max = 100, color }: { label: string; value: number; max?: number; color: string }) {
  return (
    <View style={{ gap: 6 }}>
      <View style={styles.statRowTop}>
        <Text style={Type.secondary}>{label}</Text>
        <Text style={[Type.body, { fontWeight: '800' }]}>{value}</Text>
      </View>
      <View style={styles.statTrack}>
        <View style={[styles.statFill, { width: `${Math.min(100, (value / max) * 100)}%`, backgroundColor: color }]} />
      </View>
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
        borderRadius: size / 3,
        backgroundColor: `${color}22`,
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
  color = Colors.primary,
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
    <Pressable onPress={onPress} disabled={!onPress} style={({ pressed }) => [styles.settingRow, pressed && { opacity: 0.7 }]}>
      <IconBubble icon={icon} color={color} size={34} />
      <Text style={[Type.body, { flex: 1 }]}>{label}</Text>
      {value ? <Text style={Type.secondary}>{value}</Text> : null}
      {right ?? (onPress ? <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} /> : null)}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.sm,
    marginBottom: 2,
  },
  flamePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.flameSoft,
    borderColor: 'rgba(251, 146, 60, 0.35)',
    borderWidth: 1,
    borderRadius: Radius.full,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  flameText: { color: Colors.flame, fontSize: 16, fontWeight: '800' },
  flameSub: { color: Colors.textSecondary, fontSize: 12, fontWeight: '600' },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.card,
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
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 4,
  },
  segment: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: Radius.full,
    alignItems: 'center',
  },
  segmentActive: { backgroundColor: Colors.primarySoft },
  segmentLabel: { color: Colors.textMuted, fontSize: 13, fontWeight: '700' },
  segmentLabelActive: { color: Colors.primary },
  statRowTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  statTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(148, 184, 255, 0.10)',
    overflow: 'hidden',
  },
  statFill: { height: '100%', borderRadius: 4 },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingVertical: 10,
  },
});
