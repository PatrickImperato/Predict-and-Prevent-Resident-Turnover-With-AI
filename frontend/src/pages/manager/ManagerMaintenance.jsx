import { motion } from "framer-motion";
import { Wrench, AlertCircle, CheckCircle2, Clock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getSarahManagedProperty, getSarahPropertyMaintenanceHistory } from "@/lib/canonicalData";

export default function ManagerMaintenance() {
  const property = getSarahManagedProperty();
  const maintenanceHistory = getSarahPropertyMaintenanceHistory();

  // Calculate summary metrics
  const totalRequests = maintenanceHistory.length;
  const openRequests = maintenanceHistory.filter(m => m.status === "open").length;
  const closedRequests = maintenanceHistory.filter(m => m.status === "closed").length;
  const avgResolutionDays = closedRequests > 0 
    ? Math.round(maintenanceHistory.filter(m => m.status === "closed").reduce((sum, m) => sum + m.resolutionDays, 0) / closedRequests)
    : 0;

  const getStatusBadge = (status) => {
    switch (status) {
      case "open":
        return { label: "Open", className: "border-red-200 bg-red-50 text-red-700", icon: AlertCircle };
      case "closed":
        return { label: "Closed", className: "border-teal-200 bg-teal-50 text-teal-700", icon: CheckCircle2 };
      case "in_progress":
        return { label: "In Progress", className: "border-blue-200 bg-blue-50 text-blue-700", icon: Clock };
      default:
        return { label: status, className: "border-slate-200 bg-slate-50 text-slate-700", icon: Clock };
    }
  };

  const getCategoryColor = (issueType) => {
    const colors = {
      "HVAC": "border-orange-200 bg-orange-50 text-orange-700",
      "Appliance": "border-purple-200 bg-purple-50 text-purple-700",
      "Ventilation": "border-blue-200 bg-blue-50 text-blue-700",
      "Plumbing": "border-teal-200 bg-teal-50 text-teal-700",
      "Pest Control": "border-amber-200 bg-amber-50 text-amber-700"
    };
    return colors[issueType] || "border-slate-200 bg-slate-50 text-slate-700";
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: "easeOut" }}
      className="space-y-6"
      data-testid="manager-maintenance-page"
    >
      {/* Header */}
      <section className="rounded-lg border border-border/60 bg-card p-6 shadow-sm">
        <Badge className="mb-3 w-fit border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-50" variant="secondary">
          Operations
        </Badge>
        <h2 className="font-[var(--font-heading)] text-3xl font-semibold tracking-[-0.02em] text-foreground">
          Maintenance
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Track maintenance requests, response times, and resolution patterns at {property?.name}. Monitor 
          service quality and identify recurring issues to improve resident satisfaction.
        </p>
      </section>

      {/* Summary Metrics */}
      <section className="grid gap-6 md:grid-cols-4">
        <div className="saas-metric-card">
          <p className="metric-label">Total Requests</p>
          <p className="metric-value mt-3">{totalRequests}</p>
          <p className="metric-detail mt-2">All time</p>
        </div>
        <div className="saas-metric-card">
          <p className="metric-label">Open Requests</p>
          <p className="metric-value mt-3 text-red-600">{openRequests}</p>
          <p className="metric-detail mt-2">Needs attention</p>
        </div>
        <div className="saas-metric-card">
          <p className="metric-label">Closed Requests</p>
          <p className="metric-value mt-3 text-teal-600">{closedRequests}</p>
          <p className="metric-detail mt-2">Resolved</p>
        </div>
        <div className="saas-metric-card">
          <p className="metric-label">Avg Resolution</p>
          <p className="metric-value mt-3">{avgResolutionDays} days</p>
          <p className="metric-detail mt-2">Time to close</p>
        </div>
      </section>

      {/* Maintenance History Table */}
      <section className="saas-card">
        <h3 className="mb-4 text-lg font-semibold text-foreground">Maintenance History</h3>
        
        <div className="overflow-hidden rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow className="border-border bg-muted/50">
                <TableHead className="text-xs font-semibold">Resident</TableHead>
                <TableHead className="text-xs font-semibold">Issue</TableHead>
                <TableHead className="text-xs font-semibold">Category</TableHead>
                <TableHead className="text-xs font-semibold">Opened</TableHead>
                <TableHead className="text-xs font-semibold">Resolution</TableHead>
                <TableHead className="text-xs font-semibold">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {maintenanceHistory.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-sm text-muted-foreground py-8">
                    No maintenance requests found
                  </TableCell>
                </TableRow>
              ) : (
                maintenanceHistory.map((request) => {
                  const statusConfig = getStatusBadge(request.status);
                  const StatusIcon = statusConfig.icon;
                  
                  return (
                    <TableRow key={request.id} className="border-border hover:bg-muted/50">
                      <TableCell>
                        <div>
                          <p className="font-medium text-foreground">{request.residentName}</p>
                          <p className="text-sm text-muted-foreground">Unit {request.unit}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-foreground">{request.issueTitle}</p>
                          {request.repeatIssue && (
                            <Badge className="mt-1 border-amber-200 bg-amber-50 text-amber-700 text-xs">
                              Repeat Issue
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getCategoryColor(request.issueType)} variant="secondary">
                          {request.issueType}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm text-foreground">
                          {request.openedAt.toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </p>
                      </TableCell>
                      <TableCell>
                        {request.resolvedAt ? (
                          <p className="text-sm text-foreground">
                            {request.resolutionDays} days
                          </p>
                        ) : (
                          <p className="text-sm text-muted-foreground">Pending</p>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge className={statusConfig.className} variant="secondary">
                          <StatusIcon className="mr-1 h-3 w-3" />
                          {statusConfig.label}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </section>

      {/* Issue Category Breakdown */}
      <section className="grid gap-6 md:grid-cols-2">
        <div className="saas-card">
          <h3 className="mb-4 text-lg font-semibold text-foreground">Issue Categories</h3>
          <div className="space-y-3">
            {["HVAC", "Appliance", "Ventilation"].map((category) => {
              const count = maintenanceHistory.filter(m => m.issueType === category).length;
              return (
                <div key={category} className="flex items-center justify-between rounded-lg border border-border bg-muted/40 p-3">
                  <p className="text-sm font-medium text-foreground">{category}</p>
                  <Badge className="text-xs">{count} request{count !== 1 ? 's' : ''}</Badge>
                </div>
              );
            })}
          </div>
        </div>

        <div className="saas-card">
          <h3 className="mb-4 text-lg font-semibold text-foreground">Top Patterns</h3>
          <div className="space-y-3">
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 flex-shrink-0 text-amber-600" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Repeat Issues Detected</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {maintenanceHistory.filter(m => m.repeatIssue).length} repeat issues require follow-up
                  </p>
                </div>
              </div>
            </div>
            
            <div className="rounded-lg border border-border bg-muted/40 p-4">
              <p className="text-sm font-medium text-foreground">Avg Resolution Time</p>
              <p className="mt-2 text-2xl font-semibold text-foreground">{avgResolutionDays} days</p>
              <p className="mt-1 text-xs text-muted-foreground">Target: &lt; 3 days</p>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
