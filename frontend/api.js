/**
 * API Client for AI CRM Assistant
 * Handles all communication with the backend FastAPI server
 */

class APIClient {
    constructor(baseURL = 'http://localhost:8000') {
        this.baseURL = baseURL;
        this.timeout = 10000;
    }

    /**
     * Make an HTTP request with error handling
     */
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            method: options.method || 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        };

        // Remove headers from body
        delete config.headers;

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), this.timeout);

            const response = await fetch(url, {
                signal: controller.signal,
                ...config,
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error(`API Error: ${error.message}`);
            throw error;
        }
    }

    /**
     * Health check - Get system status
     */
    async getStatus() {
        try {
            return await this.request('/');
        } catch (error) {
            throw new Error('Failed to connect to API server');
        }
    }

    /**
     * Get available tools
     */
    async getTools() {
        return await this.request('/tools');
    }

    /**
     * Search customers
     */
    async searchCustomers(query, limit = 10) {
        return await this.request('/search-customers', {
            method: 'POST',
            body: JSON.stringify({ query, limit }),
        });
    }

    /**
     * Create a new customer
     */
    async createCustomer(name, email, company, working = true, travel = false) {
        return await this.request('/create-customer', {
            method: 'POST',
            body: JSON.stringify({ name, email, company, working, travel }),
        });
    }

    /**
     * Get all customers
     */
    async getAllCustomers(limit = 100) {
        return await this.request(`/customers?limit=${limit}`);
    }

    /**
     * Get a specific customer
     */
    async getCustomer(customerId) {
        return await this.request(`/customers/${customerId}`);
    }

    /**
     * Update a customer
     */
    async updateCustomer(customerId, name, email, company, working = true, travel = false) {
        return await this.request(`/customers/${customerId}`, {
            method: 'PUT',
            body: JSON.stringify({ name, email, company, working, travel }),
        });
    }

    /**
     * Delete a customer
     */
    async deleteCustomer(customerId) {
        return await this.request(`/customers/${customerId}`, {
            method: 'DELETE',
        });
    }

    /**
     * Get database statistics
     */
    async getStats() {
        return await this.request('/stats');
    }

// Export for use in other files
window.APIClient = APIClient;
