import { useState } from "react";
import { motion } from "framer-motion";
import { Settings, Plus, Trash2, Edit2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { getSarahManagedProperty } from "@/lib/canonicalData";

export default function ManagerRetentionRules() {
  const property = getSarahManagedProperty();
  const [rules, setRules] = useState([
    {
      id: "rule-1",
      name: "High Risk Auto-Deploy",
      description: "Automatically deploy High Priority intervention for residents with risk score >= 80",
      enabled: true,
      tier: "High Priority",
      creditAmount: 500,
      triggerScore: 80
    },
    {
      id: "rule-2",
      name: "Maintenance Escalation",
      description: "Deploy Standard intervention when resident has 3+ open maintenance requests",
      enabled: true,
      tier: "Standard",
      creditAmount: 350,
      triggerCondition: "3+ maintenance requests"
    },
    {
      id: "rule-3",
      name: "Lease Renewal Incentive",
      description: "Offer Light Touch credit 60 days before lease end for medium-risk residents",
      enabled: true,
      tier: "Light Touch",
      creditAmount: 200,
      triggerCondition: "60 days before lease end"
    }
  ]);

  const toggleRule = (ruleId) => {
    setRules(rules.map(rule => 
      rule.id === ruleId ? { ...rule, enabled: !rule.enabled } : rule
    ));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: "easeOut" }}
      className="space-y-6"
      data-testid="manager-retention-rules-page"
    >
      {/* Header */}
      <section className="rounded-lg border border-border/60 bg-card p-6 shadow-sm">
        <Badge className="mb-3 w-fit border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-50" variant="secondary">
          Automation & Rules
        </Badge>
        <h2 className="font-[var(--font-heading)] text-3xl font-semibold tracking-[-0.02em] text-foreground">
          Retention Rules
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Configure automated retention interventions for {property?.name}. Rules trigger based on risk scores, 
          maintenance patterns, and lease timing.
        </p>
      </section>

      {/* Rules List */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Active Rules</h3>
          <Button size="sm" className="h-9 rounded-lg">
            <Plus className="mr-2 h-4 w-4" />
            Add Rule
          </Button>
        </div>

        {rules.map((rule) => (
          <motion.div
            key={rule.id}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg border border-border bg-card p-6 shadow-sm"
            data-testid={`retention-rule-${rule.id}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h4 className="text-lg font-semibold text-foreground">{rule.name}</h4>
                  <Badge className={rule.enabled ? "border-teal-200 bg-teal-50 text-teal-700" : "border-slate-200 bg-slate-50 text-slate-600"}>
                    {rule.enabled ? "Active" : "Disabled"}
                  </Badge>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{rule.description}</p>
                
                {/* Rule Details */}
                <div className="mt-4 flex flex-wrap gap-4">
                  <div className="rounded-lg border border-border bg-muted/40 px-3 py-2">
                    <p className="text-xs font-medium text-muted-foreground">Intervention Tier</p>
                    <p className="mt-1 text-sm font-semibold text-foreground">{rule.tier}</p>
                  </div>
                  <div className="rounded-lg border border-border bg-muted/40 px-3 py-2">
                    <p className="text-xs font-medium text-muted-foreground">Credit Amount</p>
                    <p className="mt-1 text-sm font-semibold text-foreground">${rule.creditAmount}</p>
                  </div>
                  <div className="rounded-lg border border-border bg-muted/40 px-3 py-2">
                    <p className="text-xs font-medium text-muted-foreground">Trigger Condition</p>
                    <p className="mt-1 text-sm font-semibold text-foreground">{rule.triggerScore ? `Score >= ${rule.triggerScore}` : rule.triggerCondition}</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="ml-6 flex flex-col items-end gap-3">
                <Switch 
                  checked={rule.enabled} 
                  onCheckedChange={() => toggleRule(rule.id)}
                  data-testid={`toggle-rule-${rule.id}`}
                />
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="h-8 w-8 p-0 text-red-600 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Info Card */}
      <section className="rounded-lg border border-teal-200 bg-teal-50 p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-teal-600 text-white">
            <Settings className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-foreground">Rule Configuration Best Practices</h4>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Rules are evaluated in order from top to bottom. Only the first matching rule will trigger for each resident. 
              Test new rules in disabled mode before activating to review their impact on the intervention queue.
            </p>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
