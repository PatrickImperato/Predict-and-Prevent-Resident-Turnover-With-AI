import { ArrowRight, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const AdminPagePlaceholder = ({
  description,
  routePath,
  title,
}) => {
  return (
    <div className="space-y-6" data-testid={`admin-placeholder-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-page`}>
      <div className="rounded-3xl border border-border/80 bg-card/80 p-6 shadow-[var(--shadow-soft)]">
        <Badge className="w-fit bg-primary/10 text-primary" data-testid={`admin-placeholder-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-badge`} variant="secondary">
          Placeholder route
        </Badge>
        <h2 className="mt-4 font-[var(--font-heading)] text-3xl font-semibold tracking-[-0.02em] text-foreground" data-testid={`admin-placeholder-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-title`}>
          {title}
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
          {description}
        </p>
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
        <Card className="happyco-card">
          <CardHeader>
            <CardTitle className="text-xl tracking-[-0.02em]">What is wired now</CardTitle>
            <CardDescription>Layout, routing, and admin-only gating are live for this route.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-2xl border border-border/80 bg-muted/35 p-4" data-testid={`admin-placeholder-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-route-path`}>
              <p className="text-sm text-muted-foreground">Route path</p>
              <p className="mt-2 font-mono text-sm text-foreground">{routePath}</p>
            </div>
            <div className="rounded-2xl border border-border/80 bg-muted/35 p-4 text-sm text-muted-foreground">
              Business logic, data loading, and CRUD flows are intentionally deferred. This phase only establishes the admin shell structure and reliable authentication gates.
            </div>
          </CardContent>
        </Card>

        <Card className="happyco-card">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/12 text-primary">
                <ShieldCheck className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <div>
                <CardTitle className="text-xl tracking-[-0.02em]">Admin-gated route</CardTitle>
                <CardDescription>All /app/admin pages require an authenticated admin session.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild className="w-full rounded-xl" data-testid={`admin-placeholder-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-diagnostics-link`}>
              <Link to="/app/admin/diagnostics">
                Open diagnostics
                <ArrowRight className="ml-2 h-4 w-4" strokeWidth={1.75} />
              </Link>
            </Button>
            <p className="text-sm text-muted-foreground">
              Use Diagnostics to verify APP_ENV, DB binding, session identity, and collection counts while these sections remain placeholders.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
