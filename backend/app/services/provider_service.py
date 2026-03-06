from __future__ import annotations

from fastapi import HTTPException, status
from motor.motor_asyncio import AsyncIOMotorDatabase


def _iso(value):
    if value is None:
        return None
    if isinstance(value, str):
        return value
    return value.isoformat()


async def _build_provider_summary(db: AsyncIOMotorDatabase, provider: dict) -> dict:
    bookings = await db.bookings.find({"providerId": provider["id"]}, {"_id": 0}).to_list(length=None)
    receipts = await db.receipts.find({}, {"_id": 0}).to_list(length=None)
    receipt_map = {item.get("bookingId"): item for item in receipts}
    revenue = sum(receipt_map.get(booking["id"], {}).get("amount", 0) for booking in bookings)
    completed = sum(1 for booking in bookings if booking.get("status") == "completed")
    properties = await db.properties.find({"id": {"$in": provider.get("coverageProperties", [])}}, {"_id": 0}).to_list(length=None)

    return {
        "provider_id": provider["id"],
        "name": provider["name"],
        "service_categories": provider.get("serviceCategories", []),
        "availability_label": provider.get("availabilityLabel", "Available"),
        "coverage_percent": provider.get("coveragePercent", 0),
        "fulfillment_rate": provider.get("fulfillmentRate", 0),
        "bookings_count": len(bookings),
        "completed_bookings": completed,
        "revenue_generated": revenue,
        "coverage_properties": [property_item["name"] for property_item in properties],
    }


async def get_providers_list_read_model(db: AsyncIOMotorDatabase) -> dict:
    providers = await db.providers.find({}, {"_id": 0}).to_list(length=None)
    payload = []
    for provider in providers:
        payload.append(await _build_provider_summary(db, provider))

    payload.sort(key=lambda item: item["revenue_generated"], reverse=True)
    return {
        "summary": {
            "provider_count": len(payload),
            "total_provider_revenue": sum(item["revenue_generated"] for item in payload),
            "average_fulfillment_rate": round(
                sum(item["fulfillment_rate"] for item in payload) / max(len(payload), 1)
            ),
        },
        "providers": payload,
    }


async def get_provider_detail_read_model(db: AsyncIOMotorDatabase, provider_id: str) -> dict:
    provider = await db.providers.find_one({"id": provider_id}, {"_id": 0})
    if not provider:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Provider not found")

    bookings = await db.bookings.find({"providerId": provider_id}, {"_id": 0}).sort("scheduledFor", -1).to_list(length=None)
    receipts = await db.receipts.find({}, {"_id": 0}).to_list(length=None)
    residents = await db.residents.find({}, {"_id": 0}).to_list(length=None)
    properties = await db.properties.find({}, {"_id": 0}).to_list(length=None)
    residents_map = {item["id"]: item for item in residents}
    properties_map = {item["id"]: item for item in properties}
    receipt_map = {item.get("bookingId"): item for item in receipts}

    booking_history = []
    for booking in bookings:
        resident = residents_map.get(booking.get("residentId"), {})
        property_record = properties_map.get(booking.get("propertyId"), {})
        booking_history.append(
            {
                "booking_id": booking["id"],
                "service_name": booking.get("serviceName"),
                "resident_name": resident.get("fullName"),
                "property_name": property_record.get("name"),
                "status": booking.get("status"),
                "scheduled_for": _iso(booking.get("scheduledFor")),
                "revenue_amount": receipt_map.get(booking.get("id"), {}).get("amount", 0),
            }
        )

    linked_properties = [
        {
            "property_id": property_record["id"],
            "name": property_record["name"],
        }
        for property_record in properties
        if property_record["id"] in provider.get("coverageProperties", [])
    ]

    resident_examples = [
        {
            "resident_id": residents_map.get(booking.get("residentId"), {}).get("id"),
            "name": residents_map.get(booking.get("residentId"), {}).get("fullName"),
            "service_name": booking.get("serviceName"),
        }
        for booking in bookings[:3]
    ]

    total_revenue = sum(item["revenue_amount"] for item in booking_history)
    completed = sum(1 for item in booking_history if item["status"] == "completed")

    return {
        "provider": {
            "provider_id": provider["id"],
            "name": provider["name"],
            "availability_label": provider.get("availabilityLabel", "Available"),
            "service_categories": provider.get("serviceCategories", []),
            "coverage_percent": provider.get("coveragePercent", 0),
            "fulfillment_rate": provider.get("fulfillmentRate", 0),
            "booking_count": len(booking_history),
        },
        "booking_history": booking_history,
        "linked_properties": linked_properties,
        "resident_examples": resident_examples,
        "revenue_breakdown": {
            "revenue_generated": total_revenue,
            "completed_bookings": completed,
            "pending_bookings": len(booking_history) - completed,
        },
    }
