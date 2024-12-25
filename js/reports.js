// Reports page functionality
class ReportsManager {
    constructor() {
        this.searchInput = document.getElementById('searchInput');
        this.categoryFilter = document.getElementById('categoryFilter');
        this.sortSelect = document.getElementById('sortBy');
        this.reportsList = document.querySelector('.reports-list');
        this.loadReports();
        this.setupEventListeners();
    }

    createReportLink(report) {
        const reportPath = report.reportPath.split('/').pop(); // Get just the filename
        return `
            <a href="reports/report-frame.html?report=V2/${reportPath}" class="report-link" data-category="${report.category}">
                <h3>${report.name}</h3>
                <div class="report-meta">
                    <span class="version">${report.version}</span>
                    <span class="species">${report.species}</span>
                    <span class="updated">Updated: ${report.updated}</span>
                </div>
            </a>
        `;
    }

    loadReports() {
        if (!siteConfig.allReports) return;
        const reportsList = document.createElement('div');
        reportsList.innerHTML = `
            <h3>All Available Reports</h3>
            ${siteConfig.allReports.map(report => this.createReportLink(report)).join('')}
        `;
        this.reportsList.appendChild(reportsList);
    }

    setupEventListeners() {
        if (this.searchInput) {
            this.searchInput.addEventListener('input', () => this.filterReports());
        }
        if (this.categoryFilter) {
            this.categoryFilter.addEventListener('change', () => this.filterReports());
        }
        if (this.sortSelect) {
            this.sortSelect.addEventListener('change', () => this.filterReports());
        }
    }

    filterReports() {
        const searchTerm = this.searchInput.value.toLowerCase();
        const category = this.categoryFilter.value;
        const sortBy = this.sortSelect.value;

        const reportLinks = document.querySelectorAll('.report-link');
        reportLinks.forEach(link => {
            const text = link.textContent.toLowerCase();
            const cardCategory = link.dataset.category;
            const matchesSearch = text.includes(searchTerm);
            const matchesCategory = !category || cardCategory === category;
            link.style.display = matchesSearch && matchesCategory ? '' : 'none';
        });
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    new ReportsManager();
}); 