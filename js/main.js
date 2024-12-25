// Main page functionality
function createFeaturedReports() {
    const container = document.querySelector('.featured-reports');
    if (!container) return;

    // Clear existing content
    container.innerHTML = '';

    // Take first 3 reports from config
    const featuredReports = siteConfig.allReports.slice(0, 3);
    
    featuredReports.forEach(report => {
        const reportPath = report.reportPath.split('/').pop(); // Get just the filename
        container.innerHTML += `
            <a href="reports/report-frame.html?report=V2/${reportPath}" class="report-button">
                <img src="${report.icon}" alt="${report.name} icon" class="organism-icon">
                <span>${report.name}</span>
                <div class="report-info">${report.species}</div>
            </a>
        `;
    });
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    createFeaturedReports();
}); 