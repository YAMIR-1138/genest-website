class GlossaryManager {
    constructor() {
        this.searchInput = document.getElementById('searchTerms');
        this.terms = document.querySelectorAll('.term-card');
        this.setupSearch();
    }

    setupSearch() {
        this.searchInput.addEventListener('input', () => {
            const searchTerm = this.searchInput.value.toLowerCase();
            
            this.terms.forEach(term => {
                const title = term.querySelector('h3').textContent.toLowerCase();
                const description = term.querySelector('p').textContent.toLowerCase();
                const isMatch = title.includes(searchTerm) || description.includes(searchTerm);
                
                term.style.display = isMatch ? '' : 'none';
                
                // Add highlight if it's a match
                if (isMatch && searchTerm) {
                    this.highlightText(term, searchTerm);
                } else {
                    this.removeHighlight(term);
                }
            });
        });
    }

    highlightText(element, searchTerm) {
        const title = element.querySelector('h3');
        const description = element.querySelector('p');
        
        title.innerHTML = this.getHighlightedText(title.textContent, searchTerm);
        description.innerHTML = this.getHighlightedText(description.textContent, searchTerm);
    }

    removeHighlight(element) {
        const title = element.querySelector('h3');
        const description = element.querySelector('p');
        
        title.innerHTML = title.textContent;
        description.innerHTML = description.textContent;
    }

    getHighlightedText(text, searchTerm) {
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    new GlossaryManager();
}); 