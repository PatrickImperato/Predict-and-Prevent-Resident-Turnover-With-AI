import requests
import sys
import json
from datetime import datetime

class HappyCoConciergeTester:
    def __init__(self, base_url="https://happyco-v1-preview.preview.emergentagent.com"):
        self.base_url = base_url
        self.session = requests.Session()
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None, should_pass=True):
        """Run a single API test"""
        url = f"{self.base_url}/api/{endpoint}"
        test_headers = {'Content-Type': 'application/json'}
        if headers:
            test_headers.update(headers)

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = self.session.get(url, headers=test_headers)
            elif method == 'POST':
                response = self.session.post(url, json=data, headers=test_headers)

            success = response.status_code == expected_status if should_pass else response.status_code != expected_status
            
            result = {
                "test_name": name,
                "method": method,
                "endpoint": endpoint,
                "expected_status": expected_status,
                "actual_status": response.status_code,
                "success": success,
                "response_data": None,
                "error": None
            }

            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    result["response_data"] = response.json()
                except:
                    result["response_data"] = response.text
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    result["error"] = response.json()
                except:
                    result["error"] = response.text
                    
            self.test_results.append(result)
            return success, response

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            result = {
                "test_name": name,
                "method": method, 
                "endpoint": endpoint,
                "expected_status": expected_status,
                "actual_status": None,
                "success": False,
                "response_data": None,
                "error": str(e)
            }
            self.test_results.append(result)
            return False, None

    def test_root_endpoint(self):
        """Test root API endpoint"""
        return self.run_test(
            "Root API Endpoint",
            "GET",
            "",
            200
        )

    def test_unauthenticated_session(self):
        """Test session endpoint without authentication"""
        return self.run_test(
            "Unauthenticated Session",
            "GET",
            "auth/session",
            200
        )

    def test_admin_login(self):
        """Test admin login with seeded account"""
        return self.run_test(
            "Admin Login",
            "POST",
            "auth/login",
            200,
            data={"email": "admin@happyco.com", "password": "admin123"}
        )

    def test_manager_login(self):
        """Test manager login with seeded account"""
        return self.run_test(
            "Manager Login",
            "POST", 
            "auth/login",
            200,
            data={"email": "manager@riverside.com", "password": "manager123"}
        )

    def test_resident_login(self):
        """Test resident login with seeded account"""
        return self.run_test(
            "Resident Login",
            "POST",
            "auth/login", 
            200,
            data={"email": "alex.chen@email.com", "password": "demo123"}
        )

    def test_invalid_login(self):
        """Test login with invalid credentials"""
        return self.run_test(
            "Invalid Login",
            "POST",
            "auth/login",
            401,
            data={"email": "invalid@test.com", "password": "wrongpass"}
        )

    def test_authenticated_session(self):
        """Test session endpoint after authentication"""
        return self.run_test(
            "Authenticated Session",
            "GET",
            "auth/session",
            200
        )

    def test_diagnostics_runtime_admin(self):
        """Test diagnostics runtime endpoint (admin required)"""
        return self.run_test(
            "Diagnostics Runtime (Admin)",
            "GET",
            "diagnostics/runtime",
            200
        )

    def test_diagnostics_session_admin(self):
        """Test diagnostics session endpoint (admin required)"""
        return self.run_test(
            "Diagnostics Session (Admin)",
            "GET",
            "diagnostics/session", 
            200
        )

    def test_diagnostics_collections_admin(self):
        """Test diagnostics collections endpoint (admin required)"""
        return self.run_test(
            "Diagnostics Collections (Admin)",
            "GET",
            "diagnostics/collections",
            200
        )

    def test_diagnostics_health_admin(self):
        """Test diagnostics health endpoint (admin required)"""
        return self.run_test(
            "Diagnostics Health (Admin)",
            "GET",
            "diagnostics/health",
            200
        )

    def test_preview_reset_placeholder(self):
        """Test preview reset placeholder (should return 501)"""
        return self.run_test(
            "Preview Reset Placeholder", 
            "POST",
            "admin/seeds/preview-reset",
            501
        )

    def test_logout(self):
        """Test logout"""
        return self.run_test(
            "Logout",
            "POST", 
            "auth/logout",
            200
        )

    def run_admin_flow(self):
        """Run full admin authentication and diagnostics flow"""
        print("\n" + "="*60)
        print("🧪 STARTING ADMIN FLOW TESTS")
        print("="*60)
        
        # Clear session first
        self.session.cookies.clear()
        
        # Test basic endpoints
        self.test_root_endpoint()
        self.test_unauthenticated_session()
        
        # Test invalid login
        self.test_invalid_login()
        
        # Test admin login
        success, response = self.test_admin_login()
        if not success:
            print("❌ Admin login failed, stopping admin flow")
            return False
            
        # Test authenticated session
        self.test_authenticated_session()
        
        # Test all diagnostics endpoints (admin required)
        self.test_diagnostics_runtime_admin()
        self.test_diagnostics_session_admin() 
        self.test_diagnostics_collections_admin()
        self.test_diagnostics_health_admin()
        
        # Test preview reset placeholder
        self.test_preview_reset_placeholder()
        
        # Test logout
        self.test_logout()
        
        return True

    def run_manager_flow(self):
        """Run manager authentication flow to verify non-admin restrictions"""
        print("\n" + "="*60)
        print("🧪 STARTING MANAGER FLOW TESTS")
        print("="*60)
        
        # Clear session first
        self.session.cookies.clear()
        
        # Test manager login
        success, response = self.test_manager_login()
        if not success:
            print("❌ Manager login failed, stopping manager flow")
            return False
            
        # Test that manager cannot access admin diagnostics
        self.run_test(
            "Manager Access Diagnostics (Should Fail)",
            "GET",
            "diagnostics/runtime",
            403,
            should_pass=True  # We expect 403 status
        )
        
        # Test logout
        self.test_logout()
        return True

    def run_resident_flow(self):
        """Run resident authentication flow to verify non-admin restrictions"""
        print("\n" + "="*60)
        print("🧪 STARTING RESIDENT FLOW TESTS")
        print("="*60)
        
        # Clear session first
        self.session.cookies.clear()
        
        # Test resident login
        success, response = self.test_resident_login()
        if not success:
            print("❌ Resident login failed, stopping resident flow")
            return False
            
        # Test that resident cannot access admin diagnostics
        self.run_test(
            "Resident Access Diagnostics (Should Fail)",
            "GET", 
            "diagnostics/runtime",
            403,
            should_pass=True  # We expect 403 status
        )
        
        # Test logout
        self.test_logout()
        return True

    def print_summary(self):
        """Print test summary"""
        print("\n" + "="*60)
        print("📊 TEST SUMMARY")
        print("="*60)
        print(f"Total tests run: {self.tests_run}")
        print(f"Tests passed: {self.tests_passed}")
        print(f"Tests failed: {self.tests_run - self.tests_passed}")
        print(f"Success rate: {(self.tests_passed/self.tests_run*100):.1f}%")
        
        print("\n📋 DETAILED RESULTS:")
        for result in self.test_results:
            status = "✅ PASS" if result["success"] else "❌ FAIL"
            print(f"{status} - {result['test_name']} ({result['method']} {result['endpoint']})")
            if not result["success"]:
                print(f"      Expected: {result['expected_status']}, Got: {result['actual_status']}")
                if result["error"]:
                    print(f"      Error: {result['error']}")

def main():
    tester = HappyCoConciergeTester()
    
    # Run all test flows
    admin_success = tester.run_admin_flow()
    manager_success = tester.run_manager_flow()  
    resident_success = tester.run_resident_flow()
    
    # Print summary
    tester.print_summary()
    
    # Return appropriate exit code
    overall_success = admin_success and manager_success and resident_success
    return 0 if overall_success and tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())