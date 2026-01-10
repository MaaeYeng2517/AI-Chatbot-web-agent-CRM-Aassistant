from typing import Any
import mcp.server.stdio as mcp_server
from mcp.server import Server
from mcp.types import Tool, TextContent
import asyncio

# Initialize MCP server
mcp = Server("enterprise-api")

# Define available tools
@mcp.list_tools()
async def list_tools():
    return [
        Tool(
            name="search_customers",
            description="Search customer database by name, email, or company",
            inputSchema={
                "type": "object",
                "properties": {
                    "query": {"type": "string", "description": "Search query"},
                    "limit": {"type": "integer", "description": "Maximum results", "default": 10}
                },
                "required": ["query"]
            }
        ),
        Tool(
            name="create_customer",
            description="Create new customer record",
            inputSchema={
                "type": "object",
                "properties": {
                    "name": {"type": "string"},
                    "email": {"type": "string", "format": "email"},
                    "company": {"type": "string"}
                },
                "required": ["name", "email", "company"]
            }
        )
    ]

# Handle tool invocations
@mcp.call_tool()
async def call_tool(name: str, arguments: dict):
    if name == "search_customers":
        # Your business logic here
        results = await search_customers(arguments["query"], arguments.get("limit", 10))
        return [TextContent(type="text", text=str(results))]
    
    elif name == "create_customer":
        # Your business logic here
        customer = await create_customer(arguments["name"], arguments["email"], arguments["company"])
        return [TextContent(type="text", text=f"Created customer {customer['id']}")]
    
    raise ValueError(f"Unknown tool: {name}")

async def main():
    async with mcp_server.stdio_server() as (read_stream, write_stream):
        await mcp.run(
            read_stream,
            write_stream,
            mcp.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main())