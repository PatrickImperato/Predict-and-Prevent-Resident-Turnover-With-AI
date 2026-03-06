from __future__ import annotations

from datetime import datetime

from motor.motor_asyncio import AsyncIOMotorDatabase

from app.seeds.constants import CHURN_WEIGHTS, FLAGSHIP_PROPERTY_ID


def _currency(value: float | int) -> str:
    return f"${value:,.0f}"


def _percent(value: float | int) -> str:
    return f"{value:.0f}%" if isinstance(value, float) else f"{value}%"


def _month_key() -> str:
    return datetime.utcnow().strftime("%Y-%m")


async def _load_maps(db: AsyncIOMotorDatabase):
    properties = await db.properties.find({}, {"_id": 0}).to_list(length=None)
    properties_map = {item["id"]: item for item in properties}

    metrics = await db.property_metrics.find({"isLatest": True}, {"_id": 0}).to_list(length=None)
    metrics_map = {item["propertyId"]: item for item in metrics}

    current_month = _month_key()
    revenue_rows = await db.monthly_revenue.find({"month": current_month}, {"_id": 0}).to_list(length=None)
    revenue_map = {item["propertyId"]: item for item in revenue_rows}

    return properties, properties_map, metrics_map, revenue_map, current_month


async def _latest_predictions(db: AsyncIOMotorDatabase):
    return await db.churn_prediction_history.find({"isLatest": True}, {"_id": 0}).sort("score", -1).to_list(length=None)


async def _flagged_residents(db: AsyncIOMotorDatabase, limit: int = 3):
    residents = await db.residents.find({}, {"_id": 0}).to_list(length=None)
    residents_map = {item["id"]: item for item in residents}
    properties = await db.properties.find({}, {"_id": 0}).to_list(length=None)
    properties_map = {item["id"]: item for item in properties}

    predictions = await _latest_predictions(db)
    items = []
    for prediction in predictions[:limit]:
        resident = residents_map.get(prediction["residentId"])
        if not resident:
            continue
        property_record = properties_map.get(resident["propertyId"], {})
        primary_driver = prediction.get("drivers", [{}])[0].get("label", "Maintenance Frequency")
        items.append(
            {
                "resident_id": resident["id"],
                "name": resident["fullName"],
                "property_id": resident["propertyId"],
                "property_name": property_record.get("name", "Unknown Property"),
                "unit_number": resident.get("unit", "—"),
                "score": prediction.get("score", resident.get("riskScore", 0)),
                "score_change": prediction.get("scoreChange", 0),
                "risk_tier": prediction.get("riskTier", resident.get("riskTier", "medium")),
                "primary_driver": primary_driver,
            }
        )
    return items


async def get_dashboard_read_model(db: AsyncIOMotorDatabase) -> dict:
    properties, properties_map, metrics_map, revenue_map, current_month = await _load_maps(db)
    flagged = await _flagged_residents(db)
    predictions = await _latest_predictions(db)

    total_units = sum(property_item.get("unitCount", 0) for property_item in properties)
    occupied_units = sum(property_item.get("occupiedUnits", 0) for property_item in properties)
    portfolio_gross = sum(item.get("grossRevenue", 0) for item in revenue_map.values())
    portfolio_credits = sum(item.get("creditsIssued", 0) for item in revenue_map.values())
    portfolio_net = sum(item.get("netRevenue", 0) for item in revenue_map.values())
    at_risk = sum(item.get("atRiskResidents", 0) for item in metrics_map.values())
    retention_roi = sum(item.get("retentionRoi", 0) for item in metrics_map.values())
    average_churn = round(sum(item.get("score", 0) for item in predictions) / max(len(predictions), 1))

    flagship_property = properties_map[FLAGSHIP_PROPERTY_ID]
    flagship_metrics = metrics_map[FLAGSHIP_PROPERTY_ID]
    flagship_revenue = revenue_map[FLAGSHIP_PROPERTY_ID]

    summary_cards = [
        {"key": "portfolio-units", "label": "Portfolio units", "value": f"{total_units}", "detail": f"{occupied_units} occupied across {len(properties)} properties"},
        {"key": "at-risk-residents", "label": "At-risk residents", "value": f"{at_risk}", "detail": "Latest flagged residents from churn signals"},
        {"key": "gross-revenue", "label": "Current gross revenue", "value": _currency(portfolio_gross), "detail": f"{_currency(portfolio_credits)} credits tracked separately"},
        {"key": "retention-roi", "label": "Portfolio retention ROI", "value": _currency(retention_roi), "detail": f"Average churn score {average_churn}"},
    ]

    flagship_cards = [
        {"key": "flagship-units", "label": "Flagship units", "value": f"{flagship_property['unitCount']}", "detail": f"{flagship_property['occupiedUnits']} occupied"},
        {"key": "flagship-at-risk", "label": "At risk", "value": f"{flagship_metrics['atRiskResidents']}", "detail": "The Metropolitan at Riverside"},
        {"key": "flagship-provider-coverage", "label": "Provider coverage", "value": _percent(flagship_metrics['providerCoveragePercent']), "detail": "Service categories covered"},
        {"key": "flagship-revenue", "label": "Property revenue", "value": _currency(flagship_revenue['grossRevenue']), "detail": f"Net {_currency(flagship_revenue['netRevenue'])}"},
    ]

    portfolio_properties = []
    for property_item in properties:
        metrics = metrics_map.get(property_item["id"], {})
        revenue = revenue_map.get(property_item["id"], {})
        portfolio_properties.append(
            {
                "property_id": property_item["id"],
                "name": property_item["name"],
                "occupancy_rate": property_item.get("occupancyRate", 0),
                "at_risk_residents": metrics.get("atRiskResidents", 0),
                "avg_churn_score": metrics.get("avgChurnScore", 0),
                "gross_revenue": revenue.get("grossRevenue", 0),
                "credits_issued": revenue.get("creditsIssued", 0),
                "provider_coverage_percent": metrics.get("providerCoveragePercent", 0),
                "fulfillment_rate": metrics.get("fulfillmentRate", 0),
                "is_flagship": property_item["id"] == FLAGSHIP_PROPERTY_ID,
            }
        )

    ai_concierge_highlights = [
        "AI outreach uses informal, human support language to resolve friction before move-out intent hardens.",
        "Maintenance volume, slower resolution, sentiment shifts, and lower engagement are surfaced as leading churn indicators.",
        "Credits, offers, bookings, and revenue are linked so retention outcomes reconcile in one system.",
    ]

    return {
        "summary_cards": summary_cards,
        "flagship_cards": flagship_cards,
        "flagged_residents": flagged,
        "portfolio_properties": portfolio_properties,
        "churn_weights": CHURN_WEIGHTS,
        "ai_concierge_highlights": ai_concierge_highlights,
        "reconciliation": {
            "month": current_month,
            "gross_revenue": portfolio_gross,
            "credits_issued": portfolio_credits,
            "net_revenue": portfolio_net,
            "at_risk_residents": at_risk,
        },
    }


async def get_public_overview_read_model(db: AsyncIOMotorDatabase) -> dict:
    dashboard = await get_dashboard_read_model(db)
    properties, properties_map, metrics_map, revenue_map, _ = await _load_maps(db)
    flagship_metrics = metrics_map[FLAGSHIP_PROPERTY_ID]
    flagship_revenue = revenue_map[FLAGSHIP_PROPERTY_ID]
    flagship_economics = await db.property_economics.find_one({"propertyId": FLAGSHIP_PROPERTY_ID}, {"_id": 0})
    alex_prediction = await db.churn_prediction_history.find_one({"residentName": "Alex Chen", "isLatest": True}, {"_id": 0})

    return {
        "hero_stats": [
            {"key": "avg-turnover-cost", "label": "Avg. turnover cost", "value": _currency(flagship_economics.get("estimatedTurnoverCost", 3800)), "detail": "Per prevented move-out"},
            {"key": "annual-turnover-rate", "label": "Annual turnover rate", "value": "10–15%", "detail": "Portfolio range"},
            {"key": "portfolio-roi-example", "label": "Portfolio ROI example", "value": _currency(sum(item.get("retentionRoi", 0) for item in metrics_map.values())), "detail": "Portfolio retention ROI"},
        ],
        "signals": [
            {"label": "Maintenance requests", "value": str(alex_prediction.get("signalSummary", {}).get("maintenanceCount", 0))},
            {"label": "Sentiment score", "value": str(alex_prediction.get("signalSummary", {}).get("negativeSentimentScore", "-2.4"))},
            {"label": "Avg. response time", "value": alex_prediction.get("signalSummary", {}).get("avgResolutionTimeLabel", "4.2 days")},
        ],
        "flagged_residents": dashboard["flagged_residents"],
        "scoring_weights": CHURN_WEIGHTS,
        "flagship_metrics": [
            {"key": "total-units", "label": "Total units", "value": str(properties_map[FLAGSHIP_PROPERTY_ID].get("unitCount", 0)), "detail": None},
            {"key": "at-risk", "label": "At risk", "value": str(flagship_metrics.get("atRiskResidents", 0)), "detail": None},
            {"key": "avg-score", "label": "Avg. score", "value": str(flagship_metrics.get("avgChurnScore", 0)), "detail": None},
        ],
        "portfolio_metrics": [
            {"key": "property-revenue", "label": "Property Revenue", "value": _currency(flagship_revenue.get("grossRevenue", 0)), "detail": "The Metropolitan at Riverside"},
            {"key": "provider-coverage", "label": "Provider Coverage", "value": _percent(flagship_metrics.get("providerCoveragePercent", 0)), "detail": "Service categories covered"},
            {"key": "fulfillment-rate", "label": "Fulfillment Rate", "value": _percent(flagship_metrics.get("fulfillmentRate", 0)), "detail": "Bookings completed"},
            {"key": "retention-roi", "label": "Retention ROI", "value": _currency(sum(item.get("retentionRoi", 0) for item in metrics_map.values())), "detail": "Portfolio total"},
        ],
        "financial_metrics": [
            {"key": "estimated-annual-roi", "label": "Estimated Annual ROI", "value": _currency(flagship_economics.get("estimatedAnnualRoi", 37000)), "detail": None},
            {"key": "credits-invested", "label": "Credits invested per month", "value": _currency(flagship_economics.get("creditsInvestedPerMonth", 500)), "detail": None},
            {"key": "avoided-turnovers", "label": "Avoided turnovers per year", "value": str(flagship_economics.get("avoidedTurnoversPerYear", 5)), "detail": None},
            {"key": "monthly-service-revenue", "label": "Monthly service revenue", "value": _currency(flagship_economics.get("monthlyServiceRevenueProjection", 2000)), "detail": None},
        ],
        "properties": [property_item["name"] for property_item in properties],
        "cookie_notice": {
            "title": "Privacy & Activity Logging",
            "body": "We log IP addresses and activity for security and reliability purposes.",
            "linkLabel": "Learn more",
            "linkHref": "/legal#privacy-notice",
        },
    }
