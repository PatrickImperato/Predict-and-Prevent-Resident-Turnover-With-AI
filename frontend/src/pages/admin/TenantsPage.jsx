import { motion } from "framer-motion";
import { useState } from "react";
import { Search, Users, AlertTriangle, Mail, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CANONICAL_RESIDENTS, CANONICAL_PROPERTIES, ALEX_CHEN } from "@/lib/canonicalData";

export default function TenantsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [propertyFilter, setPropertyFilter] = useState("all");
  const [riskFilter, setRiskFilter] = useState("all");

  // Calculate summary metrics
  const totalTenants = CANONICAL_RESIDENTS.length;
  const atRiskCount = CANONICAL_RESIDENTS.filter(r => r.riskScore >= 60).length;
  const avgRiskScore = Math.round(
    CANONICAL_RESIDENTS.reduce((sum, r) => sum + r.riskScore, 0) / totalTenants
  );
  const activeInterventions = CANONICAL_RESIDENTS.filter(r => r.riskScore >= 70).length;

  const filteredTenants = CANONICAL_RESIDENTS.filter((tenant) => {
    const matchesSearch = tenant.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tenant.unit.includes(searchTerm);
    const matchesProperty = propertyFilter === "all" || tenant.propertyId === propertyFilter;
    const matchesRisk = riskFilter === "all" || tenant.riskTier.toLowerCase() === riskFilter.toLowerCase();
    return matchesSearch && matchesProperty && matchesRisk;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: "easeOut" }}
      className="space-y-6"
      data-testid="tenants-page-root"
    >
      {/* Summary Cards */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <div className="saas-metric-card">
          <p className="metric-label">Total Tenants</p>
          <p className="metric-value mt-3">{totalTenants}</p>
          <p className="metric-detail mt-2">Across {CANONICAL_PROPERTIES.length} properties</p>
        </div>
        <div className="saas-metric-card border-amber-200 bg-amber-50">
          <p className="metric-label text-amber-900">At Risk</p>
          <p className="metric-value mt-3 text-amber-900">{atRiskCount}</p>
          <p className="metric-detail mt-2 text-amber-700">Requires attention</p>
        </div>
        <div className="saas-metric-card">
          <p className="metric-label">Avg. Risk Score</p>
          <p className="metric-value mt-3">{avgRiskScore}</p>
          <p className="metric-detail mt-2">Portfolio average</p>
        </div>
        <div className="saas-metric-card">
          <p className="metric-label">Active Interventions</p>
          <p className="metric-value mt-3">{activeInterventions}</p>
          <p className="metric-detail mt-2">AI-driven outreach</p>
        </div>
      </div>

      {/* Filters */}
      <Card className="happyco-card">
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name or unit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={propertyFilter} onValueChange={setPropertyFilter}>
              <SelectTrigger className="w-full md:w-[220px]">
                <SelectValue placeholder="All Properties" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Properties</SelectItem>
                {CANONICAL_PROPERTIES.map(prop => (
                  <SelectItem key={prop.id} value={prop.id}>{prop.shortName}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={riskFilter} onValueChange={setRiskFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="All Risk Levels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risk Levels</SelectItem>
                <SelectItem value="high">High Risk</SelectItem>
                <SelectItem value="medium">Medium Risk</SelectItem>
                <SelectItem value="low">Low Risk</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tenant Table */}
      <Card className="happyco-card">
        <CardHeader>
          <CardTitle className="text-xl tracking-[-0.02em]">Portfolio-Wide Tenant Monitoring</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tenant</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Property</TableHead>
                <TableHead className="text-right">Risk Score</TableHead>
                <TableHead>Risk Tier</TableHead>
                <TableHead>Primary Driver</TableHead>
                <TableHead>Channel</TableHead>
                <TableHead>Lease End</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTenants.map((tenant, index) => {
                const property = CANONICAL_PROPERTIES.find(p => p.id === tenant.propertyId);
                const isAlexChen = tenant.id === ALEX_CHEN.id;
                
                return (
                  <TableRow key={tenant.id} className={isAlexChen ? "bg-teal-50/50" : ""}>
                    <TableCell className="font-medium text-foreground">
                      <div className="flex items-center gap-2">
                        {tenant.fullName}
                        {isAlexChen && (
                          <Badge variant="secondary" className="text-xs bg-teal-100 text-teal-700 border-teal-200">
                            Flagship
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{tenant.unit}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{property?.shortName || tenant.propertyName}</TableCell>
                    <TableCell className="text-right">
                      <span className={`font-semibold ${
                        tenant.riskScore >= 75 ? "text-red-600" : 
                        tenant.riskScore >= 65 ? "text-amber-600" : "text-slate-600"
                      }`}>
                        {tenant.riskScore}
                      </span>
                    </TableCell>
                    <TableCell>
                      {tenant.riskTier === "high" ? (
                        <Badge variant="outline" className="border-red-300 bg-red-50 text-red-700 text-xs">
                          <AlertTriangle className="mr-1 h-3 w-3" />
                          High
                        </Badge>
                      ) : tenant.riskTier === "medium" ? (
                        <Badge variant="outline" className="border-amber-300 bg-amber-50 text-amber-700 text-xs">
                          Medium
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="border-slate-300 bg-slate-50 text-slate-600 text-xs">
                          Low
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{tenant.primaryDriver}</TableCell>
                    <TableCell>
                      {tenant.communicationChannel === "SMS" ? (
                        <Badge variant="secondary" className="text-xs">
                          <MessageSquare className="mr-1 h-3 w-3" />
                          SMS
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="text-xs">
                          <Mail className="mr-1 h-3 w-3" />
                          Email
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{tenant.leaseEnd ? new Date(tenant.leaseEnd).toLocaleDateString() : tenant.status}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-teal-300 bg-teal-50 text-teal-700 text-xs">
                        {tenant.status || "Active"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          {filteredTenants.length === 0 && (
            <div className="py-12 text-center text-muted-foreground">
              <Users className="mx-auto h-12 w-12 mb-3 opacity-20" />
              <p>No tenants match your current filters.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
