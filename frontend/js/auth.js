const API_URL = "https://webproject-5rtv.onrender.com";
// Είσοδος χρήστη
async function login(event) {
     // Προσθέστε αυτό για να σταματήσει το form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Σφάλμα");
        }

        const data = await response.json();
        localStorage.setItem("token", data.token);
        alert("Επιτυχής σύνδεση!");
        updateUI(); // Καλούμε την updateUI() μετά την επιτυχή σύνδεση
    } catch (error) {
        console.error("Σφάλμα σύνδεσης:", error.message);
        alert(error.message);
    }
}

function updateUI() {
    const loginFormContainer = document.getElementById('loginFormContainer');
    const loggedInContainer = document.getElementById('loggedInContainer');
    const managementMenu = document.getElementById('managementMenu');

    if (isLoggedIn()) {
        loginFormContainer.classList.add('hidden');
        loggedInContainer.classList.remove('hidden');
        managementMenu.classList.remove('hidden');
    } else {
        loginFormContainer.classList.remove('hidden');
        loggedInContainer.classList.add('hidden');
        managementMenu.classList.add('hidden');
    }
}

// Έλεγχος αν ο χρήστης είναι συνδεδεμένος
function isLoggedIn() {
    const token = localStorage.getItem("token");
    return token !== null;
}

// Λήψη του token
function getToken() {
    return localStorage.getItem("token");
}

// Αποσύνδεση χρήστη
function logout() {
    localStorage.removeItem("token");
    updateUI(); // Καλούμε την updateUI() μετά την αποσύνδεση
    alert("Έχετε αποσυνδεθεί!");
}

// Προσθήκη του token στα αιτήματα (Authorization Header)
async function fetchWithAuth(url, options = {}) {
    const token = getToken();
    if (!token) {
        alert("Παρακαλώ συνδεθείτε.");
        return;
    }

    const headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
    };

    return fetch(url, {
        ...options,
        headers,
    });
}

// Εξαγωγή λειτουργιών
export { login, isLoggedIn, logout, fetchWithAuth };


document.addEventListener('DOMContentLoaded', function() {
    updateUI();
});
