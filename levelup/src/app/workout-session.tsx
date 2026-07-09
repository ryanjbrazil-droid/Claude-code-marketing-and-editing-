import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Card } from '@/components/ui/card';
import { PillButton } from '@/components/ui/pill-button';
import { XPBar } from '@/components/ui/xp-bar';
import { Colors, Radius, Spacing, Type } from '@/constants/theme';
import { WEEKLY_SPLIT, WORKOUT_TEMPLATES } from '@/lib/data';
import { XP_REWARDS } from '@/lib/game';
import type { Exercise, WorkoutHistoryEntry } from '@/lib/types';
import { useApp } from '@/state/app-context';

/** Most recent logged top-set weight for this exercise, or undefined if never done before. */
function lastWeightFor(name: string, history: WorkoutHistoryEntry[]): number | undefined {
  for (let i = history.length - 1; i >= 0; i--) {
    const match = history[i].exercises.find((e) => e.name === name);
    if (match && match.sets.length > 0) return Math.max(...match.sets.map((s) => s.weight));
  }
  return undefined;
}

export default function WorkoutSessionScreen() {
  const insets = useSafeAreaInsets();
  const { state, dispatch } = useApp();
  const todayIndex = (new Date().getDay() + 6) % 7; // Monday = 0
  const today = WEEKLY_SPLIT[todayIndex];
  const template = WORKOUT_TEMPLATES[today.focus] ?? [];

  const [exercises, setExercises] = useState<Exercise[]>(template);
  const [restLeft, setRestLeft] = useState(0);
  const restTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (restTimer.current) clearInterval(restTimer.current);
    };
  }, []);

  const startRest = (seconds: number) => {
    if (restTimer.current) clearInterval(restTimer.current);
    setRestLeft(seconds);
    restTimer.current = setInterval(() => {
      setRestLeft((s) => {
        if (s <= 1 && restTimer.current) clearInterval(restTimer.current);
        return Math.max(0, s - 1);
      });
    }, 1000);
  };

  const toggleSet = (exId: string, setIndex: number) => {
    const target = exercises.find((ex) => ex.id === exId);
    if (target && !target.sets[setIndex].done) startRest(target.restSec);
    setExercises((prev) =>
      prev.map((ex) =>
        ex.id === exId
          ? { ...ex, sets: ex.sets.map((s, i) => (i === setIndex ? { ...s, done: !s.done } : s)) }
          : ex,
      ),
    );
  };

  const updateSetValue = (exId: string, setIndex: number, field: 'reps' | 'weight', value: string) => {
    const num = Number(value.replace(/[^0-9]/g, '')) || 0;
    setExercises((prev) =>
      prev.map((ex) =>
        ex.id === exId ? { ...ex, sets: ex.sets.map((s, i) => (i === setIndex ? { ...s, [field]: num } : s)) } : ex,
      ),
    );
  };

  const replaceExercise = (exId: string) => {
    setExercises((prev) =>
      prev.map((ex) => {
        if (ex.id !== exId || ex.alternates.length === 0) return ex;
        const [next, ...rest] = ex.alternates;
        return { ...ex, name: next, alternates: [...rest, ex.name], sets: ex.sets.map((s) => ({ ...s, done: false })) };
      }),
    );
  };

  const setNotes = (exId: string, notes: string) => {
    setExercises((prev) => prev.map((ex) => (ex.id === exId ? { ...ex, notes } : ex)));
  };

  const totalSets = exercises.reduce((n, ex) => n + ex.sets.length, 0);
  const doneSets = exercises.reduce((n, ex) => n + ex.sets.filter((s) => s.done).length, 0);

  const finish = () => {
    const completed = exercises
      .map((ex) => ({ name: ex.name, sets: ex.sets.filter((s) => s.done).map((s) => ({ reps: s.reps, weight: s.weight })) }))
      .filter((ex) => ex.sets.length > 0);
    dispatch({ type: 'LOG_WORKOUT_SESSION', dayFocus: today.focus, exercises: completed });
    router.back();
  };

  if (today.isRest || template.length === 0) {
    return (
      <View style={[styles.root, styles.restRoot, { paddingTop: insets.top + Spacing.md }]}>
        <Pressable onPress={() => router.back()} hitSlop={12} style={styles.closeRest}>
          <Ionicons name="close" size={26} color={Colors.textSecondary} />
        </Pressable>
        <Ionicons name="bed-outline" size={40} color={Colors.textMuted} />
        <Text style={[Type.heading, { marginTop: Spacing.md }]}>Today is {today.focus}</Text>
        <Text style={[Type.secondary, { textAlign: 'center', marginTop: Spacing.sm }]}>
          No lifting session scheduled — recovery is part of the program too.
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.root, { paddingTop: insets.top + Spacing.md }]}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="close" size={26} color={Colors.textSecondary} />
        </Pressable>
        <View style={{ flex: 1 }}>
          <Text style={Type.heading}>{today.focus} Day</Text>
          <Text style={Type.small}>{today.muscles.join(' · ')}</Text>
        </View>
        <View style={styles.xpPill}>
          <Ionicons name="sparkles" size={13} color={Colors.xp} />
          <Text style={[Type.small, { color: Colors.xp }]}>+{XP_REWARDS.workout} XP</Text>
        </View>
      </View>

      <View style={{ paddingHorizontal: Spacing.lg, gap: 6 }}>
        <XPBar value={doneSets} max={totalSets} colors={[Colors.primary, Colors.cyan]} height={8} glow={false} />
        <Text style={Type.small}>{doneSets} / {totalSets} sets complete</Text>
      </View>

      {/* Rest timer banner */}
      {restLeft > 0 ? (
        <View style={styles.restBanner}>
          <Ionicons name="timer-outline" size={18} color={Colors.flame} />
          <Text style={[Type.body, { fontWeight: '800', color: Colors.flame }]}>
            Rest {Math.floor(restLeft / 60)}:{String(restLeft % 60).padStart(2, '0')}
          </Text>
          <Pressable onPress={() => setRestLeft(0)}>
            <Text style={[Type.small, { color: Colors.textSecondary }]}>Skip</Text>
          </Pressable>
        </View>
      ) : null}

      <ScrollView
        contentContainerStyle={{ padding: Spacing.lg, gap: Spacing.md, paddingBottom: 140 }}
        showsVerticalScrollIndicator={false}>
        {exercises.map((ex) => {
          const lastWeight = lastWeightFor(ex.name, state.workoutHistory);
          const topWeightToday = Math.max(0, ...ex.sets.map((s) => s.weight));
          return (
            <Card key={ex.id} style={{ gap: Spacing.md }}>
              <View style={styles.exHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={[Type.body, { fontWeight: '800', fontSize: 16 }]}>{ex.name}</Text>
                  <Text style={Type.small}>
                    {ex.sets.length} sets · rest {ex.restSec}s
                  </Text>
                  {lastWeight != null ? (
                    <Text style={[Type.small, { marginTop: 1 }]}>
                      Last session {lastWeight} lb
                      {topWeightToday > lastWeight ? (
                        <Text style={{ color: Colors.success }}>{'  '}▲ +{topWeightToday - lastWeight} lb today</Text>
                      ) : null}
                    </Text>
                  ) : null}
                </View>
                <Pressable onPress={() => replaceExercise(ex.id)} style={styles.replaceBtn} hitSlop={8}>
                  <Ionicons name="swap-horizontal" size={16} color={Colors.primary} />
                  <Text style={[Type.small, { color: Colors.primary }]}>Replace</Text>
                </Pressable>
              </View>

              {ex.sets.map((s, i) => (
                <View key={i} style={[styles.setRow, s.done && styles.setRowDone]}>
                  <Text style={[Type.small, styles.setNum]}>SET {i + 1}</Text>
                  <TextInput
                    style={styles.setInput}
                    value={String(s.reps)}
                    onChangeText={(v) => updateSetValue(ex.id, i, 'reps', v)}
                    keyboardType="number-pad"
                  />
                  <Text style={Type.small}>reps</Text>
                  <TextInput
                    style={styles.setInput}
                    value={String(s.weight)}
                    onChangeText={(v) => updateSetValue(ex.id, i, 'weight', v)}
                    keyboardType="number-pad"
                  />
                  <Text style={Type.small}>lb</Text>
                  <View style={{ flex: 1 }} />
                  <Pressable onPress={() => toggleSet(ex.id, i)} style={[styles.setCheck, s.done && styles.setCheckDone]}>
                    {s.done ? <Ionicons name="checkmark" size={14} color="#06131D" /> : null}
                  </Pressable>
                </View>
              ))}

              <TextInput
                style={styles.notes}
                placeholder="Notes — how did it feel?"
                placeholderTextColor={Colors.textMuted}
                value={ex.notes}
                onChangeText={(t) => setNotes(ex.id, t)}
              />
            </Card>
          );
        })}
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + Spacing.md }]}>
        <PillButton
          label={
            doneSets === 0
              ? 'Complete a set to finish'
              : doneSets === totalSets
                ? 'Finish Workout · Claim XP'
                : `Finish Workout (${doneSets}/${totalSets} sets)`
          }
          icon={doneSets === 0 ? 'lock-closed' : 'checkmark-circle'}
          disabled={doneSets === 0}
          onPress={finish}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bg },
  restRoot: { alignItems: 'center', justifyContent: 'center', paddingHorizontal: Spacing.xxl },
  closeRest: { position: 'absolute', top: Spacing.md, left: Spacing.lg },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  xpPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.xpSoft,
    borderRadius: Radius.full,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  restBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.md,
    backgroundColor: Colors.flameSoft,
    borderWidth: 1,
    borderColor: 'rgba(255, 158, 87, 0.4)',
    borderRadius: Radius.md,
    paddingVertical: 10,
    paddingHorizontal: Spacing.lg,
  },
  exHeader: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  replaceBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.primarySoft,
    borderRadius: Radius.full,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  setRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.bgElevated,
    borderRadius: Radius.sm,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: 8,
    paddingHorizontal: Spacing.md,
  },
  setRowDone: {
    borderColor: 'rgba(74, 222, 156, 0.35)',
    backgroundColor: 'rgba(74, 222, 156, 0.07)',
  },
  setNum: { width: 44 },
  setInput: {
    width: 44,
    textAlign: 'center',
    color: Colors.text,
    fontSize: 14,
    fontWeight: '700',
    backgroundColor: Colors.bg,
    borderRadius: Radius.sm,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: 4,
  },
  setCheck: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: Colors.borderStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  setCheckDone: { backgroundColor: Colors.success, borderColor: Colors.success },
  notes: {
    backgroundColor: Colors.bgElevated,
    borderRadius: Radius.sm,
    borderWidth: 1,
    borderColor: Colors.border,
    color: Colors.text,
    paddingVertical: 10,
    paddingHorizontal: Spacing.md,
    fontSize: 14,
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    backgroundColor: Colors.overlay,
  },
});
