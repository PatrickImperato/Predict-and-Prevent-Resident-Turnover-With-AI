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
  greeting: `Hey ${alex.fullName.split(' ')[0]}! 👋 You have a $500 retention credit available. This is to help make things easier after recent frustrations. Want me to help you use it on services you'll actually enjoy?`,
  bookCleaning: (credit) => `Perfect! Premium cleaning is $120 and fully covered. Great way to refresh after all those maintenance issues. You'd still have $380 left. Want me to book it?`,
  scheduleMaintenance: "Got it. What's going on? I can help with HVAC, plumbing, or general repairs.",
  checkCredits: (credit) => `You've got $${credit} available until September 30, 2025. That covers cleaning ($120), coffee credit ($50), grocery delivery ($45), pet grooming ($85), and more. What sounds good?`,
  availableServices: "Here's what I recommend to make life easier:\n\n• Premium Cleaning ($120) - Great reset after frustrations\n• Coffee Credit ($50) - Perfect for WFH days\n• Grocery Delivery ($45) - Save time & stay comfortable\n• Pet Grooming for Bailey ($85) - Pamper your pup\n\nAll fully covered. What interests you?",
  fallback: "I'm here to help you use your $500 credit on things that make staying here better!\n\nI can:\n• Show happiness & convenience services\n• Book cleaning or pet care\n• Arrange grocery or laundry delivery\n• Help with maintenance\n\nWhat would help most?",
  bookingConfirmed: (service, price, creditApplied) => `Awesome! ${service} is booked. Applied $${creditApplied} from your credit. ${price - creditApplied > 0 ? `You'll owe $${price - creditApplied}.` : 'Fully covered!'} Check your email for confirmation.`,
  maintenanceSubmitted: (issue) => `Done. Your ${issue} request is submitted. Maintenance will contact you within 2 hours. You'll get updates via ${alex.communicationChannel}.`,
  happinessRecommendation: "Based on your profile (works from home, has Bailey), here's what'll make life easier: Coffee credit for busy days, grocery delivery to save time, premium cleaning for a fresh start, and pet grooming for Bailey. All covered!",
  coffeeCredit: "Love it! $50 Starbucks credit is a great pick for work-from-home days. Easy to use, no expiration. Want me to send it to your email?",
  groceryDelivery: "Smart choice! Grocery delivery ($45) saves time and is fully covered. I can set you up with a service that delivers same-day. Sound good?"
};

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
  const creditAvailable = 500;

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
        text: RESPONSES.bookCleaning(creditAvailable),
        actions: [
          { label: `Book Deep Cleaning ($${SERVICES.deepCleaning.basePrice} - Fully Covered)`, handler: () => handleQuickAction("Deep Cleaning", SERVICES.deepCleaning.basePrice) },
          { label: "See Other Services", handler: () => handleQuickAction("browse") }
        ]
      };
    }
    
    if (input.includes("hvac") || input.includes("ac") || input.includes("air")) {
      return {
        text: RESPONSES.hvacRecommendation,
        actions: [
          { label: `Book HVAC Tune-up ($${SERVICES.acTuneup.basePrice} - Fully Covered)`, handler: () => handleQuickAction("HVAC Tune-up", SERVICES.acTuneup.basePrice) }
        ]
      };
    }
    
    if (input.includes("maintenance") || input.includes("repair") || input.includes("fix")) {
      return {
        text: RESPONSES.scheduleMaintenance,
        actions: [
          { label: "Report HVAC Issue", handler: () => handleQuickAction("HVAC maintenance") },
          { label: "Report Plumbing Issue", handler: () => handleQuickAction("Plumbing maintenance") }
        ]
      };
    }
    
    if (input.includes("credit") || input.includes("balance")) {
      return {
        text: RESPONSES.checkCredits(creditAvailable),
        actions: [
          { label: "Show Recommended Services", handler: () => handleQuickAction("services") }
        ]
      };
    }
    
    if (input.includes("service") || input.includes("available") || input.includes("recommend")) {
      return {
        text: RESPONSES.availableServices,
        actions: [
          { label: `HVAC Tune-up ($${SERVICES.acTuneup.basePrice} - Fully Covered)`, handler: () => handleQuickAction("HVAC Tune-up", SERVICES.acTuneup.basePrice) },
          { label: `Deep Cleaning ($${SERVICES.deepCleaning.basePrice} - Fully Covered)`, handler: () => handleQuickAction("Deep Cleaning", SERVICES.deepCleaning.basePrice) },
          { label: `Vent Inspection ($${SERVICES.ventInspection.basePrice} - Fully Covered)`, handler: () => handleQuickAction("Air Vent Inspection", SERVICES.ventInspection.basePrice) }
        ]
      };
    }
    
    return {
      text: RESPONSES.fallback,
      actions: [
        { label: "Show Recommended Services", handler: () => handleQuickAction("services") },
        { label: "Request Maintenance", handler: () => handleQuickAction("maintenance") },
        { label: "Check Credit Balance", handler: () => handleQuickAction("credits") }
      ]
    };
  };

  const handleQuickAction = (action, price) => {
    if (action === "browse" || action === "services") {
      const msg = {
        id: messages.length + 1,
        type: "assistant",
        text: RESPONSES.availableServices,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actions: [
          { label: `HVAC Tune-up ($${SERVICES.acTuneup.basePrice} - Fully Covered)`, handler: () => handleQuickAction("HVAC Tune-up", SERVICES.acTuneup.basePrice) },
          { label: `Deep Cleaning ($${SERVICES.deepCleaning.basePrice} - Fully Covered)`, handler: () => handleQuickAction("Deep Cleaning", SERVICES.deepCleaning.basePrice) }
        ]
      };
      setMessages(prev => [...prev, msg]);
      return;
    }
    
    if (action === "credits") {
      const msg = {
        id: messages.length + 1,
        type: "assistant",
        text: RESPONSES.checkCredits(creditAvailable),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, msg]);
      return;
    }
    
    if (action === "maintenance") {
      const msg = {
        id: messages.length + 1,
        type: "assistant",
        text: RESPONSES.scheduleMaintenance,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, msg]);
      return;
    }
    
    if (action.includes("maintenance")) {
      toast.success("Maintenance request submitted", {
        description: `${action} request received. We'll contact you within 2 hours.`,
        className: "border-teal-200 bg-teal-50 text-teal-900"
      });
      const msg = {
        id: messages.length + 1,
        type: "assistant",
        text: RESPONSES.maintenanceSubmitted(action.replace(" maintenance", "")),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, msg]);
      return;
    }
    
    const creditApplied = Math.min(price, creditAvailable);
    const fullyCovered = creditApplied === price;
    toast.success("Booking confirmed!", {
      description: `${action} scheduled • ${fullyCovered ? 'Fully covered by your credit' : `$${creditApplied} credit applied`}`,
      className: "border-teal-200 bg-teal-50 text-teal-900"
    });
    const msg = {
      id: messages.length + 1,
      type: "assistant",
      text: RESPONSES.bookingConfirmed(action, price, creditApplied),
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
          Get help using your $500 credit • Expires Sep 30, 2025
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
                onClick={() => handleQuickAction("HVAC maintenance")}
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
                onClick={() => handleQuickAction("credits")}
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
            <p className="mt-1 text-xs text-slate-700">Expires Sep 30, 2025</p>
            <p className="mt-2 text-xs font-medium text-slate-600">Reason: Recent HVAC issues</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
