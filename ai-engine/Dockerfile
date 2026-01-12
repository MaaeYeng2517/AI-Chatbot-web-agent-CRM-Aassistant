# Dockerfile
FROM nvidia/cuda:12.1.105-base-ubuntu22.04
WORKDIR /app
COPY requirements.txt .
RUN apt-get update && apt-get install -y ffmpeg python3-pip
RUN pip3 install -r requirements.txt
COPY . .
CMD ["celery", "-A", "tasks", "worker", "--loglevel=info"]
