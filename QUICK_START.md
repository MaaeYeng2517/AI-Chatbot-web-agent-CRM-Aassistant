# Quick Start Guide

## Starting the Complete Application

### Option 1: Start Everything (Recommended)

Open two terminal windows:

**Terminal 1 - Start Backend API (Port 8000):**
```bash
cd /Users/maaeyeng/Documents/GitHub/AI-Chatbot-web-agent-CRM-Aassistant
python src/api.py
```

**Terminal 2 - Start Frontend Server (Port 3000):**
```bash
cd /Users/maaeyeng/Documents/GitHub/AI-Chatbot-web-agent-CRM-Aassistant/frontend
python3 server.py
```

Then open your browser:
- **Frontend**: http://localhost:3000
- **API Docs**: http://localhost:8000/docs

### Option 2: Use One Terminal with Background Processes

```bash
cd /Users/maaeyeng/Documents/GitHub/AI-Chatbot-web-agent-CRM-Aassistant

# Start API in background
python src/api.py &

# Start Frontend in background
cd frontend && python3 server.py &

# Press Enter to get back to prompt
```

## Access Points

| Service | URL | Description |
|---------|-----|-------------|
| Frontend | http://localhost:3000 | Web UI for the AI Agent |
| API | http://localhost:8000 | Backend API server |
| API Docs | http://localhost:8000/docs | Interactive Swagger UI |
| API ReDoc | http://localhost:8000/redoc | Alternative API documentation |

## Features to Try

### 1. Check System Status
- Open http://localhost:3000
- View "System Information" card
- Status indicator should show "Online" in green

### 2. Search Customers
- In "Search Customers" card
- Enter a query (e.g., "john", "acme", etc.)
- Set limit to 10
- Click "Search"

### 3. Create Customer
- Fill in Name, Email, Company
- Click "Create Customer"
- View confirmation message

### 4. View Available Tools
- Check left sidebar "Available Tools" section
- See all 4 registered tools:
  - Search Customers
  - Create Customer
  - Update Customer
  - Get Customer Details

### 5. Track Activity
- Perform actions (search, create)
- Check "Recent Activity" sidebar
- See timestamped history
- Click "Clear Memory" to reset

## Project Structure

```
AI-Chatbot-web-agent-CRM-Aassistant/
├── src/
│   ├── __init__.py
│   ├── agent.py          # AI Agent logic
│   └── api.py            # FastAPI backend
├── frontend/
│   ├── index.html        # Main HTML
│   ├── styles.css        # Styling
│   ├── api.js            # API client
│   ├── app.js            # App logic
│   ├── server.py         # Frontend server
│   └── README.md         # Frontend docs
├── main.py               # MCP Server (WIP)
├── config.py             # Configuration
├── requirements.txt      # Dependencies
├── .env.example          # Environment template
├── Dockerfile            # Docker config
└── README.md             # Main documentation
```

## Configuration

### Backend Settings
Edit `.env`:
```bash
cp .env.example .env
# Edit with your settings
API_HOST=0.0.0.0
API_PORT=8000
DEBUG=True
OPENAI_API_KEY=your_key_here
```

### Frontend Settings
Edit `frontend/app.js` to change API URL:
```javascript
constructor() {
    this.api = new APIClient('http://your-server:8000');
}
```

## Troubleshooting

### Port Already in Use
```bash
# Check what's using the port
lsof -i :8000    # For API
lsof -i :3000    # For Frontend

# Kill the process
kill -9 <PID>
```

### Backend Not Responding
```bash
# Verify backend is running
curl http://localhost:8000/

# Check logs
tail -f /tmp/api.log
```

### Frontend Not Loading
```bash
# Verify frontend server is running
curl http://localhost:3000/

# Check if files exist
ls -la frontend/
```

### API Not Responding from Frontend
- Check browser console (F12)
- Verify both servers are running
- Check CORS settings if needed
- Ensure correct API URL in app.js

## Next Steps

1. **Implement Real Database**
   - Replace mock functions in `src/agent.py`
   - Connect to PostgreSQL or SQLite
   - Add proper data persistence

2. **Add Authentication**
   - Implement login/signup
   - Add JWT tokens
   - Secure API endpoints

3. **Enhance Frontend**
   - Add customer detail view
   - Implement pagination
   - Add export functionality
   - Add charts/analytics

4. **Deploy to Cloud**
   - Containerize with Docker
   - Deploy to Azure, AWS, or GCP
   - Set up CI/CD pipeline
   - Configure custom domain

## Resources

- **Backend Docs**: See [README.md](README.md)
- **Frontend Docs**: See [frontend/README.md](frontend/README.md)
- **FastAPI**: https://fastapi.tiangolo.com/
- **Uvicorn**: https://www.uvicorn.org/

## Support

For issues:
1. Check the troubleshooting section
2. Review logs in browser console
3. Check API health endpoint
4. Review error messages

---

Happy coding! 🚀
