import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Card } from '@/components/ui/card';
import { IconBubble, SectionHeader } from '@/components/ui/misc';
import { Screen } from '@/components/ui/screen';
import { Colors, Radius, Spacing, Type } from '@/constants/theme';
import type { Habit, HabitDifficulty } from '@/lib/types';
import { useApp } from '@/state/app-context';

const DIFFICULTY_COLOR: Record<HabitDifficulty, string> = {
  Easy: Colors.success,
  Medium: Colors.xp,
  Hard: Colors.danger,
};

const DAY_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

function HabitCard({ habit, onComplete }: { habit: Habit; onComplete: () => void }) {
  return (
    <Card style={{ gap: Spacing.md }}>
      <View style={styles.top}>
        <IconBubble icon={habit.icon} color={habit.color} size={40} />
        <View style={{ flex: 1 }}>
          <Text style={[Type.body, { fontWeight: '700' }]}>{habit.title}</Text>
          <View style={styles.metaRow}>
            <Ionicons name="flame" size={13} color={Colors.flame} />
            <Text style={[Type.small, { color: Colors.flame }]}>{habit.streak}</Text>
            <Text style={Type.small}>·</Text>
            <Text style={[Type.small, { color: DIFFICULTY_COLOR[habit.difficulty] }]}>{habit.difficulty}</Text>
            <Text style={Type.small}>·</Text>
            <Text style={[Type.small, { color: Colors.xp }]}>+{habit.xp} XP</Text>
          </View>
        </View>
        <Pressable
          onPress={onComplete}
          disabled={habit.doneToday}
          style={[styles.completeBtn, habit.doneToday && styles.completeBtnDone]}>
          {habit.doneToday ? (
            <Ionicons name="checkmark" size={18} color="#06131D" />
          ) : (
            <Text style={[Type.small, { color: Colors.primary }]}>Do it</Text>
          )}
        </Pressable>
      </View>

      <View style={styles.week}>
        {habit.week.map((done, i) => (
          <View key={i} style={styles.dayCol}>
            <View style={[styles.dayDot, done && { backgroundColor: habit.color, borderColor: habit.color }]} />
            <Text style={Type.small}>{DAY_LABELS[i]}</Text>
          </View>
        ))}
      </View>
    </Card>
  );
}

export default function HabitsScreen() {
  const { state, dispatch } = useApp();
  const doneCount = state.habits.filter((h) => h.doneToday).length;
  const bestStreak = Math.max(...state.habits.map((h) => h.streak));

  return (
    <Screen title="Habits" back>
      <View style={styles.statsRow}>
        <Card style={styles.statCard}>
          <Text style={Type.stat}>{doneCount}/{state.habits.length}</Text>
          <Text style={Type.small}>Done today</Text>
        </Card>
        <Card style={styles.statCard}>
          <Text style={[Type.stat, { color: Colors.flame }]}>{bestStreak}</Text>
          <Text style={Type.small}>Best habit streak</Text>
        </Card>
        <Card style={styles.statCard}>
          <Text style={[Type.stat, { color: Colors.xp }]}>
            +{state.habits.filter((h) => !h.doneToday).reduce((s, h) => s + h.xp, 0)}
          </Text>
          <Text style={Type.small}>XP available</Text>
        </Card>
      </View>

      <SectionHeader title="Daily habits" />
      <View style={{ gap: Spacing.sm }}>
        {state.habits.map((h) => (
          <HabitCard key={h.id} habit={h} onComplete={() => dispatch({ type: 'COMPLETE_HABIT', id: h.id })} />
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  top: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 3 },
  completeBtn: {
    minWidth: 64,
    height: 40,
    borderRadius: Radius.full,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    backgroundColor: Colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  completeBtnDone: {
    backgroundColor: Colors.success,
    borderColor: Colors.success,
  },
  week: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 4 },
  dayCol: { alignItems: 'center', gap: 4 },
  dayDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: Colors.borderStrong,
    backgroundColor: 'transparent',
  },
  statsRow: { flexDirection: 'row', gap: Spacing.sm },
  statCard: { flex: 1, alignItems: 'center', gap: 2, paddingVertical: Spacing.md, paddingHorizontal: Spacing.sm },
});
