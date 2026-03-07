# plan.md — HappyCo Concierge Demo: Canonical Data Consistency + Reliability Verification (Preview Only)

## 1) Objectives
- **Establish a single canonical source of truth** for all demo entities and metrics (properties, residents, providers, portfolio totals) across:
  - Public pages
  - Authenticated Admin
  - Manager
  - Resident
- **Eliminate data inconsistency** by removing fragmented/hardcoded mocks and aligning the frontend with the backend canonical seed dataset:
  - Backend authority: `/app/backend/app/seeds/demo_dataset.py` (+ `/app/backend/app/seeds/constants.py`)
  - Frontend canonical mirror: `/app/frontend/src/lib/canonicalData.js`
- **Guarantee click-safety and route reliability**: every clickable element in authenticated flows must be safe (no crashes, no runtime errors, no blank renders). Non-functional UI must be disabled or clearly non-interactive.
- **Pin the flagship resident story (Alex Chen)** across all relevant views:
  - Same name, unit, property, risk tier/score, and narrative everywhere
  - Alex is always present and easy to find
- **Presentation-ready product polish**: remove placeholder/internal jargon; keep copy credible; maintain premium UI.
- **Work in preview only**: **DO NOT DEPLOY**.

**Status update (current):**
- ✅ Critical root cause identified: **frontend mock data conflicts with backend canonical dataset** (e.g., property names).
- ✅ Created `/app/frontend/src/lib/canonicalData.js` as the **frontend canonical data layer** aligned to backend seeds.
- ✅ Canonical dataset includes:
  - Canonical properties: Lakeside Commons, Downtown Tower, The Metropolitan at Riverside (flagship)
  - Flagship resident: Alex Chen (unit 501 at The Metropolitan at Riverside)
  - Canonical providers: SparkClean, FixRight HVAC, Urban Pest Control
  - Portfolio totals derived from the canonical properties
- 🚧 In progress: **Phase 2A refactor** to make *all frontend pages* consume `canonicalData.js` and delete/retire conflicting mocks (esp. `demoData.js` usage).

---

## 2) Implementation Steps

### Phase 1 — Identify Canonical Data + Create Frontend Source of Truth (Completed)
**Core outcome:** A single authoritative data definition exists for frontend display.

User stories:
1. As a user, I see the same property/resident/provider data across every page.
2. As a presenter, I can trust that what’s shown matches the seeded backend demo dataset.

Steps (Completed):
- ✅ Audited mismatch between backend seed data and frontend hardcoded mocks.
- ✅ Implemented canonical frontend registry in `/app/frontend/src/lib/canonicalData.js` mirroring backend seeds.
- ✅ Defined canonical IDs for properties/residents/providers and helper getters (`getPropertyById`, `getResidentById`, `getProviderById`).
- ✅ Anchored Alex Chen as the flagship resident (`ALEX_CHEN`) and ensured he is first in `CANONICAL_RESIDENTS`.

Checkpoint: ✅ A canonical frontend dataset exists and matches backend seeds at the entity level.

---

### Phase 2 — Deep Consistency + Reliability Verification Pass (Now)
**Core = “One data source everywhere + click-safe UI everywhere.”**

User stories:
1. As an Admin, I see consistent portfolio totals and property names across Dashboard/Analytics/Properties/Providers/Tenants.
2. As a Manager, I see the same canonical properties/residents/providers and no Seattle-only mock portfolio remnants.
3. As a Resident, Alex’s data and property context are consistent with Admin/Manager views.
4. As any user, I can click through the entire app without crashes, runtime errors, or dead-end routes.

Steps (Now):

**2A — Systematic frontend refactor to `canonicalData.js` (P0)**
- Refactor *every* data-displaying page/component to import from `/app/frontend/src/lib/canonicalData.js`.
- Remove local mock objects and stop importing conflicting sources (especially `demoData.js`).
- Pages to sweep (minimum):
  - Public: `LandingPage.jsx`, `PrivacyPage.jsx`, `LegalPage.jsx`
  - Admin: `DashboardPage.jsx`, `AnalyticsPage.jsx`, `PropertiesPage.jsx`, `PropertyDetailPage.jsx`, `TenantsPage.jsx`, `ProvidersPage.jsx`, `SettingsPage.jsx`, `DiagnosticsPage.jsx`
  - Manager: `ManagerDashboard.jsx`, `ManagerChurnRisk.jsx`, `ManagerResidents.jsx`, `ManagerProviders.jsx`, `ManagerMaintenance.jsx`
  - Resident: `ResidentDashboard.jsx`, `ResidentConcierge.jsx`, `ResidentServices.jsx`, `ResidentBookings.jsx`, `ResidentMaintenance.jsx`
- Enforce naming consistency:
  - “Lakeside Commons”, “Downtown Tower”, “The Metropolitan at Riverside” must be used everywhere.
  - Ensure shortName usage (“The Metropolitan”) is deliberate and consistent.

**2B — Canonical rollups + derived metrics (P0/P1)**
- Ensure all “portfolio totals”/summary cards are derived from `CANONICAL_PROPERTIES` / `PORTFOLIO_TOTALS` (and not hardcoded per page).
- Where possible, compute totals rather than store them (or add a single helper that computes them once).
- Validate Alex Chen’s risk score, tier, unit, property match across:
  - Tenants/Residents list
  - Property detail view
  - Any “at-risk” or “featured resident” modules

**2C — Click-safety pass (P0)**
- Exhaustive click-through test across all routes and UI controls:
  - Sidebar navigation items
  - Table row actions
  - Tabs, filters, dropdowns
  - “View details” links/cards
- For unfinished features:
  - Disable controls OR route to a safe “Coming soon” placeholder (no exceptions).
- Fix any console errors, undefined access, empty state crashes.

**2D — Cross-page consistency verification (P0/P1)**
- Manual consistency checks for the same entity across multiple pages:
  - Alex Chen: name, email/phone, unit, property, risk score/tier, narrative labels
  - Properties: name, address, unit counts, occupancy rate
  - Providers: name, coverage properties, coverage %, fulfillment rate
- Validate “flagship property” highlighting for The Metropolitan at Riverside appears consistently.

**2E — Copy polish (P1)**
- Remove placeholder text and internal jargon.
- Ensure “interventions” language is framed as **AI-driven automation** and concierge workflows.

End Phase 2: produce a concise verification checklist (routes tested + key value matches) and confirm no runtime errors.

---

### Phase 3 — Retention Intelligence Reconciliation (Later, after consistency is locked)
> Note: Prior retention-engine POC work was built around Seattle-only `demoData.js`. This phase reintroduces retention logic **only after** canonical data consistency is enforced.

User stories:
1. As an Admin/Manager, retention analytics reflect canonical properties/residents.
2. As a presenter, ROI and churn/risk narratives don’t contradict seeded data.

Steps (Later):
- Migrate or rebuild retention computations (risk scoring, intervention recommendation, ROI estimates) to use `canonicalData.js` entities.
- Remove/deprecate `demoData.js` or isolate it so it cannot leak into canonical views.
- Add memoized computed selectors/rollups (avoid heavy recalculation on render).

---

## 3) Next Actions (Immediate)
1. Refactor Admin pages to use `canonicalData.js` first (highest demo visibility):
   - `DashboardPage.jsx`, `PropertiesPage.jsx`, `PropertyDetailPage.jsx`, `TenantsPage.jsx`, `ProvidersPage.jsx`, `AnalyticsPage.jsx`.
2. Refactor Manager pages next:
   - `ManagerDashboard.jsx`, `ManagerResidents.jsx`, `ManagerProviders.jsx`, `ManagerMaintenance.jsx`, `ManagerChurnRisk.jsx`.
3. Refactor Resident pages to ensure Alex Chen is consistent end-to-end.
4. Remove/replace imports from `demoData.js` and delete page-level hardcoded mocks.
5. Run a full click-through safety pass on:
   - Admin → Manager → Resident flows via login role cards.
6. Perform explicit cross-page value comparisons for Alex Chen and the flagship property.

---

## 4) Success Criteria
- **Single source of truth**: all displayed properties/residents/providers and rollups are derived from `/app/frontend/src/lib/canonicalData.js`.
- **Canonical naming enforced**: no “Ballard Commons / Seattle portfolio” remnants appear anywhere.
- **Alex Chen is pinned and consistent** across Admin/Manager/Resident views.
- **Click-safe authenticated UX**: no crashes, no runtime errors, no blank pages; non-functional UI is disabled or safely handled.
- **Presentation-ready polish**: no placeholder/internal jargon; coherent AI concierge/intervention framing.
- **Preview only**: changes remain in preview environment; **DO NOT DEPLOY**.
