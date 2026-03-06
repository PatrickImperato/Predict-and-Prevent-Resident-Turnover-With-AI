import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { dashboardApi } from "@/lib/api";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const response = await dashboardApi.getOverview();
        setDashboard(response.data);
      } catch (error) {
        toast.error(error?.response?.data?.detail || "Unable to load dashboard.");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="grid gap-4" data-testid="dashboard-page-loading-state">
        <Skeleton className="h-16 rounded-3xl" />
        <Skeleton className="h-56 rounded-3xl" />
        <Skeleton className="h-80 rounded-3xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6" data-testid="dashboard-page-root">
      <section className="rounded-3xl border border-border/80 bg-card/85 p-6 shadow-[var(--shadow-soft)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Badge className="w-fit bg-primary/10 text-primary" data-testid="dashboard-flagship-badge" variant="secondary">
              Seeded flagship read model
            </Badge>
            <h2 className="mt-3 font-[var(--font-heading)] text-3xl font-semibold tracking-[-0.02em] text-foreground" data-testid="dashboard-page-title">
              Portfolio dashboard powered by coherent backend data.
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
              The Metropolitan at Riverside now anchors the demo with unit-level structure, resident friction history, AI concierge interventions, and linked revenue effects.
            </p>
          </div>
          <Button asChild className="rounded-xl" data-testid="dashboard-open-flagship-property-button">
            <Link to="/app/admin/properties/a4f7603e-dda0-4c44-b382-e159f8c773be">
              Open flagship property
              <ArrowRight className="ml-2 h-4 w-4" strokeWidth={1.75} />
            </Link>
          </Button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4" data-testid="dashboard-summary-cards-grid">
        {dashboard.summary_cards.map((card) => (
          <Card className="happyco-card" data-testid={`dashboard-summary-card-${card.key}`} key={card.key}>
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground">{card.label}</p>
              <p className="mt-3 font-[var(--font-heading)] text-3xl font-semibold tracking-[-0.02em] text-foreground">{card.value}</p>
              {card.detail ? <p className="mt-2 text-sm text-muted-foreground">{card.detail}</p> : null}
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <Card className="happyco-card" data-testid="dashboard-flagged-residents-card">
          <CardHeader>
            <CardTitle className="text-xl tracking-[-0.02em]">Top flagged residents</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {dashboard.flagged_residents.map((resident) => (
              <Link
                className="flex items-center justify-between rounded-2xl border border-border/80 bg-muted/35 p-4 transition-colors hover:bg-muted/60"
                data-testid={`dashboard-flagged-resident-${resident.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                key={resident.resident_id}
                to={`/app/admin/properties/${resident.property_id}`}
              >
                <div>
                  <p className="font-medium text-foreground">{resident.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {resident.property_name} • Unit {resident.unit_number}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.08em] text-muted-foreground">Primary driver: {resident.primary_driver}</p>
                </div>
                <div className="text-right">
                  <p className="font-[var(--font-heading)] text-2xl font-semibold tracking-[-0.02em] text-foreground">{resident.score}</p>
                  <p className="text-xs text-muted-foreground">+{resident.score_change} this period</p>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card className="happyco-card" data-testid="dashboard-flagship-summary-card">
          <CardHeader>
            <CardTitle className="text-xl tracking-[-0.02em]">Flagship property snapshot</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            {dashboard.flagship_cards.map((card) => (
              <div className="rounded-2xl border border-border/80 bg-muted/35 p-4" data-testid={`dashboard-flagship-card-${card.key}`} key={card.key}>
                <p className="text-sm text-muted-foreground">{card.label}</p>
                <p className="mt-2 font-[var(--font-heading)] text-2xl font-semibold tracking-[-0.02em] text-foreground">{card.value}</p>
                {card.detail ? <p className="mt-1 text-sm text-muted-foreground">{card.detail}</p> : null}
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
        <Card className="happyco-card" data-testid="dashboard-properties-table-card">
          <CardHeader>
            <CardTitle className="text-xl tracking-[-0.02em]">Portfolio property context</CardTitle>
          </CardHeader>
          <CardContent className="rounded-2xl border border-border/80">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Property</TableHead>
                  <TableHead className="text-right">Occupancy</TableHead>
                  <TableHead className="text-right">At risk</TableHead>
                  <TableHead className="text-right">Gross revenue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dashboard.portfolio_properties.map((property) => (
                  <TableRow key={property.property_id}>
                    <TableCell>
                      <Link className="font-medium text-foreground hover:text-primary" data-testid={`dashboard-property-link-${property.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} to={`/app/admin/properties/${property.property_id}`}>
                        {property.name}
                      </Link>
                    </TableCell>
                    <TableCell className="text-right text-foreground">{property.occupancy_rate}%</TableCell>
                    <TableCell className="text-right text-foreground">{property.at_risk_residents}</TableCell>
                    <TableCell className="text-right text-foreground">${property.gross_revenue.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          <Card className="happyco-card" data-testid="dashboard-churn-weights-card">
            <CardHeader>
              <CardTitle className="text-xl tracking-[-0.02em]">Churn model weights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {dashboard.churn_weights.map((weight) => (
                <div className="rounded-2xl border border-border/80 bg-muted/35 p-4" data-testid={`dashboard-weight-${weight.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} key={weight.label}>
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-foreground">{weight.label}</p>
                    <p className="text-sm font-semibold text-primary">{weight.weight}%</p>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{weight.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card className="happyco-card" data-testid="dashboard-ai-highlights-card">
            <CardHeader>
              <CardTitle className="text-xl tracking-[-0.02em]">AI concierge highlights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {dashboard.ai_concierge_highlights.map((highlight, index) => (
                <div className="rounded-2xl border border-border/80 bg-muted/35 p-4 text-sm leading-7 text-muted-foreground" data-testid={`dashboard-ai-highlight-${index + 1}`} key={highlight}>
                  {highlight}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
