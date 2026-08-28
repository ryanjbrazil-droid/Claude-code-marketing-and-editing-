# Outreach — Marginstead Recovery

**Effective:** 2026-08-28 · **Supersedes** the three variants in `04-outreach-strategy.md`
(the compliance and deliverability sections of that document remain in force).

**STATUS: NOT SENDABLE.** Two blockers stand — no registered business postal address, and
zero verified contact addresses. See §6.

---

## 1. Scope of this campaign

**20 emails. Not 150.**

The 130 Tier B/C prospects are parked. The immediate objective is **one** qualified business
providing records for **one vendor, one month**. Twenty carefully personalized emails to the
best-qualified shops is a better instrument for that than a volume campaign, and it is the
only instrument that can be run honestly given the contact-verification blocker.

Each email is **written individually**. There is no mail-merge here. The template below is a
skeleton for a human to fill from that shop's row in the enrichment queue.

---

## 2. The message

> "We're testing a service for heavy-duty repair shops that checks whether parts vendors
> actually credited returned parts and cores — and, when authorized, handles the follow-up
> until the credit is resolved."

The differentiator carried in every email is **the follow-through**, not the finding.

---

## 3. Email #1

**Subject:** `one vendor, one month`

```
[Name] — quick question about your parts vendors.

[PERSONALIZATION — one real, specific, sourced detail. Examples:
 · "Saw you're running 10 bays out in Markham with 50-odd mechanics."
 · "Four shops across Middle Tennessee is a lot of parts moving between sites."
 · "Doing complete engine swaps on CAT, Cummins, Detroit and Volvo means you're
    sending back some serious cores."]

When a core or a returned part goes back, does anyone check the vendor's next
statement to confirm the credit actually posted?

Most shops assume it did. Nobody has the hours to verify it, and a promised
credit isn't a credit until it shows up.

I'm testing a service that checks that — and, if you authorize it, handles the
follow-up with the vendor until it's resolved. Not software. No migration. Me,
doing the chasing.

To start I'd only need one vendor and one month: whoever you spend the most
with, their statement for a single month, plus the returns and credits that go
with it. I'll tell you what doesn't line up.

Free, and you see the findings before anything else happens.

Would you be open to checking one vendor?

Ryan
Marginstead
[REAL STREET ADDRESS, CITY, STATE ZIP]
Reply "no thanks" and I won't contact you again.
```

**Word count: ~170.** Longer than the previous variants, deliberately — it has to carry both
the new promise and the smallness of the ask.

**Why each part is there:**

| Line | Job |
|---|---|
| The personalization | Proves a human looked at their business |
| "does anyone check the next statement" | Nearly impossible to answer *yes* to honestly. This is the wedge, phrased as a question. |
| "a promised credit isn't a credit" | The whole thesis in seven words |
| "Not software... Me, doing the chasing." | Separates Marginstead from every SaaS pitch they've been sent, and from WickedFile specifically |
| "one vendor and one month" | Kills the trust objection before it forms |
| "you see the findings before anything else happens" | Removes the fear that authorizing an audit means authorizing vendor contact |
| "Would you be open to checking one vendor?" | Lowest-friction close available |

**Note on pricing:** the 20% fee is deliberately **not** in email #1. The first email sells a
free look at one month. Introducing a fee before there is a finding invites a pricing debate
before there is anything to price. It is disclosed in full at the findings stage (§5), before
any authorization.

---

## 4. Follow-up — one, then stop

**5 business days later, same thread:**

```
[Name] — following up once, then I'll leave it.

Still happy to check one vendor, one month, free. If it's easier, I can tell you
exactly which four documents to pull — it's a short list.

Not interested is a fine answer.

Ryan
```

**No second follow-up. No "just bumping this."** These are owners, not leads.

---

## 5. When someone says yes

### 5.1 Intake reply

```
Great — here's the whole list. One vendor, one month.

1. That vendor's statement for the month
2. Their invoices for that month
3. Any credit memos they issued that month
4. Your return and core records for that month — RMAs, core tags, pickup receipts

If it's easy to pull, the matching POs or repair orders help a lot — a CSV export
from Fullbay or ShopView is ideal, but a PDF is fine.

I'll send you a private folder link to upload to. Not email — those statements have
your account numbers and pricing on them.

Things I'll never ask you for: bank access, any login or password, tax returns,
payroll, or anything from a vendor or month other than the one you pick.

Your records get deleted 30 days after I send you the findings, and you can tell me
to delete them sooner at any time. Full policy here: [RETENTION POLICY URL]

Two quick questions while I set this up:

- What are you running for shop management — Fullbay, ShopView, something else?
- Are you using anything today to check that invoices, returns, cores and vendor
  credits are right?

I'll have findings back to you within [X] business days.
```

### 5.2 The competitor questions — record every answer

**Question 1** is in the intake above. If the answer names **WickedFile or any equivalent**,
ask the follow-up. This is the single most valuable question in the experiment:

> "When it flags something, who actually contacts the vendor and chases it down?
> Does that still land on your staff?"

| Answer | Meaning | Record as |
|---|---|---|
| "My service writer has to chase it" | **Thesis confirmed** — detection without recovery | `still_chases_manually = YES` |
| "A lot of it just sits there" | **Thesis strongly confirmed.** Ask roughly how much. | `still_chases_manually = YES — backlog` |
| "We have someone who handles all that" | Gap is closed. Disqualified, but valuable data. | `still_chases_manually = NO` |
| "Never heard of it" | Normal | `uses_reconciliation_tool = none` |

A shop that already pays for WickedFile **and** still chases manually is the best prospect in
the entire list, not a lost one.

### 5.3 Findings report — and only now, the price

Delivered free, whatever it contains. Structure:

1. **What was checked** — vendor, month, document count
2. **What doesn't line up** — each item with the amount, the evidence, and the confidence
3. **What isn't clear** — items needing the shop's input. Say so; don't pad the list.
4. **What it would take to get it back** — per item
5. **What Marginstead would do next, if authorized**

Then, plainly:

```
If you want me to go after any of these, here's how it works:

I assemble the claim, contact the vendor, follow up on a schedule, escalate if it
stalls, and check the next statement to confirm the credit actually posted. I don't
close a case until the money or the account credit shows up.

20% of what's actually recovered. Nothing recovered, nothing owed. No subscription,
no commitment.

Two ways to run it, your choice:
  A) I build the claim and you send it — I still track it, chase it and verify it,
     and your vendor never hears from me.
  B) I contact the vendor directly on your behalf.

Plenty of shops prefer A. Either is fine.

Want me to go after any of these?
```

**Offer Mode A unprompted.** Some owners will not say out loud that they don't want a stranger
calling their FleetPride rep — they will just go quiet.

### 5.4 The question that decides everything

If the shop declines recovery, ask anyway:

> "Fair enough. Out of curiosity — if the money were real and someone handled the chasing
> end to end, is that something you'd pay for? What would it be worth?"

Their answer goes on the scoreboard. **A shop that enjoyed the free audit and will not pay is
a negative result** and must be recorded as one.

---

## 6. Before email #1 can be sent

### 6.1 Legal — CAN-SPAM

CAN-SPAM applies to B2B and is enforced **per individual email**, with a maximum civil penalty
of **$53,088 per non-compliant message** (FTC, January 2025 adjustment).

| # | Requirement | Status |
|---|---|---|
| 1 | Truthful sender information — real person, real domain, accurate headers | ☐ |
| 2 | Truthful subject line matching the body | ☑ (`one vendor, one month` — accurate) |
| 3 | Identifiable as a commercial solicitation | ☑ (handled by the footer) |
| 4 | **Valid registered business postal address in the footer** | ☐ **BLOCKING** |
| 5 | Clear opt-out mechanism | ☑ (reply "no thanks" — no login, no fee, no form) |
| 6 | Opt-outs honored within 10 business days; suppression list exists | ☐ |
| 7 | Responsibility for anything sent on Marginstead's behalf | ☐ |

### 6.2 Deliverability

| # | Requirement | Status |
|---|---|---|
| 1 | SPF, DKIM, DMARC published for the sending domain | ☐ |
| 2 | Domain warmed 2–3 weeks before cold sending | ☐ |
| 3 | **Every address verified** before sending | ☐ |
| 4 | No open/click tracking (recommended — replies are the only metric) | ☐ |
| 5 | Bounce monitoring; stop above 3% | ☐ |

At 20 hand-written emails, volume ramping is not a concern — **but a single bounce out of 20 is
a 5% bounce rate.** Verification matters more here than at scale, not less.

### 6.3 Contact verification

| # | Requirement | Status |
|---|---|---|
| 1 | 20 verified decision-maker names | ☐ **0 / 20** |
| 2 | 20 verified public business emails | ☐ **0 / 20** |
| 3 | Every personalization point real and sourced | ☑ 20 / 20 already sourced |

**If an email cannot be safely verified, leave it blank and call the shop instead.** Do not
construct an address. Nineteen good sends beat twenty with one guess in them.

### 6.4 Operational — from `ops/data-handling.md`

| # | Requirement | Status |
|---|---|---|
| 1 | Secure per-customer upload folder procedure ready | ☐ |
| 2 | Retention policy published at a stable URL | ☐ |
| 3 | Findings report template built | ☐ |
| 4 | Case log template built | ☐ |

**Item 2 is a hard prerequisite for the intake reply**, which links to it. Do not send email #1
without somewhere for that link to point.

---

## 7. What is deliberately absent

- **No claim of money recovered for anyone.** There is none.
- **No customers, testimonials or case studies.** Competitors publish recovery figures; those
  are theirs.
- **No claimed integrations.** Marginstead integrates with nothing. It reads documents.
- **No AI or software pitch.** "Me, doing the chasing" is the accurate description.
- **No fake urgency.** No deadline, no limited spots.
- **No blame on shop staff.** The framing is always *the vendor owes you*.
- **No call request.** Email start to finish unless they want one.
