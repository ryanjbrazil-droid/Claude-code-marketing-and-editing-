# Phase 7 — Product Specification (GATED — DO NOT BUILD YET)

**Status: LOCKED.** Validation Gate 3 stands at **0 of 4**. No product code should be written.

This document exists so that *if* validation succeeds, the scope is already agreed and
narrow. It is not a to-do list. It is a boundary.

---

## Build trigger

Open this document again only when **all four** conditions in the Phase 6 scoreboard are met:

- [ ] 15+ genuine replies from ~150 qualified prospects
- [ ] 5+ businesses willing to provide records
- [ ] 3+ audits finding legitimate financial discrepancies
- [ ] 1+ business demonstrating willingness to pay for ongoing monitoring or recovery

Until then the correct engineering effort is **zero**. Audits are run by hand, in a
spreadsheet. Doing them manually is not a stopgap — it is how you learn what the software
actually has to do, and every manual audit makes the eventual product better.

---

## Product position — the one line that governs every decision

> **Marginstead augments Fullbay, ShopView, Karmak and QuickBooks. It never replaces them.**

Any feature that starts to look like shop management — work orders, scheduling, dispatch,
technician time, invoicing the customer, inventory management, DVI, estimating — is **out of
scope, permanently**. That is Fullbay's business, Fullbay is very good at it, and competing
there would be the fastest way to lose.

---

## Scope, if built

### In scope

**Intake**
- Secure document upload (PDF, image, CSV)
- Invoice OCR / extraction
- Vendor statement extraction
- Credit memo extraction
- Return and core record extraction
- CSV import for shop-side data (PO / RO / parts exports)

**Detection engine** — the seven categories from the landing page, unchanged
- Transaction matching (invoice ↔ PO/RO ↔ statement ↔ credit memo)
- Missing-credit detection
- Short-credit detection
- Duplicate invoice detection
- Price discrepancy detection
- Quantity discrepancy detection
- Unmatched transaction detection

**Output and workflow**
- Money-at-risk dashboard
- Vendor follow-up drafting
- Recovery tracking (claimed → disputed → credited → closed)
- Audit trail

### Explicitly out of scope — permanently

Work orders · scheduling · dispatch · technician time tracking · customer invoicing ·
inventory management · digital vehicle inspections · estimating · parts ordering ·
payments · payroll · general accounting · anything requiring a shop to leave its
current system.

---

## Build order, when the time comes

Sequenced by what removes the most manual effort first, not by what is most interesting.

| Phase | Scope | Rationale |
|---|---|---|
| **7.0** | **Nothing.** Manual audits in a spreadsheet. | Learn the real matching rules from real paperwork before encoding any of them |
| **7.1** | Secure upload + document storage + audit trail | Removes the email-attachment problem, which is the #1 trust barrier in the funnel |
| **7.2** | Invoice and statement extraction (OCR) | The single biggest manual time sink |
| **7.3** | CSV import + transaction matching | Turns extraction into comparison |
| **7.4** | Duplicate + price + quantity detection | Deterministic, unambiguous, easiest to get right |
| **7.5** | Missing-credit, short-credit, core and return detection | The hardest and most valuable logic — build it last, when the rules are understood |
| **7.6** | Money-at-risk dashboard | Only once there is real money to display |
| **7.7** | Vendor follow-up drafting + recovery tracking | Closes the loop from finding to recovered dollars |
| **7.8** | Read-only integrations, starting with whichever SMS the paying customers actually use | Follow demand. Do not guess. |

**Do not start 7.8 before 7.1–7.7 are earning revenue.** Integrations are the most expensive
work and the easiest to build for the wrong system.

---

## Constraints that must survive contact with the roadmap

1. **Read-only into shop systems, always.** Marginstead must never write to a shop's SMS or
   accounting system. Read-only is what makes it safe to adopt.
2. **The shop's data is the shop's.** Explicit retention limits, deletion on request, and
   never used to train anything shared across customers without written permission.
3. **Every finding must be traceable to a source document.** A number a shop cannot verify
   against a page of their own paperwork is worthless — they have to take it to a vendor.
4. **False positives are worse than false negatives.** A shop that takes three bogus claims
   to its FleetPride rep loses credibility with the vendor and will never use the product
   again. Precision over recall, always.
5. **Never require migration.** The moment onboarding requires leaving Fullbay, the product
   is dead.

---

## Pricing — decide after validation, not before

Do not commit to a model now. The enterprise recovery-audit market (PRGX, CBIZ, GEP, Paladin,
JPD) runs almost entirely on **contingency — a percentage of what is actually recovered**,
and that model exists for a good reason: it removes all risk from the buyer and aligns
incentives precisely.

For a shop that has just seen a free audit produce a real number, contingency is a far easier
yes than a subscription. WickedFile sells a flat monthly subscription; contingency would be a
genuine differentiator as well as a lower-friction close.

**The question to ask every shop that receives findings** — and the answer that goes on the
scoreboard:

> "If I did this every month across all your vendors, would that be worth paying for?
> And roughly what would it be worth to you?"

Let their answers set the model. Do not pick one in advance.
