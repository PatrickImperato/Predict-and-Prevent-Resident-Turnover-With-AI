from __future__ import annotations

from typing import Any

from pydantic import BaseModel


class MetricCard(BaseModel):
    key: str
    label: str
    value: str
    detail: str | None = None


class SignalMetric(BaseModel):
    label: str
    value: str


class ChurnWeightItem(BaseModel):
    label: str
    weight: int
    description: str


class FlaggedResidentItem(BaseModel):
    resident_id: str
    name: str
    property_id: str
    property_name: str
    unit_number: str
    score: int
    score_change: int
    risk_tier: str
    primary_driver: str


class DashboardResponse(BaseModel):
    summary_cards: list[MetricCard]
    flagship_cards: list[MetricCard]
    flagged_residents: list[FlaggedResidentItem]
    portfolio_properties: list[dict[str, Any]]
    churn_weights: list[ChurnWeightItem]
    ai_concierge_highlights: list[str]
    reconciliation: dict[str, Any]


class PublicOverviewResponse(BaseModel):
    hero_stats: list[MetricCard]
    signals: list[SignalMetric]
    flagged_residents: list[FlaggedResidentItem]
    scoring_weights: list[ChurnWeightItem]
    flagship_metrics: list[MetricCard]
    portfolio_metrics: list[MetricCard]
    financial_metrics: list[MetricCard]
    properties: list[str]
    cookie_notice: dict[str, str]
