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
    atRiskCount: 6,           // Updated to match expanded resident list
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
    atRiskCount: 12,          // Updated to match expanded resident list
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
    atRiskCount: 17,          // Updated to match expanded resident list
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
  // BALLARD COMMONS - High Risk (6 total)
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
      maintenanceCount: 7,
      avgResponseTimeHours: 18,
      sentimentScore: 72,
      daysToLeaseEnd: 132,
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
    leaseEndDate: "2025-06-20",
    monthlyRent: 2300,
    moveInDate: "2023-03-15",
    frictionSignals: {
      maintenanceCount: 8,
      avgResponseTimeHours: 21,
      sentimentScore: 78,
      daysToLeaseEnd: 108,
      serviceUsageCount: 0
    },
    interventionHistory: []
  },
  {
    id: "res-ballard-312",
    name: "Casey Martinez",
    unit: "312",
    propertyId: "prop-ballard",
    email: "casey.m@email.com",
    phone: "(206) 555-0321",
    leaseEndDate: "2025-08-10",
    monthlyRent: 2380,
    moveInDate: "2022-08-10",
    frictionSignals: {
      maintenanceCount: 6,
      avgResponseTimeHours: 19,
      sentimentScore: 70,
      daysToLeaseEnd: 159,
      serviceUsageCount: 1
    },
    interventionHistory: []
  },
  {
    id: "res-ballard-408",
    name: "Devon Harris",
    unit: "408",
    propertyId: "prop-ballard",
    email: "devon.harris@email.com",
    phone: "(206) 555-0445",
    leaseEndDate: "2025-07-01",
    monthlyRent: 2320,
    moveInDate: "2023-07-01",
    frictionSignals: {
      maintenanceCount: 7,
      avgResponseTimeHours: 22,
      sentimentScore: 75,
      daysToLeaseEnd: 118,
      serviceUsageCount: 0
    },
    interventionHistory: []
  },
  {
    id: "res-ballard-515",
    name: "Jamie Rodriguez",
    unit: "515",
    propertyId: "prop-ballard",
    email: "j.rodriguez@email.com",
    phone: "(206) 555-0567",
    leaseEndDate: "2025-09-12",
    monthlyRent: 2410,
    moveInDate: "2024-03-12",
    frictionSignals: {
      maintenanceCount: 5,
      avgResponseTimeHours: 16,
      sentimentScore: 68,
      daysToLeaseEnd: 191,
      serviceUsageCount: 1
    },
    interventionHistory: []
  },
  {
    id: "res-ballard-602",
    name: "Morgan Lee",
    unit: "602",
    propertyId: "prop-ballard",
    email: "morgan.lee@email.com",
    phone: "(206) 555-0689",
    leaseEndDate: "2025-08-25",
    monthlyRent: 2390,
    moveInDate: "2023-02-25",
    frictionSignals: {
      maintenanceCount: 6,
      avgResponseTimeHours: 20,
      sentimentScore: 71,
      daysToLeaseEnd: 174,
      serviceUsageCount: 0
    },
    interventionHistory: []
  },

  // CAPITOL HILL RESIDENCES - High Risk (12 total)
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
  },
  {
    id: "res-capitol-405",
    name: "Riley Chen",
    unit: "405",
    propertyId: "prop-capitol",
    email: "riley.chen@email.com",
    phone: "(206) 555-0412",
    leaseEndDate: "2025-06-15",
    monthlyRent: 2475,
    moveInDate: "2022-12-15",
    frictionSignals: {
      maintenanceCount: 8,
      avgResponseTimeHours: 24,
      sentimentScore: 76,
      daysToLeaseEnd: 103,
      serviceUsageCount: 0
    },
    interventionHistory: []
  },
  {
    id: "res-capitol-801",
    name: "Quinn Thompson",
    unit: "801",
    propertyId: "prop-capitol",
    email: "q.thompson@email.com",
    phone: "(206) 555-0534",
    leaseEndDate: "2025-09-05",
    monthlyRent: 2520,
    moveInDate: "2023-09-05",
    frictionSignals: {
      maintenanceCount: 7,
      avgResponseTimeHours: 19,
      sentimentScore: 72,
      daysToLeaseEnd: 184,
      serviceUsageCount: 1
    },
    interventionHistory: []
  },
  {
    id: "res-capitol-208",
    name: "Jordan Williams",
    unit: "208",
    propertyId: "prop-capitol",
    email: "j.williams@email.com",
    phone: "(206) 555-0656",
    leaseEndDate: "2025-07-08",
    monthlyRent: 2430,
    moveInDate: "2023-07-08",
    frictionSignals: {
      maintenanceCount: 8,
      avgResponseTimeHours: 23,
      sentimentScore: 79,
      daysToLeaseEnd: 125,
      serviceUsageCount: 0
    },
    interventionHistory: []
  },
  {
    id: "res-capitol-514",
    name: "Avery Johnson",
    unit: "514",
    propertyId: "prop-capitol",
    email: "avery.j@email.com",
    phone: "(206) 555-0778",
    leaseEndDate: "2025-08-18",
    monthlyRent: 2490,
    moveInDate: "2022-08-18",
    frictionSignals: {
      maintenanceCount: 6,
      avgResponseTimeHours: 21,
      sentimentScore: 70,
      daysToLeaseEnd: 166,
      serviceUsageCount: 1
    },
    interventionHistory: []
  },
  {
    id: "res-capitol-903",
    name: "Dakota Brown",
    unit: "903",
    propertyId: "prop-capitol",
    email: "dakota.brown@email.com",
    phone: "(206) 555-0890",
    leaseEndDate: "2025-06-28",
    monthlyRent: 2510,
    moveInDate: "2023-06-28",
    frictionSignals: {
      maintenanceCount: 7,
      avgResponseTimeHours: 20,
      sentimentScore: 73,
      daysToLeaseEnd: 115,
      serviceUsageCount: 0
    },
    interventionHistory: []
  },
  {
    id: "res-capitol-1012",
    name: "Sage Miller",
    unit: "1012",
    propertyId: "prop-capitol",
    email: "sage.miller@email.com",
    phone: "(206) 555-0912",
    leaseEndDate: "2025-09-22",
    monthlyRent: 2540,
    moveInDate: "2024-03-22",
    frictionSignals: {
      maintenanceCount: 5,
      avgResponseTimeHours: 17,
      sentimentScore: 67,
      daysToLeaseEnd: 201,
      serviceUsageCount: 2
    },
    interventionHistory: []
  },
  {
    id: "res-capitol-615",
    name: "River Davis",
    unit: "615",
    propertyId: "prop-capitol",
    email: "river.davis@email.com",
    phone: "(206) 555-1034",
    leaseEndDate: "2025-07-15",
    monthlyRent: 2465,
    moveInDate: "2023-01-15",
    frictionSignals: {
      maintenanceCount: 8,
      avgResponseTimeHours: 25,
      sentimentScore: 77,
      daysToLeaseEnd: 132,
      serviceUsageCount: 0
    },
    interventionHistory: []
  },
  {
    id: "res-capitol-307",
    name: "Phoenix Garcia",
    unit: "307",
    propertyId: "prop-capitol",
    email: "phoenix.g@email.com",
    phone: "(206) 555-1156",
    leaseEndDate: "2025-08-30",
    monthlyRent: 2445,
    moveInDate: "2023-08-30",
    frictionSignals: {
      maintenanceCount: 6,
      avgResponseTimeHours: 18,
      sentimentScore: 69,
      daysToLeaseEnd: 178,
      serviceUsageCount: 1
    },
    interventionHistory: []
  },
  {
    id: "res-capitol-718",
    name: "Skylar Martinez",
    unit: "718",
    propertyId: "prop-capitol",
    email: "skylar.m@email.com",
    phone: "(206) 555-1278",
    leaseEndDate: "2025-06-10",
    monthlyRent: 2480,
    moveInDate: "2022-12-10",
    frictionSignals: {
      maintenanceCount: 9,
      avgResponseTimeHours: 27,
      sentimentScore: 82,
      daysToLeaseEnd: 98,
      serviceUsageCount: 0
    },
    interventionHistory: []
  },
  {
    id: "res-capitol-1104",
    name: "Rowan Anderson",
    unit: "1104",
    propertyId: "prop-capitol",
    email: "rowan.anderson@email.com",
    phone: "(206) 555-1390",
    leaseEndDate: "2025-09-14",
    monthlyRent: 2555,
    moveInDate: "2024-03-14",
    frictionSignals: {
      maintenanceCount: 5,
      avgResponseTimeHours: 16,
      sentimentScore: 66,
      daysToLeaseEnd: 193,
      serviceUsageCount: 2
    },
    interventionHistory: []
  },

  // BELLEVUE SKYLINE TOWERS - High Risk (17 total)
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
    id: "res-bellevue-412",
    name: "Emerson Taylor",
    unit: "412",
    propertyId: "prop-bellevue",
    email: "emerson.t@email.com",
    phone: "(425) 555-0356",
    leaseEndDate: "2025-07-22",
    monthlyRent: 2680,
    moveInDate: "2022-07-22",
    frictionSignals: {
      maintenanceCount: 9,
      avgResponseTimeHours: 26,
      sentimentScore: 83,
      daysToLeaseEnd: 139,
      serviceUsageCount: 0
    },
    interventionHistory: []
  },
  {
    id: "res-bellevue-1208",
    name: "Charlie Wilson",
    unit: "1208",
    propertyId: "prop-bellevue",
    email: "charlie.wilson@email.com",
    phone: "(425) 555-0478",
    leaseEndDate: "2025-06-05",
    monthlyRent: 2720,
    moveInDate: "2023-06-05",
    frictionSignals: {
      maintenanceCount: 10,
      avgResponseTimeHours: 28,
      sentimentScore: 85,
      daysToLeaseEnd: 93,
      serviceUsageCount: 0
    },
    interventionHistory: []
  },
  {
    id: "res-bellevue-704",
    name: "Finley Moore",
    unit: "704",
    propertyId: "prop-bellevue",
    email: "finley.moore@email.com",
    phone: "(425) 555-0590",
    leaseEndDate: "2025-08-12",
    monthlyRent: 2640,
    moveInDate: "2023-08-12",
    frictionSignals: {
      maintenanceCount: 7,
      avgResponseTimeHours: 22,
      sentimentScore: 74,
      daysToLeaseEnd: 160,
      serviceUsageCount: 1
    },
    interventionHistory: []
  },
  {
    id: "res-bellevue-915",
    name: "Reese Jackson",
    unit: "915",
    propertyId: "prop-bellevue",
    email: "reese.jackson@email.com",
    phone: "(425) 555-0612",
    leaseEndDate: "2025-07-05",
    monthlyRent: 2690,
    moveInDate: "2022-07-05",
    frictionSignals: {
      maintenanceCount: 8,
      avgResponseTimeHours: 25,
      sentimentScore: 79,
      daysToLeaseEnd: 122,
      serviceUsageCount: 0
    },
    interventionHistory: []
  },
  {
    id: "res-bellevue-308",
    name: "Blake White",
    unit: "308",
    propertyId: "prop-bellevue",
    email: "blake.white@email.com",
    phone: "(425) 555-0734",
    leaseEndDate: "2025-09-18",
    monthlyRent: 2610,
    moveInDate: "2024-03-18",
    frictionSignals: {
      maintenanceCount: 6,
      avgResponseTimeHours: 19,
      sentimentScore: 71,
      daysToLeaseEnd: 197,
      serviceUsageCount: 1
    },
    interventionHistory: []
  },
  {
    id: "res-bellevue-1011",
    name: "Peyton Harris",
    unit: "1011",
    propertyId: "prop-bellevue",
    email: "peyton.harris@email.com",
    phone: "(425) 555-0856",
    leaseEndDate: "2025-06-25",
    monthlyRent: 2700,
    moveInDate: "2023-06-25",
    frictionSignals: {
      maintenanceCount: 9,
      avgResponseTimeHours: 27,
      sentimentScore: 81,
      daysToLeaseEnd: 112,
      serviceUsageCount: 0
    },
    interventionHistory: []
  },
  {
    id: "res-bellevue-515",
    name: "Cameron Martin",
    unit: "515",
    propertyId: "prop-bellevue",
    email: "cameron.martin@email.com",
    phone: "(425) 555-0978",
    leaseEndDate: "2025-08-28",
    monthlyRent: 2630,
    moveInDate: "2023-02-28",
    frictionSignals: {
      maintenanceCount: 7,
      avgResponseTimeHours: 21,
      sentimentScore: 73,
      daysToLeaseEnd: 176,
      serviceUsageCount: 1
    },
    interventionHistory: []
  },
  {
    id: "res-bellevue-1314",
    name: "Hayden Thompson",
    unit: "1314",
    propertyId: "prop-bellevue",
    email: "hayden.t@email.com",
    phone: "(425) 555-1090",
    leaseEndDate: "2025-07-18",
    monthlyRent: 2750,
    moveInDate: "2022-07-18",
    frictionSignals: {
      maintenanceCount: 8,
      avgResponseTimeHours: 23,
      sentimentScore: 76,
      daysToLeaseEnd: 135,
      serviceUsageCount: 0
    },
    interventionHistory: []
  },
  {
    id: "res-bellevue-602",
    name: "Kendall Lee",
    unit: "602",
    propertyId: "prop-bellevue",
    email: "kendall.lee@email.com",
    phone: "(425) 555-1212",
    leaseEndDate: "2025-09-08",
    monthlyRent: 2620,
    moveInDate: "2024-03-08",
    frictionSignals: {
      maintenanceCount: 5,
      avgResponseTimeHours: 17,
      sentimentScore: 68,
      daysToLeaseEnd: 187,
      serviceUsageCount: 2
    },
    interventionHistory: []
  },
  {
    id: "res-bellevue-1107",
    name: "Logan Clark",
    unit: "1107",
    propertyId: "prop-bellevue",
    email: "logan.clark@email.com",
    phone: "(425) 555-1334",
    leaseEndDate: "2025-06-12",
    monthlyRent: 2710,
    moveInDate: "2022-12-12",
    frictionSignals: {
      maintenanceCount: 9,
      avgResponseTimeHours: 25,
      sentimentScore: 80,
      daysToLeaseEnd: 100,
      serviceUsageCount: 0
    },
    interventionHistory: []
  },
  {
    id: "res-bellevue-418",
    name: "Ellis Rodriguez",
    unit: "418",
    propertyId: "prop-bellevue",
    email: "ellis.rodriguez@email.com",
    phone: "(425) 555-1456",
    leaseEndDate: "2025-08-22",
    monthlyRent: 2660,
    moveInDate: "2023-08-22",
    frictionSignals: {
      maintenanceCount: 6,
      avgResponseTimeHours: 20,
      sentimentScore: 72,
      daysToLeaseEnd: 170,
      serviceUsageCount: 1
    },
    interventionHistory: []
  },
  {
    id: "res-bellevue-810",
    name: "Sawyer Lewis",
    unit: "810",
    propertyId: "prop-bellevue",
    email: "sawyer.lewis@email.com",
    phone: "(425) 555-1578",
    leaseEndDate: "2025-07-28",
    monthlyRent: 2670,
    moveInDate: "2023-01-28",
    frictionSignals: {
      maintenanceCount: 8,
      avgResponseTimeHours: 24,
      sentimentScore: 77,
      daysToLeaseEnd: 145,
      serviceUsageCount: 0
    },
    interventionHistory: []
  },
  {
    id: "res-bellevue-1415",
    name: "Parker Walker",
    unit: "1415",
    propertyId: "prop-bellevue",
    email: "parker.walker@email.com",
    phone: "(425) 555-1690",
    leaseEndDate: "2025-09-25",
    monthlyRent: 2760,
    moveInDate: "2024-03-25",
    frictionSignals: {
      maintenanceCount: 5,
      avgResponseTimeHours: 18,
      sentimentScore: 69,
      daysToLeaseEnd: 204,
      serviceUsageCount: 1
    },
    interventionHistory: []
  },
  {
    id: "res-bellevue-209",
    name: "Harley Young",
    unit: "209",
    propertyId: "prop-bellevue",
    email: "harley.young@email.com",
    phone: "(425) 555-1812",
    leaseEndDate: "2025-06-18",
    monthlyRent: 2590,
    moveInDate: "2023-06-18",
    frictionSignals: {
      maintenanceCount: 7,
      avgResponseTimeHours: 22,
      sentimentScore: 75,
      daysToLeaseEnd: 105,
      serviceUsageCount: 0
    },
    interventionHistory: []
  },
  {
    id: "res-bellevue-1203",
    name: "Stevie Allen",
    unit: "1203",
    propertyId: "prop-bellevue",
    email: "stevie.allen@email.com",
    phone: "(425) 555-1934",
    leaseEndDate: "2025-08-05",
    monthlyRent: 2730,
    moveInDate: "2022-08-05",
    frictionSignals: {
      maintenanceCount: 8,
      avgResponseTimeHours: 26,
      sentimentScore: 78,
      daysToLeaseEnd: 153,
      serviceUsageCount: 0
    },
    interventionHistory: []
  },
  {
    id: "res-bellevue-511",
    name: "Rory King",
    unit: "511",
    propertyId: "prop-bellevue",
    email: "rory.king@email.com",
    phone: "(425) 555-2056",
    leaseEndDate: "2025-09-12",
    monthlyRent: 2615,
    moveInDate: "2024-03-12",
    frictionSignals: {
      maintenanceCount: 6,
      avgResponseTimeHours: 19,
      sentimentScore: 70,
      daysToLeaseEnd: 191,
      serviceUsageCount: 2
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

// ============================================================================
// PORTFOLIO ANALYTICS ROLLUP (Computed from Seattle portfolio)
// ============================================================================

/**
 * Compute current portfolio-wide retention metrics
 * All analytics must derive from this single source
 */
export const computePortfolioAnalytics = () => {
  const config = RETENTION_CONFIG.global;
  
  // Aggregate across all at-risk residents
  const totalAtRisk = AT_RISK_RESIDENTS_WITH_SCORES.length;
  const highRisk = AT_RISK_RESIDENTS_WITH_SCORES.filter(r => r.riskScore >= 80).length;
  const mediumRisk = AT_RISK_RESIDENTS_WITH_SCORES.filter(r => r.riskScore >= 70 && r.riskScore < 80).length;
  const lowRisk = AT_RISK_RESIDENTS_WITH_SCORES.filter(r => r.riskScore >= 60 && r.riskScore < 70).length;
  
  // Sum recommended credits across all interventions
  const totalCreditsRecommended = AT_RISK_RESIDENTS_WITH_SCORES.reduce(
    (sum, r) => sum + (r.recommendedIntervention?.creditOffer || 0), 0
  );
  
  // Sum projected savings
  const totalProjectedSavings = AT_RISK_RESIDENTS_WITH_SCORES.reduce(
    (sum, r) => sum + (r.projectedROI?.expectedSavings || 0), 0
  );
  
  // Sum projected service revenue
  const totalProjectedRevenue = AT_RISK_RESIDENTS_WITH_SCORES.reduce(
    (sum, r) => sum + (r.projectedROI?.expectedRevenue || 0), 0
  );
  
  // Calculate net ROI
  const netRetentionROI = totalProjectedSavings + totalProjectedRevenue - totalCreditsRecommended;
  const roiMultiple = totalCreditsRecommended > 0 ? netRetentionROI / totalCreditsRecommended : 0;
  
  // Simulated historical data (last 6 months) - scaled from current metrics
  const monthlyTrend = [
    { month: "Oct", turnoversAvoided: 6, creditsDeployed: 2100, serviceRevenue: 8820, retentionSavings: 22800 },
    { month: "Nov", turnoversAvoided: 7, creditsDeployed: 2450, serviceRevenue: 9380, retentionSavings: 26600 },
    { month: "Dec", turnoversAvoided: 8, creditsDeployed: 2800, serviceRevenue: 9940, retentionSavings: 30400 },
    { month: "Jan", turnoversAvoided: 9, creditsDeployed: 3150, serviceRevenue: 10500, retentionSavings: 34200 },
    { month: "Feb", turnoversAvoided: 8, creditsDeployed: 2800, serviceRevenue: 10080, retentionSavings: 30400 },
    { month: "Mar", turnoversAvoided: 9, creditsDeployed: 3150, serviceRevenue: 10640, retentionSavings: 34200 }
  ];
  
  // Calculate monthly ROI
  const monthlyROI = monthlyTrend.map(m => ({
    month: m.month,
    value: m.retentionSavings + m.serviceRevenue - m.creditsDeployed
  }));
  
  return {
    // Current snapshot
    current: {
      totalAtRisk,
      highRisk,
      mediumRisk,
      lowRisk,
      totalCreditsRecommended,
      totalProjectedSavings,
      totalProjectedRevenue,
      netRetentionROI,
      roiMultiple: roiMultiple.toFixed(2),
      avgTurnoverCost: config.avgTurnoverCost
    },
    
    // Historical trends
    trends: {
      retentionROI: monthlyROI,
      retentionSavings: monthlyTrend.map(m => ({ month: m.month, value: m.retentionSavings })),
      turnoversAvoided: monthlyTrend.map(m => ({ month: m.month, turnovers: m.turnoversAvoided })),
      serviceRevenue: monthlyTrend.map(m => ({ month: m.month, value: m.serviceRevenue })),
      creditsDeployed: monthlyTrend.map(m => ({ month: m.month, value: m.creditsDeployed }))
    },
    
    // Risk distribution
    riskDistribution: [
      { level: "High Risk", count: highRisk, percentage: Math.round((highRisk / totalAtRisk) * 100) },
      { level: "Medium Risk", count: mediumRisk, percentage: Math.round((mediumRisk / totalAtRisk) * 100) },
      { level: "Low Risk", count: lowRisk, percentage: Math.round((lowRisk / totalAtRisk) * 100) }
    ]
  };
};

/**
 * Get property performance summary for Admin dashboard
 */
export const getPropertyPerformance = () => {
  return PROPERTIES.map(property => {
    // Get at-risk residents for this property
    const propertyResidents = AT_RISK_RESIDENTS_WITH_SCORES.filter(r => r.propertyId === property.id);
    const interventionsRecommended = propertyResidents.length;
    
    // Calculate property-specific metrics
    const projectedSavings = propertyResidents.reduce(
      (sum, r) => sum + (r.projectedROI?.expectedSavings || 0), 0
    );
    
    const creditsRecommended = propertyResidents.reduce(
      (sum, r) => sum + (r.recommendedIntervention?.creditOffer || 0), 0
    );
    
    const projectedRevenue = propertyResidents.reduce(
      (sum, r) => sum + (r.projectedROI?.expectedRevenue || 0), 0
    );
    
    const netROI = projectedSavings + projectedRevenue - creditsRecommended;
    
    return {
      id: property.id,
      name: property.name,
      code: property.code,
      neighborhood: property.neighborhood,
      units: property.units,
      occupied: property.occupied,
      occupancyRate: ((property.occupied / property.units) * 100).toFixed(1),
      atRiskCount: propertyResidents.length,
      interventionsRecommended,
      creditsRecommended,
      projectedSavings,
      projectedRevenue,
      netROI,
      manager: property.manager,
      managerEmail: property.managerEmail
    };
  });
};

// AI Concierge responses (Seattle-specific)
export const CONCIERGE_RESPONSES = {
  greeting: "Hello! I'm your HappyCo AI Concierge for Seattle properties. I can help you book local services, manage maintenance requests, or answer questions about your retention credits. How can I assist you today?",
  
  bookCleaning: (creditAvailable) => `You currently have $${creditAvailable} in retention credits available. Emerald City Cleaning offers Deep Cleaning for $135 (2-3 hours). Would you like me to schedule that for you?`,
  
  scheduleMaintenance: "I can help you submit a maintenance request. What issue are you experiencing? Our Seattle partners cover HVAC (Puget Sound HVAC), plumbing (Cascade Plumbing), and general handyman services.",
  
  checkCredits: (creditAvailable) => `You have $${creditAvailable} in retention credits available. These credits can be applied to any service from our Seattle provider network. Would you like to browse available services?`,
  
  availableServices: "Here are our most popular Seattle services: Deep Cleaning ($135 - Emerald City Cleaning), AC Tune-up ($95 - Puget Sound HVAC), Pet Grooming ($75 - Seattle Pet Services), Furniture Assembly ($150 - Handy Seattle). Which interests you?",
  
  bookingConfirmed: (service, price, creditApplied) => `Perfect! I've scheduled your ${service} with our Seattle provider. ${creditApplied > 0 ? `I've applied $${creditApplied} from your retention credits.` : ''} Your ${creditApplied > 0 ? `remaining balance is $${price - creditApplied}` : `total is $${price}`}. You'll receive a confirmation shortly.`,
  
  maintenanceSubmitted: (category) => `I've submitted your ${category} maintenance request to our Seattle team. They'll review it within 2 hours and reach out to schedule a visit. Is there anything else I can help with?`,
  
  fallback: "I'm here to help with booking Seattle services, scheduling maintenance, or managing your retention credits. What would you like to do?"
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
  computePortfolioAnalytics,
  getPropertyPerformance,
  SAMPLE_AT_RISK_RESIDENTS,
  AT_RISK_RESIDENTS_WITH_SCORES,
  PORTFOLIO_ANALYTICS,
  MANAGER_ANALYTICS,
  CONCIERGE_RESPONSES
};

