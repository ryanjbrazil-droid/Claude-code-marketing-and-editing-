# LevelUp — Identity Platform Architecture

> LevelUp is not a fitness app. It is an identity platform. The Character is
> the product; workouts, nutrition, sleep, habits, reading, and learning are
> input streams that strengthen it. This document is the canonical spec for
> that repositioning. Items marked **[shipped]** exist in the codebase today;
> items marked **[backend]** require real persistence/AI and are specified
> here so the current code never has to be re-architected to add them.

---

## 1. Product architecture

```
                          ┌───────────────────────────┐
                          │        CHARACTER          │  the product
                          │  level · rank · titles    │
                          │  traits · legacy timeline │
                          └────────────▲──────────────┘
                                       │ every earn writes upward
        ┌──────────────┬───────────────┼───────────────┬──────────────┐
        │    TODAY     │     TRAIN     │     FUEL      │    HABITS    │   input streams
        │ daily quests │   workouts    │  nutrition    │  discipline  │
        └──────────────┴───────────────┴───────────────┴──────────────┘
                                       │ observed by
                          ┌────────────▼──────────────┐
                          │          COACH            │  the witness
                          │  memory of years of data  │
                          └───────────────────────────┘
```

Three layers, one write path:

- **Input streams** (Today / Train / Fuel / Habits) capture real-world action.
- **The Identity Engine** (`src/state/app-context.tsx#earn`, `src/lib/identity.ts`)
  is the *only* code path that converts action into identity: XP, capped trait
  gains with recorded reasons, and Legacy entries. **[shipped]**
- **The Character** renders the accumulated result; **the Coach** narrates it.

Audit rule applied to every feature: *does it strengthen identity, deepen the
coach relationship, or add to the Legacy?* Features that failed were folded in
or demoted (see §10).

## 2. Navigation

Five tabs; Character holds the center slot — thumb-reachable, structurally
central, visually the destination the other four feed. **[shipped]**

```
Today  ·  Train  ·  [CHARACTER]  ·  Fuel  ·  Coach
```

Pushed screens: Habits (from Character + Today quick log), Profile (gear on
Character), Legacy (from Character), Workout Session (modal from Today/Train).

## 3. Screen hierarchy

```
Character (center tab)         ← the biography
├── Hero: avatar ring · name · earned title · level · rank · XP
├── Legacy preview (last 3) → /legacy (full timeline)
├── Rank ladder
├── Next unlock (anticipation)
├── Habits summary → /habits
├── Traits (earned, capped, explained)
├── Badges · Achievements
└── ⚙ → /profile

Today (landing tab)            ← the doorway
├── Level card (taps → Character)
├── Streak + Readiness tiles
├── Coach's one instruction → Coach
├── Up next (single action)
├── Quests + streak-protection meter
└── Quick log

Train / Fuel                   ← input streams (plan, session, macros, meals)
Coach                          ← the witness (chat, memory-driven)
```

Today remains the *landing* screen deliberately: identity is the destination,
but the daily loop is the doorway. Landing users on a biography every morning
would read as vanity; landing them on today's work and letting every earn pull
them toward the Character builds the attachment honestly.

## 4. Core user flows

**Daily loop:** open → Today → complete quest → toast shows XP *and trait
gains* ("+350 XP — Workout Complete / Strength +1 · Discipline +1") → level
card fills → tap → Character shows the trait that moved and why. **[shipped]**

**Milestone flow:** streak hits 7/30/50/100/365, or rank changes → Legacy
entry written automatically, permanently → Coach references it the next
morning ("30 days. That's in your Legacy now — nobody can take it back").
Legacy write is **[shipped]**; coach reference is **[backend]**.

**Setback flow (spec):** streak breaks → app shows the Legacy, not the zero:
"The streak reset. The 26 days didn't — they're in your record. Day one is
how every entry up there started." Loss of streak must never mean loss of
identity; this is the anti-churn moment.

**Ten-year flow (spec):** Legacy timeline becomes scrollable years; annual
"chapters" auto-summarize ("2027: the year you became someone who runs").
Character screen renders tenure visibly (rank frame, title history).

## 5. Wireframes

```
CHARACTER                         LEGACY
┌─────────────────────────┐      ┌─────────────────────────┐
│ You                  ⚙  │      │ ‹ Legacy                │
│      ╭───────╮          │      │ The permanent record…   │
│      │  RB   │ ◜XP ring◝│      │ ◉ Jun 28 · Bronze Rank  │
│      ╰───────╯          │      │ │  Level 10 · earned    │
│        Ryan             │      │ ◉ Jun 24 · Bench 225    │
│    “The Consistent”     │      │ │  Two plates.          │
│  Level 12 · Bronze      │      │ ◉ Jun 8 · 50 Workouts   │
│  1,390 / 4,800 XP       │      │ │  Fifty sessions.      │
│ ▓▓▓▓▓▓░░░░░░░░░░░░░     │      │ ◉ May 1 · First 5 lb    │
│ LEGACY      View all 7 →│      │ │  196.2 → 191.0        │
│ ◉ Bronze Rank · Jun 28  │      │ ◉ Apr 9 · 7-Day Streak  │
│ ◉ Bench 225   · Jun 24  │      │ ◉ Apr 2 · Started ⚑     │
│ ◉ 50 Workouts · Jun 8   │      │ "The next entry is      │
│ TRAITS                  │      │  up to you."            │
│ Discipline 43 ▓▓▓▓▓▓▓░  │      └─────────────────────────┘
│  Last gain: workout…    │
└─────────────────────────┘
```

## 6. Progression system

| Layer | What it is | Resets? | Source |
|---|---|---|---|
| XP / Level | daily fuel (level = 400·n XP) | never decreases* | quests, habits |
| Rank | Beginner → Legendary, milestone identity | never | level floors |
| Traits | 7 earned attributes, ≤2/day each, reasons logged | never | Identity Engine |
| Titles | "The Consistent", "Early Riser"… | can lapse (streak-based ones) | sustained behavior |
| Streak | urgency layer | yes — by design | 70% daily quests |
| Legacy | permanent biography | **never, ever** | milestones only |

*Un-checking a quest refunds XP quietly (anti-gaming), but no automated system
ever reduces level, traits, or Legacy. The streak is the only thing that can
be lost, and (spec, **[backend]**) streak insurance absorbs one miss per month.

## 7. Legacy system **[shipped v1]**

- `LegacyEvent { id, date, title, detail, icon, category }`; append-only array
  in app state; UI offers no edit or delete anywhere.
- Auto-writers today: rank-ups (in `earn`), streak milestones 7/30/50/100/365
  (in `reconcileStreak`). Seeded with the origin story ("Started the Journey").
- Spec **[backend]**: PR-based entries (first 225 bench), body milestones
  (first 10 lb), reading (50 books), user-proposed entries (promotion, new
  skill) — user-proposed entries require coach confirmation ritual so the
  timeline stays earned, not journaled.
- Presentation: reverse-chronological rail; closing line "Everything above was
  earned. The next entry is up to you."

## 8. Identity Engine specification **[shipped v1]**

- **Traits move only through `earn()`.** No setter exists; the UI has no edit
  affordance. Each change appends `TraitChange { trait, delta, reason, day }`.
- **Transparency:** every trait row shows its latest reason ("Last gain:
  workout complete") or, if never moved, what feeds it (`TRAIT_SOURCES`).
- **Anti-gaming:** per-trait daily cap (`TRAIT_DAILY_CAP = 2`). Grinding ten
  reading quests in an evening moves Knowledge exactly as much as two.
  Spec **[backend]**: diminishing returns over rolling 7-day windows; decay
  only after 60+ days of total inactivity in a trait's sources (slow, honest,
  and announced by the coach — never silent).
- **Inference (spec, backend):** hidden traits like Resilience are *inferred*,
  not tallied — e.g. Resilience increments only when data shows a comeback
  (streak broken → 7 consecutive days within 2 weeks). Courage: attempting
  PRs above historical max regardless of outcome. Every inferred change still
  carries a human-readable reason; "the system noticed" is never acceptable.

## 9. Coach memory architecture **[spec — backend]**

Three memory tiers feed prompt assembly for the real AI coach:

1. **Episodic log** — raw events (workouts, meals, sleep, chat), retained ~90
   days at full resolution.
2. **Semantic memory** — rolling summaries distilled weekly/monthly/yearly:
   patterns ("sleep declines precede skipped workouts by ~3 days"),
   seasonal effects ("Novembers are historically weak"), preferences.
3. **Legacy + trait ledger** — permanent, already structured (§7, §8); the
   coach cites these verbatim ("You've recovered from this before — March 2027").

Reply pipeline: user message + today's state + semantic summaries + relevant
legacy entries → model → reply that references specifics. The current mock
already has the right seams: `USER_CHAT`/`COACH_REPLY` actions, typing
indicator, personality modes — swapping `coachReply()` for the pipeline
touches one function. The coach's value must compound annually: more history
in tiers 2–3 = better mentorship, which is the retention moat.

## 10. Feature audit & rationale

| Feature | Verdict | Change |
|---|---|---|
| Character/You tab | strengthen | Renamed Character, center slot, titles + traits + Legacy preview **[shipped]** |
| Stats | redesign | Became earned Traits with reasons + caps **[shipped]** |
| Streak | keep, reframe | Urgency layer only; milestones feed Legacy; must never destroy identity **[shipped]** |
| XP toasts | strengthen | Now show trait gains, not just points **[shipped]** |
| Badges/achievements | keep | Feed Legacy at unlock (v1: streak badge auto-earns) |
| Train / Fuel screens | keep | They are input streams; audit passed — every completion writes upward |
| Coach | strengthen | Typing presence shipped; memory architecture specified (§9) |
| Quick-add fake meals | flagged | Placeholder until real logging; harmless in demo, removed at backend |
| Subscription card | keep | Future pricing hangs off coach memory + legacy export, not checklists |

**Tradeoffs accepted:** (1) Today stays the landing screen — identity is the
destination, not the doorway; revisit only if analytics show Character visits
< 1/day. (2) Traits capped at +2/day means slow visible movement — correct;
identity should move like a savings account, not a slot machine. (3) Legacy
v1 auto-writes only ranks and streaks — better to under-write a permanent
record than pollute it. (4) No social layer — comparison is the enemy of
identity; the only competitor is your past self.

**The 10-year answer:** a user never uninstalls LevelUp for the same reason
they never burn a photo album. The streak got them through month one, the
coach through year one; the Legacy is why year ten is unthinkable to delete.
