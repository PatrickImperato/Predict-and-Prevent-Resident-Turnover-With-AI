import { motion } from "framer-motion";
import { TrendingUp, AlertCircle, CheckCircle2, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { CANONICAL_PROVIDERS, CANONICAL_PROPERTIES } from "@/lib/canonicalData";

export default function ProvidersPage() {
  // Calculate summary metrics from canonical data
  const totalActiveProviders = CANONICAL_PROVIDERS.length;
  const avgUtilization = Math.round(
    CANONICAL_PROVIDERS.reduce((sum, p) => sum + p.utilization, 0) / totalActiveProviders
  );
  const totalBookings = CANONICAL_PROVIDERS.reduce((sum, p) => sum + p.bookings, 0);
  const avgCoverage = Math.round(
    CANONICAL_PROVIDERS.reduce((sum, p) => sum + p.coveragePercent, 0) / totalActiveProviders
  );

  // Service category breakdown from canonical providers
  const categoryMap = {};
  CANONICAL_PROVIDERS.forEach(provider => {
    provider.serviceCategories.forEach(cat => {
      if (!categoryMap[cat]) {
        categoryMap[cat] = { category: cat, providers: 0, bookings: 0, coverage: 0 };
      }
      categoryMap[cat].providers += 1;
      categoryMap[cat].bookings += Math.round(provider.bookings / provider.serviceCategories.length);
      categoryMap[cat].coverage += Math.round(provider.coveragePercent / provider.serviceCategories.length);
    });
  });
  const categoryBreakdown = Object.values(categoryMap);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: "easeOut" }}
      className="space-y-6"
      data-testid="providers-page-root"
    >
      {/* Summary Cards */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <div className="saas-metric-card">
          <p className="metric-label">Active Providers</p>
          <p className="metric-value mt-3">{totalActiveProviders}</p>
          <p className="metric-detail mt-2">Across {CANONICAL_PROPERTIES.length} properties</p>
        </div>
        <div className="saas-metric-card">
          <p className="metric-label">Avg. Utilization</p>
          <p className="metric-value mt-3">{avgUtilization}%</p>
          <p className="metric-detail mt-2">Portfolio-wide average</p>
        </div>
        <div className="saas-metric-card">
          <p className="metric-label">Total Bookings</p>
          <p className="metric-value mt-3">{totalBookings}</p>
          <p className="metric-detail mt-2">Last 30 days</p>
        </div>
        <div className="saas-metric-card">
          <p className="metric-label">Portfolio Coverage</p>
          <p className="metric-value mt-3">{avgCoverage}%</p>
          <p className="metric-detail mt-2">Service availability</p>
        </div>
      </div>

      {/* Expansion Opportunities */}
      <Card className="happyco-card border-amber-200 bg-amber-50/50">
        <CardHeader>
          <div className="flex items-center gap-3">
            <TrendingUp className="h-5 w-5 text-amber-600" />
            <CardTitle className="text-xl tracking-[-0.02em] text-amber-900">Provider Expansion Opportunities</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {CANONICAL_PROVIDERS.filter(p => p.expansionOpportunity).map(provider => (
            <div key={provider.id} className="rounded-xl border border-amber-200 bg-white p-4">
              <p className="font-semibold text-slate-900">{provider.name}</p>
              <p className="mt-2 text-sm text-slate-600">{provider.expansionOpportunity}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Provider Performance Table */}
      <Card className="happyco-card">
        <CardHeader>
          <CardTitle className="text-xl tracking-[-0.02em]">Provider Performance & Coverage</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Provider</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Properties</TableHead>
                <TableHead className="text-right">Bookings</TableHead>
                <TableHead className="text-right">Utilization</TableHead>
                <TableHead className="text-right">Response Time</TableHead>
                <TableHead className="text-right">Rating</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {CANONICAL_PROVIDERS.map((provider) => (
                <TableRow key={provider.id}>
                  <TableCell className="font-medium text-foreground">{provider.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-xs">{provider.category}</Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{provider.properties.length} properties</TableCell>
                  <TableCell className="text-right font-medium">{provider.bookings}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <span className="text-sm">{provider.utilization}%</span>
                      <div className="w-16">
                        <Progress value={provider.utilization} className="h-2" />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right text-sm">{provider.avgResponseTime}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <span className="font-medium">{provider.rating}</span>
                      <span className="text-xs text-muted-foreground">/5.0</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {provider.status === "underutilized" ? (
                      <Badge variant="outline" className="border-amber-300 bg-amber-50 text-amber-700 text-xs">
                        <AlertCircle className="mr-1 h-3 w-3" />
                        Underutilized
                      </Badge>
                    ) : provider.expansionOpportunity?.startsWith("High") ? (
                      <Badge variant="outline" className="border-teal-300 bg-teal-50 text-teal-700 text-xs">
                        <ArrowUpRight className="mr-1 h-3 w-3" />
                        Expand
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="border-slate-300 bg-slate-50 text-slate-600 text-xs">
                        <CheckCircle2 className="mr-1 h-3 w-3" />
                        Active
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Service Category Breakdown */}
      <Card className="happyco-card">
        <CardHeader>
          <CardTitle className="text-xl tracking-[-0.02em]">Service Category Coverage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {categoryBreakdown.map((cat) => (
              <div key={cat.category} className="rounded-xl border border-border/80 bg-muted/30 p-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="font-semibold text-foreground">{cat.category}</p>
                  <Badge variant="secondary" className="text-xs">{cat.providers} providers</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Bookings:</span>
                    <span className="font-medium text-foreground">{cat.bookings}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Coverage:</span>
                    <span className="font-medium text-foreground">{cat.coverage}%</span>
                  </div>
                  <Progress value={cat.coverage} className="h-2 mt-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
