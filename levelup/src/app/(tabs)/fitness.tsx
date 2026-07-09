import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { LogMeasurementModal } from '@/components/fitness/log-measurement-modal';
import { LogWeightModal } from '@/components/fitness/log-weight-modal';
import { Card } from '@/components/ui/card';
import { EmptyState } from '@/components/ui/empty-state';
import { IconBubble, SectionHeader, Segmented } from '@/components/ui/misc';
import { PillButton } from '@/components/ui/pill-button';
import { Screen } from '@/components/ui/screen';
import { XPBar } from '@/components/ui/xp-bar';
import { Colors, Radius, Spacing, Type } from '@/constants/theme';
import { WEEKLY_SPLIT } from '@/lib/data';
import { useApp, useReadiness } from '@/state/app-context';

const VIEWS = ['Plan', 'Progress'] as const;
const PROGRAM_WEEKS = 8;

/** Real week number in the program, derived from when onboarding finished — never fabricated. */
function programWeek(programStartDate: string | null): number {
  if (!programStartDate) return 1;
  const start = new Date(programStartDate);
  const diffDays = Math.floor((Date.now() - start.getTime()) / (1000 * 60 * 60 * 24));
  return Math.min(PROGRAM_WEEKS, Math.max(1, Math.floor(diffDays / 7) + 1));
}

function PlanView() {
  const { state } = useApp();
  const readiness = useReadiness();
  const todayIndex = (new Date().getDay() + 6) % 7; // Monday = 0
  const today = WEEKLY_SPLIT[todayIndex];
  const week = programWeek(state.programStartDate);

  return (
    <>
      <Card>
        <Text style={Type.label}>Current program</Text>
        <Text style={[Type.heading, { marginTop: 4 }]}>
          {state.profile.goal === 'Lose fat' ? 'Lean Engine · 5-Day Split' : 'Iron Foundation · 5-Day Split'}
        </Text>
        <Text style={[Type.secondary, { marginTop: 4 }]}>
          Week {week} of {PROGRAM_WEEKS} · Built for {state.profile.equipment.toLowerCase()} · {state.profile.trainingDaysPerWeek} days/week
        </Text>
        <View style={{ marginTop: Spacing.md }}>
          <PillButton
            label={today.isRest ? `Today is a Rest Day — ${today.focus}` : `Start Today's Workout — ${today.focus} Day`}
            icon={today.isRest ? 'bed' : 'barbell'}
            variant={today.isRest ? 'secondary' : 'primary'}
            onPress={() => router.push('/workout-session')}
          />
        </View>
      </Card>

      <Card style={styles.recoveryCard}>
        <IconBubble icon="pulse" color={Colors.success} size={38} />
        <View style={{ flex: 1 }}>
          <Text style={Type.label}>Recovery status</Text>
          <Text style={[Type.body, { fontWeight: '700', marginTop: 2 }]}>{readiness.status}</Text>
          <Text style={[Type.small, { marginTop: 2 }]}>Readiness {readiness.score}%</Text>
        </View>
      </Card>

      <SectionHeader title="Weekly split" />
      <View style={{ gap: Spacing.sm }}>
        {WEEKLY_SPLIT.map((d, i) => (
          <View key={d.day} style={[styles.splitRow, i === todayIndex && styles.splitToday]}>
            <Text style={[Type.small, styles.splitDay, i === todayIndex && { color: Colors.primary }]}>
              {d.day.slice(0, 3).toUpperCase()}
            </Text>
            <View style={{ flex: 1 }}>
              <Text style={[Type.body, { fontWeight: '700' }, d.isRest && { color: Colors.textSecondary }]}>{d.focus}</Text>
              <Text style={Type.small}>{d.muscles.join(' · ')}</Text>
            </View>
            {i === todayIndex ? (
              <View style={styles.todayPill}>
                <Text style={[Type.small, { color: Colors.primary }]}>TODAY</Text>
              </View>
            ) : d.isRest ? (
              <Ionicons name="bed-outline" size={18} color={Colors.textMuted} />
            ) : (
              <Ionicons name="barbell-outline" size={18} color={Colors.textMuted} />
            )}
          </View>
        ))}
      </View>
    </>
  );
}

const DAY_MS = 24 * 60 * 60 * 1000;

function ProgressView() {
  const { state } = useApp();
  const [logWeightOpen, setLogWeightOpen] = useState(false);
  const [logMeasureOpen, setLogMeasureOpen] = useState(false);

  const weightLog = state.weightLog;
  const hasWeight = weightLog.length > 0;
  const weightValues = weightLog.map((w) => w.weightLb);
  const max = hasWeight ? Math.max(...weightValues) : 0;
  const min = hasWeight ? Math.min(...weightValues) : 0;
  const weightChange = weightLog.length >= 2 ? weightLog[weightLog.length - 1].weightLb - weightLog[0].weightLb : 0;

  const now = Date.now();
  const weekAgo = now - 7 * DAY_MS;
  const lastWeekStart = weekAgo - 7 * DAY_MS;
  const sessionsThisWeek = state.workoutHistory.filter((w) => new Date(w.date).getTime() >= weekAgo).length;
  const volumeThisWeek = state.workoutHistory
    .filter((w) => new Date(w.date).getTime() >= weekAgo)
    .reduce((s, w) => s + w.volume, 0);
  const volumeLastWeek = state.workoutHistory
    .filter((w) => {
      const t = new Date(w.date).getTime();
      return t >= lastWeekStart && t < weekAgo;
    })
    .reduce((s, w) => s + w.volume, 0);
  const volumeChangePct = volumeLastWeek > 0 ? Math.round(((volumeThisWeek - volumeLastWeek) / volumeLastWeek) * 100) : null;

  const latestByLabel = new Map<string, { value: string }>();
  const previousByLabel = new Map<string, string>();
  for (const m of state.measurementLog) {
    if (latestByLabel.has(m.label)) previousByLabel.set(m.label, latestByLabel.get(m.label)!.value);
    latestByLabel.set(m.label, { value: m.value });
  }

  return (
    <>
      <Card>
        <View style={styles.rowBetween}>
          <Text style={Type.label}>Body weight trend</Text>
          {weightLog.length >= 2 ? (
            <Text style={[Type.small, { color: weightChange <= 0 ? Colors.success : Colors.primary }]}>
              {weightChange > 0 ? '+' : ''}
              {weightChange.toFixed(1)} lb since you started
            </Text>
          ) : null}
        </View>
        {hasWeight ? (
          <>
            <View style={styles.chart}>
              {weightLog.map((w, i) => {
                const h = 24 + ((w.weightLb - min) / (max - min || 1)) * 76;
                return (
                  <View key={w.id} style={styles.chartCol}>
                    <View style={[styles.chartBar, { height: h }, i === weightLog.length - 1 && { backgroundColor: Colors.primary }]} />
                  </View>
                );
              })}
            </View>
            <View style={styles.rowBetween}>
              <Text style={Type.small}>First logged · {weightLog[0].weightLb.toFixed(1)} lb</Text>
              <Text style={[Type.small, { color: Colors.text }]}>Latest · {weightLog[weightLog.length - 1].weightLb.toFixed(1)} lb</Text>
            </View>
          </>
        ) : (
          <EmptyState icon="analytics-outline" message="No weigh-ins logged yet" hint="Log your weight to start the trend" />
        )}
        <PillButton
          label="Log weight"
          icon="add"
          variant="secondary"
          onPress={() => setLogWeightOpen(true)}
          style={{ marginTop: Spacing.md }}
        />
      </Card>

      <SectionHeader title="Strength PRs" />
      {state.personalRecords.length === 0 ? (
        <EmptyState icon="trophy-outline" message="No PRs yet" hint="Your first logged top set becomes your first PR" />
      ) : (
        <Card style={{ gap: Spacing.md }}>
          {state.personalRecords.map((pr) => (
            <View key={pr.lift} style={styles.prRow}>
              <IconBubble icon="trophy" color={Colors.xp} size={34} />
              <View style={{ flex: 1 }}>
                <Text style={[Type.body, { fontWeight: '700' }]}>{pr.lift}</Text>
                <Text style={Type.small}>{pr.date}</Text>
              </View>
              <Text style={[Type.stat, { fontSize: 18 }]}>
                {pr.weight} <Text style={Type.small}>lb × {pr.reps}</Text>
              </Text>
            </View>
          ))}
        </Card>
      )}

      <SectionHeader title="Workout consistency" />
      <Card>
        <View style={styles.rowBetween}>
          <Text style={[Type.body, { fontWeight: '700' }]}>
            {sessionsThisWeek} of {state.profile.trainingDaysPerWeek} sessions this week
          </Text>
          <Text style={[Type.small, { color: Colors.success }]}>{state.workoutHistory.length} lifetime</Text>
        </View>
        <View style={{ marginTop: Spacing.md }}>
          <XPBar value={sessionsThisWeek} max={state.profile.trainingDaysPerWeek} colors={[Colors.primary, Colors.cyan]} glow={false} />
        </View>
      </Card>

      <SectionHeader title="Measurements" />
      {latestByLabel.size === 0 ? (
        <EmptyState icon="resize-outline" message="No measurements logged yet" hint="Log your first to start tracking change" />
      ) : (
        <View style={styles.measureGrid}>
          {[...latestByLabel.entries()].map(([label, m]) => (
            <Card key={label} style={styles.measureCard}>
              <Text style={Type.label}>{label}</Text>
              <Text style={[Type.stat, { marginTop: 4 }]}>{m.value}</Text>
              {previousByLabel.has(label) ? (
                <Text style={Type.small}>was {previousByLabel.get(label)}</Text>
              ) : (
                <Text style={Type.small}>first log</Text>
              )}
            </Card>
          ))}
        </View>
      )}
      <PillButton label="Log measurement" icon="add" variant="secondary" onPress={() => setLogMeasureOpen(true)} />

      <SectionHeader title="Progress photos" />
      <Card style={styles.photoCard}>
        <Ionicons name="camera-outline" size={30} color={Colors.textMuted} />
        <Text style={[Type.secondary, { textAlign: 'center' }]}>
          Progress photos coming soon — private, on-device comparisons.
        </Text>
      </Card>

      <SectionHeader title="Weekly summary" />
      {state.workoutHistory.length === 0 ? (
        <EmptyState icon="barbell-outline" message="No workouts logged yet" hint="Complete a session to see your weekly summary" />
      ) : (
        <Card style={{ gap: 8 }}>
          <View style={styles.recRow}>
            <Ionicons name="checkmark-circle" size={16} color={Colors.success} />
            <Text style={Type.secondary}>
              {sessionsThisWeek} session{sessionsThisWeek === 1 ? '' : 's'} logged this week · {volumeThisWeek.toLocaleString()} lb total volume
            </Text>
          </View>
          {volumeChangePct !== null ? (
            <View style={styles.recRow}>
              <Ionicons name={volumeChangePct >= 0 ? 'trending-up' : 'trending-down'} size={16} color={volumeChangePct >= 0 ? Colors.success : Colors.flame} />
              <Text style={Type.secondary}>Volume {volumeChangePct >= 0 ? 'up' : 'down'} {Math.abs(volumeChangePct)}% vs last week</Text>
            </View>
          ) : null}
        </Card>
      )}

      <LogWeightModal visible={logWeightOpen} onClose={() => setLogWeightOpen(false)} />
      <LogMeasurementModal visible={logMeasureOpen} onClose={() => setLogMeasureOpen(false)} />
    </>
  );
}

export default function FitnessScreen() {
  const [view, setView] = useState<(typeof VIEWS)[number]>('Plan');
  return (
    <Screen title="Train">
      <Segmented options={VIEWS} value={view} onChange={setView} />
      {view === 'Plan' ? <PlanView /> : <ProgressView />}
    </Screen>
  );
}

const styles = StyleSheet.create({
  recoveryCard: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  splitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    backgroundColor: Colors.card,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
  },
  splitToday: { borderColor: 'rgba(76, 184, 255, 0.4)', backgroundColor: 'rgba(76, 184, 255, 0.06)' },
  splitDay: { width: 36 },
  todayPill: {
    backgroundColor: Colors.primarySoft,
    borderRadius: Radius.full,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  recRow: { flexDirection: 'row', gap: Spacing.sm, alignItems: 'flex-start' },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 6,
    height: 110,
    marginVertical: Spacing.md,
  },
  chartCol: { flex: 1, alignItems: 'center', justifyContent: 'flex-end' },
  chartBar: {
    width: '70%',
    borderRadius: 6,
    backgroundColor: 'rgba(76, 184, 255, 0.35)',
  },
  prRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  measureGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  measureCard: { flexBasis: '47%', flexGrow: 1 },
  photoCard: { alignItems: 'center', gap: Spacing.sm, paddingVertical: Spacing.xxl },
});
