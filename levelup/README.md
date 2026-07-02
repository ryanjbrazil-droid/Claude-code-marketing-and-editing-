# LevelUp ⚡

**Your real life is now your game.**

LevelUp is a premium, gamified fitness and self-improvement app that turns real-life progress — workouts, nutrition, habits, sleep, discipline — into an RPG-style leveling system. Duolingo streaks × MyFitnessPal tracking × Whoop recovery × RPG character progression, with an AI mentor keeping you accountable.

Built with **Expo (React Native + TypeScript)** and **expo-router**. Runs on iOS, Android, and web.

## Run it

```bash
cd levelup
npm install
npx expo start        # then press i / a / w, or scan the QR with Expo Go
```

## What's in the MVP

- **Full onboarding** — welcome → main goal → stats → lifestyle → equipment → AI coach personality → animated plan generation
- **Today dashboard** — level, glowing XP bar, streak flame, readiness score, coach message, daily quests, next best action, quick-log buttons
- **Working XP system** — quests and habits grant XP with reward toasts (`+350 XP — Workout Complete`), level-ups roll over, ranks climb Beginner → Legendary, and character stats (Strength, Discipline, …) grow with matching activity
- **Streak system** — a day counts when ≥70% of daily quests are complete; current/longest streak tracked
- **Readiness score** — computed from sleep, recovery time, stress, steps, and nutrition consistency
- **Fitness** — weekly split, recovery status, AI recommendations, and a full workout session screen (sets, reps, weight, rest timer, replace exercise, notes, finish → XP)
- **Nutrition** — macro dashboard with rings/bars, meal log with quick-add, water logging, AI meal planner with cut/maintain/bulk modes and grocery list
- **Habits** — 10 trackable habits with streaks, difficulty, XP, and weekly history
- **Character** — avatar, level, rank ladder, XP, badges, achievements, RPG stat bars
- **AI coach chat** — mock mentor with 5 personality modes (Supportive, Tough love, Military, Big brother, Calm mentor) and quick prompts
- **Profile** — body/goal data, coach settings, notifications, subscription placeholder, integrations placeholders, logout
- **Persistence** — app state saved locally via AsyncStorage

## Architecture (backend-ready)

```
src/
  app/                 # expo-router routes
    onboarding/        # 7-screen onboarding stack
    (tabs)/            # Today · Fitness · Nutrition · Habits · Character · Coach · Profile
    workout-session.tsx
  components/          # UI kit: XPBar, ProgressRing, QuestCard, RewardToast, …
  constants/theme.ts   # dark-first design system (colors, type, spacing, glow)
  lib/
    game.ts            # pure game math: XP curve, ranks, streak rule, readiness
    coach.ts           # mock AI coach (swap for a real model call later)
    data.ts            # mock/sample data (swap for API + food DB later)
    types.ts           # shared domain types
  state/
    app-context.tsx    # reducer + AsyncStorage persistence (swap for DB/auth later)
```

Deliberately deferred (structure supports them, nothing blocks them): auth, real database, Apple Health/wearables, real AI API, food database, barcode scanning, photo meal recognition, social features, payments.

## Verify

```bash
npx tsc --noEmit                 # typecheck
npx expo export --platform web   # full bundle of every route
```
