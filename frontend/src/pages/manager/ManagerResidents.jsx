import { Calendar, Home, TrendingUp, Users } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getSarahPropertyResidents, getSarahManagedProperty, ALEX_CHEN, getPropertyById } from "@/lib/canonicalData";

export default function ManagerResidents() {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Get Sarah's property and residents (Property Manager scope - ONLY her property)
  const property = getSarahManagedProperty();
  const sarahResidents = getSarahPropertyResidents();

  const filteredResidents = sarahResidents.filter(r => 
    r.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.unit.includes(searchQuery)
  );

  // Calculate summary metrics for Sarah's property only
  const totalResidents = sarahResidents.length;
  const atRisk = sarahResidents.filter(r => r.riskScore >= 70).length;
  const expiringLeases = sarahResidents.filter(r => {
    if (!r.leaseEnd) return false;
    const daysToExpire = Math.floor((new Date(r.leaseEnd) - new Date()) / (1000 * 60 * 60 * 24));
    return daysToExpire <= 90 && daysToExpire > 0;
  }).length;
  const avgRiskScore = totalResidents > 0 
    ? Math.round(sarahResidents.reduce((sum, r) => sum + r.riskScore, 0) / totalResidents)
    : 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: "easeOut" }}
      className="space-y-6"
      data-testid="manager-residents-page"
    >
      {/* Header */}
      <section className="rounded-lg border border-border/60 bg-card p-6 shadow-sm">
        <Badge className="mb-3 w-fit border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-50" variant="secondary">
          Resident Management
        </Badge>
        <h2 className="font-[var(--font-heading)] text-3xl font-semibold tracking-[-0.02em] text-foreground">
          Residents
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Monitor resident engagement, track risk scores, and manage retention interventions for {property?.name}.
        </p>
      </section>

      {/* Summary Cards */}
      <section className="grid gap-6 md:grid-cols-4">
        <div className="saas-metric-card">
          <p className="metric-label">Total Residents</p>
          <p className="metric-value mt-3">{totalResidents}</p>
          <p className="metric-detail mt-2">Active leases</p>
        </div>
        <div className="saas-metric-card">
          <p className="metric-label">At Risk</p>
          <p className="metric-value mt-3 text-red-600">{atRisk}</p>
          <p className="metric-detail mt-2">High priority</p>
        </div>
        <div className="saas-metric-card">
          <p className="metric-label">Expiring Leases</p>
          <p className="metric-value mt-3 text-amber-600">{expiringLeases}</p>
          <p className="metric-detail mt-2">Next 90 days</p>
        </div>
        <div className="saas-metric-card">
          <p className="metric-label">Avg Risk Score</p>
          <p className="metric-value mt-3">{avgRiskScore}</p>
          <p className="metric-detail mt-2">Property average</p>
        </div>
      </section>

      {/* Search and Table */}
      <section className="saas-card">
        <div className="mb-6">
          <Input
            placeholder="Search by name or unit..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
            data-testid="residents-search-input"
          />
        </div>

        <div className="overflow-hidden rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow className="border-border bg-muted/50">
                <TableHead className="text-xs font-semibold">Resident</TableHead>
                <TableHead className="text-xs font-semibold">Unit</TableHead>
                <TableHead className="text-xs font-semibold">Lease End</TableHead>
                <TableHead className="text-right text-xs font-semibold">Risk Score</TableHead>
                <TableHead className="text-xs font-semibold">Tier</TableHead>
                <TableHead className="text-xs font-semibold">Channel</TableHead>
                <TableHead className="text-right text-xs font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredResidents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-sm text-muted-foreground py-8">
                    {searchQuery ? "No residents match your search" : "No residents found"}
                  </TableCell>
                </TableRow>
              ) : (
                filteredResidents.map((resident) => {
                  const isAlexChen = resident.id === ALEX_CHEN.id;
                  
                  const getRiskColor = (score) => {
                    if (score >= 70) return "text-red-600";
                    if (score >= 60) return "text-amber-600";
                    return "text-foreground";
                  };
                  
                  const getTierBadge = (tier) => {
                    if (tier === "high") return "border-red-200 bg-red-50 text-red-700";
                    if (tier === "medium") return "border-amber-200 bg-amber-50 text-amber-700";
                    return "border-green-200 bg-green-50 text-green-700";
                  };
                  
                  return (
                    <TableRow 
                      key={resident.id} 
                      className={`border-border hover:bg-muted/50 ${isAlexChen ? 'bg-teal-50/30' : ''}`}
                      data-testid={`resident-row-${resident.id}`}
                    >
                      <TableCell className="font-medium text-foreground">
                        <div className="flex items-center gap-2">
                          {resident.fullName}
                          {isAlexChen && (
                            <Badge variant="secondary" className="text-xs bg-teal-100 text-teal-700 border-teal-200">
                              Flagship
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-foreground">{resident.unit}</TableCell>
                      <TableCell className="text-foreground">
                        {resident.leaseEnd ? new Date(resident.leaseEnd).toLocaleDateString() : resident.status}
                      </TableCell>
                      <TableCell className="text-right">
                        <span className={`text-lg font-semibold ${getRiskColor(resident.riskScore)}`}>
                          {resident.riskScore}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={`text-xs ${getTierBadge(resident.riskTier)}`}>
                          {resident.riskTier}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="text-xs">
                          {resident.communicationChannel}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="outline" className="h-8 rounded-lg" asChild>
                          <Link to={`/app/manager/residents/${resident.id}`}>
                            View Profile
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </section>
    </motion.div>
  );
}
