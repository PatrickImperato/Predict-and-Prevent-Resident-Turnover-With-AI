import { ArrowLeft, Building2, MessageSquare, Wrench } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { propertiesApi } from "@/lib/api";

export default function PropertyDetailPage() {
  const { propertyId } = useParams();
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    const loadDetail = async () => {
      try {
        const response = await propertiesApi.getDetail(propertyId);
        setDetail(response.data);
      } catch (error) {
        toast.error(error?.response?.data?.detail || "Unable to load property detail.");
      } finally {
        setLoading(false);
      }
    };

    loadDetail();
  }, [propertyId]);

  if (loading) {
    return (
      <div className="grid gap-4" data-testid="property-detail-loading-state">
        <Skeleton className="h-16 rounded-3xl" />
        <Skeleton className="h-80 rounded-3xl" />
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: "easeOut" }}
      className="space-y-8" 
      data-testid="property-detail-page-root"
    >
      <section className="rounded-3xl border border-border/80 bg-card/85 p-8 shadow-[var(--shadow-soft)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Button asChild className="rounded-full" data-testid="property-detail-back-to-properties-button" size="sm" variant="outline">
              <Link to="/app/admin/properties">
                <ArrowLeft className="mr-2 h-4 w-4" strokeWidth={1.75} />
                Back to properties
              </Link>
            </Button>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              {detail.property.is_flagship ? (
                <Badge className="bg-primary/10 text-primary" data-testid="property-detail-flagship-badge" variant="secondary">
                  Flagship property
                </Badge>
              ) : null}
              <Badge className="bg-muted text-muted-foreground" data-testid="property-detail-manager-badge" variant="secondary">
                Manager: {detail.property.manager_name || "Unassigned"}
              </Badge>
            </div>
            <h2 className="mt-4 font-[var(--font-heading)] text-3xl font-semibold tracking-[-0.02em] text-foreground" data-testid="property-detail-title">
              {detail.property.name}
            </h2>
            <p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">{detail.property.overview}</p>
          </div>
          <div className="rounded-2xl border border-border/80 bg-muted/35 p-4 text-sm text-muted-foreground" data-testid="property-detail-address-card">
            <p className="font-medium text-foreground">{detail.property.address.street}</p>
            <p>{detail.property.address.city}, {detail.property.address.state} {detail.property.address.postalCode}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4" data-testid="property-detail-summary-grid">
        {detail.summary_cards.map((card) => (
          <Card className="happyco-card" data-testid={`property-detail-summary-${card.key}`} key={card.key}>
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground">{card.label}</p>
              <p className="mt-3 font-[var(--font-heading)] text-2xl font-semibold tracking-[-0.02em] text-foreground">{card.value}</p>
              {card.detail ? <p className="mt-2 text-sm text-muted-foreground">{card.detail}</p> : null}
            </CardContent>
          </Card>
        ))}
      </section>

      <Tabs className="space-y-5" defaultValue="resident-story" data-testid="property-detail-tabs">
        <TabsList className="grid w-full grid-cols-3 rounded-2xl bg-muted/60 p-1 md:w-[540px]">
          <TabsTrigger data-testid="property-detail-tab-resident-story" value="resident-story">Resident story</TabsTrigger>
          <TabsTrigger data-testid="property-detail-tab-units" value="units">Units</TabsTrigger>
          <TabsTrigger data-testid="property-detail-tab-operations" value="operations">Operations</TabsTrigger>
        </TabsList>

        <TabsContent value="resident-story">
          <div className="grid gap-5 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
            <Card className="happyco-card" data-testid="property-detail-alex-profile-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/12 text-primary">
                    <Building2 className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <div>
                    <CardTitle className="text-xl tracking-[-0.02em]">Alex Chen end-to-end profile</CardTitle>
                    <p className="mt-1 text-sm text-muted-foreground">Unit {detail.resident_profile.unit} • {detail.resident_profile.email}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-border/80 bg-muted/35 p-4"><p className="text-sm text-muted-foreground">Churn score</p><p className="mt-2 font-[var(--font-heading)] text-3xl font-semibold tracking-[-0.02em] text-foreground">{detail.resident_profile.churn_score}</p></div>
                  <div className="rounded-2xl border border-border/80 bg-muted/35 p-4"><p className="text-sm text-muted-foreground">Score change</p><p className="mt-2 font-[var(--font-heading)] text-3xl font-semibold tracking-[-0.02em] text-foreground">+{detail.resident_profile.score_change}</p></div>
                  <div className="rounded-2xl border border-border/80 bg-muted/35 p-4"><p className="text-sm text-muted-foreground">Risk tier</p><p className="mt-2 font-[var(--font-heading)] text-3xl font-semibold tracking-[-0.02em] text-foreground">{detail.resident_profile.risk_tier}</p></div>
                </div>
                <div className="rounded-2xl border border-border/80 bg-secondary/35 p-4 text-sm leading-7 text-secondary-foreground" data-testid="property-detail-score-explanation">
                  <p className="font-medium text-foreground">{detail.resident_profile.driver_summary}</p>
                  <p className="mt-2">{detail.resident_profile.score_explanation}</p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {detail.weighted_drivers.map((driver) => (
                    <div className="rounded-2xl border border-border/80 bg-muted/35 p-4" data-testid={`property-detail-driver-${driver.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} key={driver.label}>
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-foreground">{driver.label}</p>
                        <p className="text-sm text-primary">{driver.weight}%</p>
                      </div>
                      <Progress className="mt-3" value={(driver.impact_score / driver.weight) * 100} />
                      <p className="mt-3 text-sm font-medium text-foreground">{driver.signal_value}</p>
                      <p className="mt-2 text-sm text-muted-foreground">{driver.narrative}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-5">
              <Card className="happyco-card" data-testid="property-detail-flagged-residents-card">
                <CardHeader>
                  <CardTitle className="text-xl tracking-[-0.02em]">Top flagged residents</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {detail.flagged_residents.map((resident) => (
                    <div className="rounded-2xl border border-border/80 bg-muted/35 p-4" data-testid={`property-detail-flagged-${resident.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} key={resident.resident_id}>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-foreground">{resident.name}</p>
                          <p className="text-sm text-muted-foreground">Unit {resident.unit_number}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-[var(--font-heading)] text-2xl font-semibold tracking-[-0.02em] text-foreground">{resident.score}</p>
                          <p className="text-xs text-muted-foreground">{resident.primary_driver}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
              <Card className="happyco-card" data-testid="property-detail-score-history-card">
                <CardHeader>
                  <CardTitle className="text-xl tracking-[-0.02em]">Churn score history</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-3 sm:grid-cols-3">
                  {detail.resident_profile.score_history.map((point) => (
                    <div className="rounded-2xl border border-border/80 bg-muted/35 p-4" data-testid={`property-detail-score-point-${point.as_of_date}`} key={point.as_of_date}>
                      <p className="text-xs uppercase tracking-[0.08em] text-muted-foreground">{new Date(point.as_of_date).toLocaleDateString()}</p>
                      <p className="mt-2 font-[var(--font-heading)] text-2xl font-semibold tracking-[-0.02em] text-foreground">{point.score}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-5 grid gap-5 xl:grid-cols-3">
            <Card className="happyco-card" data-testid="property-detail-maintenance-card">
              <CardHeader><div className="flex items-center gap-3"><Wrench className="h-5 w-5 text-primary" strokeWidth={1.75} /><CardTitle className="text-xl tracking-[-0.02em]">Maintenance history</CardTitle></div></CardHeader>
              <CardContent className="space-y-3">
                {detail.maintenance_history.map((item) => (
                  <div className="rounded-2xl border border-border/80 bg-muted/35 p-4" key={item.id}><p className="font-medium text-foreground">{item.title}</p><p className="mt-2 text-sm text-muted-foreground">{item.detail}</p><p className="mt-2 text-xs uppercase tracking-[0.08em] text-muted-foreground">{item.status} • {new Date(item.happened_at).toLocaleDateString()}</p></div>
                ))}
              </CardContent>
            </Card>
            <Card className="happyco-card" data-testid="property-detail-communications-card">
              <CardHeader><div className="flex items-center gap-3"><MessageSquare className="h-5 w-5 text-primary" strokeWidth={1.75} /><CardTitle className="text-xl tracking-[-0.02em]">AI concierge communication</CardTitle></div></CardHeader>
              <CardContent className="space-y-3">
                {detail.communications.map((item) => (
                  <div className="rounded-2xl border border-border/80 bg-muted/35 p-4" key={item.id}><p className="text-xs uppercase tracking-[0.08em] text-muted-foreground">{item.title}</p><p className="mt-2 text-sm leading-7 text-foreground">{item.detail}</p><p className="mt-2 text-xs text-muted-foreground">{new Date(item.happened_at).toLocaleString()}</p></div>
                ))}
              </CardContent>
            </Card>
            <Card className="happyco-card" data-testid="property-detail-interventions-card">
              <CardHeader><CardTitle className="text-xl tracking-[-0.02em]">Interventions, credits, and bookings</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {detail.interventions.map((item) => (
                  <div className="rounded-2xl border border-border/80 bg-muted/35 p-4" key={item.id}><p className="font-medium text-foreground">{item.title}</p><p className="mt-2 text-sm text-muted-foreground">{item.detail}</p></div>
                ))}
                {detail.credits.map((credit) => (
                  <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4" key={credit.id}><p className="font-medium text-foreground">{credit.title}</p><p className="mt-2 text-sm text-muted-foreground">${credit.amount.toLocaleString()} • {credit.outcome}</p></div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="units">
          <Card className="happyco-card" data-testid="property-detail-units-card">
            <CardHeader>
              <CardTitle className="text-xl tracking-[-0.02em]">Flagship unit-level records</CardTitle>
            </CardHeader>
            <CardContent className="rounded-2xl border border-border/80">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Unit</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Occupant</TableHead>
                    <TableHead className="text-right">Layout</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {detail.units.map((unit) => (
                    <TableRow key={unit.id}>
                      <TableCell className="font-medium text-foreground">{unit.number}</TableCell>
                      <TableCell>{unit.status}</TableCell>
                      <TableCell>{unit.occupant_label || "Vacant"}</TableCell>
                      <TableCell className="text-right">{unit.bedrooms} bd / {unit.bathrooms} ba • {unit.square_feet} sf</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="operations">
          <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)]">
            <Card className="happyco-card" data-testid="property-detail-bookings-card">
              <CardHeader><CardTitle className="text-xl tracking-[-0.02em]">Bookings and revenue linkage</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {detail.bookings.map((booking) => (
                  <div className="rounded-2xl border border-border/80 bg-muted/35 p-4" key={booking.id}>
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-medium text-foreground">{booking.service_name}</p>
                        <p className="text-sm text-muted-foreground">{booking.provider_name}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-foreground">${booking.revenue_amount.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">{booking.status}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="rounded-2xl border border-border/80 bg-secondary/35 p-4 text-sm text-secondary-foreground">
                  Gross revenue: ${detail.revenue_summary.gross_revenue.toLocaleString()} • Credits: ${detail.revenue_summary.credits_issued.toLocaleString()} • Net: ${detail.revenue_summary.net_revenue.toLocaleString()}
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-5">
              <Card className="happyco-card" data-testid="property-detail-providers-card">
                <CardHeader><CardTitle className="text-xl tracking-[-0.02em]">Provider relationships</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  {detail.providers.map((provider) => (
                    <div className="rounded-2xl border border-border/80 bg-muted/35 p-4" key={provider.id}>
                      <p className="font-medium text-foreground">{provider.name}</p>
                      <p className="mt-2 text-sm text-muted-foreground">{provider.service_categories.join(", ")}</p>
                      <p className="mt-2 text-sm text-muted-foreground">Coverage {provider.coverage_percent}% • Fulfillment {provider.fulfillment_rate}%</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
              <Card className="happyco-card" data-testid="property-detail-revenue-history-card">
                <CardHeader><CardTitle className="text-xl tracking-[-0.02em]">Monthly revenue history</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  {detail.monthly_revenue_history.map((row) => (
                    <div className="rounded-2xl border border-border/80 bg-muted/35 p-4" key={row.month}>
                      <div className="flex items-center justify-between"><p className="font-medium text-foreground">{row.month}</p><p className="text-sm text-muted-foreground">Net ${row.net_revenue.toLocaleString()}</p></div>
                      <p className="mt-2 text-sm text-muted-foreground">Gross ${row.gross_revenue.toLocaleString()} • Credits ${row.credits_issued.toLocaleString()}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
