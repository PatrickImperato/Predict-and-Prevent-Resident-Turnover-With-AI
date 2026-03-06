from __future__ import annotations

from datetime import datetime, timezone
from typing import Any
import uuid

from motor.motor_asyncio import AsyncIOMotorDatabase


async def write_audit_event(
    db: AsyncIOMotorDatabase,
    *,
    action: str,
    status: str,
    actor_user_id: str | None = None,
    actor_email: str | None = None,
    meta: dict[str, Any] | None = None,
) -> None:
    await db.audit_events.insert_one(
        {
            "id": str(uuid.uuid4()),
            "action": action,
            "status": status,
            "actorUserId": actor_user_id,
            "actorEmail": actor_email,
            "meta": meta or {},
            "createdAt": datetime.now(timezone.utc),
        }
    )
