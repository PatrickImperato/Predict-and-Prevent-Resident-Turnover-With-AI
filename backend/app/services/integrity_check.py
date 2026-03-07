"""Database integrity check service for canonical data verification."""
from motor.motor_asyncio import AsyncIOMotorDatabase
from typing import Dict, List, Any


class IntegrityCheckResult:
    def __init__(self):
        self.passed = True
        self.errors: List[str] = []
        self.warnings: List[str] = []
        self.checks_run: List[str] = []
        
    def add_error(self, message: str):
        self.passed = False
        self.errors.append(message)
        
    def add_warning(self, message: str):
        self.warnings.append(message)
        
    def add_check(self, check_name: str):
        self.checks_run.append(check_name)
        
    def to_dict(self) -> Dict[str, Any]:
        return {
            "passed": self.passed,
            "errors": self.errors,
            "warnings": self.warnings,
            "checks_run": self.checks_run,
            "total_checks": len(self.checks_run),
            "total_errors": len(self.errors),
            "total_warnings": len(self.warnings)
        }


async def check_database_integrity(db: AsyncIOMotorDatabase) -> IntegrityCheckResult:
    """Run comprehensive database integrity checks."""
    result = IntegrityCheckResult()
    
    # Check 1: All residents point to valid properties
    result.add_check("resident_property_references")
    residents = await db.tracked_residents.find({}).to_list(None)
    property_ids = {p["propertyId"] async for p in db.properties.find({}, {"propertyId": 1})}
    
    for resident in residents:
        if resident.get("propertyId") not in property_ids:
            result.add_error(
                f"Resident {resident.get('residentId')} references invalid property {resident.get('propertyId')}"
            )
    
    # Check 2: All units point to valid properties
    result.add_check("unit_property_references")
    units = await db.units.find({}).to_list(None)
    
    for unit in units:
        if unit.get("propertyId") not in property_ids:
            result.add_error(
                f"Unit {unit.get('unitId')} references invalid property {unit.get('propertyId')}"
            )
    
    # Check 3: Flagship property exists
    result.add_check("flagship_property_exists")
    flagship = await db.properties.find_one({"isFlagship": True})
    if not flagship:
        result.add_error("No flagship property found")
    
    # Check 4: Flagship resident (Alex Chen) exists
    result.add_check("flagship_resident_exists")
    alex_chen = await db.tracked_residents.find_one({"fullName": "Alex Chen"})
    if not alex_chen:
        result.add_error("Flagship resident Alex Chen not found")
    elif alex_chen.get("unit") != "501":
        result.add_warning("Alex Chen unit is not 501")
    
    # Check 5: User emails are unique
    result.add_check("user_email_uniqueness")
    users = await db.users.find({}).to_list(None)
    emails = [u.get("email") for u in users if u.get("email")]
    if len(emails) != len(set(emails)):
        result.add_error("Duplicate user emails found")
    
    # Check 6: Canonical IDs are unique
    result.add_check("canonical_id_uniqueness")
    
    # Check property IDs
    prop_ids = [p.get("propertyId") for p in await db.properties.find({}).to_list(None)]
    if len(prop_ids) != len(set(prop_ids)):
        result.add_error("Duplicate property IDs found")
    
    # Check resident IDs
    res_ids = [r.get("residentId") for r in residents]
    if len(res_ids) != len(set(res_ids)):
        result.add_error("Duplicate resident IDs found")
    
    # Check 7: Provider property coverage references valid properties
    result.add_check("provider_property_coverage")
    providers = await db.providers.find({}).to_list(None)
    
    for provider in providers:
        for prop_id in provider.get("properties", []):
            if prop_id not in property_ids:
                result.add_error(
                    f"Provider {provider.get('name')} references invalid property {prop_id}"
                )
    
    # Check 8: Interventions reference valid residents
    result.add_check("intervention_resident_references")
    interventions = await db.interventions.find({}).to_list(None)
    resident_ids = {r.get("residentId") for r in residents}
    
    for intervention in interventions:
        if intervention.get("residentId") not in resident_ids:
            result.add_error(
                f"Intervention {intervention.get('interventionId')} references invalid resident {intervention.get('residentId')}"
            )
    
    # Check 9: Seed state integrity
    result.add_check("seed_state_integrity")
    seed_state = await db.seed_state.find_one({"seedKey": "demo_dataset_v1"})
    if not seed_state:
        result.add_warning("Seed state not found - database may not be properly seeded")
    
    return result


async def get_database_stats(db: AsyncIOMotorDatabase) -> Dict[str, Any]:
    """Get database statistics for monitoring."""
    return {
        "collections": {
            "users": await db.users.count_documents({}),
            "properties": await db.properties.count_documents({}),
            "units": await db.units.count_documents({}),
            "tracked_residents": await db.tracked_residents.count_documents({}),
            "providers": await db.providers.count_documents({}),
            "interventions": await db.interventions.count_documents({}),
            "bookings": await db.bookings.count_documents({}),
            "concierge_messages": await db.concierge_messages.count_documents({}),
            "maintenance_tickets": await db.maintenance_tickets.count_documents({})
        },
        "seed_state": await db.seed_state.find_one({"seedKey": "demo_dataset_v1"}) is not None
    }
