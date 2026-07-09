import { router } from 'expo-router';
import React, { useState } from 'react';

import { OnboardingShell } from '@/components/onboarding-shell';
import { OptionCard } from '@/components/option-card';
import { Colors } from '@/constants/theme';
import type { CoachPersonality, IconName } from '@/lib/types';
import { patchDraft } from '@/state/onboarding-draft';

const OPTIONS: { value: CoachPersonality; icon: IconName; color: string; description: string }[] = [
  { value: 'Supportive', icon: 'heart', color: Colors.pink, description: 'Encouraging, positive, always in your corner' },
  { value: 'Tough love', icon: 'flame', color: Colors.flame, description: 'Direct, blunt, zero excuses' },
  { value: 'Military', icon: 'shield', color: Colors.success, description: 'Orders, standards, execution' },
  { value: 'Big brother', icon: 'people', color: Colors.primary, description: 'Real talk from someone who wants you to win' },
  { value: 'Calm mentor', icon: 'leaf', color: Colors.purple, description: 'Measured wisdom, identity over hype' },
];

export default function CoachScreen() {
  const [personality, setPersonality] = useState<CoachPersonality | null>(null);
  return (
    <OnboardingShell
      step={6}
      title="Choose your coach"
      subtitle="Your AI coach adapts its voice to how you want to be pushed."
      ctaLabel="Build My Plan"
      ctaDisabled={!personality}
      onNext={() => {
        if (personality) patchDraft({ coachPersonality: personality });
        router.push('/onboarding/generating');
      }}>
      {OPTIONS.map((o) => (
        <OptionCard
          key={o.value}
          label={o.value}
          description={o.description}
          icon={o.icon}
          color={o.color}
          selected={personality === o.value}
          onPress={() => setPersonality(o.value)}
        />
      ))}
    </OnboardingShell>
  );
}
