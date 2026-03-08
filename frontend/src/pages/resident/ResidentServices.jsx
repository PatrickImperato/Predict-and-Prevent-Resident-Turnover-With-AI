import { motion } from "framer-motion";
import { Sparkles, Dog, Wind, Coffee, UtensilsCrossed, Car, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAlexPropertyProviders } from "@/lib/canonicalData";

export default function ResidentServices() {
  const providers = getAlexPropertyProviders();

  // RETENTION & HAPPINESS FOCUSED SERVICES (not maintenance-heavy)
  const services = [
    { id: "1", name: "Premium Cleaning Service", category: "Cleaning & Refresh", price: 120, duration: "2 hours", description: "Complete apartment refresh - great reset after frustrations", icon: Sparkles, fullyCovered: true, recommended: true, reason: "Perfect after recent home issues" },
    { id: "2", name: "Starbucks Coffee Credit", category: "Convenience", price: 50, duration: "Instant", description: "$50 credit for coffee runs - ideal for work from home", icon: Coffee, fullyCovered: true, recommended: true, reason: "Great for busy WFH days" },
    { id: "3", name: "Grocery Delivery Service", category: "Convenience", price: 45, duration: "Same day", description: "Full grocery delivery to your door", icon: UtensilsCrossed, fullyCovered: true, recommended: true, reason: "Save time, stay comfortable" },
    { id: "4", name: "Pet Grooming for Bailey", category: "Pet Care", price: 85, duration: "1.5 hours", description: "Professional grooming including bath, trim, nails", icon: Dog, fullyCovered: true, recommended: false, reason: "Pamper your pup" },
    { id: "5", name: "Car Wash & Detail", category: "Convenience", price: 95, duration: "2 hours", description: "Full exterior wash and interior detail", icon: Car, fullyCovered: true, recommended: false, reason: "Keep your car fresh" },
    { id: "6", name: "Laundry Pickup & Delivery", category: "Convenience", price: 75, duration: "24 hours", description: "We pickup, wash, fold, and return", icon: Package, fullyCovered: true, recommended: false, reason: "One less thing to worry about" },
    { id: "7", name: "Home Refresh Package", category: "Cleaning & Refresh", price: 95, duration: "1.5 hours", description: "Quick clean + air freshening + organization", icon: Sparkles, fullyCovered: true, recommended: false, reason: "Make home feel new again" },
    { id: "8", name: "HVAC Comfort Check", category: "Home Comfort", price: 85, duration: "1 hour", description: "System check to prevent future frustrations", icon: Wind, fullyCovered: true, recommended: false, reason: "Peace of mind for climate control" },
    { id: "9", name: "Filter Replacement Service", category: "Home Comfort", price: 45, duration: "30 min", description: "Fresh air filters for better indoor air", icon: Wind, fullyCovered: true, recommended: false, reason: "Breathe easier at home" }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 8 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.24 }} 
      className="space-y-4 max-w-[1400px]"
      data-testid="resident-services-root"
    >
      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Badge className="border-teal-200 bg-teal-50 text-teal-700 hover:bg-teal-50" variant="secondary">
                {providers.length} Providers
              </Badge>
              <h2 className="font-[var(--font-heading)] text-xl font-semibold tracking-tight text-slate-900">Services Marketplace</h2>
            </div>
            <p className="mt-1 text-xs leading-relaxed text-slate-600">Use your $500 credit • Expires Sep 30, 2025</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-semibold text-teal-600">$500</p>
            <p className="text-xs text-slate-600">Available</p>
          </div>
        </div>
      </section>

      <section className="rounded-xl border-2 border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50 p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <Sparkles className="h-5 w-5 text-emerald-600 flex-shrink-0" />
          <p className="text-sm font-semibold text-slate-900">Top picks to make staying here feel better – all covered by your credit</p>
        </div>
      </section>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => {
          const borderClass = service.recommended ? 'border-amber-200 bg-amber-50/30' : 'border-slate-200';
          const iconBgClass = service.recommended ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-600';
          
          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.26, delay: index * 0.04 }}
            >
              <div className={`group rounded-xl border bg-white p-3 shadow-sm transition-all hover:shadow-md hover:border-teal-200 ${borderClass}`}>
                <div className="flex items-start justify-between mb-2">
                  <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg transition-colors group-hover:bg-teal-50 group-hover:text-teal-600 ${iconBgClass}`}>
                    <service.icon className="h-4 w-4" strokeWidth={1.75} />
                  </div>
                  {service.fullyCovered && (
                    <Badge className="border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-50 text-xs py-0" variant="secondary">
                      Covered
                    </Badge>
                  )}
                </div>
                <div>
                  <Badge className="border-slate-200 bg-slate-100 text-slate-700 text-xs mb-1.5" variant="secondary">
                    {service.category}
                  </Badge>
                  <h3 className="text-sm font-semibold text-slate-900">{service.name}</h3>
                  <p className="mt-1 text-xs text-slate-600 line-clamp-2">{service.description}</p>
                  {service.reason && (
                    <p className="mt-1.5 text-xs font-medium text-teal-700">\u2192 {service.reason}</p>
                  )}
                  <p className="mt-1 text-xs text-slate-500">{service.duration}</p>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <p className="text-lg font-semibold text-slate-900">${service.price}</p>
                    {service.fullyCovered && (
                      <p className="text-xs font-medium text-emerald-600">Fully covered</p>
                    )}
                  </div>
                  <Button size="sm" className="h-8 rounded-lg text-xs" data-testid={`book-service-${service.id}`}>
                    Book Now
                  </Button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h3 className="mb-3 text-sm font-semibold text-slate-900">Available Providers</h3>
        <div className="space-y-2">
          {providers.map((provider) => (
            <div key={provider.id} className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-2.5">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 truncate">{provider.name}</p>
                <p className="text-xs text-slate-600 truncate">{provider.serviceCategories.join(', ')}</p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <div className="text-right">
                  <p className="text-xs font-medium text-slate-900">★ {provider.rating}</p>
                  <p className="text-xs text-slate-600">{provider.bookings} bookings</p>
                </div>
                <Badge className="border-emerald-200 bg-emerald-50 text-emerald-700 text-xs" variant="secondary">
                  {provider.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
