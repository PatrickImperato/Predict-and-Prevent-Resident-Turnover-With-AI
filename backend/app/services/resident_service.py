from __future__ import annotations

from fastapi import HTTPException, status
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.seeds.constants import CHURN_WEIGHTS


def _iso(value):
    if value is None:
        return None
    if isinstance(value, str):
        return value
    return value.isoformat()


async def _get_resident_or_404(db: AsyncIOMotorDatabase, resident_id: str) -> dict:
    resident = await db.residents.find_one({"id": resident_id}, {"_id": 0})
    if not resident:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Resident not found")
    return resident


def _ensure_resident_access(current_user: dict, resident: dict) -> None:
    role = current_user.get("role")
    if role == "admin":
        return
    if role == "resident" and resident.get("userId") == current_user.get("id"):
        return
    if role == "manager" and current_user.get("defaultPropertyId") == resident.get("propertyId"):
        return
    raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Resident access denied")


async def _latest_prediction(db: AsyncIOMotorDatabase, resident_id: str) -> dict:
    return (
        await db.churn_prediction_history.find_one(
            {"residentId": resident_id, "isLatest": True}, {"_id": 0}
        )
        or {}
    )


async def get_resident_profile_read_model(
    db: AsyncIOMotorDatabase,
    resident_id: str,
    current_user: dict,
) -> dict:
    resident = await _get_resident_or_404(db, resident_id)
    _ensure_resident_access(current_user, resident)

    property_record = await db.properties.find_one({"id": resident["propertyId"]}, {"_id": 0})
    unit = await db.units.find_one(
        {"propertyId": resident["propertyId"], "assignedResidentId": resident_id}, {"_id": 0}
    )
    prediction = await _latest_prediction(db, resident_id)
    score_history = await db.churn_score_history.find(
        {"residentId": resident_id}, {"_id": 0}
    ).sort("asOfDate", 1).to_list(length=None)

    return {
        "resident": {
            "id": resident["id"],
            "name": resident["fullName"],
            "email": resident.get("email"),
            "phone": resident.get("phone"),
            "unit": resident.get("unit"),
            "risk_tier": resident.get("riskTier"),
            "tags": resident.get("tags", []),
        },
        "property": {
            "id": property_record.get("id") if property_record else None,
            "name": property_record.get("name") if property_record else None,
            "manager_user_id": property_record.get("managerUserId") if property_record else None,
        },
        "unit": {
            "id": unit.get("id") if unit else None,
            "number": unit.get("number") if unit else resident.get("unit"),
            "status": unit.get("status") if unit else "occupied",
            "bedrooms": unit.get("bedrooms") if unit else None,
            "bathrooms": unit.get("bathrooms") if unit else None,
            "square_feet": unit.get("squareFeet") if unit else None,
        },
        "current_prediction": {
            "score": prediction.get("score", resident.get("riskScore")),
            "score_change": prediction.get("scoreChange", 0),
            "risk_tier": prediction.get("riskTier", resident.get("riskTier")),
            "driver_summary": prediction.get("driverSummary"),
            "score_explanation": prediction.get("scoreExplanation"),
            "signal_summary": prediction.get("signalSummary", {}),
        },
        "score_history": [
            {"as_of_date": _iso(item.get("asOfDate")), "score": item.get("score", 0)}
            for item in score_history
        ],
        "primary_drivers": prediction.get("drivers", []),
        "churn_weights": CHURN_WEIGHTS,
    }


async def get_resident_timeline_read_model(
    db: AsyncIOMotorDatabase,
    resident_id: str,
    current_user: dict,
) -> dict:
    resident = await _get_resident_or_404(db, resident_id)
    _ensure_resident_access(current_user, resident)

    maintenance = await db.maintenance_history.find(
        {"residentId": resident_id}, {"_id": 0}
    ).sort("openedAt", -1).to_list(length=None)
    messages = await db.concierge_messages.find(
        {"residentId": resident_id}, {"_id": 0}
    ).sort("createdAt", -1).to_list(length=None)
    interventions = await db.interventions_log.find(
        {"residentId": resident_id}, {"_id": 0}
    ).sort("happenedAt", -1).to_list(length=None)
    offers = await db.offers.find({"residentId": resident_id}, {"_id": 0}).sort("createdAt", -1).to_list(length=None)
    bookings = await db.bookings.find({"residentId": resident_id}, {"_id": 0}).sort("scheduledFor", -1).to_list(length=None)
    prediction = await _latest_prediction(db, resident_id)

    timeline = []
    for item in maintenance:
        timeline.append(
            {
                "id": item["id"],
                "type": "maintenance",
                "title": item.get("issueTitle", item.get("issueType", "Maintenance issue")),
                "detail": item.get("description", ""),
                "happened_at": _iso(item.get("openedAt")),
                "status": item.get("status", "closed"),
            }
        )
    for item in messages:
        timeline.append(
            {
                "id": item["id"],
                "type": "communication",
                "title": item.get("channelLabel", "AI concierge"),
                "detail": item.get("body", ""),
                "happened_at": _iso(item.get("createdAt")),
                "status": item.get("direction", "outbound"),
            }
        )
    for item in offers:
        timeline.append(
            {
                "id": item["id"],
                "type": "offer",
                "title": item.get("title", "Offer delivered"),
                "detail": f"Status: {item.get('status', 'pending')}",
                "happened_at": _iso(item.get("createdAt")),
                "status": item.get("status", "pending"),
            }
        )
    for item in bookings:
        timeline.append(
            {
                "id": item["id"],
                "type": "booking",
                "title": item.get("serviceName", "Service booked"),
                "detail": f"Status: {item.get('status', 'scheduled')}",
                "happened_at": _iso(item.get("scheduledFor")),
                "status": item.get("status", "scheduled"),
            }
        )
    for item in interventions:
        timeline.append(
            {
                "id": item["id"],
                "type": "intervention",
                "title": item.get("title", item.get("interventionType", "Intervention")),
                "detail": item.get("detail", ""),
                "happened_at": _iso(item.get("happenedAt")),
                "status": item.get("status", "completed"),
            }
        )

    if prediction:
        timeline.append(
            {
                "id": f"score-update-{resident_id}",
                "type": "risk_score",
                "title": "Risk score updated",
                "detail": f"Current score {prediction.get('score', 0)} with change {prediction.get('scoreChange', 0)} after latest intervention cycle.",
                "happened_at": _iso(prediction.get("updatedAt") or prediction.get("createdAt")),
                "status": prediction.get("riskTier", resident.get("riskTier", "medium")),
            }
        )

    timeline.sort(key=lambda item: item.get("happened_at") or "", reverse=True)

    return {
        "resident_id": resident_id,
        "timeline": timeline,
        "lifecycle_summary": {
            "maintenance_events": len(maintenance),
            "communications": len(messages),
            "interventions": len(interventions),
            "offers": len(offers),
            "bookings": len(bookings),
            "current_score": prediction.get("score", resident.get("riskScore", 0)),
        },
    }


async def get_resident_services_read_model(
    db: AsyncIOMotorDatabase,
    resident_id: str,
    current_user: dict,
) -> dict:
    resident = await _get_resident_or_404(db, resident_id)
    _ensure_resident_access(current_user, resident)

    credits = await db.discount_impacts.find({"residentId": resident_id}, {"_id": 0}).sort("createdAt", -1).to_list(length=None)
    offers = await db.offers.find({"residentId": resident_id}, {"_id": 0}).sort("createdAt", -1).to_list(length=None)
    bookings = await db.bookings.find({"residentId": resident_id}, {"_id": 0}).sort("scheduledFor", -1).to_list(length=None)
    receipts = await db.receipts.find({"residentId": resident_id}, {"_id": 0}).to_list(length=None)
    providers = await db.providers.find({}, {"_id": 0}).to_list(length=None)
    provider_map = {provider["id"]: provider["name"] for provider in providers}
    receipt_map = {item.get("bookingId"): item for item in receipts}

    services = []
    for booking in bookings:
        services.append(
            {
                "id": booking["id"],
                "service_name": booking.get("serviceName"),
                "status": booking.get("status"),
                "scheduled_for": _iso(booking.get("scheduledFor")),
                "provider_name": provider_map.get(booking.get("providerId"), "Assigned vendor"),
                "revenue_amount": receipt_map.get(booking.get("id"), {}).get("amount", 0),
            }
        )

    return {
        "resident_id": resident_id,
        "credits": [
            {
                "id": item["id"],
                "title": item.get("title"),
                "amount": item.get("amount", 0),
                "financial_outcome": item.get("financialOutcome"),
                "created_at": _iso(item.get("createdAt")),
            }
            for item in credits
        ],
        "offers": [
            {
                "id": item["id"],
                "title": item.get("title"),
                "status": item.get("status"),
                "created_at": _iso(item.get("createdAt")),
            }
            for item in offers
        ],
        "bookings": services,
        "revenue_impact": {
            "credits_issued": sum(item.get("amount", 0) for item in credits),
            "service_revenue": sum(item.get("revenue_amount", 0) for item in services),
            "net_service_value": sum(item.get("revenue_amount", 0) for item in services)
            - sum(item.get("amount", 0) for item in credits),
        },
    }


async def get_tenants_list_read_model(db: AsyncIOMotorDatabase) -> dict:
    residents = await db.residents.find({}, {"_id": 0}).to_list(length=None)
    properties = await db.properties.find({}, {"_id": 0}).to_list(length=None)
    predictions = await db.churn_prediction_history.find({"isLatest": True}, {"_id": 0}).to_list(length=None)
    messages = await db.concierge_messages.find({}, {"_id": 0}).to_list(length=None)
    offers = await db.offers.find({}, {"_id": 0}).to_list(length=None)
    bookings = await db.bookings.find({}, {"_id": 0}).to_list(length=None)
    discount_impacts = await db.discount_impacts.find({}, {"_id": 0}).to_list(length=None)

    property_map = {item["id"]: item["name"] for item in properties}
    prediction_map = {item["residentId"]: item for item in predictions}
    
    # Create discount map to avoid N+1 query in loop
    discount_map = {}
    for item in discount_impacts:
        resident_id = item.get("residentId")
        if resident_id:
            if resident_id not in discount_map:
                discount_map[resident_id] = []
            discount_map[resident_id].append(item)

    residents_payload = []
    for resident in residents:
        resident_id = resident["id"]
        prediction = prediction_map.get(resident_id, {})
        residents_payload.append(
            {
                "resident_id": resident_id,
                "name": resident.get("fullName"),
                "property_name": property_map.get(resident.get("propertyId"), "Unknown Property"),
                "property_id": resident.get("propertyId"),
                "unit": resident.get("unit"),
                "current_score": prediction.get("score", resident.get("riskScore", 0)),
                "score_change": prediction.get("scoreChange", 0),
                "risk_tier": prediction.get("riskTier", resident.get("riskTier", "medium")),
                "primary_driver": prediction.get("drivers", [{}])[0].get("label", "Maintenance Frequency"),
                "last_contact_at": _iso(resident.get("lastInteractionAt")),
                "credits_issued": sum(item.get("amount", 0) for item in discount_map.get(resident_id, [])),
                "active_offers": sum(1 for offer in offers if offer.get("residentId") == resident_id),
                "service_bookings": sum(1 for booking in bookings if booking.get("residentId") == resident_id),
                "message_count": sum(1 for message in messages if message.get("residentId") == resident_id),
            }
        )

    residents_payload.sort(key=lambda item: item["current_score"], reverse=True)
    return {
        "summary": {
            "resident_count": len(residents_payload),
            "at_risk_residents": sum(1 for item in residents_payload if item["current_score"] >= 60),
            "average_churn_score": round(
                sum(item["current_score"] for item in residents_payload) / max(len(residents_payload), 1)
            ),
            "active_bookings": len(bookings),
        },
        "residents": residents_payload,
    }
