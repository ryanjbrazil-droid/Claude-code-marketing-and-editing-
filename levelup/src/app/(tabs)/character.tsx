import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Card } from '@/components/ui/card';
import { IconBubble, SectionHeader, StatRow } from '@/components/ui/misc';
import { ProgressRing } from '@/components/ui/progress-ring';
import { Screen } from '@/components/ui/screen';
import { XPBar } from '@/components/ui/xp-bar';
import { Colors, Radius, Shadow, Spacing, Type } from '@/constants/theme';
import { ACHIEVEMENTS } from '@/lib/data';
import { RANKS, nextRank, rankForLevel, xpForLevel } from '@/lib/game';
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

  return (
    <Screen title="Character" subtitle="The player you're building in real life.">
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
          <Text style={[Type.secondary, { fontWeight: '700' }]}>
            Level {state.level} · <Text style={{ color: Colors.xp }}>Rank: {rank}</Text>
          </Text>
          <Text style={Type.small}>
            {state.xp.toLocaleString()} / {xpMax.toLocaleString()} XP
            {next ? ` · ${next.rank} at level ${next.atLevel}` : ' · Max rank'}
          </Text>
        </View>
        <View style={{ alignSelf: 'stretch' }}>
          <XPBar value={state.xp} max={xpMax} />
        </View>
      </Card>

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

      {/* Stats */}
      <SectionHeader title="Character stats" />
      <Card style={{ gap: Spacing.md }}>
        {(Object.keys(state.stats) as StatKey[]).map((k) => (
          <StatRow key={k} label={k} value={state.stats[k]} color={STAT_COLORS[k]} />
        ))}
      </Card>

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
});
