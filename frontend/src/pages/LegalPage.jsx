import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles, Scale, Shield, FileText, AlertCircle } from "lucide-react";
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
            <Button asChild size="sm" className="h-8 text-sm">
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-5xl px-6 py-12 lg:px-8 lg:py-16">
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
                  Legal & Terms of Service
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">Last updated: March 2026</p>
              </div>
            </div>
            <p className="text-base text-muted-foreground leading-relaxed max-w-3xl">
              These terms govern your access to and use of the HappyCo Concierge platform. By using our services, you agree to be bound by these terms.
            </p>
          </div>

          {/* Quick Links */}
          <div className="mb-12 grid gap-3 sm:grid-cols-3">
            <a href="#acceptance" className="group rounded-xl border border-border/60 bg-card p-4 transition-all hover:border-primary/40 hover:bg-primary/5">
              <div className="flex items-center gap-2.5 mb-1">
                <FileText className="h-4 w-4 text-primary" />
                <p className="text-sm font-semibold text-foreground">Acceptance of Terms</p>
              </div>
              <p className="text-xs text-muted-foreground">Scope and agreement</p>
            </a>
            <a href="#services" className="group rounded-xl border border-border/60 bg-card p-4 transition-all hover:border-primary/40 hover:bg-primary/5">
              <div className="flex items-center gap-2.5 mb-1">
                <Shield className="h-4 w-4 text-primary" />
                <p className="text-sm font-semibold text-foreground">Services & Access</p>
              </div>
              <p className="text-xs text-muted-foreground">Usage rights and restrictions</p>
            </a>
            <a href="#privacy" className="group rounded-xl border border-border/60 bg-card p-4 transition-all hover:border-primary/40 hover:bg-primary/5">
              <div className="flex items-center gap-2.5 mb-1">
                <AlertCircle className="h-4 w-4 text-primary" />
                <p className="text-sm font-semibold text-foreground">Privacy & Data</p>
              </div>
              <p className="text-xs text-muted-foreground">How we handle your data</p>
            </a>
          </div>

          <div className="prose prose-zinc dark:prose-invert max-w-none">
            {/* Section 1: Acceptance of Terms */}
            <section id="acceptance" className="mb-12 scroll-mt-20">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-semibold text-sm">
                  1
                </div>
                <h2 className="!mt-0 font-[var(--font-heading)] text-2xl font-semibold tracking-tight text-foreground">
                  Acceptance of Terms
                </h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  By accessing or using the HappyCo Concierge platform ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of these terms, you may not access the Service.
                </p>
                <p>
                  These Terms apply to all visitors, users, and others who access or use the Service, including but not limited to property managers, multifamily operators, residents, and administrative personnel.
                </p>
                <p>
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                </p>
              </div>
            </section>

            {/* Section 2: Description of Services */}
            <section id="services" className="mb-12 scroll-mt-20">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-semibold text-sm">
                  2
                </div>
                <h2 className="!mt-0 font-[var(--font-heading)] text-2xl font-semibold tracking-tight text-foreground">
                  Description of Services
                </h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  HappyCo Concierge is a SaaS platform that provides predictive analytics, churn risk modeling, and automated resident retention tools for multifamily property operators. The Service includes, but is not limited to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Churn risk scoring and prediction algorithms based on operational data</li>
                  <li>Automated intervention campaigns with tiered credit offers</li>
                  <li>Portfolio-wide analytics dashboards for administrators and property managers</li>
                  <li>Resident-facing interfaces for service booking and concierge interactions</li>
                  <li>Integration with third-party property management systems and communication channels</li>
                </ul>
                <p>
                  We reserve the right to withdraw or amend the Service, and any service or material we provide, in our sole discretion without notice. We will not be liable if for any reason all or any part of the Service is unavailable at any time or for any period.
                </p>
              </div>
            </section>

            {/* Section 3: User Accounts and Access */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-semibold text-sm">
                  3
                </div>
                <h2 className="!mt-0 font-[var(--font-heading)] text-2xl font-semibold tracking-tight text-foreground">
                  User Accounts and Access
                </h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
                </p>
                <p>
                  You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with our Service or a third-party service. You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
                </p>
                <p>
                  We reserve the right to refuse service, terminate accounts, remove or edit content, or cancel orders in our sole discretion, including but not limited to situations where we determine user behavior violates these Terms or is harmful to other users, us, or third parties.
                </p>
              </div>
            </section>

            {/* Section 4: Acceptable Use Policy */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-semibold text-sm">
                  4
                </div>
                <h2 className="!mt-0 font-[var(--font-heading)] text-2xl font-semibold tracking-tight text-foreground">
                  Acceptable Use Policy
                </h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  You agree not to use the Service:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                  <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                  <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                  <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                  <li>To submit false or misleading information</li>
                  <li>To upload or transmit viruses or any other type of malicious code</li>
                  <li>To collect or track the personal information of others without proper authorization</li>
                  <li>To spam, phish, pharm, pretext, spider, crawl, or scrape</li>
                  <li>For any obscene or immoral purpose</li>
                  <li>To interfere with or circumvent the security features of the Service or any related systems</li>
                </ul>
              </div>
            </section>

            {/* Section 5: Intellectual Property */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-semibold text-sm">
                  5
                </div>
                <h2 className="!mt-0 font-[var(--font-heading)] text-2xl font-semibold tracking-tight text-foreground">
                  Intellectual Property
                </h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  The Service and its original content, features, and functionality are and will remain the exclusive property of HappyCo and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of HappyCo.
                </p>
                <p>
                  You retain ownership of any data, content, or materials you submit to the Service ("User Content"). By submitting User Content, you grant HappyCo a worldwide, non-exclusive, royalty-free license to use, reproduce, process, adapt, and display your User Content solely for the purpose of providing and improving the Service.
                </p>
              </div>
            </section>

            {/* Section 6: Privacy and Data Protection */}
            <section id="privacy" className="mb-12 scroll-mt-20">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-semibold text-sm">
                  6
                </div>
                <h2 className="!mt-0 font-[var(--font-heading)] text-2xl font-semibold tracking-tight text-foreground">
                  Privacy and Data Protection
                </h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Your privacy is important to us. Our Privacy Policy explains how we collect, use, protect, and disclose information that results from your use of the Service. Please read it carefully.
                </p>
                <p>
                  By using the Service, you agree that we can collect and use technical data and related information—including but not limited to technical information about your device, system and application software, and peripherals—that is gathered periodically to facilitate the provision of software updates, product support, and other services to you (if any) related to the Service.
                </p>
                <p>
                  We implement appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please note that no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.
                </p>
                <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 mt-4">
                  <p className="text-sm text-foreground font-medium mb-2">Key Data Practices:</p>
                  <ul className="text-sm space-y-1.5">
                    <li>• Data is encrypted in transit (TLS 1.3) and at rest (AES-256)</li>
                    <li>• User activity logs are retained for 90 days for security and compliance</li>
                    <li>• We do not sell or share personal data with third parties for marketing purposes</li>
                    <li>• You may request data export or deletion by contacting support</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 7: Payment Terms */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-semibold text-sm">
                  7
                </div>
                <h2 className="!mt-0 font-[var(--font-heading)] text-2xl font-semibold tracking-tight text-foreground">
                  Payment Terms
                </h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Certain aspects of the Service are billed on a subscription basis ("Subscription"). You will be billed in advance on a recurring and periodic basis ("Billing Cycle"). Billing cycles are set either on a monthly or annual basis, depending on the type of subscription plan you select when purchasing a Subscription.
                </p>
                <p>
                  At the end of each Billing Cycle, your Subscription will automatically renew under the exact same conditions unless you cancel it or HappyCo cancels it. You may cancel your Subscription renewal either through your online account management page or by contacting our customer support team.
                </p>
                <p>
                  A valid payment method, including credit card or other approved payment processor, is required to process the payment for your Subscription. You shall provide HappyCo with accurate and complete billing information. By submitting such payment information, you automatically authorize HappyCo to charge all Subscription fees incurred through your account to any such payment instruments.
                </p>
              </div>
            </section>

            {/* Section 8: Refunds and Cancellations */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-semibold text-sm">
                  8
                </div>
                <h2 className="!mt-0 font-[var(--font-heading)] text-2xl font-semibold tracking-tight text-foreground">
                  Refunds and Cancellations
                </h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Except when required by law, paid Subscription fees are non-refundable. Certain refund requests for Subscriptions may be considered by HappyCo on a case-by-case basis and granted at the sole discretion of HappyCo.
                </p>
                <p>
                  You may cancel your Subscription at any time. Cancellation will take effect at the end of the current paid Billing Cycle. You will continue to have access to the Service through the end of your current Billing Cycle.
                </p>
              </div>
            </section>

            {/* Section 9: Disclaimers and Limitations of Liability */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-semibold text-sm">
                  9
                </div>
                <h2 className="!mt-0 font-[var(--font-heading)] text-2xl font-semibold tracking-tight text-foreground">
                  Disclaimers and Limitations of Liability
                </h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. HAPPYCO EXPRESSLY DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
                </p>
                <p>
                  HAPPYCO MAKES NO WARRANTY THAT THE SERVICE WILL MEET YOUR REQUIREMENTS, THAT THE SERVICE WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE, OR THAT ANY DEFECTS WILL BE CORRECTED. NO ADVICE OR INFORMATION OBTAINED FROM HAPPYCO OR THROUGH THE SERVICE SHALL CREATE ANY WARRANTY NOT EXPRESSLY MADE HEREIN.
                </p>
                <p>
                  IN NO EVENT SHALL HAPPYCO, ITS DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICE.
                </p>
              </div>
            </section>

            {/* Section 10: Governing Law and Dispute Resolution */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-semibold text-sm">
                  10
                </div>
                <h2 className="!mt-0 font-[var(--font-heading)] text-2xl font-semibold tracking-tight text-foreground">
                  Governing Law and Dispute Resolution
                </h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  These Terms shall be governed and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law provisions.
                </p>
                <p>
                  Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.
                </p>
                <p>
                  Any disputes arising out of or related to these Terms or the Service shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association, except that either party may seek injunctive or other equitable relief in any court of competent jurisdiction.
                </p>
              </div>
            </section>

            {/* Section 11: Contact Information */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-semibold text-sm">
                  11
                </div>
                <h2 className="!mt-0 font-[var(--font-heading)] text-2xl font-semibold tracking-tight text-foreground">
                  Contact Information
                </h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  If you have any questions about these Terms, please contact us:
                </p>
                <div className="rounded-lg border border-border/60 bg-card p-5">
                  <p className="text-sm font-semibold text-foreground mb-3">HappyCo Legal Department</p>
                  <div className="space-y-1.5 text-sm">
                    <p>Email: <a href="mailto:legal@happyco.com" className="text-primary hover:underline">legal@happyco.com</a></p>
                    <p>Address: 123 Market Street, Suite 500, San Francisco, CA 94103</p>
                    <p>Phone: 1-800-HAPPYCO (1-800-427-7926)</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Footer Notice */}
          <div className="mt-12 rounded-xl border border-border/60 bg-card p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-foreground mb-1">Important Notice</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  These Terms of Service constitute the entire agreement between you and HappyCo regarding your use of the Service and supersede all prior and contemporaneous written or oral agreements. You acknowledge that you have read these Terms, understand them, and agree to be bound by their terms and conditions.
                </p>
              </div>
            </div>
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
