
/* =====================================
   PRAISES FOR PAWS — SHARED JAVASCRIPT
   ===================================== */

/*
  EDIT YOUR IMPACT NUMBERS HERE.
  Use real, verified totals when publishing.
*/
const impactNumbers = {
  petsHelped: 25,
  fundsRaised: 1250,
  volunteers: 18,
  events: 6
};

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

const currentPage = location.pathname.split("/").pop() || "index.html";

function buildHeader() {
  const target = document.querySelector("#site-header");
  if (!target) return;

  target.innerHTML = `
    <header class="site-header">
      <div class="header-inner">
        <div class="header-top">
          <a class="brand" href="index.html">🐾 Praises <span>for Paws</span></a>
          <button class="menu-toggle" type="button"
            aria-expanded="false" aria-controls="main-navigation">
            ☰ Menu
          </button>
        </div>
        <nav class="main-nav" id="main-navigation" aria-label="Main navigation">
          ${navItems.map(([href, label]) => `
            <a href="${href}"
              ${currentPage === href ? 'aria-current="page"' : ""}
              class="${href === "donate.html" ? "nav-donate" : ""}">
              ${label}
            </a>
          `).join("")}
        </nav>
      </div>
    </header>
  `;

  const toggle = target.querySelector(".menu-toggle");
  const nav = target.querySelector(".main-nav");

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

function buildFooter() {
  const target = document.querySelector("#site-footer");
  if (!target) return;

  target.innerHTML = `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div>
            <h3>🐾 Praises for Paws</h3>
            <p>
              Making every set of paws feel loved and helping pets get
              the care and basic necessities they need.
            </p>
            <a class="button" href="donate.html">💗 Support Our Mission</a>
          </div>

          <div>
            <h3>Quick Links</h3>
            <a href="index.html">🏠 Home</a>
            <a href="about.html">❤️ About Us</a>
            <a href="programs.html">🐾 Programs</a>
            <a href="events.html">📅 Events</a>
          </div>

          <div>
            <h3>Get Involved</h3>
            <a href="donate.html">💵 Donate</a>
            <a href="volunteer.html">🙋 Volunteer</a>
            <a href="success-stories.html">🐶 Success Stories</a>
            <a href="contact.html">📞 Contact Us</a>
          </div>

          <div>
            <h3>Follow Our Journey</h3>
            <p>Follow us for events, campaigns, and updates.</p>
            <div class="social-links">
              <a href="https://www.instagram.com/"
                aria-label="Instagram">◎</a>
              <a href="https://www.facebook.com/"
                aria-label="Facebook">f</a>
              <a href="https://www.tiktok.com/"
                aria-label="TikTok">♪</a>
            </div>
            <p class="form-note">Replace these links with your official accounts.</p>
          </div>
        </div>

        <div class="footer-bottom">
          <span>© <span data-current-year></span> Praises for Paws</span>
          <span>Made with 💗 for every paw.</span>
        </div>
      </div>
    </footer>
  `;

  const year = target.querySelector("[data-current-year]");
  year.textContent = new Date().getFullYear();
}

function updateImpactNumbers() {
  document.querySelectorAll("[data-impact]").forEach((element) => {
    const key = element.dataset.impact;
    if (!(key in impactNumbers)) return;

    const number = Number(impactNumbers[key]) || 0;

    if (key === "fundsRaised") {
      element.textContent = number.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0
      });
    } else {
      element.textContent = number.toLocaleString("en-US");
    }
  });
}

function setupHeroCarousel() {
  const slides = [...document.querySelectorAll(".hero-slide")];
  const dots = [...document.querySelectorAll(".hero-dot")];

  if (!slides.length) return;

  let activeIndex = 0;
  let timer;

  function showSlide(index) {
    activeIndex = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === activeIndex);
      slide.setAttribute("aria-hidden", String(i !== activeIndex));
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === activeIndex);
      dot.setAttribute("aria-pressed", String(i === activeIndex));
    });
  }

  function restartTimer() {
    clearInterval(timer);
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      timer = setInterval(() => showSlide(activeIndex + 1), 5500);
    }
  }

  document.querySelector("[data-hero-prev]")?.addEventListener("click", () => {
    showSlide(activeIndex - 1);
    restartTimer();
  });

  document.querySelector("[data-hero-next]")?.addEventListener("click", () => {
    showSlide(activeIndex + 1);
    restartTimer();
  });

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSlide(index);
      restartTimer();
    });
  });

  showSlide(0);
  restartTimer();
}

function setupDonationAmounts() {
  const amountInput = document.querySelector("#donation-amount");
  if (!amountInput) return;

  document.querySelectorAll("[data-donation-amount]").forEach((button) => {
    button.addEventListener("click", () => {
      amountInput.value = button.dataset.donationAmount;

      document.querySelectorAll("[data-donation-amount]").forEach((item) => {
        item.classList.toggle("selected", item === button);
      });
    });
  });
}

function setupEventGalleries() {
  const dialog = document.querySelector("#gallery-dialog");
  if (!dialog) return;

  const image = dialog.querySelector("[data-gallery-image]");
  const title = dialog.querySelector("[data-gallery-title]");
  const counter = dialog.querySelector("[data-gallery-counter]");

  let images = [];
  let index = 0;

  function displayImage() {
    if (!images.length) return;
    image.src = images[index];
    image.alt = `${title.textContent} — photo ${index + 1}`;
    counter.textContent = `Photo ${index + 1} of ${images.length}`;
  }

  document.querySelectorAll("[data-gallery]").forEach((button) => {
    button.addEventListener("click", () => {
      images = button.dataset.images.split("|").filter(Boolean);
      index = 0;
      title.textContent = button.dataset.title || "Event Gallery";
      displayImage();
      dialog.showModal();
    });
  });

  dialog.querySelector("[data-gallery-prev]")?.addEventListener("click", () => {
    index = (index - 1 + images.length) % images.length;
    displayImage();
  });

  dialog.querySelector("[data-gallery-next]")?.addEventListener("click", () => {
    index = (index + 1) % images.length;
    displayImage();
  });

  dialog.querySelector("[data-gallery-close]")?.addEventListener("click", () => {
    dialog.close();
  });
}

/*
  Demo forms only display a message.
  They do NOT transmit, store, or process submissions.
*/
function setupDemoForms() {
  document.querySelectorAll("[data-demo-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!form.reportValidity()) return;

      const message = form.querySelector("[data-form-message]");
      if (message) {
        message.textContent =
          "This is a preview only. Your information has not been sent or saved. Connect a form service before publishing.";
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  buildHeader();
  buildFooter();
  updateImpactNumbers();
  setupHeroCarousel();
  setupDonationAmounts();
  setupEventGalleries();
  setupDemoForms();
});

