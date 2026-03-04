// ============================================
// Scroll Reveal
// ============================================
function initScrollReveal() {
  const reveals = document.querySelectorAll(
    ".section__header, .about__content, .work-card, .skill-item, .contact__content"
  );

  reveals.forEach((el) => el.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    { threshold: 0.15 }
  );

  reveals.forEach((el) => observer.observe(el));
}

// ============================================
// Active Nav Highlight
// ============================================
function initActiveNav() {
  const sections = document.querySelectorAll(".section");
  const navLinks = document.querySelectorAll(".nav-link");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            link.classList.toggle(
              "is-active",
              link.getAttribute("href") === `#${id}`
            );
          });
        }
      });
    },
    { threshold: 0.3 }
  );

  sections.forEach((section) => observer.observe(section));
}

// ============================================
// Smooth Scroll for Nav Links
// ============================================
function initSmoothScroll() {
  document.querySelectorAll('.nav-link[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}

// ============================================
// Hero Image Fallback (placeholder gradient)
// ============================================
function initHeroFallback() {
  const heroImg = document.querySelector(".hero__image img");
  if (heroImg) {
    heroImg.addEventListener("error", () => {
      heroImg.style.display = "none";
      heroImg.parentElement.style.background =
        "linear-gradient(135deg, #c9a96e 0%, #8b7355 40%, #5a4a3a 100%)";
    });
  }
}

// ============================================
// Init
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  initHeroFallback();
  initScrollReveal();
  initActiveNav();
  initSmoothScroll();
});
