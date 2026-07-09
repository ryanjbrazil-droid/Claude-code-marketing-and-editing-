import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Card } from '@/components/ui/card';
import { IconBubble, Segmented } from '@/components/ui/misc';
import { PillButton } from '@/components/ui/pill-button';
import { Colors, Spacing, Type } from '@/constants/theme';
import type { MealSlot } from '@/lib/types';

const SLOTS = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'] as const;

export interface MealEstimate {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

/** Shared result step for voice / photo / barcode capture: pick a slot, then log it. */
export function EstimateResult({
  estimate,
  onConfirm,
  onDiscard,
  footnote,
}: {
  estimate: MealEstimate;
  onConfirm: (slot: MealSlot) => void;
  onDiscard: () => void;
  footnote?: string;
}) {
  const [slot, setSlot] = useState<MealSlot>('Breakfast');

  return (
    <View style={{ gap: Spacing.lg }}>
      <Card style={styles.row}>
        <IconBubble icon="restaurant" color={Colors.success} size={40} />
        <View style={{ flex: 1 }}>
          <Text style={[Type.body, { fontWeight: '700' }]}>{estimate.name}</Text>
          <Text style={Type.small}>
            {estimate.calories} kcal · P {estimate.protein}g · C {estimate.carbs}g · F {estimate.fats}g
          </Text>
          {footnote ? <Text style={[Type.small, { marginTop: 2 }]}>{footnote}</Text> : null}
        </View>
      </Card>

      <View>
        <Text style={[Type.secondary, { marginBottom: Spacing.sm }]}>Log to</Text>
        <Segmented options={SLOTS} value={slot} onChange={setSlot} />
      </View>

      <View style={{ gap: Spacing.sm }}>
        <PillButton label="Log meal" icon="checkmark" onPress={() => onConfirm(slot)} />
        <PillButton label="Discard" variant="ghost" icon="close" onPress={onDiscard} />
      </View>
    </View>
  );
}

export function StatusRow({ icon, label, color }: { icon: React.ComponentProps<typeof Ionicons>['name']; label: string; color: string }) {
  return (
    <View style={styles.statusRow}>
      <IconBubble icon={icon} color={color} size={36} />
      <Text style={Type.secondary}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, paddingVertical: Spacing.lg },
});
