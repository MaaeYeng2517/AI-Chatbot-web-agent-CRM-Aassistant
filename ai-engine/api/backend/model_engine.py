# backend/model_engine.py
import torch
from diffusers import StableDiffusionPipeline
from PIL import Image
import subprocess
import os

# Load model once
sd_model = StableDiffusionPipeline.from_pretrained(
    "stabilityai/stable-diffusion-2-1", torch_dtype=torch.float16
).to("cuda")

def generate_image(prompt, output_path):
    image = sd_model(prompt).images[0]
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    image.save(output_path)
    return output_path

def generate_video(prompt, output_path, frames=30):
    temp_dir = "storage/temp_frames"
    os.makedirs(temp_dir, exist_ok=True)
    frame_paths = []

    for i in range(frames):
        img = sd_model(f"{prompt} frame {i}").images[0]
        frame_file = os.path.join(temp_dir, f"frame_{i:03}.png")
        img.save(frame_file)
        frame_paths.append(frame_file)

    # Combine frames to video
    subprocess.run([
        "ffmpeg", "-y", "-r", "10", "-i", f"{temp_dir}/frame_%03d.png",
        "-c:v", "libx264", "-pix_fmt", "yuv420p", output_path
    ])
    return output_path
