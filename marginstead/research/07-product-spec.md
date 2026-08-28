# Product Specification — LOCKED

**Status: LOCKED. DO NOT BUILD.**
**Gate position: Gate 1 of 8, 0 of 20 complete.**

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

## If built: the product is the recovery workflow

The nine steps from the positioning document, in the order they would be automated — sequenced
by what removes the most manual effort, not by what is most interesting to build.

| Stage | Scope | Why here |
|---|---|---|
| **0** | **Nothing. Manual cases.** | Where Marginstead is now and stays until Gate 8 |
| **1** | Secure document intake + per-customer storage + case log | Removes the biggest trust and admin friction. Replaces a cloud folder and a spreadsheet. |
| **2** | **Claim assembly + evidence packet generation** | The most valuable early automation: turns a finding into a documented claim a vendor will accept |
| **3** | **Follow-up scheduling + escalation prompts** | The step that fails inside shops, and the step Marginstead sells |
| **4** | **Promise tracking** — what the vendor said, expected credit date | Turns vague commitments into dated obligations |
| **5** | **Statement verification** — check the next statement, confirm posting | **The defensible core.** Build it properly. |
| **6** | Recovery dashboard + complete audit trail | Only once there are real cases to display |
| **7** | Invoice generation on verified recoveries | Follows the fee model, once the fee model is validated |
| **8** | Document extraction / OCR for intake | Deliberately last. It is the most expensive to build and the least differentiating — detection is a solved, competitive layer. |
| **9** | Integrations, starting with whatever paying customers actually use | Follow demand. Never guess. |

**Note the inversion from the original plan:** OCR and detection moved from first to nearly
last. That is the point of the pivot. Marginstead's product is stages 2–5, and nobody else is
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
5. **A case closes only on verified posting.** Never on a vendor's promise. If the software ever
   lets a case close without stage-5 verification, it has become the problem it was built to fix.
6. **Mode A must always be supported.** Some customers will never allow direct vendor contact,
   and the product must be fully useful to them.
7. **Never require migration.** Onboarding that requires leaving Fullbay is a dead product.

---

## Pricing

**20% of money or account credits actually recovered. No recovery, no fee.**

A hypothesis under test, not a fixed rate. Two definitions must be settled in writing before
the first authorization — both are currently open:

1. How **account credits** (vs. cash refunds) are treated for fee purposes
2. **"Recovered" means posted and verified**, never promised

Let the first paying customers set the eventual model. Do not commit in advance.
