
> **SUPERSEDED (2026-08-28):** The three cold-email variants in Part 3 below are replaced by
> [`05-recovery-outreach.md`](05-recovery-outreach.md) following the pivot to Marginstead Recovery.
> **Part 1 (compliance and deliverability) remains in force** and is still the governing checklist.

---

# Phase 4 — Outreach Strategy & Cold Email Variants

**Prepared:** 2026-08-27
**Sending identity:** Ryan, Marginstead — ryan@marginstead.com

---

## PART 1 — DO NOT SEND YET

The brief is explicit: *"Do not send outreach until the business email configuration, sending
reputation, required commercial-email disclosures, valid business mailing address, and opt-out
process are ready."*

Nothing in this document may be sent until every box below is ticked. **Emails are written and
ready; the gate is infrastructure and compliance, not copy.**

### 1.1 Legal — CAN-SPAM (US commercial email)

CAN-SPAM applies to B2B email. The FTC enforces **per individual email**, not per campaign.
The maximum civil penalty is **$53,088 per non-compliant email** following the FTC's January
2025 inflation adjustment. The largest CAN-SPAM penalty on record — Verkada, $2.95 million —
was for excessive sending, a non-working opt-out, and a missing physical address. All three
are trivially avoidable.

| # | Requirement | Status | Owner action |
|---|---|---|---|
| 1 | Accurate "From", "Reply-To" and routing information | ☐ | Send as a real person at a real domain |
| 2 | Non-deceptive subject line that matches the body | ☐ | Subject lines below comply |
| 3 | Message identifiable as a commercial solicitation | ☐ | Handled by the footer below |
| 4 | **Valid physical postal address in every email** | ☐ | **BLOCKING — must be a real address Marginstead can receive mail at** |
| 5 | Clear, conspicuous opt-out mechanism | ☐ | Footer line below |
| 6 | Opt-outs honored **within 10 business days**; no fee, no login, no extra information required | ☐ | Maintain a suppression list; process same-day in practice |
| 7 | Responsibility for anything sent on Marginstead's behalf | ☐ | If a tool or VA is used, Marginstead is still liable |

**Required footer — include verbatim in every cold email:**

```
—
Marginstead
[REAL STREET ADDRESS, CITY, STATE ZIP]      <-- BLOCKING: must be filled in
You're getting this because you run a heavy-duty repair shop and I thought this
might be relevant. Reply "no thanks" and I won't contact you again.
```

That single reply-based opt-out satisfies requirements 5 and 6 without a login or a form.
**A suppression list must exist before the first send**, and "no thanks" must be honored
permanently and immediately.

### 1.2 Deliverability — protecting a brand-new domain

A new domain has no sending reputation. The prospect list has **zero verified email
addresses** (see Phase 3 §1), which makes bounce risk the single largest threat to this
experiment. One careless blast can end it before any data is collected.

| # | Requirement | Status |
|---|---|---|
| 1 | SPF record published for marginstead.com | ☐ |
| 2 | DKIM signing enabled | ☐ |
| 3 | DMARC record published (start `p=none`, monitor, then tighten) | ☐ |
| 4 | Custom tracking domain, or **no open/click tracking at all** (recommended — see below) | ☐ |
| 5 | Domain warmed for **2–3 weeks** before cold volume | ☐ |
| 6 | **Every address verified** through a validation service before sending | ☐ |
| 7 | Volume ramp: 10/day week 1 → 20/day week 2 → 30/day week 3, cap ~40/day | ☐ |
| 8 | Bounce rate monitored; **stop immediately above 3%** | ☐ |
| 9 | Suppression list live before send #1 | ☐ |

**Recommendation: turn open and click tracking off entirely.** Tracking pixels hurt
deliverability, and at this volume the only metric that matters is replies — which are
counted by hand anyway. A plain-text email from a person outperforms a tracked HTML template
with this audience.

**Consider sending from a separate domain** (e.g. a `.co` or a close variant) so that if
reputation is damaged, marginstead.com — the domain the landing page and any future product
depend on — is unaffected.

### 1.3 Volume discipline

150 prospects. Roughly 20 are Tier A. This is a **hand-sent, one-at-a-time experiment**, not
a campaign.

- **Send Tier A first — 20 emails, one at a time, personalized individually.**
- Wait for the reply pattern before enriching and sending the remaining 130.
- Never send to a `NEEDS RESEARCH` row.
- Never send to a constructed address.

---

## PART 2 — POSITIONING

### 2.1 The core message

> **"We're testing a system that identifies vendor credits and parts money repair shops may
> be missing. Would it be worth checking one vendor?"**

### 2.2 What makes these emails not sound like AI sales emails

Most cold B2B email fails in the same predictable ways. Every one is deliberately avoided:

| Standard cold-email tic | What we do instead |
|---|---|
| "I hope this email finds you well" | Open with the shop's own specific detail |
| "I wanted to reach out because…" | Just say the thing |
| "revolutionary AI-powered platform" | Never say AI, platform, solution, or leverage |
| Fake urgency ("only 3 spots left") | None. There is no scarcity and pretending otherwise is a lie |
| Fabricated social proof | **We have no customers. We say so.** |
| "Do you have 15 minutes for a quick call?" | No call. Reply to an email |
| Six paragraphs and three CTAs | Under 120 words, one question |
| "Hi {{FirstName}}" with no other personalization | A real, specific, verifiable detail per shop |
| Claiming a result | Admitting we're testing whether it's true |

**The strongest asset in this outreach is honesty about being early.** A shop owner has been
pitched by a hundred SaaS vendors claiming to have solved everything. Nobody has said "I'm
testing something and I don't know if it's true yet." That is disarming, it is genuinely
true, and it is what makes a low-friction yes possible.

### 2.3 Hard rules — never violate

**Never claim:**
- A dollar amount recovered for anyone
- A customer, testimonial, case study, or "shops like yours"
- An average leak rate or percentage
- That we know their shop is losing money
- Any implication that their staff is stealing or incompetent — **this kills the deal
  instantly.** The framing is always *the vendor may owe you*, never *your people messed up*

**Always:**
- Frame it as a test we are running
- Make the free audit unconditional
- State plainly that no software change and no call are required
- Say they keep the findings regardless of what happens next

---

## PART 3 — THE THREE VARIANTS

Send roughly a third of Tier A to each. Track which produces replies.

---

### VARIANT A — "The Core Charge"
*Most specific. Leads with the single most concrete, most felt version of the problem.*

**Subject:** `core credits`

```
[Name] — question about your core returns.

Saw [PERSONALIZATION — e.g. "you're running 11 bays over on Mount Houston"].
With that kind of volume you're sending back a lot of cores.

Here's what I'm trying to find out: when a core goes back to the vendor,
does anyone check the statement to confirm the credit actually landed?

Most shops I've talked to assume it did. Nobody has time to verify it.

I'm testing whether that assumption is costing shops real money. I'll do
it free for one vendor — send me a few months of invoices, statements and
credit memos for whoever you buy the most from, and I'll tell you what
doesn't line up.

No software to switch. No call. You keep whatever I find.

Worth checking one vendor?

Ryan
Marginstead
```

**Why it works:** core credits are the most visceral, most universally recognized version of
this problem in heavy-duty. Every shop owner has a story. The question *"does anyone check
the statement?"* is nearly impossible to answer yes to honestly.

---

### VARIANT B — "The Honest Test"
*Most disarming. Leads with the fact that we don't know yet.*

**Subject:** `probably nothing, but worth asking`

```
[Name] — I'll be straight about what this is.

I think heavy-duty shops lose money on parts vendors in ways nobody
catches: cores returned but never credited, credits that came back short,
the same invoice paid twice, prices that don't match what was quoted.

I don't actually know how big that is. That's what I'm trying to find out.

So I'm doing free audits. Pick one vendor — the one you spend the most
with. Send me a sample period of invoices, statements and credit memos.
I'll go through them and tell you what I find, including if the answer is
"nothing."

[PERSONALIZATION — e.g. "Given you've been at this since 1988, you've got
a longer paper trail with your vendors than most."]

No subscription. No migration off [Fullbay / your system]. No call unless
you want one.

Want to try one vendor?

Ryan
Marginstead
```

**Why it works:** "including if the answer is nothing" is the single most credible line
available. It removes the suspicion that this is a pretext for a sales call — because a real
salesperson would never write it.

---

### VARIANT C — "The Vendor Merger"
*Most timely. Uses a real, verifiable, current industry event.*

**Subject:** `since the FleetPride/TruckPro merger`

```
[Name] — do you buy from FleetPride or TruckPro?

They merged in October 2025. Whenever distributors combine, account
numbers get renumbered and price files get migrated — and that's exactly
when duplicate invoices and pricing discrepancies slip through.

[PERSONALIZATION — e.g. "With four shops across NC, SC and GA, you've
probably got several accounts that got touched."]

I'm testing a way to catch that. Send me a sample period of invoices and
statements from one vendor and I'll check them against what you were
supposed to be charged — pricing, quantities, duplicates, missing credits,
cores.

Free. No software change. No call. Findings are yours either way.

Worth a look at one vendor?

Ryan
Marginstead
```

**Why it works:** it references a real event (the TruckPro/FleetPride merger completed in
October 2025) that gives a concrete reason to look *now*. **Only send this to shops likely to
buy from FleetPride or TruckPro** — which is most independents, but confirm before sending.
The merger is real; the claim that it *has* caused errors at their shop is not made. The
language is "that's when errors slip through," not "you have errors."

---

## PART 4 — FOLLOW-UP

**One follow-up. Then stop.** These are business owners, not leads.

**Send 5 business days after the first email, in the same thread:**

```
[Name] — following up once in case this got buried.

Offer stands: one vendor, sample period, I tell you what I find, free.

If it's not useful, just reply "no thanks" and I'll leave you alone.

Ryan
```

**No second follow-up. No "just bumping this." No breakup email.** A shop owner who has not
replied twice is not interested, and a third email costs more in reputation than it can
possibly return.

---

## PART 5 — WHEN SOMEONE SAYS YES

### 5.1 Intake — keep it to one reply

```
Great. Here's what I need:

1. One vendor — whichever you spend the most with.
2. A sample period — 3 months is plenty to start.
3. Whatever you can export or scan:
   - Vendor invoices for that period
   - Vendor statements for those months
   - Any credit memos they issued
   - Your side of it: POs, ROs or parts records for the same period
     (a CSV export from your shop system is ideal)

If some of that is hard to pull, send what's easy and we'll work with it.

Two quick questions:
- What are you running for shop management — Fullbay, ShopView, something else?
- Are you using anything today to check parts invoices against your ROs?

I'll get you findings within [X] business days.
```

**Both questions are deliberate.** The first tells Marginstead which system to eventually
integrate with. **The second is the most important competitive data point available** — if a
meaningful share of qualified heavy-duty shops name WickedFile or an equivalent, that is a
strong negative market signal and belongs on the scoreboard immediately.

### 5.2 Commitments to keep

- **Set a turnaround time and hit it.** A slow first audit destroys the whole experiment.
- **Report honestly, including nothing found.** A clean audit is a real result and preserves
  the credibility the whole approach depends on.
- **Handle their financial records carefully.** Shops are sharing invoices, statements and
  pricing. Do not share them, do not publish them, do not name the shop anywhere without
  written permission. Delete on request.
- **Never publish a finding as a case study without written permission**, and never
  extrapolate one shop's result into a general claim.

### 5.3 The question that actually matters

After delivering findings — **and only after** — the real validation question:

> "If I did this every month across all your vendors, would that be worth paying for?
> And roughly what would it be worth to you?"

Their answer, not their enthusiasm about the free audit, is the thing being measured. A shop
that loves the free audit and will not pay is a **negative** result and must be recorded as
one.

---

## PART 6 — HOW TO READ THE RESULTS

| Outcome | Reading |
|---|---|
| Under 5 replies from 150 qualified prospects | The message isn't landing, or the problem isn't felt. Diagnose which before rewriting |
| 15+ genuine replies | Meets the brief's threshold — real interest exists |
| Replies but nobody sends records | **The most likely failure mode.** Curiosity without trust. The bottleneck is data handover, not interest |
| Records arrive but audits find nothing | The leak isn't real at this size. **Report it and stop.** |
| Audits find money but nobody will pay | The problem is real but not painful enough to fund. Also a stop signal |
| Audits find money and someone pays | Proceed to Phase 7 |

Track every one of these on the Phase 6 scoreboard. **The objective is not to prove the idea
is good. It is to find out whether customers will pay.**

---

## Sources

- https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business
- https://www.allegrow.co/knowledge-base/can-spam-act-compliance-guide
- https://www.sender.net/blog/can-spam-compliance/
- https://www.cbinsights.com/investor/truckpro (TruckPro/FleetPride merger, October 2025)
- https://branches.fleetpride.com/
