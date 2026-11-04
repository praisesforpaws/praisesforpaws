
/* =========================================================
   PRAISES FOR PAWS — SHARED JAVASCRIPT
   ========================================================= */


/* 1. IMPACT NUMBERS
   Edit these values when your verified totals change.
*/

const impactNumbers = {
  petsHelped: 25,
  fundsRaised: 83,
  volunteers: 18,
  events: 6
};


/* 2. NAVIGATION LINKS */

const navItems = [
  ["index.html", "🏠 Home"],
  ["pawsgiving.html", "🐾 Pawsgiving"],
  ["donate.html", "💵 Donate"],
  ["about.html", "❤️ About Us"],
  ["programs.html", "🧾 Programs"],
  ["volunteer.html", "🙋 Volunteer"],
  ["events.html", "📅 Events"],
  ["success-stories.html", "🐶 Success Stories"],
  ["contact.html", "📞 Contact"]
];


/* 3. BUILD SHARED HEADER */

function buildHeader() {
  const header = document.querySelector("#site-header");

  if (!header) return;

  const currentPage =
    window.location.pathname.split("/").pop() || "index.html";

  const navigationLinks = navItems.map(([url, label]) => {
    const activeClass = currentPage === url ? "active" : "";

    return `
      <a href="${url}" class="${activeClass}">
        ${label}
      </a>
    `;
  }).join("");

  header.innerHTML = `
    <header class="site-header">
      <div class="container header-inner">

        <div class="header-top">
          <a href="index.html" class="site-logo">
            <span class="logo-icon">🐾</span>
            <span>Praises for Paws</span>
          </a>
        </div>

        <nav class="main-nav" aria-label="Main navigation">
          ${navigationLinks}
        </nav>

      </div>
    </header>
  `;
}


/* 4. BUILD SHARED FOOTER */

function buildFooter() {
  const footer = document.querySelector("#site-footer");

  if (!footer) return;

  const quickLinks = navItems.map(([url, label]) => `
    <a href="${url}">${label}</a>
  `).join("");

  footer.innerHTML = `
    <footer class="site-footer">
      <div class="container">

        <div class="footer-content">

          <div class="footer-about">
            <h2>🐾 Praises for Paws</h2>
            <p>
              Helping every set of paws feel loved,
              supported, and cared for.
            </p>
          </div>

          <div class="footer-links">
            <h3>Quick Links</h3>
            ${quickLinks}
          </div>

        </div>

        <div class="footer-bottom">
          <p>
            &copy; ${new Date().getFullYear()}
            Praises for Paws. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  `;
}


/* 5. UPDATE IMPACT NUMBERS */

function updateImpactNumbers() {
  const impactElements = document.querySelectorAll("[data-impact]");

  impactElements.forEach(element => {
    const impactType = element.dataset.impact;

    if (impactNumbers[impactType] !== undefined) {
      element.textContent = impactNumbers[impactType];
    }
  });
}


/* 6. HOMEPAGE IMAGE CAROUSEL */

function setupHeroCarousel() {
  const slides = document.querySelectorAll(".hero-slide");
  const dots = document.querySelectorAll(".hero-dot");

  if (slides.length === 0) return;

  let currentSlide = 0;
  let carouselInterval;

  function showSlide(index) {
    currentSlide = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === currentSlide);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentSlide);
      dot.setAttribute("aria-current", i === currentSlide ? "true" : "false");
    });
  }

  function startCarousel() {
    stopCarousel();

    if (slides.length > 1) {
      carouselInterval = setInterval(() => {
        showSlide(currentSlide + 1);
      }, 5000);
    }
  }

  function stopCarousel() {
    if (carouselInterval) {
      clearInterval(carouselInterval);
    }
  }

  const previousButton = document.querySelector("[data-hero-prev]");
  const nextButton = document.querySelector("[data-hero-next]");

  if (previousButton) {
    previousButton.addEventListener("click", () => {
      showSlide(currentSlide - 1);
      startCarousel();
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", () => {
      showSlide(currentSlide + 1);
      startCarousel();
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSlide(index);
      startCarousel();
    });
  });

  showSlide(0);
  startCarousel();
}


/* 7. DONATION AMOUNT BUTTONS */

function setupDonationAmounts() {
  const amountButtons = document.querySelectorAll("[data-amount]");
  const amountInput = document.querySelector("#donation-amount");

  if (!amountInput || amountButtons.length === 0) return;

  amountButtons.forEach(button => {
    button.addEventListener("click", () => {
      const amount = button.dataset.amount;

      amountInput.value = amount;

      amountButtons.forEach(item => {
        item.classList.remove("selected");
      });

      button.classList.add("selected");
    });
  });

  amountInput.addEventListener("input", () => {
    amountButtons.forEach(button => {
      button.classList.remove("selected");
    });
  });
}


/* 8. EVENT PHOTO GALLERIES */

function setupEventGalleries() {
  const dialog = document.querySelector("#gallery-dialog");

  if (!dialog) return;

  const galleryButtons = document.querySelectorAll("[data-gallery]");

  const galleryImage = dialog.querySelector("[data-gallery-image]");
  const galleryTitle = dialog.querySelector("[data-gallery-title]");
  const galleryCounter = dialog.querySelector("[data-gallery-counter]");

  const previousButton = dialog.querySelector("[data-gallery-prev]");
  const nextButton = dialog.querySelector("[data-gallery-next]");
  const closeButton = dialog.querySelector("[data-gallery-close]");

  if (!galleryImage) return;

  let images = [];
  let currentImage = 0;
  let currentTitle = "";

  function showGalleryImage(index) {
    if (images.length === 0) return;

    currentImage = (index + images.length) % images.length;

    galleryImage.src = images[currentImage];
    galleryImage.alt = `${currentTitle} photo ${currentImage + 1}`;

    if (galleryTitle) {
      galleryTitle.textContent = currentTitle;
    }

    if (galleryCounter) {
      galleryCounter.textContent =
        `${currentImage + 1} / ${images.length}`;
    }
  }

  galleryButtons.forEach(button => {
    button.addEventListener("click", () => {
      images = (button.dataset.images || "")
        .split("|")
        .map(image => image.trim())
        .filter(Boolean);

      if (images.length === 0) return;

      currentTitle =
        button.dataset.title || "Event Gallery";

      showGalleryImage(0);

      if (typeof dialog.showModal === "function") {
        dialog.showModal();
      } else {
        dialog.setAttribute("open", "");
      }
    });
  });

  if (previousButton) {
    previousButton.addEventListener("click", () => {
      showGalleryImage(currentImage - 1);
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", () => {
      showGalleryImage(currentImage + 1);
    });
  }

  if (closeButton) {
    closeButton.addEventListener("click", () => {
      if (typeof dialog.close === "function") {
        dialog.close();
      } else {
        dialog.removeAttribute("open");
      }
    });
  }

  dialog.addEventListener("click", event => {
    if (event.target === dialog) {
      if (typeof dialog.close === "function") {
        dialog.close();
      } else {
        dialog.removeAttribute("open");
      }
    }
  });
}


/* 9. DEMO FORMS
   These forms only show a preview message.
   They do NOT send or save submissions.

   Do not add data-demo-form to your Google Forms
   contact form or any real submission form.
*/

function setupDemoForms() {
  const forms = document.querySelectorAll("[data-demo-form]");

  forms.forEach(form => {
    form.addEventListener("submit", event => {
      event.preventDefault();

      const message = form.querySelector("[data-form-message]");

      if (message) {
        message.textContent =
          "This is a preview only. Your message has not been sent.";
      }
    });
  });
}


/* 10. AUTOMATIC FOOTER YEAR */

function updateFooterYear() {
  const yearElements = document.querySelectorAll("[data-year]");

  yearElements.forEach(element => {
    element.textContent = new Date().getFullYear();
  });
}


/* =========================================================
   11. START EVERYTHING WHEN THE PAGE LOADS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  buildHeader();

  buildFooter();

  updateImpactNumbers();

  setupHeroCarousel();

  setupDonationAmounts();

  setupEventGalleries();

  setupDemoForms();

  updateFooterYear();

});
