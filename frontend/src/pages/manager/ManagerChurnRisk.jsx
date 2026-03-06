import { AlertCircle, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const mockChurnRisk = {
  high_risk: [
    {
      id: "1",
      name: "Alex Chen",
      unit: "501",
      score: 74,
      level: "High Risk",
      drivers: [
        { label: "Maintenance Frequency", weight: 35, value: "6 requests/quarter" },
        { label: "Sentiment Decline", weight: 25, value: "Negative trend" },
        { label: "Days to Lease End", weight: 20, value: "90 days" }
      ],
      last_interaction: "2 days ago",
      suggested_intervention: "Priority concierge + $500 credit"
    },
    {
      id: "2",
      name: "Maria Santos",
      unit: "312",
      score: 72,
      level: "High Risk",
      drivers: [
        { label: "Maintenance Frequency", weight: 35, value: "7 requests/quarter" },
        { label: "Response Time", weight: 20, value: "Avg 3.2 days" },
        { label: "Sentiment Decline", weight: 25, value: "Moderate concern" }
      ],
      last_interaction: "1 day ago",
      suggested_intervention: "Concierge outreach + $400 credit"
    }
  ],
  medium_risk: [
    {
      id: "3",
      name: "Jordan Lee",
      unit: "208",
      score: 68,
      level: "Medium Risk",
      drivers: [
        { label: "Sentiment Decline", weight: 25, value: "Slight concern" },
        { label: "Service Usage", weight: 15, value: "Below average" }
      ],
      last_interaction: "4 days ago",
      suggested_intervention: "Service recommendations"
    }
  ]
};

export default function ManagerChurnRisk() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: "easeOut" }}
      className="space-y-6"
    >
      {/* Header */}
      <section className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <Badge className="mb-3 w-fit border-red-200 bg-red-50 text-red-700 hover:bg-red-50" variant="secondary">
          Churn Risk Analysis
        </Badge>
        <h2 className="font-[var(--font-heading)] text-[28px] font-semibold tracking-tight text-slate-900">
          At-Risk Residents
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
          Monitor residents with elevated churn risk and deploy targeted retention interventions.
        </p>
      </section>

      {/* Summary */}
      <section className="grid gap-6 md:grid-cols-3">
        <div className="saas-metric-card">
          <p className="metric-label">High Risk</p>
          <p className="metric-value mt-3 text-red-600">12</p>
          <p className="metric-detail mt-2">Immediate action needed</p>
        </div>
        <div className="saas-metric-card">
          <p className="metric-label">Medium Risk</p>
          <p className="metric-value mt-3 text-amber-600">18</p>
          <p className="metric-detail mt-2">Monitor closely</p>
        </div>
        <div className="saas-metric-card">
          <p className="metric-label">Projected Impact</p>
          <p className="metric-value mt-3">$98,080</p>
          <p className="metric-detail mt-2">If risk mitigated</p>
        </div>
      </section>

      {/* High Risk Residents */}
      <section>
        <h3 className="mb-4 text-lg font-semibold text-slate-900">High Risk Residents</h3>
        <div className="space-y-4">
          {mockChurnRisk.high_risk.map((resident) => (
            <div key={resident.id} className="saas-card saas-card:hover">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-red-600">
                      <AlertCircle className="h-5 w-5" strokeWidth={2} />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-slate-900">{resident.name}</h4>
                      <p className="text-sm text-slate-600">Unit {resident.unit} • {resident.last_interaction}</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 grid gap-4 md:grid-cols-3">
                    {resident.drivers.map((driver) => (
                      <div key={driver.label} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-slate-900">{driver.label}</p>
                          <p className="text-xs font-semibold text-teal-600">{driver.weight}%</p>
                        </div>
                        <Progress className="mt-3" value={driver.weight} />
                        <p className="mt-2 text-sm text-slate-700">{driver.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4">
                    <p className="text-sm font-medium text-slate-900">Suggested Intervention</p>
                    <p className="mt-1 text-sm text-slate-700">{resident.suggested_intervention}</p>
                  </div>
                </div>

                <div className="ml-6 text-right">
                  <p className="text-4xl font-semibold tracking-tight text-slate-900">{resident.score}</p>
                  <Badge className="mt-2 border-red-200 bg-red-50 text-red-700" variant="secondary">
                    {resident.level}
                  </Badge>
                  <Button className="mt-4 h-9 w-full rounded-lg" size="sm">
                    Deploy Intervention
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Medium Risk */}
      <section>
        <h3 className="mb-4 text-lg font-semibold text-slate-900">Medium Risk Residents</h3>
        <div className="space-y-4">
          {mockChurnRisk.medium_risk.map((resident) => (
            <div key={resident.id} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-semibold text-slate-900">{resident.name}</h4>
                  <p className="text-sm text-slate-600">Unit {resident.unit} • {resident.suggested_intervention}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-semibold text-slate-900">{resident.score}</p>
                  <Badge className="mt-1 border-amber-200 bg-amber-50 text-amber-700" variant="secondary">
                    Medium
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
