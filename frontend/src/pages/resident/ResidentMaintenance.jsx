import { motion } from "framer-motion";
import { EmptyState } from "@/components/ui/empty-state";
import { Wrench } from "lucide-react";

export default function ResidentMaintenance() {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.24 }} className="space-y-8">
      <section className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="font-[var(--font-heading)] text-[28px] font-semibold tracking-tight text-slate-900">Maintenance Requests</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">Track your maintenance requests and resolutions.</p>
      </section>
      <EmptyState icon={Wrench} title="No maintenance requests" description="All systems operational. Submit a request if you need assistance." actionLabel="New Request" onAction={() => {}} />
    </motion.div>
  );
}
