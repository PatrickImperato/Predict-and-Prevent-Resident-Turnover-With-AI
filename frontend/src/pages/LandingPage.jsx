import { useState } from "react";
import { ArrowRight, Sparkles, TrendingUp, Users, DollarSign, AlertCircle, Target, MessageSquare, Gift, CheckCircle2, Building2, TrendingDown, Wrench, CreditCard, Mail, Calendar, BarChart2, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PublicFooter } from "@/components/public/PublicFooter";
import { CookieNoticeBar } from "@/components/public/CookieNoticeBar";

// Property-specific data with CUSTOMIZED SCORING WEIGHTS
const PROPERTIES = {
  riverside: {
    id: 'riverside',
    name: 'Riverside Towers',
    units: 250,
    atRisk: 35,
    avgScore: 6.8,
    maintenanceVolume: 'High (8.3 req/unit/mo)',
    engagementPattern: 'Declining (-22%)',
    paymentPattern: 'Stable (98% on-time)',
    topResidents: ['Unit 402 - Williams', 'Unit 318 - Chen', 'Unit 527 - Rodriguez'],
    scores: [8.9, 8.8, 8.7],
    interventionWindow: '7-10 days',
    retentionRate: 62,
    roi: 82550,
    roiMultiple: '6.55x',
    retainedCount: 22,
    trend: '+18% vs target',
    renewalRisk: 'Concentrated in high-maintenance units',
    profile: 'Highest operational burden, strong recovery upside from maintenance improvements',
    insight: 'High maintenance friction drives churn risk—intervention focused on service quality improvements shows strongest ROI potential',
    // CUSTOMIZED WEIGHTS for Riverside
    scoringWeights: {
      maintenance: 42,
      engagement: 28,
      payment: 18,
      tenure: 12
    }
  },
  parkview: {
    id: 'parkview',
    name: 'Parkview Plaza',
    units: 180,
    atRisk: 22,
    avgScore: 7.2,
    maintenanceVolume: 'Moderate (5.1 req/unit/mo)',
    engagementPattern: 'Stable (+2%)',
    paymentPattern: 'Strong (99.5% on-time)',
    topResidents: ['Unit 204 - Thompson', 'Unit 512 - Martinez', 'Unit 318 - Lee'],
    scores: [8.4, 8.2, 8.1],
    interventionWindow: '10-14 days',
    retentionRate: 68,
    roi: 67800,
    roiMultiple: '7.2x',
    retainedCount: 15,
    trend: '+24% vs target',
    renewalRisk: 'Distributed across building',
    profile: 'Healthier engagement profile, moderate friction, best retention performance',
    insight: 'Engagement-driven model reflects strong community participation—preventive outreach yields highest retention rate in portfolio',
    // CUSTOMIZED WEIGHTS for Parkview
    scoringWeights: {
      engagement: 38,
      maintenance: 25,
      tenure: 22,
      payment: 15
    }
  },
  summit: {
    id: 'summit',
    name: 'Summit Ridge',
    units: 320,
    atRisk: 48,
    avgScore: 6.5,
    maintenanceVolume: 'Very High (9.7 req/unit/mo)',
    engagementPattern: 'Declining (-28%)',
    paymentPattern: 'At Risk (91% on-time)',
    topResidents: ['Unit 1205 - Anderson', 'Unit 824 - Garcia', 'Unit 503 - Kim'],
    scores: [9.2, 9.0, 8.9],
    interventionWindow: '5-7 days',
    retentionRate: 58,
    roi: 98200,
    roiMultiple: '5.8x',
    retainedCount: 28,
    trend: '+12% vs target',
    renewalRisk: 'Payment sensitivity, high dispersion',
    profile: 'Largest scale with dual pressure from payment risk and service volume',
    insight: 'Payment patterns and maintenance volume both elevated—combined intervention addressing financial support and service quality required',
    // CUSTOMIZED WEIGHTS for Summit
    scoringWeights: {
      payment: 36,
      maintenance: 32,
      engagement: 20,
      tenure: 12
    }
  }
};

// Friction tab scenarios
const FRICTION_SCENARIOS = {
  maintenance: {
    id: 'maintenance',
    label: 'High Maintenance',
    riskTrend: { current: 35, data: [12, 18, 22, 28, 32, 35], change: '+12% vs last month', severity: 'high' },
    signals: [
      { label: 'Avg. response time', value: '4.2 days', status: 'warning' },
      { label: 'Open requests', value: '8.3 per unit', status: 'critical' },
      { label: 'Satisfaction drop', value: '-22%', status: 'critical' }
    ],
    intervention: { priority: 'High priority', count: 18, window: 'Deploy within 7 days for 68% retention lift' },
    impact: {
      turnoverCost: '$142,905',
      retention: '62%',
      avoidance: '$88,601'
    }
  },
  engagement: {
    id: 'engagement',
    label: 'Low Engagement',
    riskTrend: { current: 28, data: [15, 18, 21, 24, 26, 28], change: '+8% vs last month', severity: 'moderate' },
    signals: [
      { label: 'Portal usage', value: '12% decline', status: 'warning' },
      { label: 'Event attendance', value: '3.2 per year', status: 'warning' },
      { label: 'Service bookings', value: '-31%', status: 'critical' }
    ],
    intervention: { priority: 'Medium priority', count: 12, window: 'Early outreach within 14 days for 55% retention lift' },
    impact: {
      turnoverCost: '$114,324',
      retention: '55%',
      avoidance: '$62,878'
    }
  },
  payments: {
    id: 'payments',
    label: 'Late Payments',
    riskTrend: { current: 22, data: [8, 11, 14, 17, 20, 22], change: '+14% vs last month', severity: 'urgent' },
    signals: [
      { label: 'Late payment rate', value: '8.5%', status: 'critical' },
      { label: 'Avg. days late', value: '12 days', status: 'warning' },
      { label: 'Financial stress signals', value: 'High', status: 'critical' }
    ],
    intervention: { priority: 'Urgent priority', count: 22, window: 'Deploy within 5 days with financial support for 72% retention lift' },
    impact: {
      turnoverCost: '$89,826',
      retention: '72%',
      avoidance: '$64,675'
    }
  }
};

export default function LandingPage() {
  const [insightTab, setInsightTab] = useState("maintenance");
  const [detectionProperty, setDetectionProperty] = useState("riverside");
  const [portfolioView, setPortfolioView] = useState("single");
  const [roiSliders, setRoiSliders] = useState({ units: 250, riskPct: 14, creditCost: 185 });
  const [isScrolled, setIsScrolled] = useState(false);

  // ROI calculation
  const atRiskUnits = Math.round(roiSliders.units * (roiSliders.riskPct / 100));
  const retainedUnits = Math.round(atRiskUnits * 0.62);
  const turnoverCost = 4083;
  const costAvoidance = retainedUnits * turnoverCost;
  const creditSpend = atRiskUnits * roiSliders.creditCost;
  const netROI = costAvoidance - creditSpend;
  const roiMultiple = creditSpend > 0 ? (costAvoidance / creditSpend).toFixed(2) : "0.00";

  const selectedScenario = FRICTION_SCENARIOS[insightTab];
  const selectedProperty = PROPERTIES[detectionProperty];

  // Sticky header scroll detection
  useState(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50" data-testid="landing-page-root" style={{ scrollPaddingTop: '64px' }}>
      {/* Hero Section */}
      <section className="relative min-h-[720px] lg:min-h-[740px] overflow-hidden" data-testid="landing-hero-section">
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

        {/* STICKY Header */}
        <motion.header
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={`fixed top-0 z-50 w-full transition-all duration-200 ${
            isScrolled 
              ? 'bg-slate-900/80 backdrop-blur-lg border-b border-white/10 shadow-lg'
              : 'bg-transparent'
          }`}
        >
          <div className="flex h-16 items-center px-4 sm:px-6 lg:px-8">
            <div className="flex w-full max-w-[1400px] mx-auto items-center justify-between">
              <Link to="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-80" data-testid="landing-brand-link">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/12 text-primary">
                  <Sparkles className="h-[18px] w-[18px]" strokeWidth={2.5} />
                </div>
                <p className="font-[var(--font-heading)] text-[15px] font-semibold tracking-tight text-white">
                  HappyCo Concierge
                </p>
              </Link>

              <nav className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden items-center gap-0.5 rounded-full border border-white/6 bg-white/[0.02] px-1.5 py-1.5 backdrop-blur-[3px] lg:flex">
                <a href="#insight" className="rounded-full px-3 py-1.5 text-[13px] font-medium text-white/55 transition-all hover:bg-white/5 hover:text-white">Insight</a>
                <a href="#detection" className="rounded-full px-3 py-1.5 text-[13px] font-medium text-white/55 transition-all hover:bg-white/5 hover:text-white">Detection</a>
                <a href="#concierge" className="rounded-full px-3 py-1.5 text-[13px] font-medium text-white/55 transition-all hover:bg-white/5 hover:text-white">Concierge</a>
                <a href="#portfolio" className="rounded-full px-3 py-1.5 text-[13px] font-medium text-white/55 transition-all hover:bg-white/5 hover:text-white">Portfolio</a>
                <a href="#roi" className="rounded-full px-3 py-1.5 text-[13px] font-medium text-white/55 transition-all hover:bg-white/5 hover:text-white">ROI</a>
              </nav>

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
        <div className="relative h-full flex flex-col justify-between" style={{ minHeight: '720px' }}>
          <div className="flex-1 mx-auto w-full max-w-[1400px] px-4 pt-20 sm:px-6 lg:px-8 lg:pt-24">
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

              <p className="mt-5 max-w-[520px] text-[16px] sm:text-[17px] leading-[1.6] text-white/70">
                Transform operational data into retention insights. Intervene before residents decide to leave. Measure financial impact across your portfolio.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-2.5 mb-24 lg:mb-28">
                <Button asChild size="lg" className="h-11 rounded-full bg-primary px-5 text-[15px] font-medium shadow-none hover:bg-primary/90" data-testid="landing-hero-cta">
                  <Link to="/login">
                    Explore Platform
                    <ArrowRight className="ml-2 h-4 w-4" strokeWidth={2.5} />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-11 rounded-full border-white/8 bg-white/[0.02] px-5 text-[15px] font-medium text-white backdrop-blur-sm hover:bg-white/[0.04] hover:border-white/12" data-testid="landing-hero-secondary-cta">
                  <Link to="/login">Sign In</Link>
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Proof Cards */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="pb-12 px-4 sm:px-6 lg:px-8"
          >
            <div className="mx-auto grid max-w-[1400px] gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3">
              <div className="rounded-xl border border-white/6 bg-white/[0.02] p-4 backdrop-blur-[3px]">
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

              <div className="rounded-xl border border-white/6 bg-white/[0.02] p-4 backdrop-blur-[3px]">
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

              <div className="rounded-xl border border-primary/12 bg-primary/[0.04] p-4 backdrop-blur-[3px]">
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
      <main className="bg-zinc-50">
        {/* Insight Section - INTERACTIVE SCENARIOS */}
        <section className="scroll-mt-16 border-b border-zinc-200 bg-white py-16 sm:py-20 lg:py-24" id="insight">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <Badge className="mb-3 border-zinc-300 bg-zinc-100 text-[12px] text-zinc-700 font-medium" variant="secondary">
                Churn Prediction
              </Badge>
              <h2 className="font-[var(--font-heading)] text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900">
                Identify at-risk residents before they leave
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-[15px] text-zinc-600 leading-relaxed">
                Track friction drivers across maintenance, engagement, and payment patterns to predict churn risk
              </p>
            </div>

            {/* Tabs */}
            <div className="mt-8 flex justify-center">
              <div className="inline-flex gap-1 rounded-full border border-zinc-200 bg-zinc-50 p-1">
                {Object.values(FRICTION_SCENARIOS).map(scenario => (
                  <button
                    key={scenario.id}
                    onClick={() => setInsightTab(scenario.id)}
                    className={`rounded-full px-3 sm:px-4 py-2 text-[13px] font-semibold transition-all ${
                      insightTab === scenario.id
                        ? 'bg-white text-zinc-900 shadow-sm'
                        : 'text-zinc-600 hover:text-zinc-900'
                    }`}
                    data-testid={`insight-tab-${scenario.id}`}
                  >
                    {scenario.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Content Grid - DYNAMIC BY SCENARIO */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
                <div className="mb-3 flex items-center gap-2">
                  <TrendingDown className={`h-4 w-4 ${
                    selectedScenario.riskTrend.severity === 'urgent' ? 'text-red-600' :
                    selectedScenario.riskTrend.severity === 'high' ? 'text-orange-600' : 'text-amber-600'
                  }`} />
                  <p className="text-sm font-semibold text-zinc-900">Risk Trend</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-end justify-between">
                    <span className="text-xs text-zinc-600">This month</span>
                    <span className={`font-[var(--font-heading)] text-2xl font-semibold ${
                      selectedScenario.riskTrend.severity === 'urgent' ? 'text-red-600' :
                      selectedScenario.riskTrend.severity === 'high' ? 'text-orange-600' : 'text-amber-600'
                    }`}>{selectedScenario.riskTrend.current}</span>
                  </div>
                  <div className="h-16 flex items-end gap-1">
                    {selectedScenario.riskTrend.data.map((val, i) => (
                      <div key={i} className={`flex-1 rounded-t ${
                        selectedScenario.riskTrend.severity === 'urgent' ? 'bg-red-200' :
                        selectedScenario.riskTrend.severity === 'high' ? 'bg-orange-200' : 'bg-amber-200'
                      }`} style={{ height: `${(val / selectedScenario.riskTrend.current) * 100}%` }}></div>
                    ))}
                  </div>
                  <p className="text-xs text-zinc-600">{selectedScenario.riskTrend.change}</p>
                </div>
              </div>

              <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
                <div className="mb-3 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-orange-600" />
                  <p className="text-sm font-semibold text-zinc-900">Top Signals</p>
                </div>
                <div className="space-y-2.5">
                  {selectedScenario.signals.map((signal, i) => (
                    <div key={i} className="flex items-center justify-between text-xs">
                      <span className="text-zinc-600">{signal.label}</span>
                      <span className={`font-semibold ${
                        signal.status === 'critical' ? 'text-red-700' :
                        signal.status === 'warning' ? 'text-amber-700' : 'text-zinc-900'
                      }`}>{signal.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
                <div className="mb-3 flex items-center gap-2">
                  <Target className="h-4 w-4 text-primary" />
                  <p className="text-sm font-semibold text-zinc-900">Intervention Window</p>
                </div>
                <div className="space-y-2.5">
                  <div className="rounded-lg bg-primary/10 px-3 py-2">
                    <p className="text-xs font-medium text-primary">{selectedScenario.intervention.priority}</p>
                    <p className="mt-0.5 text-lg font-semibold text-zinc-900">{selectedScenario.intervention.count} residents</p>
                  </div>
                  <p className="text-xs text-zinc-600">{selectedScenario.intervention.window}</p>
                </div>
              </div>
            </div>

            {/* Impact Strip - DYNAMIC BY SCENARIO */}
            <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900 p-5 sm:p-6 text-white shadow-lg">
              <div className="grid gap-6 sm:grid-cols-3">
                <div>
                  <p className="text-xs text-white/60 font-medium">Potential turnover cost</p>
                  <p className="mt-1 font-[var(--font-heading)] text-xl sm:text-2xl font-semibold text-white">{selectedScenario.impact.turnoverCost}</p>
                </div>
                <div>
                  <p className="text-xs text-white/60 font-medium">Est. retention with intervention</p>
                  <p className="mt-1 font-[var(--font-heading)] text-xl sm:text-2xl font-semibold text-primary">{selectedScenario.impact.retention}</p>
                </div>
                <div>
                  <p className="text-xs text-white/60 font-medium">Net cost avoidance</p>
                  <p className="mt-1 font-[var(--font-heading)] text-xl sm:text-2xl font-semibold text-primary">{selectedScenario.impact.avoidance}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detection Section - CUSTOM WEIGHTS PER PROPERTY */}
        <section className="scroll-mt-16 border-b border-zinc-200 bg-zinc-50 py-16 sm:py-20 lg:py-24" id="detection">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <Badge className="mb-3 border-zinc-300 bg-zinc-100 text-[12px] text-zinc-700 font-medium" variant="secondary">
                Risk Scoring
              </Badge>
              <h2 className="font-[var(--font-heading)] text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900">
                Precision scoring across your portfolio
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-[15px] text-zinc-600 leading-relaxed">
                Multi-signal churn risk model calibrated to property operations data
              </p>
            </div>

            {/* Property Selector */}
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {Object.values(PROPERTIES).map(prop => (
                <button
                  key={prop.id}
                  onClick={() => setDetectionProperty(prop.id)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                    detectionProperty === prop.id
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'border border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-50'
                  }`}
                  data-testid={`detection-property-${prop.id}`}
                >
                  {prop.name}
                </button>
              ))}
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-2">
              {/* Scoring Model - CUSTOMIZED PER PROPERTY */}
              <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
                <h3 className="mb-5 text-sm font-semibold text-zinc-900">Scoring Model · {selectedProperty.name}</h3>
                <div className="space-y-4">
                  <div>
                    <div className="mb-2 flex items-center justify-between text-xs">
                      <span className="font-medium text-zinc-700">Maintenance friction</span>
                      <span className="font-semibold text-zinc-900">{selectedProperty.scoringWeights.maintenance}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-zinc-100">
                      <div className="h-full rounded-full bg-red-500" style={{ width: `${selectedProperty.scoringWeights.maintenance}%` }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 flex items-center justify-between text-xs">
                      <span className="font-medium text-zinc-700">Engagement signals</span>
                      <span className="font-semibold text-zinc-900">{selectedProperty.scoringWeights.engagement}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-zinc-100">
                      <div className="h-full rounded-full bg-orange-500" style={{ width: `${selectedProperty.scoringWeights.engagement}%` }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 flex items-center justify-between text-xs">
                      <span className="font-medium text-zinc-700">Payment patterns</span>
                      <span className="font-semibold text-zinc-900">{selectedProperty.scoringWeights.payment}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-zinc-100">
                      <div className="h-full rounded-full bg-amber-500" style={{ width: `${selectedProperty.scoringWeights.payment}%` }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 flex items-center justify-between text-xs">
                      <span className="font-medium text-zinc-700">Tenure & history</span>
                      <span className="font-semibold text-zinc-900">{selectedProperty.scoringWeights.tenure}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-zinc-100">
                      <div className="h-full rounded-full bg-blue-500" style={{ width: `${selectedProperty.scoringWeights.tenure}%` }}></div>
                    </div>
                  </div>
                </div>
                
                {/* Model Insight */}
                <div className="mt-5 rounded-lg border border-primary/20 bg-primary/5 p-3">
                  <p className="text-xs text-zinc-700 leading-relaxed">
                    <span className="font-semibold text-primary">Model insight:</span> {selectedProperty.insight}
                  </p>
                </div>
              </div>

              {/* Results - PROPERTY RICH */}
              <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-sm font-semibold text-zinc-900">{selectedProperty.name}</h3>
                <div className="mb-4 grid grid-cols-3 gap-3">
                  <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3">
                    <p className="text-xs text-zinc-600 font-medium">Total units</p>
                    <p className="mt-1 font-[var(--font-heading)] text-xl font-semibold text-zinc-900">{selectedProperty.units}</p>
                  </div>
                  <div className="rounded-lg border border-red-200 bg-red-50 p-3">
                    <p className="text-xs text-zinc-600 font-medium">At risk</p>
                    <p className="mt-1 font-[var(--font-heading)] text-xl font-semibold text-red-700">{selectedProperty.atRisk}</p>
                  </div>
                  <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3">
                    <p className="text-xs text-zinc-600 font-medium">Avg. score</p>
                    <p className="mt-1 font-[var(--font-heading)] text-xl font-semibold text-zinc-900">{selectedProperty.avgScore}</p>
                  </div>
                </div>
                
                {/* Property-specific context */}
                <div className="mb-4 space-y-2.5 text-xs bg-zinc-50 rounded-lg p-3 border border-zinc-200">
                  <div className="flex justify-between">
                    <span className="text-zinc-600 font-medium">Maintenance:</span>
                    <span className="font-semibold text-zinc-900">{selectedProperty.maintenanceVolume}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-600 font-medium">Engagement:</span>
                    <span className="font-semibold text-zinc-900">{selectedProperty.engagementPattern}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-600 font-medium">Payment:</span>
                    <span className="font-semibold text-zinc-900">{selectedProperty.paymentPattern}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-600 font-medium">Renewal risk:</span>
                    <span className="font-semibold text-zinc-900 text-right flex-1 ml-2">{selectedProperty.renewalRisk}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-semibold text-zinc-700">High-risk residents</p>
                  {selectedProperty.topResidents.map((unit, i) => (
                    <div key={i} className="flex items-center justify-between rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-xs">
                      <span className="font-medium text-zinc-900">{unit}</span>
                      <span className="rounded-full bg-red-100 px-2 py-0.5 font-semibold text-red-700">Score: {selectedProperty.scores[i]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Concierge Section - UPGRADED RIGHT PANEL */}
        <section className="scroll-mt-16 border-b border-zinc-200 bg-white py-16 sm:py-20 lg:py-24" id="concierge">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <Badge className="mb-3 border-zinc-300 bg-zinc-100 text-[12px] text-zinc-700 font-medium" variant="secondary">
                Retention Actions
              </Badge>
              <h2 className="font-[var(--font-heading)] text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900">
                Automated concierge interventions
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-[15px] text-zinc-600 leading-relaxed">
                Deploy tiered credit offers matched to friction drivers with full resident experience
              </p>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {/* Left Panel: Channels */}
              <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
                <div className="mb-5 flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                    <MessageSquare className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-sm font-semibold text-zinc-900">Delivery Channels</h3>
                </div>
                <div className="space-y-3">
                  {/* 1. SMS - PRIMARY */}
                  <div className="flex items-center justify-between rounded-lg border-2 border-primary/20 bg-primary/5 px-4 py-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span className="text-sm font-semibold text-zinc-900">SMS delivery</span>
                    </div>
                    <Badge className="border-primary/20 bg-primary/10 text-primary text-xs" variant="secondary">Primary</Badge>
                  </div>
                  {/* 2. Mobile App - COMING SOON */}
                  <div className="flex items-center justify-between rounded-lg border border-dashed border-zinc-300 bg-white px-4 py-3">
                    <div className="flex items-center gap-3">
                      <MessageSquare className="h-4 w-4 text-zinc-400" />
                      <span className="text-sm font-medium text-zinc-500">Resident mobile app</span>
                    </div>
                    <span className="text-xs text-zinc-500">Coming soon</span>
                  </div>
                  {/* 3. Browser Backup */}
                  <div className="flex items-center justify-between rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-zinc-500" />
                      <span className="text-sm font-medium text-zinc-900">Browser notification</span>
                    </div>
                    <CheckCircle2 className="h-4 w-4 text-zinc-400" />
                  </div>
                </div>
              </div>

              {/* Right Panel: Intervention Flow - PREMIUM UPGRADE */}
              <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
                <div className="mb-5 flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                    <Gift className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-sm font-semibold text-zinc-900">Intervention Flow</h3>
                </div>
                <div className="space-y-5">
                  {/* Step 1 */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-sm font-bold text-red-700">1</div>
                    <div className="flex-1 pt-1">
                      <p className="text-[15px] font-semibold text-zinc-900 leading-snug">Risk detected</p>
                      <p className="mt-0.5 text-[13px] text-zinc-600 leading-relaxed">Score threshold triggered</p>
                    </div>
                    <AlertCircle className="h-5 w-5 text-red-600 mt-1.5 flex-shrink-0" />
                  </div>
                  
                  {/* Connector */}
                  <div className="ml-5 h-6 w-0.5 bg-gradient-to-b from-zinc-200 to-zinc-100"></div>
                  
                  {/* Step 2 */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-700">2</div>
                    <div className="flex-1 pt-1">
                      <p className="text-[15px] font-semibold text-zinc-900 leading-snug">Credit allocated</p>
                      <p className="mt-0.5 text-[13px] text-zinc-600 leading-relaxed">$10–$55 per service; free service for very high risk</p>
                    </div>
                    <CreditCard className="h-5 w-5 text-amber-600 mt-1.5 flex-shrink-0" />
                  </div>
                  
                  {/* Connector */}
                  <div className="ml-5 h-6 w-0.5 bg-gradient-to-b from-zinc-100 to-zinc-200"></div>
                  
                  {/* Step 3 */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">3</div>
                    <div className="flex-1 pt-1">
                      <p className="text-[15px] font-semibold text-zinc-900 leading-snug">Resident engagement</p>
                      <p className="mt-0.5 text-[13px] text-zinc-600 leading-relaxed">Book service or redeem credit</p>
                    </div>
                    <Calendar className="h-5 w-5 text-blue-600 mt-1.5 flex-shrink-0" />
                  </div>
                  
                  {/* Connector */}
                  <div className="ml-5 h-6 w-0.5 bg-gradient-to-b from-zinc-200 to-zinc-100"></div>
                  
                  {/* Step 4 */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">4</div>
                    <div className="flex-1 pt-1">
                      <p className="text-[15px] font-semibold text-zinc-900 leading-snug">Risk reduced</p>
                      <p className="mt-0.5 text-[13px] text-zinc-600 leading-relaxed">Retention probability increased</p>
                    </div>
                    <TrendingUp className="h-5 w-5 text-primary mt-1.5 flex-shrink-0" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Section - MORE INSIGHT */}
        <section className="scroll-mt-16 border-b border-zinc-200 bg-zinc-50 py-16 sm:py-20 lg:py-24" id="portfolio">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <Badge className="mb-3 border-zinc-300 bg-zinc-100 text-[12px] text-zinc-700 font-medium" variant="secondary">
                Portfolio Analytics
              </Badge>
              <h2 className="font-[var(--font-heading)] text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900">
                Retention performance across properties
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-[15px] text-zinc-600 leading-relaxed">
                Measure impact, compare properties, and track ROI trends
              </p>
            </div>

            {/* Toggle */}
            <div className="mt-8 flex justify-center">
              <div className="inline-flex gap-1 rounded-full border border-zinc-200 bg-zinc-50 p-1">
                <button
                  onClick={() => setPortfolioView('single')}
                  className={`rounded-full px-4 py-2 text-[13px] font-semibold transition-all ${
                    portfolioView === 'single'
                      ? 'bg-white text-zinc-900 shadow-sm'
                      : 'text-zinc-600 hover:text-zinc-900'
                  }`}
                  data-testid="portfolio-view-single"
                >
                  Single Property
                </button>
                <button
                  onClick={() => setPortfolioView('compare')}
                  className={`rounded-full px-4 py-2 text-[13px] font-semibold transition-all ${
                    portfolioView === 'compare'
                      ? 'bg-white text-zinc-900 shadow-sm'
                      : 'text-zinc-600 hover:text-zinc-900'
                  }`}
                  data-testid="portfolio-view-compare"
                >
                  Compare All
                </button>
              </div>
            </div>

            {portfolioView === 'single' ? (
              <div className="mt-8">
                {/* Metric Explanations */}
                <div className="mb-6 rounded-xl border border-primary/20 bg-primary/5 p-5">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-zinc-900 mb-2">Understanding Riverside Towers Performance</p>
                      <p className="text-[13px] text-zinc-700 leading-relaxed">{PROPERTIES.riverside.profile}</p>
                    </div>
                  </div>
                </div>

                <p className="mb-5 text-center text-sm font-medium text-zinc-700">{PROPERTIES.riverside.name} · 12-Month Results</p>
                <div className="grid gap-4 sm:grid-cols-3 mb-6">
                  <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
                    <p className="text-xs text-zinc-600 font-medium">Net retention ROI</p>
                    <p className="mt-2 font-[var(--font-heading)] text-3xl font-semibold text-primary">${PROPERTIES.riverside.roi.toLocaleString()}</p>
                    <p className="mt-1 text-xs font-medium text-primary">{PROPERTIES.riverside.trend}</p>
                    <p className="mt-2 text-xs text-zinc-500 leading-relaxed">Total value recovered by preventing resident turnover</p>
                  </div>
                  <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
                    <p className="text-xs text-zinc-600 font-medium">Retained residents</p>
                    <p className="mt-2 font-[var(--font-heading)] text-3xl font-semibold text-zinc-900">{PROPERTIES.riverside.retainedCount}</p>
                    <p className="mt-1 text-xs text-zinc-600">{PROPERTIES.riverside.retentionRate}% retention rate</p>
                    <p className="mt-2 text-xs text-zinc-500 leading-relaxed">At-risk residents successfully retained through intervention</p>
                  </div>
                  <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
                    <p className="text-xs text-zinc-600 font-medium">ROI multiple</p>
                    <p className="mt-2 font-[var(--font-heading)] text-3xl font-semibold text-zinc-900">{PROPERTIES.riverside.roiMultiple}</p>
                    <p className="mt-1 text-xs text-primary">{PROPERTIES.riverside.trend}</p>
                    <p className="mt-2 text-xs text-zinc-500 leading-relaxed">Return per dollar spent on intervention credits</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-8">
                {/* Comparison Insight */}
                <div className="mb-6 rounded-xl border border-primary/20 bg-primary/5 p-5">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-zinc-900 mb-2">Portfolio Comparison</p>
                      <p className="text-[13px] text-zinc-700 leading-relaxed">
                        <strong>Riverside Towers</strong> shows highest maintenance burden with strong recovery upside. 
                        <strong>Parkview Plaza</strong> leads in retention rate driven by better engagement and payment performance. 
                        <strong>Summit Ridge</strong> represents largest scale opportunity with concentrated payment and service risk.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {Object.values(PROPERTIES).map((prop) => (
                    <div key={prop.id} className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
                      <div className="flex flex-col gap-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-3">
                            <Building2 className="h-5 w-5 flex-shrink-0 text-zinc-500 mt-0.5" />
                            <div>
                              <p className="text-sm font-semibold text-zinc-900">{prop.name}</p>
                              <p className="text-xs text-zinc-600 mt-0.5">{prop.units} units · {prop.retentionRate}% retention · {prop.profile}</p>
                            </div>
                          </div>
                          <div className="flex flex-wrap items-center gap-3 sm:gap-6">
                            <div className="text-right">
                              <p className="text-xs text-zinc-600 font-medium">At risk</p>
                              <p className="mt-0.5 text-sm font-semibold text-red-700">{prop.atRisk}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-zinc-600 font-medium">ROI</p>
                              <p className="mt-0.5 text-sm font-semibold text-primary">${prop.roi.toLocaleString()}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-zinc-600 font-medium">Multiple</p>
                              <p className="mt-0.5 text-sm font-semibold text-zinc-900">{prop.roiMultiple}</p>
                            </div>
                          </div>
                        </div>
                        {/* Bar comparison */}
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-zinc-600 font-medium w-20">Retention:</span>
                          <div className="flex-1 h-2 bg-zinc-100 rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full" style={{ width: `${prop.retentionRate}%` }}></div>
                          </div>
                          <span className="text-xs font-semibold text-zinc-900 w-12 text-right">{prop.retentionRate}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ROI Section - PREMIUM EMPHASIS */}
        <section className="scroll-mt-16 relative overflow-hidden py-20 sm:py-24 lg:py-28" id="roi">
          <div className="absolute inset-0 bg-slate-900"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950/40 via-slate-900/40 to-slate-900/20"></div>
          
          <div className="relative mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8">
            {/* Section Heading */}
            <div className="text-center mb-10">
              <Badge className="mb-4 border-primary/20 bg-primary/10 text-[13px] text-primary font-medium px-3 py-1.5" variant="secondary">
                ROI Calculator
              </Badge>
              <h2 className="font-[var(--font-heading)] text-4xl sm:text-[44px] lg:text-[48px] font-semibold tracking-tight text-white leading-tight">
                Model your retention economics
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-[15px] text-white/70 leading-relaxed">
                Adjust assumptions to project ROI for your portfolio
              </p>
            </div>

            {/* BIG ROI CARD - STRONGER EMPHASIS */}
            <div className="mb-8 rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/15 to-primary/5 p-8 sm:p-10 text-center backdrop-blur-sm shadow-2xl">
              <p className="text-sm text-white/80 font-semibold uppercase tracking-wide mb-3">Projected Net ROI</p>
              <p className="font-[var(--font-heading)] text-5xl sm:text-6xl lg:text-7xl font-bold text-primary leading-none" data-testid="roi-result">
                ${netROI.toLocaleString()}
              </p>
              <p className="mt-4 text-base text-white/80 font-medium">{roiMultiple}x return on credit investment</p>
            </div>

            {/* FORMULA ROW - MORE SEPARATION */}
            <div className="mb-8 flex flex-wrap justify-center gap-2 text-xs sm:text-sm">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 sm:px-4 py-1.5 sm:py-2 text-white/70 font-medium">Units × Risk %</span>
              <span className="text-white/40 self-center text-base">×</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 sm:px-4 py-1.5 sm:py-2 text-white/70 font-medium">Retention</span>
              <span className="text-white/40 self-center text-base">×</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 sm:px-4 py-1.5 sm:py-2 text-white/70 font-medium">Turnover Cost</span>
              <span className="text-white/40 self-center text-base">−</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 sm:px-4 py-1.5 sm:py-2 text-white/70 font-medium">Credit Spend</span>
            </div>

            {/* SLIDERS CARD - BETTER SEPARATION */}
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6 sm:p-7 backdrop-blur-sm shadow-xl">
              <div className="space-y-6">
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <label className="text-[15px] font-semibold text-white">Total Units</label>
                    <span className="font-[var(--font-heading)] text-lg font-bold text-white">{roiSliders.units}</span>
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

                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <label className="text-[15px] font-semibold text-white">At-Risk %</label>
                    <span className="font-[var(--font-heading)] text-lg font-bold text-white">{roiSliders.riskPct}%</span>
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

                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <label className="text-[15px] font-semibold text-white">Credit per Resident</label>
                    <span className="font-[var(--font-heading)] text-lg font-bold text-white">${roiSliders.creditCost}</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="300"
                    step="5"
                    value={roiSliders.creditCost}
                    onChange={(e) => setRoiSliders({ ...roiSliders, creditCost: parseInt(e.target.value) })}
                    className="w-full"
                    data-testid="roi-slider-credit"
                  />
                </div>
              </div>

              {/* DERIVED METRICS - LARGER, FULLER TYPOGRAPHY */}
              <div className="mt-7 grid gap-4 border-t border-white/10 pt-6 grid-cols-2 lg:grid-cols-4">
                <div>
                  <p className="text-sm text-white/70 font-semibold mb-1.5">At-risk</p>
                  <p className="font-[var(--font-heading)] text-2xl font-bold text-white">{atRiskUnits}</p>
                </div>
                <div>
                  <p className="text-sm text-white/70 font-semibold mb-1.5">Retained</p>
                  <p className="font-[var(--font-heading)] text-2xl font-bold text-white">{retainedUnits}</p>
                </div>
                <div>
                  <p className="text-sm text-white/70 font-semibold mb-1.5">Avoidance</p>
                  <p className="font-[var(--font-heading)] text-2xl font-bold text-primary">${costAvoidance.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-white/70 font-semibold mb-1.5">Credit</p>
                  <p className="font-[var(--font-heading)] text-2xl font-bold text-white">${creditSpend.toLocaleString()}</p>
                </div>
              </div>

              <p className="mt-6 text-center text-xs text-white/50 leading-relaxed">
                Assumes 62% retention rate and $4,083 avg. turnover cost
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="border-t border-zinc-200 bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="font-[var(--font-heading)] text-2xl font-semibold tracking-tight text-zinc-900">
              Ready to see the platform?
            </h2>
            <p className="mt-3 text-sm text-zinc-600 leading-relaxed">
              Explore admin dashboards, manager workflows, and resident interfaces with Seattle portfolio demo data
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="h-11 rounded-full px-6 text-[15px] shadow-none" data-testid="landing-final-cta">
                <Link to="/login">
                  Explore Platform
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
