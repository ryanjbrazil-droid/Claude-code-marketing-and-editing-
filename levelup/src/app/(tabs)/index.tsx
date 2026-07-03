import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Card } from '@/components/ui/card';
import { FadeSlideIn, ScalePress } from '@/components/ui/motion';
import { IconBubble, SectionHeader } from '@/components/ui/misc';
import { ProgressRing } from '@/components/ui/progress-ring';
import { QuestCard } from '@/components/ui/quest-card';
import { Screen } from '@/components/ui/screen';
import { XPBar } from '@/components/ui/xp-bar';
import { Colors, Radius, Spacing, Type } from '@/constants/theme';
import { todayFocus } from '@/lib/coach';
import { rankForLevel, xpForLevel } from '@/lib/game';
import type { IconName } from '@/lib/types';
import { useApp, useReadiness } from '@/state/app-context';

function greetingForHour() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 18) return 'Good afternoon';
  return 'Good evening';
}

function QuickAction({ icon, label, color, onPress }: { icon: IconName; label: string; color: string; onPress: () => void }) {
  return (
    <ScalePress onPress={onPress} accessibilityLabel={label} style={styles.quickAction}>
      <IconBubble icon={icon} color={color} size={40} />
      <Text style={[Type.small, { color: Colors.textSecondary, textAlign: 'center' }]} numberOfLines={1}>
        {label}
      </Text>
    </ScalePress>
  );
}

export default function TodayScreen() {
  const { state, dispatch } = useApp();
  const readiness = useReadiness();

  const questsDone = state.quests.filter((q) => q.done).length;
  const questPct = questsDone / state.quests.length;
  const nextQuest = [...state.quests].filter((q) => !q.done).sort((a, b) => b.xp - a.xp)[0];
  const xpMax = xpForLevel(state.level);

  return (
    <Screen onRefresh={() => new Promise((r) => setTimeout(r, 700))}>
      {/* 1 — Who you are today: date, greeting, streak. */}
      <FadeSlideIn>
        <View style={styles.headerRow}>
          <View style={{ flex: 1 }}>
            <Text style={Type.label}>
              {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
            </Text>
            <Text style={[Type.title, { marginTop: 4 }]} numberOfLines={1}>
              {greetingForHour()}, {state.profile.name}
            </Text>
          </View>
        </View>
      </FadeSlideIn>

      {/* 2 — Identity: level, rank, XP. The anchor of the screen. */}
      <FadeSlideIn delay={40}>
        <Card style={{ overflow: 'hidden', padding: Spacing.xl }}>
          <LinearGradient
            colors={['rgba(76, 184, 255, 0.07)', 'rgba(20, 24, 33, 0)']}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.levelRow}>
            <ProgressRing size={72} strokeWidth={5} progress={state.xp / xpMax} color={Colors.xp}>
              <Text style={styles.levelNumber}>{state.level}</Text>
              <Text style={styles.levelCaption}>LEVEL</Text>
            </ProgressRing>
            <View style={{ flex: 1, gap: 8 }}>
              <View style={styles.levelTopRow}>
                <Text style={Type.heading}>{rankForLevel(state.level)}</Text>
                <Text style={styles.xpCount}>
                  {state.xp.toLocaleString()} <Text style={{ color: Colors.textMuted }}>/ {xpMax.toLocaleString()} XP</Text>
                </Text>
              </View>
              <XPBar value={state.xp} max={xpMax} height={8} />
              <Text style={Type.small}>
                {(xpMax - state.xp).toLocaleString()} XP to level {state.level + 1}
              </Text>
            </View>
          </View>
        </Card>
      </FadeSlideIn>

      {/* 3 — Today's condition: streak + readiness, side by side. */}
      <FadeSlideIn delay={80}>
        <View style={styles.twoUp}>
          <ScalePress onPress={() => router.push('/habits')} accessibilityLabel={`${state.currentStreak} day streak`} style={{ flex: 1 }}>
            <Card style={styles.tile}>
              <View style={styles.tileTop}>
                <Ionicons name="flame" size={16} color={Colors.flame} />
                <Text style={Type.label}>Streak</Text>
              </View>
              <Text style={[Type.stat, { marginTop: 6 }]}>
                {state.currentStreak}
                <Text style={styles.tileUnit}> days</Text>
              </Text>
              <Text style={[Type.small, { marginTop: 2 }]} numberOfLines={1}>
                {questPct >= 0.7 ? 'Secured for today' : 'Hit 70% of quests to protect it'}
              </Text>
            </Card>
          </ScalePress>

          <ScalePress onPress={() => router.push('/fitness')} accessibilityLabel={`Readiness ${readiness.score} percent`} style={{ flex: 1 }}>
            <Card style={styles.tile}>
              <View style={styles.tileTop}>
                <Ionicons name="pulse" size={16} color={Colors.success} />
                <Text style={Type.label}>Readiness</Text>
              </View>
              <Text style={[Type.stat, { marginTop: 6 }]}>
                {readiness.score}
                <Text style={styles.tileUnit}>%</Text>
              </Text>
              <Text style={[Type.small, { marginTop: 2 }]} numberOfLines={1}>
                {readiness.status}
              </Text>
            </Card>
          </ScalePress>
        </View>
      </FadeSlideIn>

      {/* 4 — The coach's one instruction for today. */}
      <FadeSlideIn delay={120}>
        <ScalePress onPress={() => router.push('/coach')} accessibilityLabel="Open coach" haptic={false}>
          <View style={styles.coachCard}>
            <View style={styles.coachAccent} />
            <View style={{ flex: 1, gap: 6 }}>
              <Text style={Type.label}>Coach · {state.profile.coachPersonality}</Text>
              <Text style={[Type.secondary, { color: Colors.text }]}>{todayFocus(state.profile.coachPersonality)}</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
          </View>
        </ScalePress>
      </FadeSlideIn>

      {/* 5 — Next best action: exactly one thing to do right now. */}
      {nextQuest ? (
        <FadeSlideIn delay={160}>
          <ScalePress
            accessibilityLabel={`Up next: ${nextQuest.title}, ${nextQuest.xp} XP`}
            onPress={() =>
              nextQuest.category === 'workout'
                ? router.push('/workout-session')
                : dispatch({ type: 'TOGGLE_QUEST', id: nextQuest.id })
            }>
            <View style={styles.nextAction}>
              <LinearGradient
                colors={['rgba(76, 184, 255, 0.14)', 'rgba(76, 184, 255, 0.04)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={StyleSheet.absoluteFill}
              />
              <View style={{ flex: 1 }}>
                <Text style={[Type.label, { color: Colors.primary }]}>Up next</Text>
                <Text style={[Type.heading, { marginTop: 4 }]}>{nextQuest.title}</Text>
                <Text style={[Type.small, { marginTop: 3 }]}>
                  Biggest XP on the board · <Text style={{ color: Colors.xp, fontWeight: '700' }}>+{nextQuest.xp} XP</Text>
                </Text>
              </View>
              <View style={styles.nextArrow}>
                <Ionicons name="arrow-forward" size={18} color="#06131D" />
              </View>
            </View>
          </ScalePress>
        </FadeSlideIn>
      ) : null}

      {/* 6 — The quest list. */}
      <FadeSlideIn delay={200}>
        <SectionHeader
          title="Today's quests"
          right={
            <Text style={[Type.small, questPct >= 0.7 && { color: Colors.success }]}>
              {questsDone} of {state.quests.length}
              {questPct >= 0.7 ? ' · streak safe' : ''}
            </Text>
          }
        />
        <View style={{ gap: Spacing.sm, marginTop: Spacing.sm }}>
          {state.quests.map((q) => (
            <QuestCard key={q.id} quest={q} onToggle={(id) => dispatch({ type: 'TOGGLE_QUEST', id })} />
          ))}
        </View>
      </FadeSlideIn>

      {/* 7 — Fast paths for the four most common logs. */}
      <FadeSlideIn delay={240}>
        <SectionHeader title="Quick log" />
        <View style={[styles.quickRow, { marginTop: Spacing.sm }]}>
          <QuickAction icon="barbell" label="Workout" color={Colors.primary} onPress={() => router.push('/workout-session')} />
          <QuickAction icon="restaurant" label="Meal" color={Colors.success} onPress={() => router.push('/nutrition')} />
          <QuickAction icon="water" label="Water" color={Colors.cyan} onPress={() => dispatch({ type: 'ADD_WATER', oz: 8 })} />
          <QuickAction icon="checkmark-done" label="Habit" color={Colors.purple} onPress={() => router.push('/habits')} />
        </View>
      </FadeSlideIn>
    </Screen>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: Spacing.xs,
  },
  levelRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.lg },
  levelNumber: { color: Colors.text, fontSize: 24, fontWeight: '800', fontVariant: ['tabular-nums'] },
  levelCaption: { color: Colors.textMuted, fontSize: 8, fontWeight: '700', letterSpacing: 1.2 },
  levelTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  xpCount: { fontSize: 13, fontWeight: '700', color: Colors.xp, fontVariant: ['tabular-nums'] },
  twoUp: { flexDirection: 'row', gap: Spacing.md },
  tile: { flex: 1, paddingVertical: Spacing.lg, minHeight: 104 },
  tileTop: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  tileUnit: { fontSize: 14, fontWeight: '600', color: Colors.textMuted },
  coachCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderStrong,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.lg,
  },
  coachAccent: {
    width: 3,
    alignSelf: 'stretch',
    borderRadius: 2,
    backgroundColor: Colors.purple,
  },
  nextAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: 'rgba(76, 184, 255, 0.35)',
    padding: Spacing.lg,
    overflow: 'hidden',
  },
  nextArrow: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickRow: { flexDirection: 'row', gap: Spacing.sm },
  quickAction: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.card,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderStrong,
    borderRadius: Radius.lg,
    paddingVertical: Spacing.lg,
    paddingHorizontal: 4,
    minHeight: 88,
  },
});
