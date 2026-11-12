// Analytics page functionality
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
    
    // Initialize analytics
    initAnalytics();
    
    
document.addEventListener('DOMContentLoaded', function() {
    // Initialize analytics
    initAnalytics();
    
    // Date range functionality
    const dateRangeSelect = document.getElementById('dateRange');
    if (dateRangeSelect) {
        dateRangeSelect.addEventListener('change', function() {
            if (this.value === 'custom') {
                document.getElementById('customDateRange').style.display = 'flex';
            } else {
                document.getElementById('customDateRange').style.display = 'none';
                updateAnalytics();
            }
        });
    }
    
    // Custom date range apply button
    const applyCustomRangeBtn = document.getElementById('applyCustomRange');
    if (applyCustomRangeBtn) {
        applyCustomRangeBtn.addEventListener('click', function() {
            const startDate = document.getElementById('startDate').value;
            const endDate = document.getElementById('endDate').value;
            
            if (!startDate || !endDate) {
                alert('Please select both start and end dates');
                return;
            }
            
            updateAnalytics();
        });
    }
    
    // Chart type selection
    const chartTypeSelect = document.getElementById('chartType');
    if (chartTypeSelect) {
        chartTypeSelect.addEventListener('change', updateAnalytics);
    }
    
    // Toggle chart/table view
    const toggleViewBtn = document.getElementById('toggleChartView');
    if (toggleViewBtn) {
        toggleViewBtn.addEventListener('click', function() {
            const chartContainer = document.getElementById('categoryChartContainer');
            const tableContainer = document.getElementById('categoryTableContainer');
            const icon = this.querySelector('i');
            
            if (chartContainer.style.display === 'none') {
                // Switch to chart view
                chartContainer.style.display = 'block';
                tableContainer.style.display = 'none';
                this.innerHTML = '<i class="fas fa-exchange-alt"></i> Switch to Table View';
                this.querySelector('span').textContent = 'Switch to Table View';
            } else {
                // Switch to table view
                chartContainer.style.display = 'none';
                tableContainer.style.display = 'block';
                this.innerHTML = '<i class="fas fa-exchange-alt"></i> Switch to Chart View';
                this.querySelector('span').textContent = 'Switch to Chart View';
            }
        });
    }
    
    // Export functionality
    const exportBtn = document.getElementById('exportAnalyticsBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', function() {
            openExportModal();
        });
    }
    
    // Modal functionality
    initAnalyticsModals();
    
    console.log('Analytics page loaded');
});

// Initialize analytics
function initAnalytics() {
    renderCharts();
    updateMetrics();
    renderCategoryTable();
}

// Update analytics based on filters
function updateAnalytics() {
    renderCharts();
    updateMetrics();
    renderCategoryTable();
}

// Render all charts
function renderCharts() {
    renderCompletionTrendChart();
    renderWorkflowDistributionChart();
    renderCategoryPerformanceChart();
}

// Update metrics display
function updateMetrics() {
    // These would normally come from an API
    // For demo, we'll use mock data
    document.getElementById('totalWorkflows').textContent = '12';
    document.getElementById('completionRate').textContent = '78%';
    document.getElementById('avgCompletionTime').textContent = '3.2';
    document.getElementById('bottleneckCount').textContent = '4';
}

// Render completion trend chart
function renderCompletionTrendChart() {
    const chartContainer = document.getElementById('completionTrendChart');
    if (!chartContainer) return;
    
    // Mock data for the last 7 days
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const completedData = [12, 19, 15, 25, 22, 18, 24];
    const inProgressData = [8, 12, 10, 15, 18, 14, 10];
    
    // Find max value for scaling
    const maxValue = Math.max(...completedData, ...inProgressData);
    
    let chartHTML = '<div class="chart-labels">';
    
    // Create bars
    for (let i = 0; i < days.length; i++) {
        const completedHeight = (completedData[i] / maxValue) * 100;
        const inProgressHeight = (inProgressData[i] / maxValue) * 100;
        
        chartHTML += `
            <div class="chart-bar-group">
                <div class="chart-bar-label">${days[i]}</div>
                <div class="chart-bars">
                    <div class="chart-bar completed" style="height: ${completedHeight}%" title="Completed: ${completedData[i]}"></div>
                    <div class="chart-bar in-progress" style="height: ${inProgressHeight}%" title="In Progress: ${inProgressData[i]}"></div>
                </div>
            </div>
        `;
    }
    
    chartHTML += '</div>';
    chartContainer.innerHTML = chartHTML;
}

// Render workflow distribution chart
function renderWorkflowDistributionChart() {
    const chartContainer = document.getElementById('workflowDistributionChart');
    const legendContainer = document.getElementById('pieLegend');
    
    if (!chartContainer || !legendContainer) return;
    
    // Mock data
    const categories = [
        { name: 'Approval', value: 35, color: '#4a6bff' },
        { name: 'Onboarding', value: 25, color: '#28a745' },
        { name: 'Processing', value: 20, color: '#ffc107' },
        { name: 'Review', value: 15, color: '#fd7e14' },
        { name: 'Notification', value: 5, color: '#dc3545' }
    ];
    
    // Create pie chart using conic-gradient
    let gradientString = 'conic-gradient(';
    let accumulatedPercent = 0;
    
    categories.forEach((cat, index) => {
        const percent = cat.value;
        const startPercent = accumulatedPercent;
        const endPercent = startPercent + percent;
        
        gradientString += `${cat.color} ${startPercent}% ${endPercent}%`;
        
        if (index < categories.length - 1) {
            gradientString += ', ';
        }
        
        accumulatedPercent = endPercent;
    });
    
    gradientString += ')';
    
    chartContainer.style.background = gradientString;
    chartContainer.style.width = '200px';
    chartContainer.style.height = '200px';
    chartContainer.style.borderRadius = '50%';
    chartContainer.style.margin = '0 auto';
    
    // Create legend
    let legendHTML = '';
    categories.forEach(cat => {
        legendHTML += `
            <div class="legend-item">
                <div class="legend-color" style="background-color: ${cat.color}"></div>
                <div class="legend-text">
                    <span class="legend-name">${cat.name}</span>
                    <span class="legend-value">${cat.value}%</span>
                </div>
            </div>
        `;
    });
    
    legendContainer.innerHTML = legendHTML;
}

// Render category performance chart
function renderCategoryPerformanceChart() {
    const chartContainer = document.getElementById('categoryPerformanceChart');
    if (!chartContainer) return;
    
    // Mock data for 6 months
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const approvalData = [85, 88, 90, 92, 95, 96];
    const onboardingData = [65, 68, 70, 72, 75, 78];
    const processingData = [78, 80, 82, 85, 87, 90];
    
    // Find max value for scaling
    const maxValue = Math.max(...approvalData, ...onboardingData, ...processingData);
    const chartHeight = 150;
    
    let chartHTML = `
        <div class="chart-grid">
            <div class="y-axis">
                <div>100%</div>
                <div>75%</div>
                <div>50%</div>
                <div>25%</div>
                <div>0%</div>
            </div>
            <div class="chart-content">
    `;
    
    // Create grid lines
    for (let i = 0; i < 5; i++) {
        const top = (i * 25);
        chartHTML += `<div class="grid-line" style="top: ${top}%"></div>`;
    }
    
    // Create line paths (simplified with CSS)
    chartHTML += `
                <div class="line-path approval-line"></div>
                <div class="line-path onboarding-line"></div>
                <div class="line-path processing-line"></div>
                
                <div class="data-points">
    `;
    
    // Create data points and month labels
    months.forEach((month, index) => {
        const leftPercent = (index / (months.length - 1)) * 100;
        
        // Data points
        chartHTML += `
            <div class="data-point approval" style="left: ${leftPercent}%; bottom: ${(approvalData[index] / maxValue) * 100}%"></div>
            <div class="data-point onboarding" style="left: ${leftPercent}%; bottom: ${(onboardingData[index] / maxValue) * 100}%"></div>
            <div class="data-point processing" style="left: ${leftPercent}%; bottom: ${(processingData[index] / maxValue) * 100}%"></div>
        `;
        
        // Month labels
        chartHTML += `<div class="month-label" style="left: ${leftPercent}%">${month}</div>`;
    });
    
    chartHTML += `
                </div>
            </div>
        </div>
    `;
    
    chartContainer.innerHTML = chartHTML;
}

// Render category table
function renderCategoryTable() {
    const tableBody = document.getElementById('categoryTableBody');
    if (!tableBody) return;
    
    // Mock data
    const categories = [
        { name: 'Approval', total: 42, avgCompletion: '2.1 days', successRate: '95%', bottlenecks: 1 },
        { name: 'Onboarding', total: 28, avgCompletion: '6.3 days', successRate: '78%', bottlenecks: 3 },
        { name: 'Processing', total: 35, avgCompletion: '4.2 days', successRate: '82%', bottlenecks: 2 },
        { name: 'Review', total: 19, avgCompletion: '3.8 days', successRate: '88%', bottlenecks: 0 },
        { name: 'Notification', total: 15, avgCompletion: '1.5 days', successRate: '98%', bottlenecks: 0 }
    ];
    
    let tableHTML = '';
    
    categories.forEach(cat => {
        // Determine bottleneck status
        let bottleneckClass = '';
        if (cat.bottlenecks === 0) {
            bottleneckClass = 'success';
        } else if (cat.bottlenecks <= 2) {
            bottleneckClass = 'warning';
        } else {
            bottleneckClass = 'danger';
        }
        
        tableHTML += `
            <tr>
                <td><strong>${cat.name}</strong></td>
                <td>${cat.total}</td>
                <td>${cat.avgCompletion}</td>
                <td><span class="status-badge success">${cat.successRate}</span></td>
                <td><span class="status-badge ${bottleneckClass}">${cat.bottlenecks}</span></td>
            </tr>
        `;
    });
    
    tableBody.innerHTML = tableHTML;
}

// Analytics modal functionality
function initAnalyticsModals() {
    const exportModal = document.getElementById('exportModal');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    
    // Close modals
    closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (exportModal) exportModal.classList.remove('active');
        });
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === exportModal) {
            exportModal.classList.remove('active');
        }
    });
    
    // Confirm export button
    const confirmExportBtn = document.getElementById('confirmExport');
    if (confirmExportBtn) {
        confirmExportBtn.addEventListener('click', function() {
            exportAnalytics();
        });
    }
}

// Open export modal
function openExportModal() {
    const modal = document.getElementById('exportModal');
    if (modal) {
        modal.classList.add('active');
    }
}

// Export analytics
function exportAnalytics() {
    // In a real app, this would generate and download a file
    const format = document.querySelector('input[name="exportFormat"]:checked').value;
    
    // Show success message
    alert(`Analytics report exported as ${format.toUpperCase()} format.`);
    
    // Close modal
    const modal = document.getElementById('exportModal');
    if (modal) {
        modal.classList.remove('active');
    }
}
});
