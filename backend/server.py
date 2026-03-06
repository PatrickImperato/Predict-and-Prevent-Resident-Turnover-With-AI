from fastapi import APIRouter, FastAPI
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import logging
from pathlib import Path

from app.core.config import load_config
from app.core.database import init_database
from app.routers.auth import router as auth_router
from app.routers.diagnostics import router as diagnostics_router
from app.routers.seed_admin import router as seed_admin_router
from app.services.auth_service import ensure_foundation_users


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

config = load_config()
db_manager = init_database(config)

# Create the main app without a prefix
app = FastAPI(title="HappyCo Concierge V1", version=config.app_version)

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


@api_router.get("/")
async def root():
    return {
        "message": "HappyCo Concierge V1 foundation is running",
        "app_env": config.app_env,
        "db_name": config.db_name,
        "scope": "phase-4-foundation",
    }


api_router.include_router(auth_router, prefix="/auth", tags=["auth"])
api_router.include_router(diagnostics_router, prefix="/diagnostics", tags=["diagnostics"])
api_router.include_router(seed_admin_router, prefix="/admin/seeds", tags=["admin-seeds"])

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=config.cors_origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)


@app.on_event("startup")
async def startup_db_client():
    await db_manager.connect()
    await db_manager.ensure_indexes()
    await ensure_foundation_users(db_manager.database, config)
    logger.info(
        "HappyCo Concierge V1 foundation ready | env=%s db=%s",
        config.app_env,
        config.db_name,
    )


@app.on_event("shutdown")
async def shutdown_db_client():
    db_manager.close()
