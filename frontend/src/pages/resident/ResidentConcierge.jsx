import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Send, Sparkles, Calendar, Wrench } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ALEX_CHEN } from "@/lib/canonicalData";

// Concierge response templates
const RESPONSES = {
  greeting: `Hi ${ALEX_CHEN.fullName}! I'm your AI concierge assistant. I can help you book services, request maintenance, or check your retention credits. How can I assist you today?`,
  bookCleaning: (credit) => `I can help you book a deep cleaning service! You have $${credit} in retention credits available. A standard deep cleaning costs $120 and takes about 2 hours. Would you like me to book this for you?`,
  scheduleMaintenance: "I can help you submit a maintenance request. What issue are you experiencing? Common categories include HVAC, plumbing, electrical, or general repairs.",
  checkCredits: (credit) => `You currently have $${credit} in retention credits available. These credits can be used for any service in our marketplace, including cleaning, maintenance, pet care, and more. Credits expire on September 30, 2025.`,
  availableServices: "Our service marketplace includes: Deep Cleaning ($120), AC Tune-up ($85), Pet Grooming ($65), and many more. All services can be booked with your retention credits. Which service interests you?",
  fallback: "I'm here to help! You can ask me to: \n\u2022 Book a service from our marketplace\n\u2022 Submit a maintenance request\n\u2022 Check your credit balance\n\u2022 View available services\n\nWhat would you like to do?",
  bookingConfirmed: (service, price, creditApplied) => `Perfect! I've scheduled your ${service} service. $${creditApplied} in retention credits have been applied. ${price - creditApplied > 0 ? `Remaining balance: $${price - creditApplied}.` : 'Fully covered by your credits!'} You'll receive a confirmation email shortly.`,
  maintenanceSubmitted: (issue) => `Your ${issue} maintenance request has been submitted successfully. Our maintenance team will contact you within 2 hours to schedule a visit. You'll receive updates via ${ALEX_CHEN.communicationChannel}.`
};

// Service prices
const SERVICES = {
  deepCleaning: { name: "Deep Cleaning", basePrice: 120 },
  acTuneup: { name: "AC Tune-up", basePrice: 85 },
  petGrooming: { name: "Pet Grooming", basePrice: 65 }
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

    // Simulate AI response
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
          { label: `Book Deep Cleaning ($${SERVICES.deepCleaning.basePrice})`, handler: () => handleQuickAction("Deep Cleaning", SERVICES.deepCleaning.basePrice) },
          { label: "Browse Other Services", handler: () => handleQuickAction("browse") }
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
          { label: "Browse Services", handler: () => handleQuickAction("browse") }
        ]
      };
    }
    
    if (input.includes("service") || input.includes("available")) {
      return {
        text: RESPONSES.availableServices,
        actions: [
          { label: `Book Cleaning ($${SERVICES.deepCleaning.basePrice})`, handler: () => handleQuickAction("Deep Cleaning", SERVICES.deepCleaning.basePrice) },
          { label: `Book AC Service ($${SERVICES.acTuneup.basePrice})`, handler: () => handleQuickAction("AC Tune-up", SERVICES.acTuneup.basePrice) },
          { label: `Book Pet Grooming ($${SERVICES.petGrooming.basePrice})`, handler: () => handleQuickAction("Pet Grooming", SERVICES.petGrooming.basePrice) }
        ]
      };
    }
    
    return {
      text: RESPONSES.fallback,
      actions: [
        { label: "Book a Service", handler: () => handleQuickAction("browse") },
        { label: "Request Maintenance", handler: () => handleQuickAction("maintenance") },
        { label: "Check Credits", handler: () => handleQuickAction("credits") }
      ]
    };
  };

  const handleQuickAction = (action, price) => {
    if (action === "browse") {
      toast.success("Opening services marketplace...", {
        description: "View all available services and book with your credits",
        className: "border-teal-200 bg-teal-50 text-teal-900"
      });
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
        description: `Your ${action} request has been received. Our team will contact you within 2 hours.`,
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
    
    // Service booking
    const creditApplied = Math.min(price, creditAvailable);
    toast.success("Booking confirmed!", {
      description: `${action} scheduled • $${creditApplied} credit applied`,
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
      className="space-y-6"
      data-testid="resident-concierge-root"
    >
      {/* Header */}
      <section className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <Badge className="mb-3 w-fit border-teal-200 bg-teal-50 text-teal-700 hover:bg-teal-50" variant="secondary">
          AI-Powered Assistant
        </Badge>
        <h2 className="font-[var(--font-heading)] text-[28px] font-semibold tracking-tight text-slate-900">
          AI Concierge
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          Get personalized assistance with bookings, maintenance, and retention credits.
        </p>
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        {/* Chat Interface */}
        <div className="saas-card flex flex-col" style={{ height: "600px" }}>
          {/* Messages */}
          <div className="flex-1 space-y-4 overflow-y-auto p-2">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] ${msg.type === "user" ? "order-2" : "order-1"}`}>
                  <div 
                    className={`rounded-2xl px-4 py-3 ${
                      msg.type === "user" 
                        ? "bg-teal-600 text-white" 
                        : "border border-slate-200 bg-slate-50 text-slate-900"
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-line">{msg.text}</p>
                  </div>
                  <p className={`mt-1 text-xs text-slate-500 ${msg.type === "user" ? "text-right" : "text-left"}`}>
                    {msg.timestamp}
                  </p>
                  {msg.actions && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {msg.actions.map((action, idx) => (
                        <Button
                          key={idx}
                          size="sm"
                          variant="outline"
                          className="h-8 rounded-lg text-xs"
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

          {/* Input */}
          <div className="mt-4 flex gap-2 border-t border-slate-200 pt-4">
            <Input
              placeholder="Ask about services, maintenance, or credits..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} className="h-10 w-10 p-0">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Quick Actions Sidebar */}
        <div className="space-y-6">
          <div className="saas-card">
            <h3 className="mb-4 text-lg font-semibold text-slate-900">Quick Actions</h3>
            <div className="space-y-3">
              <button
                onClick={() => handleQuickAction("Deep Cleaning", 120)}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 p-4 text-left transition-all hover:border-teal-200 hover:bg-white hover:shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">Book a Service</p>
                    <p className="text-sm text-slate-600">Browse marketplace</p>
                  </div>
                </div>
              </button>
              
              <button
                onClick={() => handleQuickAction("HVAC maintenance")}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 p-4 text-left transition-all hover:border-amber-200 hover:bg-white hover:shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                    <Wrench className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">Request Maintenance</p>
                    <p className="text-sm text-slate-600">Report an issue</p>
                  </div>
                </div>
              </button>
              
              <button
                onClick={() => handleQuickAction("credits")}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 p-4 text-left transition-all hover:border-emerald-200 hover:bg-white hover:shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">Check Credits</p>
                    <p className="text-sm text-slate-600">${creditAvailable} available</p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          <div className="rounded-xl border border-teal-200 bg-teal-50 p-6">
            <h4 className="font-semibold text-slate-900">Your Credits</h4>
            <p className="mt-2 text-3xl font-semibold text-slate-900">${creditAvailable}</p>
            <p className="mt-1 text-sm text-slate-700">Available for services</p>
            <p className="mt-2 text-xs text-slate-600">Expires September 30, 2025</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
