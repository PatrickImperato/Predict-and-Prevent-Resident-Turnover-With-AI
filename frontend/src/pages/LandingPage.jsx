import { ArrowRight, Building2, ChartColumnBig, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

import { EnvironmentBadge } from "@/components/layout/EnvironmentBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";

const heroStats = [
  { label: "Avg. turnover cost", value: "$-13,582" },
  { label: "Annual turnover rate", value: "10–15%" },
  { label: "Portfolio ROI example", value: "$-1,773K" },
];

const signals = [
  { label: "Maintenance requests", value: "8" },
  { label: "Sentiment score", value: "-2.4" },
  { label: "Avg. response time", value: "4.2 days" },
];

const scoringWeights = [
  { label: "Maintenance Frequency", value: "30%" },
  { label: "Resolution Time", value: "25%" },
  { label: "Sentiment Analysis", value: "25%" },
  { label: "Engagement Level", value: "20%" },
];

const flaggedResidents = [
  { initials: "AC", name: "Alex Chen", unit: "Unit 501", score: "80" },
  { initials: "MS", name: "Maria Santos", unit: "Unit 312", score: "74" },
  { initials: "JW", name: "James Wilson", unit: "Unit 205", score: "68" },
];

const properties = [
  "Lakeside Commons",
  "Downtown Tower",
  "The Metropolitan at Riverside",
];

const portfolioMetrics = [
  { label: "Property Revenue", value: "$7,469", detail: "The Metropolitan at Riverside" },
  { label: "Provider Coverage", value: "85%", detail: "Service categories covered" },
  { label: "Fulfillment Rate", value: "94%", detail: "Bookings completed" },
  { label: "Retention ROI", value: "$496,453", detail: "Portfolio total" },
];

export default function LandingPage() {
  const { session } = useAuth();

  return (
    <div className="min-h-screen bg-background" data-testid="landing-page-root">
      <div className="teal-mist border-b border-border/70">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
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
      </div>

      <main className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section className="grid gap-8 rounded-[32px] border border-border/80 bg-card/90 p-6 shadow-[var(--shadow-soft)] lg:grid-cols-[minmax(0,1.1fr)_400px] lg:p-8" data-testid="landing-hero-section">
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
              {heroStats.map((stat) => (
                <Card className="happyco-card border-border/70" data-testid={`landing-hero-stat-${stat.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} key={stat.label}>
                  <CardContent className="p-5">
                    <p className="font-[var(--font-heading)] text-3xl font-semibold tracking-[-0.02em] text-foreground">{stat.value}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Card className="happyco-card border-border/70" data-testid="landing-insight-panel">
            <CardHeader>
              <CardTitle className="text-xl tracking-[-0.02em]">The Insight</CardTitle>
              <CardDescription>Operational data can predict resident churn.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="rounded-2xl border border-border/80 bg-muted/35 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.08em] text-muted-foreground">Risk Score Trend</p>
                    <p className="mt-2 text-sm font-medium text-foreground">High Risk</p>
                  </div>
                  <p className="font-[var(--font-heading)] text-4xl font-semibold tracking-[-0.02em] text-foreground">78</p>
                </div>
              </div>
              <div className="space-y-3">
                {signals.map((signal) => (
                  <div className="flex items-center justify-between rounded-xl border border-border/80 bg-muted/40 p-3" key={signal.label}>
                    <span className="text-sm text-muted-foreground">{signal.label}</span>
                    <span className="font-medium text-foreground">{signal.value}</span>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl border border-border/80 bg-secondary/35 p-4 text-sm text-secondary-foreground">
                Frequent service requests and slower resolution times signal declining satisfaction. Early detection enables proactive retention offers before the decision point.
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]" data-testid="landing-churn-detection-section">
          <Card className="happyco-card">
            <CardHeader>
              <CardTitle className="text-xl tracking-[-0.02em]">Identify At-Risk Residents Automatically</CardTitle>
              <CardDescription>Scoring stays configurable while surfacing the residents most in need of intervention.</CardDescription>
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
                    <p className="mt-1 text-sm text-muted-foreground">Demo model • configurable</p>
                  </div>
                  <ChartColumnBig className="h-5 w-5 text-primary" strokeWidth={1.75} />
                </div>
                <div className="mt-4 space-y-3">
                  {scoringWeights.map((weight) => (
                    <div className="flex items-center justify-between text-sm" key={weight.label}>
                      <span className="text-muted-foreground">{weight.label}</span>
                      <span className="font-medium text-foreground">{weight.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="happyco-card">
            <CardHeader>
              <CardTitle className="text-xl tracking-[-0.02em]">The Metropolitan at Riverside Results</CardTitle>
              <CardDescription>Flagship property example with portfolio-grade scoring visibility.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-border/80 bg-muted/35 p-4">
                  <p className="font-[var(--font-heading)] text-2xl font-semibold tracking-[-0.02em] text-foreground">100</p>
                  <p className="mt-1 text-sm text-muted-foreground">Total units</p>
                </div>
                <div className="rounded-2xl border border-border/80 bg-muted/35 p-4">
                  <p className="font-[var(--font-heading)] text-2xl font-semibold tracking-[-0.02em] text-foreground">12</p>
                  <p className="mt-1 text-sm text-muted-foreground">At risk</p>
                </div>
                <div className="rounded-2xl border border-border/80 bg-muted/35 p-4">
                  <p className="font-[var(--font-heading)] text-2xl font-semibold tracking-[-0.02em] text-foreground">58</p>
                  <p className="mt-1 text-sm text-muted-foreground">Avg. score</p>
                </div>
              </div>
              <div className="space-y-3">
                {flaggedResidents.map((resident) => (
                  <div className="flex items-center justify-between rounded-2xl border border-border/80 bg-card p-4" data-testid={`landing-flagged-resident-${resident.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} key={resident.name}>
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/12 font-medium text-primary">
                        {resident.initials}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{resident.name}</p>
                        <p className="text-sm text-muted-foreground">{resident.unit}</p>
                      </div>
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
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)]" data-testid="landing-concierge-section">
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
                “The concierge reached out after my AC issue and offered a cleaning credit. Made all the difference.”
                <footer className="mt-3 text-sm text-muted-foreground">— Resident, The Metropolitan at Riverside</footer>
              </blockquote>
            </CardContent>
          </Card>

          <Card className="happyco-card">
            <CardHeader>
              <CardTitle className="text-xl tracking-[-0.02em]">Portfolio-Level Visibility for Operators</CardTitle>
              <CardDescription>Compare properties, track adoption, and measure retention outcomes across the portfolio.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2">
              {portfolioMetrics.map((metric) => (
                <div className="rounded-2xl border border-border/80 bg-muted/35 p-4" data-testid={`landing-portfolio-metric-${metric.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} key={metric.label}>
                  <p className="font-[var(--font-heading)] text-2xl font-semibold tracking-[-0.02em] text-foreground">{metric.value}</p>
                  <p className="mt-2 text-sm text-foreground">{metric.label}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{metric.detail}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section className="mt-8">
          <Card className="happyco-card border-border/80 bg-card/95">
            <CardContent className="flex flex-col gap-6 p-6 lg:flex-row lg:items-center lg:justify-between lg:p-8">
              <div>
                <p className="text-sm uppercase tracking-[0.08em] text-muted-foreground">Financial Impact</p>
                <h2 className="mt-2 font-[var(--font-heading)] text-3xl font-semibold tracking-[-0.02em] text-foreground">Calculate Your Retention ROI</h2>
                <p className="mt-3 max-w-3xl text-sm text-muted-foreground">
                  Turnover Avoided + Service Revenue - Credits Invested = Retention ROI. Demo assumptions: $3,800 turnover cost and annualized calculations.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-border/80 bg-muted/35 p-4">
                  <p className="font-[var(--font-heading)] text-2xl font-semibold tracking-[-0.02em] text-foreground">$37,000</p>
                  <p className="mt-2 text-sm text-muted-foreground">Estimated Annual ROI</p>
                </div>
                <div className="rounded-2xl border border-border/80 bg-muted/35 p-4">
                  <p className="font-[var(--font-heading)] text-2xl font-semibold tracking-[-0.02em] text-foreground">$500</p>
                  <p className="mt-2 text-sm text-muted-foreground">Credits invested per month</p>
                </div>
                <div className="rounded-2xl border border-border/80 bg-muted/35 p-4">
                  <p className="font-[var(--font-heading)] text-2xl font-semibold tracking-[-0.02em] text-foreground">5</p>
                  <p className="mt-2 text-sm text-muted-foreground">Avoided turnovers per year</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mt-8" data-testid="landing-cta-section">
          <Card className="happyco-card surface-noise border-border/80 bg-card/95 p-2">
            <CardContent className="flex flex-col gap-5 rounded-[24px] border border-border/70 bg-muted/35 p-6 lg:flex-row lg:items-center lg:justify-between lg:p-8">
              <div>
                <p className="text-sm uppercase tracking-[0.08em] text-muted-foreground">Ready to Explore?</p>
                <h2 className="mt-2 font-[var(--font-heading)] text-3xl font-semibold tracking-[-0.02em] text-foreground">Sign in to experience the platform across the demo roles.</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild className="rounded-full px-5" data-testid="landing-cta-sign-in-button" size="lg">
                  <Link to="/login">Sign In to Demo</Link>
                </Button>
                <Button asChild className="rounded-full px-5" data-testid="landing-cta-diagnostics-link" size="lg" variant="outline">
                  <Link to="/login">Open Admin Preview</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
