import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";

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
    <motion.div 
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: "easeOut" }}
      className="space-y-6" 
      data-testid="properties-page-root"
    >
      <section className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <Badge className="mb-3 w-fit border-teal-200 bg-teal-50 text-teal-700 hover:bg-teal-50" data-testid="properties-page-badge" variant="secondary">
          Flagship property first
        </Badge>
        <h2 className="font-[var(--font-heading)] text-[28px] font-semibold tracking-tight text-slate-900" data-testid="properties-page-title">
          Properties portfolio with a fully modeled flagship experience.
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
          The Metropolitan at Riverside now includes unit-level records, resident assignment, churn history, interventions, credits, bookings, provider links, and revenue ties. Lakeside Commons and Downtown Tower stay available for portfolio context.
        </p>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4" data-testid="properties-portfolio-totals-grid">
        <div className="saas-metric-card"><p className="metric-label">Total units</p><p className="metric-value">{data.portfolio_totals.total_units}</p></div>
        <div className="saas-metric-card"><p className="metric-label">Occupied units</p><p className="metric-value">{data.portfolio_totals.occupied_units}</p></div>
        <div className="saas-metric-card"><p className="metric-label">Gross revenue</p><p className="metric-value">${data.portfolio_totals.gross_revenue.toLocaleString()}</p></div>
        <div className="saas-metric-card"><p className="metric-label">Credits issued</p><p className="metric-value">${data.portfolio_totals.credits_issued.toLocaleString()}</p></div>
      </section>

      <section className="grid gap-5 xl:grid-cols-3" data-testid="properties-card-grid">
        {data.properties.map((property, index) => (
          <motion.div
            key={property.property_id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.26, delay: 0.08 + index * 0.06, ease: "easeOut" }}
          >
            <div className="saas-card saas-card:hover h-full" data-testid={`properties-card-${property.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
              <div className="mb-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight text-slate-900">{property.name}</h3>
                    <p className="mt-1 text-sm text-slate-600">Manager: {property.manager_name}</p>
                  </div>
                  {property.is_flagship ? (
                    <Badge className="border-teal-200 bg-teal-50 text-teal-700 hover:bg-teal-50" data-testid="properties-flagship-badge" variant="secondary">
                      Flagship
                    </Badge>
                  ) : null}
                </div>
              </div>
              <div className="space-y-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs font-medium text-slate-600">Occupancy</p>
                    <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">{property.occupied_units}/{property.total_units}</p>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs font-medium text-slate-600">At risk</p>
                    <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">{property.at_risk_residents}</p>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs font-medium text-slate-600">Gross revenue</p>
                    <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">${property.gross_revenue.toLocaleString()}</p>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs font-medium text-slate-600">Provider coverage</p>
                    <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">{property.provider_coverage_percent}%</p>
                  </div>
                </div>
                <Button asChild className="h-10 w-full rounded-lg shadow-sm" data-testid={`properties-open-${property.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-button`}>
                  <Link to={`/app/admin/properties/${property.property_id}`}>
                    Open property
                    <ArrowRight className="ml-2 h-4 w-4" strokeWidth={1.75} />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </section>
    </motion.div>
  );
}
