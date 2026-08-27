# Phase 2 — Ideal Customer Profile (ICP)

**Prepared:** 2026-08-27
**Purpose:** Define who Marginstead targets for the free 90-day vendor profit-leak audit,
and — just as importantly — who it does not.

---

## 0. Grounding data

The ICP below is built on published industry benchmarks, not assumptions. Sources at the
bottom. Key anchors:

| Benchmark | Value | Source |
|---|---|---|
| Median heavy-duty shop headcount | **8 employees, 5 technicians** | Fullbay *State of Heavy-Duty Repair* |
| Median labor rate | **$149/hr**, up ~10% YoY | Fullbay *State of Heavy-Duty Repair* |
| Parts & materials as share of revenue | **30–40%** — the largest single expense line | Fullbay |
| Target parts gross profit | **~58%** | Institute for Automotive Business Excellence |
| Shops at $1M–$2M annual revenue | **18% of surveyed shops** | Fullbay |
| Shops understaffed | **54%** in 2025 | Fullbay |
| Parts revenue through Fullbay alone | **$1.5B** on $5.04B service orders | Fullbay |

**The single most important number for Marginstead is 30–40%.** Parts and materials are the
largest expense in a heavy-duty shop. A shop doing $2M in revenue is purchasing roughly
**$600,000–$800,000 of parts per year**. A 1% leak on that is $6,000–$8,000. That is the
size of the prize per shop, per year — and it is derived from a published benchmark rather
than invented.

**The 54% understaffed figure is the mechanism.** Leaks are not caused by dishonesty. They
are caused by nobody having time to chase a $340 core credit. An understaffed shop with
rising parts spend is structurally guaranteed to leak.

---

## 1. The ICP in one paragraph

> A US-based, owner-operated independent heavy-duty truck, trailer, or diesel repair shop
> with **4–25 technicians across 1–4 locations**, doing **$1.5M–$10M in annual revenue**,
> therefore purchasing **$500K–$3M of parts per year** from a mix of FleetPride/TruckPro,
> OEM dealer counters, and 2–5 regional suppliers. It runs a real shop management system
> (Fullbay, ShopView, Karmak, RTA, or similar) and QuickBooks. It has **no controller and no
> dedicated parts manager** — the service writer orders parts and a part-time bookkeeper
> codes invoices. It handles high-core-value work (engine, transmission, differential,
> turbo, DPF, brake, hydraulic) and bills at least some fleet accounts on terms.

---

## 2. ICP dimensions

### 2.1 Optimal shop size

| Tier | Techs | Revenue | Annual parts spend (derived @30–40%) | Verdict |
|---|---|---|---|---|
| Too small | 1–3 | <$750K | <$300K | **Skip.** Owner knows every invoice personally. Leak is real but too small to pay for. |
| **Sweet spot** | **6–15** | **$2M–$6M** | **$600K–$2.4M** | **Primary target.** Big enough to leak, small enough to have no controller, owner still decides alone. |
| Also good | 4–5 | $1.5M–$2M | $450K–$800K | **Secondary.** Just above the median shop (5 techs). Qualifies. |
| Stretch | 16–25 | $6M–$10M | $1.8M–$4M | **Tertiary.** Largest prize, but may already have a controller. Longer cycle. |
| Too big | 25+ / dealer groups | $10M+ | $4M+ | **Skip for validation.** Procurement, legal review, 6-month cycles. Cannot validate in 90 days. |

**Why 6–15 techs is the sweet spot — the "controller gap":**

```
       ← nobody notices                    somebody's job →

1-3 techs        6-15 techs                    25+ techs
Owner sees   |   NOBODY OWNS RECONCILIATION  |  Controller /
every        |   Spend is large.              |  parts manager
invoice.     |   Oversight is zero.           |  owns it.
Leak small.  |   ★ MARGINSTEAD ★              |  Leak managed.
```

Below the gap the owner catches it themselves. Above the gap somebody is paid to catch it.
Inside the gap, parts spend has outgrown the owner's personal attention but has not yet
justified a finance hire. **That is the entire market.**

### 2.2 Approximate employee count

- **Total employees: 8–35.** Median heavy-duty shop is 8 with 5 techs, so the ICP sits at
  and just above the industry median.
- **Technicians: 4–25.**
- **Critical negative signal — the qualifier that matters most:** *no controller, no CFO, no
  dedicated parts manager.* If LinkedIn or the site shows a Controller or Parts Manager,
  deprioritize. Someone is already watching.
- **Positive signal:** one office/admin person handling AP part-time, often the owner's
  spouse or a bookkeeper 1–2 days/week.

### 2.3 Probable parts purchasing volume

Derived from the published 30–40% of revenue benchmark:

| Annual revenue | Parts & materials spend | 1% leak | 3% leak |
|---|---|---|---|
| $1.5M | $450K–$600K | $4.5K–$6K | $13.5K–$18K |
| $3M | $900K–$1.2M | $9K–$12K | $27K–$36K |
| $6M | $1.8M–$2.4M | $18K–$24K | $54K–$72K |
| $10M | $3M–$4M | $30K–$40K | $90K–$120K |

**Minimum qualifying threshold: ~$400K/year in parts purchasing.** Below that the audit
cannot find enough to justify anyone's time.

> **Do not use the 1% / 3% columns in outreach.** Marginstead has not yet measured a real
> leak rate in heavy-duty. These columns exist to size the opportunity internally and to
> decide who to target. The moment Marginstead completes real audits, replace them with
> measured figures. Until then, emails say "we don't know yet — that's what we're testing."

### 2.4 Number of locations

- **Ideal: 1–3 locations.** Single-location is fine and is the most common.
- **2–4 locations is the strongest signal of all.** Multi-location means parts get
  transferred between sites, cores get returned from the location that did not order them,
  and one bookkeeper reconciles statements for several sites. Reconciliation errors compound
  with each location.
- **5+ locations:** likely has finance staff. Deprioritize for validation.

### 2.5 Services offered — ranked by core-charge exposure

**Marginstead should filter on core value, not on shop type.** A high core-value shop leaks
more dollars per incident than a high-volume, low-core shop.

**Tier 1 — highest core exposure (strongest qualifiers):**
- Engine repair, overhaul, reman engine installation
- Transmission and clutch — reman transmissions carry very high cores
- Differential / rear-end / driveline
- Turbochargers, DPF/DEF/aftertreatment
- Air brake systems, air compressors
- Starters, alternators, and other reman rotating electrical
- Hydraulic pumps, cylinders (heavy equipment)

**Tier 2 — good, high parts volume:**
- Full-service truck and trailer repair
- Fleet preventive maintenance contracts
- Trailer repair, reefer units
- Suspension, steering, wheel-end

**Tier 3 — weaker on its own:**
- Tire-only operations (low core, low SKU complexity)
- Mobile roadside only (low volume, unless it feeds a real shop)
- Body shop / collision only (different vendor economics — insurance-driven)

**Best single indicator:** the site markets **engine, transmission, or differential work**
plus **fleet maintenance contracts**. That combination guarantees both high core value and
high recurring parts throughput.

### 2.6 Likely vendors

| Channel | Names | Why it matters for the audit |
|---|---|---|
| **National HD distributors** | **FleetPride** (300+ US locations, largest independent HD distributor), **TruckPro** — **merged with FleetPride in October 2025** | **The #1 audit target.** The merger means account renumbering, price-file migration, and statement-format changes across 2025–2026 — a textbook window for pricing discrepancies and duplicate billing. This is a real, timely, non-fabricated reason to look at recent invoices. |
| **OEM dealer counters** | Freightliner/Detroit, Peterbilt/PACCAR, Kenworth, Volvo, Mack, International/Navistar, Cummins | Highest core values. Strictest core-return deadlines. Separate statements per dealer. |
| **Program/regional** | NAPA Heavy Duty, HDA Truck Pride members, VIPAR Heavy Duty members, Point Spring, Six Robblees', regional jobbers | Program-group pricing and rebate structures create price-file mismatches. |
| **Component specialists** | Bendix, Meritor, Dana, Eaton, Wabco, Donaldson, Fleetguard distributors | Warranty and core programs with their own rules. |
| **Tires** | Goodyear/TravelCenters, Bridgestone/GCR, Michelin, Southern Tire Mart | Casing credits behave exactly like cores and are just as commonly lost. |

**Qualifying signal:** a shop naming **3 or more distinct vendor channels** on its site or in
job postings. More channels = more statements = more reconciliation surface = more leak.

**Best opening vendor for a free audit: FleetPride/TruckPro.** Highest likelihood of being
present, highest transaction volume, and the merger gives a concrete, honest reason to look.

### 2.7 Software they may currently use

| Layer | Likely systems |
|---|---|
| Shop management | **Fullbay** (category leader), **ShopView**, Karmak Fusion, RTA Fleet, Mitchell 1/TruckSeries, RO.NET, Tekmetric, Shop-Ware, or **spreadsheets/paper** |
| Accounting | **QuickBooks Desktop or Online** (overwhelmingly dominant at this size), occasionally Sage |
| AP | Manual. Sometimes Bill.com or Melio. Frequently just the owner and a checkbook. |
| Reconciliation | **Almost always nothing.** This is the gap. |

**Software-based prioritization:**

- **Fullbay or ShopView user → highest priority.** Structured data exists, so the audit is
  fast and clean, and Marginstead can position purely as an augmentation layer.
- **Karmak Fusion user → high value, slower.** Bigger shop, bigger spend, legacy system.
- **Spreadsheets/paper → highest leak probability, hardest audit.** Take these if they come,
  but do not lead with them; turnaround time will be poor and a slow first audit hurts.
- **Already uses WickedFile → disqualify, but RECORD IT.** This is the most important
  competitive data point Marginstead can collect. Track it on the scoreboard.

### 2.8 Signals the shop will experience the problem

Score each prospect. **6+ points = qualified.**

**Strong signals (2 points each)**
- [ ] 6+ technicians, or 8+ service bays
- [ ] 2+ locations
- [ ] Markets engine / transmission / differential / turbo / DPF work (high core value)
- [ ] Markets fleet maintenance contracts or national account work
- [ ] Names 3+ parts vendor brands or shows vendor/program-group logos
- [ ] Hiring or employs a service writer / parts counter person but **no** controller
- [ ] Runs Fullbay, ShopView, Karmak, or RTA (structured data + real spend)
- [ ] 20+ years in business (long vendor relationships = long accumulation of unreconciled credits)

**Moderate signals (1 point each)**
- [ ] 24/7 or mobile service in addition to a physical shop (parts move between truck and shop)
- [ ] Sells parts over the counter (63% of shops do — adds a whole second reconciliation surface)
- [ ] Does warranty work for OEMs or component makers (warranty credits fail the same way cores do)
- [ ] Multiple equipment types (truck + trailer + reefer + heavy equipment)
- [ ] Family-owned / second generation (process inertia; "we've always done it this way")
- [ ] Recent expansion — new bay, new location, new hires (growth outruns process)
- [ ] Active job postings for technicians (understaffed — 54% of shops are)

**Disqualifiers (any one = skip)**
- [ ] Single owner-operator mobile van with no shop and no meaningful parts volume
- [ ] OEM dealership or dealer group (too big, too slow)
- [ ] Employs a controller, CFO, or dedicated parts manager
- [ ] Already using WickedFile or an equivalent reconciliation tool — **log this, it is evidence**
- [ ] Tire-only, wash-only, or towing-only
- [ ] Non-US

### 2.9 Buying process

| | |
|---|---|
| **Decision maker** | **Owner / President / General Manager.** Almost always a single person. In family shops, sometimes owner + spouse (who often does the books — and is frequently the *better* first contact, because they feel the pain daily). |
| **Not the buyer** | Service writers, technicians, parts counter staff. They may be the source of the leak; they will not champion an audit of their own work. **Frame carefully — this is about vendors, not employees.** |
| **Decision speed** | Fast. One person, no procurement, no legal. Free offer with no migration should be a same-week yes or no. |
| **What they care about** | Cash. Margin. Not being taken advantage of by a vendor. Not more software to learn. |
| **What kills the deal** | Anything that smells like migrating off Fullbay. Anything that sounds like an accusation against their staff. Anything that requires a scheduled call before they see value. |

---

## 3. Anti-ICP — do not pursue during validation

1. **OEM dealerships and dealer groups.** Procurement, legal, 6-month cycles.
2. **Very large fleets running in-house shops.** Different buyer, different problem, usually staffed finance.
3. **Solo mobile mechanics.** Insufficient parts volume.
4. **Light-duty auto repair.** WickedFile owns this segment; do not fight there.
5. **Shops with a controller.** The gap Marginstead exploits is already closed.
6. **Non-US.** Different vendor structures and different commercial-email law.

---

## 4. Segment prioritization for outreach

| Priority | Segment | Rationale |
|---|---|---|
| **P1** | Independent HD truck & trailer repair, 6–15 techs, 1–3 locations, engine/transmission work, Fullbay or ShopView | Highest leak × fastest decision × cleanest audit |
| **P2** | Fleet maintenance operations (private fleets running their own shops), 8–25 techs | Very high parts volume; slightly slower decision |
| **P3** | Diesel repair specialists, 4–8 techs, high-core work | Smaller but very fast decisions |
| **P4** | Heavy-equipment / construction equipment repair | High core value on hydraulics; different vendor mix; less proven |
| **P5** | Trailer-only and reefer specialists | Narrower parts mix, lower core value |

---

## 5. Geographic prioritization

Concentrate on freight corridors and logistics hubs — highest density of qualifying shops
per unit of research effort:

- **TX** — Dallas–Fort Worth, Houston, Laredo, San Antonio, El Paso
- **CA** — Inland Empire (Fontana/Ontario), Bakersfield, Stockton/Central Valley
- **IL/IN** — Chicagoland, Gary, Indianapolis
- **GA/TN** — Atlanta, Memphis, Nashville
- **OH/PA** — Columbus, Cleveland, Harrisburg, Pittsburgh
- **FL** — Jacksonville, Orlando, Miami
- **MO/KS** — Kansas City, St. Louis
- **NC/SC** — Charlotte, Greensboro
- **AZ/NV/UT** — Phoenix, Las Vegas, Salt Lake City
- **NJ/NY** — Newark/North Jersey
- **WA/OR** — Seattle/Tacoma, Portland
- **MN/WI** — Minneapolis, Milwaukee
- **AL/MS/LA** — Birmingham, Jackson, New Orleans
- **CO** — Denver

---

## 6. The one-sentence qualification test

> **"Does this shop buy more than $400K of parts a year, from more than two vendors, with
> nobody whose actual job is checking whether those vendors credited them correctly?"**

If yes — qualified. Everything in §2.8 is just a way of estimating that from public
information.

---

## 7. Sources

- https://www.fullbay.com/state-of-heavy-duty-repair/ · https://www.fullbay.com/blog/fullbay-2025-state-of-heavy-duty-repair-report/ · https://www.fullbay.com/blog/diesel-repair-shop-profit/ · https://www.fullbay.com/insights/
- https://www.trucking.org/news-insights/fullbay-unveils-fifth-annual-state-heavy-duty-repair-report-highlights-key-industry
- https://www.truckinginfo.com/news/repair-shops-see-strong-growth-rising-rates-in-fullbay-report-but-labor-shortage-persists
- https://www.freightwaves.com/news/fullbay-2026-heavy-duty-repair-report-technician-shortage
- https://www.aftermarketnews.com/heavy-duty-repair-shops-report-increases-in-counter-sales-labor-rates/
- https://www.motor.com/2025/04/industry-snapshot-check-out-highlights-from-the-new-state-of-heavy-duty-repair-report/
- https://www.fleetequipmentmag.com/heavy-duty-repair-shop-profits-revenue-rise/
- https://branches.fleetpride.com/ · https://www.cbinsights.com/investor/truckpro
