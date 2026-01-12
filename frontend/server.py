"""
Simple HTTP Server for serving the frontend
Run this to serve the frontend on http://localhost:3000
"""

import http.server
import socketserver
import os
from pathlib import Path

PORT = 3000
FRONTEND_DIR = Path(__file__).parent

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def translate_path(self, path):
        """Translate URL path to filesystem path"""
        # Convert /path to frontend/path
        if path == '/':
            path = '/index.html'
        
        return super().translate_path(path)
    
    def end_headers(self):
        """Add CORS headers for API requests"""
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        super().end_headers()
    
    def do_OPTIONS(self):
        """Handle CORS preflight requests"""
        self.send_response(200)
        self.end_headers()

def run_server():
    """Start the HTTP server"""
    os.chdir(FRONTEND_DIR)
    
    with socketserver.TCPServer(("", PORT), CustomHTTPRequestHandler) as httpd:
        print(f"""
╔════════════════════════════════════════════════════════════╗
║         AI CRM Assistant Frontend Server                   ║
╠════════════════════════════════════════════════════════════╣
║  Server running on: http://localhost:{PORT}                      ║
║  Frontend path: {FRONTEND_DIR}                   
║  Press Ctrl+C to stop                                      ║
╚════════════════════════════════════════════════════════════╝
        """)
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\n✓ Server stopped")

if __name__ == "__main__":
    run_server()
