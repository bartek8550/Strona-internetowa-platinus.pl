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
  ".contact-form",
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
document.querySelector(".contact-form")?.classList.add("reveal-from-right");

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
    scrollable > 0
      ? Math.max(0, Math.min(1, window.scrollY / scrollable))
      : 0;
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

const contactForm = document.querySelector("[data-contact-form]");

if (contactForm) {
  const timestamp = contactForm.querySelector("[data-form-timestamp]");
  const formStatus = contactForm.querySelector("[data-form-status]");
  const submitButton = contactForm.querySelector("[data-submit]");
  const requiredFields = Array.from(contactForm.querySelectorAll("[required]"));

  if (timestamp) timestamp.value = String(Date.now());

  function getErrorMessage(field) {
    if (field.validity.valueMissing) {
      return field.type === "checkbox"
        ? "Zaznacz zgodę, aby wysłać zapytanie."
        : "Uzupełnij to pole.";
    }

    if (field.validity.typeMismatch) return "Podaj poprawny adres e-mail.";
    return "Sprawdź poprawność wpisanych danych.";
  }

  function validateField(field) {
    const errorElement = document.getElementById(`${field.id}-error`);
    const valid = field.checkValidity();

    field.setAttribute("aria-invalid", String(!valid));
    if (errorElement)
      errorElement.textContent = valid ? "" : getErrorMessage(field);
    return valid;
  }

  function setStatus(message, type = "") {
    if (!formStatus) return;
    formStatus.textContent = message;
    formStatus.className = `form-status${type ? ` is-${type}` : ""}`;
  }

  requiredFields.forEach((field) => {
    const eventName = field.type === "checkbox" ? "change" : "blur";
    field.addEventListener(eventName, () => validateField(field));
    field.addEventListener("input", () => {
      if (field.getAttribute("aria-invalid") === "true") validateField(field);
    });
  });

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const invalidFields = requiredFields.filter(
      (field) => !validateField(field),
    );
    if (invalidFields.length > 0) {
      setStatus("Sprawdź formularz — część pól wymaga uzupełnienia.", "error");
      invalidFields[0].focus();
      return;
    }

    if (!submitButton) return;

    setStatus("Wysyłamy zapytanie…");
    submitButton.disabled = true;
    submitButton.textContent = "Wysyłanie…";

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: new FormData(contactForm),
        headers: { Accept: "application/json" },
      });
      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.message || "Nie udało się wysłać wiadomości.");
      }

      setStatus(
        data.message || "Wiadomość została wysłana. Odezwiemy się wkrótce.",
        "success",
      );
      contactForm.reset();
      requiredFields.forEach((field) => field.removeAttribute("aria-invalid"));
      if (timestamp) timestamp.value = String(Date.now());
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Nie udało się wysłać wiadomości.";
      setStatus(
        `${message} Możesz też napisać na biuro@platinus.pl lub zadzwonić.`,
        "error",
      );
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Wyślij zapytanie";
    }
  });

  const query = new URLSearchParams(window.location.search);
  if (query.get("sent") === "1") {
    setStatus("Wiadomość została wysłana. Odezwiemy się wkrótce.", "success");
  } else if (query.get("sent") === "0") {
    setStatus(
      "Nie udało się wysłać wiadomości. Spróbuj ponownie lub skontaktuj się bezpośrednio.",
      "error",
    );
  }
}
