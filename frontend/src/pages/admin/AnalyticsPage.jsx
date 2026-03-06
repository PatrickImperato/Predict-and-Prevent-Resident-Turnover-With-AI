import { motion } from "framer-motion";
import { TrendingUp, DollarSign, Users, BarChart3 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { TrendLineChart, DistributionBarChart, ComparisonLineChart } from "@/components/charts/SaaSCharts";
import { computePortfolioAnalytics } from "@/lib/demoData";

export default function AdminAnalytics() {
  // Calculate current metrics from Seattle portfolio
  const analytics = computePortfolioAnalytics();
  const currentMetrics = analytics.current;
  const trends = analytics.trends;
  const riskDistribution = analytics.riskDistribution;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: "easeOut" }}
      className="space-y-6"
      data-testid="admin-analytics-page"
    >
      {/* Header */}
      <section className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <Badge className="mb-3 w-fit border-teal-200 bg-teal-50 text-teal-700 hover:bg-teal-50" variant="secondary">
          Portfolio Analytics
        </Badge>
        <h2 className="font-[var(--font-heading)] text-[28px] font-semibold tracking-tight text-slate-900">
          Seattle Portfolio Performance
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
          Track retention ROI, churn prevention effectiveness, and service revenue across Ballard Commons, 
          Capitol Hill Residences, and Bellevue Skyline Towers.
        </p>
      </section>

      {/* Summary Metrics */}
      <section className="grid gap-5 md:grid-cols-4">
        <div className="saas-metric-card">
          <p className="metric-label">Current Net ROI</p>
          <p className="metric-value mt-3">${currentMetrics.netRetentionROI.toLocaleString()}</p>
          <p className="metric-detail mt-2">{currentMetrics.roiMultiple}x return multiple</p>
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
          <p className="metric-label">Credits Recommended</p>
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
        <div className="rounded-xl border border-teal-200 bg-teal-50 p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-600 text-white">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-slate-900">Leading Indicator Performance</h4>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                Seattle portfolio churn prediction leverages HappyCo operational signals to identify resident friction 
                <strong> {Math.round((currentMetrics.totalAtRisk / 282) * 365)} days earlier</strong> than traditional 
                move-out notices. Maintenance frequency, response time patterns, and sentiment tracking enable proactive 
                interventions with measurable retention ROI.
              </p>
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                <div className="rounded-lg border border-teal-200 bg-white p-4">
                  <p className="text-xs font-medium text-slate-600">Avg Turnover Cost</p>
                  <p className="mt-1 text-lg font-semibold text-slate-900">${currentMetrics.avgTurnoverCost.toLocaleString()}</p>
                  <p className="mt-1 text-xs text-slate-500">Seattle market</p>
                </div>
                <div className="rounded-lg border border-teal-200 bg-white p-4">
                  <p className="text-xs font-medium text-slate-600">At-Risk Detection</p>
                  <p className="mt-1 text-lg font-semibold text-slate-900">{currentMetrics.totalAtRisk}</p>
                  <p className="mt-1 text-xs text-slate-500">Across 3 properties</p>
                </div>
                <div className="rounded-lg border border-teal-200 bg-white p-4">
                  <p className="text-xs font-medium text-slate-600">High Priority</p>
                  <p className="mt-1 text-lg font-semibold text-red-600">{currentMetrics.highRisk}</p>
                  <p className="mt-1 text-xs text-slate-500">Immediate action</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
