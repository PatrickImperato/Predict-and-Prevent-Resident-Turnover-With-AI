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
                The Seattle portfolio demonstrates this approach: <strong>{currentMetrics.totalAtRisk} residents</strong> are flagged for friction-based churn risk 
                using maintenance frequency, response time patterns, and sentiment tracking. Proactive interventions targeting these residents project 
                <strong> ${currentMetrics.totalProjectedSavings.toLocaleString()} in turnover prevention savings</strong>, with a <strong>{currentMetrics.roiMultiple}x return</strong> on credits deployed.
              </p>
              
              <div className="mt-6 grid gap-4 md:grid-cols-4">
                <div className="rounded-lg border-2 border-teal-200 bg-white p-4">
                  <p className="text-xs font-medium text-slate-600">Avg Seattle Turnover Cost</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900">${currentMetrics.avgTurnoverCost.toLocaleString()}</p>
                  <p className="mt-1 text-xs text-slate-500">Per unit</p>
                </div>
                <div className="rounded-lg border-2 border-teal-200 bg-white p-4">
                  <p className="text-xs font-medium text-slate-600">Early Detection Window</p>
                  <p className="mt-2 text-2xl font-semibold text-teal-600">132</p>
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
