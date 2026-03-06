# plan.md — HappyCo Concierge Seattle Demo + Retention Intelligence

## 1) Objectives
- **Stabilize UI** after recent analytics/concierge work; eliminate runtime crashes and blank renders across roles.
- Convert the entire demo to a coherent, Seattle-area portfolio (**~50 / ~100 / ~150 units**) with consistent properties, residents, providers, services, bookings, receipts, and analytics.
- Make churn prediction **leading** (signals → risk) and make intervention logic visible (why flagged, what action, expected ROI impact).
- Anchor the product narrative around **Retention ROI** and position this as a **HappyCo add-on** leveraging HappyCo’s existing operational + maintenance data.
- Make the **Manager** experience the strongest daily workflow (risk queue → insight → recommended actions → intervention history → ROI outcomes).
- Keep premium SaaS design system unchanged; **frontend-only**; centralized mocked data.

**Status update (current):**
- ✅ **Phase 1 complete**: retention engine POC is implemented and visible in the Manager workflow.
- ✅ **Critical runtime crash fixed**: `roleLabel is not defined` in `AdminSidebar` was crashing pages.
- 🚧 Moving to **Phase 2**: propagate Seattle consistency + Retention ROI rollups across Admin/Manager/Resident surfaces, then run comprehensive UI testing.

---

## 2) Implementation Steps

### Phase 1 — Core Flow POC (Prove the retention engine + intervention visibility)
**Core = “Risk → Recommended intervention → ROI impact”** working end-to-end off `demoData.js` and visible in UI.

User stories:
1. As a Manager, I can see a ranked risk queue with top drivers per resident.
2. As a Manager, I can open a resident and see the exact signals/weights that triggered the score.
3. As a Manager, I can preview recommended intervention tiers and the expected ROI delta before applying.
4. As an Admin, I can adjust global assumptions (turn cost, margins, credit thresholds) and see ROI update immediately.
5. As a Manager, I can switch properties and see property-specific settings change the recommendations.

Steps (Completed):
- ✅ Created a **single-source retention configuration** in `demoData.js`:
  - Global assumptions: turnover cost, avg rent, margins, tier thresholds, signal weights, demand assumptions.
  - Per-property overrides: turnover cost, pricing multipliers, provider availability.
- ✅ Implemented pure functions in `demoData.js` (no backend):
  - `computeRiskScore(resident, property, config)` → score + driver breakdown.
  - `recommendIntervention(score, drivers, config)` → tier, offer, rationale.
  - `estimateInterventionROI(intervention, residentContext, property, config)` → savings, revenue, cost, ROI, multiple.
- ✅ Seeded **5 Seattle-area residents** with friction signals and generated computed risk + intervention + ROI projections.
- ✅ Updated **Manager Churn Risk** page to render:
  - Risk queue with computed scores + driver contributions.
  - Visible recommended intervention tier + rationale.
  - Expandable ROI explainer cards (savings, revenue, credits invested, ROI multiple).
  - Mock “Deploy intervention” state (UI-level) to prove apply loop.
- ✅ Stabilized UI crash: fixed `AdminSidebar` `roleLabel` runtime error.

Checkpoint: ✅ POC is stable and renders with no runtime errors.

---

### Phase 2 — V1 App Development (Seattle conversion + consistent marketplace + role completeness)

User stories:
1. As an Admin, I can view a Seattle portfolio summary where all counts and ROI match across dashboards and analytics.
2. As a Manager, I can take action on an at-risk resident and see it recorded in intervention history.
3. As a Resident, I can use Concierge to browse Seattle services and book using credits.
4. As an Admin, I can view analytics trends that roll up into Retention ROI as the primary metric.
5. As a Manager, I can see provider readiness/availability for recommended interventions at my property.

Steps (Now):

**2A — Seattle data consistency sweep (single source of truth)**
- Confirm all pages pull from `demoData.js` for:
  - Properties (names, neighborhoods, addresses, unit counts, rents).
  - Residents (identity consistency: e.g., Alex Chen, unit, propertyId everywhere).
  - Providers/services (pricing, availability, service areas).
  - Bookings/receipts (consistent amounts and service IDs).
- Add/standardize entity registries (IDs → references) to prevent drift:
  - `propertiesById`, `residentsById`, `providersById`, `servicesById` helper maps.

**2B — Retention ROI as the anchor metric everywhere**
- Replace any remaining hardcoded ROI/savings numbers on Admin and Manager pages with:
  - Shared computed rollups derived from global config + property overrides.
  - Consistent portfolio totals (turnovers avoided, credits invested, service revenue, retention ROI, ROI multiple).
- Ensure Admin Analytics charts and dashboard metric cards use the same rollup source.

**2C — Admin surfaces update (Seattle-first + story clarity)**
- Admin Dashboard:
  - Update portfolio cards to Seattle counts and computed metrics.
  - Add brief story framing: “Leading indicators → interventions → retention ROI.”
- Admin Analytics:
  - Ensure charts render and reflect Seattle portfolio rollups.
  - Add an “Operational Signals”/“Leading indicators” insight card (non-marketing, decision-useful).

**2D — Manager workflow hardening (strongest UX)**
- Expand the “Deploy intervention” loop into a believable daily tool:
  - Intervention history per resident (timeline entries: date, tier, credits, expected ROI).
  - Property-level performance widget: ROI, avoided turnover cost, service revenue, credits.
  - Provider readiness card for the recommended action (availability/pricing/ETA).
- Add filtering and sorting:
  - Filter by driver type (maintenance/sentiment/response time/lease timing).
  - Sort by risk score, lease proximity, or highest projected ROI.

**2E — Resident experience consistency (friendly, informal)**
- Update Resident Concierge and Resident Services pages to use:
  - Seattle service catalog, provider names, real prices.
  - Credits/offers that align with manager intervention tiers.
- Add resident-friendly copy that stays premium but light.

**2F — Comprehensive UI testing (frontend-only)**
- Screenshot + console log checks across key routes:
  - Admin: `/app/admin/dashboard`, `/app/admin/analytics`, `/app/admin/properties`, `/app/admin/providers`.
  - Manager: `/app/manager/dashboard`, `/app/manager/churn-risk`, `/app/manager/residents`, `/app/manager/providers`.
  - Resident: `/app/resident/dashboard`, `/app/resident/concierge`, `/app/resident/services`, `/app/resident/bookings`.
- Validate:
  - No runtime errors.
  - No blank pages.
  - Metrics are consistent across roles.
  - Performance remains stable (no heavy render loops).

End Phase 2: run one end-to-end demo walkthrough (Admin → Manager → Resident) and capture a consistency checklist.

---

### Phase 3 — Expansion & Hardening (configurability + onboarding + narrative polish)

User stories:
1. As an Admin, I can tune assumptions per property and instantly see different intervention tiers.
2. As a Manager, I get a first-login onboarding card that teaches the daily workflow.
3. As an Admin, I can view platform impact (NOI, turn reduction, HappyCo revenue lift) derived from ROI components.
4. As a Manager, I can filter the risk queue by driver type (maintenance, sentiment, lease timing).
5. As a Resident, I can see credits/offers that match the manager intervention history.

Steps (Later):
- Config surfaces (frontend-only):
  - Admin Settings: editable global assumptions + per-property overrides (demo-safe).
  - Store edits in local state/sessionStorage (no backend).
- Onboarding (Manager):
  - Dismissible onboarding card + “3 steps today” checklist.
- Platform impact (Admin):
  - Add “Platform Impact” section: NOI lift, turn reduction, incremental HappyCo revenue, ROI multiple.
- Consistency audit:
  - Single ID system for properties/residents/providers/services.
  - Remove conflicting numbers; ensure charts derive from computed portfolio outputs.
- Performance pass:
  - Memoization for computed analytics; avoid large object cloning; keep `demoData.js` structured but not overly heavy.

End Phase 3: run comprehensive regression pass + route smoke tests.

---

## 3) Next Actions (Immediate)
1. ✅ Completed Phase 1 POC (retention config + functions + Manager churn-risk UI).
2. Update Admin Dashboard and Admin Analytics to use Seattle portfolio + computed rollups.
3. Update Resident Concierge / Services to use Seattle marketplace data + credits aligned to intervention tiers.
4. Add intervention history persistence (frontend-only) that survives navigation (e.g., sessionStorage) to support believable workflows.
5. Run screenshot+console checks on:
   - `/app/admin/analytics`
   - `/app/manager/churn-risk`
   - `/app/resident/concierge`

---

## 4) Success Criteria
- No blank pages; no uncaught runtime errors in console across Admin/Manager/Resident core routes.
- Manager workflow feels complete:
  - Risk queue renders, drivers visible, intervention tier visible, ROI delta shown.
  - “Deploy intervention” creates a history entry and aligns with resident-facing credits.
- Seattle portfolio is fully consistent everywhere (names, units, rents, risk counts, credits, bookings, receipts, charts).
- Retention ROI is the primary metric on Admin + Manager surfaces, with clearly explained component roll-up.
- Intervention logic is explicit (thresholds + signals + rationale) and configurable globally + per property via `demoData.js` (and optionally UI overrides stored locally).
- Premium SaaS design system preserved with no visual regressions.
