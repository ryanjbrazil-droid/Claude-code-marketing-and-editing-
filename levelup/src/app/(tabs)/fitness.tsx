import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Card } from '@/components/ui/card';
import { IconBubble, SectionHeader, Segmented } from '@/components/ui/misc';
import { PillButton } from '@/components/ui/pill-button';
import { Screen } from '@/components/ui/screen';
import { XPBar } from '@/components/ui/xp-bar';
import { Colors, Radius, Spacing, Type } from '@/constants/theme';
import { MEASUREMENTS, PERSONAL_RECORDS, WEEKLY_SPLIT, WEIGHT_TREND } from '@/lib/data';
import { useApp, useReadiness } from '@/state/app-context';

const VIEWS = ['Plan', 'Progress'] as const;

function PlanView() {
  const { state } = useApp();
  const readiness = useReadiness();
  const todayIndex = (new Date().getDay() + 6) % 7; // Monday = 0

  return (
    <>
      <Card>
        <Text style={Type.label}>Current program</Text>
        <Text style={[Type.heading, { marginTop: 4 }]}>
          {state.profile.goal === 'Lose fat' ? 'Lean Engine · 5-Day Split' : 'Iron Foundation · 5-Day Split'}
        </Text>
        <Text style={[Type.secondary, { marginTop: 4 }]}>
          Week 3 of 8 · Built for {state.profile.equipment.toLowerCase()} · {state.profile.trainingDaysPerWeek} days/week
        </Text>
        <View style={{ marginTop: Spacing.md }}>
          <PillButton label="Start Today's Workout — Push Day" icon="barbell" onPress={() => router.push('/workout-session')} />
        </View>
      </Card>

      <Card style={styles.recoveryCard}>
        <IconBubble icon="pulse" color={Colors.success} size={38} />
        <View style={{ flex: 1 }}>
          <Text style={Type.label}>Recovery status</Text>
          <Text style={[Type.body, { fontWeight: '700', marginTop: 2 }]}>{readiness.status}</Text>
          <Text style={[Type.small, { marginTop: 2 }]}>
            Readiness {readiness.score}% — AI kept bench heavy and trimmed accessory volume.
          </Text>
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

      <SectionHeader title="AI recommendations" />
      <Card style={{ gap: Spacing.md }}>
        {[
          { icon: 'trending-up' as const, color: Colors.primary, text: 'Bench is trending up — add 5 lb to your top set this week.' },
          { icon: 'battery-half' as const, color: Colors.flame, text: 'Sleep dipped twice this week. Keep Saturday conditioning at zone 2.' },
          { icon: 'body' as const, color: Colors.purple, text: 'Rear delts are undertrained vs. pressing volume. Face pulls added to Pull day.' },
        ].map((r, i) => (
          <View key={i} style={styles.recRow}>
            <Ionicons name={r.icon} size={18} color={r.color} />
            <Text style={[Type.secondary, { flex: 1, lineHeight: 20 }]}>{r.text}</Text>
          </View>
        ))}
      </Card>
    </>
  );
}

function ProgressView() {
  const max = Math.max(...WEIGHT_TREND);
  const min = Math.min(...WEIGHT_TREND);

  return (
    <>
      <Card>
        <View style={styles.rowBetween}>
          <Text style={Type.label}>Body weight trend</Text>
          <Text style={[Type.small, { color: Colors.success }]}>-4.2 lb this month</Text>
        </View>
        <View style={styles.chart}>
          {WEIGHT_TREND.map((w, i) => {
            const h = 24 + ((w - min) / (max - min || 1)) * 76;
            return (
              <View key={i} style={styles.chartCol}>
                <View style={[styles.chartBar, { height: h }, i === WEIGHT_TREND.length - 1 && { backgroundColor: Colors.primary }]} />
              </View>
            );
          })}
        </View>
        <View style={styles.rowBetween}>
          <Text style={Type.small}>8 weeks ago · {max.toFixed(1)} lb</Text>
          <Text style={[Type.small, { color: Colors.text }]}>Now · {WEIGHT_TREND[WEIGHT_TREND.length - 1].toFixed(1)} lb</Text>
        </View>
      </Card>

      <SectionHeader title="Strength PRs" />
      <Card style={{ gap: Spacing.md }}>
        {PERSONAL_RECORDS.map((pr) => (
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

      <SectionHeader title="Workout consistency" />
      <Card>
        <View style={styles.rowBetween}>
          <Text style={[Type.body, { fontWeight: '700' }]}>4 of 5 sessions this week</Text>
          <Text style={[Type.small, { color: Colors.success }]}>92% this month</Text>
        </View>
        <View style={{ marginTop: Spacing.md }}>
          <XPBar value={4} max={5} colors={[Colors.primary, Colors.cyan]} />
        </View>
      </Card>

      <SectionHeader title="Measurements" />
      <View style={styles.measureGrid}>
        {MEASUREMENTS.map((m) => (
          <Card key={m.label} style={styles.measureCard}>
            <Text style={Type.label}>{m.label}</Text>
            <Text style={[Type.stat, { marginTop: 4 }]}>{m.value}</Text>
            <Text style={[Type.small, { color: m.change.startsWith('-') ? Colors.success : Colors.primary }]}>
              {m.change} in · 30 days
            </Text>
          </Card>
        ))}
      </View>

      <SectionHeader title="Progress photos" />
      <Card style={styles.photoCard}>
        <Ionicons name="camera-outline" size={30} color={Colors.textMuted} />
        <Text style={[Type.secondary, { textAlign: 'center' }]}>
          Progress photos coming soon — private, on-device comparisons.
        </Text>
      </Card>

      <SectionHeader title="Weekly summary" />
      <Card style={{ gap: 8 }}>
        {[
          'Volume up 6% vs last week',
          'Best set: Bench 190 lb × 6 (rep PR)',
          'Recovery days respected: 2 of 2',
        ].map((s, i) => (
          <View key={i} style={styles.recRow}>
            <Ionicons name="checkmark-circle" size={16} color={Colors.success} />
            <Text style={Type.secondary}>{s}</Text>
          </View>
        ))}
      </Card>
    </>
  );
}

export default function FitnessScreen() {
  const [view, setView] = useState<(typeof VIEWS)[number]>('Plan');
  return (
    <Screen title="Fitness" subtitle="Train with intent. Recover on purpose.">
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
  splitToday: { borderColor: 'rgba(56, 189, 248, 0.4)', backgroundColor: 'rgba(56, 189, 248, 0.06)' },
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
    backgroundColor: 'rgba(56, 189, 248, 0.35)',
  },
  prRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  measureGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  measureCard: { flexBasis: '47%', flexGrow: 1 },
  photoCard: { alignItems: 'center', gap: Spacing.sm, paddingVertical: Spacing.xxl },
});
