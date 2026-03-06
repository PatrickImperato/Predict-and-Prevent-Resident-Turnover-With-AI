import { ArrowRight, TrendingUp, DollarSign, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { computePortfolioAnalytics, getPropertyPerformance, PORTFOLIO_TOTALS, AT_RISK_RESIDENTS_WITH_SCORES } from "@/lib/demoData";

export default function DashboardPage() {
  // Compute current portfolio metrics
  const analytics = computePortfolioAnalytics();
  const currentMetrics = analytics.current;
  const propertyPerformance = getPropertyPerformance();
  
  // Get top flagged residents (highest risk scores)
  const topFlaggedResidents = AT_RISK_RESIDENTS_WITH_SCORES.slice(0, 5);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: "easeOut" }}
      className="space-y-6" 
      data-testid="dashboard-page-root"
    >
      {/* Header */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Badge className="mb-3 w-fit border-teal-200 bg-teal-50 text-teal-700 hover:bg-teal-50" variant="secondary">
              Seattle Portfolio
            </Badge>
            <h2 className="font-[var(--font-heading)] text-3xl font-semibold tracking-tight text-foreground">
              Portfolio Control Center
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              Real-time retention intelligence across Ballard Commons, Capitol Hill Residences, and Bellevue Skyline Towers.
            </p>
          </div>
          <Button asChild className="h-10 rounded-lg shadow-sm">
            <Link to="/app/admin/analytics">
              View Analytics
              <ArrowRight className="ml-2 h-4 w-4" strokeWidth={1.75} />
            </Link>
          </Button>
        </div>
      </section>

      {/* Portfolio Summary Cards */}
      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.24, delay: 0.04 }}
        >
          <div className="saas-metric-card">
            <p className="metric-label mb-3">Total Units</p>
            <p className="metric-value">{PORTFOLIO_TOTALS.totalUnits}</p>
            <p className="metric-detail mt-2">{PORTFOLIO_TOTALS.occupiedUnits} occupied</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.24, delay: 0.1 }}
        >
          <div className="saas-metric-card">
            <p className="metric-label mb-3">Occupancy Rate</p>
            <p className="metric-value">{((PORTFOLIO_TOTALS.occupiedUnits / PORTFOLIO_TOTALS.totalUnits) * 100).toFixed(1)}%</p>
            <p className="metric-detail mt-2">Across 3 properties</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.24, delay: 0.16 }}
        >
          <div className="saas-metric-card">
            <p className="metric-label mb-3">At-Risk Residents</p>
            <p className="metric-value text-amber-600">{currentMetrics.totalAtRisk}</p>
            <p className="metric-detail mt-2">{currentMetrics.highRisk} high priority</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.24, delay: 0.22 }}
        >
          <div className="saas-metric-card">
            <p className="metric-label mb-3">Interventions Recommended</p>
            <p className="metric-value">{currentMetrics.totalAtRisk}</p>
            <p className="metric-detail mt-2">${currentMetrics.totalCreditsRecommended.toLocaleString()} credits</p>
          </div>
        </motion.div>
      </section>

      {/* Retention ROI Summary */}
      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <div className="saas-metric-card">
          <p className="metric-label mb-3">Credits Deployed</p>
          <p className="metric-value">${currentMetrics.totalCreditsRecommended.toLocaleString()}</p>
          <p className="metric-detail mt-2">Investment</p>
        </div>

        <div className="saas-metric-card">
          <p className="metric-label mb-3">Projected Savings</p>
          <p className="metric-value text-teal-600">${currentMetrics.totalProjectedSavings.toLocaleString()}</p>
          <p className="metric-detail mt-2">Turnover prevention</p>
        </div>

        <div className="saas-metric-card">
          <p className="metric-label mb-3">Net Retention ROI</p>
          <p className="metric-value text-teal-600">${currentMetrics.netRetentionROI.toLocaleString()}</p>
          <p className="metric-detail mt-2">After credits invested</p>
        </div>

        <div className="saas-metric-card">
          <p className="metric-label mb-3">ROI Multiple</p>
          <p className="metric-value text-teal-600">{currentMetrics.roiMultiple}x</p>
          <p className="metric-detail mt-2">Return on investment</p>
        </div>
      </section>

      {/* Property Performance Table */}
      <section>
        <div className="saas-card">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-semibold tracking-tight text-foreground">Property Performance</h3>
            <Badge className="border-border bg-muted text-muted-foreground" variant="secondary">
              {propertyPerformance.length} Properties
            </Badge>
          </div>
          <div className="overflow-hidden rounded-lg border border-border">
            <Table>
              <TableHeader>
                <TableRow className="border-border bg-muted/50">
                  <TableHead className="text-xs font-semibold text-foreground">Property</TableHead>
                  <TableHead className="text-center text-xs font-semibold text-foreground">Units</TableHead>
                  <TableHead className="text-center text-xs font-semibold text-foreground">Occupied</TableHead>
                  <TableHead className="text-center text-xs font-semibold text-foreground">At Risk</TableHead>
                  <TableHead className="text-right text-xs font-semibold text-foreground">Interventions</TableHead>
                  <TableHead className="text-right text-xs font-semibold text-foreground">Projected Savings</TableHead>
                  <TableHead className="text-right text-xs font-semibold text-foreground">Net ROI</TableHead>
                  <TableHead className="text-xs font-semibold text-foreground">Manager</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {propertyPerformance.map((property) => (
                  <TableRow key={property.id} className="border-border hover:bg-muted/30">
                    <TableCell>
                      <Link 
                        className="font-medium text-foreground hover:text-primary" 
                        to={`/app/admin/properties/${property.id}`}
                        data-testid={`property-link-${property.id}`}
                      >
                        <div>
                          <p className="font-semibold">{property.name}</p>
                          <p className="text-xs text-muted-foreground">{property.neighborhood}</p>
                        </div>
                      </Link>
                    </TableCell>
                    <TableCell className="text-center text-foreground">{property.units}</TableCell>
                    <TableCell className="text-center">
                      <div>
                        <p className="font-medium text-foreground">{property.occupied}</p>
                        <p className="text-xs text-muted-foreground">{property.occupancyRate}%</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge 
                        className={`${
                          property.atRiskCount >= 10 ? 'border-red-200 bg-red-50 text-red-700' :
                          property.atRiskCount >= 5 ? 'border-amber-200 bg-amber-50 text-amber-700' :
                          'border-border bg-muted text-muted-foreground'
                        }`}
                        variant="secondary"
                      >
                        {property.atRiskCount}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right text-foreground">{property.interventionsRecommended}</TableCell>
                    <TableCell className="text-right font-medium text-teal-600">
                      ${property.projectedSavings.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right font-semibold text-teal-700">
                      ${property.netROI.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p className="font-medium text-foreground">{property.manager}</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>

      {/* Top Flagged Residents & Insights */}
      <section className="grid gap-5 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <div className="saas-card">
          <h3 className="mb-4 text-lg font-semibold tracking-tight text-foreground">Top Flagged Residents</h3>
          <div className="space-y-3">
            {topFlaggedResidents.map((resident, index) => {
              const property = propertyPerformance.find(p => p.id === resident.propertyId);
              
              return (
                <motion.div
                  key={resident.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.22, delay: 0.3 + index * 0.05 }}
                >
                  <Link
                    className="flex items-center justify-between rounded-lg border border-border bg-muted/40 p-4 transition-all hover:border-primary/50 hover:bg-card hover:shadow-sm active:scale-[0.99]"
                    to={`/app/manager/churn-risk`}
                    data-testid={`flagged-resident-${resident.id}`}
                  >
                    <div>
                      <p className="font-semibold text-foreground">{resident.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {property?.name} • Unit {resident.unit}
                      </p>
                      <p className="mt-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        Primary: {resident.topDriver.name}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-semibold tracking-tight text-foreground">{resident.riskScore}</p>
                      <Badge 
                        className={`mt-1 ${
                          resident.riskScore >= 80 ? 'border-red-200 bg-red-50 text-red-700' :
                          resident.riskScore >= 70 ? 'border-amber-200 bg-amber-50 text-amber-700' :
                          'border-border bg-muted text-muted-foreground'
                        }`}
                        variant="secondary"
                      >
                        {resident.riskScore >= 80 ? 'High' : resident.riskScore >= 70 ? 'Medium' : 'Low'}
                      </Badge>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Platform Impact & Intelligence */}
        <div className="space-y-5">
          {/* Platform Impact */}
          <div className="rounded-xl border-2 border-teal-200 bg-gradient-to-br from-teal-50 to-emerald-50 p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-teal-600 text-white">
                <DollarSign className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground">Platform Business Impact</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  HappyCo Concierge turns operational friction into measurable NOI improvement. Current Seattle portfolio shows <strong className="text-foreground">${currentMetrics.netRetentionROI.toLocaleString()} net retention ROI</strong> with <strong className="text-foreground">{currentMetrics.roiMultiple}x return multiple</strong> on credits deployed.
                </p>
                <div className="mt-4 grid gap-3 grid-cols-2">
                  <div className="rounded-lg border border-teal-200 bg-white p-3">
                    <p className="text-xs font-medium text-muted-foreground">Turnover Savings</p>
                    <p className="mt-1 text-lg font-semibold text-teal-600">${(currentMetrics.totalProjectedSavings / 1000).toFixed(0)}k</p>
                  </div>
                  <div className="rounded-lg border border-teal-200 bg-white p-3">
                    <p className="text-xs font-medium text-muted-foreground">Service Revenue</p>
                    <p className="mt-1 text-lg font-semibold text-teal-600">${(currentMetrics.totalProjectedRevenue / 1000).toFixed(1)}k</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Leading Indicator Intelligence */}
          <div className="rounded-xl border border-teal-200 bg-teal-50 p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-600 text-white">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Leading Indicator Intelligence</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  HappyCo operational signals predict resident friction <strong className="text-foreground">4+ months earlier</strong> than 
                  traditional move-out notices. Maintenance frequency, response time patterns, and sentiment tracking enable proactive interventions with measurable retention ROI.
                </p>
              </div>
            </div>
          </div>

          {/* Churn Model Weights */}
          <div className="saas-card">
            <h3 className="mb-4 text-lg font-semibold tracking-tight text-foreground">Churn Model Weights</h3>
            <div className="space-y-3">
              <div className="rounded-lg border border-border bg-muted/40 p-4">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-foreground">Maintenance Frequency</p>
                  <p className="text-sm font-semibold text-teal-600">35%</p>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">Repeat maintenance requests indicate resident friction</p>
              </div>
              <div className="rounded-lg border border-border bg-muted/40 p-4">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-foreground">Sentiment Decline</p>
                  <p className="text-sm font-semibold text-teal-600">25%</p>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">Detected negative tone in resident interactions</p>
              </div>
              <div className="rounded-lg border border-border bg-muted/40 p-4">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-foreground">Response Time</p>
                  <p className="text-sm font-semibold text-teal-600">20%</p>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">Slow response to requests creates dissatisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
