import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';

import { Card } from '@/components/ui/card';
import { SectionHeader, SettingRow } from '@/components/ui/misc';
import { PillButton } from '@/components/ui/pill-button';
import { Screen } from '@/components/ui/screen';
import { Colors, Radius, Spacing, Type } from '@/constants/theme';
import { rankForLevel } from '@/lib/game';
import { useApp } from '@/state/app-context';

function formatHeight(inches: number) {
  return `${Math.floor(inches / 12)}'${Math.round(inches % 12)}"`;
}

export default function ProfileScreen() {
  const { state, dispatch } = useApp();
  const p = state.profile;
  const [remindQuests, setRemindQuests] = useState(true);
  const [remindStreak, setRemindStreak] = useState(true);
  const [remindCoach, setRemindCoach] = useState(false);

  return (
    <Screen title="Profile" back>
      {/* Identity */}
      <Card style={styles.identity}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{p.name.slice(0, 1).toUpperCase()}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={Type.heading}>{p.name}</Text>
          <Text style={Type.small}>
            Level {state.level} · {rankForLevel(state.level)} · {state.currentStreak}-day streak
          </Text>
        </View>
      </Card>

      {/* Body & goal */}
      <SectionHeader title="Body & goal" />
      <Card>
        <SettingRow icon="calendar" color={Colors.primary} label="Age" value={`${p.age}`} />
        <SettingRow icon="resize" color={Colors.cyan} label="Height" value={formatHeight(p.heightIn)} />
        <SettingRow icon="scale" color={Colors.success} label="Weight" value={`${p.weightLb} lb`} />
        <SettingRow icon="flag" color={Colors.xp} label="Goal weight" value={`${p.goalWeightLb} lb`} />
        <SettingRow icon="rocket" color={Colors.purple} label="Goal type" value={p.goal} />
        <SettingRow icon="fitness" color={Colors.flame} label="Fitness level" value={p.experience} />
        <SettingRow icon="barbell" color={Colors.primary} label="Equipment" value={p.equipment} />
      </Card>

      {/* Coach */}
      <SectionHeader title="Coach" />
      <Card>
        <SettingRow
          icon="chatbubbles"
          color={Colors.purple}
          label="Coach personality"
          value={p.coachPersonality}
          onPress={() => router.push('/coach')}
        />
      </Card>

      {/* Notifications */}
      <SectionHeader title="Notifications" />
      <Card>
        <SettingRow
          icon="notifications"
          color={Colors.primary}
          label="Quest reminders"
          right={<Switch value={remindQuests} onValueChange={setRemindQuests} trackColor={{ true: Colors.primaryDeep }} />}
        />
        <SettingRow
          icon="flame"
          color={Colors.flame}
          label="Streak protection alerts"
          right={<Switch value={remindStreak} onValueChange={setRemindStreak} trackColor={{ true: Colors.primaryDeep }} />}
        />
        <SettingRow
          icon="sparkles"
          color={Colors.purple}
          label="Daily coach check-in"
          right={<Switch value={remindCoach} onValueChange={setRemindCoach} trackColor={{ true: Colors.primaryDeep }} />}
        />
      </Card>

      {/* Subscription */}
      <SectionHeader title="Subscription" />
      <Card style={styles.proCard}>
        <View style={styles.proHeader}>
          <Ionicons name="diamond" size={20} color={Colors.xp} />
          <Text style={[Type.heading, { color: Colors.xp }]}>LevelUp Pro</Text>
          <View style={styles.trialPill}>
            <Text style={[Type.small, { color: Colors.xp }]}>Trial · 5 days left</Text>
          </View>
        </View>
        <Text style={[Type.secondary, { lineHeight: 20 }]}>
          A coach that remembers everything, a plan that adapts to you, and protection for the record you're building.
        </Text>
        <PillButton label="Manage Plan" variant="secondary" onPress={() => {}} />
      </Card>

      {/* Integrations & privacy */}
      <SectionHeader title="Integrations & privacy" />
      <Card>
        <SettingRow icon="heart" color={Colors.pink} label="Apple Health" value="Coming soon" />
        <SettingRow icon="watch" color={Colors.cyan} label="Wearables" value="Coming soon" />
        <SettingRow icon="lock-closed" color={Colors.success} label="Privacy settings" onPress={() => {}} />
      </Card>

      <PillButton
        label="Log Out"
        icon="log-out"
        variant="secondary"
        onPress={() => dispatch({ type: 'LOGOUT' })}
      />
      <Text style={[Type.small, { textAlign: 'center' }]}>Your record stays on this device.</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  identity: { flexDirection: 'row', alignItems: 'center', gap: Spacing.lg },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primarySoft,
    borderWidth: 1,
    borderColor: 'rgba(76, 184, 255, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: Colors.primary, fontSize: 24, fontWeight: '900' },
  proCard: {
    gap: Spacing.md,
    borderColor: 'rgba(247, 201, 72, 0.35)',
    backgroundColor: 'rgba(247, 201, 72, 0.05)',
  },
  proHeader: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  trialPill: {
    marginLeft: 'auto',
    backgroundColor: Colors.xpSoft,
    borderRadius: Radius.full,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
});
