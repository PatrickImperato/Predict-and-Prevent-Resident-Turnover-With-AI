import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getProperties } from "@/lib/api";
import { CANONICAL_PROPERTIES, PORTFOLIO_TOTALS } from "@/lib/canonicalData";

export default function PropertiesPage() {
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState([]);
  const [portfolioTotals, setPortfolioTotals] = useState(null);

  useEffect(() => {
    const loadProperties = async () => {
      try {
        const response = await getProperties();
        
        // Use API data if available, fallback to canonical data
        if (response?.data?.properties) {
          setProperties(response.data.properties);
        } else {
          // Fallback to canonical data
          setProperties(CANONICAL_PROPERTIES);
        }
        
        // Use API portfolio totals if available, fallback to canonical
        if (response?.data?.portfolio_totals) {
          setPortfolioTotals(response.data.portfolio_totals);
        } else {
          // Transform canonical totals to match API shape
          setPortfolioTotals({
            total_units: PORTFOLIO_TOTALS.totalUnits,
            occupied_units: PORTFOLIO_TOTALS.occupiedUnits,
            gross_revenue: PORTFOLIO_TOTALS.totalServiceRevenue,
            credits_issued: PORTFOLIO_TOTALS.totalCreditsInvested
          });
        }
      } catch (error) {
        console.error("Properties load error:", error);
        
        // On error, silently use canonical data as fallback (no toast in demo)
        setProperties(CANONICAL_PROPERTIES);
        setPortfolioTotals({
          total_units: PORTFOLIO_TOTALS.totalUnits,
          occupied_units: PORTFOLIO_TOTALS.occupiedUnits,
          gross_revenue: PORTFOLIO_TOTALS.totalServiceRevenue,
          credits_issued: PORTFOLIO_TOTALS.totalCreditsInvested
        });
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

  // Ensure we have data before rendering
  if (!properties || properties.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center rounded-xl border border-slate-200 bg-white p-8">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-slate-900">No Properties Found</h3>
          <p className="mt-2 text-sm text-slate-600">Unable to load properties data.</p>
        </div>
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
        <div className="saas-metric-card">
          <p className="metric-label">Total units</p>
          <p className="metric-value">{portfolioTotals?.total_units || 0}</p>
        </div>
        <div className="saas-metric-card">
          <p className="metric-label">Occupied units</p>
          <p className="metric-value">{portfolioTotals?.occupied_units || 0}</p>
        </div>
        <div className="saas-metric-card">
          <p className="metric-label">Gross revenue</p>
          <p className="metric-value">${(portfolioTotals?.gross_revenue || 0).toLocaleString()}</p>
        </div>
        <div className="saas-metric-card">
          <p className="metric-label">Credits issued</p>
          <p className="metric-value">${(portfolioTotals?.credits_issued || 0).toLocaleString()}</p>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-3" data-testid="properties-card-grid">
        {properties.map((property, index) => {
          // Normalize property fields (handle both snake_case from API and camelCase from canonical data)
          const propertyId = property.property_id || property.propertyId || property.id;
          const propertyName = property.name || "Unknown Property";
          const managerName = property.manager_name || property.managerName || property.manager || "Portfolio Property";
          const isFlagship = property.is_flagship || property.isFlagship || false;
          const totalUnits = property.total_units || property.totalUnits || 0;
          const occupiedUnits = property.occupied_units || property.occupiedUnits || 0;
          const atRiskResidents = property.at_risk_residents || property.atRiskResidents || 0;
          const grossRevenue = property.gross_revenue || property.grossRevenue || 0;
          const providerCoverage = property.provider_coverage_percent || property.providerCoveragePercent || 0;
          
          return (
            <motion.div
              key={propertyId || index}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.26, delay: 0.08 + index * 0.06, ease: "easeOut" }}
            >
              <div className="saas-card saas-card:hover h-full" data-testid={`properties-card-${propertyName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
                <div className="mb-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold tracking-tight text-slate-900">{propertyName}</h3>
                      <p className="mt-1 text-sm text-slate-600">Manager: {managerName}</p>
                    </div>
                    {isFlagship && (
                      <Badge className="border-teal-200 bg-teal-50 text-teal-700 hover:bg-teal-50" data-testid="properties-flagship-badge" variant="secondary">
                        Flagship
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                      <p className="text-xs font-medium text-slate-600">Occupancy</p>
                      <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">{occupiedUnits}/{totalUnits}</p>
                    </div>
                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                      <p className="text-xs font-medium text-slate-600">At risk</p>
                      <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">{atRiskResidents}</p>
                    </div>
                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                      <p className="text-xs font-medium text-slate-600">Gross revenue</p>
                      <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">${grossRevenue.toLocaleString()}</p>
                    </div>
                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                      <p className="text-xs font-medium text-slate-600">Provider coverage</p>
                      <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">{providerCoverage}%</p>
                    </div>
                  </div>
                  <Button asChild className="h-10 w-full rounded-lg shadow-sm" data-testid={`properties-open-${propertyName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-button`}>
                    <Link to={`/app/admin/properties/${propertyId}`}>
                      Open property
                      <ArrowRight className="ml-2 h-4 w-4" strokeWidth={1.75} />
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </section>
    </motion.div>
  );
}