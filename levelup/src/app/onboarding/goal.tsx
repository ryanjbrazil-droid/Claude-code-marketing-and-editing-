import { router } from 'expo-router';
import React, { useState } from 'react';

import { OnboardingShell } from '@/components/onboarding-shell';
import { OptionCard } from '@/components/option-card';
import { Colors } from '@/constants/theme';
import type { IconName, MainGoal } from '@/lib/types';
import { patchDraft } from '@/state/onboarding-draft';

const GOALS: { value: MainGoal; icon: IconName; color: string; description: string }[] = [
  { value: 'Lose fat', icon: 'flame', color: Colors.flame, description: 'Lean out while keeping muscle' },
  { value: 'Build muscle', icon: 'barbell', color: Colors.primary, description: 'Add size and strength' },
  { value: 'Get stronger', icon: 'trophy', color: Colors.xp, description: 'Chase bigger lifts and PRs' },
  { value: 'Improve discipline', icon: 'shield-checkmark', color: Colors.success, description: 'Build habits that stick' },
  { value: 'Become healthier', icon: 'heart', color: Colors.pink, description: 'Energy, sleep, and longevity' },
  { value: 'Full life transformation', icon: 'rocket', color: Colors.purple, description: 'All of it. Total rebuild.' },
];

export default function GoalScreen() {
  const [goal, setGoal] = useState<MainGoal | null>(null);
  return (
    <OnboardingShell
      step={2}
      title="What's your main goal?"
      subtitle="Your quests, plan, and coach are built around this."
      ctaDisabled={!goal}
      onNext={() => {
        if (goal) patchDraft({ goal });
        router.push('/onboarding/stats');
      }}>
      {GOALS.map((g) => (
        <OptionCard
          key={g.value}
          label={g.value}
          description={g.description}
          icon={g.icon}
          color={g.color}
          selected={goal === g.value}
          onPress={() => setGoal(g.value)}
        />
      ))}
    </OnboardingShell>
  );
}
