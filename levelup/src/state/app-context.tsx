import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';

import { Colors } from '@/constants/theme';
import {
  BADGES,
  CATEGORY_STAT_GAINS,
  DAILY_QUESTS,
  DEFAULT_PROFILE,
  DEFAULT_STATS,
  HABITS,
  LEGACY_SEED,
  LOGGED_MEALS,
  MACRO_TARGETS,
} from '@/lib/data';
import { applyXp, computeReadiness, dayIsComplete, rankForLevel } from '@/lib/game';
import { formatLegacyDate, LEGACY_STREAK_MILESTONES, todayKey, traitRoomToday } from '@/lib/identity';
import type {
  ChatMessage,
  CompletedExercise,
  Habit,
  HabitDifficulty,
  LegacyEvent,
  LoggedMeal,
  MeasurementEntry,
  PersonalRecord,
  Quest,
  StatKey,
  TraitChange,
  UserProfile,
  WeightEntry,
  WorkoutHistoryEntry,
} from '@/lib/types';

const HABIT_DIFFICULTY_XP: Record<HabitDifficulty, number> = { Easy: 100, Medium: 150, Hard: 200 };

// ---------- State ----------

export interface RewardToast {
  key: number;
  text: string;
  sub?: string;
}

export interface AppState {
  hydrated: boolean;
  onboarded: boolean;
  profile: UserProfile;
  level: number;
  xp: number;
  stats: Record<StatKey, number>;
  quests: Quest[];
  habits: Habit[];
  meals: LoggedMeal[];
  waterOz: number;
  currentStreak: number;
  longestStreak: number;
  streakCountedToday: boolean;
  streakProtections: number;
  workoutFinished: boolean;
  chat: ChatMessage[];
  reward: RewardToast | null;
  /** Permanent life timeline. Append-only — nothing here is ever removed. */
  legacy: LegacyEvent[];
  /** Identity Engine ledger: every trait change with its reason. */
  traitLog: TraitChange[];
  /** Real progress tracking — every entry here was actually logged by the user. */
  workoutHistory: WorkoutHistoryEntry[];
  weightLog: WeightEntry[];
  personalRecords: PersonalRecord[];
  measurementLog: MeasurementEntry[];
  /** Set once, at onboarding completion — used to compute "Week N of 8". */
  programStartDate: string | null;
}

const INITIAL_STATE: AppState = {
  hydrated: false,
  onboarded: false,
  profile: DEFAULT_PROFILE,
  level: 0,
  xp: 0,
  stats: DEFAULT_STATS,
  quests: DAILY_QUESTS,
  habits: HABITS,
  meals: LOGGED_MEALS,
  waterOz: 0,
  currentStreak: 0,
  longestStreak: 0,
  streakCountedToday: false,
  streakProtections: 0,
  workoutFinished: false,
  chat: [],
  reward: null,
  legacy: LEGACY_SEED,
  traitLog: [],
  workoutHistory: [],
  weightLog: [],
  personalRecords: [],
  measurementLog: [],
  programStartDate: null,
};

// ---------- Actions ----------

type Action =
  | { type: 'HYDRATE'; payload: Partial<AppState> }
  | { type: 'COMPLETE_ONBOARDING'; profile: UserProfile }
  | { type: 'TOGGLE_QUEST'; id: string }
  | { type: 'ADD_WATER'; oz: number }
  | { type: 'COMPLETE_HABIT'; id: string }
  | { type: 'ADD_HABIT'; title: string; difficulty: HabitDifficulty }
  | { type: 'DELETE_HABIT'; id: string }
  | { type: 'LOG_MEAL'; meal: LoggedMeal }
  | { type: 'DELETE_MEAL'; id: string }
  | { type: 'LOG_WORKOUT_SESSION'; dayFocus: string; exercises: CompletedExercise[] }
  | { type: 'LOG_WEIGHT'; weightLb: number }
  | { type: 'LOG_MEASUREMENT'; label: string; value: string }
  | { type: 'LOG_PR'; lift: string; weight: number; reps: number }
  | { type: 'USER_CHAT'; text: string }
  | { type: 'COACH_MESSAGE'; text: string }
  | { type: 'UPDATE_PROFILE'; patch: Partial<UserProfile> }
  | { type: 'CLEAR_REWARD' }
  | { type: 'LOGOUT' };

let rewardKey = 1;

/**
 * The Identity Engine's single write path.
 *
 * Every earn: applies XP, grows matching traits (capped per day so identity
 * can't be ground out in one sitting), records each trait change with its
 * reason, and writes rank-ups into the permanent Legacy.
 */
function earn(state: AppState, amount: number, label: string, category?: string): Partial<AppState> {
  const { level, xp, leveledUp } = applyXp(state.level, state.xp, amount);
  const stats = { ...state.stats };
  const traitLog = [...state.traitLog];
  const gained: StatKey[] = [];

  if (category) {
    for (const trait of CATEGORY_STAT_GAINS[category] ?? []) {
      if (traitRoomToday(traitLog, trait) > 0) {
        stats[trait] = stats[trait] + 1;
        gained.push(trait);
        traitLog.push({ trait, delta: 1, reason: label, day: todayKey() });
      }
    }
  }

  // Rank-ups are legacy moments; level-ups are toasts.
  const oldRank = rankForLevel(state.level);
  const newRank = rankForLevel(level);
  let legacy = state.legacy;
  if (newRank !== oldRank) {
    legacy = [
      ...legacy,
      {
        id: `l-rank-${newRank.toLowerCase()}-${Date.now()}`,
        date: formatLegacyDate(new Date()),
        title: `Reached ${newRank} Rank`,
        detail: `Level ${level} · earned through ${state.currentStreak} days of showing up.`,
        icon: 'shield',
        category: 'rank',
      },
    ];
  }

  // The completion moment speaks identity, not points.
  const sub = leveledUp
    ? `LEVEL UP — Level ${level} · ${newRank}. This becomes part of you.`
    : gained.length > 0
      ? `Proof added · ${gained.map((t) => `${t} +1`).join(' · ')}`
      : 'Proof added';

  return {
    level,
    xp,
    stats,
    traitLog,
    legacy,
    reward: { key: rewardKey++, text: `${label} · +${amount.toLocaleString()} XP`, sub },
  };
}

/**
 * Re-evaluate the daily streak after quest changes. Milestone streaks
 * (7, 30, 50, 100, 365) are written into the Legacy permanently.
 */
function reconcileStreak(state: AppState, quests: Quest[]): Partial<AppState> {
  const done = quests.filter((q) => q.done).length;
  const complete = dayIsComplete(done, quests.length);
  if (complete && !state.streakCountedToday) {
    const currentStreak = state.currentStreak + 1;
    const patch: Partial<AppState> = {
      currentStreak,
      longestStreak: Math.max(state.longestStreak, currentStreak),
      streakCountedToday: true,
    };
    if (LEGACY_STREAK_MILESTONES.includes(currentStreak)) {
      patch.legacy = [
        ...state.legacy,
        {
          id: `l-streak-${currentStreak}-${Date.now()}`,
          date: formatLegacyDate(new Date()),
          title: `${currentStreak}-Day Streak`,
          detail: `${currentStreak} consecutive days of keeping the promise.`,
          icon: 'flame',
          category: 'discipline',
        },
      ];
    }
    return patch;
  }
  if (!complete && state.streakCountedToday) {
    return { currentStreak: state.currentStreak - 1, streakCountedToday: false };
  }
  return {};
}

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'HYDRATE':
      return { ...state, ...action.payload, hydrated: true };

    case 'COMPLETE_ONBOARDING': {
      const origin: LegacyEvent = {
        id: 'l-origin',
        date: formatLegacyDate(new Date()),
        title: 'Started the Journey',
        detail: `Day one. Chose "${action.profile.goal}" and never looked back.`,
        icon: 'flag',
        category: 'origin',
      };
      return { ...state, onboarded: true, profile: action.profile, chat: [], legacy: [origin], programStartDate: todayKey() };
    }

    case 'TOGGLE_QUEST': {
      const quest = state.quests.find((q) => q.id === action.id);
      if (!quest) return state;
      const nowDone = !quest.done;
      const quests = state.quests.map((q) =>
        q.id === action.id
          ? { ...q, done: nowDone, progress: nowDone && q.target ? q.target : q.progress }
          : q,
      );
      if (!nowDone) {
        // Un-checking refunds the XP quietly (no toast) and reverts today's
        // trait gains for this quest's category, so toggling a quest on and
        // off can never farm identity.
        const { level, xp } = applyXp(state.level, state.xp, -quest.xp);
        const day = todayKey();
        const stats = { ...state.stats };
        const traitLog = [...state.traitLog];
        for (const trait of CATEGORY_STAT_GAINS[quest.category] ?? []) {
          for (let i = traitLog.length - 1; i >= 0; i--) {
            const c = traitLog[i];
            if (c.trait === trait && c.day === day && c.delta > 0) {
              stats[trait] = stats[trait] - c.delta;
              traitLog.splice(i, 1);
              break;
            }
          }
        }
        return { ...state, quests, level, xp, stats, traitLog, ...reconcileStreak(state, quests) };
      }
      const earned = earn(state, quest.xp, quest.title, quest.category);
      const afterEarn = { ...state, ...earned };
      return { ...afterEarn, quests, ...reconcileStreak(afterEarn, quests) };
    }

    case 'ADD_WATER': {
      const waterOz = state.waterOz + action.oz;
      const water = state.quests.find((q) => q.category === 'water');
      const hitGoal = !!water && !water.done && waterOz >= (water.target ?? MACRO_TARGETS.waterOz);
      const quests = state.quests.map((q) =>
        q.category === 'water' ? { ...q, progress: waterOz, done: q.done || hitGoal } : q,
      );
      if (hitGoal && water) {
        const earned = earn(state, water.xp, 'Water goal hit', 'water');
        const afterEarn = { ...state, ...earned };
        return { ...afterEarn, waterOz, quests, ...reconcileStreak(afterEarn, quests) };
      }
      return { ...state, waterOz, quests };
    }

    case 'COMPLETE_HABIT': {
      const habit = state.habits.find((h) => h.id === action.id);
      if (!habit || habit.doneToday) return state;
      const habits = state.habits.map((h): Habit =>
        h.id === action.id
          ? { ...h, doneToday: true, streak: h.streak + 1, week: [...h.week.slice(0, 6), true] }
          : h,
      );
      return { ...state, habits, ...earn(state, habit.xp, habit.title, categoryForHabit(habit)) };
    }

    case 'ADD_HABIT': {
      const habit: Habit = {
        id: `h-custom-${Date.now()}`,
        title: action.title,
        icon: 'star',
        color: Colors.primary,
        xp: HABIT_DIFFICULTY_XP[action.difficulty],
        difficulty: action.difficulty,
        streak: 0,
        doneToday: false,
        week: [false, false, false, false, false, false, false],
      };
      return { ...state, habits: [...state.habits, habit] };
    }

    case 'DELETE_HABIT':
      return { ...state, habits: state.habits.filter((h) => h.id !== action.id) };

    case 'LOG_MEAL': {
      const meals = [...state.meals, action.meal];
      const protein = meals.reduce((sum, m) => sum + m.protein, 0);
      const proteinQuest = state.quests.find((q) => q.category === 'nutrition');
      const hitGoal = !!proteinQuest && !proteinQuest.done && protein >= (proteinQuest.target ?? MACRO_TARGETS.protein);
      const quests = state.quests.map((q) =>
        q.category === 'nutrition' ? { ...q, progress: protein, done: q.done || hitGoal } : q,
      );
      if (hitGoal && proteinQuest) {
        const earned = earn(state, proteinQuest.xp, 'Protein goal hit', 'nutrition');
        const afterEarn = { ...state, ...earned };
        return { ...afterEarn, meals, quests, ...reconcileStreak(afterEarn, quests) };
      }
      return { ...state, meals, quests };
    }

    case 'DELETE_MEAL': {
      const meals = state.meals.filter((m) => m.id !== action.id);
      const protein = meals.reduce((sum, m) => sum + m.protein, 0);
      const proteinQuest = state.quests.find((q) => q.category === 'nutrition');
      const stillHitsGoal = protein >= (proteinQuest?.target ?? MACRO_TARGETS.protein);

      if (proteinQuest?.done && !stillHitsGoal) {
        // Deleting a meal that drops protein back below target refunds the
        // goal's XP and trait gains, mirroring TOGGLE_QUEST's uncheck path —
        // logging and deleting a meal can't be used to farm XP.
        const { level, xp } = applyXp(state.level, state.xp, -proteinQuest.xp);
        const day = todayKey();
        const stats = { ...state.stats };
        const traitLog = [...state.traitLog];
        for (const trait of CATEGORY_STAT_GAINS.nutrition ?? []) {
          for (let i = traitLog.length - 1; i >= 0; i--) {
            const c = traitLog[i];
            if (c.trait === trait && c.day === day && c.delta > 0) {
              stats[trait] = stats[trait] - c.delta;
              traitLog.splice(i, 1);
              break;
            }
          }
        }
        const quests = state.quests.map((q) => (q.category === 'nutrition' ? { ...q, progress: protein, done: false } : q));
        return { ...state, meals, quests, level, xp, stats, traitLog, ...reconcileStreak(state, quests) };
      }

      const quests = state.quests.map((q) => (q.category === 'nutrition' ? { ...q, progress: protein } : q));
      return { ...state, meals, quests };
    }

    case 'LOG_WORKOUT_SESSION': {
      const date = todayKey();
      const volume = action.exercises.reduce((sum, ex) => sum + ex.sets.reduce((s, set) => s + set.reps * set.weight, 0), 0);
      const historyEntry: WorkoutHistoryEntry = {
        id: `w-${Date.now()}`,
        date,
        dayFocus: action.dayFocus,
        exercises: action.exercises,
        volume,
      };
      let personalRecords = state.personalRecords;
      for (const ex of action.exercises) {
        const topSet = ex.sets.reduce((best, s) => (s.weight > best.weight ? s : best), { reps: 0, weight: 0 });
        if (topSet.weight > 0) personalRecords = upsertPR(personalRecords, ex.name, topSet.weight, topSet.reps, date);
      }
      const workoutHistory = [...state.workoutHistory, historyEntry];

      const workout = state.quests.find((q) => q.category === 'workout');
      if (!workout || workout.done) {
        return { ...state, workoutFinished: true, workoutHistory, personalRecords };
      }
      const quests = state.quests.map((q) => (q.category === 'workout' ? { ...q, done: true } : q));
      const earned = earn(state, workout.xp, 'Workout complete', 'workout');
      const afterEarn = { ...state, ...earned };
      return {
        ...afterEarn,
        workoutFinished: true,
        quests,
        workoutHistory,
        personalRecords,
        ...reconcileStreak(afterEarn, quests),
      };
    }

    case 'LOG_WEIGHT': {
      const entry: WeightEntry = { id: `wt-${Date.now()}`, date: todayKey(), weightLb: action.weightLb };
      return { ...state, weightLog: [...state.weightLog, entry] };
    }

    case 'LOG_MEASUREMENT': {
      const entry: MeasurementEntry = { id: `ms-${Date.now()}`, date: todayKey(), label: action.label, value: action.value };
      return { ...state, measurementLog: [...state.measurementLog, entry] };
    }

    case 'LOG_PR':
      return { ...state, personalRecords: upsertPR(state.personalRecords, action.lift, action.weight, action.reps, todayKey()) };

    case 'USER_CHAT': {
      const user: ChatMessage = { id: `u-${Date.now()}`, from: 'user', text: action.text };
      return { ...state, chat: [...state.chat, user] };
    }

    case 'COACH_MESSAGE': {
      const coach: ChatMessage = { id: `c-${Date.now()}`, from: 'coach', text: action.text };
      return { ...state, chat: [...state.chat, coach] };
    }

    case 'UPDATE_PROFILE':
      return { ...state, profile: { ...state.profile, ...action.patch } };

    case 'CLEAR_REWARD':
      return { ...state, reward: null };

    case 'LOGOUT':
      return { ...INITIAL_STATE, hydrated: true };

    default:
      return state;
  }
}

/** Upserts a lift's current record — only replaces it when the new lift is genuinely heavier (or same weight, more reps). */
function upsertPR(records: PersonalRecord[], lift: string, weight: number, reps: number, date: string): PersonalRecord[] {
  const existing = records.find((r) => r.lift.toLowerCase() === lift.toLowerCase());
  if (!existing) return [...records, { lift, weight, reps, date }];
  if (weight > existing.weight || (weight === existing.weight && reps > existing.reps)) {
    return records.map((r) => (r === existing ? { lift, weight, reps, date } : r));
  }
  return records;
}

function categoryForHabit(habit: Habit): string {
  if (habit.id.includes('learning')) return 'reading';
  if (habit.id.includes('meditation') || habit.id.includes('coldshower')) return 'meditation';
  if (habit.id.includes('journal') || habit.id.includes('plan') || habit.id.includes('budget')) return 'journaling';
  if (habit.id.includes('wake') || habit.id.includes('nophone')) return 'sleep';
  if (habit.id.includes('mobility')) return 'workout';
  return 'nutrition';
}

// ---------- Derived selectors ----------

export function useMacroTotals() {
  const { state } = useApp();
  return useMemo(() => {
    const fromMeals = state.meals.reduce(
      (acc, m) => ({
        calories: acc.calories + m.calories,
        protein: acc.protein + m.protein,
        carbs: acc.carbs + m.carbs,
        fats: acc.fats + m.fats,
      }),
      { calories: 0, protein: 0, carbs: 0, fats: 0 },
    );
    return { ...fromMeals, waterOz: state.waterOz, fiber: 24 };
  }, [state.meals, state.waterOz]);
}

export function useReadiness() {
  const { state } = useApp();
  return useMemo(
    () =>
      computeReadiness({
        sleepHours: 7.2,
        hoursSinceLastWorkout: 22,
        stress: state.profile.stressLevel,
        stepsYesterday: 9350,
        nutritionConsistency: 0.78,
      }),
    [state.profile.stressLevel],
  );
}

export function useBadges() {
  const { state } = useApp();
  return useMemo(
    () => BADGES.map((b) => (b.id === 'b7' && state.currentStreak >= 30 ? { ...b, earned: true } : b)),
    [state.currentStreak],
  );
}

// ---------- Provider ----------

const STORAGE_KEY = 'levelup/state/v1';

interface AppContextValue {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        const payload = raw ? (JSON.parse(raw) as Partial<AppState>) : {};
        dispatch({ type: 'HYDRATE', payload });
      })
      .catch(() => dispatch({ type: 'HYDRATE', payload: {} }));
  }, []);

  useEffect(() => {
    if (!state.hydrated) return;
    const { hydrated: _h, reward: _r, ...persisted } = state;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(persisted)).catch(() => {});
  }, [state]);

  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
