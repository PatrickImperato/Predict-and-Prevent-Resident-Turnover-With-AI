import { motion } from "framer-motion";
import { Sparkles, Wrench, Dog } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAlexPropertyProviders } from "@/lib/canonicalData";

export default function ResidentServices() {
  const providers = getAlexPropertyProviders();

  // Sample services based on available providers
  const services = [
    { id: "1", name: "Deep Cleaning", category: "Cleaning", price: 120, duration: "2 hours", description: "Complete apartment refresh with all surfaces", icon: Sparkles },
    { id: "2", name: "AC Tune-up", category: "HVAC", price: 85, duration: "1 hour", description: "Full system check and filter replacement", icon: Wrench },
    { id: "3", name: "Pet Grooming", category: "Pet Care", price: 65, duration: "1.5 hours", description: "Professional grooming for dogs and cats", icon: Dog },
    { id: "4", name: "Express Cleaning", category: "Cleaning", price: 75, duration: "1 hour", description: "Quick refresh of high-traffic areas", icon: Sparkles },
    { id: "5", name: "HVAC Filter Replacement", category: "HVAC", price: 45, duration: "30 min", description: "Standard filter swap and airflow check", icon: Wrench },
    { id: "6", name: "Pet Bath & Nail Trim", category: "Pet Care", price: 45, duration: "45 min", description: "Basic grooming essentials", icon: Dog }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 8 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.24 }} 
      className="space-y-8"
      data-testid="resident-services-root"
    >
      <section className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <Badge className="mb-3 w-fit border-teal-200 bg-teal-50 text-teal-700 hover:bg-teal-50" variant="secondary">
          {providers.length} Providers Available
        </Badge>
        <h2 className="font-[var(--font-heading)] text-[28px] font-semibold tracking-tight text-slate-900">Services Marketplace</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">Browse and book premium services for your unit using your retention credits.</p>
      </section>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.26, delay: index * 0.06 }}
          >
            <div className="group saas-card hover:border-teal-200 hover:shadow-md transition-all">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition-colors group-hover:bg-teal-50 group-hover:text-teal-600">
                <service.icon className="h-6 w-6" strokeWidth={1.75} />
              </div>
              <div className="mt-4">
                <Badge className="border-slate-200 bg-slate-100 text-slate-700" variant="secondary">
                  {service.category}
                </Badge>
                <h3 className="mt-2 text-lg font-semibold text-slate-900">{service.name}</h3>
                <p className="mt-1 text-sm text-slate-600">{service.description}</p>
                <p className="mt-2 text-xs text-slate-500">{service.duration}</p>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <p className="text-2xl font-semibold text-slate-900">${service.price}</p>
                <Button size="sm" className="h-9 rounded-lg" data-testid={`book-service-${service.id}`}>
                  Book Now
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Available Providers Section */}
      <section className="saas-card">
        <h3 className="mb-4 text-lg font-semibold text-slate-900">Available Providers</h3>
        <div className="space-y-3">
          {providers.map((provider) => (
            <div key={provider.id} className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div>
                <p className="font-medium text-slate-900">{provider.name}</p>
                <p className="text-sm text-slate-600">{provider.serviceCategories.join(', ')}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-slate-900">Rating: {provider.rating}</p>
                  <p className="text-xs text-slate-600">{provider.bookings} bookings</p>
                </div>
                <Badge className="border-emerald-200 bg-emerald-50 text-emerald-700" variant="secondary">
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
