/**
 * Main Application Logic
 * Handles UI interactions and API communication
 */

class App {
    constructor() {
        this.api = new APIClient();
        this.isOnline = false;
        this.init();
    }

    /**
     * Initialize the application
     */
    async init() {
        this.setupEventListeners();
        this.setupNavigation();
        this.handleContactForm();
        await this.checkStatus();
        await this.loadTools();
        await this.loadCustomers();
        this.startStatusPolling();
    }

    /**
     * Setup event listeners for forms
     */
    setupEventListeners() {
        // Search form
        document.getElementById('searchForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSearch();
        });

        // Create customer form
        document.getElementById('createForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleCreateCustomer();
        });

        // Update customer form
        document.getElementById('updateForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleUpdateCustomer();
        });

        // Delete customer form
        document.getElementById('deleteForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleDeleteCustomer();
        });

        // Modal buttons
        document.getElementById('confirmYes').addEventListener('click', () => {
            this.confirmDelete();
        });

        document.getElementById('confirmNo').addEventListener('click', () => {
            this.cancelDelete();
        });

        // Clear memory button
        document.getElementById('clearMemory').addEventListener('click', () => {
            this.clearMemory();
        });
    }

    /**
     * Setup navigation tabs
     */
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const tabName = link.getAttribute('data-tab');
                this.switchTab(tabName);
            });
        });
    }

    /**
     * Switch to a different tab
     */
    switchTab(tabName) {
        // Hide all panels
        const panels = document.querySelectorAll('.tab-panel');
        panels.forEach(panel => panel.classList.remove('active'));

        // Remove active from all nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => link.classList.remove('active'));

        // Show selected panel
        const selectedPanel = document.getElementById(tabName);
        if (selectedPanel) {
            selectedPanel.classList.add('active');
        }

        // Activate selected nav link
        const selectedLink = document.querySelector(`[data-tab="${tabName}"]`);
        if (selectedLink) {
            selectedLink.classList.add('active');
        }
    }

    /**
     * Check API status and update UI
     */
    async checkStatus() {
        try {
            const data = await this.api.getStatus();
            this.isOnline = true;
            this.updateStatus(true, 'Online');
            
            // Update system info
            document.getElementById('agentName').textContent = data.agent || '-';
            document.getElementById('agentVersion').textContent = data.version || '-';
            document.getElementById('agentStatus').textContent = data.status || '-';
        } catch (error) {
            this.isOnline = false;
            this.updateStatus(false, 'Offline');
            console.error('Status check failed:', error);
        }
    }

    /**
     * Update status indicator
     */
    updateStatus(online, text) {
        const statusDot = document.getElementById('statusDot');
        const statusText = document.getElementById('statusText');
        
        if (online) {
            statusDot.classList.add('online');
            statusDot.classList.remove('offline');
        } else {
            statusDot.classList.add('offline');
            statusDot.classList.remove('online');
        }
        
        statusText.textContent = text;
    }

    /**
     * Load and display available tools
     */
    async loadTools() {
        try {
            const data = await this.api.getTools();
            const tools = data.tools || [];
            
            document.getElementById('toolCount').textContent = tools.length;
            
            const toolsList = document.getElementById('toolsList');
            if (tools.length === 0) {
                toolsList.innerHTML = '<div class="empty-state">No tools available</div>';
                return;
            }

            toolsList.innerHTML = tools
                .map(tool => `<div class="tool-item">✓ ${this.formatToolName(tool)}</div>`)
                .join('');
        } catch (error) {
            console.error('Failed to load tools:', error);
            document.getElementById('toolsList').innerHTML = 
                '<div class="empty-state">Failed to load tools</div>';
        }
    }

    /**
     * Load and display all customers
     */
    async loadCustomers() {
        try {
            const data = await this.api.getAllCustomers(100);
            const customers = data.customers || [];
            
            if (customers.length === 0) {
                return; // Don't show anything if no customers
            }

            // Create customers list section if not exists
            let customersList = document.getElementById('customersList');
            if (!customersList) {
                const memoryPanel = document.querySelector('.memory-panel');
                const section = document.createElement('section');
                section.className = 'tools-panel';
                section.innerHTML = `
                    <h2>👥 Customers (${customers.length})</h2>
                    <div id="customersList" class="tools-list"></div>
                `;
                memoryPanel.parentNode.insertBefore(section, memoryPanel);
                customersList = document.getElementById('customersList');
            }

            customersList.innerHTML = customers
                .map(customer => `
                    <div class="tool-item" title="${customer.email}">
                        ${customer.name} - ${customer.company}
                    </div>
                `)
                .join('');
        } catch (error) {
            console.error('Failed to load customers:', error);
        }
    }

    /**
     * Format tool name for display
     */
    formatToolName(toolName) {
        return toolName
            .replace(/_/g, ' ')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    /**
     * Handle customer search
     */
    async handleSearch() {
        if (!this.isOnline) {
            this.showToast('API is offline', 'error');
            return;
        }

        const query = document.getElementById('searchQuery').value.trim();
        const limit = parseInt(document.getElementById('searchLimit').value) || 10;

        if (!query) {
            this.showToast('Please enter a search query', 'error');
            return;
        }

        const button = document.querySelector('#searchForm button');
        button.disabled = true;
        button.textContent = 'Searching...';

        try {
            const result = await this.api.searchCustomers(query, limit);
            this.displaySearchResults(result.results || []);
            this.addMemory(`Searched: "${query}"`, 'search');
            this.showToast('Search completed', 'success');
        } catch (error) {
            this.showToast(`Search failed: ${error.message}`, 'error');
        } finally {
            button.disabled = false;
            button.textContent = 'Search';
        }
    }

    /**
     * Display search results
     */
    displaySearchResults(results) {
        const resultsDiv = document.getElementById('searchResults');
        const resultsList = document.getElementById('searchResultsList');

        if (results.length === 0) {
            resultsDiv.classList.add('hidden');
            resultsList.innerHTML = '';
            return;
        }

        resultsDiv.classList.remove('hidden');
        resultsList.innerHTML = results
            .map((item, idx) => `
                <div class="result-item">
                    <strong>#${idx + 1}:</strong> ${JSON.stringify(item)}
                </div>
            `)
            .join('');
    }

    /**
     * Handle customer creation
     */
    async handleCreateCustomer() {
        if (!this.isOnline) {
            this.showToast('API is offline', 'error');
            return;
        }

        const name = document.getElementById('customerName').value.trim();
        const email = document.getElementById('customerEmail').value.trim();
        const company = document.getElementById('customerCompany').value.trim();
        const working = document.getElementById('customerWorking').checked;
        const travel = document.getElementById('customerTravel').checked;

        if (!name || !email || !company) {
            this.showToast('Please fill in all fields', 'error');
            return;
        }

        const button = document.querySelector('#createForm button');
        button.disabled = true;
        button.textContent = 'Creating...';

        try {
            const result = await this.api.createCustomer(name, email, company, working, travel);
            document.getElementById('createResultContent').innerHTML = `
                <div style="background: rgba(0, 0, 0, 0.2); padding: 1rem; border-radius: 6px;">
                    <strong>✓ Customer Created Successfully!</strong>
                    <pre style="margin-top: 0.5rem; font-size: 0.85rem; overflow-x: auto;">
${JSON.stringify(result, null, 2)}
                    </pre>
                </div>
            `;
            document.getElementById('createResult').classList.remove('hidden');
            
            // Reset form
            document.getElementById('createForm').reset();
            
            this.addMemory(`Created: ${name} (${email})`, 'create');
            this.showToast('Customer created successfully', 'success');
            
            // Reload customers list
            await this.loadCustomers();
        } catch (error) {
            this.showToast(`Creation failed: ${error.message}`, 'error');
        } finally {
            button.disabled = false;
            button.textContent = 'Create Customer';
        }
    }

    /**
     * Handle update customer
     */
    async handleUpdateCustomer() {
        if (!this.isOnline) {
            this.showToast('API is offline', 'error');
            return;
        }

        const customerId = parseInt(document.getElementById('updateCustomerId').value.trim());
        const name = document.getElementById('updateCustomerName').value.trim();
        const email = document.getElementById('updateCustomerEmail').value.trim();
        const company = document.getElementById('updateCustomerCompany').value.trim();
        const working = document.getElementById('updateCustomerWorking').checked;
        const travel = document.getElementById('updateCustomerTravel').checked;

        if (!customerId || !name || !email || !company) {
            this.showToast('Please fill in all fields', 'error');
            return;
        }

        const button = document.querySelector('#updateForm button');
        button.disabled = true;
        button.textContent = 'Updating...';

        try {
            const result = await this.api.updateCustomer(customerId, name, email, company, working, travel);
            this.addMemory(`Updated: ${name} (ID: ${customerId})`, 'update');
            this.showToast('Customer updated successfully', 'success');
            
            // Reset form
            document.getElementById('updateForm').reset();
            
            // Reload customers list
            await this.loadCustomers();
        } catch (error) {
            this.showToast(`Update failed: ${error.message}`, 'error');
        } finally {
            button.disabled = false;
            button.textContent = 'Update Customer';
        }
    }

    /**
     * Handle delete customer - show confirmation
     */
    async handleDeleteCustomer() {
        if (!this.isOnline) {
            this.showToast('API is offline', 'error');
            return;
        }

        const customerId = parseInt(document.getElementById('deleteCustomerId').value.trim());

        if (!customerId) {
            this.showToast('Please enter a customer ID', 'error');
            return;
        }

        // Store ID for later use
        this.deleteCustomerId = customerId;

        // Show confirmation modal
        const modal = document.getElementById('confirmModal');
        const message = document.getElementById('confirmMessage');
        message.textContent = `Are you sure you want to delete customer ID ${customerId}? This action cannot be undone.`;
        modal.classList.remove('hidden');
    }

    /**
     * Confirm delete operation
     */
    async confirmDelete() {
        const customerId = this.deleteCustomerId;
        const modal = document.getElementById('confirmModal');
        modal.classList.add('hidden');

        const button = document.querySelector('#deleteForm button');
        button.disabled = true;
        button.textContent = 'Deleting...';

        try {
            await this.api.deleteCustomer(customerId);
            this.addMemory(`Deleted: Customer ID ${customerId}`, 'delete');
            this.showToast('Customer deleted successfully', 'success');
            
            // Reset form
            document.getElementById('deleteForm').reset();
            
            // Reload customers list
            await this.loadCustomers();
        } catch (error) {
            this.showToast(`Delete failed: ${error.message}`, 'error');
        } finally {
            button.disabled = false;
            button.textContent = 'Delete Customer';
            this.deleteCustomerId = null;
        }
    }

    /**
     * Cancel delete operation
     */
    cancelDelete() {
        const modal = document.getElementById('confirmModal');
        modal.classList.add('hidden');
        this.deleteCustomerId = null;
    }

    /**
     * Add activity to memory
     */
    addMemory(activity, type = 'activity') {
        const memoryList = document.getElementById('memoryList');
        
        // Remove empty state if present
        const emptyState = memoryList.querySelector('.empty-state');
        if (emptyState) {
            emptyState.remove();
        }

        const timestamp = new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });

        const item = document.createElement('div');
        item.className = 'memory-item';
        item.textContent = `${timestamp} - ${activity}`;
        
        memoryList.insertBefore(item, memoryList.firstChild);

        // Keep only last 10 items
        while (memoryList.children.length > 10) {
            memoryList.removeChild(memoryList.lastChild);
        }
    }

    /**
     * Clear memory
     */
    clearMemory() {
        const memoryList = document.getElementById('memoryList');
        memoryList.innerHTML = '<div class="empty-state">No activity yet</div>';
        this.showToast('Memory cleared', 'success');
    }

    /**
     * Handle contact form submission
     */
    handleContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('contactName').value.trim();
            const email = document.getElementById('contactEmail').value.trim();
            const message = document.getElementById('contactMessage').value.trim();

            if (!name || !email || !message) {
                this.showToast('Please fill in all fields', 'error');
                return;
            }

            // Simulate sending message
            const button = form.querySelector('button');
            button.disabled = true;
            button.textContent = 'Sending...';

            setTimeout(() => {
                this.showToast('Thank you! We\'ll get back to you soon.', 'success');
                form.reset();
                button.disabled = false;
                button.textContent = 'Send Message';
            }, 1000);
        });
    }

    /**
     * Show toast notification
     */
    showToast(message, type = 'info') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = `toast show ${type}`;

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    /**
     * Start polling for status updates
     */
    startStatusPolling() {
        setInterval(() => {
            this.checkStatus();
        }, 30000); // Check every 30 seconds
    }
}

/**
 * Initialize app when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});
