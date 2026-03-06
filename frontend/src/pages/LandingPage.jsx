import { ArrowRight, Sparkles, Shield, Database, TrendingUp, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
        className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md"
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/12 text-primary" data-testid="landing-brand-mark">
              <Sparkles className="h-5 w-5" strokeWidth={1.75} />
            </div>
            <div>
              <p className="font-[var(--font-heading)] text-lg font-semibold tracking-[-0.01em] text-foreground">
                HappyCo Concierge
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {session?.app_env === "preview" && (
              <EnvironmentBadge appEnv={session.app_env} dataTestId="landing-environment-badge" />
            )}
            <Button asChild className="h-9 rounded-lg" data-testid="landing-sign-in-button">
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </motion.div>

      <main className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.32, delay: 0.08, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-16 text-center"
          data-testid="landing-hero-section"
        >
          <Badge
            className="mb-5 border-teal-200 bg-teal-50 text-teal-700 hover:bg-teal-50"
            variant="secondary"
            data-testid="landing-hero-badge"
          >
            Retention Intelligence Platform
          </Badge>
          
          <h1 className="mx-auto max-w-4xl font-[var(--font-heading)] text-4xl font-semibold tracking-[-0.02em] text-foreground sm:text-5xl lg:text-6xl" data-testid="landing-hero-title">
            Predict Churn Before Residents Give Notice
          </h1>
          
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Transform operational friction signals into measurable retention ROI. Built on HappyCo's existing data—no new integrations required.
          </p>
          
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" className="h-11 rounded-lg px-6 shadow-sm" data-testid="landing-hero-cta">
              <Link to="/login">
                Explore Platform
                <ArrowRight className="ml-2 h-4 w-4" strokeWidth={1.75} />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-11 rounded-lg px-6" data-testid="landing-hero-secondary-cta">
              <Link to="/login">View Demo</Link>
            </Button>
          </div>

          {/* Value Prop Bullets */}
          <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-3">
            <div className="rounded-xl border border-border/70 bg-card p-5">
              <div className="flex items-center justify-center">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
                  <Zap className="h-5 w-5" strokeWidth={2} />
                </div>
              </div>
              <p className="mt-3 text-sm font-medium text-foreground">Predict friction 4+ months early</p>
              <p className="mt-1 text-xs text-muted-foreground">Leading indicator intelligence</p>
            </div>
            
            <div className="rounded-xl border border-border/70 bg-card p-5">
              <div className="flex items-center justify-center">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
                  <TrendingUp className="h-5 w-5" strokeWidth={2} />
                </div>
              </div>
              <p className="mt-3 text-sm font-medium text-foreground">Measurable retention ROI</p>
              <p className="mt-1 text-xs text-muted-foreground">Turnover savings + service revenue</p>
            </div>
            
            <div className="rounded-xl border border-border/70 bg-card p-5">
              <div className="flex items-center justify-center">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
                  <Database className="h-5 w-5" strokeWidth={2} />
                </div>
              </div>
              <p className="mt-3 text-sm font-medium text-foreground">Built on existing data</p>
              <p className="mt-1 text-xs text-muted-foreground">No new integrations needed</p>
            </div>
          </div>
        </motion.section>

        {/* Property Preview Cards */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.32, ease: "easeOut" }}
          className="mb-16"
          data-testid="landing-properties-section"
        >
          <div className="mb-8 text-center">
            <Badge className="mb-3 border-slate-200 bg-slate-50 text-slate-700" variant="secondary">
              Seattle Portfolio
            </Badge>
            <h2 className="font-[var(--font-heading)] text-3xl font-semibold tracking-[-0.02em] text-foreground lg:text-4xl">
              Portfolio Intelligence Across Properties
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base text-muted-foreground">
              Real-time retention analytics for operators managing multi-property portfolios
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Property Card 1 */}
            <Card className="overflow-hidden border-border/70 shadow-sm transition-shadow hover:shadow-md" data-testid="property-card-lakeside">
              <div className="relative h-44 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                <img
                  src="https://images.unsplash.com/photo-1528104804036-3d7727d19b33?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBidWlsZGluZyUyMGxvYmJ5JTIwY29uY2llcmdlfGVufDB8fHx0ZWFsfDE3NzI3NzExODZ8MA&ixlib=rb-4.1.0&q=85"
                  alt="Ballard Commons"
                  className="h-full w-full object-cover opacity-90"
                />
              </div>
              <CardContent className="p-5">
                <h3 className="font-semibold text-foreground">Ballard Commons</h3>
                <p className="mt-1 text-sm text-muted-foreground">52 units • Ballard</p>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground">Occupancy</p>
                    <p className="font-semibold text-foreground">92.3%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">At-Risk</p>
                    <p className="font-semibold text-amber-600">6</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Property Card 2 */}
            <Card className="overflow-hidden border-border/70 shadow-sm transition-shadow hover:shadow-md" data-testid="property-card-downtown">
              <div className="relative h-44 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                <img
                  src="https://images.unsplash.com/photo-1652963426007-0d189dee3c56?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwzfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBidWlsZGluZyUyMGxvYmJ5JTIwY29uY2llcmdlfGVufDB8fHx0ZWFsfDE3NzI3NzExODZ8MA&ixlib=rb-4.1.0&q=85"
                  alt="Capitol Hill Residences"
                  className="h-full w-full object-cover opacity-90"
                />
              </div>
              <CardContent className="p-5">
                <h3 className="font-semibold text-foreground">Capitol Hill Residences</h3>
                <p className="mt-1 text-sm text-muted-foreground">104 units • Capitol Hill</p>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground">Occupancy</p>
                    <p className="font-semibold text-foreground">94.2%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">At-Risk</p>
                    <p className="font-semibold text-amber-600">12</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Property Card 3 */}
            <Card className="overflow-hidden border-border/70 shadow-sm transition-shadow hover:shadow-md" data-testid="property-card-metropolitan">
              <div className="relative h-44 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                <img
                  src="https://images.unsplash.com/photo-1647527269452-cbed2aba8671?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwzfHxtaW5pbWFsJTIwbW9kZXJuJTIwY2l0eSUyMHNreWxpbmUlMjBtb3JuaW5nJTIwaGF6ZXxlbnwwfHx8Ymx1ZXwxNzcyNzcxMTg5fDA&ixlib=rb-4.1.0&q=85"
                  alt="Bellevue Skyline Towers"
                  className="h-full w-full object-cover opacity-90"
                />
              </div>
              <CardContent className="p-5">
                <h3 className="font-semibold text-foreground">Bellevue Skyline Towers</h3>
                <p className="mt-1 text-sm text-muted-foreground">144 units • Downtown Bellevue</p>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground">Occupancy</p>
                    <p className="font-semibold text-foreground">94.4%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">At-Risk</p>
                    <p className="font-semibold text-amber-600">17</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* Trust Strip - Diagnostics Built-In */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.32, ease: "easeOut" }}
          className="mb-16"
        >
          <div className="rounded-xl border border-border/70 bg-card p-8">
            <div className="flex flex-col items-center justify-center gap-8 lg:flex-row lg:justify-around">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
                  <Shield className="h-6 w-6" strokeWidth={2} />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Diagnostics Built-In</p>
                  <p className="text-sm text-muted-foreground">Full system transparency</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
                  <Database className="h-6 w-6" strokeWidth={2} />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Separate Preview/Production DBs</p>
                  <p className="text-sm text-muted-foreground">Safe demo environment</p>
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
          <div className="rounded-2xl border-2 border-teal-200 bg-gradient-to-br from-teal-50 to-emerald-50 p-10 text-center shadow-sm">
            <Badge className="mb-4 border-teal-300 bg-teal-100 text-teal-800" variant="secondary">
              Ready to Explore
            </Badge>
            <h2 className="mx-auto max-w-3xl font-[var(--font-heading)] text-3xl font-semibold tracking-[-0.02em] text-foreground lg:text-4xl">
              Sign in to experience the full platform workflow
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
              Explore the Admin dashboard, Manager churn risk workflows, and Resident concierge experience with our Seattle portfolio demo.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg" className="h-11 rounded-lg px-6 shadow-md" data-testid="landing-cta-sign-in-button">
                <Link to="/login">
                  Sign In to Demo
                  <ArrowRight className="ml-2 h-4 w-4" strokeWidth={1.75} />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-11 rounded-lg border-teal-300 bg-white px-6 hover:bg-teal-50" data-testid="landing-cta-legal-link">
                <Link to="/legal">View Legal Notice</Link>
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
