from fastapi import APIRouter, FastAPI
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import logging
from pathlib import Path

from app.core.config import load_config
from app.core.database import init_database
from app.routers.analytics import router as analytics_router
from app.routers.auth import router as auth_router
from app.routers.dashboard import router as dashboard_router
from app.routers.diagnostics import router as diagnostics_router
from app.routers.manager_actions import router as manager_actions_router
from app.routers.properties import router as properties_router
from app.routers.providers import router as providers_router
from app.routers.public import router as public_router
from app.routers.residents import router as residents_router
from app.routers.seed_admin import router as seed_admin_router
from app.routers.tenants import router as tenants_router
from app.services.seed_service import ensure_seed_state
from app.services.integrity_check import check_database_integrity

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
        "scope": "phase-8-residents-providers-analytics",
    }


api_router.include_router(public_router, prefix="/public", tags=["public"])
api_router.include_router(auth_router, prefix="/auth", tags=["auth"])
api_router.include_router(dashboard_router, prefix="/admin", tags=["dashboard"])
api_router.include_router(properties_router, prefix="/admin", tags=["properties"])
api_router.include_router(analytics_router, prefix="/admin/analytics", tags=["analytics"])
api_router.include_router(tenants_router, prefix="/admin", tags=["tenants"])
api_router.include_router(providers_router, tags=["providers"])
api_router.include_router(residents_router, tags=["residents"])
api_router.include_router(manager_actions_router, tags=["manager-actions"])
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
    
    # Run integrity check on startup
    integrity_result = await check_database_integrity(db_manager.database)
    if not integrity_result.passed:
        logger.warning(
            "Database integrity check failed: %d errors, %d warnings",
            len(integrity_result.errors),
            len(integrity_result.warnings)
        )
        for error in integrity_result.errors:
            logger.error("Integrity error: %s", error)
    else:
        logger.info("Database integrity check passed (%d checks)", len(integrity_result.checks_run))
    
    logger.info(
        "HappyCo Concierge V1 ready | env=%s db=%s",
        config.app_env,
        config.db_name,
    )


@app.on_event("shutdown")
async def shutdown_db_client():
    db_manager.close()
