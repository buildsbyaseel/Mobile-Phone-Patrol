
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
 
// This form is submitted with Netlify Forms (see the data-netlify attribute
// on the <form> in index.html), so it works out of the box on Netlify with
// no separate account, API key, or endpoint to configure. Photos attached
// via the file input are uploaded along with the rest of the submission and
// will show up under Site settings > Forms in the Netlify dashboard (you
// can also turn on email notifications there).
//
// If this site is ever deployed somewhere other than Netlify, this fetch
// call will fail since nothing will be listening at that URL, and people
// will just see the "please call/text us" fallback message below.
const form = document.getElementById('bookingForm') || document.querySelector('.quote-form');
const successMessage = document.getElementById('formSuccess');
 
if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
 
    // Honeypot check — real visitors never fill this hidden field in.
    const honeypot = form.querySelector('input[name="bot-field"]');
    if (honeypot && honeypot.value) {
      return; // silently drop likely spam
    }
 
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn ? submitBtn.textContent : null;
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
    }
 
    const formData = new FormData(form);
 
    fetch('/', {
      method: 'POST',
      body: formData,
    })
      .then(resp => {
        if (resp.ok) {
          if (successMessage) {
            successMessage.style.display = 'block';
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          } else {
            alert("Thanks! Your request was sent. We'll be in touch shortly.");
          }
          form.reset();
        } else {
          throw new Error('Form submission failed with status ' + resp.status);
        }
      })
      .catch(err => {
        console.error(err);
        alert('There was an issue submitting your request. Please call or text 219-333-6778 and we\'ll get your info that way.');
      })
      .finally(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
        }
      });
  });
}