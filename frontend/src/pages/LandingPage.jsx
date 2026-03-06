import { ArrowRight, ChartColumnBig, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { CookieNoticeBar } from "@/components/public/CookieNoticeBar";
import { PublicFooter } from "@/components/public/PublicFooter";
import { EnvironmentBadge } from "@/components/layout/EnvironmentBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CountUp } from "@/components/ui/count-up";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/AuthContext";
import { publicApi } from "@/lib/api";

export default function LandingPage() {
  const { session } = useAuth();
  const [loading, setLoading] = useState(true);
  const [overview, setOverview] = useState(null);

  useEffect(() => {
    const loadOverview = async () => {
      try {
        const response = await publicApi.getOverview();
        setOverview(response.data);
      } finally {
        setLoading(false);
      }
    };

    loadOverview();
  }, []);

  const heroStats = overview?.hero_stats || [];
  const signals = overview?.signals || [];
  const flaggedResidents = overview?.flagged_residents || [];
  const scoringWeights = overview?.scoring_weights || [];
  const flagshipMetrics = overview?.flagship_metrics || [];
  const portfolioMetrics = overview?.portfolio_metrics || [];
  const financialMetrics = overview?.financial_metrics || [];
  const properties = overview?.properties || [];

  return (
    <div className="min-h-screen bg-background" data-testid="landing-page-root">
      <motion.div 
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.24, ease: "easeOut" }}
        className="teal-mist border-b border-border/70"
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/12 text-primary" data-testid="landing-brand-mark">
              <Sparkles className="h-5 w-5" strokeWidth={1.75} />
            </div>
            <div>
              <p className="font-[var(--font-heading)] text-lg font-semibold tracking-[-0.02em] text-foreground">HappyCo Concierge</p>
              <p className="text-xs text-muted-foreground">Retention Intelligence Platform</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {session?.app_env === "preview" ? (
              <EnvironmentBadge appEnv={session.app_env} dataTestId="landing-environment-badge" />
            ) : null}
            <Button asChild className="rounded-full" data-testid="landing-sign-in-button">
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </motion.div>

      <main className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.32, delay: 0.12, ease: [0.25, 0.1, 0.25, 1] }}
          className="grid gap-8 rounded-[32px] border border-border/80 bg-card/90 p-8 shadow-[var(--shadow-soft)] lg:grid-cols-[minmax(0,1.1fr)_400px] lg:p-10" 
          data-testid="landing-hero-section"
        >
          <div className="space-y-6">
            <Badge className="w-fit bg-primary/10 text-primary" data-testid="landing-hero-badge" variant="secondary">
              Retention Intelligence Platform
            </Badge>
            <div>
              <h1 className="max-w-4xl font-[var(--font-heading)] text-4xl font-semibold tracking-[-0.02em] text-foreground sm:text-5xl lg:text-6xl" data-testid="landing-hero-title">
                Predict and Prevent Resident Churn
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
                Transform operational data into retention insights. Intervene before residents decide to leave. Measure financial impact across your portfolio.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button asChild className="rounded-full px-5" data-testid="landing-explore-platform-button" size="lg">
                <Link to="/login">
                  Explore Platform
                  <ArrowRight className="ml-2 h-4 w-4" strokeWidth={1.75} />
                </Link>
              </Button>
              <Button asChild className="rounded-full px-5" data-testid="landing-secondary-sign-in-button" size="lg" variant="outline">
                <Link to="/login">Sign In</Link>
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-3" data-testid="landing-hero-stats-grid">
              {loading
                ? Array.from({ length: 3 }).map((_, index) => <Skeleton className="h-32 rounded-2xl" key={index} />)
                : heroStats.map((stat, index) => (
                    <motion.div
                      key={stat.key}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.28, delay: 0.4 + index * 0.08, ease: "easeOut" }}
                    >
                      <Card className="happyco-card border-border/70 transition-shadow hover:shadow-[var(--shadow-hard)]" data-testid={`landing-hero-stat-${stat.key}`}>
                        <CardContent className="p-6">
                          <p className="font-[var(--font-heading)] text-3xl font-semibold tracking-[-0.02em] text-foreground">
                            {stat.value.replace(/[^\d]/g, '') ? (
                              <CountUp 
                                end={parseInt(stat.value.replace(/[^\d]/g, ''))} 
                                prefix={stat.value.match(/^\$/)?'$':''}
                                suffix={stat.value.match(/%/)?'%':''} 
                                duration={1100}
                              />
                            ) : stat.value}
                          </p>
                          <p className="mt-2 text-sm font-medium text-muted-foreground">{stat.label}</p>
                          {stat.detail ? <p className="mt-1 text-xs text-muted-foreground">{stat.detail}</p> : null}
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
            </div>
          </div>

          <Card className="happyco-card border-border/70" data-testid="landing-insight-panel">
            <CardHeader>
              <CardTitle className="text-xl tracking-[-0.02em]">The Insight</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="rounded-2xl border border-border/80 bg-muted/35 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.08em] text-muted-foreground">Risk Score Trend</p>
                    <p className="mt-2 text-sm font-medium text-foreground">High Risk</p>
                  </div>
                  <p className="font-[var(--font-heading)] text-4xl font-semibold tracking-[-0.02em] text-foreground">{flaggedResidents[0]?.score || "—"}</p>
                </div>
              </div>
              <div className="space-y-3">
                {loading
                  ? Array.from({ length: 3 }).map((_, index) => <Skeleton className="h-12 rounded-xl" key={index} />)
                  : signals.map((signal) => (
                      <div className="flex items-center justify-between rounded-xl border border-border/80 bg-muted/40 p-3" key={signal.label}>
                        <span className="text-sm text-muted-foreground">{signal.label}</span>
                        <span className="font-medium text-foreground">{signal.value}</span>
                      </div>
                    ))}
              </div>
              <div className="rounded-2xl border border-border/80 bg-secondary/35 p-4 text-sm text-secondary-foreground">
                Frequent service requests, slower resolution, and informal AI concierge conversations together surface churn risk as a leading indicator before a resident gives notice.
              </div>
            </CardContent>
          </Card>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.32, ease: "easeOut" }}
          className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]" 
          data-testid="landing-churn-detection-section"
        >
          <Card className="happyco-card">
            <CardHeader>
              <CardTitle className="text-xl tracking-[-0.02em]">Identify At-Risk Residents Automatically</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex flex-wrap gap-2" data-testid="landing-property-chip-list">
                {properties.map((property) => (
                  <Badge className="rounded-full bg-muted text-muted-foreground" data-testid={`landing-property-chip-${property.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} key={property} variant="secondary">
                    {property}
                  </Badge>
                ))}
              </div>
              <div className="rounded-2xl border border-border/80 bg-muted/35 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Scoring Model</p>
                    <p className="mt-1 text-sm text-muted-foreground">Operational signals as leading indicators</p>
                  </div>
                  <ChartColumnBig className="h-5 w-5 text-primary" strokeWidth={1.75} />
                </div>
                <div className="mt-4 space-y-3">
                  {scoringWeights.map((weight) => (
                    <div className="flex items-center justify-between text-sm" key={weight.label}>
                      <span className="text-muted-foreground">{weight.label}</span>
                      <span className="font-medium text-foreground">{weight.weight}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="happyco-card">
            <CardHeader>
              <CardTitle className="text-xl tracking-[-0.02em]">The Metropolitan at Riverside Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid gap-3 sm:grid-cols-3">
                {flagshipMetrics.map((metric) => (
                  <div className="rounded-2xl border border-border/80 bg-muted/35 p-4" data-testid={`landing-flagship-metric-${metric.key}`} key={metric.key}>
                    <p className="font-[var(--font-heading)] text-2xl font-semibold tracking-[-0.02em] text-foreground">{metric.value}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{metric.label}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-3">
                {flaggedResidents.map((resident) => (
                  <div className="flex items-center justify-between rounded-2xl border border-border/80 bg-card p-4" data-testid={`landing-flagged-resident-${resident.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} key={resident.resident_id}>
                    <div>
                      <p className="font-medium text-foreground">{resident.name}</p>
                      <p className="text-sm text-muted-foreground">{resident.property_name} • Unit {resident.unit_number}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-[var(--font-heading)] text-xl font-semibold tracking-[-0.02em] text-foreground">{resident.score}</p>
                      <p className="text-xs uppercase tracking-[0.08em] text-muted-foreground">Risk score</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.32, ease: "easeOut" }}
          className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)]" 
          data-testid="landing-concierge-section"
        >
          <Card className="happyco-card overflow-hidden">
            <img
              alt="Modern apartment living space"
              className="h-64 w-full object-cover"
              data-testid="landing-concierge-image"
              src="https://images.unsplash.com/photo-1647527269452-cbed2aba8671?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwzfHxtaW5pbWFsJTIwbW9kZXJuJTIwY2l0eSUyMHNreWxpbmUlMjBtb3JuaW5nJTIwaGF6ZXxlbnwwfHx8Ymx1ZXwxNzcyNzcxMTg5fDA&ixlib=rb-4.1.0&q=85"
            />
            <CardContent className="space-y-4 p-6">
              <div>
                <p className="text-sm uppercase tracking-[0.08em] text-muted-foreground">Concierge Experience</p>
                <h2 className="mt-2 font-[var(--font-heading)] text-2xl font-semibold tracking-[-0.02em] text-foreground">
                  Transform Negative Experiences Into Positive Moments
                </h2>
              </div>
              <blockquote className="rounded-2xl border border-border/80 bg-muted/35 p-5 text-base leading-7 text-foreground">
                “The concierge reached out right after the second AC delay and made it feel like someone was finally owning the problem.”
                <footer className="mt-3 text-sm text-muted-foreground">— Alex Chen, The Metropolitan at Riverside</footer>
              </blockquote>
            </CardContent>
          </Card>

          <Card className="happyco-card">
            <CardHeader>
              <CardTitle className="text-xl tracking-[-0.02em]">Portfolio-Level Visibility for Operators</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2">
              {portfolioMetrics.map((metric) => (
                <div className="rounded-2xl border border-border/80 bg-muted/35 p-4" data-testid={`landing-portfolio-metric-${metric.key}`} key={metric.key}>
                  <p className="font-[var(--font-heading)] text-2xl font-semibold tracking-[-0.02em] text-foreground">{metric.value}</p>
                  <p className="mt-2 text-sm text-foreground">{metric.label}</p>
                  {metric.detail ? <p className="mt-1 text-sm text-muted-foreground">{metric.detail}</p> : null}
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.32, ease: "easeOut" }}
          className="mt-10"
        >
          <Card className="happyco-card border-border/80 bg-card/95">
            <CardContent className="flex flex-col gap-6 p-6 lg:flex-row lg:items-center lg:justify-between lg:p-8">
              <div>
                <p className="text-sm uppercase tracking-[0.08em] text-muted-foreground">Financial Impact</p>
                <h2 className="mt-2 font-[var(--font-heading)] text-3xl font-semibold tracking-[-0.02em] text-foreground">Calculate Your Retention ROI</h2>
                <p className="mt-3 max-w-3xl text-sm text-muted-foreground">
                  Turnover avoided plus service revenue minus credits invested equals retention ROI. Credits remain separate from gross revenue all the way through the data model.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {financialMetrics.map((metric) => (
                  <div className="rounded-2xl border border-border/80 bg-muted/35 p-4" data-testid={`landing-financial-metric-${metric.key}`} key={metric.key}>
                    <p className="font-[var(--font-heading)] text-2xl font-semibold tracking-[-0.02em] text-foreground">{metric.value}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{metric.label}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.32, ease: "easeOut" }}
          className="mt-10" 
          data-testid="landing-cta-section"
        >
          <Card className="happyco-card surface-noise border-border/80 bg-card/95 p-3">
            <CardContent className="flex flex-col gap-6 rounded-[24px] border border-border/70 bg-gradient-to-br from-muted/40 to-muted/20 p-8 lg:flex-row lg:items-center lg:justify-between lg:p-10">
              <div>
                <Badge className="mb-3 w-fit bg-primary/10 text-primary" variant="secondary">Ready to Explore?</Badge>
                <h2 className="font-[var(--font-heading)] text-3xl font-semibold tracking-[-0.02em] text-foreground lg:text-4xl">
                  Sign in to experience the admin dashboard and flagship property workflow.
                </h2>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button asChild className="rounded-full px-6 shadow-md transition-all hover:shadow-lg active:scale-[0.98]" data-testid="landing-cta-sign-in-button" size="lg">
                  <Link to="/login">
                    Sign In to Demo
                    <ArrowRight className="ml-2 h-4 w-4" strokeWidth={1.75} />
                  </Link>
                </Button>
                <Button asChild className="rounded-full px-6" data-testid="landing-cta-legal-link" size="lg" variant="outline">
                  <Link to="/legal">View legal notice</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </main>

      <PublicFooter />
      <CookieNoticeBar notice={overview?.cookie_notice} />
    </div>
  );
}
