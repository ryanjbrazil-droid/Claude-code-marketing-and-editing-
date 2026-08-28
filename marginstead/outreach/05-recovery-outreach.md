# Outreach — Marginstead Recovery

**Effective:** 2026-08-28 · **Supersedes** the three variants in `04-outreach-strategy.md`
(the compliance and deliverability sections of that document remain in force).

**STATUS: NOT SENDABLE.** See §6 for the live blocker list.

> **MODE A ONLY (Gate 0).** Marginstead does not contact vendors. Every claim and follow-up is
> drafted by Marginstead and **sent by the customer, in the customer's own name.** No copy in
> this document may imply Marginstead contacts, chases, negotiates with or represents anyone to
> a vendor. See `research/09-gate-0-regulatory.md`.

---

## 1. Scope of this campaign

**20 emails. Not 150.** The queue is `data/Marginstead_Launch20_Curated.csv` —
**15 SEND READY, 5 ENRICH FIRST.**

**"SEND READY" means a public contact was sourced. It does not mean send.** Every mailbox must
pass final deliverability/mailbox verification first; that is Gate 1. See
`data/README-launch20.md` for the per-row verification queue — six rows have an email domain that
differs from the company's known website, and one (Precision Truck & Trailer) is a close-domain
mismatch worth resolving before anything goes out.

The rest of the 150-company pool is parked. The immediate objective is **one** qualified business
providing records for **one vendor, one month**. Twenty carefully personalized emails to the
best-qualified shops is a better instrument for that than a volume campaign, and it is the
only instrument that can be run honestly given the contact-verification blocker.

Each email is **written individually**. There is no mail-merge here. The template below is a
skeleton for a human to fill from that shop's row in the enrichment queue.

---

## 2. The message

> "We're testing a service for heavy-duty repair shops that checks whether parts vendors
> actually credited returned parts and cores — and, when authorized, builds the claim and
> manages the follow-up process until the credit actually posts."

The differentiator carried in every email is **the follow-through**, not the finding.

**Mode A phrasing that is safe to use:** *find the issue · build the claim · put the evidence
together · manage the follow-up process · draft what you send · track what they promised ·
check the next statement · verify the credit posted.*

**Never use:** *we contact your vendor · we chase them · we go after them · we deal with your
rep · we negotiate · on your behalf · we get it back for you.*

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

I'm testing a service that checks that. If something's missing, I put the claim
together with the evidence behind it and hand it to you to send — you deal with
your vendor, I make sure nothing gets dropped and that the credit actually
posts. Not software. No migration.

To start I'd only need one vendor and one month: whoever you spend the most
with, their statement for a single month, plus the returns and credits that go
with it. I'll tell you what doesn't line up.

Free, and you see the findings before anything goes anywhere.

Would you be open to checking one vendor?

Ryan
Marginstead
[REAL STREET ADDRESS, CITY, STATE ZIP]
Reply "no thanks" and I won't contact you again.
```

**Word count: ~185.** Longer than the previous variants, deliberately — it has to carry the
promise, the Mode A division of labour, and the smallness of the ask.

**Why each part is there:**

| Line | Job |
|---|---|
| The personalization | Proves a human looked at their business |
| "does anyone check the next statement" | Nearly impossible to answer *yes* to honestly. This is the wedge, phrased as a question. |
| "a promised credit isn't a credit" | The whole thesis in seven words |
| "I put the claim together... you deal with your vendor" | **The Mode A distinction, stated plainly in the first email.** Also pre-empts the biggest objection — nobody unknown goes near their parts rep. |
| "Not software. No migration." | Separates Marginstead from every SaaS pitch they've been sent, and from WickedFile specifically |
| "one vendor and one month" | Kills the trust objection before it forms |
| "you see the findings before anything goes anywhere" | Removes the fear that sending records sets something irreversible in motion |
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
exactly which four documents to pull — it's a short list. Nothing goes to your
vendor from me either way; you'd send anything that gets sent.

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

I'll have findings back to you within [X] business days. Nothing goes to your vendor
unless you decide it should — and if it does, it goes from you, not me.
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
If you want me to work any of these, here's how it goes:

I put the claim together — the invoice, the statement line, the credit memo, the
return record, all of it — and write the letter or email. You send it to your
vendor, from you. They never hear from me.

From there I keep it moving: I tell you when to follow up and write each one,
log whatever they send back, track what they promised and by when, draft the
escalation if it stalls, and check your next statement to confirm the credit
actually posted.

20% of what you actually get back. Nothing back, nothing owed.

On a cash refund, that's when the money reaches you. On an account credit, it's
when the credit posts AND gets applied against a bill you'd otherwise have paid
— a credit sitting unused on your account costs you nothing from me.

No subscription, no commitment.

Want me to work any of these?
```

**State the division of labour before they ask.** Some owners will not say out loud that they
don't want a stranger near their FleetPride rep — they will just go quiet. "They never hear from
me" answers it before it becomes a silence.

**Do not offer, hint at, or agree to contact a vendor directly, even if the customer asks you
to.** Mode B is locked until Gate 0 clears. If a customer offers, the answer is: *"Not yet — I'm
getting the legal side squared away first. For now I build it and you send it."*

### 5.4 The question that decides everything

If the shop declines recovery, ask anyway:

> "Fair enough. Out of curiosity — if the money were real and someone built the claim and kept
> the whole follow-up on track until it posted, is that something you'd pay for? What would it
> be worth?"

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
| 8 | **Gate 0: no copy implies vendor contact, representation or collection activity** | ☑ verified |

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
| 1 | Named decision makers | ☑ 14 / 20 (6 use a business mailbox) |
| 2 | Public contact sourced | ☑ 15 / 20 SEND READY · ☐ 5 ENRICH FIRST |
| 2b | **Mailbox / deliverability verified** | ☐ **0 / 20 — this is the real Gate 1** |
| 3 | Every personalization point real and sourced | ☑ 20 / 20 |
| 4 | **Location counts corrected** where the queue's `locations` field and `personalization` disagree (rows 3 and 6) | ☐ |

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
- **No AI or software pitch.** A person building claims and tracking them is the accurate
  description.
- **No claim that Marginstead contacts, chases or negotiates with vendors.** It does not. The
  customer sends everything, under its own name.
- **No mention of Mode B.** Locked until Gate 0 clears.
- **No fake urgency.** No deadline, no limited spots.
- **No blame on shop staff.** The framing is always *the vendor owes you*.
- **No legal classification of Marginstead.** Never state or imply what Marginstead legally is or
  is not. Describe conduct only (`ops/data-handling.md` §6b).
- **No call request.** Email start to finish unless they want one.
