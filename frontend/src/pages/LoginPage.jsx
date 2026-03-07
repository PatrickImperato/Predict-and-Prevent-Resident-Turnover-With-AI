import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Sparkles, TrendingUp, Users, DollarSign } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";

const DEMO_ROLES = [
  {
    id: "manager",
    title: "Property Manager",
    description: "Turnover risk and retention interventions",
    email: "sarah.mitchell@riverside.com",
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
  const { loading, login, session } = useAuth();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  // Check for session expiration message
  useEffect(() => {
    if (location.state?.sessionExpired) {
      toast.error("Your session has expired. Please sign in again.", {
        className: "border-amber-200 bg-amber-50 text-amber-900"
      });
    }
  }, [location]);

  if (loading) {
    return <div className="min-h-screen bg-background" data-testid="login-page-loading-state" />;
  }

  // Redirect authenticated users to their role-specific dashboard or intended destination
  if (session?.authenticated) {
    const returnTo = location.state?.from;
    
    // If there's a return URL and it's allowed for this role, go there
    if (returnTo && returnTo !== "/login") {
      return <Navigate replace to={returnTo} />;
    }
    
    // Otherwise go to role-specific dashboard
    if (session?.role === "admin") {
      return <Navigate replace to="/app/admin/dashboard" />;
    }
    if (session?.role === "manager") {
      return <Navigate replace to="/app/manager/dashboard" />;
    }
    if (session?.role === "resident") {
      return <Navigate replace to="/app/resident/dashboard" />;
    }
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
      } else if (role === "manager") {
        toast.success("Signed in. Opening property manager workspace.", {
          className: "border-teal-200 bg-teal-50 text-teal-900"
        });
      } else if (role === "resident") {
        toast.success("Signed in. Opening resident dashboard.", {
          className: "border-teal-200 bg-teal-50 text-teal-900"
        });
      }
      
      // Navigation happens via redirect above
    } catch (error) {
      const message = error?.response?.data?.detail || error?.message || "Invalid email or password. Please check your credentials and try again.";
      toast.error(message, {
        className: "border-red-200 bg-red-50 text-red-900",
        duration: 5000
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleRoleCardClick = (role) => {
    setEmail(role.email);
    setPassword(role.password);
    setSelectedRole(role.id);
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
              <Link to="/" className="text-[15px] font-medium text-muted-foreground transition-colors hover:text-foreground">
                Back to Overview
              </Link>
              <Link to="/legal" className="text-[15px] font-medium text-muted-foreground transition-colors hover:text-foreground">
                Legal
              </Link>
              <Button asChild size="sm" className="h-11 rounded-full bg-primary px-7 text-[15px] font-semibold shadow-none hover:bg-primary/90">
                <Link to="/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="grid h-screen lg:grid-cols-[minmax(0,540px)_minmax(0,1fr)]">
        {/* Left Side: Login Form */}
        <div className="relative flex items-center justify-center bg-background px-8 py-12 lg:px-12">
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
              <p className="mt-3 text-[16px] text-muted-foreground">
                Sign in to access the platform
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[14px] font-medium text-foreground">
                  Email
                </Label>
                <Input
                  autoComplete="email"
                  className="h-11 text-[15px]"
                  data-testid="login-email-input"
                  disabled={submitting}
                  id="email"
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  required
                  type="email"
                  value={email}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-[14px] font-medium text-foreground">
                  Password
                </Label>
                <Input
                  autoComplete="current-password"
                  className="h-11 text-[15px]"
                  data-testid="login-password-input"
                  disabled={submitting}
                  id="password"
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  required
                  type="password"
                  value={password}
                />
              </div>

              <Button
                className="h-11 w-full text-[15px] font-semibold"
                data-testid="login-submit-button"
                disabled={submitting}
                type="submit"
              >
                {submitting ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-8">
              <p className="text-[13px] font-medium text-muted-foreground">
                Demo environment • Concept demonstration
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Demo Access */}
        <div className="hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 lg:flex flex-col justify-center px-16">
          <div className="max-w-lg">
            <Badge className="mb-5 border-teal-400 bg-teal-500/20 text-teal-300 hover:bg-teal-500/20" variant="secondary">
              Demo Access
            </Badge>
            <h2 className="font-[var(--font-heading)] text-5xl font-semibold tracking-[-0.03em] text-white">
              AI Concierge Platform for Multifamily Operations
            </h2>

            {/* Platform Metrics */}
            <div className="mt-10 grid grid-cols-3 gap-6">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                <p className="text-sm font-medium text-slate-400">Avg. turnover cost</p>
                <p className="mt-2 font-[var(--font-heading)] text-3xl font-semibold tracking-tight text-white">
                  $3,800
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                <p className="text-sm font-medium text-slate-400">Annual turnover rate</p>
                <p className="mt-2 font-[var(--font-heading)] text-3xl font-semibold tracking-tight text-teal-400">
                  10–15%
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                <p className="text-sm font-medium text-slate-400">Portfolio ROI example</p>
                <p className="mt-2 font-[var(--font-heading)] text-3xl font-semibold tracking-tight text-teal-400">
                  $496K
                </p>
              </div>
            </div>

            {/* Demo Roles */}
            <div className="mt-12">
              <p className="text-[15px] font-semibold text-white">
                Select a demo account to auto-fill credentials and explore the product experience.
              </p>
              
              <div className="mt-6 space-y-4">
                {DEMO_ROLES.map((role, index) => {
                  const Icon = role.icon;
                  const isSelected = selectedRole === role.id;
                  
                  return (
                    <motion.button
                      key={role.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                      onClick={() => handleRoleCardClick(role)}
                      className={`w-full rounded-2xl border p-6 text-left backdrop-blur-sm transition-all active:scale-[0.98] ${
                        isSelected 
                          ? "border-teal-500 bg-teal-500/10" 
                          : "border-white/10 bg-white/5 hover:border-teal-500/50 hover:bg-white/10"
                      }`}
                      data-testid={`demo-role-${role.id}`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ${
                          isSelected ? "bg-teal-500/30 text-teal-300" : "bg-teal-500/20 text-teal-400"
                        }`}>
                          <Icon className="h-6 w-6" strokeWidth={2} />
                        </div>
                        <div className="flex-1">
                          <p className="text-lg font-semibold text-white">{role.title}</p>
                          <p className="mt-1 text-[14px] text-slate-400">{role.description}</p>
                          <div className="mt-3 flex items-center gap-4 text-[13px]">
                            <p className="text-slate-500">Email: <span className="text-slate-300">{role.email}</span></p>
                            <p className="text-slate-500">Pass: <span className="text-slate-300">{role.password}</span></p>
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Footer Note */}
            <div className="mt-12 rounded-xl border border-white/10 bg-white/5 p-5">
              <p className="text-[13px] leading-relaxed text-slate-400">
                © Tima Travel Media LLC. All rights reserved. Proprietary concept demonstration. 
                HappyCo is a trademark of HappyCo, Inc.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
