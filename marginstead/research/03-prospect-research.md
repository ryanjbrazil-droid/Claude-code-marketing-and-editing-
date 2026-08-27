# Phase 3 — Prospect Research

**Deliverable:** `marginstead/data/prospects.csv` — 150 US heavy-duty repair businesses
**Prepared:** 2026-08-27

---

## 1. Read this before you use the list

### What is real

Every one of the 150 companies is a **real business that appeared in live web search results**.
Nothing was invented. Company names, cities, states, websites, service descriptions,
bay counts, founding years, ownership statements and location counts are all taken from
search results that surfaced those businesses' own pages or established directories.

### What is missing, and why

**Direct page fetching is blocked by this environment's network egress policy.** I could run
web searches but could not open a single company website. That has one hard consequence:

> **The `public_business_email` and `decision_maker_email` columns are empty for all 150 rows.**

That is deliberate. Contact emails live on `/contact` pages I could not open. The brief said
*"Do not invent email addresses or facts."* Generating `info@<domain>.com` for 150 shops would
have filled the column and been worthless — a large share would bounce, and bounces on a new
sending domain are the single fastest way to destroy deliverability before the first real
send. An empty column is the correct output.

Similarly:

| Column | Fill rate | Why |
|---|---|---|
| `company_name`, `city`, `state`, `website` | 150 / 141 with URL | Search-verified |
| `main_phone` | 49 / 150 | Only where a phone appeared in search results |
| `public_business_email` | **0 / 150** | Requires opening the contact page — blocked |
| `decision_maker` | **0 / 150** | Requires site "About" pages or LinkedIn — blocked |
| `decision_maker_email` | **0 / 150** | Same, plus never guessable |
| `num_locations` | 35 identified as multi-location | Where stated in search results |
| `current_shop_software` | **0 / 150** | Shops do not publish this. See §4 for how to get it. |
| `likely_vendors` | 14 with real evidence | Only where a vendor was actually named |
| `personalization_point` | ~135 real; ~15 flagged `NEEDS RESEARCH` | Never fabricated |

**Rows whose `personalization_point` says `NEEDS RESEARCH` must not be emailed until a real
detail is found.** They are in the list because the business qualifies, not because it is
ready to contact.

---

## 2. Method

1. **Metro-by-metro sweep** across the freight corridors prioritized in the ICP (§5 of
   `02-ideal-customer-profile.md`): TX, CA, IL, GA, TN, OH, FL, NC, AZ, CO, MO/KS, NJ, PA,
   WA/OR, MN, WI, MI, UT, NV, AL, LA, IA/NE, OK, VA, MD, IN, KY, NM.
2. **Query pattern** targeted the ICP rather than generic listings — "heavy duty truck and
   trailer repair", plus "fleet maintenance", "diesel", "family owned", "bays", "phone
   address" — to surface established shops rather than one-van mobile operators.
3. **Scored** each result against the §2.8 rubric in the ICP.
4. **Filtered out** anti-ICP results that appeared in searches: OEM dealerships (The Pete
   Store, Baltimore Freightliner, Stowers Cat, Thompson Truck Group, Midway Ford Truck,
   California Truck Centers, Southwest International, Richmond Ford), FleetPride's own
   service branches (they are the vendor, not the customer), and pure lead-gen directory
   sites.
5. **Recorded source URLs** for every row so any claim can be re-checked.

---

## 3. What is in the list

| | |
|---|---|
| Total rows | **150** |
| States covered | **32** |
| With a website URL | **141** |
| With a phone number | **49** |
| Identified as multi-location | **35** |
| Tier A (score 8–9) | **20** |
| Tier B (score 6–7) | **120** |
| Tier C (score 5, needs qualification) | **10** |

### Tier A — start here

The 20 Tier A rows are the ones with the strongest public evidence of the exact conditions
that produce vendor leakage. Examples:

- **Connect Truck Center** (Markham, IL) — publicly states **10 service bays and 50+ diesel
  mechanics**, roughly ten times the industry median of five technicians.
- **NW Fleet Truck/Trailer Repair** (Seattle, WA) — **family-owned since 1987, four shops**
  across Portland, Tacoma, Seattle and Everett.
- **J&J Truck and Trailer Repair** (Detroit, MI) — family-owned since 1999, performs
  **complete engine swaps for CAT, Cummins, Detroit Diesel, Mercedes and Volvo**. Engine
  swaps are the highest core-value work in the industry, and five engine makes means five
  parts channels.
- **Superior Diesel** (Houston, TX) — **11 bays**, dedicated transmission specialists.
  Reman transmissions carry among the highest core charges in heavy-duty.
- **All American Sleeper** (Tampa, FL) — **family owned since 1943**. Eighty years of vendor
  relationships, and they sell parts as well as repair.
- **Specialized Truck Repair** (Nashville, TN) — **four Middle Tennessee locations**, 30+
  years.
- **Southeast Fleet Services** (Charlotte, NC) — **four shops across NC, SC and GA**, plus
  heavy equipment repair (hydraulic cores on top of truck cores).

### The 14 rows with real vendor evidence

Most shops do not name their suppliers publicly. Where they did, it is recorded and it is a
gift for outreach — a specific vendor to name in the first line:

- **Sam's Truck & Trailer** (Toledo, OH) — states it is **NAPA Certified**
- **Superior Truck Service** (Charlotte, NC) — described as a **NAPA truck service center**
- **Gary Johnston Truck & Auto** (Tulsa, OK) — **BG Products** service line
- **Diesel Pro Kansas City** — services Freightliner, Volvo, Peterbilt, Mack and
  International, implying accounts at five OEM dealer counters
- **ALBQ Mobile Truck Repair** — carries OEM diagnostic tools for Cummins, Detroit Diesel,
  Paccar, International and Volvo
- **Betts Truck Parts**, **Advanced Distribution Co**, **Trico**, **All American Sleeper**,
  **AMS Towing**, **On The Spot** — all run parts distribution alongside repair, meaning
  direct manufacturer accounts and unusually complex credit flows
- **Lone Star Tire & Diesel** — Detroit Diesel specialist
- **Fleetbarn**, **Pro Fleet Repair** — reefer repair, implying Thermo King / Carrier channels
- **Refuse Repair** — refuse body and hydraulic component channels

---

## 4. The work that has to happen before a single email is sent

This list is **research-complete but not contact-ready**. Three steps remain, in order:

### Step 1 — Enrich contacts (blocking)
For each Tier A row, open the website and collect: the public contact email, the owner or GM
name from the About page, and the main phone. Cross-check the owner name on LinkedIn.
**Budget roughly 5–8 minutes per shop; do Tier A (20 shops) first.**

Rules that do not bend:
- **Never construct an email address.** If the site shows only a form, record "web form only"
  and use the form, or call.
- **Verify every address you collect** through a validation service before sending. A new
  domain cannot absorb bounces.
- Prefer a named person over `info@`. In family shops the spouse who does the books is often
  the better contact than the owner — they feel this pain daily.

### Step 2 — Fill the `NEEDS RESEARCH` personalization points
About 15 rows have no real personalization detail yet. Find one — bay count, founding year,
a specific service line, a recent expansion — or drop the row. **Do not send a generic email.**

### Step 3 — Capture shop software during the conversation, not before
`current_shop_software` is empty for all 150 rows because shops do not publish it. Do not
guess. Instead, make it the **first intake question**, alongside the competitive question
from Phase 1:

> "What are you running for shop management — Fullbay, ShopView, something else?"
> "Are you using anything today to check parts invoices against your ROs?"

The second question is the most valuable data Marginstead can collect. If a meaningful share
of qualified heavy-duty shops already name WickedFile, that is a strong negative signal about
the market and should go straight onto the scoreboard.

---

## 5. Honest assessment of list quality

**Strengths**
- Every business is real and independently sourced, with source URLs recorded.
- Heavily weighted toward the ICP: multi-bay, multi-location, family-owned, high-core-value
  service lines (engine, transmission, differential, hydraulic, reefer).
- 32-state spread across genuine freight corridors, not a single-metro sample.
- 35 confirmed multi-location operators — the single strongest leak signal in the ICP.

**Weaknesses — state these plainly**
- **No contact emails.** The list cannot be emailed as-is. This is the binding constraint.
- **No decision-maker names.** Every first email would otherwise open "Hi there."
- **Employee and revenue counts are inferred**, not confirmed. Bay counts and technician
  counts appear only where a shop published them.
- **Roughly 10 Tier C rows are probably mobile-only** and may fail the $400K parts-spend
  threshold. They are marked `LOWER PRIORITY` with the specific check needed.
- **A few rows need a size check in the other direction.** Wiers, Epika, Kooner FMS,
  McCarthy Tire and W.W. Williams may be large enough to employ a controller, which closes
  the gap Marginstead exploits. Each is flagged in its `next_action`.
- **One dedupe is flagged:** rows 9 and 139 are likely the same operator (Goody's Fleet
  Solutions, Tampa and Atlanta).

**Recommendation:** enrich and send to the 20 Tier A rows first. Their reply rate will tell
you whether the other 130 are worth the enrichment effort — at 5–8 minutes each, enriching
all 150 is roughly 15 hours of work, and it should not be spent before Tier A has been
tested.

---

## 6. Where to find more prospects

Channels that surfaced real businesses during this research and are worth mining further:

- **Fullbay's own customer stories and testimonials pages** (`fullbay.com/customers`,
  `fullbay.com/testimonials`) — named shops with named owners who are *confirmed Fullbay
  users*. This is the single highest-value source available: it resolves the empty
  `current_shop_software` column and gives a decision-maker name at the same time.
  *(Note: Fullbay's published case studies include non-US shops — Coppertop Truck Repair is
  in Edmonton, Alberta — so filter for US businesses.)*
- **ShopView, Karmak and RTA customer pages** — same logic.
- **TMC (Technology & Maintenance Council) and ATA member directories.**
- **HDA Truck Pride and VIPAR Heavy Duty member locators** — these are parts program groups,
  so every member is confirmed to have distributor accounts.
- **Trade press** — Trucking Info, FleetOwner, Fleet Equipment, Truck Parts & Service shop
  profiles.
- **FleetPride and TruckPro branch locators** — not prospects themselves, but they map where
  the parts volume is, and therefore where qualifying shops cluster.

---

## 7. Column reference

| Column | Meaning |
|---|---|
| `id` | Row number |
| `tier` | A (start here) / B (qualified) / C (needs qualification first) |
| `score` | ICP rubric score out of the §2.8 signal list |
| `company_name`, `website`, `city`, `state`, `main_phone` | Search-verified where present; `UNKNOWN` where a site was not found |
| `public_business_email`, `decision_maker`, `decision_maker_email` | **Empty by design** — see §1 |
| `num_locations` | Where stated publicly |
| `services` | As described on their own pages |
| `why_they_qualify` | The specific ICP signals this shop hits |
| `likely_vendors` | **Only where a vendor was actually named.** Inferences are labelled "implied by" |
| `current_shop_software` | Empty — capture at intake, do not guess |
| `personalization_point` | A real, specific, verifiable detail, or `NEEDS RESEARCH` |
| `source_urls` | Pipe-separated; every claim is re-checkable |
| `data_confidence` | Exactly which fields are verified and which are not, per row |
| `outreach_status`, `reply_status`, `next_action` | Live tracking columns; `next_action` names the specific enrichment step |
