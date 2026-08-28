# Product Specification — LOCKED

**Status: LOCKED. DO NOT BUILD.**
**Gate position: Gate 0 open; Gate 1, 0 of 20 complete.**

> **The future core product is the Recovery Case Engine** (§ below). It is not to be built,
> prototyped or scaffolded now.
>
> **Explicitly prohibited under Gate 0:** any vendor-facing recovery voice agent, any feature
> that contacts a vendor, any feature that holds customer funds, and any feature that presents
> Marginstead as the customer's representative. Removed from the roadmap until counsel clears it.

This document is a boundary, not a backlog. It is here so that *if* all eight validation gates
clear, the scope is already agreed and narrow.

---

## The instruction, restated

**No SaaS development.** Not a prototype, not a "quick MVP", not a scaffold to be ready.

Marginstead Recovery is currently **a person doing careful work with a spreadsheet, a document
folder and an email client.** That is not a placeholder for software — it is how the business
learns what recovery actually takes. Every manual case teaches something that would otherwise
be guessed and coded wrong:

- What evidence a vendor actually accepts before paying a claim
- How many follow-ups a claim really takes, and at what interval
- Who at a distributor has authority to issue a credit
- How long "next statement" actually means
- Which discrepancy types are worth pursuing and which are not worth the postage

**Software built before those answers exist is software built on assumptions.**

---

## Position — governs every future decision

> **Marginstead augments Fullbay, ShopView, Karmak, QuickBooks — and WickedFile.
> It replaces none of them.**

**WickedFile is a potential data source, not a competitor to displace.** A shop running it has
already done the detection work; its unresolved flags are Marginstead's input queue. The
eventual integration direction is *read WickedFile's findings*, not *rebuild them*.

Permanently out of scope: work orders, scheduling, dispatch, technician time, customer
invoicing, inventory management, DVI, estimating, parts ordering, payments, payroll, general
accounting, and **detection-only reconciliation features that duplicate WickedFile**.

---

## The future core product: the Recovery Case Engine

**The case is the unit of the product.** Not a document, not a discrepancy — a case, with a
state, an owner for the next action, and a close condition that cannot be faked.

### Canonical case lifecycle

Every state transition is explicit. **A case never closes because a vendor said it would issue
a credit.**

```
  discrepancy identified
        v
  evidence assembled
        v
  claim prepared                        <- Marginstead
        v
  CUSTOMER SENDS                        <- customer, in its own name (Mode A)
        v
  response logged                       <- from what the customer forwards
        v
  follow-up scheduled  --------+
        v                      |
  promise tracked              |  loop until resolved or escalated
        v                      |
  next vendor statement reviewed        <- Marginstead
        v                      |
  credit verified as POSTED ---+
        v
  credit APPLIED / cash received        <- realization, not posting
        v
  case closed
        v
  recovery value recorded
```

**Two states that are routinely conflated and must stay separate in the data model:**

| State | Meaning | Billable |
|---|---|---|
| `credit_posted` | The credit exists on the customer's vendor account | **No** |
| `credit_applied` / `cash_received` | The customer is actually better off | **Yes** |

A case sitting at `credit_posted` is **not** closed and **not** billable. It may sit there for
months until the customer's next purchase. That is expected, and the gap between the two is a
metric, not a bug.

**Invalid transitions the engine must refuse to make:**
- Any state → `closed`, without passing through `credit_applied` or `cash_received`
- `promise_tracked` → `closed` (a promise is not a recovery)
- `credit_posted` → `closed`
- Any state that generates an invoice before realization

### Build order, if all gates clear

Sequenced by what removes the most manual effort — not by what is most interesting.

| Stage | Scope | Why here |
|---|---|---|
| **0** | **Nothing. Manual cases in a spreadsheet.** | Where Marginstead is now, and stays until Gate 8 |
| **1** | Secure document intake + per-customer storage + **case log with the state machine above** | Replaces a cloud folder and a spreadsheet. The state machine is the product's spine — get it right first. |
| **2** | **Claim assembly + evidence packet generation** | Turns a finding into something a vendor will actually pay. Highest-value early automation. |
| **3** | **Follow-up scheduling + draft generation** for the customer to send | The step that fails inside shops, and the step Marginstead sells |
| **4** | **Promise tracking** — what the vendor said, expected date, overdue alerts | Turns vague commitments into dated obligations |
| **5** | **Statement verification** — posted, then applied | **The defensible core.** Build it properly. |
| **6** | Recovery dashboard + complete audit trail | Only once there are real cases to show |
| **7** | Invoicing on **realized** recovery only | Follows the fee model, once validated |
| **8** | Document extraction / OCR for intake | Deliberately last: most expensive, least differentiating. Detection is a solved, competitive layer. |
| **9** | Integrations — starting with whatever paying customers actually use, including reading WickedFile's findings | Follow demand. Never guess. |
| **—** | **Vendor-facing contact or voice agent** | **PROHIBITED under Gate 0. Not on the roadmap.** |

**Note the inversion from the original plan:** OCR and detection moved from first to nearly last.
That is the point of the pivot. Marginstead's product is stages 2–5, and nobody else is
building them.

---

## Constraints that must survive contact with a roadmap

1. **Read-only into shop systems, always.** Never write to a customer's SMS or accounting system.
2. **The customer's data is the customer's.** Retention limits, deletion on request, never used
   to train anything shared across customers without written permission. Per `ops/data-handling.md`.
3. **Every claim traceable to a source document.** A vendor will refuse anything else.
4. **False positives are worse than false negatives.** A shop that takes three bad claims to its
   FleetPride rep loses credibility with that vendor and never works with Marginstead again.
   Precision over recall, permanently.
5. **A case closes only on verified realization** — cash received, or credit posted *and*
   applied. Never on a vendor's promise, never on an unapplied credit. If the software ever lets
   a case close without that, it has become the problem it was built to fix.
6. **Mode A is the only supported mode** until Gate 0 clears, and must remain fully supported
   permanently — many customers will never allow direct vendor contact even when it is available.
7. **Marginstead never holds customer funds.** Recovered money goes vendor → customer directly.
   This should remain permanent regardless of what counsel concludes.
8. **Never require migration.** Onboarding that requires leaving Fullbay is a dead product.

---

## Pricing

**20% of verified _realized_ recovery value. No realized recovery, no fee.**

- **Cash refund:** counts when the customer receives the money.
- **Account credit:** counts only when **both** verified as posted **and** actually applied
  against an invoice or balance the customer would otherwise have paid.
- A promise is not a recovery. An unapplied credit memo is not a recovery.

Full definition and worked example: `09-gate-0-regulatory.md` §5.

**Do not hard-code this into software.** It remains a validation hypothesis. Model the fee as
configurable data from the first line of code that touches it, and let the first paying customers
set the eventual model.
