import { useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Sparkles, TrendingUp, Users, DollarSign } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CookieNoticeBar } from "@/components/public/CookieNoticeBar";
import { PublicFooter } from "@/components/public/PublicFooter";
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
    <div className="min-h-screen bg-background" data-testid="login-page-root">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left Side: Login Form */}
        <div className="flex items-center justify-center px-6 py-12 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md"
          >
            <div className="mb-8">
              <div className="mb-6 flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Sparkles className="h-5 w-5" strokeWidth={2} />
                </div>
                <p className="font-[var(--font-heading)] text-lg font-semibold tracking-tight text-foreground">
                  HappyCo Concierge
                </p>
              </div>
              <h1 className="font-[var(--font-heading)] text-3xl font-semibold tracking-[-0.02em] text-foreground">
                Welcome back
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
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
                  className="h-10"
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
                  className="h-10"
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
                className="h-10 w-full text-sm"
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
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwxfHxjaXR5JTIwYnVpbGRpbmdzJTIwc2t5bGluZSUyMGJsdWV8ZW58MHx8fHRlYWx8MTc3Mjc3MTE4Nnww&ixlib=rb-4.1.0&q=85"
              alt="City skyline"
              className="h-full w-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-slate-900/90 to-slate-800/85"></div>
          </div>

          <div className="relative flex h-full flex-col justify-between p-12">
            {/* Top: Platform Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <Badge className="mb-5 border-primary/30 bg-primary/10 text-primary" variant="secondary">
                Demo Access
              </Badge>
              <h2 className="font-[var(--font-heading)] text-3xl font-semibold tracking-[-0.02em] text-white">
                AI Concierge Platform for Multifamily Operations
              </h2>
              
              {/* Summary Metrics */}
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                  <p className="font-[var(--font-heading)] text-xl font-semibold tracking-tight text-white">35</p>
                  <p className="mt-1 text-xs text-white/60">At-risk residents</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                  <p className="font-[var(--font-heading)] text-xl font-semibold tracking-tight text-teal-400">$82,550</p>
                  <p className="mt-1 text-xs text-white/60">Net retention ROI</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                  <p className="font-[var(--font-heading)] text-xl font-semibold tracking-tight text-white">6.55x</p>
                  <p className="mt-1 text-xs text-white/60">ROI multiple</p>
                </div>
              </div>
            </motion.div>

            {/* Bottom: Demo Role Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <p className="mb-4 text-sm font-medium text-white/80">
                Select a demo account to auto-fill credentials
              </p>
              <div className="grid gap-3">
                {DEMO_ROLES.map((role, index) => {
                  const Icon = role.icon;
                  return (
                    <motion.button
                      key={role.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                      onClick={() => handleRoleCardClick(role)}
                      className="group rounded-lg border border-white/10 bg-white/5 p-4 text-left transition-all hover:border-primary/30 hover:bg-white/10 active:scale-[0.98]"
                      data-testid={`demo-role-card-${role.id}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 text-primary transition-colors group-hover:bg-primary/30">
                          <Icon className="h-5 w-5" strokeWidth={2} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-white">{role.title}</p>
                          <p className="mt-1 text-xs text-white/60">{role.description}</p>
                          <div className="mt-2 space-y-1">
                            <p className="text-xs text-white/50">Email: {role.email}</p>
                            <p className="text-xs text-white/50">Pass: {role.password}</p>
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

      <PublicFooter />
      <CookieNoticeBar />
    </div>
  );
}
