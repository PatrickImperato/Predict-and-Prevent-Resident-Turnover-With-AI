import { Link } from "react-router-dom";

import { CookieNoticeBar } from "@/components/public/CookieNoticeBar";
import { PublicFooter } from "@/components/public/PublicFooter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const sections = [
  {
    id: "legal-notice",
    title: "Legal notice",
    body: "HappyCo Concierge V1 is a demonstration platform prepared for evaluation and business development purposes. Metrics, AI summaries, and financial outcomes shown in preview are seeded examples intended to illustrate product behavior and workflow design.",
  },
  {
    id: "privacy-notice",
    title: "Privacy & activity logging",
    body: "We log IP addresses, authentication events, and administrative activity for security, reliability, abuse prevention, and operational debugging. Demo records shown in preview are synthetic and seeded for product evaluation.",
  },
  {
    id: "cookie-notice",
    title: "Cookie notice",
    body: "We use essential cookies to keep sessions secure, preserve admin authentication, and remember interaction preferences such as cookie notice choices. Optional marketing cookies are not required for the preview demo experience.",
  },
];

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-background" data-testid="legal-page-root">
      <div className="teal-mist border-b border-border/70">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-4 px-4 py-10 sm:px-6 lg:px-8">
          <Badge className="w-fit bg-primary/10 text-primary" data-testid="legal-page-badge" variant="secondary">
            Public notice
          </Badge>
          <h1 className="font-[var(--font-heading)] text-4xl font-semibold tracking-[-0.02em] text-foreground" data-testid="legal-page-title">
            Legal, privacy, and cookie information
          </h1>
          <p className="max-w-3xl text-base leading-7 text-muted-foreground">
            This page preserves the public visibility pattern from the current preview: legal, privacy, and cookie information remain available outside the admin shell and linked from public pages.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild className="rounded-full" data-testid="legal-page-back-home-button">
              <Link to="/">Back to landing</Link>
            </Button>
            <Button asChild className="rounded-full" data-testid="legal-page-sign-in-button" variant="outline">
              <Link to="/login">Sign in</Link>
            </Button>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="grid gap-6 lg:grid-cols-3">
          {sections.map((section) => (
            <Card className="happyco-card" data-testid={`legal-section-${section.id}`} id={section.id} key={section.id}>
              <CardHeader>
                <CardTitle className="text-xl tracking-[-0.02em]">{section.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-7 text-muted-foreground">{section.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <PublicFooter />
      <CookieNoticeBar
        notice={{
          title: "Privacy & Activity Logging",
          body: "We log IP addresses and activity for security and reliability purposes.",
          linkLabel: "Learn more",
          linkHref: "/legal#privacy-notice",
        }}
      />
    </div>
  );
}
