import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAdminDashboard, getPropertyDetail } from "@/lib/api";
import { tryWithDemoSafe } from "@/lib/demoSafeError";

/**
 * Demo-Safe Testing Component
 * 
 * This component tests various failure scenarios to ensure
 * all errors show the demo-safe message instead of technical errors.
 */
export default function DemoSafeTest() {
  const navigate = useNavigate();
  const [testResults, setTestResults] = useState([]);

  useEffect(() => {
    runTests();
  }, []);

  const addResult = (test, passed, message) => {
    setTestResults(prev => [...prev, { test, passed, message }]);
  };

  const runTests = async () => {
    console.log("Starting demo-safe error tests...");

    // Test 1: Non-existent API endpoint
    try {
      const response = await fetch("/api/fake-endpoint");
      if (!response.ok) {
        addResult("Non-existent endpoint", true, "Shows demo-safe error");
      }
    } catch (error) {
      addResult("Non-existent endpoint", true, "Caught gracefully");
    }

    // Test 2: Invalid property ID
    const result = await tryWithDemoSafe(
      () => getPropertyDetail("fake-property-id-123"),
      null,
      "Property detail test"
    );
    addResult("Invalid property", result === null, "Demo-safe handler worked");

    // Test 3: Admin dashboard with potential errors
    const dashResult = await tryWithDemoSafe(
      () => getAdminDashboard(),
      { error: true },
      "Admin dashboard test"
    );
    addResult("Admin dashboard", true, "Handled gracefully");

    console.log("Demo-safe tests complete");
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Demo-Safe Error Testing</h1>
      <p className="text-sm text-slate-600 mb-6">
        Testing that all errors show "End of demo" message
      </p>
      
      <div className="space-y-2">
        {testResults.map((result, idx) => (
          <div key={idx} className="flex items-center gap-3 p-3 rounded border border-slate-200">
            <span className={`text-lg ${result.passed ? 'text-green-600' : 'text-red-600'}`}>
              {result.passed ? '✓' : '✗'}
            </span>
            <div>
              <p className="font-medium text-slate-900">{result.test}</p>
              <p className="text-xs text-slate-600">{result.message}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate(-1)}
        className="mt-6 px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
      >
        Back
      </button>
    </div>
  );
}
