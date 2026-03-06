import { motion } from "framer-motion";
import { TrendingUp, DollarSign, Users, BarChart3 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { TrendLineChart, DistributionBarChart, ComparisonLineChart } from "@/components/charts/SaaSCharts";
import { PORTFOLIO_ANALYTICS, calculateRetentionROI } from "@/lib/demoData";

export default function AdminAnalytics() {
  // Calculate current metrics
  const currentMetrics = calculateRetentionROI(8, 268, 12600);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: "easeOut" }}
      className="space-y-6"
    >
      {/* Header */}
      <section className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <Badge className="mb-3 w-fit border-teal-200 bg-teal-50 text-teal-700 hover:bg-teal-50" variant="secondary">
          Portfolio Analytics
        </Badge>
        <h2 className="font-[var(--font-heading)] text-[28px] font-semibold tracking-tight text-slate-900">
          Retention Performance Analytics
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
          Track retention ROI, churn prevention effectiveness, and service revenue across your entire portfolio.
        </p>
      </section>

      {/* Summary Metrics */}
      <section className="grid gap-5 md:grid-cols-4">
        <div className="saas-metric-card">
          <p className="metric-label">Current ROI</p>
          <p className="metric-value mt-3">${currentMetrics.retentionROI.toLocaleString()}</p>
          <p className="metric-detail mt-2">+3.2% vs last month</p>
        </div>
        <div className="saas-metric-card">
          <p className="metric-label">Retention Savings</p>
          <p className="metric-value mt-3">${currentMetrics.retentionSavings.toLocaleString()}</p>
          <p className="metric-detail mt-2">8 turnovers avoided</p>
        </div>
        <div className="saas-metric-card">
          <p className="metric-label">Service Revenue</p>
          <p className="metric-value mt-3">${currentMetrics.conciergeRevenue.toLocaleString()}</p>
          <p className="metric-detail mt-2">268 bookings</p>
        </div>
        <div className="saas-metric-card">
          <p className="metric-label">ROI Multiple</p>
          <p className="metric-value mt-3">{currentMetrics.roiMultiple.toFixed(2)}x</p>
          <p className="metric-detail mt-2">Return on investment</p>
        </div>
      </section>

      {/* Charts Grid */}
      <section className="grid gap-5 xl:grid-cols-2">
        <TrendLineChart 
          data={PORTFOLIO_ANALYTICS.retentionROI}
          dataKey="value"
          title="Retention ROI Trend"
          yAxisFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
        />
        
        <TrendLineChart 
          data={PORTFOLIO_ANALYTICS.retentionSavings}
          dataKey="value"
          title="Monthly Retention Savings"
          yAxisFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
        />
      </section>

      <section className="grid gap-5 xl:grid-cols-2">
        <TrendLineChart 
          data={PORTFOLIO_ANALYTICS.turnoversAvoided}
          dataKey="turnovers"
          title="Turnover Avoidance Trend"
          yAxisFormatter={(v) => v}
        />
        
        <TrendLineChart 
          data={PORTFOLIO_ANALYTICS.serviceRevenue}
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
            {PORTFOLIO_ANALYTICS.churnRiskDistribution.map((item) => (
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
    </motion.div>
  );
}
