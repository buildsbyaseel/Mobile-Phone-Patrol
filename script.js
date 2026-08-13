const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.textContent = open ? "×" : "☰";
  });

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
    });
  });
}

document.getElementById("year").textContent = new Date().getFullYear();

// Netlify handles the real form submission when deployed there.
// This gives a friendly success state if the browser returns to the page after submission.
// Formspree endpoint - replace with your actual Formspree form ID (e.g. https://formspree.io/f/abcd1234)
const FORM_ENDPOINT = 'https://formspree.io/f/REPLACE_WITH_YOUR_FORM_ID';

const form = document.getElementById('bookingForm') || document.querySelector('.quote-form');
const successMessage = document.getElementById('formSuccess');

if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    // collect form data
    const data = {};
    new FormData(form).forEach((value, key) => (data[key] = value));

    // add a subject
    data._subject = `New Trees in the Trunk request from ${data.name || 'visitor'}`;

    // show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn ? submitBtn.textContent : null;
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
    }

    // Post to Formspree
    fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then(resp => {
        if (resp.ok) {
          if (successMessage) {
            successMessage.style.display = 'block';
          } else {
            alert('Thanks! Your request was sent.');
          }
          form.reset();
        } else {
          return resp.text().then(text => { throw new Error(text || 'Form submission failed'); });
        }
      })
      .catch(err => {
        console.error(err);
        alert('There was an issue submitting your request. Please try again or call 219-333-6778.');
      })
      .finally(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
        }
      });
  });
}
