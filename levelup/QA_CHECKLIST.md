# QA Checklist — Manual Test Pass

Run through this on a real iPhone before every TestFlight build, not just Simulator — several items below (keyboard, safe area, camera/mic permissions) do not reliably reproduce in Simulator.

## Fresh install

- [ ] Delete the app fully, reinstall, launch — lands on onboarding, not a stale dashboard
- [ ] No console errors, no red-screen crash on first launch
- [ ] Splash screen shows and dismisses cleanly (no flash of blank white/black screen first)

## Onboarding

- [ ] Each of the 7 steps advances correctly; back button returns to the previous step without losing entered data
- [ ] Stats screen: try a negative age, age 0, age 200 — Continue should stay disabled and show an inline range error
- [ ] Stats screen: leave Name blank — Continue stays disabled
- [ ] Completing onboarding routes to the Today dashboard, not back to onboarding
- [ ] Level shows 0, XP shows 0/0, streak shows "Day 1" — no leftover demo data

## Returning user (no accounts — this means "app relaunch with existing local data")

- [ ] Force-quit and reopen the app — lands on Today dashboard directly, onboarding is **not** repeated
- [ ] All previously logged meals/habits/workouts/quests are still present after relaunch

## Auth/session behavior

- [ ] N/A — LevelUp has no accounts, login, or session of any kind. Confirm no login screen ever appears anywhere in the app.

## Complete / uncomplete a quest

- [ ] Tapping an incomplete quest marks it done, awards XP immediately, updates the XP bar without a refresh
- [ ] Un-checking a completed quest refunds XP and reverts the day's trait gains for that category (no silent XP duplication)
- [ ] Toggling the same quest on/off repeatedly does not net-gain XP (anti-farming check — see `earn()` / `TOGGLE_QUEST` in `app-context.tsx`)

## XP / level updates

- [ ] Completing enough quests to cross a level boundary triggers the level-up toast + confetti
- [ ] Rank updates correctly at each `RANK_FLOORS` threshold (`lib/game.ts`)
- [ ] Level and XP persist correctly after force-quitting the app

## Streak logic

- [ ] Completing ≥70% of today's quests counts the day toward the streak (`STREAK_THRESHOLD` in `lib/game.ts`)
- [ ] Un-completing quests below the 70% threshold after the streak was already counted decrements it correctly
- [ ] Streak milestones (7/30/50/100/365) write a permanent Legacy entry

## Nutrition entry

- [ ] "Add meal" opens the picker with presets + a working "Log something else" custom entry
- [ ] Custom entry with 0 or blank calories/macros doesn't crash; name is required to submit
- [ ] Deleting a meal recalculates the protein quest correctly (including revoking XP if it drops back below target)
- [ ] Voice log, AI photo estimate, and barcode scan each: work end-to-end on a **real device** (Simulator has no camera and speech recognition is broken in Simulator since iOS 17 — this is an Apple platform limitation, not a bug)

## Water tracking

- [ ] Quick-add water buttons (+8/+16/+24 oz) update the total and the water quest immediately
- [ ] Hitting the water goal awards XP exactly once, not repeatedly

## Workout completion

- [ ] Workout screen loads the correct exercises for **today's actual day** in the split (Push/Pull/Legs/Upper/Conditioning) — not a fixed list regardless of day
- [ ] Reps/weight per set are editable; toggling a set "done" doesn't require exact template values
- [ ] Finishing a workout logs a real history entry, and any top set that beats an existing PR updates Character → Achievements and Train → Progress → Strength PRs
- [ ] Rest days show a "Today is a Rest Day" message instead of a workout list

## Profile edit

- [ ] Profile fields correctly reflect onboarding answers
- [ ] Coach personality change from Profile updates the Coach tab immediately

## Sign out / data deletion

- [ ] N/A for "Sign out" — no accounts exist.
- [ ] Profile → "Delete My Data" shows a confirmation alert before wiping anything (never destructive without confirmation)
- [ ] Confirming deletion resets the app to onboarding with zero data, and this persists after force-quitting

## Account deletion request

- [ ] Profile → "Contact support" opens a working mailto link
- [ ] Since there is no backend account to delete, confirm the in-app copy is honest about this (no false promise of a server-side deletion request)

## Privacy / legal screens

- [ ] Profile → Legal & privacy → each of Privacy Policy, Terms of Use, Health Disclaimer, AI Coach Disclaimer opens and renders full text, no crash, no "not found"
- [ ] Back navigation from each returns to Profile correctly

## App restart

- [ ] Force-quit mid-workout, mid-onboarding, and mid-Coach-chat — reopening doesn't crash and doesn't corrupt persisted state

## Offline behavior

- [ ] With Wi-Fi/cellular off: quests, habits, XP, workout logging, Legacy, and manual meal entry all work fully offline
- [ ] With Wi-Fi/cellular off: Coach, AI photo/voice estimate, and AI meal plan fail with a clean, friendly error message — not a crash or infinite spinner

## AI service unavailable (Anthropic outage or missing API key)

- [ ] All three AI features show the friendly error copy from `friendlyApiError()` (`lib/ai-errors.ts`), not raw JSON
- [ ] The rest of the app remains fully usable while AI features are down

## Invalid inputs

- [ ] Negative/zero/absurd values are rejected everywhere numeric input exists (onboarding stats, weight log, measurement log, custom meal entry, add-habit)
- [ ] No screen crashes on empty string input to a numeric field

## Small iPhone (SE / mini form factor)

- [ ] Onboarding numeric fields are not hidden behind the keyboard
- [ ] Bottom tab bar doesn't clip content on any tab
- [ ] Modals (Add meal, Add habit, Log weight, Log measurement, Voice/Photo/Barcode) are fully scrollable and dismissible

## Large iPhone (Pro Max)

- [ ] No excessive whitespace or broken layout stretching on wider screens
- [ ] Safe area insets respected top and bottom on all screens (notch/Dynamic Island, home indicator)

## Keyboard behavior

- [ ] Every TextInput-bearing screen (onboarding, Coach chat input, add-meal custom form, log-weight, log-measurement) keeps the active field visible above the keyboard
- [ ] Dismissing the keyboard doesn't leave the layout shifted

## Safe area behavior

- [ ] Header titles never sit under the status bar/notch
- [ ] Footer action buttons (Finish Workout, submit buttons) never sit under the home indicator

## TestFlight build

- [ ] Build installs and launches from the TestFlight app itself (not just a direct Xcode/dev-client install)
- [ ] App icon and display name appear correctly on the home screen
- [ ] No development/debug banners or menus appear in the TestFlight build
- [ ] `ANTHROPIC_API_KEY` is present in the build environment — verify by testing one AI feature end-to-end in the TestFlight build itself
