import { useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";

import { DemoAccountCards } from "@/components/auth/DemoAccountCards";
import { LoginForm } from "@/components/auth/LoginForm";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";

const stats = [
  { label: "Units Managed", value: "300" },
  { label: "Active Residents", value: "60" },
  { label: "Requests Managed", value: "1,200+" },
];

export default function LoginPage() {
  const { loading, login, logout, session } = useAuth();
  const [email, setEmail] = useState("admin@happyco.com");
  const [password, setPassword] = useState("admin123");
  const [submitting, setSubmitting] = useState(false);

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

  return (
    <div className="min-h-screen bg-background px-4 py-6 sm:px-6 lg:px-8" data-testid="login-page-root">
      <div className="mx-auto grid min-h-[calc(100vh-3rem)] max-w-[1400px] gap-6 rounded-[28px] border border-border/70 bg-card/60 p-4 shadow-[var(--shadow-soft)] backdrop-blur lg:grid-cols-[420px_minmax(0,1fr)] lg:p-6">
        <aside className="surface-noise rounded-[24px] bg-card/94 p-6 sm:p-8">
          <LoginForm
            email={email}
            onEmailChange={setEmail}
            onPasswordChange={setPassword}
            onSubmit={handleSubmit}
            password={password}
            session={session}
            submitting={submitting}
          />
        </aside>

        <section className="teal-mist flex flex-col justify-between gap-8 rounded-[24px] border border-border/70 bg-card/90 p-6 sm:p-8">
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
                Use the seeded demo accounts below to authenticate against the secure cookie session foundation. Only the HappyCo Admin shell is available in this phase.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3" data-testid="login-page-stats-grid">
              {stats.map((stat) => (
                <div className="happyco-card rounded-2xl border-border/80 bg-muted/35 p-4" data-testid={`login-page-stat-${stat.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} key={stat.label}>
                  <p className="font-[var(--font-heading)] text-2xl font-semibold tracking-[-0.02em] text-foreground">{stat.value}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {session?.demo_mode_enabled ? (
            <div className="space-y-4" data-testid="login-demo-access-panel">
              <div>
                <p className="font-[var(--font-heading)] text-lg font-semibold tracking-[-0.02em] text-foreground">Select a demo account on the right to auto-fill credentials</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Admin can continue into the shell. Manager and resident accounts authenticate, then redirect back because those route sets are not implemented yet.
                </p>
              </div>
              <DemoAccountCards
                onSelect={(account) => {
                  setEmail(account.email);
                  setPassword(account.password);
                  toast.message(`${account.label} credentials applied.`);
                }}
              />
            </div>
          ) : (
            <div className="rounded-xl border border-border/80 bg-muted/40 p-4 text-sm text-muted-foreground" data-testid="login-demo-access-disabled">
              Demo account shortcuts are hidden outside preview.
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
