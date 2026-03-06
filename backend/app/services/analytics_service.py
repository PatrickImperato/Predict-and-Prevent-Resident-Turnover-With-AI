from __future__ import annotations

from fastapi import HTTPException, status
from motor.motor_asyncio import AsyncIOMotorDatabase


def _currency(value: float | int) -> str:
    return f"${value:,.0f}"


async def _latest_predictions(db: AsyncIOMotorDatabase, property_id: str | None = None) -> list[dict]:
    query = {"isLatest": True}
    if property_id:
        query["propertyId"] = property_id
    return await db.churn_prediction_history.find(query, {"_id": 0}).sort("score", -1).to_list(length=None)


async def _metrics_map(db: AsyncIOMotorDatabase) -> dict[str, dict]:
    metrics = await db.property_metrics.find({"isLatest": True}, {"_id": 0}).to_list(length=None)
    return {item["propertyId"]: item for item in metrics}


async def _economics_map(db: AsyncIOMotorDatabase) -> dict[str, dict]:
    economics = await db.property_economics.find({}, {"_id": 0}).to_list(length=None)
    return {item["propertyId"]: item for item in economics}


async def _current_revenue_map(db: AsyncIOMotorDatabase, property_id: str | None = None) -> dict[str, dict]:
    query = {"isCurrentMonth": True}
    if property_id:
        query["propertyId"] = property_id
    rows = await db.monthly_revenue.find(query, {"_id": 0}).to_list(length=None)
    return {item["propertyId"]: item for item in rows}


async def _revenue_history(db: AsyncIOMotorDatabase, property_id: str | None = None) -> list[dict]:
    query = {}
    if property_id:
        query["propertyId"] = property_id
    rows = await db.monthly_revenue.find(query, {"_id": 0}).to_list(length=None)
    buckets: dict[str, dict] = {}
    for row in rows:
        bucket = buckets.setdefault(
            row["month"],
            {"month": row["month"], "gross_revenue": 0, "credits_issued": 0, "net_revenue": 0},
        )
        bucket["gross_revenue"] += row.get("grossRevenue", 0)
        bucket["credits_issued"] += row.get("creditsIssued", 0)
        bucket["net_revenue"] += row.get("netRevenue", 0)
    return [buckets[key] for key in sorted(buckets.keys())]


async def _churn_history(db: AsyncIOMotorDatabase, property_id: str | None = None) -> list[dict]:
    query = {}
    if property_id:
        query["propertyId"] = property_id
    rows = await db.churn_score_history.find(query, {"_id": 0}).to_list(length=None)
    buckets: dict[str, list[int]] = {}
    for row in rows:
        key = row["asOfDate"].strftime("%Y-%m-%d")
        buckets.setdefault(key, []).append(row.get("score", 0))
    result = []
    for key in sorted(buckets.keys()):
        scores = buckets[key]
        result.append({"label": key, "average_score": round(sum(scores) / max(len(scores), 1))})
    return result[-8:]


async def _build_scope(db: AsyncIOMotorDatabase, property_id: str | None = None) -> dict:
    if property_id is None:
        return {"level": "portfolio", "property_id": None, "property_name": "Portfolio"}
    property_record = await db.properties.find_one({"id": property_id}, {"_id": 0})
    if not property_record:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Property not found")
    return {
        "level": "property",
        "property_id": property_id,
        "property_name": property_record.get("name"),
    }


async def _analytics_payload(db: AsyncIOMotorDatabase, property_id: str | None = None) -> dict:
    scope = await _build_scope(db, property_id)
    predictions = await _latest_predictions(db, property_id)
    metrics_map = await _metrics_map(db)
    economics_map = await _economics_map(db)
    revenue_map = await _current_revenue_map(db, property_id)
    revenue_history = await _revenue_history(db, property_id)
    churn_history = await _churn_history(db, property_id)

    interventions_query = {}
    if property_id:
        interventions_query["propertyId"] = property_id
    interventions = await db.interventions_log.find(interventions_query, {"_id": 0}).to_list(length=None)

    relevant_metrics = [
        value for key, value in metrics_map.items() if property_id is None or key == property_id
    ]
    relevant_economics = [
        value for key, value in economics_map.items() if property_id is None or key == property_id
    ]
    revenue_rows = list(revenue_map.values())

    average_churn_score = round(
        sum(item.get("score", 0) for item in predictions) / max(len(predictions), 1)
    )
    risk_distribution = [
        {"label": "High", "count": sum(1 for item in predictions if item.get("riskTier") == "high")},
        {"label": "Medium", "count": sum(1 for item in predictions if item.get("riskTier") == "medium")},
        {"label": "Low", "count": sum(1 for item in predictions if item.get("riskTier") == "low")},
    ]

    successful_interventions = sum(1 for item in interventions if item.get("successful", False))
    intervention_success_rate = round(
        (successful_interventions / max(len(interventions), 1)) * 100
    )

    turnover_avoided_count = sum(item.get("avoidedTurnoversPerYear", 0) for item in relevant_economics)
    turnover_avoided_value = sum(
        item.get("estimatedTurnoverCost", 0) * item.get("avoidedTurnoversPerYear", 0)
        for item in relevant_economics
    )
    projected_monthly_service_revenue = sum(
        item.get("monthlyServiceRevenueProjection", 0) for item in relevant_economics
    )
    projected_monthly_credits = sum(
        item.get("creditsInvestedPerMonth", 0) for item in relevant_economics
    )
    net_retention_roi = turnover_avoided_value + (projected_monthly_service_revenue * 12) - (projected_monthly_credits * 12)

    current_gross = sum(item.get("grossRevenue", 0) for item in revenue_rows)
    current_credits = sum(item.get("creditsIssued", 0) for item in revenue_rows)
    current_net = sum(item.get("netRevenue", 0) for item in revenue_rows)

    return {
        "scope": scope,
        "summary_cards": [
            {"key": "avg-churn-score", "label": "Average churn score", "value": str(average_churn_score), "detail": "Latest model output"},
            {"key": "intervention-success-rate", "label": "Intervention success rate", "value": f"{intervention_success_rate}%", "detail": f"{successful_interventions}/{len(interventions)} successful"},
            {"key": "current-service-revenue", "label": "Current service revenue", "value": _currency(current_gross), "detail": "Matches dashboard gross revenue"},
            {"key": "net-retention-roi", "label": "Net retention ROI", "value": _currency(net_retention_roi), "detail": "Modeled from turnover avoided + revenue - credits"},
        ],
        "risk_distribution": risk_distribution,
        "intervention_metrics": {
            "total_interventions": len(interventions),
            "successful_interventions": successful_interventions,
            "success_rate": intervention_success_rate,
        },
        "financial_model": {
            "turnover_avoided_count": turnover_avoided_count,
            "turnover_avoided_value": turnover_avoided_value,
            "projected_monthly_service_revenue": projected_monthly_service_revenue,
            "projected_monthly_credits": projected_monthly_credits,
            "net_retention_roi": net_retention_roi,
        },
        "revenue_history": revenue_history,
        "churn_history": churn_history,
        "reconciliation": {
            "dashboard_gross_revenue": current_gross,
            "dashboard_credits_issued": current_credits,
            "dashboard_net_revenue": current_net,
            "current_at_risk_residents": sum(item.get("atRiskResidents", 0) for item in relevant_metrics),
            "property_metric_roi": sum(item.get("retentionRoi", 0) for item in relevant_metrics),
        },
    }


async def get_portfolio_analytics_read_model(db: AsyncIOMotorDatabase) -> dict:
    return await _analytics_payload(db)


async def get_property_analytics_read_model(db: AsyncIOMotorDatabase, property_id: str) -> dict:
    return await _analytics_payload(db, property_id)
