import { Building2, TrendingUp, DollarSign, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CountUp } from "@/components/ui/count-up";

// Mock demo data for manager dashboard
const mockManagerDashboard = {
  property: {
    id: "a4f7603e-dda0-4c44-b382-e159f8c773be",
    name: "The Metropolitan at Riverside",
    manager: "Sarah Mitchell"
  },
  projected_impact: {
    value: 98080,
    label: "Projected Annual Impact",
    detail: "Based on current retention strategy"
  },
  kpi_cards: [
    { key: "retention_savings", label: "Retention Savings", value: "$52,400", detail: "8 turnovers avoided" },
    { key: "concierge_revenue", label: "Concierge Revenue", value: "$28,200", detail: "+18% vs last quarter" },
    { key: "saas_revenue", label: "SaaS Revenue", value: "$17,480", detail: "94% of target" },
    { key: "avoided_turnovers", label: "Avoided Turnovers", value: "8", detail: "This quarter" }
  ],
  churn_distribution: [
    { level: "High Risk", count: 12, color: "red" },
    { level: "Medium Risk", count: 18, color: "amber" },
    { level: "Low Risk", count: 64, color: "slate" }
  ],
  at_risk_residents: [
    { id: "1", name: "Alex Chen", unit: "501", score: 74, driver: "Maintenance frequency", last_interaction: "2 days ago" },
    { id: "2", name: "Maria Santos", unit: "312", score: 72, driver: "Maintenance frequency", last_interaction: "1 day ago" },
    { id: "3", name: "Jordan Lee", unit: "208", score: 68, driver: "Sentiment decline", last_interaction: "4 days ago" }
  ],
  maintenance_categories: [
    { category: "HVAC", count: 24, avg_resolution: "2.3 days" },
    { category: "Plumbing", count: 18, avg_resolution: "1.8 days" },
    { category: "Appliances", count: 15, avg_resolution: "3.1 days" },
    { category: "Other", count: 12, avg_resolution: "2.6 days" }
  ]
};

export default function ManagerDashboard() {
  const data = mockManagerDashboard;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: "easeOut" }}
      className="space-y-8" 
      data-testid="manager-dashboard-root"
    >
      {/* Header */}
      <section className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <Badge className="mb-3 w-fit border-teal-200 bg-teal-50 text-teal-700 hover:bg-teal-50" variant="secondary">
          {data.property.name}
        </Badge>
        <h2 className="font-[var(--font-heading)] text-[28px] font-semibold tracking-tight text-slate-900">
          Property Operations Dashboard
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
          Track retention performance, monitor at-risk residents, and manage operational efficiency for your property.
        </p>
      </section>

      {/* Projected Impact - Visual Anchor */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, delay: 0.08 }}
      >
        <div className="rounded-xl border-2 border-teal-200 bg-gradient-to-br from-teal-50 to-emerald-50 p-8 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal-600/10 text-teal-600">
              <TrendingUp className="h-6 w-6" strokeWidth={2} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-700">{data.projected_impact.label}</p>
              <p className="mt-1 font-[var(--font-heading)] text-[40px] font-semibold tracking-tight text-slate-900">
                $<CountUp end={data.projected_impact.value} duration={1200} separator="," />
              </p>
              <p className="mt-1 text-sm text-slate-600">{data.projected_impact.detail}</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* KPI Cards */}
      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {data.kpi_cards.map((card, index) => (
          <motion.div
            key={card.key}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.24, delay: 0.12 + index * 0.06 }}
          >
            <div className="saas-metric-card">
              <p className="metric-label">{card.label}</p>
              <p className="metric-value mt-3">{card.value}</p>
              {card.detail && <p className="metric-detail mt-2">{card.detail}</p>}
            </div>
          </motion.div>
        ))}
      </section>

      {/* Main Content Grid */}
      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        {/* At Risk Residents */}
        <div className="saas-card">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-semibold tracking-tight text-slate-900">At-Risk Residents</h3>
            <Button asChild className="h-9 rounded-lg" size="sm" variant="outline">
              <Link to="/app/manager/churn-risk">View all</Link>
            </Button>
          </div>
          <div className="space-y-3">
            {data.at_risk_residents.map((resident) => (
              <Link
                key={resident.id}
                to={`/app/manager/residents/${resident.id}`}
                className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-4 transition-all hover:border-slate-300 hover:bg-white hover:shadow-sm"
              >
                <div>
                  <p className="font-medium text-slate-900">{resident.name}</p>
                  <p className="text-sm text-slate-600">Unit {resident.unit} • {resident.last_interaction}</p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-500">{resident.driver}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-semibold tracking-tight text-slate-900">{resident.score}</p>
                  <Badge className="mt-1 border-red-200 bg-red-50 text-red-700" variant="secondary">High</Badge>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Churn Distribution */}
        <div className="saas-card">
          <h3 className="mb-6 text-lg font-semibold tracking-tight text-slate-900">Churn Distribution</h3>
          <div className="space-y-4">
            {data.churn_distribution.map((item) => (
              <div key={item.level}>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-900">{item.level}</p>
                  <p className="text-sm font-semibold text-slate-900">{item.count} residents</p>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div 
                    className={`h-full rounded-full ${
                      item.color === 'red' ? 'bg-red-500' : 
                      item.color === 'amber' ? 'bg-amber-500' : 
                      'bg-slate-400'
                    }`}
                    style={{ width: `${(item.count / 94) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Maintenance Categories */}
      <section>
        <div className="saas-card">
          <h3 className="mb-6 text-lg font-semibold tracking-tight text-slate-900">Maintenance Categories</h3>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {data.maintenance_categories.map((cat) => (
              <div key={cat.category} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-medium text-slate-900">{cat.category}</p>
                <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">{cat.count}</p>
                <p className="mt-1 text-xs text-slate-600">Avg: {cat.avg_resolution}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
