import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Card } from '@/components/ui/card';
import { PillButton } from '@/components/ui/pill-button';
import { XPBar } from '@/components/ui/xp-bar';
import { Colors, Radius, Spacing, Type } from '@/constants/theme';
import { TODAYS_WORKOUT } from '@/lib/data';
import { XP_REWARDS } from '@/lib/game';
import type { Exercise } from '@/lib/types';
import { useApp } from '@/state/app-context';

export default function WorkoutSessionScreen() {
  const insets = useSafeAreaInsets();
  const { dispatch } = useApp();
  const [exercises, setExercises] = useState<Exercise[]>(TODAYS_WORKOUT);
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
    dispatch({ type: 'FINISH_WORKOUT' });
    router.back();
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top + Spacing.md }]}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="close" size={26} color={Colors.textSecondary} />
        </Pressable>
        <View style={{ flex: 1 }}>
          <Text style={Type.heading}>Push Day</Text>
          <Text style={Type.small}>Chest · Shoulders · Triceps</Text>
        </View>
        <View style={styles.xpPill}>
          <Ionicons name="sparkles" size={13} color={Colors.xp} />
          <Text style={[Type.small, { color: Colors.xp }]}>+{XP_REWARDS.workout} XP</Text>
        </View>
      </View>

      <View style={{ paddingHorizontal: Spacing.lg, gap: 6 }}>
        <XPBar value={doneSets} max={totalSets} colors={[Colors.primary, Colors.cyan]} height={8} />
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
        {exercises.map((ex) => (
          <Card key={ex.id} style={{ gap: Spacing.md }}>
            <View style={styles.exHeader}>
              <View style={{ flex: 1 }}>
                <Text style={[Type.body, { fontWeight: '800', fontSize: 16 }]}>{ex.name}</Text>
                <Text style={Type.small}>
                  {ex.sets.length} sets × {ex.sets[0].reps} reps · rest {ex.restSec}s
                </Text>
              </View>
              <Pressable onPress={() => replaceExercise(ex.id)} style={styles.replaceBtn} hitSlop={8}>
                <Ionicons name="swap-horizontal" size={16} color={Colors.primary} />
                <Text style={[Type.small, { color: Colors.primary }]}>Replace</Text>
              </Pressable>
            </View>

            {ex.sets.map((s, i) => (
              <Pressable key={i} onPress={() => toggleSet(ex.id, i)} style={[styles.setRow, s.done && styles.setRowDone]}>
                <Text style={[Type.small, styles.setNum]}>SET {i + 1}</Text>
                <Text style={[Type.body, { fontWeight: '700' }]}>{s.reps} reps</Text>
                <Text style={Type.secondary}>{s.weight > 0 ? `${s.weight} lb` : 'bodyweight'}</Text>
                <View style={{ flex: 1 }} />
                <View style={[styles.setCheck, s.done && styles.setCheckDone]}>
                  {s.done ? <Ionicons name="checkmark" size={14} color="#06131D" /> : null}
                </View>
              </Pressable>
            ))}

            <TextInput
              style={styles.notes}
              placeholder="Notes — how did it feel?"
              placeholderTextColor={Colors.textMuted}
              value={ex.notes}
              onChangeText={(t) => setNotes(ex.id, t)}
            />
          </Card>
        ))}
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + Spacing.md }]}>
        <PillButton
          label={doneSets === totalSets ? 'Finish Workout · Claim XP' : `Finish Workout (${doneSets}/${totalSets} sets)`}
          icon="checkmark-circle"
          onPress={finish}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bg },
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
    gap: Spacing.md,
    backgroundColor: Colors.bgElevated,
    borderRadius: Radius.sm,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: 10,
    paddingHorizontal: Spacing.md,
  },
  setRowDone: {
    borderColor: 'rgba(74, 222, 156, 0.35)',
    backgroundColor: 'rgba(74, 222, 156, 0.07)',
  },
  setNum: { width: 44 },
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
