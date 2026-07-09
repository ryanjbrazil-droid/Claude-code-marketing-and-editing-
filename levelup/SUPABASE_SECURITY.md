# Supabase / Backend Security

## Current state: no backend exists

LevelUp does not use Supabase, or any backend/database, today. There is no `@supabase/supabase-js` dependency, no auth provider, and no network account of any kind in this codebase. All application state (profile, quests, habits, meals, workouts, weight log, PRs, measurements, chat, Legacy) is persisted **locally on-device** via `@react-native-async-storage/async-storage`, under a single key (`levelup/state/v1`) managed in `src/state/app-context.tsx`.

The only network calls the app makes are to the Anthropic API (Claude), for the AI Coach, AI photo/voice meal estimation, and AI meal planning — see `src/app/api/*+api.ts`. These are stateless request/response calls; Anthropic does not become a database of record for this app, and no user account is created there either.

This document exists so that **if/when a real backend is added**, the security model is already thought through before the first table is created.

## If Supabase is added later — required setup

### Required tables (minimum viable schema)

| Table | Purpose | Required `user_id` column |
|---|---|---|
| `profiles` | Name, age, height, weight, goal, coach personality | `id` (= `auth.users.id`) |
| `quests` / `daily_quests` | Per-day quest completion state | `user_id` |
| `habits` | User-created habits + streaks | `user_id` |
| `meals` | Logged meals | `user_id` |
| `workout_history` | Completed workout sessions | `user_id` |
| `weight_log` | Weigh-in entries | `user_id` |
| `personal_records` | Lift PRs | `user_id` |
| `measurement_log` | Body measurement entries | `user_id` |
| `legacy_events` | Permanent append-only timeline | `user_id` |
| `chat_messages` | Coach conversation history | `user_id` |

**Every table above must have a `user_id` (or `owner_id`) column with a foreign key to `auth.users.id`, non-nullable, indexed.** There is currently no code that assumes otherwise, so this maps cleanly onto the existing local reducer shape in `app-context.tsx`.

### Required Row Level Security (RLS) policies

For every table listed above, at minimum:

```sql
alter table <table_name> enable row level security;

create policy "select_own_rows" on <table_name>
  for select using (auth.uid() = user_id);

create policy "insert_own_rows" on <table_name>
  for insert with check (auth.uid() = user_id);

create policy "update_own_rows" on <table_name>
  for update using (auth.uid() = user_id);

create policy "delete_own_rows" on <table_name>
  for delete using (auth.uid() = user_id);
```

`legacy_events` should likely omit the `delete` policy (or restrict it) since the product intent is that Legacy is append-only and permanent — enforce that server-side, not just in the client UI.

### Setup notes

- Use Supabase Auth (email/magic-link or Sign in with Apple — **Sign in with Apple is required by App Store guidelines if any other third-party login is offered**, so if Google/email sign-in is ever added, Apple sign-in must be added too).
- Never ship the Supabase **service role key** in the mobile app bundle. Only the anon/public key belongs in client code, and only with RLS enabled on every table — an anon key with RLS off is equivalent to a public database.
- Store the Supabase URL and anon key in environment variables (`EXPO_PUBLIC_SUPABASE_URL`, `EXPO_PUBLIC_SUPABASE_ANON_KEY`), not hardcoded. The `EXPO_PUBLIC_` prefix is required for Expo to expose them to client code — but remember anything with that prefix is bundled into the shipped app and is not a secret. The service role key must never get an `EXPO_PUBLIC_` prefix or ship client-side at all.
- Plan a real account-deletion RPC/edge function (`delete_my_account`) that cascades across every table above, callable only by the authenticated user for their own `auth.uid()`. Right now the app's "Delete My Data" button (`src/app/profile.tsx`) only wipes local `AsyncStorage`, which is honest and correct for the current no-backend state, but will need a real server-side counterpart once accounts exist.

### Unresolved backend risks (for whoever builds this next)

- No migration tooling is set up yet (no `supabase/migrations` directory). Use the Supabase CLI's migration workflow from day one rather than hand-editing the dashboard.
- Decide whether AI coach chat history should live server-side at all, given it may include health-adjacent context (weight, goals) — if so, it needs the same RLS treatment as everything else, no exceptions.
- If Apple Health / wearables integration ships (currently "Coming soon" placeholders in Profile), that data is medical-adjacent and should be scoped particularly carefully in both RLS policy and the Privacy Policy (`src/lib/legal-content.ts`).
