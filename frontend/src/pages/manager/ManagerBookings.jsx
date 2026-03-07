import { motion } from "framer-motion";
import { Calendar, CheckCircle2, Clock, XCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getSarahManagedProperty, getSarahPropertyBookings } from "@/lib/canonicalData";

export default function ManagerBookings() {
  const property = getSarahManagedProperty();
  const bookings = getSarahPropertyBookings();

  // Calculate summary metrics
  const totalBookings = bookings.length;
  const completedBookings = bookings.filter(b => b.status === "completed").length;
  const scheduledBookings = bookings.filter(b => b.status === "scheduled").length;
  const cancelledBookings = bookings.filter(b => b.status === "cancelled").length;

  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return { label: "Completed", className: "border-teal-200 bg-teal-50 text-teal-700", icon: CheckCircle2 };
      case "scheduled":
        return { label: "Scheduled", className: "border-blue-200 bg-blue-50 text-blue-700", icon: Clock };
      case "cancelled":
        return { label: "Cancelled", className: "border-red-200 bg-red-50 text-red-700", icon: XCircle };
      default:
        return { label: status, className: "border-slate-200 bg-slate-50 text-slate-700", icon: Clock };
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: "easeOut" }}
      className="space-y-6"
      data-testid="manager-bookings-page"
    >
      {/* Header */}
      <section className="rounded-lg border border-border/60 bg-card p-6 shadow-sm">
        <Badge className="mb-3 w-fit border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-50" variant="secondary">
          Service Management
        </Badge>
        <h2 className="font-[var(--font-heading)] text-3xl font-semibold tracking-[-0.02em] text-foreground">
          Bookings
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Track resident service bookings and provider fulfillment at {property?.name}. Monitor booking status, 
          service completion, and resident satisfaction.
        </p>
      </section>

      {/* Summary Metrics */}
      <section className="grid gap-6 md:grid-cols-4">
        <div className="saas-metric-card">
          <p className="metric-label">Total Bookings</p>
          <p className="metric-value mt-3">{totalBookings}</p>
          <p className="metric-detail mt-2">All time</p>
        </div>
        <div className="saas-metric-card">
          <p className="metric-label">Completed</p>
          <p className="metric-value mt-3 text-teal-600">{completedBookings}</p>
          <p className="metric-detail mt-2">Services delivered</p>
        </div>
        <div className="saas-metric-card">
          <p className="metric-label">Scheduled</p>
          <p className="metric-value mt-3 text-blue-600">{scheduledBookings}</p>
          <p className="metric-detail mt-2">Upcoming services</p>
        </div>
        <div className="saas-metric-card">
          <p className="metric-label">Fulfillment Rate</p>
          <p className="metric-value mt-3">{totalBookings > 0 ? Math.round((completedBookings / totalBookings) * 100) : 0}%</p>
          <p className="metric-detail mt-2">Completion rate</p>
        </div>
      </section>

      {/* Bookings Table */}
      <section className="saas-card">
        <h3 className="mb-4 text-lg font-semibold text-foreground">Recent Bookings</h3>
        
        <div className="overflow-hidden rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow className="border-border bg-muted/50">
                <TableHead className="text-xs font-semibold">Resident</TableHead>
                <TableHead className="text-xs font-semibold">Service</TableHead>
                <TableHead className="text-xs font-semibold">Provider</TableHead>
                <TableHead className="text-xs font-semibold">Scheduled</TableHead>
                <TableHead className="text-xs font-semibold">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-sm text-muted-foreground py-8">
                    No bookings found
                  </TableCell>
                </TableRow>
              ) : (
                bookings.map((booking) => {
                  const statusConfig = getStatusBadge(booking.status);
                  const StatusIcon = statusConfig.icon;
                  
                  return (
                    <TableRow key={booking.id} className="border-border hover:bg-muted/50">
                      <TableCell>
                        <div>
                          <p className="font-medium text-foreground">{booking.residentName}</p>
                          <p className="text-sm text-muted-foreground">Unit {booking.unit}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium text-foreground">{booking.serviceName}</p>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm text-foreground">{booking.providerName}</p>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm text-foreground">
                          {booking.scheduledFor.toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </p>
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

      {/* Service Distribution */}
      <section className="grid gap-6 md:grid-cols-2">
        <div className="saas-card">
          <h3 className="mb-4 text-lg font-semibold text-foreground">Top Services</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-lg border border-border bg-muted/40 p-3">
              <p className="text-sm font-medium text-foreground">Cleaning Services</p>
              <Badge className="text-xs">1 booking</Badge>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border bg-muted/40 p-3">
              <p className="text-sm font-medium text-foreground">HVAC Services</p>
              <Badge className="text-xs">1 booking</Badge>
            </div>
          </div>
        </div>

        <div className="saas-card">
          <h3 className="mb-4 text-lg font-semibold text-foreground">Top Providers</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-lg border border-border bg-muted/40 p-3">
              <p className="text-sm font-medium text-foreground">SparkClean</p>
              <Badge className="text-xs">1 booking</Badge>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border bg-muted/40 p-3">
              <p className="text-sm font-medium text-foreground">FixRight HVAC</p>
              <Badge className="text-xs">1 booking</Badge>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
