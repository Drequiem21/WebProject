const API_URL = "https://webproject-5rtv.onrender.com";

// Φόρτωση εκθέσεων
export async function fetchExhibitions() {
    try {
        const response = await fetch(`${API_URL}/api/exhibitions`);
        if (!response.ok) throw new Error('Σφάλμα φόρτωσης εκθέσεων');
        const exhibitions = await response.json();
        
        // Ομαδοποίηση εκθέσεων ανά τοποθεσία
        const locationGroups = groupByLocation(exhibitions);
        
        // Ενημέρωση του aside menu με τις τοποθεσίες
        updateLocationMenu(locationGroups);
        
        // Εμφάνιση όλων των εκθέσεων αρχικά
        displayExhibitions(exhibitions);
    } catch (error) {
        console.error('Σφάλμα:', error);
        document.getElementById('content').innerHTML = '<p>Σφάλμα φόρτωσης εκθέσεων</p>';
    }
}

// Φόρτωση συνδέσμων
export async function fetchLinks() {
    try {
        const response = await fetch(`${API_URL}/api/links`);
        if (!response.ok) throw new Error('Σφάλμα φόρτωσης συνδέσμων');
        const links = await response.json();
        
        displayLinks(links);
    } catch (error) {
        console.error('Σφάλμα:', error);
        document.getElementById('content').innerHTML = '<p>Σφάλμα φόρτωσης συνδέσμων</p>';
    }
}

// Ομαδοποίηση εκθέσεων ανά τοποθεσία
function groupByLocation(exhibitions) {
    return exhibitions.reduce((groups, exhibition) => {
        const location = exhibition.location.split(',')[0]; // Παίρνουμε το πρώτο μέρος της τοποθεσίας
        if (!groups[location]) {
            groups[location] = [];
        }
        groups[location].push(exhibition);
        return groups;
    }, {});
}

// Ενημέρωση του μενού τοποθεσιών
function updateLocationMenu(locationGroups) {
    const exhibitionsAside = document.getElementById('aside-exhibitions');
    exhibitionsAside.innerHTML = `
        <ul>
            <li><a href="#" data-location="all" class="location-filter">Όλες οι Εκθέσεις</a></li>
            ${Object.keys(locationGroups).map(location => 
                `<li><a href="#" data-location="${location}" class="location-filter">
                    ${location}
                </a></li>`
            ).join('')}
        </ul>
    `;

    // Προσθήκη event listeners
    document.querySelectorAll('.location-filter').forEach(link => {
        link.addEventListener('click', async (e) => {
            e.preventDefault();
            const location = e.target.dataset.location;
            
            const response = await fetch(`${API_URL}/api/exhibitions`);
            const exhibitions = await response.json();
            
            if (location === 'all') {
                displayExhibitions(exhibitions);
            } else {
                const filteredExhibitions = exhibitions.filter(ex => 
                    ex.location.includes(location)
                );
                displayExhibitions(filteredExhibitions);
            }
        });
    });
}

// Εμφάνιση εκθέσεων σε πίνακα
function displayExhibitions(exhibitions) {
  const mainContent = document.getElementById('content');
  mainContent.innerHTML = `
      <h2 class="exhibitions-title">Εκθέσεις</h2>
      <table class="data-table">
          <thead>
              <tr>
                  <th style="width: 40%">Τίτλος</th>
                  <th style="width: 20%">Έτος</th>
                  <th style="width: 40%">Τοποθεσία</th>
              </tr>
          </thead>
          <tbody>
              ${exhibitions.map(exhibition => `
                  <tr>
                      <td><strong>${exhibition.title}</strong></td>
                      <td>${exhibition.date}</td>
                      <td>${exhibition.location}</td>
                  </tr>
              `).join('')}
          </tbody>
      </table>
  `;
}

// Εμφάνιση συνδέσμων σε πίνακα
function displayLinks(links) {
    const mainContent = document.getElementById('content');
    mainContent.innerHTML = `
        <h2>Σύνδεσμοι</h2>
        <table class="data-table">
            <thead>
                <tr>
                    <th>Περιγραφή</th>
                    <th>URL</th>
                </tr>
            </thead>
            <tbody>
                ${links.map(link => `
                    <tr>
                        <td>${link.description}</td>
                        <td><a href="${link.url}" target="_blank">Επίσκεψη</a></td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}
