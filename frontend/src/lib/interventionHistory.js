/**
 * Lightweight intervention history manager for demo
 * Uses sessionStorage for persistence during demo session
 */

const STORAGE_KEY = 'happyco_intervention_history';

export const interventionHistory = {
  /**
   * Get all deployed interventions
   */
  getAll: () => {
    try {
      const data = sessionStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading intervention history:', error);
      return [];
    }
  },

  /**
   * Add a deployed intervention
   */
  add: (intervention) => {
    try {
      const history = interventionHistory.getAll();
      const newEntry = {
        id: `intervention-${Date.now()}`,
        residentId: intervention.residentId,
        residentName: intervention.residentName,
        propertyId: intervention.propertyId,
        propertyName: intervention.propertyName,
        unit: intervention.unit,
        tier: intervention.tier,
        tierLabel: intervention.tierLabel,
        creditAmount: intervention.creditAmount,
        riskScore: intervention.riskScore,
        topDriver: intervention.topDriver,
        expectedSavings: intervention.expectedSavings,
        expectedRevenue: intervention.expectedRevenue,
        netROI: intervention.netROI,
        roiMultiple: intervention.roiMultiple,
        deployedAt: new Date().toISOString(),
        deployedBy: 'Demo User',
        status: 'deployed'
      };
      
      history.unshift(newEntry); // Add to beginning
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(history));
      
      return newEntry;
    } catch (error) {
      console.error('Error adding intervention:', error);
      return null;
    }
  },

  /**
   * Check if intervention has been deployed for a resident
   */
  isDeployed: (residentId) => {
    const history = interventionHistory.getAll();
    return history.some(entry => entry.residentId === residentId);
  },

  /**
   * Get total credits deployed
   */
  getTotalCredits: () => {
    const history = interventionHistory.getAll();
    return history.reduce((sum, entry) => sum + entry.creditAmount, 0);
  },

  /**
   * Get count of deployed interventions
   */
  getCount: () => {
    return interventionHistory.getAll().length;
  },

  /**
   * Clear all history (for demo reset)
   */
  clear: () => {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing intervention history:', error);
    }
  }
};
