import { ArrowRight, Sparkles, TrendingUp, Users, DollarSign } from "lucide-react";
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
        className="absolute top-0 z-50 w-full border-b border-white/10 bg-slate-900/40 backdrop-blur-md"
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 lg:px-8">
          {/* Left: Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 text-primary" data-testid="landing-brand-mark">
              <Sparkles className="h-4 w-4" strokeWidth={2} />
            </div>
            <p className="font-[var(--font-heading)] text-base font-semibold tracking-tight text-white">
              HappyCo Concierge
            </p>
          </div>

          {/* Center: Nav Items */}
          <nav className="hidden items-center gap-6 md:flex">
            <a href="#insight" className="text-sm font-medium text-white/80 transition-colors hover:text-white">Insight</a>
            <a href="#detection" className="text-sm font-medium text-white/80 transition-colors hover:text-white">Detection</a>
            <a href="#concierge" className="text-sm font-medium text-white/80 transition-colors hover:text-white">Concierge</a>
            <a href="#portfolio" className="text-sm font-medium text-white/80 transition-colors hover:text-white">Portfolio</a>
            <a href="#roi" className="text-sm font-medium text-white/80 transition-colors hover:text-white">ROI</a>
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-4">
            <Link to="/legal" className="text-sm font-medium text-white/60 transition-colors hover:text-white/80">
              Legal
            </Link>
            {session?.app_env === "preview" && (
              <EnvironmentBadge appEnv={session.app_env} dataTestId="landing-environment-badge" />
            )}
            <Button asChild size="sm" className="h-9 px-4 text-sm" data-testid="landing-sign-in-nav">
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Hero Section with Building Background */}
      <section className="relative min-h-[700px] overflow-hidden" data-testid="landing-hero-section">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwxfHxjaXR5JTIwYnVpbGRpbmdzJTIwc2t5bGluZSUyMGJsdWV8ZW58MHx8fHRlYWx8MTc3Mjc3MTE4Nnww&ixlib=rb-4.1.0&q=85"
            alt="City skyline"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-slate-900/90 to-slate-800/85"></div>
        </div>

        {/* Hero Content */}
        <div className="relative mx-auto max-w-[1400px] px-6 pb-24 pt-32 lg:px-8 lg:pb-32 lg:pt-40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="max-w-3xl"
          >
            <Badge
              className="mb-5 border-primary/30 bg-primary/10 text-primary hover:bg-primary/10"
              variant="secondary"
              data-testid="landing-hero-badge"
            >
              Retention Intelligence Platform
            </Badge>

            <h1 className="font-[var(--font-heading)] text-5xl font-semibold tracking-[-0.03em] text-white lg:text-6xl" data-testid="landing-hero-title">
              Predict and Prevent Resident Churn
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
              Transform operational data into retention insights. Intervene before residents decide to leave. Measure financial impact across your portfolio.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button asChild size="lg" className="h-11 px-6 text-sm shadow-lg" data-testid="landing-hero-cta">
                <Link to="/login">
                  View Demo
                  <ArrowRight className="ml-2 h-4 w-4" strokeWidth={2} />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-11 border-white/20 bg-white/10 px-6 text-sm text-white hover:bg-white/20" data-testid="landing-hero-secondary-cta">
                <Link to="/login">Sign In</Link>
              </Button>
            </div>
          </motion.div>

          {/* Proof Metric Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mt-20 grid gap-5 md:grid-cols-3"
          >
            <div className="rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 text-primary">
                  <DollarSign className="h-5 w-5" strokeWidth={2} />
                </div>
                <div>
                  <p className="font-[var(--font-heading)] text-2xl font-semibold tracking-tight text-white">$4,083</p>
                  <p className="mt-1 text-sm text-white/60">Avg. turnover cost</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 text-primary">
                  <TrendingUp className="h-5 w-5" strokeWidth={2} />
                </div>
                <div>
                  <p className="font-[var(--font-heading)] text-2xl font-semibold tracking-tight text-white">9.6%</p>
                  <p className="mt-1 text-sm text-white/60">Annual turnover rate</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 text-primary">
                  <Users className="h-5 w-5" strokeWidth={2} />
                </div>
                <div>
                  <p className="font-[var(--font-heading)] text-2xl font-semibold tracking-tight text-teal-400">$82,550</p>
                  <p className="mt-1 text-sm text-white/60">Net retention ROI</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Below the fold sections */}
      <main className="mx-auto max-w-[1400px] px-6 py-20 lg:px-8">
        {/* How it works */}
        <section className="mb-20" id="insight">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4 border-border/60 bg-muted/60 text-muted-foreground" variant="secondary">
              How it works
            </Badge>
            <h2 className="font-[var(--font-heading)] text-3xl font-semibold tracking-tight text-foreground">
              Turn operational signals into early retention action
            </h2>
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
        </section>

        {/* Built on HappyCo Data */}
        <section className="mb-20" id="detection">
          <div className="mx-auto max-w-3xl rounded-lg border border-border/60 bg-card p-8 text-center">
            <h3 className="font-[var(--font-heading)] text-xl font-semibold tracking-tight text-foreground">
              Built on HappyCo operational data
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              No new integrations. No manual tracking. HappyCo Concierge uses existing maintenance history, response patterns, and resident interactions to predict churn risk months before move-out notices.
            </p>
          </div>
        </section>

        {/* Product Previews */}
        <section className="mb-20" id="concierge">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4 border-border/60 bg-muted/60 text-muted-foreground" variant="secondary">
              Purpose-built for retention
            </Badge>
            <h2 className="font-[var(--font-heading)] text-3xl font-semibold tracking-tight text-foreground">
              Admin oversight, manager workflows, and resident engagement
            </h2>
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
        </section>

        {/* Final CTA */}
        <section id="roi">
          <div className="mx-auto max-w-3xl rounded-lg border border-border/60 bg-card p-10 text-center">
            <h2 className="font-[var(--font-heading)] text-2xl font-semibold tracking-tight text-foreground">
              Experience the platform
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Explore admin dashboards, manager workflows, and resident interfaces with Seattle portfolio demo data
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="h-10 px-5 text-sm shadow-sm" data-testid="landing-cta-primary">
                <Link to="/login">
                  View Demo
                  <ArrowRight className="ml-2 h-4 w-4" strokeWidth={2} />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-10 px-5 text-sm" data-testid="landing-cta-secondary">
                <Link to="/login">Sign In</Link>
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
