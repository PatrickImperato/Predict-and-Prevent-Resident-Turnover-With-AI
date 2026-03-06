import { motion } from "framer-motion";
import { EmptyState } from "@/components/ui/empty-state";
import { Calendar } from "lucide-react";

export default function ResidentBookings() {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.24 }} className="space-y-8">
      <section className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="font-[var(--font-heading)] text-[28px] font-semibold tracking-tight text-slate-900">My Bookings</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">View your service bookings and appointment history.</p>
      </section>
      <EmptyState icon={Calendar} title="No bookings yet" description="Explore services and schedule your first visit." actionLabel="Browse Services" onAction={() => window.location.href = '/app/resident/services'} />
    </motion.div>
  );
}
