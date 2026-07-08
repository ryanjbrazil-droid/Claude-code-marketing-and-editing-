import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Card } from '@/components/ui/card';
import { EmptyState } from '@/components/ui/empty-state';
import { Chip, IconBubble, SectionHeader, Segmented } from '@/components/ui/misc';
import { PillButton } from '@/components/ui/pill-button';
import { ProgressRing } from '@/components/ui/progress-ring';
import { Screen } from '@/components/ui/screen';
import { XPBar } from '@/components/ui/xp-bar';
import { Colors, Radius, Spacing, Type } from '@/constants/theme';
import { GROCERY_LIST, MACRO_TARGETS, SUGGESTED_MEALS } from '@/lib/data';
import type { IconName, LoggedMeal, MealSlot } from '@/lib/types';
import { useApp, useMacroTotals } from '@/state/app-context';

const VIEWS = ['Macros', 'Meals', 'Planner'] as const;
const SLOTS: MealSlot[] = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];

const QUICK_ADD_MEALS: Omit<LoggedMeal, 'id' | 'slot'>[] = [
  { name: 'Chicken & rice bowl', calories: 620, protein: 48, carbs: 68, fats: 14 },
  { name: 'Protein shake', calories: 220, protein: 40, carbs: 8, fats: 4 },
  { name: 'Steak & potatoes', calories: 700, protein: 52, carbs: 55, fats: 26 },
];

function MacroBarRow({ label, value, target, unit, color }: { label: string; value: number; target: number; unit: string; color: string }) {
  return (
    <View style={{ gap: 6 }}>
      <View style={styles.rowBetween}>
        <Text style={Type.secondary}>{label}</Text>
        <Text style={[Type.small, { color: Colors.text }]}>
          {Math.round(value).toLocaleString()}{unit} / {target.toLocaleString()}{unit}
        </Text>
      </View>
      <XPBar value={value} max={target} height={8} colors={[color, color]} glow={false} />
    </View>
  );
}

function MacrosView() {
  const { dispatch } = useApp();
  const totals = useMacroTotals();
  const calPct = totals.calories / MACRO_TARGETS.calories;

  return (
    <>
      <Card style={styles.calCard}>
        <ProgressRing size={120} strokeWidth={10} progress={calPct} color={Colors.xp}>
          <Text style={[Type.stat, { fontSize: 24 }]}>{totals.calories.toLocaleString()}</Text>
          <Text style={Type.small}>of {MACRO_TARGETS.calories.toLocaleString()} kcal</Text>
        </ProgressRing>
        <View style={{ flex: 1, gap: Spacing.md }}>
          <MacroBarRow label="Protein" value={totals.protein} target={MACRO_TARGETS.protein} unit="g" color={Colors.success} />
          <MacroBarRow label="Carbs" value={totals.carbs} target={MACRO_TARGETS.carbs} unit="g" color={Colors.primary} />
          <MacroBarRow label="Fats" value={totals.fats} target={MACRO_TARGETS.fats} unit="g" color={Colors.flame} />
        </View>
      </Card>

      <Card style={{ gap: Spacing.md }}>
        <MacroBarRow label="Water" value={totals.waterOz} target={MACRO_TARGETS.waterOz} unit=" oz" color={Colors.cyan} />
        <MacroBarRow label="Fiber" value={totals.fiber} target={MACRO_TARGETS.fiber} unit="g" color={Colors.purple} />
        <View style={styles.waterBtns}>
          {[8, 16, 24].map((oz) => (
            <Pressable key={oz} onPress={() => dispatch({ type: 'ADD_WATER', oz })} style={styles.waterBtn}>
              <Ionicons name="water" size={14} color={Colors.cyan} />
              <Text style={[Type.small, { color: Colors.cyan }]}>+{oz} oz</Text>
            </Pressable>
          ))}
        </View>
      </Card>

      <Card style={styles.tipCard}>
        <IconBubble icon="bulb" color={Colors.xp} size={36} />
        <Text style={[Type.secondary, { flex: 1, lineHeight: 20 }]}>
          You need {Math.max(0, MACRO_TARGETS.protein - Math.round(totals.protein))}g more protein today. A shake plus
          Greek yogurt closes the gap.
        </Text>
      </Card>
    </>
  );
}

function MealsView() {
  const { state, dispatch } = useApp();
  const [quickAddIndex, setQuickAddIndex] = useState(0);

  const addMeal = (slot: MealSlot) => {
    const template = QUICK_ADD_MEALS[quickAddIndex % QUICK_ADD_MEALS.length];
    setQuickAddIndex((i) => i + 1);
    dispatch({ type: 'LOG_MEAL', meal: { ...template, id: `m-${Date.now()}`, slot } });
  };

  return (
    <>
      {SLOTS.map((slot) => {
        const meals = state.meals.filter((m) => m.slot === slot);
        return (
          <View key={slot} style={{ gap: Spacing.sm }}>
            <SectionHeader
              title={slot}
              right={
                <Pressable onPress={() => addMeal(slot)} style={styles.addBtn} hitSlop={8}>
                  <Ionicons name="add" size={14} color={Colors.primary} />
                  <Text style={[Type.small, { color: Colors.primary }]}>Add meal</Text>
                </Pressable>
              }
            />
            {meals.length === 0 ? (
              <EmptyState
                icon="restaurant-outline"
                message={`No ${slot.toLowerCase()} logged yet`}
                hint="Tap “Add meal” to log one in two seconds"
              />
            ) : (
              meals.map((m) => (
                <Card key={m.id} style={styles.mealRow}>
                  <IconBubble icon="restaurant" color={Colors.success} size={34} />
                  <View style={{ flex: 1 }}>
                    <Text style={[Type.body, { fontWeight: '700' }]}>{m.name}</Text>
                    <Text style={Type.small}>
                      {m.calories} kcal · P {m.protein}g · C {m.carbs}g · F {m.fats}g
                    </Text>
                  </View>
                </Card>
              ))
            )}
          </View>
        );
      })}

      <SectionHeader title="Faster logging — coming soon" />
      <View style={styles.placeholderRow}>
        {(
          [
            { icon: 'barcode-outline', label: 'Scan barcode' },
            { icon: 'mic-outline', label: 'Voice log' },
            { icon: 'camera-outline', label: 'AI photo estimate' },
          ] as { icon: IconName; label: string }[]
        ).map((p) => (
          <Card key={p.label} style={styles.placeholderCard}>
            <Ionicons name={p.icon} size={22} color={Colors.textMuted} />
            <Text style={[Type.small, { textAlign: 'center' }]}>{p.label}</Text>
          </Card>
        ))}
      </View>
    </>
  );
}

function PlannerView() {
  const [mode, setMode] = useState<'Cut' | 'Maintain' | 'Bulk'>('Maintain');
  const filtered = SUGGESTED_MEALS.filter((m) =>
    mode === 'Cut' ? m.tag !== 'Bulk' : mode === 'Bulk' ? m.tag !== 'Cut' : true,
  );

  return (
    <>
      <SectionHeader title="Goal mode" />
      <Segmented options={['Cut', 'Maintain', 'Bulk'] as const} value={mode} onChange={setMode} />

      <SectionHeader title="Suggested meals" right={<Chip label="High protein" icon="flash" selected />} />
      <View style={{ gap: Spacing.sm }}>
        {filtered.map((m) => (
          <Card key={m.name} style={styles.mealRow}>
            <IconBubble icon="sparkles" color={Colors.purple} size={34} />
            <View style={{ flex: 1 }}>
              <Text style={[Type.body, { fontWeight: '700' }]}>{m.name}</Text>
              <Text style={Type.small}>{m.calories} kcal · {m.protein}g protein</Text>
            </View>
            <View style={styles.tagPill}>
              <Text style={[Type.small, { color: Colors.primary }]}>{m.tag}</Text>
            </View>
          </Card>
        ))}
      </View>

      <SectionHeader title="Grocery list" />
      <Card style={{ gap: 10 }}>
        {GROCERY_LIST.map((item) => (
          <View key={item} style={styles.groceryRow}>
            <Ionicons name="ellipse-outline" size={14} color={Colors.textMuted} />
            <Text style={Type.secondary}>{item}</Text>
          </View>
        ))}
      </Card>

      <PillButton label="Regenerate Plan with AI" icon="sparkles" variant="secondary" onPress={() => {}} />
    </>
  );
}

export default function NutritionScreen() {
  const [view, setView] = useState<(typeof VIEWS)[number]>('Macros');
  return (
    <Screen title="Fuel">
      <Segmented options={VIEWS} value={view} onChange={setView} />
      {view === 'Macros' ? <MacrosView /> : view === 'Meals' ? <MealsView /> : <PlannerView />}
    </Screen>
  );
}

const styles = StyleSheet.create({
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  calCard: { flexDirection: 'row', alignItems: 'center', gap: Spacing.xl },
  waterBtns: { flexDirection: 'row', gap: Spacing.sm },
  waterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.cyanSoft,
    borderRadius: Radius.full,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  tipCard: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: Colors.primarySoft,
    borderRadius: Radius.full,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  mealRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, paddingVertical: Spacing.md },
  placeholderRow: { flexDirection: 'row', gap: Spacing.sm },
  placeholderCard: { flex: 1, alignItems: 'center', gap: 8, paddingVertical: Spacing.lg },
  tagPill: {
    backgroundColor: Colors.primarySoft,
    borderRadius: Radius.full,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  groceryRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
});
