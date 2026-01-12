# backend/rate_limit.py
from fastapi import FastAPI, Request, HTTPException
from fastapi_limiter import FastAPILimiter
from fastapi_limiter.depends import RateLimiter
import redis.asyncio as redis

app = FastAPI()

@app.on_event("startup")
async def startup():
    r = await redis.from_url("redis://localhost:6379", encoding="utf-8", decode_responses=True)
    await FastAPILimiter.init(r)

@app.post("/generate/", dependencies=[Depends(RateLimiter(times=5, seconds=60))])
async def generate(prompt: str):
    # จำกัดผู้ใช้ 5 requests / 60 วินาที
    return {"prompt": prompt, "status": "queued"}
