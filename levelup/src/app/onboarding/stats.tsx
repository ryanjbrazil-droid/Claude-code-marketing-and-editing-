import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { OnboardingShell } from '@/components/onboarding-shell';
import { Chip } from '@/components/ui/misc';
import { Colors, Radius, Spacing, Type } from '@/constants/theme';
import type { TrainingExperience } from '@/lib/types';
import { onboardingDraft, patchDraft } from '@/state/onboarding-draft';

const EXPERIENCE: TrainingExperience[] = ['Beginner', 'Intermediate', 'Advanced'];

function Field({
  label,
  value,
  onChange,
  suffix,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  suffix: string;
}) {
  return (
    <View style={styles.field}>
      <Text style={Type.label}>{label}</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChange}
          keyboardType="numeric"
          placeholderTextColor={Colors.textMuted}
          maxLength={5}
        />
        <Text style={Type.secondary}>{suffix}</Text>
      </View>
    </View>
  );
}

export default function StatsScreen() {
  const [name, setName] = useState(onboardingDraft.name);
  const [age, setAge] = useState(String(onboardingDraft.age));
  const [height, setHeight] = useState(String(onboardingDraft.heightIn));
  const [weight, setWeight] = useState(String(onboardingDraft.weightLb));
  const [goalWeight, setGoalWeight] = useState(String(onboardingDraft.goalWeightLb));
  const [experience, setExperience] = useState<TrainingExperience>('Intermediate');

  return (
    <OnboardingShell
      step={3}
      title="Your starting stats"
      subtitle="Every hero has a level 1. This is yours."
      onNext={() => {
        patchDraft({
          name: name.trim() || 'Player',
          age: parseInt(age, 10) || 25,
          heightIn: parseFloat(height) || 70,
          weightLb: parseFloat(weight) || 180,
          goalWeightLb: parseFloat(goalWeight) || 175,
          experience,
        });
        router.push('/onboarding/lifestyle');
      }}>
      <View style={styles.field}>
        <Text style={Type.label}>Name</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Your name"
            placeholderTextColor={Colors.textMuted}
          />
        </View>
      </View>

      <View style={styles.grid}>
        <Field label="Age" value={age} onChange={setAge} suffix="yrs" />
        <Field label="Height" value={height} onChange={setHeight} suffix="in" />
      </View>
      <View style={styles.grid}>
        <Field label="Weight" value={weight} onChange={setWeight} suffix="lb" />
        <Field label="Goal weight" value={goalWeight} onChange={setGoalWeight} suffix="lb" />
      </View>

      <Text style={[Type.label, { marginTop: Spacing.md }]}>Training experience</Text>
      <View style={styles.chips}>
        {EXPERIENCE.map((e) => (
          <Chip key={e} label={e} selected={experience === e} onPress={() => setExperience(e)} />
        ))}
      </View>
    </OnboardingShell>
  );
}

const styles = StyleSheet.create({
  field: { flex: 1, gap: Spacing.sm },
  grid: { flexDirection: 'row', gap: Spacing.md },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.card,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.lg,
  },
  input: {
    flex: 1,
    color: Colors.text,
    fontSize: 17,
    fontWeight: '700',
    paddingVertical: 14,
  },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
});
