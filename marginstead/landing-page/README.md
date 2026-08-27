# Phase 5 — Landing Page

**Files**
- `index.html` — the complete, standalone page. Deploy this.
- `_body.html` — the same page as a body fragment, used to publish the review preview.
  Not for deployment.

**Live preview:** https://claude.ai/code/artifact/5d20f85d-a2bd-4786-8063-ab063ab13c22

---

## What it is

A single page, no build step, no dependencies, no JavaScript. Drop `index.html` on any
static host (Netlify, Cloudflare Pages, GitHub Pages, S3) and point marginstead.com at it.
Roughly 18 KB total.

**Structure:**
1. Headline — *"Your parts vendors may owe your shop money."*
2. The reconciliation panel — your records vs. the vendor's paperwork, and the gap between
3. The seven checked categories, as a statement-style ledger
4. How the audit works — three steps
5. What it costs / who it's for
6. A candour block stating plainly that Marginstead is new and has no results yet
7. Closing CTA
8. Footer with the physical-address slot

**Primary CTA:** *Get the free 90-day vendor audit* — a `mailto:` to ryan@marginstead.com
with a pre-filled subject and a short intake template (shop name, location, technician count,
main vendor, shop software). No form backend to build, no lead-capture tool to pay for, and
the reply lands directly in the inbox that will run the audit.

## Design rationale

The page is built to look like the thing it is about. The palette is drawn from the pale
green copy of a multipart parts ticket; the seven categories are set as an actual ledger
table with monospace reference codes and a hairline grid rather than as icon cards; the
discrepancy red appears in exactly two places and nowhere else. Type is Archivo (signage) +
IBM Plex Sans (technical text) + IBM Plex Mono (data and labels). Light and dark themes are
both defined at token level and both tested.

## What it deliberately does not have

Per the brief — *"Do not build unnecessary features"* and *"Do not publish fake claims"*:

- **No testimonials, logos, case studies, or dollar figures.** There are none, and the page
  says so in its own section rather than leaving an awkward gap where social proof usually is.
- No form backend, CRM, analytics, chat widget, cookie banner, or newsletter signup.
- No pricing page — the audit is free and there is nothing else to sell yet.
- No "book a demo" calendar. The offer is explicitly *no sales call required*.
- No stock photography of trucks.

The candour block is the page's strongest differentiator. Every competing vendor claims a
result. Marginstead saying "we don't have case studies and we're not going to invent them,
and if we find nothing we'll tell you that" is both true and more persuasive to a shop owner
than a fabricated number would be.

## Before it goes live — blocking items

| # | Item | Why |
|---|---|---|
| 1 | **Fill in `[STREET ADDRESS]` and `[CITY, STATE ZIP]` in the footer** | Required by CAN-SPAM in commercial email, and the address should match the site. Currently a placeholder. |
| 2 | Confirm ryan@marginstead.com is live and monitored | It is the only conversion path on the page |
| 3 | Add a short privacy note | The page asks shops to send financial records. State retention and deletion in writing. |
| 4 | Serve over HTTPS with a real certificate | Shops will not send invoices to an insecure site |
| 5 | Re-read the vendor disclaimer in the footer | Confirm the wording is accurate for Marginstead's actual relationships (currently: not affiliated with any vendor) |

## Later, only if the experiment justifies it

- Replace the `mailto:` with a real intake form plus secure upload once volume makes email
  attachments unwieldy.
- Add the measured leak findings **only after real audits produce them**, with written
  permission, and never extrapolated into a general claim.
