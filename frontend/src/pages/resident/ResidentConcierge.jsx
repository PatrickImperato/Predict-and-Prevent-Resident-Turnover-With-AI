import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Send, Sparkles, Calendar, Wrench } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAlexChenData } from "@/lib/canonicalData";

const alex = getAlexChenData();

const RESPONSES = {
  greeting: `Hey ${alex.fullName.split(' ')[0]}! 👋 You have a $35 retention credit available for the next 4 days. This is to help make things easier after recent frustrations. Want me to help you use it on services you'll actually enjoy?`,
  recommendedServices: `I'd love to help you use that $35 credit on something that makes life better! Here are my top picks:\n\n• Premium Cleaning ($120, you pay $85) - Fresh start after all those issues\n• Starbucks Coffee Credit ($50, you pay $15) - Fuel for your work from home days\n• Grocery Delivery ($75, you pay $40) - Save time, stay comfortable\n• Pet Grooming for Bailey ($95, you pay $60) - Your pup deserves a spa day!\n\nWhat sounds good?`,
  checkBalance: `You've got $35 available to use within the next 4 days. That gives you a nice discount on happiness services:\n\n✓ Coffee credit - $15 out of pocket\n✓ Grocery delivery - $40 out of pocket\n✓ Pet grooming - $60 out of pocket  \n✓ Premium cleaning - $85 out of pocket\n\nAll way better than maintenance frustrations! What interests you?`,
  requestMaintenance: "I can help you submit a maintenance request. What's the issue?\n\n• HVAC/Heating/Cooling\n• Plumbing/Water\n• Electrical\n• Appliance\n• Other\n\nJust tell me what's going on.",
  maintenanceSubmitted: (issue) => `Done! Your ${issue} request is submitted. Maintenance will reach out within 2 hours via ${alex.communicationChannel}. You'll get updates as they work on it.`,
  fallback: "I'm here to help you use your $35 credit on things that make staying here better!\n\nI can:\n• Show happiness & convenience services\n• Help you check your credit balance\n• Submit maintenance requests\n\nWhat would help most?",
  bookingConfirmed: (service, creditApplied, finalPrice) => `Awesome! ${service} is scheduled. I applied your $35 credit${finalPrice > 0 ? `, so you'll pay $${finalPrice}` : " and it's fully covered"}. Check your email for confirmation!`,
}

const SERVICES = {
  premiumCleaning: { name: "Premium Cleaning", basePrice: 120 },
  coffeeCredit: { name: "Starbucks Coffee Credit", basePrice: 50 },
  groceryDelivery: { name: "Grocery Delivery", basePrice: 45 },
  petGrooming: { name: "Pet Grooming for Bailey", basePrice: 85 },
  hvacCheck: { name: "HVAC Comfort Check", basePrice: 85 }
};

export default function ResidentConcierge() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "assistant",
      text: RESPONSES.greeting,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const creditAvailable = 35;

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: "user",
      text: inputValue,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);

    setTimeout(() => {
      const response = generateResponse(inputValue.toLowerCase());
      const assistantMessage = {
        id: messages.length + 2,
        type: "assistant",
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actions: response.actions
      };
      setMessages(prev => [...prev, assistantMessage]);
    }, 800);

    setInputValue("");
  };

  const generateResponse = (input) => {
    if (input.includes("clean") || input.includes("cleaning")) {
      return {
        text: `Perfect! Premium cleaning is $120 and with your $35 credit, you'd pay $85. Great way to refresh after all those issues. Want me to book it?`,
        actions: [
          { label: "Yes, book cleaning", handler: () => handleServiceBooking("Premium Cleaning", 120) },
          { label: "Show other services", handler: () => handleQuickAction("services") }
        ]
      };
    }
    
    if (input.includes("coffee") || input.includes("starbucks")) {
      return {
        text: `Love it! Starbucks coffee credit is $50. With your $35 credit, you'd pay just $15. Perfect for work-from-home days!`,
        actions: [
          { label: "Book coffee credit", handler: () => handleServiceBooking("Starbucks Coffee Credit", 50) }
        ]
      };
    }
    
    if (input.includes("grocery") || input.includes("groceries") || input.includes("delivery")) {
      return {
        text: `Smart choice! Grocery delivery is $75, and with your $35 credit you'd pay $40. Same-day delivery available. Sound good?`,
        actions: [
          { label: "Book grocery delivery", handler: () => handleServiceBooking("Grocery Delivery", 75) }
        ]
      };
    }
    
    if (input.includes("pet") || input.includes("dog") || input.includes("bailey") || input.includes("groom")) {
      return {
        text: `Bailey would love that! Pet grooming is $95, and with your $35 credit you'd pay $60. Includes bath, trim, and nail care. Want to book it?`,
        actions: [
          { label: "Book pet grooming", handler: () => handleServiceBooking("Pet Grooming for Bailey", 95) }
        ]
      };
    }
    
    if (input.includes("maintenance") || input.includes("repair") || input.includes("fix") || input.includes("broken")) {
      return {
        text: RESPONSES.requestMaintenance,
        actions: [
          { label: "HVAC Issue", handler: () => handleMaintenanceRequest("HVAC") },
          { label: "Plumbing Issue", handler: () => handleMaintenanceRequest("Plumbing") },
          { label: "Other Issue", handler: () => handleMaintenanceRequest("General Maintenance") }
        ]
      };
    }
    
    if (input.includes("credit") || input.includes("balance") || input.includes("how much")) {
      return {
        text: RESPONSES.checkBalance,
        actions: [
          { label: "Show recommended services", handler: () => handleQuickAction("services") }
        ]
      };
    }
    
    if (input.includes("service") || input.includes("available") || input.includes("recommend") || input.includes("what can")) {
      return {
        text: RESPONSES.recommendedServices,
        actions: [
          { label: "Premium Cleaning ($85)", handler: () => handleServiceBooking("Premium Cleaning", 120) },
          { label: "Coffee Credit ($15)", handler: () => handleServiceBooking("Starbucks Coffee Credit", 50) },
          { label: "Grocery Delivery ($40)", handler: () => handleServiceBooking("Grocery Delivery", 75) },
          { label: "Pet Grooming ($60)", handler: () => handleServiceBooking("Pet Grooming for Bailey", 95) }
        ]
      };
    }
    
    return {
      text: RESPONSES.fallback,
      actions: [
        { label: "Show Recommended Services", handler: () => handleQuickAction("services") },
        { label: "Request Maintenance", handler: () => handleQuickAction("maintenance") },
        { label: "Check Balance", handler: () => handleQuickAction("balance") }
      ]
    };
  };

  const handleQuickAction = (action) => {
    // Add user message to show the action was clicked
    const userMsg = {
      id: messages.length + 1,
      type: "user",
      text: action === "services" ? "Show me recommended services" 
           : action === "maintenance" ? "I need to request maintenance"
           : "What's my credit balance?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);

    // Generate appropriate response after short delay
    setTimeout(() => {
      let responseText = "";
      let responseActions = [];

      if (action === "services") {
        responseText = RESPONSES.recommendedServices;
        responseActions = [
          { label: "Premium Cleaning ($85)", handler: () => handleServiceBooking("Premium Cleaning", 120) },
          { label: "Coffee Credit ($15)", handler: () => handleServiceBooking("Starbucks Coffee Credit", 50) },
          { label: "Grocery Delivery ($40)", handler: () => handleServiceBooking("Grocery Delivery", 75) },
          { label: "Pet Grooming ($60)", handler: () => handleServiceBooking("Pet Grooming for Bailey", 95) }
        ];
      } else if (action === "maintenance") {
        responseText = RESPONSES.requestMaintenance;
        responseActions = [
          { label: "HVAC Issue", handler: () => handleMaintenanceRequest("HVAC") },
          { label: "Plumbing Issue", handler: () => handleMaintenanceRequest("Plumbing") },
          { label: "Other Issue", handler: () => handleMaintenanceRequest("General Maintenance") }
        ];
      } else if (action === "balance") {
        responseText = RESPONSES.checkBalance;
        responseActions = [
          { label: "Show recommended services", handler: () => handleQuickAction("services") }
        ];
      }

      const assistantMsg = {
        id: messages.length + 2,
        type: "assistant",
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actions: responseActions
      };
      setMessages(prev => [...prev, assistantMsg]);
    }, 600);
  };

  const handleServiceBooking = (serviceName, basePrice) => {
    const creditApplied = Math.min(basePrice, creditAvailable);
    const finalPrice = basePrice - creditApplied;
    
    toast.success("Booking confirmed!", {
      description: `${serviceName} scheduled • $${creditApplied} credit applied`,
      className: "border-teal-200 bg-teal-50 text-teal-900"
    });
    
    const msg = {
      id: messages.length + 1,
      type: "assistant",
      text: RESPONSES.bookingConfirmed(serviceName, creditApplied, finalPrice),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, msg]);
  };

  const handleMaintenanceRequest = (issueType) => {
    toast.success("Maintenance request submitted", {
      description: `${issueType} request received. We'll contact you within 2 hours.`,
      className: "border-teal-200 bg-teal-50 text-teal-900"
    });
    
    const msg = {
      id: messages.length + 1,
      type: "assistant",
      text: RESPONSES.maintenanceSubmitted(issueType),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, msg]);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: "easeOut" }}
      className="space-y-4 max-w-[1400px]"
      data-testid="resident-concierge-root"
    >
      {/* Compact Header */}
      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-2">
          <Badge className="border-teal-200 bg-teal-50 text-teal-700 hover:bg-teal-50" variant="secondary">
            AI-Powered
          </Badge>
          <h2 className="font-[var(--font-heading)] text-xl font-semibold tracking-tight text-slate-900">
            AI Concierge
          </h2>
        </div>
        <p className="mt-1 text-xs leading-relaxed text-slate-600">
          Get help using your $35 credit • Available for 4 days
        </p>
      </section>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)]">
        {/* Compact Chat Interface */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm flex flex-col" style={{ height: "480px" }}>
          <div className="flex-1 space-y-3 overflow-y-auto p-3">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] ${msg.type === "user" ? "order-2" : "order-1"}`}>
                  <div 
                    className={`rounded-2xl px-3 py-2 ${
                      msg.type === "user" 
                        ? "bg-teal-600 text-white" 
                        : "border border-slate-200 bg-slate-50 text-slate-900"
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-line">{msg.text}</p>
                  </div>
                  <p className={`mt-0.5 text-xs text-slate-500 ${msg.type === "user" ? "text-right" : "text-left"}`}>
                    {msg.timestamp}
                  </p>
                  {msg.actions && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {msg.actions.map((action, idx) => (
                        <Button
                          key={idx}
                          size="sm"
                          variant="outline"
                          className="h-7 rounded-lg text-xs"
                          onClick={action.handler}
                        >
                          {action.label}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2 border-t border-slate-200 p-3">
            <Input
              placeholder="Ask about services, maintenance, or credits..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1 h-9"
              data-testid="concierge-input"
            />
            <Button onClick={handleSendMessage} className="h-9 w-9 p-0" data-testid="concierge-send-button">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Compact Sidebar */}
        <div className="space-y-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900 mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <button
                onClick={() => handleQuickAction("services")}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-left transition-all hover:border-teal-200 hover:bg-white hover:shadow-sm"
                data-testid="quick-action-book-service"
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">Recommended Services</p>
                    <p className="text-xs text-slate-600 truncate">All covered by your credit</p>
                  </div>
                </div>
              </button>
              
              <button
                onClick={() => handleQuickAction("maintenance")}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-left transition-all hover:border-amber-200 hover:bg-white hover:shadow-sm"
                data-testid="quick-action-request-maintenance"
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                    <Wrench className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">Request Maintenance</p>
                    <p className="text-xs text-slate-600 truncate">Report an issue</p>
                  </div>
                </div>
              </button>
              
              <button
                onClick={() => handleQuickAction("balance")}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-left transition-all hover:border-emerald-200 hover:bg-white hover:shadow-sm"
                data-testid="quick-action-check-credits"
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">Check Balance</p>
                    <p className="text-xs text-slate-600 truncate">${creditAvailable} available</p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          <div className="rounded-xl border border-teal-200 bg-teal-50 p-4">
            <h4 className="text-sm font-semibold text-slate-900">Your Credit</h4>
            <p className="mt-1.5 text-2xl font-semibold text-slate-900">${creditAvailable}</p>
            <p className="mt-1 text-xs text-slate-700">Use within 4 days</p>
            <p className="mt-2 text-xs font-medium text-slate-600">Reason: Making things right after recent issues</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
