import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Card } from '@/components/ui/card';
import { ScalePress } from '@/components/ui/motion';
import { IconBubble, SectionHeader, StatRow } from '@/components/ui/misc';
import { ProgressRing } from '@/components/ui/progress-ring';
import { Screen } from '@/components/ui/screen';
import { XPBar } from '@/components/ui/xp-bar';
import { Colors, Radius, Shadow, Spacing, Type } from '@/constants/theme';
import { ACHIEVEMENTS } from '@/lib/data';
import { RANKS, nextRank, rankForLevel, xpForLevel } from '@/lib/game';
import { LEGACY_CATEGORY_COLOR, latestChange, titlesFor, TRAIT_SOURCES } from '@/lib/identity';
import type { StatKey } from '@/lib/types';
import { useApp, useBadges } from '@/state/app-context';

const STAT_COLORS: Record<StatKey, string> = {
  Strength: Colors.primary,
  Discipline: Colors.success,
  Endurance: Colors.flame,
  Focus: Colors.cyan,
  Knowledge: Colors.purple,
  Confidence: Colors.xp,
  Wisdom: Colors.pink,
};

export default function CharacterScreen() {
  const { state } = useApp();
  const badges = useBadges();
  const rank = rankForLevel(state.level);
  const next = nextRank(state.level);
  const xpMax = xpForLevel(state.level);
  const initials = state.profile.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
  const titles = titlesFor(state);
  const recentLegacy = [...state.legacy].reverse().slice(0, 3);

  return (
    <Screen
      title="Character"
      subtitle="The record of who you're becoming."
      right={
        <Pressable
          onPress={() => router.push('/profile')}
          accessibilityRole="button"
          accessibilityLabel="Profile and settings"
          hitSlop={10}
          style={styles.gearBtn}>
          <Ionicons name="settings-outline" size={20} color={Colors.textSecondary} />
        </Pressable>
      }>
      {/* Hero card */}
      <Card style={{ overflow: 'hidden', alignItems: 'center', gap: Spacing.md }}>
        <LinearGradient colors={['rgba(167, 139, 250, 0.12)', 'rgba(17, 26, 43, 0)']} style={StyleSheet.absoluteFill} />
        <ProgressRing size={128} strokeWidth={7} progress={state.xp / xpMax} color={Colors.xp}>
          <View style={[styles.avatar, Shadow.glow(Colors.purple, 18, 0.4)]}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
        </ProgressRing>

        <View style={{ alignItems: 'center', gap: 2 }}>
          <Text style={Type.title}>{state.profile.name}</Text>
          <View style={styles.titlePill}>
            <Text style={[Type.small, { color: Colors.purple, fontWeight: '700' }]}>“{titles[0].name}”</Text>
          </View>
          <Text style={[Type.secondary, { fontWeight: '700', marginTop: 4 }]}>
            Level {state.level} · <Text style={{ color: Colors.xp }}>{rank}</Text>
          </Text>
          <Text style={Type.small}>
            {state.xp.toLocaleString()} / {xpMax.toLocaleString()} XP
            {next ? ` · ${next.rank} at level ${next.atLevel}` : ' · Max rank'}
          </Text>
          <Text style={[Type.small, { fontSize: 11 }]}>On the path since {state.legacy[0]?.date ?? 'day one'}</Text>
        </View>
        <View style={{ alignSelf: 'stretch' }}>
          <XPBar value={state.xp} max={xpMax} />
        </View>
      </Card>

      {/* Legacy — the reason this screen exists */}
      <SectionHeader
        title="Legacy"
        right={
          <Pressable onPress={() => router.push('/legacy')} hitSlop={8} accessibilityRole="button" accessibilityLabel="View full legacy">
            <Text style={[Type.small, { color: Colors.primary }]}>View all {state.legacy.length} →</Text>
          </Pressable>
        }
      />
      <ScalePress onPress={() => router.push('/legacy')} accessibilityLabel="Open legacy timeline" haptic={false}>
        <Card style={{ gap: Spacing.md }}>
          {recentLegacy.map((e) => (
            <View key={e.id} style={styles.legacyRow}>
              <IconBubble icon={e.icon} color={LEGACY_CATEGORY_COLOR[e.category]} size={34} />
              <View style={{ flex: 1 }}>
                <Text style={[Type.body, { fontWeight: '700' }]}>{e.title}</Text>
                <Text style={Type.small}>{e.date}</Text>
              </View>
            </View>
          ))}
          <Text style={[Type.small, { fontSize: 11 }]}>Permanent record · nothing here can ever be lost</Text>
        </Card>
      </ScalePress>

      {/* Rank ladder */}
      <SectionHeader title="Rank ladder" />
      <Card>
        <View style={styles.rankRow}>
          {RANKS.map((r) => {
            const active = r === rank;
            return (
              <View key={r} style={[styles.rankPill, active && styles.rankPillActive]}>
                <Text style={[Type.small, active && { color: Colors.xp }]}>{r}</Text>
              </View>
            );
          })}
        </View>
      </Card>

      {/* Habits entry — habits live under You now */}
      <SectionHeader title="Habits" />
      <ScalePress onPress={() => router.push('/habits')} accessibilityLabel="Open habits">
        <Card style={styles.habitsLink}>
          <IconBubble icon="checkmark-done" color={Colors.purple} size={38} />
          <View style={{ flex: 1 }}>
            <Text style={Type.cardTitle}>Daily habits</Text>
            <Text style={[Type.small, { marginTop: 2 }]}>
              {state.habits.filter((h) => h.doneToday).length} of {state.habits.length} done today ·{' '}
              {Math.max(...state.habits.map((h) => h.streak))}-day best streak
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
        </Card>
      </ScalePress>

      {/* Traits — earned, never edited */}
      <SectionHeader title="Traits" />
      <Card style={{ gap: Spacing.md }}>
        <Text style={Type.small}>
          Traits are earned through sustained action — capped daily, impossible to grind, never editable.
        </Text>
        {(Object.keys(state.stats) as StatKey[]).map((k) => {
          const change = latestChange(state.traitLog, k);
          return (
            <StatRow
              key={k}
              label={k}
              value={state.stats[k]}
              color={STAT_COLORS[k]}
              note={change ? `Last gain: ${change.reason.toLowerCase()}` : TRAIT_SOURCES[k]}
            />
          );
        })}
      </Card>

      {/* Next unlock — anticipation beats reflection */}
      {state.currentStreak < 30 ? (
        <Card style={styles.nextUnlock}>
          <IconBubble icon="flame" color={Colors.flame} size={38} />
          <View style={{ flex: 1 }}>
            <Text style={[Type.label, { color: Colors.flame }]}>Next unlock</Text>
            <Text style={[Type.cardTitle, { marginTop: 2 }]}>30-Day Streak badge</Text>
            <Text style={[Type.small, { marginTop: 2 }]}>
              {30 - state.currentStreak} {30 - state.currentStreak === 1 ? 'day' : 'days'} away — protect the streak and it's yours.
            </Text>
          </View>
        </Card>
      ) : null}

      {/* Badges */}
      <SectionHeader title="Badges" />
      <View style={styles.badgeGrid}>
        {badges.map((b) => (
          <Card key={b.id} style={[styles.badgeCard, !b.earned && { opacity: 0.45 }]}>
            <IconBubble icon={b.icon} color={b.color} size={44} />
            <Text style={[Type.small, { color: Colors.text, textAlign: 'center' }]}>{b.title}</Text>
            <Text style={[Type.small, { fontSize: 10, textAlign: 'center' }]}>
              {b.earned ? 'Earned' : b.description}
            </Text>
          </Card>
        ))}
      </View>

      {/* Achievements */}
      <SectionHeader title="Achievements" />
      <Card style={{ gap: Spacing.md }}>
        {ACHIEVEMENTS.map((a) => (
          <View key={a.title} style={styles.achieveRow}>
            <IconBubble icon={a.icon} color={Colors.xp} size={34} />
            <View style={{ flex: 1 }}>
              <Text style={[Type.body, { fontWeight: '700' }]}>{a.title}</Text>
              <Text style={Type.small}>{a.detail}</Text>
            </View>
            <Ionicons name="checkmark-circle" size={18} color={Colors.success} />
          </View>
        ))}
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: Colors.purpleSoft,
    borderWidth: 1,
    borderColor: 'rgba(167, 139, 250, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: Colors.purple, fontSize: 32, fontWeight: '900' },
  rankRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  rankPill: {
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  rankPillActive: {
    borderColor: 'rgba(247, 201, 72, 0.5)',
    backgroundColor: Colors.xpSoft,
  },
  badgeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  badgeCard: {
    flexBasis: '30%',
    flexGrow: 1,
    alignItems: 'center',
    gap: 6,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
  },
  achieveRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  gearBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.card,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  habitsLink: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  legacyRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  titlePill: {
    marginTop: 6,
    backgroundColor: Colors.purpleSoft,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: 'rgba(167, 139, 250, 0.3)',
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  nextUnlock: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginTop: Spacing.md,
    borderColor: 'rgba(255, 158, 87, 0.3)',
  },
});
