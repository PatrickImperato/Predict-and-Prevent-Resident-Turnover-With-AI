from fastapi import APIRouter, FastAPI
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import logging
from pathlib import Path

from app.core.config import load_config
from app.core.database import init_database
from app.routers.auth import router as auth_router
from app.routers.dashboard import router as dashboard_router
from app.routers.diagnostics import router as diagnostics_router
from app.routers.properties import router as properties_router
from app.routers.public import router as public_router
from app.routers.seed_admin import router as seed_admin_router
from app.services.seed_service import ensure_seed_state


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

config = load_config()
db_manager = init_database(config)

app = FastAPI(title="HappyCo Concierge V1", version=config.app_version)
api_router = APIRouter(prefix="/api")


@api_router.get("/")
async def root():
    return {
        "message": "HappyCo Concierge V1 API is running",
        "app_env": config.app_env,
        "db_name": config.db_name,
        "scope": "phase-7-dashboard-properties",
    }


api_router.include_router(public_router, prefix="/public", tags=["public"])
api_router.include_router(auth_router, prefix="/auth", tags=["auth"])
api_router.include_router(dashboard_router, prefix="/admin", tags=["dashboard"])
api_router.include_router(properties_router, prefix="/admin", tags=["properties"])
api_router.include_router(diagnostics_router, prefix="/diagnostics", tags=["diagnostics"])
api_router.include_router(seed_admin_router, prefix="/admin/seeds", tags=["admin-seeds"])

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=config.cors_origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)


@app.on_event("startup")
async def startup_db_client():
    await db_manager.connect()
    await db_manager.ensure_indexes()
    await ensure_seed_state(db_manager.database, config)
    logger.info(
        "HappyCo Concierge V1 ready | env=%s db=%s",
        config.app_env,
        config.db_name,
    )


@app.on_event("shutdown")
async def shutdown_db_client():
    db_manager.close()
