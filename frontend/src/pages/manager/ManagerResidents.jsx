import { Calendar, Home, TrendingUp, Users } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CANONICAL_RESIDENTS, ALEX_CHEN, getPropertyById } from "@/lib/canonicalData";

export default function ManagerResidents() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredResidents = CANONICAL_RESIDENTS.filter(r => 
    r.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.unit.includes(searchQuery)
  );

  // Calculate summary metrics
  const totalResidents = CANONICAL_RESIDENTS.length;
  const atRisk = CANONICAL_RESIDENTS.filter(r => r.riskScore >= 70).length;
  const expiringLeases = CANONICAL_RESIDENTS.filter(r => {
    if (!r.leaseEnd) return false;
    const daysToExpire = Math.floor((new Date(r.leaseEnd) - new Date()) / (1000 * 60 * 60 * 24));
    return daysToExpire <= 90 && daysToExpire > 0;
  }).length;
  const avgRiskScore = Math.round(
    CANONICAL_RESIDENTS.reduce((sum, r) => sum + r.riskScore, 0) / totalResidents
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: "easeOut" }}
      className="space-y-6"
    >
      {/* Header */}
      <section className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="font-[var(--font-heading)] text-[28px] font-semibold tracking-tight text-slate-900">
          Residents
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
          Monitor resident engagement, track risk scores, and manage retention interventions.
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
          <p className="metric-value mt-3">{atRisk}</p>
          <p className="metric-detail mt-2">High priority</p>
        </div>
        <div className="saas-metric-card">
          <p className="metric-label">Expiring Leases</p>
          <p className="metric-value mt-3">{expiringLeases}</p>
          <p className="metric-detail mt-2">Next 90 days</p>
        </div>
        <div className="saas-metric-card">
          <p className="metric-label">Avg Risk Score</p>
          <p className="metric-value mt-3">{avgRiskScore}</p>
          <p className="metric-detail mt-2">Portfolio average</p>
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
          />
        </div>

        <div className="overflow-hidden rounded-lg border border-slate-200">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-200 bg-slate-50">
                <TableHead className="text-xs font-semibold text-slate-700">Resident</TableHead>
                <TableHead className="text-xs font-semibold text-slate-700">Unit</TableHead>
                <TableHead className="text-xs font-semibold text-slate-700">Property</TableHead>
                <TableHead className="text-xs font-semibold text-slate-700">Lease End</TableHead>
                <TableHead className="text-right text-xs font-semibold text-slate-700">Risk Score</TableHead>
                <TableHead className="text-xs font-semibold text-slate-700">Channel</TableHead>
                <TableHead className="text-right text-xs font-semibold text-slate-700">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredResidents.map((resident) => {
                const property = getPropertyById(resident.propertyId);
                const isAlexChen = resident.id === ALEX_CHEN.id;
                
                return (
                  <TableRow key={resident.id} className={`border-slate-200 hover:bg-slate-50 ${isAlexChen ? 'bg-teal-50/30' : ''}`}>
                    <TableCell className="font-medium text-slate-900">
                      <div className="flex items-center gap-2">
                        {resident.fullName}
                        {isAlexChen && (
                          <Badge variant="secondary" className="text-xs bg-teal-100 text-teal-700 border-teal-200">
                            Flagship
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-700">{resident.unit}</TableCell>
                    <TableCell className="text-slate-700">{property?.shortName}</TableCell>
                    <TableCell className="text-slate-700">
                      {resident.leaseEnd ? new Date(resident.leaseEnd).toLocaleDateString() : resident.status}
                    </TableCell>
                    <TableCell className="text-right">
                      <span className={`text-lg font-semibold ${
                        resident.riskScore >= 80 ? 'text-red-600' :
                        resident.riskScore >= 70 ? 'text-amber-600' :
                        'text-slate-900'
                      }`}>
                        {resident.riskScore}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="text-xs">
                        {resident.communicationChannel}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="outline" className="h-8 rounded-lg">
                        View Profile
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </section>
    </motion.div>
  );
}
