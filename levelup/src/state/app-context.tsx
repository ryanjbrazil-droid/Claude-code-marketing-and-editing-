import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';

import { coachGreeting, coachReply } from '@/lib/coach';
import {
  BADGES,
  CATEGORY_STAT_GAINS,
  DAILY_QUESTS,
  DEFAULT_PROFILE,
  DEFAULT_STATS,
  HABITS,
  LOGGED_MEALS,
  MACRO_TARGETS,
} from '@/lib/data';
import { applyXp, computeReadiness, dayIsComplete, rankForLevel } from '@/lib/game';
import type { ChatMessage, Habit, LoggedMeal, Quest, StatKey, UserProfile } from '@/lib/types';

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
}

const INITIAL_STATE: AppState = {
  hydrated: false,
  onboarded: false,
  profile: DEFAULT_PROFILE,
  level: 12,
  xp: 640,
  stats: DEFAULT_STATS,
  quests: DAILY_QUESTS,
  habits: HABITS,
  meals: LOGGED_MEALS,
  waterOz: 72,
  currentStreak: 26,
  longestStreak: 26,
  streakCountedToday: false,
  streakProtections: 2,
  workoutFinished: false,
  chat: [],
  reward: null,
};

// ---------- Actions ----------

type Action =
  | { type: 'HYDRATE'; payload: Partial<AppState> }
  | { type: 'COMPLETE_ONBOARDING'; profile: UserProfile }
  | { type: 'TOGGLE_QUEST'; id: string }
  | { type: 'ADD_WATER'; oz: number }
  | { type: 'COMPLETE_HABIT'; id: string }
  | { type: 'LOG_MEAL'; meal: LoggedMeal }
  | { type: 'FINISH_WORKOUT' }
  | { type: 'SEND_CHAT'; text: string }
  | { type: 'UPDATE_PROFILE'; patch: Partial<UserProfile> }
  | { type: 'CLEAR_REWARD' }
  | { type: 'LOGOUT' };

let rewardKey = 1;

/** Grant XP + stat gains and produce the reward toast. */
function earn(state: AppState, amount: number, label: string, category?: string): Partial<AppState> {
  const { level, xp, leveledUp } = applyXp(state.level, state.xp, amount);
  const stats = { ...state.stats };
  if (category) {
    for (const stat of CATEGORY_STAT_GAINS[category] ?? []) {
      stats[stat] = stats[stat] + 1;
    }
  }
  return {
    level,
    xp,
    stats,
    reward: {
      key: rewardKey++,
      text: `+${amount.toLocaleString()} XP — ${label}`,
      sub: leveledUp ? `LEVEL UP! You reached Level ${level} · ${rankForLevel(level)}` : undefined,
    },
  };
}

/** Re-evaluate the daily streak after quest changes. */
function reconcileStreak(state: AppState, quests: Quest[]): Partial<AppState> {
  const done = quests.filter((q) => q.done).length;
  const complete = dayIsComplete(done, quests.length);
  if (complete && !state.streakCountedToday) {
    const currentStreak = state.currentStreak + 1;
    return {
      currentStreak,
      longestStreak: Math.max(state.longestStreak, currentStreak),
      streakCountedToday: true,
    };
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
      const greeting: ChatMessage = {
        id: 'c-greeting',
        from: 'coach',
        text: coachGreeting(action.profile.coachPersonality, action.profile.name),
      };
      return { ...state, onboarded: true, profile: action.profile, chat: [greeting] };
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
        // Un-checking refunds the XP quietly (no toast).
        const { level, xp } = applyXp(state.level, state.xp, -quest.xp);
        return { ...state, quests, level, xp, ...reconcileStreak(state, quests) };
      }
      return {
        ...state,
        quests,
        ...earn(state, quest.xp, `${quest.title} Complete`, quest.category),
        ...reconcileStreak(state, quests),
      };
    }

    case 'ADD_WATER': {
      const waterOz = state.waterOz + action.oz;
      const water = state.quests.find((q) => q.category === 'water');
      const hitGoal = !!water && !water.done && waterOz >= (water.target ?? MACRO_TARGETS.waterOz);
      const quests = state.quests.map((q) =>
        q.category === 'water' ? { ...q, progress: waterOz, done: q.done || hitGoal } : q,
      );
      if (hitGoal && water) {
        return {
          ...state,
          waterOz,
          quests,
          ...earn(state, water.xp, 'Water Goal Hit', 'water'),
          ...reconcileStreak(state, quests),
        };
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
      return { ...state, habits, ...earn(state, habit.xp, `${habit.title} Complete`, categoryForHabit(habit)) };
    }

    case 'LOG_MEAL': {
      const meals = [...state.meals, action.meal];
      const protein = meals.reduce((sum, m) => sum + m.protein, 0);
      const proteinQuest = state.quests.find((q) => q.category === 'nutrition');
      const hitGoal = !!proteinQuest && !proteinQuest.done && protein >= (proteinQuest.target ?? MACRO_TARGETS.protein);
      const quests = state.quests.map((q) =>
        q.category === 'nutrition' ? { ...q, progress: protein, done: q.done || hitGoal } : q,
      );
      if (hitGoal && proteinQuest) {
        return {
          ...state,
          meals,
          quests,
          ...earn(state, proteinQuest.xp, 'Protein Goal Hit', 'nutrition'),
          ...reconcileStreak(state, quests),
        };
      }
      return { ...state, meals, quests };
    }

    case 'FINISH_WORKOUT': {
      const workout = state.quests.find((q) => q.category === 'workout');
      if (!workout || workout.done) return { ...state, workoutFinished: true };
      const quests = state.quests.map((q) => (q.category === 'workout' ? { ...q, done: true } : q));
      return {
        ...state,
        workoutFinished: true,
        quests,
        ...earn(state, workout.xp, 'Workout Complete', 'workout'),
        ...reconcileStreak(state, quests),
      };
    }

    case 'SEND_CHAT': {
      const user: ChatMessage = { id: `u-${Date.now()}`, from: 'user', text: action.text };
      const coach: ChatMessage = {
        id: `c-${Date.now()}`,
        from: 'coach',
        text: coachReply(action.text, state.profile.coachPersonality),
      };
      return { ...state, chat: [...state.chat, user, coach] };
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

function categoryForHabit(habit: Habit): string {
  if (habit.id.includes('read') || habit.id.includes('learning')) return 'reading';
  if (habit.id.includes('meditation')) return 'meditation';
  if (habit.id.includes('journal')) return 'journaling';
  if (habit.id.includes('sleep') || habit.id.includes('wake')) return 'sleep';
  if (habit.id.includes('steps')) return 'steps';
  if (habit.id.includes('water')) return 'water';
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
