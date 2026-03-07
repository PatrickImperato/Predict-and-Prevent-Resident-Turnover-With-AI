import { motion } from "framer-motion";
import { Wrench, AlertCircle, CreditCard } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAlexMaintenance } from "@/lib/canonicalData";

export default function ResidentMaintenance() {
  const maintenance = getAlexMaintenance();
  const creditAvailable = 500;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 8 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.24 }} 
      className="space-y-4 max-w-[1400px]"
      data-testid="resident-maintenance-root"
    >
      {/* Compact Header with Credit */}
      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-[var(--font-heading)] text-xl font-semibold tracking-tight text-slate-900">Maintenance Requests</h2>
            <p className="mt-1 text-xs leading-relaxed text-slate-600">Track your requests and resolutions</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 text-teal-600">
              <CreditCard className="h-4 w-4" />
              <p className="text-2xl font-semibold">${creditAvailable}</p>
            </div>
            <p className="text-xs text-slate-600">Credit available</p>
          </div>
        </div>
      </section>

      {/* Credit notice for HVAC issues */}
      {maintenance.filter(m => m.issueType === 'HVAC').length > 0 && (
        <div className="rounded-xl border border-teal-200 bg-teal-50 p-4">
          <p className="text-sm font-medium text-slate-900">We noticed your recent HVAC issues</p>
          <p className="mt-1 text-sm text-slate-700">You received a $500 credit to help make things right. Book an HVAC tune-up to prevent future problems.</p>
        </div>
      )}

      {maintenance.length > 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="space-y-3">
            {maintenance.map((request) => (
              <div key={request.id} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      {request.status === 'open' ? (
                        <AlertCircle className="h-4 w-4 text-amber-600" />
                      ) : (
                        <Wrench className="h-4 w-4 text-slate-600" />
                      )}
                      <h3 className="text-base font-semibold text-slate-900">{request.issueTitle}</h3>
                    </div>
                    <div className="mt-2 space-y-1">
                      <p className="text-sm text-slate-700">{request.description}</p>
                      <p className="text-sm text-slate-600">
                        <span className="font-medium">Type:</span> {request.issueType}
                      </p>
                      <p className="text-sm text-slate-600">
                        <span className="font-medium">Opened:</span>{' '}
                        {request.openedAt instanceof Date 
                          ? request.openedAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                          : 'Date pending'}
                      </p>
                      {request.status === 'closed' && request.resolvedAt && (
                        <p className="text-sm text-slate-600">
                          <span className="font-medium">Resolved:</span>{' '}
                          {request.resolvedAt instanceof Date 
                            ? request.resolvedAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                            : 'Date pending'}
                          {' '}(in {request.resolutionDays} day{request.resolutionDays !== 1 ? 's' : ''})
                        </p>
                      )}
                      {request.repeatIssue && (
                        <Badge className="mt-1 border-amber-200 bg-amber-50 text-amber-700" variant="secondary">
                          Repeat Issue
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Badge 
                    className={`${
                      request.status === 'open' 
                        ? 'border-amber-200 bg-amber-50 text-amber-700' 
                        : 'border-emerald-200 bg-emerald-50 text-emerald-700'
                    }`} 
                    variant="secondary"
                  >
                    {request.status === 'open' ? 'Open' : 'Resolved'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <Wrench className="h-7 w-7" />
            </div>
            <h3 className="mt-4 text-base font-semibold text-slate-900">No maintenance requests</h3>
            <p className="mt-2 text-sm text-slate-600">All systems operational. Submit a request if you need assistance.</p>
            <Button className="mt-4" data-testid="new-request-button">
              New Request
            </Button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
