"""
Simple in-memory database for customers
Easily replaceable with SQLAlchemy and real database
"""

from datetime import datetime
from typing import Dict, List, Optional
from loguru import logger

class CustomerDatabase:
    """Simple in-memory customer database"""
    
    def __init__(self):
        self.customers: Dict[int, Dict] = {}
        self.next_id = 1
        logger.info("Customer database initialized")
    
    def create_customer(self, name: str, email: str, company: str, working: bool = True, travel: bool = False) -> Dict:
        """Create a new customer"""
        customer_id = self.next_id
        self.next_id += 1
        
        customer = {
            "id": customer_id,
            "name": name,
            "email": email,
            "company": company,
            "working": working,
            "travel": travel,
            "created_at": datetime.now().isoformat(),
            "updated_at": datetime.now().isoformat(),
        }
        
        self.customers[customer_id] = customer
        logger.info(f"Created customer: {name} (ID: {customer_id})")
        return customer
    
    def get_customer(self, customer_id: int) -> Optional[Dict]:
        """Get a customer by ID"""
        return self.customers.get(customer_id)
    
    def search_customers(self, query: str, limit: int = 10) -> List[Dict]:
        """Search customers by name, email, or company"""
        query_lower = query.lower()
        results = []
        
        for customer in self.customers.values():
            # Search in name, email, and company
            if (query_lower in customer.get("name", "").lower() or
                query_lower in customer.get("email", "").lower() or
                query_lower in customer.get("company", "").lower()):
                results.append(customer)
        
        # Return limited results
        return results[:limit]
    
    def update_customer(self, customer_id: int, **updates) -> Optional[Dict]:
        """Update a customer"""
        if customer_id not in self.customers:
            return None
        
        customer = self.customers[customer_id]
        customer.update(updates)
        customer["updated_at"] = datetime.now().isoformat()
        
        logger.info(f"Updated customer: {customer_id}")
        return customer
    
    def get_all_customers(self, limit: int = 100) -> List[Dict]:
        """Get all customers"""
        return list(self.customers.values())[:limit]
    
    def delete_customer(self, customer_id: int) -> bool:
        """Delete a customer"""
        if customer_id in self.customers:
            del self.customers[customer_id]
            logger.info(f"Deleted customer: {customer_id}")
            return True
        return False
    
    def get_stats(self) -> Dict:
        """Get database statistics"""
        return {
            "total_customers": len(self.customers),
            "next_id": self.next_id,
        }


# Global database instance
db = CustomerDatabase()
