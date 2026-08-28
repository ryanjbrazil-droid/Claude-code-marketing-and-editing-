# Marginstead Recovery — Revised Positioning

**Effective:** 2026-08-28 · **Supersedes:** the "vendor audit → AP reconciliation platform" positioning
**Status:** Pre-validation. No SaaS development. No outreach sent.

> **GATE 0 AMENDMENT (2026-08-28) — MODE A ONLY.** Marginstead does not contact vendors,
> represent customers, or hold recovered funds until qualified legal review completes. Mode B is
> **locked**. The pricing definition in §6 is superseded by the conservative "realized recovery"
> definition. **`research/09-gate-0-regulatory.md` governs where it differs from this document.**

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
| 3 | **Draft the claim; the customer sends it** to the vendor under the customer's own name | **Mode A. Marginstead does not contact the vendor.** |
| 4 | **Schedule and draft the follow-ups**; the customer sends each one | The step that fails inside a shop |
| 5 | **Draft the escalation** when a case stalls; the customer sends it | Branch manager, regional, account rep |
| 6 | **Track vendor promises** and expected credit dates, from responses the customer forwards | "It'll be on next month's statement" is a commitment with a date |
| 7 | **Verify against the subsequent statement** that the credit posted — and that it was applied | **The step nobody does.** A promised credit is not a credit |
| 8 | **Close only after recovery is realized** | Not when the vendor says yes; not when a credit posts unused — when the customer is actually better off |
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
| **Recovery fee** | **20% of verified _realized_ recovery value** — see `09-gate-0-regulatory.md` §5 |
| **No realized recovery** | **No fee.** |
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

### Pricing definitions — SETTLED (2026-08-28)

Both open questions are now closed, conservatively. Full detail and worked example in
`09-gate-0-regulatory.md` §5.

- **Cash refund:** recovery occurs when the customer actually receives the money.
- **Account credit:** billable only when the credit is **both** verified as posted **and**
  actually applied against an invoice or balance the customer would otherwise have paid.
- **A promise is not a recovery. An unapplied credit memo is not a recovery.**

**Accepted consequence:** revenue lags recovery, because a credit may sit unapplied until the
customer's next purchase. Track the lag; do not solve it by loosening the definition.

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

### The vendor-relationship risk — Mode A removes it entirely

A shop's relationship with its FleetPride or dealer counter is commercially valuable, and some
owners would be uneasy about a third party contacting their rep.

**Under Gate 0 this is no longer a risk to manage — it is a feature to lead with.** Marginstead
does not contact vendors at all. Everything that reaches the supplier goes out from the customer,
in the customer's own name, on the customer's letterhead.

> *"Your vendor only ever hears from you. We just make sure the claim is airtight and that
> nothing gets dropped."*

**Mode B — Marginstead contacting vendors directly — is locked** pending legal review, and must
not be offered, hinted at, or agreed to even if a customer asks for it.

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
| Shops refuse to let a third party contact their vendor | **Eliminated** | Mode A means Marginstead never contacts a vendor. Lead with it. |
| Manual recovery does not scale | Medium | Irrelevant until Gate 8. Scaling problems are the good kind. |
| Vendors refuse to deal with a third party | **Eliminated under Mode A** | The vendor only ever deals with its own customer. |
| Recovery takes months, so cash is slow | Medium | Real. Set expectations at authorization; do not promise timelines that depend on a vendor. |
| Amounts recoverable from one month of one vendor are too small to matter | Medium | The one-month sample proves the *rate*, not the total. Extrapolate honestly to the full vendor set only with the customer's own numbers. |
| **Regulatory classification of recovery activity** | **High — now Gate 0** | Mode A only until counsel clears it. No vendor contact, no representation, no holding funds, no collection-agency posture. `09-gate-0-regulatory.md`. |
| Legal review takes longer than expected | Medium | **Longest-lead item in the plan. Start it now** — Gates 1–5 proceed in parallel. |
| Revenue lags recovery because credits sit unapplied | Medium | Accepted consequence of the conservative definition. Measure it. |

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
