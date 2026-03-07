import { ArrowRight, TrendingUp, DollarSign, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  CANONICAL_PROPERTIES, 
  CANONICAL_RESIDENTS, 
  PORTFOLIO_TOTALS 
} from "@/lib/canonicalData";

export default function DashboardPage() {
  // Use canonical data
  const flagshipProperty = CANONICAL_PROPERTIES.find(p => p.isFlagship);
  const topFlaggedResidents = CANONICAL_RESIDENTS.filter(r => r.riskScore >= 68).slice(0, 5);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: "easeOut" }}
      className="space-y-6" 
      data-testid="dashboard-page-root"
    >
      {/* Header */}
      <section className="rounded-lg border border-border/60 bg-card p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Badge className="mb-3 w-fit border-teal-200 bg-teal-50 text-teal-700 hover:bg-teal-50" variant="secondary">
              Portfolio Overview
            </Badge>
            <h2 className="font-[var(--font-heading)] text-3xl font-semibold tracking-[-0.02em] text-foreground">
              Portfolio Control Center
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              Real-time retention intelligence across {CANONICAL_PROPERTIES.map(p => p.shortName).join(", ")}.
            </p>
          </div>
          <Button asChild className="h-9 px-4 text-sm shadow-sm">
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
            <p className="metric-value">{PORTFOLIO_TOTALS.occupancyRate.toFixed(1)}%</p>
            <p className="metric-detail mt-2">Across {PORTFOLIO_TOTALS.totalProperties} properties</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.24, delay: 0.16 }}
        >
          <div className="saas-metric-card">
            <p className="metric-label mb-3">At-Risk Residents</p>
            <p className="metric-value text-amber-600">{PORTFOLIO_TOTALS.totalAtRisk}</p>
            <p className="metric-detail mt-2">Require attention</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.24, delay: 0.22 }}
        >
          <div className="saas-metric-card">
            <p className="metric-label mb-3">Projected Savings</p>
            <p className="metric-value text-teal-600">${PORTFOLIO_TOTALS.totalProjectedSavings.toLocaleString()}</p>
            <p className="metric-detail mt-2">Turnover avoidance</p>
          </div>
        </motion.div>
      </section>

      {/* Retention ROI Summary */}
      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <div className="saas-metric-card">
          <p className="metric-label mb-3">Credits Invested</p>
          <p className="metric-value">${PORTFOLIO_TOTALS.totalCreditsInvested.toLocaleString()}</p>
          <p className="metric-detail mt-2">Monthly investment</p>
        </div>

        <div className="saas-metric-card">
          <p className="metric-label mb-3">Service Revenue</p>
          <p className="metric-value text-teal-600">${PORTFOLIO_TOTALS.totalServiceRevenue.toLocaleString()}</p>
          <p className="metric-detail mt-2">Monthly projection</p>
        </div>

        <div className="saas-metric-card">
          <p className="metric-label mb-3">Portfolio ROI</p>
          <p className="metric-value text-teal-600">${PORTFOLIO_TOTALS.portfolioROI.toLocaleString()}</p>
          <p className="metric-detail mt-2">Net monthly impact</p>
        </div>

        <div className="saas-metric-card">
          <p className="metric-label mb-3">ROI Multiple</p>
          <p className="metric-value text-teal-600">{PORTFOLIO_TOTALS.roiMultiple.toFixed(1)}x</p>
          <p className="metric-detail mt-2">Return on investment</p>
        </div>
      </section>

      {/* Property Performance Table */}
      <section>
        <div className="saas-card">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-semibold tracking-tight text-foreground">Property Performance</h3>
            <Badge className="border-border bg-muted text-muted-foreground" variant="secondary">
              {CANONICAL_PROPERTIES.length} Properties
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
                  <TableHead className="text-right text-xs font-semibold text-foreground">Annual ROI</TableHead>
                  <TableHead className="text-right text-xs font-semibold text-foreground">Monthly Credits</TableHead>
                  <TableHead className="text-xs font-semibold text-foreground">Manager</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {CANONICAL_PROPERTIES.map((property) => (
                  <TableRow key={property.id} className="border-border hover:bg-muted/30">
                    <TableCell>
                      <Link 
                        className="font-medium text-foreground hover:text-primary" 
                        to={`/app/admin/properties/${property.id}`}
                        data-testid={`property-link-${property.id}`}
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-semibold">{property.shortName}</p>
                            {property.isFlagship && (
                              <Badge className="text-xs border-teal-200 bg-teal-50 text-teal-700" variant="secondary">
                                Flagship
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">{property.address.city}, {property.address.state}</p>
                        </div>
                      </Link>
                    </TableCell>
                    <TableCell className="text-center text-foreground">{property.totalUnits}</TableCell>
                    <TableCell className="text-center">
                      <div>
                        <p className="font-medium text-foreground">{property.occupiedUnits}</p>
                        <p className="text-xs text-muted-foreground">{property.occupancyRate.toFixed(1)}%</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge 
                        className={`${
                          property.atRiskResidents >= 10 ? 'border-red-200 bg-red-50 text-red-700' :
                          property.atRiskResidents >= 5 ? 'border-amber-200 bg-amber-50 text-amber-700' :
                          'border-border bg-muted text-muted-foreground'
                        }`}
                        variant="secondary"
                      >
                        {property.atRiskResidents}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium text-teal-600">
                      ${property.estimatedAnnualROI.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right font-medium text-foreground">
                      ${property.creditsInvestedPerMonth}
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
              const property = CANONICAL_PROPERTIES.find(p => p.id === resident.propertyId);
              
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
                      <p className="font-semibold text-foreground">{resident.fullName}</p>
                      <p className="text-sm text-muted-foreground">
                        {property?.shortName} • Unit {resident.unit}
                      </p>
                      <p className="mt-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        Primary: {resident.primaryDriver}
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
                        {resident.riskTier}
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
                  HappyCo Concierge turns operational friction into measurable NOI improvement. Current portfolio shows <strong className="text-foreground">${PORTFOLIO_TOTALS.portfolioROI.toLocaleString()} net retention ROI</strong> with <strong className="text-foreground">{PORTFOLIO_TOTALS.roiMultiple.toFixed(1)}x return multiple</strong> on credits deployed.
                </p>
                <div className="mt-4 grid gap-3 grid-cols-2">
                  <div className="rounded-lg border border-teal-200 bg-white p-3">
                    <p className="text-xs font-medium text-muted-foreground">Turnover Savings</p>
                    <p className="mt-1 text-lg font-semibold text-teal-600">${(PORTFOLIO_TOTALS.totalProjectedSavings / 1000).toFixed(0)}k</p>
                  </div>
                  <div className="rounded-lg border border-teal-200 bg-white p-3">
                    <p className="text-xs font-medium text-muted-foreground">Service Revenue</p>
                    <p className="mt-1 text-lg font-semibold text-teal-600">${(PORTFOLIO_TOTALS.totalServiceRevenue / 1000).toFixed(1)}k</p>
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

          {/* Flagship Property Callout */}
          {flagshipProperty && (
            <div className="saas-card">
              <h3 className="mb-4 text-lg font-semibold tracking-tight text-foreground">Flagship Property</h3>
              <div className="space-y-3">
                <div className="rounded-lg border border-border bg-muted/40 p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-foreground">{flagshipProperty.shortName}</p>
                    <Badge className="border-teal-200 bg-teal-50 text-teal-700" variant="secondary">
                      Flagship
                    </Badge>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {flagshipProperty.address.city}, {flagshipProperty.address.state} • {flagshipProperty.totalUnits} units
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Full operational depth with unit records, resident assignment, interventions, and provider bookings.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </motion.div>
  );
}
