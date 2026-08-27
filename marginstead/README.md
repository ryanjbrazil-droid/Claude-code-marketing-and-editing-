# Marginstead — Vendor Profit-Leak Audit Validation

**Objective:** find out whether US heavy-duty repair businesses will **pay** Marginstead to
identify and recover money lost through vendor invoices, parts returns, core charges, vendor
credits, duplicate charges, price discrepancies and unreconciled transactions.

**Not the objective:** proving the idea is good. If the market rejects it, that gets reported
plainly and the idea is not forced.

---

## Contents

| Phase | File | What it is |
|---|---|---|
| 1 | [`research/01-competitor-analysis.md`](research/01-competitor-analysis.md) | Market map + competitor matrix across shop management systems, AP automation, reconciliation tools and enterprise recovery audit |
| 2 | [`research/02-ideal-customer-profile.md`](research/02-ideal-customer-profile.md) | ICP grounded in published heavy-duty benchmarks, with a point-scored qualification rubric |
| 3 | [`research/03-prospect-research.md`](research/03-prospect-research.md) · [`data/prospects.csv`](data/prospects.csv) | 150 real US prospects, tiered A/B/C, with source URLs and per-row confidence notes |
| 4 | [`outreach/04-outreach-strategy.md`](outreach/04-outreach-strategy.md) | Compliance gate, deliverability plan, 3 cold-email variants, follow-up, intake script |
| 5 | [`landing-page/`](landing-page/) | Deployable single-page site. [Preview](https://claude.ai/code/artifact/5d20f85d-a2bd-4786-8063-ab063ab13c22) |
| 6 | [`research/06-validation-scoreboard.md`](research/06-validation-scoreboard.md) | The scoreboard, the gates, and the failure conditions written down in advance |
| 7 | [`research/07-product-spec.md`](research/07-product-spec.md) | **LOCKED.** Product scope to build only after validation passes |

---

## Where things actually stand

**Validation Gate 3: 0 of 4 met.** No outreach has been sent. No product code should be
written.

### The three findings that matter most

**1. A direct competitor already exists and is ahead.**
WickedFile is an AP/reconciliation platform for auto repair that already does most of what
Marginstead proposed: AI invoice capture, invoice-to-RO matching, vendor statement
reconciliation, missing credits, duplicates, pricing errors, and explicit core-return
tracking. **It already integrates with Fullbay.** It was founded by a multi-location shop
owner after a $180k parts loss.

This is not fatal, but it changes the plan. WickedFile's centre of gravity is *light-duty
auto*, and it sells software first — integrate and subscribe before you see value.
Marginstead's remaining wedges are **heavy-duty specialisation**, **findings before payment**,
and **reading the vendor's documents rather than the shop's**. Those are real but thinner than
the original concept assumed.

**Act on it:** ask every prospect *"are you using anything today to check parts invoices
against your ROs?"* If a meaningful share name WickedFile, that is a strong negative signal
and belongs on the scoreboard immediately.

**2. The economics of the problem hold up.**
Parts and materials are **30–40% of revenue** in a heavy-duty shop — the largest single
expense line. The median shop has **8 employees and 5 technicians** and **54% report being
understaffed**. A $3M shop is buying roughly $900K–$1.2M of parts a year with nobody whose
job is checking whether the vendor credited it correctly. Enterprise recovery audit (PRGX,
CBIZ, GEP) has proven for decades that this leak is real and recoverable — on contingency —
but only at a scale that excludes a $3M truck shop. That gap is genuine.

**3. There is a live, timely, non-fabricated reason to look at 2025–2026 invoices.**
**TruckPro merged with FleetPride in October 2025.** Distributor mergers mean account
renumbering, price-file migration and statement format changes — exactly when duplicate
invoices and pricing discrepancies slip through. This is real, it is checkable, and it is the
basis of cold email Variant C.

---

## What blocks the next step

Two hard blockers, in order:

**1. No verified contact emails.** All 150 prospects have zero email addresses. Page fetching
was blocked by this environment's network policy, and inventing addresses would have violated
the brief and destroyed sending reputation on a new domain before the first real send. **Enrich
the 20 Tier A rows first** — roughly 5–8 minutes each — and let their reply rate decide whether
the other 130 are worth the ~15 hours.

**2. No physical business mailing address.** Required in the email footer under CAN-SPAM
(enforced per individual message, up to $53,088 each) and it should match the site. The
landing page footer currently carries a placeholder.

Neither is a research problem. Both are decisions and small amounts of manual work.

---

## The risk to design against

The funnel will most likely break at **step 10: record sets received** — not at replies. A
shop owner intrigued by a free audit still has to email a stranger their invoices, statements
and pricing. Interest is cheap; trust is not. Build for that: a written privacy commitment, a
smaller first ask, an NDA on request.

And the measurement that actually counts is not the free audit. It is the question asked
*after* findings are delivered:

> "If I did this every month across all your vendors, would that be worth paying for?"

A shop that loves the free audit and will not pay is a **negative** result and must be
recorded as one.

---

## Research honesty note

All research here was conducted by web search. **Direct page fetching was blocked by this
environment's network egress policy**, so no vendor pricing page, product page or prospect
website could be opened directly. Consequences, all handled explicitly rather than papered
over:

- Every competitor claim carries a confidence tag; unverified pricing is marked
  **not sales-ready** and must be re-checked before appearing in any pitch.
- Prospect contact emails and decision-maker names are **empty**, not guessed.
- Personalization points are real and sourced, or flagged `NEEDS RESEARCH` and not to be sent.
- Every prospect row carries source URLs and a per-row note on exactly which fields are
  verified.
