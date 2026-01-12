FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["python", "mcp_server.py"]

Create requirements.txt:
    fastapi==0.104.1
    uvicorn==0.24.0
    pydantic==2.5.0
    mcp==0.9.0