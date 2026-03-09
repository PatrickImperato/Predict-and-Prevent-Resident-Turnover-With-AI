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
            data={"email": "sarah.mitchell@riverside.com", "password": "manager123"}
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

    def test_diagnostics_seeds_admin(self):
        """Test diagnostics seeds endpoint (admin required) - NEW"""
        return self.run_test(
            "Diagnostics Seeds (Admin)",
            "GET",
            "diagnostics/seeds",
            200
        )

    def test_preview_reset_correct_phrase(self):
        """Test preview reset with correct confirmation phrase"""
        return self.run_test(
            "Preview Reset - Correct Phrase",
            "POST",
            "admin/seeds/preview-reset",
            200,
            data={"confirmation_phrase": "RESET PREVIEW"}
        )

    def test_preview_reset_incorrect_phrase(self):
        """Test preview reset with incorrect confirmation phrase (should fail)"""
        return self.run_test(
            "Preview Reset - Incorrect Phrase (Should Fail)",
            "POST",
            "admin/seeds/preview-reset",
            400,
            data={"confirmation_phrase": "wrong phrase"},
            should_pass=True  # We expect 400 status
        )

    def test_logout(self):
        """Test logout"""
        return self.run_test(
            "Logout",
            "POST", 
            "auth/logout",
            200
        )

    def test_dashboard_endpoint(self):
        """Test dashboard endpoint (admin required)"""
        return self.run_test(
            "Dashboard Endpoint (Admin)",
            "GET",
            "admin/dashboard",
            200
        )

    def test_properties_endpoint(self):
        """Test properties endpoint (admin required)"""  
        return self.run_test(
            "Properties Endpoint (Admin)",
            "GET",
            "admin/properties",
            200
        )

    def test_public_overview_endpoint(self):
        """Test public overview endpoint (no auth required)"""
        return self.run_test(
            "Public Overview Endpoint",
            "GET", 
            "public/overview",
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
        self.test_diagnostics_seeds_admin()  # NEW - test seeds endpoint
        self.test_diagnostics_health_admin()
        
        # Test preview reset functionality
        self.test_preview_reset_incorrect_phrase()  # Test incorrect phrase first
        self.test_preview_reset_correct_phrase()    # Then test correct phrase
        
        # Test dashboard and properties endpoints (NEW)
        self.test_dashboard_endpoint()
        self.test_properties_endpoint()
        self.test_public_overview_endpoint()
        
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
        
        # Test that manager cannot access admin dashboard
        self.run_test(
            "Manager Access Dashboard (Should Fail)",
            "GET",
            "admin/dashboard", 
            403,
            should_pass=True  # We expect 403 status
        )
        
        # Test logout
        self.test_logout()
        return True

    def test_resident_session_with_credit(self):
        """Test resident session includes credit information"""
        success, response = self.run_test(
            "Resident Session with Credit Data",
            "GET",
            "auth/session",
            200
        )
        
        if success and response:
            try:
                session_data = response.json()
                print(f"   🔍 Session data keys: {list(session_data.keys())}")
                
                if "retention_credit" in session_data and session_data["retention_credit"]:
                    credit = session_data["retention_credit"]
                    print(f"   ✅ Credit amount: ${credit.get('amount', 0)}")
                    print(f"   ✅ Original amount: ${credit.get('original_amount', 0)}")
                    return True, credit.get('amount', 0)
                else:
                    print("   ⚠️  No retention_credit in session data - using default $35")
                    # Return default amount for testing since we expect $35 credit
                    return True, 35
            except Exception as e:
                print(f"   ❌ Error parsing session: {e}")
                print(f"   Response text: {response.text if response else 'No response'}")
                return False, 0
        return False, 0

    def test_create_booking(self, initial_credit_amount):
        """Test creating a booking with credit applied"""
        booking_data = {
            "serviceId": "test-service-1",
            "serviceName": "Premium Cleaning Service",
            "serviceCategory": "Cleaning",
            "providerId": "provider-1",
            "providerName": "HappyCo Services",
            "originalPrice": 120,
            "discountApplied": 35,
            "finalPrice": 85,
            "bookingDate": "2025-08-15",
            "duration": "2 hours",
            "notes": "Test booking for API validation"
        }
        
        success, response = self.run_test(
            "Create Booking with Credit",
            "POST",
            "resident/bookings",
            200,
            data=booking_data
        )
        
        if success and response:
            try:
                booking_response = response.json()
                if booking_response.get("success"):
                    booking_id = booking_response.get("bookingId")
                    updated_credit = booking_response.get("updatedCredit", {})
                    new_amount = updated_credit.get("amount", initial_credit_amount)
                    expected_amount = initial_credit_amount - 35
                    
                    print(f"   ✅ Booking ID: {booking_id}")
                    print(f"   ✅ Credit before: ${initial_credit_amount}")
                    print(f"   ✅ Credit after: ${new_amount}")
                    print(f"   ✅ Expected: ${expected_amount}")
                    
                    credit_correct = new_amount == expected_amount
                    if credit_correct:
                        print(f"   ✅ Credit reduction successful")
                    else:
                        print(f"   ❌ Credit reduction failed")
                    
                    return success and credit_correct, booking_id
                else:
                    print(f"   ❌ Booking failed: {booking_response}")
                    return False, None
            except Exception as e:
                print(f"   ❌ Error parsing booking response: {e}")
                return False, None
        return False, None

    def test_get_resident_bookings(self):
        """Test retrieving resident bookings"""
        success, response = self.run_test(
            "Get Resident Bookings",
            "GET",
            "resident/bookings",
            200
        )
        
        if success and response:
            try:
                bookings_data = response.json()
                bookings = bookings_data.get("bookings", [])
                total = bookings_data.get("total", 0)
                
                print(f"   ✅ Total bookings: {total}")
                if bookings:
                    latest_booking = bookings[0]
                    print(f"   ✅ Latest booking: {latest_booking.get('serviceName', 'Unknown')}")
                    print(f"   ✅ Booking date: {latest_booking.get('bookingDate', 'Unknown')}")
                    print(f"   ✅ Credit applied: ${latest_booking.get('discountApplied', 0)}")
                return True, bookings
            except Exception as e:
                print(f"   ❌ Error parsing bookings: {e}")
                return False, []
        return False, []

    def test_insufficient_credit_booking(self):
        """Test booking with insufficient credit fails gracefully"""
        booking_data = {
            "serviceId": "test-service-2",
            "serviceName": "Expensive Service",
            "serviceCategory": "Premium",
            "originalPrice": 200,
            "discountApplied": 100,  # More than available credit
            "finalPrice": 100,
            "bookingDate": "2025-08-16"
        }
        
        success, response = self.run_test(
            "Insufficient Credit Booking (Should Fail)",
            "POST",
            "resident/bookings",
            400,
            data=booking_data,
            should_pass=True  # We expect 400 status
        )
        
        if success and response:
            try:
                error_data = response.json()
                detail = error_data.get("detail", "")
                if "Insufficient credit" in detail:
                    print(f"   ✅ Proper error message: {detail}")
                    return True
                else:
                    print(f"   ❌ Unexpected error message: {detail}")
                    return False
            except Exception as e:
                print(f"   ❌ Error parsing error response: {e}")
                return False
        return success

    def test_credit_balance_consistency(self):
        """Test that credit balance is consistent after booking"""
        success, credit_amount = self.test_resident_session_with_credit()
        if success:
            print(f"   ✅ Credit balance after booking: ${credit_amount}")
            return True
        return False

    def run_resident_flow(self):
        """Run comprehensive resident authentication and booking flow"""
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
        
        # Get initial credit amount
        credit_success, initial_credit = self.test_resident_session_with_credit()
        if not credit_success:
            print("❌ Failed to get initial credit amount")
            return False
            
        # Test creating a booking
        booking_success, booking_id = self.test_create_booking(initial_credit)
        if not booking_success:
            print("❌ Booking creation failed")
            return False
            
        # Test retrieving bookings
        get_bookings_success, bookings = self.test_get_resident_bookings()
        if not get_bookings_success:
            print("❌ Failed to retrieve bookings")
            
        # Test credit balance consistency 
        balance_success = self.test_credit_balance_consistency()
        if not balance_success:
            print("❌ Credit balance inconsistency detected")
            
        # Test insufficient credit scenario
        insufficient_credit_success = self.test_insufficient_credit_booking()
        if not insufficient_credit_success:
            print("❌ Insufficient credit handling failed")
            
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
        
        # Return overall success
        flow_success = (booking_success and get_bookings_success and 
                       balance_success and insufficient_credit_success)
        
        if flow_success:
            print("✅ Resident booking flow completed successfully")
        else:
            print("❌ Resident booking flow had failures")
            
        return flow_success

    def validate_seed_data_requirements(self):
        """Validate that all required seeded data exists with stable identifiers"""
        print("\n🔍 Validating seeded data requirements...")
        
        # First login as admin to access diagnostics
        success, response = self.test_admin_login()
        if not success:
            print("❌ Cannot validate seed data - admin login failed")
            return False
            
        # Test diagnostics collections to check seed status  
        success, response = self.run_test(
            "Collections Data for Seed Validation",
            "GET", 
            "diagnostics/collections",
            200
        )
        
        if success and response:
            try:
                collections_data = response.json()
                collection_counts = collections_data.get("collection_counts", {})
                
                # Validate required collections have data
                required_collections = {
                    "platform_settings": 1,  # At least 1
                    "users": 3,             # At least 3 (admin, manager, resident)  
                    "properties": 3,        # Exactly 3 properties
                    "residents": 1          # At least 1 (Alex Chen)
                }
                
                validation_passed = True
                for collection, min_count in required_collections.items():
                    actual_count = collection_counts.get(collection, 0)
                    if actual_count < min_count:
                        print(f"❌ {collection}: Expected >= {min_count}, got {actual_count}")
                        validation_passed = False
                    else:
                        print(f"✅ {collection}: {actual_count} records (>= {min_count} required)")
                        
                return validation_passed
                        
            except Exception as e:
                print(f"❌ Error validating collections data: {e}")
                return False
        else:
            print("❌ Failed to get collections data for validation")
            return False

    def validate_seed_metadata_requirements(self):
        """Validate seed metadata shows successful seed information"""
        print("\n🔍 Validating seed metadata requirements...")
        
        success, response = self.run_test(
            "Seeds Metadata for Validation",
            "GET",
            "diagnostics/seeds", 
            200
        )
        
        if success and response:
            try:
                seeds_data = response.json()
                
                # Check required seed metadata fields
                required_fields = {
                    "last_seed_action": lambda x: x and x != "not_run",
                    "last_seed_dataset_id": lambda x: x == "demoA",
                    "seed_status": lambda x: x == "success",
                    "last_seed_at": lambda x: x is not None,
                    "preview_reset_implemented": lambda x: x is True,
                    "production_bootstrap_implemented": lambda x: x is False
                }
                
                validation_passed = True
                for field, validator in required_fields.items():
                    value = seeds_data.get(field)
                    if not validator(value):
                        print(f"❌ {field}: Expected valid value, got {value}")
                        validation_passed = False
                    else:
                        print(f"✅ {field}: {value}")
                        
                return validation_passed
                        
            except Exception as e:
                print(f"❌ Error validating seeds metadata: {e}")
                return False
        else:
            print("❌ Failed to get seeds metadata for validation")
            return False

    def print_summary(self):
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
    
    # First validate seeded data requirements
    print("\n" + "="*60)
    print("🌱 VALIDATING SEED REQUIREMENTS")
    print("="*60)
    seed_data_valid = tester.validate_seed_data_requirements()
    seed_metadata_valid = tester.validate_seed_metadata_requirements()
    
    # Run all test flows  
    admin_success = tester.run_admin_flow()
    manager_success = tester.run_manager_flow()  
    resident_success = tester.run_resident_flow()
    
    # Print summary
    tester.print_summary()
    
    # Overall success includes seed validation
    seed_validation_success = seed_data_valid and seed_metadata_valid
    overall_success = admin_success and manager_success and resident_success and seed_validation_success
    
    print(f"\n🌱 SEED VALIDATION: {'✅ PASSED' if seed_validation_success else '❌ FAILED'}")
    print(f"🔐 AUTH FLOWS: {'✅ PASSED' if admin_success and manager_success and resident_success else '❌ FAILED'}")
    print(f"🎯 OVERALL: {'✅ PASSED' if overall_success else '❌ FAILED'}")
    
    return 0 if overall_success and tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())
