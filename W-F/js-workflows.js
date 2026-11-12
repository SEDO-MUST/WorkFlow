// Workflows list functionality
document.addEventListener('DOMContentLoaded', function() {
    // Sidebar toggle for mobile
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }
    
    // Initialize workflows data
    initWorkflows();
    
    // Search functionality
    const searchInput = document.getElementById('searchWorkflows');
    if (searchInput) {
        searchInput.addEventListener('input', filterWorkflows);
    }
    
    // Filter functionality
    const filterStatus = document.getElementById('filterStatus');
    const filterCategory = document.getElementById('filterCategory');
    
    if (filterStatus) filterStatus.addEventListener('change', filterWorkflows);
    if (filterCategory) filterCategory.addEventListener('change', filterWorkflows);
    
    // Clear filters
    const clearFiltersBtn = document.getElementById('clearFilters');
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', function() {
            if (searchInput) searchInput.value = '';
            if (filterStatus) filterStatus.value = 'all';
            if (filterCategory) filterCategory.value = 'all';
            filterWorkflows();
        });
    }
    
    // Pagination buttons
    const prevPageBtn = document.getElementById('prevPage');
    const nextPageBtn = document.getElementById('nextPage');
    
    if (prevPageBtn) prevPageBtn.addEventListener('click', goToPrevPage);
    if (nextPageBtn) nextPageBtn.addEventListener('click', goToNextPage);
    
    // Modal functionality
    initModals();
    
    console.log('Workflows page loaded');
});

// Sample workflows data (mock data)
const mockWorkflows = [
    { id: 1, name: 'Client Onboarding', category: 'onboarding', status: 'active', progress: 65, updated: '2023-10-15' },
    { id: 2, name: 'Content Approval', category: 'approval', status: 'completed', progress: 100, updated: '2023-10-14' },
    { id: 3, name: 'Invoice Processing', category: 'processing', status: 'active', progress: 30, updated: '2023-10-15' },
    { id: 4, name: 'Employee Onboarding', category: 'onboarding', status: 'active', progress: 80, updated: '2023-10-13' },
    { id: 5, name: 'Budget Approval', category: 'approval', status: 'paused', progress: 20, updated: '2023-10-12' },
    { id: 6, name: 'Website Deployment', category: 'processing', status: 'active', progress: 50, updated: '2023-10-14' },
    { id: 7, name: 'Vendor Evaluation', category: 'review', status: 'completed', progress: 100, updated: '2023-10-10' },
    { id: 8, name: 'Monthly Reporting', category: 'processing', status: 'active', progress: 10, updated: '2023-10-15' },
    { id: 9, name: 'Security Audit', category: 'review', status: 'paused', progress: 40, updated: '2023-10-09' },
    { id: 10, name: 'Product Launch', category: 'approval', status: 'active', progress: 75, updated: '2023-10-14' },
    { id: 11, name: 'Customer Support', category: 'notification', status: 'active', progress: 90, updated: '2023-10-15' },
    { id: 12, name: 'Legal Review', category: 'review', status: 'completed', progress: 100, updated: '2023-10-11' }
];

let currentPage = 1;
const itemsPerPage = 5;
let filteredWorkflows = [...mockWorkflows];

// Initialize workflows table
function initWorkflows() {
    renderWorkflowsTable();
    updatePagination();
}

// Render workflows table
function renderWorkflowsTable() {
    const tbody = document.getElementById('workflowsTableBody');
    const emptyState = document.getElementById('emptyState');
    
    if (!tbody) return;
    
    // Clear current table content
    tbody.innerHTML = '';
    
    // Calculate start and end index for current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageWorkflows = filteredWorkflows.slice(startIndex, endIndex);
    
    if (pageWorkflows.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; padding: 40px;">
                    No workflows found. Try adjusting your filters.
                </td>
            </tr>
        `;
        
        if (emptyState) {
            emptyState.style.display = 'block';
        }
        return;
    }
    
    if (emptyState) {
        emptyState.style.display = 'none';
    }
    
    // Add workflow rows
    pageWorkflows.forEach(workflow => {
        const row = document.createElement('tr');
        
        // Format date
        const updatedDate = new Date(workflow.updated);
        const formattedDate = updatedDate.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
        
        // Status badge class
        let statusClass = '';
        switch(workflow.status) {
            case 'active': statusClass = 'status-active'; break;
            case 'paused': statusClass = 'status-paused'; break;
            case 'completed': statusClass = 'status-completed'; break;
        }
        
        row.innerHTML = `
            <td>
                <strong>${workflow.name}</strong>
                <br>
                <small class="text-muted">ID: WF-${workflow.id.toString().padStart(3, '0')}</small>
            </td>
            <td>
                <span class="badge">${workflow.category}</span>
            </td>
            <td>
                <span class="status-badge ${statusClass}">${workflow.status}</span>
            </td>
            <td>
                <div class="progress-label">
                    <span>${workflow.progress}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${workflow.progress}%"></div>
                </div>
            </td>
            <td>${formattedDate}</td>
            <td>
                <div class="table-actions">
                    <a href="workflow-detail.html?id=${workflow.id}" class="btn-icon" title="Edit">
                        <i class="fas fa-edit"></i>
                    </a>
                    <button class="btn-icon" title="Duplicate">
                        <i class="fas fa-copy"></i>
                    </button>
                    <button class="btn-icon btn-danger delete-workflow" data-id="${workflow.id}" data-name="${workflow.name}" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        
        tbody.appendChild(row);
    });
    
    // Add event listeners to delete buttons
    document.querySelectorAll('.delete-workflow').forEach(button => {
        button.addEventListener('click', function() {
            const workflowId = this.getAttribute('data-id');
            const workflowName = this.getAttribute('data-name');
            openDeleteModal(workflowId, workflowName);
        });
    });
}

// Filter workflows based on search and filters
function filterWorkflows() {
    const searchTerm = document.getElementById('searchWorkflows')?.value.toLowerCase() || '';
    const statusFilter = document.getElementById('filterStatus')?.value || 'all';
    const categoryFilter = document.getElementById('filterCategory')?.value || 'all';
    
    filteredWorkflows = mockWorkflows.filter(workflow => {
        // Search filter
        const matchesSearch = workflow.name.toLowerCase().includes(searchTerm) ||
                            workflow.category.toLowerCase().includes(searchTerm);
        
        // Status filter
        const matchesStatus = statusFilter === 'all' || workflow.status === statusFilter;
        
        // Category filter
        const matchesCategory = categoryFilter === 'all' || workflow.category === categoryFilter;
        
        return matchesSearch && matchesStatus && matchesCategory;
    });
    
    // Reset to first page when filtering
    currentPage = 1;
    renderWorkflowsTable();
    updatePagination();
}

// Pagination functions
function goToPrevPage() {
    if (currentPage > 1) {
        currentPage--;
        renderWorkflowsTable();
        updatePagination();
    }
}

function goToNextPage() {
    const totalPages = Math.ceil(filteredWorkflows.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        renderWorkflowsTable();
        updatePagination();
    }
}

function updatePagination() {
    const totalPages = Math.ceil(filteredWorkflows.length / itemsPerPage);
    const pageNumbers = document.querySelector('.page-numbers');
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');
    
    if (pageNumbers) {
        pageNumbers.innerHTML = '';
        
        for (let i = 1; i <= totalPages && i <= 3; i++) {
            const pageSpan = document.createElement('span');
            pageSpan.textContent = i;
            if (i === currentPage) {
                pageSpan.className = 'page-active';
            }
            pageSpan.addEventListener('click', function() {
                currentPage = i;
                renderWorkflowsTable();
                updatePagination();
            });
            pageNumbers.appendChild(pageSpan);
        }
    }
    
    if (prevBtn) {
        prevBtn.disabled = currentPage === 1;
    }
    
    if (nextBtn) {
        nextBtn.disabled = currentPage === totalPages;
    }
}

// Modal functionality
function initModals() {
    const deleteModal = document.getElementById('deleteModal');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    
    // Close modal when clicking X or cancel
    closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            deleteModal.classList.remove('active');
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === deleteModal) {
            deleteModal.classList.remove('active');
        }
    });
    
    // Confirm delete button
    const confirmDeleteBtn = document.getElementById('confirmDelete');
    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener('click', function() {
            const workflowId = this.getAttribute('data-workflow-id');
            deleteWorkflow(workflowId);
            deleteModal.classList.remove('active');
        });
    }
}

function openDeleteModal(workflowId, workflowName) {
    const deleteModal = document.getElementById('deleteModal');
    const workflowToDelete = document.getElementById('workflowToDelete');
    const confirmDeleteBtn = document.getElementById('confirmDelete');
    
    if (workflowToDelete) {
        workflowToDelete.textContent = workflowName;
    }
    
    if (confirmDeleteBtn) {
        confirmDeleteBtn.setAttribute('data-workflow-id', workflowId);
    }
    
    if (deleteModal) {
        deleteModal.classList.add('active');
    }
}

function deleteWorkflow(workflowId) {
    // In a real app, you would make an API call here
    console.log('Deleting workflow with ID:', workflowId);
    
    // Remove from mock data
    const index = mockWorkflows.findIndex(w => w.id.toString() === workflowId);
    if (index !== -1) {
        mockWorkflows.splice(index, 1);
    }
    
    // Re-filter and render
    filterWorkflows();
    
    // Show success message (in a real app, this would be more elegant)
    alert(`Workflow deleted successfully!`);
}