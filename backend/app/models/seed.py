from datetime import datetime

from pydantic import BaseModel


class PreviewResetRequest(BaseModel):
    confirmation_phrase: str


class PreviewResetResponse(BaseModel):
    action: str
    message: str
    implemented: bool
    allowed: bool
    seed_status: str
    last_seed_dataset_id: str
    last_seed_at: datetime
    db_name: str
