import { DEFAULT_PROFILE } from '@/lib/data';
import type { UserProfile } from '@/lib/types';

/**
 * Mutable draft the onboarding screens write into before the profile is
 * committed to app state on the final screen. Kept dead simple for the MVP.
 */
export let onboardingDraft: UserProfile = { ...DEFAULT_PROFILE };

export function patchDraft(patch: Partial<UserProfile>) {
  onboardingDraft = { ...onboardingDraft, ...patch };
}

export function resetDraft() {
  onboardingDraft = { ...DEFAULT_PROFILE };
}
