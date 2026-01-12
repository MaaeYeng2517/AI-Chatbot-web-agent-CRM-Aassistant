# backend/tts_tasks.py
from celery import Celery
from TTS.api import TTS
import os

celery_app = Celery("tts_tasks", broker="redis://localhost:6379/0", backend="redis://localhost:6379/1")

# โหลดโมเดล TTS
tts_model = TTS(model_name="tts_models/en/ljspeech/tacotron2-DDC", progress_bar=False, gpu=True)

@celery_app.task
def generate_speech_task(job_id, text):
    output_path = f"storage/audio/{job_id}.wav"
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    tts_model.tts_to_file(text=text, file_path=output_path)
    return output_path