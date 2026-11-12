// Workflow detail functionality
document.addEventListener('DOMContentLoaded', function() {
    // Sidebar toggle for mobile
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }
    
    // Check if we're editing an existing workflow
    const urlParams = new URLSearchParams(window.location.search);
    const workflowId = urlParams.get('id');
    
    if (workflowId) {
        // We're in edit mode
        loadWorkflowForEditing(workflowId);
    } else {
        // We're in create mode
        document.querySelector('h1').textContent = 'Create New Workflow';
    }
    
    // Add step button
    const addStepBtn = document.getElementById('addStepBtn');
    if (addStepBtn) {
        addStepBtn.addEventListener('click', addNewStep);
    }
    
    // Form submission
    const workflowForm = document.getElementById('workflowForm');
    if (workflowForm) {
        workflowForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Cancel button
    const cancelBtn = document.getElementById('cancelBtn');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
                window.location.href = 'workflows.html';
            }
        });
    }
    
    // Save draft button
    const saveDraftBtn = document.getElementById('saveDraftBtn');
    if (saveDraftBtn) {
        saveDraftBtn.addEventListener('click', function() {
            saveWorkflowAsDraft();
        });
    }
    
    // Modal functionality
    initModals();
    
    console.log('Workflow detail page loaded');
});

// Load workflow data for editing
function loadWorkflowForEditing(workflowId) {
    // In a real app, you would fetch from an API
    // For demo, we'll use mock data
    console.log('Loading workflow for editing:', workflowId);
    
    // Update page title
    document.querySelector('h1').textContent = 'Edit Workflow';
    
    // Update form values with mock data
    document.getElementById('workflowName').value = 'Client Onboarding Process';
    document.getElementById('workflowCategory').value = 'onboarding';
    document.getElementById('workflowDescription').value = 'Complete workflow for onboarding new clients including document collection, account setup, and initial training.';
    document.getElementById('workflowOwner').value = '1';
    document.getElementById('workflowPriority').value = 'high';
    
    // Update steps (in a real app, you would load actual steps)
    const stepsContainer = document.getElementById('stepsContainer');
    if (stepsContainer) {
        stepsContainer.innerHTML = '';
        
        const steps = [
            { title: 'Initial Contact', description: 'Collect basic client information and requirements', assignee: '1' },
            { title: 'Document Collection', description: 'Gather all necessary documents from client', assignee: '2' },
            { title: 'Account Setup', description: 'Create user accounts and access permissions', assignee: '3' },
            { title: 'Training Session', description: 'Conduct initial training with client team', assignee: '1' },
            { title: 'Final Review', description: 'Review all setup and confirm completion', assignee: '4' }
        ];
        
        steps.forEach((step, index) => {
            addStepToContainer(step.title, step.description, step.assignee, index + 1);
        });
    }
}

// Add a new step to the workflow
function addNewStep() {
    const stepsContainer = document.getElementById('stepsContainer');
    if (!stepsContainer) return;
    
    const stepCount = stepsContainer.querySelectorAll('.step-item').length;
    addStepToContainer('', '', '1', stepCount + 1);
}

// Add step to container
function addStepToContainer(title, description, assignee, stepNumber) {
    const stepsContainer = document.getElementById('stepsContainer');
    if (!stepsContainer) return;
    
    const stepItem = document.createElement('div');
    stepItem.className = 'step-item';
    stepItem.innerHTML = `
        <div class="step-header">
            <span class="step-number">${stepNumber}</span>
            <input type="text" class="step-title" placeholder="Step title" value="${title}">
            <button type="button" class="btn-icon btn-danger remove-step">
                <i class="fas fa-trash"></i>
            </button>
        </div>
        <textarea class="step-description" placeholder="Step description">${description}</textarea>
        <div class="step-assignee">
            <label>Assignee:</label>
            <select>
                <option value="1" ${assignee === '1' ? 'selected' : ''}>John Doe</option>
                <option value="2" ${assignee === '2' ? 'selected' : ''}>Jane Smith</option>
                <option value="3" ${assignee === '3' ? 'selected' : ''}>Robert Johnson</option>
                <option value="4" ${assignee === '4' ? 'selected' : ''}>Sarah Williams</option>
            </select>
        </div>
    `;
    
    stepsContainer.appendChild(stepItem);
    
    // Add event listener to remove button
    const removeBtn = stepItem.querySelector('.remove-step');
    if (removeBtn) {
        removeBtn.addEventListener('click', function() {
            if (stepsContainer.querySelectorAll('.step-item').length > 1) {
                stepItem.remove();
                updateStepNumbers();
            } else {
                alert('A workflow must have at least one step.');
            }
        });
    }
}

// Update step numbers after removing a step
function updateStepNumbers() {
    const steps = document.querySelectorAll('.step-item');
    steps.forEach((step, index) => {
        const stepNumber = step.querySelector('.step-number');
        if (stepNumber) {
            stepNumber.textContent = index + 1;
        }
    });
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Get form values
    const workflowName = document.getElementById('workflowName').value;
    const workflowCategory = document.getElementById('workflowCategory').value;
    const workflowOwner = document.getElementById('workflowOwner').value;
    
    // Simple validation
    if (!workflowName || !workflowCategory || !workflowOwner) {
        alert('Please fill in all required fields (marked with *)');
        return;
    }
    
    // Get steps
    const steps = [];
    document.querySelectorAll('.step-item').forEach((stepItem, index) => {
        const title = stepItem.querySelector('.step-title').value;
        const description = stepItem.querySelector('.step-description').value;
        const assignee = stepItem.querySelector('select').value;
        
        if (title) {
            steps.push({
                step: index + 1,
                title: title,
                description: description,
                assignee: assignee
            });
        }
    });
    
    if (steps.length === 0) {
        alert('Please add at least one step to the workflow.');
        return;
    }
    
    // In a real app, you would send this data to an API
    console.log('Workflow saved:', {
        name: workflowName,
        category: workflowCategory,
        owner: workflowOwner,
        steps: steps
    });
    
    // Show success modal
    const successModal = document.getElementById('successModal');
    if (successModal) {
        successModal.classList.add('active');
    }
}

// Save workflow as draft
function saveWorkflowAsDraft() {
    const workflowName = document.getElementById('workflowName').value || 'Untitled Workflow';
    
    // In a real app, you would save to an API
    console.log('Workflow saved as draft:', workflowName);
    
    // Show confirmation
    alert(`"${workflowName}" has been saved as a draft.`);
}

// Modal functionality
function initModals() {
    const successModal = document.getElementById('successModal');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    
    // Close modal when clicking X or cancel
    closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (successModal) successModal.classList.remove('active');
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (successModal && e.target === successModal) {
            successModal.classList.remove('active');
        }
    });
}