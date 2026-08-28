# Marginstead Recovery — Revised Positioning

**Effective:** 2026-08-28 · **Supersedes:** the "vendor audit → AP reconciliation platform" positioning
**Status:** Pre-validation. No SaaS development. No outreach sent.

---

## 1. The shift, in one line

**From:** software that *finds* money your parts vendors owe you.
**To:** a managed service that *gets it back*.

> ### Marginstead Recovery
> A managed vendor-credit and parts-money recovery service for heavy-duty repair businesses.
>
> **"We don't just find money you're owed. We get it back."**

The differentiation is entirely in what happens **after** a discrepancy is identified.

---

## 2. Why the old positioning had to go

WickedFile already occupies the detection layer, and it is not confined to light-duty auto.

**Confirmed:**
- WickedFile publishes heavy-duty content, including a *"Truck Shop Management Software: 2026"*
  guide, and integrates with **Fullbay** alongside Tekmetric, Shop-Ware, Mitchell 1, NAPA TRACS,
  Protractor and RO Writer.
- It performs invoice-to-RO reconciliation, vendor statement reconciliation, missing-credit
  detection, pricing-error detection, duplicate detection and **core-credit tracking**.
- It explicitly positions itself as *not* a shop management system — it is a layer that sits
  beside Fullbay rather than replacing it.

Building a second, later, worse version of that was never going to work. **That decision is
correct and this document assumes it is final.**

---

## 3. Why the new positioning has a real gap to occupy

This is the finding that makes the pivot more than a retreat. From WickedFile's own published
description of how the product works:

> WickedFile works in the background **flagging discrepancies and assigning resolution tasks
> to your team.** When a core credit is missing it flags it **so you can follow up.** Users log
> in, run saved filters, and flag returns that weren't credited. Vendor payment execution is on
> the roadmap; today it uses your existing tools.

**It does not contact vendors. The shop's staff still chases every discrepancy.**

Now put that next to the labour reality already established in the ICP research:

> **54% of heavy-duty shops report being understaffed.** Median shop: 8 employees, 5 technicians.
> No controller. No dedicated parts manager.

A detection tool that ends by **assigning a task to a team that has no spare hours** produces a
longer list of known-unresolved problems, not recovered money. Knowing you are owed $4,200 and
having $4,200 back in the account are different outcomes, and only one of them shows up in the
bank.

**That gap — between identified and recovered — is the entire business.**

### This is not a novel model. It is a proven one, brought down-market.

Enterprise accounts-payable recovery audit — PRGX, CBIZ, GEP, Transparent Global, Auditec,
Paladin — has run this exact playbook for decades: take the client's data, find the leakage,
**pursue the claims against the suppliers**, and take a percentage of what is actually
recovered. Client time commitment is cited at roughly two hours a week. Contingency pricing is
the norm across the entire category.

Those firms will not touch a $3M truck shop. **Marginstead Recovery is the enterprise
recovery-audit model at shop scale** — a far more defensible position than being a late second
entrant in detection software.

---

## 4. Where Marginstead sits in the stack

```
   Fullbay / ShopView / Karmak / RTA        the shop's own record of what should have happened
                 |
                 v
   WickedFile  (optional, if the shop has it)  detection - flags the discrepancy, assigns a task
                 |
                 v
   MARGINSTEAD RECOVERY                      does the work the task represents, until money posts
```

**WickedFile is a potential data source and integration, not a competitor to displace.**
A shop already running it is not disqualified — it is *better* qualified, because its
discrepancies are already identified and sitting unworked. The qualifying question changes
accordingly (see §8).

**Marginstead owns the recovery workflow. Nothing else.**

---

## 5. The service — nine steps

This is the product. Initially performed manually, by a person, with a spreadsheet and an
email client.

| # | Step | Note |
|---|---|---|
| 1 | **Identify** a potentially recoverable amount — missing vendor credit, return, core, warranty payment, duplicate charge, short credit | Findings only; nothing is claimed yet |
| 2 | **Assemble the evidence** — the invoice, statement line, credit memo, return authorization, PO/RO | A claim without documentation gets refused |
| 3 | **Contact the vendor** on the customer's behalf — **only when authorized in writing** | See §7 on vendor-relationship risk |
| 4 | **Follow up** on a schedule, not when someone remembers | The step that fails inside a shop |
| 5 | **Escalate** unresolved cases past the counter | Branch manager, regional, account rep |
| 6 | **Track vendor promises** and expected credit dates | "It'll be on next month's statement" is a commitment with a date |
| 7 | **Verify against the subsequent statement** that the money or account credit actually posted | **The step nobody does.** A promised credit is not a credit |
| 8 | **Close only after recovery is verified** | Not when the vendor says yes — when it posts |
| 9 | **Produce a complete audit trail** | Every claim, contact, promise and posting |

**Step 7 is the defensible core.** Detection tools stop at step 1. Shops, when they try, get to
step 3 or 4 and stall. Almost nobody closes the loop by checking the next statement to confirm
the credit actually landed — which is precisely the failure mode the shop hired us to fix,
repeating one level up.

---

## 6. Business model

| | |
|---|---|
| **Initial audit** | **Free.** One vendor. One month. |
| **Findings report** | Delivered free. Customer sees everything before authorizing anything. |
| **Recovery fee** | **20% of money or account credits actually recovered** |
| **No recovery** | **No fee.** |
| **Subscription** | None. |
| **Commitment** | None. |

**This price is a hypothesis to validate, not a fixed rate.** Do not represent it as permanent
in any material. If shops accept 20% without hesitation it may be under-priced; if it is the
sticking point, that is data.

### Why contingency is the right instrument here

1. It is the proven model in the category it descends from.
2. It removes the buyer's risk entirely — the objection "what if you find nothing" is answered
   by the structure, not by argument.
3. It is a **structural** differentiator from WickedFile's flat monthly subscription. A shop
   pays Marginstead only out of money it did not previously have.
4. It aligns incentives: Marginstead earns nothing for a long list of findings. It earns only
   when money moves.

### Two pricing definitions that must be settled before quoting anyone

**These are open blockers, not details.**

1. **"Account credit" vs. cash.** If a vendor issues a $3,000 credit against the shop's account
   rather than a refund, the shop has value but no cash — and owes $600. Decide now: is the fee
   charged on account credits at all; if so, is it invoiced immediately or as the credit is
   consumed? An unhappy surprise here poisons the first customer relationship.
2. **"Actually recovered" must mean posted, not promised.** Bill only on amounts verified on a
   subsequent vendor statement (step 7). Define it in writing before the first authorization.

---

## 7. The wedge: one vendor, one month

The largest risk in this business is **not** whether the leak is real. It is whether a shop
owner will hand financial records to a stranger.

So the ask is deliberately tiny:

> *"Send us one FleetPride statement plus the associated returns and credits for that month."*

- **One vendor.** Not all vendors.
- **One month.** Not a year, and not the company's accounting history.
- **A named, finite document list** (see the landing page and intake script).
- **Findings first.** The customer sees everything before authorizing any vendor contact.

One month of one vendor's paperwork is a small, comprehensible, low-stakes packet. It is also
genuinely enough to find a duplicate, a short credit, or an uncredited core.

### The vendor-relationship risk — raise it before the customer does

A shop's relationship with its FleetPride or dealer counter is commercially valuable. Some
owners will be uneasy about a third party contacting their rep. **Do not discover this
objection during a call — pre-empt it by offering two modes at authorization:**

| Mode | How it works | For |
|---|---|---|
| **A — Claim packet** | Marginstead assembles the documented claim; **the shop sends it** and forwards the replies. Marginstead still tracks, follows up, escalates and verifies. | Owners protective of the vendor relationship |
| **B — Direct contact** | Marginstead contacts the vendor on the shop's behalf under written authorization. | Owners who want it off their plate entirely |

**Mode A still delivers the core value** — the tracking, the follow-up schedule, the escalation
and the step-7 verification — while removing the objection completely. Offer it first to
anyone who hesitates.

---

## 8. The competitor question — now a validation instrument

Ask every prospect, and record the answer on the scoreboard:

> **1. "Are you using anything today to check that parts invoices, returns, cores and vendor
> credits are right?"**

Record any mention of **WickedFile** specifically.

**If they say yes / WickedFile — ask the follow-up. This is the most valuable question in the
entire experiment:**

> **2. "When it flags something, who actually contacts the vendor and chases it down? Does that
> still land on your staff?"**

| Their answer | What it means |
|---|---|
| "Yeah, my service writer has to chase it" | **Thesis confirmed.** They have detection and no recovery. Best possible prospect. |
| "Honestly, a lot of it just sits there" | **Thesis strongly confirmed.** Quantify how much. |
| "We've got someone who handles all that" | Disqualified — the gap is closed. Record it. |
| "Never heard of it" | Normal. Proceed with the standard offer. |

Several prospects answering (a) or (b) is stronger validation than any amount of interest in a
free audit, because it means the pain persists *even for shops that already bought the
detection tool.*

---

## 9. What Marginstead does not claim

Unchanged and non-negotiable:

- **No claim that Marginstead has recovered money for anyone** — until it has, with permission.
- **No customers, testimonials, case studies or dollar figures.** Competitors publish recovery
  figures; those are theirs, and quoting them as suggestive of Marginstead's results would be
  dishonest.
- **No claimed integrations.** Marginstead integrates with nothing today. It reads documents a
  customer sends.
- **No AI-software pitch.** The service is currently a person doing careful work.
- **No implication that the shop's staff is at fault.** The framing is always *the vendor owes
  you*, never *your people missed it*.

---

## 10. Honest risks

| Risk | Severity | Mitigation |
|---|---|---|
| **WickedFile adds recovery workflow** | **High** — they have the data, the customers and the roadmap | Speed. Get to a verified recovery and a paying customer before it is on anyone's roadmap. A service can start today; software cannot. |
| Shops refuse to let a third party contact their vendor | High | Mode A (claim packet) removes it entirely. Lead with it on any hesitation. |
| Manual recovery does not scale | Medium | Irrelevant until Gate 8. Scaling problems are the good kind. |
| Vendors refuse to deal with a third party | Medium | Written authorization; Mode A as fallback. Test on the first real claim. |
| Recovery takes months, so cash is slow | Medium | Real. Set expectations at authorization; do not promise timelines that depend on a vendor. |
| Amounts recoverable from one month of one vendor are too small to matter | Medium | The one-month sample proves the *rate*, not the total. Extrapolate honestly to the full vendor set only with the customer's own numbers. |
| Legal/agency exposure from acting for a customer | Medium | Written authorization defining exact scope; no legal claims, no collections activity, no litigation. Have a lawyer review the authorization before Gate 6. |

---

## 11. What changes and what does not

**Changes:** the category (service, not software), the promise (recovery, not detection), the
price (contingency, not subscription), the ask (one vendor/one month, not a sample period), the
posture toward WickedFile (integration/data source, not competitor), and the immediate goal
(one record set, not 150 emails).

**Does not change:** the target market, the ICP, the qualification rubric, the CAN-SPAM and
deliverability gate, the prohibition on fabricated results, and the rule that a shop who loves
the free work but will not pay is a **negative** result.

---

## Sources

- https://www.wickedfile.com/ · https://www.wickedfile.com/blogs/truck-shop-management-software/ · https://www.wickedfile.com/blogs/best-ai-tools-for-auto-repair/ · https://www.wickedfile.com/blogs/core-charges-profit-leakage-auto-shops/
- https://www.capterra.com/p/10011937/WickedFile/ · https://www.getapp.com/finance-accounting-software/a/wickedfile/
- https://www.fullbay.com/products/integrations/ · https://www.fullbay.com/state-of-heavy-duty-repair/
- https://www.prgx.com/guides/ap-recovery-audit-services-guide/ · https://www.cbiz.com/services/advisory/risk-management-compliance/cost-recovery/accounts-payable-recovery-audit · https://auditecsolutions.com/statement-recovery-audit/
