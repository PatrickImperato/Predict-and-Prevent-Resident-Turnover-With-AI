"""Resident bookings router with full persistence and credit tracking."""
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
    serviceCategory: str = "General"
    providerId: Optional[str] = None
    providerName: Optional[str] = None
    originalPrice: int
    discountApplied: int
    finalPrice: int
    bookingDate: str
    duration: str = "N/A"
    notes: Optional[str] = None
    creditOfferId: Optional[str] = None


class BookingResponse(BaseModel):
    success: bool
    bookingId: str
    message: str
    booking: dict
    updatedCredit: Optional[dict] = None


@router.post("", response_model=BookingResponse)
async def create_booking(
    request: CreateBookingRequest,
    http_request: Request,
    current_user: dict = Depends(require_authenticated_user),
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Create a new service booking with credit applied and reduce resident's available credit."""
    
    # Get resident info
    resident_id = current_user.get("id")
    resident_email = current_user.get("email")
    resident_name = current_user.get("displayName", "Unknown")
    
    # Get resident document with full details (look up by userId)
    resident_doc = await db.residents.find_one({"userId": resident_id})
    if not resident_doc:
        raise HTTPException(status_code=404, detail="Resident not found")
    
    property_id = resident_doc.get("propertyId")
    unit_number = resident_doc.get("unit", "N/A")
    
    # Get property details
    property_doc = await db.properties.find_one({"id": property_id}) if property_id else None
    property_name = property_doc.get("name", "Unknown Property") if property_doc else "Unknown Property"
    
    # Get current retention credit balance
    current_credit = resident_doc.get("retentionCredit", {})
    available_credit = current_credit.get("amount", 0)
    
    # Validate credit availability
    if request.discountApplied > available_credit:
        raise HTTPException(
            status_code=400, 
            detail=f"Insufficient credit. Available: ${available_credit}, Requested: ${request.discountApplied}"
        )
    
    # Create booking ID and credit offer ID if not provided
    booking_id = str(uuid.uuid4())
    credit_offer_id = request.creditOfferId or current_credit.get("offerId", str(uuid.uuid4()))
    now = datetime.now(timezone.utc)
    
    # Create comprehensive booking record with all required fields
    booking = {
        "id": booking_id,
        "bookingId": booking_id,  # Duplicate for compatibility
        "residentId": resident_id,
        "residentName": resident_name,
        "userEmail": resident_email,
        "propertyId": property_id,
        "propertyName": property_name,
        "unitNumber": unit_number,
        "serviceId": request.serviceId,
        "serviceName": request.serviceName,
        "serviceCategory": request.serviceCategory,
        "providerId": request.providerId or "default-provider",
        "providerName": request.providerName or "HappyCo Services",
        "originalPrice": request.originalPrice,
        "discountApplied": request.discountApplied,
        "finalPrice": request.finalPrice,
        "creditSource": "retention_credit",
        "creditOfferId": credit_offer_id,
        "bookingDate": request.bookingDate,
        "createdAt": now,
        "updatedAt": now,
        "status": "scheduled",
        "notes": request.notes,
        "channel": "resident_portal",
        "role": "resident",
        "duration": request.duration
    }
    
    # Persist booking to database
    await db.bookings.insert_one(booking)
    
    # Update resident's credit balance (using resident document's id)
    new_credit_amount = available_credit - request.discountApplied
    resident_record_id = resident_doc.get("id")
    
    await db.residents.update_one(
        {"id": resident_record_id},
        {
            "$set": {
                "retentionCredit.amount": new_credit_amount,
                "retentionCredit.usedAmount": current_credit.get("usedAmount", 0) + request.discountApplied,
                "retentionCredit.lastUsedAt": now,
                "updatedAt": now
            }
        }
    )
    
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
            "originalPrice": request.originalPrice,
            "finalPrice": request.finalPrice,
            "discountApplied": request.discountApplied,
            "remainingCredit": new_credit_amount
        }
    )
    
    # Remove _id for JSON serialization
    booking.pop("_id", None)
    
    updated_credit_info = {
        "amount": new_credit_amount,
        "usedAmount": current_credit.get("usedAmount", 0) + request.discountApplied,
        "reason": current_credit.get("reason", "Retention reward"),
        "expiresAt": current_credit.get("expiresAt")
    }
    
    return BookingResponse(
        success=True,
        bookingId=booking_id,
        message=f"{request.serviceName} booked successfully for {request.bookingDate}",
        booking=booking,
        updatedCredit=updated_credit_info
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
