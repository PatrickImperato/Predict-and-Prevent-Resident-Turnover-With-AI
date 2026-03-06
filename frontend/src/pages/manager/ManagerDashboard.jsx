import { AlertCircle, TrendingUp, DollarSign, Users, ArrowRight, X, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AT_RISK_RESIDENTS_WITH_SCORES, computePortfolioAnalytics, PROPERTIES } from "@/lib/demoData";
import { interventionHistory } from "@/lib/interventionHistory";

export default function ManagerDashboard() {
  const [showOnboarding, setShowOnboarding] = useState(() => {
    // Show onboarding if no interventions deployed yet
    return interventionHistory.getCount() === 0;
  });
  
  // Compute portfolio metrics
  const analytics = computePortfolioAnalytics();
  const currentMetrics = analytics.current;
  
  // Get deployed interventions
  const deployedCount = interventionHistory.getCount();
  const deployedCredits = interventionHistory.getTotalCredits();
  
  // Sort residents by highest ROI impact (projected savings)
  const opportunitiesByROI = [...AT_RISK_RESIDENTS_WITH_SCORES].sort((a, b) => 
    (b.projectedROI?.netROI || 0) - (a.projectedROI?.netROI || 0)
  );
  
  // Get top 5 highest ROI opportunities
  const topOpportunities = opportunitiesByROI.slice(0, 5);
  
  // Get risk distribution
  const highRisk = AT_RISK_RESIDENTS_WITH_SCORES.filter(r => r.riskScore >= 80).length;
  const mediumRisk = AT_RISK_RESIDENTS_WITH_SCORES.filter(r => r.riskScore >= 70 && r.riskScore < 80).length;
  const lowRisk = AT_RISK_RESIDENTS_WITH_SCORES.filter(r => r.riskScore >= 60 && r.riskScore < 70).length;
  
  const getProperty = (propertyId) => {
    return PROPERTIES.find(p => p.id === propertyId);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: "easeOut" }}
      className="space-y-6" 
      data-testid="manager-dashboard-root"
    >
      {/* Header */}
      <section className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <Badge className="mb-3 w-fit border-teal-200 bg-teal-50 text-teal-700 hover:bg-teal-50" variant="secondary">
          Seattle Portfolio
        </Badge>
        <h2 className="font-[var(--font-heading)] text-[28px] font-semibold tracking-tight text-slate-900">
          Retention Operations Workspace
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
          Daily workspace for monitoring at-risk residents, deploying retention interventions, and tracking financial impact across your properties.
        </p>
      </section>

      {/* Manager Onboarding Panel */}
      <AnimatePresence>
        {showOnboarding && (
          <motion.section
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.24 }}
          >
            <div className="rounded-xl border-2 border-teal-200 bg-gradient-to-br from-teal-50 to-emerald-50 p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-teal-600 text-white">
                    <Lightbulb className="h-6 w-6" strokeWidth={2} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900">Getting Started with Retention Intelligence</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-700">
                      Welcome to your retention operations workspace. Here's how to use HappyCo Concierge to reduce churn and increase portfolio NOI:
                    </p>
                    
                    <div className="mt-4 grid gap-3 md:grid-cols-2">
                      <div className="rounded-lg border border-teal-200 bg-white p-4">
                        <p className="text-sm font-semibold text-slate-900">1. Review Highest-ROI Residents</p>
                        <p className="mt-1 text-sm text-slate-700">
                          Opportunities below are sorted by projected net ROI. Start with residents showing the highest financial impact.
                        </p>
                      </div>
                      
                      <div className="rounded-lg border border-teal-200 bg-white p-4">
                        <p className="text-sm font-semibold text-slate-900">2. Understand Friction Drivers</p>
                        <p className="mt-1 text-sm text-slate-700">
                          Each card shows top drivers (maintenance frequency, response time, sentiment) with point contributions to risk score.
                        </p>
                      </div>
                      
                      <div className="rounded-lg border border-teal-200 bg-white p-4">
                        <p className="text-sm font-semibold text-slate-900">3. Deploy Right Intervention Tier</p>
                        <p className="mt-1 text-sm text-slate-700">
                          System recommends Light Touch ($200), Standard ($350), or High Priority ($500) based on risk threshold and friction patterns.
                        </p>
                      </div>
                      
                      <div className="rounded-lg border border-teal-200 bg-white p-4">
                        <p className="text-sm font-semibold text-slate-900">4. Measure Retention ROI</p>
                        <p className="mt-1 text-sm text-slate-700">
                          Track expected savings (turnover prevention), service revenue, and net ROI for each intervention before deploying.
                        </p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <Button asChild size="sm" className="h-9 rounded-lg">
                        <Link to="/app/manager/churn-risk">
                          View Full Risk Queue
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => setShowOnboarding(false)}
                  className="flex-shrink-0 rounded-lg p-2 text-slate-600 transition-colors hover:bg-teal-100 hover:text-slate-900"
                  aria-label="Dismiss onboarding"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Retention Opportunities Section */}
      <section>
        <div className="rounded-xl border-2 border-teal-200 bg-gradient-to-br from-teal-50 to-emerald-50 p-8 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal-600 text-white">
                <TrendingUp className="h-6 w-6" strokeWidth={2} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Retention Opportunities</h3>
                <p className="text-sm text-slate-700">Highest impact interventions for your portfolio</p>
              </div>
            </div>
            <Button asChild className="h-10 rounded-lg shadow-sm">
              <Link to="/app/manager/churn-risk">
                View All Residents
                <ArrowRight className="ml-2 h-4 w-4" strokeWidth={1.75} />
              </Link>
            </Button>
          </div>

          {/* Summary Cards */}
          <div className="mb-6 grid gap-4 md:grid-cols-5">
            <div className="rounded-lg border border-teal-200 bg-white p-4">
              <p className="text-xs font-medium text-slate-600">At-Risk Residents</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">{currentMetrics.totalAtRisk}</p>
              <p className="mt-1 text-xs text-slate-600">{currentMetrics.highRisk} high priority</p>
            </div>

            <div className="rounded-lg border border-teal-200 bg-white p-4">
              <p className="text-xs font-medium text-slate-600">Credits Recommended</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">${(currentMetrics.totalCreditsRecommended / 1000).toFixed(1)}k</p>
              <p className="mt-1 text-xs text-slate-600">Investment needed</p>
            </div>

            <div className="rounded-lg border border-teal-200 bg-white p-4">
              <p className="text-xs font-medium text-slate-600">Projected Savings</p>
              <p className="mt-2 text-2xl font-semibold text-teal-600">${(currentMetrics.totalProjectedSavings / 1000).toFixed(1)}k</p>
              <p className="mt-1 text-xs text-slate-600">Turnover prevention</p>
            </div>

            <div className="rounded-lg border border-teal-200 bg-white p-4">
              <p className="text-xs font-medium text-slate-600">Net ROI</p>
              <p className="mt-2 text-2xl font-semibold text-teal-700">${(currentMetrics.netRetentionROI / 1000).toFixed(1)}k</p>
              <p className="mt-1 text-xs text-slate-600">After credits</p>
            </div>

            <div className="rounded-lg border border-teal-200 bg-white p-4">
              <p className="text-xs font-medium text-slate-600">ROI Multiple</p>
              <p className="mt-2 text-2xl font-semibold text-teal-700">{currentMetrics.roiMultiple}x</p>
              <p className="mt-1 text-xs text-slate-600">Return on investment</p>
            </div>
          </div>

          {/* Highest Impact Residents */}
          <div>
            <p className="mb-4 text-sm font-semibold text-slate-700">Highest ROI Impact Residents (sorted by projected net ROI)</p>
            <div className="space-y-3">
              {topOpportunities.map((resident, index) => {
                const property = getProperty(resident.propertyId);
                
                return (
                  <motion.div
                    key={resident.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.22, delay: index * 0.05 }}
                  >
                    <Link
                      to="/app/manager/churn-risk"
                      className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-5 transition-all hover:border-teal-300 hover:shadow-md active:scale-[0.99]"
                      data-testid={`opportunity-card-${resident.id}`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                          <AlertCircle className={`h-5 w-5 ${
                            resident.riskScore >= 80 ? 'text-red-600' :
                            resident.riskScore >= 70 ? 'text-amber-600' :
                            'text-slate-600'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <p className="font-semibold text-slate-900">{resident.name}</p>
                            <Badge className="text-xs">{resident.riskScore}</Badge>
                          </div>
                          <p className="mt-1 text-sm text-slate-600">
                            {property?.name} • Unit {resident.unit} • {resident.frictionSignals.daysToLeaseEnd} days to lease end
                          </p>
                          
                          {/* Top Drivers */}
                          <div className="mt-3 flex flex-wrap gap-2">
                            {resident.riskDrivers.slice(0, 2).map((driver) => (
                              <div key={driver.name} className="flex items-center gap-2 rounded-md bg-slate-100 px-2 py-1">
                                <p className="text-xs font-medium text-slate-700">{driver.name}</p>
                                <p className="text-xs font-semibold text-slate-900">{driver.contribution} pts</p>
                              </div>
                            ))}
                          </div>

                          {/* Intervention & ROI */}
                          <div className="mt-3 flex items-center gap-4 text-sm">
                            <div>
                              <p className="text-xs text-slate-600">Recommended</p>
                              <p className="font-semibold text-slate-900">
                                {resident.recommendedIntervention.label} • ${resident.recommendedIntervention.creditOffer}
                              </p>
                            </div>
                            <div className="h-4 w-px bg-slate-300"></div>
                            <div>
                              <p className="text-xs text-slate-600">Expected Savings</p>
                              <p className="font-semibold text-teal-600">
                                ${resident.projectedROI.expectedSavings.toLocaleString()}
                              </p>
                            </div>
                            <div className="h-4 w-px bg-slate-300"></div>
                            <div>
                              <p className="text-xs text-slate-600">Net ROI</p>
                              <p className="font-semibold text-teal-700">
                                ${resident.projectedROI.netROI.toLocaleString()} ({resident.projectedROI.roiMultiple}x)
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="ml-4">
                        <Button className="h-9 rounded-lg" size="sm">
                          Deploy
                        </Button>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Risk Distribution & Quick Stats */}
      <section className="grid gap-6 md:grid-cols-2">
        {/* Churn Risk Distribution */}
        <div className="saas-card">
          <h3 className="mb-6 text-lg font-semibold tracking-tight text-slate-900">Portfolio Risk Distribution</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-900">High Risk</p>
                <p className="text-sm font-semibold text-slate-900">{highRisk} residents</p>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                <div 
                  className="h-full rounded-full bg-red-500"
                  style={{ width: `${(highRisk / currentMetrics.totalAtRisk) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-900">Medium Risk</p>
                <p className="text-sm font-semibold text-slate-900">{mediumRisk} residents</p>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                <div 
                  className="h-full rounded-full bg-amber-500"
                  style={{ width: `${(mediumRisk / currentMetrics.totalAtRisk) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-900">Low Risk</p>
                <p className="text-sm font-semibold text-slate-900">{lowRisk} residents</p>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                <div 
                  className="h-full rounded-full bg-slate-400"
                  style={{ width: `${(lowRisk / currentMetrics.totalAtRisk) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Property Coverage */}
        <div className="saas-card">
          <h3 className="mb-6 text-lg font-semibold tracking-tight text-slate-900">Property Coverage</h3>
          <div className="space-y-3">
            {PROPERTIES.map((property) => {
              const propertyResidents = AT_RISK_RESIDENTS_WITH_SCORES.filter(r => r.propertyId === property.id);
              
              return (
                <div key={property.id} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-slate-900">{property.name}</p>
                      <p className="text-sm text-slate-600">{property.neighborhood}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-semibold text-slate-900">{propertyResidents.length}</p>
                      <p className="text-xs text-slate-600">at-risk</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
