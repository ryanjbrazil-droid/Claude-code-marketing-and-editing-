import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Card } from '@/components/ui/card';
import { IconBubble, SectionHeader, StreakFlame } from '@/components/ui/misc';
import { ProgressRing } from '@/components/ui/progress-ring';
import { QuestCard } from '@/components/ui/quest-card';
import { Screen } from '@/components/ui/screen';
import { XPBar } from '@/components/ui/xp-bar';
import { Colors, Radius, Spacing, Type } from '@/constants/theme';
import { todayFocus } from '@/lib/coach';
import { rankForLevel, xpForLevel } from '@/lib/game';
import type { IconName } from '@/lib/types';
import { useApp, useReadiness } from '@/state/app-context';

function QuickLog({ icon, label, color, onPress }: { icon: IconName; label: string; color: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.quickLog, pressed && { opacity: 0.75 }]}>
      <IconBubble icon={icon} color={color} size={44} />
      <Text style={[Type.small, { textAlign: 'center' }]}>{label}</Text>
    </Pressable>
  );
}

export default function TodayScreen() {
  const { state, dispatch } = useApp();
  const readiness = useReadiness();

  const questsDone = state.quests.filter((q) => q.done).length;
  const nextQuest = [...state.quests].filter((q) => !q.done).sort((a, b) => b.xp - a.xp)[0];
  const xpRemaining = state.quests.filter((q) => !q.done).reduce((sum, q) => sum + q.xp, 0);
  const xpMax = xpForLevel(state.level);

  return (
    <Screen>
      {/* Header: level + streak */}
      <View style={styles.headerRow}>
        <View>
          <Text style={Type.label}>{new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</Text>
          <Text style={[Type.title, { marginTop: 2 }]}>Good morning, {state.profile.name}</Text>
        </View>
        <StreakFlame days={state.currentStreak} compact />
      </View>

      {/* Level / XP hero card */}
      <Card style={{ overflow: 'hidden' }}>
        <LinearGradient
          colors={['rgba(56, 189, 248, 0.10)', 'rgba(17, 26, 43, 0)']}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.levelRow}>
          <View style={styles.levelBadge}>
            <Text style={styles.levelNumber}>{state.level}</Text>
            <Text style={styles.levelCaption}>LVL</Text>
          </View>
          <View style={{ flex: 1, gap: 6 }}>
            <View style={styles.levelTopRow}>
              <Text style={Type.heading}>Level {state.level} · {rankForLevel(state.level)}</Text>
              <Text style={[Type.small, { color: Colors.xp }]}>
                {state.xp.toLocaleString()} / {xpMax.toLocaleString()} XP
              </Text>
            </View>
            <XPBar value={state.xp} max={xpMax} />
            <Text style={Type.small}>
              {xpRemaining > 0
                ? `${xpRemaining.toLocaleString()} XP still on the board today`
                : 'Every quest cleared. Legendary day.'}
            </Text>
          </View>
        </View>
      </Card>

      {/* Readiness + streak detail */}
      <View style={styles.twoUp}>
        <Card style={styles.readinessCard}>
          <ProgressRing size={84} strokeWidth={8} progress={readiness.score / 100} color={Colors.success}>
            <Text style={[Type.stat, { fontSize: 20 }]}>{readiness.score}%</Text>
          </ProgressRing>
          <View style={{ flex: 1 }}>
            <Text style={Type.label}>Readiness</Text>
            <Text style={[Type.body, { fontWeight: '700', marginTop: 4 }]}>{readiness.status}</Text>
            <Text style={[Type.small, { marginTop: 4 }]}>Sleep 7.2h · Stress {state.profile.stressLevel.toLowerCase()}</Text>
          </View>
        </Card>
      </View>

      {/* Coach message */}
      <Card style={styles.coachCard}>
        <IconBubble icon="chatbubbles" color={Colors.purple} size={38} />
        <View style={{ flex: 1 }}>
          <Text style={Type.label}>Coach · {state.profile.coachPersonality}</Text>
          <Text style={[Type.secondary, { marginTop: 6, lineHeight: 21, color: Colors.text }]}>
            {todayFocus(state.profile.coachPersonality)}
          </Text>
          <Pressable onPress={() => router.push('/coach')} style={{ marginTop: 8 }}>
            <Text style={[Type.small, { color: Colors.primary }]}>Open coach →</Text>
          </Pressable>
        </View>
      </Card>

      {/* Next best action */}
      {nextQuest ? (
        <Pressable
          onPress={() =>
            nextQuest.category === 'workout' ? router.push('/workout-session') : dispatch({ type: 'TOGGLE_QUEST', id: nextQuest.id })
          }>
          <Card style={styles.nextAction}>
            <View style={{ flex: 1 }}>
              <Text style={[Type.label, { color: Colors.primary }]}>Next best action</Text>
              <Text style={[Type.heading, { marginTop: 4 }]}>{nextQuest.title}</Text>
              <Text style={[Type.small, { marginTop: 2, color: Colors.xp }]}>Biggest XP left on the board · +{nextQuest.xp} XP</Text>
            </View>
            <Ionicons name="arrow-forward-circle" size={38} color={Colors.primary} />
          </Card>
        </Pressable>
      ) : null}

      {/* Quests */}
      <SectionHeader
        title={`Today's Quests · ${questsDone}/${state.quests.length}`}
        right={<Text style={[Type.small, { color: questsDone / state.quests.length >= 0.7 ? Colors.success : Colors.textMuted }]}>
          {questsDone / state.quests.length >= 0.7 ? 'Streak secured' : '70% protects the streak'}
        </Text>}
      />
      <View style={{ gap: Spacing.sm }}>
        {state.quests.map((q) => (
          <QuestCard key={q.id} quest={q} onToggle={(id) => dispatch({ type: 'TOGGLE_QUEST', id })} />
        ))}
      </View>

      {/* Quick log */}
      <SectionHeader title="Quick log" />
      <View style={styles.quickRow}>
        <QuickLog icon="barbell" label="Log workout" color={Colors.primary} onPress={() => router.push('/workout-session')} />
        <QuickLog icon="restaurant" label="Log meal" color={Colors.success} onPress={() => router.push('/nutrition')} />
        <QuickLog icon="water" label="Add water" color={Colors.cyan} onPress={() => dispatch({ type: 'ADD_WATER', oz: 8 })} />
        <QuickLog icon="checkmark-done" label="Complete habit" color={Colors.purple} onPress={() => router.push('/habits')} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.xs,
  },
  levelRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.lg },
  levelBadge: {
    width: 60,
    height: 60,
    borderRadius: Radius.md,
    backgroundColor: Colors.xpSoft,
    borderWidth: 1,
    borderColor: 'rgba(250, 204, 21, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelNumber: { color: Colors.xp, fontSize: 24, fontWeight: '900' },
  levelCaption: { color: Colors.xp, fontSize: 9, fontWeight: '800', letterSpacing: 1 },
  levelTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  twoUp: { flexDirection: 'row', gap: Spacing.md },
  readinessCard: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: Spacing.lg },
  coachCard: { flexDirection: 'row', gap: Spacing.md, alignItems: 'flex-start' },
  nextAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    borderColor: 'rgba(56, 189, 248, 0.35)',
    backgroundColor: 'rgba(56, 189, 248, 0.07)',
  },
  quickRow: { flexDirection: 'row', gap: Spacing.sm },
  quickLog: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: 4,
  },
});
