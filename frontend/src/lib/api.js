import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_BASE_URL = `${BACKEND_URL}/api`;

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const authApi = {
  getSession: () => apiClient.get("/auth/session"),
  login: (payload) => apiClient.post("/auth/login", payload),
  logout: () => apiClient.post("/auth/logout"),
};

export const diagnosticsApi = {
  getRuntime: () => apiClient.get("/diagnostics/runtime"),
  getSession: () => apiClient.get("/diagnostics/session"),
  getCollections: () => apiClient.get("/diagnostics/collections"),
  getSeeds: () => apiClient.get("/diagnostics/seeds"),
  getHealth: () => apiClient.get("/diagnostics/health"),
  triggerPreviewResetPlaceholder: () => apiClient.post("/admin/seeds/preview-reset"),
};

export { API_BASE_URL };
