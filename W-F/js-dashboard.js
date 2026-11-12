// Dashboard functionality
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
    
    // Update stats with random data (for demo)
    updateStats();
    
    // Update recent activity time (for demo)
    updateActivityTimes();
    
    // Initialize any dashboard-specific functionality
    console.log('Dashboard loaded');
});

// Function to update stats with random data (for demo)
function updateStats() {
    // This is just for demo - in a real app, you would fetch from an API
    const stats = document.querySelectorAll('.stat-card h3');
    
    if (stats.length > 0) {
        // Update active workflows
        stats[0].textContent = Math.floor(Math.random() * 5) + 10; // 10-15
        
        // Update completed tasks
        stats[1].textContent = Math.floor(Math.random() * 20) + 40; // 40-60
        
        // Update pending approvals
        stats[2].textContent = Math.floor(Math.random() * 5) + 5; // 5-10
        
        // Update issues
        stats[3].textContent = Math.floor(Math.random() * 5); // 0-5
    }
}

// Function to update activity times (for demo)
function updateActivityTimes() {
    const activityTimes = document.querySelectorAll('.activity-details small');
    
    if (activityTimes.length > 0) {
        // Just for demo - in a real app, you would use actual timestamps
        const timeAgoOptions = [
            '10 minutes ago',
            '45 minutes ago', 
            '2 hours ago',
            '5 hours ago',
            'Yesterday',
            '2 days ago'
        ];
        
        activityTimes.forEach((timeEl, index) => {
            // Keep first 4 as is, randomize any extras
            if (index >= 4) {
                const randomIndex = Math.floor(Math.random() * timeAgoOptions.length);
                timeEl.textContent = timeAgoOptions[randomIndex];
            }
        });
    }
}
// Dashboard functionality
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
    
    // Set active menu item based on current page
    setActiveMenuItem();
    
    // Update stats with random data (for demo)
    updateStats();
    
    // Update recent activity time (for demo)
    updateActivityTimes();
    
    // Initialize any dashboard-specific functionality
    console.log('Dashboard loaded');
});

// Function to set active menu item based on current page
function setActiveMenuItem() {
    const currentPage = window.location.pathname;
    const menuItems = document.querySelectorAll('.menu-item');
    
    // Remove active class from all menu items
    menuItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active class to current page menu item
    let targetPage = '';
    
    if (currentPage.includes('dashboard.html')) {
        targetPage = 'dashboard.html';
    } else if (currentPage.includes('workflows.html')) {
        targetPage = 'workflows.html';
    } else if (currentPage.includes('tasks.html')) {
        targetPage = 'tasks.html';
    } else if (currentPage.includes('analytics.html')) {
        targetPage = 'analytics.html';
    } else if (currentPage.includes('workflow-detail.html')) {
        targetPage = 'workflow-detail.html';
    } else if (currentPage.includes('team.html')) {
        targetPage = 'team.html';
    } else if (currentPage.includes('automations.html')) {
        targetPage = 'automations.html';
    } else if (currentPage.includes('settings.html')) {
        targetPage = 'settings.html';
    } else if (currentPage.includes('help.html')) {
        targetPage = 'help.html';
    }
    
    // Find and activate the correct menu item
    menuItems.forEach(item => {
        if (item.getAttribute('href') === targetPage) {
            item.classList.add('active');
        }
    });
}

// Function to update stats with random data (for demo)
function updateStats() {
    // Only run on dashboard page
    if (!window.location.pathname.includes('dashboard.html')) return;
    
    const stats = document.querySelectorAll('.stat-card h3');
    
    if (stats.length > 0) {
        // Update active workflows
        stats[0].textContent = Math.floor(Math.random() * 5) + 10; // 10-15
        
        // Update completed tasks
        stats[1].textContent = Math.floor(Math.random() * 20) + 40; // 40-60
        
        // Update pending approvals
        stats[2].textContent = Math.floor(Math.random() * 5) + 5; // 5-10
        
        // Update issues
        stats[3].textContent = Math.floor(Math.random() * 5); // 0-5
    }
}

// Function to update activity times (for demo)
function updateActivityTimes() {
    // Only run on dashboard page
    if (!window.location.pathname.includes('dashboard.html')) return;
    
    const activityTimes = document.querySelectorAll('.activity-details small');
    
    if (activityTimes.length > 0) {
        // Just for demo - in a real app, you would use actual timestamps
        const timeAgoOptions = [
            '10 minutes ago',
            '45 minutes ago', 
            '2 hours ago',
            '5 hours ago',
            'Yesterday',
            '2 days ago'
        ];
        
        activityTimes.forEach((timeEl, index) => {
            // Keep first 4 as is, randomize any extras
            if (index >= 4) {
                const randomIndex = Math.floor(Math.random() * timeAgoOptions.length);
                timeEl.textContent = timeAgoOptions[randomIndex];
            }
        });
    }
}