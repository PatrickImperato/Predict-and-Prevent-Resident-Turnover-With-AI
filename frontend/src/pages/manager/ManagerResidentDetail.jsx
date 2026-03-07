import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, Phone, MessageSquare, Calendar, AlertTriangle, CheckCircle2, Clock, Wrench } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  getSarahPropertyResidents, 
  getAlexChenData, 
  getAlexMaintenance, 
  getAlexBookings 
} from "@/lib/canonicalData";

export default function ManagerResidentDetail() {
  const { residentId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  // Get resident data - for demo, we only have Alex fully modeled
  const allResidents = getSarahPropertyResidents();
  const resident = residentId === getAlexChenData().id ? getAlexChenData() : allResidents.find(r => r.id === residentId);

  // Get related data for Alex
  const maintenanceHistory = residentId === getAlexChenData().id ? getAlexMaintenance() : [];
  const bookings = residentId === getAlexChenData().id ? getAlexBookings() : [];

  if (!resident) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-foreground">Resident Not Found</h3>
          <p className="mt-2 text-sm text-muted-foreground">Unable to load resident details.</p>
          <Button className="mt-4" onClick={() => navigate("/app/manager/residents")}>
            Back to Residents
          </Button>
        </div>
      </div>
    );
  }

  const getRiskBadgeColor = (tier) => {
    if (tier === "high") return "border-red-200 bg-red-50 text-red-700";
    if (tier === "medium") return "border-amber-200 bg-amber-50 text-amber-700";
    return "border-green-200 bg-green-50 text-green-700";
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return { label: "Completed", className: "border-teal-200 bg-teal-50 text-teal-700", icon: CheckCircle2 };
      case "open":
        return { label: "Open", className: "border-red-200 bg-red-50 text-red-700", icon: AlertTriangle };
      case "closed":
        return { label: "Closed", className: "border-teal-200 bg-teal-50 text-teal-700", icon: CheckCircle2 };
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
      data-testid="manager-resident-detail-page"
    >
      {/* Back Button */}
      <Button variant="ghost" size="sm" onClick={() => navigate("/app/manager/residents")} className="mb-2">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Residents
      </Button>

      {/* Resident Header */}
      <section className="rounded-lg border border-border/60 bg-card p-6 shadow-sm">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-teal-100 text-teal-700 text-xl font-semibold">
              {resident.fullName.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h2 className="font-[var(--font-heading)] text-3xl font-semibold tracking-[-0.02em] text-foreground">
                {resident.fullName}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">Unit {resident.unit} • {resident.propertyName || "The Metropolitan at Riverside"}</p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Badge className={getRiskBadgeColor(resident.riskTier)} variant="secondary">
                  {resident.riskTier} Risk
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Score: {resident.riskScore}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {resident.communicationChannel}
                </Badge>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-4xl font-semibold text-foreground">{resident.riskScore}</p>
            <p className="text-xs text-muted-foreground">Risk Score</p>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" data-testid="tab-overview">Overview</TabsTrigger>
          <TabsTrigger value="bookings" data-testid="tab-bookings">Bookings</TabsTrigger>
          <TabsTrigger value="maintenance" data-testid="tab-maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="retention" data-testid="tab-retention">Retention</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Contact Information */}
            <div className="saas-card">
              <h3 className="mb-4 text-lg font-semibold text-foreground">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-sm font-medium text-foreground">{resident.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <p className="text-sm font-medium text-foreground">{resident.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MessageSquare className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Preferred Channel</p>
                    <p className="text-sm font-medium text-foreground">{resident.communicationChannel}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Lease Information */}
            <div className="saas-card">
              <h3 className="mb-4 text-lg font-semibold text-foreground">Lease Information</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground">Unit</p>
                  <p className="text-sm font-semibold text-foreground">Unit {resident.unit}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Move-In Date</p>
                  <p className="text-sm font-medium text-foreground">
                    {resident.moveInDate ? new Date(resident.moveInDate).toLocaleDateString() : "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Lease End Date</p>
                  <p className="text-sm font-medium text-foreground">
                    {resident.leaseEnd ? new Date(resident.leaseEnd).toLocaleDateString() : "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Monthly Rent</p>
                  <p className="text-sm font-semibold text-foreground">
                    ${resident.monthlyRent ? resident.monthlyRent.toLocaleString() : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Risk Summary */}
          <div className="saas-card">
            <h3 className="mb-4 text-lg font-semibold text-foreground">Risk Assessment</h3>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-lg border border-border bg-muted/40 p-4">
                <p className="text-xs font-medium text-muted-foreground">Risk Tier</p>
                <p className="mt-2 text-2xl font-semibold text-foreground capitalize">{resident.riskTier}</p>
              </div>
              <div className="rounded-lg border border-border bg-muted/40 p-4">
                <p className="text-xs font-medium text-muted-foreground">Risk Score</p>
                <p className="mt-2 text-2xl font-semibold text-foreground">{resident.riskScore}</p>
              </div>
              <div className="rounded-lg border border-border bg-muted/40 p-4">
                <p className="text-xs font-medium text-muted-foreground">Primary Driver</p>
                <p className="mt-2 text-sm font-semibold text-foreground">{resident.primaryDriver}</p>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Bookings Tab */}
        <TabsContent value="bookings" className="space-y-6">
          <div className="saas-card">
            <h3 className="mb-4 text-lg font-semibold text-foreground">Service Bookings</h3>
            {bookings.length === 0 ? (
              <div className="py-8 text-center">
                <Calendar className="mx-auto h-12 w-12 text-muted-foreground" />
                <p className="mt-4 text-sm text-muted-foreground">No booking history available</p>
              </div>
            ) : (
              <div className="overflow-hidden rounded-lg border border-border">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border bg-muted/50">
                      <TableHead className="text-xs font-semibold">Service</TableHead>
                      <TableHead className="text-xs font-semibold">Provider</TableHead>
                      <TableHead className="text-xs font-semibold">Scheduled</TableHead>
                      <TableHead className="text-xs font-semibold">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((booking) => {
                      const statusConfig = getStatusBadge(booking.status);
                      const StatusIcon = statusConfig.icon;
                      return (
                        <TableRow key={booking.id} className="border-border">
                          <TableCell className="font-medium text-foreground">{booking.serviceName}</TableCell>
                          <TableCell className="text-foreground">{booking.providerName}</TableCell>
                          <TableCell className="text-foreground">
                            {booking.scheduledFor.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </TableCell>
                          <TableCell>
                            <Badge className={statusConfig.className} variant="secondary">
                              <StatusIcon className="mr-1 h-3 w-3" />
                              {statusConfig.label}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Maintenance Tab */}
        <TabsContent value="maintenance" className="space-y-6">
          <div className="saas-card">
            <h3 className="mb-4 text-lg font-semibold text-foreground">Maintenance History</h3>
            {maintenanceHistory.length === 0 ? (
              <div className="py-8 text-center">
                <Wrench className="mx-auto h-12 w-12 text-muted-foreground" />
                <p className="mt-4 text-sm text-muted-foreground">No maintenance history available</p>
              </div>
            ) : (
              <div className="overflow-hidden rounded-lg border border-border">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border bg-muted/50">
                      <TableHead className="text-xs font-semibold">Issue</TableHead>
                      <TableHead className="text-xs font-semibold">Category</TableHead>
                      <TableHead className="text-xs font-semibold">Opened</TableHead>
                      <TableHead className="text-xs font-semibold">Resolution</TableHead>
                      <TableHead className="text-xs font-semibold">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {maintenanceHistory.map((ticket) => {
                      const statusConfig = getStatusBadge(ticket.status);
                      const StatusIcon = statusConfig.icon;
                      return (
                        <TableRow key={ticket.id} className="border-border">
                          <TableCell>
                            <div>
                              <p className="font-medium text-foreground">{ticket.issueTitle}</p>
                              {ticket.repeatIssue && (
                                <Badge className="mt-1 border-amber-200 bg-amber-50 text-amber-700 text-xs">
                                  Repeat Issue
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-foreground">{ticket.issueType}</TableCell>
                          <TableCell className="text-foreground">
                            {ticket.openedAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </TableCell>
                          <TableCell className="text-foreground">
                            {ticket.resolvedAt ? `${ticket.resolutionDays} days` : "Pending"}
                          </TableCell>
                          <TableCell>
                            <Badge className={statusConfig.className} variant="secondary">
                              <StatusIcon className="mr-1 h-3 w-3" />
                              {statusConfig.label}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Retention Tab */}
        <TabsContent value="retention" className="space-y-6">
          <div className="saas-card">
            <h3 className="mb-4 text-lg font-semibold text-foreground">Retention Timeline</h3>
            <div className="space-y-4">
              {resident.riskScore >= 70 && (
                <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 flex-shrink-0 text-amber-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">High Priority Intervention Recommended</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Resident has a risk score of {resident.riskScore}, indicating high churn probability. 
                        Consider deploying High Priority intervention with $500 credit and personalized outreach.
                      </p>
                      <div className="mt-3">
                        <Badge className="text-xs">Primary Driver: {resident.primaryDriver}</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {maintenanceHistory.filter(m => m.repeatIssue).length > 0 && (
                <div className="rounded-lg border border-border bg-card p-4">
                  <p className="text-sm font-semibold text-foreground">Maintenance Pattern Detected</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {maintenanceHistory.filter(m => m.repeatIssue).length} repeat maintenance issue(s) contributing to risk score.
                  </p>
                </div>
              )}

              <div className="rounded-lg border border-border bg-card p-4">
                <p className="text-sm font-semibold text-foreground">Score History</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Current score: {resident.riskScore} • Calculated based on {resident.primaryDriver.toLowerCase()}
                </p>
              </div>

              {bookings.length > 0 && (
                <div className="rounded-lg border border-teal-200 bg-teal-50 p-4">
                  <p className="text-sm font-semibold text-foreground">Positive Engagement</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Resident has completed {bookings.filter(b => b.status === "completed").length} service booking(s), 
                    showing active participation in property services.
                  </p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
