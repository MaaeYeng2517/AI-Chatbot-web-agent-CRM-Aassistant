# AI CRM Assistant - Frontend

A modern, responsive web interface for the AI CRM Assistant backend.

## Features

- 🎨 **Modern Dark UI** - Beautiful gradient design with smooth animations
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile devices
- 🔍 **Customer Search** - Search customers with filters and limits
- ➕ **Customer Management** - Create new customer records
- 📊 **System Dashboard** - View agent status and statistics
- 💭 **Activity Memory** - Track recent interactions
- 🚀 **Real-time Status** - Live API connection monitoring
- ⚡ **Fast & Lightweight** - Vanilla JavaScript, no heavy dependencies

## Project Structure

```
frontend/
├── index.html      # Main HTML page
├── styles.css      # CSS styling and responsive design
├── api.js         # API client for backend communication
├── app.js         # Main application logic
├── server.py      # Simple HTTP server for development
└── README.md      # This file
```

## Files Overview

### index.html
The main HTML file containing:
- Responsive layout with header, sidebar, and main content
- Search customer form
- Create customer form
- System information display
- Activity memory sidebar
- Toast notification system

### styles.css
Complete styling with:
- CSS variables for theming
- Modern gradient colors
- Responsive grid layout
- Smooth animations and transitions
- Mobile-first responsive design
- Dark theme optimized for readability

### api.js
API client class providing:
- `getStatus()` - Check backend health
- `getTools()` - Get available tools
- `searchCustomers()` - Search customers
- `createCustomer()` - Create new customer
- `getMemory()` - Get activity history
- Error handling and request timeout

### app.js
Main application class with:
- Event listener setup
- Form handling and validation
- Real-time status checking
- Memory/activity tracking
- Toast notifications
- Tool loading and display

### server.py
Simple Python HTTP server:
- Serves static files from the frontend directory
- CORS headers for API requests
- Cache-control headers to prevent caching
- Runs on http://localhost:3000

## Installation & Setup

### Option 1: Run with Python Server (Recommended for Development)

```bash
cd frontend
python3 server.py
```

Then open your browser to: **http://localhost:3000**

### Option 2: Use Any HTTP Server

```bash
cd frontend

# Using Python built-in server
python3 -m http.server 3000

# Using Node.js http-server
npx http-server . -p 3000

# Using Live Server (VSCode extension)
# Just right-click index.html and select "Open with Live Server"
```

### Option 3: Static File Hosting

Simply copy the `frontend/` directory to any web hosting service:
- GitHub Pages
- Netlify
- Vercel
- AWS S3
- Any static file hosting service

## Configuration

### API Server URL

By default, the frontend expects the backend API at `http://localhost:8000`.

To change this, edit the `APIClient` initialization in `app.js`:

```javascript
// In app.js (around line 135)
constructor() {
    this.api = new APIClient('http://your-api-url:8000');
}
```

Or modify the `baseURL` in `api.js`:

```javascript
// In api.js (around line 5)
constructor(baseURL = 'http://localhost:8000') {
    this.baseURL = baseURL;
}
```

## Usage

### 1. **Check System Status**
   - View "System Information" card on the right
   - Status indicator in header shows connection state
   - Auto-refreshes every 30 seconds

### 2. **Search Customers**
   - Enter search query (name, email, company)
   - Set results limit (1-100)
   - Click "Search" button
   - Results displayed below the form

### 3. **Create Customer**
   - Fill in Name, Email, Company fields
   - Click "Create Customer"
   - Confirmation message appears
   - Customer added to system

### 4. **Track Activity**
   - Recent actions appear in "Recent Activity" sidebar
   - Shows timestamp and action type
   - Clear history with "Clear Memory" button

## API Integration

The frontend communicates with these API endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check & system status |
| GET | `/tools` | Get available tools list |
| POST | `/search-customers` | Search customers |
| POST | `/create-customer` | Create new customer |
| GET | `/memory` | Get activity history |

### Request/Response Examples

**Search Customers:**
```javascript
// Request
POST /search-customers
{
  "query": "john",
  "limit": 10
}

// Response
{
  "results": [...]
}
```

**Create Customer:**
```javascript
// Request
POST /create-customer
{
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Acme Corp"
}

// Response
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Acme Corp"
}
```

## Styling & Customization

### Color Scheme

The frontend uses CSS variables for easy theme customization:

```css
:root {
    --primary-color: #6366f1;      /* Indigo */
    --secondary-color: #8b5cf6;    /* Violet */
    --success-color: #10b981;      /* Green */
    --danger-color: #ef4444;       /* Red */
    --bg-color: #0f172a;           /* Dark Blue */
    --surface-color: #1e293b;      /* Dark Gray */
}
```

Edit these in `styles.css` to change the color scheme.

### Responsive Breakpoints

- **Desktop**: All features visible, 2-column layout
- **Tablet** (max-width: 768px): Sidebar stacked above content
- **Mobile** (max-width: 480px): Single column, optimized touch targets

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Development Tips

### Debugging

Check browser console (F12) for:
- API request/response logs
- Connection errors
- Form validation messages

### Testing Without Backend

Modify `api.js` to add mock responses:

```javascript
async getStatus() {
    return {
        agent: "AI-CRM-Assistant",
        version: "1.0.0",
        status: "running"
    };
}
```

### Adding New Features

1. **Add HTML element** in `index.html`
2. **Add CSS styling** in `styles.css`
3. **Add API method** in `api.js` (if needed)
4. **Add handler** in `app.js` for the feature

## Troubleshooting

### Backend Connection Error
- Ensure backend is running: `python src/api.py`
- Check backend is on `localhost:8000`
- Check browser console for CORS errors
- Verify firewall allows localhost connections

### Forms Not Submitting
- Check browser console for JavaScript errors
- Ensure all required fields are filled
- Verify API is responding to requests

### Styling Issues
- Clear browser cache (Ctrl+Shift+Del)
- Check CSS file is loaded (inspect element)
- Verify browser supports CSS Grid and Flexbox

## Performance Tips

- Frontend is lightweight (~50KB total size)
- Uses vanilla JavaScript (no frameworks)
- Optimized CSS with media queries
- Lazy loading for sidebar content
- Automatic garbage collection of old memory items

## License

This project is licensed under the MIT License.

## Support

For issues or suggestions, please create an issue in the GitHub repository.

---

Built with ❤️ using HTML, CSS, and vanilla JavaScript
