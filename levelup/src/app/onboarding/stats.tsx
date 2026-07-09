import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { OnboardingShell } from '@/components/onboarding-shell';
import { Chip } from '@/components/ui/misc';
import { Colors, Radius, Spacing, Type } from '@/constants/theme';
import type { TrainingExperience } from '@/lib/types';
import { onboardingDraft, patchDraft } from '@/state/onboarding-draft';

const EXPERIENCE: TrainingExperience[] = ['Beginner', 'Intermediate', 'Advanced'];

/** Reasonable human ranges — rejects negatives, zero, and obviously-mistyped values. */
const RANGES = {
  age: { min: 13, max: 100 },
  heightIn: { min: 48, max: 96 },
  weightLb: { min: 60, max: 600 },
  goalWeightLb: { min: 60, max: 600 },
} as const;

function parsedOrNull(value: string, range: { min: number; max: number }): number | null {
  const n = Number(value);
  if (!value.trim() || !Number.isFinite(n) || n < range.min || n > range.max) return null;
  return n;
}

function Field({
  label,
  value,
  onChange,
  suffix,
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  suffix: string;
  error?: string;
}) {
  return (
    <View style={styles.field}>
      <Text style={Type.label}>{label}</Text>
      <View style={[styles.inputRow, error && styles.inputRowError]}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={(v) => onChange(v.replace(/[^0-9.]/g, ''))}
          keyboardType="numeric"
          placeholderTextColor={Colors.textMuted}
          maxLength={5}
        />
        <Text style={Type.secondary}>{suffix}</Text>
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
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

  const parsedAge = parsedOrNull(age, RANGES.age);
  const parsedHeight = parsedOrNull(height, RANGES.heightIn);
  const parsedWeight = parsedOrNull(weight, RANGES.weightLb);
  const parsedGoalWeight = parsedOrNull(goalWeight, RANGES.goalWeightLb);
  const nameValid = name.trim().length > 0;
  const allValid = nameValid && parsedAge !== null && parsedHeight !== null && parsedWeight !== null && parsedGoalWeight !== null;

  return (
    <OnboardingShell
      step={3}
      title="Your starting stats"
      subtitle="Every hero has a level 1. This is yours."
      ctaDisabled={!allValid}
      onNext={() => {
        if (!allValid || parsedAge === null || parsedHeight === null || parsedWeight === null || parsedGoalWeight === null) return;
        patchDraft({
          name: name.trim(),
          age: parsedAge,
          heightIn: parsedHeight,
          weightLb: parsedWeight,
          goalWeightLb: parsedGoalWeight,
          experience,
        });
        router.push('/onboarding/lifestyle');
      }}>
      <View style={styles.field}>
        <Text style={Type.label}>Name</Text>
        <View style={[styles.inputRow, !nameValid && name.length > 0 && styles.inputRowError]}>
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
        <Field
          label="Age"
          value={age}
          onChange={setAge}
          suffix="yrs"
          error={age.length > 0 && parsedAge === null ? `${RANGES.age.min}–${RANGES.age.max}` : undefined}
        />
        <Field
          label="Height"
          value={height}
          onChange={setHeight}
          suffix="in"
          error={height.length > 0 && parsedHeight === null ? `${RANGES.heightIn.min}–${RANGES.heightIn.max}` : undefined}
        />
      </View>
      <View style={styles.grid}>
        <Field
          label="Weight"
          value={weight}
          onChange={setWeight}
          suffix="lb"
          error={weight.length > 0 && parsedWeight === null ? `${RANGES.weightLb.min}–${RANGES.weightLb.max}` : undefined}
        />
        <Field
          label="Goal weight"
          value={goalWeight}
          onChange={setGoalWeight}
          suffix="lb"
          error={goalWeight.length > 0 && parsedGoalWeight === null ? `${RANGES.goalWeightLb.min}–${RANGES.goalWeightLb.max}` : undefined}
        />
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
  inputRowError: { borderColor: Colors.danger },
  errorText: { color: Colors.danger, fontSize: 12 },
  input: {
    flex: 1,
    color: Colors.text,
    fontSize: 17,
    fontWeight: '700',
    paddingVertical: 14,
  },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
});
