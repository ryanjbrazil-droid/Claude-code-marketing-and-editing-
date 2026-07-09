import { Colors } from '@/constants/theme';
import type { Habit, LegacyCategory, StatKey, TraitChange } from './types';

/**
 * Identity Engine v1.
 *
 * Traits are earned, never edited. Every change carries a reason the user
 * can read, and daily caps make traits impossible to grind in a single
 * sitting — sustained behavior is the only path up.
 */

/** A single trait can move at most this much per day, no matter what. */
export const TRAIT_DAILY_CAP = 2;

/** What actually feeds each trait — shown to the user, verbatim. */
export const TRAIT_SOURCES: Record<StatKey, string> = {
  Strength: 'Completed workouts and strength PRs',
  Discipline: 'Showing up on the days you didn’t want to',
  Endurance: 'Steps, conditioning, and long sessions',
  Focus: 'Sleep kept on schedule and deep-work habits',
  Knowledge: 'Reading and deliberate learning',
  Confidence: 'Nutrition promises kept and goals hit',
  Wisdom: 'Reflection — journaling, meditation, planning',
};

export function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

/** How much a trait may still gain today given the change log. */
export function traitRoomToday(log: TraitChange[], trait: StatKey): number {
  const day = todayKey();
  const gainedToday = log
    .filter((c) => c.trait === trait && c.day === day && c.delta > 0)
    .reduce((sum, c) => sum + c.delta, 0);
  return Math.max(0, TRAIT_DAILY_CAP - gainedToday);
}

/** Most recent change for a trait, for the "why did this move" line. */
export function latestChange(log: TraitChange[], trait: StatKey): TraitChange | undefined {
  for (let i = log.length - 1; i >= 0; i--) {
    if (log[i].trait === trait) return log[i];
  }
  return undefined;
}

// ---------- Earned titles ----------

export interface Title {
  name: string;
  earnedBy: string;
}

/**
 * Titles are earned by sustained behavior, checked against real state.
 * The first match is the active title shown under the user's name.
 */
export function titlesFor(input: { currentStreak: number; longestStreak: number; level: number; habits: Habit[] }): Title[] {
  const titles: Title[] = [];
  if (input.currentStreak >= 21) {
    titles.push({ name: 'The Consistent', earnedBy: `${input.currentStreak}-day active streak` });
  }
  if (input.longestStreak >= 50) {
    titles.push({ name: 'Iron Willed', earnedBy: `${input.longestStreak}-day best streak` });
  }
  const earlyRiser = input.habits.find((h) => h.id === 'h-wake');
  if (earlyRiser && earlyRiser.streak >= 14) {
    titles.push({ name: 'Early Riser', earnedBy: `${earlyRiser.streak} straight on-time mornings` });
  }
  if (input.level >= 20) {
    titles.push({ name: 'Veteran', earnedBy: `Reached level ${input.level}` });
  }
  if (titles.length === 0) {
    titles.push({ name: 'The Beginning', earnedBy: 'Every legacy starts somewhere' });
  }
  return titles;
}

// ---------- Legacy presentation ----------

export const LEGACY_CATEGORY_COLOR: Record<LegacyCategory, string> = {
  origin: Colors.primary,
  body: Colors.success,
  strength: Colors.xp,
  discipline: Colors.flame,
  mind: Colors.purple,
  rank: Colors.xp,
};

/** Streak lengths that get written into the Legacy forever. */
export const LEGACY_STREAK_MILESTONES = [7, 30, 50, 100, 365];

export function formatLegacyDate(d: Date): string {
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}
