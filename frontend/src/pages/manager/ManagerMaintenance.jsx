import { motion } from "framer-motion";
import { EmptyState } from "@/components/ui/empty-state";
import { Wrench } from "lucide-react";

export default function ManagerMaintenance() {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.24 }} className="space-y-6">
      <section className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="font-[var(--font-heading)] text-[28px] font-semibold tracking-tight text-slate-900">Maintenance</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">Track maintenance requests, response times, and resolution patterns.</p>
      </section>
      <EmptyState icon={Wrench} title="Maintenance dashboard" description="Maintenance tracking and analytics coming soon." />
    </motion.div>
  );
}
