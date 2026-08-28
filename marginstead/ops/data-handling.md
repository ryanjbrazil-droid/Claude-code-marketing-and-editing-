# Data Handling, Secure Upload, Retention & Authorization

**Status: BLOCKING.** This must be operational **before** Marginstead requests a single
financial document from anyone. It is referenced by the landing page, the outreach copy and
the intake script.

**Design rule: no software to build.** Every item below is a configuration decision or a
written document. If any of it requires engineering, it is over-scoped for this stage.

---

## 1. Why this comes first

The largest risk in the funnel is not disinterest — it is a shop owner deciding not to hand
financial records to a stranger. That decision is made in the ten seconds after they read the
ask. **Trust is a design problem, and it is solved with specifics, not reassurance.**

"Your data is secure" persuades nobody. "You'll upload to a private folder only you and I can
see, I'll delete it 30 days after you get the findings, and here's the one-page policy"
persuades people, because it is checkable.

---

## 2. Secure intake — what to use

### Do NOT use email attachments

Vendor statements contain account numbers, pricing terms and payment history. Email is
unencrypted in transit between servers, sits in two mailboxes indefinitely, and gets forwarded.
It is also the wrong signal to send about how carefully the records will be handled.

### Recommended: per-customer private cloud folder

The lowest-friction option that is genuinely defensible at this stage.

| Requirement | Setting |
|---|---|
| Provider | Google Drive, Dropbox, or OneDrive — a paid business tier, never a personal free account |
| Folder structure | **One folder per customer.** Never a shared "uploads" folder. |
| Access | Invite the customer's specific email address only. **No "anyone with the link" sharing, ever.** |
| Permissions | Customer: upload + view their own folder. Nobody else has any access. |
| Link expiry | Set an expiry on the invite where the provider supports it |
| 2FA | **Required** on the Marginstead account holding customer records |
| Device | Records accessed only from a password-protected, disk-encrypted machine |
| Backups | Do not copy customer records into personal backups, Downloads folders, or scratch directories |

**Fallback for shops that will not use cloud storage:** offer a secure upload link from a
service like Dropbox File Request, or accept physical mail. Some older shops will prefer to
mail photocopies, and refusing that is losing a customer over a preference.

### If the shop insists on email

Do not refuse the customer. Accept it, then immediately move the files into the private folder
and delete the email and its attachments from both the inbox and trash. Record that this
happened in the case file.

---

## 3. What Marginstead asks for — the finite list

The ask is bounded and named. **Never ask for "your accounting records" or open-ended access.**

**One vendor. One month.**

1. That vendor's **monthly statement** for the chosen month
2. The **invoices** from that vendor for that month
3. Any **credit memos** that vendor issued in that month
4. Any **return or core-return records** for that month — RMA/return authorizations, core tags,
   pickup receipts
5. **Your side of it, if easy to pull:** the POs, work orders or repair orders that match those
   invoices — a CSV export from Fullbay/ShopView is ideal, but a PDF or a screenshot works

**Explicitly not requested, and say so:**

- Bank statements or bank access
- Login credentials to any system — **Marginstead will never ask for a password**
- Tax returns, payroll, financial statements, P&L
- Customer lists or customer pricing
- Any vendor other than the one chosen
- Any month other than the one chosen

---

## 4. Data retention policy — customer-facing text

> **How Marginstead handles your records**
>
> **What we ask for.** One vendor, one month: that vendor's statement, invoices and credit
> memos, your return and core records for that month, and — only if it's easy for you to pull —
> the matching POs or repair orders.
>
> **What we never ask for.** Bank access, logins or passwords, tax returns, payroll, customer
> lists, or anything from vendors and months outside the one you chose.
>
> **How you send it.** A private folder only you and Marginstead can access. Not email.
>
> **Who sees it.** Only Marginstead. We do not share your records with anyone, and we do not
> contact your vendor about anything until you authorize it in writing.
>
> **How long we keep it.** Your records are deleted **30 days after we deliver your findings**,
> unless you authorize recovery work — in which case we keep only the specific documents needed
> as evidence for the claims you approved, and delete those 30 days after every case is closed.
>
> **Delete at any time.** Email ryan@marginstead.com and say "delete my records." We will delete
> them and confirm in writing within 5 business days. You do not need to give a reason.
>
> **We do not publish your name or your numbers.** Not on the website, not in a case study, not
> in an example — not ever, unless you give written permission for something specific.

**Put this on the landing page and link it from every email that asks for documents.**

---

## 5. Retention schedule — internal

| Stage | What is kept | Deleted when |
|---|---|---|
| Audit delivered, no authorization | Everything the customer sent | **30 days after findings delivered** |
| Recovery authorized | Only documents that are evidence for approved claims | **30 days after all cases closed** |
| Customer requests deletion | Nothing | **Within 5 business days**, confirmed in writing |
| Marginstead's own case notes | Claim log, dates, outcomes, amounts — **no customer source documents** | Retain; this is the audit trail and the validation record |

**The case log is the exception worth keeping** — it is how Marginstead learns what recovery
actually takes. It records what was claimed, when contact was made, what the vendor said and
whether money posted. It does not need to contain the customer's source documents to do that.

---

## 6. Authorization to pursue recovery

**Nothing is claimed from any vendor without written authorization.** The findings report is
delivered first, and the customer decides.

### Two modes — offer both, lead with A on hesitation

| | **Mode A — Claim packet** | **Mode B — Direct contact** |
|---|---|---|
| Who contacts the vendor | **The shop** | **Marginstead**, on the shop's behalf |
| What Marginstead does | Assembles the documented claim, tracks it, sets follow-up dates, drafts escalations, verifies posting on the next statement | All of the above, plus makes the contact |
| Vendor relationship | Untouched | Marginstead appears as the shop's representative |
| Best for | Owners protective of their vendor rep | Owners who want it off their plate |

Mode A still delivers the core value — the tracking, the scheduled follow-up, the escalation
drafting and the step-7 verification. **It is the answer to "I don't want a third party calling
my FleetPride rep,"** and it should be offered immediately when that hesitation appears.

### Authorization document — what it must state

Draft before Gate 6. **Have a lawyer review it before it is signed by anyone.**

1. **Scope:** the named vendor, the named period, and the specific claims listed by amount
2. **Mode:** A or B, explicitly chosen
3. **Fee:** 20% of amounts **actually recovered and verified as posted**; **no recovery, no fee**
4. **Definition of "recovered":** verified on a subsequent vendor statement — not a vendor's
   promise, not an email saying yes
5. **Account credit vs. cash:** exactly how a credit against the account is treated for fee
   purposes — **must be settled before the first authorization** (see positioning doc §6)
6. **Limits:** Marginstead does not make legal claims, does not conduct collections activity,
   does not litigate, and does not sign anything on the shop's behalf
7. **Revocable:** the customer may withdraw authorization in writing at any time
8. **Data:** retention and deletion terms per §4

---

## 7. Pre-flight checklist — must all be true before requesting documents

| # | Item | Status |
|---|---|---|
| 1 | Paid business cloud storage account with 2FA enabled | ☐ |
| 2 | Per-customer private folder procedure written down and tested once | ☐ |
| 3 | Retention policy (§4) published on the landing page at a stable URL | ☐ |
| 4 | Retention policy linked from every email that asks for documents | ☐ |
| 5 | Deletion request process defined; someone monitors ryan@marginstead.com for it | ☐ |
| 6 | Machine holding records is disk-encrypted and password-protected | ☐ |
| 7 | Case log template created (claims, dates, contacts, promises, postings) | ☐ |
| 8 | Findings report template created | ☐ |
| 9 | Authorization document drafted | ☐ (needed by Gate 6, not Gate 4) |
| 10 | Authorization document reviewed by a lawyer | ☐ (needed by Gate 6) |
| 11 | Account-credit-vs-cash fee definition settled in writing | ☐ (needed by Gate 6) |

**Items 1–8 block Gate 4** (receiving the first record set).
**Items 9–11 block Gate 6** (authorizing the first recovery).

---

## 8. If something goes wrong

Write this down now, while it is hypothetical.

- **Records sent to the wrong place, or the wrong person given access:** tell the customer the
  same day, in plain language, with what happened and what was done about it. Do not wait to
  understand it fully first.
- **A customer asks for deletion mid-audit:** stop work immediately, delete, confirm in writing.
  No retention attempt, no asking why.
- **A vendor disputes Marginstead's standing to ask:** stop, switch to Mode A, and let the shop
  make the contact. Do not argue with a vendor on a customer's behalf.
- **A finding turns out to be wrong after a claim was made:** tell the customer and the vendor
  immediately and withdraw it. **A shop that takes three bad claims to its FleetPride rep loses
  credibility with that vendor and will never work with Marginstead again.** Precision matters
  more than volume, always.
