import { useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Sparkles, TrendingUp, Users, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";

const DEMO_ROLES = [
  {
    id: "manager",
    title: "Property Manager",
    description: "Churn risk and retention interventions",
    email: "manager@riverside.com",
    password: "manager123",
    icon: TrendingUp
  },
  {
    id: "resident",
    title: "Resident Experience",
    description: "AI concierge and service booking",
    email: "alex.chen@email.com",
    password: "demo123",
    icon: Users
  },
  {
    id: "admin",
    title: "HappyCo Admin",
    description: "Portfolio analytics and ROI",
    email: "admin@happyco.com",
    password: "admin123",
    icon: DollarSign
  }
];

export default function LoginPage() {
  const { loading, login, logout, session } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        toast.success("Signed in. Opening admin workspace.", {
          className: "border-teal-200 bg-teal-50 text-teal-900"
        });
        return;
      }

      await logout();
      toast.error("Only the HappyCo Admin route set is implemented in this phase.", {
        className: "border-red-200 bg-red-50 text-red-900"
      });
    } catch (error) {
      const message = error?.response?.data?.detail || "Unable to sign in.";
      toast.error(message, {
        className: "border-red-200 bg-red-50 text-red-900"
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleRoleCardClick = (role) => {
    setEmail(role.email);
    setPassword(role.password);
    toast.message(`${role.title} credentials applied. Click Sign In to continue.`, {
      className: "border-teal-200 bg-teal-50 text-teal-900"
    });
  };

  return (
    <div className="h-screen overflow-hidden bg-background" data-testid="login-page-root">
      {/* Top Navigation */}
      <header className="absolute top-0 z-50 w-full bg-background/90 backdrop-blur-sm border-b border-border/40">
        <div className="flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <div className="flex w-full max-w-[1400px] mx-auto items-center justify-between">
            {/* Left: Logo - Linked */}
            <Link to="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-80" data-testid="login-brand-link">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Sparkles className="h-[18px] w-[18px]" strokeWidth={2.5} />
              </div>
              <p className="font-[var(--font-heading)] text-[15px] font-semibold tracking-tight text-foreground">
                HappyCo Concierge
              </p>
            </Link>

            {/* Right: Actions */}
            <div className="flex items-center gap-3">
              <Link to="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                Back to Overview
              </Link>
              <Link to="/legal" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                Legal
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="grid h-screen lg:grid-cols-[minmax(0,540px)_minmax(0,1fr)]">
        {/* Left Side: Login Form */}
        <div className="flex items-center justify-center bg-background px-8 py-12 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md"
          >
            <div className="mb-8">
              <h1 className="font-[var(--font-heading)] text-4xl font-semibold tracking-[-0.02em] text-foreground">
                Welcome back
              </h1>
              <p className="mt-2 text-base text-muted-foreground">
                Sign in to access the platform
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email
                </Label>
                <Input
                  autoComplete="email"
                  className="h-11"
                  data-testid="login-email-input"
                  disabled={submitting}
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  type="email"
                  value={email}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-foreground">
                  Password
                </Label>
                <Input
                  autoComplete="current-password"
                  className="h-11"
                  data-testid="login-password-input"
                  disabled={submitting}
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  type="password"
                  value={password}
                />
              </div>

              <Button
                className="h-11 w-full bg-primary text-sm font-medium shadow-none hover:bg-primary/90"
                data-testid="login-submit-button"
                disabled={submitting}
                type="submit"
              >
                {submitting ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </motion.div>
        </div>

        {/* Right Side: Demo Access Panel */}
        <div className="relative hidden overflow-hidden bg-slate-900 lg:block">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwxfHxjaXR5JTIwYnVpbGRpbmdzJTIwc2t5bGluZSUyMGJsdWV8ZW58MHx8fHx0ZWFsfDE3NzI3NzExODZ8MA&ixlib=rb-4.1.0&q=85"
              alt="City skyline"
              className="h-full w-full object-cover"
              style={{ filter: 'contrast(1.15) brightness(0.65)' }}
            />
            <div className="absolute inset-0 bg-slate-900/97"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-950/90 via-slate-900/90 to-slate-900/85"></div>
          </div>

          <div className="relative flex h-full flex-col justify-between p-10 pt-24 xl:p-12 xl:pt-28">
            {/* Top: Platform Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <Badge className="mb-4 border-primary/15 bg-primary/8 px-3 py-1 text-[13px] text-primary" variant="secondary">
                Demo Access
              </Badge>
              <h2 className="font-[var(--font-heading)] text-[38px] font-semibold leading-tight tracking-[-0.02em] text-white xl:text-[40px]">
                AI Concierge Platform for Multifamily Operations
              </h2>
              
              {/* Summary Metrics */}
              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-white/6 bg-white/[0.02] p-3.5 backdrop-blur-[3px]">
                  <p className="font-[var(--font-heading)] text-[28px] font-semibold leading-none tracking-tight text-white">35</p>
                  <p className="mt-1.5 text-[13px] font-medium text-white/50">At-risk residents</p>
                </div>
                <div className="rounded-xl border border-primary/12 bg-primary/[0.04] p-3.5 backdrop-blur-[3px]">
                  <p className="font-[var(--font-heading)] text-[28px] font-semibold leading-none tracking-tight text-primary">$82,550</p>
                  <p className="mt-1.5 text-[13px] font-medium text-primary/70">Net retention ROI</p>
                </div>
                <div className="rounded-xl border border-white/6 bg-white/[0.02] p-3.5 backdrop-blur-[3px]">
                  <p className="font-[var(--font-heading)] text-[28px] font-semibold leading-none tracking-tight text-white">6.55x</p>
                  <p className="mt-1.5 text-[13px] font-medium text-white/50">ROI multiple</p>
                </div>
              </div>
            </motion.div>

            {/* Bottom: Demo Role Cards - CLEANER STYLING */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="pb-4"
            >
              <p className="mb-3 text-[15px] font-medium text-white/70">
                Select a demo account to auto fill credentials and explore the product experience.
              </p>
              <div className="space-y-2.5">
                {DEMO_ROLES.map((role, index) => {
                  const Icon = role.icon;
                  return (
                    <motion.button
                      key={role.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.5 + index * 0.08 }}
                      onClick={() => handleRoleCardClick(role)}
                      className="group w-full rounded-xl border border-white/6 bg-white/[0.02] p-3.5 text-left backdrop-blur-[2px] transition-all duration-150 hover:border-white/10 hover:bg-white/[0.03] active:scale-[0.99]"
                      data-testid={`demo-role-card-${role.id}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white/4 text-white/70 transition-colors group-hover:bg-primary/8 group-hover:text-primary">
                          <Icon className="h-[18px] w-[18px]" strokeWidth={2.5} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-[15px] font-semibold text-white">{role.title}</p>
                          <p className="mt-0.5 text-[13px] text-white/50">{role.description}</p>
                          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-0.5 text-[12px]">
                            <p className="text-white/40">
                              <span className="text-white/30">Email:</span> {role.email}
                            </p>
                            <p className="text-white/40">
                              <span className="text-white/30">Pass:</span> {role.password}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Intellectual Property Footer */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-zinc-200 bg-background py-3">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs text-muted-foreground/70">
            © Time Travel Media LLC. All rights reserved. Proprietary concept demonstration. HappyCo is a trademark of HappyCo, Inc.
          </p>
        </div>
      </div>
    </div>
  );
}
