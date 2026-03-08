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

// Global response interceptor for demo-safe error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check if this is a demo-safe error that should show the banner
    if (isDemoSafeError(error)) {
      const context = error.config?.url || "API request";
      showDemoSafeError(error.message, context);
    }
    return Promise.reject(error);
  }
);

// Wrap API calls with demo-safe error handling
const withDemoSafe = (fn) => {
  return async (...args) => {
    try {
      return await fn(...args);
    } catch (error) {
      // Error already handled by interceptor, just re-throw
      throw error;
    }
  };
};

// Auth endpoints
const login = (credentials) => api.post("/api/auth/login", credentials);
const logout = () => api.post("/api/auth/logout");
const getSession = () => api.get("/api/auth/session");

// Admin endpoints
const getAdminDashboard = withDemoSafe(() => api.get("/api/admin/dashboard"));
const getProperties = withDemoSafe(() => api.get("/api/admin/properties"));
const getPropertyDetail = withDemoSafe((propertyId) => api.get(`/api/admin/properties/${propertyId}`));
const getProviders = withDemoSafe(() => api.get("/api/admin/providers"));
const getTenants = withDemoSafe(() => api.get("/api/admin/tenants"));
const getAnalytics = withDemoSafe(() => api.get("/api/admin/analytics"));

// Manager action endpoints
const deployIntervention = withDemoSafe((data) => api.post("/api/manager/actions/deploy-intervention", data));
const listManagerActions = withDemoSafe((limit = 100) => api.get("/api/manager/actions/list", { params: { limit } }));
const getRecentInterventionsForResident = withDemoSafe((residentId) => api.get(`/api/manager/actions/recent/${residentId}`));

// Resident booking endpoints
const createBooking = (data) => api.post("/api/resident/bookings", data);
const getResidentBookings = withDemoSafe(() => api.get("/api/resident/bookings"));

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
  API_BASE_URL,
};
