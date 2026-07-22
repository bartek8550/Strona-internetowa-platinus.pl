const siteUrl = "https://platinus.pl";
const businessId = `${siteUrl}/#business`;
const websiteId = `${siteUrl}/#website`;

const cikProfile =
  "https://www.cik.org.pl/biuro/biuro-rachunkowe-platinus-pl-andrzej-kowalczyk-2333";

const businessNode = {
  "@type": "AccountingService",
  "@id": businessId,
  name: "PLATINUS.PL Andrzej Kowalczyk",
  alternateName: "Platinus.pl",
  url: `${siteUrl}/`,
  logo: `${siteUrl}/photos/platinus-logo-480.webp`,
  image: `${siteUrl}/photos/zdj2-1920.webp`,
  description:
    "Biuro rachunkowe w Warszawie świadczące usługi księgowe oraz obsługę kadr i płac, także zdalnie w całej Polsce.",
  foundingDate: "2005",
  telephone: "+48664496913",
  email: "biuro@platinus.pl",
  taxID: "951-110-02-56",
  priceRange: "100–1300 zł+",
  sameAs: [cikProfile],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "obsługa klienta",
    telephone: "+48664496913",
    email: "biuro@platinus.pl",
    availableLanguage: "pl",
    areaServed: "PL",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "ul. Jugosłowiańska 17B lok. 97",
    postalCode: "03-984",
    addressLocality: "Warszawa",
    addressRegion: "mazowieckie",
    addressCountry: "PL",
  },
  areaServed: [
    { "@type": "City", name: "Warszawa" },
    { "@type": "Country", name: "Polska" },
  ],
};

const websiteNode = {
  "@type": "WebSite",
  "@id": websiteId,
  url: `${siteUrl}/`,
  name: "Platinus.pl",
  inLanguage: "pl-PL",
  publisher: { "@id": businessId },
};

const pages = [];

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function renderNavigation() {
  return `
    <a class="brand" href="/" aria-label="Platinus.pl — strona główna">
      <img src="/photos/platinus-logo-480.webp" width="480" height="150" alt="Platinus.pl" />
    </a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-nav" data-menu-toggle>
      <span class="menu-toggle__label">Menu</span>
      <span class="menu-toggle__icon" aria-hidden="true"><span></span><span></span></span>
    </button>
    <nav class="primary-nav" id="primary-nav" aria-label="Główna nawigacja" data-nav>
      <a href="/ksiegowosc-online/">Księgowość online</a>
      <a href="/cennik/">Cennik</a>
      <a href="/o-nas/">O nas</a>
      <a href="/poradnik/">Poradnik</a>
      <a href="/kontakt/">Kontakt</a>
      <a class="nav-client" href="https://eszok.platinus.pl/public/login">Panel klienta</a>
      <a class="button button--small" href="mailto:biuro@platinus.pl?subject=Zapytanie%20o%20wycen%C4%99">Napisz po wycenę</a>
    </nav>`;
}

function renderFooter() {
  return `
    <footer class="site-footer">
      <div class="container footer-grid">
        <div class="footer-brand">
          <a class="brand" href="/" aria-label="Platinus.pl — strona główna">
            <img src="/photos/platinus-logo-480.webp" width="480" height="150" alt="Platinus.pl" loading="lazy" />
          </a>
          <p>Księgowość, kadry i płace dla firm z Warszawy oraz zdalnie w całej Polsce.</p>
        </div>
        <nav aria-label="Usługi w stopce">
          <p class="footer-title">Usługi</p>
          <a href="/pelna-ksiegowosc/">Pełna księgowość</a>
          <a href="/kpir-i-ryczalt/">KPiR i ryczałt</a>
          <a href="/kadry-i-place/">Kadry i płace</a>
          <a href="/ksef/">KSeF</a>
        </nav>
        <nav aria-label="Informacje w stopce">
          <p class="footer-title">Platinus</p>
          <a href="/o-nas/">O nas</a>
          <a href="/cennik/">Cennik</a>
          <a href="/poradnik/">Poradnik</a>
          <a href="/polityka-prywatnosci/">Polityka prywatności</a>
        </nav>
        <div>
          <p class="footer-title">Kontakt</p>
          <a href="tel:+48664496913">+48 664 496 913</a>
          <a href="mailto:biuro@platinus.pl">biuro@platinus.pl</a>
          <p>ul. Jugosłowiańska 17B lok. 97<br />03-984 Warszawa</p>
        </div>
      </div>
      <div class="container footer-bottom">
        <p>© <span data-current-year>2026</span> Platinus.pl. Wszelkie prawa zastrzeżone.</p>
        <a href="/">Strona główna <span aria-hidden="true">↑</span></a>
      </div>
    </footer>`;
}

function renderBreadcrumbs(page) {
  const items = page.breadcrumbs ?? [
    { name: "Strona główna", url: "/" },
    { name: page.shortTitle ?? page.h1, url: `/${page.slug}/` },
  ];

  return `<nav class="breadcrumbs" aria-label="Okruszki">
    <ol>${items
      .map((item, index) => {
        const current = index === items.length - 1;
        return `<li>${
          current
            ? `<span aria-current="page">${escapeHtml(item.name)}</span>`
            : `<a href="${escapeHtml(item.url)}">${escapeHtml(item.name)}</a>`
        }</li>`;
      })
      .join("")}</ol>
  </nav>`;
}

function renderSection(section) {
  const paragraphs = (section.paragraphs ?? [])
    .map((paragraph) => `<p>${paragraph}</p>`)
    .join("");
  const list = section.items?.length
    ? `<ul>${section.items.map((item) => `<li>${item}</li>`).join("")}</ul>`
    : "";
  const steps = section.steps?.length
    ? `<ol>${section.steps.map((item) => `<li>${item}</li>`).join("")}</ol>`
    : "";

  return `<section class="prose-section">
    <h2>${escapeHtml(section.heading)}</h2>
    ${paragraphs}${list}${steps}
  </section>`;
}

function pageType(page) {
  if (page.kind === "about") return "AboutPage";
  if (page.kind === "contact") return "ContactPage";
  if (page.kind === "collection") return "CollectionPage";
  return "WebPage";
}

function renderSchema(page) {
  const canonical = `${siteUrl}/${page.slug}/`;
  const breadcrumbs = page.breadcrumbs ?? [
    { name: "Strona główna", url: "/" },
    { name: page.shortTitle ?? page.h1, url: `/${page.slug}/` },
  ];
  const graph = [websiteNode, businessNode];

  const webpage = {
    "@type": pageType(page),
    "@id": `${canonical}#webpage`,
    url: canonical,
    name: page.title,
    description: page.description,
    isPartOf: { "@id": websiteId },
    about: { "@id": businessId },
    inLanguage: "pl-PL",
    dateModified: page.updated ?? "2026-07-22",
  };

  if (page.kind === "article") {
    webpage["@type"] = "Article";
    webpage.headline = page.h1;
    webpage.datePublished = page.published ?? "2026-07-22";
    webpage.author = { "@type": "Organization", name: "Platinus.pl" };
    webpage.publisher = { "@id": businessId };
  }

  graph.push(webpage);

  if (page.kind === "about") {
    graph.push({
      "@type": "Person",
      "@id": `${canonical}#andrzej-kowalczyk`,
      name: "Andrzej Kowalczyk",
      jobTitle: "Certyfikowany księgowy",
      worksFor: { "@id": businessId },
      hasCredential: {
        "@type": "EducationalOccupationalCredential",
        name: "Certyfikat księgowy nr 10544/2005",
      },
      sameAs: cikProfile,
    });
    webpage.mainEntity = { "@id": `${canonical}#andrzej-kowalczyk` };
  }

  if (page.kind === "service") {
    graph.push({
      "@type": "Service",
      "@id": `${canonical}#service`,
      url: canonical,
      name: page.h1,
      description: page.description,
      provider: { "@id": businessId },
      areaServed: [
        { "@type": "City", name: "Warszawa" },
        { "@type": "Country", name: "Polska" },
      ],
      serviceType: page.serviceType,
    });
    webpage.about = { "@id": `${canonical}#service` };
  }

  graph.push({
    "@type": "BreadcrumbList",
    "@id": `${canonical}#breadcrumbs`,
    itemListElement: breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${siteUrl}${item.url}`,
    })),
  });

  if (page.faq?.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${canonical}#faq`,
      mainEntity: page.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    });
  }

  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph })
    .replaceAll("<", "\\u003c")
    .replaceAll(">", "\\u003e");
}

function renderPage(page) {
  const canonical = `${siteUrl}/${page.slug}/`;
  const articleMeta =
    page.kind === "article"
      ? `<p class="article-meta">Autor: Platinus.pl · Opublikowano: 22 lipca 2026 · Aktualizacja: 22 lipca 2026</p>`
      : "";
  const related = page.related?.length
    ? `<aside class="page-aside" aria-label="Powiązane treści">
        <p class="eyebrow">Zobacz także</p>
        <ul>${page.related
          .map(
            (item) =>
              `<li><a href="${escapeHtml(item.url)}">${escapeHtml(item.label)}</a></li>`,
          )
          .join("")}</ul>
      </aside>`
    : "";
  const highlights = page.highlights?.length
    ? `<div class="page-highlights"><p>Najważniejsze informacje</p><ul>${page.highlights
        .map((item) => `<li>${item}</li>`)
        .join("")}</ul></div>`
    : "";
  const faq = page.faq?.length
    ? `<section class="section page-faq" aria-labelledby="faq-title">
        <div class="container content-narrow">
          <p class="eyebrow">FAQ</p>
          <h2 id="faq-title">Najczęstsze pytania</h2>
          <div class="faq-list">${page.faq
            .map(
              (item) =>
                `<details><summary>${escapeHtml(item.question)}</summary><p>${item.answer}</p></details>`,
            )
            .join("")}</div>
        </div>
      </section>`
    : "";

  return `<!doctype html>
<html lang="pl">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(page.title)}</title>
    <meta name="description" content="${escapeHtml(page.description)}" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <link rel="canonical" href="${canonical}" />
    <meta property="og:locale" content="pl_PL" />
    <meta property="og:type" content="${page.kind === "article" ? "article" : "website"}" />
    <meta property="og:site_name" content="Platinus.pl" />
    <meta property="og:title" content="${escapeHtml(page.title)}" />
    <meta property="og:description" content="${escapeHtml(page.description)}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${siteUrl}/icons/og-image-seo.jpg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="Platinus.pl — biuro rachunkowe w Warszawie i online" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(page.title)}" />
    <meta name="twitter:description" content="${escapeHtml(page.description)}" />
    <meta name="twitter:image" content="${siteUrl}/icons/og-image-seo.jpg" />
    <link rel="icon" href="/icons/favicon.ico" sizes="any" />
    <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
    <link rel="manifest" href="/icons/site.webmanifest" />
    <meta name="theme-color" content="#181313" />
    <link rel="stylesheet" href="/variables.css" />
    <link rel="stylesheet" href="/style.css" />
    <script type="application/ld+json">${renderSchema(page)}</script>
  </head>
  <body class="subpage">
    <a class="skip-link" href="#main-content">Przejdź do treści</a>
    <header class="site-header" data-header><div class="container header-inner">${renderNavigation()}</div></header>
    <div class="nav-overlay" data-nav-overlay aria-hidden="true"></div>
    <main id="main-content">
      <section class="page-hero">
        <div class="container">
          ${renderBreadcrumbs(page)}
          <div class="page-hero__grid">
            <div>
              <p class="eyebrow eyebrow--light">${escapeHtml(page.eyebrow)}</p>
              <h1>${escapeHtml(page.h1)}</h1>
              <p class="page-lead">${page.lead}</p>
              ${articleMeta}
              <div class="hero-actions">
                <a class="button" href="mailto:biuro@platinus.pl?subject=Zapytanie%20o%20wycen%C4%99">Napisz po wycenę</a>
                <a class="button button--ghost" href="tel:+48664496913">Zadzwoń: 664 496 913</a>
              </div>
            </div>
            ${highlights}
          </div>
        </div>
      </section>
      <section class="section page-content">
        <div class="container content-layout">
          <article class="prose">${page.sections.map(renderSection).join("")}</article>
          ${related}
        </div>
      </section>
      ${faq}
      <section class="section page-cta" aria-labelledby="cta-title">
        <div class="container page-cta__inner">
          <div><p class="eyebrow eyebrow--light">Porozmawiajmy</p><h2 id="cta-title">Potrzebujesz dopasowanej wyceny?</h2><p>Napisz, jaką działalność prowadzisz, ile dokumentów rozliczasz i jakiego zakresu obsługi potrzebujesz.</p></div>
          <a class="button" href="mailto:biuro@platinus.pl?subject=Zapytanie%20o%20wycen%C4%99">Napisz na biuro@platinus.pl</a>
        </div>
      </section>
    </main>
    ${renderFooter()}
    <script src="/script.js" defer></script>
  </body>
</html>`.replace(/^[ \t]+$/gm, "");
}

pages.push(
  {
    slug: "ksiegowosc-online",
    kind: "service",
    serviceType: "Księgowość online dla firm",
    shortTitle: "Księgowość online",
    title: "Księgowość online dla firm z całej Polski | Platinus",
    description:
      "Księgowość online dla firm z całej Polski: dokumenty elektroniczne, stały opiekun, KPiR, ryczałt, pełne księgi oraz kadry i płace.",
    eyebrow: "Warszawa i cała Polska",
    h1: "Księgowość online ze stałym opiekunem",
    lead: "Prowadzimy rozliczenia zdalnie dla firm z całej Polski. Dokumenty przekazujesz elektronicznie, a sprawy omawiasz bezpośrednio z osobą odpowiedzialną za Twoją obsługę.",
    highlights: [
      "Obsługa zdalna w całej Polsce",
      "Dokumenty i archiwum online 24/7",
      "KPiR, ryczałt, pełne księgi i kadry",
      "Możliwość spotkania w biurze w Warszawie",
    ],
    sections: [
      {
        heading: "Na czym polega księgowość online w Platinus",
        paragraphs: [
          "Księgowość online nie oznacza anonimowej obsługi przez aplikację. Po ustaleniu zakresu współpracy otrzymujesz uzgodniony sposób przekazywania dokumentów i kontakt do stałego opiekuna. Rozliczenia, deklaracje, zestawienia oraz pytania dotyczące bieżącej działalności obsługujemy bez konieczności regularnych wizyt w biurze.",
          "Model zdalny sprawdza się zarówno w jednoosobowej działalności, jak i w spółce zatrudniającej pracowników. Zakres dopasowujemy do formy opodatkowania, liczby dokumentów, obowiązków VAT oraz potrzeb kadrowo-płacowych. Jeśli część dokumentów nadal funkcjonuje papierowo, wspólnie ustalamy praktyczny sposób ich przekazania.",
        ],
      },
      {
        heading: "Co może obejmować obsługa zdalna",
        paragraphs: [
          "Usługa może łączyć bieżące prowadzenie ewidencji z obsługą rozliczeń podatkowych, ZUS i pracowników. Przed rozpoczęciem współpracy spisujemy zakres, aby było jasne, które zadania realizuje biuro, a które pozostają po stronie przedsiębiorcy.",
        ],
        items: [
          "prowadzenie KPiR, ewidencji przychodów albo ksiąg handlowych,",
          "rejestry VAT, pliki JPK i uzgodnione rozliczenia podatkowe,",
          "ewidencję środków trwałych oraz wartości niematerialnych i prawnych,",
          "naliczanie wynagrodzeń, dokumentację kadrową i rozliczenia ZUS,",
          "zestawienia i informacje potrzebne do bieżącego zarządzania firmą,",
          "dostęp do programu do fakturowania i elektronicznego archiwum dokumentów.",
        ],
      },
      {
        heading: "Jak rozpocząć współpracę online",
        paragraphs: [
          "Start dzielimy na proste etapy. Najpierw poznajemy firmę, dotychczasowy sposób rozliczeń i oczekiwany zakres wsparcia. Następnie przygotowujemy listę potrzebnych dokumentów oraz ustalamy termin przekazania danych. Dzięki temu zmiana biura lub rozpoczęcie obsługi nowej działalności nie opiera się na domysłach.",
        ],
        steps: [
          "Napisz, jaką działalność prowadzisz, jak się rozliczasz i ile dokumentów występuje przeciętnie w miesiącu.",
          "Potwierdzimy zakres, sposób przekazywania dokumentów oraz orientacyjną cenę.",
          "Przekażesz dokumenty i upoważnienia zgodnie z otrzymaną listą.",
          "Po uruchomieniu obsługi otrzymasz uzgodniony rytm kontaktu i dostęp do narzędzi online.",
        ],
      },
      {
        heading: "Online nie wyklucza kontaktu osobistego",
        paragraphs: [
          "Siedziba Platinus znajduje się przy ul. Jugosłowiańskiej 17B/97 w Warszawie. Klienci lokalni mogą łączyć obieg elektroniczny ze spotkaniami w biurze, a firmy spoza Warszawy prowadzić współpracę całkowicie zdalnie. W obu wariantach zależy nam na jasnym podziale odpowiedzialności i bezpośrednim kontakcie.",
          "Jeśli nie wiesz, czy dla Twojej firmy lepszy będzie model w pełni zdalny, czy hybrydowy, opisz sposób pracy zespołu i obieg dokumentów. Zaproponujemy rozwiązanie, które ogranicza powtarzalne czynności, ale nie utrudnia dostępu do księgowości.",
        ],
      },
      {
        heading: "Kiedy model online działa najlepiej",
        paragraphs: [
          "Obsługa zdalna jest szczególnie wygodna dla firm, które już wystawiają faktury elektronicznie, korzystają z bankowości internetowej i mają jedną osobę odpowiedzialną za kompletność dokumentów. Sprawdza się także w zespołach rozproszonych, gdzie papierowe przekazywanie materiałów opóźniałoby rozliczenia. Ważniejsza od wielkości firmy jest powtarzalność procesu i gotowość do pracy w uzgodnionym systemie.",
          "Jeżeli dokumenty powstają w kilku miejscach, najpierw porządkujemy odpowiedzialność: kto dodaje sprzedaż, kto zakupy, kto odpowiada za bank i kto potwierdza zakończenie miesiąca. Biuro nie powinno samodzielnie zgadywać, czy zestaw jest kompletny. Jasny właściciel procesu po stronie klienta skraca liczbę pytań i pozwala wykorzystać zalety modelu online bez utraty kontroli.",
          "Przed rozpoczęciem współpracy warto sprawdzić, czy używane programy pozwalają eksportować dokumenty w czytelnej formie i czy pliki mają jednoznaczne nazwy. Ustalamy też sposób zgłaszania korekt oraz miejsce przechowywania potwierdzeń. Nie chodzi o wdrażanie skomplikowanej technologii, lecz o ograniczenie ręcznego przepisywania danych i ryzyka pominięcia dokumentu. Gdy firma rozwija sprzedaż albo zatrudnia kolejne osoby, proces można rozszerzyć bez zmiany podstawowych zasad. Dzięki temu księgowość online pozostaje przewidywalna również wtedy, gdy miesięczna liczba operacji stopniowo rośnie.",
        ],
      },
      {
        heading: "Cena księgowości online",
        paragraphs: [
          "Cena zależy przede wszystkim od formy księgowości, liczby dokumentów, statusu VAT, liczby pracowników i dodatkowych raportów. Sam zdalny sposób przekazywania dokumentów nie zastępuje wyceny zakresu. Orientacyjne stawki publikujemy w cenniku, a finalną miesięczną opłatę potwierdzamy przed rozpoczęciem współpracy.",
          "W wiadomości warto podać przybliżoną liczbę faktur sprzedaży i zakupu, liczbę rachunków bankowych, liczbę zatrudnionych osób oraz informację, czy firma prowadzi sprzedaż zagraniczną. Pozwala to szybciej przygotować sensowną propozycję.",
        ],
      },
    ],
    faq: [
      {
        question: "Czy całą księgowość można prowadzić bez wizyt w biurze?",
        answer:
          "Tak. Dokumenty można przekazywać elektronicznie, a bieżące sprawy omawiać mailowo i telefonicznie. Sposób działania ustalamy przed rozpoczęciem współpracy.",
      },
      {
        question: "Czy obsługujecie firmy spoza Warszawy?",
        answer:
          "Tak. Obsługa zdalna jest dostępna dla firm z całej Polski, niezależnie od miejsca prowadzenia działalności.",
      },
      {
        question: "Jak przekazuje się dokumenty?",
        answer:
          "Najczęściej elektronicznie przez uzgodniony system i archiwum. Jeżeli potrzebny jest inny obieg, ustalamy go indywidualnie.",
      },
      {
        question: "Czy księgowość online obejmuje kadry i płace?",
        answer:
          "Może obejmować obsługę pracowników i zleceniobiorców. Zakres kadrowo-płacowy wyceniamy zależnie od liczby osób i potrzebnej dokumentacji.",
      },
    ],
    related: [
      {
        label: "Jak przekazywać dokumenty online",
        url: "/poradnik/jak-przekazywac-dokumenty-online/",
      },
      {
        label: "Księgowość online czy lokalne biuro",
        url: "/poradnik/ksiegowosc-online-czy-lokalna/",
      },
      { label: "Cennik usług", url: "/cennik/" },
      { label: "Kontakt", url: "/kontakt/" },
    ],
  },
  {
    slug: "pelna-ksiegowosc",
    kind: "service",
    serviceType: "Prowadzenie ksiąg rachunkowych",
    shortTitle: "Pełna księgowość",
    title: "Pełna księgowość Warszawa i online | Platinus",
    description:
      "Pełna księgowość i księgi handlowe dla spółek w Warszawie i online: ewidencje, VAT, JPK, zestawienia oraz sprawozdania finansowe.",
    eyebrow: "Księgi handlowe",
    h1: "Pełna księgowość dla spółek i firm",
    lead: "Prowadzimy księgi rachunkowe, rozliczenia i uzgodniony zakres raportowania dla firm z Warszawy oraz klientów obsługiwanych całkowicie online.",
    highlights: [
      "Księgi rachunkowe i ewidencje pomocnicze",
      "VAT, JPK i uzgodnione rozliczenia",
      "Sprawozdania finansowe od 1000 zł netto",
      "Stały opiekun i dokumenty online",
    ],
    sections: [
      {
        heading: "Co obejmuje prowadzenie pełnej księgowości",
        paragraphs: [
          "Pełna księgowość wymaga systematycznego ujmowania operacji gospodarczych w księgach rachunkowych oraz zachowania spójności między dokumentami, rozrachunkami, podatkami i raportami. Zakres obsługi ustalamy na podstawie rodzaju działalności, liczby dokumentów, sposobu sprzedaży i oczekiwań zarządu.",
          "Współpraca może obejmować bieżące księgowanie, rejestry VAT, ewidencję środków trwałych, rozrachunki, przygotowanie danych do płatności podatków, pliki JPK, sprawozdawczość oraz wybrane zestawienia zarządcze. Czynności wymagające dodatkowych danych lub odrębnego uzgodnienia wskazujemy przed ich wykonaniem.",
        ],
      },
      {
        heading: "Dla kogo jest ta usługa",
        paragraphs: [
          "Pełne księgi prowadzą między innymi spółki kapitałowe oraz inne podmioty zobowiązane do stosowania ustawy o rachunkowości. Z usługi korzystają także przedsiębiorcy, którzy wybierają ten model dobrowolnie, ponieważ potrzebują dokładniejszego obrazu finansów i rozrachunków.",
        ],
        items: [
          "spółki z ograniczoną odpowiedzialnością i inne spółki handlowe,",
          "firmy usługowe, handlowe i produkcyjne,",
          "podmioty zatrudniające pracowników lub współpracujące z wykonawcami,",
          "firmy potrzebujące cyklicznych zestawień należności i zobowiązań,",
          "przedsiębiorstwa przechodzące z uproszczonej ewidencji na księgi rachunkowe.",
        ],
      },
      {
        heading: "Przejęcie ksiąg i uporządkowanie startu",
        paragraphs: [
          "Przy zmianie biura rachunkowego najważniejsza jest kompletność danych. Ustalamy dzień przejęcia, prosimy o dokumenty, zestawienia oraz informacje potrzebne do zachowania ciągłości zapisów. Zakres listy zależy od momentu roku, używanego systemu i stanu dotychczasowych rozliczeń.",
          "Nie obiecujemy przejęcia bez analizy. Najpierw sprawdzamy, jakie dane są dostępne i czy wymagają uzupełnienia. Jeśli wykryjemy braki, opisujemy je w sposób pozwalający ustalić dalsze działania. Taki start ogranicza ryzyko, że problem z poprzednich okresów zostanie zauważony dopiero przy zamknięciu roku.",
        ],
      },
      {
        heading: "Raportowanie i kontakt z zarządem",
        paragraphs: [
          "Księgi powinny nie tylko spełniać obowiązki ewidencyjne, ale również dostarczać uporządkowanych informacji. Zakres raportów ustalamy przed rozpoczęciem współpracy. Mogą to być między innymi zestawienia rozrachunków, obrotów i sald oraz dane potrzebne do rozmów z bankiem, leasingodawcą lub wspólnikami.",
          "Częstotliwość i format zależą od potrzeb firmy. Standardowe rozliczenia miesięczne różnią się od rozbudowanego raportowania zarządczego, dlatego dodatkowe zestawienia opisujemy i wyceniamy oddzielnie. Dzięki temu klient wie, które materiały otrzyma w ramach stałej opłaty.",
        ],
      },
      {
        heading: "Odpowiedzialność firmy i biura",
        paragraphs: [
          "Biuro prowadzi księgi na podstawie dokumentów oraz informacji otrzymanych od klienta. Spółka lub przedsiębiorca odpowiada za prawdziwość danych, zatwierdzanie zdarzeń i przekazanie kontekstu, którego nie widać na fakturze. W praktyce potrzebna jest wskazana osoba kontaktowa, która zna operacje firmy i może wyjaśnić nietypowe płatności, umowy albo rozliczenia ze wspólnikami.",
          "Po stronie biura leży realizacja uzgodnionego zakresu, informowanie o zauważonych brakach i przekazywanie danych w ustalonym rytmie. Współpraca działa najlepiej, gdy terminy są znane obu stronom, a zadania dodatkowe nie są wykonywane bez omówienia. Taki podział ogranicza ryzyko, że ważna informacja pozostanie wyłącznie w skrzynce jednej osoby lub zostanie przekazana już po zamknięciu okresu.",
          "Pełna księgowość wymaga również spójnego opisywania zdarzeń, zwłaszcza gdy jedna firma realizuje kilka projektów, posiada oddziały albo rozlicza finansowanie. Warto wcześniej ustalić, które informacje zarząd chce później analizować i jakie oznaczenia muszą pojawiać się przy dokumentach. Zmiana sposobu raportowania po wielu miesiącach może wymagać ponownego przeglądu zapisów. Regularne uzgadnianie oczekiwań pozwala więc nie tylko prawidłowo zamknąć okres, ale też otrzymywać dane, które wspierają bieżące decyzje dotyczące kosztów, należności i płynności spółki.",
        ],
      },
      {
        heading: "Ile kosztuje pełna księgowość",
        paragraphs: [
          "Orientacyjna cena prowadzenia ksiąg handlowych wynosi 800 zł netto miesięcznie przy maksymalnie 50 dokumentach oraz 1300 zł netto przy maksymalnie 100 dokumentach. Sprawozdanie finansowe kosztuje od 1000 zł netto. Cennik ma charakter informacyjny i nie zastępuje indywidualnej wyceny.",
          "Na cenę wpływają między innymi liczba dokumentów i rachunków, rozliczenia walutowe, środki trwałe, liczba pracowników, wymagane raporty oraz stan dokumentacji przy przejęciu. Przed podpisaniem umowy potwierdzamy zakres i stawkę, aby miesięczny koszt był przewidywalny.",
        ],
      },
    ],
    faq: [
      {
        question: "Czy pełną księgowość można prowadzić całkowicie online?",
        answer:
          "Tak. Dokumenty i uzgodnienia mogą być obsługiwane zdalnie. Klientom z Warszawy oferujemy również możliwość spotkania w biurze.",
      },
      {
        question: "Czy pomagacie przejąć księgi od innego biura?",
        answer:
          "Tak. Ustalamy zakres dokumentów i dzień przejęcia, a po otrzymaniu danych sprawdzamy ich kompletność potrzebną do kontynuacji obsługi.",
      },
      {
        question: "Czy sprawozdanie finansowe jest w stałej cenie?",
        answer:
          "Nie. Cena zaczyna się od 1000 zł netto i zależy od zakresu, stanu ksiąg oraz potrzebnych prac zamknięciowych.",
      },
      {
        question: "Czy pełna księgowość może obejmować kadry i płace?",
        answer:
          "Tak. Obsługę pracowników i zleceniobiorców można dołączyć do zakresu księgowego i rozliczać według liczby osób.",
      },
    ],
    related: [
      { label: "Księgowość dla spółek z o.o.", url: "/ksiegowosc-spolki-zoo/" },
      {
        label: "Co obejmuje pełna księgowość",
        url: "/poradnik/co-obejmuje-pelna-ksiegowosc/",
      },
      { label: "Cennik pełnej księgowości", url: "/cennik/" },
      {
        label: "Jak zmienić biuro rachunkowe",
        url: "/poradnik/jak-zmienic-biuro-rachunkowe/",
      },
    ],
  },
  {
    slug: "kpir-i-ryczalt",
    kind: "service",
    serviceType: "KPiR i ewidencja przychodów",
    shortTitle: "KPiR i ryczałt",
    title: "KPiR i ryczałt — księgowość Warszawa i online | Platinus",
    description:
      "Prowadzenie KPiR i ewidencji przychodów dla jednoosobowych działalności i małych firm. Obsługa w Warszawie oraz zdalnie w całej Polsce.",
    eyebrow: "Uproszczona księgowość",
    h1: "KPiR i ryczałt dla małych firm",
    lead: "Porządkujemy bieżące dokumenty, ewidencje i rozliczenia przedsiębiorców korzystających z KPiR albo ryczałtu od przychodów ewidencjonowanych.",
    highlights: [
      "KPiR od 250 zł netto miesięcznie",
      "Ryczałt od 250 zł netto miesięcznie",
      "VAT, JPK i środki trwałe w uzgodnionym zakresie",
      "Obsługa stacjonarna lub całkowicie online",
    ],
    sections: [
      {
        heading: "Księgowość dopasowana do formy rozliczeń",
        paragraphs: [
          "Księga Przychodów i Rozchodów oraz ewidencja przychodów służą innym sposobom opodatkowania, ale w obu przypadkach liczy się terminowe przekazywanie kompletnych dokumentów i prawidłowe przyporządkowanie zdarzeń gospodarczych. Na początku współpracy ustalamy, jakie dowody trafiają do biura i w jakim terminie.",
          "Nie ograniczamy obsługi do przepisania faktur. W uzgodnionym zakresie prowadzimy dodatkowe ewidencje, przygotowujemy dane do rozliczeń, pilnujemy cyklu dokumentów i informujemy o brakach. Jeżeli sytuacja wymaga decyzji podatkowej lub porady wykraczającej poza stałą obsługę, wskazujemy to oddzielnie.",
        ],
      },
      {
        heading: "Co może obejmować KPiR",
        paragraphs: [
          "Zakres zależy od działalności i statusu podatnika. Dla firmy usługowej bez pracowników będzie inny niż dla przedsiębiorcy handlowego z magazynem, VAT i kilkoma rachunkami bankowymi. Wycena uwzględnia faktyczną pracochłonność, a nie wyłącznie nazwę formy opodatkowania.",
        ],
        items: [
          "prowadzenie Podatkowej Księgi Przychodów i Rozchodów,",
          "rejestry VAT oraz pliki JPK w uzgodnionym zakresie,",
          "ewidencję środków trwałych i wartości niematerialnych i prawnych,",
          "informacje o kwotach wynikających z bieżących rozliczeń,",
          "obsługę dokumentów elektronicznych i dostęp do archiwum,",
          "kadry, płace i ZUS jako dodatkowy zakres współpracy.",
        ],
      },
      {
        heading: "Jak wygląda obsługa ryczałtu",
        paragraphs: [
          "Przy ryczałcie podstawą jest prawidłowe ujęcie przychodów w ewidencji oraz zastosowanie zasad odpowiadających prowadzonej działalności. Przed rozpoczęciem obsługi prosimy o informacje o rodzajach świadczonych usług lub sprzedawanych towarów, rejestracji VAT i dotychczasowych rozliczeniach.",
          "Jeżeli przedsiębiorca wykonuje różne rodzaje czynności, potrzebny jest czytelny podział dokumentów i opis sprzedaży. Ustalamy sposób przekazywania takich informacji, aby ewidencja nie była budowana na niepełnych danych. Wątpliwości wymagające indywidualnej interpretacji identyfikujemy przed rozliczeniem.",
        ],
      },
      {
        heading: "Dokumenty i terminy bez zbędnego chaosu",
        paragraphs: [
          "Na początku przekazujemy listę potrzebnych materiałów i ustalamy dzień miesiąca, do którego powinny trafić do biura. Dokumenty można przekazywać online. Elektroniczny obieg ułatwia odnalezienie faktur i ogranicza sytuacje, w których pojedynczy dokument pojawia się dopiero po przygotowaniu rozliczenia.",
          "Przedsiębiorca nadal odpowiada za kompletność i prawdziwość dostarczonych danych, dlatego zachęcamy do regularnego przekazywania dokumentów zamiast gromadzenia ich do ostatniej chwili. Stały rytm współpracy jest ważniejszy niż samo narzędzie używane do przesyłania plików.",
        ],
      },
      {
        heading: "KPiR czy ryczałt — nie wybieraj wyłącznie po nazwie",
        paragraphs: [
          "Forma ewidencji jest powiązana ze sposobem opodatkowania i charakterem działalności. Nie każda firma może swobodnie wybrać dowolny wariant, a opłacalność zależy od przychodów, kosztów i rodzaju wykonywanych czynności. Stała obsługa księgowa nie powinna opierać się na krótkiej poradzie bez poznania sytuacji przedsiębiorcy.",
          "Jeżeli dopiero zakładasz działalność albo rozważasz zmianę, przygotuj opis planowanych usług, odbiorców, kosztów, zatrudnienia i sprzedaży zagranicznej. Na tej podstawie można ustalić, jakie pytania wymagają odpowiedzi przed rejestracją lub kolejnym rokiem. Sama cena miesięcznej księgowości jest tylko jednym z elementów decyzji i nie powinna przesłaniać obowiązków wynikających z wybranego modelu.",
          "W trakcie roku znaczenie mają także zmiany skali działalności: nowe źródło przychodów, przekroczenie określonych limitów, rejestracja do VAT albo rozpoczęcie współpracy z kontrahentami zagranicznymi. Takie zdarzenia mogą wpłynąć na zakres dokumentów i sposób prowadzenia ewidencji. Dlatego klient powinien przekazywać informacje nie tylko o wystawionych fakturach, lecz również o planowanych zmianach. Wspólne omówienie sytuacji pozwala przygotować obieg dokumentów i uniknąć przypadkowego stosowania dotychczasowego schematu do transakcji, która wymaga innego ujęcia lub dodatkowych danych.",
        ],
      },
      {
        heading: "Ceny KPiR i ryczałtu",
        paragraphs: [
          "Przy maksymalnie 20 dokumentach orientacyjna cena KPiR wynosi 250 zł netto miesięcznie. Taka sama orientacyjna stawka dotyczy ewidencji przychodów na ryczałcie przy maksymalnie 20 dokumentach. KPiR do 50 dokumentów kosztuje orientacyjnie 400 zł netto miesięcznie.",
          "Ostateczna wycena uwzględnia między innymi VAT, liczbę rachunków, transakcje zagraniczne, dodatkowe ewidencje, liczbę pracowników i sposób przygotowania dokumentów. Wszystkie ceny potwierdzamy przed rozpoczęciem obsługi.",
        ],
      },
    ],
    faq: [
      {
        question: "Ile kosztuje prowadzenie KPiR?",
        answer:
          "Orientacyjna cena wynosi 250 zł netto miesięcznie do 20 dokumentów oraz 400 zł netto do 50 dokumentów. Finalna stawka zależy od pełnego zakresu.",
      },
      {
        question: "Ile kosztuje obsługa ryczałtu?",
        answer:
          "Orientacyjna cena ewidencji przychodów wynosi 250 zł netto miesięcznie do 20 dokumentów.",
      },
      {
        question: "Czy mogę przesyłać dokumenty online?",
        answer:
          "Tak. Obsługujemy elektroniczny obieg dokumentów i współpracujemy z klientami z całej Polski.",
      },
      {
        question: "Czy w ramach KPiR obsługujecie VAT i JPK?",
        answer:
          "Tak, jeżeli wynika to z uzgodnionego zakresu współpracy. Status VAT i rodzaj transakcji uwzględniamy przy wycenie.",
      },
    ],
    related: [
      {
        label: "Księgowość dla jednoosobowej działalności",
        url: "/ksiegowosc-jdg/",
      },
      { label: "Księgowość online", url: "/ksiegowosc-online/" },
      { label: "Cennik", url: "/cennik/" },
      { label: "Kadry i płace", url: "/kadry-i-place/" },
    ],
  },
  {
    slug: "kadry-i-place",
    kind: "service",
    serviceType: "Obsługa kadrowo-płacowa",
    shortTitle: "Kadry i płace",
    title: "Kadry i płace dla firm Warszawa i online | Platinus",
    description:
      "Obsługa kadr i płac: listy płac, dokumentacja pracowników i zleceniobiorców, ZUS, PIT oraz uzgodnione zgłoszenia. Warszawa i cała Polska.",
    eyebrow: "Obsługa pracowników",
    h1: "Kadry i płace dla małych i średnich firm",
    lead: "Prowadzimy uzgodnioną dokumentację kadrową i rozliczenia wynagrodzeń pracowników oraz zleceniobiorców — jako samodzielną usługę lub część księgowości.",
    highlights: [
      "Pracownik: 45 zł netto miesięcznie",
      "Zleceniobiorca: 30 zł netto miesięcznie",
      "Listy płac, ZUS i informacje roczne",
      "Dokumentacja kadrowa w ustalonym zakresie",
    ],
    sections: [
      {
        heading: "Co obejmuje obsługa kadrowo-płacowa",
        paragraphs: [
          "Zakres kadr i płac zależy od form zatrudnienia, liczby osób i podziału zadań między firmę a biuro. Przed rozpoczęciem współpracy ustalamy, kto przekazuje dane o czasie pracy, nieobecnościach, składnikach wynagrodzeń i zmianach warunków zatrudnienia. Bez regularnego obiegu informacji nawet najlepszy system nie zapewni poprawnych naliczeń.",
          "W stałej obsłudze możemy przygotowywać listy płac, dokumenty związane z zatrudnieniem i zakończeniem współpracy, uzgodnione zgłoszenia oraz rozliczenia ZUS i informacje roczne. Nietypowe przypadki, korekty historyczne i rozbudowane regulacje wewnętrzne wymagają osobnego ustalenia.",
        ],
      },
      {
        heading: "Pracownicy i zleceniobiorcy",
        paragraphs: [
          "Dokumentacja pracownika różni się od obsługi osoby wykonującej umowę cywilnoprawną. Dlatego już przy wycenie pytamy o formy współpracy, liczbę osób, częstotliwość zmian oraz sposób ewidencjonowania danych. Pozwala to określić rzeczywisty nakład pracy i odpowiedzialność każdej strony.",
        ],
        items: [
          "naliczanie wynagrodzeń na podstawie przekazanych danych,",
          "listy płac i uzgodnione zestawienia,",
          "zgłoszenia i dokumenty rozliczeniowe ZUS,",
          "informacje roczne PIT i ZUS dla zatrudnionych,",
          "umowy, świadectwa pracy i elementy akt osobowych w ustalonym zakresie,",
          "obsługa umów zlecenia i o dzieło zgodnie z zakresem umowy.",
        ],
      },
      {
        heading: "Jak przekazywać dane do wynagrodzeń",
        paragraphs: [
          "Ustalamy cykliczny termin przekazania informacji o nieobecnościach, premiach, godzinach, nowych osobach i zakończonych umowach. Dane powinny pochodzić od wskazanej osoby po stronie klienta. Dzięki temu ograniczamy rozbieżności i sytuacje, w których zmiana trafia do biura po przygotowaniu listy płac.",
          "Przy wdrożeniu przygotowujemy listę danych pracowników i dokumentów niezbędnych do rozpoczęcia obsługi. Jeżeli przejmujemy kadry w trakcie roku, potrzebne mogą być dodatkowe informacje o dotychczasowych wynagrodzeniach i rozliczeniach. Zakres potwierdzamy po zapoznaniu się z sytuacją firmy.",
        ],
      },
      {
        heading: "Kadry razem z księgowością lub osobno",
        paragraphs: [
          "Obsługę kadrowo-płacową można połączyć z KPiR, ryczałtem lub pełnymi księgami. Zaletą wspólnego zakresu jest uporządkowany przepływ danych między listami płac a ewidencją księgową. Możemy również omówić samodzielną obsługę kadr, jeżeli księgowość firma prowadzi w innym miejscu.",
          "Nie każda organizacja potrzebuje identycznego pakietu. Mała firma z jedną umową ma inne potrzeby niż spółka z rotacją pracowników, zmiennymi składnikami wynagrodzeń i kilkoma typami umów. Dlatego zakres i terminy opisujemy przed rozpoczęciem współpracy.",
        ],
      },
      {
        heading: "Jak wygląda wdrożenie kadr i płac",
        paragraphs: [
          "Przed pierwszym naliczeniem ustalamy listę zatrudnionych osób, rodzaje umów, terminy wypłat i składniki wynagrodzeń. Firma przekazuje dokumenty oraz informacje o dotychczasowych rozliczeniach, a biuro wskazuje zauważone braki. Przy przejęciu w trakcie roku zakres danych jest szerszy, ponieważ trzeba zachować ciągłość informacji potrzebnych do dokumentów rocznych i bieżących naliczeń.",
          "Wdrożenie obejmuje również ustalenie osoby zatwierdzającej dane po stronie klienta. Informacje o premiach, godzinach, nieobecnościach czy zakończeniu umowy powinny trafiać jednym kanałem i przed uzgodnioną datą. Jeśli firma zmienia decyzję po przygotowaniu listy płac, korekta może wymagać dodatkowej pracy. Jasny kalendarz ogranicza takie sytuacje i pozwala pracownikom otrzymać dokumenty na czas.",
          "Przy stałej obsłudze ważne jest rozróżnienie danych cyklicznych od wyjątków. Wynagrodzenie zasadnicze może powtarzać się co miesiąc, ale urlop, zwolnienie, premia, nadgodziny czy zmiana wymiaru czasu pracy wymagają aktualnej informacji. Pracodawca powinien też wskazać, kto odpowiada za kompletność danych i kto ostatecznie zatwierdza naliczenie. Biuro może przygotować dokumentację w uzgodnionym zakresie, jednak nie zastąpi decyzji organizacyjnych po stronie firmy. Prosty harmonogram i jedna lista zmian ograniczają rozbieżności między ewidencją czasu pracy, wypłatą i dokumentami przekazywanymi zatrudnionym osobom.",
        ],
      },
      {
        heading: "Cennik kadr i płac",
        paragraphs: [
          "Orientacyjna miesięczna cena obsługi pracownika wynosi 45 zł netto za osobę, a zleceniobiorcy 30 zł netto za osobę. Stawki dotyczą standardowego, uzgodnionego zakresu i mogą się zmienić przy nietypowej dokumentacji, korektach lub dodatkowych raportach.",
          "Aby otrzymać wycenę, podaj liczbę pracowników i zleceniobiorców, stosowane typy umów, częstotliwość wypłat oraz informację, czy potrzebujesz pełnej dokumentacji kadrowej, czy jedynie naliczeń i rozliczeń. Ostateczną cenę potwierdzimy przed startem.",
        ],
      },
    ],
    faq: [
      {
        question: "Ile kosztuje obsługa pracownika?",
        answer:
          "Orientacyjna stawka wynosi 45 zł netto miesięcznie za pracownika, zależnie od uzgodnionego zakresu.",
      },
      {
        question: "Ile kosztuje obsługa zleceniobiorcy?",
        answer:
          "Orientacyjna stawka wynosi 30 zł netto miesięcznie za zleceniobiorcę.",
      },
      {
        question: "Czy można zlecić tylko kadry i płace?",
        answer:
          "Możemy omówić samodzielny zakres kadrowo-płacowy albo połączyć go z prowadzoną przez Platinus księgowością.",
      },
      {
        question: "Czy obsługujecie firmy całkowicie zdalnie?",
        answer:
          "Tak. Dane i dokumenty można przekazywać online, a szczegóły bieżącej obsługi ustalać mailowo i telefonicznie.",
      },
    ],
    related: [
      { label: "Pełna księgowość", url: "/pelna-ksiegowosc/" },
      { label: "KPiR i ryczałt", url: "/kpir-i-ryczalt/" },
      { label: "Księgowość online", url: "/ksiegowosc-online/" },
      { label: "Cennik", url: "/cennik/" },
    ],
  },
);

pages.push(
  {
    slug: "ksiegowosc-spolki-zoo",
    kind: "service",
    serviceType: "Księgowość spółki z ograniczoną odpowiedzialnością",
    shortTitle: "Księgowość spółki z o.o.",
    title: "Księgowość spółki z o.o. Warszawa i online | Platinus",
    description:
      "Pełna księgowość spółki z o.o.: księgi handlowe, VAT, JPK, rozrachunki, sprawozdanie finansowe i kadry. Warszawa oraz obsługa online.",
    eyebrow: "Obsługa spółek",
    h1: "Księgowość dla spółki z o.o.",
    lead: "Prowadzimy księgi rachunkowe i uzgodniony zakres rozliczeń spółek z ograniczoną odpowiedzialnością — lokalnie w Warszawie oraz zdalnie w całej Polsce.",
    highlights: [
      "Księgi handlowe od 800 zł netto miesięcznie",
      "Sprawozdanie finansowe od 1000 zł netto",
      "Rozrachunki, VAT, JPK i środki trwałe",
      "Możliwość połączenia z kadrami i płacami",
    ],
    sections: [
      {
        heading: "Zakres księgowości spółki z o.o.",
        paragraphs: [
          "Spółka z ograniczoną odpowiedzialnością prowadzi księgi rachunkowe, dlatego jej obsługa wymaga regularnego uzgadniania dokumentów, rachunków bankowych, rozrachunków i ewidencji. Na początku poznajemy model działalności, źródła przychodów, sposób obiegu dokumentów i potrzeby zarządu. Dopiero na tej podstawie potwierdzamy zakres i cenę.",
          "Stała obsługa może obejmować księgowanie dokumentów, rejestry VAT, pliki JPK, ewidencję środków trwałych, rozliczenia z kontrahentami, przygotowanie danych podatkowych oraz sprawozdanie finansowe. Dodatkowe raporty, korekty dawnych okresów i prace porządkowe ustalamy oddzielnie.",
        ],
      },
      {
        heading: "Informacje potrzebne do rzetelnej wyceny",
        paragraphs: [
          "Sama liczba faktur nie opisuje całej pracochłonności. Ważne są również rachunki bankowe, transakcje walutowe, sprzedaż zagraniczna, środki trwałe, rozliczenia wspólników i oczekiwane raporty. Dlatego w pierwszej wiadomości warto krótko opisać sposób działania spółki.",
        ],
        items: [
          "przeciętna liczba dokumentów sprzedaży i zakupu,",
          "liczba rachunków bankowych i waluty rozliczeń,",
          "status VAT i rodzaje transakcji zagranicznych,",
          "liczba pracowników oraz zleceniobiorców,",
          "liczba środków trwałych i zakres rozliczeń magazynowych,",
          "potrzebne zestawienia dla zarządu, banku lub wspólników.",
        ],
      },
      {
        heading: "Nowa spółka albo zmiana biura",
        paragraphs: [
          "Przy nowej spółce ustalamy sposób przekazywania dokumentów od pierwszych operacji. Przy zmianie biura potrzebny jest plan przejęcia danych i potwierdzenie, do którego okresu rozliczenia wykona poprzedni podmiot. Lista materiałów zależy od momentu roku i używanego wcześniej systemu.",
          "Po otrzymaniu dokumentacji sprawdzamy jej kompletność potrzebną do kontynuacji zapisów. Jeśli brakuje sald, ewidencji lub deklaracji, wskazujemy elementy do uzupełnienia. Nie ukrywamy prac porządkowych w stałej opłacie — najpierw opisujemy ich zakres.",
        ],
      },
      {
        heading: "Księgowość, płace i obieg dokumentów w jednym modelu",
        paragraphs: [
          "Spółka może połączyć pełną księgowość z obsługą wynagrodzeń i dokumentów kadrowych. Uporządkowany obieg danych pozwala sprawnie ująć listy płac i rozrachunki w księgach. Zakres odpowiedzialności po stronie zarządu, pracowników i biura potwierdzamy przed startem.",
          "Dokumenty mogą być przekazywane elektronicznie, co ułatwia współpracę spółkom działającym poza Warszawą. Klienci lokalni mogą korzystać z modelu hybrydowego i umawiać spotkania w biurze przy ul. Jugosłowiańskiej.",
        ],
      },
      {
        heading: "Rola zarządu w sprawnej obsłudze księgowej",
        paragraphs: [
          "Zarząd pozostaje źródłem informacji o decyzjach, umowach i zdarzeniach, których nie można odczytać z samej faktury. Powinien wskazać osobę kontaktową oraz zapewnić terminowe przekazywanie dokumentów. W przypadku finansowania, zmian właścicielskich, nowych rodzajów sprzedaży lub większych inwestycji warto poinformować biuro przed wykonaniem operacji, a nie dopiero podczas księgowania.",
          "Dobrą praktyką jest cykliczne przeglądanie rozrachunków i uzgodnionych zestawień. Księgowość może przygotować dane, ale decyzje dotyczące windykacji, płynności i kierunku działalności należą do zarządu. Jeżeli spółka oczekuje bardziej rozbudowanych raportów, należy zdefiniować je wcześniej, aby plan kont i sposób opisywania dokumentów dostarczały potrzebnego poziomu szczegółowości.",
          "Obsługa spółki z o.o. obejmuje wiele powiązanych źródeł informacji: umowy, uchwały, rozliczenia wspólników, wyciągi bankowe, dokumenty zakupowe i sprzedażowe. Samo przekazanie faktur nie zawsze wystarcza do właściwego opisania zdarzenia. Zarząd powinien informować o pożyczkach, dopłatach, wypłatach dla wspólników i zobowiązaniach wynikających z zawartych umów. Uporządkowany przepływ danych ułatwia uzgadnianie sald i przygotowanie zamknięcia roku. Pozwala również szybciej wyjaśnić różnice, zanim staną się problemem widocznym dopiero podczas sporządzania sprawozdania finansowego.",
        ],
      },
      {
        heading: "Cena księgowości spółki z o.o.",
        paragraphs: [
          "Orientacyjna cena ksiąg handlowych wynosi 800 zł netto miesięcznie do 50 dokumentów i 1300 zł netto do 100 dokumentów. Sprawozdanie finansowe kosztuje od 1000 zł netto. Są to stawki informacyjne dla standardowego zakresu.",
          "Ostateczna wycena zależy od rzeczywistej liczby operacji, jakości dokumentów, rozliczeń zagranicznych, zatrudnienia i raportowania. Przed rozpoczęciem współpracy klient otrzymuje potwierdzony zakres i cenę.",
        ],
      },
    ],
    faq: [
      {
        question: "Ile kosztuje księgowość spółki z o.o.?",
        answer:
          "Orientacyjna cena zaczyna się od 800 zł netto miesięcznie do 50 dokumentów. Finalna stawka zależy od całego zakresu i złożoności operacji.",
      },
      {
        question: "Czy obsługujecie spółki spoza Warszawy?",
        answer:
          "Tak. Księgowość i obieg dokumentów mogą być prowadzone całkowicie online dla spółek z całej Polski.",
      },
      {
        question: "Czy przygotowujecie sprawozdanie finansowe?",
        answer:
          "Tak. Orientacyjna cena zaczyna się od 1000 zł netto i zależy od stanu ksiąg oraz zakresu prac zamknięciowych.",
      },
      {
        question: "Czy możecie przejąć księgi w trakcie roku?",
        answer:
          "Tak, po ustaleniu dnia przejęcia i otrzymaniu kompletnej dokumentacji od poprzedniego biura lub działu księgowego.",
      },
    ],
    related: [
      { label: "Pełna księgowość", url: "/pelna-ksiegowosc/" },
      {
        label: "Ile kosztuje księgowość spółki z o.o.",
        url: "/poradnik/ile-kosztuje-ksiegowosc-spolki-zoo/",
      },
      { label: "Kadry i płace", url: "/kadry-i-place/" },
      { label: "Cennik", url: "/cennik/" },
    ],
  },
  {
    slug: "ksiegowosc-jdg",
    kind: "service",
    serviceType: "Księgowość jednoosobowej działalności gospodarczej",
    shortTitle: "Księgowość JDG",
    title: "Księgowość jednoosobowej działalności | Platinus",
    description:
      "Księgowość JDG w Warszawie i online: KPiR, ryczałt, VAT, JPK, ZUS, środki trwałe i dokumenty elektroniczne dla przedsiębiorców.",
    eyebrow: "Jednoosobowa działalność",
    h1: "Księgowość dla jednoosobowej firmy",
    lead: "Pomagamy przedsiębiorcom uporządkować KPiR lub ryczałt, dokumenty, rozliczenia i obieg informacji — stacjonarnie w Warszawie albo całkowicie online.",
    highlights: [
      "KPiR i ryczałt od 250 zł netto",
      "Obsługa VAT i JPK w ustalonym zakresie",
      "Program do fakturowania i archiwum online",
      "Wsparcie przy zmianie dotychczasowego biura",
    ],
    sections: [
      {
        heading: "Księgowość dopasowana do sposobu działania firmy",
        paragraphs: [
          "Jednoosobowe firmy różnią się liczbą dokumentów, formą opodatkowania, statusem VAT i rodzajem sprzedaży. Freelancer wystawiający kilka faktur miesięcznie potrzebuje innej obsługi niż sklep internetowy lub firma zatrudniająca zespół. Dlatego przed wyceną pytamy o rzeczywisty model działalności.",
          "Prowadzimy KPiR albo ewidencję przychodów, a w uzgodnionym zakresie także rejestry VAT, pliki JPK, ewidencję środków trwałych i rozliczenia związane z zatrudnieniem. Klient otrzymuje jasną informację, jakie dokumenty i kiedy powinien przekazać.",
        ],
      },
      {
        heading: "Co warto podać w pierwszej wiadomości",
        paragraphs: [
          "Krótki, konkretny opis pozwala szybciej przygotować ofertę i ogranicza serię dodatkowych pytań. Nie musisz używać terminologii księgowej — wystarczą informacje o sprzedaży, dokumentach i zespole.",
        ],
        items: [
          "forma opodatkowania i status VAT, jeśli są już ustalone,",
          "przybliżona liczba faktur zakupu oraz sprzedaży w miesiącu,",
          "rodzaj prowadzonej działalności i główne grupy klientów,",
          "sprzedaż zagraniczna, waluty lub platformy internetowe,",
          "liczba pracowników i zleceniobiorców,",
          "informacja, czy firma jest nowa, czy zmienia dotychczasowe biuro.",
        ],
      },
      {
        heading: "Dokumenty online i stały rytm współpracy",
        paragraphs: [
          "Dokumenty możesz przekazywać elektronicznie. Ustalamy sposób opisywania wydatków oraz termin, do którego materiały powinny znaleźć się w systemie. Regularny obieg jest szczególnie ważny przy VAT, transakcjach zagranicznych i większej liczbie drobnych zakupów.",
          "W ramach współpracy udostępniamy program do fakturowania i elektroniczne archiwum dokumentów. Narzędzie pomaga uporządkować proces, ale nie zwalnia z przekazywania kompletnych informacji o zdarzeniach gospodarczych. Wątpliwości warto zgłaszać przed wystawieniem nietypowej faktury, a nie dopiero po zamknięciu miesiąca.",
        ],
      },
      {
        heading: "Nowa działalność i zmiana księgowości",
        paragraphs: [
          "Nowej firmie pomagamy ustalić praktyczny proces dostarczania dokumentów od pierwszego miesiąca. Przy zmianie biura przygotowujemy listę danych potrzebnych do zachowania ciągłości. Możliwa jest zmiana w trakcie roku, jeśli strony jasno ustalą dzień przejęcia i zakres poprzedniego biura.",
          "Jeżeli w dokumentacji są braki lub zaległe rozliczenia, najpierw określamy ich zakres. Prace dotyczące dawnych okresów mogą wymagać osobnej wyceny. Takie podejście pozwala oddzielić bieżącą miesięczną obsługę od jednorazowego porządkowania historii.",
        ],
      },
      {
        heading: "Kiedy warto skontaktować się z biurem wcześniej",
        paragraphs: [
          "Niektóre zmiany wpływają na dokumenty, ewidencje i sposób rozliczeń, dlatego lepiej zgłosić je przed zawarciem umowy lub wykonaniem nietypowej transakcji. Dotyczy to między innymi rozpoczęcia sprzedaży zagranicznej, zatrudnienia pierwszej osoby, zakupu większego składnika majątku, uruchomienia sklepu internetowego albo zmiany sposobu przyjmowania płatności.",
          "Wczesna rozmowa nie oznacza, że każda decyzja wymaga zgody biura. Pozwala jednak ustalić, jakie dokumenty trzeba zachować, czy obecny obieg wystarczy i czy miesięczny zakres wymaga zmiany. Przedsiębiorca unika wtedy sytuacji, w której system sprzedaży generuje niepełne dane lub ważna umowa trafia do księgowości dopiero po zakończeniu okresu.",
          "Jednoosobowa działalność często zmienia się szybciej niż początkowo zakładano. Pojawia się nowy kanał sprzedaży, leasing, kasa fiskalna, pracownik albo klient spoza Polski. Każdy z tych kroków może wymagać innych danych i dodatkowych terminów. Warto więc traktować kontakt z biurem jako stały element prowadzenia firmy, a nie wyłącznie comiesięczne przekazanie dokumentów. Krótka informacja przed zmianą pozwala sprawdzić jej wpływ na ewidencję i przygotować właściwy zestaw materiałów. Dzięki temu przedsiębiorca zachowuje prosty proces także wtedy, gdy zakres działalności staje się bardziej złożony.",
        ],
      },
      {
        heading: "Ile kosztuje księgowość JDG",
        paragraphs: [
          "Orientacyjna cena KPiR lub ryczałtu wynosi 250 zł netto miesięcznie przy maksymalnie 20 dokumentach. KPiR do 50 dokumentów kosztuje orientacyjnie 400 zł netto. Obsługa pracownika to 45 zł netto miesięcznie, a zleceniobiorcy 30 zł netto.",
          "Na finalną stawkę wpływa pełny zakres: VAT, JPK, transakcje zagraniczne, dodatkowe ewidencje, sposób przygotowania dokumentów i liczba osób. Cennik jest punktem odniesienia, a nie automatyczną ofertą dla każdej firmy.",
        ],
      },
    ],
    faq: [
      {
        question: "Czy obsługujecie jednoosobowe firmy całkowicie online?",
        answer:
          "Tak. Dokumenty można przekazywać elektronicznie, a bieżące sprawy omawiać mailowo i telefonicznie.",
      },
      {
        question: "Ile kosztuje księgowość małej działalności?",
        answer:
          "Orientacyjna cena KPiR lub ryczałtu zaczyna się od 250 zł netto miesięcznie do 20 dokumentów.",
      },
      {
        question: "Czy mogę zmienić biuro w trakcie roku?",
        answer:
          "Tak. Trzeba ustalić dzień przejęcia i otrzymać kompletną dokumentację potrzebną do kontynuowania rozliczeń.",
      },
      {
        question: "Czy zapewniacie program do fakturowania?",
        answer:
          "Tak. W ramach współpracy udostępniamy program do wystawiania faktur oraz elektroniczne archiwum dokumentów.",
      },
    ],
    related: [
      { label: "KPiR i ryczałt", url: "/kpir-i-ryczalt/" },
      { label: "Księgowość online", url: "/ksiegowosc-online/" },
      {
        label: "Jak zmienić biuro rachunkowe",
        url: "/poradnik/jak-zmienic-biuro-rachunkowe/",
      },
      { label: "Cennik", url: "/cennik/" },
    ],
  },
  {
    slug: "ksef",
    kind: "service",
    serviceType: "Wsparcie w fakturowaniu zgodnym z KSeF",
    shortTitle: "KSeF",
    title: "KSeF — przygotowanie fakturowania i obiegu dokumentów | Platinus",
    description:
      "Wsparcie firm w uporządkowaniu fakturowania i obiegu dokumentów zgodnego z KSeF. Program do faktur w ramach współpracy księgowej.",
    eyebrow: "Fakturowanie i dokumenty",
    h1: "Przygotowanie firmy do obsługi KSeF",
    lead: "Pomagamy uporządkować role, sposób wystawiania faktur i przekazywanie dokumentów do księgowości. W ramach współpracy udostępniamy program do fakturowania zgodny z KSeF.",
    highlights: [
      "Program do fakturowania w ramach współpracy",
      "Ustalenie ról i obiegu dokumentów",
      "Połączenie fakturowania z księgowością",
      "Wsparcie stacjonarne i online",
    ],
    sections: [
      {
        heading: "KSeF to proces, nie tylko wybór programu",
        paragraphs: [
          "Przygotowanie do KSeF wymaga ustalenia, kto w firmie wystawia faktury, kto je akceptuje, jak obsługiwane są korekty i w jaki sposób dokument trafia do księgowości. Sam dostęp do aplikacji nie rozwiązuje problemu, jeżeli role i odpowiedzialność pozostają niejasne.",
          "Z klientem omawiamy obecny obieg sprzedaży i zakupów, a następnie wskazujemy elementy, które powinny zostać uporządkowane przed zmianą sposobu fakturowania. Zakres wsparcia zależy od liczby użytkowników, systemów i nietypowych procesów w firmie.",
        ],
      },
      {
        heading: "Jak przygotować firmę krok po kroku",
        steps: [
          "Spisz, kto wystawia, zatwierdza i koryguje faktury sprzedaży.",
          "Ustal, jak firma odbiera i opisuje dokumenty zakupowe.",
          "Zweryfikuj użytkowników, uprawnienia oraz zastępstwa na czas nieobecności.",
          "Wybierz narzędzie i przetestuj typowe oraz nietypowe scenariusze.",
          "Połącz nowy proces z terminem przekazywania danych do księgowości.",
          "Zapisz krótką instrukcję dla osób uczestniczących w obiegu.",
        ],
        paragraphs: [
          "Taka kolejność ogranicza sytuacje, w których techniczne wdrożenie wyprzedza decyzje organizacyjne. Firmy z jednym wystawcą mają prostszy proces niż organizacje z działem sprzedaży, kilkoma punktami lub zewnętrznym systemem zamówień.",
        ],
      },
      {
        heading: "Program do fakturowania w ramach współpracy",
        paragraphs: [
          "Klientom korzystającym z obsługi księgowej zapewniamy bezpłatny program do fakturowania zgodnego z KSeF oraz elektroniczne archiwum dokumentów. Dostęp online ułatwia pracę niezależnie od lokalizacji i pozwala połączyć wystawianie dokumentów z uzgodnionym obiegiem księgowym.",
          "Przed wyborem rozwiązania warto sprawdzić, czy firma potrzebuje integracji z magazynem, sklepem internetowym, płatnościami lub istniejącym systemem. Jeżeli wymagania wykraczają poza standardowy program, omawiamy je przed potwierdzeniem zakresu.",
        ],
      },
      {
        heading: "Najczęstsze ryzyka organizacyjne",
        paragraphs: [
          "Problemy zwykle wynikają z braku zastępstw, nieopisanych korekt, niewłaściwych uprawnień lub rozdzielenia sprzedaży i księgowości bez wspólnego procesu. Warto również ustalić, jak firma będzie obsługiwać sytuacje awaryjne oraz dokumenty wymagające dodatkowego opisu.",
        ],
        items: [
          "jedna osoba posiada wszystkie uprawnienia i nie ma zastępstwa,",
          "brak osoby odpowiedzialnej za weryfikację danych kontrahenta,",
          "faktury zakupowe nie są przypisywane do kosztu lub projektu,",
          "korekty nie trafiają do osoby prowadzącej rozliczenia,",
          "system sprzedaży i program księgowy nie mają ustalonego sposobu wymiany danych.",
        ],
      },
      {
        heading: "Kto powinien uczestniczyć w przygotowaniu",
        paragraphs: [
          "W najmniejszej firmie jedna osoba może odpowiadać za sprzedaż, zakupy i kontakt z księgowością. W większym zespole do przygotowania warto włączyć sprzedaż, administrację, osobę zarządzającą systemami oraz księgowość. Każda z tych osób widzi inną część procesu i może wskazać wyjątki, które nie pojawiają się w prostym schemacie.",
          "Spotkanie przygotowawcze powinno zakończyć się listą decyzji, właścicieli zadań i terminów, a nie tylko prezentacją programu. Trzeba też wskazać osobę zatwierdzającą zmiany i kontakt na wypadek problemu. Dzięki temu pytanie o brakującą fakturę, korektę lub dostęp nie krąży między kilkoma działami, lecz trafia bezpośrednio do osoby odpowiedzialnej.",
          "Przegląd procesu powinien objąć również sytuacje wyjątkowe: awarię systemu, brak dostępu pracownika, fakturę korygującą albo dokument otrzymany innym kanałem. Firma potrzebuje prostej zasady, gdzie taki przypadek zgłosić i kto podejmuje decyzję o dalszym działaniu. Dobrze jest przetestować obieg na kilku rzeczywistych przykładach przed rozpoczęciem regularnej pracy. Pozwala to wykryć brakujące uprawnienia i niejasne role bez presji terminu. Przygotowanie nie kończy się na konfiguracji programu — obejmuje także odpowiedzialność ludzi oraz kontrolę, czy dane rzeczywiście dotarły do księgowości.",
        ],
      },
      {
        heading: "Zakres i aktualność informacji",
        paragraphs: [
          "Zasady techniczne i terminy związane z KSeF mogą się zmieniać. Dlatego przed wdrożeniem potwierdzamy aktualny stan oraz możliwości używanego oprogramowania. Ta strona opisuje sposób organizacji procesu i nie zastępuje indywidualnej analizy obowiązków firmy.",
          "Aby omówić zakres, napisz, ilu użytkowników wystawia faktury, jakiego programu używa firma, ile dokumentów powstaje miesięcznie i czy sprzedaż jest połączona ze sklepem, magazynem albo innym systemem.",
        ],
      },
    ],
    faq: [
      {
        question: "Czy program do KSeF jest dodatkowo płatny?",
        answer:
          "Program do fakturowania zgodnego z KSeF udostępniamy bezpłatnie w ramach współpracy księgowej, zgodnie z uzgodnionymi warunkami.",
      },
      {
        question: "Czy pomagacie ustalić obieg faktur?",
        answer:
          "Tak. Możemy omówić role, przekazywanie dokumentów i połączenie procesu fakturowania z księgowością.",
      },
      {
        question: "Czy obsługa jest dostępna online?",
        answer:
          "Tak. Proces można omówić i prowadzić zdalnie dla firm z całej Polski.",
      },
      {
        question: "Czy strona zawiera aktualne terminy prawne KSeF?",
        answer:
          "Nie podajemy na tej stronie terminów, ponieważ mogą się zmieniać. Aktualny zakres obowiązków należy potwierdzić dla konkretnej firmy przed wdrożeniem.",
      },
    ],
    related: [
      {
        label: "Jak przygotować firmę do KSeF",
        url: "/poradnik/jak-przygotowac-firme-do-ksef/",
      },
      { label: "Księgowość online", url: "/ksiegowosc-online/" },
      { label: "Księgowość dla JDG", url: "/ksiegowosc-jdg/" },
      { label: "Kontakt", url: "/kontakt/" },
    ],
  },
  {
    slug: "cennik",
    kind: "pricing",
    shortTitle: "Cennik",
    title: "Cennik usług księgowych i kadrowych | Platinus",
    description:
      "Orientacyjny cennik Platinus: KPiR, ryczałt, księgi handlowe, sprawozdanie finansowe, PIT oraz obsługa pracowników i zleceniobiorców.",
    eyebrow: "Przejrzyste ceny",
    h1: "Cennik księgowości, kadr i płac",
    lead: "Publikujemy stawki orientacyjne, aby ułatwić porównanie. Finalna cena zależy od liczby dokumentów, zakresu rozliczeń, zatrudnienia i sposobu przygotowania danych.",
    highlights: [
      "KPiR od 250 zł netto miesięcznie",
      "Ryczałt od 250 zł netto miesięcznie",
      "Pełne księgi od 800 zł netto miesięcznie",
      "PIT od 100 zł brutto",
    ],
    sections: [
      {
        heading: "KPiR — ceny miesięczne",
        paragraphs: [
          "Prowadzenie Podatkowej Księgi Przychodów i Rozchodów kosztuje orientacyjnie 250 zł netto miesięcznie przy maksymalnie 20 dokumentach oraz 400 zł netto przy maksymalnie 50 dokumentach. Cena dotyczy uzgodnionego standardowego zakresu.",
          "Na ostateczną stawkę wpływają między innymi status VAT, pliki JPK, liczba rachunków, transakcje zagraniczne, środki trwałe i jakość przekazywanych dokumentów. Dodatkowe obowiązki potwierdzamy w ofercie.",
        ],
      },
      {
        heading: "Ryczałt — ceny miesięczne",
        paragraphs: [
          "Prowadzenie ewidencji przychodów kosztuje orientacyjnie 250 zł netto miesięcznie przy maksymalnie 20 dokumentach. Jeżeli przedsiębiorca prowadzi różne rodzaje działalności, jest podatnikiem VAT lub realizuje transakcje zagraniczne, zakres wymaga dodatkowego ustalenia.",
          "Przed wyceną prosimy o krótki opis działalności, liczbę dokumentów i informacje o zatrudnieniu. Pozwala to potwierdzić, czy orientacyjna stawka odpowiada rzeczywistej obsłudze.",
        ],
      },
      {
        heading: "Pełna księgowość — ceny miesięczne",
        paragraphs: [
          "Prowadzenie ksiąg handlowych kosztuje orientacyjnie 800 zł netto miesięcznie przy maksymalnie 50 dokumentach oraz 1300 zł netto przy maksymalnie 100 dokumentach. Sporządzenie sprawozdania finansowego kosztuje od 1000 zł netto.",
          "W przypadku spółek istotna jest nie tylko liczba faktur, lecz także operacje bankowe, rozrachunki, waluty, środki trwałe, liczba wspólników i oczekiwane raporty. Po poznaniu tych danych potwierdzamy miesięczną opłatę i koszt prac dodatkowych.",
        ],
      },
      {
        heading: "Kadry, płace i rozliczenia roczne",
        paragraphs: [
          "Orientacyjna miesięczna cena obsługi pracownika wynosi 45 zł netto za osobę, a zleceniobiorcy 30 zł netto za osobę. Rozliczenie roczne PIT kosztuje od 100 zł brutto. Nietypowe umowy, korekty i rozszerzona dokumentacja mogą wymagać osobnej wyceny.",
          "Jeżeli łączysz kadry z księgowością, przygotujemy jedną propozycję obejmującą oba obszary. Podaj liczbę osób, rodzaje umów oraz informację, czy potrzebujesz dokumentacji kadrowej, naliczeń wynagrodzeń i rozliczeń ZUS.",
        ],
      },
      {
        heading: "Od czego zależy ostateczna wycena",
        paragraphs: [
          "Cennik ma charakter informacyjny. Finalną cenę potwierdzamy przed rozpoczęciem współpracy, po poznaniu formy prawnej, sposobu opodatkowania, liczby dokumentów, zatrudnienia i dodatkowych potrzeb. Nie doliczamy zakresu, który nie został wcześniej uzgodniony, bez omówienia go z klientem.",
        ],
        items: [
          "liczba i rodzaj dokumentów oraz operacji bankowych,",
          "VAT, JPK, waluty i transakcje zagraniczne,",
          "liczba pracowników i typy umów,",
          "środki trwałe, magazyn i dodatkowe ewidencje,",
          "częstotliwość oraz format raportów,",
          "stan dokumentacji przy przejęciu księgowości.",
        ],
      },
    ],
    faq: [
      {
        question: "Czy ceny w cenniku są ostateczne?",
        answer:
          "Nie. Są orientacyjne. Ostateczną cenę potwierdzamy po ustaleniu liczby dokumentów i pełnego zakresu obsługi.",
      },
      {
        question: "Czy ceny księgowości są netto?",
        answer:
          "Tak. Ceny KPiR, ryczałtu, ksiąg handlowych oraz kadr i płac są podane netto i należy doliczyć VAT 23%. Cena PIT jest podana brutto.",
      },
      {
        question: "Czy program do fakturowania jest dodatkowo płatny?",
        answer:
          "W ramach współpracy księgowej udostępniamy bezpłatny program do fakturowania i archiwum dokumentów zgodnie z ustalonymi warunkami.",
      },
      {
        question: "Jak szybko otrzymam dokładną wycenę?",
        answer:
          "Napisz na biuro@platinus.pl i podaj formę działalności, liczbę dokumentów, status VAT oraz liczbę zatrudnionych osób. Odpowiemy po przeanalizowaniu zakresu.",
      },
    ],
    related: [
      { label: "Pełna księgowość", url: "/pelna-ksiegowosc/" },
      { label: "KPiR i ryczałt", url: "/kpir-i-ryczalt/" },
      { label: "Kadry i płace", url: "/kadry-i-place/" },
      { label: "Kontakt", url: "/kontakt/" },
    ],
  },
);

pages.push(
  {
    slug: "o-nas",
    kind: "about",
    shortTitle: "O nas",
    title: "O biurze rachunkowym Platinus | Warszawa od 2005 roku",
    description:
      "Poznaj Platinus: biuro rachunkowe z Warszawy działające od 2005 roku. Certyfikat księgowy nr 10544/2005, OC oraz obsługa stacjonarna i online.",
    eyebrow: "Platinus od 2005 roku",
    h1: "Doświadczenie, które można zweryfikować",
    lead: "Za działalność Platinus odpowiada Andrzej Kowalczyk, posiadający certyfikat księgowy nr 10544/2005. Biuro łączy lokalną obsługę w Warszawie z księgowością online dla firm z całej Polski.",
    highlights: [
      "Działalność od 2005 roku",
      "Certyfikat księgowy nr 10544/2005",
      "Ubezpieczenie OC wskazane w profilu C.I.K.",
      "NIP 951-110-02-56, REGON 140220457",
    ],
    sections: [
      {
        heading: "Biuro rachunkowe z historią od 2005 roku",
        paragraphs: [
          "Platinus powstał w odpowiedzi na potrzeby mikro, małych i średnich przedsiębiorstw szukających kompleksowej obsługi księgowej oraz kadrowo-płacowej. Od początku działalności biuro pracuje z firmami usługowymi, handlowymi i produkcyjnymi, prowadząc zarówno uproszczone ewidencje, jak i księgi rachunkowe.",
          "Siedziba znajduje się przy ul. Jugosłowiańskiej 17B lok. 97 w Warszawie. Klienci mogą współpracować stacjonarnie, hybrydowo albo całkowicie zdalnie. Model pracy dobieramy do sposobu przekazywania dokumentów i realnych potrzeb firmy, zamiast narzucać jeden schemat każdemu przedsiębiorcy.",
        ],
      },
      {
        heading: "Osoba odpowiedzialna i potwierdzone kwalifikacje",
        paragraphs: [
          `Za działalność biura odpowiada Andrzej Kowalczyk. Publiczny <a href="${cikProfile}" rel="external">profil Centrum Informacji Księgowej</a> wskazuje certyfikat księgowy nr 10544/2005, doświadczenie od 30 sierpnia 2005 roku oraz ubezpieczenie OC w PZU. Dane źródłowe zostały sprawdzone 22 lipca 2026 roku.`,
          "Nie publikujemy nieweryfikowalnych tytułów ani sztucznych ocen. Informacje o kwalifikacjach łączymy z linkiem do niezależnego profilu, aby klient mógł sam sprawdzić ich źródło. W przypadku dokumentów, których aktualność wymaga okresowego potwierdzenia, zachęcamy do bezpośredniego kontaktu przed podpisaniem umowy.",
        ],
      },
      {
        heading: "Zakres doświadczenia",
        paragraphs: [
          "Platinus prowadzi obsługę jednoosobowych działalności, spółek cywilnych, jawnych i spółek z ograniczoną odpowiedzialnością. Zakres obejmuje KPiR, ryczałt, księgi rachunkowe, VAT, JPK, ewidencje, rozliczenia pracowników oraz zleceniobiorców.",
          "Każda firma otrzymuje zakres dopasowany do formy prawnej i skali działania. Nie każda usługa jest potrzebna od pierwszego dnia, dlatego przed wyceną ustalamy liczbę dokumentów, sposób sprzedaży, zatrudnienie i oczekiwane raporty. Dzięki temu umowa opisuje rzeczywiste zadania, a nie ogólny pakiet bez granic.",
        ],
      },
      {
        heading: "Technologia wspierająca, a nie zastępująca kontakt",
        paragraphs: [
          "W codziennej pracy wykorzystujemy rozwiązania Comarch oraz systemy do elektronicznego przekazywania i archiwizacji dokumentów. Klient może korzystać z programu do fakturowania i dostępu do materiałów online. Technologia ogranicza powtarzalne czynności, ale nie zastępuje rozmowy z osobą prowadzącą obsługę.",
          "Szczególnie w nietypowych sytuacjach ważny jest kontekst: cel transakcji, sposób działania firmy i komplet dokumentów. Dlatego zachęcamy do zgłaszania planowanych zmian z wyprzedzeniem, zamiast przekazywania informacji dopiero po zakończeniu miesiąca.",
        ],
      },
      {
        heading: "Standard współpracy",
        paragraphs: [
          "Przed rozpoczęciem obsługi potwierdzamy zakres, cenę i sposób dostarczania dokumentów. Ustalamy również dane kontaktowe po obu stronach i terminy cyklicznych informacji. Jeśli pojawia się zadanie wykraczające poza stałą umowę, opisujemy je przed wykonaniem.",
          "Nie publikujemy opinii ani nazw klientów bez ich zgody. Zależy nam, aby dowody wiarygodności były prawdziwe i możliwe do zweryfikowania. Dlatego na stronie pokazujemy dane rejestrowe, certyfikat, źródło zewnętrzne, cennik i konkretny model pracy, a kolejne referencje będziemy dodawać dopiero po uzyskaniu zgód.",
        ],
      },
    ],
    faq: [
      {
        question: "Od kiedy działa Platinus?",
        answer:
          "Biuro działa od 2005 roku. Profil C.I.K. wskazuje datę rozpoczęcia doświadczenia 30 sierpnia 2005 roku.",
      },
      {
        question: "Kto odpowiada za działalność biura?",
        answer:
          "Za działalność PLATINUS.PL odpowiada Andrzej Kowalczyk, posiadający certyfikat księgowy nr 10544/2005.",
      },
      {
        question: "Czy biuro ma ubezpieczenie OC?",
        answer:
          "Taką informację wraz ze wskazaniem PZU publikuje profil Platinus w Centrum Informacji Księgowej, zweryfikowany 22 lipca 2026 roku.",
      },
      {
        question: "Czy firma obsługuje klientów spoza Warszawy?",
        answer:
          "Tak. Dokumenty i bieżący kontakt mogą być obsługiwane całkowicie online dla firm z całej Polski.",
      },
    ],
    related: [
      { label: "Standard współpracy i źródła", url: "/opinie-i-case-studies/" },
      { label: "Księgowość online", url: "/ksiegowosc-online/" },
      { label: "Cennik", url: "/cennik/" },
      { label: "Kontakt", url: "/kontakt/" },
    ],
  },
  {
    slug: "kontakt",
    kind: "contact",
    shortTitle: "Kontakt",
    title: "Kontakt — biuro rachunkowe Platinus Warszawa",
    description:
      "Skontaktuj się z Platinus: ul. Jugosłowiańska 17B/97, Warszawa, tel. 664 496 913, biuro@platinus.pl. Obsługa lokalna i online.",
    eyebrow: "Kontakt i dojazd",
    h1: "Porozmawiajmy o księgowości Twojej firmy",
    lead: "Napisz na biuro@platinus.pl albo zadzwoń pod numer 664 496 913. Klientów przyjmujemy w biurze na Pradze-Południe po wcześniejszym uzgodnieniu spotkania.",
    highlights: [
      "ul. Jugosłowiańska 17B lok. 97",
      "03-984 Warszawa, Praga-Południe",
      "tel. +48 664 496 913",
      "e-mail: biuro@platinus.pl",
    ],
    sections: [
      {
        heading: "Dane kontaktowe i firmowe",
        paragraphs: [
          'PLATINUS.PL Andrzej Kowalczyk, ul. Jugosłowiańska 17B lok. 97, 03-984 Warszawa. Telefon: <a href="tel:+48664496913">+48 664 496 913</a>. E-mail: <a href="mailto:biuro@platinus.pl">biuro@platinus.pl</a>. NIP: 951-110-02-56. REGON: 140220457.',
          "Adres, NIP i REGON są zgodne z aktualnym profilem biura w Centrum Informacji Księgowej sprawdzonym 22 lipca 2026 roku. Jeżeli znajdujesz inne dane w zewnętrznym katalogu, kieruj się informacjami na tej stronie i poinformuj nas o rozbieżności.",
        ],
      },
      {
        heading: "Spotkanie w biurze w Warszawie",
        paragraphs: [
          "Biuro znajduje się na Pradze-Południe, przy ul. Jugosłowiańskiej 17B lok. 97. Przed przyjazdem skontaktuj się z nami i uzgodnij termin, aby właściwa osoba mogła przygotować się do rozmowy oraz zarezerwować czas.",
          'Trasę możesz wyznaczyć przez <a href="https://www.google.com/maps/dir/?api=1&amp;destination=Jugos%C5%82owia%C5%84ska+17B%2F97%2C+03-984+Warszawa" rel="external">Mapy Google</a>. Nie publikujemy godzin otwarcia bez potwierdzenia; spotkania umawiamy bezpośrednio telefonicznie lub mailowo.',
        ],
      },
      {
        heading: "Jak przygotować wiadomość o wycenę",
        paragraphs: [
          "Nie potrzebujesz gotowego zapytania ofertowego. Kilka konkretnych informacji pozwoli nam jednak szybciej ocenić zakres. W temacie wiadomości wpisz „Zapytanie o wycenę”, a w treści opisz firmę w punktach.",
        ],
        items: [
          "forma prawna i forma opodatkowania, jeśli są już ustalone,",
          "rodzaj działalności oraz miejsce prowadzenia firmy,",
          "przybliżona miesięczna liczba dokumentów,",
          "status VAT i występowanie transakcji zagranicznych,",
          "liczba pracowników oraz zleceniobiorców,",
          "informacja, czy zakładasz firmę, czy zmieniasz obecne biuro.",
        ],
      },
      {
        heading: "Obsługa online z całej Polski",
        paragraphs: [
          "Nie musisz mieszkać ani prowadzić firmy w Warszawie. Dokumenty można przekazywać elektronicznie, a bieżące sprawy omawiać mailowo i telefonicznie. Model zdalny obejmuje KPiR, ryczałt, pełne księgi oraz kadry i płace, zależnie od uzgodnionej oferty.",
          "Jeśli zależy Ci na modelu hybrydowym, możemy połączyć dokumenty online z okazjonalnym spotkaniem w biurze. Najważniejsze jest ustalenie stałego procesu, terminów i osób odpowiedzialnych po obu stronach.",
        ],
      },
      {
        heading: "Bez formularza kontaktowego",
        paragraphs: [
          "Na stronie nie działa formularz kontaktowy. Wiadomość wysyłasz bezpośrednio ze swojego programu pocztowego na biuro@platinus.pl. Dzięki temu zachowujesz kopię zapytania w swojej skrzynce i możesz dołączyć materiały, które uznasz za potrzebne.",
          "Nie przesyłaj w pierwszej wiadomości haseł, danych logowania ani pełnych dokumentów zawierających dane wrażliwe. Najpierw opisz sprawę i ustal z nami właściwy sposób bezpiecznego przekazania dokumentacji.",
        ],
      },
    ],
    faq: [
      {
        question: "Jaki jest adres biura Platinus?",
        answer:
          "ul. Jugosłowiańska 17B lok. 97, 03-984 Warszawa, Praga-Południe.",
      },
      {
        question: "Czy trzeba umówić spotkanie?",
        answer:
          "Tak, przed wizytą najlepiej uzgodnić termin telefonicznie lub mailowo.",
      },
      {
        question: "Czy mogę otrzymać wycenę mailowo?",
        answer:
          "Tak. Napisz na biuro@platinus.pl i podaj podstawowe informacje o firmie oraz oczekiwanym zakresie.",
      },
      {
        question: "Czy obsługa jest dostępna poza Warszawą?",
        answer: "Tak. Współpracujemy online z firmami z całej Polski.",
      },
    ],
    related: [
      { label: "Księgowość online", url: "/ksiegowosc-online/" },
      { label: "Cennik", url: "/cennik/" },
      { label: "O nas", url: "/o-nas/" },
      { label: "Polityka prywatności", url: "/polityka-prywatnosci/" },
    ],
  },
  {
    slug: "poradnik",
    kind: "collection",
    shortTitle: "Poradnik",
    title: "Poradnik księgowy dla przedsiębiorców | Platinus",
    description:
      "Praktyczne materiały Platinus o kosztach księgowości, zmianie biura, pełnych księgach, dokumentach online i przygotowaniu firmy do KSeF.",
    eyebrow: "Centrum wiedzy",
    h1: "Księgowość wyjaśniona po ludzku",
    lead: "Krótkie, konkretne materiały pomagające przygotować dokumenty, porównać modele obsługi i zadać właściwe pytania przed wyborem biura rachunkowego.",
    highlights: [
      "Materiały podpisane przez Platinus.pl",
      "Data publikacji i aktualizacji na każdej stronie",
      "Bez sztucznych obietnic i ukrytych ocen",
      "Informacje ogólne, nie indywidualna porada",
    ],
    sections: [
      {
        heading: "Ile kosztuje księgowość spółki z o.o.?",
        paragraphs: [
          "Cena zależy nie tylko od liczby faktur. W poradniku wyjaśniamy wpływ operacji bankowych, VAT, walut, pracowników, środków trwałych i raportów dla zarządu. Pokazujemy też orientacyjne stawki Platinus i listę danych potrzebnych do wyceny.",
          '<a href="/poradnik/ile-kosztuje-ksiegowosc-spolki-zoo/">Przeczytaj poradnik o cenie księgowości spółki z o.o.</a>',
        ],
      },
      {
        heading: "Jak zmienić biuro rachunkowe w trakcie roku?",
        paragraphs: [
          "Zmiana jest możliwa, jeżeli strony jasno ustalą datę przejęcia i komplet dokumentów. Opisujemy kolejność działań, listę materiałów oraz sposób oddzielenia bieżącej obsługi od ewentualnego porządkowania zaległości.",
          '<a href="/poradnik/jak-zmienic-biuro-rachunkowe/">Zobacz plan bezpiecznej zmiany biura rachunkowego.</a>',
        ],
      },
      {
        heading: "Jak przekazywać dokumenty do biura online?",
        paragraphs: [
          "Dobry obieg dokumentów ma termin, odpowiedzialną osobę i jasny sposób opisywania plików. Poradnik pokazuje prostą miesięczną rutynę, która ogranicza braki i poprawki po przygotowaniu rozliczeń.",
          '<a href="/poradnik/jak-przekazywac-dokumenty-online/">Przeczytaj o elektronicznym obiegu dokumentów.</a>',
        ],
      },
      {
        heading: "Księgowość online czy lokalne biuro?",
        paragraphs: [
          "Nie każda firma potrzebuje tego samego modelu. Porównujemy obsługę zdalną, stacjonarną i hybrydową pod kątem dokumentów, kontaktu, zespołu i sytuacji wymagających spotkania.",
          '<a href="/poradnik/ksiegowosc-online-czy-lokalna/">Porównaj księgowość online i lokalne biuro.</a>',
        ],
      },
      {
        heading: "Co obejmuje pełna księgowość?",
        paragraphs: [
          "Wyjaśniamy rolę ksiąg rachunkowych, ewidencji, rozrachunków, VAT, JPK, sprawozdania finansowego i raportów. Materiał pomaga odróżnić standardową obsługę od prac dodatkowych.",
          '<a href="/poradnik/co-obejmuje-pelna-ksiegowosc/">Sprawdź zakres pełnej księgowości.</a>',
        ],
      },
      {
        heading: "Jak przygotować firmę do KSeF?",
        paragraphs: [
          "Przygotowanie zaczyna się od ról i obiegu dokumentów, nie od kliknięcia w programie. Lista kontrolna obejmuje użytkowników, uprawnienia, korekty, faktury zakupowe i połączenie procesu z księgowością.",
          '<a href="/poradnik/jak-przygotowac-firme-do-ksef/">Zobacz checklistę przygotowania do KSeF.</a>',
        ],
      },
    ],
    related: [
      { label: "Księgowość online", url: "/ksiegowosc-online/" },
      { label: "Pełna księgowość", url: "/pelna-ksiegowosc/" },
      { label: "KSeF", url: "/ksef/" },
      { label: "Kontakt", url: "/kontakt/" },
    ],
  },
  {
    slug: "opinie-i-case-studies",
    kind: "trust",
    shortTitle: "Wiarygodność",
    title: "Wiarygodność i standard współpracy | Platinus",
    description:
      "Zweryfikowane informacje o Platinus: działalność od 2005 roku, certyfikat księgowy, OC, jawny cennik i zasady publikowania opinii klientów.",
    eyebrow: "Dowody zamiast obietnic",
    h1: "Wiarygodność i standard współpracy",
    lead: "Nie publikujemy wymyślonych ocen ani anonimowych sukcesów. Pokazujemy informacje, które można sprawdzić, oraz jasno wskazujemy, jak będziemy dodawać przyszłe referencje.",
    highlights: [
      "Działalność od 2005 roku",
      "Certyfikat księgowy nr 10544/2005",
      "OC potwierdzone w profilu C.I.K.",
      "Brak sztucznych ocen i aggregateRating",
    ],
    sections: [
      {
        heading: "Co można zweryfikować już teraz",
        paragraphs: [
          `Profil Platinus w <a href="${cikProfile}" rel="external">Centrum Informacji Księgowej</a> podaje aktualny adres, NIP, REGON, certyfikat księgowy nr 10544/2005, doświadczenie od 2005 roku i ubezpieczenie OC w PZU. Źródło zostało sprawdzone 22 lipca 2026 roku.`,
          "Na stronie publikujemy również pełne dane przedsiębiorcy, orientacyjny cennik i konkretny zakres usług. To informacje bardziej użyteczne niż ogólne hasło o najwyższej jakości bez możliwości sprawdzenia.",
        ],
      },
      {
        heading: "Dlaczego nie ma sztucznych opinii",
        paragraphs: [
          "Opinia ma wartość tylko wtedy, gdy pochodzi od prawdziwego klienta i została opublikowana za jego zgodą. Nie tworzymy przykładowych cytatów, nie przepisujemy ocen bez źródła i nie dodajemy danych strukturalnych aggregateRating bez widocznych, weryfikowalnych recenzji.",
          "Po uzyskaniu zgód ta strona może zostać uzupełniona o nazwę firmy, opis zakresu współpracy, mierzalny efekt i podpis klienta. Do tego czasu pozostaje zbiorem potwierdzonych źródeł oraz standardów pracy.",
        ],
      },
      {
        heading: "Jak powinno wyglądać przyszłe case study",
        paragraphs: [
          "Rzetelny opis współpracy powinien wyjaśniać sytuację początkową, rzeczywisty zakres pracy, czas wdrożenia i rezultat. Nie może sugerować gwarancji takiego samego efektu u każdego klienta. Dane finansowe i nazwa firmy mogą zostać pokazane tylko po wyraźnym uzgodnieniu.",
        ],
        items: [
          "krótki opis branży i skali firmy,",
          "problem lub cel zgłoszony przed rozpoczęciem współpracy,",
          "konkretny zakres obsługi wykonanej przez biuro,",
          "czas wdrożenia i sposób przekazywania dokumentów,",
          "mierzalny rezultat bez ujawniania danych poufnych,",
          "zgoda klienta na publikację nazwy, cytatu i logo.",
        ],
      },
      {
        heading: "Standard przed podpisaniem umowy",
        paragraphs: [
          "Przed rozpoczęciem współpracy ustalamy formę księgowości, liczbę dokumentów, zatrudnienie, sposób obiegu danych i dodatkowe raporty. Klient otrzymuje cenę odpowiadającą temu zakresowi. Jeżeli dokumentacja historyczna wymaga uporządkowania, oddzielamy tę pracę od bieżącej obsługi.",
          "Podczas współpracy ważne są terminy i odpowiedzialność po obu stronach. Biuro potrzebuje kompletnych dokumentów oraz informacji o zmianach, a klient powinien wiedzieć, kiedy i w jakiej formie otrzyma dane do rozliczeń. Taki standard jest podstawą przewidywalnej współpracy.",
        ],
      },
      {
        heading: "Jak pomóc w budowaniu wiarygodnych referencji",
        paragraphs: [
          "Jeżeli jesteś klientem Platinus i chcesz opisać współpracę, napisz na biuro@platinus.pl. Uzgodnimy zakres informacji, zgodę na publikację i możliwość anonimizacji. Nie prosimy o ujawnianie danych finansowych, które powinny pozostać poufne.",
          "Referencje będą publikowane z datą, źródłem oraz informacją o zakresie usługi. Dzięki temu kolejni przedsiębiorcy otrzymają konkretny materiał, a nie anonimową ocenę oderwaną od kontekstu.",
        ],
      },
    ],
    related: [
      { label: "O biurze Platinus", url: "/o-nas/" },
      { label: "Cennik", url: "/cennik/" },
      { label: "Poradnik", url: "/poradnik/" },
      { label: "Kontakt", url: "/kontakt/" },
    ],
  },
  {
    slug: "polityka-prywatnosci",
    kind: "privacy",
    shortTitle: "Polityka prywatności",
    title: "Polityka prywatności | Platinus",
    description:
      "Informacje o przetwarzaniu danych podczas korzystania ze strony Platinus.pl i kontaktu e-mailowego z biurem rachunkowym.",
    eyebrow: "Ochrona danych",
    h1: "Polityka prywatności Platinus.pl",
    lead: "Poniżej wyjaśniamy, jakie dane mogą być przetwarzane podczas korzystania ze strony i kontaktu z biurem. Ostatnia aktualizacja: 22 lipca 2026 roku.",
    highlights: [
      "Administrator: PLATINUS.PL Andrzej Kowalczyk",
      "Kontakt: biuro@platinus.pl",
      "Brak formularza i narzędzi analitycznych na stronie",
      "Prawo skargi do Prezesa UODO",
    ],
    sections: [
      {
        heading: "Administrator danych",
        paragraphs: [
          "Administratorem danych osobowych jest PLATINUS.PL Andrzej Kowalczyk, ul. Jugosłowiańska 17B lok. 97, 03-984 Warszawa, NIP 951-110-02-56, REGON 140220457. W sprawach związanych z danymi możesz skontaktować się pod adresem biuro@platinus.pl lub telefonicznie pod numerem +48 664 496 913.",
          "Ta polityka dotyczy publicznej strony platinus.pl i wiadomości wysyłanych na podany adres e-mail. Szczegółowe zasady przetwarzania danych klientów w ramach usług księgowych mogą wynikać także z umowy i odrębnych obowiązków informacyjnych.",
        ],
      },
      {
        heading: "Kontakt e-mailowy i telefoniczny",
        paragraphs: [
          "Jeżeli piszesz lub dzwonisz, przetwarzamy dane przekazane w wiadomości, takie jak imię, dane kontaktowe, informacje o firmie i treść zapytania. Celem jest udzielenie odpowiedzi, przygotowanie oferty, podjęcie działań na Twoje żądanie przed zawarciem umowy albo obsługa bieżącej relacji.",
          "Podstawą może być podjęcie działań przed zawarciem umowy, wykonanie umowy, obowiązek prawny lub prawnie uzasadniony interes polegający na prowadzeniu korespondencji i ochronie przed roszczeniami — zależnie od charakteru sprawy. Nie wysyłaj w pierwszej wiadomości haseł ani dokumentów zawierających dane, które nie są potrzebne do wstępnej odpowiedzi.",
        ],
      },
      {
        heading: "Dane techniczne i pliki cookies",
        paragraphs: [
          "Publiczna strona nie korzysta z narzędzi analitycznych, reklamowych ani zewnętrznych skryptów śledzących i nie ustawia marketingowych plików cookies. Serwer hostingowy może jednak zapisywać standardowe logi techniczne, między innymi adres IP, czas żądania, żądany adres i informacje o przeglądarce.",
          "Logi służą zapewnieniu bezpieczeństwa, diagnozowaniu błędów i prawidłowemu działaniu hostingu. Zakres oraz techniczny okres ich przechowywania zależą także od konfiguracji i zasad dostawcy hostingu. Strona zawiera linki do zewnętrznych serwisów, które po otwarciu stosują własne polityki prywatności.",
        ],
      },
      {
        heading: "Odbiorcy i okres przechowywania",
        paragraphs: [
          "Dane mogą być powierzane dostawcom hostingu, poczty elektronicznej, usług IT i innym podmiotom wspierającym administratora na podstawie odpowiednich umów. Mogą być także udostępniane uprawnionym organom, jeżeli wynika to z prawa.",
          "Korespondencję przechowujemy przez czas potrzebny do obsługi zapytania, zawarcia lub wykonania umowy, realizacji obowiązków prawnych oraz do upływu okresu, w którym mogą być dochodzone roszczenia. Gdy nie można wskazać jednej daty dla wszystkich spraw, stosujemy kryterium niezbędności dla celu i obowiązujących przepisów.",
        ],
      },
      {
        heading: "Twoje prawa",
        paragraphs: [
          "W zakresie przewidzianym prawem możesz żądać dostępu do danych, ich sprostowania, usunięcia, ograniczenia przetwarzania lub przeniesienia, a także wnieść sprzeciw. Jeżeli podstawą jest zgoda, możesz ją wycofać bez wpływu na zgodność wcześniejszego przetwarzania.",
          'Masz również prawo wnieść skargę do Prezesa Urzędu Ochrony Danych Osobowych. Przystępne informacje o prawach publikuje <a href="https://uodo.gov.pl/" rel="external">Urząd Ochrony Danych Osobowych</a>. Aby skorzystać z praw wobec Platinus, napisz na biuro@platinus.pl i opisz swoje żądanie.',
        ],
      },
      {
        heading: "Zmiany polityki",
        paragraphs: [
          "Polityka może być aktualizowana, gdy zmieni się sposób działania strony, zakres usług lub wymagania prawne. Przy każdej wersji podajemy datę aktualizacji. Zmiana polityki nie zastępuje dodatkowych informacji, które mogą być przekazywane klientom w związku z konkretną usługą.",
        ],
      },
    ],
    related: [
      { label: "Kontakt", url: "/kontakt/" },
      { label: "O nas", url: "/o-nas/" },
      { label: "Standard współpracy", url: "/opinie-i-case-studies/" },
    ],
  },
);

pages.push(
  {
    slug: "poradnik/ile-kosztuje-ksiegowosc-spolki-zoo",
    kind: "article",
    shortTitle: "Cena księgowości spółki",
    title: "Ile kosztuje księgowość spółki z o.o.? | Platinus",
    description:
      "Od czego zależy koszt księgowości spółki z o.o.? Dokumenty, rachunki, VAT, waluty, pracownicy, raporty i orientacyjne ceny pełnych ksiąg.",
    eyebrow: "Poradnik przedsiębiorcy",
    h1: "Ile kosztuje księgowość spółki z o.o.?",
    lead: "Liczba faktur jest ważna, ale nie opisuje całej pracy. Rzetelna wycena uwzględnia operacje bankowe, rozrachunki, VAT, zatrudnienie, środki trwałe i raporty potrzebne zarządowi.",
    published: "2026-07-22",
    updated: "2026-07-22",
    breadcrumbs: [
      { name: "Strona główna", url: "/" },
      { name: "Poradnik", url: "/poradnik/" },
      {
        name: "Ile kosztuje księgowość spółki z o.o.?",
        url: "/poradnik/ile-kosztuje-ksiegowosc-spolki-zoo/",
      },
    ],
    highlights: [
      "Pełne księgi od 800 zł netto miesięcznie",
      "Sprawozdanie finansowe od 1000 zł netto",
      "Wycena zależy od pełnego zakresu, nie tylko faktur",
      "Aktualizacja materiału: 22 lipca 2026",
    ],
    sections: [
      {
        heading: "Punkt wyjścia: liczba dokumentów",
        paragraphs: [
          "Biura często podają cenę w przedziałach liczby dokumentów, ponieważ jest to łatwy sposób wstępnego porównania. W Platinus orientacyjna cena prowadzenia ksiąg handlowych wynosi 800 zł netto miesięcznie do 50 dokumentów i 1300 zł netto do 100 dokumentów. Sprawozdanie finansowe kosztuje od 1000 zł netto.",
          "To punkt odniesienia, a nie automatyczna wycena każdej spółki. Dwie firmy z taką samą liczbą faktur mogą generować zupełnie inny nakład pracy. Jedna ma jeden rachunek i sprzedaż krajową, druga kilka walut, płatności internetowe, rozrachunki ze wspólnikami i cykliczne raporty.",
        ],
      },
      {
        heading: "Elementy, które najbardziej wpływają na cenę",
        paragraphs: [
          "Największą różnicę tworzą liczba operacji i ich różnorodność. Ważne jest, czy dokumenty są kompletne, opisane i przekazywane regularnie. Dodatkowy czas zajmują wyjaśnienia braków, uzgadnianie płatności oraz poprawianie danych dostarczonych po zamknięciu okresu.",
        ],
        items: [
          "liczba faktur, wyciągów i pozostałych dokumentów księgowych,",
          "liczba rachunków bankowych, operatorów płatności i walut,",
          "sprzedaż zagraniczna i zróżnicowane rozliczenia VAT,",
          "środki trwałe, leasingi, pożyczki i rozrachunki wspólników,",
          "liczba pracowników i zleceniobiorców,",
          "raporty dla zarządu, banku, inwestora lub grupy kapitałowej.",
        ],
      },
      {
        heading: "Stała opłata a prace dodatkowe",
        paragraphs: [
          "Dobra oferta powinna wyjaśniać, co obejmuje miesięczna opłata. Standardem mogą być bieżące księgowania, rejestry VAT, JPK, uzgodnienia i informacje o rozliczeniach. Sprawozdanie finansowe, rozbudowane raporty, korekty dawnych okresów lub porządkowanie przejętych ksiąg mogą być wyceniane oddzielnie.",
          "Warto zapytać nie tylko o kwotę, ale również o limit dokumentów, definicję dokumentu, koszt zatrudnionych osób, zamknięcie roku i kontakt w nietypowych sprawach. Pozwala to porównać oferty o podobnym zakresie, a nie dwie liczby opisujące inne usługi.",
        ],
      },
      {
        heading: "Jak przygotować dane do wyceny",
        paragraphs: [
          "Przygotuj dane z typowego miesiąca oraz informację o sezonowych skokach. Jeśli spółka dopiero zaczyna, oprzyj szacunek na planowanym modelu sprzedaży i zatrudnienia. Biuro może później zweryfikować stawkę, gdy rzeczywista skala istotnie odbiega od założeń.",
        ],
        steps: [
          "Policz przeciętną liczbę faktur sprzedaży i zakupu.",
          "Dodaj rachunki bankowe, waluty i operatorów płatności.",
          "Opisz VAT, sprzedaż zagraniczną i ewentualny magazyn.",
          "Podaj liczbę pracowników, zleceniobiorców i typy umów.",
          "Wskaż raporty oraz częstotliwość, której oczekuje zarząd.",
          "Napisz, czy księgi są nowe, czy przejmowane od innego biura.",
        ],
      },
      {
        heading: "Najtańsza oferta nie zawsze oznacza niższy koszt",
        paragraphs: [
          "Niska cena może być właściwa dla prostej spółki z małą liczbą operacji. Problem pojawia się, gdy oferta pomija zadania, które firma uznaje za oczywiste, albo nie opisuje kosztu zamknięcia roku. Dlatego porównuj zakres, terminy kontaktu, sposób przekazywania dokumentów i odpowiedzialność za uzupełnianie danych.",
          "Celem wyceny nie jest znalezienie najwyższej liczby, lecz przewidywalnej opłaty za usługę odpowiadającą faktycznemu modelowi spółki. Kilka minut poświęconych na dokładny opis zwykle oszczędza późniejszych nieporozumień.",
        ],
      },
    ],
    faq: [
      {
        question: "Jaka jest minimalna orientacyjna cena pełnej księgowości?",
        answer:
          "W Platinus orientacyjna cena wynosi 800 zł netto miesięcznie do 50 dokumentów. Finalna wycena zależy od pełnego zakresu.",
      },
      {
        question: "Czy sprawozdanie finansowe jest w cenie miesięcznej?",
        answer:
          "Jest wyceniane od 1000 zł netto. Dokładny koszt zależy od stanu ksiąg i zakresu prac zamknięciowych.",
      },
      {
        question: "Czy liczba operacji bankowych wpływa na cenę?",
        answer:
          "Tak. Rachunki, waluty, operatorzy płatności i liczba rozrachunków wpływają na pracochłonność obsługi.",
      },
    ],
    related: [
      { label: "Księgowość spółki z o.o.", url: "/ksiegowosc-spolki-zoo/" },
      { label: "Pełna księgowość", url: "/pelna-ksiegowosc/" },
      { label: "Cennik", url: "/cennik/" },
      {
        label: "Jak zmienić biuro rachunkowe",
        url: "/poradnik/jak-zmienic-biuro-rachunkowe/",
      },
    ],
  },
  {
    slug: "poradnik/jak-zmienic-biuro-rachunkowe",
    kind: "article",
    shortTitle: "Zmiana biura rachunkowego",
    title: "Jak zmienić biuro rachunkowe w trakcie roku? | Platinus",
    description:
      "Plan zmiany biura rachunkowego: termin, wypowiedzenie, dokumenty, upoważnienia, dane księgowe i bezpieczne przejęcie obsługi w trakcie roku.",
    eyebrow: "Poradnik przedsiębiorcy",
    h1: "Jak zmienić biuro rachunkowe w trakcie roku?",
    lead: "Zmiana jest możliwa, ale wymaga jasnej daty przejęcia, kompletnej dokumentacji i podziału odpowiedzialności między dotychczasowe biuro, nowe biuro oraz przedsiębiorcę.",
    published: "2026-07-22",
    updated: "2026-07-22",
    breadcrumbs: [
      { name: "Strona główna", url: "/" },
      { name: "Poradnik", url: "/poradnik/" },
      {
        name: "Jak zmienić biuro rachunkowe?",
        url: "/poradnik/jak-zmienic-biuro-rachunkowe/",
      },
    ],
    highlights: [
      "Zmiana w trakcie roku jest możliwa",
      "Najważniejsza jest jednoznaczna data przejęcia",
      "Potrzebna jest kompletna dokumentacja",
      "Materiał ogólny — zakres zależy od firmy",
    ],
    sections: [
      {
        heading: "Najpierw sprawdź obecną umowę",
        paragraphs: [
          "Zacznij od okresu wypowiedzenia, terminu przekazania dokumentów i zasad rozliczenia prac dodatkowych. Umowa może określać, kto przygotowuje deklaracje za ostatni miesiąc, sprawozdanie finansowe albo korekty. Nie zakładaj, że wszystkie zadania kończą się w dniu wypowiedzenia.",
          "Zapisz pytania i poproś obie strony o potwierdzenie ustaleń w trwałej formie. Szczególnie ważne jest wskazanie ostatniego okresu obsługiwanego przez poprzednie biuro i pierwszego okresu nowego biura. Brak tej granicy może prowadzić do dublowania albo pominięcia obowiązku.",
        ],
      },
      {
        heading: "Ustal dzień przejęcia i harmonogram",
        paragraphs: [
          "Zmiana na początku roku bywa prostsza, ale nie zawsze trzeba czekać do stycznia. Jeżeli powód jest istotny, przejęcie można zaplanować w trakcie roku. Nowe biuro powinno wiedzieć, czy otrzyma zamknięte okresy, jakie deklaracje zostały wysłane i kiedy będą dostępne końcowe zestawienia.",
        ],
        steps: [
          "Wybierz ostatni miesiąc rozliczany przez dotychczasowe biuro.",
          "Potwierdź pierwszy miesiąc odpowiedzialności nowego biura.",
          "Ustal termin wydania dokumentów, danych i kopii deklaracji.",
          "Zaplanuj zmianę pełnomocnictw oraz dostępów do systemów.",
          "Przekaż dane kontaktowe osób odpowiedzialnych po każdej stronie.",
          "Zarezerwuj czas na pytania po wstępnej kontroli kompletności.",
        ],
      },
      {
        heading: "Jakie dokumenty mogą być potrzebne",
        paragraphs: [
          "Lista zależy od formy księgowości. Przy KPiR lub ryczałcie potrzebne będą ewidencje i informacje o rozliczeniach. Przy pełnych księgach dochodzą między innymi bilans otwarcia, obroty i salda, rozrachunki, środki trwałe i dane umożliwiające kontynuację zapisów.",
        ],
        items: [
          "ewidencje księgowe za bieżący i wcześniejsze okresy,",
          "wysłane deklaracje, pliki JPK i potwierdzenia,",
          "ewidencja środków trwałych oraz amortyzacji,",
          "dokumentacja VAT i informacje o korektach,",
          "dane kadrowo-płacowe oraz zgłoszenia ZUS,",
          "umowy, salda, rozrachunki i inne dane właściwe dla firmy.",
        ],
      },
      {
        heading: "Sprawdzenie kompletności to nie pełny audyt",
        paragraphs: [
          "Nowe biuro powinno sprawdzić, czy otrzymało materiały niezbędne do dalszej pracy. To nie musi oznaczać automatycznej, szczegółowej kontroli wszystkich dawnych zapisów. Jeżeli oczekujesz audytu lub korekt historycznych, nazwij ten zakres i poproś o oddzielną wycenę.",
          "Po przejęciu mogą ujawnić się braki, których nie dało się rozpoznać bez analizy danych. Ważne, aby ustalić sposób ich zgłaszania i decyzji o ewentualnych korektach. Bieżąca obsługa oraz naprawa przeszłości to dwa różne projekty.",
        ],
      },
      {
        heading: "Jak ograniczyć ryzyko podczas zmiany",
        paragraphs: [
          "Zachowaj własną kopię dokumentów i potwierdzeń, nie przekazuj haseł w zwykłej wiadomości i odbierz dostępy osobom, które nie powinny już z nich korzystać. Pełnomocnictwa i uprawnienia zmieniaj w sposób uzgodniony z nowym biurem.",
          "Przez pierwszy okres odpowiadaj szybko na pytania o nietypowe transakcje. Nowa osoba nie zna jeszcze historii firmy i może potrzebować kontekstu, który wcześniej był oczywisty. Dobra zmiana to proces z harmonogramem, a nie jednorazowe przesłanie folderu plików.",
        ],
      },
    ],
    faq: [
      {
        question: "Czy można zmienić biuro rachunkowe w trakcie roku?",
        answer:
          "Tak. Trzeba jednoznacznie ustalić dzień przejęcia oraz zakres dokumentów i obowiązków każdej strony.",
      },
      {
        question: "Czy nowe biuro sprawdzi wszystkie stare rozliczenia?",
        answer:
          "Nie automatycznie. Kontrola kompletności potrzebnej do kontynuacji i pełny audyt historyczny to odrębne zakresy pracy.",
      },
      {
        question: "Kto powinien przekazać dokumenty?",
        answer:
          "Za zapewnienie przekazania odpowiada przedsiębiorca, nawet jeśli technicznie dokumenty wysyła dotychczasowe biuro bezpośrednio do nowego.",
      },
    ],
    related: [
      { label: "Księgowość online", url: "/ksiegowosc-online/" },
      { label: "Księgowość dla JDG", url: "/ksiegowosc-jdg/" },
      { label: "Księgowość spółki z o.o.", url: "/ksiegowosc-spolki-zoo/" },
      { label: "Kontakt", url: "/kontakt/" },
    ],
  },
  {
    slug: "poradnik/jak-przekazywac-dokumenty-online",
    kind: "article",
    shortTitle: "Dokumenty online",
    title: "Jak przekazywać dokumenty do biura online? | Platinus",
    description:
      "Praktyczny obieg dokumentów online: terminy, nazwy plików, opisy kosztów, faktury, wyciągi, odpowiedzialność i miesięczna checklista przedsiębiorcy.",
    eyebrow: "Poradnik przedsiębiorcy",
    h1: "Jak przekazywać dokumenty do biura online?",
    lead: "Dobry obieg dokumentów ma stały termin, jedno miejsce, czytelne opisy i osobę odpowiedzialną. Dzięki temu księgowość nie musi odtwarzać kontekstu z wielu wiadomości.",
    published: "2026-07-22",
    updated: "2026-07-22",
    breadcrumbs: [
      { name: "Strona główna", url: "/" },
      { name: "Poradnik", url: "/poradnik/" },
      {
        name: "Jak przekazywać dokumenty online?",
        url: "/poradnik/jak-przekazywac-dokumenty-online/",
      },
    ],
    highlights: [
      "Jedno uzgodnione miejsce na dokumenty",
      "Stały termin przekazania",
      "Opis celu nietypowych wydatków",
      "Kontrola kompletności przed zamknięciem miesiąca",
    ],
    sections: [
      {
        heading: "Wybierz jedno główne miejsce przekazywania",
        paragraphs: [
          "Dokumenty rozproszone między pocztą, komunikatorem, folderem współdzielonym i papierem trudno kontrolować. Ustal z biurem jedno główne narzędzie i wyjątki dla dokumentów, których nie można przekazać w zwykły sposób. W Platinus korzystamy z elektronicznego archiwum dostępnego online.",
          "Jeżeli kilka osób w firmie kupuje lub sprzedaje, wyznacz osobę odpowiedzialną za kompletność. Biuro może informować o zauważonych brakach, ale nie wie o dokumencie, którego nigdy nie otrzymało. Wewnętrzna odpowiedzialność jest równie ważna jak program.",
        ],
      },
      {
        heading: "Ustal miesięczny rytm",
        paragraphs: [
          "Najlepszy termin to taki, którego firma jest w stanie regularnie dotrzymać i który pozostawia biuru czas na analizę. Nie czekaj z całym miesiącem do ostatniej chwili, jeśli dokumenty mogą trafiać na bieżąco. Szczególnie wcześnie przekazuj materiały wymagające wyjaśnienia.",
        ],
        steps: [
          "Na bieżąco zapisuj faktury sprzedaży i zakupu w uzgodnionym miejscu.",
          "Po zakończeniu miesiąca dodaj kompletne wyciągi i raporty płatności.",
          "Opisz nietypowe wydatki, transakcje zagraniczne i korekty.",
          "Sprawdź numerację faktur i brakujące dokumenty.",
          "Potwierdź biuru zakończenie przekazywania za dany okres.",
          "Odpowiadaj na pytania w uzgodnionym terminie.",
        ],
      },
      {
        heading: "Opisuj kontekst, którego nie widać na fakturze",
        paragraphs: [
          "Dokument nie zawsze pokazuje, kto korzystał z zakupu, jakiego projektu dotyczył albo dlaczego płatnik różni się od nabywcy. Krótki opis pozwala uniknąć zgadywania. Ustal z biurem słownik lub prosty format dla powtarzalnych sytuacji.",
          "Nie zmieniaj treści dokumentu źródłowego. Dodatkowe informacje przekazuj w polu opisu, wiadomości lub uzgodnionym załączniku. Jeśli nie wiesz, czego potrzebuje księgowość, zapytaj przed przygotowaniem własnego rozbudowanego arkusza.",
        ],
      },
      {
        heading: "Dbaj o jakość plików i bezpieczeństwo",
        paragraphs: [
          "Skan lub zdjęcie powinny obejmować cały dokument, być czytelne i mieć prawidłową orientację. Nie łącz wielu niezwiązanych faktur w przypadkowej kolejności, jeżeli system pozwala dodać je oddzielnie. Nazwa pliku może zawierać datę, kontrahenta i numer dokumentu, ale nie zastępuje danych na fakturze.",
          "Nie wysyłaj haseł ani kodów dostępu zwykłym e-mailem. Dostępy przekazuj ustalonym bezpiecznym kanałem i nadawaj tylko potrzebny zakres uprawnień. Gdy pracownik przestaje odpowiadać za dokumenty, odbierz mu niepotrzebny dostęp.",
        ],
      },
      {
        heading: "Miesięczna kontrola kompletności",
        paragraphs: [
          "Przed potwierdzeniem zakończenia miesiąca porównaj dokumenty z rachunkami bankowymi, systemem sprzedaży i listą stałych kosztów. Sprawdź korekty, płatności kartą i dokumenty z platform. Taka kontrola trwa krócej niż wyjaśnianie braków po przygotowaniu rozliczenia.",
          "Gdy dokument pojawi się później, przekaż go z jasną informacją, którego okresu dotyczy. Nie zakładaj, że samo umieszczenie pliku w archiwum po terminie automatycznie wywoła ponowne rozliczenie. Zgłoś zmianę bezpośrednio opiekunowi.",
        ],
      },
    ],
    faq: [
      {
        question: "Czy dokumenty muszę dostarczać papierowo?",
        answer:
          "Nie w standardowym modelu online. Sposób przekazywania ustalamy z klientem, a większość materiałów może trafiać elektronicznie.",
      },
      {
        question: "Czy zdjęcie faktury wystarczy?",
        answer:
          "Może wystarczyć, jeżeli jest kompletne i czytelne, a uzgodnione narzędzie akceptuje taki format. W razie wątpliwości poproś biuro o wskazanie standardu.",
      },
      {
        question: "Kto odpowiada za kompletność dokumentów?",
        answer:
          "Przedsiębiorca powinien zapewnić kompletność i prawdziwość przekazywanych danych. Biuro może wskazywać zauważone braki, ale nie zna dokumentów, których nie otrzymało.",
      },
    ],
    related: [
      { label: "Księgowość online", url: "/ksiegowosc-online/" },
      {
        label: "Księgowość online czy lokalne biuro",
        url: "/poradnik/ksiegowosc-online-czy-lokalna/",
      },
      {
        label: "Jak zmienić biuro rachunkowe",
        url: "/poradnik/jak-zmienic-biuro-rachunkowe/",
      },
      { label: "Kontakt", url: "/kontakt/" },
    ],
  },
);

pages.push(
  {
    slug: "poradnik/ksiegowosc-online-czy-lokalna",
    kind: "article",
    shortTitle: "Online czy lokalnie",
    title: "Księgowość online czy lokalne biuro? | Platinus",
    description:
      "Porównanie księgowości online, lokalnego biura i modelu hybrydowego: dokumenty, kontakt, bezpieczeństwo, spotkania oraz wybór dla firmy.",
    eyebrow: "Poradnik przedsiębiorcy",
    h1: "Księgowość online czy lokalne biuro?",
    lead: "Najlepszy model nie zależy od mody, lecz od sposobu pracy firmy. Porównaj obieg dokumentów, potrzebę spotkań, zespół i częstotliwość nietypowych spraw.",
    published: "2026-07-22",
    updated: "2026-07-22",
    breadcrumbs: [
      { name: "Strona główna", url: "/" },
      { name: "Poradnik", url: "/poradnik/" },
      {
        name: "Księgowość online czy lokalne biuro?",
        url: "/poradnik/ksiegowosc-online-czy-lokalna/",
      },
    ],
    highlights: [
      "Online: wygoda i dostęp z dowolnego miejsca",
      "Lokalnie: możliwość spotkania i papierowego obiegu",
      "Hybrydowo: dokumenty online oraz spotkania w razie potrzeby",
      "Liczy się stały opiekun, nie sam kanał kontaktu",
    ],
    sections: [
      {
        heading: "Co naprawdę oznacza księgowość online",
        paragraphs: [
          "W modelu online dokumenty są przekazywane elektronicznie, a kontakt odbywa się telefonicznie, mailowo lub przez uzgodniony system. Nie musi to oznaczać anonimowej infolinii. Dobre biuro zdalne wskazuje osobę odpowiedzialną za obsługę i ustala rytm przekazywania informacji.",
          "Online sprawdza się szczególnie wtedy, gdy przedsiębiorca podróżuje, pracuje z kilku miejsc albo zespół jest rozproszony. Warunkiem jest konsekwencja: jedno miejsce na dokumenty, regularne terminy i szybkie odpowiedzi na pytania księgowości.",
        ],
      },
      {
        heading: "Kiedy warto mieć biuro w pobliżu",
        paragraphs: [
          "Lokalne biuro może być ważne dla osób, które preferują rozmowę przy stole, mają część papierowej dokumentacji albo prowadzą proces wymagający wspólnego omówienia wielu materiałów. Bliskość ułatwia również pierwsze spotkanie przed rozpoczęciem współpracy.",
          "Sama odległość nie gwarantuje jednak dostępności. Zapytaj o sposób umawiania spotkań, osobę prowadzącą firmę i czas reakcji. Biuro kilka ulic dalej może pracować wyłącznie po wcześniejszym umówieniu, a zdalny opiekun odpowiadać sprawniej.",
        ],
      },
      {
        heading: "Model hybrydowy łączy oba podejścia",
        paragraphs: [
          "W modelu hybrydowym codzienne dokumenty trafiają online, a spotkania odbywają się przy starcie, zmianie modelu działalności lub innej ważnej sytuacji. To rozwiązanie ogranicza przewożenie papierów, ale zachowuje możliwość rozmowy osobistej.",
          "Platinus obsługuje firmy z całej Polski online, a klientów z Warszawy także stacjonarnie przy ul. Jugosłowiańskiej 17B/97. Spotkania najlepiej umawiać wcześniej, aby właściwa osoba mogła przygotować dane i pytania.",
        ],
      },
      {
        heading: "Pięć pytań przed wyborem modelu",
        items: [
          "Czy dokumenty w firmie powstają cyfrowo, czy głównie na papierze?",
          "Ile osób przekazuje dane i kto odpowiada za ich kompletność?",
          "Jak często potrzebujesz spotkania, a jak często krótkiej odpowiedzi?",
          "Czy biuro zapewnia stałego opiekuna i jasno opisany proces?",
          "Czy używane narzędzia są wystarczające dla sprzedaży, magazynu i zespołu?",
        ],
        paragraphs: [
          "Odpowiedzi zwykle pokazują, czy firma potrzebuje pełnej obsługi zdalnej, stałych wizyt czy modelu hybrydowego. Nie wybieraj narzędzia bez rozmowy o procesie — program nie naprawi niejasnej odpowiedzialności.",
        ],
      },
      {
        heading: "Bezpieczeństwo zależy od zasad, nie od odległości",
        paragraphs: [
          "W każdym modelu ograniczaj uprawnienia, nie przesyłaj haseł zwykłą wiadomością i ustal, kto może widzieć dokumenty. Papier również może zostać zgubiony lub udostępniony niewłaściwej osobie. Ważne są procedury, kopie, kontrola dostępu i odpowiedzialność użytkowników.",
          "Przed podpisaniem umowy zapytaj o sposób przekazywania dokumentów, archiwum, dostęp po zakończeniu współpracy i kanał zgłaszania incydentów. Te pytania są bardziej praktyczne niż samo przeciwstawienie „online” i „stacjonarnie”.",
        ],
      },
    ],
    faq: [
      {
        question: "Czy księgowość online jest tylko dla małych firm?",
        answer:
          "Nie. Model zdalny może obsługiwać także spółki i firmy zatrudniające pracowników, jeżeli proces i narzędzia odpowiadają skali działalności.",
      },
      {
        question: "Czy mogę połączyć dokumenty online ze spotkaniami?",
        answer:
          "Tak. Model hybrydowy pozwala przekazywać dokumenty elektronicznie i umawiać spotkania wtedy, gdy są potrzebne.",
      },
      {
        question: "Czy lokalne biuro jest bezpieczniejsze?",
        answer:
          "Bezpieczeństwo zależy przede wszystkim od procedur, kontroli dostępu i odpowiedzialności, a nie od samej odległości między firmą a biurem.",
      },
    ],
    related: [
      { label: "Księgowość online", url: "/ksiegowosc-online/" },
      {
        label: "Jak przekazywać dokumenty online",
        url: "/poradnik/jak-przekazywac-dokumenty-online/",
      },
      { label: "O nas", url: "/o-nas/" },
      { label: "Kontakt", url: "/kontakt/" },
    ],
  },
  {
    slug: "poradnik/co-obejmuje-pelna-ksiegowosc",
    kind: "article",
    shortTitle: "Zakres pełnej księgowości",
    title: "Co obejmuje pełna księgowość? | Platinus",
    description:
      "Pełna księgowość w praktyce: księgi rachunkowe, rozrachunki, VAT, JPK, środki trwałe, sprawozdanie finansowe i raporty dla zarządu.",
    eyebrow: "Poradnik przedsiębiorcy",
    h1: "Co obejmuje pełna księgowość?",
    lead: "Pełne księgi tworzą spójny obraz operacji, majątku i rozrachunków firmy. Zakres biura powinien jednak jasno odróżniać obsługę bieżącą od zamknięcia roku i raportów dodatkowych.",
    published: "2026-07-22",
    updated: "2026-07-22",
    breadcrumbs: [
      { name: "Strona główna", url: "/" },
      { name: "Poradnik", url: "/poradnik/" },
      {
        name: "Co obejmuje pełna księgowość?",
        url: "/poradnik/co-obejmuje-pelna-ksiegowosc/",
      },
    ],
    highlights: [
      "Księgi rachunkowe i ewidencje pomocnicze",
      "Rozrachunki, VAT, JPK i środki trwałe",
      "Sprawozdanie finansowe oraz zamknięcie roku",
      "Raporty dodatkowe wymagają ustalenia zakresu",
    ],
    sections: [
      {
        heading: "Bieżące prowadzenie ksiąg rachunkowych",
        paragraphs: [
          "Podstawą jest ujmowanie zdarzeń gospodarczych na odpowiednich kontach i zachowanie związku między dokumentem, płatnością, rozrachunkiem oraz ewidencją podatkową. Biuro potrzebuje kompletnych danych, a firma powinna przekazywać także kontekst niewidoczny na samej fakturze.",
          "Zakres kont i sposób raportowania zależą od działalności. Firma handlowa, usługowa i produkcyjna mogą wymagać innego podziału danych. Plan pracy ustala się na początku, a istotne zmiany warto konsultować przed ich wprowadzeniem.",
        ],
      },
      {
        heading: "Najczęstsze elementy obsługi",
        items: [
          "ewidencja dokumentów sprzedaży, zakupów, banku i pozostałych operacji,",
          "prowadzenie rozrachunków z kontrahentami oraz innymi podmiotami,",
          "rejestry VAT i pliki JPK w zakresie wynikającym z sytuacji firmy,",
          "ewidencja środków trwałych i wartości niematerialnych i prawnych,",
          "księgowe ujęcie list płac i rozliczeń związanych z zatrudnieniem,",
          "zestawienia obrotów i sald oraz uzgodnione informacje miesięczne.",
        ],
        paragraphs: [
          "Nie każda oferta obejmuje identyczny pakiet. Dlatego warto wskazać, czy firma oczekuje tylko realizacji standardowych obowiązków, czy również cyklicznego raportowania zarządczego, obsługi wniosków lub niestandardowych zestawień.",
        ],
      },
      {
        heading: "Zamknięcie roku i sprawozdanie finansowe",
        paragraphs: [
          "Zamknięcie roku obejmuje więcej niż wygenerowanie dokumentu. Wymaga uzgodnienia kont, rozrachunków, środków trwałych, zapasów i innych danych zależnych od działalności. Spółka powinna odpowiednio wcześnie przygotować informacje, których biuro nie może ustalić samodzielnie.",
          "Sprawozdanie finansowe może być wyceniane oddzielnie od miesięcznej obsługi. W Platinus orientacyjna cena zaczyna się od 1000 zł netto. Dokładny koszt zależy od stanu ksiąg, liczby wymaganych uzgodnień i dodatkowych prac.",
        ],
      },
      {
        heading: "Raporty dla zarządu nie zawsze są standardem",
        paragraphs: [
          "Księgi zawierają dane potrzebne do wielu analiz, ale przygotowanie czytelnego raportu wymaga ustalenia układu, częstotliwości i odpowiedzialności za interpretację. Inaczej wygląda proste zestawienie należności, a inaczej miesięczny raport wyników według projektów.",
          "Jeżeli zarząd potrzebuje konkretnych wskaźników, warto przed podpisaniem umowy pokazać przykład oczekiwanego raportu. Biuro oceni, czy dane są dostępne w obecnym obiegu i ile dodatkowej pracy wymaga ich przygotowanie.",
        ],
      },
      {
        heading: "Co pozostaje po stronie firmy",
        paragraphs: [
          "Biuro księguje na podstawie danych otrzymanych od klienta. Firma odpowiada za dostarczenie kompletnych, prawdziwych dokumentów, opisanie nietypowych zdarzeń i terminowe przekazanie informacji o umowach, płatnościach czy decyzjach zarządu. Niektórych faktów nie da się odtworzyć z wyciągu bankowego.",
          "W dobrze opisanej współpracy wiadomo, kto zatwierdza dokumenty, kto odpowiada na pytania i kiedy kończy się przekazywanie materiałów za miesiąc. Taki proces jest równie ważny jak sam program księgowy.",
        ],
      },
    ],
    faq: [
      {
        question: "Czy pełna księgowość obejmuje sprawozdanie finansowe?",
        answer:
          "Może obejmować, ale często jest ono wyceniane oddzielnie. W Platinus cena zaczyna się od 1000 zł netto.",
      },
      {
        question: "Czy raporty zarządcze są w standardowej cenie?",
        answer:
          "Zakres raportów trzeba potwierdzić przed rozpoczęciem współpracy. Nietypowe lub częste zestawienia mogą być usługą dodatkową.",
      },
      {
        question: "Czy pełną księgowość można prowadzić online?",
        answer:
          "Tak. Dokumenty i uzgodnienia mogą być obsługiwane zdalnie, jeżeli firma ma uporządkowany obieg danych.",
      },
    ],
    related: [
      { label: "Pełna księgowość", url: "/pelna-ksiegowosc/" },
      { label: "Księgowość spółki z o.o.", url: "/ksiegowosc-spolki-zoo/" },
      {
        label: "Cena księgowości spółki",
        url: "/poradnik/ile-kosztuje-ksiegowosc-spolki-zoo/",
      },
      { label: "Cennik", url: "/cennik/" },
    ],
  },
  {
    slug: "poradnik/jak-przygotowac-firme-do-ksef",
    kind: "article",
    shortTitle: "Przygotowanie do KSeF",
    title: "Jak przygotować firmę do KSeF? Checklista | Platinus",
    description:
      "Praktyczna checklista przygotowania do KSeF: role, uprawnienia, faktury sprzedaży i zakupu, korekty, awarie, testy oraz współpraca z księgowością.",
    eyebrow: "Poradnik przedsiębiorcy",
    h1: "Jak przygotować firmę do KSeF?",
    lead: "Zacznij od procesu i odpowiedzialności, a dopiero potem wybieraj narzędzie. Firma powinna wiedzieć, kto wystawia, zatwierdza, koryguje i przekazuje dokumenty do księgowości.",
    published: "2026-07-22",
    updated: "2026-07-22",
    breadcrumbs: [
      { name: "Strona główna", url: "/" },
      { name: "Poradnik", url: "/poradnik/" },
      {
        name: "Jak przygotować firmę do KSeF?",
        url: "/poradnik/jak-przygotowac-firme-do-ksef/",
      },
    ],
    highlights: [
      "Najpierw role i proces, potem program",
      "Oddziel sprzedaż, zakupy, korekty i wyjątki",
      "Przetestuj uprawnienia oraz zastępstwa",
      "Terminy prawne potwierdź przed wdrożeniem",
    ],
    sections: [
      {
        heading: "Zmapuj obecny obieg faktur",
        paragraphs: [
          "Spisz, gdzie powstają faktury sprzedaży, kto sprawdza dane i jak dokument trafia do klienta oraz księgowości. Następnie opisz faktury zakupowe: gdzie są odbierane, kto potwierdza związek z działalnością i w jaki sposób przekazywany jest dodatkowy opis.",
          "Nie ograniczaj mapy do typowego dokumentu. Uwzględnij korekty, zaliczki, płatności internetowe, transakcje zagraniczne i sytuacje, w których fakturę wystawia inna osoba niż zwykle. To właśnie wyjątki najczęściej ujawniają braki procesu.",
        ],
      },
      {
        heading: "Przypisz role i zastępstwa",
        paragraphs: [
          "Każda czynność powinna mieć właściciela. Jeżeli tylko jedna osoba posiada dostęp, jej urlop lub odejście może zatrzymać fakturowanie. Przygotuj zastępstwo i ustal sposób odebrania uprawnień po zmianie stanowiska.",
        ],
        items: [
          "osoba wystawiająca faktury sprzedaży,",
          "osoba zatwierdzająca dane kontrahenta i warunki sprzedaży,",
          "osoba obsługująca korekty oraz sytuacje wyjątkowe,",
          "osoba odbierająca i opisująca dokumenty zakupowe,",
          "administrator uprawnień i zastępca,",
          "kontakt po stronie biura rachunkowego.",
        ],
      },
      {
        heading: "Sprawdź narzędzia i integracje",
        paragraphs: [
          "Program powinien pasować do rzeczywistego procesu. Firma wystawiająca kilka prostych faktur ma inne wymagania niż sklep, magazyn lub system abonamentowy. Zapisz potrzebne integracje i sprawdź, kto odpowiada za ich konfigurację, aktualizacje oraz błędy.",
          "W ramach współpracy księgowej Platinus udostępnia bezpłatny program do fakturowania zgodny z KSeF. Jeżeli firma ma rozbudowany system sprzedażowy, przed zmianą trzeba ocenić sposób wymiany danych i zakres wsparcia.",
        ],
      },
      {
        heading: "Przetestuj scenariusze przed użyciem produkcyjnym",
        steps: [
          "Wystaw standardową fakturę i sprawdź wszystkie dane.",
          "Przećwicz korektę oraz obsługę dokumentu odrzuconego.",
          "Sprawdź działanie zastępstwa i ograniczonych uprawnień.",
          "Zweryfikuj sposób odbierania i opisywania zakupów.",
          "Ustal procedurę na wypadek niedostępności systemu lub internetu.",
          "Potwierdź, w jaki sposób księgowość otrzyma dane i informacje dodatkowe.",
        ],
        paragraphs: [
          "Test ma odzwierciedlać prawdziwe zdarzenia, nie tylko poprawne kliknięcie przycisku. Zapisz wynik i popraw proces, zanim zaangażujesz cały zespół.",
        ],
      },
      {
        heading: "Przeszkol zespół i zapisz krótką instrukcję",
        paragraphs: [
          "Instrukcja nie musi mieć kilkudziesięciu stron. Powinna wskazywać, kto wykonuje daną czynność, w jakim systemie, gdzie zgłasza błąd i kto przejmuje zadanie podczas nieobecności. Dołącz listę kontaktów i sposób bezpiecznego przekazywania informacji.",
          "Po uruchomieniu procesu zbierz uwagi z pierwszych tygodni i zaktualizuj instrukcję. Terminy oraz wymagania techniczne KSeF mogą się zmieniać, dlatego przed wdrożeniem potwierdź aktualny stan w oficjalnych źródłach i z osobą odpowiedzialną za księgowość firmy.",
        ],
      },
    ],
    faq: [
      {
        question: "Od czego zacząć przygotowanie do KSeF?",
        answer:
          "Od spisania obiegu faktur, ról i wyjątków. Dopiero potem warto dopasować program i uprawnienia.",
      },
      {
        question: "Czy jeden użytkownik systemu wystarczy?",
        answer:
          "Może wystarczyć w bardzo małej firmie, ale trzeba przewidzieć zastępstwo oraz bezpieczny sposób przekazania odpowiedzialności.",
      },
      {
        question: "Czy Platinus zapewnia program do fakturowania?",
        answer:
          "Tak. Program zgodny z KSeF jest dostępny bezpłatnie w ramach uzgodnionej współpracy księgowej.",
      },
    ],
    related: [
      { label: "Wsparcie KSeF", url: "/ksef/" },
      { label: "Księgowość online", url: "/ksiegowosc-online/" },
      {
        label: "Dokumenty online",
        url: "/poradnik/jak-przekazywac-dokumenty-online/",
      },
      { label: "Kontakt", url: "/kontakt/" },
    ],
  },
);

export { pages, renderPage, siteUrl };
