from typing import Any

from pydantic import BaseModel


class AnalyticsResponse(BaseModel):
    scope: dict[str, Any]
    summary_cards: list[dict[str, Any]]
    risk_distribution: list[dict[str, Any]]
    intervention_metrics: dict[str, Any]
    financial_model: dict[str, Any]
    revenue_history: list[dict[str, Any]]
    churn_history: list[dict[str, Any]]
    reconciliation: dict[str, Any]
