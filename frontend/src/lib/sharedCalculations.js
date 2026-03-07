/**
 * Shared calculation helpers for consistent business logic across all views
 * Admin, Manager, and Resident experiences must use these same calculations
 */

/**
 * Calculate occupancy rate
 * @param {number} occupiedUnits - Number of occupied units
 * @param {number} totalUnits - Total number of units
 * @returns {number} Occupancy rate as percentage
 */
export const calculateOccupancyRate = (occupiedUnits, totalUnits) => {
  if (!totalUnits || totalUnits === 0) return 0;
  return (occupiedUnits / totalUnits) * 100;
};

/**
 * Calculate portfolio totals from properties array
 * @param {Array} properties - Array of property objects
 * @returns {Object} Portfolio totals
 */
export const calculatePortfolioTotals = (properties) => {
  if (!properties || properties.length === 0) {
    return {
      totalProperties: 0,
      totalUnits: 0,
      occupiedUnits: 0,
      occupancyRate: 0,
      totalAtRisk: 0
    };
  }

  const totals = properties.reduce(
    (acc, property) => ({
      totalUnits: acc.totalUnits + (property.totalUnits || 0),
      occupiedUnits: acc.occupiedUnits + (property.occupiedUnits || 0),
      totalAtRisk: acc.totalAtRisk + (property.atRiskResidents || 0)
    }),
    { totalUnits: 0, occupiedUnits: 0, totalAtRisk: 0 }
  );

  return {
    totalProperties: properties.length,
    totalUnits: totals.totalUnits,
    occupiedUnits: totals.occupiedUnits,
    occupancyRate: calculateOccupancyRate(totals.occupiedUnits, totals.totalUnits),
    totalAtRisk: totals.totalAtRisk
  };
};

/**
 * Determine risk tier from risk score
 * @param {number} riskScore - Risk score (0-100)
 * @returns {string} Risk tier: 'high', 'medium', or 'low'
 */
export const getRiskTier = (riskScore) => {
  if (riskScore >= 80) return 'high';
  if (riskScore >= 60) return 'medium';
  return 'low';
};

/**
 * Calculate ROI metrics for retention interventions
 * @param {number} creditsInvested - Total credits/dollars invested
 * @param {number} projectedSavings - Projected turnover savings
 * @param {number} serviceRevenue - Projected service revenue
 * @returns {Object} ROI metrics
 */
export const calculateRetentionROI = (creditsInvested, projectedSavings, serviceRevenue = 0) => {
  const totalReturn = projectedSavings + serviceRevenue;
  const netROI = totalReturn - creditsInvested;
  const roiMultiple = creditsInvested > 0 ? totalReturn / creditsInvested : 0;

  return {
    creditsInvested,
    projectedSavings,
    serviceRevenue,
    totalReturn,
    netROI,
    roiMultiple: parseFloat(roiMultiple.toFixed(1))
  };
};

/**
 * Calculate projected savings based on risk score
 * @param {number} riskScore - Risk score (0-100)
 * @param {number} avgTurnoverCost - Average turnover cost (default: 3800)
 * @returns {number} Projected savings
 */
export const calculateProjectedSavings = (riskScore, avgTurnoverCost = 3800) => {
  if (riskScore >= 80) return avgTurnoverCost; // 100% of turnover cost
  if (riskScore >= 70) return Math.round(avgTurnoverCost * 0.7); // 70%
  if (riskScore >= 60) return Math.round(avgTurnoverCost * 0.5); // 50%
  return Math.round(avgTurnoverCost * 0.3); // 30%
};

/**
 * Get recommended intervention tier based on risk score
 * @param {number} riskScore - Risk score (0-100)
 * @returns {Object} Intervention tier details
 */
export const getInterventionTier = (riskScore) => {
  if (riskScore >= 80) {
    return {
      tier: 3,
      label: 'High Priority',
      creditAmount: 500,
      description: 'Comprehensive retention intervention with priority service credits'
    };
  }
  
  if (riskScore >= 70) {
    return {
      tier: 2,
      label: 'Standard',
      creditAmount: 350,
      description: 'Proactive outreach with moderate service credits'
    };
  }
  
  return {
    tier: 1,
    label: 'Light Touch',
    creditAmount: 200,
    description: 'Preventive engagement with light service credit'
  };
};

/**
 * Calculate average risk score from residents array
 * @param {Array} residents - Array of resident objects
 * @returns {number} Average risk score
 */
export const calculateAverageRiskScore = (residents) => {
  if (!residents || residents.length === 0) return 0;
  
  const total = residents.reduce((sum, r) => sum + (r.riskScore || 0), 0);
  return Math.round(total / residents.length);
};

/**
 * Group residents by risk tier
 * @param {Array} residents - Array of resident objects
 * @returns {Object} Counts by risk tier
 */
export const groupResidentsByRiskTier = (residents) => {
  if (!residents || residents.length === 0) {
    return { high: 0, medium: 0, low: 0 };
  }

  return residents.reduce(
    (acc, resident) => {
      const tier = getRiskTier(resident.riskScore);
      acc[tier] = (acc[tier] || 0) + 1;
      return acc;
    },
    { high: 0, medium: 0, low: 0 }
  );
};

/**
 * Safe number formatter
 * @param {number} value - Number to format
 * @param {number} decimals - Number of decimal places (default: 0)
 * @returns {string} Formatted number
 */
export const formatNumber = (value, decimals = 0) => {
  if (value === null || value === undefined || isNaN(value)) return '0';
  return value.toFixed(decimals);
};

/**
 * Safe currency formatter
 * @param {number} value - Amount to format
 * @returns {string} Formatted currency
 */
export const formatCurrency = (value) => {
  if (value === null || value === undefined || isNaN(value)) return '$0';
  return `$${value.toLocaleString()}`;
};

/**
 * Calculate days until date
 * @param {string|Date} date - Target date
 * @returns {number} Days until date (negative if past)
 */
export const daysUntil = (date) => {
  if (!date) return null;
  const targetDate = new Date(date);
  const today = new Date();
  const diffTime = targetDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};
