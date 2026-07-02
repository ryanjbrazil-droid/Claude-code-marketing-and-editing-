/**
 * Core game math: levels, ranks, streaks, readiness.
 * Pure functions so a real backend can reuse or replace them later.
 */

/** XP required to clear a given level (level 12 -> 1,200 XP). */
export function xpForLevel(level: number): number {
  return level * 100;
}

/** Apply earned XP to (level, xp), rolling over level-ups. */
export function applyXp(level: number, xp: number, earned: number): { level: number; xp: number; leveledUp: boolean } {
  let l = level;
  let x = xp + earned;
  let leveledUp = false;
  while (x >= xpForLevel(l)) {
    x -= xpForLevel(l);
    l += 1;
    leveledUp = true;
  }
  while (x < 0 && l > 1) {
    l -= 1;
    x += xpForLevel(l);
  }
  return { level: l, xp: Math.max(0, x), leveledUp };
}

export const RANKS = [
  'Beginner',
  'Iron',
  'Bronze',
  'Silver',
  'Gold',
  'Platinum',
  'Diamond',
  'Elite',
  'Legendary',
] as const;

export type Rank = (typeof RANKS)[number];

const RANK_FLOORS: [Rank, number][] = [
  ['Legendary', 75],
  ['Elite', 50],
  ['Diamond', 40],
  ['Platinum', 30],
  ['Gold', 20],
  ['Silver', 15],
  ['Bronze', 10],
  ['Iron', 5],
  ['Beginner', 1],
];

export function rankForLevel(level: number): Rank {
  for (const [rank, floor] of RANK_FLOORS) {
    if (level >= floor) return rank;
  }
  return 'Beginner';
}

/** Next rank and the level it unlocks at, or null at max rank. */
export function nextRank(level: number): { rank: Rank; atLevel: number } | null {
  for (let i = RANK_FLOORS.length - 1; i >= 0; i--) {
    const [rank, floor] = RANK_FLOORS[i];
    if (level < floor) return { rank, atLevel: floor };
  }
  return null;
}

/** A day counts toward the streak when >= 70% of daily quests are complete. */
export const STREAK_THRESHOLD = 0.7;

export function dayIsComplete(doneCount: number, totalCount: number): boolean {
  if (totalCount === 0) return false;
  return doneCount / totalCount >= STREAK_THRESHOLD;
}

// ---------- Readiness ----------

export interface ReadinessInputs {
  sleepHours: number; // last night
  hoursSinceLastWorkout: number;
  stress: 'Low' | 'Moderate' | 'High';
  stepsYesterday: number;
  nutritionConsistency: number; // 0..1, last 3 days vs targets
}

export interface Readiness {
  score: number; // 0..100
  status: string;
  factors: { label: string; value: string; good: boolean }[];
}

export function computeReadiness(i: ReadinessInputs): Readiness {
  const sleepScore = Math.min(1, i.sleepHours / 8);
  const recoveryScore = Math.min(1, i.hoursSinceLastWorkout / 24);
  const stressScore = i.stress === 'Low' ? 1 : i.stress === 'Moderate' ? 0.7 : 0.4;
  const stepsScore = Math.min(1, i.stepsYesterday / 8000);
  const nutritionScore = i.nutritionConsistency;

  const score = Math.round(
    (sleepScore * 0.3 + recoveryScore * 0.2 + stressScore * 0.2 + stepsScore * 0.15 + nutritionScore * 0.15) * 100,
  );

  const status =
    score >= 80
      ? 'Ready to train hard'
      : score >= 60
        ? 'Ready — keep intensity moderate'
        : score >= 40
          ? 'Take it lighter today'
          : 'Prioritize recovery';

  return {
    score,
    status,
    factors: [
      { label: 'Sleep', value: `${i.sleepHours.toFixed(1)} hrs`, good: sleepScore >= 0.85 },
      { label: 'Recovery', value: `${Math.round(i.hoursSinceLastWorkout)}h since last session`, good: recoveryScore >= 0.7 },
      { label: 'Stress', value: i.stress, good: i.stress !== 'High' },
      { label: 'Steps', value: `${i.stepsYesterday.toLocaleString()} yesterday`, good: stepsScore >= 0.8 },
      { label: 'Nutrition', value: `${Math.round(i.nutritionConsistency * 100)}% consistent`, good: nutritionScore >= 0.7 },
    ],
  };
}

// ---------- XP reward table (single source of truth) ----------

export const XP_REWARDS = {
  workout: 350,
  protein: 250,
  water: 150,
  steps: 200,
  reading: 100,
  meditation: 100,
  sleep: 300,
  journaling: 100,
  perfectWeek: 1000,
} as const;
