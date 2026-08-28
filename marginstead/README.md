# Marginstead Recovery

**A managed vendor-credit and parts-money recovery service for heavy-duty repair businesses.**

> **Finding it is the easy part. We manage the claim until the credit actually posts.**

> **MODE A ONLY (Gate 0).** Marginstead does not contact vendors, represent customers, or hold
> recovered funds. We find the issue, build the claim, manage the follow-up process, and verify
> the credit posts — **the customer sends every communication, in its own name.** Mode B is
> locked pending legal review. See [`research/09-gate-0-regulatory.md`](research/09-gate-0-regulatory.md).

**Objective:** find out whether US heavy-duty repair businesses will **pay** Marginstead to
recover money lost through vendor credits, parts returns, cores, warranty credits, duplicate
charges and short credits.

**Not the objective:** proving the idea is good. If the market rejects it, that gets reported
plainly and the idea is not forced.

---

## Current status

**Gate 0 open (counsel not engaged). Gate 1 — 0 of 20 complete.** Nothing sent. **No SaaS development.**

Gate 0 blocks **Gate 6** only. Enrichment, outreach, record intake and the first audit proceed in
parallel with legal review — **but legal review is the longest-lead item in the plan and sits in
the critical path to revenue, so start it now.**

**Immediate goal:** get **one** qualified business to provide records for **one vendor, one
month**. That is Gate 4, and everything before it exists to produce it.

---

## Contents

| File | What it is |
|---|---|
| [`research/09-gate-0-regulatory.md`](research/09-gate-0-regulatory.md) | **Read first.** Mode A definition, prohibited activities, questions for counsel, realized-recovery pricing |
| [`research/08-positioning-marginstead-recovery.md`](research/08-positioning-marginstead-recovery.md) | Positioning, the nine-step workflow, honest risks |
| [`research/01-competitor-analysis.md`](research/01-competitor-analysis.md) | Market map + competitor matrix, with the 2026-08-28 WickedFile update at the end |
| [`research/02-ideal-customer-profile.md`](research/02-ideal-customer-profile.md) | ICP grounded in published heavy-duty benchmarks (unchanged by the pivot) |
| [`data/tier-a-enrichment-queue.csv`](data/tier-a-enrichment-queue.csv) | **The working list.** 20 prospects, ranked, awaiting contact verification |
| [`data/prospects.csv`](data/prospects.csv) · [`research/03-prospect-research.md`](research/03-prospect-research.md) | The full 150-prospect list. Tier B/C parked. |
| [`outreach/05-recovery-outreach.md`](outreach/05-recovery-outreach.md) | **Email #1**, follow-up, intake script, competitor questions, pre-send checklists |
| [`outreach/04-outreach-strategy.md`](outreach/04-outreach-strategy.md) | Superseded copy; **Part 1 compliance section still governs** |
| [`ops/data-handling.md`](ops/data-handling.md) | **Blocking.** Secure upload, retention policy, authorization modes |
| [`landing-page/`](landing-page/) | Deployable page + a full change log. [Preview](https://claude.ai/code/artifact/5d20f85d-a2bd-4786-8063-ab063ab13c22) |
| [`research/06-validation-scoreboard.md`](research/06-validation-scoreboard.md) | The eight gates, all metrics, failure conditions written in advance |
| [`research/07-product-spec.md`](research/07-product-spec.md) | **LOCKED.** Not to be built until Gate 8 |

---

## Why the positioning changed

WickedFile is confirmed active in heavy-duty — it publishes heavy-duty content, integrates with
**Fullbay**, and already does invoice-to-RO reconciliation, vendor statement reconciliation,
missing-credit detection, pricing-error detection, duplicate detection and core-credit tracking.
**The detection layer is taken.**

But from WickedFile's own description of how it works: it **flags discrepancies and assigns
resolution tasks to your team** so **you can follow up**. It does not contact vendors. The
shop's staff still chases every discrepancy.

Set that against the ICP finding that **54% of heavy-duty shops report being understaffed**,
with a median of 8 employees and no controller. A tool that ends by assigning a task to a team
with no spare hours produces a longer list of known-unresolved problems, not recovered money.

**The gap between *identified* and *recovered* is the entire business.** And it is not a novel
model — enterprise AP recovery audit (PRGX, CBIZ, GEP, Auditec, Paladin) has pursued supplier
claims on contingency for decades. Those firms won't touch a $3M truck shop. Marginstead
Recovery is that model at shop scale.

**WickedFile is now a potential data source, not a competitor.** A shop running it is *better*
qualified — its discrepancies are already found and sitting unworked:

```
Fullbay / ShopView  ->  WickedFile (optional)  ->  MARGINSTEAD RECOVERY
   what should         detection: flags it,        does the work, until
   have happened       assigns a task              the money posts
```

---

## Blockers

| # | Blocker | Gate | Owner action |
|---|---|---|---|
| 1 | **No registered business postal address** | 2 | Required in the email footer under CAN-SPAM (enforced per message, up to $53,088 each). Landing page footer also carries a placeholder. |
| 2 | **0 of 20 verified contact emails / decision makers** | 1 | ~5–8 min per shop. If an address can't be verified, leave it blank and call instead — never construct one. |
| 3 | **Retention policy not published** | 4 | Text is written; needs a stable URL. The intake email links to it. |
| 4 | **Secure upload folders not set up** | 4 | Paid business cloud storage, 2FA, one private folder per customer. |
| 5 | **"Account credit vs. cash" fee definition unsettled** | 6 | If a vendor issues a $3,000 account credit, the shop has value but no cash and owes $600. Decide before quoting anyone. |
| 6 | **Authorization document not drafted or reviewed** | 6 | Needs a lawyer before anyone signs. |

Blockers 1–2 stop email #1. Blockers 3–4 stop the first record set. Blockers 5–6 stop the first
recovery.

---

## The two risks worth watching

**Gate 7 is the real test.** Gates 4–6 measure whether shops will engage. Gate 7 measures
whether vendors actually pay a well-documented, consistently followed-up claim — the one
assumption Marginstead cannot control and has no evidence for. Nothing before Gate 7 proves the
business works.

**Mode A adds a specific new failure mode:** the customer has to actually send the claim. If
shops authorize work and then never send anything, the value proposition is weaker than assumed.
That is now tracked as its own scoreboard metric.

**WickedFile can add recovery faster than Marginstead can build software.** They have the data,
the customers, and a roadmap that already mentions vendor payment execution. The only defence
is speed — a service can start this week; software cannot.

---

## Standing rules

- **No fabricated results.** No customers, testimonials, case studies or dollar figures — and
  no quoting a competitor's recovery figures as suggestive of Marginstead's.
- **No claimed integrations.** Marginstead integrates with nothing. It reads documents.
- **Never invent a contact address.** Blank beats guessed.
- **A shop that loves the free work and won't pay is a negative result** and is recorded as one.
- **Precision over volume.** A shop that takes three bad claims to its FleetPride rep loses
  credibility with that vendor and never works with Marginstead again.
- **Never contact a vendor**, even if a customer asks. Mode B is locked until counsel clears it.
- **Never hold customer funds.** Recovered money goes vendor → customer directly.
- **A promise is not a recovery. An unapplied credit is not a recovery.**
