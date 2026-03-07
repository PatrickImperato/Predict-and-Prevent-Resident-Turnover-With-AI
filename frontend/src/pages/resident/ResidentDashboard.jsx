import { Gift, MessageSquare, Calendar, Wrench, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CountUp } from "@/components/ui/count-up";
import { ALEX_CHEN, getPropertyById } from "@/lib/canonicalData";

export default function ResidentDashboard() {
  // Use Alex Chen from canonical data
  const resident = ALEX_CHEN;
  const property = getPropertyById(resident.propertyId);
  
  // Credit amount based on risk score (would normally come from backend)
  const promotionalCredit = 500;
  const creditExpires = "2025-09-30";
  
  // Mock quick services (would normally come from canonical services data)
  const quickServices = [
    { id: "1", name: "Deep Cleaning", price: 120, duration: "2 hours", icon: Sparkles },
    { id: "2", name: "AC Tune-up", price: 85, duration: "1 hour", icon: Wrench },
    { id: "3", name: "Pet Grooming", price: 65, duration: "1.5 hours", icon: Gift }
  ];
  
  const recentBookings = [
    { id: "1", service: "Deep Cleaning", date: "2025-03-15", status: "Completed", provider: "SparkClean" },
    { id: "2", service: "AC Maintenance", date: "2025-02-28", status: "Completed", provider: "FixRight HVAC" }
  ];
  
  const maintenanceRequests = [
    { id: "1", issue: "HVAC - Temperature control", date: "2025-03-01", status: "Resolved", resolution_time: "2 days" }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: "easeOut" }}
      className="space-y-8"
      data-testid="resident-dashboard-root"
    >
      {/* Welcome Header */}
      <section className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="font-[var(--font-heading)] text-[28px] font-semibold tracking-tight text-slate-900">
          Welcome back, {resident.fullName}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          Unit {resident.unit} • {property?.shortName} • Your personalized resident experience
        </p>
      </section>

      {/* Promotional Credit Banner - Visual Anchor */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, delay: 0.08 }}
      >
        <div className="rounded-xl border-2 border-teal-200 bg-gradient-to-br from-teal-50 via-emerald-50 to-teal-50 p-8 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-teal-600/10 text-teal-600">
                <Gift className="h-7 w-7" strokeWidth={2} />
              </div>
              <div>
                <Badge className="mb-2 border-teal-200 bg-teal-100 text-teal-800 hover:bg-teal-100" variant="secondary">
                  Retention Credit Available
                </Badge>
                <p className="font-[var(--font-heading)] text-[36px] font-semibold tracking-tight text-slate-900">
                  $<CountUp end={promotionalCredit} duration={1000} />
                </p>
                <p className="mt-1 text-sm text-slate-700">
                  Use on any service • Expires {new Date(creditExpires).toLocaleDateString()}
                </p>
              </div>
            </div>
            <Button asChild className="h-11 rounded-lg shadow-sm">
              <Link to="/app/resident/services">Browse Services</Link>
            </Button>
          </div>
        </div>
      </motion.section>

      {/* Quick Services */}
      <section>
        <h3 className="mb-6 text-xl font-semibold text-slate-900">Quick Services</h3>
        <div className="grid gap-6 md:grid-cols-3">
          {quickServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.26, delay: 0.16 + index * 0.06 }}
            >
              <div className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-teal-200 hover:shadow-md">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition-colors group-hover:bg-teal-50 group-hover:text-teal-600">
                  <service.icon className="h-6 w-6" strokeWidth={1.75} />
                </div>
                <h4 className="mt-4 text-lg font-semibold text-slate-900">{service.name}</h4>
                <p className="mt-2 text-sm text-slate-600">{service.duration}</p>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-xl font-semibold text-slate-900">${service.price}</p>
                  <Button size="sm" variant="outline" className="h-9 rounded-lg">Book Now</Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Recent Activity */}
      <section className="grid gap-6 xl:grid-cols-2">
        {/* Recent Bookings */}
        <div className="saas-card">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">Recent Bookings</h3>
            <Button asChild size="sm" variant="ghost" className="h-9">
              <Link to="/app/resident/bookings">View all</Link>
            </Button>
          </div>
          <div className="space-y-3">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-slate-900">{booking.service}</p>
                    <p className="mt-1 text-sm text-slate-600">{booking.provider}</p>
                    <p className="mt-1 text-xs text-slate-500">{new Date(booking.date).toLocaleDateString()}</p>
                  </div>
                  <Badge className="border-emerald-200 bg-emerald-50 text-emerald-700" variant="secondary">
                    {booking.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Maintenance History */}
        <div className="saas-card">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">Maintenance History</h3>
            <Button asChild size="sm" variant="ghost" className="h-9">
              <Link to="/app/resident/maintenance">View all</Link>
            </Button>
          </div>
          <div className="space-y-3">
            {maintenanceRequests.map((request) => (
              <div key={request.id} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-slate-900">{request.issue}</p>
                    <p className="mt-1 text-sm text-slate-600">Resolved in {request.resolution_time}</p>
                    <p className="mt-1 text-xs text-slate-500">{new Date(request.date).toLocaleDateString()}</p>
                  </div>
                  <Badge className="border-emerald-200 bg-emerald-50 text-emerald-700" variant="secondary">
                    {request.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Concierge Shortcut */}
      <section>
        <div className="rounded-xl border border-teal-200 bg-teal-50 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal-600/10 text-teal-600">
                <MessageSquare className="h-6 w-6" strokeWidth={1.75} />
              </div>
              <div>
                <p className="font-semibold text-slate-900">Need assistance?</p>
                <p className="text-sm text-slate-700">Chat with your AI concierge for personalized help</p>
              </div>
            </div>
            <Button asChild className="h-10 rounded-lg">
              <Link to="/app/resident/concierge">Start Chat</Link>
            </Button>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
