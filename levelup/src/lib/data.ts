import { Colors } from '@/constants/theme';
import { XP_REWARDS } from './game';
import type {
  BadgeItem,
  Exercise,
  Habit,
  LegacyEvent,
  LoggedMeal,
  MacroTargets,
  MacroTotals,
  PersonalRecord,
  Measurement,
  Quest,
  SplitDay,
  StatKey,
  SuggestedMeal,
  UserProfile,
} from './types';

// ---------- Default profile (overwritten by onboarding) ----------

export const DEFAULT_PROFILE: UserProfile = {
  name: 'Ryan',
  age: 28,
  heightIn: 71,
  weightLb: 192,
  goalWeightLb: 180,
  goal: 'Build muscle',
  experience: 'Intermediate',
  workSchedule: '9–5 weekdays',
  sleepSchedule: '10:30 PM – 6:30 AM',
  stressLevel: 'Moderate',
  activityLevel: 'Active',
  trainingDaysPerWeek: 5,
  equipment: 'Full gym',
  coachPersonality: 'Big brother',
};

// ---------- Daily quests ----------

export const DAILY_QUESTS: Quest[] = [
  {
    id: 'q-workout',
    title: 'Workout',
    xp: XP_REWARDS.workout,
    category: 'workout',
    icon: 'barbell',
    color: Colors.primary,
    done: false,
  },
  {
    id: 'q-protein',
    title: 'Hit protein goal',
    xp: XP_REWARDS.protein,
    category: 'nutrition',
    icon: 'restaurant',
    color: Colors.success,
    done: false,
    progress: 142,
    target: 190,
    unit: 'g',
  },
  {
    id: 'q-water',
    title: 'Drink 100 oz water',
    xp: XP_REWARDS.water,
    category: 'water',
    icon: 'water',
    color: Colors.cyan,
    done: false,
    progress: 72,
    target: 100,
    unit: 'oz',
  },
  {
    id: 'q-steps',
    title: 'Walk 10,000 steps',
    xp: XP_REWARDS.steps,
    category: 'steps',
    icon: 'footsteps',
    color: Colors.flame,
    done: false,
    progress: 6480,
    target: 10000,
    unit: '',
  },
  {
    id: 'q-reading',
    title: 'Read 10 pages',
    xp: XP_REWARDS.reading,
    category: 'reading',
    icon: 'book',
    color: Colors.purple,
    done: false,
  },
  {
    id: 'q-sleep',
    title: 'Sleep by 10:30 PM',
    xp: XP_REWARDS.sleep,
    category: 'sleep',
    icon: 'moon',
    color: Colors.pink,
    done: false,
  },
];

// ---------- Habits ----------

/**
 * Habits are deliberately distinct from daily quests — no action earns XP
 * twice. Quests cover the core loop (workout, protein, water, steps,
 * reading, sleep); habits cover everything else that builds the person.
 */
export const HABITS: Habit[] = [
  { id: 'h-meditation', title: 'Meditation', icon: 'leaf', color: Colors.success, xp: 100, difficulty: 'Easy', streak: 5, doneToday: false, week: [false, true, true, false, true, true, false] },
  { id: 'h-journaling', title: 'Journaling', icon: 'create', color: Colors.cyan, xp: 100, difficulty: 'Easy', streak: 8, doneToday: false, week: [true, true, true, false, true, true, false] },
  { id: 'h-wake', title: 'Wake up by 6:30 AM', icon: 'sunny', color: Colors.xp, xp: 150, difficulty: 'Medium', streak: 17, doneToday: true, week: [true, true, true, true, true, true, true] },
  { id: 'h-mobility', title: 'Stretch 10 minutes', icon: 'body', color: Colors.primary, xp: 100, difficulty: 'Easy', streak: 12, doneToday: false, week: [true, true, false, true, true, true, false] },
  { id: 'h-nojunk', title: 'No junk food', icon: 'close-circle', color: Colors.danger, xp: 200, difficulty: 'Hard', streak: 6, doneToday: false, week: [true, false, true, true, true, true, false] },
  { id: 'h-nophone', title: 'No phone in bed', icon: 'phone-portrait', color: Colors.pink, xp: 150, difficulty: 'Medium', streak: 3, doneToday: false, week: [false, false, true, true, false, true, false] },
  { id: 'h-coldshower', title: 'Cold shower finish', icon: 'snow', color: Colors.cyan, xp: 150, difficulty: 'Hard', streak: 9, doneToday: false, week: [true, true, true, false, true, true, false] },
  { id: 'h-plan', title: 'Plan tomorrow tonight', icon: 'calendar', color: Colors.flame, xp: 100, difficulty: 'Easy', streak: 21, doneToday: false, week: [true, true, true, true, true, true, false] },
  { id: 'h-budget', title: 'Budget check', icon: 'wallet', color: Colors.success, xp: 100, difficulty: 'Easy', streak: 4, doneToday: false, week: [false, true, false, true, true, true, false] },
  { id: 'h-learning', title: '30 min learning', icon: 'school', color: Colors.purple, xp: 150, difficulty: 'Medium', streak: 11, doneToday: false, week: [true, true, true, true, false, true, false] },
];

// ---------- Fitness ----------

export const WEEKLY_SPLIT: SplitDay[] = [
  { day: 'Monday', focus: 'Push', muscles: ['Chest', 'Shoulders', 'Triceps'], isRest: false },
  { day: 'Tuesday', focus: 'Pull', muscles: ['Back', 'Biceps', 'Rear delts'], isRest: false },
  { day: 'Wednesday', focus: 'Legs', muscles: ['Quads', 'Hamstrings', 'Calves'], isRest: false },
  { day: 'Thursday', focus: 'Rest', muscles: ['Full recovery'], isRest: true },
  { day: 'Friday', focus: 'Upper', muscles: ['Chest', 'Back', 'Arms'], isRest: false },
  { day: 'Saturday', focus: 'Conditioning', muscles: ['Cardio', 'Core'], isRest: false },
  { day: 'Sunday', focus: 'Recovery', muscles: ['Mobility', 'Walk'], isRest: true },
];

const set = (reps: number, weight: number) => ({ reps, weight, done: false });

export const TODAYS_WORKOUT: Exercise[] = [
  {
    id: 'ex-bench',
    name: 'Bench Press',
    sets: [set(8, 185), set(8, 185), set(8, 185), set(8, 185)],
    restSec: 150,
    notes: '',
    alternates: ['Dumbbell Bench Press', 'Machine Chest Press', 'Weighted Push-Up'],
  },
  {
    id: 'ex-incline',
    name: 'Incline Dumbbell Press',
    sets: [set(10, 65), set(10, 65), set(10, 65)],
    restSec: 120,
    notes: '',
    alternates: ['Incline Barbell Press', 'Incline Machine Press'],
  },
  {
    id: 'ex-fly',
    name: 'Cable Fly',
    sets: [set(12, 40), set(12, 40), set(12, 40)],
    restSec: 90,
    notes: '',
    alternates: ['Pec Deck', 'Dumbbell Fly'],
  },
  {
    id: 'ex-pushdown',
    name: 'Triceps Pushdown',
    sets: [set(12, 55), set(12, 55), set(12, 55)],
    restSec: 90,
    notes: '',
    alternates: ['Overhead Cable Extension', 'Skull Crusher'],
  },
  {
    id: 'ex-lateral',
    name: 'Lateral Raise',
    sets: [set(15, 20), set(15, 20), set(15, 20), set(15, 20)],
    restSec: 60,
    notes: '',
    alternates: ['Cable Lateral Raise', 'Machine Lateral Raise'],
  },
];

export const WEIGHT_TREND = [196.2, 195.4, 195.8, 194.6, 193.9, 193.2, 192.8, 192.0];

export const PERSONAL_RECORDS: PersonalRecord[] = [
  { lift: 'Bench Press', weight: 225, reps: 3, date: 'Jun 24' },
  { lift: 'Squat', weight: 315, reps: 2, date: 'Jun 18' },
  { lift: 'Deadlift', weight: 405, reps: 1, date: 'Jun 10' },
  { lift: 'Overhead Press', weight: 135, reps: 5, date: 'Jun 27' },
];

export const MEASUREMENTS: Measurement[] = [
  { label: 'Chest', value: '42.0 in', change: '+0.5' },
  { label: 'Waist', value: '33.5 in', change: '-1.0' },
  { label: 'Arms', value: '15.8 in', change: '+0.3' },
  { label: 'Thighs', value: '24.5 in', change: '+0.4' },
];

// ---------- Nutrition ----------

export const MACRO_TARGETS: MacroTargets = {
  calories: 2300,
  protein: 190,
  carbs: 240,
  fats: 75,
  waterOz: 100,
  fiber: 35,
};

export const MACRO_TOTALS: MacroTotals = {
  calories: 1850,
  protein: 142,
  carbs: 165,
  fats: 58,
  waterOz: 72,
  fiber: 24,
};

export const LOGGED_MEALS: LoggedMeal[] = [
  { id: 'm1', slot: 'Breakfast', name: 'Eggs, oats & berries', calories: 520, protein: 38, carbs: 55, fats: 16 },
  { id: 'm2', slot: 'Lunch', name: 'Chicken rice bowl', calories: 680, protein: 52, carbs: 70, fats: 18 },
  { id: 'm3', slot: 'Snacks', name: 'Greek yogurt + almonds', calories: 290, protein: 24, carbs: 18, fats: 14 },
  { id: 'm4', slot: 'Dinner', name: 'Salmon, potatoes & greens', calories: 360, protein: 28, carbs: 22, fats: 10 },
];

export const SUGGESTED_MEALS: SuggestedMeal[] = [
  { name: 'Ground turkey pasta', calories: 640, protein: 54, tag: 'High protein' },
  { name: 'Steak & sweet potato', calories: 720, protein: 58, tag: 'Bulk' },
  { name: 'Tuna wrap + fruit', calories: 430, protein: 38, tag: 'Cut' },
  { name: 'Egg & rice scramble', calories: 480, protein: 32, tag: 'Budget' },
  { name: 'Protein smoothie bowl', calories: 390, protein: 41, tag: 'Quick' },
  { name: 'Chicken thigh curry', calories: 610, protein: 46, tag: 'Budget' },
];

export const GROCERY_LIST = [
  'Chicken breast (3 lb)',
  'Ground turkey 93/7 (2 lb)',
  'Eggs (18)',
  'Greek yogurt (32 oz)',
  'Jasmine rice',
  'Oats',
  'Frozen berries',
  'Spinach',
  'Sweet potatoes',
  'Olive oil',
];

// ---------- Character ----------

export const DEFAULT_STATS: Record<StatKey, number> = {
  Strength: 34,
  Discipline: 41,
  Endurance: 29,
  Focus: 22,
  Knowledge: 18,
  Confidence: 31,
  Wisdom: 15,
};

/** Which character stats grow when a quest/habit in this category is completed. */
export const CATEGORY_STAT_GAINS: Record<string, StatKey[]> = {
  workout: ['Strength', 'Discipline'],
  nutrition: ['Discipline', 'Confidence'],
  water: ['Discipline'],
  steps: ['Endurance'],
  reading: ['Knowledge', 'Wisdom'],
  sleep: ['Focus', 'Discipline'],
  meditation: ['Focus', 'Wisdom'],
  journaling: ['Wisdom', 'Confidence'],
};

export const BADGES: BadgeItem[] = [
  { id: 'b1', title: '7-Day Streak', icon: 'flame', color: Colors.flame, earned: true, description: 'Complete 7 days in a row' },
  { id: 'b2', title: 'First PR', icon: 'trophy', color: Colors.xp, earned: true, description: 'Set your first personal record' },
  { id: 'b3', title: 'Early Riser', icon: 'sunny', color: Colors.xp, earned: true, description: 'Wake up on time 14 days straight' },
  { id: 'b4', title: 'Hydration Master', icon: 'water', color: Colors.cyan, earned: true, description: 'Hit water goal 21 days straight' },
  { id: 'b5', title: 'Iron Will', icon: 'shield', color: Colors.textSecondary, earned: true, description: 'Reach Iron rank' },
  { id: 'b6', title: 'Bookworm', icon: 'book', color: Colors.purple, earned: false, description: 'Read 500 pages total' },
  { id: 'b7', title: '30-Day Streak', icon: 'flame', color: Colors.flameDeep, earned: false, description: 'Complete 30 days in a row' },
  { id: 'b8', title: 'Centurion', icon: 'barbell', color: Colors.primary, earned: false, description: 'Complete 100 workouts' },
];

/**
 * Legacy seed — the permanent timeline this user has already written.
 * Real users start with only "Started Journey"; everything else is earned.
 */
export const LEGACY_SEED: LegacyEvent[] = [
  { id: 'l-origin', date: 'Apr 2, 2026', title: 'Started the Journey', detail: 'Day one. Chose "Build muscle" and never looked back.', icon: 'flag', category: 'origin' },
  { id: 'l-first-workout', date: 'Apr 3, 2026', title: 'First Workout Logged', detail: 'Push day. It all starts with one session.', icon: 'barbell', category: 'strength' },
  { id: 'l-streak-7', date: 'Apr 9, 2026', title: '7-Day Streak', detail: 'One full week without breaking the chain.', icon: 'flame', category: 'discipline' },
  { id: 'l-first-5', date: 'May 1, 2026', title: 'Lost First 5 Pounds', detail: '196.2 → 191.0. The scale finally moved.', icon: 'trending-down', category: 'body' },
  { id: 'l-workouts-50', date: 'Jun 8, 2026', title: '50 Workouts Completed', detail: 'Fifty sessions of showing up.', icon: 'trophy', category: 'strength' },
  { id: 'l-bench-225', date: 'Jun 24, 2026', title: 'Bench Press 225', detail: 'Two plates. A lifetime first.', icon: 'medal', category: 'strength' },
  { id: 'l-rank-bronze', date: 'Jun 28, 2026', title: 'Reached Bronze Rank', detail: 'Level 10 · the first rank earned, not given.', icon: 'shield', category: 'rank' },
];

export const ACHIEVEMENTS = [
  { title: '50 workouts completed', detail: 'Lifetime total', icon: 'barbell' as const },
  { title: '26-day streak (best)', detail: 'Longest run so far', icon: 'flame' as const },
  { title: '4.2 lb lost this month', detail: 'Trending toward goal', icon: 'trending-down' as const },
  { title: 'Protein goal hit 18x', detail: 'Last 30 days', icon: 'restaurant' as const },
];
