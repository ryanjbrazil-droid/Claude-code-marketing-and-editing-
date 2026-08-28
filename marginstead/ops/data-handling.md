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

### MODE A ONLY (Gate 0)

**Marginstead does not contact vendors.** There is one mode during validation:

| Step | Who |
|---|---|
| Identify the discrepancy, assemble evidence, draft the claim | **Marginstead** |
| **Send it to the vendor** | **The customer**, in its own name |
| Schedule follow-ups and draft each one | **Marginstead** |
| Send each follow-up | **The customer** |
| Forward the vendor's responses | **The customer** |
| Log responses, track promises and dates, draft escalations | **Marginstead** |
| Review the next statement; verify the credit posted and was applied | **Marginstead** |
| Close the case | **Marginstead**, only on verified realization |

**Prohibited until Gate 0 clears — no exceptions, including at a customer's request:**
contacting vendors directly · representing Marginstead as a collection agency · receiving
customer recoveries into Marginstead accounts · threatening legal action or collections ·
negotiating disputed obligations as the customer's representative · building or activating a
vendor-facing recovery voice agent.

**Mode B is locked.** Do not offer it, reference it in any customer-facing material, or agree to
it if asked. The answer to a customer who offers is: *"Not yet — I'm getting the legal side
squared away first."*

**Recovered funds never pass through Marginstead.** Money goes directly from vendor to customer;
Marginstead invoices separately afterward. This should probably remain permanent regardless of
what counsel concludes.

### Authorization document — what it must state

Draft before Gate 6. **Have a lawyer review it before it is signed by anyone.**

1. **Scope:** the named vendor, the named period, and the specific claims listed by amount
2. **Mode:** Mode A. State explicitly that Marginstead will not contact the vendor and that all
   communications are sent by the customer in the customer's own name.
3. **Fee:** 20% of **verified realized recovery value**; **no realized recovery, no fee**
4. **Definition of "recovered":** cash refunds count when the customer receives the money;
   account credits count only when **both** verified as posted **and** actually applied against
   an invoice or balance the customer would otherwise have paid. A promise is not a recovery; an
   unapplied credit memo is not a recovery. Worked example in `research/09-gate-0-regulatory.md` §5.
5. **Funds:** recovered money is paid by the vendor directly to the customer. Marginstead never
   receives or holds customer recoveries, and invoices separately after realization.
6. **Limits:** Marginstead is not a collection agency; does not contact vendors; does not
   negotiate as the customer's representative; does not make legal claims, conduct collections
   activity or litigate; and does not sign anything on the shop's behalf.
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
| 9 | Mode A authorization document drafted | ☐ (needed by Gate 6, not Gate 4) |
| 10 | **Gate 0: counsel confirms Mode A classification** and reviews the authorization | ☐ **(blocks Gate 6)** |
| 11 | Realized-recovery fee definition settled in writing | ☑ (see `research/09-gate-0-regulatory.md` §5) |

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
- **A vendor contacts Marginstead directly:** do not engage on the substance of the claim.
  Redirect to the customer. Marginstead has no standing with the vendor and must not acquire one.
- **A customer asks Marginstead to just call the vendor:** decline. Explain that the legal review
  isn't finished. Mode B is locked regardless of who requests it.
- **A finding turns out to be wrong after a claim was made:** tell the customer and the vendor
  immediately and withdraw it. **A shop that takes three bad claims to its FleetPride rep loses
  credibility with that vendor and will never work with Marginstead again.** Precision matters
  more than volume, always.
