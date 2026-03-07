import { motion } from "framer-motion";
import { useState } from "react";
import { Search, Users, AlertTriangle, TrendingUp, Mail, Phone, MessageSquare } from "lucide-react";
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

const TENANT_DATA = {
  summary: {
    totalTenants: 248,
    atRiskCount: 31,
    avgRiskScore: 42,
    activeInterventions: 18
  },
  tenants: [
    {
      id: "res-1",
      name: "Alex Chen",
      unit: "501",
      property: "Ballard Commons",
      propertyId: "prop-ballard",
      riskScore: 76,
      riskTier: "High",
      status: "Active",
      channel: "SMS",
      email: "alex.chen@email.com",
      phone: "(206) 555-0142",
      leaseEnd: "2025-07-15",
      primaryDriver: "Maintenance"
    },
    {
      id: "res-2",
      name: "Taylor Wong",
      unit: "204",
      property: "Ballard Commons",
      propertyId: "prop-ballard",
      riskScore: 81,
      riskTier: "High",
      status: "Active",
      channel: "Email",
      email: "taylor.wong@email.com",
      phone: "(206) 555-0298",
      leaseEnd: "2025-06-20",
      primaryDriver: "Response Time"
    },
    {
      id: "res-3",
      name: "Maria Santos",
      unit: "312",
      property: "Capitol Hill Residences",
      propertyId: "prop-capitol",
      riskScore: 68,
      riskTier: "Medium",
      status: "Active",
      channel: "SMS",
      email: "maria.santos@email.com",
      phone: "(206) 555-0187",
      leaseEnd: "2025-08-01",
      primaryDriver: "Maintenance"
    },
    {
      id: "res-4",
      name: "Sam Patel",
      unit: "702",
      property: "Capitol Hill Residences",
      propertyId: "prop-capitol",
      riskScore: 72,
      riskTier: "High",
      status: "Active",
      channel: "Email",
      email: "sam.patel@email.com",
      phone: "(206) 555-0356",
      leaseEnd: "2025-07-20",
      primaryDriver: "Sentiment"
    },
    {
      id: "res-5",
      name: "Jordan Kim",
      unit: "1408",
      property: "Bellevue Towers",
      propertyId: "prop-bellevue",
      riskScore: 79,
      riskTier: "High",
      status: "Active",
      channel: "SMS",
      email: "jordan.kim@email.com",
      phone: "(425) 555-0421",
      leaseEnd: "2025-06-30",
      primaryDriver: "Maintenance"
    },
    {
      id: "res-6",
      name: "Casey Martinez",
      unit: "312",
      property: "Ballard Commons",
      propertyId: "prop-ballard",
      riskScore: 70,
      riskTier: "Medium",
      status: "Active",
      channel: "Email",
      email: "casey.m@email.com",
      phone: "(206) 555-0321",
      leaseEnd: "2025-08-10",
      primaryDriver: "Sentiment"
    },
    {
      id: "res-7",
      name: "Devon Harris",
      unit: "408",
      property: "Ballard Commons",
      propertyId: "prop-ballard",
      riskScore: 75,
      riskTier: "High",
      status: "Active",
      channel: "SMS",
      email: "devon.harris@email.com",
      phone: "(206) 555-0445",
      leaseEnd: "2025-07-01",
      primaryDriver: "Response Time"
    },
    {
      id: "res-8",
      name: "Riley Chen",
      unit: "805",
      property: "Capitol Hill Residences",
      propertyId: "prop-capitol",
      riskScore: 64,
      riskTier: "Medium",
      status: "Active",
      channel: "Email",
      email: "riley.chen@email.com",
      phone: "(206) 555-0512",
      leaseEnd: "2025-09-15",
      primaryDriver: "Maintenance"
    }
  ]
};

export default function TenantsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [propertyFilter, setPropertyFilter] = useState("all");
  const [riskFilter, setRiskFilter] = useState("all");

  const filteredTenants = TENANT_DATA.tenants.filter((tenant) => {
    const matchesSearch = tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tenant.unit.includes(searchTerm);
    const matchesProperty = propertyFilter === "all" || tenant.propertyId === propertyFilter;
    const matchesRisk = riskFilter === "all" || tenant.riskTier === riskFilter;
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
          <p className="metric-value mt-3">{TENANT_DATA.summary.totalTenants}</p>
          <p className="metric-detail mt-2">Across 3 properties</p>
        </div>
        <div className="saas-metric-card border-amber-200 bg-amber-50">
          <p className="metric-label text-amber-900">At Risk</p>
          <p className="metric-value mt-3 text-amber-900">{TENANT_DATA.summary.atRiskCount}</p>
          <p className="metric-detail mt-2 text-amber-700">Requires attention</p>
        </div>
        <div className="saas-metric-card">
          <p className="metric-label">Avg. Risk Score</p>
          <p className="metric-value mt-3">{TENANT_DATA.summary.avgRiskScore}</p>
          <p className="metric-detail mt-2">Portfolio average</p>
        </div>
        <div className="saas-metric-card">
          <p className="metric-label">Active Interventions</p>
          <p className="metric-value mt-3">{TENANT_DATA.summary.activeInterventions}</p>
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
                <SelectItem value="prop-ballard">Ballard Commons</SelectItem>
                <SelectItem value="prop-capitol">Capitol Hill Residences</SelectItem>
                <SelectItem value="prop-bellevue">Bellevue Towers</SelectItem>
              </SelectContent>
            </Select>
            <Select value={riskFilter} onValueChange={setRiskFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="All Risk Levels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risk Levels</SelectItem>
                <SelectItem value="High">High Risk</SelectItem>
                <SelectItem value="Medium">Medium Risk</SelectItem>
                <SelectItem value="Low">Low Risk</SelectItem>
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
              {filteredTenants.map((tenant, index) => (
                <TableRow key={tenant.id} className={index === 0 ? "bg-teal-50/50" : ""}>
                  <TableCell className="font-medium text-foreground">
                    <div className="flex items-center gap-2">
                      {tenant.name}
                      {index === 0 && (
                        <Badge variant="secondary" className="text-xs bg-teal-100 text-teal-700 border-teal-200">
                          Featured
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{tenant.unit}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{tenant.property}</TableCell>
                  <TableCell className="text-right">
                    <span className={`font-semibold ${
                      tenant.riskScore >= 75 ? "text-red-600" : 
                      tenant.riskScore >= 65 ? "text-amber-600" : "text-slate-600"
                    }`}>
                      {tenant.riskScore}
                    </span>
                  </TableCell>
                  <TableCell>
                    {tenant.riskTier === "High" ? (
                      <Badge variant="outline" className="border-red-300 bg-red-50 text-red-700 text-xs">
                        <AlertTriangle className="mr-1 h-3 w-3" />
                        High
                      </Badge>
                    ) : tenant.riskTier === "Medium" ? (
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
                    {tenant.channel === "SMS" ? (
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
                  <TableCell className="text-sm text-muted-foreground">{new Date(tenant.leaseEnd).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-teal-300 bg-teal-50 text-teal-700 text-xs">
                      {tenant.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
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
