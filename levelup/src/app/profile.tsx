import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Alert, Linking, StyleSheet, Text, View } from 'react-native';

import { Card } from '@/components/ui/card';
import { SectionHeader, SettingRow } from '@/components/ui/misc';
import { PillButton } from '@/components/ui/pill-button';
import { Screen } from '@/components/ui/screen';
import { Colors, Radius, Spacing, Type } from '@/constants/theme';
import { rankForLevel } from '@/lib/game';
import { useApp } from '@/state/app-context';

const SUPPORT_EMAIL = 'ryanjbrazil@gmail.com';

function formatHeight(inches: number) {
  return `${Math.floor(inches / 12)}'${Math.round(inches % 12)}"`;
}

export default function ProfileScreen() {
  const { state, dispatch } = useApp();
  const p = state.profile;

  const confirmDeleteData = () => {
    Alert.alert(
      'Delete My Data',
      'This permanently erases your profile, quests, habits, meals, workouts, and Legacy from this device. This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete Everything', style: 'destructive', onPress: () => dispatch({ type: 'LOGOUT' }) },
      ],
    );
  };

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

      {/* Notifications — honest: not wired to a real push system yet */}
      <SectionHeader title="Notifications" />
      <Card>
        <Text style={[Type.secondary, { lineHeight: 20 }]}>
          Push notifications (quest reminders, streak alerts, daily coach check-ins) are coming in a future update.
        </Text>
      </Card>

      {/* Plan — honest: no payments are wired up yet */}
      <SectionHeader title="Plan" />
      <Card style={styles.proCard}>
        <View style={styles.proHeader}>
          <Ionicons name="diamond" size={20} color={Colors.xp} />
          <Text style={[Type.heading, { color: Colors.xp }]}>LevelUp Pro</Text>
          <View style={styles.soonPill}>
            <Text style={[Type.small, { color: Colors.textSecondary }]}>Coming soon</Text>
          </View>
        </View>
        <Text style={[Type.secondary, { lineHeight: 20 }]}>
          Everything in LevelUp is free to use right now. A Pro plan with expanded coaching is planned for a future update.
        </Text>
      </Card>

      {/* Legal & privacy */}
      <SectionHeader title="Legal & privacy" />
      <Card>
        <SettingRow icon="lock-closed" color={Colors.success} label="Privacy Policy" onPress={() => router.push('/legal/privacy')} />
        <SettingRow icon="document-text" color={Colors.primary} label="Terms of Use" onPress={() => router.push('/legal/terms')} />
        <SettingRow icon="medkit" color={Colors.danger} label="Health Disclaimer" onPress={() => router.push('/legal/health')} />
        <SettingRow icon="sparkles" color={Colors.purple} label="AI Coach Disclaimer" onPress={() => router.push('/legal/ai-coach')} />
      </Card>

      {/* Integrations */}
      <SectionHeader title="Integrations" />
      <Card>
        <SettingRow icon="heart" color={Colors.pink} label="Apple Health" value="Coming soon" />
        <SettingRow icon="watch" color={Colors.cyan} label="Wearables" value="Coming soon" />
      </Card>

      {/* Data */}
      <SectionHeader title="Your data" />
      <Card style={{ gap: Spacing.sm }}>
        <Text style={[Type.secondary, { lineHeight: 20 }]}>
          Everything you see in LevelUp lives only on this device — there's no account and no server copy of your data.
        </Text>
        <PillButton
          label="Contact support"
          icon="mail-outline"
          variant="ghost"
          onPress={() => Linking.openURL(`mailto:${SUPPORT_EMAIL}?subject=LevelUp support`)}
        />
        <PillButton label="Delete My Data" icon="trash-outline" variant="secondary" onPress={confirmDeleteData} />
      </Card>

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
  soonPill: {
    marginLeft: 'auto',
    backgroundColor: Colors.card,
    borderRadius: Radius.full,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
});
