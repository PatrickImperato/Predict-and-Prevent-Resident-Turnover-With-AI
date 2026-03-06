# plan.md — HappyCo Concierge V1 (planning-first clean rebuild)

## 1) Objectives
- Rebuild **HappyCo Concierge** as a clean, diagnosable prospect-facing demo platform with **strict environment separation**.
- Match the **current preview experience** (layout, labels/copy, core behavior) wherever feasible, with cleaner internals and safer architecture.
- Environments use **explicit config only**: `APP_ENV=preview|production` (no hostname guessing; no silent DB fallback).
- **One preview database only** + **one production database only** (same schema, isolated data).
- Preview has **demo mode**; production starts with the **same seeded demo dataset** but in its **own production DB**.

### Authentication & routing constraints (V1)
- Auth approach for V1:
  - Seed demo/admin accounts first; keep current admin login behavior as close as possible; refine parity later.
  - **Session approach:** **secure cookie session** (implemented).
- Routing requirements:
  - Keep admin route base **`/app/admin/*` exactly** (implemented).
  - Use **id-based routing** for detail pages (later phases).
- Audience/scope:
  - Resident/manager auth exists, but **UI focus stays admin-first** for V1.
  - **Confirmed behavior for current UI phase:** manager/resident demo logins are **rejected/redirected** because only admin routes are implemented.
- **Confirmed behavior:** signed-in admins visiting `/` redirect to `/app/admin/dashboard`.

### Deployment & operations constraints
- Roll out to a **test domain (placeholder for now: `<TBD_TEST_DOMAIN>`)** before any cutover to `happyco.talapartners.com`.
- Built-in diagnostics from day one:
  - Diagnostics UI and API are first-class features.
  - **Diagnostics shows full DB name to authenticated admins** (implemented).
- Seed operations controls:
  - **Preview reset is restricted to super-admin only** (implemented).
  - **Preview reset scope (confirmed):** clear only managed HappyCo collections, then reseed `demoA` (implemented).
  - **Preview reset confirmation (confirmed):** typed phrase required in UI (implemented).
  - **Production bootstrap is a deployment-time protected step only**.
  - **Current status:** production bootstrap has **internal scaffolding only** and is **not runnable**.

### Reference findings (crawled)
- Landing page messaging centers on retention intelligence / churn prevention, KPI stats, portfolio ROI framing, and “Sign In” CTAs.
- Login page structure and copy observed:
  - “Welcome back” / “Sign in to access the platform”
  - Fields: “Email address”, “Password”
  - CTA: “Sign In”
  - Right-side demo account cards with autofill:
    - Property Manager — `manager@riverside.com` / `manager123`
    - Resident Experience — `alex.chen@email.com` / `demo123`
    - HappyCo Admin — `admin@happyco.com` / `admin123`

---

## 2) Implementation Steps (Phased)

### Phase 1 — Planning Artifacts Only (no code) ✅ COMPLETED
**Status:** Completed planning-only deliverable.

**Delivered artifacts (no app code, no DB code, no deployment commands generated):**
- Feature Inventory
- Data Inventory
- Schema Inventory
- Seed Plan
- Deployment & Cutover Plan

---

### Phase 2 — Environment & Diagnostics Architecture Blueprint (no code) ✅ COMPLETED
**Purpose (tight scope):** Define the architecture that guarantees explicit `APP_ENV` control, strict single-DB binding, fail-fast startup validation, diagnostics from day one, and hard cross-env guardrails.

---

### Phase 3 — Implementation Architecture Blueprint (no full code) ✅ COMPLETED
**Purpose:** Define *how* V1 will be implemented (module boundaries, contracts, middleware, and UI structure).

---

### Phase 4 — Foundation implementation (env + DB + auth + diagnostics) ✅ COMPLETED
**This phase was intentionally limited. The rest of the app is still not implemented.**

**Implementation order (followed exactly):**
1) backend environment config loader
2) fail-fast environment validation
3) single database binding
4) secure cookie session auth foundation
5) diagnostics endpoints first
6) diagnostics admin page first

#### Phase 4 delivered (foundation only)
**Backend**
- Environment config loader + fail-fast validation
  - `APP_ENV` is the only primary selector.
  - Invalid config aborts at startup.
- Single DB binding
  - Exactly one Mongo database is bound per runtime.
  - Binding validation: preview DB names must contain “preview”; production DB names must contain “production”.
- Secure cookie session auth foundation
  - Session cookie stored server-side via `auth_sessions` with hashed token.
  - Endpoints:
    - `GET /api/auth/session`
    - `POST /api/auth/login`
    - `POST /api/auth/logout`
- Diagnostics endpoints (admin-only)
  - `GET /api/diagnostics/runtime` → env + host + db name + build + flags
  - `GET /api/diagnostics/session` → current user identity + role
  - `GET /api/diagnostics/collections` → collection counts + missing datasetId warnings
  - `GET /api/diagnostics/seeds` → initial placeholder metadata (later replaced)
  - `GET /api/diagnostics/health` → DB ping + env validity
- Protected placeholders (only)
  - Preview reset placeholder existed initially (later replaced in Phase 6).
  - Production bootstrap remains **deployment-time only** by design and is not exposed in runtime UI.

**Frontend**
- Minimal routing implemented:
  - `/login`
  - `/app/admin/diagnostics` (under `/app/admin` shell)
- Admin route guard:
  - Only `admin` role can access admin routes.
  - Manager/resident auth works but does not grant admin access.
- Diagnostics page implemented first with cards:
  - Runtime / Session / Collections / Seeds (placeholder) / Guardrails

#### Phase 4 verification
- Lint: Python + JS clean.
- Frontend build: `yarn build` succeeds.
- Manual API checks and UI screenshot flow passed.
- Test agent report: `/app/test_reports/iteration_1.json` confirms expected behaviors.

---

### Phase 5 — Core UI structure + auth-gated admin routing (no business logic) ✅ COMPLETED
**Purpose:** Build the core UI structure and authentication flow while keeping environment/diagnostics guarantees intact.

#### Phase 5 delivered
1. Public **Landing page** parity structure and messaging implemented at `/`.
2. **Login page** parity implemented:
   - email + password form
   - demo account cards (admin/manager/resident)
   - integrates with secure cookie session auth endpoint
   - **manager/resident logins are rejected/redirected** because only admin routes are implemented.
3. Reusable **Admin shell** layout for all `/app/admin/*` routes:
   - sidebar navigation
   - topbar with environment badge
   - user menu
   - shared layout wrapper
4. Sidebar navigation items implemented:
   - Dashboard
   - Properties
   - Providers
   - Tenants
   - Analytics
   - Settings
   - Diagnostics
5. Placeholder pages/routes implemented (no business logic):
   - `/app/admin/dashboard`
   - `/app/admin/properties`
   - `/app/admin/providers`
   - `/app/admin/tenants`
   - `/app/admin/analytics`
   - `/app/admin/settings`
6. Auth gating enforced:
   - All `/app/admin/*` routes require **authenticated admin** session.
7. Diagnostics remains functional and accessible from the sidebar.
8. Root behavior implemented:
   - Signed-in admins visiting `/` → redirect to `/app/admin/dashboard`.

#### Phase 5 verification
- JS lint clean.
- Frontend build: `yarn build` succeeds.
- UI screenshot flow passed.
- Test agent report: `/app/test_reports/iteration_2.json` confirms all Phase 5 acceptance criteria.

**Out of scope (still not implemented at end of Phase 5):**
- Dashboard business logic (KPIs, charts, reconciled revenue/credits)
- Properties/providers/tenants/analytics/settings data fetching and CRUD
- Seed system implementation (`demoA`) and real preview reset
- Production bootstrap implementation

---

### Phase 6 — Seed + hardening (demoA, reset UX, diagnostics seed visibility) ✅ COMPLETED
**Purpose:** Implement the deterministic `demoA` seed system, wire a real preview reset flow (preview-only, super-admin only), and extend diagnostics to reflect true seed state.

#### Phase 6 delivered
1) **Deterministic seed service for datasetId `demoA`**
- Added seed builders with **stable IDs**.
- Added seed validators that fail clearly if required core records are missing.
- Uses **rolling current dates** for seeded timestamps.

2) **Seeded required records (first set)**
- `platform_settings` (demoA)
- `users`:
  - admin (`admin@happyco.com`) with super-admin capability
  - manager (`manager@riverside.com`)
  - resident (`alex.chen@email.com`)
- `properties`:
  - Lakeside Commons
  - Downtown Tower
  - The Metropolitan at Riverside
- `residents`:
  - Alex Chen as the **main QA resident** (stable ID, `isQaResident=true`)
  - plus additional named residents (used by landing/preview story) to support a polished demo narrative

3) **Preview startup seed validation/initialization**
- On preview startup:
  - validate that core demoA records exist
  - if missing, automatically run deterministic seed
  - diagnostics seed metadata is created/updated

4) **Real preview reset (preview-only)**
- Endpoint implemented (admin-only route set): `POST /api/admin/seeds/preview-reset`
- Guards:
  - `APP_ENV=preview` required
  - `ALLOW_PREVIEW_RESET=true` required
  - **super-admin only**
  - **typed confirmation phrase required**
- Behavior:
  - clears **managed HappyCo collections** only (not the entire database)
  - reseeds `demoA`
  - updates `seed_metadata`
  - writes audit events for success/failure

5) **Production bootstrap**
- **Not implemented** (still not runnable).
- Added **internal scaffolding only** to represent production bootstrap state in diagnostics.

6) **Diagnostics extended for seed visibility**
Diagnostics now shows:
- last seed action
- last seed time
- seed dataset id
- seed status
- last seed error (if any)
- collection counts
- missing dataset warnings

7) **Frontend diagnostics + reset UX improvements**
- Preview reset dialog now:
  - requires **typed confirmation phrase**
  - shows DB name + dataset id
  - executes preview reset and refreshes diagnostics on success

8) **Hardening: session persistence**
- Addressed a reported frontend issue where sessions could appear to drop during navigation.
- Hardened **AuthContext** with session caching to reduce user-visible session flicker and improve route transitions.

#### Phase 6 verification
- Lint: Python + JS clean.
- Frontend build: `yarn build` succeeds.
- Manual API checks:
  - correct/incorrect reset phrase behavior
  - seed metadata updated after reset
- UI screenshot flow for reset dialog passed.
- Test agent report: `/app/test_reports/iteration_3.json` confirms seed + reset requirements; noted a session persistence issue which was addressed afterward.

---

### Phase 7 — Admin page implementations (data + parity) ⏳ NOT STARTED
- Implement business logic and APIs for:
  - Dashboard
  - Properties + property detail (id-based routing)
  - Providers
  - Tenants + tenant detail
  - Analytics
  - Settings
- Maintain parity for labels/copy/layout and ensure credits tracked separately from gross revenue.
- Ensure seeded content drives the UI and all numbers reconcile (cards/charts/tables).

---

### Phase 8 — Testing/polish ⏳ NOT STARTED
- Parity sweep: labels/copy/layout; `data-testid` coverage; empty/loading states.
- Reconciliation tests for KPI math and analytics totals.
- Regression tests for env binding, diagnostics, auth gating, and preview reset.

---

### Phase 9 — Deployment verification + cutover ⏳ NOT STARTED
- Deploy production to `<TBD_TEST_DOMAIN>`; verify env binding + diagnostics.
- Implement/enable deployment-time production bootstrap (idempotent + audited) when approved.
- Only after approval, swap to `happyco.talapartners.com`.

---

## 3) Next Actions
- Begin Phase 7 in this order:
  1) Implement backend read APIs for dashboard + properties list first (driven by seeded demoA data)
  2) Build dashboard parity cards/charts with explicit reconciliation checks (gross vs credits tracked separately)
  3) Implement properties list + property detail routing (id-based)
  4) Implement tenants list/detail (ensure Alex Chen is first-class)
  5) Implement providers management list
  6) Implement analytics views and settings pages
- Continue capturing parity specifics behind admin auth (screenshots/walkthrough) to ensure exact labels/layout matches when business pages are implemented.
- Decide the exact test domain value before Phase 9.

## 4) Success Criteria
- Environment separation is provable: diagnostics + hard failures prevent mixing. ✅
- Preview matches current preview landing/login/admin UX wherever feasible (copy/layout/behavior). ✅ (landing/login/shell/diagnostics)
- Seeded demo dataset (`demoA`) is deterministic, current-dated, and supports the demo narrative. ✅ (core seed + reset)
- Preview reset is safe (super-admin + preview + typed confirmation) and updates diagnostics clearly. ✅
- Admin routes are consistent (no brittle filters; no surprise 403s). ✅ (gating + shell consistency) / ⏳ (data pages)
- Production is verified on `<TBD_TEST_DOMAIN>` before any live-domain cutover. ⏳
- Production bootstrap remains safe-by-design and not runnable until explicitly implemented/approved. ✅ (scaffold-only)