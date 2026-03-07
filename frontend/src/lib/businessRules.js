/**
 * HappyCo Concierge - Shared Business Rules
 * 
 * Single source of truth for all business logic calculations.
 * Used consistently across Admin, Property Manager, and Resident views.
 * 
 * Architecture: Bottom-up aggregation
 * - Resident-level truth → Property-level rollups → Portfolio-level rollups
 */

// ============================================================================
// RISK TIER CLASSIFICATION
// ============================================================================

/**
 * Canonical risk tier thresholds.
 * DO NOT modify these without updating everywhere.
 * 
 * Rules:
 * - High Risk: score >= 70
 * - Medium Risk: score 50-69
 * - Low Risk: score < 50
 */
export const RISK_TIERS = {
  HIGH: {
    label: "high",
    displayLabel: "High Risk",
    minScore: 70,
    color: "red",
    badgeClass: "border-red-200 bg-red-50 text-red-700"
  },
  MEDIUM: {
    label: "medium",
    displayLabel: "Medium Risk",
    minScore: 50,
    maxScore: 69,
    color: "yellow",
    badgeClass: "border-yellow-200 bg-yellow-50 text-yellow-700"
  },
  LOW: {
    label: "low",
    displayLabel: "Low Risk",
    maxScore: 49,
    color: "green",
    badgeClass: "border-green-200 bg-green-50 text-green-700"
  }
};

/**
 * Get risk tier from score.
 * @param {number} riskScore - Resident risk score (0-100)
 * @returns {string} - Risk tier: "high", "medium", or "low"
 */
export function getRiskTierFromScore(riskScore) {
  if (riskScore >= RISK_TIERS.HIGH.minScore) return RISK_TIERS.HIGH.label;
  if (riskScore >= RISK_TIERS.MEDIUM.minScore) return RISK_TIERS.MEDIUM.label;
  return RISK_TIERS.LOW.label;
}

/**
 * Get risk tier display object from score or tier label.
 * @param {number|string} scoreOrTier - Risk score or tier label
 * @returns {object} - Risk tier object with label, display label, and styling
 */
export function getRiskTierObject(scoreOrTier) {
  // If it's a string tier label
  if (typeof scoreOrTier === 'string') {
    const tier = scoreOrTier.toLowerCase();
    if (tier === 'high') return RISK_TIERS.HIGH;
    if (tier === 'medium') return RISK_TIERS.MEDIUM;
    return RISK_TIERS.LOW;
  }
  
  // If it's a numeric score
  const tier = getRiskTierFromScore(scoreOrTier);
  return getRiskTierObject(tier);
}

// ============================================================================
// FINANCIAL CALCULATIONS
// ============================================================================

/**
 * Canonical financial assumptions
 */
export const FINANCIAL_RULES = {
  // Turnover cost by risk tier
  TURNOVER_COST: {
    high: 3800,    // High risk residents have highest turnover cost
    medium: 2660,  // Medium risk
    low: 1900      // Low risk
  },
  
  // Intervention credit amounts by risk tier
  INTERVENTION_CREDITS: {
    high: 500,     // High priority tier
    medium: 350,   // Standard tier
    low: 200       // Light touch tier
  },
  
  // Service revenue assumptions
  SERVICE_REVENUE_MULTIPLIER: 0.25,  // 25% of credit amount converts to service revenue
  
  // ROI calculation
  calculateExpectedSavings(riskTier) {
    return this.TURNOVER_COST[riskTier] || this.TURNOVER_COST.low;
  },
  
  calculateExpectedRevenue(creditAmount) {
    return Math.round(creditAmount * this.SERVICE_REVENUE_MULTIPLIER);
  },
  
  calculateNetROI(expectedSavings, expectedRevenue, creditAmount) {
    return expectedSavings + expectedRevenue - creditAmount;
  },
  
  calculateROIMultiple(expectedSavings, expectedRevenue, creditAmount) {
    if (creditAmount === 0) return 0;
    return ((expectedSavings + expectedRevenue) / creditAmount);
  }
};

/**
 * Calculate intervention ROI for a resident.
 * @param {string} riskTier - Resident's risk tier ("high", "medium", "low")
 * @param {number} creditAmount - Credit amount offered
 * @returns {object} - ROI calculation breakdown
 */
export function calculateInterventionROI(riskTier, creditAmount = null) {
  // Use default credit amount if not specified
  const credit = creditAmount || FINANCIAL_RULES.INTERVENTION_CREDITS[riskTier] || FINANCIAL_RULES.INTERVENTION_CREDITS.low;
  
  const expectedSavings = FINANCIAL_RULES.calculateExpectedSavings(riskTier);
  const expectedRevenue = FINANCIAL_RULES.calculateExpectedRevenue(credit);
  const netROI = FINANCIAL_RULES.calculateNetROI(expectedSavings, expectedRevenue, credit);
  const roiMultiple = FINANCIAL_RULES.calculateROIMultiple(expectedSavings, expectedRevenue, credit);
  
  return {
    creditAmount: credit,
    expectedSavings,
    expectedRevenue,
    netROI,
    roiMultiple: Number(roiMultiple.toFixed(1))
  };
}

// ============================================================================
// DATA AGGREGATION HELPERS
// ============================================================================

/**
 * Calculate property-level metrics from residents.
 * @param {Array} residents - Array of resident objects
 * @param {object} property - Property object
 * @returns {object} - Property-level metrics
 */
export function calculatePropertyMetrics(residents, property) {
  const propertyResidents = residents.filter(r => r.propertyId === property.id);
  
  // Risk distribution
  const highRisk = propertyResidents.filter(r => r.riskTier === 'high').length;
  const mediumRisk = propertyResidents.filter(r => r.riskTier === 'medium').length;
  const lowRisk = propertyResidents.filter(r => r.riskTier === 'low').length;
  const atRiskTotal = propertyResidents.filter(r => r.riskScore >= 60).length;
  
  // Financial projections
  let totalCredits = 0;
  let totalProjectedSavings = 0;
  let totalProjectedRevenue = 0;
  
  propertyResidents.forEach(resident => {
    if (resident.riskScore >= 60) {
      const roi = calculateInterventionROI(resident.riskTier);
      totalCredits += roi.creditAmount;
      totalProjectedSavings += roi.expectedSavings;
      totalProjectedRevenue += roi.expectedRevenue;
    }
  });
  
  return {
    totalResidents: propertyResidents.length,
    atRiskResidents: atRiskTotal,
    highRiskCount: highRisk,
    mediumRiskCount: mediumRisk,
    lowRiskCount: lowRisk,
    totalCreditsRecommended: totalCredits,
    totalProjectedSavings,
    totalProjectedRevenue,
    netROI: totalProjectedSavings + totalProjectedRevenue - totalCredits,
    roiMultiple: totalCredits > 0 ? ((totalProjectedSavings + totalProjectedRevenue) / totalCredits) : 0
  };
}

/**
 * Calculate portfolio-level metrics from properties.
 * @param {Array} properties - Array of property objects with metrics
 * @returns {object} - Portfolio-level totals
 */
export function calculatePortfolioMetrics(properties) {
  return properties.reduce((totals, property) => {
    return {
      totalProperties: totals.totalProperties + 1,
      totalUnits: totals.totalUnits + (property.totalUnits || 0),
      occupiedUnits: totals.occupiedUnits + (property.occupiedUnits || 0),
      atRiskResidents: totals.atRiskResidents + (property.atRiskResidents || 0),
      totalCredits: totals.totalCredits + (property.creditsInvestedPerMonth || 0),
      totalSavings: totals.totalSavings + (property.estimatedAnnualROI || 0),
      totalRevenue: totals.totalRevenue + (property.monthlyServiceRevenueProjection || 0)
    };
  }, {
    totalProperties: 0,
    totalUnits: 0,
    occupiedUnits: 0,
    atRiskResidents: 0,
    totalCredits: 0,
    totalSavings: 0,
    totalRevenue: 0
  });
}

/**
 * Calculate occupancy rate.
 * @param {number} occupiedUnits - Number of occupied units
 * @param {number} totalUnits - Total number of units
 * @returns {number} - Occupancy rate as percentage (0-100)
 */
export function calculateOccupancyRate(occupiedUnits, totalUnits) {
  if (totalUnits === 0) return 0;
  return Number(((occupiedUnits / totalUnits) * 100).toFixed(1));
}

// ============================================================================
// DATA VALIDATION HELPERS
// ============================================================================

/**
 * Validate and normalize a resident object.
 * Ensures all required fields are present with safe defaults.
 */
export function normalizeResident(resident) {
  return {
    id: resident.id || resident.residentId || null,
    fullName: resident.fullName || resident.full_name || "Unknown Resident",
    email: resident.email || null,
    propertyId: resident.propertyId || resident.property_id || null,
    unit: resident.unit || resident.unit_number || null,
    riskScore: resident.riskScore || resident.risk_score || 0,
    riskTier: resident.riskTier || resident.risk_tier || getRiskTierFromScore(resident.riskScore || 0),
    primaryDriver: resident.primaryDriver || resident.primary_driver || "Unknown",
    communicationChannel: resident.communicationChannel || resident.communication_channel || "email",
    status: resident.status || "active"
  };
}

/**
 * Validate and normalize a property object.
 * Ensures all required fields are present with safe defaults.
 */
export function normalizeProperty(property) {
  return {
    id: property.id || property.propertyId || property.property_id || null,
    name: property.name || "Unknown Property",
    shortName: property.shortName || property.short_name || property.name || "Unknown",
    address: {
      street: property.address?.street || property.address_line_1 || "",
      city: property.address?.city || property.city || "",
      state: property.address?.state || property.state || "",
      postalCode: property.address?.postalCode || property.postal_code || ""
    },
    managerName: property.managerName || property.manager_name || "Unassigned",
    isFlagship: property.isFlagship || property.is_flagship || false,
    totalUnits: property.totalUnits || property.total_units || 0,
    occupiedUnits: property.occupiedUnits || property.occupied_units || 0,
    atRiskResidents: property.atRiskResidents || property.at_risk_residents || 0,
    occupancyRate: property.occupancyRate || calculateOccupancyRate(
      property.occupiedUnits || property.occupied_units || 0,
      property.totalUnits || property.total_units || 0
    ),
    providerCoveragePercent: property.providerCoveragePercent || property.provider_coverage_percent || 0
  };
}

export default {
  RISK_TIERS,
  FINANCIAL_RULES,
  getRiskTierFromScore,
  getRiskTierObject,
  calculateInterventionROI,
  calculatePropertyMetrics,
  calculatePortfolioMetrics,
  calculateOccupancyRate,
  normalizeResident,
  normalizeProperty
};
