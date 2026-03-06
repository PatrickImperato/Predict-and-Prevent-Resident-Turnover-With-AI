import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background" data-testid="privacy-page-root">
      {/* Header */}
      <header className="border-b border-border/40 bg-background">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 sm:px-6 py-4 lg:px-8">
          <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80" data-testid="privacy-brand-link">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Sparkles className="h-4 w-4" strokeWidth={2.5} />
            </div>
            <p className="font-[var(--font-heading)] text-base font-semibold tracking-tight text-foreground">
              HappyCo Concierge
            </p>
          </Link>
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" size="sm" className="h-8 text-sm">
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Overview
              </Link>
            </Button>
            <Button asChild size="sm" className="h-8 text-sm">
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="font-[var(--font-heading)] text-4xl font-semibold tracking-[-0.02em] text-foreground">
            Privacy & Data Collection
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">Last updated: March 2026</p>

          <div className="mt-12 space-y-12">
            {/* What Data We Collect */}
            <section>
              <h2 className="font-[var(--font-heading)] text-2xl font-semibold tracking-tight text-foreground">
                What Data We Collect
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                When you use the HappyCo Concierge platform, we collect:
              </p>
              <ul className="mt-4 space-y-3 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="font-semibold text-foreground">Account Information:</span>
                  <span>Email address, name, and role</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-semibold text-foreground">IP Address:</span>
                  <span>Your public IP address for security purposes</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-semibold text-foreground">Device Information:</span>
                  <span>Browser type, device fingerprint, and user agent</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-semibold text-foreground">Activity Logs:</span>
                  <span>Pages visited, actions taken, and timestamps</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-semibold text-foreground">Location Data:</span>
                  <span>Approximate geographic location derived from IP, city, region, country</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-semibold text-foreground">Session Data:</span>
                  <span>Login times, session duration, and authentication events</span>
                </li>
              </ul>
            </section>

            {/* IP & Device Logging */}
            <section>
              <h2 className="font-[var(--font-heading)] text-2xl font-semibold tracking-tight text-foreground">
                IP & Device Logging
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                We log IP addresses and device information to:
              </p>
              <ul className="mt-4 list-inside list-disc space-y-2 text-muted-foreground">
                <li>Detect and prevent unauthorized access attempts</li>
                <li>Identify potential security threats, including impossible travel and suspicious patterns</li>
                <li>Maintain audit trails for compliance purposes</li>
                <li>Improve platform reliability and performance</li>
              </ul>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                IP addresses are used to derive approximate location information through geolocation services. This data is cached for 24 hours to reduce external API calls.
              </p>
            </section>

            {/* Purpose */}
            <section>
              <h2 className="font-[var(--font-heading)] text-2xl font-semibold tracking-tight text-foreground">
                Purpose: Security & Reliability
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                The primary purposes for collecting this data are:
              </p>
              <ul className="mt-4 space-y-3 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="font-semibold text-foreground">Security:</span>
                  <span>Detecting unauthorized access, account compromise, and suspicious activity</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-semibold text-foreground">Reliability:</span>
                  <span>Monitoring platform performance and identifying issues</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-semibold text-foreground">Compliance:</span>
                  <span>Maintaining audit trails for enterprise customers</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-semibold text-foreground">Accountability:</span>
                  <span>Ensuring proper use of the platform by authorized users</span>
                </li>
              </ul>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                We do not sell your data to third parties or use it for advertising purposes.
              </p>
            </section>

            {/* Data Retention */}
            <section>
              <h2 className="font-[var(--font-heading)] text-2xl font-semibold tracking-tight text-foreground">
                Data Retention Periods
              </h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-border/60 bg-card p-4">
                  <p className="text-sm font-semibold text-foreground">Audit Events, activity logs</p>
                  <p className="mt-1 text-lg font-semibold text-muted-foreground">90 days</p>
                </div>
                <div className="rounded-lg border border-border/60 bg-card p-4">
                  <p className="text-sm font-semibold text-foreground">Security Alerts</p>
                  <p className="mt-1 text-lg font-semibold text-muted-foreground">180 days</p>
                </div>
                <div className="rounded-lg border border-border/60 bg-card p-4">
                  <p className="text-sm font-semibold text-foreground">Consent Records</p>
                  <p className="mt-1 text-lg font-semibold text-muted-foreground">1 year</p>
                </div>
                <div className="rounded-lg border border-border/60 bg-card p-4">
                  <p className="text-sm font-semibold text-foreground">Session Data</p>
                  <p className="mt-1 text-lg font-semibold text-muted-foreground">30 days</p>
                </div>
              </div>
            </section>

            {/* Questions */}
            <section>
              <h2 className="font-[var(--font-heading)] text-2xl font-semibold tracking-tight text-foreground">
                Questions?
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                If you have questions about our data practices, please contact your property manager or the platform administrator.
              </p>
            </section>
          </div>
        </motion.div>
      </main>

      {/* Intellectual Property Footer */}
      <div className="border-t border-border/60 bg-background py-4">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <p className="text-center text-xs text-muted-foreground/70">
            © Time Travel Media LLC. All rights reserved. Proprietary concept demonstration. HappyCo is a trademark of HappyCo, Inc.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-background">
        <div className="mx-auto max-w-4xl px-6 py-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <Link to="/" className="text-muted-foreground transition-colors hover:text-foreground">
              Overview
            </Link>
            <Link to="/legal" className="text-muted-foreground transition-colors hover:text-foreground">
              Legal
            </Link>
            <Link to="/login" className="text-muted-foreground transition-colors hover:text-foreground">
              Sign In
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
