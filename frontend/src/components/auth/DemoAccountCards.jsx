import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const accounts = [
  {
    label: "Property Manager",
    description: "Churn risk and retention interventions",
    email: "manager@riverside.com",
    password: "manager123",
    readiness: "Auth only",
  },
  {
    label: "Resident Experience",
    description: "AI concierge and service booking",
    email: "alex.chen@email.com",
    password: "demo123",
    readiness: "Auth only",
  },
  {
    label: "HappyCo Admin",
    description: "Portfolio analytics and diagnostics",
    email: "admin@happyco.com",
    password: "admin123",
    readiness: "Phase 4 ready",
  },
];

export const DemoAccountCards = ({ onSelect }) => {
  return (
    <div className="grid gap-3" data-testid="login-demo-account-list">
      {accounts.map((account) => (
        <Button
          className="happyco-card happyco-card-hover h-auto justify-start rounded-2xl border border-border/80 bg-card/90 px-4 py-4 text-left text-foreground"
          data-testid={`login-demo-account-${account.label.toLowerCase().replace(/\s+/g, "-")}`}
          key={account.email}
          onClick={() => onSelect(account)}
          type="button"
          variant="ghost"
        >
          <div className="flex w-full flex-col gap-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-[var(--font-heading)] text-base font-semibold tracking-[-0.02em] text-foreground">
                  {account.label}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{account.description}</p>
              </div>
              <Badge
                className={account.readiness === "Phase 4 ready" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}
                data-testid={`login-demo-account-${account.label.toLowerCase().replace(/\s+/g, "-")}-badge`}
                variant="secondary"
              >
                {account.readiness}
              </Badge>
            </div>
            <div className="space-y-1 text-xs text-muted-foreground">
              <p data-testid={`login-demo-account-${account.label.toLowerCase().replace(/\s+/g, "-")}-email`}>
                Email: <span className="font-medium text-foreground">{account.email}</span>
              </p>
              <p data-testid={`login-demo-account-${account.label.toLowerCase().replace(/\s+/g, "-")}-password`}>
                Pass: <span className="font-medium text-foreground">{account.password}</span>
              </p>
            </div>
          </div>
        </Button>
      ))}
    </div>
  );
};
