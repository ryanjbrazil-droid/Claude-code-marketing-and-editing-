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
    progress: 0,
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
    progress: 0,
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
    progress: 0,
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
const FRESH_WEEK = [false, false, false, false, false, false, false];

export const HABITS: Habit[] = [
  { id: 'h-meditation', title: 'Meditation', icon: 'leaf', color: Colors.success, xp: 100, difficulty: 'Easy', streak: 0, doneToday: false, week: FRESH_WEEK },
  { id: 'h-journaling', title: 'Journaling', icon: 'create', color: Colors.cyan, xp: 100, difficulty: 'Easy', streak: 0, doneToday: false, week: FRESH_WEEK },
  { id: 'h-wake', title: 'Wake up by 6:30 AM', icon: 'sunny', color: Colors.xp, xp: 150, difficulty: 'Medium', streak: 0, doneToday: false, week: FRESH_WEEK },
  { id: 'h-mobility', title: 'Stretch 10 minutes', icon: 'body', color: Colors.primary, xp: 100, difficulty: 'Easy', streak: 0, doneToday: false, week: FRESH_WEEK },
  { id: 'h-nojunk', title: 'No junk food', icon: 'close-circle', color: Colors.danger, xp: 200, difficulty: 'Hard', streak: 0, doneToday: false, week: FRESH_WEEK },
  { id: 'h-nophone', title: 'No phone in bed', icon: 'phone-portrait', color: Colors.pink, xp: 150, difficulty: 'Medium', streak: 0, doneToday: false, week: FRESH_WEEK },
  { id: 'h-coldshower', title: 'Cold shower finish', icon: 'snow', color: Colors.cyan, xp: 150, difficulty: 'Hard', streak: 0, doneToday: false, week: FRESH_WEEK },
  { id: 'h-plan', title: 'Plan tomorrow tonight', icon: 'calendar', color: Colors.flame, xp: 100, difficulty: 'Easy', streak: 0, doneToday: false, week: FRESH_WEEK },
  { id: 'h-budget', title: 'Budget check', icon: 'wallet', color: Colors.success, xp: 100, difficulty: 'Easy', streak: 0, doneToday: false, week: FRESH_WEEK },
  { id: 'h-learning', title: '30 min learning', icon: 'school', color: Colors.purple, xp: 150, difficulty: 'Medium', streak: 0, doneToday: false, week: FRESH_WEEK },
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

/**
 * Starting-point templates per split focus — suggested sets/reps/weight for
 * a first session. Never claims a "last session"; that only appears once
 * there's real workout history to look up.
 */
export const WORKOUT_TEMPLATES: Record<string, Exercise[]> = {
  Push: [
    { id: 'ex-bench', name: 'Bench Press', sets: [set(8, 135), set(8, 135), set(8, 135), set(8, 135)], restSec: 150, notes: '', alternates: ['Dumbbell Bench Press', 'Machine Chest Press', 'Weighted Push-Up'] },
    { id: 'ex-incline', name: 'Incline Dumbbell Press', sets: [set(10, 40), set(10, 40), set(10, 40)], restSec: 120, notes: '', alternates: ['Incline Barbell Press', 'Incline Machine Press'] },
    { id: 'ex-fly', name: 'Cable Fly', sets: [set(12, 20), set(12, 20), set(12, 20)], restSec: 90, notes: '', alternates: ['Pec Deck', 'Dumbbell Fly'] },
    { id: 'ex-pushdown', name: 'Triceps Pushdown', sets: [set(12, 40), set(12, 40), set(12, 40)], restSec: 90, notes: '', alternates: ['Overhead Cable Extension', 'Skull Crusher'] },
    { id: 'ex-lateral', name: 'Lateral Raise', sets: [set(15, 10), set(15, 10), set(15, 10), set(15, 10)], restSec: 60, notes: '', alternates: ['Cable Lateral Raise', 'Machine Lateral Raise'] },
  ],
  Pull: [
    { id: 'ex-deadlift', name: 'Deadlift', sets: [set(5, 185), set(5, 185), set(5, 185)], restSec: 180, notes: '', alternates: ['Trap Bar Deadlift', 'Romanian Deadlift'] },
    { id: 'ex-latpulldown', name: 'Lat Pulldown', sets: [set(10, 100), set(10, 100), set(10, 100)], restSec: 120, notes: '', alternates: ['Pull-Up', 'Assisted Pull-Up'] },
    { id: 'ex-cablerow', name: 'Seated Cable Row', sets: [set(10, 100), set(10, 100), set(10, 100)], restSec: 90, notes: '', alternates: ['Barbell Row', 'Chest-Supported Row'] },
    { id: 'ex-facepull', name: 'Face Pull', sets: [set(15, 30), set(15, 30), set(15, 30)], restSec: 60, notes: '', alternates: ['Reverse Pec Deck', 'Band Pull-Apart'] },
    { id: 'ex-curl', name: 'Barbell Curl', sets: [set(10, 50), set(10, 50), set(10, 50)], restSec: 60, notes: '', alternates: ['Dumbbell Curl', 'Cable Curl'] },
  ],
  Legs: [
    { id: 'ex-squat', name: 'Back Squat', sets: [set(6, 185), set(6, 185), set(6, 185), set(6, 185)], restSec: 180, notes: '', alternates: ['Front Squat', 'Leg Press'] },
    { id: 'ex-legpress', name: 'Leg Press', sets: [set(10, 270), set(10, 270), set(10, 270)], restSec: 120, notes: '', alternates: ['Hack Squat', 'Goblet Squat'] },
    { id: 'ex-rdl', name: 'Romanian Deadlift', sets: [set(8, 135), set(8, 135), set(8, 135)], restSec: 120, notes: '', alternates: ['Leg Curl', 'Good Morning'] },
    { id: 'ex-legcurl', name: 'Leg Curl', sets: [set(12, 60), set(12, 60), set(12, 60)], restSec: 90, notes: '', alternates: ['Nordic Curl', 'Glute Ham Raise'] },
    { id: 'ex-calf', name: 'Standing Calf Raise', sets: [set(15, 90), set(15, 90), set(15, 90), set(15, 90)], restSec: 60, notes: '', alternates: ['Seated Calf Raise', 'Leg Press Calf Raise'] },
  ],
  Upper: [
    { id: 'ex-ohp', name: 'Overhead Press', sets: [set(8, 95), set(8, 95), set(8, 95)], restSec: 150, notes: '', alternates: ['Dumbbell Shoulder Press', 'Machine Shoulder Press'] },
    { id: 'ex-pullup', name: 'Pull-Up', sets: [set(8, 0), set(8, 0), set(8, 0)], restSec: 120, notes: '', alternates: ['Lat Pulldown', 'Assisted Pull-Up'] },
    { id: 'ex-inclinebench', name: 'Incline Barbell Press', sets: [set(8, 115), set(8, 115), set(8, 115)], restSec: 120, notes: '', alternates: ['Incline Dumbbell Press'] },
    { id: 'ex-row', name: 'Barbell Row', sets: [set(10, 115), set(10, 115), set(10, 115)], restSec: 90, notes: '', alternates: ['Cable Row', 'Chest-Supported Row'] },
    { id: 'ex-hammercurl', name: 'Hammer Curl', sets: [set(10, 30), set(10, 30), set(10, 30)], restSec: 60, notes: '', alternates: ['Barbell Curl'] },
  ],
  Conditioning: [
    { id: 'ex-intervals', name: 'Treadmill Intervals', sets: [set(1, 0), set(1, 0), set(1, 0), set(1, 0)], restSec: 90, notes: '', alternates: ['Bike Intervals', 'Row Intervals'] },
    { id: 'ex-rower', name: 'Rowing Machine', sets: [set(1, 0), set(1, 0)], restSec: 120, notes: '', alternates: ['Ski Erg', 'Assault Bike'] },
    { id: 'ex-plank', name: 'Plank', sets: [set(1, 0), set(1, 0), set(1, 0)], restSec: 60, notes: '', alternates: ['Side Plank', 'Dead Bug'] },
    { id: 'ex-mountainclimber', name: 'Mountain Climbers', sets: [set(20, 0), set(20, 0), set(20, 0)], restSec: 45, notes: '', alternates: ['Burpees', 'Jump Rope'] },
  ],
};

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

/** Real users start with no meals logged — everything here is earned by logging it. */
export const LOGGED_MEALS: LoggedMeal[] = [];

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
  Strength: 0,
  Discipline: 0,
  Endurance: 0,
  Focus: 0,
  Knowledge: 0,
  Confidence: 0,
  Wisdom: 0,
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
  { id: 'b1', title: '7-Day Streak', icon: 'flame', color: Colors.flame, earned: false, description: 'Complete 7 days in a row' },
  { id: 'b2', title: 'First PR', icon: 'trophy', color: Colors.xp, earned: false, description: 'Set your first personal record' },
  { id: 'b3', title: 'Early Riser', icon: 'sunny', color: Colors.xp, earned: false, description: 'Wake up on time 14 days straight' },
  { id: 'b4', title: 'Hydration Master', icon: 'water', color: Colors.cyan, earned: false, description: 'Hit water goal 21 days straight' },
  { id: 'b5', title: 'Iron Will', icon: 'shield', color: Colors.textSecondary, earned: false, description: 'Reach Iron rank' },
  { id: 'b6', title: 'Bookworm', icon: 'book', color: Colors.purple, earned: false, description: 'Read 500 pages total' },
  { id: 'b7', title: '30-Day Streak', icon: 'flame', color: Colors.flameDeep, earned: false, description: 'Complete 30 days in a row' },
  { id: 'b8', title: 'Centurion', icon: 'barbell', color: Colors.primary, earned: false, description: 'Complete 100 workouts' },
];

/** Real users start with an empty Legacy — the origin entry is written when onboarding completes. */
export const LEGACY_SEED: LegacyEvent[] = [];
