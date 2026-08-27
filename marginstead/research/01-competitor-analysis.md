# Phase 1 — Competitor & Market Research

**Prepared:** 2026-08-27
**For:** Marginstead — free 90-day vendor profit-leak audit for heavy-duty repair businesses

---

## 0. Research method and confidence disclosure

Read this first. It governs how much weight to put on everything below.

This research was conducted using web search only. **Direct page fetching was blocked by
this environment's network egress policy**, so I could not open vendor pricing pages,
product pages, or review sites directly. Every fact below is sourced from search-engine
result summaries of those pages.

Each claim is tagged:

| Tag | Meaning |
|---|---|
| `[VERIFIED-VENDOR]` | Attributed to the vendor's own site in search results |
| `[THIRD-PARTY]` | From a review aggregator (Capterra, G2, GetApp, Software Advice) — directionally right, often stale |
| `[UNVERIFIED]` | Single-source or inferred; **confirm before using in sales material** |

**Do not put any `[THIRD-PARTY]` or `[UNVERIFIED]` pricing figure in an email, on the
landing page, or in a pitch.** Competitor pricing changes constantly and quoting a stale
number damages credibility with an audience that knows this market.

**Action item before outreach:** manually open fullbay.com/pricing, shopview.com,
and wickedfile.com from an unrestricted browser and re-verify the rows marked
`[THIRD-PARTY]`.

---

## 1. The single most important finding

**Marginstead is not entering an empty market. A direct competitor already exists and is
further along: WickedFile.**

WickedFile describes itself as an accounts-payable / reconciliation platform built
specifically for the auto repair industry. Per its own marketing surfaced in search:

- AI scans every parts invoice and matches it against repair orders and vendor statements
- Flags missed credits, pricing errors, unmatched charges, duplicate charges, suspicious
  patterns `[VERIFIED-VENDOR]`
- Explicit core-return tracking — monitors unreturned cores and missing core credits
  `[VERIFIED-VENDOR]`
- Fraud detection: deleted repair orders, mischarged parts, excessive discounts
  `[VERIFIED-VENDOR]`
- **Integrates with Fullbay** — plus Tekmetric, Shop-Ware, Mitchell 1, NAPA TRACS,
  Protractor, RO Writer, QuickBooks, and bank/credit-card feeds `[VERIFIED-VENDOR]`
- Founded by Bob Saladna, a multi-location shop owner, after discovering ~$180,000 in
  parts loss in a single year `[VERIFIED-VENDOR]`
- Pricing cited as $299/month flat `[UNVERIFIED — from vendor comparison page summary]`

**This is essentially Marginstead's stated product concept, already shipped.**

### Why this is not a reason to stop

1. **WickedFile's center of gravity is light-duty auto repair.** Every piece of its
   marketing surfaced in search says "auto repair shop." Fullbay appears as one
   integration among seven — not as the focus. Heavy-duty is a genuinely different
   problem: far higher core values (turbos, DPFs, remans, transmissions, differentials),
   FleetPride/TruckPro/dealer parts channels rather than NAPA/O'Reilly/WorldPac, and
   fleet-account billing on top of retail.
2. **It sells software, not findings.** WickedFile asks a shop to integrate and subscribe.
   Marginstead's wedge — *send us one vendor's paperwork, we hand you a number, no
   migration, no subscription, no call* — has meaningfully lower friction.
3. **Its existence is market validation, not just competition.** A shop owner built it
   after losing $180k. That is evidence the leak is real. Marginstead's job is to find out
   whether *heavy-duty* shops feel it enough to pay.

### Why this is a real risk

If a prospect already uses WickedFile, or if WickedFile moves deliberately into heavy-duty,
Marginstead's differentiation collapses to "we do it as a service instead of software."
That is a thinner moat than the original concept assumed.

**Recommendation:** add one qualifying question to every audit intake — *"Are you using any
tool today to reconcile parts invoices against ROs?"* Track the answer on the scoreboard.
If a large share of qualified heavy-duty shops already know about WickedFile, that is a
strong negative signal and should be reported as such.

---

## 2. Market map — four layers

The market breaks into four layers. Marginstead is proposing to sit in layer 3.

```
Layer 1  SHOP MANAGEMENT SYSTEMS (SMS)
         Fullbay, ShopView, Karmak Fusion, Procede Excede, Mitchell 1, Tekmetric,
         NAPA TRACS, Protractor, RO Writer, RTA
         -> Record what SHOULD have happened. Weak at proving the vendor honored it.

Layer 2  ACCOUNTING / AP AUTOMATION
         QuickBooks, Bill.com, Melio, Stampli, Ramp
         -> Move money and code invoices. Do not understand a core charge or an RO.

Layer 3  RECONCILIATION / LEAK DETECTION   <-- MARGINSTEAD
         WickedFile (direct), MarginEdge (restaurants, analogous model)
         -> Compare layer 1 against layer 2 against the vendor's own statement.

Layer 4  ENTERPRISE RECOVERY AUDIT
         PRGX, CBIZ, GEP, Transparent Global, Auditec, Paladin Associates, JPD Financial,
         Glantus (acquired by Basware), AppZen, Oversight, Vic.ai
         -> Same idea, contingency-fee, but built for $500M+ AP spend. Will not
            touch a $4M/yr truck shop.
```

**The structural gap Marginstead is aiming at is real:** layer 4 proved decades ago that
post-payment vendor recovery finds real money, but its economics require enterprise scale.
Layer 1 records intent but does not verify the vendor complied. Nobody except WickedFile
is serving the middle for repair shops, and nobody at all is focused on heavy-duty.

---

## 3. Competitor matrix

### 3A. Direct competitor

| | **WickedFile** |
|---|---|
| **Target market** | Auto repair shops, US. Single and multi-location. Light-duty centre of gravity; Fullbay integration means some heavy-duty reach. |
| **Features** | AI/OCR parts-invoice capture; invoice↔RO matching; vendor statement reconciliation; missed/unapplied credit detection; duplicate charge detection; pricing-error detection; unmatched charge detection; **core return tracking**; parts-theft & fraud detection (deleted ROs, mischarged parts, excessive discounts); weekly email issue digests. `[VERIFIED-VENDOR]` |
| **Integrations** | Tekmetric, Shop-Ware, Mitchell 1, NAPA TRACS, Protractor, **Fullbay**, RO Writer, QuickBooks, bank/credit-card feeds. `[VERIFIED-VENDOR]` |
| **Pricing** | $299/mo flat cited. `[UNVERIFIED — re-verify]` |
| **Strengths** | Only purpose-built product in this niche. Founder credibility (shop owner, 9 locations, real $180k loss story). Broad SMS integration coverage. Published case studies. Deep SEO — owns most search terms Marginstead would target. |
| **Weaknesses** | Requires integration + ongoing subscription before the shop sees any value. Positioned around *auto* repair; heavy-duty economics (high-value cores, FleetPride/TruckPro channel, dealer parts, fleet billing) are not its stated focus. Subscription-first means the shop pays before proof. |
| **How Marginstead differentiates** | **Proof before purchase.** One vendor, one sample period, findings handed over free — no integration, no subscription, no sales call. **Heavy-duty specialisation** in vocabulary, vendor set, and core economics. Sell a recovered dollar, not a seat. |

### 3B. Heavy-duty shop management systems (the systems Marginstead must augment, never replace)

| Company | Target market | Relevant features | Pricing | Strengths | Weaknesses (= Marginstead's opening) | Marginstead differentiation |
|---|---|---|---|---|---|---|
| **Fullbay** | Heavy-duty truck, trailer & diesel repair shops; fleet maintenance. Category leader. | Service order workflow; parts inventory across locations; **vendor ordering and core credit management**; estimating/invoicing; MOTOR integration; PM scheduling; QuickBooks integration; AI service-order notes. `[VERIFIED-VENDOR]` | Basic ~$188/mo, Pro ~$258/mo, Elite ~$318/mo; extra users $89–$119/mo; annual agreement. `[THIRD-PARTY — Capterra/aggregators, re-verify]` | Dominant brand in heavy-duty. Genuinely strong parts and core modules. Large installed base = concentrated prospect pool. | It records *your* side of the transaction. It knows a core is owed; it does not read the vendor's statement to confirm the credit actually landed. Data quality depends entirely on staff entering returns correctly — and per industry sources, missed logging is exactly where cores die. | Marginstead reads the **vendor's** documents and compares them to what Fullbay says should have happened. Explicitly an augmentation layer for Fullbay shops. |
| **ShopView** | Heavy-duty truck & trailer repair, mobile/field service. | Work orders spanning tractor+trailer+equipment on one ticket; labor tracking; multi-location parts inventory with automated reordering; estimate→invoice; posts to QuickBooks; PM tools; analytics. Publishes guidance on managing parts warranties and cores. `[VERIFIED-VENDOR]` | Not published; quote-based. `[VERIFIED — no public pricing found]` | Purpose-built heavy-duty. Strong multi-unit work order model. Mobile/field service support. | Same structural gap as Fullbay: internal record only, no vendor-side verification. No public pricing = slower buying cycle. | Same augmentation position. ShopView shops are equally good targets. |
| **Karmak Fusion** | Heavy-duty dealers **and independent repair shops**. 40+ yrs in the vertical. | End-to-end DMS: accounting, parts, service, units. Payment processing with reconciliation support. Decisiv integration. `[VERIFIED-VENDOR]` | Not published; enterprise quote. | Deep heavy-duty accounting. Trusted incumbent. | Windows-based legacy architecture. Heavy, slow to change. Large shops on Karmak have big parts spend — high leak exposure. | Karmak shops are **high-value** targets: biggest spend, most complex vendor mix, least agile system. |
| **Procede Excede** | Heavy-duty truck **dealerships**. | Full DMS: accounting, parts, service, vehicle sales, lease/rental. `[VERIFIED-VENDOR]` | Enterprise quote. | Dealer-grade depth. | Dealership focus — larger, more bureaucratic buyers, longer sales cycles. | **Deprioritize for validation.** Dealer groups will not move fast enough to validate in 90 days. |
| **RTA Fleet** | Fleet maintenance operations (public + private fleets). | Part inventory with explicit **core and core-credit tracking**; RTA's own docs say core tracking "can save fleets thousands of dollars each year." `[VERIFIED-VENDOR]` | Not published. | Core tracking is a named, documented feature. Strong fleet install base. | Still internal-record-only. Vendor's statement never enters the system. | RTA's own marketing proves the problem is real and quantified — **useful as a citable third-party validation of the pain**, not a competitor to attack. |
| **Mitchell 1 / TruckSeries** | Heavy-duty repair information + shop management. | OEM parts catalogs, labor guides, repair info, shop workflow. `[THIRD-PARTY]` | Subscription, not published. | Ubiquitous repair data. | Primarily an information product; reconciliation is not its job. | Not a competitor. Coexists. |
| **Tekmetric / Shop-Ware / NAPA TRACS / Protractor / RO Writer** | Primarily light-duty auto; some heavy-duty spillover. | Tekmetric has explicit core tracking on POs and ROs, plus a "Parts Reconciliation" feature. `[VERIFIED-VENDOR]` | Varies. | Modern UX; Tekmetric's parts reconciliation is the closest native equivalent. | Light-duty focus; native reconciliation still compares internal records, not vendor statements. **All already integrated by WickedFile.** | Out of Marginstead's target market. Note that WickedFile has already locked up this segment. |

### 3C. Enterprise AP recovery audit — the proof that the model works

| Company | Target market | Model & features | Pricing | Strengths | Weaknesses | Relevance to Marginstead |
|---|---|---|---|---|---|---|
| **PRGX** | Global enterprise retail/CPG | Post-payment recovery audit of paid invoices: duplicate payments, overpayments, missed credits, unearned discounts, pricing/freight errors. Takes AP + vendor master + PO + payment data, runs proprietary detection, pursues claims against suppliers. `[VERIFIED-VENDOR]` | Contingency — % of recovered funds. `[VERIFIED-VENDOR]` | Decades of proof the leak is real and recoverable. | Enterprise-only economics. | **The playbook Marginstead is downsizing.** Contingency pricing is the proven model here — strongly consider it for Marginstead's paid offer. |
| **CBIZ / GEP / Transparent Global / Auditec** | Mid-market to enterprise | AP recovery audit; statement recovery audit; debit balances, unrealized credits, duplicates, rebates, pricing errors, material returns. Client time commitment cited at ~2 hrs/week. `[VERIFIED-VENDOR]` | Contingency, quote-based. | Established category. Auditec explicitly markets "statement recovery audit" — same mechanic as Marginstead. | Will not engage a $3–10M revenue shop. | Confirms the **structural gap**: proven service, priced out of Marginstead's market. |
| **Paladin Associates / JPD Financial** | Mid-market | Vendor credit recovery, contingency-fee. `[THIRD-PARTY]` | Contingency. `[THIRD-PARTY]` | Smaller/nimbler than PRGX. | Not vertical-specific; no repair-shop knowledge. | Nearest-size analogue. Contingency, low-risk framing is the norm — reinforces Marginstead's "free audit" being credible rather than suspicious. |
| **Glantus** (acquired by Basware) | Enterprise AP | AI recovery of duplicate payments, missed discounts, cancelled invoices, incorrect pricing, refunds, VAT. `[VERIFIED-VENDOR]` | Enterprise quote. | Acquisition by Basware = category consolidating and being validated by strategics. | Enterprise only. | Signals the software-led version of this is a real, funded category. |
| **AppZen / Oversight / Vic.ai** | Enterprise AP & expense | AI audit of 100% of spend; duplicate detection; fraud/anomaly detection; invoice-image analysis. `[VERIFIED-VENDOR]` | Quote-based; third-party estimates put AppZen in the tens of thousands per year. `[THIRD-PARTY]` | Mature AI detection. | Enterprise pricing and enterprise integration requirements. | Confirms the detection tech is solved at the top of the market. Marginstead's problem is **distribution and trust in a small-business vertical**, not algorithms. |

### 3D. Cross-vertical analogue worth studying

| Company | Why it matters |
|---|---|
| **MarginEdge** (restaurants) | Runs invoice capture + **a dedicated Vendor Statement Reconciliation team** for independent restaurants. `[VERIFIED-VENDOR]` This is the closest proof that a small-business vertical will pay for outsourced vendor-statement reconciliation. Worth studying their pricing, onboarding, and how they present findings. |

---

## 4. Where a separate auditing/recovery layer creates value

Every heavy-duty SMS — Fullbay, ShopView, Karmak, RTA — has the same structural blind spot,
and it is not a flaw in those products. It is inherent to what they are:

> **They record what the shop believes happened. They do not verify what the vendor did.**

Concretely:

1. **The SMS trusts its own data entry.** Industry sources describe the exact failure mode:
   the core physically went back on the truck but the counter person never logged it on a
   vendor credit memo — so there is no paper trail, no credit posted, and the shop is
   chasing a supplier for a credit the supplier has no record of. An SMS cannot catch what
   was never entered into it.
2. **The vendor's statement is never ingested.** The authoritative record of what the vendor
   actually charged and actually credited lives in a monthly statement PDF that no SMS
   reads. That document is where short credits, unapplied credits, and duplicate invoices
   become visible.
3. **Nobody owns the reconciliation.** In a 6–25 person shop there is typically no
   controller. The service writer orders parts, a part-time bookkeeper codes invoices, the
   owner signs checks. The reconciliation is nobody's job.
4. **Core deadlines are silent failures.** A missed core-return window produces no alert. It
   is simply absorbed as cost of goods sold, and margin quietly declines.
5. **Vendor consolidation is actively creating new errors.** **TruckPro merged with
   FleetPride in October 2025** `[VERIFIED — industry sources]`. Distributor mergers mean
   account renumbering, price-file migrations, and statement format changes — a classic
   window for pricing discrepancies and duplicate billing. This is a genuine, timely,
   non-fabricated reason to look at 2025–2026 invoices right now, and it is strong
   outreach material.

**The value of a separate layer is independence.** An auditor that reads the vendor's
documents and the shop's records side by side sees what neither system alone can.

---

## 5. Competitive positioning statement

> Fullbay and ShopView run your shop. QuickBooks pays your bills.
> Nobody checks whether your parts vendors actually gave you the credits they owe you.
> Marginstead does — starting with one vendor, for free.

**Three defensible wedges:**

1. **Heavy-duty specialisation.** Cores on a reman transmission, DPF, or turbo are worth
   multiples of a light-duty alternator core. Same process failure, far larger dollars per
   incident. WickedFile is not speaking this language.
2. **Zero-commitment proof.** Findings first, software later — maybe never. Directly
   inverts WickedFile's integrate-and-subscribe motion.
3. **Vendor-side documents.** Marginstead reads what the *vendor* sent. Every SMS reads
   only what the *shop* typed.

**Two honest vulnerabilities to keep on the scoreboard:**

- **WickedFile can move into heavy-duty faster than Marginstead can build software.** It
  already integrates with Fullbay.
- **"Free audit" has low switching cost in both directions.** A shop that accepts a free
  audit has demonstrated curiosity, not willingness to pay. **Only a signed paid engagement
  counts on the scoreboard.**

---

## 6. What is deliberately NOT claimed here

- No estimate of average dollars recoverable per shop. No credible public benchmark exists
  for heavy-duty repair, and the enterprise recovery-audit rates do not transfer.
- No claim that Fullbay/ShopView core tracking is broken. It is not. The gap is
  vendor-side verification, which is a different thing.
- No competitor pricing is treated as sales-ready. See §0.

---

## 7. Sources

- https://www.fullbay.com/ · https://www.fullbay.com/pricing/ · https://www.fullbay.com/products/inventory-management-software/ · https://www.fullbay.com/blog/part-cores/
- https://www.capterra.com/p/170876/Fullbay/pricing/ · https://www.softwareadvice.com/cmms/fullbay-maintenance-profile/
- https://shopview.com/ · https://shopview.com/parts-manager-software · https://shopview.com/blog/managing-parts-warranties-cores
- https://www.wickedfile.com/ · https://www.wickedfile.com/blogs/core-charges-profit-leakage-auto-shops/ · https://www.wickedfile.com/blogs/what-is-parts-reconciliation-and-why-is-it-critical-for-your-shop · https://www.wickedfile.com/case-studies/ · https://www.capterra.com/p/10011937/WickedFile/
- https://www.tekmetric.com/integrations/wickedfile · https://support.tekmetric.com/hc/en-us/articles/360039834833-Core-Tracking-Part-Returns · https://support.tekmetric.com/hc/en-us/articles/360053611714-Parts-Reconciliation
- https://docs.rtafleet.com/rta-manual/part-inventory/tracking-part-cores/
- https://www.karmak.com/fusion · https://www.karmak.com/fusion/independent-repair-shops · https://decisivmarketplace.com/product/procede-software-excede-dealer-management-system/
- https://www.prgx.com/guides/ap-recovery-audit-services-guide/ · https://www.cbiz.com/services/advisory/risk-management-compliance/cost-recovery/accounts-payable-recovery-audit · https://auditecsolutions.com/statement-recovery-audit/ · https://transparentglobal.com/what-we-do/accounts-payable-ap-recovery-audits/ · https://paladinassociatesinc.com/offerings/sp/vendor-credit-recovery/
- https://news.basware.com/en/basware-completes-acquisition-of-glantus-to-expand-ai-driven-overpayment-and-fraud-detection-capabilities · https://www.appzen.com/ · https://www.oversight.com/ai-p2p-compliance-control · https://www.vic.ai/accounts-payable/invoice-processing
- https://www.marginedge.com/vendor-reconciliation
- https://www.fleetpride.com/ · https://branches.fleetpride.com/ · https://www.cbinsights.com/investor/truckpro
