import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { propertiesApi } from "@/lib/api";

export default function PropertiesPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const loadProperties = async () => {
      try {
        const response = await propertiesApi.getList();
        setData(response.data);
      } catch (error) {
        toast.error(error?.response?.data?.detail || "Unable to load properties.");
      } finally {
        setLoading(false);
      }
    };

    loadProperties();
  }, []);

  if (loading) {
    return (
      <div className="grid gap-4" data-testid="properties-page-loading-state">
        <Skeleton className="h-16 rounded-3xl" />
        <Skeleton className="h-56 rounded-3xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6" data-testid="properties-page-root">
      <section className="rounded-3xl border border-border/80 bg-card/85 p-6 shadow-[var(--shadow-soft)]">
        <Badge className="w-fit bg-primary/10 text-primary" data-testid="properties-page-badge" variant="secondary">
          Flagship property first
        </Badge>
        <h2 className="mt-3 font-[var(--font-heading)] text-3xl font-semibold tracking-[-0.02em] text-foreground" data-testid="properties-page-title">
          Properties portfolio with a fully modeled flagship experience.
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
          The Metropolitan at Riverside now includes unit-level records, resident assignment, churn history, interventions, credits, bookings, provider links, and revenue ties. Lakeside Commons and Downtown Tower stay available for portfolio context.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4" data-testid="properties-portfolio-totals-grid">
        <Card className="happyco-card"><CardContent className="p-5"><p className="text-sm text-muted-foreground">Total units</p><p className="mt-3 font-[var(--font-heading)] text-3xl font-semibold tracking-[-0.02em] text-foreground">{data.portfolio_totals.total_units}</p></CardContent></Card>
        <Card className="happyco-card"><CardContent className="p-5"><p className="text-sm text-muted-foreground">Occupied units</p><p className="mt-3 font-[var(--font-heading)] text-3xl font-semibold tracking-[-0.02em] text-foreground">{data.portfolio_totals.occupied_units}</p></CardContent></Card>
        <Card className="happyco-card"><CardContent className="p-5"><p className="text-sm text-muted-foreground">Gross revenue</p><p className="mt-3 font-[var(--font-heading)] text-3xl font-semibold tracking-[-0.02em] text-foreground">${data.portfolio_totals.gross_revenue.toLocaleString()}</p></CardContent></Card>
        <Card className="happyco-card"><CardContent className="p-5"><p className="text-sm text-muted-foreground">Credits issued</p><p className="mt-3 font-[var(--font-heading)] text-3xl font-semibold tracking-[-0.02em] text-foreground">${data.portfolio_totals.credits_issued.toLocaleString()}</p></CardContent></Card>
      </section>

      <section className="grid gap-4 xl:grid-cols-3" data-testid="properties-card-grid">
        {data.properties.map((property) => (
          <Card className="happyco-card happyco-card-hover" data-testid={`properties-card-${property.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} key={property.property_id}>
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <CardTitle className="text-xl tracking-[-0.02em]">{property.name}</CardTitle>
                  <p className="mt-2 text-sm text-muted-foreground">Manager: {property.manager_name}</p>
                </div>
                {property.is_flagship ? (
                  <Badge className="bg-primary/10 text-primary" data-testid="properties-flagship-badge" variant="secondary">
                    Flagship
                  </Badge>
                ) : null}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-border/80 bg-muted/35 p-4">
                  <p className="text-sm text-muted-foreground">Occupancy</p>
                  <p className="mt-2 font-[var(--font-heading)] text-2xl font-semibold tracking-[-0.02em] text-foreground">{property.occupied_units}/{property.total_units}</p>
                </div>
                <div className="rounded-2xl border border-border/80 bg-muted/35 p-4">
                  <p className="text-sm text-muted-foreground">At risk</p>
                  <p className="mt-2 font-[var(--font-heading)] text-2xl font-semibold tracking-[-0.02em] text-foreground">{property.at_risk_residents}</p>
                </div>
                <div className="rounded-2xl border border-border/80 bg-muted/35 p-4">
                  <p className="text-sm text-muted-foreground">Gross revenue</p>
                  <p className="mt-2 font-[var(--font-heading)] text-2xl font-semibold tracking-[-0.02em] text-foreground">${property.gross_revenue.toLocaleString()}</p>
                </div>
                <div className="rounded-2xl border border-border/80 bg-muted/35 p-4">
                  <p className="text-sm text-muted-foreground">Provider coverage</p>
                  <p className="mt-2 font-[var(--font-heading)] text-2xl font-semibold tracking-[-0.02em] text-foreground">{property.provider_coverage_percent}%</p>
                </div>
              </div>
              <Button asChild className="w-full rounded-xl" data-testid={`properties-open-${property.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-button`}>
                <Link to={`/app/admin/properties/${property.property_id}`}>
                  Open property
                  <ArrowRight className="ml-2 h-4 w-4" strokeWidth={1.75} />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
