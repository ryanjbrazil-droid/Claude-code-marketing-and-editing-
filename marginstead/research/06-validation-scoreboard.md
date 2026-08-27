# Phase 6 — Validation Scoreboard

**Last updated:** 2026-08-27
**Status:** Pre-outreach. Nothing has been sent.

> Update this file after every batch of sends and every reply. It is the only honest record
> of whether this business should exist.

---

## THE SCOREBOARD

| # | Metric | Count | Notes |
|---|---|---:|---|
| 1 | **Prospects researched** | **150** | Real, independently sourced US heavy-duty businesses across 32 states. `data/prospects.csv` |
| 2 | **Qualified prospects** | **140** | 20 Tier A + 120 Tier B. 10 Tier C need qualification first. |
| 3 | **Contact-ready prospects** | **0** | **The current bottleneck.** 0 of 150 have a verified email address. |
| 4 | **Emails sent** | **0** | Blocked — see gates below |
| 5 | **Delivered** | 0 | |
| 6 | **Bounced** | 0 | Stop sending immediately if this exceeds 3% |
| 7 | **Replies** | 0 | Any human reply, including "no thanks" |
| 8 | **Positive replies** | 0 | Expressed interest or asked a question |
| 9 | **Audits requested** | 0 | Said yes to the free audit |
| 10 | **Record sets received** | 0 | **Actually sent files.** The single hardest step. |
| 11 | **Audits completed** | 0 | |
| 12 | **Discrepancies found** | 0 | Individual verified discrepancies |
| 13 | **Total potential money identified** | **$0** | Sum of verified discrepancies. Never estimate. |
| 14 | **Recovery requests** | 0 | Shops that actually went to the vendor |
| 15 | **Money actually recovered** | **$0** | Confirmed by the shop. The number that matters most. |
| 16 | **Customers willing to pay** | **0** | Said yes to paying for ongoing monitoring |
| 17 | **Revenue** | **$0** | Money actually received |

### Supplementary metrics — track these too

| Metric | Count | Why it matters |
|---|---:|---|
| Prospects already using WickedFile or equivalent | 0 | **The most important competitive signal available.** A high number is a strong negative result. |
| Prospects using Fullbay | 0 | Determines the first integration if Phase 7 is ever reached |
| Prospects using ShopView / Karmak / RTA / other | 0 | Same |
| Prospects using spreadsheets or paper | 0 | Highest leak probability, hardest audit |
| Audits completed that found **nothing** | 0 | **A clean audit is a real result. Record it honestly.** |
| Median audit turnaround (days) | — | A slow first audit kills the experiment |
| Opt-outs ("no thanks") | 0 | Must be honored permanently and immediately |

---

## GATES — nothing proceeds until these clear

### Gate 1 — Compliance and infrastructure (blocks all outreach)

| # | Item | Status |
|---|---|---|
| 1 | Valid physical business mailing address, in the email footer and on the site | ☐ **BLOCKING** |
| 2 | ryan@marginstead.com live and monitored | ☐ |
| 3 | SPF, DKIM, DMARC published for the sending domain | ☐ |
| 4 | Domain warmed 2–3 weeks | ☐ |
| 5 | Opt-out mechanism live; suppression list exists | ☐ |
| 6 | Every address verified before sending | ☐ |
| 7 | Landing page live over HTTPS with a privacy note | ☐ |

*Reference: CAN-SPAM applies to B2B email and is enforced per individual message, with a
maximum penalty of $53,088 per non-compliant email as of the FTC's January 2025 adjustment.
Full checklist in `outreach/04-outreach-strategy.md` Part 1.*

### Gate 2 — Contact enrichment (blocks outreach)

| # | Item | Status |
|---|---|---|
| 1 | Verified emails for the 20 Tier A prospects | ☐ 0/20 |
| 2 | Decision-maker names for the 20 Tier A prospects | ☐ 0/20 |
| 3 | `NEEDS RESEARCH` personalization points filled or rows dropped | ☐ ~15 outstanding |

### Gate 3 — Validation (blocks all significant product development)

**Do not write product code until this gate clears.** From the brief, strong evidence is
some combination of:

| Threshold | Target | Actual | Met? |
|---|---:|---:|:--:|
| Genuine replies from ~150 qualified prospects | 15+ | 0 | ☐ |
| Businesses willing to provide records | 5+ | 0 | ☐ |
| Audits finding legitimate financial discrepancies | 3+ | 0 | ☐ |
| Businesses demonstrating willingness to pay for ongoing monitoring or recovery | 1+ | 0 | ☐ |

**Gate 3 status: NOT MET — 0 of 4.**

---

## HOW TO READ THE RESULT — decide in advance, not afterwards

Writing the failure conditions down now, before any data exists, is the only protection
against rationalising a bad result later.

| Signal | Reading | Action |
|---|---|---|
| Under 5 replies from 150 qualified prospects | Message isn't landing, or the pain isn't felt | Diagnose which. Do not simply rewrite subject lines and re-send. |
| 15+ genuine replies | Real interest exists | Continue |
| Replies come in, but nobody sends records | **Most likely failure mode.** Curiosity without trust. | The bottleneck is data handover, not interest. Fix trust — a named privacy commitment, an NDA, a smaller ask. |
| Records arrive, audits find nothing | **The leak is not real at this size.** | **Report it clearly and stop.** This is a legitimate finding, not a setback. |
| Audits find money, nobody will pay | Problem is real but not painful enough to fund | Stop. A free service people like is not a business. |
| A large share already use WickedFile | Market is served; the wedge is narrower than assumed | Reassess before building anything |
| Gate 3 clears | Proceed to Phase 7 | Build only the scope in `07-product-spec.md` |

**The objective is not to prove the idea is good. It is to discover whether customers will
actually pay Marginstead.** If the market rejects it, report that clearly and do not force it.

---

## CURRENT HONEST ASSESSMENT

**What is genuinely known:**
- The problem is real in kind. Industry sources — Fullbay, Tekmetric, RTA, ShopView — all
  document core and credit tracking as a known failure mode, and RTA states core tracking
  "can save fleets thousands of dollars each year."
- The economics are plausible. Parts and materials are 30–40% of revenue in a heavy-duty
  shop, the largest single expense line, and 54% of shops report being understaffed.
- The recovery-audit model is proven at enterprise scale (PRGX, CBIZ, GEP) on contingency.
- Someone has already built the software version for auto repair after losing $180k
  themselves, and it integrates with Fullbay.

**What is completely unknown:**
- Whether a heavy-duty shop will hand over financial records to a stranger.
- How much money is actually recoverable per shop.
- Whether the amount is large enough to pay for.
- Whether WickedFile has already taken this market.

**Honest read on the biggest risk:** it is not that the leak isn't real — the evidence says
it probably is. It is **step 10, record sets received.** A shop owner who is intrigued by a
free audit still has to email a stranger their invoices, statements and pricing. Expect the
funnel to break there, and design against it deliberately.
