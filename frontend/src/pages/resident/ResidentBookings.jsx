import { motion } from "framer-motion";
import { Calendar, CreditCard } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAlexBookings } from "@/lib/canonicalData";
import { Link } from "react-router-dom";

export default function ResidentBookings() {
  const bookings = getAlexBookings();
  const creditRemaining = 500;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 8 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.24 }} 
      className="space-y-4 max-w-[1400px]"
      data-testid="resident-bookings-root"
    >
      {/* Compact Header with Credit */}
      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-[var(--font-heading)] text-xl font-semibold tracking-tight text-slate-900">My Bookings</h2>
            <p className="mt-1 text-xs leading-relaxed text-slate-600">Service history and upcoming appointments</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 text-teal-600">
              <CreditCard className="h-4 w-4" />
              <p className="text-2xl font-semibold">${creditRemaining}</p>
            </div>
            <p className="text-xs text-slate-600">Credit available</p>
          </div>
        </div>
      </section>

      {bookings.length > 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="space-y-3">
            {bookings.map((booking) => (
              <div key={booking.id} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-slate-600" />
                      <h3 className="text-base font-semibold text-slate-900">{booking.serviceName}</h3>
                    </div>
                    <div className="mt-2 space-y-1">
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
                      {booking.creditApplied && (
                        <p className="text-sm font-medium text-emerald-600">
                          ✓ ${booking.creditApplied || 85} credit applied
                        </p>
                      )}
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
        <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-600">
              <Calendar className="h-7 w-7" />
            </div>
            <h3 className="mt-4 text-base font-semibold text-slate-900">No bookings yet</h3>
            <p className="mt-2 text-sm text-slate-600">You have $500 in credit to use on services.</p>
            <Button asChild className="mt-4" data-testid="browse-services-button">
              <Link to="/app/resident/services">Browse Services</Link>
            </Button>
          </div>
        </div>
      )}

      {/* Credit reminder */}
      {creditRemaining > 0 && bookings.length > 0 && (
        <div className="rounded-xl border border-teal-200 bg-teal-50 p-4">
          <p className="text-sm font-medium text-slate-900">You still have ${creditRemaining - 85} in credit remaining</p>
          <p className="mt-1 text-sm text-slate-700">Book more services before September 30, 2025</p>
        </div>
      )}
    </motion.div>
  );
}
