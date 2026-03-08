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
          {/* Retention Intervention Timeline */}
          <div className="saas-card">
            <h3 className="mb-4 text-lg font-semibold text-foreground">Retention Intervention Timeline</h3>
            <div className="relative space-y-6 border-l-2 border-slate-200 pl-6">
              {/* Event 1: Risk Score Increased */}
              <div className="relative">
                <div className="absolute -left-[1.6rem] top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-red-200 bg-red-50">
                  <AlertTriangle className="h-3 w-3 text-red-600" />
                </div>
                <div className="rounded-lg border border-slate-200 bg-white p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">Feb 20, 2026</p>
                      <p className="mt-1 text-sm font-semibold text-foreground">Risk Score Increased to {resident.riskScore}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Driver: {resident.primaryDriver}
                      </p>
                    </div>
                    <Badge className="border-red-200 bg-red-50 text-red-700" variant="secondary">
                      High Risk
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Event 2: AI Recommended Intervention */}
              <div className="relative">
                <div className="absolute -left-[1.6rem] top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-blue-200 bg-blue-50">
                  <MessageSquare className="h-3 w-3 text-blue-600" />
                </div>
                <div className="rounded-lg border border-slate-200 bg-white p-4">
                  <p className="text-xs text-muted-foreground">Feb 21, 2026</p>
                  <p className="mt-1 text-sm font-semibold text-foreground">AI Recommended Service Credit</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    System suggested $35 retention credit based on maintenance frequency pattern
                  </p>
                </div>
              </div>

              {/* Event 3: Manager Approved */}
              <div className="relative">
                <div className="absolute -left-[1.6rem] top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-teal-200 bg-teal-50">
                  <CheckCircle2 className="h-3 w-3 text-teal-600" />
                </div>
                <div className="rounded-lg border border-slate-200 bg-white p-4">
                  <p className="text-xs text-muted-foreground">Feb 21, 2026</p>
                  <p className="mt-1 text-sm font-semibold text-foreground">Property Manager Approved $35 Credit</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Approved by Sarah Mitchell • Reason: Maintenance frequency risk mitigation
                  </p>
                </div>
              </div>

              {/* Event 4: AI Notified Resident */}
              <div className="relative">
                <div className="absolute -left-[1.6rem] top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-purple-200 bg-purple-50">
                  <MessageSquare className="h-3 w-3 text-purple-600" />
                </div>
                <div className="rounded-lg border border-slate-200 bg-white p-4">
                  <p className="text-xs text-muted-foreground">Feb 22, 2026</p>
                  <p className="mt-1 text-sm font-semibold text-foreground">AI Concierge Notified Resident</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Message sent via {resident.communicationChannel}: "Hey Alex, we added a $35 credit you can use for happiness and convenience services."
                  </p>
                </div>
              </div>

              {/* Event 5: Resident Booked Service */}
              {bookings.length > 0 && (
                <div className="relative">
                  <div className="absolute -left-[1.6rem] top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-emerald-200 bg-emerald-50">
                    <Calendar className="h-3 w-3 text-emerald-600" />
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-white p-4">
                    <p className="text-xs text-muted-foreground">Mar 5, 2026</p>
                    <p className="mt-1 text-sm font-semibold text-foreground">Resident Booked {bookings[0]?.serviceName}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Service provider: {bookings[0]?.providerName} • Credit applied: $85
                    </p>
                  </div>
                </div>
              )}

              {/* Event 6: Service Completed */}
              {bookings.filter(b => b.status === "completed").length > 0 && (
                <div className="relative">
                  <div className="absolute -left-[1.6rem] top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-teal-200 bg-teal-50">
                    <CheckCircle2 className="h-3 w-3 text-teal-600" />
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-white p-4">
                    <p className="text-xs text-muted-foreground">Mar 6, 2026</p>
                    <p className="mt-1 text-sm font-semibold text-foreground">Service Completed</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {bookings[0]?.serviceName} successfully completed • Resident satisfaction tracked
                    </p>
                  </div>
                </div>
              )}

              {/* Event 7: Risk Score Dropped */}
              {bookings.filter(b => b.status === "completed").length > 0 && (
                <div className="relative">
                  <div className="absolute -left-[1.6rem] top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-green-200 bg-green-50">
                    <CheckCircle2 className="h-3 w-3 text-green-600" />
                  </div>
                  <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                    <p className="text-xs text-muted-foreground">Mar 8, 2026</p>
                    <p className="mt-1 text-sm font-semibold text-foreground">Risk Score Dropped to 58</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      16-point improvement after intervention • Churn probability reduced
                    </p>
                    <Badge className="mt-2 border-green-200 bg-green-100 text-green-700" variant="secondary">
                      Intervention Successful
                    </Badge>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Credit Lifecycle */}
          <div className="saas-card">
            <h3 className="mb-4 text-lg font-semibold text-foreground">Retention Credit Lifecycle</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <p className="text-xs font-medium text-muted-foreground">Credit Issued</p>
                <p className="mt-1 text-sm font-semibold text-foreground">Feb 21, 2026</p>
                <p className="mt-1 text-xs text-muted-foreground">Reason: Maintenance frequency risk</p>
                <p className="mt-2 text-2xl font-semibold text-foreground">$35</p>
              </div>
              
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <p className="text-xs font-medium text-muted-foreground">Credit Status</p>
                <div className="mt-2 space-y-2">
                  {bookings.filter(b => b.status === "completed").length > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Mar 5 - Service Used</span>
                      <span className="font-medium text-foreground">-$35</span>
                    </div>
                  )}
                  <div className="flex justify-between border-t border-slate-200 pt-2 text-sm">
                    <span className="font-medium text-foreground">Remaining</span>
                    <span className="font-semibold text-foreground">
                      ${bookings.filter(b => b.status === "completed").length > 0 ? '0' : '35'}
                    </span>
                  </div>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">Expires: 4 days from issue</p>
              </div>
            </div>
          </div>

          {/* Resident Communication Log */}
          <div className="saas-card">
            <h3 className="mb-4 text-lg font-semibold text-foreground">Resident Communication Log</h3>
            <div className="space-y-3">
              <div className="rounded-lg border border-slate-200 bg-white p-3">
                <div className="flex items-start gap-3">
                  <MessageSquare className="h-4 w-4 flex-shrink-0 text-purple-600 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">Feb 22, 2026</p>
                      <Badge className="text-xs" variant="secondary">AI Concierge</Badge>
                    </div>
                    <p className="mt-1 text-sm font-medium text-foreground">Credit notification sent</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      "Hey Alex, we added a $35 credit you can use for happiness and convenience services."
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-3">
                <div className="flex items-start gap-3">
                  <MessageSquare className="h-4 w-4 flex-shrink-0 text-purple-600 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">Mar 3, 2026</p>
                      <Badge className="text-xs" variant="secondary">AI Concierge</Badge>
                    </div>
                    <p className="mt-1 text-sm font-medium text-foreground">Credit reminder sent</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      "You still have $35 in credits available. Want help using them?"
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-3">
                <div className="flex items-start gap-3">
                  <MessageSquare className="h-4 w-4 flex-shrink-0 text-purple-600 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">Mar 4, 2026</p>
                      <Badge className="text-xs" variant="secondary">AI Concierge</Badge>
                    </div>
                    <p className="mt-1 text-sm font-medium text-foreground">Service suggestion sent</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      "I saw you had a few HVAC issues recently. Want me to schedule a tune-up using your credit?"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Churn Impact */}
          <div className="saas-card">
            <h3 className="mb-4 text-lg font-semibold text-foreground">Churn Reduction Impact</h3>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                <p className="text-xs font-medium text-red-700">Before Intervention</p>
                <p className="mt-2 text-3xl font-semibold text-foreground">{resident.riskScore}</p>
                <p className="text-xs text-muted-foreground">Risk Score</p>
              </div>

              <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                <p className="text-xs font-medium text-green-700">After Service</p>
                <p className="mt-2 text-3xl font-semibold text-foreground">
                  {bookings.filter(b => b.status === "completed").length > 0 ? '58' : resident.riskScore}
                </p>
                <p className="text-xs text-muted-foreground">Risk Score</p>
              </div>

              <div className="rounded-lg border border-teal-200 bg-teal-50 p-4">
                <p className="text-xs font-medium text-teal-700">Change</p>
                <p className="mt-2 text-3xl font-semibold text-foreground">
                  {bookings.filter(b => b.status === "completed").length > 0 ? '-16' : '--'}
                </p>
                <p className="text-xs text-muted-foreground">Points</p>
              </div>
            </div>
            {bookings.filter(b => b.status === "completed").length > 0 && (
              <div className="mt-4 rounded-lg border border-teal-200 bg-teal-50 p-4">
                <p className="text-sm font-semibold text-foreground">Intervention Outcome</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  The retention credit successfully reduced churn risk by 16 points. 
                  Resident satisfaction improved through proactive service delivery and personalized AI support.
                </p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
