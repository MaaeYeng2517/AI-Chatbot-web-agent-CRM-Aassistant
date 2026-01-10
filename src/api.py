"""FastAPI Application"""
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent.parent))

from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any
from loguru import logger
from config import settings
from src.agent import CRMAgent
from src.database import db


# Initialize agent (global)
agent = CRMAgent()


# Lifespan context manager
@asynccontextmanager
async def lifespan(app: FastAPI):
    """Manage application startup and shutdown"""
    # Startup
    logger.info(f"Starting {settings.AGENT_NAME}")
    yield
    # Shutdown
    logger.info(f"Stopping {settings.AGENT_NAME}")


# Initialize FastAPI app
app = FastAPI(
    title=settings.AGENT_NAME,
    version=settings.AGENT_VERSION,
    debug=settings.DEBUG,
    lifespan=lifespan
)


# Request/Response Models
class SearchCustomerRequest(BaseModel):
    query: str
    limit: int = 10


class CreateCustomerRequest(BaseModel):
    name: str
    email: str
    company: str
    working: bool = True
    travel: bool = False


class UpdateCustomerRequest(BaseModel):
    name: str
    email: str
    company: str
    working: bool = True
    travel: bool = False


class PlanRegistrationRequest(BaseModel):
    fullName: str
    email: str
    phone: str = ""
    company: str = ""
    plan: str
    employees: str
    industry: str = ""
    message: str = ""
    newsletter: bool = False


class CustomerResponse(BaseModel):
    id: int
    name: str
    email: str
    company: str
    working: bool
    travel: bool


@app.get("/")
async def root():
    """Health check"""
    return {
        "agent": settings.AGENT_NAME,
        "version": settings.AGENT_VERSION,
        "status": "running"
    }


@app.get("/tools")
async def get_tools():
    """Get available tools"""
    return {"tools": agent.get_tools()}


@app.post("/search-customers")
async def search_customers(request: SearchCustomerRequest):
    """Search customers"""
    try:
        results = await agent.execute_tool(
            "search_customers",
            query=request.query,
            limit=request.limit
        )
        return {"results": results}
    except Exception as e:
        logger.error(f"Search error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/create-customer")
async def create_customer(request: CreateCustomerRequest):
    """Create new customer"""
    try:
        result = await agent.execute_tool(
            "create_customer",
            name=request.name,
            email=request.email,
            company=request.company
        )
        return result
    except Exception as e:
        logger.error(f"Creation error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/memory")
async def get_memory(limit: int = 10):
    """Get agent memory"""
    return {"memory": agent.get_memory(limit)}


@app.get("/customers")
async def get_all_customers(limit: int = 100):
    """Get all customers"""
    try:
        customers = db.get_all_customers(limit)
        return {"customers": customers, "count": len(customers)}
    except Exception as e:
        logger.error(f"Get customers error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/customers/{customer_id}")
async def get_customer(customer_id: int):
    """Get a specific customer"""
    try:
        customer = db.get_customer(customer_id)
        if not customer:
            raise HTTPException(status_code=404, detail=f"Customer {customer_id} not found")
        return customer
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Get customer error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@app.put("/customers/{customer_id}")
async def update_customer(customer_id: int, request: UpdateCustomerRequest):
    """Update a customer"""
    try:
        customer = db.get_customer(customer_id)
        if not customer:
            raise HTTPException(status_code=404, detail=f"Customer {customer_id} not found")
        
        updated = db.update_customer(customer_id, name=request.name, email=request.email, company=request.company)
        agent.add_memory(f"Updated customer {customer_id}: {request.name}")
        logger.info(f"Customer {customer_id} updated")
        return updated
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Update customer error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@app.delete("/customers/{customer_id}")
async def delete_customer(customer_id: int):
    """Delete a customer"""
    try:
        customer = db.get_customer(customer_id)
        if not customer:
            raise HTTPException(status_code=404, detail=f"Customer {customer_id} not found")
        
        db.delete_customer(customer_id)
        agent.add_memory(f"Deleted customer {customer_id}")
        logger.info(f"Customer {customer_id} deleted")
        return {"message": f"Customer {customer_id} deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Delete customer error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/stats")
async def get_stats():
    """Get database statistics"""
    try:
        stats = db.get_stats()
        return {
            "agent": settings.AGENT_NAME,
            "version": settings.AGENT_VERSION,
            "status": "running",
            **stats
        }
    except Exception as e:
        logger.error(f"Stats error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/register-plan")
async def register_plan(request: PlanRegistrationRequest):
    """Register for a plan"""
    try:
        registration = db.create_registration(
            full_name=request.fullName,
            email=request.email,
            phone=request.phone,
            company=request.company,
            plan=request.plan,
            employees=request.employees,
            industry=request.industry,
            message=request.message,
            newsletter=request.newsletter
        )
        return {
            "status": "success",
            "message": f"Registration received. We'll contact you at {request.email}",
            "registration": registration
        }
    except Exception as e:
        logger.error(f"Registration error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/registrations")
async def get_registrations():
    """Get all plan registrations"""
    try:
        registrations = db.get_registrations()
        return {"registrations": registrations}
    except Exception as e:
        logger.error(f"Get registrations error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/registrations/{registration_id}")
async def get_registration(registration_id: int):
    """Get a specific registration"""
    try:
        registration = db.get_registration(registration_id)
        if not registration:
            raise HTTPException(status_code=404, detail="Registration not found")
        return registration
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Get registration error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "src.api:app",
        host=settings.API_HOST,
        port=settings.API_PORT,
        reload=settings.DEBUG
    )
