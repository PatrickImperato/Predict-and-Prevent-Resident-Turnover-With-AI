import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAlexBookings } from "@/lib/canonicalData";
import { Link } from "react-router-dom";

export default function ResidentBookings() {
  const bookings = getAlexBookings();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 8 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.24 }} 
      className="space-y-8"
      data-testid="resident-bookings-root"
    >
      <section className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="font-[var(--font-heading)] text-[28px] font-semibold tracking-tight text-slate-900">My Bookings</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">View your service bookings and appointment history.</p>
      </section>

      {bookings.length > 0 ? (
        <div className="saas-card">
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="rounded-lg border border-slate-200 bg-slate-50 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-slate-600" />
                      <h3 className="text-lg font-semibold text-slate-900">{booking.serviceName}</h3>
                    </div>
                    <div className="mt-3 space-y-1">
                      <p className="text-sm text-slate-600">
                        <span className="font-medium">Provider:</span> {booking.providerName}
                      </p>
                      <p className="text-sm text-slate-600">
                        <span className="font-medium">Scheduled:</span>{' '}
                        {booking.scheduledFor instanceof Date 
                          ? booking.scheduledFor.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
                          : 'Date pending'}
                      </p>
                      <p className="text-sm text-slate-600">
                        <span className="font-medium">Booked:</span>{' '}
                        {booking.createdAt instanceof Date 
                          ? booking.createdAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                          : 'Date pending'}
                      </p>
                    </div>
                  </div>
                  <Badge 
                    className={`${
                      booking.status === 'completed' 
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-700' 
                        : 'border-blue-200 bg-blue-50 text-blue-700'
                    }`} 
                    variant="secondary"
                  >
                    {booking.status === 'completed' ? 'Completed' : 'Scheduled'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="saas-card">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-600">
              <Calendar className="h-8 w-8" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-slate-900">No bookings yet</h3>
            <p className="mt-2 text-sm text-slate-600">Explore services and schedule your first visit.</p>
            <Button asChild className="mt-6" data-testid="browse-services-button">
              <Link to="/app/resident/services">Browse Services</Link>
            </Button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
