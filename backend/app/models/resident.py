from typing import Any

from pydantic import BaseModel


class ResidentProfileResponse(BaseModel):
    resident: dict[str, Any]
    property: dict[str, Any]
    unit: dict[str, Any] | None = None
    current_prediction: dict[str, Any]
    score_history: list[dict[str, Any]]
    primary_drivers: list[dict[str, Any]]
    churn_weights: list[dict[str, Any]]


class ResidentTimelineResponse(BaseModel):
    resident_id: str
    timeline: list[dict[str, Any]]
    lifecycle_summary: dict[str, Any]


class ResidentServicesResponse(BaseModel):
    resident_id: str
    credits: list[dict[str, Any]]
    offers: list[dict[str, Any]]
    bookings: list[dict[str, Any]]
    revenue_impact: dict[str, Any]


class TenantsListResponse(BaseModel):
    summary: dict[str, Any]
    residents: list[dict[str, Any]]
