import { login, isLoggedIn, logout } from './auth.js';
import { fetchExhibitions, fetchLinks } from './fetchData.js';

document.addEventListener('DOMContentLoaded', () => {
  const loginFormContainer = document.getElementById('loginFormContainer');
  const loggedInContainer = document.getElementById('loggedInContainer');
  const managementMenu = document.getElementById('managementMenu');

  // Έλεγχος σύνδεσης χρήστη κατά τη φόρτωση
  if (isLoggedIn()) {
    loginFormContainer.classList.add('hidden');
    loggedInContainer.classList.remove('hidden');
    managementMenu.classList.add('visible');
  } else {
    loginFormContainer.classList.remove('hidden');
    loggedInContainer.classList.add('hidden');
    managementMenu.classList.remove('visible');
  }

  // Διαχείριση υποβολής φόρμας σύνδεσης
  const loginForm = document.getElementById('loginForm');
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const success = await login(username, password);
  });

  // Διαχείριση αποσύνδεσης
  const logoutButton = document.getElementById('logoutButton');
  logoutButton.addEventListener('click', () => {
    logout();
    loginFormContainer.classList.remove('hidden');
    loggedInContainer.classList.add('hidden');
    managementMenu.classList.remove('visible');
  });

  // Πλοήγηση στο μενού
  const navLinks = document.querySelectorAll('nav a');
  const asideSections = document.querySelectorAll('aside > div');
  const mainContent = document.getElementById('content');

  navLinks.forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      const section = event.target.dataset.section;

      // Εμφάνιση του σωστού περιεχομένου στο Aside
      asideSections.forEach(aside => aside.classList.add('hidden'));
      const asideToShow = document.getElementById(`aside-${section}`);
      if (asideToShow) asideToShow.classList.remove('hidden');

      // Ενημέρωση του Main
      switch (section) {
        case 'biography':
          mainContent.innerHTML = '<p>Επιλέξτε κατηγορία</p>';
          break;
        case 'paintings':
          mainContent.innerHTML = '<p>Επιλέξτε κατηγορία</p>';
          break;
        case 'exhibitions':
          mainContent.innerHTML = '<p>Φόρτωση εκθέσεων...</p>';
          fetchExhibitions();
          break;
        case 'links':
          mainContent.innerHTML = '<p>Φόρτωση συνδέσμων...</p>';
          fetchLinks();
          break;
        case 'management':
          mainContent.innerHTML = '<p>Συνδεθείτε</p>';
          break;
        default:
          mainContent.innerHTML = '<p>Καλώς ήρθατε</p>';
      }
    });
  });

  // Λογική για κατηγορίες στο Aside
  const asideLinks = document.querySelectorAll('aside a');
  asideLinks.forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      const category = event.target.dataset.category;
      const section = event.target.closest('div').id.replace('aside-', '');

      // Ενημέρωση περιεχομένου με βάση την κατηγορία
      if (section === 'biography') {
        switch (category) {
          case 'early-years':
            mainContent.innerHTML = '<p>Ο Μικελάντζελο ντι Λοντοβίκο Μπουοναρότι Σιμόνι ήταν Ιταλός γλύπτης, ζωγράφος, αρχιτέκτονας και ποιητής της Αναγέννησης</p>';
            break;
          case 'years-rome':
            mainContent.innerHTML = '<p>Στις 26 Ιουνίου 1496 επισκέφτηκε τη Ρώμη. Νωρίτερα, είχε φιλοτεχνήσει έναν μαρμάρινο ερωτιδέα, του οποίου όμως η θεματολογία έκανε αδύνατη την πώλησή του, στο καθεστώς της Φλωρεντίας του Σαβοναρόλα.';
            break;
          case 'last-years':
            mainContent.innerHTML = '<p>Πέθανε στις 18 Φεβρουαρίου του 1564. Σύμφωνα με τον Βαζάρι, διατύπωσε τη διαθήκη του λέγοντας πως αφήνει "την ψυχή του στο Θεό, το σώμα του στη γη και τα υλικά αγαθά στους πιο κοντινούς συγγενείς".';
            break;
        }
      } else if (section === 'paintings') {
        let content = '';
        switch (category) {
          case 'portraits':
            content = `
              <div class="gallery">
                <img src="images/painting1.jpg" alt="Πίνακας 1">
                <img src="images/painting2.jpg" alt="Πίνακας 2">
                <img src="images/painting3.jpg" alt="Πίνακας 3">
              </div>`;
            break;
          case 'religious':
            content = `
              <div class="gallery">
                <img src="images/church1.jpg" alt="Έργο 1">
                <img src="images/church2.jpg" alt="Έργο 2">
                <img src="images/church3.jpg" alt="Έργο 3">
              </div>`;
            break;
        }
        mainContent.innerHTML = content;
      }
    });
  });
});
