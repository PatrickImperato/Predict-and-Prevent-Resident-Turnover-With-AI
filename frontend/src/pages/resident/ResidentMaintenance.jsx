import { motion } from "framer-motion";
import { Wrench, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAlexMaintenance } from "@/lib/canonicalData";

export default function ResidentMaintenance() {
  const maintenance = getAlexMaintenance();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 8 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.24 }} 
      className="space-y-8"
      data-testid="resident-maintenance-root"
    >
      <section className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="font-[var(--font-heading)] text-[28px] font-semibold tracking-tight text-slate-900">Maintenance Requests</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">Track your maintenance requests and resolutions.</p>
      </section>

      {maintenance.length > 0 ? (
        <div className="saas-card">
          <div className="space-y-4">
            {maintenance.map((request) => (
              <div key={request.id} className="rounded-lg border border-slate-200 bg-slate-50 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      {request.status === 'open' ? (
                        <AlertCircle className="h-5 w-5 text-amber-600" />
                      ) : (
                        <Wrench className="h-5 w-5 text-slate-600" />
                      )}
                      <h3 className="text-lg font-semibold text-slate-900">{request.issueTitle}</h3>
                    </div>
                    <div className="mt-3 space-y-1">
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
                        <Badge className="mt-2 border-amber-200 bg-amber-50 text-amber-700" variant="secondary">
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
        <div className="saas-card">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <Wrench className="h-8 w-8" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-slate-900">No maintenance requests</h3>
            <p className="mt-2 text-sm text-slate-600">All systems operational. Submit a request if you need assistance.</p>
            <Button className="mt-6" data-testid="new-request-button">
              New Request
            </Button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
