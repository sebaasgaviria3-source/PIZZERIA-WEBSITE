(function () {
  "use strict";

  /* Header: solid background after scrolling past the hero */
  var header = document.getElementById("site-header");
  var toggleHeader = function () {
    if (window.scrollY > 60) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };
  toggleHeader();
  window.addEventListener("scroll", toggleHeader, { passive: true });

  /* Scroll progress bar + hero parallax drift (skipped for prefers-reduced-motion) */
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var progressBar = document.getElementById("scroll-progress");
  var heroParallax = document.getElementById("hero-parallax");
  var ticking = false;

  function updateScrollEffects() {
    var doc = document.documentElement;
    var scrollTop = window.scrollY || doc.scrollTop;
    var maxScroll = (doc.scrollHeight - doc.clientHeight) || 1;

    if (progressBar) {
      progressBar.style.transform = "scaleX(" + Math.min(1, scrollTop / maxScroll) + ")";
    }
    if (heroParallax && !reduceMotion) {
      var heroHeight = heroParallax.parentElement.offsetHeight || 1;
      var progress = Math.min(1, scrollTop / heroHeight);
      heroParallax.style.setProperty("--parallax-y", (progress * 50) + "px");
    }
    ticking = false;
  }

  window.addEventListener("scroll", function () {
    if (!ticking) {
      requestAnimationFrame(updateScrollEffects);
      ticking = true;
    }
  }, { passive: true });
  updateScrollEffects();

  /* Mobile navigation */
  var navToggle = document.getElementById("nav-toggle");
  var mainNav = document.getElementById("main-nav");

  function closeNav() {
    mainNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Abrir menú de navegación");
  }

  function openNav() {
    mainNav.classList.add("open");
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Cerrar menú de navegación");
  }

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = mainNav.classList.contains("open");
      if (isOpen) {
        closeNav();
      } else {
        openNav();
      }
    });

    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });
  }

  /* Reveal-on-scroll animations */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* Gallery lightbox */
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightbox-img");
  var lightboxCaption = document.getElementById("lightbox-caption");
  var lightboxClose = document.getElementById("lightbox-close");
  var galleryButtons = document.querySelectorAll(".gallery-item[data-full]");
  var lastFocused = null;

  function openLightbox(src, caption) {
    lastFocused = document.activeElement;
    lightboxImg.src = src;
    lightboxImg.alt = caption || "";
    lightboxCaption.textContent = caption || "";
    lightbox.hidden = false;
    lightboxClose.focus();
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.hidden = true;
    lightboxImg.src = "";
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }

  galleryButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      openLightbox(btn.getAttribute("data-full"), btn.getAttribute("data-caption"));
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
  }
  if (lightbox) {
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !lightbox.hidden) closeLightbox();
    });
  }

  /* Footer year */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
