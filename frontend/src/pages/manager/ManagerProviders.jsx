import { useState } from "react";
import { motion } from "framer-motion";
import { BriefcaseBusiness, Plus, Star, TrendingUp, CheckCircle2, X } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getSarahManagedProperty, getSarahPropertyProviders } from "@/lib/canonicalData";

export default function ManagerProviders() {
  const property = getSarahManagedProperty();
  const providers = getSarahPropertyProviders();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddProvider = () => {
    toast.success("Provider Added", {
      description: "New provider has been added to your property's service network.",
      className: "border-teal-200 bg-teal-50 text-teal-900"
    });
    setIsAddModalOpen(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: "easeOut" }}
      className="space-y-6"
      data-testid="manager-providers-page"
    >
      {/* Header */}
      <section className="rounded-lg border border-border/60 bg-card p-6 shadow-sm">
        <Badge className="mb-3 w-fit border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-50" variant="secondary">
          Service Network
        </Badge>
        <h2 className="font-[var(--font-heading)] text-3xl font-semibold tracking-[-0.02em] text-foreground">
          Service Providers
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Manage service provider network for {property?.name}. Track provider performance, coverage, and 
          fulfillment rates to optimize resident service delivery.
        </p>
      </section>

      {/* Summary Metrics */}
      <section className="grid gap-6 md:grid-cols-4">
        <div className="saas-metric-card">
          <p className="metric-label">Active Providers</p>
          <p className="metric-value mt-3">{providers.length}</p>
          <p className="metric-detail mt-2">Service partners</p>
        </div>
        <div className="saas-metric-card">
          <p className="metric-label">Avg Coverage</p>
          <p className="metric-value mt-3">{Math.round(providers.reduce((sum, p) => sum + p.coveragePercent, 0) / providers.length)}%</p>
          <p className="metric-detail mt-2">Service availability</p>
        </div>
        <div className="saas-metric-card">
          <p className="metric-label">Avg Fulfillment</p>
          <p className="metric-value mt-3">{Math.round(providers.reduce((sum, p) => sum + p.fulfillmentRate, 0) / providers.length)}%</p>
          <p className="metric-detail mt-2">Completion rate</p>
        </div>
        <div className="saas-metric-card">
          <p className="metric-label">Total Bookings</p>
          <p className="metric-value mt-3">{providers.reduce((sum, p) => sum + p.bookings, 0)}</p>
          <p className="metric-detail mt-2">All time</p>
        </div>
      </section>

      {/* Providers Grid */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Provider Network</h3>
          <Button 
            size="sm" 
            className="h-9 rounded-lg"
            onClick={() => setIsAddModalOpen(true)}
            data-testid="add-provider-button"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Provider
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {providers.map((provider) => (
            <motion.div
              key={provider.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="saas-card saas-card:hover"
              data-testid={`provider-card-${provider.id}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                    <BriefcaseBusiness className="h-6 w-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-foreground">{provider.name}</h4>
                    <p className="mt-1 text-sm text-muted-foreground">{provider.category}</p>
                  </div>
                </div>
                <Badge className="border-teal-200 bg-teal-50 text-teal-700 text-xs">
                  {provider.status}
                </Badge>
              </div>

              {/* Service Categories */}
              <div className="mt-4 flex flex-wrap gap-2">
                {provider.serviceCategories.map((category) => (
                  <Badge key={category} variant="secondary" className="text-xs">
                    {category}
                  </Badge>
                ))}
              </div>

              {/* Metrics */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-border bg-muted/40 p-3">
                  <p className="text-xs font-medium text-muted-foreground">Coverage</p>
                  <p className="mt-1 text-lg font-semibold text-foreground">{provider.coveragePercent}%</p>
                </div>
                <div className="rounded-lg border border-border bg-muted/40 p-3">
                  <p className="text-xs font-medium text-muted-foreground">Fulfillment</p>
                  <p className="mt-1 text-lg font-semibold text-foreground">{provider.fulfillmentRate}%</p>
                </div>
              </div>

              {/* Stats */}
              <div className="mt-4 space-y-2 border-t border-border pt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Total Bookings</span>
                  <span className="font-semibold text-foreground">{provider.bookings}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Utilization</span>
                  <span className="font-semibold text-foreground">{provider.utilization}%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Avg Response</span>
                  <span className="font-semibold text-foreground">{provider.avgResponseTime}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    Rating
                  </span>
                  <span className="font-semibold text-foreground">{provider.rating}/5.0</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Add Provider Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent data-testid="add-provider-modal">
          <DialogHeader>
            <DialogTitle>Add Service Provider</DialogTitle>
            <DialogDescription>
              Add a new service provider to {property?.shortName}'s network.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="provider-name">Provider Name</Label>
              <Input id="provider-name" placeholder="e.g., ABC Cleaning Services" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="provider-category">Service Category</Label>
              <Input id="provider-category" placeholder="e.g., Cleaning, HVAC, Pest Control" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="provider-contact">Contact Email</Label>
              <Input id="provider-contact" type="email" placeholder="provider@example.com" />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddProvider} data-testid="confirm-add-provider">
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Add Provider
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
