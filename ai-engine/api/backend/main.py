# backend/main.py
from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from tasks import generate_image_task, generate_video_task
import uuid
from auth import verify_token
from tts_tasks import generate_speech_task

app = FastAPI(title="Text2Media AI Engine")

class TextPrompt(BaseModel):
    prompt: str
    type: str  # "image" or "video"
    style: str = None  # optional style
    frames: int = 30   # for video

@app.post("/generate/")
async def generate_media(data: TextPrompt):
    job_id = str(uuid.uuid4())

    if data.type == "image":
        generate_image_task.delay(job_id, data.prompt)
    elif data.type == "video":
        generate_video_task.delay(job_id, data.prompt, data.frames)
    else:
        raise HTTPException(status_code=400, detail="Invalid type. Must be 'image' or 'video'.")

    return {"job_id": job_id, "status": "queued"}

@app.post("/generate/")
async def generate(prompt: str, user_id: str = Depends(verify_token)):
    # user_id คือผู้ใช้ที่ถูก verify
    return {"prompt": prompt, "user_id": user_id}

@app.post("/tts/")
async def generate_tts(text: str):
    job_id = str(uuid.uuid4())
    generate_speech_task.delay(job_id, text)
    return {"job_id": job_id, "status": "queued"}
