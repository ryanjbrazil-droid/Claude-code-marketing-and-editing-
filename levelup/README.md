# LevelUp ⚡

**Your real life is now your game.**

LevelUp is an identity platform disguised as a fitness app. Workouts, nutrition, sleep, and habits are input streams that strengthen one thing: your **Character** — a permanent, earned record of who you're becoming. Duolingo streaks × Whoop recovery × RPG progression, with a real AI coach that witnesses your whole journey.

Built with **Expo (React Native + TypeScript)** and **expo-router**. Runs on iOS, Android, and web. See `docs/IDENTITY_PLATFORM.md` for the full product architecture.

## Tech stack

- Expo SDK 57 (React Native 0.86, React 19), `expo-router` file-based navigation
- TypeScript, strict mode
- `@react-native-async-storage/async-storage` — the *only* persistence layer; there is no backend, database, or account system
- `@anthropic-ai/sdk` — powers three real AI features via Expo Router API routes (`src/app/api/*+api.ts`): the Coach, AI photo/voice meal estimation, and AI meal planning
- `expo-camera`, `expo-image-picker`, `expo-speech-recognition` — barcode scanning, photo capture, and voice meal logging

## Local setup

```bash
cd levelup
npm install
cp .env.example .env      # then paste your own ANTHROPIC_API_KEY
npx expo start             # then press i / a / w, or scan the QR with Expo Go
```

## Environment variables

| Variable | Required for | Notes |
|---|---|---|
| `ANTHROPIC_API_KEY` | Coach, AI photo/voice meal estimate, AI meal planning | Server-side only — read in `src/app/api/*+api.ts`, never bundled into the client. Without it, those three features return a clean error; everything else in the app works fine. |

There is no Supabase or backend configuration to set up — see `SUPABASE_SECURITY.md` for what a future backend would need if one is added.

## Running on iPhone

This project uses native modules (camera, image picker, speech recognition), so it requires a **dev-client build** — it will not run in plain Expo Go.

```bash
npx expo prebuild --clean     # regenerates ios/ and android/ from app.json — required after any app.json/plugin change
npx expo run:ios --device     # builds, installs, and launches on a connected iPhone
```

First-time device setup:
1. In Xcode (`ios/LevelUp.xcworkspace`), set your Apple ID under the `LevelUp` target's Signing & Capabilities.
2. On the iPhone: enable **Settings → Privacy & Security → Developer Mode**, restart, confirm.
3. First install: **Settings → General → VPN & Device Management** → trust the developer certificate.

If you see "No script URL provided" after installing, Metro isn't running — start it with `npx expo start --dev-client` and reload the app.

## EAS build process

**Not yet configured** — there is no `eas.json` in this repo as of this audit. To set one up:

```bash
npm install -g eas-cli
eas login
eas build:configure
eas build --platform ios --profile production
```

Until `eas.json` exists, builds are produced directly via `npx expo run:ios --device` / Xcode Archive, which is a fully valid path to TestFlight (Xcode → Product → Archive → Distribute App → TestFlight & App Store).

## TestFlight process

1. Archive a Release build in Xcode (or `eas build` once configured) and upload via Xcode Organizer or `eas submit`.
2. Wait for Apple's automated processing to finish (usually minutes).
3. Add internal testers in App Store Connect → TestFlight.
4. Run through `QA_CHECKLIST.md` on the actual TestFlight build, not just a dev build.

## App Store submission preparation

See `APP_STORE_SUBMISSION.md` (listing copy, keywords, review notes, screenshot checklist) and `PRIVACY_NUTRITION_LABEL_DRAFT.md` (App Privacy questionnaire draft) before submitting.

## What's in the app

- **Identity-first onboarding** — validated stats (age/height/weight ranges, no negative numbers) → lifestyle → equipment → coach personality → animated plan generation
- **Today dashboard** — level ring + XP, streak & readiness tiles, a coach message computed from your real quest/streak state (never fabricated "yesterday" claims), quest list, quick logs, pull-to-refresh
- **Identity Engine** — every earn flows through one path: XP (level = 400·n), trait gains capped at +2/day with recorded reasons, reward toasts, confetti reserved for level-ups
- **Legacy** — a permanent, append-only life timeline (`/legacy`); the only seed entry is "Started the Journey," written the moment onboarding completes — nothing is pre-populated
- **Character** — earned title, rank ladder, traits, Legacy preview, badges, and Achievements computed from real logged data (workouts completed, best streak, weight change, PRs set) — no fake stats
- **Streak system** — a day counts at ≥70% of quests; milestone streaks (7/30/50/100/365) become Legacy entries
- **Train** — real per-day workout templates (Push/Pull/Legs/Upper/Conditioning) matching the actual weekly split, editable reps/weight per set, real workout history, automatic PR detection, real weight/measurement logging with honest empty states until you log something
- **Fuel** — macro dashboard, meal log (delete supported), a real preset+custom "Add meal" picker, water logging, and a real AI-generated Cut/Maintain/Bulk meal planner with a matching grocery list
- **Habits** — add/delete your own habits, streaks, difficulty, weekly history
- **Coach** — 5 personality modes, real Claude-powered replies grounded in your actual stats/streak/quests/macros — not scripted responses
- **Nutrition capture** — real barcode scanning (Open Food Facts), real AI photo estimate, real voice logging (on-device speech recognition; note: speech recognition does not work in the iOS Simulator — an Apple platform limitation since iOS 17, not a bug)
- **Legal & privacy** — Privacy Policy, Terms of Use, Health Disclaimer, and AI Coach Disclaimer, accessible from Profile
- **Data control** — "Delete My Data" with confirmation, fully wipes local state
- **Persistence** — everything above saved locally via AsyncStorage; no account, no server copy

## Architecture

```
src/
  app/                 # expo-router routes
    api/               # server-side Expo Router API routes (Claude calls) — never bundled to client
    legal/[doc].tsx     # Privacy/Terms/Health/AI-Coach disclaimer screens
    onboarding/        # 7-screen onboarding stack
    (tabs)/            # Today · Train · Character · Fuel · Coach
    habits.tsx         # pushed from Character / Today quick log
    profile.tsx        # pushed from Character (gear)
    legacy.tsx         # permanent timeline, pushed from Character
    workout-session.tsx
  components/          # UI kit + feature modals (nutrition capture, fitness logging)
  constants/theme.ts   # dark-first design system (colors, type, spacing, motion)
  lib/
    game.ts            # pure game math: XP curve, ranks, streak rule, readiness
    identity.ts        # Identity Engine: trait caps/reasons, titles, legacy rules
    coach.ts           # quick prompts + honest state-driven today-focus copy
    coach-ai.ts, nutrition-ai.ts, meal-plan-ai.ts, ai-errors.ts   # client helpers for the AI API routes
    barcode.ts          # Open Food Facts lookup
    data.ts             # static catalogs (quest/habit templates, workout templates) — no fake user history
    legal-content.ts     # Privacy/Terms/Health/AI Coach disclaimer text
    types.ts            # shared domain types
  state/
    app-context.tsx    # reducer + AsyncStorage persistence — single source of truth
docs/
  IDENTITY_PLATFORM.md # product architecture, flows, Legacy & Identity Engine specs
```

## Known limitations

- No backend, account system, or cross-device sync — everything is local to the device (by design; see `SUPABASE_SECURITY.md` for what adding one later would require).
- No real push notifications yet — Profile clearly labels this "Coming soon" rather than showing non-functional toggles.
- No in-app purchases/subscriptions yet — "LevelUp Pro" in Profile is clearly labeled "Coming soon," not an interactive fake trial.
- No `eas.json` yet — builds currently go through Xcode/`expo run:ios` directly (a valid path to TestFlight, just not EAS-automated).
- No automated test suite (no Jest) — `lib/game.ts` and `lib/identity.ts` are pure functions and would be the highest-value place to start.
- Apple Health / wearables integration are placeholder rows ("Coming soon").

## Launch checklist

See `APP_STORE_SUBMISSION.md` for the full checklist. Quick summary:

- [x] Support/marketing/privacy/terms pages live at `docs/` (GitHub Pages) — see `APP_STORE_SUBMISSION.md` for URLs
- [ ] Host the Privacy Policy and Terms text (`src/lib/legal-content.ts`) at a real public URL for App Store Connect
- [ ] Set `ANTHROPIC_API_KEY` in your production build environment
- [ ] Run `npx expo-doctor` and `npx tsc --noEmit` clean before every submission
- [ ] Full pass of `QA_CHECKLIST.md` on a real device, ideally the actual TestFlight build

## Verify

```bash
npx tsc --noEmit                 # typecheck
npx expo-doctor                  # dependency/config health check
npx expo export --platform web   # full bundle of every route
```
