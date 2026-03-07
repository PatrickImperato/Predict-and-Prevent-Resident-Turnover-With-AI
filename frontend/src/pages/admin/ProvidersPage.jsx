import { motion } from "framer-motion";
import { Building2, TrendingUp, Users, Package, AlertCircle, CheckCircle2, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

const PROVIDER_DATA = {
  summary: {
    totalActiveProviders: 18,
    avgUtilization: 67,
    totalBookings: 342,
    portfolioCoverage: 89
  },
  providers: [
    {
      id: "prov-1",
      name: "Seattle Clean Pro",
      category: "Cleaning",
      properties: ["Ballard Commons", "Capitol Hill Residences"],
      bookings: 87,
      utilization: 78,
      avgResponseTime: "2.4 hours",
      rating: 4.8,
      status: "active",
      expansionOpportunity: "High - Available for Bellevue expansion"
    },
    {
      id: "prov-2",
      name: "Puget Sound HVAC",
      category: "HVAC",
      properties: ["Ballard Commons", "Bellevue Towers"],
      bookings: 52,
      utilization: 71,
      avgResponseTime: "3.1 hours",
      rating: 4.6,
      status: "active",
      expansionOpportunity: "Medium - Could serve Capitol Hill"
    },
    {
      id: "prov-3",
      name: "Seattle Pet Care",
      category: "Pet Services",
      properties: ["Capitol Hill Residences"],
      bookings: 63,
      utilization: 82,
      avgResponseTime: "1.8 hours",
      rating: 4.9,
      status: "active",
      expansionOpportunity: "High - High demand across all properties"
    },
    {
      id: "prov-4",
      name: "Handy Seattle",
      category: "Handyman",
      properties: ["Ballard Commons"],
      bookings: 41,
      utilization: 58,
      avgResponseTime: "4.2 hours",
      rating: 4.5,
      status: "active",
      expansionOpportunity: "High - Underutilized, expand to other properties"
    },
    {
      id: "prov-5",
      name: "Cascade Plumbing",
      category: "Plumbing",
      properties: ["Capitol Hill Residences", "Bellevue Towers"],
      bookings: 38,
      utilization: 64,
      avgResponseTime: "2.9 hours",
      rating: 4.7,
      status: "active",
      expansionOpportunity: "Medium - Good performance"
    },
    {
      id: "prov-6",
      name: "Emerald City Landscaping",
      category: "Landscaping",
      properties: ["Bellevue Towers"],
      bookings: 28,
      utilization: 45,
      avgResponseTime: "5.1 hours",
      rating: 4.4,
      status: "underutilized",
      expansionOpportunity: "Low - Specialty service, property-specific"
    }
  ],
  categoryBreakdown: [
    { category: "Cleaning", providers: 3, bookings: 142, coverage: 100 },
    { category: "HVAC", providers: 2, bookings: 67, coverage: 67 },
    { category: "Pet Services", providers: 2, bookings: 98, coverage: 67 },
    { category: "Handyman", providers: 3, bookings: 86, coverage: 100 },
    { category: "Plumbing", providers: 2, bookings: 54, coverage: 67 },
    { category: "Landscaping", providers: 1, bookings: 28, coverage: 33 }
  ]
};

export default function ProvidersPage() {
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
          <p className="metric-value mt-3">{PROVIDER_DATA.summary.totalActiveProviders}</p>
          <p className="metric-detail mt-2">Across 3 properties</p>
        </div>
        <div className="saas-metric-card">
          <p className="metric-label">Avg. Utilization</p>
          <p className="metric-value mt-3">{PROVIDER_DATA.summary.avgUtilization}%</p>
          <p className="metric-detail mt-2">Portfolio-wide average</p>
        </div>
        <div className="saas-metric-card">
          <p className="metric-label">Total Bookings</p>
          <p className="metric-value mt-3">{PROVIDER_DATA.summary.totalBookings}</p>
          <p className="metric-detail mt-2">Last 30 days</p>
        </div>
        <div className="saas-metric-card">
          <p className="metric-label">Portfolio Coverage</p>
          <p className="metric-value mt-3">{PROVIDER_DATA.summary.portfolioCoverage}%</p>
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
          <div className="rounded-xl border border-amber-200 bg-white p-4">
            <p className="font-semibold text-slate-900">Seattle Pet Care - High Demand</p>
            <p className="mt-2 text-sm text-slate-600">Currently only at Capitol Hill. High utilization (82%) and excellent rating (4.9). Expanding to Ballard Commons and Bellevue Towers could generate 40-50 additional bookings/month.</p>
          </div>
          <div className="rounded-xl border border-amber-200 bg-white p-4">
            <p className="font-semibold text-slate-900">Handy Seattle - Underutilized</p>
            <p className="mt-2 text-sm text-slate-600">Only serving Ballard Commons at 58% utilization. Expanding to Capitol Hill and Bellevue could optimize provider capacity and increase resident value.</p>
          </div>
          <div className="rounded-xl border border-amber-200 bg-white p-4">
            <p className="font-semibold text-slate-900">HVAC Gap at Capitol Hill</p>
            <p className="mt-2 text-sm text-slate-600">No HVAC provider currently serves Capitol Hill Residences. Adding Puget Sound HVAC coverage would complete service portfolio and prevent resident friction during summer months.</p>
          </div>
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
                <TableHead>Opportunity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {PROVIDER_DATA.providers.map((provider) => (
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
                    ) : provider.expansionOpportunity.startsWith("High") ? (
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
            {PROVIDER_DATA.categoryBreakdown.map((cat) => (
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
