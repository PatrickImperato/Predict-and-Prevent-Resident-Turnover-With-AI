/**
 * Centralized demo data model for HappyCo Concierge
 * Ensures consistency across all roles and pages
 */

// Retention ROI Engine Constants
export const RETENTION_MODEL = {
  avgTurnoverCost: 5500,
  avgRent: 2100,
  platformMargin: 0.15,
  creditsIssuedPerIntervention: 450,
  conciergeRevenuePerBooking: 35,
};

// Property Portfolio
export const PROPERTIES = [
  {
    id: "prop-1",
    name: "Harbor Point Apartments",
    code: "HPA",
    city: "Austin",
    state: "TX",
    units: 50,
    occupied: 48,
    atRiskCount: 5,
    maintenanceVolume: 28,
    serviceAdoption: 0.72,
    avgCreditUsage: 380,
    manager: "Sarah Mitchell"
  },
  {
    id: "prop-2",
    name: "Skyline Residences",
    code: "SKY",
    city: "Denver",
    state: "CO",
    units: 102,
    occupied: 94,
    atRiskCount: 12,
    maintenanceVolume: 54,
    serviceAdoption: 0.68,
    avgCreditUsage: 420,
    manager: "Michael Torres"
  },
  {
    id: "prop-3",
    name: "Parkview Towers",
    code: "PKT",
    city: "Tampa",
    state: "FL",
    units: 148,
    occupied: 138,
    atRiskCount: 18,
    maintenanceVolume: 82,
    serviceAdoption: 0.65,
    avgCreditUsage: 460,
    manager: "Jennifer Liu"
  }
];

// Calculate portfolio totals
export const PORTFOLIO_TOTALS = {
  totalUnits: PROPERTIES.reduce((sum, p) => sum + p.units, 0),
  occupiedUnits: PROPERTIES.reduce((sum, p) => sum + p.occupied, 0),
  atRiskTotal: PROPERTIES.reduce((sum, p) => sum + p.atRiskCount, 0),
  avgServiceAdoption: PROPERTIES.reduce((sum, p) => sum + p.serviceAdoption, 0) / PROPERTIES.length,
};

// Resident Lifecycle States
export const LIFECYCLE_STATES = {
  PROSPECTIVE: "prospective",
  STABLE: "stable",
  AT_RISK: "at_risk",
  INTERVENTION_DEPLOYED: "intervention_deployed",
  RECOVERED: "recovered"
};

// Service Catalog
export const SERVICES = {
  deepCleaning: { id: "svc-1", name: "Deep Cleaning", price: 120, duration: "2 hours", category: "Cleaning", providerId: "prov-1" },
  acTuneup: { id: "svc-2", name: "AC Tune-up", price: 85, duration: "1 hour", category: "HVAC", providerId: "prov-2" },
  petGrooming: { id: "svc-3", name: "Pet Grooming", price: 65, duration: "1.5 hours", category: "Pet Care", providerId: "prov-3" },
  furnitureAssembly: { id: "svc-4", name: "Furniture Assembly", price: 140, duration: "2.5 hours", category: "Handyman", providerId: "prov-4" },
  groceryDelivery: { id: "svc-5", name: "Grocery Delivery", price: 40, duration: "30 min", category: "Delivery", providerId: "prov-5" },
  dogWalking: { id: "svc-6", name: "Dog Walking", price: 35, duration: "30 min", category: "Pet Care", providerId: "prov-3" },
  plumbing: { id: "svc-7", name: "Plumbing Service", price: 95, duration: "1 hour", category: "Plumbing", providerId: "prov-6" },
  carpetCleaning: { id: "svc-8", name: "Carpet Cleaning", price: 110, duration: "2 hours", category: "Cleaning", providerId: "prov-1" },
};

// Retention ROI Calculations
export const calculateRetentionROI = (turnoversAvoided, bookingsCompleted, creditsIssued) => {
  const retentionSavings = turnoversAvoided * RETENTION_MODEL.avgTurnoverCost;
  const conciergeRevenue = bookingsCompleted * RETENTION_MODEL.conciergeRevenuePerBooking;
  const creditsInvested = creditsIssued;
  const retentionROI = retentionSavings + conciergeRevenue - creditsInvested;
  
  return {
    retentionSavings,
    conciergeRevenue,
    creditsInvested,
    retentionROI,
    roiMultiple: retentionROI / creditsInvested
  };
};

// Portfolio Analytics - Last 6 months
export const PORTFOLIO_ANALYTICS = {
  retentionROI: [
    { month: "Oct", value: 78200 },
    { month: "Nov", value: 82400 },
    { month: "Dec", value: 88100 },
    { month: "Jan", value: 91500 },
    { month: "Feb", value: 94800 },
    { month: "Mar", value: 98080 }
  ],
  retentionSavings: [
    { month: "Oct", value: 44000 },
    { month: "Nov", value: 47500 },
    { month: "Dec", value: 49500 },
    { month: "Jan", value: 50200 },
    { month: "Feb", value: 51800 },
    { month: "Mar", value: 52400 }
  ],
  turnoversAvoided: [
    { month: "Oct", turnovers: 6 },
    { month: "Nov", turnovers: 7 },
    { month: "Dec", turnovers: 8 },
    { month: "Jan", turnovers: 8 },
    { month: "Feb", turnovers: 9 },
    { month: "Mar", turnovers: 8 }
  ],
  serviceRevenue: [
    { month: "Oct", value: 24200 },
    { month: "Nov", value: 26100 },
    { month: "Dec", value: 27800 },
    { month: "Jan", value: 27200 },
    { month: "Feb", value: 28600 },
    { month: "Mar", value: 28200 }
  ],
  churnRiskDistribution: [
    { level: "High Risk", count: 35, percentage: 12 },
    { level: "Medium Risk", count: 52, percentage: 18 },
    { level: "Low Risk", count: 193, percentage: 70 }
  ]
};

// Manager-specific analytics
export const MANAGER_ANALYTICS = {
  churnDrivers: [
    { driver: "Maintenance Frequency", impact: 35, count: 42 },
    { driver: "Sentiment Decline", impact: 25, count: 28 },
    { driver: "Response Time", impact: 20, count: 24 },
    { driver: "Days to Lease End", impact: 15, count: 18 },
    { driver: "Service Usage", impact: 5, count: 8 }
  ],
  maintenanceCategories: [
    { category: "HVAC", count: 54, avgResolution: 2.3 },
    { category: "Plumbing", count: 42, avgResolution: 1.8 },
    { category: "Appliances", count: 36, avgResolution: 3.1 },
    { category: "Electrical", count: 28, avgResolution: 2.6 },
    { category: "Other", count: 22, avgResolution: 2.4 }
  ],
  serviceBookings: [
    { month: "Oct", bookings: 68 },
    { month: "Nov", bookings: 72 },
    { month: "Dec", bookings: 78 },
    { month: "Jan", bookings: 82 },
    { month: "Feb", bookings: 88 },
    { month: "Mar", bookings: 94 }
  ]
};

// AI Concierge responses
export const CONCIERGE_RESPONSES = {
  greeting: "Hello! I'm your HappyCo AI Concierge. I can help you book services, manage maintenance requests, or answer questions about your retention credits. How can I assist you today?",
  
  bookCleaning: (creditAvailable) => `You currently have $${creditAvailable} in retention credits available. A Deep Cleaning service costs $120 and takes about 2 hours. Would you like me to schedule that for you?`,
  
  scheduleMaintenance: "I can help you submit a maintenance request. What issue are you experiencing? Common categories include HVAC, plumbing, appliances, or electrical.",
  
  checkCredits: (creditAvailable) => `You have $${creditAvailable} in retention credits available. These credits can be applied to any service in our marketplace. Would you like to browse available services?`,
  
  availableServices: "Here are our most popular services: Deep Cleaning ($120), AC Tune-up ($85), Pet Grooming ($65), Furniture Assembly ($140), and Grocery Delivery ($40). Which interests you?",
  
  bookingConfirmed: (service, price, creditApplied) => `Perfect! I've scheduled your ${service} service. ${creditApplied > 0 ? `I've applied $${creditApplied} from your retention credits.` : ''} Your ${creditApplied > 0 ? `remaining balance is $${price - creditApplied}` : `total is $${price}`}. You'll receive a confirmation shortly.`,
  
  maintenanceSubmitted: (category) => `I've submitted your ${category} maintenance request. Our team will review it within 2 hours and reach out to schedule a visit. Is there anything else I can help with?`,
  
  fallback: "I'm here to help with booking services, scheduling maintenance, or managing your retention credits. What would you like to do?"
};

export default {
  RETENTION_MODEL,
  PROPERTIES,
  PORTFOLIO_TOTALS,
  LIFECYCLE_STATES,
  SERVICES,
  calculateRetentionROI,
  PORTFOLIO_ANALYTICS,
  MANAGER_ANALYTICS,
  CONCIERGE_RESPONSES
};
