import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";

export default function ResidentConcierge() {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.24 }} className="space-y-8">
      <section className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="font-[var(--font-heading)] text-[28px] font-semibold tracking-tight text-slate-900">AI Concierge</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">Get personalized assistance and recommendations.</p>
      </section>
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <div className="rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 p-12 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100 text-slate-400">
            <MessageSquare className="h-6 w-6" />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-slate-900">Chat interface coming soon</h3>
          <p className="mt-2 text-sm text-slate-600">AI-powered resident support and service recommendations</p>
        </div>
        <div className="saas-card">
          <h3 className="mb-4 text-lg font-semibold text-slate-900">Quick Actions</h3>
          <div className="space-y-3">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <p className="font-medium text-slate-900">Request Maintenance</p>
              <p className="mt-1 text-sm text-slate-600">Report an issue in your unit</p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <p className="font-medium text-slate-900">Book a Service</p>
              <p className="mt-1 text-sm text-slate-600">Schedule cleaning or repairs</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
