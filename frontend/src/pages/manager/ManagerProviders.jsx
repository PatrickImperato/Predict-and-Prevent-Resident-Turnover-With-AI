import { motion } from "framer-motion";
import { EmptyState } from "@/components/ui/empty-state";
import { BriefcaseBusiness } from "lucide-react";

export default function ManagerProviders() {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.24 }} className="space-y-6">
      <section className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="font-[var(--font-heading)] text-[28px] font-semibold tracking-tight text-slate-900">Service Providers</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">Manage service provider network and track performance metrics.</p>
      </section>
      <EmptyState icon={BriefcaseBusiness} title="Providers page" description="Provider management coming soon with ratings, availability, and booking integration." />
    </motion.div>
  );
}
