import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, CreditCard } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { getResidentBookings } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { showDemoSafeError } from "@/lib/demoSafeError";

export default function ResidentBookings() {
  const { session } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Get credit from session
  const retentionCredit = session?.retention_credit || {};
  const creditRemaining = retentionCredit.amount || 0;

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await getResidentBookings();
        setBookings(response.data.bookings || []);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
        showDemoSafeError(error.message, "Loading bookings");
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "Date pending";
    try {
      return new Date(dateString).toLocaleDateString('en-US', { 
        weekday: 'long', 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
      });
    } catch {
      return dateString;
    }
  };

  const formatShortDate = (dateString) => {
    if (!dateString) return "Date pending";
    try {
      return new Date(dateString).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      });
    } catch {
      return dateString;
    }
  };

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

      {loading ? (
        <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-center text-sm text-slate-600">Loading bookings...</p>
        </div>
      ) : bookings.length > 0 ? (
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
                        <span className="font-medium">Provider:</span> {booking.providerName || "HappyCo Services"}
                      </p>
                      <p className="text-sm text-slate-600">
                        <span className="font-medium">Scheduled:</span> {formatDate(booking.bookingDate)}
                      </p>
                      <p className="text-sm text-slate-600">
                        <span className="font-medium">Booked:</span> {formatShortDate(booking.createdAt)}
                      </p>
                      {booking.discountApplied && (
                        <p className="text-sm font-medium text-emerald-600">
                          ✓ ${booking.discountApplied} credit applied
                        </p>
                      )}
                    </div>
                  </div>
                  <Badge 
                    className={`${
                      booking.status === 'completed' 
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-700' 
                        : booking.status === 'confirmed' || booking.status === 'scheduled'
                        ? 'border-blue-200 bg-blue-50 text-blue-700'
                        : 'border-slate-200 bg-slate-50 text-slate-700'
                    }`} 
                    variant="secondary"
                  >
                    {booking.status === 'completed' ? 'Completed' : booking.status === 'confirmed' ? 'Confirmed' : 'Scheduled'}
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
            <p className="mt-2 text-sm text-slate-600">You have ${creditRemaining} in credit to use on services.</p>
            <Button asChild className="mt-4" data-testid="browse-services-button">
              <Link to="/app/resident/services">Browse Services</Link>
            </Button>
          </div>
        </div>
      )}

      {/* Credit reminder */}
      {creditRemaining > 0 && bookings.length > 0 && (
        <div className="rounded-xl border border-teal-200 bg-teal-50 p-4">
          <p className="text-sm font-medium text-slate-900">You still have ${creditRemaining} in credit remaining</p>
          <p className="mt-1 text-sm text-slate-700">Book more services before it expires</p>
        </div>
      )}
    </motion.div>
  );
}
