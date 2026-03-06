# plan.md — HappyCo Concierge V1 (planning-first clean rebuild)

## 1) Objectives
- Rebuild **HappyCo Concierge** as a clean, diagnosable, prospect-facing demo platform with **strict environment separation**.
- Match the **current preview experience** (layout, labels/copy, core behavior) wherever feasible, with cleaner internals and safer architecture.
- Environments use **explicit config only**: `APP_ENV=preview|production` (no hostname guessing; no silent DB fallback).
- **One preview database only** + **one production database only** (same schema, isolated data).
- Preview has **demo mode**; production starts with the **same seeded demo dataset** but in its **own production DB**.

### UX/brand parity guardrails
- Preserve the **current preview** presentation closely: spacing, typography, color usage, card density, shadows, nav patterns, and polished feel.
- Preserve public layout parity outside the admin shell.
- Preserve **legal/privacy/cookie link visibility patterns** like current preview.
- **Do not introduce a new design system**; continue with the existing Tailwind + shadcn component set and current palette.

### Authentication & routing constraints (V1)
- Auth approach for V1:
  - Seed demo/admin accounts first; keep current admin login behavior as close as possible; refine parity later.
  - **Session approach:** **secure cookie session** (implemented).
- Routing requirements:
  - Keep admin route base **`/app/admin/*` exactly** (implemented).
  - Use **id-based routing** for detail pages (implemented for property detail).
- Audience/scope:
  - Resident/manager auth exists, but **UI focus stays admin-first** for V1.
  - **Confirmed behavior:** manager/resident demo logins are **rejected/redirected** because only admin routes are implemented.
- **Confirmed behavior:** signed-in admins visiting `/` redirect to `/app/admin/dashboard`.

### Deployment & operations constraints
- Roll out to a **test domain (placeholder for now: `<TBD_TEST_DOMAIN>`)** before any cutover to `happyco.talapartners.com`.
- Built-in diagnostics from day one:
  - Diagnostics UI and API are first-class features.
  - **Diagnostics shows full DB name to authenticated admins** (implemented).
- Seed operations controls:
  - **Preview reset is restricted to super-admin only** (implemented).
  - **Preview reset scope:** clear only managed HappyCo collections, then reseed `demoA` (implemented).
  - **Preview reset confirmation:** typed phrase required in UI (implemented).
  - **Production bootstrap is a deployment-time protected step only**.
  - **Current status:** production bootstrap has **internal scaffolding only** and is **not runnable**.

### Reference findings (crawled)
- Landing page messaging centers on retention intelligence / churn prevention, KPI stats, portfolio ROI framing, and “Sign In” CTAs.
- Login page structure and copy observed:
  - “Welcome back” / “Sign in to access the platform”
  - Fields: “Email address”, “Password”
  - CTA: “Sign In”
  - Right-side demo account cards with autofill.

### Locked V1 data/experience decisions
- **Flagship property first:** *The Metropolitan at Riverside* is the canonical fully functional example. ✅ implemented
- **Canonical property manager identity:** **Sarah Mitchell** is the canonical manager for the flagship property. ✅ implemented
- **Canonical resident example:** **Alex Chen** is the end-to-end functional resident. ✅ implemented
- **Primary churn examples:** Alex Chen, Maria Santos, James Wilson. ✅ implemented across dashboard + properties
- **Communication style:** informal, AI-driven, proactive; leading-indicator signals for churn. ✅ implemented in seeded concierge messages
- **Public legal/privacy/cookie parity:** match current preview copy as closely as publicly visible; use closest-safe parity where not exposed. ✅ implemented with footer links + cookie notice pattern + /legal

### Coherent demo system rule (enforced)
- The demo is a **coherent base data architecture**, not scattered page-level demo data.
- Dashboard + properties UI are driven by backend read models derived from seeded collections.

---

## 2) Implementation Steps (Phased)

### Phase 1 — Planning Artifacts Only (no code) ✅ COMPLETED
**Delivered artifacts:** Feature Inventory, Data Inventory, Schema Inventory, Seed Plan, Deployment & Cutover Plan.

---

### Phase 2 — Environment & Diagnostics Architecture Blueprint (no code) ✅ COMPLETED
Defined explicit `APP_ENV` selection, single DB binding, fail-fast config validation, and diagnostics-first architecture.

---

### Phase 3 — Implementation Architecture Blueprint (no full code) ✅ COMPLETED
Defined backend module structure, auth middleware, diagnostics contracts, seed architecture, frontend route map, and admin shell structure.

---

### Phase 4 — Foundation implementation (env + DB + auth + diagnostics) ✅ COMPLETED
Implemented:
- config loader + fail-fast validation
- single DB binding
- secure cookie session auth
- diagnostics endpoints + diagnostics admin page

---

### Phase 5 — Core UI structure + auth-gated admin routing (no business logic) ✅ COMPLETED
Implemented:
- landing + login
- admin shell (sidebar/topbar/user menu)
- admin route gating
- placeholders for dashboard/properties/providers/tenants/analytics/settings

---

### Phase 6 — Seed + hardening (demoA, reset UX, diagnostics seed visibility) ✅ COMPLETED
Implemented:
- deterministic `demoA` seed
- preview reset (super-admin + preview + typed phrase)
- diagnostics seed metadata and missing dataset warnings
- production bootstrap scaffolding (not runnable)

---

### Phase 7 — Dashboard + Properties (read models + UI driven by seeded data) ✅ COMPLETED
**Purpose:** Implement the first real business UI and read models (dashboard + properties) with seeded backend data driving all numbers. Build a coherent system centered on the flagship property.

#### Phase 7 delivered scope ✅
1) **Seed model expansion (flagship property depth)**
- Expanded demoA seeded data to support real dashboard + properties UI.
- Built **The Metropolitan at Riverside** as a coherent flagship example including:
  - property record
  - total + occupied units
  - **100 unit-level records**
  - resident assignments to units (Alex Chen in unit 501)
  - maintenance history
  - churn prediction history + churn score history
  - AI concierge communication timeline (informal, proactive tone)
  - interventions
  - credits (discount impacts)
  - offers
  - service bookings
  - provider relationships
  - monthly revenue + receipts linkage
  - property economics + property metrics
- Canonical users enforced:
  - Property manager: **Sarah Mitchell** (seeded manager identity)
  - Resident example: **Alex Chen** (end-to-end)

2) **Backend read models & APIs**
- Added coherent read-model services powering:
  - **Public overview**: `GET /api/public/overview`
  - **Admin dashboard overview**: `GET /api/admin/dashboard`
  - **Admin properties list**: `GET /api/admin/properties`
  - **Admin property detail**: `GET /api/admin/properties/{propertyId}`

3) **Dashboard UI (admin)**
- Implemented dashboard cards and key sections using backend read model responses.
- Includes top flagged residents and churn weights.

4) **Properties UI (admin)**
- Implemented properties list (portfolio context) with the three required properties.
- Implemented property detail view (flagship-first) using id-based routing.

5) **Public legal + footer link visibility**
- Added `/legal` route.
- Added visible footer links (Legal notice / Privacy & activity logging / Cookie notice).
- Added cookie notice bar pattern.

6) **Reconciliation + regression hardening**
- Ensured dashboard reconciliation totals match properties totals:
  - gross revenue
  - credits issued
  - net revenue
- Fixed and revalidated an admin session persistence regression (AdminRoute cache fallback).

---

### Phase 8 — Residents + Providers + Analytics + Operational Workflows (read models + UI) ⏳ IN PROGRESS (this is the current phase)
**Objective:** Extend the coherent flagship-first architecture to include resident views, provider management, analytics read models, and believable operational workflows — while preserving the current UI style and ensuring **backend remains the single source of truth**.

#### Phase 8 scope (locked, implement without further clarification pauses)

##### A) Data model evolution (no cross-env access)
- Maintain hierarchy:
  - Portfolio → Properties → Units → Residents → Maintenance → Churn signals → Concierge comms → Interventions → Financial outcomes
- Preserve internal consistency across:
  - Admin
  - Property Manager (read models only; UI shells still deferred)
  - Resident (new resident-facing read models/pages)
- Continue flagship-first depth on **The Metropolitan at Riverside**.

##### B) Churn model update (this phase)
- Update churn model weights to:
  - Maintenance Frequency: **30%**
  - Resolution Time: **25%**
  - Sentiment Analysis: **25%**
  - Engagement Level: **20%**
- Ensure resident churn score explanations and primary driver ordering reflect the new model.
- Keep churn story centered on:
  - operational friction + informal AI messaging as leading indicators

##### C) Resident view (read models + UI)
**Endpoints**
- `GET /api/residents/{residentId}`
- `GET /api/residents/{residentId}/timeline`
- `GET /api/residents/{residentId}/services`

**Frontend**
- `ResidentProfilePage`

**UI requirements**
- Resident profile + unit assignment
- Maintenance timeline
- Concierge conversations (SMS/app follow-ups)
- Credits issued
- Offers delivered
- Bookings scheduled
- Narrative timeline showing (seeded and derived):
  - Maintenance request → Concierge follow-up → Offer delivered → Service booked → Risk score reduced

##### D) Provider management (read models + UI)
**Seed example providers (add to seed system)**
- SparkClean
- FixRight HVAC
- Urban Pest Control

**Endpoints**
- `GET /api/providers`
- `GET /api/providers/{providerId}`

**Frontend**
- Replace Providers placeholder with a real `ProvidersPage` driven by backend.

**Provider UI requirements**
- Service categories
- Availability (seeded signal)
- Service fulfillment tracking
- Booking history
- Revenue attribution
- Coverage percentage and fulfillment rate

##### E) Analytics read models (admin)
**Endpoints**
- `GET /api/admin/analytics/portfolio`
- `GET /api/admin/analytics/property/{propertyId}`

**Metrics**
- Average churn score
- Risk distribution
- Intervention success rate
- Turnover avoided
- Service revenue
- Credits issued
- Net retention ROI

**Charts**
- Derive from seeded history collections already present:
  - churn score history
  - monthly revenue
  - interventions log
  - maintenance history

##### F) Financial model reconciliation (must be consistent)
- Retention ROI = turnover avoided + service revenue − credits invested
- Use the example assumptions used in the UI:
  - turnover cost = **3800**
  - annual avoided turnovers = **5**
  - monthly service revenue = **2000**
  - credits invested per month = **500**
- Ensure admin analytics totals reconcile with:
  - dashboard totals
  - property totals
  - monthly revenue documents
  - credits documents

##### G) Admin tenants/residents list flow
- Replace Tenants placeholder with an admin residents list driven by backend.
- Keep Alex Chen / Maria Santos / James Wilson prominent as churn examples.

##### H) Verification (must complete before closing Phase 8)
- Python lint passes
- JavaScript lint passes
- Frontend build succeeds
- Backend reconciliation tests succeed
- Dashboard totals match property totals
- Resident risk score read models show post-intervention / score-change narratives consistent with seeded churn history
- Add testing report:
  - `/app/test_reports/iteration_6.json`

---

### Phase 9 — Cross-role experiences (manager + resident shells) ⏳ NOT STARTED
- Introduce manager and resident application shells and route sets.
- Enforce cross-role consistency using the same underlying records already seeded.
- Keep admin-first stable while expanding role-specific views.

---

### Phase 10 — Testing/polish ⏳ NOT STARTED
- Parity sweep: labels/copy/layout; `data-testid` coverage; empty/loading states.
- Reconciliation tests for KPI math and analytics totals.
- Regression tests for env binding, diagnostics, auth gating, seed, and preview reset.

---

### Phase 11 — Deployment verification + cutover ⏳ NOT STARTED
- Deploy production to `<TBD_TEST_DOMAIN>`; verify env binding + diagnostics.
- Implement/enable deployment-time production bootstrap (idempotent + audited) when approved.
- Only after approval, swap to `happyco.talapartners.com`.

---

## 3) Next Actions
**Immediate next build order (post Phase 7, current Phase 8 in progress):**
1) Implement resident read models + `ResidentProfilePage`.
2) Implement provider management read models + real `ProvidersPage`.
3) Implement analytics read models + real `AnalyticsPage`.
4) Implement admin tenants/residents list + routing to resident profile.
5) Expand seed dataset to include required provider names and operational workflow linking.
6) Add iteration_6 test report + reconciliation assertions.

---

## 4) Success Criteria
- Environment separation is provable: diagnostics + hard failures prevent mixing. ✅
- Preview matches current preview landing/login/admin UX wherever feasible (copy/layout/behavior). ✅
- Seeded demo dataset (`demoA`) is deterministic, current-dated, and supports a coherent flagship-first demo narrative. ✅
- Preview reset is safe (super-admin + preview + typed confirmation) and updates diagnostics clearly. ✅
- Admin routes are consistent (no brittle filters; no surprise 403s). ✅
- Dashboard + properties numbers reconcile across UI and underlying collections. ✅
- Flagship property is a coherent, deeply connected data model (not page-level demo data). ✅
- Public legal route and visible legal/privacy/cookie links match preview patterns. ✅
- **Phase 8 target (in progress):** residents + providers + analytics read models are coherent and reconcile with dashboard totals. ⏳
- Production is verified on `<TBD_TEST_DOMAIN>` before any live-domain cutover. ⏳
- Production bootstrap remains safe-by-design and not runnable until explicitly implemented/approved. ✅ (scaffold-only)
