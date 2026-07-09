import type { ComponentProps } from 'react';
import type { Ionicons } from '@expo/vector-icons';

export type IconName = ComponentProps<typeof Ionicons>['name'];

// ---------- Onboarding / profile ----------

export type MainGoal =
  | 'Lose fat'
  | 'Build muscle'
  | 'Get stronger'
  | 'Improve discipline'
  | 'Become healthier'
  | 'Full life transformation';

export type Equipment =
  | 'Full gym'
  | 'Home gym'
  | 'Dumbbells only'
  | 'Bodyweight only'
  | 'No equipment';

export type CoachPersonality =
  | 'Supportive'
  | 'Tough love'
  | 'Military'
  | 'Big brother'
  | 'Calm mentor';

export type TrainingExperience = 'Beginner' | 'Intermediate' | 'Advanced';

export interface UserProfile {
  name: string;
  age: number;
  heightIn: number; // inches
  weightLb: number;
  goalWeightLb: number;
  goal: MainGoal;
  experience: TrainingExperience;
  workSchedule: string;
  sleepSchedule: string;
  stressLevel: 'Low' | 'Moderate' | 'High';
  activityLevel: 'Sedentary' | 'Lightly active' | 'Active' | 'Very active';
  trainingDaysPerWeek: number;
  equipment: Equipment;
  coachPersonality: CoachPersonality;
}

// ---------- Quests / XP ----------

export type QuestCategory =
  | 'workout'
  | 'nutrition'
  | 'water'
  | 'steps'
  | 'reading'
  | 'sleep'
  | 'meditation'
  | 'journaling';

export interface Quest {
  id: string;
  title: string;
  xp: number;
  category: QuestCategory;
  icon: IconName;
  color: string;
  done: boolean;
  /** Optional progress toward a target (e.g. water oz), for partial states. */
  progress?: number;
  target?: number;
  unit?: string;
}

// ---------- Habits ----------

export type HabitDifficulty = 'Easy' | 'Medium' | 'Hard';

export interface Habit {
  id: string;
  title: string;
  icon: IconName;
  color: string;
  xp: number;
  difficulty: HabitDifficulty;
  streak: number;
  doneToday: boolean;
  /** Last 7 days, oldest first; today is the final entry. */
  week: boolean[];
}

// ---------- Fitness ----------

export interface ExerciseSet {
  reps: number;
  weight: number;
  done: boolean;
}

export interface Exercise {
  id: string;
  name: string;
  sets: ExerciseSet[];
  restSec: number;
  notes: string;
  alternates: string[];
  /** Top working weight from the previous session, for in-set context. */
  lastWeight?: number;
}

export interface SplitDay {
  day: string;
  focus: string;
  muscles: string[];
  isRest: boolean;
}

export interface PersonalRecord {
  lift: string;
  weight: number;
  reps: number;
  date: string;
}

export interface Measurement {
  label: string;
  value: string;
  change: string;
}

// ---------- Nutrition ----------

export interface MacroTargets {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  waterOz: number;
  fiber: number;
}

export interface MacroTotals {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  waterOz: number;
  fiber: number;
}

export type MealSlot = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks';

export interface LoggedMeal {
  id: string;
  slot: MealSlot;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export interface SuggestedMeal {
  name: string;
  calories: number;
  protein: number;
  tag: 'High protein' | 'Budget' | 'Quick' | 'Cut' | 'Bulk';
}

// ---------- Coach ----------

export interface ChatMessage {
  id: string;
  from: 'coach' | 'user';
  text: string;
}

// ---------- Character ----------

export type StatKey =
  | 'Strength'
  | 'Discipline'
  | 'Endurance'
  | 'Focus'
  | 'Knowledge'
  | 'Confidence'
  | 'Wisdom';

export interface BadgeItem {
  id: string;
  title: string;
  icon: IconName;
  color: string;
  earned: boolean;
  description: string;
}

// ---------- Legacy (permanent life timeline) ----------

export type LegacyCategory = 'origin' | 'body' | 'strength' | 'discipline' | 'mind' | 'rank';

export interface LegacyEvent {
  id: string;
  /** Display date, e.g. "Apr 2, 2026". Legacy events are never deleted. */
  date: string;
  title: string;
  detail: string;
  icon: IconName;
  category: LegacyCategory;
}

// ---------- Identity Engine ----------

/** One earned change to a trait, with the reason it happened. */
export interface TraitChange {
  trait: StatKey;
  delta: number;
  reason: string;
  /** YYYY-MM-DD — used to cap how much a trait can move per day. */
  day: string;
}
