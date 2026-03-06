from __future__ import annotations

from typing import Any

from pydantic import BaseModel

from app.models.dashboard import ChurnWeightItem, FlaggedResidentItem, MetricCard


class PropertyListItem(BaseModel):
    property_id: str
    name: str
    code: str
    manager_name: str
    total_units: int
    occupied_units: int
    occupancy_rate: float
    at_risk_residents: int
    avg_churn_score: int
    gross_revenue: float
    credits_issued: float
    net_revenue: float
    provider_coverage_percent: int
    fulfillment_rate: int
    is_flagship: bool


class PropertiesListResponse(BaseModel):
    properties: list[PropertyListItem]
    portfolio_totals: dict[str, Any]


class WeightedDriverItem(BaseModel):
    label: str
    weight: int
    impact_score: int
    signal_value: str
    narrative: str


class TimelineItem(BaseModel):
    id: str
    title: str
    detail: str
    status: str
    happened_at: str


class UnitItem(BaseModel):
    id: str
    number: str
    status: str
    occupant_label: str | None = None
    resident_id: str | None = None
    bedrooms: int
    bathrooms: int
    square_feet: int


class FinancialImpactItem(BaseModel):
    id: str
    title: str
    amount: float
    outcome: str
    created_at: str


class BookingItem(BaseModel):
    id: str
    service_name: str
    status: str
    scheduled_for: str
    provider_name: str
    revenue_amount: float


class ProviderItem(BaseModel):
    id: str
    name: str
    service_categories: list[str]
    fulfillment_rate: int
    coverage_percent: int


class PropertyDetailResponse(BaseModel):
    property: dict[str, Any]
    summary_cards: list[MetricCard]
    churn_weights: list[ChurnWeightItem]
    flagged_residents: list[FlaggedResidentItem]
    units: list[UnitItem]
    resident_profile: dict[str, Any]
    weighted_drivers: list[WeightedDriverItem]
    maintenance_history: list[TimelineItem]
    communications: list[TimelineItem]
    interventions: list[TimelineItem]
    credits: list[FinancialImpactItem]
    offers: list[dict[str, Any]]
    bookings: list[BookingItem]
    providers: list[ProviderItem]
    revenue_summary: dict[str, Any]
    monthly_revenue_history: list[dict[str, Any]]
    property_metrics: dict[str, Any]
    related_properties: list[PropertyListItem]
