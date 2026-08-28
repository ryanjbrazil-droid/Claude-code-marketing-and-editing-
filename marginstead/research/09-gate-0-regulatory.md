# Gate 0 — Regulatory Classification

**Effective:** 2026-08-28 · **Status: OPEN. Blocks Gate 6.**
**Operating mode until cleared: MODE A ONLY.**

> **This document is not legal advice.** It is a scope definition and a list of questions to put
> to qualified counsel. Nothing here substitutes for that review.

---

## 1. The restriction

Third-party commercial claims-recovery activity may trigger registration, licensing, bonding or
other compliance obligations depending on the state. Until qualified legal review is complete,
Marginstead operates in **Mode A only**.

### Prohibited until legal review clears — no exceptions

Marginstead must **NOT**:

1. Contact vendors directly on behalf of customers
2. Represent itself as a collection agency — **or assert that it is not one.** No legal
   classification has been obtained, so Marginstead makes no classification claim in either
   direction. Describe conduct, not category (see `ops/data-handling.md` §6b).
3. Receive customer recoveries into Marginstead accounts
4. Threaten legal action or collections
5. Negotiate disputed obligations as the customer's representative
6. Build or activate the vendor-facing recovery voice agent

**Item 3 has a structural consequence worth stating plainly:** all recovered money flows
directly from the vendor to the customer. Marginstead never touches customer funds and invoices
separately after a recovery is realized. That is the correct design regardless of what counsel
concludes, and it should probably stay permanent.

**Item 6 is also a product-scope instruction.** No vendor-facing voice agent is to be designed,
prototyped or scaffolded. It is removed from the roadmap until Gate 0 clears.

---

## 2. Mode A — what Marginstead does and does not do

| Step | Who | Mode A |
|---|---|---|
| 1. Identify the discrepancy | **Marginstead** | ✅ |
| 2. Assemble the supporting evidence | **Marginstead** | ✅ |
| 3. Draft the vendor claim and each follow-up | **Marginstead** | ✅ |
| 4. **Send the communication to the vendor** | **Customer**, under the customer's own name | ✅ |
| 5. Schedule follow-ups | **Marginstead** | ✅ |
| 6. Log and track vendor responses **supplied by the customer** | **Marginstead** | ✅ |
| 7. Track vendor promises and expected credit dates | **Marginstead** | ✅ |
| 8. Review subsequent vendor statements | **Marginstead** | ✅ |
| 9. Verify the credit posted, and that it was realized | **Marginstead** | ✅ |
| 10. Close the case | **Marginstead**, only on verified realization | ✅ |
| — Contact the vendor directly | — | ❌ **PROHIBITED** |
| — Negotiate as the customer's representative | — | ❌ **PROHIBITED** |
| — Hold recovered funds | — | ❌ **PROHIBITED** |

**Marginstead never appears to the vendor at all during Mode A.** The vendor's entire experience
is of its customer sending a well-documented, promptly-followed-up claim.

### Mode A validates almost everything that matters

The restriction costs less than it looks. Mode A still tests:

- Whether shops will hand over records (**Gate 4**)
- Whether a single vendor-month contains defensible discrepancies (**Gate 5**)
- Whether shops will authorize and act on a claim (**Gate 6**)
- Whether a documented, consistently followed-up claim actually gets paid (**Gate 7**)
- Whether anyone pays 20% of realized recovery (**Gate 8**)

The only untested variable is whether Marginstead making the contact *itself* improves the
outcome. That is a Mode B optimization question, not a business-viability question.

### Mode A is also a better sales position

The largest objection anticipated in the funnel was a shop's reluctance to let a stranger
contact its FleetPride or dealer rep. **Mode A removes that objection entirely, by design.**
It should be led with, not apologized for:

> *"Your vendor only ever hears from you. We just make sure the claim is airtight and that
> nothing gets dropped."*

---

## 3. Mode B — locked

Mode B (Marginstead contacting vendors directly under written authorization) stays on the
roadmap and is **locked pending qualified legal review** covering commercial-collection and
claims-recovery rules in every state Marginstead would operate in.

**Do not offer Mode B to any prospect. Do not reference it on the landing page, in outreach, or
in any authorization document, until Gate 0 clears.**

---

## 4. Questions for counsel

Marginstead's activity may not be debt collection at all — the customer is not pursuing a
third-party debtor; a shop is claiming a credit its own supplier owes it, on its own account.
But that is exactly the determination counsel needs to make rather than Marginstead assuming.

Publicly available material indicates the landscape is genuinely inconsistent: some states
statutorily exempt entities collecting purely business-to-business debt from collection agency
licensing, while others require licensing to collect commercial debt from businesses located in
that state, and bonding requirements vary independently of licensing.

**Put these to counsel:**

1. **Classification.** Under Mode A, where Marginstead never contacts the vendor and never holds
   funds, is this collection activity at all — or is it document preparation and back-office
   support for the customer's own account reconciliation?
2. **Does Mode A trigger any registration, licensing or bonding obligation** in the states where
   Marginstead is domiciled, and where customers are located?
3. **Does drafting a claim the customer sends under its own name** constitute acting as the
   customer's representative for regulatory purposes?
4. **What changes under Mode B?** Which states would require licensing or bonding for
   Marginstead to contact a commercial vendor on a business customer's behalf?
5. **Contingency fee.** Does charging a percentage of recovered amounts alter the classification,
   independent of who makes contact?
6. **Consumer statutes.** Confirm that consumer-debt statutes (e.g. the FDCPA) are inapplicable
   because all parties are businesses and all obligations are commercial — and identify any
   state analogue that reaches commercial claims.
7. **Authorization document.** Review the Mode A authorization for scope, limits, revocability
   and fee definition before any customer signs it.
8. **Multi-state exposure.** Marginstead would serve customers across many states. Does exposure
   follow Marginstead's domicile, the customer's location, the vendor's location, or all three?

**Practical scoping note:** counsel does not need all fifty states to start. Get Mode A cleared
for Marginstead's home state plus the states of the first few customers, and expand as the
customer list does.

---

## 5. Revised pricing definition — conservative

Supersedes the earlier "20% of amounts recovered" language everywhere it appears.

> **Fee: 20% of verified realized recovery value.
> No realized recovery, no fee.**

### Cash recovery
A recovery occurs when **the customer actually receives the cash or refund.** Not when the
vendor agrees to it. Not when a check is said to be in the mail.

### Vendor / account credit
A credit becomes billable only when **both** conditions are met:

1. **Verified as posted** to the customer's vendor account; **and**
2. **Actually applied** against an invoice, outstanding balance or purchase the customer would
   otherwise have paid.

**A promise is not a recovery. An unapplied credit memo is not a recovery.** A credit sitting
unused on an account has not yet saved the customer any money, and Marginstead does not invoice
against it.

### Worked example

| Event | Realized recovery | Marginstead invoices |
|---|---:|---:|
| Vendor agrees a $3,000 credit is owed | $0 | **Nothing** |
| Vendor issues a $3,000 credit memo | $0 | **Nothing** |
| Credit posts to the customer's account, unapplied | $0 | **Nothing** |
| Customer's next $7,000 vendor bill is reduced to $4,000 by the credit | **$3,000** | **$600** |

### Why this definition is right

It is the most conservative reading available, and every place it could have been read
generously it is not. That matters for three reasons:

1. **It is defensible.** The customer can point at a specific invoice that got smaller. There is
   nothing to argue about.
2. **It removes the worst possible first-customer experience** — being invoiced $600 for a credit
   that is sitting unused on an account, producing a real cash outflow against a paper gain.
3. **It keeps Marginstead honest about what the service is worth.** Getting a credit issued is
   not the job. Getting the customer's money back is the job.

**Consequence to accept:** revenue lags recovery, sometimes by months, because a credit may sit
unapplied until the customer's next purchase. **Do not solve this by loosening the definition.**
Track the lag as metric 25 on the scoreboard; if it turns out to be commercially unworkable,
that is a finding about the model, not a reason to bill earlier.

**Do not hard-code this into software.** It remains a validation hypothesis.

---

## 6. Gate 0 status

| # | Item | Status |
|---|---|---|
| 1 | Mode A defined and documented | ☑ |
| 2 | Prohibited-activity list published across all materials | ☑ |
| 3 | Mode B removed from all customer-facing materials | ☑ |
| 4 | Landing page wording corrected to Mode A | ☑ |
| 4b | **"Not a collection agency" removed from all customer-facing materials** | ☑ 2026-08-28 |
| 5 | Outreach copy corrected to Mode A | ☑ |
| 6 | Vendor-facing voice agent removed from roadmap | ☑ |
| 7 | Conservative "realized recovery" definition adopted | ☑ |
| 8 | **Counsel engaged** | ☐ **OPEN** |
| 9 | **Mode A classification confirmed by counsel** | ☐ **OPEN — blocks Gate 6** |
| 10 | Mode A authorization document reviewed by counsel | ☐ **OPEN — blocks Gate 6** |
| 11 | Mode B classification reviewed | ☐ Deferred |

**Items 8–10 block Gate 6 (first authorization). They do not block Gates 1–5**, so contact
enrichment, outreach, record intake and the first audit can all proceed in parallel with the
legal review.

**Recommendation: start the legal review now.** It is the longest-lead item in the entire plan
and it sits directly in the critical path to revenue. Everything else can be done in days;
counsel takes weeks.

---

## Sources consulted for scoping (not legal advice)

- https://www.harborcompliance.com/debt-collection-agency-license
- https://www.creditinfocenter.com/state-by-state-collection-agency-requirements/
- https://cornerstonelicensing.com/debt-collection-state-laws/
- https://www.wolterskluwer.com/en/solutions/ct-corporation/collection-agency-licensing
- https://www.accountadjustment.us/debtcollection/about/collecting-commercial-debt
