"""AI Agent Core Logic"""
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent.parent))

from typing import Any, Dict, List, Optional
from loguru import logger
from config import settings
from src.database import db


class AIAgent:
    """Base AI Agent for handling CRM operations"""
    
    def __init__(self, name: str = settings.AGENT_NAME):
        self.name = name
        self.version = settings.AGENT_VERSION
        self.tools: Dict[str, callable] = {}
        self.memory: List[Dict[str, Any]] = []
        logger.info(f"Initializing {self.name} v{self.version}")
    
    def register_tool(self, name: str, handler: callable) -> None:
        """Register a tool handler"""
        self.tools[name] = handler
        logger.info(f"Registered tool: {name}")
    
    def get_tools(self) -> List[Dict[str, Any]]:
        """Get all available tools"""
        return list(self.tools.keys())
    
    async def execute_tool(self, tool_name: str, **kwargs) -> Any:
        """Execute a registered tool"""
        if tool_name not in self.tools:
            raise ValueError(f"Unknown tool: {tool_name}")
        
        logger.info(f"Executing tool: {tool_name} with args: {kwargs}")
        handler = self.tools[tool_name]
        import asyncio
        if asyncio.iscoroutinefunction(handler):
            result = await handler(**kwargs)
        else:
            result = handler(**kwargs)
        return result
    
    def add_memory(self, data: Dict[str, Any]) -> None:
        """Add interaction to memory"""
        self.memory.append(data)
    
    def get_memory(self, limit: int = 10) -> List[Dict[str, Any]]:
        """Retrieve recent memory"""
        return self.memory[-limit:]


class CRMAgent(AIAgent):
    """Specialized Agent for CRM operations"""
    
    def __init__(self):
        super().__init__()
        self._register_default_tools()
    
    def _register_default_tools(self) -> None:
        """Register default CRM tools"""
        self.register_tool("search_customers", self.search_customers)
        self.register_tool("create_customer", self.create_customer)
        self.register_tool("update_customer", self.update_customer)
        self.register_tool("get_customer_details", self.get_customer_details)
    
    async def search_customers(self, query: str, limit: int = 10) -> List[Dict]:
        """Search customers by query"""
        logger.info(f"Searching customers: {query}")
        results = db.search_customers(query, limit)
        return results
    
    async def create_customer(self, name: str, email: str, company: str) -> Dict:
        """Create new customer"""
        logger.info(f"Creating customer: {name}")
        customer = db.create_customer(name, email, company)
        return customer
    
    async def update_customer(self, customer_id: int, **updates) -> Dict:
        """Update customer information"""
        logger.info(f"Updating customer: {customer_id}")
        customer = db.update_customer(customer_id, **updates)
        if not customer:
            raise ValueError(f"Customer {customer_id} not found")
        return customer
    
    async def get_customer_details(self, customer_id: int) -> Dict:
        """Get customer details"""
        logger.info(f"Fetching customer: {customer_id}")
        customer = db.get_customer(customer_id)
        if not customer:
            raise ValueError(f"Customer {customer_id} not found")
        return customer
