import { useState } from "react";
import { AlertCircle, TrendingUp, ChevronDown, ChevronUp, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AT_RISK_RESIDENTS_WITH_SCORES, PROPERTIES } from "@/lib/demoData";
import { interventionHistory } from "@/lib/interventionHistory";

export default function ManagerChurnRisk() {
  const [expandedResidentId, setExpandedResidentId] = useState(null);
  const [deployedInterventions, setDeployedInterventions] = useState(() => {
    // Initialize from sessionStorage
    const deployed = new Set();
    interventionHistory.getAll().forEach(entry => {
      deployed.add(entry.residentId);
    });
    return deployed;
  });
  
  // Filter residents by risk level
  const highRiskResidents = AT_RISK_RESIDENTS_WITH_SCORES.filter(r => r.riskScore >= 80);
  const mediumRiskResidents = AT_RISK_RESIDENTS_WITH_SCORES.filter(r => r.riskScore >= 70 && r.riskScore < 80);
  const lowRiskResidents = AT_RISK_RESIDENTS_WITH_SCORES.filter(r => r.riskScore >= 60 && r.riskScore < 70);
  
  // Calculate projected impact
  const totalProjectedSavings = AT_RISK_RESIDENTS_WITH_SCORES.reduce((sum, r) => 
    sum + (r.projectedROI?.expectedSavings || 0), 0
  );
  
  const toggleExpanded = (residentId) => {
    setExpandedResidentId(expandedResidentId === residentId ? null : residentId);
  };
  
  const handleDeployIntervention = (resident) => {
    const property = getProperty(resident.propertyId);
    
    // Add to intervention history
    const deployment = interventionHistory.add({
      residentId: resident.id,
      residentName: resident.name,
      propertyId: resident.propertyId,
      propertyName: property?.name || 'Unknown Property',
      unit: resident.unit,
      tier: resident.recommendedIntervention.tier,
      tierLabel: resident.recommendedIntervention.label,
      creditAmount: resident.recommendedIntervention.creditOffer,
      riskScore: resident.riskScore,
      topDriver: resident.topDriver.name,
      expectedSavings: resident.projectedROI.expectedSavings,
      expectedRevenue: resident.projectedROI.expectedRevenue,
      netROI: resident.projectedROI.netROI,
      roiMultiple: resident.projectedROI.roiMultiple
    });
    
    if (deployment) {
      // Update UI state
      setDeployedInterventions(prev => new Set([...prev, resident.id]));
      
      // Show success toast
      toast.success("Intervention Deployed", {
        description: `${resident.recommendedIntervention.label} intervention ($${resident.recommendedIntervention.creditOffer} credit) sent to ${resident.name}. Projected ROI: $${resident.projectedROI.netROI.toLocaleString()} (${resident.projectedROI.roiMultiple}x).`,
        className: "border-teal-200 bg-teal-50 text-teal-900"
      });
    } else {
      toast.error("Deployment Failed", {
        description: "Unable to deploy intervention. Please try again.",
        className: "border-red-200 bg-red-50 text-red-900"
      });
    }
  };
  
  const getRiskBadgeColor = (score) => {
    if (score >= 80) return "border-red-200 bg-red-50 text-red-700";
    if (score >= 70) return "border-amber-200 bg-amber-50 text-amber-700";
    return "border-border bg-muted text-muted-foreground";
  };
  
  const getRiskLabel = (score) => {
    if (score >= 80) return "High Risk";
    if (score >= 70) return "Medium Risk";
    return "Low Risk";
  };
  
  const getProperty = (propertyId) => {
    return PROPERTIES.find(p => p.id === propertyId);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: "easeOut" }}
      className="space-y-6"
      data-testid="manager-churn-risk-page"
    >
      {/* Header */}
      <section className="rounded-lg border border-border/60 bg-card p-6 shadow-sm">
        <Badge className="mb-3 w-fit border-red-200 bg-red-50 text-red-700 hover:bg-red-50" variant="secondary">
          Churn Risk Analysis
        </Badge>
        <h2 className="font-[var(--font-heading)] text-3xl font-semibold tracking-[-0.02em] text-foreground">
          At-Risk Residents
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Churn prediction powered by HappyCo operational data. Risk scores compute from maintenance frequency, 
          response times, sentiment signals, and lease timing to identify friction early.
        </p>
      </section>

      {/* Summary */}
      <section className="grid gap-6 md:grid-cols-3">
        <div className="saas-metric-card">
          <p className="metric-label">High Risk</p>
          <p className="metric-value mt-3 text-red-600">{highRiskResidents.length}</p>
          <p className="metric-detail mt-2">Immediate action needed</p>
        </div>
        <div className="saas-metric-card">
          <p className="metric-label">Medium Risk</p>
          <p className="metric-value mt-3 text-amber-600">{mediumRiskResidents.length}</p>
          <p className="metric-detail mt-2">Monitor closely</p>
        </div>
        <div className="saas-metric-card">
          <p className="metric-label">Projected Savings</p>
          <p className="metric-value mt-3">${totalProjectedSavings.toLocaleString()}</p>
          <p className="metric-detail mt-2">If all interventions succeed</p>
        </div>
      </section>

      {/* High Risk Residents */}
      {highRiskResidents.length > 0 && (
        <section>
          <h3 className="mb-4 text-lg font-semibold text-foreground">High Risk Residents</h3>
          <div className="space-y-4">
            {highRiskResidents.map((resident) => {
              const isExpanded = expandedResidentId === resident.id;
              const isDeployed = deployedInterventions.has(resident.id);
              const property = getProperty(resident.propertyId);
              
              return (
                <motion.div 
                  key={resident.id} 
                  className="saas-card saas-card:hover"
                  data-testid={`resident-card-${resident.id}`}
                  layout
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-red-600">
                          <AlertCircle className="h-5 w-5" strokeWidth={2} />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-foreground">{resident.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            Unit {resident.unit} • {property?.name} • {resident.frictionSignals.daysToLeaseEnd} days to lease end
                          </p>
                        </div>
                      </div>
                      
                      {/* Top 3 Drivers */}
                      <div className="mt-6 grid gap-4 md:grid-cols-3">
                        {resident.riskDrivers.slice(0, 3).map((driver) => (
                          <div key={driver.name} className="rounded-lg border border-border bg-muted/40 p-4">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium text-foreground">{driver.name}</p>
                              <Badge 
                                className={`text-xs ${
                                  driver.severity === 'high' ? 'border-red-200 bg-red-50 text-red-700' :
                                  driver.severity === 'medium' ? 'border-amber-200 bg-amber-50 text-amber-700' :
                                  'border-border bg-muted text-muted-foreground'
                                }`}
                                variant="secondary"
                              >
                                {driver.contribution} pts
                              </Badge>
                            </div>
                            <Progress className="mt-3" value={parseFloat(driver.contribution)} />
                            <p className="mt-2 text-sm text-muted-foreground">
                              {driver.name === "Maintenance Frequency" && `${driver.rawValue} requests`}
                              {driver.name === "Response Time" && `${driver.rawValue}hr avg`}
                              {driver.name === "Sentiment Decline" && `${driver.rawValue}% negative`}
                              {driver.name === "Days to Lease End" && `${driver.rawValue} days`}
                              {driver.name === "Service Non-Adoption" && `${driver.rawValue} bookings`}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Recommended Intervention */}
                      <div className="mt-4 rounded-lg border border-teal-200 bg-teal-50 p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-foreground">Recommended: {resident.recommendedIntervention.label} Intervention</p>
                            <p className="mt-1 text-sm text-muted-foreground">{resident.recommendedIntervention.rationale}</p>
                            <p className="mt-2 text-sm font-medium text-teal-700">
                              Credit offer: ${resident.recommendedIntervention.creditOffer} • Tier {resident.recommendedIntervention.tier}
                            </p>
                          </div>
                          <button
                            onClick={() => toggleExpanded(resident.id)}
                            className="ml-4 rounded-lg p-2 transition-colors hover:bg-teal-100"
                            data-testid={`expand-roi-${resident.id}`}
                          >
                            {isExpanded ? <ChevronUp className="h-5 w-5 text-teal-700" /> : <ChevronDown className="h-5 w-5 text-teal-700" />}
                          </button>
                        </div>
                      </div>

                      {/* ROI Explainer (Expanded) */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="mt-4 overflow-hidden"
                          >
                            <div className="rounded-lg border border-border bg-muted/40 p-6">
                              <h5 className="text-sm font-semibold text-foreground">ROI Impact Projection</h5>
                              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                {resident.projectedROI.explanation}
                              </p>
                              
                              <div className="mt-4 grid gap-4 md:grid-cols-4">
                                <div className="rounded-lg border border-border bg-card p-4">
                                  <p className="text-xs font-medium text-muted-foreground">Expected Savings</p>
                                  <p className="mt-1 text-lg font-semibold text-teal-600">
                                    ${resident.projectedROI.expectedSavings.toLocaleString()}
                                  </p>
                                  <p className="mt-1 text-xs text-muted-foreground">
                                    {resident.projectedROI.churnReductionRate} retention
                                  </p>
                                </div>
                                
                                <div className="rounded-lg border border-border bg-card p-4">
                                  <p className="text-xs font-medium text-muted-foreground">Service Revenue</p>
                                  <p className="mt-1 text-lg font-semibold text-teal-600">
                                    ${resident.projectedROI.expectedRevenue.toLocaleString()}
                                  </p>
                                  <p className="mt-1 text-xs text-muted-foreground">From bookings</p>
                                </div>
                                
                                <div className="rounded-lg border border-border bg-card p-4">
                                  <p className="text-xs font-medium text-muted-foreground">Credit Cost</p>
                                  <p className="mt-1 text-lg font-semibold text-foreground">
                                    ${resident.projectedROI.totalCost.toLocaleString()}
                                  </p>
                                  <p className="mt-1 text-xs text-muted-foreground">Investment</p>
                                </div>
                                
                                <div className="rounded-lg border border-teal-200 bg-teal-50 p-4">
                                  <p className="text-xs font-medium text-teal-700">Net ROI</p>
                                  <p className="mt-1 text-lg font-semibold text-teal-700">
                                    ${resident.projectedROI.netROI.toLocaleString()}
                                  </p>
                                  <p className="mt-1 text-xs font-semibold text-teal-600">
                                    {resident.projectedROI.roiMultiple}x return
                                  </p>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Score & Action */}
                    <div className="ml-6 text-right">
                      <p className="text-4xl font-semibold tracking-tight text-foreground">{resident.riskScore}</p>
                      <Badge className={`mt-2 ${getRiskBadgeColor(resident.riskScore)}`} variant="secondary">
                        {getRiskLabel(resident.riskScore)}
                      </Badge>
                      <Button 
                        className="mt-4 h-9 w-full rounded-lg" 
                        size="sm"
                        onClick={() => handleDeployIntervention(resident)}
                        disabled={isDeployed}
                        data-testid={`deploy-intervention-${resident.id}`}
                      >
                        {isDeployed ? (
                          <>
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            Deployed
                          </>
                        ) : (
                          "Deploy Intervention"
                        )}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      )}

      {/* Medium Risk Residents */}
      {mediumRiskResidents.length > 0 && (
        <section>
          <h3 className="mb-4 text-lg font-semibold text-foreground">Medium Risk Residents</h3>
          <div className="space-y-4">
            {mediumRiskResidents.map((resident) => {
              const isDeployed = deployedInterventions.has(resident.id);
              const property = getProperty(resident.propertyId);
              
              return (
                <div key={resident.id} className="rounded-lg border border-border bg-card p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-foreground">{resident.name}</h4>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Unit {resident.unit} • {property?.name}
                      </p>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Top driver: {resident.topDriver.name} ({resident.topDriver.contribution} pts)
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-semibold text-foreground">{resident.riskScore}</p>
                      <Badge className={`mt-1 ${getRiskBadgeColor(resident.riskScore)}`} variant="secondary">
                        Medium
                      </Badge>
                      <Button 
                        className="mt-3 h-8 w-full rounded-lg" 
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeployIntervention(resident)}
                        disabled={isDeployed}
                      >
                        {isDeployed ? "Deployed" : "Deploy"}
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </motion.div>
  );
}
