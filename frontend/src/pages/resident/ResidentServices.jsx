import { motion } from "framer-motion";
import { EmptyState } from "@/components/ui/empty-state";
import { Sparkles } from "lucide-react";

export default function ResidentServices() {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.24 }} className="space-y-8">
      <section className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="font-[var(--font-heading)] text-[28px] font-semibold tracking-tight text-slate-900">Services Marketplace</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">Browse and book premium services for your unit.</p>
      </section>
      <EmptyState icon={Sparkles} title="Services marketplace" description="Service browsing and booking interface coming soon." />
    </motion.div>
  );
}
