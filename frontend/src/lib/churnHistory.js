/**
 * CHURN HISTORY - Alex Chen Retention Story
 * 
 * Shows the full retention narrative:
 * - Risk score progression over time
 * - Maintenance friction events
 * - Intervention deployment
 * - Communication and service milestones
 * - Expected score improvement
 */

import { ALEX_CHEN } from './canonicalData';

export const ALEX_CHURN_HISTORY = [
  {
    id: 'ch-001',
    residentId: ALEX_CHEN.id,
    date: '2024-02-15',
    score: 32,
    scoreChange: 0,
    eventType: 'baseline',
    milestone: 'Baseline Score',
    description: 'Initial risk assessment shows low churn risk',
    primaryDriver: 'None',
    status: 'healthy'
  },
  {
    id: 'ch-002',
    residentId: ALEX_CHEN.id,
    date: '2024-06-10',
    score: 45,
    scoreChange: +13,
    eventType: 'friction',
    milestone: 'First HVAC Issue',
    description: 'AC cooling problem reported, took 6 days to resolve',
    primaryDriver: 'Maintenance Frequency',
    status: 'warning'
  },
  {
    id: 'ch-003',
    residentId: ALEX_CHEN.id,
    date: '2024-07-22',
    score: 58,
    scoreChange: +13,
    eventType: 'friction',
    milestone: 'AC Unit Failed',
    description: 'Major AC failure during peak summer heat, work-from-home disrupted for 5 days',
    primaryDriver: 'Maintenance Frequency',
    status: 'elevated'
  },
  {
    id: 'ch-004',
    residentId: ALEX_CHEN.id,
    date: '2024-10-05',
    score: 63,
    scoreChange: +5,
    eventType: 'friction',
    milestone: 'Dishwasher Leak',
    description: 'Appliance leak with delayed response time',
    primaryDriver: 'Resolution Time',
    status: 'elevated'
  },
  {
    id: 'ch-005',
    residentId: ALEX_CHEN.id,
    date: '2025-01-18',
    score: 69,
    scoreChange: +6,
    eventType: 'friction',
    milestone: 'Thermostat Malfunction',
    description: 'Winter heating issue, thermostat replacement delayed',
    primaryDriver: 'Maintenance Frequency',
    status: 'high-risk'
  },
  {
    id: 'ch-006',
    residentId: ALEX_CHEN.id,
    date: '2025-02-28',
    score: 74,
    scoreChange: +5,
    eventType: 'friction',
    milestone: 'Air Filter Replacement Delay',
    description: 'Repeat HVAC-related issue, engagement declining',
    primaryDriver: 'Maintenance Frequency',
    status: 'high-risk'
  },
  {
    id: 'ch-007',
    residentId: ALEX_CHEN.id,
    date: '2025-03-08',
    score: 74,
    scoreChange: 0,
    eventType: 'intervention_recommended',
    milestone: 'High Priority Intervention Recommended',
    description: 'AI recommends Tier 3 intervention: $35 credit for happiness-focused services + premium cleaning',
    primaryDriver: 'Maintenance Frequency',
    interventionTier: 3,
    creditAmount: 35,
    status: 'intervention-pending'
  },
  {
    id: 'ch-008',
    residentId: ALEX_CHEN.id,
    date: '2025-03-08',
    score: 74,
    scoreChange: 0,
    eventType: 'intervention_deployed',
    milestone: 'Intervention Deployed',
    description: 'Manager approved $35 retention credit via SMS channel',
    primaryDriver: 'Maintenance Frequency',
    interventionTier: 3,
    creditAmount: 35,
    deployedBy: 'Sarah Mitchell',
    communicationChannel: 'SMS',
    status: 'intervention-active'
  },
  {
    id: 'ch-009',
    residentId: ALEX_CHEN.id,
    date: '2025-03-08',
    score: 74,
    scoreChange: 0,
    eventType: 'communication_sent',
    milestone: 'Resident Notified',
    description: 'SMS sent: "Hi Alex, we value you as a resident. To address recent maintenance concerns, we\'re providing a $35 service credit for happiness and convenience services. Use it anytime. - The Metropolitan Team"',
    communicationChannel: 'SMS',
    status: 'awaiting-engagement'
  },
  {
    id: 'ch-010',
    residentId: ALEX_CHEN.id,
    date: '2025-03-10',
    score: 72,
    scoreChange: -2,
    eventType: 'engagement',
    milestone: 'Resident Engaged',
    description: 'Alex viewed credit details and booked HVAC service for next week',
    creditUsed: 150,
    creditRemaining: 350,
    status: 'engaged'
  },
  {
    id: 'ch-011',
    residentId: ALEX_CHEN.id,
    date: '2025-03-15',
    score: 68,
    scoreChange: -4,
    eventType: 'service_completed',
    milestone: 'HVAC Service Completed',
    description: 'FixRight HVAC completed vent cleaning and filter replacement. Resident satisfaction improved.',
    creditUsed: 150,
    creditRemaining: 350,
    serviceProv ider: 'FixRight HVAC',
    status: 'improving'
  },
  {
    id: 'ch-012',
    residentId: ALEX_CHEN.id,
    date: '2025-03-20',
    score: 64,
    scoreChange: -4,
    eventType: 'service_completed',
    milestone: 'Premium Cleaning Booked',
    description: 'Alex used remaining credit for SparkClean apartment refresh',
    creditUsed: 200,
    creditRemaining: 150,
    serviceProvider: 'SparkClean',
    status: 'improving'
  },
  {
    id: 'ch-013',
    residentId: ALEX_CHEN.id,
    date: '2025-04-01',
    score: 58,
    scoreChange: -6,
    eventType: 'impact_realized',
    milestone: 'Projected Score Improvement',
    description: '30-day post-intervention assessment shows significant improvement. Risk tier expected to drop to medium by lease renewal.',
    creditUsed: 350,
    creditRemaining: 150,
    projectedScore: 52,
    expectedRetention: '85%',
    status: 'retained'
  }
];

export function getAlexChurnHistory() {
  return ALEX_CHURN_HISTORY;
}

export function getLatestScore() {
  return ALEX_CHURN_HISTORY[ALEX_CHURN_HISTORY.length - 1].score;
}

export function getScoreTrend() {
  const recent = ALEX_CHURN_HISTORY.slice(-3);
  const totalChange = recent.reduce((sum, entry) => sum + entry.scoreChange, 0);
  return totalChange < 0 ? 'improving' : totalChange > 0 ? 'declining' : 'stable';
}

export function getInterventionStatus() {
  const interventionEvent = ALEX_CHURN_HISTORY.find(e => e.eventType === 'intervention_deployed');
  const latestEvent = ALEX_CHURN_HISTORY[ALEX_CHURN_HISTORY.length - 1];
  
  if (!interventionEvent) return { deployed: false, status: 'not_deployed' };
  
  return {
    deployed: true,
    status: latestEvent.status,
    creditAmount: interventionEvent.creditAmount,
    creditUsed: latestEvent.creditUsed || 0,
    creditRemaining: latestEvent.creditRemaining || interventionEvent.creditAmount,
    deployedDate: interventionEvent.date,
    expectedImprovement: latestEvent.projectedScore || null
  };
}
