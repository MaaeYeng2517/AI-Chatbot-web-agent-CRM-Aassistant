# backend/tasks.py
from celery import Celery
from model_engine import generate_image, generate_video

celery_app = Celery("tasks", broker="redis://localhost:6379/0", backend="redis://localhost:6379/1")


@celery_app.task
def generate_image_task(job_id, prompt):
    output_path = f"storage/images/{job_id}.png"
    generate_image(prompt, output_path)
    return output_path

@celery_app.task
def generate_video_task(job_id, prompt, frames):
    output_path = f"storage/videos/{job_id}.mp4"
    generate_video(prompt, output_path, frames)
    return output_path


