import { motion } from "framer-motion";
import { Shield, Bell, DollarSign, Users, Zap, Settings as SettingsIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SettingsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: "easeOut" }}
      className="space-y-6"
      data-testid="settings-page-root"
    >
      {/* Header */}
      <section className="rounded-lg border border-border/60 bg-card p-6 shadow-sm">
        <Badge className="mb-3 w-fit border-teal-200 bg-teal-50 text-teal-700 hover:bg-teal-50" variant="secondary">
          Platform Configuration
        </Badge>
        <h2 className="font-[var(--font-heading)] text-3xl font-semibold tracking-[-0.02em] text-foreground">
          Global Settings
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Configure AI risk thresholds, intervention rules, communication defaults, and provider routing preferences across your portfolio.
        </p>
      </section>

      {/* AI Risk Thresholds */}
      <Card className="happyco-card">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-primary" />
            <CardTitle className="text-xl tracking-[-0.02em]">AI Risk Thresholds</CardTitle>
          </div>
          <CardDescription>Configure churn risk scoring and intervention triggers</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="high-risk-threshold">High Risk Threshold</Label>
              <div className="flex items-center gap-3">
                <Input
                  id="high-risk-threshold"
                  type="number"
                  defaultValue="75"
                  min="0"
                  max="100"
                  className="w-24"
                />
                <span className="text-sm text-muted-foreground">Score ≥ 75 triggers immediate outreach</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="medium-risk-threshold">Medium Risk Threshold</Label>
              <div className="flex items-center gap-3">
                <Input
                  id="medium-risk-threshold"
                  type="number"
                  defaultValue="65"
                  min="0"
                  max="100"
                  className="w-24"
                />
                <span className="text-sm text-muted-foreground">Score ≥ 65 triggers monitoring increase</span>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <h4 className="font-semibold text-sm text-foreground mb-3">Churn Model Weights</h4>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              <div>
                <Label className="text-xs">Maintenance Frequency</Label>
                <Input type="number" defaultValue="35" className="mt-1 h-9" />
                <p className="text-xs text-muted-foreground mt-1">Default: 35%</p>
              </div>
              <div>
                <Label className="text-xs">Sentiment Decline</Label>
                <Input type="number" defaultValue="25" className="mt-1 h-9" />
                <p className="text-xs text-muted-foreground mt-1">Default: 25%</p>
              </div>
              <div>
                <Label className="text-xs">Response Time</Label>
                <Input type="number" defaultValue="20" className="mt-1 h-9" />
                <p className="text-xs text-muted-foreground mt-1">Default: 20%</p>
              </div>
              <div>
                <Label className="text-xs">Days to Lease End</Label>
                <Input type="number" defaultValue="10" className="mt-1 h-9" />
                <p className="text-xs text-muted-foreground mt-1">Default: 10%</p>
              </div>
              <div>
                <Label className="text-xs">Service Non-Adoption</Label>
                <Input type="number" defaultValue="10" className="mt-1 h-9" />
                <p className="text-xs text-muted-foreground mt-1">Default: 10%</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Intervention Rules */}
      <Card className="happyco-card">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Zap className="h-5 w-5 text-primary" />
            <CardTitle className="text-xl tracking-[-0.02em]">Intervention Rules</CardTitle>
          </div>
          <CardDescription>AI-driven credit offers and resident re-engagement logic</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-5 md:grid-cols-3">
            <div className="rounded-lg border border-border bg-muted/30 p-4">
              <h4 className="font-semibold text-sm text-foreground mb-2">Tier 1: Low Risk</h4>
              <div className="space-y-2">
                <div>
                  <Label className="text-xs">Min Risk Score</Label>
                  <Input type="number" defaultValue="60" className="mt-1 h-9" />
                </div>
                <div>
                  <Label className="text-xs">Credit Offer</Label>
                  <Input type="number" defaultValue="100" className="mt-1 h-9" placeholder="$" />
                </div>
                <p className="text-xs text-muted-foreground">Preventive engagement</p>
              </div>
            </div>
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
              <h4 className="font-semibold text-sm text-amber-900 mb-2">Tier 2: Medium Risk</h4>
              <div className="space-y-2">
                <div>
                  <Label className="text-xs text-amber-900">Min Risk Score</Label>
                  <Input type="number" defaultValue="70" className="mt-1 h-9" />
                </div>
                <div>
                  <Label className="text-xs text-amber-900">Credit Offer</Label>
                  <Input type="number" defaultValue="250" className="mt-1 h-9" placeholder="$" />
                </div>
                <p className="text-xs text-amber-700">Active intervention</p>
              </div>
            </div>
            <div className="rounded-lg border border-red-200 bg-red-50 p-4">
              <h4 className="font-semibold text-sm text-red-900 mb-2">Tier 3: High Risk</h4>
              <div className="space-y-2">
                <div>
                  <Label className="text-xs text-red-900">Min Risk Score</Label>
                  <Input type="number" defaultValue="80" className="mt-1 h-9" />
                </div>
                <div>
                  <Label className="text-xs text-red-900">Credit Offer</Label>
                  <Input type="number" defaultValue="500" className="mt-1 h-9" placeholder="$" />
                </div>
                <p className="text-xs text-red-700">Immediate response</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-4">
            <div>
              <Label className="text-sm font-medium">AI Auto-Trigger</Label>
              <p className="text-xs text-muted-foreground mt-1">Automatically initiate outreach when risk threshold crossed</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Communication Defaults */}
      <Card className="happyco-card">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Bell className="h-5 w-5 text-primary" />
            <CardTitle className="text-xl tracking-[-0.02em]">Communication Defaults</CardTitle>
          </div>
          <CardDescription>Resident notification preferences and AI routing logic</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="default-channel">Default Communication Channel</Label>
              <Select defaultValue="sms">
                <SelectTrigger id="default-channel">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sms">SMS (Preferred)</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="app">In-App Notification</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">AI selects optimal channel per resident if enabled</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notification-timing">Notification Timing</Label>
              <Select defaultValue="immediate">
                <SelectTrigger id="notification-timing">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Immediate</SelectItem>
                  <SelectItem value="business-hours">Business Hours Only</SelectItem>
                  <SelectItem value="scheduled">Scheduled Batch</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">When to send AI-triggered outreach</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-4">
              <div>
                <Label className="text-sm font-medium">AI Channel Selection</Label>
                <p className="text-xs text-muted-foreground mt-1">Let AI choose optimal channel based on resident history</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-4">
              <div>
                <Label className="text-sm font-medium">Manager Review Required</Label>
                <p className="text-xs text-muted-foreground mt-1">Require manual approval before sending high-value credits</p>
              </div>
              <Switch />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Provider Routing */}
      <Card className="happyco-card">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Users className="h-5 w-5 text-primary" />
            <CardTitle className="text-xl tracking-[-0.02em]">Provider Routing Preferences</CardTitle>
          </div>
          <CardDescription>Service provider assignment and booking automation rules</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="provider-selection">Provider Selection Logic</Label>
              <Select defaultValue="rating">
                <SelectTrigger id="provider-selection">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Highest Rating</SelectItem>
                  <SelectItem value="response-time">Fastest Response Time</SelectItem>
                  <SelectItem value="availability">Best Availability</SelectItem>
                  <SelectItem value="cost">Lowest Cost</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="min-provider-rating">Minimum Provider Rating</Label>
              <Input
                id="min-provider-rating"
                type="number"
                defaultValue="4.5"
                min="1"
                max="5"
                step="0.1"
              />
              <p className="text-xs text-muted-foreground">Only auto-route to providers above this rating</p>
            </div>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-4">
            <div>
              <Label className="text-sm font-medium">Auto-Expand Successful Providers</Label>
              <p className="text-xs text-muted-foreground mt-1">Automatically suggest high-performing providers for other properties</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Credit Policy */}
      <Card className="happyco-card">
        <CardHeader>
          <div className="flex items-center gap-3">
            <DollarSign className="h-5 w-5 text-primary" />
            <CardTitle className="text-xl tracking-[-0.02em]">Credit Policy Guardrails</CardTitle>
          </div>
          <CardDescription>Financial limits and approval workflows</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="max-credit-per-resident">Max Credit Per Resident</Label>
              <Input
                id="max-credit-per-resident"
                type="number"
                defaultValue="500"
                placeholder="$"
              />
              <p className="text-xs text-muted-foreground">Maximum single credit offer amount</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="monthly-credit-budget">Monthly Credit Budget</Label>
              <Input
                id="monthly-credit-budget"
                type="number"
                defaultValue="15000"
                placeholder="$"
              />
              <p className="text-xs text-muted-foreground">Portfolio-wide monthly cap</p>
            </div>
          </div>
          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <Label className="text-sm font-medium">Credit Approval Workflow</Label>
            <p className="text-xs text-muted-foreground mt-2">Credits under $250: Auto-approved</p>
            <p className="text-xs text-muted-foreground">Credits $250-$500: Property manager approval</p>
            <p className="text-xs text-muted-foreground">Credits over $500: Regional manager approval</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
