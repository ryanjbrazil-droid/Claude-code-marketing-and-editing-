import { router } from 'expo-router';
import React, { useState } from 'react';

import { OnboardingShell } from '@/components/onboarding-shell';
import { OptionCard } from '@/components/option-card';
import { Colors } from '@/constants/theme';
import type { Equipment, IconName } from '@/lib/types';
import { patchDraft } from '@/state/onboarding-draft';

const OPTIONS: { value: Equipment; icon: IconName; color: string; description: string }[] = [
  { value: 'Full gym', icon: 'business', color: Colors.primary, description: 'Commercial gym with everything' },
  { value: 'Home gym', icon: 'home', color: Colors.success, description: 'Rack, barbell, and bench at home' },
  { value: 'Dumbbells only', icon: 'barbell', color: Colors.xp, description: 'A set of dumbbells to work with' },
  { value: 'Bodyweight only', icon: 'body', color: Colors.purple, description: 'No weights — calisthenics style' },
  { value: 'No equipment', icon: 'walk', color: Colors.cyan, description: 'Start from zero. That works too.' },
];

export default function EquipmentScreen() {
  const [equipment, setEquipment] = useState<Equipment | null>(null);
  return (
    <OnboardingShell
      step={5}
      title="What can you train with?"
      subtitle="Your workouts adapt to the gear you have."
      ctaDisabled={!equipment}
      onNext={() => {
        if (equipment) patchDraft({ equipment });
        router.push('/onboarding/coach');
      }}>
      {OPTIONS.map((o) => (
        <OptionCard
          key={o.value}
          label={o.value}
          description={o.description}
          icon={o.icon}
          color={o.color}
          selected={equipment === o.value}
          onPress={() => setEquipment(o.value)}
        />
      ))}
    </OnboardingShell>
  );
}
