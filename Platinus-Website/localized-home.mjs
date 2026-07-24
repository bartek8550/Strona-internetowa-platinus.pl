import {
  googleReviews,
  localizedPath,
  renderFooter,
  renderLanguageAlternates,
  renderNavigation,
  siteUrl,
} from "./site-pages.mjs";

const homeContent = {
  en: {
    title: "Accounting office in Warsaw and online | Platinus",
    description:
      "Platinus accounting office: bookkeeping, full accounting, VAT, JPK, HR and payroll in Warsaw and remotely throughout Poland.",
    eyebrow: "Accounting office in Warsaw • since 2005",
    h1: "Accounting in Warsaw and online",
    h1Accent: "for companies throughout Poland",
    lead: "Since 2005, Platinus has supported businesses with KPiR, lump-sum tax, full accounting, HR and payroll. Warsaw clients can meet at the office, while companies elsewhere in Poland can work remotely with a regular point of contact.",
    quote: "Request a quote",
    call: "Call: +48 664 496 913",
    note: "The quote depends on the accounting method, document volume and agreed service scope.",
    imageAlt: "Meeting room at the Platinus accounting office in Warsaw",
    imageLabel: "Warsaw office<br />Remote throughout Poland",
    facts: [
      ["since 2005", "on the accounting services market"],
      ["1 contact", "a regular person for your company"],
      ["24/7", "access to the online document archive"],
      ["KSeF", "invoicing workflow support"],
    ],
    servicesEyebrow: "Service areas",
    servicesTitle: "Accounting built around the way your company works",
    servicesLead:
      "Choose a starting point. The final scope can combine bookkeeping, tax reporting, social insurance and payroll.",
    services: [
      [
        "01",
        "Online accounting",
        "Electronic documents, a clear monthly routine and remote cooperation throughout Poland.",
        "ksiegowosc-online",
      ],
      [
        "02",
        "Full accounting",
        "Accounting books, settlements, VAT, JPK and closing coordination for companies.",
        "pelna-ksiegowosc",
      ],
      [
        "03",
        "KPiR and lump-sum tax",
        "Organised simplified accounting for sole traders and smaller businesses.",
        "kpir-i-ryczalt",
      ],
      [
        "04",
        "HR and payroll",
        "Personnel records, payroll calculations and recurring employer information.",
        "kadry-i-place",
      ],
      [
        "05",
        "VAT, JPK and reports",
        "Source documents, tax records and useful summaries in one agreed process.",
        "vat-jpk-i-raportowanie",
      ],
      [
        "06",
        "KSeF preparation",
        "Roles, authorisations and an invoice flow connected with accounting.",
        "ksef",
      ],
    ],
    all: "View all services",
    trustEyebrow: "Why Platinus",
    trustTitle: "The numbers must be right. So must the cooperation.",
    trustLead:
      "Platinus combines experience since 2005 with a practical online workflow. Scope, responsibilities and communication are agreed before work begins.",
    benefits: [
      [
        "01",
        "Clear scope",
        "Responsibilities and pricing are confirmed before the start.",
      ],
      [
        "02",
        "Regular contact",
        "You know who handles the agreed routine for your company.",
      ],
      [
        "03",
        "Flexible documents",
        "Choose online, traditional or hybrid transfer.",
      ],
      ["04", "Warsaw and Poland", "Meet locally or work fully remotely."],
    ],
    ownerLabel: "Personal responsibility",
    ownerText:
      "Platinus is run by Andrzej Kowalczyk, holder of accounting certificate no. 10544/2005. The public C.I.K. profile lists professional liability insurance with PZU.",
    ownerLink: "Meet the office owner",
    processEyebrow: "Getting started",
    processTitle: "Three steps to an organised accounting routine",
    processLead:
      "First we understand the company, then agree a practical and repeatable monthly process.",
    process: [
      [
        "01",
        "Conversation and quote",
        "We review the legal form, documents, employment and service needs.",
      ],
      [
        "02",
        "Document handover",
        "You receive a clear list and an agreed online or traditional channel.",
      ],
      [
        "03",
        "Recurring service",
        "Both sides work to known deadlines with a regular contact person.",
      ],
    ],
    reviewsEyebrow: "Client feedback",
    reviewsTitle: "A public 5.0 score on Google",
    reviewsLead:
      "Below are short, direct excerpts from reviews available on Google.",
    reviewsLabel: "Google reviews",
    reviewTexts: [
      [
        "Bartłomiej Szpak",
        "You can always count on help when something is unclear.",
      ],
      ["Artur Sarba", "The cooperation is going very well."],
      [
        "TELE-SERWIS Malbork",
        "Competent people in the right place — they will help and advise.",
      ],
    ],
    reviewLink: "Read all reviews on Google",
    contactEyebrow: "Contact",
    contactTitle: "Tell us what your business needs",
    contactLead:
      "The contact page contains the office address, phone number, email and a short checklist for a quote request.",
    contactButton: "Open contact details",
    contactSecondary: "See how pricing works",
  },
  de: {
    title: "Buchhaltungskanzlei in Warschau und online | Platinus",
    description:
      "Platinus: KPiR, Pauschalsteuer, doppelte Buchführung, Umsatzsteuer, JPK, Personal und Lohn in Warschau und online in ganz Polen.",
    eyebrow: "Buchhaltungskanzlei in Warschau • seit 2005",
    h1: "Buchhaltung in Warschau und online",
    h1Accent: "für Unternehmen in ganz Polen",
    lead: "Seit 2005 unterstützt Platinus Unternehmen mit KPiR, Pauschalsteuer, doppelter Buchführung sowie Personal und Lohn. Kunden aus Warschau können das Büro besuchen; Firmen in anderen Regionen arbeiten digital mit einem festen Ansprechpartner.",
    quote: "Angebot anfragen",
    call: "Anrufen: +48 664 496 913",
    note: "Das Angebot hängt von Buchführungsart, Belegmenge und vereinbartem Leistungsumfang ab.",
    imageAlt: "Besprechungsraum der Buchhaltungskanzlei Platinus in Warschau",
    imageLabel: "Büro in Warschau<br />Online in ganz Polen",
    facts: [
      ["seit 2005", "auf dem Buchhaltungsmarkt"],
      ["1 Kontakt", "fester Ansprechpartner für Ihre Firma"],
      ["24/7", "Zugang zum Online-Dokumentenarchiv"],
      ["KSeF", "Unterstützung beim Rechnungsprozess"],
    ],
    servicesEyebrow: "Leistungsbereiche",
    servicesTitle: "Buchhaltung passend zur Arbeitsweise Ihres Unternehmens",
    servicesLead:
      "Wählen Sie einen Ausgangspunkt. Der endgültige Umfang kann Buchführung, Steuerberichte, Sozialversicherung und Lohn verbinden.",
    services: [
      [
        "01",
        "Online-Buchhaltung",
        "Elektronische Dokumente, klarer Monatsrhythmus und Zusammenarbeit in ganz Polen.",
        "ksiegowosc-online",
      ],
      [
        "02",
        "Doppelte Buchführung",
        "Geschäftsbücher, Abstimmungen, Umsatzsteuer, JPK und Jahresabschlusskoordination.",
        "pelna-ksiegowosc",
      ],
      [
        "03",
        "KPiR und Pauschalsteuer",
        "Geordnete vereinfachte Buchhaltung für Einzelunternehmer und kleinere Firmen.",
        "kpir-i-ryczalt",
      ],
      [
        "04",
        "Personal und Lohn",
        "Personalakten, Lohnabrechnungen und laufende Informationen für Arbeitgeber.",
        "kadry-i-place",
      ],
      [
        "05",
        "Umsatzsteuer, JPK und Berichte",
        "Quelldokumente, Steuerregister und nützliche Übersichten in einem Prozess.",
        "vat-jpk-i-raportowanie",
      ],
      [
        "06",
        "KSeF-Vorbereitung",
        "Rollen, Berechtigungen und ein mit der Buchhaltung verbundener Rechnungsfluss.",
        "ksef",
      ],
    ],
    all: "Alle Leistungen ansehen",
    trustEyebrow: "Warum Platinus",
    trustTitle: "Die Zahlen müssen stimmen. Die Zusammenarbeit auch.",
    trustLead:
      "Platinus verbindet Erfahrung seit 2005 mit einem praktischen Online-Ablauf. Umfang, Verantwortung und Kommunikation werden vor dem Start vereinbart.",
    benefits: [
      [
        "01",
        "Klarer Umfang",
        "Verantwortung und Preis werden vor dem Start bestätigt.",
      ],
      [
        "02",
        "Fester Kontakt",
        "Sie wissen, wer den vereinbarten Ablauf betreut.",
      ],
      [
        "03",
        "Flexible Dokumente",
        "Online, traditionell oder hybrid – passend zum Unternehmen.",
      ],
      [
        "04",
        "Warschau und Polen",
        "Treffen vor Ort oder vollständig digital arbeiten.",
      ],
    ],
    ownerLabel: "Persönliche Verantwortung",
    ownerText:
      "Platinus wird von Andrzej Kowalczyk geführt, Träger des Buchhalterzertifikats Nr. 10544/2005. Das öffentliche C.I.K.-Profil nennt eine Berufshaftpflicht bei PZU.",
    ownerLink: "Kanzleiinhaber kennenlernen",
    processEyebrow: "Zusammenarbeit starten",
    processTitle: "Drei Schritte zu einem geordneten Buchhaltungsablauf",
    processLead:
      "Zuerst lernen wir das Unternehmen kennen, dann vereinbaren wir einen praktischen und wiederholbaren Monatsprozess.",
    process: [
      [
        "01",
        "Gespräch und Angebot",
        "Wir prüfen Rechtsform, Dokumente, Beschäftigung und Leistungsbedarf.",
      ],
      [
        "02",
        "Dokumentenübergabe",
        "Sie erhalten eine klare Liste und einen vereinbarten Übertragungsweg.",
      ],
      [
        "03",
        "Laufende Betreuung",
        "Beide Seiten arbeiten mit bekannten Fristen und einem festen Kontakt.",
      ],
    ],
    reviewsEyebrow: "Kundenstimmen",
    reviewsTitle: "Öffentliche Google-Bewertung von 5,0",
    reviewsLead:
      "Nachfolgend finden Sie kurze, direkte Auszüge aus Google-Bewertungen.",
    reviewsLabel: "Google-Bewertungen",
    reviewTexts: [
      ["Bartłomiej Szpak", "Bei Unklarheiten kann man immer auf Hilfe zählen."],
      ["Artur Sarba", "Die Zusammenarbeit läuft sehr gut."],
      [
        "TELE-SERWIS Malbork",
        "Kompetente Menschen am richtigen Platz – sie helfen und beraten.",
      ],
    ],
    reviewLink: "Alle Bewertungen bei Google lesen",
    contactEyebrow: "Kontakt",
    contactTitle: "Beschreiben Sie kurz den Bedarf Ihres Unternehmens",
    contactLead:
      "Die Kontaktseite enthält Adresse, Telefonnummer, E-Mail und eine kurze Checkliste für die Angebotsanfrage.",
    contactButton: "Kontaktdaten öffnen",
    contactSecondary: "Preisbildung ansehen",
  },
};

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function schema(locale, text) {
  const url = `${siteUrl}${localizedPath("", locale)}`;
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${url}#website`,
        url,
        name: "Platinus.pl",
        inLanguage: locale,
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: text.title,
        description: text.description,
        inLanguage: locale,
        dateModified: "2026-07-23",
      },
      {
        "@type": "AccountingService",
        "@id": `${siteUrl}/#business`,
        name: "PLATINUS.PL Andrzej Kowalczyk",
        url: `${siteUrl}/`,
        foundingDate: "2005",
        telephone: "+48664496913",
        email: "biuro@platinus.pl",
        taxID: "951-110-02-56",
        founder: {
          "@type": "Person",
          name: "Andrzej Kowalczyk",
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: "ul. Jugosłowiańska 17B lok. 97",
          postalCode: "03-984",
          addressLocality: "Warszawa",
          addressCountry: "PL",
        },
      },
    ],
  }).replaceAll("<", "\\u003c");
}

function renderLocalizedHome(locale) {
  const text = homeContent[locale];
  const canonical = `${siteUrl}${localizedPath("", locale)}`;

  return `<!doctype html>
<html lang="${locale}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(text.title)}</title>
    <meta name="description" content="${escapeHtml(text.description)}" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <link rel="canonical" href="${canonical}" />
    ${renderLanguageAlternates("")}
    <meta property="og:locale" content="${locale === "en" ? "en_GB" : "de_DE"}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Platinus.pl" />
    <meta property="og:title" content="${escapeHtml(text.title)}" />
    <meta property="og:description" content="${escapeHtml(text.description)}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${siteUrl}/icons/og-image-seo.jpg" />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="preload" as="image" href="/photos/zdj2-1280.webp" imagesrcset="/photos/zdj2-768.webp 768w, /photos/zdj2-1280.webp 1280w, /photos/zdj2-1920.webp 1920w" imagesizes="(max-width: 899px) 100vw, 52vw" fetchpriority="high" />
    <link rel="icon" href="/icons/favicon.ico" sizes="any" />
    <link rel="manifest" href="/icons/site.webmanifest" />
    <meta name="theme-color" content="#181313" />
    <link rel="stylesheet" href="/variables.css" />
    <link rel="stylesheet" href="/style.css" />
    <script type="application/ld+json">${schema(locale, text)}</script>
  </head>
  <body class="locale-${locale}">
    <a class="skip-link" href="#main-content">${locale === "en" ? "Skip to content" : "Zum Inhalt springen"}</a>
    <header class="site-header" data-header><div class="container header-inner">${renderNavigation(locale, "")}</div></header>
    <div class="nav-overlay" data-nav-overlay aria-hidden="true"></div>
    <main id="main-content">
      <section class="hero" id="start" aria-labelledby="hero-title">
        <div class="container hero-grid">
          <div class="hero-copy">
            <p class="eyebrow eyebrow--light">${escapeHtml(text.eyebrow)}</p>
            <h1 id="hero-title">${escapeHtml(text.h1)} <em>${escapeHtml(text.h1Accent)}</em></h1>
            <p class="hero-lead">${escapeHtml(text.lead)}</p>
            <div class="hero-actions">
              <a class="button" href="${localizedPath("kontakt", locale)}">${escapeHtml(text.quote)}</a>
              <a class="button button--ghost" href="tel:+48664496913">${escapeHtml(text.call)}</a>
            </div>
            <p class="hero-note">${escapeHtml(text.note)}</p>
          </div>
          <div class="hero-media">
            <picture>
              <source type="image/webp" srcset="/photos/zdj2-768.webp 768w, /photos/zdj2-1280.webp 1280w, /photos/zdj2-1920.webp 1920w, /photos/zdj2-2560.webp 2560w" sizes="(max-width: 899px) 100vw, 52vw" />
              <img src="/photos/zdj2-1280.webp" width="1280" height="854" alt="${escapeHtml(text.imageAlt)}" fetchpriority="high" decoding="async" />
            </picture>
            <div class="hero-media__label"><span aria-hidden="true"></span>${text.imageLabel}</div>
          </div>
        </div>
        <ul class="container hero-facts">
          ${text.facts.map(([value, label]) => `<li class="fact"><strong>${escapeHtml(value)}</strong><span>${escapeHtml(label)}</span></li>`).join("")}
        </ul>
      </section>

      <section class="section services" aria-labelledby="services-title">
        <div class="container">
          <div class="section-heading section-heading--split">
            <div><p class="eyebrow">${escapeHtml(text.servicesEyebrow)}</p><h2 id="services-title">${escapeHtml(text.servicesTitle)}</h2></div>
            <p>${escapeHtml(text.servicesLead)}</p>
          </div>
          <div class="service-grid">
            ${text.services
              .map(
                ([number, title, description, slug]) =>
                  `<article class="service-card"><span class="service-card__number">${number}</span><h3>${escapeHtml(title)}</h3><p>${escapeHtml(description)}</p><a class="text-link" href="${localizedPath(slug, locale)}">${locale === "en" ? "Explore service" : "Leistung ansehen"} <span aria-hidden="true">→</span></a></article>`,
              )
              .join("")}
          </div>
          <a class="button button--dark section-button" href="${localizedPath("uslugi", locale)}">${escapeHtml(text.all)}</a>
        </div>
      </section>

      <section class="section trust" aria-labelledby="trust-title">
        <div class="container trust-grid">
          <div class="trust-media"><picture><source type="image/webp" srcset="/photos/zdj2-768.webp 768w, /photos/zdj2-1280.webp 1280w, /photos/zdj2-1920.webp 1920w" sizes="(max-width: 899px) 100vw, 45vw" /><img src="/photos/zdj2-1280.webp" width="1280" height="854" alt="${escapeHtml(text.imageAlt)}" loading="lazy" decoding="async" /></picture></div>
          <div class="trust-copy">
            <p class="eyebrow eyebrow--light">${escapeHtml(text.trustEyebrow)}</p>
            <h2 id="trust-title">${escapeHtml(text.trustTitle)}</h2>
            <p class="trust-lead">${escapeHtml(text.trustLead)}</p>
            <div class="benefit-list">
              ${text.benefits.map(([number, title, description]) => `<article><span>${number}</span><div><h3>${escapeHtml(title)}</h3><p>${escapeHtml(description)}</p></div></article>`).join("")}
            </div>
            <div class="leadership-note">
              <span class="leadership-note__monogram" aria-hidden="true">AK</span>
              <div><p class="leadership-note__label">${escapeHtml(text.ownerLabel)}</p><p>${escapeHtml(text.ownerText)}</p><a class="text-link text-link--light" href="${localizedPath("andrzej-kowalczyk", locale)}">${escapeHtml(text.ownerLink)} <span aria-hidden="true">→</span></a></div>
            </div>
          </div>
        </div>
      </section>

      <section class="section process" aria-labelledby="process-title">
        <div class="container">
          <div class="section-heading section-heading--center"><p class="eyebrow">${escapeHtml(text.processEyebrow)}</p><h2 id="process-title">${escapeHtml(text.processTitle)}</h2><p>${escapeHtml(text.processLead)}</p></div>
          <ol class="process-list">${text.process.map(([number, title, description]) => `<li><span class="process-list__number">${number}</span><h3>${escapeHtml(title)}</h3><p>${escapeHtml(description)}</p></li>`).join("")}</ol>
        </div>
      </section>

      <section class="section reviews-section" aria-labelledby="reviews-title">
        <div class="container">
          <div class="reviews-heading">
            <div><p class="eyebrow">${escapeHtml(text.reviewsEyebrow)}</p><h2 id="reviews-title">${escapeHtml(text.reviewsTitle)}</h2><p>${escapeHtml(text.reviewsLead)}</p></div>
            <div class="reviews-score" role="img" aria-label="${escapeHtml(text.reviewsTitle)}"><strong>5,0</strong><span aria-hidden="true">★★★★★</span><small>${escapeHtml(text.reviewsLabel)}</small></div>
          </div>
          <div class="reviews-grid">${text.reviewTexts.map(([author, review]) => `<figure class="review-card"><div class="review-card__stars" role="img" aria-label="5 / 5">★★★★★</div><blockquote>“${escapeHtml(review)}”</blockquote><figcaption><strong>${escapeHtml(author)}</strong><span>Google · 5/5</span></figcaption></figure>`).join("")}</div>
          <div class="reviews-source"><a class="text-link" href="${googleReviews}" target="_blank" rel="external noopener noreferrer">${escapeHtml(text.reviewLink)} <span aria-hidden="true">↗</span></a></div>
        </div>
      </section>

      <section class="section page-cta" aria-labelledby="contact-title">
        <div class="container page-cta__inner">
          <div><p class="eyebrow eyebrow--light">${escapeHtml(text.contactEyebrow)}</p><h2 id="contact-title">${escapeHtml(text.contactTitle)}</h2><p>${escapeHtml(text.contactLead)}</p></div>
          <div class="hero-actions"><a class="button" href="${localizedPath("kontakt", locale)}">${escapeHtml(text.contactButton)}</a><a class="button button--ghost" href="${localizedPath("cennik", locale)}">${escapeHtml(text.contactSecondary)}</a></div>
        </div>
      </section>
    </main>
    ${renderFooter(locale)}
    <script src="/script.js" defer></script>
  </body>
</html>`.replace(/^[ \t]+$/gm, "");
}

export { renderLocalizedHome };
