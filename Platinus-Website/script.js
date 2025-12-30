//Change alpha of element background color in RGBA (zostawione — może się przydać)
function changeAlfaOfElementFromRGBA(element, alpha) {
  const backgroundColor = element.css('backgroundColor');
  element.css(
    'backgroundColor',
    'rgba' +
      backgroundColor.slice(
        backgroundColor.indexOf('('),
        ((backgroundColor.match(/,/g).length === 2) ? -1 : backgroundColor.lastIndexOf(',') - backgroundColor.length)
      ) +
      ', ' + alpha + ')'
  );
}

/* ===== Navbar: FIX (definicja navbar + aktualizacja na scroll + load) ===== */
const navbar = $(".navbar");

const updateNavbar = () => {
  if (navbar.hasClass("nav-open")) return;

  const scrollTop = $(window).scrollTop();

  if (scrollTop > 60) {
    navbar.addClass("scrolled");
    navbar.css("backgroundColor", "");
  } else {
    navbar.removeClass("scrolled");
    const alpha = Math.min(scrollTop / 400, 0.6);
    navbar.css("backgroundColor", `rgba(15, 23, 42, ${alpha})`);
  }
};

$(window).on("scroll", updateNavbar);
$(window).on("load", updateNavbar);
$(document).ready(updateNavbar);

/* ===== Promocje: płynna animacja <details> + akordeon (otwarte tylko jedno) ===== */
const promoDetailsList = Array.from(document.querySelectorAll('.promo-details'));

promoDetailsList.forEach((details) => {
  const summary = details.querySelector('summary');
  const content = details.querySelector('.promo-details__content');
  if (!summary || !content) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // Jeśli user ma reduced motion — zostaw natywne <details>, ale zrób akordeon
  if (reduceMotion.matches) {
    details.addEventListener('toggle', () => {
      if (!details.open) return;
      promoDetailsList.forEach((other) => {
        if (other !== details) other.open = false;
      });
    });
    return;
  }

  details.classList.add('promo-details--animated');

  let isAnimating = false;
  details.__promoAnimating = false;

  const openDetails = () => {
    isAnimating = true;
    details.__promoAnimating = true;

    details.setAttribute('open', '');

    content.style.height = '0px';
    const target = content.scrollHeight;

    requestAnimationFrame(() => {
      content.style.height = target + 'px';
      content.style.opacity = '1';
      content.style.transform = 'translateY(0)';
    });

    const onEnd = (e) => {
      if (e.propertyName !== 'height') return;
      content.style.height = 'auto';
      content.removeEventListener('transitionend', onEnd);
      isAnimating = false;
      details.__promoAnimating = false;
    };

    content.addEventListener('transitionend', onEnd);
  };

  const closeDetails = () => {
    isAnimating = true;
    details.__promoAnimating = true;

    content.style.height = content.scrollHeight + 'px';

    requestAnimationFrame(() => {
      content.style.height = '0px';
      content.style.opacity = '0';
      content.style.transform = 'translateY(-4px)';
    });

    const onEnd = (e) => {
      if (e.propertyName !== 'height') return;
      details.removeAttribute('open');
      content.removeEventListener('transitionend', onEnd);
      isAnimating = false;
      details.__promoAnimating = false;
    };

    content.addEventListener('transitionend', onEnd);
  };

  // żeby inne elementy mogły zamknąć ten konkretny <details>
  details.__promoClose = closeDetails;

  summary.addEventListener('click', (e) => {
    e.preventDefault();
    if (isAnimating) return;

    const isOpen = details.hasAttribute('open');

    if (!isOpen) {
      // AKORDEON: zamknij wszystkie pozostałe otwarte <details>
      promoDetailsList.forEach((other) => {
        if (other === details) return;
        if (!other.hasAttribute('open')) return;

        if (typeof other.__promoClose === 'function' && !other.__promoAnimating) {
          other.__promoClose(); // zamknij animacją
        } else {
          // fallback (bez animacji)
          other.removeAttribute('open');
          const otherContent = other.querySelector('.promo-details__content');
          if (otherContent) {
            otherContent.style.height = '0px';
            otherContent.style.opacity = '0';
            otherContent.style.transform = 'translateY(-4px)';
          }
        }
      });

      openDetails();
    } else {
      closeDetails();
    }
  });
});


/* ===== Mobile menu: backdrop + blokada scrolla + zamykanie po kliknięciu ===== */
document.addEventListener('DOMContentLoaded', () => {
  const navbarEl = document.querySelector('.navbar');
  const collapseEl = document.getElementById('navbarSupportedContent');
  const togglerEl = document.querySelector('.navbar-toggler');
  if (!navbarEl || !collapseEl || !togglerEl) return;

  const backdrop = document.createElement('div');
  backdrop.className = 'nav-backdrop';
  document.body.appendChild(backdrop);

  const syncNavState = () => {
  const open = collapseEl.classList.contains('show');

  navbarEl.classList.toggle('nav-open', open);
  backdrop.classList.toggle('show', open);
  document.body.classList.toggle('nav-lock', open);

  // KLUCZ: gdy menu jest otwarte na mobile, nie chcemy stanu "scrolled"
  // bo on robi czarne linki i ciemną ikonkę burgera.
  if (open) {
    navbar.removeClass("scrolled");
    navbar.css("backgroundColor", "");
  } else {
    updateNavbar();
  }
};


  backdrop.addEventListener('click', () => {
    if (collapseEl.classList.contains('show')) togglerEl.click();
  });

  collapseEl.querySelectorAll('a.nav-link').forEach((a) => {
    a.addEventListener('click', () => {
      if (collapseEl.classList.contains('show')) togglerEl.click();
    });
  });

  const obs = new MutationObserver(syncNavState);
  obs.observe(collapseEl, { attributes: true, attributeFilter: ['class'] });
  syncNavState();
});

/* ===== Formularz kontaktowy (AJAX + walidacja) ===== */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const alertBox = document.getElementById('contactFormAlert');
  const submitBtn = document.getElementById('contactSubmit');

  const ts = form.querySelector('input[name="form_ts"]');
  if (ts) ts.value = String(Date.now());

  const ajaxField = form.querySelector('input[name="ajax"]');
  if (ajaxField) ajaxField.value = "1";

  const showAlert = (type, msg) => {
    alertBox.innerHTML = `
      <div class="alert alert-${type} mb-0" role="alert">
        ${msg}
      </div>
    `;
  };

  form.addEventListener('submit', async (e) => {
    if (!form.checkValidity()) {
      e.preventDefault();
      e.stopPropagation();
      form.classList.add('was-validated');
      showAlert('danger', 'Sprawdź formularz — część pól wymaga uzupełnienia.');
      return;
    }

    e.preventDefault();
    form.classList.add('was-validated');

    submitBtn.disabled = true;
    submitBtn.textContent = 'Wysyłanie…';

    try {
      const fd = new FormData(form);
      const res = await fetch(form.action, {
        method: 'POST',
        body: fd,
        headers: { 'Accept': 'application/json' }
      });

      const data = await res.json();
      if (data.ok) {
        showAlert('success', data.message || 'Wiadomość została wysłana. Odezwiemy się najszybciej jak to możliwe.');
        form.reset();

        setTimeout(() => {
          const modalEl = document.getElementById('contactModal');
          const modal =
            window.bootstrap?.Modal.getInstance(modalEl) ||
            new window.bootstrap.Modal(modalEl);

          modal.hide();

          alertBox.innerHTML = '';
          submitBtn.textContent = 'Wyślij wiadomość';
          submitBtn.disabled = false;

          if (ts) ts.value = String(Date.now());
        }, 900);
      } else {
        showAlert('danger', data.message || 'Nie udało się wysłać wiadomości. Spróbuj ponownie lub zadzwoń.');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Wyślij wiadomość';
      }
    } catch (err) {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Wyślij wiadomość';
      form.submit();
    }
  });
});

// --- Open contact modal from CTAs (buttons/links) ---
document.addEventListener("DOMContentLoaded", () => {
  const modalEl = document.getElementById("contactModal");
  if (!modalEl || typeof bootstrap === "undefined") return;

  const modal = bootstrap.Modal.getOrCreateInstance(modalEl);

  function openContactModal(e) {
    // pozwól na fallback (bez JS) – ale jeśli JS działa, nie scrolluj
    if (e) e.preventDefault();

    // zamknij mobilne menu jeśli otwarte
    const navCollapseEl = document.getElementById("navbarSupportedContent");
    if (navCollapseEl && navCollapseEl.classList.contains("show")) {
      bootstrap.Collapse.getOrCreateInstance(navCollapseEl).hide();
    }

    modal.show();

    // focus na pierwsze pole po otwarciu
    modalEl.addEventListener(
      "shown.bs.modal",
      () => {
        const first = modalEl.querySelector("input, textarea, select, button");
        if (first) first.focus();
      },
      { once: true }
    );
  }

  document.querySelectorAll(".js-open-contact").forEach((el) => {
    el.addEventListener("click", openContactModal);
  });
});
