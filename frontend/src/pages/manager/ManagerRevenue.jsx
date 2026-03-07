import { motion } from "framer-motion";
import { DollarSign, TrendingUp, TrendingDown } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, LineChart, Legend } from "recharts";

import { Badge } from "@/components/ui/badge";
import { getSarahManagedProperty, getSarahPropertyRevenue } from "@/lib/canonicalData";

export default function ManagerRevenue() {
  const property = getSarahManagedProperty();
  const revenueData = getSarahPropertyRevenue();

  // Calculate summary metrics
  const currentMonth = revenueData[revenueData.length - 1];
  const previousMonth = revenueData[revenueData.length - 2];
  const totalGrossRevenue = revenueData.reduce((sum, m) => sum + m.grossRevenue, 0);
  const totalCredits = revenueData.reduce((sum, m) => sum + m.creditsIssued, 0);
  const totalNetRevenue = revenueData.reduce((sum, m) => sum + m.netRevenue, 0);
  const totalBookings = revenueData.reduce((sum, m) => sum + m.bookingsCompleted, 0);

  const revenueChange = currentMonth.netRevenue - previousMonth.netRevenue;
  const revenueChangePercent = ((revenueChange / previousMonth.netRevenue) * 100).toFixed(1);
  const isRevenueUp = revenueChange > 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: "easeOut" }}
      className="space-y-6"
      data-testid="manager-revenue-page"
    >
      {/* Header */}
      <section className="rounded-lg border border-border/60 bg-card p-6 shadow-sm">
        <Badge className="mb-3 w-fit border-teal-200 bg-teal-50 text-teal-700 hover:bg-teal-50" variant="secondary">
          Financial Performance
        </Badge>
        <h2 className="font-[var(--font-heading)] text-3xl font-semibold tracking-[-0.02em] text-foreground">
          Revenue
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Track service revenue, credit investments, and net ROI for {property?.name}. Revenue generated from 
          resident bookings through the HappyCo concierge platform.
        </p>
      </section>

      {/* Summary Metrics */}
      <section className="grid gap-6 md:grid-cols-4">
        <div className="saas-metric-card">
          <p className="metric-label">Total Gross Revenue</p>
          <p className="metric-value mt-3 text-teal-600">${totalGrossRevenue.toLocaleString()}</p>
          <p className="metric-detail mt-2">Last 4 months</p>
        </div>
        <div className="saas-metric-card">
          <p className="metric-label">Credits Issued</p>
          <p className="metric-value mt-3">${totalCredits.toLocaleString()}</p>
          <p className="metric-detail mt-2">Retention investment</p>
        </div>
        <div className="saas-metric-card">
          <p className="metric-label">Net Revenue</p>
          <p className="metric-value mt-3 text-teal-700">${totalNetRevenue.toLocaleString()}</p>
          <p className="metric-detail mt-2">After credits</p>
        </div>
        <div className="saas-metric-card">
          <p className="metric-label">Total Bookings</p>
          <p className="metric-value mt-3">{totalBookings}</p>
          <p className="metric-detail mt-2">Completed services</p>
        </div>
      </section>

      {/* Revenue Trend */}
      <section className="saas-card">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Revenue Trend</h3>
            <p className="mt-1 text-sm text-muted-foreground">Monthly gross revenue, credits, and net revenue</p>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-border bg-muted px-3 py-2">
            {isRevenueUp ? (
              <TrendingUp className="h-4 w-4 text-teal-600" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-600" />
            )}
            <span className={`text-sm font-semibold ${isRevenueUp ? 'text-teal-600' : 'text-red-600'}`}>
              {isRevenueUp ? '+' : ''}{revenueChangePercent}%
            </span>
            <span className="text-sm text-muted-foreground">vs last month</span>
          </div>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12, fill: '#64748b' }}
                axisLine={{ stroke: '#cbd5e1' }}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: '#64748b' }}
                axisLine={{ stroke: '#cbd5e1' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e2e8f0', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Legend />
              <Bar dataKey="grossRevenue" fill="#14b8a6" name="Gross Revenue" radius={[4, 4, 0, 0]} />
              <Bar dataKey="creditsIssued" fill="#f97316" name="Credits Issued" radius={[4, 4, 0, 0]} />
              <Bar dataKey="netRevenue" fill="#0d9488" name="Net Revenue" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Monthly Breakdown */}
      <section className="saas-card">
        <h3 className="mb-4 text-lg font-semibold text-foreground">Monthly Breakdown</h3>
        <div className="space-y-3">
          {revenueData.slice().reverse().map((month, index) => {
            const isCurrentMonth = index === 0;
            return (
              <div 
                key={month.month} 
                className={`rounded-lg border border-border p-4 ${isCurrentMonth ? 'bg-teal-50 border-teal-200' : 'bg-muted/40'}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h4 className="font-semibold text-foreground">{month.month}</h4>
                      {isCurrentMonth && (
                        <Badge className="border-teal-200 bg-teal-50 text-teal-700 text-xs">Current</Badge>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{month.bookingsCompleted} completed bookings</p>
                  </div>
                  <div className="grid grid-cols-3 gap-8 text-right">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">Gross</p>
                      <p className="mt-1 text-lg font-semibold text-foreground">${month.grossRevenue.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">Credits</p>
                      <p className="mt-1 text-lg font-semibold text-orange-600">${month.creditsIssued.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">Net</p>
                      <p className="mt-1 text-lg font-semibold text-teal-600">${month.netRevenue.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </motion.div>
  );
}
