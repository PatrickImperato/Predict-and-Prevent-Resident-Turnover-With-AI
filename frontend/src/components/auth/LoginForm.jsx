import { LoaderCircle, LockKeyhole, Mail } from "lucide-react";

import { EnvironmentBadge } from "@/components/layout/EnvironmentBadge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const LoginForm = ({
  email,
  onEmailChange,
  onSubmit,
  onPasswordChange,
  password,
  session,
  submitting,
}) => {
  return (
    <Card className="happyco-card border-border/80 bg-card/96" data-testid="login-form-card">
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <CardTitle className="text-3xl tracking-[-0.02em]">Welcome back</CardTitle>
            <CardDescription className="mt-2 text-base">
              Sign in to access the platform
            </CardDescription>
          </div>
          <EnvironmentBadge appEnv={session.app_env} dataTestId="login-environment-badge" />
        </div>
      </CardHeader>
      <CardContent>
        <form className="space-y-5" data-testid="login-form" onSubmit={onSubmit}>
          <div className="space-y-2">
            <Label data-testid="login-email-label" htmlFor="email-address">
              Email address
            </Label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" strokeWidth={1.75} />
              <Input
                autoComplete="email"
                className="h-11 rounded-xl border-border/80 bg-background pl-10"
                data-testid="login-email-input"
                id="email-address"
                onChange={(event) => onEmailChange(event.target.value)}
                placeholder="admin@happyco.com"
                type="email"
                value={email}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label data-testid="login-password-label" htmlFor="password">
              Password
            </Label>
            <div className="relative">
              <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" strokeWidth={1.75} />
              <Input
                autoComplete="current-password"
                className="h-11 rounded-xl border-border/80 bg-background pl-10"
                data-testid="login-password-input"
                id="password"
                onChange={(event) => onPasswordChange(event.target.value)}
                placeholder="••••••••"
                type="password"
                value={password}
              />
            </div>
          </div>

          <div className="rounded-xl border border-border/80 bg-muted/60 p-4 text-sm text-muted-foreground" data-testid="login-form-phase-note">
            Admin routes are available now. Manager and resident experiences arrive in a later phase.
          </div>

          <Button className="h-11 w-full rounded-xl" data-testid="login-form-submit-button" disabled={submitting} type="submit">
            {submitting ? (
              <>
                <LoaderCircle className="h-4 w-4 animate-spin" strokeWidth={1.75} />
                Signing in
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
