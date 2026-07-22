"use strict";

document.documentElement.classList.add("js");

const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const navigation = document.querySelector("[data-nav]");
const navOverlay = document.querySelector("[data-nav-overlay]");

function updateHeader() {
  header?.classList.toggle("is-scrolled", window.scrollY > 18);
}

function setMenu(open) {
  if (!menuToggle || !navigation || !navOverlay) return;

  menuToggle.setAttribute("aria-expanded", String(open));
  navigation.classList.toggle("is-open", open);
  navOverlay.classList.toggle("is-visible", open);
  document.body.classList.toggle("nav-open", open);
}

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

menuToggle?.addEventListener("click", () => {
  const open = menuToggle.getAttribute("aria-expanded") !== "true";
  setMenu(open);
});

navOverlay?.addEventListener("click", () => setMenu(false));

navigation?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    menuToggle?.getAttribute("aria-expanded") === "true"
  ) {
    setMenu(false);
    menuToggle.focus();
  }
});

const desktopNavigation = window.matchMedia("(min-width: 1101px)");
desktopNavigation.addEventListener("change", (event) => {
  if (event.matches) setMenu(false);
});

document.querySelectorAll("[data-current-year]").forEach((element) => {
  element.textContent = String(new Date().getFullYear());
});

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const revealSelectors = [
  ".section-heading",
  ".service-card",
  ".ksef-callout",
  ".trust-media",
  ".trust-copy",
  ".process-list li",
  ".technology-inner > *",
  ".price-card",
  ".price-extras",
  ".promo-card",
  ".faq-intro",
  ".faq-list details",
  ".contact-copy",
  ".contact-email",
];

const revealItems = Array.from(
  document.querySelectorAll(revealSelectors.join(",")),
);

revealItems.forEach((item, index) => {
  item.classList.add("reveal-item");
  item.style.setProperty("--reveal-delay", `${(index % 4) * 65}ms`);
});

document.querySelector(".trust-media")?.classList.add("reveal-from-left");
document.querySelector(".trust-copy")?.classList.add("reveal-from-right");
document.querySelector(".contact-copy")?.classList.add("reveal-from-left");
document.querySelector(".contact-email")?.classList.add("reveal-from-right");

function showRevealItem(item) {
  item.classList.add("is-visible");
  window.setTimeout(() => {
    item.classList.remove(
      "reveal-item",
      "reveal-from-left",
      "reveal-from-right",
    );
  }, 1050);
}

if (reducedMotion.matches || !("IntersectionObserver" in window)) {
  revealItems.forEach(showRevealItem);
} else {
  const revealObserver = new window.IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        showRevealItem(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8%", threshold: 0.08 },
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}

const glowTargets = document.querySelectorAll(
  ".service-card, .price-card, .promo-card, .technology-logos a",
);
const precisePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

if (precisePointer.matches && !reducedMotion.matches) {
  glowTargets.forEach((target) => {
    target.addEventListener("pointermove", (event) => {
      const bounds = target.getBoundingClientRect();
      target.style.setProperty("--glow-x", `${event.clientX - bounds.left}px`);
      target.style.setProperty("--glow-y", `${event.clientY - bounds.top}px`);
    });
  });
}

const heroImage = document.querySelector(".hero-media img");
const trustImage = document.querySelector(".trust-media img");
let motionFrame = 0;

function updateMotionDetails() {
  motionFrame = 0;

  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress =
    scrollable > 0 ? Math.max(0, Math.min(1, window.scrollY / scrollable)) : 0;
  header?.style.setProperty("--scroll-progress", String(progress));

  if (reducedMotion.matches) return;

  heroImage?.style.setProperty(
    "--image-shift",
    `${Math.min(window.scrollY * 0.035, 18)}px`,
  );

  if (trustImage) {
    const bounds = trustImage.getBoundingClientRect();
    const offset =
      (window.innerHeight / 2 - (bounds.top + bounds.height / 2)) * 0.018;
    const shift = Math.max(-16, Math.min(16, offset));
    trustImage.style.setProperty("--image-shift", `${shift}px`);
  }
}

function requestMotionUpdate() {
  if (motionFrame) return;
  motionFrame = window.requestAnimationFrame(updateMotionDetails);
}

updateMotionDetails();
window.addEventListener("scroll", requestMotionUpdate, { passive: true });
window.addEventListener("resize", requestMotionUpdate, { passive: true });
