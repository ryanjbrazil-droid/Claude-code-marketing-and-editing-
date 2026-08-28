# Landing Page — Marginstead Recovery

**Files**
- `index.html` — the complete, standalone page. Deploy this. ~21 KB, no build step, no JS.
- `_body.html` — body fragment used to publish the review preview. Not for deployment.

**Live preview:** https://claude.ai/code/artifact/5d20f85d-a2bd-4786-8063-ab063ab13c22

---

## Exact changes made in the 2026-08-28 rewrite

| # | Element | Before | After |
|---|---|---|---|
| 1 | Page title | "Marginstead Vendor Audit" | **"Marginstead Recovery"** |
| 2 | Masthead tagline | "Vendor audits for heavy-duty repair shops" | **"Vendor-credit recovery for heavy-duty repair shops"** |
| 3 | Headline | *unchanged* | **"Your parts vendors may owe your shop money."** |
| 4 | Sub-headline | Described the leak types | **"Marginstead checks returned parts, cores, warranty credits and vendor statements for money that appears to be missing — then, when you authorize it, follows the issue through until the credit is resolved."** |
| 5 | **New element** | — | **Core promise, set as a pull quote in accent green: "We don't just find money you're owed. We get it back."** |
| 6 | **Primary CTA** | "Get the free 90-day vendor audit" | **"Check one vendor free"** (both instances) |
| 7 | CTA sub-copy | "One vendor. One sample period." | **"Start with one vendor. Start with one month. See the findings before you authorize anything."** |
| 8 | Comparison panel | "Your records" vs "The vendor's paperwork" | **"Where everyone else stops" vs "Where Marginstead starts"** — reframed around detection-vs-recovery, ending on "and it sits there" / "we check the next statement to confirm it posted" |
| 9 | Panel footer | "the gap between them is where the money sits" | **"A promised credit isn't a credit until it shows up on a statement — so we don't close a case until it does."** |
| 10 | Checked categories | 7 rows | **8 rows — added `WC` Warranty credits**, per the new positioning |
| 11 | Ledger caption | "Vendor profit-leak audit — categories checked" | **"What we check — and pursue"** |
| 12 | Process | 3 steps ending at "you get the findings" | **4 steps ending at "We chase it until it posts"** — adds the authorization step and the recovery step |
| 13 | Step 1 | "3 months is plenty" | **"One vendor, one month"** with the exact four-document list |
| 14 | Step 3 | — | **New: "You decide what we chase"** — introduces Mode A (claim packet, vendor never hears from us) and Mode B (direct contact) |
| 15 | Pricing block | "The audit is free. No subscription." | **"The check is free… 20% of what's actually recovered. Nothing recovered, nothing owed. 'Recovered' means posted to your account or paid — not promised."** |
| 16 | Who it's for | *largely unchanged* | Last line changed to **"Nobody on staff whose actual job is chasing vendors for credits."** |
| 17 | **New section** | — | **"What we ask for, and what we never ask for"** — the four documents, the explicit never-ask list (bank access, logins, tax returns, payroll, customer lists), private-folder upload, 30-day deletion, no publishing your name, no vendor contact without written authorization |
| 18 | Candour block | "no case studies… we're not going to invent them" | Strengthened: **"and we're not going to quote somebody else's"** |
| 19 | Closing CTA | "Worth checking one vendor?" | **"Would you be open to checking one vendor?"** — matches the outreach CTA exactly |
| 20 | Footer | "independent audit service" | **"independent recovery service"** |
| 21 | Meta description / OG tags | Audit framing | Recovery framing |

**Unchanged:** the visual system (form-green palette, Archivo/IBM Plex pairing, ledger-table
treatment, light and dark themes), the headline, and the absence of testimonials, logos,
dollar figures, forms, analytics and stock photography.

---

## Deploy

Drop `index.html` on any static host and point marginstead.com at it. No dependencies.

**Primary CTA** is a `mailto:` to ryan@marginstead.com with subject "Check one vendor" and a
short intake template pre-filled (shop name, location, technician count, main vendor, shop
software). No form backend to build.

---

## Blocking before it goes live

| # | Item | Why |
|---|---|---|
| 1 | **Fill `[STREET ADDRESS]` and `[CITY, STATE ZIP]` in the footer** | Required in commercial email under CAN-SPAM; the site address should match. Still a placeholder. |
| 2 | **Publish the retention policy at a stable URL and link it from the "Your records" section** | The intake email links to it. Text is written in `ops/data-handling.md` §4. |
| 3 | Confirm ryan@marginstead.com is live and monitored | Only conversion path on the page |
| 4 | HTTPS with a real certificate | The page asks shops to send financial records |
| 5 | Confirm the vendor-neutrality disclaimer is accurate | Footer currently states no affiliation with any parts vendor |

## Not to be added until earned

- Recovery figures, case studies or testimonials — **only after a real verified recovery, with
  written permission, never extrapolated into a general claim.**
- A real upload form — only when email and shared folders become the bottleneck.
- Any claim of an integration. Marginstead integrates with nothing today.
