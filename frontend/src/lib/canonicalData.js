/**
 * CANONICAL DATA REFERENCE - SINGLE SOURCE OF TRUTH
 * 
 * This file defines the authoritative demo data structure.
 * All frontend pages must use these constants to ensure consistency.
 * 
 * Backend seed data is the ultimate source of truth.
 * These constants mirror backend/app/seeds/constants.py and demo_dataset.py
 */

// Property IDs (match backend PROPERTY_IDS)
export const PROPERTY_IDS = {
  lakeside: "8af7a333-e11e-4a1d-bbe4-7bca4ace4d9d",
  downtown: "0cb4337d-0b19-42fb-b067-5a113fbe6628",
  metropolitan: "a4f7603e-dda0-4c44-b382-e159f8c773be", // Flagship
};

// Resident IDs (match backend RESIDENT_IDS)
export const RESIDENT_IDS = {
  alex: "79af8e83-cde9-4c36-b4ac-6af78b2904ca",
  maria: "b01171b9-7a34-4b53-a445-f4e41dfcc45f",
  james: "ba8f6dbb-18c1-45ba-b562-c7dc78fc56fa",
};

// Provider IDs (match backend PROVIDER_IDS)
export const PROVIDER_IDS = {
  sparkclean: "15d3e16a-b1d0-4ef7-a737-524ec5d1da7a",
  fixright: "d7d5fc8a-14de-4f9d-a7d8-4b756650d5cb",
  urban_pest: "efe938ff-589f-48ce-8b25-7542228de802",
};

// CANONICAL PROPERTIES (match backend seed exactly)
export const CANONICAL_PROPERTIES = [
  {
    id: PROPERTY_IDS.metropolitan,
    name: "The Metropolitan at Riverside",
    shortName: "The Metropolitan",
    code: "MR-003",
    address: {
      street: "901 Riverside Drive",
      city: "Denver",
      state: "CO",
      postalCode: "80202"
    },
    manager: "Sarah Mitchell",
    totalUnits: 100,
    occupiedUnits: 94,
    occupancyRate: 94.0,
    atRiskResidents: 12,
    avgChurnScore: 59,
    estimatedTurnoverCost: 3800,
    estimatedAnnualROI: 37000,
    creditsInvestedPerMonth: 500,
    avoidedTurnoversPerYear: 5,
    monthlyServiceRevenueProjection: 2000,
    providerCoveragePercent: 85,
    fulfillmentRate: 94,
    isFlagship: true
  },
  {
    id: PROPERTY_IDS.lakeside,
    name: "Lakeside Commons",
    shortName: "Lakeside Commons",
    code: "LC-001",
    address: {
      street: "1550 Lakeview Avenue",
      city: "Seattle",
      state: "WA",
      postalCode: "98101"
    },
    manager: "Portfolio Property",
    totalUnits: 96,
    occupiedUnits: 88,
    occupancyRate: 91.7,
    atRiskResidents: 7,
    avgChurnScore: 55,
    estimatedTurnoverCost: 3400,
    estimatedAnnualROI: 27480,
    creditsInvestedPerMonth: 240,
    avoidedTurnoversPerYear: 3,
    monthlyServiceRevenueProjection: 1680,
    providerCoveragePercent: 81,
    fulfillmentRate: 91,
    isFlagship: false
  },
  {
    id: PROPERTY_IDS.downtown,
    name: "Downtown Tower",
    shortName: "Downtown Tower",
    code: "DT-002",
    address: {
      street: "221 Market Street",
      city: "Austin",
      state: "TX",
      postalCode: "78701"
    },
    manager: "Portfolio Property",
    totalUnits: 128,
    occupiedUnits: 119,
    occupancyRate: 93.0,
    atRiskResidents: 6,
    avgChurnScore: 53,
    estimatedTurnoverCost: 3600,
    estimatedAnnualROI: 33600,
    creditsInvestedPerMonth: 300,
    avoidedTurnoversPerYear: 4,
    monthlyServiceRevenueProjection: 1900,
    providerCoveragePercent: 79,
    fulfillmentRate: 88,
    isFlagship: false
  }
];

// CANONICAL ALEX CHEN (flagship resident example)
export const ALEX_CHEN = {
  id: RESIDENT_IDS.alex,
  propertyId: PROPERTY_IDS.metropolitan,
  propertyName: "The Metropolitan at Riverside",
  userId: "0c7b51d0-f5eb-4e3b-88d8-7474c95fe157",
  fullName: "Alex Chen",
  unit: "501",
  email: "alex.chen@email.com",
  phone: "(555) 210-4501",
  riskScore: 74,
  riskTier: "high",
  primaryDriver: "Maintenance Frequency",
  communicationChannel: "SMS",
  leaseEnd: "2025-07-15",
  moveInDate: "2024-01-15",
  tags: ["QA Example", "Flagship Resident"],
  isQaResident: true
};

// CANONICAL PROVIDERS
export const CANONICAL_PROVIDERS = [
  {
    id: PROVIDER_IDS.sparkclean,
    name: "SparkClean",
    category: "Cleaning",
    serviceCategories: ["Cleaning", "Unit Refresh"],
    properties: [PROPERTY_IDS.metropolitan, PROPERTY_IDS.lakeside],
    propertyNames: ["The Metropolitan", "Lakeside Commons"],
    bookings: 87,
    utilization: 78,
    avgResponseTime: "2.4 hours",
    rating: 4.8,
    status: "active",
    coveragePercent: 84,
    fulfillmentRate: 95,
    expansionOpportunity: "High - Could expand to Downtown Tower"
  },
  {
    id: PROVIDER_IDS.fixright,
    name: "FixRight HVAC",
    category: "HVAC",
    serviceCategories: ["HVAC", "Ventilation"],
    properties: [PROPERTY_IDS.metropolitan, PROPERTY_IDS.downtown],
    propertyNames: ["The Metropolitan", "Downtown Tower"],
    bookings: 52,
    utilization: 71,
    avgResponseTime: "3.1 hours",
    rating: 4.6,
    status: "active",
    coveragePercent: 88,
    fulfillmentRate: 94,
    expansionOpportunity: "Medium - Could serve Lakeside Commons"
  },
  {
    id: PROVIDER_IDS.urban_pest,
    name: "Urban Pest Control",
    category: "Pest Control",
    serviceCategories: ["Pest Control", "Inspection"],
    properties: [PROPERTY_IDS.metropolitan, PROPERTY_IDS.lakeside, PROPERTY_IDS.downtown],
    propertyNames: ["The Metropolitan", "Lakeside Commons", "Downtown Tower"],
    bookings: 38,
    utilization: 64,
    avgResponseTime: "2.9 hours",
    rating: 4.7,
    status: "active",
    coveragePercent: 79,
    fulfillmentRate: 89,
    expansionOpportunity: "Medium - Full portfolio coverage achieved"
  }
];

// PORTFOLIO TOTALS (must sum from properties)
export const PORTFOLIO_TOTALS = {
  totalProperties: 3,
  totalUnits: 324, // 100 + 96 + 128
  occupiedUnits: 301, // 94 + 88 + 119
  occupancyRate: 92.9, // 301/324
  totalAtRisk: 25, // 12 + 7 + 6
  avgChurnScore: 57, // weighted average
  totalCreditsInvested: 1040, // 500 + 240 + 300
  totalProjectedSavings: 98080, // 37000 + 27480 + 33600
  totalAvoidedTurnovers: 12, // 5 + 3 + 4
  totalServiceRevenue: 5580, // 2000 + 1680 + 1900
  portfolioROI: 98080 - 1040, // Net ROI
  roiMultiple: 94.3 // (98080 / 1040)
};

// CANONICAL RESIDENTS (beyond Alex)
export const CANONICAL_RESIDENTS = [
  ALEX_CHEN, // Always first
  {
    id: RESIDENT_IDS.maria,
    propertyId: PROPERTY_IDS.lakeside,
    propertyName: "Lakeside Commons",
    fullName: "Maria Santos",
    unit: "312",
    email: "maria.santos@example.com",
    phone: "(555) 210-4488",
    riskScore: 72,
    riskTier: "high",
    primaryDriver: "Maintenance",
    communicationChannel: "SMS",
    leaseEnd: "2025-08-01",
    status: "Active"
  },
  {
    id: RESIDENT_IDS.james,
    propertyId: PROPERTY_IDS.downtown,
    propertyName: "Downtown Tower",
    fullName: "James Wilson",
    unit: "205",
    email: "james.wilson@example.com",
    phone: "(555) 210-4433",
    riskScore: 68,
    riskTier: "medium",
    primaryDriver: "Sentiment",
    communicationChannel: "Email",
    leaseEnd: "2025-09-15",
    status: "Active"
  }
];

// Helper to get property by ID
export function getPropertyById(propertyId) {
  return CANONICAL_PROPERTIES.find(p => p.id === propertyId);
}

// Helper to get resident by ID  
export function getResidentById(residentId) {
  return CANONICAL_RESIDENTS.find(r => r.id === residentId);
}

// Helper to get provider by ID
export function getProviderById(providerId) {
  return CANONICAL_PROVIDERS.find(p => p.id === providerId);
}

// ========================================
// MANAGER-SCOPED DATA HELPERS
// Sarah Mitchell manages The Metropolitan at Riverside only
// ========================================

export const SARAH_PROPERTY_ID = PROPERTY_IDS.metropolitan;

// Get Sarah's managed property
export function getSarahManagedProperty() {
  return CANONICAL_PROPERTIES.find(p => p.id === SARAH_PROPERTY_ID);
}

// Get residents for Sarah's property only
export function getSarahPropertyResidents() {
  return CANONICAL_RESIDENTS.filter(r => r.propertyId === SARAH_PROPERTY_ID);
}

// Get providers serving Sarah's property only
export function getSarahPropertyProviders() {
  return CANONICAL_PROVIDERS.filter(p => p.properties.includes(SARAH_PROPERTY_ID));
}

// Get property-level totals for Sarah's property
export function getSarahPropertyTotals() {
  const property = getSarahManagedProperty();
  if (!property) return null;
  
  return {
    propertyId: property.id,
    propertyName: property.name,
    totalUnits: property.totalUnits,
    occupiedUnits: property.occupiedUnits,
    occupancyRate: property.occupancyRate,
    atRiskResidents: property.atRiskResidents,
    creditsInvested: property.creditsInvestedPerMonth,
    projectedSavings: property.estimatedAnnualROI,
    avoidedTurnovers: property.avoidedTurnoversPerYear,
    serviceRevenue: property.monthlyServiceRevenueProjection,
    providerCoverage: property.providerCoveragePercent
  };
}

// ========================================
// RESIDENT-SCOPED DATA HELPERS  
// Alex Chen specific data only
// ========================================

// Get Alex Chen's data
export function getAlexChenData() {
  return ALEX_CHEN;
}

// Get Alex's property
export function getAlexProperty() {
  return getPropertyById(ALEX_CHEN.propertyId);
}

// Get providers serving Alex's property
export function getAlexPropertyProviders() {
  return CANONICAL_PROVIDERS.filter(p => p.properties.includes(ALEX_CHEN.propertyId));
}
