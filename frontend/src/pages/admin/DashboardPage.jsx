import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";

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
    <motion.div 
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: "easeOut" }}
      className="space-y-6" 
      data-testid="dashboard-page-root"
    >
      <section className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Badge className="mb-3 w-fit border-teal-200 bg-teal-50 text-teal-700 hover:bg-teal-50" data-testid="dashboard-flagship-badge" variant="secondary">
              Seeded flagship read model
            </Badge>
            <h2 className="font-[var(--font-heading)] text-[28px] font-semibold tracking-tight text-slate-900" data-testid="dashboard-page-title">
              Portfolio dashboard powered by coherent backend data.
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
              The Metropolitan at Riverside now anchors the demo with unit-level structure, resident friction history, AI concierge interventions, and linked revenue effects.
            </p>
          </div>
          <Button asChild className="h-10 rounded-lg shadow-sm" data-testid="dashboard-open-flagship-property-button">
            <Link to="/app/admin/properties/a4f7603e-dda0-4c44-b382-e159f8c773be">
              Open flagship property
              <ArrowRight className="ml-2 h-4 w-4" strokeWidth={1.75} />
            </Link>
          </Button>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4" data-testid="dashboard-summary-cards-grid">
        {dashboard.summary_cards.map((card, index) => (
          <motion.div
            key={card.key}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.24, delay: 0.04 + index * 0.06, ease: "easeOut" }}
          >
            <div className="saas-metric-card" data-testid={`dashboard-summary-card-${card.key}`}>
              <p className="metric-label mb-3">{card.label}</p>
              <p className="metric-value">{card.value}</p>
              {card.detail ? <p className="metric-detail mt-2">{card.detail}</p> : null}
            </div>
          </motion.div>
        ))}
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div className="saas-card" data-testid="dashboard-flagged-residents-card">
          <h3 className="mb-4 text-lg font-semibold tracking-tight text-slate-900">Top flagged residents</h3>
          <div className="space-y-3">
            {dashboard.flagged_residents.map((resident, index) => (
              <motion.div
                key={resident.resident_id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.22, delay: 0.3 + index * 0.05 }}
              >
                <Link
                  className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-4 transition-all hover:border-slate-300 hover:bg-white hover:shadow-sm active:scale-[0.99]"
                  data-testid={`dashboard-flagged-resident-${resident.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                  to={`/app/admin/properties/${resident.property_id}`}
                >
                  <div>
                    <p className="font-medium text-slate-900">{resident.name}</p>
                    <p className="text-sm text-slate-600">
                      {resident.property_name} • Unit {resident.unit_number}
                    </p>
                    <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-500">Primary: {resident.primary_driver}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-semibold tracking-tight text-slate-900">{resident.score}</p>
                    <p className="text-xs text-slate-500">+{resident.score_change}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="saas-card" data-testid="dashboard-flagship-summary-card">
          <h3 className="mb-4 text-lg font-semibold tracking-tight text-slate-900">Flagship property snapshot</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {dashboard.flagship_cards.map((card) => (
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4" data-testid={`dashboard-flagship-card-${card.key}`} key={card.key}>
                <p className="text-xs font-medium text-slate-600">{card.label}</p>
                <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">{card.value}</p>
                {card.detail ? <p className="mt-1 text-xs text-slate-500">{card.detail}</p> : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
        <div className="saas-card" data-testid="dashboard-properties-table-card">
          <h3 className="mb-4 text-lg font-semibold tracking-tight text-slate-900">Portfolio property context</h3>
          <div className="overflow-hidden rounded-lg border border-slate-200">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-200 bg-slate-50">
                  <TableHead className="text-xs font-semibold text-slate-700">Property</TableHead>
                  <TableHead className="text-right text-xs font-semibold text-slate-700">Occupancy</TableHead>
                  <TableHead className="text-right text-xs font-semibold text-slate-700">At risk</TableHead>
                  <TableHead className="text-right text-xs font-semibold text-slate-700">Gross revenue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dashboard.portfolio_properties.map((property) => (
                  <TableRow key={property.property_id} className="border-slate-200 hover:bg-slate-50">
                    <TableCell>
                      <Link className="font-medium text-slate-900 hover:text-teal-600" data-testid={`dashboard-property-link-${property.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} to={`/app/admin/properties/${property.property_id}`}>
                        {property.name}
                      </Link>
                    </TableCell>
                    <TableCell className="text-right text-slate-700">{property.occupancy_rate}%</TableCell>
                    <TableCell className="text-right text-slate-700">{property.at_risk_residents}</TableCell>
                    <TableCell className="text-right font-medium text-slate-900">${property.gross_revenue.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="grid gap-5">
          <div className="saas-card" data-testid="dashboard-churn-weights-card">
            <h3 className="mb-4 text-lg font-semibold tracking-tight text-slate-900">Churn model weights</h3>
            <div className="space-y-3">
              {dashboard.churn_weights.map((weight) => (
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4" data-testid={`dashboard-weight-${weight.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} key={weight.label}>
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-slate-900">{weight.label}</p>
                    <p className="text-sm font-semibold text-teal-600">{weight.weight}%</p>
                  </div>
                  <p className="mt-2 text-sm text-slate-600">{weight.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="saas-card" data-testid="dashboard-ai-highlights-card">
            <h3 className="mb-4 text-lg font-semibold tracking-tight text-slate-900">AI concierge highlights</h3>
            <div className="space-y-3">
              {dashboard.ai_concierge_highlights.map((highlight, index) => (
                <div className="rounded-lg border border-teal-200 bg-teal-50 p-4 text-sm leading-relaxed text-slate-700" data-testid={`dashboard-ai-highlight-${index + 1}`} key={highlight}>
                  {highlight}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
