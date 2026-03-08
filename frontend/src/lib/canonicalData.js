/**
 * CANONICAL DATA MODEL - SINGLE SOURCE OF TRUTH
 * 
 * Hierarchical structure:
 * Portfolio (Admin) -> Properties -> Residents -> Bookings/Maintenance/etc
 * 
 * Data flows bottom-up:
 * - Resident data defines property metrics
 * - Property data defines portfolio metrics
 * - All counts and totals must reconcile exactly
 */

// ============================================================================
// IDS - Match backend constants
// ============================================================================

export const PROPERTY_IDS = {
  lakeside: "8af7a333-e11e-4a1d-bbe4-7bca4ace4d9d",
  downtown: "0cb4337d-0b19-42fb-b067-5a113fbe6628",
  metropolitan: "a4f7603e-dda0-4c44-b382-e159f8c773be",
};

export const RESIDENT_IDS = {
  alex: "79af8e83-cde9-4c36-b4ac-6af78b2904ca",
};

export const PROVIDER_IDS = {
  sparkclean: "15d3e16a-b1d0-4ef7-a737-524ec5d1da7a",
  fixright: "d7d5fc8a-14de-4f9d-a7d8-4b756650d5cb",
  urban_pest: "efe938ff-589f-48ce-8b25-7542228de802",
};

// ============================================================================
// CANONICAL ALEX CHEN - ONE TRUTH EVERYWHERE
// ============================================================================

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
  monthlyRent: 2400,
  status: "active",
  tags: ["High Risk", "Flagship Property"],
  isQaResident: true,
  
  // Extended profile
  petOwner: true,
  petType: "Dog",
  petName: "Bailey",
  householdSize: 1,
  workFromHome: true,
  preferredContactTime: "evenings",
  renewalStatus: "upcoming", // Lease renewal coming up in 4 months
  residentSince: "Jan 2024", // ~2 years of history
  previousIssues: [
    "HVAC cooling issue (Feb 2024)",
    "AC unit failed during summer (Jul 2024)",
    "Thermostat malfunction (Jan 2025)",
    "Air filter replacement delay (Feb 2025)"
  ],
  engagementLevel: "medium-low", // Responds to texts but hasn't used amenities recently
  satisfactionTrend: "declining", // Was happy initially, recent maintenance issues changed that
  notes: "Reliable resident who pays on time. Works from home full-time. Has become frustrated with repeat HVAC issues during hot months. Concerned about comfort for work-from-home setup. Has a golden retriever that needs regular grooming. Previously booked cleaning services but stopped after maintenance issues. Good candidate for retention credit tied to HVAC service + cleaning."
};

// ============================================================================
// CANONICAL RESIDENTS - All residents across all properties
// ============================================================================

export const CANONICAL_RESIDENTS = [
  // THE METROPOLITAN AT RIVERSIDE (100 units, 94 occupied)
  ALEX_CHEN,
  
  // High Risk (11 more = 12 total high risk at Metropolitan)
  { id: "res-met-002", propertyId: PROPERTY_IDS.metropolitan, fullName: "Michael Torres", unit: "302", email: "m.torres@email.com", phone: "(555) 210-4302", riskScore: 76, riskTier: "high", primaryDriver: "Maintenance Frequency", communicationChannel: "Email", leaseEnd: "2025-06-20", moveInDate: "2024-02-10", monthlyRent: 2350, status: "active" },
  { id: "res-met-003", propertyId: PROPERTY_IDS.metropolitan, fullName: "Jennifer Park", unit: "405", email: "j.park@email.com", phone: "(555) 210-4405", riskScore: 73, riskTier: "high", primaryDriver: "Resolution Time", communicationChannel: "SMS", leaseEnd: "2025-08-15", moveInDate: "2023-12-01", monthlyRent: 2500, status: "active" },
  { id: "res-met-004", propertyId: PROPERTY_IDS.metropolitan, fullName: "David Kim", unit: "508", email: "d.kim@email.com", phone: "(555) 210-4508", riskScore: 72, riskTier: "high", primaryDriver: "Sentiment Analysis", communicationChannel: "Email", leaseEnd: "2025-05-30", moveInDate: "2024-03-15", monthlyRent: 2450, status: "active" },
  { id: "res-met-005", propertyId: PROPERTY_IDS.metropolitan, fullName: "Sarah Johnson", unit: "601", email: "s.johnson@email.com", phone: "(555) 210-4601", riskScore: 71, riskTier: "high", primaryDriver: "Maintenance Frequency", communicationChannel: "SMS", leaseEnd: "2025-07-22", moveInDate: "2024-01-20", monthlyRent: 2600, status: "active" },
  { id: "res-met-006", propertyId: PROPERTY_IDS.metropolitan, fullName: "Robert Lee", unit: "703", email: "r.lee@email.com", phone: "(555) 210-4703", riskScore: 70, riskTier: "high", primaryDriver: "Engagement Level", communicationChannel: "Email", leaseEnd: "2025-09-10", moveInDate: "2023-11-15", monthlyRent: 2550, status: "active" },
  { id: "res-met-007", propertyId: PROPERTY_IDS.metropolitan, fullName: "Lisa Martinez", unit: "805", email: "l.martinez@email.com", phone: "(555) 210-4805", riskScore: 70, riskTier: "high", primaryDriver: "Resolution Time", communicationChannel: "SMS", leaseEnd: "2025-06-05", moveInDate: "2024-04-01", monthlyRent: 2700, status: "active" },
  { id: "res-met-008", propertyId: PROPERTY_IDS.metropolitan, fullName: "James Wilson", unit: "902", email: "j.wilson@email.com", phone: "(555) 210-4902", riskScore: 70, riskTier: "high", primaryDriver: "Maintenance Frequency", communicationChannel: "Email", leaseEnd: "2025-08-28", moveInDate: "2023-10-12", monthlyRent: 2650, status: "active" },
  { id: "res-met-009", propertyId: PROPERTY_IDS.metropolitan, fullName: "Maria Garcia", unit: "204", email: "m.garcia@email.com", phone: "(555) 210-4204", riskScore: 70, riskTier: "high", primaryDriver: "Sentiment Analysis", communicationChannel: "SMS", leaseEnd: "2025-05-18", moveInDate: "2024-05-10", monthlyRent: 2300, status: "active" },
  { id: "res-met-010", propertyId: PROPERTY_IDS.metropolitan, fullName: "William Brown", unit: "307", email: "w.brown@email.com", phone: "(555) 210-4307", riskScore: 70, riskTier: "high", primaryDriver: "Engagement Level", communicationChannel: "Email", leaseEnd: "2025-07-08", moveInDate: "2024-02-15", monthlyRent: 2400, status: "active" },
  { id: "res-met-011", propertyId: PROPERTY_IDS.metropolitan, fullName: "Emma Davis", unit: "410", email: "e.davis@email.com", phone: "(555) 210-4410", riskScore: 70, riskTier: "high", primaryDriver: "Resolution Time", communicationChannel: "SMS", leaseEnd: "2025-06-25", moveInDate: "2024-03-20", monthlyRent: 2500, status: "active" },
  { id: "res-met-012", propertyId: PROPERTY_IDS.metropolitan, fullName: "Daniel Rodriguez", unit: "512", email: "d.rodriguez@email.com", phone: "(555) 210-4512", riskScore: 70, riskTier: "high", primaryDriver: "Maintenance Frequency", communicationChannel: "Email", leaseEnd: "2025-09-12", moveInDate: "2023-12-18", monthlyRent: 2450, status: "active" },

  // Medium Risk (30 residents with scores 50-69)
  { id: "res-met-013", propertyId: PROPERTY_IDS.metropolitan, fullName: "Olivia Miller", unit: "605", email: "o.miller@email.com", phone: "(555) 210-4605", riskScore: 65, riskTier: "medium", primaryDriver: "Sentiment Analysis", communicationChannel: "SMS", leaseEnd: "2025-10-15", moveInDate: "2023-11-01", monthlyRent: 2500, status: "active" },
  
  // Generate remaining medium risk residents (29 more for total of 30 medium risk)
  ...Array.from({ length: 29 }, (_, i) => ({
    id: `res-met-${String(i + 14).padStart(3, '0')}`,
    propertyId: PROPERTY_IDS.metropolitan,
    fullName: `Resident ${i + 14}`,
    unit: `${Math.floor((i + 14) / 10) + 1}${String((i + 14) % 10).padStart(2, '0')}`,
    email: `resident${i + 14}@email.com`,
    phone: `(555) 210-${String(4000 + i + 14).padStart(4, '0')}`,
    riskScore: 50 + Math.floor(Math.random() * 20),
    riskTier: "medium",
    primaryDriver: ["Maintenance Frequency", "Resolution Time", "Sentiment Analysis", "Engagement Level"][i % 4],
    communicationChannel: i % 2 === 0 ? "Email" : "SMS",
    leaseEnd: "2025-09-01",
    moveInDate: "2024-01-01",
    monthlyRent: 2300 + Math.floor(Math.random() * 400),
    status: "active"
  })),
  
  // Low Risk (52 residents to reach 94 total: 12 high + 30 medium + 52 low = 94)
  ...Array.from({ length: 52 }, (_, i) => ({
    id: `res-met-${String(i + 43).padStart(3, '0')}`,
    propertyId: PROPERTY_IDS.metropolitan,
    fullName: `Resident ${i + 43}`,
    unit: `${Math.floor((i + 43) / 10) + 1}${String((i + 43) % 10).padStart(2, '0')}`,
    email: `resident${i + 43}@email.com`,
    phone: `(555) 210-${String(4000 + i + 43).padStart(4, '0')}`,
    riskScore: 20 + Math.floor(Math.random() * 30),
    riskTier: "low",
    primaryDriver: ["Maintenance Frequency", "Resolution Time", "Sentiment Analysis", "Engagement Level"][i % 4],
    communicationChannel: i % 2 === 0 ? "Email" : "SMS",
    leaseEnd: "2025-10-01",
    moveInDate: "2023-06-01",
    monthlyRent: 2200 + Math.floor(Math.random() * 500),
    status: "active"
  })),

  // LAKESIDE COMMONS (96 units, 88 occupied, 7 at risk)
  // High Risk (7 residents)
  { id: "res-lake-001", propertyId: PROPERTY_IDS.lakeside, fullName: "Maria Santos", unit: "312", email: "maria.santos@example.com", phone: "(555) 210-5312", riskScore: 72, riskTier: "high", primaryDriver: "Maintenance", communicationChannel: "SMS", leaseEnd: "2025-08-01", moveInDate: "2023-10-15", monthlyRent: 1900, status: "active" },
  ...Array.from({ length: 6 }, (_, i) => ({
    id: `res-lake-${String(i + 2).padStart(3, '0')}`,
    propertyId: PROPERTY_IDS.lakeside,
    fullName: `Lakeside Resident ${i + 2}`,
    unit: `${Math.floor((i + 2) / 10) + 3}${String((i + 2) % 10).padStart(2, '0')}`,
    email: `lakeside${i + 2}@example.com`,
    phone: `(555) 210-${String(5000 + i + 2).padStart(4, '0')}`,
    riskScore: 70 + Math.floor(Math.random() * 8),
    riskTier: "high",
    primaryDriver: ["Maintenance Frequency", "Resolution Time"][i % 2],
    communicationChannel: i % 2 === 0 ? "Email" : "SMS",
    leaseEnd: "2025-08-01",
    moveInDate: "2023-09-01",
    monthlyRent: 1850 + Math.floor(Math.random() * 200),
    status: "active"
  })),
  
  // Medium and Low Risk (81 residents: 88 - 7 = 81)
  ...Array.from({ length: 81 }, (_, i) => ({
    id: `res-lake-${String(i + 8).padStart(3, '0')}`,
    propertyId: PROPERTY_IDS.lakeside,
    fullName: `Lakeside Resident ${i + 8}`,
    unit: `${Math.floor((i + 8) / 10) + 1}${String((i + 8) % 10).padStart(2, '0')}`,
    email: `lakeside${i + 8}@example.com`,
    phone: `(555) 210-${String(5000 + i + 8).padStart(4, '0')}`,
    riskScore: 20 + Math.floor(Math.random() * 48),
    riskTier: Math.random() > 0.5 ? "medium" : "low",
    primaryDriver: ["Maintenance Frequency", "Resolution Time", "Sentiment Analysis"][i % 3],
    communicationChannel: i % 2 === 0 ? "Email" : "SMS",
    leaseEnd: "2025-09-01",
    moveInDate: "2023-08-01",
    monthlyRent: 1800 + Math.floor(Math.random() * 300),
    status: "active"
  })),

  // DOWNTOWN TOWER (128 units, 119 occupied, 6 at risk)
  // High Risk (6 residents)
  ...Array.from({ length: 6 }, (_, i) => ({
    id: `res-down-${String(i + 1).padStart(3, '0')}`,
    propertyId: PROPERTY_IDS.downtown,
    fullName: `Downtown Resident ${i + 1}`,
    unit: `${Math.floor((i + 1) / 10) + 2}${String((i + 1) % 10).padStart(2, '0')}`,
    email: `downtown${i + 1}@example.com`,
    phone: `(555) 210-${String(6000 + i + 1).padStart(4, '0')}`,
    riskScore: 70 + Math.floor(Math.random() * 10),
    riskTier: "high",
    primaryDriver: ["Maintenance Frequency", "Sentiment"][i % 2],
    communicationChannel: i % 2 === 0 ? "Email" : "SMS",
    leaseEnd: "2025-09-15",
    moveInDate: "2023-07-01",
    monthlyRent: 2100 + Math.floor(Math.random() * 300),
    status: "active"
  })),
  
  // Medium and Low Risk (113 residents: 119 - 6 = 113)
  ...Array.from({ length: 113 }, (_, i) => ({
    id: `res-down-${String(i + 7).padStart(3, '0')}`,
    propertyId: PROPERTY_IDS.downtown,
    fullName: `Downtown Resident ${i + 7}`,
    unit: `${Math.floor((i + 7) / 10) + 1}${String((i + 7) % 10).padStart(2, '0')}`,
    email: `downtown${i + 7}@example.com`,
    phone: `(555) 210-${String(6000 + i + 7).padStart(4, '0')}`,
    riskScore: 20 + Math.floor(Math.random() * 48),
    riskTier: Math.random() > 0.5 ? "medium" : "low",
    primaryDriver: ["Maintenance Frequency", "Resolution Time", "Sentiment Analysis"][i % 3],
    communicationChannel: i % 2 === 0 ? "Email" : "SMS",
    leaseEnd: "2025-10-01",
    moveInDate: "2023-06-01",
    monthlyRent: 2000 + Math.floor(Math.random() * 400),
    status: "active"
  }))
];

// ============================================================================
// CANONICAL PROPERTIES - Built from resident data
// ============================================================================

function calculatePropertyMetrics(propertyId) {
  const residents = CANONICAL_RESIDENTS.filter(r => r.propertyId === propertyId);
  const highRisk = residents.filter(r => r.riskTier === "high").length;
  const mediumRisk = residents.filter(r => r.riskTier === "medium").length;
  const lowRisk = residents.filter(r => r.riskTier === "low").length;
  const avgScore = residents.length > 0 ? Math.round(residents.reduce((sum, r) => sum + r.riskScore, 0) / residents.length) : 0;
  
  return {
    occupiedUnits: residents.length,
    atRiskResidents: highRisk,
    highRiskCount: highRisk,
    mediumRiskCount: mediumRisk,
    lowRiskCount: lowRisk,
    avgChurnScore: avgScore
  };
}

const metMetrics = calculatePropertyMetrics(PROPERTY_IDS.metropolitan);
const lakeMetrics = calculatePropertyMetrics(PROPERTY_IDS.lakeside);
const downMetrics = calculatePropertyMetrics(PROPERTY_IDS.downtown);

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
    managerEmail: "sarah.mitchell@riverside.com",
    totalUnits: 100,
    occupiedUnits: metMetrics.occupiedUnits,
    occupancyRate: Number(((metMetrics.occupiedUnits / 100) * 100).toFixed(1)),
    atRiskResidents: metMetrics.atRiskResidents,
    avgChurnScore: metMetrics.avgChurnScore,
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
    managerEmail: null,
    totalUnits: 96,
    occupiedUnits: lakeMetrics.occupiedUnits,
    occupancyRate: Number(((lakeMetrics.occupiedUnits / 96) * 100).toFixed(1)),
    atRiskResidents: lakeMetrics.atRiskResidents,
    avgChurnScore: lakeMetrics.avgChurnScore,
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
    managerEmail: null,
    totalUnits: 128,
    occupiedUnits: downMetrics.occupiedUnits,
    occupancyRate: Number(((downMetrics.occupiedUnits / 128) * 100).toFixed(1)),
    atRiskResidents: downMetrics.atRiskResidents,
    avgChurnScore: downMetrics.avgChurnScore,
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

// ============================================================================
// PORTFOLIO TOTALS - Calculated from properties
// ============================================================================

const totalOccupied = CANONICAL_PROPERTIES.reduce((sum, p) => sum + p.occupiedUnits, 0);
const totalUnits = CANONICAL_PROPERTIES.reduce((sum, p) => sum + p.totalUnits, 0);
const totalAtRisk = CANONICAL_PROPERTIES.reduce((sum, p) => sum + p.atRiskResidents, 0);

export const PORTFOLIO_TOTALS = {
  totalProperties: 3,
  totalUnits: totalUnits,
  occupiedUnits: totalOccupied,
  occupancyRate: Number(((totalOccupied / totalUnits) * 100).toFixed(1)),
  totalAtRisk: totalAtRisk,
  avgChurnScore: 57,
  totalCreditsInvested: 1040,
  totalProjectedSavings: 98080,
  totalAvoidedTurnovers: 12,
  totalServiceRevenue: 5580,
  portfolioROI: 97040,
  roiMultiple: 94.3
};

// ============================================================================
// CANONICAL PROVIDERS
// ============================================================================

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
    fulfillmentRate: 95
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
    fulfillmentRate: 94
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
    fulfillmentRate: 89
  },
  {
    id: "provider-004",
    name: "AirPure Specialists",
    category: "Air Quality & Ventilation",
    serviceCategories: ["Vent Cleaning", "Air Quality", "Filter Replacement"],
    properties: [PROPERTY_IDS.metropolitan, PROPERTY_IDS.downtown],
    propertyNames: ["The Metropolitan", "Downtown Tower"],
    bookings: 34,
    utilization: 68,
    avgResponseTime: "2.8 hours",
    rating: 4.7,
    status: "active",
    coveragePercent: 82,
    fulfillmentRate: 91
  },
  {
    id: "provider-005",
    name: "ProClean Plus",
    category: "Deep Cleaning & Refresh",
    serviceCategories: ["Deep Cleaning", "Move-Out Service", "Premium Refresh"],
    properties: [PROPERTY_IDS.metropolitan, PROPERTY_IDS.lakeside],
    propertyNames: ["The Metropolitan", "Lakeside Commons"],
    bookings: 29,
    utilization: 73,
    avgResponseTime: "3.5 hours",
    rating: 4.9,
    status: "active",
    coveragePercent: 76,
    fulfillmentRate: 96
  },
  {
    id: "provider-006",
    name: "QuickFix Handyman",
    category: "Rapid Response Maintenance",
    serviceCategories: ["General Repairs", "Electrical", "Plumbing", "Emergency Response"],
    properties: [PROPERTY_IDS.metropolitan, PROPERTY_IDS.lakeside, PROPERTY_IDS.downtown],
    propertyNames: ["The Metropolitan", "Lakeside Commons", "Downtown Tower"],
    bookings: 61,
    utilization: 85,
    avgResponseTime: "1.2 hours",
    rating: 4.8,
    status: "active",
    coveragePercent: 92,
    fulfillmentRate: 93
  }
];

// ============================================================================
// PROVIDER EXPANSION OPPORTUNITIES
// ============================================================================

export const PROVIDER_EXPANSION_OPPORTUNITIES = [
  {
    id: "exp-001",
    title: "HVAC Service Depth - Lakeside Commons",
    affectedProperties: ["Lakeside Commons"],
    reason: "Property lacks dedicated HVAC provider coverage",
    frictionSignal: "Repeat HVAC complaints driving 43% of Lakeside churn risk",
    demandSignal: "12 residents requested HVAC services last quarter with no local provider",
    priority: "High",
    expectedImpact: "Reduce churn risk by 8-12 points for 7 at-risk residents",
    revenueOpportunity: "$840/month in HVAC service revenue",
    nextAction: "Onboard FixRight HVAC or equivalent regional HVAC specialist"
  },
  {
    id: "exp-002",
    title: "Premium Pet Services - Portfolio Wide",
    affectedProperties: ["The Metropolitan", "Lakeside Commons", "Downtown Tower"],
    reason: "35% of residents have pets but no premium grooming/training options",
    frictionSignal: "Pet owners report limited concierge service value",
    demandSignal: "18 residents with dogs, 11 with cats, zero premium pet bookings YTD",
    priority: "Medium",
    expectedImpact: "Increase resident satisfaction scores by 15-20% for pet owners",
    revenueOpportunity: "$1,200/month in pet service revenue",
    nextAction: "Partner with PetSpa Pro or PawsPerfect for premium mobile grooming"
  },
  {
    id: "exp-003",
    title: "Air Quality & Vent Cleaning - High Risk Units",
    affectedProperties: ["The Metropolitan", "Downtown Tower"],
    reason: "Vent maintenance tied to 28% of repeat HVAC friction cases",
    frictionSignal: "Air quality complaints correlate with elevated churn scores",
    demandSignal: "9 residents flagged poor airflow or vent noise in Q1 maintenance tickets",
    priority: "High",
    expectedImpact: "Prevent repeat HVAC issues, reduce churn by 6-10 points per unit",
    revenueOpportunity: "$600/month in vent cleaning and air quality services",
    nextAction: "Add AirPure Specialists to provider network for quarterly vent inspections"
  },
  {
    id: "exp-004",
    title: "Express Cleaning Capacity - Peak Retention Periods",
    affectedProperties: ["The Metropolitan", "Lakeside Commons"],
    reason: "Cleaning bookings exceed capacity during lease renewal months",
    frictionSignal: "4+ day wait times for cleaning during retention intervention pushes",
    demandSignal: "23% booking overflow in Feb-Mar retention credit deployment",
    priority: "Medium",
    expectedImpact: "Capture $2,400 in missed cleaning revenue, improve intervention speed",
    revenueOpportunity: "$2,400/quarter during peak retention months",
    nextAction: "Add backup cleaning provider (CleanSwift) for peak season overflow"
  },
  {
    id: "exp-005",
    title: "Rapid Response Providers - High Risk Units",
    affectedProperties: ["Downtown Tower"],
    reason: "Slow response times (3.5+ hour avg) increase resident frustration",
    frictionSignal: "Response time delays contribute to 18% of Downtown churn cases",
    demandSignal: "High-risk residents need <2 hour response for retention effectiveness",
    priority: "High",
    expectedImpact: "Reduce Downtown churn score by 10-15 points through faster resolution",
    revenueOpportunity: "$900/month in priority response bookings",
    nextAction: "Recruit local rapid-response provider with <90 min SLA"
  },
  {
    id: "exp-006",
    title: "Preventative Maintenance Bundling",
    affectedProperties: ["The Metropolitan", "Lakeside Commons", "Downtown Tower"],
    reason: "Reactive maintenance drives churn; preventative packages reduce friction",
    frictionSignal: "Residents with 3+ repeat issues have 2.3x higher churn scores",
    demandSignal: "Zero bundled preventative packages offered; 34 residents qualify",
    priority: "Medium",
    expectedImpact: "Reduce repeat issue frequency by 40%, improve retention by 12%",
    revenueOpportunity: "$3,200/month in recurring preventative service contracts",
    nextAction: "Launch quarterly HVAC + vent + filter bundle for high-risk units"
  }
];

// ============================================================================
// MAINTENANCE HISTORY - Property Scoped
// ============================================================================

export const CANONICAL_MAINTENANCE = [
  // Alex Chen maintenance (The Metropolitan)
  {
    id: "maint-alex-001",
    residentId: ALEX_CHEN.id,
    residentName: ALEX_CHEN.fullName,
    propertyId: PROPERTY_IDS.metropolitan,
    unit: ALEX_CHEN.unit,
    issueType: "HVAC",
    issueTitle: "AC cooling issue reopened",
    description: "AC still blowing warm air overnight",
    status: "closed",
    openedAt: new Date(Date.now() - 33 * 24 * 60 * 60 * 1000),
    resolvedAt: new Date(Date.now() - 29 * 24 * 60 * 60 * 1000),
    resolutionDays: 4,
    repeatIssue: true
  },
  {
    id: "maint-alex-002",
    residentId: ALEX_CHEN.id,
    residentName: ALEX_CHEN.fullName,
    propertyId: PROPERTY_IDS.metropolitan,
    unit: ALEX_CHEN.unit,
    issueType: "Appliance",
    issueTitle: "Dishwasher leak follow-up",
    description: "Leak returned under lower rack",
    status: "closed",
    openedAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
    resolvedAt: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000),
    resolutionDays: 5,
    repeatIssue: true
  },
  {
    id: "maint-alex-003",
    residentId: ALEX_CHEN.id,
    residentName: ALEX_CHEN.fullName,
    propertyId: PROPERTY_IDS.metropolitan,
    unit: ALEX_CHEN.unit,
    issueType: "Ventilation",
    issueTitle: "Bedroom vent noise",
    description: "Loud vent rattle and low airflow",
    status: "open",
    openedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    resolvedAt: null,
    resolutionDays: 0,
    repeatIssue: false
  },
  
  // Additional Alex Chen history (Flagship retention case - 2 year pattern)
  { id: "maint-alex-004", residentId: ALEX_CHEN.id, residentName: ALEX_CHEN.fullName, propertyId: PROPERTY_IDS.metropolitan, unit: ALEX_CHEN.unit, issueType: "HVAC", issueTitle: "Initial AC cooling concern", description: "Unit blowing warm air", status: "closed", openedAt: new Date(Date.now() - 280 * 24 * 60 * 60 * 1000), resolvedAt: new Date(Date.now() - 274 * 24 * 60 * 60 * 1000), resolutionDays: 6, repeatIssue: false },
  { id: "maint-alex-005", residentId: ALEX_CHEN.id, residentName: ALEX_CHEN.fullName, propertyId: PROPERTY_IDS.metropolitan, unit: ALEX_CHEN.unit, issueType: "Appliance", issueTitle: "Dishwasher initial leak", description: "Water pooling under unit", status: "closed", openedAt: new Date(Date.now() - 240 * 24 * 60 * 60 * 1000), resolvedAt: new Date(Date.now() - 235 * 24 * 60 * 60 * 1000), resolutionDays: 5, repeatIssue: false },
  { id: "maint-alex-006", residentId: ALEX_CHEN.id, residentName: ALEX_CHEN.fullName, propertyId: PROPERTY_IDS.metropolitan, unit: ALEX_CHEN.unit, issueType: "HVAC", issueTitle: "Thermostat not responding", description: "Temperature control issue", status: "closed", openedAt: new Date(Date.now() - 195 * 24 * 60 * 60 * 1000), resolvedAt: new Date(Date.now() - 190 * 24 * 60 * 60 * 1000), resolutionDays: 5, repeatIssue: false },
  { id: "maint-alex-007", residentId: ALEX_CHEN.id, residentName: ALEX_CHEN.fullName, propertyId: PROPERTY_IDS.metropolitan, unit: ALEX_CHEN.unit, issueType: "HVAC", issueTitle: "AC not cooling properly", description: "Repeat cooling issue summer", status: "closed", openedAt: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000), resolvedAt: new Date(Date.now() - 145 * 24 * 60 * 60 * 1000), resolutionDays: 5, repeatIssue: true },
  { id: "maint-alex-008", residentId: ALEX_CHEN.id, residentName: ALEX_CHEN.fullName, propertyId: PROPERTY_IDS.metropolitan, unit: ALEX_CHEN.unit, issueType: "Ventilation", issueTitle: "Air filter overdue", description: "Requested filter change", status: "closed", openedAt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000), resolvedAt: new Date(Date.now() - 113 * 24 * 60 * 60 * 1000), resolutionDays: 7, repeatIssue: false },
  { id: "maint-alex-009", residentId: ALEX_CHEN.id, residentName: ALEX_CHEN.fullName, propertyId: PROPERTY_IDS.metropolitan, unit: ALEX_CHEN.unit, issueType: "HVAC", issueTitle: "Heating issue winter", description: "Unit not warming properly", status: "closed", openedAt: new Date(Date.now() - 85 * 24 * 60 * 60 * 1000), resolvedAt: new Date(Date.now() - 80 * 24 * 60 * 60 * 1000), resolutionDays: 5, repeatIssue: true },
  { id: "maint-alex-010", residentId: ALEX_CHEN.id, residentName: ALEX_CHEN.fullName, propertyId: PROPERTY_IDS.metropolitan, unit: ALEX_CHEN.unit, issueType: "Appliance", issueTitle: "Dishwasher leak reoccurrence", description: "Same leak issue returned", status: "closed", openedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), resolvedAt: new Date(Date.now() - 55 * 24 * 60 * 60 * 1000), resolutionDays: 5, repeatIssue: true },
  
  // Other residents - varied history
  { id: "maint-met-001", residentId: "res-met-002", residentName: "Michael Torres", propertyId: PROPERTY_IDS.metropolitan, unit: "302", issueType: "Plumbing", issueTitle: "Sink drain slow", description: "Kitchen sink draining slowly", status: "closed", openedAt: new Date(Date.now() - 320 * 24 * 60 * 60 * 1000), resolvedAt: new Date(Date.now() - 318 * 24 * 60 * 60 * 1000), resolutionDays: 2, repeatIssue: false },
  { id: "maint-met-002", residentId: "res-met-002", residentName: "Michael Torres", propertyId: PROPERTY_IDS.metropolitan, unit: "302", issueType: "HVAC", issueTitle: "AC filter replacement", description: "Routine maintenance", status: "closed", openedAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000), resolvedAt: new Date(Date.now() - 178 * 24 * 60 * 60 * 1000), resolutionDays: 2, repeatIssue: false },
  { id: "maint-met-003", residentId: "res-met-002", residentName: "Michael Torres", propertyId: PROPERTY_IDS.metropolitan, unit: "302", issueType: "Electrical", issueTitle: "Outlet not working", description: "Bedroom outlet issue", status: "closed", openedAt: new Date(Date.now() - 95 * 24 * 60 * 60 * 1000), resolvedAt: new Date(Date.now() - 92 * 24 * 60 * 60 * 1000), resolutionDays: 3, repeatIssue: false },
  { id: "maint-met-004", residentId: "res-met-002", residentName: "Michael Torres", propertyId: PROPERTY_IDS.metropolitan, unit: "302", issueType: "HVAC", issueTitle: "Thermostat calibration", description: "Temperature reading off", status: "closed", openedAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000), resolvedAt: new Date(Date.now() - 42 * 24 * 60 * 60 * 1000), resolutionDays: 3, repeatIssue: false },
  { id: "maint-met-005", residentId: "res-met-003", residentName: "Jennifer Park", propertyId: PROPERTY_IDS.metropolitan, unit: "405", issueType: "Appliance", issueTitle: "Refrigerator noise", description: "Loud humming from fridge", status: "closed", openedAt: new Date(Date.now() - 290 * 24 * 60 * 60 * 1000), resolvedAt: new Date(Date.now() - 283 * 24 * 60 * 60 * 1000), resolutionDays: 7, repeatIssue: false },
  { id: "maint-met-006", residentId: "res-met-003", residentName: "Jennifer Park", propertyId: PROPERTY_IDS.metropolitan, unit: "405", issueType: "Plumbing", issueTitle: "Low water pressure", description: "Shower pressure weak", status: "closed", openedAt: new Date(Date.now() - 200 * 24 * 60 * 60 * 1000), resolvedAt: new Date(Date.now() - 195 * 24 * 60 * 60 * 1000), resolutionDays: 5, repeatIssue: false },
  { id: "maint-met-007", residentId: "res-met-003", residentName: "Jennifer Park", propertyId: PROPERTY_IDS.metropolitan, unit: "405", issueType: "HVAC", issueTitle: "AC not cooling bedroom", description: "One bedroom too warm", status: "closed", openedAt: new Date(Date.now() - 140 * 24 * 60 * 60 * 1000), resolvedAt: new Date(Date.now() - 136 * 24 * 60 * 60 * 1000), resolutionDays: 4, repeatIssue: false },
  { id: "maint-met-008", residentId: "res-met-003", residentName: "Jennifer Park", propertyId: PROPERTY_IDS.metropolitan, unit: "405", issueType: "Plumbing", issueTitle: "Toilet running", description: "Toilet constantly running", status: "closed", openedAt: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000), resolvedAt: new Date(Date.now() - 71 * 24 * 60 * 60 * 1000), resolutionDays: 4, repeatIssue: false },
  { id: "maint-met-009", residentId: "res-met-004", residentName: "David Kim", propertyId: PROPERTY_IDS.metropolitan, unit: "508", issueType: "Pest Control", issueTitle: "Ants in kitchen", description: "Small ant problem", status: "closed", openedAt: new Date(Date.now() - 310 * 24 * 60 * 60 * 1000), resolvedAt: new Date(Date.now() - 308 * 24 * 60 * 60 * 1000), resolutionDays: 2, repeatIssue: false },
  { id: "maint-met-010", residentId: "res-met-004", residentName: "David Kim", propertyId: PROPERTY_IDS.metropolitan, unit: "508", issueType: "Electrical", issueTitle: "Light fixture flickering", description: "Bathroom light issue", status: "closed", openedAt: new Date(Date.now() - 220 * 24 * 60 * 60 * 1000), resolvedAt: new Date(Date.now() - 218 * 24 * 60 * 60 * 1000), resolutionDays: 2, repeatIssue: false },
  { id: "maint-met-011", residentId: "res-met-004", residentName: "David Kim", propertyId: PROPERTY_IDS.metropolitan, unit: "508", issueType: "Appliance", issueTitle: "Disposal jammed", description: "Garbage disposal stuck", status: "closed", openedAt: new Date(Date.now() - 155 * 24 * 60 * 60 * 1000), resolvedAt: new Date(Date.now() - 153 * 24 * 60 * 60 * 1000), resolutionDays: 2, repeatIssue: false },
  { id: "maint-met-012", residentId: "res-met-005", residentName: "Sarah Johnson", propertyId: PROPERTY_IDS.metropolitan, unit: "601", issueType: "HVAC", issueTitle: "Vent cleaning needed", description: "Dusty vents affecting air quality", status: "closed", openedAt: new Date(Date.now() - 260 * 24 * 60 * 60 * 1000), resolvedAt: new Date(Date.now() - 256 * 24 * 60 * 60 * 1000), resolutionDays: 4, repeatIssue: false },
  { id: "maint-met-013", residentId: "res-met-005", residentName: "Sarah Johnson", propertyId: PROPERTY_IDS.metropolitan, unit: "601", issueType: "Plumbing", issueTitle: "Faucet drip", description: "Kitchen faucet dripping", status: "closed", openedAt: new Date(Date.now() - 170 * 24 * 60 * 60 * 1000), resolvedAt: new Date(Date.now() - 168 * 24 * 60 * 60 * 1000), resolutionDays: 2, repeatIssue: false },
  { id: "maint-met-014", residentId: "res-met-005", residentName: "Sarah Johnson", propertyId: PROPERTY_IDS.metropolitan, unit: "601", issueType: "HVAC", issueTitle: "Thermostat batteries", description: "Thermostat needs new batteries", status: "closed", openedAt: new Date(Date.now() - 100 * 24 * 60 * 60 * 1000), resolvedAt: new Date(Date.now() - 99 * 24 * 60 * 60 * 1000), resolutionDays: 1, repeatIssue: false },
  { id: "maint-met-015", residentId: "res-met-006", residentName: "Robert Lee", propertyId: PROPERTY_IDS.metropolitan, unit: "703", issueType: "Locks", issueTitle: "Door lock sticky", description: "Front door lock difficult to turn", status: "closed", openedAt: new Date(Date.now() - 335 * 24 * 60 * 60 * 1000), resolvedAt: new Date(Date.now() - 333 * 24 * 60 * 60 * 1000), resolutionDays: 2, repeatIssue: false },
  { id: "maint-met-016", residentId: "res-met-006", residentName: "Robert Lee", propertyId: PROPERTY_IDS.metropolitan, unit: "703", issueType: "Noise", issueTitle: "Neighbor noise complaint", description: "Upstairs noise excessive", status: "closed", openedAt: new Date(Date.now() - 245 * 24 * 60 * 60 * 1000), resolvedAt: new Date(Date.now() - 242 * 24 * 60 * 60 * 1000), resolutionDays: 3, repeatIssue: false },
  { id: "maint-met-017", residentId: "res-met-006", residentName: "Robert Lee", propertyId: PROPERTY_IDS.metropolitan, unit: "703", issueType: "Appliance", issueTitle: "Microwave not heating", description: "Microwave power issue", status: "closed", openedAt: new Date(Date.now() - 125 * 24 * 60 * 60 * 1000), resolvedAt: new Date(Date.now() - 122 * 24 * 60 * 60 * 1000), resolutionDays: 3, repeatIssue: false },
  { id: "maint-met-018", residentId: "res-met-007", residentName: "Lisa Martinez", propertyId: PROPERTY_IDS.metropolitan, unit: "805", issueType: "Water Leak", issueTitle: "Ceiling water stain", description: "Water stain in bathroom ceiling", status: "closed", openedAt: new Date(Date.now() - 300 * 24 * 60 * 60 * 1000), resolvedAt: new Date(Date.now() - 292 * 24 * 60 * 60 * 1000), resolutionDays: 8, repeatIssue: false },
  { id: "maint-met-019", residentId: "res-met-007", residentName: "Lisa Martinez", propertyId: PROPERTY_IDS.metropolitan, unit: "805", issueType: "HVAC", issueTitle: "AC filter dirty", description: "Routine filter change", status: "closed", openedAt: new Date(Date.now() - 190 * 24 * 60 * 60 * 1000), resolvedAt: new Date(Date.now() - 188 * 24 * 60 * 60 * 1000), resolutionDays: 2, repeatIssue: false },
  { id: "maint-met-020", residentId: "res-met-007", residentName: "Lisa Martinez", propertyId: PROPERTY_IDS.metropolitan, unit: "805", issueType: "Electrical", issueTitle: "Breaker tripping", description: "Circuit breaker issue", status: "closed", openedAt: new Date(Date.now() - 110 * 24 * 60 * 60 * 1000), resolvedAt: new Date(Date.now() - 107 * 24 * 60 * 60 * 1000), resolutionDays: 3, repeatIssue: false },
  { id: "maint-met-021", residentId: "res-met-008", residentName: "James Wilson", propertyId: PROPERTY_IDS.metropolitan, unit: "902", issueType: "Plumbing", issueTitle: "Shower drain clog", description: "Slow draining shower", status: "closed", openedAt: new Date(Date.now() - 275 * 24 * 60 * 60 * 1000), resolvedAt: new Date(Date.now() - 272 * 24 * 60 * 60 * 1000), resolutionDays: 3, repeatIssue: false },
  { id: "maint-met-022", residentId: "res-met-008", residentName: "James Wilson", propertyId: PROPERTY_IDS.metropolitan, unit: "902", issueType: "HVAC", issueTitle: "Heating not working", description: "No heat in winter", status: "closed", openedAt: new Date(Date.now() - 165 * 24 * 60 * 60 * 1000), resolvedAt: new Date(Date.now() - 160 * 24 * 60 * 60 * 1000), resolutionDays: 5, repeatIssue: false },
  { id: "maint-met-023", residentId: "res-met-008", residentName: "James Wilson", propertyId: PROPERTY_IDS.metropolitan, unit: "902", issueType: "Appliance", issueTitle: "Oven not preheating", description: "Oven temperature issue", status: "closed", openedAt: new Date(Date.now() - 80 * 24 * 60 * 60 * 1000), resolvedAt: new Date(Date.now() - 77 * 24 * 60 * 60 * 1000), resolutionDays: 3, repeatIssue: false },
  { id: "maint-met-024", residentId: "res-met-009", residentName: "Maria Garcia", propertyId: PROPERTY_IDS.metropolitan, unit: "204", issueType: "Pest Control", issueTitle: "Spider webs", description: "Spiders on balcony", status: "closed", openedAt: new Date(Date.now() - 325 * 24 * 60 * 60 * 1000), resolvedAt: new Date(Date.now() - 323 * 24 * 60 * 60 * 1000), resolutionDays: 2, repeatIssue: false },
  { id: "maint-met-025", residentId: "res-met-009", residentName: "Maria Garcia", propertyId: PROPERTY_IDS.metropolitan, unit: "204", issueType: "Ventilation", issueTitle: "Bathroom fan loud", description: "Exhaust fan making noise", status: "closed", openedAt: new Date(Date.now() - 210 * 24 * 60 * 60 * 1000), resolvedAt: new Date(Date.now() - 207 * 24 * 60 * 60 * 1000), resolutionDays: 3, repeatIssue: false },
  { id: "maint-met-026", residentId: "res-met-009", residentName: "Maria Garcia", propertyId: PROPERTY_IDS.metropolitan, unit: "204", issueType: "Locks", issueTitle: "Window lock broken", description: "Bedroom window won't lock", status: "closed", openedAt: new Date(Date.now() - 130 * 24 * 60 * 60 * 1000), resolvedAt: new Date(Date.now() - 127 * 24 * 60 * 60 * 1000), resolutionDays: 3, repeatIssue: false },
  { id: "maint-met-027", residentId: "res-met-010", residentName: "William Brown", propertyId: PROPERTY_IDS.metropolitan, unit: "307", issueType: "Water Leak", issueTitle: "Under sink leak", description: "Small leak under kitchen sink", status: "closed", openedAt: new Date(Date.now() - 285 * 24 * 60 * 60 * 1000), resolvedAt: new Date(Date.now() - 282 * 24 * 60 * 60 * 1000), resolutionDays: 3, repeatIssue: false },
  { id: "maint-met-028", residentId: "res-met-010", residentName: "William Brown", propertyId: PROPERTY_IDS.metropolitan, unit: "307", issueType: "Electrical", issueTitle: "Outlet sparking", description: "Outlet showing sparks", status: "closed", openedAt: new Date(Date.now() - 175 * 24 * 60 * 60 * 1000), resolvedAt: new Date(Date.now() - 173 * 24 * 60 * 60 * 1000), resolutionDays: 2, repeatIssue: false },
  { id: "maint-met-029", residentId: "res-met-010", residentName: "William Brown", propertyId: PROPERTY_IDS.metropolitan, unit: "307", issueType: "HVAC", issueTitle: "Filter replacement request", description: "Requested routine filter change", status: "closed", openedAt: new Date(Date.now() - 65 * 24 * 60 * 60 * 1000), resolvedAt: new Date(Date.now() - 63 * 24 * 60 * 60 * 1000), resolutionDays: 2, repeatIssue: false },
  { id: "maint-met-030", residentId: "res-met-011", residentName: "Emma Davis", propertyId: PROPERTY_IDS.metropolitan, unit: "410", issueType: "Appliance", issueTitle: "Washer vibration", description: "Washing machine shaking", status: "closed", openedAt: new Date(Date.now() - 250 * 24 * 60 * 60 * 1000), resolvedAt: new Date(Date.now() - 247 * 24 * 60 * 60 * 1000), resolutionDays: 3, repeatIssue: false },
  { id: "maint-met-031", residentId: "res-met-011", residentName: "Emma Davis", propertyId: PROPERTY_IDS.metropolitan, unit: "410", issueType: "Plumbing", issueTitle: "Sink disposal odor", description: "Bad smell from disposal", status: "closed", openedAt: new Date(Date.now() - 145 * 24 * 60 * 60 * 1000), resolvedAt: new Date(Date.now() - 143 * 24 * 60 * 60 * 1000), resolutionDays: 2, repeatIssue: false },
  { id: "maint-met-032", residentId: "res-met-011", residentName: "Emma Davis", propertyId: PROPERTY_IDS.metropolitan, unit: "410", issueType: "HVAC", issueTitle: "Thermostat display dim", description: "Can't read thermostat display", status: "closed", openedAt: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000), resolvedAt: new Date(Date.now() - 48 * 24 * 60 * 60 * 1000), resolutionDays: 2, repeatIssue: false },
  { id: "maint-met-033", residentId: "res-met-012", residentName: "Daniel Rodriguez", propertyId: PROPERTY_IDS.metropolitan, unit: "512", issueType: "Noise", issueTitle: "Pipe knocking", description: "Pipes making knocking sound", status: "closed", openedAt: new Date(Date.now() - 315 * 24 * 60 * 60 * 1000), resolvedAt: new Date(Date.now() - 311 * 24 * 60 * 60 * 1000), resolutionDays: 4, repeatIssue: false },
  { id: "maint-met-034", residentId: "res-met-012", residentName: "Daniel Rodriguez", propertyId: PROPERTY_IDS.metropolitan, unit: "512", issueType: "Ventilation", issueTitle: "Vent dust buildup", description: "Vents need cleaning", status: "closed", openedAt: new Date(Date.now() - 185 * 24 * 60 * 60 * 1000), resolvedAt: new Date(Date.now() - 182 * 24 * 60 * 60 * 1000), resolutionDays: 3, repeatIssue: false },
  { id: "maint-met-035", residentId: "res-met-012", residentName: "Daniel Rodriguez", propertyId: PROPERTY_IDS.metropolitan, unit: "512", issueType: "Electrical", issueTitle: "Switch not working", description: "Light switch non-responsive", status: "closed", openedAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), resolvedAt: new Date(Date.now() - 88 * 24 * 60 * 60 * 1000), resolutionDays: 2, repeatIssue: false },
  { id: "maint-met-036", residentId: "res-met-013", residentName: "Olivia Miller", propertyId: PROPERTY_IDS.metropolitan, unit: "605", issueType: "HVAC", issueTitle: "AC unit noise", description: "AC making grinding noise", status: "closed", openedAt: new Date(Date.now() - 270 * 24 * 60 * 60 * 1000), resolvedAt: new Date(Date.now() - 266 * 24 * 60 * 60 * 1000), resolutionDays: 4, repeatIssue: false },
  { id: "maint-met-037", residentId: "res-met-013", residentName: "Olivia Miller", propertyId: PROPERTY_IDS.metropolitan, unit: "605", issueType: "Plumbing", issueTitle: "Bathtub drain slow", description: "Slow draining bathtub", status: "closed", openedAt: new Date(Date.now() - 160 * 24 * 60 * 60 * 1000), resolvedAt: new Date(Date.now() - 157 * 24 * 60 * 60 * 1000), resolutionDays: 3, repeatIssue: false },
  { id: "maint-met-038", residentId: "res-met-013", residentName: "Olivia Miller", propertyId: PROPERTY_IDS.metropolitan, unit: "605", issueType: "Appliance", issueTitle: "Dryer not heating", description: "Dryer runs but no heat", status: "closed", openedAt: new Date(Date.now() - 70 * 24 * 60 * 60 * 1000), resolvedAt: new Date(Date.now() - 67 * 24 * 60 * 60 * 1000), resolutionDays: 3, repeatIssue: false },
  { id: "maint-met-039", residentId: "res-met-014", residentName: "Thomas Anderson", propertyId: PROPERTY_IDS.metropolitan, unit: "708", issueType: "Pest Control", issueTitle: "Roach sighting", description: "Saw roach in kitchen", status: "closed", openedAt: new Date(Date.now() - 330 * 24 * 60 * 60 * 1000), resolvedAt: new Date(Date.now() - 328 * 24 * 60 * 60 * 1000), resolutionDays: 2, repeatIssue: false },
  { id: "maint-met-040", residentId: "res-met-014", residentName: "Thomas Anderson", propertyId: PROPERTY_IDS.metropolitan, unit: "708", issueType: "HVAC", issueTitle: "Temperature uneven", description: "Some rooms colder than others", status: "closed", openedAt: new Date(Date.now() - 225 * 24 * 60 * 60 * 1000), resolvedAt: new Date(Date.now() - 221 * 24 * 60 * 60 * 1000), resolutionDays: 4, repeatIssue: false },
  { id: "maint-met-041", residentId: "res-met-014", residentName: "Thomas Anderson", propertyId: PROPERTY_IDS.metropolitan, unit: "708", issueType: "Water Leak", issueTitle: "Toilet tank leak", description: "Water leaking from tank", status: "closed", openedAt: new Date(Date.now() - 115 * 24 * 60 * 60 * 1000), resolvedAt: new Date(Date.now() - 112 * 24 * 60 * 60 * 1000), resolutionDays: 3, repeatIssue: false },
  { id: "maint-met-042", residentId: "res-met-015", residentName: "Ashley Taylor", propertyId: PROPERTY_IDS.metropolitan, unit: "810", issueType: "Locks", issueTitle: "Deadbolt jamming", description: "Deadbolt hard to lock", status: "closed", openedAt: new Date(Date.now() - 295 * 24 * 60 * 60 * 1000), resolvedAt: new Date(Date.now() - 293 * 24 * 60 * 60 * 1000), resolutionDays: 2, repeatIssue: false },
  { id: "maint-met-043", residentId: "res-met-015", residentName: "Ashley Taylor", propertyId: PROPERTY_IDS.metropolitan, unit: "810", issueType: "Electrical", issueTitle: "Dimmer switch broken", description: "Light dimmer not working", status: "closed", openedAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000), resolvedAt: new Date(Date.now() - 178 * 24 * 60 * 60 * 1000), resolutionDays: 2, repeatIssue: false },
  { id: "maint-met-044", residentId: "res-met-015", residentName: "Ashley Taylor", propertyId: PROPERTY_IDS.metropolitan, unit: "810", issueType: "Appliance", issueTitle: "Freezer frost buildup", description: "Excessive frost in freezer", status: "open", openedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000), resolvedAt: null, resolutionDays: 0, repeatIssue: false },
  { id: "maint-met-045", residentId: "res-met-016", residentName: "Christopher White", propertyId: PROPERTY_IDS.metropolitan, unit: "203", issueType: "Plumbing", issueTitle: "Faucet cartridge worn", description: "Kitchen faucet hard to turn", status: "closed", openedAt: new Date(Date.now() - 340 * 24 * 60 * 60 * 1000), resolvedAt: new Date(Date.now() - 337 * 24 * 60 * 60 * 1000), resolutionDays: 3, repeatIssue: false },
  { id: "maint-met-046", residentId: "res-met-016", residentName: "Christopher White", propertyId: PROPERTY_IDS.metropolitan, unit: "203", issueType: "HVAC", issueTitle: "Filter overdue", description: "Air filter needs changing", status: "closed", openedAt: new Date(Date.now() - 205 * 24 * 60 * 60 * 1000), resolvedAt: new Date(Date.now() - 203 * 24 * 60 * 60 * 1000), resolutionDays: 2, repeatIssue: false },
  { id: "maint-met-047", residentId: "res-met-016", residentName: "Christopher White", propertyId: PROPERTY_IDS.metropolitan, unit: "203", issueType: "Ventilation", issueTitle: "Bathroom vent cover loose", description: "Vent cover rattling", status: "closed", openedAt: new Date(Date.now() - 105 * 24 * 60 * 60 * 1000), resolvedAt: new Date(Date.now() - 103 * 24 * 60 * 60 * 1000), resolutionDays: 2, repeatIssue: false },
  { id: "maint-met-048", residentId: "res-met-017", residentName: "Jessica Martin", propertyId: PROPERTY_IDS.metropolitan, unit: "306", issueType: "Noise", issueTitle: "Water heater rumbling", description: "Water heater making noise", status: "closed", openedAt: new Date(Date.now() - 265 * 24 * 60 * 60 * 1000), resolvedAt: new Date(Date.now() - 261 * 24 * 60 * 60 * 1000), resolutionDays: 4, repeatIssue: false },
  { id: "maint-met-049", residentId: "res-met-017", residentName: "Jessica Martin", propertyId: PROPERTY_IDS.metropolitan, unit: "306", issueType: "Appliance", issueTitle: "Icemaker not working", description: "Refrigerator icemaker issue", status: "closed", openedAt: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000), resolvedAt: new Date(Date.now() - 147 * 24 * 60 * 60 * 1000), resolutionDays: 3, repeatIssue: false },
  { id: "maint-met-050", residentId: "res-met-017", residentName: "Jessica Martin", propertyId: PROPERTY_IDS.metropolitan, unit: "306", issueType: "Electrical", issueTitle: "GFCI outlet tripping", description: "Bathroom outlet keeps tripping", status: "open", openedAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000), resolvedAt: null, resolutionDays: 0, repeatIssue: false },
  { id: "maint-met-051", residentId: "res-met-018", residentName: "Matthew Thompson", propertyId: PROPERTY_IDS.metropolitan, unit: "409", issueType: "HVAC", issueTitle: "Heating zones inconsistent", description: "Uneven heating across unit", status: "closed", openedAt: new Date(Date.now() - 235 * 24 * 60 * 60 * 1000), resolvedAt: new Date(Date.now() - 230 * 24 * 60 * 60 * 1000), resolutionDays: 5, repeatIssue: false },
  { id: "maint-met-052", residentId: "res-met-018", residentName: "Matthew Thompson", propertyId: PROPERTY_IDS.metropolitan, unit: "409", issueType: "Plumbing", issueTitle: "Shower head clogged", description: "Low water flow from shower", status: "closed", openedAt: new Date(Date.now() - 135 * 24 * 60 * 60 * 1000), resolvedAt: new Date(Date.now() - 133 * 24 * 60 * 60 * 1000), resolutionDays: 2, repeatIssue: false },
  { id: "maint-met-053", residentId: "res-met-018", residentName: "Matthew Thompson", propertyId: PROPERTY_IDS.metropolitan, unit: "409", issueType: "Locks", issueTitle: "Balcony door lock loose", description: "Sliding door lock needs adjustment", status: "closed", openedAt: new Date(Date.now() - 55 * 24 * 60 * 60 * 1000), resolvedAt: new Date(Date.now() - 53 * 24 * 60 * 60 * 1000), resolutionDays: 2, repeatIssue: false }
];

// ============================================================================
// BOOKINGS - Property Scoped
// ============================================================================

export const CANONICAL_BOOKINGS = [
  {
    id: "booking-alex-001",
    residentId: ALEX_CHEN.id,
    residentName: ALEX_CHEN.fullName,
    propertyId: PROPERTY_IDS.metropolitan,
    unit: ALEX_CHEN.unit,
    providerId: PROVIDER_IDS.sparkclean,
    providerName: "SparkClean",
    serviceName: "Apartment refresh cleaning",
    status: "completed",
    scheduledFor: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
  },
  {
    id: "booking-alex-002",
    residentId: ALEX_CHEN.id,
    residentName: ALEX_CHEN.fullName,
    propertyId: PROPERTY_IDS.metropolitan,
    unit: ALEX_CHEN.unit,
    providerId: PROVIDER_IDS.fixright,
    providerName: "FixRight HVAC",
    serviceName: "Priority HVAC tune-up",
    status: "completed",
    scheduledFor: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000)
  }
];

// ============================================================================
// REVENUE - Property Scoped
// ============================================================================

export const CANONICAL_REVENUE = [
  { propertyId: PROPERTY_IDS.metropolitan, month: "Dec 2025", grossRevenue: 7469, creditsIssued: 500, netRevenue: 6969, bookingsCompleted: 18 },
  { propertyId: PROPERTY_IDS.metropolitan, month: "Jan 2026", grossRevenue: 7219, creditsIssued: 450, netRevenue: 6769, bookingsCompleted: 19 },
  { propertyId: PROPERTY_IDS.metropolitan, month: "Feb 2026", grossRevenue: 6969, creditsIssued: 420, netRevenue: 6549, bookingsCompleted: 20 },
  { propertyId: PROPERTY_IDS.metropolitan, month: "Mar 2026", grossRevenue: 6719, creditsIssued: 500, netRevenue: 6219, bookingsCompleted: 21 },
  
  { propertyId: PROPERTY_IDS.lakeside, month: "Dec 2025", grossRevenue: 4820, creditsIssued: 240, netRevenue: 4580, bookingsCompleted: 12 },
  { propertyId: PROPERTY_IDS.lakeside, month: "Jan 2026", grossRevenue: 4680, creditsIssued: 210, netRevenue: 4470, bookingsCompleted: 13 },
  { propertyId: PROPERTY_IDS.lakeside, month: "Feb 2026", grossRevenue: 4510, creditsIssued: 180, netRevenue: 4330, bookingsCompleted: 14 },
  { propertyId: PROPERTY_IDS.lakeside, month: "Mar 2026", grossRevenue: 4390, creditsIssued: 165, netRevenue: 4225, bookingsCompleted: 15 },
  
  { propertyId: PROPERTY_IDS.downtown, month: "Dec 2025", grossRevenue: 5635, creditsIssued: 300, netRevenue: 5335, bookingsCompleted: 15 },
  { propertyId: PROPERTY_IDS.downtown, month: "Jan 2026", grossRevenue: 5490, creditsIssued: 280, netRevenue: 5210, bookingsCompleted: 16 },
  { propertyId: PROPERTY_IDS.downtown, month: "Feb 2026", grossRevenue: 5320, creditsIssued: 240, netRevenue: 5080, bookingsCompleted: 17 },
  { propertyId: PROPERTY_IDS.downtown, month: "Mar 2026", grossRevenue: 5210, creditsIssued: 225, netRevenue: 4985, bookingsCompleted: 18 }
];

// ============================================================================
// DATA SELECTORS
// ============================================================================

// Get property by ID
export function getPropertyById(propertyId) {
  return CANONICAL_PROPERTIES.find(p => p.id === propertyId);
}

// Get resident by ID
export function getResidentById(residentId) {
  return CANONICAL_RESIDENTS.find(r => r.id === residentId);
}

// Get provider by ID
export function getProviderById(providerId) {
  return CANONICAL_PROVIDERS.find(p => p.id === providerId);
}

// Get residents by property ID
export function getResidentsByProperty(propertyId) {
  return CANONICAL_RESIDENTS.filter(r => r.propertyId === propertyId);
}

// Get maintenance by property ID
export function getMaintenanceByProperty(propertyId) {
  return CANONICAL_MAINTENANCE.filter(m => m.propertyId === propertyId);
}

// Get bookings by property ID
export function getBookingsByProperty(propertyId) {
  return CANONICAL_BOOKINGS.filter(b => b.propertyId === propertyId);
}

// Get revenue by property ID
export function getRevenueByProperty(propertyId) {
  return CANONICAL_REVENUE.filter(r => r.propertyId === propertyId);
}

// Get providers by property ID
export function getProvidersByProperty(propertyId) {
  return CANONICAL_PROVIDERS.filter(p => p.properties.includes(propertyId));
}

// ============================================================================
// MANAGER SCOPED HELPERS - Sarah Mitchell / The Metropolitan
// ============================================================================

export const SARAH_PROPERTY_ID = PROPERTY_IDS.metropolitan;

export function getSarahManagedProperty() {
  return getPropertyById(SARAH_PROPERTY_ID);
}

export function getSarahPropertyResidents() {
  return getResidentsByProperty(SARAH_PROPERTY_ID);
}

export function getSarahPropertyProviders() {
  return getProvidersByProperty(SARAH_PROPERTY_ID);
}

export function getSarahPropertyMaintenance() {
  return getMaintenanceByProperty(SARAH_PROPERTY_ID);
}

export function getSarahPropertyBookings() {
  return getBookingsByProperty(SARAH_PROPERTY_ID);
}

export function getSarahPropertyRevenue() {
  return getRevenueByProperty(SARAH_PROPERTY_ID);
}

export function getSarahPropertyTotals() {
  const property = getSarahManagedProperty();
  const residents = getSarahPropertyResidents();
  const maintenance = getSarahPropertyMaintenance();
  const bookings = getSarahPropertyBookings();
  const revenue = getSarahPropertyRevenue();
  
  const highRisk = residents.filter(r => r.riskTier === "high").length;
  const mediumRisk = residents.filter(r => r.riskTier === "medium").length;
  const lowRisk = residents.filter(r => r.riskTier === "low").length;
  
  const openMaintenance = maintenance.filter(m => m.status === "open").length;
  const completedBookings = bookings.filter(b => b.status === "completed").length;
  
  const totalRevenue = revenue.reduce((sum, r) => sum + r.grossRevenue, 0);
  const totalCredits = revenue.reduce((sum, r) => sum + r.creditsIssued, 0);
  const netRevenue = revenue.reduce((sum, r) => sum + r.netRevenue, 0);
  
  return {
    propertyId: property.id,
    propertyName: property.name,
    totalUnits: property.totalUnits,
    occupiedUnits: property.occupiedUnits,
    occupancyRate: property.occupancyRate,
    totalResidents: residents.length,
    atRiskResidents: property.atRiskResidents,
    highRiskCount: highRisk,
    mediumRiskCount: mediumRisk,
    lowRiskCount: lowRisk,
    openMaintenanceCount: openMaintenance,
    totalMaintenanceCount: maintenance.length,
    completedBookingsCount: completedBookings,
    totalBookingsCount: bookings.length,
    totalGrossRevenue: totalRevenue,
    totalCreditsIssued: totalCredits,
    totalNetRevenue: netRevenue,
    creditsInvested: property.creditsInvestedPerMonth,
    projectedSavings: property.estimatedAnnualROI,
    serviceRevenue: property.monthlyServiceRevenueProjection,
    providerCoverage: property.providerCoveragePercent,
    fulfillmentRate: property.fulfillmentRate
  };
}

// ============================================================================
// RESIDENT SCOPED HELPERS - Alex Chen
// ============================================================================

export function getAlexChenData() {
  return ALEX_CHEN;
}

export function getAlexProperty() {
  return getPropertyById(ALEX_CHEN.propertyId);
}

export function getAlexMaintenance() {
  return CANONICAL_MAINTENANCE.filter(m => m.residentId === ALEX_CHEN.id);
}

export function getAlexBookings() {
  return CANONICAL_BOOKINGS.filter(b => b.residentId === ALEX_CHEN.id);
}

export function getAlexPropertyProviders() {
  return getProvidersByProperty(ALEX_CHEN.propertyId);
}
