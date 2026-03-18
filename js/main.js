// ============================================
// スクロール時のフェードイン表示（各セクションが画面に入ると表示される）
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
// ナビゲーションのアクティブ表示（現在表示中のセクションに対応するリンクを強調）
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
// ナビリンクのスムーズスクロール（クリックで対象セクションへ滑らかに移動）
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
// ヒーロー画像の読み込み失敗時の代替表示（グラデーション背景に切り替え）
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
// スマホ用ハンバーガーメニューの開閉処理
// ============================================
function initMobileMenu() {
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  if (!hamburger || !mobileMenu) return;

  // ハンバーガーボタンのクリックでメニュー開閉
  hamburger.addEventListener("click", () => {
    const isOpen = hamburger.classList.toggle("is-open");
    mobileMenu.classList.toggle("is-open");
    hamburger.setAttribute("aria-expanded", isOpen);
    // メニューが開いている間はスクロールを無効化
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  // メニュー内のリンククリックで閉じる
  mobileMenu.querySelectorAll(".mobile-menu__link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));

      // メニューを閉じる
      hamburger.classList.remove("is-open");
      mobileMenu.classList.remove("is-open");
      hamburger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";

      // スムーズスクロール
      if (target) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    });
  });
}

// ============================================
// ヘッダーのスクロール変化（スクロールでナビバーの背景を透明→白に切り替え）
// ============================================
function initScrollHeader() {
  const sidebar = document.getElementById("sidebar");
  if (!sidebar) return;

  const heroSection = document.querySelector(".hero");
  const threshold = heroSection ? heroSection.offsetHeight * 0.85 : 100;

  window.addEventListener("scroll", () => {
    if (window.scrollY > threshold) {
      sidebar.classList.add("sidebar--scrolled");
    } else {
      sidebar.classList.remove("sidebar--scrolled");
    }
  });
}

// ============================================
// 初期化（ページ読み込み完了後にすべての機能を起動）
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  initHeroFallback();
  initScrollReveal();
  initActiveNav();
  initSmoothScroll();
  initMobileMenu();
  initScrollHeader();
});

