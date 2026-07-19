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
