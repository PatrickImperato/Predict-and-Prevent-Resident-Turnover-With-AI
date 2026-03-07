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
  isQaResident: true
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
  }
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
