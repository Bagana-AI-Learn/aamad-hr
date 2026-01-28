"""
Backend Server Startup Script

Convenience script to start the FastAPI backend server.
"""

import uvicorn
from utils.config import get_settings

if __name__ == "__main__":
    settings = get_settings()
    uvicorn.run(
        "main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.DEBUG,
        log_level=settings.LOG_LEVEL.lower(),
    )
