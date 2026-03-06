from __future__ import annotations

from datetime import datetime

from fastapi import HTTPException, status
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.seeds.constants import CHURN_WEIGHTS, FLAGSHIP_PROPERTY_ID


def _iso(value):
    if value is None:
        return None
    if isinstance(value, str):
        return value
    return value.isoformat()


async def _properties_map(db: AsyncIOMotorDatabase):
    properties = await db.properties.find({}, {"_id": 0}).to_list(length=None)
    return {item["id"]: item for item in properties}


async def _property_list_items(db: AsyncIOMotorDatabase):
    properties = await db.properties.find({}, {"_id": 0}).to_list(length=None)
    metrics = await db.property_metrics.find({"isLatest": True}, {"_id": 0}).to_list(length=None)
    revenue_rows = await db.monthly_revenue.find({"isCurrentMonth": True}, {"_id": 0}).to_list(length=None)
    users = await db.users.find({"role": "manager"}, {"_id": 0}).to_list(length=None)

    metrics_map = {item["propertyId"]: item for item in metrics}
    revenue_map = {item["propertyId"]: item for item in revenue_rows}
    users_map = {item.get("defaultPropertyId"): item for item in users}

    items = []
    for property_item in properties:
        metrics_row = metrics_map.get(property_item["id"], {})
        revenue_row = revenue_map.get(property_item["id"], {})
        manager_row = users_map.get(property_item["id"], {})
        items.append(
            {
                "property_id": property_item["id"],
                "name": property_item["name"],
                "code": property_item["code"],
                "manager_name": manager_row.get("displayName", "Unassigned"),
                "total_units": property_item.get("unitCount", 0),
                "occupied_units": property_item.get("occupiedUnits", 0),
                "occupancy_rate": property_item.get("occupancyRate", 0),
                "at_risk_residents": metrics_row.get("atRiskResidents", 0),
                "avg_churn_score": metrics_row.get("avgChurnScore", 0),
                "gross_revenue": revenue_row.get("grossRevenue", 0),
                "credits_issued": revenue_row.get("creditsIssued", 0),
                "net_revenue": revenue_row.get("netRevenue", 0),
                "provider_coverage_percent": metrics_row.get("providerCoveragePercent", 0),
                "fulfillment_rate": metrics_row.get("fulfillmentRate", 0),
                "is_flagship": property_item["id"] == FLAGSHIP_PROPERTY_ID,
            }
        )

    items.sort(key=lambda item: (not item["is_flagship"], item["name"]))
    return items


async def get_properties_list_read_model(db: AsyncIOMotorDatabase) -> dict:
    items = await _property_list_items(db)
    return {
        "properties": items,
        "portfolio_totals": {
            "total_units": sum(item["total_units"] for item in items),
            "occupied_units": sum(item["occupied_units"] for item in items),
            "gross_revenue": sum(item["gross_revenue"] for item in items),
            "credits_issued": sum(item["credits_issued"] for item in items),
            "net_revenue": sum(item["net_revenue"] for item in items),
        },
    }


async def get_property_detail_read_model(db: AsyncIOMotorDatabase, property_id: str) -> dict:
    property_record = await db.properties.find_one({"id": property_id}, {"_id": 0})
    if not property_record:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Property not found",
        )

    manager = await db.users.find_one(
        {"role": "manager", "defaultPropertyId": property_id}, {"_id": 0}
    )
    latest_metrics = await db.property_metrics.find_one(
        {"propertyId": property_id, "isLatest": True}, {"_id": 0}
    )
    revenue_rows = await db.monthly_revenue.find(
        {"propertyId": property_id}, {"_id": 0}
    ).to_list(length=None)
    revenue_rows.sort(key=lambda row: row.get("month", ""))
    revenue_summary = next((row for row in revenue_rows if row.get("isCurrentMonth")), revenue_rows[-1] if revenue_rows else {})

    residents = await db.residents.find(
        {"propertyId": property_id}, {"_id": 0}
    ).to_list(length=None)
    residents_map = {resident["id"]: resident for resident in residents}

    predictions = await db.churn_prediction_history.find(
        {"propertyId": property_id, "isLatest": True}, {"_id": 0}
    ).sort("score", -1).to_list(length=None)

    flagged_residents = []
    for prediction in predictions[:3]:
        resident = residents_map.get(prediction["residentId"])
        if not resident:
            continue
        flagged_residents.append(
            {
                "resident_id": resident["id"],
                "name": resident["fullName"],
                "property_id": property_id,
                "property_name": property_record["name"],
                "unit_number": resident.get("unit", "—"),
                "score": prediction.get("score", resident.get("riskScore", 0)),
                "score_change": prediction.get("scoreChange", 0),
                "risk_tier": prediction.get("riskTier", resident.get("riskTier", "medium")),
                "primary_driver": prediction.get("drivers", [{}])[0].get("label", "Maintenance Frequency"),
            }
        )

    alex = next(
        (resident for resident in residents if resident.get("fullName") == "Alex Chen"),
        None,
    )
    alex_prediction = (
        await db.churn_prediction_history.find_one(
            {"residentId": alex["id"], "isLatest": True}, {"_id": 0}
        )
        if alex
        else None
    )
    alex_history = (
        await db.churn_score_history.find({"residentId": alex["id"]}, {"_id": 0})
        .sort("asOfDate", 1)
        .to_list(length=None)
        if alex
        else []
    )
    maintenance_history = (
        await db.maintenance_history.find({"residentId": alex["id"]}, {"_id": 0})
        .sort("openedAt", -1)
        .to_list(length=None)
        if alex
        else []
    )
    communications = (
        await db.concierge_messages.find({"residentId": alex["id"]}, {"_id": 0})
        .sort("createdAt", -1)
        .to_list(length=None)
        if alex
        else []
    )
    interventions = (
        await db.interventions_log.find({"residentId": alex["id"]}, {"_id": 0})
        .sort("happenedAt", -1)
        .to_list(length=None)
        if alex
        else []
    )
    credits = (
        await db.discount_impacts.find({"residentId": alex["id"]}, {"_id": 0})
        .sort("createdAt", -1)
        .to_list(length=None)
        if alex
        else []
    )
    offers = (
        await db.offers.find({"residentId": alex["id"]}, {"_id": 0})
        .sort("createdAt", -1)
        .to_list(length=None)
        if alex
        else []
    )
    bookings = (
        await db.bookings.find({"residentId": alex["id"]}, {"_id": 0})
        .sort("scheduledFor", -1)
        .to_list(length=None)
        if alex
        else []
    )
    receipts = await db.receipts.find({"propertyId": property_id}, {"_id": 0}).to_list(length=None)
    receipt_map = {receipt.get("bookingId"): receipt for receipt in receipts}
    providers = await db.providers.find(
        {"coverageProperties": property_id}, {"_id": 0}
    ).to_list(length=None)
    units = await db.units.find({"propertyId": property_id}, {"_id": 0}).to_list(length=None)
    units.sort(key=lambda unit: int(unit.get("number", "0")))
    economics = await db.property_economics.find_one({"propertyId": property_id}, {"_id": 0})

    summary_cards = [
        {
            "key": "manager",
            "label": "Property manager",
            "value": manager.get("displayName", "Unassigned") if manager else "Unassigned",
            "detail": manager.get("email") if manager else None,
        },
        {
            "key": "occupancy",
            "label": "Occupancy",
            "value": f"{property_record.get('occupiedUnits', 0)}/{property_record.get('unitCount', 0)}",
            "detail": f"{property_record.get('occupancyRate', 0):.1f}% occupied",
        },
        {
            "key": "gross-revenue",
            "label": "Current gross revenue",
            "value": f"${revenue_summary.get('grossRevenue', 0):,.0f}",
            "detail": f"Credits ${revenue_summary.get('creditsIssued', 0):,.0f}",
        },
        {
            "key": "at-risk",
            "label": "At-risk residents",
            "value": str(latest_metrics.get("atRiskResidents", 0) if latest_metrics else 0),
            "detail": f"Avg. churn score {latest_metrics.get('avgChurnScore', 0) if latest_metrics else 0}",
        },
    ]

    weighted_drivers = []
    if alex_prediction:
        for driver in alex_prediction.get("drivers", []):
            weighted_drivers.append(
                {
                    "label": driver.get("label"),
                    "weight": driver.get("weight"),
                    "impact_score": driver.get("impactScore"),
                    "signal_value": driver.get("signalValue"),
                    "narrative": driver.get("narrative"),
                }
            )

    booking_provider_map = {provider["id"]: provider["name"] for provider in providers}

    return {
        "property": {
            "id": property_record["id"],
            "name": property_record["name"],
            "code": property_record.get("code"),
            "manager_name": manager.get("displayName") if manager else None,
            "manager_email": manager.get("email") if manager else None,
            "total_units": property_record.get("unitCount", 0),
            "occupied_units": property_record.get("occupiedUnits", 0),
            "occupancy_rate": property_record.get("occupancyRate", 0),
            "address": property_record.get("address"),
            "is_flagship": property_id == FLAGSHIP_PROPERTY_ID,
            "overview": property_record.get("overview"),
        },
        "summary_cards": summary_cards,
        "churn_weights": CHURN_WEIGHTS,
        "flagged_residents": flagged_residents,
        "units": [
            {
                "id": unit["id"],
                "number": unit["number"],
                "status": unit["status"],
                "occupant_label": unit.get("occupantLabel"),
                "resident_id": unit.get("assignedResidentId"),
                "bedrooms": unit.get("bedrooms", 1),
                "bathrooms": unit.get("bathrooms", 1),
                "square_feet": unit.get("squareFeet", 600),
            }
            for unit in units
        ],
        "resident_profile": {
            "resident_id": alex["id"] if alex else None,
            "name": alex.get("fullName") if alex else None,
            "unit": alex.get("unit") if alex else None,
            "email": alex.get("email") if alex else None,
            "phone": alex.get("phone") if alex else None,
            "churn_score": alex_prediction.get("score") if alex_prediction else None,
            "score_change": alex_prediction.get("scoreChange") if alex_prediction else None,
            "risk_tier": alex_prediction.get("riskTier") if alex_prediction else None,
            "driver_summary": alex_prediction.get("driverSummary") if alex_prediction else None,
            "score_explanation": alex_prediction.get("scoreExplanation") if alex_prediction else None,
            "signal_summary": alex_prediction.get("signalSummary") if alex_prediction else None,
            "score_history": [
                {"as_of_date": _iso(item.get("asOfDate")), "score": item.get("score")} for item in alex_history
            ],
        },
        "weighted_drivers": weighted_drivers,
        "maintenance_history": [
            {
                "id": item["id"],
                "title": item.get("issueTitle", item.get("issueType", "Maintenance issue")),
                "detail": item.get("resolutionSummary", item.get("description", "")),
                "status": item.get("status", "closed"),
                "happened_at": _iso(item.get("openedAt")),
            }
            for item in maintenance_history
        ],
        "communications": [
            {
                "id": item["id"],
                "title": item.get("channelLabel", "AI concierge"),
                "detail": item.get("body", ""),
                "status": item.get("direction", "outbound"),
                "happened_at": _iso(item.get("createdAt")),
            }
            for item in communications
        ],
        "interventions": [
            {
                "id": item["id"],
                "title": item.get("title", item.get("interventionType", "Intervention")),
                "detail": item.get("detail", ""),
                "status": item.get("status", "completed"),
                "happened_at": _iso(item.get("happenedAt")),
            }
            for item in interventions
        ],
        "credits": [
            {
                "id": item["id"],
                "title": item.get("title", "Retention credit"),
                "amount": item.get("amount", 0),
                "outcome": item.get("financialOutcome", "Resident friction reduced"),
                "created_at": _iso(item.get("createdAt")),
            }
            for item in credits
        ],
        "offers": offers,
        "bookings": [
            {
                "id": item["id"],
                "service_name": item.get("serviceName", "Service booking"),
                "status": item.get("status", "scheduled"),
                "scheduled_for": _iso(item.get("scheduledFor")),
                "provider_name": booking_provider_map.get(item.get("providerId"), "Assigned vendor"),
                "revenue_amount": receipt_map.get(item.get("id"), {}).get("amount", 0),
            }
            for item in bookings
        ],
        "providers": [
            {
                "id": item["id"],
                "name": item["name"],
                "service_categories": item.get("serviceCategories", []),
                "fulfillment_rate": item.get("fulfillmentRate", 0),
                "coverage_percent": item.get("coveragePercent", 0),
            }
            for item in providers
        ],
        "revenue_summary": {
            "gross_revenue": revenue_summary.get("grossRevenue", 0),
            "credits_issued": revenue_summary.get("creditsIssued", 0),
            "net_revenue": revenue_summary.get("netRevenue", 0),
            "bookings_completed": revenue_summary.get("bookingsCompleted", 0),
            "estimated_annual_roi": economics.get("estimatedAnnualRoi", 0) if economics else 0,
            "credits_invested_per_month": economics.get("creditsInvestedPerMonth", 0) if economics else 0,
        },
        "monthly_revenue_history": [
            {
                "month": row.get("month"),
                "gross_revenue": row.get("grossRevenue", 0),
                "credits_issued": row.get("creditsIssued", 0),
                "net_revenue": row.get("netRevenue", 0),
            }
            for row in revenue_rows
        ],
        "property_metrics": latest_metrics or {},
        "related_properties": await _property_list_items(db),
    }
