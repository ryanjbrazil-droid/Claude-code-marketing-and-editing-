# App Store Submission — LevelUp

## App identity

- **App name:** LevelUp
- **Subtitle** (30 char max): `Discipline, gamified daily.`
- **Bundle ID:** `com.ryanbrazil.levelup`
- **Category:** Health & Fitness (primary), Lifestyle (secondary)
- **Age rating recommendation:** 12+ (Infrequent/Mild references to fitness/dieting; no mature content. Re-run Apple's age-rating questionnaire yourself in App Store Connect — this is a starting recommendation, not a submitted rating.)

## Promotional text (170 char max, editable post-launch without review)

> Your real life is now your game. Daily quests, XP, streaks, and an AI coach that actually knows your progress — not another generic habit tracker.

## Short description / marketing tagline

> Level up your discipline. One day at a time.

## Full App Store description (draft)

```
LevelUp turns your daily discipline — workouts, nutrition, habits, sleep — into one character you're
building for life. Not a fitness tracker. A permanent record of who you're becoming.

DAILY QUESTS, REAL XP
Complete your workout, hit your protein, protect your streak. Every action earns XP toward your next
level — and every trait you grow (Strength, Discipline, Focus, and more) is logged with why it grew.

AN AI COACH THAT ACTUALLY KNOWS YOU
Pick a coach personality — Supportive, Tough Love, Military, Big Brother, or Calm Mentor — and get real,
specific answers about your actual stats, streak, and goals. Not canned tips. Real answers to real
questions.

TRAIN WITH A REAL PLAN
A weekly push/pull/legs/upper split, editable sets and weights, rest timers, and automatic PR detection
— every workout you log builds real history.

FUEL WITHOUT THE SPREADSHEET FEEL
Log meals in seconds — scan a barcode, describe it by voice, snap a photo for an AI estimate, or pick
from quick presets. Macro targets, water tracking, and an AI meal planner that adjusts for Cut, Maintain,
or Bulk.

YOUR LEGACY, PERMANENT
Every rank-up and streak milestone gets written into a permanent timeline. Nothing is ever deleted.
Nothing is ever lost — even a broken streak doesn't erase the days you already showed up.

LevelUp is built for men who want to stop starting over and start building something that lasts.

This app is for general fitness and self-improvement purposes only and is not medical advice — see the
in-app Health Disclaimer before starting any new fitness or nutrition plan.
```

## Keywords (100 char max, comma-separated, no spaces after commas)

```
discipline,habit tracker,fitness,workout,streak,gamified,xp,coach,nutrition,gym,motivation,self improve
```

## Review notes for Apple

```
LevelUp has no user accounts, login, or backend — all data is stored locally on-device via
AsyncStorage. There is nothing to sign in to; you can go straight from install to onboarding.

The AI Coach, AI photo/voice meal estimation, and AI meal planner call the Anthropic API
(Claude) directly to generate responses. An active internet connection is required for those
three specific features only — the rest of the app (quests, habits, XP, workout logging, Legacy)
works fully offline.

No in-app purchases or subscriptions are implemented yet ("LevelUp Pro" in Profile is clearly
labeled "Coming soon" and is not interactive).

Health/AI disclaimers are accessible from Profile → Legal & privacy, and are also linked from
onboarding-adjacent flows. No medical claims are made anywhere in the app or its copy.
```

## Demo account

Not applicable — the app has no login or account system. A reviewer can use the app immediately after install by completing the on-device onboarding flow.

## Live URLs

Hosted via GitHub Pages from the `/docs` folder at the repo root (source: `main` branch, needs to be enabled once in the repo's Settings → Pages).

- **Support URL:** `https://ryanjbrazil-droid.github.io/Claude-code-marketing-and-editing-/support.html`
- **Marketing URL:** `https://ryanjbrazil-droid.github.io/Claude-code-marketing-and-editing-/`
- **Privacy Policy URL:** `https://ryanjbrazil-droid.github.io/Claude-code-marketing-and-editing-/privacy.html`
- **Terms of Use URL (EULA):** `https://ryanjbrazil-droid.github.io/Claude-code-marketing-and-editing-/terms.html`
- **Health Disclaimer:** `https://ryanjbrazil-droid.github.io/Claude-code-marketing-and-editing-/health.html`
- **AI Coach Disclaimer:** `https://ryanjbrazil-droid.github.io/Claude-code-marketing-and-editing-/ai-coach.html`

## Screenshot checklist (6.7" and 6.1" displays required; iPad optional if `supportsTablet` stays `false`)

- [ ] Today dashboard (level ring, streak, coach card, quest list)
- [ ] Character screen (rank ladder, traits, badges)
- [ ] Train — workout session in progress (sets, rest timer)
- [ ] Fuel — macro dashboard + meal log
- [ ] Coach — a real conversation exchange
- [ ] Onboarding — one strong "value prop" screen

## Final App Store checklist

- [ ] App icon present at all required sizes (`assets/images/icon.png` — verify via `npx expo-doctor`)
- [ ] Splash screen configured (already set in `app.json`)
- [ ] Privacy Policy hosted at a public URL and linked in App Store Connect
- [ ] Terms of Use / EULA hosted at a public URL
- [ ] Privacy Nutrition Label filled in App Store Connect (see `PRIVACY_NUTRITION_LABEL_DRAFT.md`)
- [ ] Age rating questionnaire completed in App Store Connect
- [ ] Screenshots captured for all required device sizes
- [ ] Build uploaded via EAS or Xcode Organizer, processed, and attached to the version
- [ ] TestFlight internal testing pass completed (see `QA_CHECKLIST.md`)
- [x] Real support email/URL in place (`ryanjbrazil@gmail.com`, `docs/` GitHub Pages site)
- [ ] Confirm `ANTHROPIC_API_KEY` is set in your EAS/build environment secrets, not just your local `.env` (a production build with no key will make all three AI features fail with a clean error message, not a crash — but they simply won't work)
