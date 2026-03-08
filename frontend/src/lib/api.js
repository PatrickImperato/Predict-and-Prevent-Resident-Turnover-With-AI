import axios from "axios";
import { showDemoSafeError, isDemoSafeError } from "./demoSafeError";

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || "";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Global response interceptor - only log errors, don't auto-show banners
// Components will decide if/when to show demo banners based on context
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log all errors for debugging but don't auto-show banners
    if (error.response) {
      console.warn(`API Error [${error.response.status}]:`, error.config?.url);
    } else if (error.request) {
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

// Auth endpoints (never show demo banner on login/session)
const login = (credentials) => api.post("/api/auth/login", credentials);
const logout = () => api.post("/api/auth/logout");
const getSession = () => api.get("/api/auth/session");

// Admin endpoints (graceful fallback, no banner on fetch)
const getAdminDashboard = () => api.get("/api/admin/dashboard");
const getProperties = () => api.get("/api/admin/properties");
const getPropertyDetail = (propertyId) => api.get(`/api/admin/properties/${propertyId}`);
const getProviders = () => api.get("/api/admin/providers");
const getTenants = () => api.get("/api/admin/tenants");
const getAnalytics = () => api.get("/api/admin/analytics");

// Manager action endpoints (only show banner for unsupported mutations)
const deployIntervention = async (data) => {
  try {
    return await api.post("/api/manager/actions/deploy-intervention", data);
  } catch (error) {
    handleUnsupportedAction(error, "Deploy Intervention");
    throw error;
  }
};
const listManagerActions = (limit = 100) => api.get("/api/manager/actions/list", { params: { limit } });
const getRecentInterventionsForResident = (residentId) => api.get(`/api/manager/actions/recent/${residentId}`);

// Resident booking endpoints
const createBooking = (data) => api.post("/api/resident/bookings", data);
const getResidentBookings = () => api.get("/api/resident/bookings");

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
  API_BASE_URL,
};
