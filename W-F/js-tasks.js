// Tasks page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Sidebar toggle for mobile
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 992) {
            if (sidebar && sidebar.classList.contains('active') && 
                !sidebar.contains(e.target) && 
                e.target !== sidebarToggle && 
                !sidebarToggle.contains(e.target)) {
                sidebar.classList.remove('active');
            }
        }
    });
    
    // Initialize tasks
    initTasks();
    
  document.addEventListener('DOMContentLoaded', function() {
    // Initialize tasks
    initTasks();
    
    // Add task button
    const addTaskBtn = document.getElementById('addTaskBtn');
    if (addTaskBtn) {
        addTaskBtn.addEventListener('click', function() {
            openTaskModal();
        });
    }
    
    // Search functionality
    const searchInput = document.getElementById('taskSearch');
    if (searchInput) {
        searchInput.addEventListener('input', filterTasks);
    }
    
    // Filter functionality
    const filterPriority = document.getElementById('filterPriority');
    const filterStatus = document.getElementById('filterStatus');
    const filterDueDate = document.getElementById('filterDueDate');
    
    if (filterPriority) filterPriority.addEventListener('change', filterTasks);
    if (filterStatus) filterStatus.addEventListener('change', filterTasks);
    if (filterDueDate) filterDueDate.addEventListener('change', filterTasks);
    
    // Clear filters
    const clearFiltersBtn = document.getElementById('clearTaskFilters');
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', function() {
            if (searchInput) searchInput.value = '';
            if (filterPriority) filterPriority.value = 'all';
            if (filterStatus) filterStatus.value = 'all';
            if (filterDueDate) filterDueDate.value = 'all';
            filterTasks();
        });
    }
    
    // Sort functionality
    const sortSelect = document.getElementById('sortTasks');
    if (sortSelect) {
        sortSelect.addEventListener('change', sortTasks);
    }
    
    // Modal functionality
    initTaskModals();
    
    console.log('Tasks page loaded');
});

// Mock tasks data
let tasks = [
    { id: 1, title: 'Review client documents', description: 'Check all client documents for completeness', priority: 'high', status: 'pending', dueDate: '2023-10-20', category: 'workflow', assignee: '1', completed: false },
    { id: 2, title: 'Prepare onboarding presentation', description: 'Create slides for new client onboarding', priority: 'medium', status: 'in-progress', dueDate: '2023-10-22', category: 'meeting', assignee: '1', completed: false },
    { id: 3, title: 'Update workflow documentation', description: 'Document changes to approval process', priority: 'low', status: 'completed', dueDate: '2023-10-15', category: 'documentation', assignee: '1', completed: true },
    { id: 4, title: 'Budget approval meeting', description: 'Meet with finance team for Q4 budget approval', priority: 'critical', status: 'pending', dueDate: '2023-10-18', category: 'meeting', assignee: '1', completed: false },
    { id: 5, title: 'Test new automation rule', description: 'Verify new email notification automation works correctly', priority: 'medium', status: 'completed', dueDate: '2023-10-16', category: 'development', assignee: '1', completed: true },
    { id: 6, title: 'Follow up with vendor', description: 'Check status of pending invoice from vendor', priority: 'medium', status: 'pending', dueDate: '2023-10-17', category: 'general', assignee: '1', completed: false },
    { id: 7, title: 'Team performance review', description: 'Compile monthly performance metrics for team', priority: 'high', status: 'in-progress', dueDate: '2023-10-25', category: 'general', assignee: '1', completed: false }
];

let filteredTasks = [...tasks];

// Initialize tasks
function initTasks() {
    renderTasks();
    updateTaskStats();
}

// Render tasks list
function renderTasks() {
    const taskList = document.getElementById('taskList');
    const emptyState = document.getElementById('emptyTaskState');
    
    if (!taskList) return;
    
    // Clear current list
    taskList.innerHTML = '';
    
    if (filteredTasks.length === 0) {
        if (emptyState) {
            emptyState.style.display = 'block';
        }
        return;
    }
    
    if (emptyState) {
        emptyState.style.display = 'none';
    }
    
    // Add task cards
    filteredTasks.forEach(task => {
        const taskCard = createTaskCard(task);
        taskList.appendChild(taskCard);
    });
    
    // Update task count badge
    const taskCount = document.getElementById('taskCount');
    if (taskCount) {
        const pendingTasks = tasks.filter(t => !t.completed).length;
        taskCount.textContent = pendingTasks;
    }
}

// Create task card HTML
function createTaskCard(task) {
    const taskCard = document.createElement('div');
    taskCard.className = 'task-card';
    taskCard.dataset.id = task.id;
    
    // Priority color
    let priorityColor = '';
    let priorityIcon = '';
    switch(task.priority) {
        case 'low': priorityColor = '#28a745'; priorityIcon = 'arrow-down'; break;
        case 'medium': priorityColor = '#ffc107'; priorityIcon = 'minus'; break;
        case 'high': priorityColor = '#fd7e14'; priorityIcon = 'arrow-up'; break;
        case 'critical': priorityColor = '#dc3545'; priorityIcon = 'exclamation'; break;
    }
    
    // Status color
    let statusColor = '';
    switch(task.status) {
        case 'pending': statusColor = '#6c757d'; break;
        case 'in-progress': statusColor = '#17a2b8'; break;
        case 'completed': statusColor = '#28a745'; break;
    }
    
    // Format date
    const dueDate = new Date(task.dueDate);
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    
    let dueDateClass = '';
    let dueDateText = dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    
    if (task.completed) {
        dueDateClass = 'completed';
    } else if (dueDate < today) {
        dueDateClass = 'overdue';
        dueDateText += ' (Overdue)';
    } else if (dueDate.toDateString() === today.toDateString()) {
        dueDateClass = 'today';
        dueDateText += ' (Today)';
    } else if (dueDate.toDateString() === tomorrow.toDateString()) {
        dueDateClass = 'tomorrow';
        dueDateText += ' (Tomorrow)';
    }
    
    // Category icon
    let categoryIcon = 'fa-tasks';
    switch(task.category) {
        case 'meeting': categoryIcon = 'fa-calendar-alt'; break;
        case 'documentation': categoryIcon = 'fa-file-alt'; break;
        case 'development': categoryIcon = 'fa-code'; break;
        case 'workflow': categoryIcon = 'fa-project-diagram'; break;
    }
    
    taskCard.innerHTML = `
        <div class="task-checkbox">
            <label class="checkbox">
                <input type="checkbox" ${task.completed ? 'checked' : ''} data-id="${task.id}">
                <span class="checkmark"></span>
            </label>
        </div>
        
        <div class="task-content">
            <div class="task-header">
                <h4 class="task-title ${task.completed ? 'completed' : ''}">${task.title}</h4>
                <div class="task-meta">
                    <span class="task-priority" style="color: ${priorityColor}">
                        <i class="fas fa-${priorityIcon}"></i> ${task.priority}
                    </span>
                    <span class="task-status" style="color: ${statusColor}">
                        ${task.status}
                    </span>
                </div>
            </div>
            
            <p class="task-description">${task.description}</p>
            
            <div class="task-footer">
                <div class="task-info">
                    <span class="task-category">
                        <i class="fas ${categoryIcon}"></i> ${task.category}
                    </span>
                    <span class="task-due ${dueDateClass}">
                        <i class="far fa-calendar-alt"></i> ${dueDateText}
                    </span>
                </div>
                
                <div class="task-actions">
                    <button class="btn-icon edit-task" data-id="${task.id}" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon delete-task" data-id="${task.id}" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Add event listeners
    const checkbox = taskCard.querySelector('input[type="checkbox"]');
    if (checkbox) {
        checkbox.addEventListener('change', function() {
            toggleTaskComplete(this.dataset.id);
        });
    }
    
    const editBtn = taskCard.querySelector('.edit-task');
    if (editBtn) {
        editBtn.addEventListener('click', function() {
            openTaskModal(this.dataset.id);
        });
    }
    
    const deleteBtn = taskCard.querySelector('.delete-task');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', function() {
            openDeleteModal(this.dataset.id);
        });
    }
    
    return taskCard;
}

// Filter tasks
function filterTasks() {
    const searchTerm = document.getElementById('taskSearch')?.value.toLowerCase() || '';
    const priorityFilter = document.getElementById('filterPriority')?.value || 'all';
    const statusFilter = document.getElementById('filterStatus')?.value || 'all';
    const dueDateFilter = document.getElementById('filterDueDate')?.value || 'all';
    
    filteredTasks = tasks.filter(task => {
        // Search filter
        const matchesSearch = task.title.toLowerCase().includes(searchTerm) ||
                            task.description.toLowerCase().includes(searchTerm) ||
                            task.category.toLowerCase().includes(searchTerm);
        
        // Priority filter
        const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
        
        // Status filter
        const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
        
        // Due date filter
        let matchesDueDate = true;
        if (dueDateFilter !== 'all') {
            const dueDate = new Date(task.dueDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            switch(dueDateFilter) {
                case 'today':
                    matchesDueDate = dueDate.toDateString() === today.toDateString();
                    break;
                case 'tomorrow':
                    const tomorrow = new Date(today);
                    tomorrow.setDate(today.getDate() + 1);
                    matchesDueDate = dueDate.toDateString() === tomorrow.toDateString();
                    break;
                case 'week':
                    const nextWeek = new Date(today);
                    nextWeek.setDate(today.getDate() + 7);
                    matchesDueDate = dueDate >= today && dueDate <= nextWeek;
                    break;
                case 'overdue':
                    matchesDueDate = dueDate < today && !task.completed;
                    break;
            }
        }
        
        return matchesSearch && matchesPriority && matchesStatus && matchesDueDate;
    });
    
    sortTasks();
    renderTasks();
    updateTaskStats();
}

// Sort tasks
function sortTasks() {
    const sortBy = document.getElementById('sortTasks')?.value || 'due-date';
    
    filteredTasks.sort((a, b) => {
        switch(sortBy) {
            case 'priority':
                const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
                return priorityOrder[a.priority] - priorityOrder[b.priority];
            
            case 'status':
                const statusOrder = { 'in-progress': 0, pending: 1, completed: 2 };
                return statusOrder[a.status] - statusOrder[b.status];
            
            case 'title':
                return a.title.localeCompare(b.title);
            
            case 'due-date':
            default:
                return new Date(a.dueDate) - new Date(b.dueDate);
        }
    });
    
    renderTasks();
}

// Toggle task completion
function toggleTaskComplete(taskId) {
    const taskIndex = tasks.findIndex(t => t.id.toString() === taskId);
    if (taskIndex !== -1) {
        tasks[taskIndex].completed = !tasks[taskIndex].completed;
        tasks[taskIndex].status = tasks[taskIndex].completed ? 'completed' : 'pending';
        
        // Update filtered tasks
        const filteredIndex = filteredTasks.findIndex(t => t.id.toString() === taskId);
        if (filteredIndex !== -1) {
            filteredTasks[filteredIndex] = {...tasks[taskIndex]};
        }
        
        renderTasks();
        updateTaskStats();
    }
}

// Update task statistics
function updateTaskStats() {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.completed).length;
    const pendingTasks = totalTasks - completedTasks;
    
    // Calculate overdue tasks
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const overdueTasks = tasks.filter(t => {
        const dueDate = new Date(t.dueDate);
        return !t.completed && dueDate < today;
    }).length;
    
    // Update stats
    document.getElementById('totalTasks').textContent = totalTasks;
    document.getElementById('completedTasks').textContent = completedTasks;
    document.getElementById('pendingTasks').textContent = pendingTasks;
    document.getElementById('overdueTasks').textContent = overdueTasks;
    
    // Update progress bar
    const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    document.getElementById('overallProgress').textContent = `${progressPercent}%`;
    document.getElementById('overallProgressBar').style.width = `${progressPercent}%`;
}

// Task modal functionality
function initTaskModals() {
    const taskModal = document.getElementById('taskModal');
    const deleteModal = document.getElementById('deleteTaskModal');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    
    // Close modals
    closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (taskModal) taskModal.classList.remove('active');
            if (deleteModal) deleteModal.classList.remove('active');
            resetTaskForm();
        });
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === taskModal) {
            taskModal.classList.remove('active');
            resetTaskForm();
        }
        if (e.target === deleteModal) {
            deleteModal.classList.remove('active');
        }
    });
    
    // Save task button
    const saveTaskBtn = document.getElementById('saveTaskBtn');
    if (saveTaskBtn) {
        saveTaskBtn.addEventListener('click', saveTask);
    }
    
    // Confirm delete button
    const confirmDeleteBtn = document.getElementById('confirmDeleteTask');
    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener('click', function() {
            const taskId = this.dataset.taskId;
            deleteTask(taskId);
        });
    }
}

// Open task modal for adding/editing
function openTaskModal(taskId = null) {
    const modal = document.getElementById('taskModal');
    const modalTitle = document.getElementById('modalTitle');
    const taskForm = document.getElementById('taskForm');
    
    if (taskId) {
        // Edit mode
        modalTitle.textContent = 'Edit Task';
        
        const task = tasks.find(t => t.id.toString() === taskId);
        if (task) {
            document.getElementById('taskId').value = task.id;
            document.getElementById('taskTitle').value = task.title;
            document.getElementById('taskDescription').value = task.description;
            document.getElementById('taskPriority').value = task.priority;
            document.getElementById('taskStatus').value = task.status;
            document.getElementById('taskDueDate').value = task.dueDate;
            document.getElementById('taskCategory').value = task.category;
            document.getElementById('taskAssignee').value = task.assignee;
        }
    } else {
        // Add mode
        modalTitle.textContent = 'Add New Task';
        resetTaskForm();
        
        // Set default due date to tomorrow
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        document.getElementById('taskDueDate').value = tomorrow.toISOString().split('T')[0];
    }
    
    if (modal) {
        modal.classList.add('active');
    }
}

// Open delete confirmation modal
function openDeleteModal(taskId) {
    const modal = document.getElementById('deleteTaskModal');
    const confirmBtn = document.getElementById('confirmDeleteTask');
    
    if (confirmBtn) {
        confirmBtn.dataset.taskId = taskId;
    }
    
    if (modal) {
        modal.classList.add('active');
    }
}

// Reset task form
function resetTaskForm() {
    document.getElementById('taskId').value = '';
    document.getElementById('taskTitle').value = '';
    document.getElementById('taskDescription').value = '';
    document.getElementById('taskPriority').value = 'medium';
    document.getElementById('taskStatus').value = 'pending';
    document.getElementById('taskDueDate').value = '';
    document.getElementById('taskCategory').value = 'general';
    document.getElementById('taskAssignee').value = '1';
    document.getElementById('taskReminder').checked = false;
}

// Save task (add or update)
function saveTask() {
    const taskId = document.getElementById('taskId').value;
    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDescription').value;
    const priority = document.getElementById('taskPriority').value;
    const status = document.getElementById('taskStatus').value;
    const dueDate = document.getElementById('taskDueDate').value;
    const category = document.getElementById('taskCategory').value;
    const assignee = document.getElementById('taskAssignee').value;
    
    if (!title) {
        alert('Please enter a task title');
        return;
    }
    
    if (taskId) {
        // Update existing task
        const taskIndex = tasks.findIndex(t => t.id.toString() === taskId);
        if (taskIndex !== -1) {
            tasks[taskIndex] = {
                ...tasks[taskIndex],
                title,
                description,
                priority,
                status,
                dueDate,
                category,
                assignee,
                completed: status === 'completed'
            };
        }
    } else {
        // Add new task
        const newTask = {
            id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
            title,
            description,
            priority,
            status,
            dueDate,
            category,
            assignee,
            completed: status === 'completed'
        };
        
        tasks.push(newTask);
    }
    
    // Update filtered tasks and render
    filterTasks();
    
    // Close modal and reset form
    const modal = document.getElementById('taskModal');
    if (modal) {
        modal.classList.remove('active');
    }
    resetTaskForm();
    
    // Show success message
    alert(`Task "${title}" has been ${taskId ? 'updated' : 'added'}.`);
}

// Delete task
function deleteTask(taskId) {
    const taskIndex = tasks.findIndex(t => t.id.toString() === taskId);
    if (taskIndex !== -1) {
        const taskTitle = tasks[taskIndex].title;
        tasks.splice(taskIndex, 1);
        
        // Update filtered tasks and render
        filterTasks();
        
        // Close modal
        const modal = document.getElementById('deleteTaskModal');
        if (modal) {
            modal.classList.remove('active');
        }
        
        // Show success message
        alert(`Task "${taskTitle}" has been deleted.`);
    }
}
});
