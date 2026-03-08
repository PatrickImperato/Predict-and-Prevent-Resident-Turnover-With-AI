import axios from "axios";
import { showDemoSafeError, isDemoSafeError } from "./demoSafeError";

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || "";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000, // 15 second timeout to prevent hanging requests
});

// Track in-flight requests to prevent duplicates
const inflightRequests = new Map();

// Request deduplication interceptor
api.interceptors.request.use(
  (config) => {
    const requestKey = `${config.method}:${config.url}`;
    
    // Cancel duplicate in-flight requests
    if (inflightRequests.has(requestKey)) {
      console.log(`Deduplicating request: ${requestKey}`);
      const controller = new AbortController();
      controller.abort();
      config.signal = controller.signal;
    }
    
    inflightRequests.set(requestKey, true);
    return config;
  },
  (error) => Promise.reject(error)
);

// Response cleanup interceptor
api.interceptors.response.use(
  (response) => {
    const requestKey = `${response.config.method}:${response.config.url}`;
    inflightRequests.delete(requestKey);
    return response;
  },
  (error) => {
    if (error.config) {
      const requestKey = `${error.config.method}:${error.config.url}`;
      inflightRequests.delete(requestKey);
    }
    
    // Log errors silently - components decide what to show users
    if (error.response) {
      console.warn(`API Error [${error.response.status}]:`, error.config?.url);
    } else if (error.request && !axios.isCancel(error)) {
      console.warn(`Network Error:`, error.config?.url);
    }
    
    return Promise.reject(error);
  }
);

// Helper to handle optional demo-safe errors for explicit unsupported actions
const handleUnsupportedAction = (error, actionName) => {
  console.error(`Unsupported action: ${actionName}`, error);
  showDemoSafeError(
    `This ${actionName} feature is not available in the live demo.`,
    actionName
  );
};

// Helper for safe data fetching with fallback
const safeFetch = async (fetchFn, fallbackValue = null) => {
  try {
    return await fetchFn();
  } catch (error) {
    console.warn("Data fetch failed, using fallback:", error.message);
    return fallbackValue;
  }
};

// Auth endpoints (never show demo banner on login/session)
const login = (credentials) => api.post("/api/auth/login", credentials);
const logout = () => api.post("/api/auth/logout");
const getSession = () => api.get("/api/auth/session");

// Admin endpoints (graceful fallback, no banner on fetch)
const getAdminDashboard = () => safeFetch(() => api.get("/api/admin/dashboard"), { data: null });
const getProperties = () => safeFetch(() => api.get("/api/admin/properties"), { data: { properties: [], portfolio_totals: {} } });
const getPropertyDetail = (propertyId) => safeFetch(() => api.get(`/api/admin/properties/${propertyId}`), { data: null });
const getProviders = () => safeFetch(() => api.get("/api/admin/providers"), { data: { providers: [] } });
const getTenants = () => safeFetch(() => api.get("/api/admin/tenants"), { data: { tenants: [] } });
const getAnalytics = () => safeFetch(() => api.get("/api/admin/analytics"), { data: null });

// Manager action endpoints (only show banner for unsupported mutations)
const deployIntervention = async (data) => {
  try {
    return await api.post("/api/manager/actions/deploy-intervention", data);
  } catch (error) {
    handleUnsupportedAction(error, "Deploy Intervention");
    throw error;
  }
};
const listManagerActions = (limit = 100) => safeFetch(() => api.get("/api/manager/actions/list", { params: { limit } }), { data: { interventions: [] } });
const getRecentInterventionsForResident = (residentId) => safeFetch(() => api.get(`/api/manager/actions/recent/${residentId}`), { data: { interventions: [] } });

// Resident booking endpoints
const createBooking = (data) => api.post("/api/resident/bookings", data);
const getResidentBookings = () => safeFetch(() => api.get("/api/resident/bookings"), { data: { bookings: [] } });

// Seed admin
const triggerPreviewReset = (payload) => api.post("/api/admin/seeds/preview-reset", payload);

export default api;

export {
  login,
  logout,
  getSession,
  getAdminDashboard,
  getProperties,
  getPropertyDetail,
  getProviders,
  getTenants,
  getAnalytics,
  deployIntervention,
  listManagerActions,
  getRecentInterventionsForResident,
  createBooking,
  getResidentBookings,
  triggerPreviewReset,
  handleUnsupportedAction,
  safeFetch,
  API_BASE_URL,
};
