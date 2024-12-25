class EnsemblAPI {
    static async getSpecies() {
        try {
            const response = await fetch('https://rest.ensembl.org/info/species?content-type=application/json');
            const data = await response.json();
            return data.species;
        } catch (error) {
            console.error('Error fetching species:', error);
            return [];
        }
    }

    static async getAssembly(species) {
        try {
            const response = await fetch(`https://rest.ensembl.org/info/assembly/${species}?content-type=application/json`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching assembly:', error);
            return null;
        }
    }
}

// Handle form submission
function submitRequest(event) {
    event.preventDefault();
    const species = document.getElementById('species').value;
    const assembly = document.getElementById('assembly').value;
    const email = document.getElementById('email').value;

    // Here you would typically send this data to your backend
    console.log('Request submitted:', { species, assembly, email });
    alert('Thank you for your request. You will receive an email when your report is ready.');
} 