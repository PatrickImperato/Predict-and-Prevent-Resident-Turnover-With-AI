import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";

import { DemoAccountCards } from "@/components/auth/DemoAccountCards";
import { LoginForm } from "@/components/auth/LoginForm";
import { CookieNoticeBar } from "@/components/public/CookieNoticeBar";
import { PublicFooter } from "@/components/public/PublicFooter";
import { Badge } from "@/components/ui/badge";
import { CountUp } from "@/components/ui/count-up";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/AuthContext";
import { publicApi } from "@/lib/api";

export default function LoginPage() {
  const { loading, login, logout, session } = useAuth();
  const [email, setEmail] = useState("admin@happyco.com");
  const [password, setPassword] = useState("admin123");
  const [submitting, setSubmitting] = useState(false);
  const [overview, setOverview] = useState(null);

  useEffect(() => {
    const loadOverview = async () => {
      try {
        const response = await publicApi.getOverview();
        setOverview(response.data);
      } catch {
        // Keep login available even if public overview fails.
      }
    };

    loadOverview();
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-background" data-testid="login-page-loading-state" />;
  }

  if (session?.authenticated && session?.role === "admin") {
    return <Navigate replace to="/app/admin/dashboard" />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      const response = await login({ email, password });
      const role = response?.session?.role;

      if (role === "admin") {
        toast.success("Signed in. Opening admin workspace.");
        return;
      }

      await logout();
      toast.error("Only the HappyCo Admin route set is implemented in this phase.");
    } catch (error) {
      const message = error?.response?.data?.detail || "Unable to sign in.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  const loginStats = overview?.hero_stats || [];

  return (
    <div className="min-h-screen bg-background" data-testid="login-page-root">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.32 }}
        className="px-4 py-8 sm:px-6 lg:px-8"
      >
        <div className="mx-auto grid min-h-[calc(100vh-10rem)] max-w-[1400px] gap-6 rounded-[28px] border border-border/70 bg-card/60 p-5 shadow-[var(--shadow-soft)] backdrop-blur lg:grid-cols-[440px_minmax(0,1fr)] lg:p-7">
          <motion.aside 
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.32, delay: 0.08, ease: "easeOut" }}
            className="surface-noise rounded-[24px] bg-card/94 p-7 sm:p-9"
          >
            <LoginForm
              email={email}
              onEmailChange={setEmail}
              onPasswordChange={setPassword}
              onSubmit={handleSubmit}
              password={password}
              session={session}
              submitting={submitting}
            />
          </motion.aside>

          <motion.section 
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.32, delay: 0.16, ease: "easeOut" }}
            className="teal-mist flex flex-col justify-between gap-8 rounded-[24px] border border-border/70 bg-card/90 p-7 sm:p-9"
          >
            <div className="space-y-6">
              <Badge className="w-fit bg-primary/10 text-primary" data-testid="login-page-demo-access-badge" variant="secondary">
                Demo Access
              </Badge>
              <div>
                <p className="text-sm uppercase tracking-[0.08em] text-muted-foreground">AI Concierge Platform for Multifamily Operations</p>
                <h1 className="mt-3 max-w-3xl font-[var(--font-heading)] text-4xl font-semibold tracking-[-0.02em] text-foreground sm:text-5xl">
                  Sign in to explore the current preview experience.
                </h1>
                <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
                  Use the seeded demo accounts below to authenticate against the secure cookie session foundation. The admin shell now includes seeded dashboard and flagship property read models driven by backend data.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3" data-testid="login-page-stats-grid">
                {overview
                  ? loginStats.map((stat, index) => (
                      <motion.div
                        key={stat.key}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.24, delay: 0.3 + index * 0.06 }}
                        className="happyco-card rounded-2xl border-border/80 bg-muted/35 p-5"
                        data-testid={`login-page-stat-${stat.key}`}
                      >
                        <p className="font-[var(--font-heading)] text-2xl font-semibold tracking-[-0.02em] text-foreground">
                          {stat.value.replace(/[^\d]/g, '') ? (
                            <CountUp 
                              end={parseInt(stat.value.replace(/[^\d]/g, ''))} 
                              prefix={stat.value.match(/^\$/)?'$':''}
                              suffix={stat.value.match(/%/)?'%':''} 
                              duration={1000}
                            />
                          ) : stat.value}
                        </p>
                        <p className="mt-2 text-sm font-medium text-muted-foreground">{stat.label}</p>
                      </motion.div>
                    ))
                  : Array.from({ length: 3 }).map((_, index) => <Skeleton className="h-28 rounded-2xl" key={index} />)}
              </div>
            </div>

            {session?.demo_mode_enabled ? (
              <motion.div 
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28, delay: 0.5 }}
                className="space-y-4" 
                data-testid="login-demo-access-panel"
              >
                <div>
                  <p className="font-[var(--font-heading)] text-lg font-semibold tracking-[-0.02em] text-foreground">Select a demo account to auto-fill credentials</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Admin continues into dashboard and properties. Manager and resident accounts authenticate, then redirect back because those route sets remain deferred.
                  </p>
                </div>
                <DemoAccountCards
                  onSelect={(account) => {
                    setEmail(account.email);
                    setPassword(account.password);
                    toast.message(`${account.label} credentials applied.`);
                  }}
                />
              </motion.div>
            ) : (
              <div className="rounded-xl border border-border/80 bg-muted/40 p-4 text-sm text-muted-foreground" data-testid="login-demo-access-disabled">
                Demo account shortcuts are hidden outside preview.
              </div>
            )}
          </motion.section>
        </div>
      </motion.div>

      <PublicFooter />
      <CookieNoticeBar notice={overview?.cookie_notice} />
    </div>
  );
}
