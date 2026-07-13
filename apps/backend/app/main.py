"""ATPix auxiliary FastAPI application entry point.

The HappyView App View owns atproto XRPC indexing and OAuth proxying (PRD TC-001).
This service provides health checks and future C2PA claim-generator/validator APIs.
"""

import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.core.logging_config import configure_stdout_logging
from app.modules.c2pa.routers import router as c2pa_router
from app.modules.health.routers import router as health_router

configure_stdout_logging()
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(_app: FastAPI):
    """Log service startup to stdout for centralized observability."""
    logger.info("starting %s happyview_url=%s", settings.app_name, settings.happyview_url)
    yield


app = FastAPI(title=settings.app_name, debug=settings.debug, lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list(),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=[
        "X-C2PA-First-Action",
        "X-C2PA-Creator-Did",
        "X-C2PA-Embedded",
        "X-C2PA-Byte-Size",
    ],
)

app.include_router(health_router)
app.include_router(c2pa_router)
