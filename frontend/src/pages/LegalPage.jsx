import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles, Scale, Shield } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-background" data-testid="legal-page-root">
      {/* Header */}
      <header className="border-b border-border/40 bg-background">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 sm:px-6 py-4 lg:px-8">
          <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80" data-testid="legal-brand-link">
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
            <Button asChild size="sm" className="h-11 rounded-full bg-primary px-7 text-[15px] font-semibold shadow-none hover:bg-primary/90">
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-4xl px-6 py-12 lg:px-8 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Scale className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="font-[var(--font-heading)] text-4xl font-semibold tracking-[-0.02em] text-foreground">
                  Legal Notice and Intellectual Property
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">Last updated: March 2026</p>
              </div>
            </div>
            <p className="text-[16px] text-muted-foreground leading-relaxed">
              This Legal Notice governs access to and use of this demonstration platform and all associated materials. By accessing this platform, the Recipient agrees to be bound by the terms set forth herein.
            </p>
          </div>

          {/* Legal Details */}
          <div className="mb-10 rounded-xl border border-border/60 bg-card p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs text-muted-foreground font-medium mb-1">Owner</p>
                <p className="text-sm font-semibold text-foreground">Time Travel Media LLC</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium mb-1">Recipient</p>
                <p className="text-sm font-semibold text-foreground">HappyCo, Inc. (happy.co)</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-xs text-muted-foreground font-medium mb-1">Effective Date</p>
                <p className="text-sm font-semibold text-foreground">Upon access</p>
              </div>
            </div>
          </div>

          <div className="prose prose-zinc dark:prose-invert max-w-none">
            {/* Section 1 */}
            <section className="mb-10 scroll-mt-20">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-semibold text-sm">1</div>
                <h2 className="!mt-0 font-[var(--font-heading)] text-2xl font-semibold tracking-tight text-foreground">Ownership and Reservation of Rights</h2>
              </div>
              <div className="text-muted-foreground leading-relaxed">
                <p>
                  This demonstration platform, including but not limited to its concept, design, software architecture, user interface layouts, workflows, user journeys, analytics models, retention logic, ROI calculations, copy, and all demonstration materials (collectively, the "Materials"), constitutes the exclusive intellectual property of Time Travel Media LLC ("Owner"). All rights not expressly granted herein are reserved by the Owner. No transfer of ownership or title is made or implied by access to this platform.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section className="mb-10 scroll-mt-20">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-semibold text-sm">2</div>
                <h2 className="!mt-0 font-[var(--font-heading)] text-2xl font-semibold tracking-tight text-foreground">Permitted Purpose</h2>
              </div>
              <div className="text-muted-foreground leading-relaxed">
                <p>
                  Access to this platform is provided solely for the purpose of evaluating the demonstrated concepts and capabilities. The Recipient may view and interact with the platform only for internal evaluation purposes. No other use is authorized. This demonstration does not constitute an offer to sell, license, or transfer any technology, software, or intellectual property.
                </p>
              </div>
            </section>

            {/* Section 3 */}
            <section className="mb-10 scroll-mt-20">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-semibold text-sm">3</div>
                <h2 className="!mt-0 font-[var(--font-heading)] text-2xl font-semibold tracking-tight text-foreground">No License and No Transfer</h2>
              </div>
              <div className="text-muted-foreground leading-relaxed">
                <p>
                  Viewing, accessing, or interacting with this platform does not grant the Recipient any license, right, title, or interest in any intellectual property owned by the Owner. No implied licenses are created. The Recipient acknowledges that the Materials remain the sole property of the Owner and that no rights are transferred by this demonstration.
                </p>
              </div>
            </section>

            {/* Section 4 */}
            <section className="mb-10 scroll-mt-20">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-semibold text-sm">4</div>
                <h2 className="!mt-0 font-[var(--font-heading)] text-2xl font-semibold tracking-tight text-foreground">Confidential Information and Non-Disclosure</h2>
              </div>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>The Materials constitute confidential and proprietary information of the Owner.</p>
                <p className="font-medium text-foreground">The Recipient agrees to:</p>
                <ul className="list-disc list-inside space-y-1.5 ml-2">
                  <li>Maintain the confidentiality of all Materials</li>
                  <li>Restrict access to authorized personnel only</li>
                  <li>Not disclose any Materials to third parties without prior written consent</li>
                  <li>Use at least the same degree of care as used for the Recipient's own confidential information</li>
                </ul>
              </div>
            </section>

            {/* Section 5 */}
            <section className="mb-10 scroll-mt-20">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-semibold text-sm">5</div>
                <h2 className="!mt-0 font-[var(--font-heading)] text-2xl font-semibold tracking-tight text-foreground">Restrictions on Use</h2>
              </div>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p className="font-medium text-foreground">The Recipient shall not, directly or indirectly:</p>
                <ul className="list-disc list-inside space-y-1.5 ml-2">
                  <li>Copy, reproduce, or duplicate any Materials</li>
                  <li>Capture screenshots, recordings, or any visual documentation for external use</li>
                  <li>Use the Materials to develop competing products or services</li>
                  <li>Incorporate any concepts, designs, or methodologies into internal systems or builds</li>
                  <li>Share access credentials with unauthorized parties</li>
                </ul>
              </div>
            </section>

            {/* Section 6 */}
            <section className="mb-10 scroll-mt-20">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-semibold text-sm">6</div>
                <h2 className="!mt-0 font-[var(--font-heading)] text-2xl font-semibold tracking-tight text-foreground">No Reverse Engineering and No Derivative Works</h2>
              </div>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>
                  The Recipient shall not reverse engineer, decompile, disassemble, or otherwise attempt to derive the source code, algorithms, or underlying architecture of the platform.
                </p>
                <p>
                  The Recipient shall not create derivative works based on the Materials, including adaptations, modifications, or works inspired by the concepts demonstrated.
                </p>
              </div>
            </section>

            {/* Section 7 */}
            <section className="mb-10 scroll-mt-20">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-semibold text-sm">7</div>
                <h2 className="!mt-0 font-[var(--font-heading)] text-2xl font-semibold tracking-tight text-foreground">No Public Display and No Distribution</h2>
              </div>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>
                  The Materials may not be displayed publicly, presented to third parties, included in any publication, or distributed in any form without the prior written consent of the Owner.
                </p>
                <p>
                  This includes presentations, reports, articles, social media posts, and any other form of public or semi-public communication.
                </p>
              </div>
            </section>

            {/* Section 8 */}
            <section className="mb-10 scroll-mt-20">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-semibold text-sm">8</div>
                <h2 className="!mt-0 font-[var(--font-heading)] text-2xl font-semibold tracking-tight text-foreground">No Reliance, No Warranty, No Liability</h2>
              </div>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>
                  This platform is a concept demonstration only and is not intended for production use. All data presented is simulated for illustrative purposes.
                </p>
                <p>
                  The Materials are provided AS IS without warranty of any kind, express or implied.
                </p>
                <p>
                  The Owner shall not be liable for any damages arising from the use of or inability to use the Materials.
                </p>
              </div>
            </section>

            {/* Section 9 */}
            <section className="mb-10 scroll-mt-20">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-semibold text-sm">9</div>
                <h2 className="!mt-0 font-[var(--font-heading)] text-2xl font-semibold tracking-tight text-foreground">Injunctive Relief</h2>
              </div>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>
                  The Recipient acknowledges that any unauthorized use, reproduction, or distribution of the Materials would cause irreparable harm to the Owner for which monetary damages would be inadequate.
                </p>
                <p>
                  The Owner shall be entitled to seek injunctive relief and equitable remedies in addition to any other remedies available.
                </p>
              </div>
            </section>

            {/* Section 10 */}
            <section className="mb-10 scroll-mt-20">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-semibold text-sm">10</div>
                <h2 className="!mt-0 font-[var(--font-heading)] text-2xl font-semibold tracking-tight text-foreground">Governing Law and Venue</h2>
              </div>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>
                  This Notice shall be governed by and construed in accordance with the laws of the State of Delaware.
                </p>
                <p>
                  Any disputes shall be resolved exclusively in the state or federal courts located in Delaware.
                </p>
              </div>
            </section>

            {/* Section 11 */}
            <section className="mb-10 scroll-mt-20">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-semibold text-sm">11</div>
                <h2 className="!mt-0 font-[var(--font-heading)] text-2xl font-semibold tracking-tight text-foreground">Contact for Permissions</h2>
              </div>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>
                  For permissions, licensing inquiries, or questions regarding this Legal Notice, please contact Time Travel Media LLC in writing.
                </p>
                <p>
                  Upon request by Time Travel Media LLC, or upon conclusion of the evaluation period, the Recipient shall promptly cease all use of the Materials and destroy or return all copies, notes, recordings, and any materials derived from this demonstration.
                </p>
              </div>
            </section>
          </div>

          {/* Copyright - Bottom Left */}
          <div className="mt-12">
            <p className="text-xs text-muted-foreground/40 leading-relaxed">
              © Time Travel Media LLC. All rights reserved. Proprietary concept demonstration. HappyCo is a trademark of HappyCo, Inc.
            </p>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-background">
        <div className="mx-auto max-w-5xl px-6 py-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <Link to="/" className="text-muted-foreground transition-colors hover:text-foreground">
              Overview
            </Link>
            <Link to="/privacy" className="text-muted-foreground transition-colors hover:text-foreground">
              Privacy Policy
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
