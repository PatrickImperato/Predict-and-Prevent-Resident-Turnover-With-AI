import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { TrendLineChart } from "@/components/charts/SaaSCharts";
import { PORTFOLIO_TOTALS, CANONICAL_PROPERTIES, CANONICAL_RESIDENTS } from "@/lib/canonicalData";

export default function AdminAnalytics() {
  // Use canonical portfolio totals and data
  const currentMetrics = {
    netRetentionROI: PORTFOLIO_TOTALS.portfolioROI,
    totalProjectedSavings: PORTFOLIO_TOTALS.totalProjectedSavings,
    totalProjectedRevenue: PORTFOLIO_TOTALS.totalServiceRevenue,
    totalCreditsRecommended: PORTFOLIO_TOTALS.totalCreditsInvested,
    totalAtRisk: PORTFOLIO_TOTALS.totalAtRisk,
    roiMultiple: PORTFOLIO_TOTALS.roiMultiple,
    avgTurnoverCost: 3800, // Average across properties
    highRisk: CANONICAL_RESIDENTS.filter(r => r.riskTier === "high").length
  };

  // Mock trends data (would ideally come from historical data)
  const trends = {
    retentionROI: [
      { month: "Oct", value: 75000 },
      { month: "Nov", value: 82000 },
      { month: "Dec", value: 88000 },
      { month: "Jan", value: 92000 },
      { month: "Feb", value: 94000 },
      { month: "Mar", value: PORTFOLIO_TOTALS.portfolioROI }
    ],
    retentionSavings: [
      { month: "Oct", value: 85000 },
      { month: "Nov", value: 88000 },
      { month: "Dec", value: 91000 },
      { month: "Jan", value: 93000 },
      { month: "Feb", value: 96000 },
      { month: "Mar", value: PORTFOLIO_TOTALS.totalProjectedSavings }
    ],
    turnoversAvoided: [
      { month: "Oct", turnovers: 10 },
      { month: "Nov", turnovers: 11 },
      { month: "Dec", turnovers: 12 },
      { month: "Jan", turnovers: 11 },
      { month: "Feb", turnovers: 12 },
      { month: "Mar", turnovers: PORTFOLIO_TOTALS.totalAvoidedTurnovers }
    ],
    serviceRevenue: [
      { month: "Oct", value: 4800 },
      { month: "Nov", value: 5100 },
      { month: "Dec", value: 5400 },
      { month: "Jan", value: 5300 },
      { month: "Feb", value: 5500 },
      { month: "Mar", value: PORTFOLIO_TOTALS.totalServiceRevenue }
    ]
  };

  const riskDistribution = [
    { 
      level: "High Risk", 
      count: CANONICAL_RESIDENTS.filter(r => r.riskTier === "high").length,
      percentage: Math.round((CANONICAL_RESIDENTS.filter(r => r.riskTier === "high").length / CANONICAL_RESIDENTS.length) * 100)
    },
    { 
      level: "Medium Risk", 
      count: CANONICAL_RESIDENTS.filter(r => r.riskTier === "medium").length,
      percentage: Math.round((CANONICAL_RESIDENTS.filter(r => r.riskTier === "medium").length / CANONICAL_RESIDENTS.length) * 100)
    },
    { 
      level: "Low Risk", 
      count: CANONICAL_RESIDENTS.filter(r => r.riskTier === "low").length,
      percentage: Math.round((CANONICAL_RESIDENTS.filter(r => r.riskTier === "low").length / CANONICAL_RESIDENTS.length) * 100)
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: "easeOut" }}
      className="space-y-6"
      data-testid="admin-analytics-page"
    >
      {/* Header */}
      <section className="rounded-lg border border-border/60 bg-card p-6 shadow-sm">
        <Badge className="mb-3 w-fit border-teal-200 bg-teal-50 text-teal-700 hover:bg-teal-50" variant="secondary">
          Portfolio Analytics
        </Badge>
        <h2 className="font-[var(--font-heading)] text-3xl font-semibold tracking-[-0.02em] text-foreground">
          Portfolio Performance
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Track retention ROI, churn prevention effectiveness, and service revenue across {CANONICAL_PROPERTIES.map(p => p.shortName).join(", ")}.
        </p>
      </section>

      {/* Summary Metrics */}
      <section className="grid gap-5 md:grid-cols-4">
        <div className="saas-metric-card">
          <p className="metric-label">Current Net ROI</p>
          <p className="metric-value mt-3">${currentMetrics.netRetentionROI.toLocaleString()}</p>
          <p className="metric-detail mt-2">{currentMetrics.roiMultiple.toFixed(1)}x return multiple</p>
        </div>
        <div className="saas-metric-card">
          <p className="metric-label">Projected Savings</p>
          <p className="metric-value mt-3">${currentMetrics.totalProjectedSavings.toLocaleString()}</p>
          <p className="metric-detail mt-2">From {currentMetrics.totalAtRisk} interventions</p>
        </div>
        <div className="saas-metric-card">
          <p className="metric-label">Service Revenue</p>
          <p className="metric-value mt-3">${currentMetrics.totalProjectedRevenue.toLocaleString()}</p>
          <p className="metric-detail mt-2">Expected bookings</p>
        </div>
        <div className="saas-metric-card">
          <p className="metric-label">Credits Invested</p>
          <p className="metric-value mt-3">${currentMetrics.totalCreditsRecommended.toLocaleString()}</p>
          <p className="metric-detail mt-2">Investment across portfolio</p>
        </div>
      </section>

      {/* Charts Grid */}
      <section className="grid gap-5 xl:grid-cols-2">
        <TrendLineChart 
          data={trends.retentionROI}
          dataKey="value"
          title="Portfolio Retention ROI Trend"
          yAxisFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
        />
        
        <TrendLineChart 
          data={trends.retentionSavings}
          dataKey="value"
          title="Monthly Retention Savings"
          yAxisFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
        />
      </section>

      <section className="grid gap-5 xl:grid-cols-2">
        <TrendLineChart 
          data={trends.turnoversAvoided}
          dataKey="turnovers"
          title="Turnover Avoidance Trend"
          yAxisFormatter={(v) => v}
        />
        
        <TrendLineChart 
          data={trends.serviceRevenue}
          dataKey="value"
          title="Service Revenue Trend"
          yAxisFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
        />
      </section>

      {/* Churn Risk Distribution */}
      <section>
        <div className="saas-card">
          <h3 className="mb-6 text-lg font-semibold tracking-tight text-slate-900">Portfolio Churn Risk Distribution</h3>
          <div className="space-y-4">
            {riskDistribution.map((item) => (
              <div key={item.level}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <p className="text-sm font-medium text-slate-900">{item.level}</p>
                    <Badge 
                      className={`${
                        item.level.includes('High') ? 'border-red-200 bg-red-50 text-red-700' :
                        item.level.includes('Medium') ? 'border-amber-200 bg-amber-50 text-amber-700' :
                        'border-slate-200 bg-slate-50 text-slate-700'
                      }`}
                      variant="secondary"
                    >
                      {item.percentage}%
                    </Badge>
                  </div>
                  <p className="text-sm font-semibold text-slate-900">{item.count} residents</p>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div 
                    className={`h-full rounded-full ${
                      item.level.includes('High') ? 'bg-red-500' : 
                      item.level.includes('Medium') ? 'bg-amber-500' : 
                      'bg-slate-400'
                    }`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Operational Insight */}
      <section>
        <div className="rounded-xl border-2 border-teal-200 bg-gradient-to-br from-teal-50 to-emerald-50 p-8 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-teal-600 text-white">
              <TrendingUp className="h-6 w-6" strokeWidth={2} />
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-slate-900">Churn as a Leading Indicator</h4>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                Traditional churn detection happens <strong>too late</strong>—when residents give move-out notice, intervention options are limited and costly. 
                HappyCo Concierge transforms resident friction from a lagging indicator into a leading indicator by analyzing operational signals 
                <strong> 4+ months earlier</strong> than traditional methods.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                The current portfolio demonstrates this approach: <strong>{currentMetrics.totalAtRisk} residents</strong> are flagged for friction-based churn risk 
                using maintenance frequency, response time patterns, and sentiment tracking. Proactive interventions targeting these residents project 
                <strong> ${currentMetrics.totalProjectedSavings.toLocaleString()} in turnover prevention savings</strong>, with a <strong>{currentMetrics.roiMultiple.toFixed(1)}x return</strong> on credits deployed.
              </p>
              
              <div className="mt-6 grid gap-4 md:grid-cols-4">
                <div className="rounded-lg border-2 border-teal-200 bg-white p-4">
                  <p className="text-xs font-medium text-slate-600">Avg Turnover Cost</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900">${currentMetrics.avgTurnoverCost.toLocaleString()}</p>
                  <p className="mt-1 text-xs text-slate-500">Per unit</p>
                </div>
                <div className="rounded-lg border-2 border-teal-200 bg-white p-4">
                  <p className="text-xs font-medium text-slate-600">Early Detection Window</p>
                  <p className="mt-2 text-2xl font-semibold text-teal-600">120+</p>
                  <p className="mt-1 text-xs text-slate-500">Days avg advance notice</p>
                </div>
                <div className="rounded-lg border-2 border-teal-200 bg-white p-4">
                  <p className="text-xs font-medium text-slate-600">High Priority Residents</p>
                  <p className="mt-2 text-2xl font-semibold text-red-600">{currentMetrics.highRisk}</p>
                  <p className="mt-1 text-xs text-slate-500">Immediate action needed</p>
                </div>
                <div className="rounded-lg border-2 border-teal-200 bg-white p-4">
                  <p className="text-xs font-medium text-slate-600">Intervention Success Rate</p>
                  <p className="mt-2 text-2xl font-semibold text-teal-600">68%</p>
                  <p className="mt-1 text-xs text-slate-500">Residents re-engage</p>
                </div>
              </div>

              <div className="mt-4 rounded-lg border border-teal-200 bg-teal-100/50 p-4">
                <p className="text-sm font-medium text-slate-700">
                  <strong>Built on HappyCo operational data.</strong> No new integrations. Maintenance history, response times, 
                  and service interactions already tracked by HappyCo become predictive retention signals—turning existing data into measurable NOI improvement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
