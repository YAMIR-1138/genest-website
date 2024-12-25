async function initializeForm() {
    const speciesData = await SpeciesHandler.loadSpeciesData();
    const speciesSelect = document.getElementById('species');
    
    // Sort species by common name
    speciesData.sort((a, b) => a['Common name'].localeCompare(b['Common name']));
    
    // Group species with multiple assemblies
    const speciesMap = new Map();
    speciesData.forEach(species => {
        const key = species['Scientific name'];
        if (!speciesMap.has(key)) {
            speciesMap.set(key, {
                commonName: species['Common name'],
                assemblies: []
            });
        }
        if (species['Ensembl Assembly'] !== '-') {
            speciesMap.get(key).assemblies.push({
                name: species['Ensembl Assembly'],
                accession: species['Accession']
            });
        }
    });

    // Populate species dropdown
    speciesMap.forEach((data, scientificName) => {
        const option = document.createElement('option');
        option.value = scientificName;
        option.textContent = `${data.commonName} (${scientificName})`;
        speciesSelect.appendChild(option);
    });

    // Store species data for assembly lookup
    window.speciesMap = speciesMap;
}

document.getElementById('species').addEventListener('change', function(e) {
    const assemblySelect = document.getElementById('assembly');
    const selectedSpecies = window.speciesMap.get(e.target.value);
    
    assemblySelect.innerHTML = '<option value="">Select an assembly</option>';
    
    if (selectedSpecies && selectedSpecies.assemblies.length > 0) {
        selectedSpecies.assemblies.forEach(assembly => {
            const option = document.createElement('option');
            option.value = assembly.name;
            option.textContent = `${assembly.name} ${assembly.accession ? `(${assembly.accession})` : ''}`;
            assemblySelect.appendChild(option);
        });
        assemblySelect.disabled = false;
    } else {
        assemblySelect.innerHTML = '<option value="">No assembly available</option>';
        assemblySelect.disabled = true;
    }
});

// Handle form submission
function submitRequest(event) {
    event.preventDefault();
    
    const formData = {
        species: document.getElementById('species').value,
        assembly: document.getElementById('assembly').value,
        otherSpecies: document.getElementById('otherSpecies').value,
        otherAssembly: document.getElementById('otherAssembly').value,
        email: document.getElementById('email').value,
        comments: document.getElementById('comments').value
    };

    // Here you would send the data to your backend
    console.log('Request submitted:', formData);
    alert('Thank you for your request. You will receive an email when your report is ready.');
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initializeForm); 