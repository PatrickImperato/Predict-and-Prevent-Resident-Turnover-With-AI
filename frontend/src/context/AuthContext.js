import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { login as apiLogin, logout as apiLogout, getSession } from "@/lib/api";

const fallbackSession = {
  authenticated: false,
  user_id: null,
  email: null,
  display_name: null,
  role: null,
  is_super_admin: false,
  default_property_id: null,
  last_login_at: null,
  app_env: "preview",
  demo_mode_enabled: true,
  admin_route_base: "/app/admin",
};

const SESSION_STORAGE_KEY = "happyco-concierge-session-cache";

const AuthContext = createContext({
  loading: true,
  session: fallbackSession,
  login: async () => {},
  logout: async () => {},
  refreshSession: async () => {},
});

const readCachedSession = () => {
  if (typeof window === "undefined") {
    return fallbackSession;
  }

  try {
    const raw = window.sessionStorage.getItem(SESSION_STORAGE_KEY);
    return raw ? JSON.parse(raw) : fallbackSession;
  } catch {
    return fallbackSession;
  }
};

const persistSession = (nextSession) => {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(nextSession));
};

const clearSessionStorage = () => {
  if (typeof window === "undefined") {
    return;
  }
  window.sessionStorage.removeItem(SESSION_STORAGE_KEY);
};

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(readCachedSession);
  const [loading, setLoading] = useState(true);

  const refreshSession = async () => {
    try {
      const response = await getSession();
      setSession(response.data);
      persistSession(response.data);
      return response.data;
    } catch (error) {
      setSession((current) => {
        const nextSession = current?.authenticated ? current : fallbackSession;
        persistSession(nextSession);
        return nextSession;
      });
      throw error;
    }
  };

  useEffect(() => {
    const bootstrap = async () => {
      setLoading(true);
      try {
        await refreshSession();
      } finally {
        setLoading(false);
      }
    };

    bootstrap();
  }, []);

  const login = async (payload) => {
    const response = await apiLogin(payload);
    setSession(response.data.session);
    persistSession(response.data.session);
    return response.data;
  };

  const logout = async () => {
    try {
      await apiLogout();
    } catch (error) {
      console.error("Logout API call failed:", error);
    } finally {
      // Clear session state regardless of API call result
      const clearedSession = {
        ...fallbackSession,
        authenticated: false,
        user_id: null,
        email: null,
        display_name: null,
        role: null,
      };
      setSession(clearedSession);
      clearSessionStorage();
      
      // Redirect to login
      window.location.href = "/login";
    }
  };

  const value = useMemo(
    () => ({
      loading,
      session,
      login,
      logout,
      refreshSession,
    }),
    [loading, session],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
