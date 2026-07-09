import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Card } from '@/components/ui/card';
import { IconBubble, SectionHeader, Segmented } from '@/components/ui/misc';
import { PillButton } from '@/components/ui/pill-button';
import { Screen } from '@/components/ui/screen';
import { Colors, Radius, Spacing, Type } from '@/constants/theme';
import type { Habit, HabitDifficulty } from '@/lib/types';
import { useApp } from '@/state/app-context';

const DIFFICULTY_COLOR: Record<HabitDifficulty, string> = {
  Easy: Colors.success,
  Medium: Colors.xp,
  Hard: Colors.danger,
};

const DIFFICULTIES = ['Easy', 'Medium', 'Hard'] as const;
const DAY_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

function HabitCard({ habit, onComplete, onDelete }: { habit: Habit; onComplete: () => void; onDelete: () => void }) {
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
        <Pressable
          onPress={onDelete}
          accessibilityRole="button"
          accessibilityLabel={`Delete ${habit.title}`}
          hitSlop={8}
          style={styles.deleteBtn}>
          <Ionicons name="trash-outline" size={18} color={Colors.textMuted} />
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

function AddHabitModal({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const { dispatch } = useApp();
  const insets = useSafeAreaInsets();
  const [title, setTitle] = useState('');
  const [difficulty, setDifficulty] = useState<HabitDifficulty>('Easy');

  const submit = () => {
    const trimmed = title.trim();
    if (!trimmed) return;
    dispatch({ type: 'ADD_HABIT', title: trimmed, difficulty });
    setTitle('');
    setDifficulty('Easy');
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <View style={[styles.modalRoot, { paddingTop: insets.top + Spacing.lg }]}>
        <View style={styles.modalHeader}>
          <Text style={Type.title}>New habit</Text>
          <Pressable onPress={onClose} accessibilityRole="button" accessibilityLabel="Close" hitSlop={10} style={styles.closeBtn}>
            <Ionicons name="close" size={22} color={Colors.text} />
          </Pressable>
        </View>
        <View style={styles.modalBody}>
          <Text style={[Type.secondary, { marginBottom: Spacing.sm }]}>Name</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="e.g. Read before bed"
            placeholderTextColor={Colors.textMuted}
            autoFocus
            returnKeyType="done"
            onSubmitEditing={submit}
          />
          <Text style={[Type.secondary, { marginTop: Spacing.lg, marginBottom: Spacing.sm }]}>Difficulty</Text>
          <Segmented options={DIFFICULTIES} value={difficulty} onChange={setDifficulty} />
          <PillButton label="Add habit" icon="add" onPress={submit} disabled={!title.trim()} style={{ marginTop: Spacing.xl }} />
        </View>
      </View>
    </Modal>
  );
}

export default function HabitsScreen() {
  const { state, dispatch } = useApp();
  const [addOpen, setAddOpen] = useState(false);
  const doneCount = state.habits.filter((h) => h.doneToday).length;
  const bestStreak = state.habits.length ? Math.max(...state.habits.map((h) => h.streak)) : 0;

  return (
    <Screen
      title="Habits"
      back
      right={
        <Pressable onPress={() => setAddOpen(true)} style={styles.addBtn} hitSlop={8}>
          <Ionicons name="add" size={16} color={Colors.primary} />
          <Text style={[Type.small, { color: Colors.primary }]}>Add habit</Text>
        </Pressable>
      }>
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
          <HabitCard
            key={h.id}
            habit={h}
            onComplete={() => dispatch({ type: 'COMPLETE_HABIT', id: h.id })}
            onDelete={() => dispatch({ type: 'DELETE_HABIT', id: h.id })}
          />
        ))}
      </View>

      <AddHabitModal visible={addOpen} onClose={() => setAddOpen(false)} />
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
  deleteBtn: { width: 32, height: 40, alignItems: 'center', justifyContent: 'center' },
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
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: Colors.primarySoft,
    borderRadius: Radius.full,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  modalRoot: { flex: 1, backgroundColor: Colors.bg },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.gutter,
    marginBottom: Spacing.lg,
  },
  closeBtn: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
  modalBody: { paddingHorizontal: Spacing.gutter },
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
});
