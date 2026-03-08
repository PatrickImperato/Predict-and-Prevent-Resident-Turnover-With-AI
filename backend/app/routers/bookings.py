"""Resident bookings router with full persistence."""
from fastapi import APIRouter, Depends, HTTPException, Request
from motor.motor_asyncio import AsyncIOMotorDatabase
from datetime import datetime, timezone
from pydantic import BaseModel, Field
from typing import Optional
import uuid

from app.core.database import get_database
from app.middleware.auth_dependencies import require_authenticated_user
from app.services.event_logger import log_event, EventType


router = APIRouter(prefix="/resident/bookings")


class CreateBookingRequest(BaseModel):
    serviceId: str
    serviceName: str
    originalPrice: int
    discountApplied: int
    finalPrice: int
    bookingDate: str
    duration: str = "N/A"
    category: str = "General"


class BookingResponse(BaseModel):
    success: bool
    bookingId: str
    message: str
    booking: dict


@router.post("", response_model=BookingResponse)
async def create_booking(
    request: CreateBookingRequest,
    http_request: Request,
    current_user: dict = Depends(require_authenticated_user),
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Create a new service booking with credit applied."""
    
    # Get resident info
    resident_id = current_user.get("id")
    resident_email = current_user.get("email")
    resident_name = current_user.get("displayName", "Unknown")
    
    # Get resident property (assuming single property for demo)
    resident_doc = await db.residents.find_one({"id": resident_id})
    property_id = resident_doc.get("propertyId") if resident_doc else None
    property_doc = await db.properties.find_one({"id": property_id}) if property_id else None
    property_name = property_doc.get("name", "Unknown Property") if property_doc else "Unknown Property"
    
    # Create booking ID
    booking_id = str(uuid.uuid4())
    now = datetime.now(timezone.utc)
    
    # Create booking record
    booking = {
        "id": booking_id,
        "residentId": resident_id,
        "residentName": resident_name,
        "residentEmail": resident_email,
        "propertyId": property_id,
        "propertyName": property_name,
        "serviceId": request.serviceId,
        "serviceName": request.serviceName,
        "originalPrice": request.originalPrice,
        "discountApplied": request.discountApplied,
        "finalPrice": request.finalPrice,
        "bookingDate": request.bookingDate,
        "duration": request.duration,
        "category": request.category,
        "status": "confirmed",
        "source": "retention_credit",
        "createdAt": now,
        "updatedAt": now
    }
    
    # Persist to database
    await db.bookings.insert_one(booking)
    
    # Log event
    await log_event(
        db,
        EventType.SERVICE_BOOKED,
        user_id=resident_id,
        user_email=resident_email,
        user_role=current_user.get("role"),
        resource_type="booking",
        resource_id=booking_id,
        ip_address=http_request.client.host if http_request.client else None,
        user_agent=http_request.headers.get("user-agent"),
        details={
            "serviceName": request.serviceName,
            "finalPrice": request.finalPrice,
            "discountApplied": request.discountApplied
        }
    )
    
    # Remove _id for JSON serialization
    booking.pop("_id", None)
    
    return BookingResponse(
        success=True,
        bookingId=booking_id,
        message=f"{request.serviceName} booked successfully for {request.bookingDate}",
        booking=booking
    )


@router.get("")
async def get_resident_bookings(
    current_user: dict = Depends(require_authenticated_user),
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Get all bookings for the current resident."""
    resident_id = current_user.get("id")
    
    bookings = await db.bookings.find(
        {"residentId": resident_id},
        {"_id": 0}
    ).sort("createdAt", -1).to_list(100)
    
    return {
        "bookings": bookings,
        "total": len(bookings)
    }


@router.get("/all")
async def get_all_bookings(
    propertyId: Optional[str] = None,
    current_user: dict = Depends(require_authenticated_user),
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Get all bookings (for managers/admin)."""
    query = {}
    if propertyId:
        query["propertyId"] = propertyId
    
    bookings = await db.bookings.find(
        query,
        {"_id": 0}
    ).sort("createdAt", -1).to_list(200)
    
    return {
        "bookings": bookings,
        "total": len(bookings)
    }
