import { Calendar, Home, TrendingUp, Users } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const mockResidents = [
  { id: "1", name: "Alex Chen", unit: "501", lease_end: "2025-08-15", risk_score: 74, last_interaction: "2 days ago", risk_level: "high" },
  { id: "2", name: "Maria Santos", unit: "312", lease_end: "2025-06-30", risk_score: 72, last_interaction: "1 day ago", risk_level: "high" },
  { id: "3", name: "Jordan Lee", unit: "208", lease_end: "2025-09-12", risk_score: 68, last_interaction: "4 days ago", risk_level: "medium" },
  { id: "4", name: "Taylor Kim", unit: "415", lease_end: "2026-01-20", risk_score: 52, last_interaction: "1 week ago", risk_level: "medium" },
  { id: "5", name: "Jamie Rodriguez", unit: "102", lease_end: "2025-11-08", risk_score: 38, last_interaction: "3 days ago", risk_level: "low" },
  { id: "6", name: "Morgan Patel", unit: "304", lease_end: "2026-02-15", risk_score: 24, last_interaction: "1 week ago", risk_level: "low" }
];

export default function ManagerResidents() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredResidents = mockResidents.filter(r => 
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.unit.includes(searchQuery)
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
          <p className="metric-value mt-3">94</p>
          <p className="metric-detail mt-2">100 total units</p>
        </div>
        <div className="saas-metric-card">
          <p className="metric-label">At Risk</p>
          <p className="metric-value mt-3">12</p>
          <p className="metric-detail mt-2">High priority</p>
        </div>
        <div className="saas-metric-card">
          <p className="metric-label">Expiring Leases</p>
          <p className="metric-value mt-3">8</p>
          <p className="metric-detail mt-2">Next 90 days</p>
        </div>
        <div className="saas-metric-card">
          <p className="metric-label">Avg Risk Score</p>
          <p className="metric-value mt-3">42</p>
          <p className="metric-detail mt-2">-5 vs last month</p>
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
                <TableHead className="text-xs font-semibold text-slate-700">Lease End</TableHead>
                <TableHead className="text-right text-xs font-semibold text-slate-700">Risk Score</TableHead>
                <TableHead className="text-xs font-semibold text-slate-700">Last Interaction</TableHead>
                <TableHead className="text-right text-xs font-semibold text-slate-700">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredResidents.map((resident) => (
                <TableRow key={resident.id} className="border-slate-200 hover:bg-slate-50">
                  <TableCell className="font-medium text-slate-900">{resident.name}</TableCell>
                  <TableCell className="text-slate-700">{resident.unit}</TableCell>
                  <TableCell className="text-slate-700">{new Date(resident.lease_end).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <span className="text-lg font-semibold text-slate-900">{resident.risk_score}</span>
                  </TableCell>
                  <TableCell className="text-slate-700">{resident.last_interaction}</TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="outline" className="h-8 rounded-lg">
                      View Profile
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </motion.div>
  );
}
