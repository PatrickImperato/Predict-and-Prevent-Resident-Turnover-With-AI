/**
 * Centralized demo data model for HappyCo Concierge - Seattle Portfolio
 * Ensures consistency across all roles and pages
 * 
 * Key Product Story:
 * - Churn is a LEADING indicator (predict friction early from operational signals)
 * - Built on HappyCo's existing maintenance + operational data
 * - Retention ROI = primary metric (turnover savings + service revenue - credits invested)
 * - Visible intervention logic (risk drivers → recommended action → expected ROI impact)
 */

// ============================================================================
// RETENTION CONFIGURATION (Globally Configurable)
// ============================================================================

export const RETENTION_CONFIG = {
  // Global assumptions
  global: {
    avgTurnoverCost: 3800,        // Seattle market avg turnover cost
    avgRent: 2400,                 // Seattle area average rent
    servicePlatformMargin: 0.18,   // HappyCo commission on service bookings
    softwareMargin: 0.92,          // SaaS margin on retention platform fee
    conciergeRevenuePerBooking: 42, // Avg revenue per service booking
    
    // Intervention credit thresholds (tiered by risk score)
    interventionTiers: {
      tier1: { minScore: 60, maxScore: 69, creditOffer: 200, label: "Light Touch" },
      tier2: { minScore: 70, maxScore: 79, creditOffer: 350, label: "Standard" },
      tier3: { minScore: 80, maxScore: 100, creditOffer: 500, label: "High Priority" }
    },
    
    // Risk signal weights (how much each driver contributes to score)
    riskWeights: {
      maintenanceFrequency: 0.35,   // Repeat maintenance = biggest predictor
      sentimentDecline: 0.25,        // Detected negative tone in interactions
      responseTime: 0.20,            // Slow responses = friction
      daysToLeaseEnd: 0.15,          // Proximity to lease decision
      serviceNonAdoption: 0.05       // Not engaging with perks
    },
    
    // Demand assumptions for ROI projection
    demandAssumptions: {
      serviceBookingLikelihood: 0.68,  // % of credited residents who book
      avgServicesBookedPerIntervention: 2.3
    }
  },
  
  // Per-property overrides (Seattle-specific settings)
  propertyOverrides: {
    "prop-ballard": {
      avgTurnoverCost: 4100,     // Ballard: higher turnover cost (competitive)
      locationMultiplier: 1.05,  // 5% higher service pricing
      providerAvailability: 0.92 // High provider density
    },
    "prop-capitol": {
      avgTurnoverCost: 3900,
      locationMultiplier: 1.02,
      providerAvailability: 0.95 // Best provider coverage
    },
    "prop-bellevue": {
      avgTurnoverCost: 4200,     // Bellevue: highest turnover cost
      locationMultiplier: 1.08,
      providerAvailability: 0.88
    }
  }
};

// ============================================================================
// SEATTLE PROPERTY PORTFOLIO (50 / 100 / 150 unit mix)
// ============================================================================

export const PROPERTIES = [
  {
    id: "prop-ballard",
    name: "Ballard Commons",
    code: "BLC",
    address: "5234 Ballard Ave NW",
    city: "Seattle",
    state: "WA",
    zip: "98107",
    neighborhood: "Ballard",
    units: 52,
    occupied: 48,
    atRiskCount: 6,
    maintenanceVolume: 31,
    serviceAdoption: 0.74,
    avgCreditUsage: 390,
    avgRent: 2350,
    manager: "Sarah Mitchell",
    managerEmail: "sarah.mitchell@happyco.com"
  },
  {
    id: "prop-capitol",
    name: "Capitol Hill Residences",
    code: "CHR",
    address: "1420 E Pike St",
    city: "Seattle",
    state: "WA",
    zip: "98122",
    neighborhood: "Capitol Hill",
    units: 104,
    occupied: 98,
    atRiskCount: 12,
    maintenanceVolume: 58,
    serviceAdoption: 0.71,
    avgCreditUsage: 415,
    avgRent: 2450,
    manager: "Michael Torres",
    managerEmail: "michael.torres@happyco.com"
  },
  {
    id: "prop-bellevue",
    name: "Bellevue Skyline Towers",
    code: "BST",
    address: "10500 NE 8th St",
    city: "Bellevue",
    state: "WA",
    zip: "98004",
    neighborhood: "Downtown Bellevue",
    units: 144,
    occupied: 136,
    atRiskCount: 17,
    maintenanceVolume: 79,
    serviceAdoption: 0.68,
    avgCreditUsage: 450,
    avgRent: 2600,
    manager: "Jennifer Liu",
    managerEmail: "jennifer.liu@happyco.com"
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

// Seattle-based Service Providers
export const PROVIDERS = [
  {
    id: "prov-seattle-clean",
    name: "Emerald City Cleaning Co",
    category: "Cleaning",
    serviceArea: "Seattle Metro",
    availability: 0.94,
    avgRating: 4.8,
    responseTime: "< 2 hours",
    services: ["Deep Cleaning", "Carpet Cleaning", "Move-out Cleaning"]
  },
  {
    id: "prov-puget-hvac",
    name: "Puget Sound HVAC",
    category: "HVAC",
    serviceArea: "King County",
    availability: 0.89,
    avgRating: 4.7,
    responseTime: "Same day",
    services: ["AC Tune-up", "Furnace Service", "Air Quality Check"]
  },
  {
    id: "prov-seattle-pets",
    name: "Seattle Pet Services",
    category: "Pet Care",
    serviceArea: "Seattle & Eastside",
    availability: 0.96,
    avgRating: 4.9,
    responseTime: "< 4 hours",
    services: ["Pet Grooming", "Dog Walking", "Pet Sitting"]
  },
  {
    id: "prov-handy-seattle",
    name: "Handy Seattle",
    category: "Handyman",
    serviceArea: "Greater Seattle",
    availability: 0.88,
    avgRating: 4.6,
    responseTime: "Next day",
    services: ["Furniture Assembly", "Minor Repairs", "TV Mounting"]
  },
  {
    id: "prov-cascade-plumbing",
    name: "Cascade Plumbing Solutions",
    category: "Plumbing",
    serviceArea: "Seattle Metro",
    availability: 0.91,
    avgRating: 4.8,
    responseTime: "< 3 hours",
    services: ["Plumbing Service", "Drain Cleaning", "Leak Repair"]
  }
];

// Seattle-based Service Catalog
export const SERVICES = {
  deepCleaning: { 
    id: "svc-clean-1", 
    name: "Deep Cleaning", 
    basePrice: 135, 
    duration: "2-3 hours", 
    category: "Cleaning", 
    providerId: "prov-seattle-clean",
    margin: 0.18,
    description: "Professional deep cleaning with eco-friendly products"
  },
  carpetCleaning: { 
    id: "svc-clean-2", 
    name: "Carpet Cleaning", 
    basePrice: 120, 
    duration: "2 hours", 
    category: "Cleaning", 
    providerId: "prov-seattle-clean",
    margin: 0.18,
    description: "Steam cleaning for carpets and rugs"
  },
  acTuneup: { 
    id: "svc-hvac-1", 
    name: "AC Tune-up", 
    basePrice: 95, 
    duration: "1 hour", 
    category: "HVAC", 
    providerId: "prov-puget-hvac",
    margin: 0.15,
    description: "Preventive maintenance and filter replacement"
  },
  petGrooming: { 
    id: "svc-pet-1", 
    name: "Pet Grooming", 
    basePrice: 75, 
    duration: "1.5 hours", 
    category: "Pet Care", 
    providerId: "prov-seattle-pets",
    margin: 0.20,
    description: "Full grooming service for dogs and cats"
  },
  dogWalking: { 
    id: "svc-pet-2", 
    name: "Dog Walking", 
    basePrice: 30, 
    duration: "30 min", 
    category: "Pet Care", 
    providerId: "prov-seattle-pets",
    margin: 0.22,
    description: "Daily walks around your neighborhood"
  },
  furnitureAssembly: { 
    id: "svc-handy-1", 
    name: "Furniture Assembly", 
    basePrice: 150, 
    duration: "2-3 hours", 
    category: "Handyman", 
    providerId: "prov-handy-seattle",
    margin: 0.16,
    description: "Assembly for IKEA and other furniture"
  },
  plumbingService: { 
    id: "svc-plumb-1", 
    name: "Plumbing Service", 
    basePrice: 110, 
    duration: "1-2 hours", 
    category: "Plumbing", 
    providerId: "prov-cascade-plumbing",
    margin: 0.14,
    description: "General plumbing repairs and maintenance"
  }
};

// Retention ROI Calculations (updated for new config)
export const calculateRetentionROI = (turnoversAvoided, bookingsCompleted, creditsIssued) => {
  const config = RETENTION_CONFIG.global;
  const retentionSavings = turnoversAvoided * config.avgTurnoverCost;
  const conciergeRevenue = bookingsCompleted * config.conciergeRevenuePerBooking;
  const creditsInvested = creditsIssued;
  const retentionROI = retentionSavings + conciergeRevenue - creditsInvested;
  
  return {
    retentionSavings,
    conciergeRevenue,
    creditsInvested,
    retentionROI,
    roiMultiple: creditsInvested > 0 ? retentionROI / creditsInvested : 0
  };
};

// ============================================================================
// RISK COMPUTATION FUNCTIONS (Core Product Logic)
// ============================================================================

/**
 * Compute churn risk score for a resident
 * Returns score (0-100) and driver breakdown showing which signals contributed
 */
export const computeRiskScore = (resident, property, config = RETENTION_CONFIG) => {
  const weights = config.global.riskWeights;
  const signals = resident.frictionSignals || {};
  
  // Normalize each signal to 0-100 scale, then apply weight
  const maintenanceScore = Math.min((signals.maintenanceCount || 0) * 12, 100);
  const sentimentScore = signals.sentimentScore || 0; // Already 0-100
  const responseScore = Math.min((signals.avgResponseTimeHours || 0) * 4, 100);
  const leaseScore = signals.daysToLeaseEnd ? Math.max(0, 100 - signals.daysToLeaseEnd / 3) : 0;
  const adoptionScore = signals.serviceUsageCount ? Math.max(0, 100 - signals.serviceUsageCount * 20) : 50;
  
  const weightedScore = 
    (maintenanceScore * weights.maintenanceFrequency) +
    (sentimentScore * weights.sentimentDecline) +
    (responseScore * weights.responseTime) +
    (leaseScore * weights.daysToLeaseEnd) +
    (adoptionScore * weights.serviceNonAdoption);
  
  const drivers = [
    { 
      name: "Maintenance Frequency", 
      rawValue: signals.maintenanceCount || 0,
      score: maintenanceScore, 
      weight: weights.maintenanceFrequency, 
      contribution: (maintenanceScore * weights.maintenanceFrequency).toFixed(1),
      severity: maintenanceScore > 70 ? "high" : maintenanceScore > 40 ? "medium" : "low"
    },
    { 
      name: "Sentiment Decline", 
      rawValue: signals.sentimentScore || 0,
      score: sentimentScore, 
      weight: weights.sentimentDecline, 
      contribution: (sentimentScore * weights.sentimentDecline).toFixed(1),
      severity: sentimentScore > 70 ? "high" : sentimentScore > 40 ? "medium" : "low"
    },
    { 
      name: "Response Time", 
      rawValue: signals.avgResponseTimeHours || 0,
      score: responseScore, 
      weight: weights.responseTime, 
      contribution: (responseScore * weights.responseTime).toFixed(1),
      severity: responseScore > 70 ? "high" : responseScore > 40 ? "medium" : "low"
    },
    { 
      name: "Days to Lease End", 
      rawValue: signals.daysToLeaseEnd || 365,
      score: leaseScore, 
      weight: weights.daysToLeaseEnd, 
      contribution: (leaseScore * weights.daysToLeaseEnd).toFixed(1),
      severity: leaseScore > 70 ? "high" : leaseScore > 40 ? "medium" : "low"
    },
    { 
      name: "Service Non-Adoption", 
      rawValue: signals.serviceUsageCount || 0,
      score: adoptionScore, 
      weight: weights.serviceNonAdoption, 
      contribution: (adoptionScore * weights.serviceNonAdoption).toFixed(1),
      severity: adoptionScore > 70 ? "high" : adoptionScore > 40 ? "medium" : "low"
    }
  ];
  
  // Sort drivers by contribution (highest first)
  drivers.sort((a, b) => parseFloat(b.contribution) - parseFloat(a.contribution));
  
  return {
    score: Math.round(weightedScore),
    drivers,
    topDriver: drivers[0],
    primaryIssue: drivers[0].name
  };
};

/**
 * Recommend intervention tier based on risk score
 * Returns tier info, credit offer, and rationale
 */
export const recommendIntervention = (riskScore, drivers, config = RETENTION_CONFIG) => {
  const tiers = config.global.interventionTiers;
  
  let selectedTier = null;
  if (riskScore >= tiers.tier3.minScore) {
    selectedTier = { ...tiers.tier3, tier: 3 };
  } else if (riskScore >= tiers.tier2.minScore) {
    selectedTier = { ...tiers.tier2, tier: 2 };
  } else if (riskScore >= tiers.tier1.minScore) {
    selectedTier = { ...tiers.tier1, tier: 1 };
  } else {
    return {
      tier: 0,
      label: "Monitor Only",
      creditOffer: 0,
      rationale: "Risk score below intervention threshold. Continue monitoring."
    };
  }
  
  // Build rationale from top drivers
  const topDriver = drivers[0];
  const rationale = `${topDriver.name} is the primary friction driver (contributing ${topDriver.contribution} pts). ` +
    `Recommended ${selectedTier.label} intervention with $${selectedTier.creditOffer} credit offer to incentivize re-engagement.`;
  
  return {
    ...selectedTier,
    rationale,
    recommendedServices: topDriver.name.includes("Maintenance") ? ["Deep Cleaning", "Plumbing Service"] : ["Pet Grooming", "Dog Walking"]
  };
};

/**
 * Estimate ROI impact of applying an intervention
 * Returns projected savings, cost, and ROI multiple
 */
export const estimateInterventionROI = (intervention, residentContext, property, config = RETENTION_CONFIG) => {
  const globalConfig = config.global;
  const propertyOverride = config.propertyOverrides[property.id] || {};
  
  // Use property-specific turnover cost if available
  const turnoverCost = propertyOverride.avgTurnoverCost || globalConfig.avgTurnoverCost;
  const creditOffer = intervention.creditOffer;
  
  // Project service bookings based on likelihood and average bookings per resident
  const bookingLikelihood = globalConfig.demandAssumptions.serviceBookingLikelihood;
  const avgBookings = globalConfig.demandAssumptions.avgServicesBookedPerIntervention;
  const expectedBookings = bookingLikelihood * avgBookings;
  const expectedRevenue = expectedBookings * globalConfig.conciergeRevenuePerBooking;
  
  // Assume intervention reduces churn probability based on tier
  const churnReductionRate = intervention.tier === 3 ? 0.75 : intervention.tier === 2 ? 0.65 : 0.50;
  const expectedSavings = turnoverCost * churnReductionRate;
  
  const totalCost = creditOffer;
  const totalBenefit = expectedSavings + expectedRevenue;
  const netROI = totalBenefit - totalCost;
  const roiMultiple = totalCost > 0 ? totalBenefit / totalCost : 0;
  
  return {
    expectedSavings: Math.round(expectedSavings),
    expectedRevenue: Math.round(expectedRevenue),
    totalCost: creditOffer,
    netROI: Math.round(netROI),
    roiMultiple: roiMultiple.toFixed(2),
    churnReductionRate: `${(churnReductionRate * 100).toFixed(0)}%`,
    explanation: `Intervention has ${(churnReductionRate * 100).toFixed(0)}% chance to prevent $${turnoverCost.toLocaleString()} turnover cost, ` +
      `plus ${expectedBookings.toFixed(1)} expected service bookings generating $${Math.round(expectedRevenue)} revenue. ` +
      `Net ROI: $${Math.round(netROI).toLocaleString()} (${roiMultiple.toFixed(2)}x return).`
  };
};

// ============================================================================
// SAMPLE RESIDENT DATA (with friction signals for risk computation)
// ============================================================================

export const SAMPLE_AT_RISK_RESIDENTS = [
  {
    id: "res-ballard-501",
    name: "Alex Chen",
    unit: "501",
    propertyId: "prop-ballard",
    email: "alex.chen@email.com",
    phone: "(206) 555-0142",
    leaseEndDate: "2025-07-15",
    monthlyRent: 2350,
    moveInDate: "2023-07-15",
    frictionSignals: {
      maintenanceCount: 7,          // High frequency (7 requests in 6 months)
      avgResponseTimeHours: 18,     // Slow responses
      sentimentScore: 72,           // Negative sentiment detected
      daysToLeaseEnd: 132,          // Approaching lease decision
      serviceUsageCount: 0          // Never used concierge services
    },
    interventionHistory: []
  },
  {
    id: "res-capitol-312",
    name: "Maria Santos",
    unit: "312",
    propertyId: "prop-capitol",
    email: "maria.santos@email.com",
    phone: "(206) 555-0187",
    leaseEndDate: "2025-08-01",
    monthlyRent: 2450,
    moveInDate: "2022-08-01",
    frictionSignals: {
      maintenanceCount: 6,
      avgResponseTimeHours: 22,
      sentimentScore: 68,
      daysToLeaseEnd: 149,
      serviceUsageCount: 1
    },
    interventionHistory: []
  },
  {
    id: "res-bellevue-805",
    name: "Jordan Kim",
    unit: "805",
    propertyId: "prop-bellevue",
    email: "jordan.kim@email.com",
    phone: "(425) 555-0234",
    leaseEndDate: "2025-06-30",
    monthlyRent: 2650,
    moveInDate: "2021-06-30",
    frictionSignals: {
      maintenanceCount: 8,
      avgResponseTimeHours: 24,
      sentimentScore: 78,
      daysToLeaseEnd: 117,
      serviceUsageCount: 0
    },
    interventionHistory: []
  },
  {
    id: "res-ballard-204",
    name: "Taylor Wong",
    unit: "204",
    propertyId: "prop-ballard",
    email: "taylor.wong@email.com",
    phone: "(206) 555-0298",
    leaseEndDate: "2025-09-15",
    monthlyRent: 2300,
    moveInDate: "2024-03-15",
    frictionSignals: {
      maintenanceCount: 5,
      avgResponseTimeHours: 14,
      sentimentScore: 65,
      daysToLeaseEnd: 194,
      serviceUsageCount: 2
    },
    interventionHistory: []
  },
  {
    id: "res-capitol-702",
    name: "Sam Patel",
    unit: "702",
    propertyId: "prop-capitol",
    email: "sam.patel@email.com",
    phone: "(206) 555-0356",
    leaseEndDate: "2025-07-20",
    monthlyRent: 2500,
    moveInDate: "2023-01-20",
    frictionSignals: {
      maintenanceCount: 9,
      avgResponseTimeHours: 26,
      sentimentScore: 81,
      daysToLeaseEnd: 137,
      serviceUsageCount: 0
    },
    interventionHistory: []
  }
];

// Compute risk scores for all sample residents
export const AT_RISK_RESIDENTS_WITH_SCORES = SAMPLE_AT_RISK_RESIDENTS.map(resident => {
  const property = PROPERTIES.find(p => p.id === resident.propertyId);
  const riskData = computeRiskScore(resident, property);
  const intervention = recommendIntervention(riskData.score, riskData.drivers);
  const roiProjection = estimateInterventionROI(intervention, resident, property);
  
  return {
    ...resident,
    riskScore: riskData.score,
    riskDrivers: riskData.drivers,
    topDriver: riskData.topDriver,
    recommendedIntervention: intervention,
    projectedROI: roiProjection
  };
}).sort((a, b) => b.riskScore - a.riskScore); // Sort by risk score descending

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
  RETENTION_CONFIG,
  PROPERTIES,
  PORTFOLIO_TOTALS,
  LIFECYCLE_STATES,
  PROVIDERS,
  SERVICES,
  calculateRetentionROI,
  computeRiskScore,
  recommendIntervention,
  estimateInterventionROI,
  SAMPLE_AT_RISK_RESIDENTS,
  AT_RISK_RESIDENTS_WITH_SCORES,
  PORTFOLIO_ANALYTICS,
  MANAGER_ANALYTICS,
  CONCIERGE_RESPONSES
};

