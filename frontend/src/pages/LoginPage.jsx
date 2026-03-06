import { useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";

import { DemoAccountCards } from "@/components/auth/DemoAccountCards";
import { LoginForm } from "@/components/auth/LoginForm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

  const readyForAdmin = useMemo(
    () => session?.authenticated && session?.role === "admin",
    [session],
  );

  if (loading) {
    return <div className="min-h-screen bg-background" data-testid="login-page-loading-state" />;
  }

  if (readyForAdmin) {
    return <Navigate replace to="/app/admin/diagnostics" />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      const response = await login({ email, password });
      const role = response?.session?.role;

      if (role === "admin") {
        toast.success("Signed in. Opening diagnostics.");
        return;
      }

      toast.message(
        "Authentication foundation is live, but only the admin diagnostics shell is implemented in Phase 4.",
      );
    } catch (error) {
      const message = error?.response?.data?.detail || "Unable to sign in.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  if (session?.authenticated && session?.role !== "admin") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-6 py-10">
        <Card className="happyco-card max-w-xl" data-testid="login-non-admin-session-card">
          <CardHeader>
            <CardTitle className="text-2xl tracking-[-0.02em]">Role authenticated</CardTitle>
            <CardDescription>
              Your secure session is active, but only the admin diagnostics shell is available in this phase.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-xl border border-border/80 bg-muted/40 p-4 text-sm text-muted-foreground" data-testid="login-non-admin-session-message">
              Signed in as <span className="font-medium text-foreground">{session.display_name || session.email}</span> with role <span className="font-medium text-foreground">{session.role}</span>.
            </div>
            <Button className="w-full" data-testid="login-non-admin-sign-out-button" onClick={logout} type="button">
              Sign out
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-4 py-6 sm:px-6 lg:px-8" data-testid="login-page-root">
      <div className="teal-mist mx-auto grid min-h-[calc(100vh-3rem)] max-w-[1400px] gap-6 rounded-[28px] border border-border/70 bg-card/60 p-4 backdrop-blur lg:grid-cols-[minmax(0,1fr)_420px] lg:p-6">
        <section className="flex flex-col justify-between gap-8 rounded-[24px] bg-card/90 p-6 sm:p-8">
          <div className="space-y-6">
            <Badge className="w-fit bg-primary/10 text-primary" data-testid="login-page-phase-badge" variant="secondary">
              Phase 4 foundation
            </Badge>
            <div>
              <p className="text-sm uppercase tracking-[0.08em] text-muted-foreground">AI Concierge Platform for Multifamily Operations</p>
              <h1 className="mt-3 max-w-3xl font-[var(--font-heading)] text-4xl font-semibold tracking-[-0.02em] text-foreground sm:text-5xl">
                Environment-safe diagnostics from day one.
              </h1>
              <p className="mt-4 max-w-2xl text-base text-muted-foreground">
                Secure cookie authentication, explicit APP_ENV control, and one database binding per deployment are now wired before the broader admin experience is rebuilt.
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

          <div className="grid gap-3 rounded-2xl border border-border/80 bg-muted/40 p-4 text-sm text-muted-foreground sm:grid-cols-2" data-testid="login-page-foundation-highlights">
            <p>• APP_ENV is the only primary environment selector</p>
            <p>• Diagnostics reveals host, DB name, user, role, and collection counts</p>
            <p>• Preview reset is protected but not implemented yet</p>
            <p>• Production bootstrap stays deployment-time only</p>
          </div>
        </section>

        <aside className="grid gap-6 rounded-[24px] bg-card/88 p-6 sm:p-8">
          <LoginForm
            email={email}
            onEmailChange={setEmail}
            onPasswordChange={setPassword}
            onSubmit={handleSubmit}
            password={password}
            session={session}
            submitting={submitting}
          />

          {session?.demo_mode_enabled ? (
            <div className="space-y-4" data-testid="login-demo-access-panel">
              <div>
                <p className="font-[var(--font-heading)] text-lg font-semibold tracking-[-0.02em] text-foreground">Demo Access</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Select a demo account on the right to auto-fill credentials.
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
        </aside>
      </div>
    </div>
  );
}
