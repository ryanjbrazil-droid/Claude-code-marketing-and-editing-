# LevelUp ⚡

**Your real life is now your game.**

LevelUp is an identity platform disguised as a fitness app. Workouts, nutrition, sleep, and habits are input streams that strengthen one thing: your **Character** — a permanent, earned record of who you're becoming. Duolingo streaks × Whoop recovery × RPG progression, with a coach that witnesses your whole journey.

Built with **Expo (React Native + TypeScript)** and **expo-router**. Runs on iOS, Android, and web. See `docs/IDENTITY_PLATFORM.md` for the full product architecture.

## Run it

```bash
cd levelup
npm install
npx expo start        # then press i / a / w, or scan the QR with Expo Go
```

## What's in the MVP

- **Identity-first onboarding** — "Who are you becoming?" → stats → lifestyle → equipment → coach personality → animated plan generation
- **Today dashboard** — level ring + XP, streak & readiness tiles, coach instruction, one "Up next" action, quest list with a visible streak-protection meter, quick logs, pull-to-refresh
- **Identity Engine** — every earn flows through one path: XP (level = 400·n), trait gains capped at +2/day with recorded reasons, reward toasts that speak identity (`Proof added · Knowledge +1`), confetti reserved for level-ups
- **Legacy** — a permanent, append-only life timeline (`/legacy`): rank-ups and milestone streaks write themselves in; an "Unwritten" future entry pulls you forward; nothing can ever be edited or deleted
- **Character (center tab)** — earned title, rank ladder, traits with "last gain" transparency, Legacy preview, next-unlock anticipation, badges, achievements
- **Streak system** — a day counts at ≥70% of quests; milestone streaks (7/30/50/100/365) become Legacy entries; a broken streak triggers the comeback flow ("Your streak ended. Your progress did not."), never identity loss
- **Train** — weekly split, recovery status, AI recommendations, full workout session (sets, rest timer, exercise replacement, previous-session weights with overload markers, finish gated on ≥1 set)
- **Fuel** — macro dashboard, meal log with quick-add and friendly empty states, water logging, cut/maintain/bulk meal planner
- **Habits** — 10 habits (deliberately non-overlapping with quests — nothing earns XP twice), streaks, difficulty, weekly history
- **Coach** — 5 personality modes, typing indicator, and witnessing replies that cite your real streak, trait gains, and Legacy entries
- **Polish** — real haptics (expo-haptics), skeleton hydration loading, branded icon set, press-scale feedback everywhere, accessibility roles/labels/44pt targets
- **Persistence** — app state saved locally via AsyncStorage

## Architecture (backend-ready)

```
src/
  app/                 # expo-router routes
    onboarding/        # 7-screen onboarding stack
    (tabs)/            # Today · Train · Character · Fuel · Coach (Character holds center)
    habits.tsx         # pushed from Character / Today quick log
    profile.tsx        # pushed from Character (gear)
    legacy.tsx         # permanent timeline, pushed from Character
    workout-session.tsx
  components/          # UI kit: XPBar, ProgressRing, QuestCard, RewardToast, motion, …
  constants/theme.ts   # dark-first design system (colors, type, spacing, motion)
  lib/
    game.ts            # pure game math: XP curve, ranks, streak rule, readiness
    identity.ts        # Identity Engine: trait caps/reasons, titles, legacy rules
    coach.ts           # mock coach + witnessing context (swap for a real model later)
    data.ts            # mock/sample data (swap for API + food DB later)
    types.ts           # shared domain types
  state/
    app-context.tsx    # reducer + AsyncStorage persistence (swap for DB/auth later)
docs/
  IDENTITY_PLATFORM.md # product architecture, flows, Legacy & Identity Engine specs
```

Deliberately deferred (structure supports them, nothing blocks them): auth, real database, Apple Health/wearables, real AI API, food database, barcode scanning, photo meal recognition, push notifications, payments. No social features by design — the only competitor is your past self.

## Verify

```bash
npx tsc --noEmit                 # typecheck
npx expo export --platform web   # full bundle of every route
```
