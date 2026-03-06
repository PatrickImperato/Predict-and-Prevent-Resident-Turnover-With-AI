from typing import Any

from pydantic import BaseModel


class ProvidersListResponse(BaseModel):
    summary: dict[str, Any]
    providers: list[dict[str, Any]]


class ProviderDetailResponse(BaseModel):
    provider: dict[str, Any]
    booking_history: list[dict[str, Any]]
    linked_properties: list[dict[str, Any]]
    resident_examples: list[dict[str, Any]]
    revenue_breakdown: dict[str, Any]
