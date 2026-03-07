import { Gift, MessageSquare, Calendar, Wrench, Sparkles, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CountUp } from "@/components/ui/count-up";
import { getAlexChenData, getAlexProperty, getAlexBookings, getAlexMaintenance, getAlexPropertyProviders } from "@/lib/canonicalData";

export default function ResidentDashboard() {
  const resident = getAlexChenData();
  const property = getAlexProperty();
  const bookings = getAlexBookings();
  const maintenance = getAlexMaintenance();
  
  const promotionalCredit = 500;
  const creditExpires = "2025-09-30";
  
  // Recommended services based on risk driver (maintenance frequency)
  const recommendedServices = [
    { id: "1", name: "HVAC Tune-up", price: 85, icon: Wrench, fullyCovered: true, reason: "Based on recent HVAC issues" },
    { id: "2", name: "Deep Cleaning", price: 120, icon: Sparkles, fullyCovered: true, reason: "Refresh your space" },
    { id: "3", name: "Air Vent Inspection", price: 65, icon: Wrench, fullyCovered: true, reason: "Prevent future issues" }
  ];
  
  const recentBookings = bookings.map(booking => ({
    id: booking.id,
    service: booking.serviceName,
    date: booking.scheduledFor,
    status: booking.status === "completed" ? "Completed" : "Scheduled",
    provider: booking.providerName
  }));
  
  const maintenanceRequests = maintenance.filter(m => m.status === "closed").slice(0, 2).map(request => ({
    id: request.id,
    issue: `${request.issueType} - ${request.issueTitle}`,
    date: request.openedAt,
    status: "Resolved",
    resolution_time: `${request.resolutionDays} day${request.resolutionDays !== 1 ? 's' : ''}`
  }));

  return (
    <motion.div 
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: "easeOut" }}
      className="space-y-6 max-w-[1400px]"
      data-testid="resident-dashboard-root"
    >
      {/* Welcome Header */}
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="font-[var(--font-heading)] text-2xl font-semibold tracking-tight text-slate-900">
          Welcome back, {resident.fullName}
        </h2>
        <p className="mt-1 text-sm leading-relaxed text-slate-600">
          Unit {resident.unit} • {property?.shortName}
        </p>
      </section>

      {/* Enhanced Retention Credit Banner */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, delay: 0.08 }}
      >
        <div className="rounded-xl border-2 border-teal-200 bg-gradient-to-br from-teal-50 via-emerald-50 to-teal-50 p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-teal-600/10 text-teal-600">
              <Gift className="h-7 w-7" strokeWidth={2} />
            </div>
            <div className="flex-1">
              <Badge className="mb-2 border-teal-200 bg-teal-100 text-teal-800 hover:bg-teal-100" variant="secondary">
                Retention Credit Available
              </Badge>
              <p className="font-[var(--font-heading)] text-3xl font-semibold tracking-tight text-slate-900">
                $<CountUp end={promotionalCredit} duration={1000} />
              </p>
              <p className="mt-2 text-sm font-medium text-slate-700">
                You received this credit because we noticed a few maintenance issues recently and want to make things right.
              </p>
              <p className="mt-1 text-sm text-slate-600">
                Use it toward services in your apartment before {new Date(creditExpires).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
            <Button asChild className="h-11 rounded-lg shadow-sm flex-shrink-0" data-testid="browse-services-button">
              <Link to="/app/resident/services">Browse Services</Link>
            </Button>
          </div>
        </div>
      </motion.section>

      {/* Recommended Services For You */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Recommended Services For You</h3>
            <p className="mt-1 text-sm text-slate-600">Based on recent maintenance activity</p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {recommendedServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.26, delay: 0.12 + index * 0.06 }}
            >
              <div className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-teal-200 hover:shadow-md">
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition-colors group-hover:bg-teal-50 group-hover:text-teal-600">
                    <service.icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  {service.fullyCovered && (
                    <Badge className="border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-50" variant="secondary">
                      <CheckCircle2 className="mr-1 h-3 w-3" />
                      Fully Covered
                    </Badge>
                  )}
                </div>
                <h4 className="mt-3 text-base font-semibold text-slate-900">{service.name}</h4>
                <p className="mt-1 text-xs text-slate-600">{service.reason}</p>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <p className="text-xl font-semibold text-slate-900">${service.price}</p>
                    {service.fullyCovered && (
                      <p className="text-xs font-medium text-emerald-600">${service.price} covered by your credit</p>
                    )}
                  </div>
                  <Button size="sm" className="h-9 rounded-lg">Book Now</Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Recent Activity */}
      <section className="grid gap-4 xl:grid-cols-2">
        {/* Recent Bookings */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-semibold text-slate-900">Recent Bookings</h3>
            <Button asChild size="sm" variant="ghost" className="h-8 text-xs" data-testid="view-all-bookings-link">
              <Link to="/app/resident/bookings">View all</Link>
            </Button>
          </div>
          {recentBookings.length > 0 ? (
            <div className="space-y-3">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900">{booking.service}</p>
                      <p className="mt-1 text-xs text-slate-600">{booking.provider}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        {booking.date instanceof Date ? booking.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Pending'}
                      </p>
                    </div>
                    <Badge className="border-emerald-200 bg-emerald-50 text-emerald-700 text-xs" variant="secondary">
                      {booking.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-6 text-center">
              <p className="text-sm text-slate-600">No recent bookings</p>
            </div>
          )}
        </div>

        {/* Maintenance History */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-semibold text-slate-900">Maintenance History</h3>
            <Button asChild size="sm" variant="ghost" className="h-8 text-xs" data-testid="view-all-maintenance-link">
              <Link to="/app/resident/maintenance">View all</Link>
            </Button>
          </div>
          {maintenanceRequests.length > 0 ? (
            <div className="space-y-3">
              {maintenanceRequests.map((request) => (
                <div key={request.id} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900">{request.issue}</p>
                      <p className="mt-1 text-xs text-slate-600">Resolved in {request.resolution_time}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        {request.date instanceof Date ? request.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Pending'}
                      </p>
                    </div>
                    <Badge className="border-emerald-200 bg-emerald-50 text-emerald-700 text-xs" variant="secondary">
                      {request.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-6 text-center">
              <p className="text-sm text-slate-600">No maintenance history</p>
            </div>
          )}
        </div>
      </section>

      {/* Concierge Shortcut */}
      <section>
        <div className="rounded-xl border border-teal-200 bg-teal-50 p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-teal-600/10 text-teal-600">
                <MessageSquare className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Need help using your credit?</p>
                <p className="text-sm text-slate-700">Chat with your AI concierge for personalized recommendations</p>
              </div>
            </div>
            <Button asChild className="h-10 rounded-lg flex-shrink-0" data-testid="start-chat-button">
              <Link to="/app/resident/concierge">Start Chat</Link>
            </Button>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
