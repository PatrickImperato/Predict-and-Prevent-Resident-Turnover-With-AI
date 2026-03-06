import { ArrowRight, Sparkles, TrendingUp, Users, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PublicFooter } from "@/components/public/PublicFooter";
import { CookieNoticeBar } from "@/components/public/CookieNoticeBar";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background" data-testid="landing-page-root">
      {/* Hero Section with Building Background */}
      <section className="relative min-h-[700px] overflow-hidden" data-testid="landing-hero-section">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwxfHxjaXR5JTIwYnVpbGRpbmdzJTIwc2t5bGluZSUyMGJsdWV8ZW58MHx8fHRlYWx8MTc3Mjc3MTE4Nnww&ixlib=rb-4.1.0&q=85"
            alt="City skyline"
            className="h-full w-full object-cover"
            style={{ filter: 'contrast(1.1) brightness(0.7)' }}
          />
          <div className="absolute inset-0 bg-slate-900/96"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950/90 via-slate-900/85 to-slate-800/90"></div>
        </div>

        {/* Top Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute top-0 z-50 w-full px-6 pt-4 lg:px-8"
        >
          <div className="mx-auto flex max-w-[1400px] items-center justify-between">
            {/* Left: Logo */}
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/12 text-primary" data-testid="landing-brand-mark">
                <Sparkles className="h-[18px] w-[18px]" strokeWidth={2.5} />
              </div>
              <p className="font-[var(--font-heading)] text-[15px] font-semibold tracking-tight text-white">
                HappyCo Concierge
              </p>
            </div>

            {/* Center: Nav Items in Pill */}
            <nav className="hidden items-center gap-0.5 rounded-full border border-white/8 bg-white/[0.03] px-1 py-1 backdrop-blur-[6px] md:flex">
              <a href="#insight" className="rounded-full px-3 py-1.5 text-[13px] font-medium text-white/60 transition-colors hover:bg-white/8 hover:text-white">Insight</a>
              <a href="#detection" className="rounded-full px-3 py-1.5 text-[13px] font-medium text-white/60 transition-colors hover:bg-white/8 hover:text-white">Detection</a>
              <a href="#concierge" className="rounded-full px-3 py-1.5 text-[13px] font-medium text-white/60 transition-colors hover:bg-white/8 hover:text-white">Concierge</a>
              <a href="#portfolio" className="rounded-full px-3 py-1.5 text-[13px] font-medium text-white/60 transition-colors hover:bg-white/8 hover:text-white">Portfolio</a>
              <a href="#roi" className="rounded-full px-3 py-1.5 text-[13px] font-medium text-white/60 transition-colors hover:bg-white/8 hover:text-white">ROI</a>
            </nav>

            {/* Right: Actions */}
            <div className="flex items-center gap-3">
              <Link to="/legal" className="text-sm font-medium text-white/40 transition-colors hover:text-white/60">
                Legal
              </Link>
              <Button asChild size="sm" className="h-8 rounded-full bg-primary px-4 text-sm font-medium shadow-sm hover:bg-primary/90" data-testid="landing-sign-in-nav">
                <Link to="/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Hero Content */}
        <div className="relative mx-auto max-w-[1400px] px-6 pb-20 pt-28 lg:px-8 lg:pb-24 lg:pt-32">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="max-w-2xl"
          >
            <Badge
              className="mb-4 border-primary/15 bg-primary/8 text-primary hover:bg-primary/8"
              variant="secondary"
              data-testid="landing-hero-badge"
            >
              Retention Intelligence Platform
            </Badge>

            <h1 className="font-[var(--font-heading)] text-5xl font-semibold leading-[1.1] tracking-[-0.03em] text-white lg:text-[56px]" data-testid="landing-hero-title">
              Predict and Prevent<br /><span className="text-primary">Resident Churn</span>
            </h1>

            <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-white/65">
              Transform operational data into retention insights. Intervene before residents decide to leave. Measure financial impact across your portfolio.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-2.5">
              <Button asChild size="lg" className="h-11 rounded-full bg-primary px-6 text-[15px] font-medium shadow-sm hover:bg-primary/90" data-testid="landing-hero-cta">
                <Link to="/login">
                  View Demo
                  <ArrowRight className="ml-2 h-4 w-4" strokeWidth={2.5} />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-11 rounded-full border-white/10 bg-white/[0.03] px-6 text-[15px] font-medium text-white backdrop-blur-sm hover:bg-white/[0.06]" data-testid="landing-hero-secondary-cta">
                <Link to="/login">Sign In</Link>
              </Button>
            </div>
          </motion.div>

          {/* Proof Metric Cards */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-16 grid gap-4 md:grid-cols-3"
          >
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-[8px]">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/6 text-white/70">
                  <DollarSign className="h-[18px] w-[18px]" strokeWidth={2.5} />
                </div>
                <div>
                  <p className="font-[var(--font-heading)] text-[28px] font-semibold leading-none tracking-tight text-white">$4,083</p>
                  <p className="mt-1.5 text-[13px] font-medium text-white/50">Avg. turnover cost</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-[8px]">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/6 text-white/70">
                  <TrendingUp className="h-[18px] w-[18px]" strokeWidth={2.5} />
                </div>
                <div>
                  <p className="font-[var(--font-heading)] text-[28px] font-semibold leading-none tracking-tight text-white">9.6%</p>
                  <p className="mt-1.5 text-[13px] font-medium text-white/50">Annual turnover rate</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-primary/20 bg-primary/6 p-4 backdrop-blur-[8px]">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/12 text-primary">
                  <Users className="h-[18px] w-[18px]" strokeWidth={2.5} />
                </div>
                <div>
                  <p className="font-[var(--font-heading)] text-[28px] font-semibold leading-none tracking-tight text-primary">$82,550</p>
                  <p className="mt-1.5 text-[13px] font-medium text-primary/70">Net retention ROI</p>
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
