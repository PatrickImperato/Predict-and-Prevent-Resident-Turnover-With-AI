import { useState } from "react";
import { Gift, MessageSquare, Calendar, Wrench, Sparkles, CheckCircle2, Coffee, UtensilsCrossed, Dog, Car, ShoppingBag, Package } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CountUp } from "@/components/ui/count-up";
import { getAlexChenData, getAlexProperty, getAlexBookings, getAlexMaintenance, getAlexPropertyProviders } from "@/lib/canonicalData";
import BookingDialog from "@/components/resident/BookingDialog";

export default function ResidentDashboard() {
  const resident = getAlexChenData();
  const property = getAlexProperty();
  const bookings = getAlexBookings();
  const maintenance = getAlexMaintenance();
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const handleBookNow = (service) => {
    setSelectedService(service);
    setBookingDialogOpen(true);
  };
  
  const promotionalCredit = 35;
  const creditExpires = new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  
  // RETENTION-FOCUSED recommendations - showing DISCOUNT MODEL
  const recommendedServices = [
    { 
      id: "1", 
      name: "Premium Cleaning Service", 
      originalPrice: 120, 
      discount: 35, 
      finalPrice: 85,
      icon: Sparkles, 
      reason: "Great reset after recent frustrations" 
    },
    { 
      id: "2", 
      name: "Grocery Delivery Service", 
      originalPrice: 75, 
      discount: 35, 
      finalPrice: 40,
      icon: ShoppingBag, 
      reason: "Convenient and time-saving" 
    },
    { 
      id: "3", 
      name: "Pet Grooming for Bailey", 
      originalPrice: 95, 
      discount: 35, 
      finalPrice: 60,
      icon: Dog, 
      reason: "Pamper your pup" 
    }
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

      {/* ULTRA BRIGHT CREDIT CARD - Retention Reward Style */}
      <motion.section
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.32, delay: 0.08 }}
      >
        <div className="relative overflow-hidden rounded-2xl border-2 border-emerald-300 bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-400 p-8 shadow-2xl">
          <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          
          <div className="relative flex items-start gap-5">
            <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
              <Gift className="h-9 w-9 text-white" strokeWidth={2.5} />
            </div>
            <div className="flex-1">
              <Badge className="mb-3 border-white/40 bg-white/30 text-white hover:bg-white/30 font-semibold" variant="secondary">
                🎉 YOUR RETENTION REWARD
              </Badge>
              <p className="font-[var(--font-heading)] text-5xl font-bold tracking-tight text-white drop-shadow-lg">
                $<CountUp end={promotionalCredit} duration={1200} />
              </p>
              <p className="mt-3 text-base font-semibold text-white/95">
                We noticed recent issues and want to make things right.
              </p>
              <p className="mt-1 text-sm text-white/90">
                Use it on services that make life easier and help you feel cared for.
              </p>
              <p className="mt-2 text-sm font-medium text-white/80">
                ⏰ Available for 4 days (expires {new Date(creditExpires).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })})
              </p>
            </div>
            <Button 
              asChild 
              size="lg"
              className="h-12 rounded-xl bg-white text-teal-700 hover:bg-white/95 hover:text-teal-800 shadow-lg font-semibold flex-shrink-0" 
              data-testid="use-credit-now-button"
            >
              <Link to="/app/resident/services">Use Credit Now</Link>
            </Button>
          </div>
        </div>
      </motion.section>

      {/* Happiness-Focused Recommendations */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Recommended Just For You</h3>
            <p className="mt-1 text-sm text-slate-600">Services to make staying here feel better</p>
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
              <div className="group rounded-xl border-2 border-teal-100 bg-gradient-to-br from-white to-teal-50/30 p-5 shadow-sm transition-all hover:border-teal-300 hover:shadow-xl">
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-teal-100 text-teal-600 transition-colors group-hover:bg-teal-600 group-hover:text-white">
                    <service.icon className="h-6 w-6" strokeWidth={2} />
                  </div>
                  {service.fullyCovered && (
                    <Badge className="border-emerald-300 bg-emerald-100 text-emerald-700 hover:bg-emerald-100 font-semibold" variant="secondary">
                      <CheckCircle2 className="mr-1 h-3 w-3" />
                      Fully Covered
                    </Badge>
                  )}
                </div>
                <h4 className="mt-4 text-base font-semibold text-slate-900">{service.name}</h4>
                <p className="mt-1 text-xs font-medium text-teal-700">{service.reason}</p>
                <div className="mt-4 space-y-2">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-slate-600">Original price</span>
                    <span className="text-sm font-medium text-slate-600 line-through">${service.originalPrice}</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs font-semibold text-emerald-700">Retention credit</span>
                    <span className="text-sm font-semibold text-emerald-700">-${service.discount}</span>
                  </div>
                  <div className="flex items-baseline justify-between border-t border-slate-200 pt-2">
                    <span className="text-sm font-bold text-slate-900">Today you pay</span>
                    <span className="text-2xl font-bold text-slate-900">${service.finalPrice}</span>
                  </div>
                </div>
                <Button size="sm" className="mt-3 w-full h-10 rounded-lg font-semibold" onClick={() => handleBookNow(service)}>Book Now</Button>
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
        <div className="rounded-xl border-2 border-teal-200 bg-gradient-to-r from-teal-50 to-emerald-50 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-teal-600 text-white">
                <MessageSquare className="h-7 w-7" strokeWidth={2} />
              </div>
              <div>
                <p className="text-base font-bold text-slate-900">Need help using your credit?</p>
                <p className="text-sm font-medium text-slate-700">Chat with your AI concierge for personalized recommendations</p>
              </div>
            </div>
            <Button asChild size="lg" className="h-12 rounded-xl flex-shrink-0" data-testid="start-chat-button">
              <Link to="/app/resident/concierge">Start Chat</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Booking Dialog */}
      <BookingDialog 
        service={selectedService}
        open={bookingDialogOpen}
        onOpenChange={setBookingDialogOpen}
      />
    </motion.div>
  );
}
