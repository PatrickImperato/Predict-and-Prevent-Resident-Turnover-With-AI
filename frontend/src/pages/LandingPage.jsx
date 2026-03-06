import { ArrowRight, Sparkles, CheckCircle, TrendingUp, Zap, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EnvironmentBadge } from "@/components/layout/EnvironmentBadge";
import { PublicFooter } from "@/components/public/PublicFooter";
import { CookieNoticeBar } from "@/components/public/CookieNoticeBar";
import { useAuth } from "@/context/AuthContext";

export default function LandingPage() {
  const { session } = useAuth();

  return (
    <div className="min-h-screen bg-background" data-testid="landing-page-root">
      {/* Top Navigation Bar */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.24, ease: "easeOut" }}
        className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md"
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-3 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary" data-testid="landing-brand-mark">
              <Sparkles className="h-4 w-4" strokeWidth={2} />
            </div>
            <p className="font-[var(--font-heading)] text-base font-semibold tracking-tight text-foreground">
              HappyCo Concierge
            </p>
          </div>

          <div className="flex items-center gap-3">
            {session?.app_env === "preview" && (
              <EnvironmentBadge appEnv={session.app_env} dataTestId="landing-environment-badge" />
            )}
            <Button asChild variant="ghost" size="sm" className="h-8 text-sm" data-testid="landing-view-demo-nav">
              <Link to="/login">View Live Demo</Link>
            </Button>
            <Button asChild size="sm" className="h-8 text-sm" data-testid="landing-sign-in-nav">
              <Link to="/login">Sign in to demo</Link>
            </Button>
          </div>
        </div>
      </motion.div>

      <main className="mx-auto max-w-[1400px] px-6 py-16 lg:px-8 lg:py-20">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.32, delay: 0.08, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-20 text-center"
          data-testid="landing-hero-section"
        >
          <Badge
            className="mb-4 border-border/60 bg-muted/60 text-muted-foreground hover:bg-muted/60"
            variant="secondary"
            data-testid="landing-hero-badge"
          >
            HappyCo Concierge
          </Badge>
          
          <h1 className="mx-auto max-w-3xl font-[var(--font-heading)] text-5xl font-semibold tracking-[-0.03em] text-foreground lg:text-6xl" data-testid="landing-hero-title">
            Predict resident churn early
          </h1>
          
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Help property managers spot friction sooner, take action earlier, and reduce vacancy using HappyCo operational data.
          </p>
          
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="h-10 px-5 text-sm shadow-sm" data-testid="landing-hero-cta">
              <Link to="/login">
                View Live Demo
                <ArrowRight className="ml-2 h-4 w-4" strokeWidth={2} />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-10 px-5 text-sm" data-testid="landing-hero-secondary-cta">
              <Link to="/login">Sign in to demo</Link>
            </Button>
          </div>

          {/* Product Visual */}
          <div className="mx-auto mt-12 max-w-5xl">
            <div className="rounded-xl border border-border/60 bg-card p-1 shadow-sm">
              <div className="overflow-hidden rounded-lg border border-border/40 bg-muted/30">
                <div className="grid gap-px bg-border/30 md:grid-cols-3">
                  <div className="bg-card p-5">
                    <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
                      <Zap className="h-4 w-4" strokeWidth={2} />
                    </div>
                    <p className="text-sm font-semibold text-foreground">Detect Early</p>
                    <p className="mt-1 text-xs text-muted-foreground">Spot friction 4+ months before move-out</p>
                  </div>
                  <div className="bg-card p-5">
                    <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
                      <TrendingUp className="h-4 w-4" strokeWidth={2} />
                    </div>
                    <p className="text-sm font-semibold text-foreground">Act Sooner</p>
                    <p className="mt-1 text-xs text-muted-foreground">Deploy targeted retention interventions</p>
                  </div>
                  <div className="bg-card p-5">
                    <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
                      <BarChart3 className="h-4 w-4" strokeWidth={2} />
                    </div>
                    <p className="text-sm font-semibold text-foreground">Measure ROI</p>
                    <p className="mt-1 text-xs text-muted-foreground">Track savings and service revenue</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Proof Metrics */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.32, ease: "easeOut" }}
          className="mb-20"
        >
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-5 md:grid-cols-3">
              <div className="rounded-lg border border-border/60 bg-card p-5 text-center">
                <p className="font-[var(--font-heading)] text-3xl font-semibold tracking-tight text-foreground">35</p>
                <p className="mt-1 text-sm text-muted-foreground">At-risk residents identified</p>
              </div>
              <div className="rounded-lg border border-border/60 bg-card p-5 text-center">
                <p className="font-[var(--font-heading)] text-3xl font-semibold tracking-tight text-teal-600">$82,550</p>
                <p className="mt-1 text-sm text-muted-foreground">Net retention ROI</p>
              </div>
              <div className="rounded-lg border border-border/60 bg-card p-5 text-center">
                <p className="font-[var(--font-heading)] text-3xl font-semibold tracking-tight text-foreground">6.55x</p>
                <p className="mt-1 text-sm text-muted-foreground">Return on investment</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* How It Works */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.32, ease: "easeOut" }}
          className="mb-20"
        >
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-[var(--font-heading)] text-3xl font-semibold tracking-tight text-foreground">
              How it works
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              Turn operational signals into early retention action
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-4xl">
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg border border-border/60 bg-card p-5">
                <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-sm font-semibold text-muted-foreground">1</div>
                <p className="text-sm font-semibold text-foreground">Detect friction</p>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  Track maintenance frequency, response time, and sentiment patterns
                </p>
              </div>
              <div className="rounded-lg border border-border/60 bg-card p-5">
                <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-sm font-semibold text-muted-foreground">2</div>
                <p className="text-sm font-semibold text-foreground">Identify risk</p>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  Compute risk scores and surface at-risk residents by property
                </p>
              </div>
              <div className="rounded-lg border border-border/60 bg-card p-5">
                <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-sm font-semibold text-muted-foreground">3</div>
                <p className="text-sm font-semibold text-foreground">Deploy action</p>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  Offer tiered credit interventions matched to friction drivers
                </p>
              </div>
              <div className="rounded-lg border border-border/60 bg-card p-5">
                <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-sm font-semibold text-muted-foreground">4</div>
                <p className="text-sm font-semibold text-foreground">Measure impact</p>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  Track turnover savings and service revenue against credits deployed
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Built on HappyCo Data */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.32, ease: "easeOut" }}
          className="mb-20"
        >
          <div className="mx-auto max-w-3xl rounded-lg border border-border/60 bg-card p-8 text-center">
            <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
              <CheckCircle className="h-5 w-5" strokeWidth={2} />
            </div>
            <h3 className="font-[var(--font-heading)] text-xl font-semibold tracking-tight text-foreground">
              Built on HappyCo operational data
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              No new integrations. No manual tracking. HappyCo Concierge uses existing maintenance history, response patterns, and resident interactions to predict churn risk months before move-out notices.
            </p>
          </div>
        </motion.section>

        {/* Business Impact */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.32, ease: "easeOut" }}
          className="mb-20"
        >
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-[var(--font-heading)] text-3xl font-semibold tracking-tight text-foreground">
              Business impact
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              Measure retention ROI across your portfolio
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-4xl">
            <div className="grid gap-5 md:grid-cols-3">
              <div className="rounded-lg border border-border/60 bg-card p-5">
                <p className="text-xs font-medium text-muted-foreground">Turnover Savings</p>
                <p className="mt-2 font-[var(--font-heading)] text-2xl font-semibold tracking-tight text-teal-600">$92,840</p>
                <p className="mt-1 text-xs text-muted-foreground">Prevention value</p>
              </div>
              <div className="rounded-lg border border-border/60 bg-card p-5">
                <p className="text-xs font-medium text-muted-foreground">Service Revenue</p>
                <p className="mt-2 font-[var(--font-heading)] text-2xl font-semibold tracking-tight text-teal-600">$2,310</p>
                <p className="mt-1 text-xs text-muted-foreground">Booking commissions</p>
              </div>
              <div className="rounded-lg border border-border/60 bg-card p-5">
                <p className="text-xs font-medium text-muted-foreground">Credits Deployed</p>
                <p className="mt-2 font-[var(--font-heading)] text-2xl font-semibold tracking-tight text-foreground">$12,600</p>
                <p className="mt-1 text-xs text-muted-foreground">Investment</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Product Previews */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.32, ease: "easeOut" }}
          className="mb-20"
        >
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-[var(--font-heading)] text-3xl font-semibold tracking-tight text-foreground">
              Purpose-built for retention
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              Admin oversight, manager workflows, and resident engagement
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-5xl">
            <div className="grid gap-5 lg:grid-cols-3">
              <div className="overflow-hidden rounded-lg border border-border/60 bg-card">
                <div className="border-b border-border/40 bg-muted/30 px-5 py-3">
                  <p className="text-sm font-semibold text-foreground">Admin Dashboard</p>
                </div>
                <div className="p-5">
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    Portfolio-level analytics, property performance tracking, and retention ROI measurement
                  </p>
                </div>
              </div>
              <div className="overflow-hidden rounded-lg border border-border/60 bg-card">
                <div className="border-b border-border/40 bg-muted/30 px-5 py-3">
                  <p className="text-sm font-semibold text-foreground">Manager Workflow</p>
                </div>
                <div className="p-5">
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    At-risk resident lists, friction driver analysis, and intervention deployment tools
                  </p>
                </div>
              </div>
              <div className="overflow-hidden rounded-lg border border-border/60 bg-card">
                <div className="border-b border-border/40 bg-muted/30 px-5 py-3">
                  <p className="text-sm font-semibold text-foreground">Resident Concierge</p>
                </div>
                <div className="p-5">
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    AI-powered service booking, credit redemption, and maintenance request tracking
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Final CTA */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.32, ease: "easeOut" }}
          data-testid="landing-cta-section"
        >
          <div className="mx-auto max-w-3xl rounded-lg border border-border/60 bg-card p-10 text-center">
            <h2 className="font-[var(--font-heading)] text-2xl font-semibold tracking-tight text-foreground">
              Experience the full platform
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Explore admin dashboards, manager workflows, and resident interfaces with Seattle portfolio demo data
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="h-10 px-5 text-sm shadow-sm" data-testid="landing-cta-primary">
                <Link to="/login">
                  View Live Demo
                  <ArrowRight className="ml-2 h-4 w-4" strokeWidth={2} />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-10 px-5 text-sm" data-testid="landing-cta-secondary">
                <Link to="/login">Sign in to demo</Link>
              </Button>
            </div>
          </div>
        </motion.section>
      </main>

      <PublicFooter />
      <CookieNoticeBar />
    </div>
  );
}
