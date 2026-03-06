import { useState } from "react";
import { ArrowRight, Sparkles, TrendingUp, Users, DollarSign, AlertCircle, Target, MessageSquare, Gift, CheckCircle2, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PublicFooter } from "@/components/public/PublicFooter";
import { CookieNoticeBar } from "@/components/public/CookieNoticeBar";

// Property-specific data
const PROPERTIES = {
  riverside: {
    id: 'riverside',
    name: 'Riverside Towers',
    units: 250,
    atRisk: 35,
    avgScore: 6.8,
    maintenanceVolume: 'High (8.3 req/unit)',
    engagementPattern: 'Declining (-22%)',
    paymentPattern: 'Stable',
    topResidents: ['Unit 402', 'Unit 318', 'Unit 527'],
    scores: [8.9, 8.8, 8.7],
    interventionWindow: '7-10 days',
    retentionRate: 62,
    roi: 82550,
    roiMultiple: '6.55x',
    retainedCount: 22,
    trend: '+18% vs target'
  },
  parkview: {
    id: 'parkview',
    name: 'Parkview Plaza',
    units: 180,
    atRisk: 22,
    avgScore: 7.2,
    maintenanceVolume: 'Moderate (5.1 req/unit)',
    engagementPattern: 'Stable',
    paymentPattern: 'Strong',
    topResidents: ['Unit 204', 'Unit 512', 'Unit 318'],
    scores: [8.4, 8.2, 8.1],
    interventionWindow: '10-14 days',
    retentionRate: 68,
    roi: 67800,
    roiMultiple: '7.2x',
    retainedCount: 15,
    trend: '+24% vs target'
  },
  summit: {
    id: 'summit',
    name: 'Summit Ridge',
    units: 320,
    atRisk: 48,
    avgScore: 6.5,
    maintenanceVolume: 'Very High (9.7 req/unit)',
    engagementPattern: 'Declining (-28%)',
    paymentPattern: 'At Risk',
    topResidents: ['Unit 1205', 'Unit 824', 'Unit 503'],
    scores: [9.2, 9.0, 8.9],
    interventionWindow: '5-7 days',
    retentionRate: 58,
    roi: 98200,
    roiMultiple: '5.8x',
    retainedCount: 28,
    trend: '+12% vs target'
  }
};

export default function LandingPage() {
  const [insightTab, setInsightTab] = useState("maintenance");
  const [detectionProperty, setDetectionProperty] = useState("riverside");
  const [portfolioView, setPortfolioView] = useState("single");
  const [roiSliders, setRoiSliders] = useState({ units: 250, riskPct: 14, creditCost: 185 });

  // ROI calculation
  const atRiskUnits = Math.round(roiSliders.units * (roiSliders.riskPct / 100));
  const retainedUnits = Math.round(atRiskUnits * 0.62);
  const turnoverCost = 4083;
  const costAvoidance = retainedUnits * turnoverCost;
  const creditSpend = atRiskUnits * roiSliders.creditCost;
  const netROI = costAvoidance - creditSpend;
  const roiMultiple = creditSpend > 0 ? (costAvoidance / creditSpend).toFixed(2) : "0.00";

  const insightTabs = [
    { id: "maintenance", label: "High Maintenance" },
    { id: "engagement", label: "Low Engagement" },
    { id: "payments", label: "Late Payments" }
  ];

  const selectedProperty = PROPERTIES[detectionProperty];

  return (
    <div className="min-h-screen bg-background" data-testid="landing-page-root">
      {/* Hero Section */}
      <section className="relative min-h-[680px] lg:min-h-[700px] overflow-hidden" data-testid="landing-hero-section">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwxfHxjaXR5JTIwYnVpbGRpbmdzJTIwc2t5bGluZSUyMGJsdWV8ZW58MHx8fHx0ZWFsfDE3NzI3NzExODZ8MA&ixlib=rb-4.1.0&q=85"
            alt="City skyline"
            className="h-full w-full object-cover"
            style={{ filter: 'contrast(1.15) brightness(0.65)' }}
          />
          <div className="absolute inset-0 bg-slate-900/97"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950/90 via-slate-900/90 to-slate-900/85"></div>
        </div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute top-0 z-50 w-full"
        >
          <div className="flex h-16 items-center px-4 sm:px-6 lg:px-8">
            <div className="flex w-full max-w-[1400px] mx-auto items-center justify-between">
              {/* Left: Logo - Linked */}
              <Link to="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-80" data-testid="landing-brand-link">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/12 text-primary">
                  <Sparkles className="h-[18px] w-[18px]" strokeWidth={2.5} />
                </div>
                <p className="font-[var(--font-heading)] text-[15px] font-semibold tracking-tight text-white">
                  HappyCo Concierge
                </p>
              </Link>

              {/* Center: Nav Items in Pill */}
              <nav className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden items-center gap-0.5 rounded-full border border-white/6 bg-white/[0.02] px-1.5 py-1.5 backdrop-blur-[3px] lg:flex">
                <a href="#insight" className="rounded-full px-3 py-1.5 text-[13px] font-medium text-white/55 transition-all hover:bg-white/5 hover:text-white">Insight</a>
                <a href="#detection" className="rounded-full px-3 py-1.5 text-[13px] font-medium text-white/55 transition-all hover:bg-white/5 hover:text-white">Detection</a>
                <a href="#concierge" className="rounded-full px-3 py-1.5 text-[13px] font-medium text-white/55 transition-all hover:bg-white/5 hover:text-white">Concierge</a>
                <a href="#portfolio" className="rounded-full px-3 py-1.5 text-[13px] font-medium text-white/55 transition-all hover:bg-white/5 hover:text-white">Portfolio</a>
                <a href="#roi" className="rounded-full px-3 py-1.5 text-[13px] font-medium text-white/55 transition-all hover:bg-white/5 hover:text-white">ROI</a>
              </nav>

              {/* Right: Actions */}
              <div className="flex items-center gap-2 sm:gap-3">
                <Link to="/legal" className="text-sm font-medium text-white/40 transition-colors hover:text-white/60">
                  Legal
                </Link>
                <Button asChild size="sm" className="h-8 rounded-full bg-primary px-3 sm:px-4 text-[13px] font-medium shadow-none hover:bg-primary/90" data-testid="landing-sign-in-nav">
                  <Link to="/login">Sign In</Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Hero Content */}
        <div className="relative h-full flex flex-col">
          <div className="flex-1 mx-auto w-full max-w-[1400px] px-4 pt-20 pb-28 sm:px-6 lg:px-8 lg:pt-24 lg:pb-32">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="max-w-[680px]"
            >
              <Badge className="mb-4 border-primary/15 bg-primary/8 px-3 py-1 text-[13px] text-primary hover:bg-primary/8" variant="secondary" data-testid="landing-hero-badge">
                Retention Intelligence Platform
              </Badge>

              <h1 className="font-[var(--font-heading)] text-4xl sm:text-5xl font-semibold leading-[1.1] tracking-[-0.03em] text-white lg:text-[52px]" data-testid="landing-hero-title">
                Predict and Prevent <span className="text-primary">Resident Churn</span>
              </h1>

              <p className="mt-5 max-w-[520px] text-[16px] sm:text-[17px] leading-[1.6] text-white/65">
                Transform operational data into retention insights. Intervene before residents decide to leave. Measure financial impact across your portfolio.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-2.5">
                <Button asChild size="lg" className="h-11 rounded-full bg-primary px-5 text-[15px] font-medium shadow-none hover:bg-primary/90" data-testid="landing-hero-cta">
                  <Link to="/login">
                    View Demo
                    <ArrowRight className="ml-2 h-4 w-4" strokeWidth={2.5} />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-11 rounded-full border-white/8 bg-white/[0.02] px-5 text-[15px] font-medium text-white backdrop-blur-sm hover:bg-white/[0.04] hover:border-white/12" data-testid="landing-hero-secondary-cta">
                  <Link to="/login">Sign In</Link>
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Proof Cards - Anchored to Bottom */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="absolute bottom-10 left-0 right-0 px-4 sm:px-6 lg:px-8"
          >
            <div className="mx-auto grid max-w-[1400px] gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3">
              <div className="rounded-xl border border-white/6 bg-white/[0.02] p-3.5 sm:p-4 backdrop-blur-[3px]">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white/5 text-white/70">
                    <DollarSign className="h-[18px] w-[18px]" strokeWidth={2.5} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-[var(--font-heading)] text-2xl sm:text-[28px] font-semibold leading-none tracking-tight text-white">$4,083</p>
                    <p className="mt-1.5 text-[12px] sm:text-[13px] font-medium text-white/50">Avg. turnover cost</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-white/6 bg-white/[0.02] p-3.5 sm:p-4 backdrop-blur-[3px]">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white/5 text-white/70">
                    <TrendingUp className="h-[18px] w-[18px]" strokeWidth={2.5} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-[var(--font-heading)] text-2xl sm:text-[28px] font-semibold leading-none tracking-tight text-white">9.6%</p>
                    <p className="mt-1.5 text-[12px] sm:text-[13px] font-medium text-white/50">Annual turnover rate</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-primary/12 bg-primary/[0.04] p-3.5 sm:p-4 backdrop-blur-[3px]">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Users className="h-[18px] w-[18px]" strokeWidth={2.5} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-[var(--font-heading)] text-2xl sm:text-[28px] font-semibold leading-none tracking-tight text-primary">$82,550</p>
                    <p className="mt-1.5 text-[12px] sm:text-[13px] font-medium text-primary/70">Net retention ROI</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Below the fold */}
      <main className="bg-background">
        {/* Insight Section */}
        <section className="scroll-mt-16 border-b border-border/40 bg-gradient-to-b from-background to-muted/20 py-16 sm:py-20 lg:py-24" id="insight">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <Badge className="mb-3 border-border/60 bg-background text-[12px] text-muted-foreground" variant="secondary">
                Churn Prediction
              </Badge>
              <h2 className="font-[var(--font-heading)] text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
                Identify at-risk residents before they leave
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">
                Track friction drivers across maintenance, engagement, and payment patterns to predict churn risk
              </p>
            </div>

            {/* Tabs */}
            <div className="mt-8 flex justify-center">
              <div className="inline-flex gap-1 rounded-full border border-border/60 bg-muted/30 p-1">
                {insightTabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setInsightTab(tab.id)}
                    className={`rounded-full px-3 sm:px-4 py-1.5 text-[13px] font-medium transition-all ${
                      insightTab === tab.id
                        ? 'bg-background text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                    data-testid={`insight-tab-${tab.id}`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Content Grid */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-xl border border-border/60 bg-card p-5">
                <div className="mb-3 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-destructive rotate-180" />
                  <p className="text-sm font-semibold text-foreground">Risk Trend</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-end justify-between">
                    <span className="text-xs text-muted-foreground">This month</span>
                    <span className="font-[var(--font-heading)] text-2xl font-semibold text-destructive">35</span>
                  </div>
                  <div className="h-16 flex items-end gap-1">
                    {[12, 18, 22, 28, 32, 35].map((val, i) => (
                      <div key={i} className="flex-1 bg-destructive/20 rounded-t" style={{ height: `${(val / 35) * 100}%` }}></div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">+12% vs last month</p>
                </div>
              </div>

              <div className="rounded-xl border border-border/60 bg-card p-5">
                <div className="mb-3 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-orange-500" />
                  <p className="text-sm font-semibold text-foreground">Top Signals</p>
                </div>
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Avg. response time</span>
                    <span className="font-semibold text-foreground">4.2 days</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Open requests</span>
                    <span className="font-semibold text-foreground">8.3 per unit</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Satisfaction drop</span>
                    <span className="font-semibold text-destructive">-22%</span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-border/60 bg-card p-5">
                <div className="mb-3 flex items-center gap-2">
                  <Target className="h-4 w-4 text-primary" />
                  <p className="text-sm font-semibold text-foreground">Intervention Window</p>
                </div>
                <div className="space-y-2.5">
                  <div className="rounded-lg bg-primary/10 px-3 py-2">
                    <p className="text-xs font-medium text-primary">High priority</p>
                    <p className="mt-0.5 text-lg font-semibold text-foreground">18 residents</p>
                  </div>
                  <p className="text-xs text-muted-foreground">Deploy within 7 days for 68% retention lift</p>
                </div>
              </div>
            </div>

            {/* Impact Strip */}
            <div className="mt-6 rounded-xl border border-border/60 bg-slate-900 p-5 sm:p-6 text-white">
              <div className="grid gap-6 sm:grid-cols-3">
                <div>
                  <p className="text-xs text-white/50">Potential turnover cost</p>
                  <p className="mt-1 font-[var(--font-heading)] text-xl sm:text-2xl font-semibold">$142,905</p>
                </div>
                <div>
                  <p className="text-xs text-white/50">Est. retention with intervention</p>
                  <p className="mt-1 font-[var(--font-heading)] text-xl sm:text-2xl font-semibold text-primary">62%</p>
                </div>
                <div>
                  <p className="text-xs text-white/50">Net cost avoidance</p>
                  <p className="mt-1 font-[var(--font-heading)] text-xl sm:text-2xl font-semibold text-primary">$88,601</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detection Section */}
        <section className="scroll-mt-16 border-b border-border/40 py-16 sm:py-20 lg:py-24" id="detection">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <Badge className="mb-3 border-border/60 bg-muted/60 text-[12px] text-muted-foreground" variant="secondary">
                Risk Scoring
              </Badge>
              <h2 className="font-[var(--font-heading)] text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
                Precision scoring across your portfolio
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">
                Multi-signal churn risk model calibrated to property operations data
              </p>
            </div>

            {/* Property Selector */}
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {Object.values(PROPERTIES).map(prop => (
                <button
                  key={prop.id}
                  onClick={() => setDetectionProperty(prop.id)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    detectionProperty === prop.id
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'border border-border/60 bg-card text-foreground hover:bg-muted'
                  }`}
                  data-testid={`detection-property-${prop.id}`}
                >
                  {prop.name}
                </button>
              ))}
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-2">
              {/* Scoring Model */}
              <div className="rounded-xl border border-border/60 bg-card p-6">
                <h3 className="mb-4 text-sm font-semibold text-foreground">Scoring Model</h3>
                <div className="space-y-3">
                  <div>
                    <div className="mb-1.5 flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Maintenance friction</span>
                      <span className="font-semibold text-foreground">35%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-full w-[35%] rounded-full bg-destructive"></div>
                    </div>
                  </div>
                  <div>
                    <div className="mb-1.5 flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Engagement signals</span>
                      <span className="font-semibold text-foreground">25%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-full w-[25%] rounded-full bg-orange-500"></div>
                    </div>
                  </div>
                  <div>
                    <div className="mb-1.5 flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Payment patterns</span>
                      <span className="font-semibold text-foreground">20%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-full w-[20%] rounded-full bg-yellow-500"></div>
                    </div>
                  </div>
                  <div>
                    <div className="mb-1.5 flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Tenure & history</span>
                      <span className="font-semibold text-foreground">20%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-full w-[20%] rounded-full bg-blue-500"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Results - Property Specific */}
              <div className="rounded-xl border border-border/60 bg-card p-6">
                <h3 className="mb-4 text-sm font-semibold text-foreground">{selectedProperty.name} Results</h3>
                <div className="mb-4 grid grid-cols-3 gap-3">
                  <div className="rounded-lg border border-border/60 bg-background p-3">
                    <p className="text-xs text-muted-foreground">Total units</p>
                    <p className="mt-1 font-[var(--font-heading)] text-xl font-semibold text-foreground">{selectedProperty.units}</p>
                  </div>
                  <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-3">
                    <p className="text-xs text-muted-foreground">At risk</p>
                    <p className="mt-1 font-[var(--font-heading)] text-xl font-semibold text-destructive">{selectedProperty.atRisk}</p>
                  </div>
                  <div className="rounded-lg border border-border/60 bg-background p-3">
                    <p className="text-xs text-muted-foreground">Avg. score</p>
                    <p className="mt-1 font-[var(--font-heading)] text-xl font-semibold text-foreground">{selectedProperty.avgScore}</p>
                  </div>
                </div>
                
                {/* Property-specific context */}
                <div className="mb-4 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Maintenance:</span>
                    <span className="font-medium text-foreground">{selectedProperty.maintenanceVolume}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Engagement:</span>
                    <span className="font-medium text-foreground">{selectedProperty.engagementPattern}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Payment:</span>
                    <span className="font-medium text-foreground">{selectedProperty.paymentPattern}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">High-risk residents</p>
                  {selectedProperty.topResidents.map((unit, i) => (
                    <div key={i} className="flex items-center justify-between rounded-lg border border-border/40 bg-background px-3 py-2 text-xs">
                      <span className="font-medium text-foreground">{unit}</span>
                      <span className="rounded-full bg-destructive/10 px-2 py-0.5 text-destructive">Score: {selectedProperty.scores[i]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Concierge Section */}
        <section className="scroll-mt-16 border-b border-border/40 bg-muted/20 py-16 sm:py-20 lg:py-24" id="concierge">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <Badge className="mb-3 border-border/60 bg-background text-[12px] text-muted-foreground" variant="secondary">
                Retention Actions
              </Badge>
              <h2 className="font-[var(--font-heading)] text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
                Automated concierge interventions
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">
                Deploy tiered credit offers matched to friction drivers with full resident experience
              </p>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {/* Channels */}
              <div className="rounded-xl border border-border/60 bg-card p-6">
                <div className="mb-4 flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  <h3 className="text-sm font-semibold text-foreground">Delivery Channels</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-lg border border-border/40 bg-background px-4 py-3">
                    <span className="text-sm text-foreground">Resident mobile app</span>
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-border/40 bg-background px-4 py-3">
                    <span className="text-sm text-foreground">Email notification</span>
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-border/40 bg-muted px-4 py-3">
                    <span className="text-sm text-muted-foreground">SMS delivery</span>
                    <span className="text-xs text-muted-foreground">Coming soon</span>
                  </div>
                </div>
              </div>

              {/* Intervention Flow */}
              <div className="rounded-xl border border-border/60 bg-card p-6">
                <div className="mb-4 flex items-center gap-2">
                  <Gift className="h-5 w-5 text-primary" />
                  <h3 className="text-sm font-semibold text-foreground">Intervention Flow</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">1</div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">Risk detected</p>
                      <p className="text-xs text-muted-foreground">Score threshold triggered</p>
                    </div>
                  </div>
                  <div className="ml-4 h-6 w-px bg-border"></div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">2</div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">Credit allocated</p>
                      <p className="text-xs text-muted-foreground">Tiered by risk level</p>
                    </div>
                  </div>
                  <div className="ml-4 h-6 w-px bg-border"></div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">3</div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">Resident engagement</p>
                      <p className="text-xs text-muted-foreground">Book service or redeem</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section className="scroll-mt-16 border-b border-border/40 py-16 sm:py-20 lg:py-24" id="portfolio">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <Badge className="mb-3 border-border/60 bg-muted/60 text-[12px] text-muted-foreground" variant="secondary">
                Portfolio Analytics
              </Badge>
              <h2 className="font-[var(--font-heading)] text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
                Retention performance across properties
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">
                Measure impact, compare properties, and track ROI trends
              </p>
            </div>

            {/* Toggle */}
            <div className="mt-8 flex justify-center">
              <div className="inline-flex gap-1 rounded-full border border-border/60 bg-muted/30 p-1">
                <button
                  onClick={() => setPortfolioView('single')}
                  className={`rounded-full px-4 py-1.5 text-[13px] font-medium transition-all ${
                    portfolioView === 'single'
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  data-testid="portfolio-view-single"
                >
                  Single Property
                </button>
                <button
                  onClick={() => setPortfolioView('compare')}
                  className={`rounded-full px-4 py-1.5 text-[13px] font-medium transition-all ${
                    portfolioView === 'compare'
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  data-testid="portfolio-view-compare"
                >
                  Compare All
                </button>
              </div>
            </div>

            {portfolioView === 'single' ? (
              <div className="mt-8">
                <p className="mb-4 text-center text-sm text-muted-foreground">{PROPERTIES.riverside.name}</p>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-xl border border-border/60 bg-card p-5">
                    <p className="text-xs text-muted-foreground">Net retention ROI</p>
                    <p className="mt-2 font-[var(--font-heading)] text-3xl font-semibold text-primary">${PROPERTIES.riverside.roi.toLocaleString()}</p>
                    <p className="mt-1 text-xs font-medium text-muted-foreground">{PROPERTIES.riverside.trend}</p>
                  </div>
                  <div className="rounded-xl border border-border/60 bg-card p-5">
                    <p className="text-xs text-muted-foreground">Retained residents</p>
                    <p className="mt-2 font-[var(--font-heading)] text-3xl font-semibold text-foreground">{PROPERTIES.riverside.retainedCount}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{PROPERTIES.riverside.retentionRate}% retention rate</p>
                  </div>
                  <div className="rounded-xl border border-border/60 bg-card p-5">
                    <p className="text-xs text-muted-foreground">ROI multiple</p>
                    <p className="mt-2 font-[var(--font-heading)] text-3xl font-semibold text-foreground">{PROPERTIES.riverside.roiMultiple}</p>
                    <p className="mt-1 text-xs text-primary">{PROPERTIES.riverside.trend}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-8 space-y-3">
                {Object.values(PROPERTIES).map((prop) => (
                  <div key={prop.id} className="rounded-xl border border-border/60 bg-card p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <Building2 className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-semibold text-foreground">{prop.name}</p>
                          <p className="text-xs text-muted-foreground">{prop.units} units · {prop.retentionRate}% retention</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                        <div>
                          <p className="text-xs text-muted-foreground">At risk</p>
                          <p className="mt-0.5 text-sm font-semibold text-destructive">{prop.atRisk}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">ROI</p>
                          <p className="mt-0.5 text-sm font-semibold text-primary">${prop.roi.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Multiple</p>
                          <p className="mt-0.5 text-sm font-semibold text-foreground">{prop.roiMultiple}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ROI Section - RESTRUCTURED: Big Number First */}
        <section className="scroll-mt-16 relative overflow-hidden py-16 sm:py-20 lg:py-24" id="roi">
          <div className="absolute inset-0 bg-slate-900"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950/40 via-slate-900/40 to-slate-900/20"></div>
          
          <div className="relative mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <Badge className="mb-3 border-primary/20 bg-primary/10 text-[12px] text-primary" variant="secondary">
                ROI Calculator
              </Badge>
              <h2 className="font-[var(--font-heading)] text-2xl sm:text-3xl font-semibold tracking-tight text-white">
                Model your retention economics
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm text-white/65">
                Adjust assumptions to project ROI for your portfolio
              </p>
            </div>

            {/* BIG NUMBER FIRST */}
            <div className="mt-10 rounded-xl border border-primary/20 bg-primary/10 p-8 text-center backdrop-blur-sm">
              <p className="text-sm text-white/70">Projected Net ROI</p>
              <p className="mt-3 font-[var(--font-heading)] text-5xl sm:text-6xl font-semibold text-primary" data-testid="roi-result">
                ${netROI.toLocaleString()}
              </p>
              <p className="mt-3 text-sm text-white/70">{roiMultiple}x return on credit investment</p>
            </div>

            {/* FORMULA SECOND */}
            <div className="mt-8 flex flex-wrap justify-center gap-2 text-sm">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-white/70">Units × Risk %</span>
              <span className="text-white/40">×</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-white/70">Retention Rate</span>
              <span className="text-white/40">×</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-white/70">Turnover Cost</span>
              <span className="text-white/40">−</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-white/70">Credit Spend</span>
            </div>

            {/* SLIDERS THIRD */}
            <div className="mt-8 rounded-xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 backdrop-blur-sm">
              <div className="space-y-6">
                {/* Units Slider */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="text-sm font-medium text-white">Total Units</label>
                    <span className="font-[var(--font-heading)] text-lg font-semibold text-white">{roiSliders.units}</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="500"
                    step="10"
                    value={roiSliders.units}
                    onChange={(e) => setRoiSliders({ ...roiSliders, units: parseInt(e.target.value) })}
                    className="w-full"
                    data-testid="roi-slider-units"
                  />
                </div>

                {/* Risk % Slider */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="text-sm font-medium text-white">At-Risk %</label>
                    <span className="font-[var(--font-heading)] text-lg font-semibold text-white">{roiSliders.riskPct}%</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="25"
                    step="1"
                    value={roiSliders.riskPct}
                    onChange={(e) => setRoiSliders({ ...roiSliders, riskPct: parseInt(e.target.value) })}
                    className="w-full"
                    data-testid="roi-slider-risk"
                  />
                </div>

                {/* Credit Cost Slider */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="text-sm font-medium text-white">Credit per Resident</label>
                    <span className="font-[var(--font-heading)] text-lg font-semibold text-white">${roiSliders.creditCost}</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="300"
                    step="5"
                    value={roiSliders.creditCost}
                    onChange={(e) => setRoiSliders({ ...roiSliders, creditCost: parseInt(e.target.value) })}
                    className="w-full"
                    data-testid="roi-slider-credit"
                  />
                </div>
              </div>

              {/* DERIVED METRICS FOURTH */}
              <div className="mt-8 grid gap-4 border-t border-white/10 pt-6 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <p className="text-xs text-white/50">At-risk residents</p>
                  <p className="mt-1 font-[var(--font-heading)] text-xl font-semibold text-white">{atRiskUnits}</p>
                </div>
                <div>
                  <p className="text-xs text-white/50">Est. retained (62%)</p>
                  <p className="mt-1 font-[var(--font-heading)] text-xl font-semibold text-white">{retainedUnits}</p>
                </div>
                <div>
                  <p className="text-xs text-white/50">Cost avoidance</p>
                  <p className="mt-1 font-[var(--font-heading)] text-xl font-semibold text-primary">${costAvoidance.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-white/50">Credit spend</p>
                  <p className="mt-1 font-[var(--font-heading)] text-xl font-semibold text-white">${creditSpend.toLocaleString()}</p>
                </div>
              </div>

              <p className="mt-6 text-center text-xs text-white/40">
                Assumes 62% retention rate and $4,083 avg. turnover cost
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="border-t border-border/40 py-16 sm:py-20">
          <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="font-[var(--font-heading)] text-2xl font-semibold tracking-tight text-foreground">
              Ready to see the platform?
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Explore admin dashboards, manager workflows, and resident interfaces with Seattle portfolio demo data
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="h-11 rounded-full px-6 text-[15px] shadow-none" data-testid="landing-final-cta">
                <Link to="/login">
                  View Demo
                  <ArrowRight className="ml-2 h-4 w-4" strokeWidth={2} />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
      <CookieNoticeBar />
    </div>
  );
}
