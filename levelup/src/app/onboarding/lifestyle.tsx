import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { OnboardingShell } from '@/components/onboarding-shell';
import { Chip } from '@/components/ui/misc';
import { Spacing, Type } from '@/constants/theme';
import type { UserProfile } from '@/lib/types';
import { patchDraft } from '@/state/onboarding-draft';

const WORK = ['9–5 weekdays', 'Shift work', 'Nights', 'Flexible / remote', 'Student'];
const SLEEP = ['10:30 PM – 6:30 AM', '11 PM – 7 AM', 'Midnight – 8 AM', 'Irregular'];
const STRESS: UserProfile['stressLevel'][] = ['Low', 'Moderate', 'High'];
const ACTIVITY: UserProfile['activityLevel'][] = ['Sedentary', 'Lightly active', 'Active', 'Very active'];
const DAYS = [2, 3, 4, 5, 6];

function ChipGroup<T extends string | number>({
  label,
  options,
  value,
  onChange,
  format,
}: {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
  format?: (v: T) => string;
}) {
  return (
    <View style={{ gap: Spacing.sm }}>
      <Text style={Type.label}>{label}</Text>
      <View style={styles.chips}>
        {options.map((o) => (
          <Chip
            key={String(o)}
            label={format ? format(o) : String(o)}
            selected={value === o}
            onPress={() => onChange(o)}
          />
        ))}
      </View>
    </View>
  );
}

export default function LifestyleScreen() {
  const [work, setWork] = useState(WORK[0]);
  const [sleep, setSleep] = useState(SLEEP[0]);
  const [stress, setStress] = useState<UserProfile['stressLevel']>('Moderate');
  const [activity, setActivity] = useState<UserProfile['activityLevel']>('Active');
  const [days, setDays] = useState(5);

  return (
    <OnboardingShell
      step={4}
      title="Your lifestyle"
      subtitle="The plan fits your life — not the other way around."
      onNext={() => {
        patchDraft({
          workSchedule: work,
          sleepSchedule: sleep,
          stressLevel: stress,
          activityLevel: activity,
          trainingDaysPerWeek: days,
        });
        router.push('/onboarding/equipment');
      }}>
      <ChipGroup label="Work schedule" options={WORK} value={work} onChange={setWork} />
      <ChipGroup label="Sleep schedule" options={SLEEP} value={sleep} onChange={setSleep} />
      <ChipGroup label="Stress level" options={STRESS} value={stress} onChange={setStress} />
      <ChipGroup label="Activity level" options={ACTIVITY} value={activity} onChange={setActivity} />
      <ChipGroup
        label="Days available to train"
        options={DAYS}
        value={days}
        onChange={setDays}
        format={(d) => `${d} days`}
      />
    </OnboardingShell>
  );
}

const styles = StyleSheet.create({
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
});
