class SpeciesHandler {
    static async loadSpeciesData() {
        try {
            const response = await fetch('Species.csv');
            const csvText = await response.text();
            return this.parseCSV(csvText);
        } catch (error) {
            console.error('Error loading species data:', error);
            return [];
        }
    }

    static parseCSV(csvText) {
        const lines = csvText.split('\n');
        const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim());
        
        return lines.slice(1)
            .filter(line => line.trim())
            .map(line => {
                const values = line.split(',').map(v => v.replace(/"/g, '').trim());
                const species = {};
                headers.forEach((header, index) => {
                    species[header] = values[index];
                });
                return species;
            });
    }

    static getAssemblyInfo(species) {
        return {
            assemblyName: species['Ensembl Assembly'],
            accession: species['Accession']
        };
    }
} 