import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { Card } from '@/components/ui/card';
import { IconBubble } from '@/components/ui/misc';
import { PillButton } from '@/components/ui/pill-button';
import { Colors, Radius, Spacing, Type } from '@/constants/theme';
import type { LoggedMeal, MealSlot } from '@/lib/types';

import { CaptureModalShell } from './capture-modal-shell';

type MealTemplate = Omit<LoggedMeal, 'id' | 'slot'>;

const NUMERIC_FIELDS = [
  { key: 'calories', label: 'Calories' },
  { key: 'protein', label: 'Protein (g)' },
  { key: 'carbs', label: 'Carbs (g)' },
  { key: 'fats', label: 'Fats (g)' },
] as const;

export function AddMealModal({
  visible,
  slot,
  presets,
  onClose,
  onSelect,
}: {
  visible: boolean;
  slot: MealSlot | null;
  presets: MealTemplate[];
  onClose: () => void;
  onSelect: (meal: MealTemplate) => void;
}) {
  const [customOpen, setCustomOpen] = useState(false);
  const [name, setName] = useState('');
  const [values, setValues] = useState({ calories: '', protein: '', carbs: '', fats: '' });

  const reset = () => {
    setCustomOpen(false);
    setName('');
    setValues({ calories: '', protein: '', carbs: '', fats: '' });
  };

  const close = () => {
    reset();
    onClose();
  };

  const pick = (meal: MealTemplate) => {
    onSelect(meal);
    close();
  };

  const submitCustom = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    pick({
      name: trimmed,
      calories: Number(values.calories) || 0,
      protein: Number(values.protein) || 0,
      carbs: Number(values.carbs) || 0,
      fats: Number(values.fats) || 0,
    });
  };

  return (
    <CaptureModalShell visible={visible} title={slot ? `Add to ${slot}` : 'Add meal'} onClose={close}>
      {!customOpen ? (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: Spacing.sm, paddingBottom: Spacing.xl }}>
          {presets.map((m) => (
            <Pressable key={m.name} onPress={() => pick(m)}>
              <Card style={styles.row}>
                <IconBubble icon="restaurant" color={Colors.success} size={34} />
                <View style={{ flex: 1 }}>
                  <Text style={[Type.body, { fontWeight: '700' }]}>{m.name}</Text>
                  <Text style={Type.small}>
                    {m.calories} kcal · P {m.protein}g · C {m.carbs}g · F {m.fats}g
                  </Text>
                </View>
              </Card>
            </Pressable>
          ))}
          <PillButton label="Log something else" icon="create-outline" variant="secondary" onPress={() => setCustomOpen(true)} />
        </ScrollView>
      ) : (
        <View style={{ gap: Spacing.md }}>
          <Text style={Type.secondary}>What did you have?</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="e.g. Turkey chili"
            placeholderTextColor={Colors.textMuted}
            autoFocus
          />
          <View style={styles.grid}>
            {NUMERIC_FIELDS.map((f) => (
              <View key={f.key} style={styles.gridItem}>
                <Text style={[Type.small, { marginBottom: 4 }]}>{f.label}</Text>
                <TextInput
                  style={styles.input}
                  value={values[f.key]}
                  onChangeText={(v) => setValues((prev) => ({ ...prev, [f.key]: v.replace(/[^0-9]/g, '') }))}
                  placeholder="0"
                  placeholderTextColor={Colors.textMuted}
                  keyboardType="number-pad"
                />
              </View>
            ))}
          </View>
          <PillButton label="Log meal" icon="checkmark" onPress={submitCustom} disabled={!name.trim()} />
          <PillButton label="Back to presets" variant="ghost" onPress={() => setCustomOpen(false)} />
        </View>
      )}
    </CaptureModalShell>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, paddingVertical: Spacing.md },
  input: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    color: Colors.text,
    paddingVertical: 12,
    paddingHorizontal: Spacing.lg,
    fontSize: 15,
  },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md },
  gridItem: { width: '46%' },
});
