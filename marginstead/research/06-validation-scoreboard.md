# Validation Scoreboard — Marginstead Recovery

**Last updated:** 2026-08-28
**Status:** Pre-outreach. Nothing sent. **Gate 0 open. Gate 1 not met.**
**Operating mode: MODE A ONLY** — Marginstead does not contact vendors (`09-gate-0-regulatory.md`)
**Positioning:** managed vendor-credit recovery service (see `08-positioning-marginstead-recovery.md`)

> Update after every enrichment session, every send, and every reply.
> This is the only honest record of whether this business should exist.

---

## THE GATES

**No significant software development until Gate 8.**

| Gate | Requirement | Target | Actual | Met |
|---|---|---:|---:|:--:|
| **0** | **Regulatory classification confirmed by counsel (Mode A)** | — | **counsel not yet engaged** | ☐ **OPEN — blocks Gate 6** |
| **1** | Fully enriched Tier A prospects | 20 | **0** | ☐ |
| **2** | Compliant, highly personalized emails delivered | 20 | **0** | ☐ |
| **3** | Genuine interested responses | 3 | **0** | ☐ |
| **4** | Businesses providing one vendor / one month record set | 1 | **0** | ☐ |
| **5** | Defensible discrepancies identified | 1 | **0** | ☐ |
| **6** | Customer authorizes Marginstead to pursue a discrepancy | 1 | **0** | ☐ |
| **7** | Money or account credit **actually recovered and verified as posted** | 1 | **0** | ☐ |
| **8** | Customer pays Marginstead | 1 | **0** | ☐ |

**Current position: Gate 1, 0 of 20. Gate 0 open in parallel.**

**Gate 0 does not block Gates 1–5.** Enrichment, outreach, record intake and the first audit all
proceed while counsel works. It blocks **Gate 6** (first authorization). Because legal review is
the longest-lead item on the whole plan and sits in the critical path to revenue, **start it now.**

### The gate that matters most

**Gate 4 is the immediate objective.** One business, one vendor, one month. Everything before
it is preparation; everything after it depends on it. Gates 1–3 exist only to produce Gate 4.

### The gate most likely to fail

**Gate 7.** Gates 4–6 measure whether a shop will engage. Gate 7 measures whether vendors will
actually pay when chased — which is the one assumption Marginstead cannot control, cannot test
without a real claim, and has no evidence for yet. A finding that vendors simply refuse, or
take six months, is a legitimate reason to stop.

---

## OPERATING METRICS

### Funnel

| # | Metric | Count | Notes |
|---|---|---:|---|
| 1 | Prospects researched | 150 | 32 states. `data/prospects.csv` |
| 2 | Tier A working queue | **20** | `data/tier-a-enrichment-queue.csv` |
| 3 | — with verified decision maker | **0** | Gate 1 |
| 4 | — with verified business email | **0** | Gate 1 |
| 5 | Emails sent | 0 | |
| 6 | Delivered | 0 | |
| 7 | Bounced | 0 | **1 bounce out of 20 is a 5% rate — verify every address** |
| 8 | Replies (any human reply) | 0 | |
| 9 | Positive replies | 0 | Gate 3 |
| 10 | Opt-outs ("no thanks") | 0 | Honor permanently, immediately |
| 11 | Record sets requested by prospect | 0 | |
| 12 | **Record sets received** | **0** | **Gate 4** |

### Audit and recovery

| # | Metric | Count | Notes |
|---|---|---:|---|
| 13 | Audits completed | 0 | |
| 14 | Audits finding **nothing** | 0 | **A clean month is a real result. Record it.** |
| 15 | Defensible discrepancies identified | 0 | Gate 5 |
| 16 | Total potential money identified | **$0** | Verified items only. Never estimate. |
| 17 | Recovery authorizations signed | 0 | Gate 6 |
| 18 | — Mode A (claim packet, shop sends) | 0 | Tracks the vendor-relationship objection |
| 19 | — Mode B (Marginstead contacts vendor) | 0 | |
| 20 | Claims submitted to vendors | 0 | |
| 21 | Vendor promises obtained | 0 | A promise is not a recovery |
| 22a | Credits verified as **posted** to the vendor account | **$0** | Not yet billable |
| 22b | **Verified _realized_ recovery** — cash received, or credit posted **and applied** | **$0** | **Gate 7.** The only billable figure. |
| 23 | Claims refused or unresolved | 0 | Track reasons — this is how the model gets priced |
| 24 | **Revenue actually received** | **$0** | **Gate 8** |
| 25 | Median days: claim submitted → credit posted | — | |
| 26 | **Median days: credit posted → credit applied** | — | **The revenue lag created by the conservative definition. Measure it; do not fix it by billing earlier.** |
| 27 | Claims where the customer declined to send | 0 | Tests whether Mode A's "you send it" step is a real drop-off point |

### Competitive intelligence — the WickedFile question

Ask every prospect. This is a primary validation instrument, not a side note.

| # | Metric | Count | Meaning |
|---|---|---:|---|
| 28 | Prospects asked the tooling question | 0 | |
| 29 | Using **WickedFile** | 0 | |
| 30 | Using another reconciliation tool | 0 | |
| 31 | Using nothing | 0 | |
| 32 | **Uses a tool AND still chases vendors manually** | **0** | **Thesis confirmed. Best prospects in the list.** |
| 33 | Uses a tool and has someone who handles recovery | 0 | Gap closed — disqualified, but important data |

**How to read rows 29–33:** high row 29 with high row 32 is the **best possible** outcome — the
detection market is served, the recovery market is not, and Marginstead's wedge is real. High
row 27 with high row 31 is a **stop signal**.

### Shop software captured at intake

| System | Count |
|---|---:|
| Fullbay | 0 |
| ShopView | 0 |
| Karmak / RTA / other | 0 |
| Spreadsheets or paper | 0 |

---

## BLOCKING PREREQUISITES

### Before email #1 — legal

| # | Item | Status |
|---|---|---|
| 1 | **Valid registered business postal address in the email footer** | ☐ **BLOCKING** |
| 2 | Truthful sender information | ☐ |
| 3 | Truthful subject line | ☑ |
| 4 | Commercial-email disclosure in footer | ☑ |
| 5 | Compliant opt-out (reply-based, no login, no fee) | ☑ |
| 6 | Opt-outs honored within 10 business days; suppression list exists | ☐ |

*CAN-SPAM applies to B2B, is enforced per individual email, max $53,088 per message (FTC,
January 2025 adjustment).*

### Before email #1 — deliverability

**Verified by live DNS lookup, 2026-08-28:**

| # | Item | Status | Evidence |
|---|---|---|---|
| 1 | Domain registered, DNS active | ☑ | NS → `zita.ns.cloudflare.com`, `steven.ns.cloudflare.com` |
| 2 | Mail routing configured | ☑ | MX → `smtp.google.com` (Google Workspace) |
| 3 | **SPF published** | ☑ | `v=spf1 include:_spf.google.com ~all` |
| 4 | **DKIM published** | ☑ | `google._domainkey` → valid `v=DKIM1` RSA key |
| 5 | **DMARC published** | ☑ | `v=DMARC1; p=none; rua=mailto:ryan@marginstead.com` — monitoring mode, correct for warm-up |
| 6 | Domain warmed 2–3 weeks | ☐ | Unknown — depends on real sending history |
| 7 | Every address verified before sending | ☐ | 0/20 |
| 8 | Bounce monitoring in place | ☐ | |
| 9 | **Website live at marginstead.com** | ☐ | **No A record.** Nothing is hosted. Blocks the privacy/retention URL. |

**Authentication is done.** SPF, DKIM and DMARC are all published and correctly formed. Leave
DMARC at `p=none` through the first sends and read the `rua` reports before tightening.

### Before email #1 — contact verification (Gate 1)

| # | Item | Status |
|---|---|---|
| 1 | 20 verified decision-maker names | ☐ **0/20** |
| 2 | 20 verified public business emails | ☐ **0/20** |
| 3 | Real, sourced personalization for each | ☑ **20/20** |

### Before the first record set (Gate 4) — operational

From `ops/data-handling.md`:

| # | Item | Status |
|---|---|---|
| 1 | Paid business cloud storage, 2FA, per-customer private folders | ☐ |
| 2 | **Retention policy published at a stable URL** | ☐ **BLOCKING — intake email links to it. marginstead.com has no A record, so nothing is hosted yet.** |
| 3 | Findings report template | ☐ |
| 4 | Case log template | ☐ |
| 5 | Disk-encrypted machine for handling records | ☐ |

### Before the first authorization (Gate 6) — Gate 0 items

| # | Item | Status |
|---|---|---|
| 1 | **Counsel engaged** | ☐ **OPEN — longest lead item; start now** |
| 2 | **Mode A classification confirmed by counsel** | ☐ **OPEN — blocks Gate 6** |
| 3 | Mode A authorization document drafted (scope, fee, limits, revocability) | ☐ |
| 4 | Authorization reviewed by counsel | ☐ |
| 5 | Realized-recovery fee definition settled in writing | ☑ `09-gate-0-regulatory.md` §5 |
| 6 | Prohibited-activity list published across all materials | ☑ |
| 7 | Mode B removed from all customer-facing materials | ☑ |

---

## FAILURE CONDITIONS — written down in advance

Recorded now, before data exists, so a bad result cannot be rationalised later.

| Signal | Reading | Action |
|---|---|---|
| Fewer than 2 replies from 20 highly personalized emails | The message or the segment is wrong | Diagnose which. Do not just rewrite subject lines. |
| Replies come, but nobody sends records | **Most likely failure.** Curiosity without trust. | The bottleneck is data handover. Shrink the ask further, or offer to work from photos of four documents. |
| Records arrive, nothing defensible found | The leak is not real at one-vendor/one-month scale | Try a second shop. If two clean months in a row, **report it and stop.** |
| Findings produced, nobody authorizes a claim | Under Mode A the shop must send it themselves — that may be the friction | Ask what would make them send it. If they won't act on a documented claim handed to them, the service model is rejected. |
| Customer authorizes but never actually sends the claim | **Mode A's specific failure mode.** The work still lands on them. | Measure it (metric 27). If common, the value proposition is weaker than assumed and Mode B matters more than expected. |
| Counsel finds Mode A itself requires licensing | Regulatory cost arrives earlier than modelled | Reassess viability before spending further |
| Claims sent, but vendors refuse or stall indefinitely | **Recovery doesn't work.** The core promise fails. | **Stop.** This is the model's central assumption failing. |
| Credits post but sit unapplied for months | Real value, but revenue lag may be commercially unworkable | Measure metric 26. **Do not fix it by billing earlier.** |
| Money realized, customer won't pay the 20% | Real value, wrong price or wrong instrument | Ask what they *would* pay. If nothing, stop. |
| Several prospects use WickedFile and have recovery handled | Market is served end to end | Reassess before any further investment |
| All 8 gates cleared | Proceed to Phase 7 scope, and only that scope | |

**The objective is not to prove the idea is good. It is to discover whether customers will pay
Marginstead.** If the market rejects it, report that clearly and do not force it.

---

## CURRENT HONEST ASSESSMENT

**What is now better evidenced than before the pivot:**

The gap Marginstead is targeting is documented rather than assumed. WickedFile — the strongest
incumbent, already in heavy-duty, already integrated with Fullbay — **flags discrepancies and
assigns resolution tasks to the shop's own team. It does not contact vendors.** In a segment
where 54% of shops report being understaffed, a task assigned to a team with no spare hours is
not a recovery. And the recovery model itself is proven: enterprise AP recovery audit has run
on contingency for decades, pursuing claims against suppliers on the client's behalf.

**What remains completely unknown:**

- Whether a shop will hand over records at all (Gate 4)
- Whether one vendor-month contains anything defensible (Gate 5)
- Whether shops will act on a claim handed to them, and actually send it (Gate 6)
- **Whether vendors actually pay a well-documented, consistently followed-up claim (Gate 7)** —
  the least tested and most important assumption in the whole model
- Whether counsel confirms Mode A is outside collection-agency regulation (Gate 0)
- Whether 20% of recovered money is a price anyone accepts (Gate 8)

**The honest read:** the pivot moved Marginstead from a crowded space with a strong incumbent
into a genuinely empty one — but "empty" and "viable" are different things, and Gate 7 is where
that gets settled. Nothing before Gate 7 proves the business works.
