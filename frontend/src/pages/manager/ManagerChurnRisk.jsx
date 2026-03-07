import { useState, useEffect } from "react";
import { AlertCircle, TrendingUp, ChevronDown, ChevronUp, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { getSarahPropertyResidents, getSarahManagedProperty, getPropertyById } from "@/lib/canonicalData";
import { deployIntervention, listManagerActions } from "@/lib/api";

export default function ManagerChurnRisk() {
  const [expandedResidentId, setExpandedResidentId] = useState(null);
  const [deployedInterventions, setDeployedInterventions] = useState(new Set());
  const [deploying, setDeploying] = useState(new Set());
  const [interventionsList, setInterventionsList] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Get Sarah's property and residents (Property Manager scope)
  const sarahProperty = getSarahManagedProperty();
  const sarahResidents = getSarahPropertyResidents();
  
  // Load deployed interventions from backend on mount
  useEffect(() => {
    const loadInterventions = async () => {
      try {
        const response = await listManagerActions(100);
        const actions = response.data.actions || [];
        setInterventionsList(actions);
        
        // Track which residents have interventions
        const deployed = new Set();
        actions.forEach(action => {
          deployed.add(action.residentId);
        });
        setDeployedInterventions(deployed);
      } catch (error) {
        console.error("Failed to load interventions:", error);
        toast.error("Failed to load interventions", {
          description: "Unable to fetch deployed interventions from backend.",
          className: "border-red-200 bg-red-50 text-red-900"
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadInterventions();
  }, []);
  
  // Filter residents by risk tier - Sarah's residents only
  const highRiskResidents = sarahResidents.filter(r => r.riskTier === "high");
  const mediumRiskResidents = sarahResidents.filter(r => r.riskTier === "medium");
  const lowRiskResidents = sarahResidents.filter(r => r.riskTier === "low");
  
  // Calculate projected impact based on canonical risk tier
  const estimateSavings = (resident) => {
    if (resident.riskTier === "high") return 3800;
    if (resident.riskTier === "medium") return 2660;
    return 1900;
  };
  
  const totalProjectedSavings = sarahResidents
    .filter(r => r.riskScore >= 60)
    .reduce((sum, r) => sum + estimateSavings(r), 0);
  
  const toggleExpanded = (residentId) => {
    setExpandedResidentId(expandedResidentId === residentId ? null : residentId);
  };
  
  const handleDeployIntervention = async (resident) => {
    const property = getPropertyById(resident.propertyId);
    const creditAmount = resident.riskTier === "high" ? 500 : resident.riskTier === "medium" ? 350 : 200;
    const tier = resident.riskTier === "high" ? 3 : resident.riskTier === "medium" ? 2 : 1;
    const tierLabel = resident.riskTier === "high" ? "High Priority" : resident.riskTier === "medium" ? "Standard" : "Light Touch";
    const expectedSavings = estimateSavings(resident);
    const expectedRevenue = Math.round(creditAmount * 0.25);
    const netROI = expectedSavings + expectedRevenue - creditAmount;
    const roiMultiple = ((expectedSavings + expectedRevenue) / creditAmount).toFixed(1);
    
    // Mark as deploying
    setDeploying(prev => new Set([...prev, resident.id]));
    
    try {
      // Call backend API
      const response = await deployIntervention({
        residentId: resident.id,
        tier: tier,
        creditAmount: creditAmount,
        reason: `AI-recommended intervention for ${resident.primaryDriver}`
      });
      
      if (response.data.success) {
        // Update UI state
        setDeployedInterventions(prev => new Set([...prev, resident.id]));
        setInterventionsList(prev => [response.data.action, ...prev]);
        
        // Show success toast
        toast.success("Intervention Deployed", {
          description: `${tierLabel} intervention ($${creditAmount} credit) sent to ${resident.fullName}. Projected ROI: $${netROI.toLocaleString()} (${roiMultiple}x). Action persisted to backend.`,
          className: "border-teal-200 bg-teal-50 text-teal-900",
          duration: 5000
        });
      } else {
        throw new Error(response.data.message || "Deployment failed");
      }
    } catch (error) {
      console.error("Deployment error:", error);
      const message = error.response?.data?.detail || error.message || "Unable to deploy intervention";
      
      toast.error("Deployment Failed", {
        description: `${message}. Please try again or contact support.`,
        className: "border-red-200 bg-red-50 text-red-900",
        duration: 5000
      });
    } finally {
      // Remove from deploying set
      setDeploying(prev => {
        const next = new Set(prev);
        next.delete(resident.id);
        return next;
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

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent mx-auto"></div>
          <p className="mt-4 text-sm text-muted-foreground">Loading interventions...</p>
        </div>
      </div>
    );
  }

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
          Turnover Risk Analysis
        </Badge>
        <h2 className="font-[var(--font-heading)] text-3xl font-semibold tracking-[-0.02em] text-foreground">
          At-Risk Residents
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Turnover prediction powered by HappyCo operational data. Risk scores compute from maintenance frequency, 
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
              const isDeploying = deploying.has(resident.id);
              const property = getPropertyById(resident.propertyId);
              const creditAmount = 500;
              const expectedSavings = estimateSavings(resident);
              const expectedRevenue = Math.round(creditAmount * 0.25);
              const netROI = expectedSavings + expectedRevenue - creditAmount;
              const roiMultiple = ((expectedSavings + expectedRevenue) / creditAmount).toFixed(1);
              
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
                          <h4 className="text-lg font-semibold text-foreground">{resident.fullName}</h4>
                          <p className="text-sm text-muted-foreground">
                            Unit {resident.unit} • {property?.shortName} • {resident.status}
                          </p>
                        </div>
                      </div>
                      
                      {/* Key Indicators */}
                      <div className="mt-6 grid gap-4 md:grid-cols-3">
                        <div className="rounded-lg border border-border bg-muted/40 p-4">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-foreground">Primary Driver</p>
                            <Badge 
                              className="text-xs border-red-200 bg-red-50 text-red-700"
                              variant="secondary"
                            >
                              High Impact
                            </Badge>
                          </div>
                          <p className="mt-2 text-sm text-muted-foreground">{resident.primaryDriver}</p>
                        </div>
                        <div className="rounded-lg border border-border bg-muted/40 p-4">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-foreground">Channel</p>
                          </div>
                          <p className="mt-2 text-sm text-muted-foreground">{resident.communicationChannel}</p>
                        </div>
                        <div className="rounded-lg border border-border bg-muted/40 p-4">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-foreground">Risk Tier</p>
                            <Badge 
                              className="text-xs border-red-200 bg-red-50 text-red-700"
                              variant="secondary"
                            >
                              {resident.riskTier}
                            </Badge>
                          </div>
                          <p className="mt-2 text-sm text-muted-foreground">Score: {resident.riskScore}</p>
                        </div>
                      </div>

                      {/* Recommended Intervention */}
                      <div className="mt-4 rounded-lg border border-teal-200 bg-teal-50 p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-foreground">Recommended: High Priority Intervention</p>
                            <p className="mt-1 text-sm text-muted-foreground">
                              High risk score ({resident.riskScore}) warrants comprehensive retention credit and personalized outreach.
                            </p>
                            <p className="mt-2 text-sm font-medium text-teal-700">
                              Credit offer: ${creditAmount} • Tier 3 (High Priority)
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
                                High-risk resident with score of {resident.riskScore}. Expected retention rate of 70% with intervention. 
                                Turnover cost avoidance: ${expectedSavings.toLocaleString()}. Service revenue from credit usage: ${expectedRevenue.toLocaleString()}.
                              </p>
                              
                              <div className="mt-4 grid gap-4 md:grid-cols-4">
                                <div className="rounded-lg border border-border bg-card p-4">
                                  <p className="text-xs font-medium text-muted-foreground">Expected Savings</p>
                                  <p className="mt-1 text-lg font-semibold text-teal-600">
                                    ${expectedSavings.toLocaleString()}
                                  </p>
                                  <p className="mt-1 text-xs text-muted-foreground">70% retention</p>
                                </div>
                                
                                <div className="rounded-lg border border-border bg-card p-4">
                                  <p className="text-xs font-medium text-muted-foreground">Service Revenue</p>
                                  <p className="mt-1 text-lg font-semibold text-teal-600">
                                    ${expectedRevenue.toLocaleString()}
                                  </p>
                                  <p className="mt-1 text-xs text-muted-foreground">From bookings</p>
                                </div>
                                
                                <div className="rounded-lg border border-border bg-card p-4">
                                  <p className="text-xs font-medium text-muted-foreground">Credit Cost</p>
                                  <p className="mt-1 text-lg font-semibold text-foreground">
                                    ${creditAmount.toLocaleString()}
                                  </p>
                                  <p className="mt-1 text-xs text-muted-foreground">Investment</p>
                                </div>
                                
                                <div className="rounded-lg border border-teal-200 bg-teal-50 p-4">
                                  <p className="text-xs font-medium text-teal-700">Net ROI</p>
                                  <p className="mt-1 text-lg font-semibold text-teal-700">
                                    ${netROI.toLocaleString()}
                                  </p>
                                  <p className="mt-1 text-xs font-semibold text-teal-600">
                                    {roiMultiple}x return
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
                        disabled={isDeployed || isDeploying}
                        data-testid={`deploy-intervention-${resident.id}`}
                      >
                        {isDeploying ? (
                          <>
                            <div className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent mr-2"></div>
                            Deploying...
                          </>
                        ) : isDeployed ? (
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
              const isDeploying = deploying.has(resident.id);
              const property = getPropertyById(resident.propertyId);
              
              return (
                <div key={resident.id} className="rounded-lg border border-border bg-card p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-foreground">{resident.fullName}</h4>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Unit {resident.unit} • {property?.shortName}
                      </p>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Top driver: {resident.primaryDriver}
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
                        disabled={isDeployed || isDeploying}
                      >
                        {isDeploying ? "Deploying..." : isDeployed ? "Deployed" : "Deploy"}
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
