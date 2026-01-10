# AI Chatbot Web Agent - CRM Assistant

An intelligent AI-powered CRM assistant using FastAPI and Model Context Protocol (MCP) for enterprise customer management.

## Features

- 🤖 **AI-Powered Agent**: Intelligent handling of CRM operations
- 🔧 **Tool System**: Extensible tool framework for custom operations
- 📊 **Memory Management**: Conversation and interaction history
- 🔍 **Customer Search**: Advanced search capabilities
- 💾 **Data Management**: Create, update, and retrieve customer information
- 📡 **REST API**: FastAPI-based REST endpoints
- 🐳 **Docker Support**: Ready for containerized deployment

## Project Structure

```
.
├── main.py                 # MCP Server implementation
├── config.py              # Configuration management
├── requirements.txt       # Python dependencies
├── .env.example          # Environment variables template
├── Dockerfile            # Docker configuration
├── README.md             # This file
└── src/
    ├── __init__.py
    ├── agent.py          # AI Agent core logic
    └── api.py            # FastAPI application
```

## Installation

### Prerequisites
- Python 3.11+
- pip or poetry
- Optional: Docker & Docker Compose

### Local Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd AI-Chatbot-web-agent-CRM-Aassistant
```

2. Create and activate virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Configure environment:
```bash
cp .env.example .env
# Edit .env with your settings
```

## Usage

### Run FastAPI Server

```bash
python -m src.api
```

The API will be available at `http://localhost:8000`

### Access API Documentation

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### Available Endpoints

- `GET /` - Health check
- `GET /tools` - List available tools
- `POST /search-customers` - Search customers
- `POST /create-customer` - Create new customer
- `GET /memory` - Get agent memory

### Example Requests

**Search Customers:**
```bash
curl -X POST "http://localhost:8000/search-customers" \
  -H "Content-Type: application/json" \
  -d '{"query": "john", "limit": 10}'
```

**Create Customer:**
```bash
curl -X POST "http://localhost:8000/create-customer" \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com", "company": "Acme Corp"}'
```

## Docker Deployment

### Build Docker Image

```bash
docker build -t ai-crm-assistant .
```

### Run Container

```bash
docker run -p 8000:8000 \
  -e OPENAI_API_KEY=your_key_here \
  ai-crm-assistant
```

## Configuration

All configuration is managed through environment variables. See `.env.example` for all available options:

- `API_HOST` - API server host (default: 0.0.0.0)
- `API_PORT` - API server port (default: 8000)
- `DEBUG` - Enable debug mode (default: True)
- `OPENAI_API_KEY` - OpenAI API key
- `OPENAI_MODEL` - Model to use (default: gpt-4)
- `DATABASE_URL` - Database connection string
- `REDIS_URL` - Redis connection string

## Development

### Run Tests

```bash
pytest tests/
```

### Code Quality

```bash
# Lint
flake8 src/

# Format
black src/
```

## Architecture

### AI Agent System

The project uses a modular agent architecture:

1. **Base Agent** - Core agent functionality
2. **CRM Agent** - Specialized for CRM operations
3. **Tool System** - Pluggable tool handlers
4. **Memory System** - Conversation history tracking

### API Layer

FastAPI-based REST API with Pydantic models for request/response validation.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see LICENSE file for details.

## Support

For support, issues, or questions, please open an issue on GitHub.

---

Built with ❤️ using FastAPI, Python, and AI
