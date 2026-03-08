import { useState } from "react";
import { Calendar, Clock, CreditCard, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createBooking } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { showDemoSafeError } from "@/lib/demoSafeError";

export default function BookingDialog({ service, open, onOpenChange }) {
  const navigate = useNavigate();
  const { refreshSession } = useAuth();
  const [loading, setLoading] = useState(false);
  
  // Default booking date: tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDate = tomorrow.toISOString().split('T')[0];
  
  const [bookingDate, setBookingDate] = useState(defaultDate);
  const [notes, setNotes] = useState("");

  const handleBooking = async () => {
    setLoading(true);
    
    try {
      const bookingData = {
        serviceId: service.id,
        serviceName: service.name,
        serviceCategory: service.category || "General",
        providerId: service.providerId || null,
        providerName: service.providerName || null,
        originalPrice: service.originalPrice,
        discountApplied: service.discount,
        finalPrice: service.finalPrice,
        bookingDate: bookingDate,
        duration: service.duration || "N/A",
        notes: notes || null,
      };
      
      const response = await createBooking(bookingData);
      
      if (response.data.success) {
        // Refresh session to get updated credit balance
        await refreshSession();
        
        toast.success("Booking confirmed!", {
          description: `${service.name} scheduled for ${new Date(bookingDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`,
          className: "border-emerald-200 bg-emerald-50 text-emerald-900",
        });
        
        onOpenChange(false);
        
        // Navigate to bookings page after a short delay
        setTimeout(() => {
          navigate("/app/resident/bookings");
        }, 1000);
      }
    } catch (error) {
      console.error("Booking failed:", error);
      const errorMsg = error.response?.data?.detail || error.message || "Failed to create booking";
      showDemoSafeError(errorMsg, "Service booking");
      toast.error("Booking failed", {
        description: errorMsg,
        className: "border-red-200 bg-red-50 text-red-900",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!service) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]" data-testid="booking-dialog">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Confirm Booking</DialogTitle>
          <DialogDescription className="text-sm text-slate-600">
            Review your service details and select a date
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Service Info */}
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <h3 className="text-base font-semibold text-slate-900">{service.name}</h3>
            <p className="mt-1 text-sm text-slate-600">{service.description}</p>
            {service.duration && (
              <div className="mt-2 flex items-center gap-2 text-xs text-slate-600">
                <Clock className="h-3.5 w-3.5" />
                <span>{service.duration}</span>
              </div>
            )}
          </div>

          {/* Pricing Breakdown */}
          <div className="space-y-2 rounded-lg border border-emerald-200 bg-emerald-50/30 p-4">
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-slate-600">Original price</span>
              <span className="text-sm font-medium text-slate-600 line-through">${service.originalPrice}</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-semibold text-emerald-700">Retention credit</span>
              <span className="text-sm font-semibold text-emerald-700">-${service.discount}</span>
            </div>
            <div className="flex items-baseline justify-between border-t border-emerald-200 pt-2">
              <span className="text-base font-bold text-slate-900">You pay today</span>
              <span className="text-2xl font-bold text-slate-900">${service.finalPrice}</span>
            </div>
          </div>

          {/* Booking Date */}
          <div className="space-y-2">
            <Label htmlFor="booking-date" className="text-sm font-medium text-slate-900">
              Preferred Date
            </Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <Input
                id="booking-date"
                type="date"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="pl-10"
                data-testid="booking-date-input"
              />
            </div>
          </div>

          {/* Optional Notes */}
          <div className="space-y-2">
            <Label htmlFor="booking-notes" className="text-sm font-medium text-slate-900">
              Special Requests (Optional)
            </Label>
            <Textarea
              id="booking-notes"
              placeholder="Any special instructions or preferences..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="resize-none"
              data-testid="booking-notes-input"
            />
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
            data-testid="cancel-booking-button"
          >
            Cancel
          </Button>
          <Button
            onClick={handleBooking}
            disabled={loading || !bookingDate}
            className="gap-2"
            data-testid="confirm-booking-button"
          >
            {loading ? (
              <>Processing...</>
            ) : (
              <>
                <CheckCircle2 className="h-4 w-4" />
                Confirm Booking
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
