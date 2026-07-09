# App Store "Privacy Nutrition Label" — Draft

This is a draft for filling out App Store Connect's App Privacy questionnaire. It is written conservatively: **anything that leaves the device counts as "collected," even though LevelUp itself has no server and never stores it.** Do not submit "no data collected" — that would be inaccurate, since profile and meal data is transmitted to Anthropic for the AI features.

## Data collected

| Data type | Collected? | Notes |
|---|---|---|
| Name | Yes | Entered during onboarding, stored locally. Sent to Anthropic only as part of AI Coach requests (first name only, to personalize responses). |
| Age, height, weight, goal weight | Yes | Entered during onboarding, stored locally. Weight/goal fields and fitness stats are sent to Anthropic as context for AI Coach and AI meal planning requests. |
| Fitness/workout data (exercises, sets, reps, weight lifted, PRs) | Yes | Stored locally. Not sent to Anthropic except in aggregate/summary form as Coach context (e.g. streak, quest status) — raw workout logs are not transmitted. |
| Nutrition data (logged meals, macros) | Yes | Stored locally. Meal descriptions/photos you submit for AI estimation are sent to Anthropic to generate the estimate. Macro totals are sent as Coach context. |
| Photos (meal photos for AI estimate) | Yes | Only when you use "AI photo estimate." Sent directly to Anthropic for that one request; not stored on any LevelUp server (none exists). |
| Audio (voice meal logging) | Yes | Transcribed on-device by Apple's Speech framework; only the resulting text is sent to Anthropic, not the audio itself. |
| Chat/coach messages | Yes | Stored locally. Sent to Anthropic to generate each Coach response. |
| Precise location | No | Not collected. |
| Contact info (email, phone) | No | Not collected — there is no account or login. |
| Financial info | No | Not collected — no payments are implemented. |
| Browsing/search history | No | Not collected. |
| Identifiers (device ID, advertising ID) | No | Not collected. No analytics or advertising SDKs are present in the app. |
| Usage data / analytics | No | No analytics SDK is integrated. |
| Diagnostics/crash data | No, currently | No crash reporting SDK (e.g. Sentry) is integrated as of this audit. If one is added later, update this document and the Privacy Policy. |

## Data linked to you

Because there is no account system, "linked to you" is a judgment call — Apple's guidance treats data as linked if it's reasonably tied to your identity, which profile data (name, weight, goals) arguably is, even stored only locally. **Recommendation: declare Name, Health & Fitness data, and User Content (photos/meal text/chat) as linked to the user**, to be conservative.

## Data not linked to you

None with confidence — see above. If Apple's tooling requires at least one "not linked" category, none of the currently-collected types qualify; do not force one in to fill the section.

## Data used to track you

None. LevelUp does not use advertising or cross-app/cross-site tracking of any kind. No data is used to build an advertising profile or shared with data brokers.

## Data not used for tracking

All of it — nothing in this app is used for tracking as Apple defines the term (linking your data across other companies' apps/websites for advertising or measurement).

## Third-party services involved

| Service | Purpose | Data shared |
|---|---|---|
| Anthropic (Claude API) | Powers the AI Coach, AI photo/voice meal estimation, and AI meal planner | Name (first name only), fitness stats/goals, quest/habit status, macro totals, chat messages, and — only when you use those specific features — a meal description, photo, or voice transcript. See anthropic.com/privacy for how Anthropic handles this data. |
| Open Food Facts (public product database) | Powers barcode scan lookups | Only the scanned barcode number, sent directly from the app (`src/lib/barcode.ts`) — no name, profile, or other personal data. Keyless public API; see openfoodfacts.org/privacy. |

No other third-party SDKs (analytics, ads, crash reporting, attribution) are present in the codebase as of this audit — verified by inspecting `package.json` dependencies directly.

## Purpose of data collection

- **App functionality:** all locally-stored data (profile, quests, habits, meals, workouts) exists solely to run the app's core features on your device.
- **AI feature functionality:** data sent to Anthropic exists solely to generate that specific AI response (a Coach reply, a nutrition estimate, or a meal plan) — not for advertising, analytics, or any purpose beyond fulfilling your request.

## App Store Connect notes

- When filling out the questionnaire, answer per data type using the table above — most types should be marked "Used for App Functionality" only, none for "Third-Party Advertising" or "Analytics."
- Re-run this audit if you add: analytics, crash reporting, push notifications (which may involve a push token — a device identifier), Apple Health integration, or any payment/subscription system. Each of those changes what must be declared here.
