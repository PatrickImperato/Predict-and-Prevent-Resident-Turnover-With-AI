/**
 * Demo-Safe Error Handling
 * 
 * For production demo environments, we hide technical errors from users
 * and show a consistent, professional "End of demo" message instead.
 * 
 * This prevents exposing:
 * - Authentication failures
 * - Network errors
 * - Backend errors
 * - Missing records
 * - Stack traces
 * - Any technical implementation details
 */

import { toast } from "sonner";

export const DEMO_END_MESSAGE = "End of demo. This view is intentionally limited in the live demo.";

/**
 * Show demo-safe error banner
 * @param {string} technicalError - The actual error (logged to console only)
 * @param {string} context - Context about where the error occurred (for debugging)
 */
export function showDemoSafeError(technicalError = "", context = "") {
  // Log technical details to console for debugging (not visible to end users)
  if (technicalError) {
    console.log(`[Demo Safe Error] ${context}:`, technicalError);
  }
  
  // Show clean, professional message to user
  toast.error(DEMO_END_MESSAGE, {
    duration: 5000,
    className: "border-red-200 bg-red-50 text-red-900",
  });
}

/**
 * Wrap an async function with demo-safe error handling
 * @param {Function} fn - The async function to wrap
 * @param {string} context - Context for debugging
 * @returns {Function} - Wrapped function
 */
export function withDemoSafeError(fn, context = "Operation") {
  return async (...args) => {
    try {
      return await fn(...args);
    } catch (error) {
      showDemoSafeError(error.message || String(error), context);
      throw error; // Re-throw so caller can handle if needed
    }
  };
}

/**
 * Check if an error should trigger demo-safe handling
 * @param {Error} error - The error to check
 * @returns {boolean} - True if this is a demo-safe error
 */
export function isDemoSafeError(error) {
  if (!error) return false;
  
  const message = error.message?.toLowerCase() || "";
  const demoSafePatterns = [
    "authentication",
    "unauthorized",
    "fetch failed",
    "network error",
    "backend error",
    "not found",
    "missing record",
    "failed to load",
    "500",
    "404",
    "401",
    "403",
  ];
  
  return demoSafePatterns.some(pattern => message.includes(pattern));
}

/**
 * Try an operation, show demo-safe error if it fails
 * @param {Function} fn - The operation to try
 * @param {any} fallbackValue - Value to return on error
 * @param {string} context - Context for debugging
 * @returns {Promise<any>} - Result or fallback value
 */
export async function tryWithDemoSafe(fn, fallbackValue = null, context = "Operation") {
  try {
    return await fn();
  } catch (error) {
    if (isDemoSafeError(error)) {
      showDemoSafeError(error.message, context);
    } else {
      // Non-demo errors get logged but still shown professionally
      console.error(`[${context}] Unexpected error:`, error);
      showDemoSafeError(error.message, context);
    }
    return fallbackValue;
  }
}
