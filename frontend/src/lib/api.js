import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || "";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Auth endpoints
const login = (credentials) => api.post("/api/auth/login", credentials);
const logout = () => api.post("/api/auth/logout");
const getSession = () => api.get("/api/auth/session");

// Admin endpoints
const getAdminDashboard = () => api.get("/api/admin/dashboard");
const getProperties = () => api.get("/api/admin/properties");
const getPropertyDetail = (propertyId) => api.get(`/api/admin/properties/${propertyId}`);
const getProviders = () => api.get("/api/admin/providers");
const getTenants = () => api.get("/api/admin/tenants");
const getAnalytics = () => api.get("/api/admin/analytics");

// Manager action endpoints
const deployIntervention = (data) => api.post("/api/manager/actions/deploy-intervention", data);
const listManagerActions = (limit = 100) => api.get("/api/manager/actions/list", { params: { limit } });
const getRecentInterventionsForResident = (residentId) => api.get(`/api/manager/actions/recent/${residentId}`);

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
  triggerPreviewReset,
  API_BASE_URL,
};
