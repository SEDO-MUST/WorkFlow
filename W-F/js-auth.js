// Authentication and login simulation
document.addEventListener('DOMContentLoaded', function() {
    // Login form handling
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const remember = document.getElementById('remember').checked;
            
            // Simple validation
            if (!email || !password) {
                alert('Please enter both email and password');
                return;
            }
            
            // Simulate login process
            console.log('Login attempt:', { email, password, remember });
            
            // For demo purposes, always redirect to dashboard
            // In a real app, you would validate credentials first
            window.location.href = 'dashboard.html';
        });
    }
    
    // Logout button handling
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Confirm logout
            if (confirm('Are you sure you want to logout?')) {
                // Simulate logout process
                console.log('User logged out');
                
                // Redirect to login page
                window.location.href = 'index.html';
            }
        });
    }
    
    // Check if user is logged in (for demo purposes)
    // In a real app, this would check for a valid session/token
    const currentPage = window.location.pathname;
    if (currentPage.includes('dashboard.html') || 
        currentPage.includes('workflows.html') || 
        currentPage.includes('workflow-detail.html')) {
        
        // For demo, we'll assume user is always logged in
        // In a real app, you would redirect to login if not authenticated
        console.log('User authenticated (demo mode)');
    }
});
// Authentication and login simulation
document.addEventListener('DOMContentLoaded', function() {
    // Login form handling
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const remember = document.getElementById('remember').checked;
            
            // Simple validation
            if (!email || !password) {
                alert('Please enter both email and password');
                return;
            }
            
            // Simulate login process
            console.log('Login attempt:', { email, password, remember });
            
            // For demo purposes, always redirect to dashboard
            window.location.href = 'dashboard.html';
        });
    }
    
    // Logout button handling (works on all pages)
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Confirm logout
            if (confirm('Are you sure you want to logout?')) {
                // Simulate logout process
                console.log('User logged out');
                
                // Redirect to login page
                window.location.href = 'index.html';
            }
        });
    }
    
    // Check if user is logged in (for demo purposes)
    // In a real app, this would check for a valid session/token
    const currentPage = window.location.pathname;
    const protectedPages = [
        'dashboard.html',
        'workflows.html', 
        'workflow-detail.html',
        'tasks.html',
        'analytics.html',
        'team.html',
        'automations.html',
        'settings.html',
        'help.html'
    ];
    
    const isProtectedPage = protectedPages.some(page => currentPage.includes(page));
    
    if (isProtectedPage) {
        // For demo, we'll assume user is always logged in
        // In a real app, you would redirect to login if not authenticated
        console.log('User authenticated (demo mode)');
    }
});