# Launch 20 — Gate 1 Working Queue

**Imported:** 2026-08-28 · **Source:** `Marginstead_Launch20_Curated.csv` (external curation of the 150-company pool)
**Supersedes:** `ARCHIVED-tier-a-enrichment-queue.csv` — retained for history only, no longer the working list.

| File | Role |
|---|---|
| `Marginstead_Launch20_Curated.csv` | **The working queue.** 20 companies. |
| `Marginstead_Prospect_Master_Ranked.xlsx` | **Master pool.** Sheets: Summary · Launch 20 · Backups & Holds · Full 150 |
| `prospects.csv` | Original 150-company research pool (now also inside the workbook's "Full 150" sheet) |
| `ARCHIVED-tier-a-enrichment-queue.csv` | Superseded queue, kept for audit trail |

---

## Status

| Status | Count | Meaning |
|---|---:|---|
| **SEND READY** | **15** | A decision-maker or business mailbox has been sourced from public information |
| **ENRICH FIRST** | **5** | No verified public email yet |
| **Total** | **20** | |

**SEND READY does not mean send.** Every mailbox must still pass **final deliverability /
mailbox verification** before email #1. Fifteen sourced addresses is not fifteen deliverable
addresses.

**ENRICH FIRST (5):** Schroeder Truck Repair (St. Louis) · Superior Diesel (Houston) ·
Fleet Master Truck & Trailer Repair (Bedford Park) · Goody's Fleet Solutions (Tampa) ·
All American Sleeper (Tampa).

**14 of 20 have a named decision maker.** Six do not; those use a business mailbox.

---

## Verification queue — check these before sending

The imported data is used as supplied. Nothing below has been altered. These are items a
mailbox-verification pass should resolve, ordered by how much a mistake would cost.

### A. Email domain differs from the company's known website domain — verify the mailbox belongs to the target business

| # | Company | Email domain | Known site | Note |
|---|---|---|---|---|
| 3 | Specialized Truck Repair | `sts-otr.com` | `specializedtruckrepair.com` | Plausible corporate/parent domain. Confirm `sts-otr.com` is the same business. |
| 6 | Southeast Fleet Services | `rwbost.com` | `southeastfleetservices.com` | Contact sourced from a **2023** Chamber PDF under a different company name. Confirm the person and the domain still map to this business. |
| 9 | Precision Truck & Trailer Repair | `precisiontruck.com` | `precisiontruckut.com` | **Highest risk.** Two similar but distinct domains. `precisiontruck.com` may be an unrelated business. Verify before sending. |
| 11 | FLA Semi Truck & Trailer Repair | `me.com` | `flatruckrepair.com` | Contact and sources reference **"AAA Semi Truck & Trailer Repair"**. Confirm these are the same entity, not two businesses conflated. |
| 8 | Superior Truck Service Inc | `gmail.com` | `superiortruckservicenc.com` | Personal-domain mailbox for an owner. Common for small shops; confirm it is the published business contact. |
| 7 | J&J Truck and Trailer Repair | `yahoo.com` | site now identified as `detroittrucktrailerrepair.com` | Free-mail but sourced from the shop's own contact page. |

### B. Email sourced from a third-party document rather than the company's own site

Not disqualifying, but a mailbox on a job ad or a procurement filing may be monitored by a
different person than the one you are writing to, or may be stale.

| # | Company | Source type |
|---|---|---|
| 2 | NW Fleet Truck/Trailer Repair | Oregon state procurement bid acknowledgment |
| 3 | Specialized Truck Repair | Nashville.gov purchasing council report (2026) |
| 6 | Southeast Fleet Services | Salisbury Post Chamber directory PDF (**2023 — oldest source in the set**) |
| 10 | Karen Truck & Trailer Repair | Trustindex review widget |
| 11 | FLA Semi Truck & Trailer Repair | **Indeed job posting** — likely a recruiting inbox; consider the phone instead |
| 13 | Equipment Experts Inc | City of Tacoma SBE vendor list PDF |

### C. Internal inconsistencies in the supplied row

| # | Company | Inconsistency |
|---|---|---|
| 3 | Specialized Truck Repair | `locations` = "7 listed on LinkedIn/site network"; `personalization` says "Four Middle Tennessee locations" |
| 6 | Southeast Fleet Services | `locations` = "5"; `personalization` says "Four shops across three states" |
| 19 | Goody's Fleet Solutions | Sunbiz source URL references "GOODYSEATERY / Goody Mob LLC" — confirm the corporate record actually belongs to Goody's Fleet Solutions before using the officer name |

**Fix the location count before it goes in an email.** Personalization is the whole point of
this campaign; telling a four-location owner they have seven undoes it.

### D. Generic mailboxes (6)

`info@` / `owners@` at ranks 5, 9, 10, 12, 15, 16. Legitimate, but expect lower response rates
and no name to open with. Where the row also carries a named decision maker (12, 15), address the
email to that person by name even though the mailbox is generic.

---

## Rules that still apply

- **Do not guess or pattern-generate any missing address.** For the 5 ENRICH FIRST rows, find a
  published address or use the phone. Never construct `firstname@domain`.
- **Do not send to a SEND READY row that fails mailbox verification.** Move it to ENRICH FIRST.
- **A bounce is expensive at this size.** One bad address out of 20 is a 5% bounce rate on a
  domain with no sending history.
- **Nothing sends until the launch blockers clear** — registered postal address, suppression/
  opt-out process, final mailbox verification.

---

## Strategic holds and removals (from the master workbook)

The workbook's "Backups & Holds" sheet records companies deliberately kept out of the first
wave — including **Connect Truck Center** and **OTR Fleet Service** (strategic hold: larger
footprint than the original research indicated) and **Trico Heavy Duty Truck Parts & Service**
(backup). **Blaine Brothers** is marked "remove from first wave — too large / finance-heavy."

This is consistent with the ICP: a shop large enough to employ a controller has already closed
the gap Marginstead sells into. These are not lost prospects; they are wrong-stage prospects.
