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

### Authentication & routing constraints (V1)
- Auth approach for V1:
  - Seed demo/admin accounts first; keep current admin login behavior as close as possible; refine parity later.
  - **Session approach:** **secure cookie session** (implemented).
- Routing requirements:
  - Keep admin route base **`/app/admin/*` exactly** (implemented).
  - Use **id-based routing** for detail pages (next phase starts with properties).
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

### New V1 data/experience decisions locked (for next phase)
- **Flagship property first:** *The Metropolitan at Riverside* is the canonical fully functional example.
- **Canonical property manager identity:** **Sarah Mitchell** replaces the generic manager demo identity and is the canonical manager for the flagship property.
- **Canonical resident example:** **Alex Chen** remains the end-to-end functional resident.
- **Churn model weights (must be explicit in UI and data):**
  - Maintenance Frequency = 30
  - Resolution Time = 20
  - Repeat Issues = 15
  - Negative Sentiment = 15
  - Unit Age = 10
  - Low Engagement = 10
- **Communication style:** informal, AI-driven, proactive; should read as leading-indicator signals for churn.
- **Public legal/privacy/cookie parity:** match current preview copy as closely as publicly visible; use closest-safe parity where not exposed.

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
- deterministic `demoA` seed for core records
- preview reset (super-admin + preview + typed phrase)
- diagnostics seed metadata and missing dataset warnings
- production bootstrap scaffolding (not runnable)

---

### Phase 7 — Dashboard + Properties (read models + UI driven by seeded data) ⏳ IN PROGRESS
**Purpose:** Implement the first real business UI and read models (dashboard + properties) with seeded backend data driving all numbers. Build a coherent system centered on the flagship property.

#### Phase 7 scope (DO NOW)
1) **Seed model expansion (flagship property depth)**
- Expand demoA seeded data to support real dashboard + properties UI.
- Build **The Metropolitan at Riverside** as a fully coherent example including:
  - property record (already exists)
  - total + occupied units
  - **unit-level records**
  - resident assignments to units
  - maintenance history
  - churn signals + churn score history
  - interventions
  - credits
  - offers
  - bookings
  - provider relationships
  - revenue impacts and links
  - property metrics
- Ensure **cross-role consistency**: the same underlying records reconcile across admin, manager, and resident example views.
- Canonical users:
  - Property manager: **Sarah Mitchell** (seeded as the manager identity)
  - Resident example: **Alex Chen** (end-to-end)

2) **Backend read models & APIs**
- Add coherent read-model services powering:
  - **Dashboard overview** (portfolio + flagship property summary)
  - **Properties list** (portfolio context)
  - **Property detail** (flagship depth)
  - **Flagged residents list** (must include Alex Chen, Maria Santos, James Wilson)
- Ensure read models are derived from collections (no hardcoded metrics in API).

3) **Dashboard UI (admin)**
- Implement dashboard cards and key sections using backend read model responses.
- Make churn story obvious: informal AI communication + leading indicators.
- Ensure numbers reconcile (same sources used for cards, lists, and property summaries).

4) **Properties UI (admin)**
- Implement properties list (portfolio context) with the three required properties.
- Implement property detail view (start with The Metropolitan at Riverside) using id-based routing.
- Show churn score + weighted driver explanation clearly (weights locked above).

5) **Public legal + footer link visibility**
- Add `/legal` route.
- Keep legal/privacy/cookie link visibility patterns like preview.
- Use closest-safe parity copy where exact text is not publicly visible.

#### Phase 7 non-goals (DO NOT BUILD YET)
- Provider management CRUD
- Tenant management CRUD
- Analytics business logic
- Settings business logic
- Production bootstrap runnable flow

#### Phase 7 acceptance criteria
- Dashboard numbers are derived from seeded backend collections and reconcile.
- Property list and flagship property detail are fully driven by backend read models.
- Alex Chen is functional end-to-end in the read model:
  - profile + assigned unit
  - churn score + weighted drivers and why the score changed
  - maintenance history
  - concierge communication history
  - intervention history
  - credits + bookings
  - linked financial effects where applicable
- Flagged residents includes Alex Chen, Maria Santos, James Wilson.
- UI style remains very close to preview.
- `/legal` exists and public legal/privacy/cookie links are visible like preview.

---

### Phase 8 — Remaining admin domains (providers, tenants, analytics, settings) ⏳ NOT STARTED
- Implement read models + UI for remaining admin pages.
- Maintain parity for labels/copy/layout and ensure credits tracked separately from gross revenue.

---

### Phase 9 — Testing/polish ⏳ NOT STARTED
- Parity sweep: labels/copy/layout; `data-testid` coverage; empty/loading states.
- Reconciliation tests for KPI math and analytics totals.
- Regression tests for env binding, diagnostics, auth gating, seed, and preview reset.

---

### Phase 10 — Deployment verification + cutover ⏳ NOT STARTED
- Deploy production to `<TBD_TEST_DOMAIN>`; verify env binding + diagnostics.
- Implement/enable deployment-time production bootstrap (idempotent + audited) when approved.
- Only after approval, swap to `happyco.talapartners.com`.

---

## 3) Next Actions
**Immediate next build order (Phase 7):**
1) Expand seed schema for flagship property depth (units, assignments, churn signals, maintenance, comms, interventions, credits, bookings, providers, revenue, metrics).
2) Add backend read-model endpoints for:
   - dashboard overview
   - properties list
   - property detail
   - flagged residents
3) Implement admin dashboard UI using only backend read model responses.
4) Implement properties list + property detail (id-based routes), flagship-first.
5) Add `/legal` and public footer links (legal/privacy/cookies) to match preview visibility.
6) Add reconciliation checks in diagnostics or a lightweight internal validation layer to ensure dashboard totals match underlying documents.

## 4) Success Criteria
- Environment separation is provable: diagnostics + hard failures prevent mixing. ✅
- Preview matches current preview landing/login/admin UX wherever feasible (copy/layout/behavior). ✅ (landing/login/shell/diagnostics)
- Seeded demo dataset (`demoA`) is deterministic, current-dated, and supports the demo narrative. ✅ (core seed + reset)
- Preview reset is safe (super-admin + preview + typed confirmation) and updates diagnostics clearly. ✅
- Admin routes are consistent (no brittle filters; no surprise 403s). ✅ (gating + shell consistency)
- Dashboard + properties numbers reconcile across UI and underlying collections. ⏳ (Phase 7)
- Flagship property is a coherent, deeply connected data model (not page-level demo data). ⏳ (Phase 7)
- Public legal route and visible legal/privacy/cookie links match preview patterns. ⏳ (Phase 7)
- Production is verified on `<TBD_TEST_DOMAIN>` before any live-domain cutover. ⏳
- Production bootstrap remains safe-by-design and not runnable until explicitly implemented/approved. ✅ (scaffold-only)
