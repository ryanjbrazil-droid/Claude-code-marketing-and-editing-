import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

import { AddMealModal } from '@/components/nutrition/add-meal-modal';
import { BarcodeScanModal } from '@/components/nutrition/barcode-scan-modal';
import { PhotoEstimateModal } from '@/components/nutrition/photo-estimate-modal';
import { VoiceLogModal } from '@/components/nutrition/voice-log-modal';
import { Card } from '@/components/ui/card';
import { EmptyState } from '@/components/ui/empty-state';
import { Chip, IconBubble, SectionHeader, Segmented } from '@/components/ui/misc';
import { PillButton } from '@/components/ui/pill-button';
import { ProgressRing } from '@/components/ui/progress-ring';
import { Screen } from '@/components/ui/screen';
import { XPBar } from '@/components/ui/xp-bar';
import { Colors, Radius, Spacing, Type } from '@/constants/theme';
import { GROCERY_LIST, MACRO_TARGETS, SUGGESTED_MEALS } from '@/lib/data';
import { generateMealPlan, type MealPlan } from '@/lib/meal-plan-ai';
import type { IconName, LoggedMeal, MealSlot, SuggestedMeal } from '@/lib/types';
import { useApp, useMacroTotals } from '@/state/app-context';

type GoalMode = 'Cut' | 'Maintain' | 'Bulk';

type CaptureMode = 'barcode' | 'voice' | 'photo' | null;

const VIEWS = ['Macros', 'Meals', 'Planner'] as const;
const SLOTS: MealSlot[] = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];

const QUICK_ADD_MEALS: Omit<LoggedMeal, 'id' | 'slot'>[] = [
  { name: 'Eggs, oats & berries', calories: 520, protein: 38, carbs: 55, fats: 16 },
  { name: 'Chicken & rice bowl', calories: 620, protein: 48, carbs: 68, fats: 14 },
  { name: 'Protein shake', calories: 220, protein: 40, carbs: 8, fats: 4 },
  { name: 'Steak & potatoes', calories: 700, protein: 52, carbs: 55, fats: 26 },
  { name: 'Salmon, potatoes & greens', calories: 560, protein: 42, carbs: 40, fats: 22 },
  { name: 'Greek yogurt + almonds', calories: 290, protein: 24, carbs: 18, fats: 14 },
  { name: 'Turkey wrap', calories: 480, protein: 35, carbs: 45, fats: 16 },
  { name: 'Protein bar', calories: 210, protein: 20, carbs: 22, fats: 7 },
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
  const [capture, setCapture] = useState<CaptureMode>(null);
  const [addSlot, setAddSlot] = useState<MealSlot | null>(null);

  return (
    <>
      {SLOTS.map((slot) => {
        const meals = state.meals.filter((m) => m.slot === slot);
        return (
          <View key={slot} style={{ gap: Spacing.sm }}>
            <SectionHeader
              title={slot}
              right={
                <Pressable onPress={() => setAddSlot(slot)} style={styles.addBtn} hitSlop={8}>
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
                  <Pressable
                    onPress={() => dispatch({ type: 'DELETE_MEAL', id: m.id })}
                    accessibilityRole="button"
                    accessibilityLabel={`Delete ${m.name}`}
                    hitSlop={8}
                    style={styles.deleteBtn}>
                    <Ionicons name="trash-outline" size={18} color={Colors.textMuted} />
                  </Pressable>
                </Card>
              ))
            )}
          </View>
        );
      })}

      <SectionHeader title="Faster logging" />
      <View style={styles.placeholderRow}>
        {(
          [
            { icon: 'barcode-outline', label: 'Scan barcode', mode: 'barcode' as const },
            { icon: 'mic-outline', label: 'Voice log', mode: 'voice' as const },
            { icon: 'camera-outline', label: 'AI photo estimate', mode: 'photo' as const },
          ] as { icon: IconName; label: string; mode: CaptureMode }[]
        ).map((p) => (
          <Pressable key={p.label} onPress={() => setCapture(p.mode)} style={{ flex: 1 }}>
            <Card style={styles.placeholderCard}>
              <Ionicons name={p.icon} size={22} color={Colors.primary} />
              <Text style={[Type.small, { textAlign: 'center' }]}>{p.label}</Text>
            </Card>
          </Pressable>
        ))}
      </View>

      {capture === 'barcode' ? <BarcodeScanModal visible onClose={() => setCapture(null)} /> : null}
      {capture === 'voice' ? <VoiceLogModal visible onClose={() => setCapture(null)} /> : null}
      {capture === 'photo' ? <PhotoEstimateModal visible onClose={() => setCapture(null)} /> : null}

      <AddMealModal
        visible={addSlot !== null}
        slot={addSlot}
        presets={QUICK_ADD_MEALS}
        onClose={() => setAddSlot(null)}
        onSelect={(meal) => {
          if (!addSlot) return;
          dispatch({ type: 'LOG_MEAL', meal: { ...meal, id: `m-${Date.now()}`, slot: addSlot } });
        }}
      />
    </>
  );
}

const FALLBACK_MEALS: Record<GoalMode, SuggestedMeal[]> = {
  Cut: SUGGESTED_MEALS.filter((m) => m.tag !== 'Bulk'),
  Maintain: SUGGESTED_MEALS,
  Bulk: SUGGESTED_MEALS.filter((m) => m.tag !== 'Cut'),
};

function PlannerView() {
  const { state } = useApp();
  const [mode, setMode] = useState<GoalMode>('Maintain');
  const [plans, setPlans] = useState<Partial<Record<GoalMode, MealPlan>>>({});
  const [loading, setLoading] = useState(false);
  const [planError, setPlanError] = useState('');

  const plan = plans[mode];
  const meals = plan?.meals ?? FALLBACK_MEALS[mode];
  const groceryList = plan?.groceryList ?? GROCERY_LIST;

  const fetchPlan = async (targetMode: GoalMode) => {
    setLoading(true);
    setPlanError('');
    try {
      const result = await generateMealPlan(state.profile.goal, targetMode, MACRO_TARGETS);
      setPlans((prev) => ({ ...prev, [targetMode]: result }));
    } catch (err) {
      setPlanError(err instanceof Error ? err.message : 'Could not generate a plan. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const changeMode = (next: GoalMode) => {
    setMode(next);
    if (!plans[next]) fetchPlan(next);
  };

  return (
    <>
      <SectionHeader title="Goal mode" />
      <Segmented options={['Cut', 'Maintain', 'Bulk'] as const} value={mode} onChange={changeMode} />

      <SectionHeader title="Suggested meals" right={<Chip label={mode} icon="flash" selected />} />
      {loading && !plan ? (
        <Card style={{ alignItems: 'center', paddingVertical: Spacing.xl }}>
          <ActivityIndicator color={Colors.primary} />
        </Card>
      ) : (
        <View style={{ gap: Spacing.sm }}>
          {meals.map((m) => (
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
      )}
      {planError ? <Text style={[Type.small, { color: Colors.danger }]}>{planError}</Text> : null}

      <SectionHeader title="Grocery list" />
      <Card style={{ gap: 10 }}>
        {groceryList.map((item) => (
          <View key={item} style={styles.groceryRow}>
            <Ionicons name="ellipse-outline" size={14} color={Colors.textMuted} />
            <Text style={Type.secondary}>{item}</Text>
          </View>
        ))}
      </Card>

      <PillButton
        label={loading ? 'Generating…' : 'Regenerate Plan with AI'}
        icon="sparkles"
        variant="secondary"
        disabled={loading}
        onPress={() => fetchPlan(mode)}
      />
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
  deleteBtn: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
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
