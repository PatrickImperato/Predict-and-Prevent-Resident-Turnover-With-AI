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
  - **Confirmed behavior for current UI phase:** manager/resident demo logins are **rejected or redirected** because only admin routes are implemented.
- **Confirmed behavior:** signed-in admins visiting `/` should redirect to `/app/admin/dashboard`.

### Deployment & operations constraints
- Roll out to a **test domain (placeholder for now: `<TBD_TEST_DOMAIN>`)** before any cutover to `happyco.talapartners.com`.
- Built-in diagnostics from day one:
  - Diagnostics UI and API are first-class features.
  - **Diagnostics shows full DB name to authenticated admins** (implemented).
- Seed operations controls:
  - **Preview reset is restricted to super-admin only**.
  - **Production bootstrap is a deployment-time protected step only**.
  - **Current status:** reset/bootstrap are **protected placeholders only** (no real seed system yet).

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
  - Seeded foundation users inserted/updated at startup (admin/manager/resident).
  - Session cookie stored server-side via `auth_sessions` with hashed token.
  - Endpoints:
    - `GET /api/auth/session`
    - `POST /api/auth/login`
    - `POST /api/auth/logout`
- Diagnostics endpoints (admin-only)
  - `GET /api/diagnostics/runtime` → env + host + db name + build + flags
  - `GET /api/diagnostics/session` → current user identity + role
  - `GET /api/diagnostics/collections` → collection counts + missing datasetId warnings
  - `GET /api/diagnostics/seeds` → placeholder seed metadata
  - `GET /api/diagnostics/health` → DB ping + env validity
- Protected placeholders (only)
  - Preview reset placeholder exists and is **super-admin + preview** gated, but returns **501 Not Implemented**.
  - Production bootstrap remains **deployment-time only** by design and is not exposed in runtime UI.

**Frontend**
- Minimal routing implemented:
  - `/login`
  - `/app/admin/diagnostics` (under `/app/admin` shell)
- Admin route guard:
  - Only `admin` role can access admin routes.
  - Manager/resident auth works but does not grant admin access.
- Diagnostics page implemented first with cards:
  - Runtime / Session / Collections / Seeds placeholder / Guardrails
  - Preview reset placeholder dialog only when allowed

#### Phase 4 verification
- Lint: Python + JS clean.
- Frontend build: `yarn build` succeeds.
- Manual API checks and UI screenshot flow passed.
- Test agent report: `/app/test_reports/iteration_1.json` confirms expected behaviors.

---

### Phase 5 — Core UI structure + auth-gated admin routing (no business logic) ⏳ IN PROGRESS
**Purpose:** Build the core UI structure and authentication flow while keeping environment/diagnostics guarantees intact.

**Scope (strict):**
1. Public **Landing page** parity with current preview layout/messaging.
2. **Login page** parity:
   - email + password form
   - demo account cards (admin/manager/resident)
   - integrates with secure cookie session auth endpoint
   - manager/resident sessions are **rejected or redirected** in this phase because admin-only UI is implemented.
3. Reusable **Admin shell** layout for all `/app/admin/*` routes:
   - sidebar navigation
   - topbar with environment badge + user menu
   - shared layout wrapper
4. Sidebar navigation items:
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
6. Auth gating:
   - All `/app/admin/*` routes require **authenticated admin** session.
7. Diagnostics remains functional and accessible from the sidebar.

**Confirmed behaviors for Phase 5:**
- Signed-in admins visiting `/` → redirect to `/app/admin/dashboard`.
- Manager/resident demo logins → rejected or redirected (admin-only shell implemented).

**Out of scope (explicitly not in Phase 5):**
- Dashboard business logic (KPIs, charts, reconciled revenue/credits)
- Properties/providers/tenants/analytics/settings data fetching and CRUD
- Seed system implementation (`demoA`) and real preview reset
- Production bootstrap implementation

**Phase 5 acceptance criteria:**
- Landing page matches preview copy/layout choices closely.
- Login page matches preview copy and demo-card behavior; uses secure cookie session.
- Admin shell is shared and consistent for all admin routes.
- All admin routes are admin-gated (no partial 403 drift).
- Diagnostics remains fully functional from sidebar.

---

### Phase 6 — Seed + hardening (demoA, reset UX, auth consistency) ⏳ NOT STARTED
- Implement full seed services for dataset `demoA` (rolling dates + reconciliation).
- Implement preview reset (super-admin only) with explicit confirmation, audit, and diagnostics updates.
- Implement production bootstrap (deployment-time only) with idempotency + audit.
- Expand diagnostics warnings (missing datasetId, drift).
- Tighten admin authorization across all routes (no 403 surprises).

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

---

### Phase 8 — Testing/polish ⏳ NOT STARTED
- Parity sweep: labels/copy/layout; `data-testid` coverage; empty/loading states.
- Reconciliation tests for KPI math and analytics totals.

---

### Phase 9 — Deployment verification + cutover ⏳ NOT STARTED
- Deploy production to `<TBD_TEST_DOMAIN>`; verify env binding + diagnostics.
- Only after approval, swap to `happyco.talapartners.com`.

---

## 3) Next Actions
- Complete Phase 5 in this order:
  1) landing parity route `/`
  2) login parity refinements + admin-only behavior enforcement
  3) admin shell route map + placeholder pages
  4) verify diagnostics from sidebar and admin gating across all `/app/admin/*`
- Capture remaining parity specifics behind admin auth (screenshots/walkthrough) to ensure exact labels/layout matches.
- Decide the exact test domain value before Phase 9.

## 4) Success Criteria
- Environment separation is provable: diagnostics + hard failures prevent mixing. ✅
- Preview matches current preview landing/login/admin UX wherever feasible (copy/layout/behavior). ⏳
- Seeded demo dataset (`demoA`) is polished, current-dated, and KPIs reconcile. ⏳
- Admin routes are consistent (no brittle filters; no surprise 403s). ⏳
- Production is verified on `<TBD_TEST_DOMAIN>` before any live-domain cutover. ⏳
