import { googleReviews, localizedPath } from "./site-pages.mjs";

const content = {
  en: {
    uslugi: {
      short: "Services",
      title: "Accounting services in Warsaw and online | Platinus",
      h1: "Accounting built around the way your company works",
      eyebrow: "Platinus services",
      lead: "Explore bookkeeping, full accounting, tax reporting, social insurance and payroll support. Each page explains the general scope and the information needed for an initial conversation.",
      focus: [
        "Bookkeeping and full accounting",
        "VAT, JPK, ZUS, HR and payroll",
        "Warsaw office and remote cooperation",
        "A clear scope agreed before the start",
      ],
    },
    "ksiegowosc-online": {
      short: "Online accounting",
      title: "Online accounting for companies in Poland | Platinus",
      h1: "Online accounting with a regular point of contact",
      eyebrow: "Remote cooperation",
      lead: "Documents can be transferred electronically and routine matters handled by email or phone. Platinus uses the Kancelaria module within the eSZOK system to support document flow, OCR and access to the online archive.",
      focus: [
        "Electronic document flow",
        "Online archive available around the clock",
        "Regular email and telephone contact",
        "Kancelaria module with OCR support",
      ],
    },
    "pelna-ksiegowosc": {
      short: "Full accounting",
      title: "Full accounting for companies | Platinus Warsaw",
      h1: "Full accounting for companies and organisations",
      eyebrow: "Accounting records",
      lead: "A structured service for entities required to keep accounting books. The exact scope follows the company’s legal form, number of transactions, reporting needs and internal document flow.",
      focus: [
        "Accounting books and settlements",
        "VAT and JPK reporting",
        "Year-end closing support",
        "Scope tailored to the organisation",
      ],
    },
    "kpir-i-ryczalt": {
      short: "KPiR and lump-sum tax",
      title: "KPiR and lump-sum tax accounting | Platinus",
      h1: "KPiR and lump-sum tax for small businesses",
      eyebrow: "Simplified accounting",
      lead: "Routine bookkeeping for sole traders and smaller businesses, organised around a predictable monthly flow of sales, costs and settlement information.",
      focus: [
        "KPiR or revenue register",
        "Monthly document routine",
        "Tax and ZUS information",
        "Support when the business changes",
      ],
    },
    "vat-jpk-i-raportowanie": {
      short: "VAT, JPK and reporting",
      title: "VAT, JPK and accounting reports | Platinus",
      h1: "VAT, JPK and reporting without document chaos",
      eyebrow: "Tax reporting",
      lead: "A clear process for collecting source documents, checking transaction context and preparing the records and files included in the agreed accounting service.",
      focus: [
        "VAT records",
        "JPK files within the agreed scope",
        "Transaction context and documentation",
        "Useful management summaries",
      ],
    },
    "zus-i-zgloszenia": {
      short: "ZUS registrations",
      title: "ZUS registrations and settlements | Platinus",
      h1: "ZUS registrations in an organised monthly rhythm",
      eyebrow: "Social insurance",
      lead: "Support with standard registrations, changes and settlement information for entrepreneurs and employers, based on timely and complete data supplied by the client.",
      focus: [
        "Registrations and changes",
        "Settlement documents",
        "Information about payment amounts",
        "Coordination with payroll",
      ],
    },
    "kadry-i-place": {
      short: "HR and payroll",
      title: "HR and payroll services for companies | Platinus",
      h1: "HR and payroll for small and medium-sized companies",
      eyebrow: "People and payroll",
      lead: "Recurring personnel and payroll administration organised around agreed deadlines, complete employee information and a clear division of responsibilities.",
      focus: [
        "Personnel documentation",
        "Payroll calculations",
        "ZUS-related reporting",
        "Information for the employer",
      ],
    },
    "ksiegowosc-spolki-zoo": {
      short: "Limited company accounting",
      title: "Accounting for a Polish limited company | Platinus",
      h1: "Accounting for a Polish limited company",
      eyebrow: "Spółka z o.o.",
      lead: "Full accounting arranged around the company’s bank operations, invoices, settlements, assets and reporting obligations. The final scope depends on the actual activity.",
      focus: [
        "Full accounting books",
        "Receivables and liabilities",
        "VAT and periodic reporting",
        "Year-end closing coordination",
      ],
    },
    "ksiegowosc-jdg": {
      short: "Sole trader accounting",
      title: "Accounting for sole traders in Poland | Platinus",
      h1: "Accounting for a sole proprietorship",
      eyebrow: "JDG",
      lead: "Straightforward accounting for individual entrepreneurs, from organising monthly records to tax, VAT and ZUS information within the agreed service.",
      focus: [
        "KPiR or lump-sum tax",
        "VAT where applicable",
        "ZUS settlements",
        "Online or Warsaw-based cooperation",
      ],
    },
    "ksiegowosc-dla-ecommerce": {
      short: "E-commerce accounting",
      title: "Accounting for e-commerce businesses | Platinus",
      h1: "Accounting for e-commerce and online sales",
      eyebrow: "Online trade",
      lead: "A general accounting framework for online sales, with attention to sales channels, payment operators, returns and the documents needed to understand each transaction flow.",
      focus: [
        "Sales reports and invoices",
        "Payment operator settlements",
        "Returns and corrections",
        "Domestic and foreign transaction context",
      ],
    },
    "ksiegowosc-dla-it": {
      short: "Accounting for IT",
      title: "Accounting for IT and digital services | Platinus",
      h1: "Accounting for IT and digital service businesses",
      eyebrow: "Digital services",
      lead: "General accounting support for contractors, software companies and digital service providers, organised around contracts, costs and domestic or international sales.",
      focus: [
        "Service sales documentation",
        "Domestic and foreign transactions",
        "Recurring software costs",
        "A remote-friendly workflow",
      ],
    },
    "ksiegowosc-dla-lekarzy": {
      short: "Accounting for doctors",
      title: "Accounting for doctors and medical practices | Platinus",
      h1: "Accounting for doctors and individual practices",
      eyebrow: "Medical activity",
      lead: "General bookkeeping support for medical professionals, focused on the business records required for accounting and separated from confidential patient documentation.",
      focus: [
        "Business income and expenses",
        "Practice-specific document flow",
        "Clear separation of patient data",
        "Online or hybrid cooperation",
      ],
    },
    ksef: {
      short: "KSeF",
      title: "Preparing a company for KSeF | Platinus",
      h1: "Preparing your company for KSeF workflows",
      eyebrow: "Structured invoices",
      lead: "Preparation is not only a software task. Roles, authorisations, corrections, purchase invoices and the connection between invoicing and accounting all need a practical process.",
      focus: [
        "Roles and authorisations",
        "Invoice issue and receipt flow",
        "Corrections and exceptions",
        "Connection with accounting",
      ],
    },
    cennik: {
      short: "Pricing",
      title: "Accounting service pricing | Platinus Warsaw",
      h1: "Pricing based on the real scope of work",
      eyebrow: "Transparent quote",
      lead: "The final monthly fee depends on the accounting method, number and type of documents, employment, VAT and any additional reporting. We confirm the scope and price before cooperation begins.",
      focus: [
        "A quote before the start",
        "Document volume and complexity matter",
        "Payroll priced by the agreed scope",
        "Additional work agreed separately",
      ],
    },
    "o-nas": {
      short: "About us",
      title: "About Platinus accounting office | Warsaw and online",
      h1: "An accounting office built on a steady working relationship",
      eyebrow: "About Platinus",
      lead: "Platinus has operated since 2005. The office combines direct responsibility with electronic document flow and supports companies in Warsaw as well as remotely throughout Poland.",
      focus: [
        "Operating since 2005",
        "A named office owner",
        "Warsaw and remote cooperation",
        "Professional liability insurance listed by C.I.K.",
      ],
    },
    "andrzej-kowalczyk": {
      short: "Andrzej Kowalczyk",
      title: "Andrzej Kowalczyk — owner of Platinus",
      h1: "Andrzej Kowalczyk",
      eyebrow: "Office owner",
      lead: "The owner of Platinus and holder of accounting certificate no. 10544/2005. The public C.I.K. profile also lists professional liability insurance with PZU.",
      focus: [
        "Owner of Platinus",
        "Accounting certificate no. 10544/2005",
        "Business operating since 2005",
        "PZU liability insurance listed by C.I.K.",
      ],
    },
    kontakt: {
      short: "Contact",
      title: "Contact Platinus accounting office | Warsaw",
      h1: "Let’s talk about your company’s accounting",
      eyebrow: "Contact and directions",
      lead: "Email biuro@platinus.pl or call +48 664 496 913. Meetings at the Warsaw office are arranged in advance.",
      focus: [
        "Email: biuro@platinus.pl",
        "Phone: +48 664 496 913",
        "Jugosłowiańska 17B/97, Warsaw",
        "Remote cooperation throughout Poland",
      ],
    },
    poradnik: {
      short: "Guides",
      title: "Accounting guides for entrepreneurs | Platinus",
      h1: "Accounting explained in practical terms",
      eyebrow: "Knowledge centre",
      lead: "General guides that help entrepreneurs compare service models, organise documents and prepare useful questions before speaking to an accounting office.",
      focus: [
        "Plain-language explanations",
        "Practical checklists",
        "General information, not individual advice",
        "Clear links to related services",
      ],
    },
    "opinie-i-case-studies": {
      short: "How we work",
      title: "Client reviews and working standards | Platinus",
      h1: "How we work and build trust",
      eyebrow: "Verifiable information",
      lead: "Trust starts with a clear agreement, a named responsible person, insurance and a predictable process. Public Google reviews add an independent view of the cooperation.",
      focus: [
        "Operating since 2005",
        "Certificate no. 10544/2005",
        "Insurance listed by C.I.K.",
        "Google score 5.0 from 5 reviews",
      ],
    },
    "polityka-prywatnosci": {
      short: "Privacy policy",
      title: "Privacy policy | Platinus",
      h1: "Platinus.pl privacy policy",
      eyebrow: "Data protection",
      lead: "This page explains how data may be processed when you use the website or contact the accounting office. Last updated: 23 July 2026.",
      focus: [
        "Controller: PLATINUS.PL Andrzej Kowalczyk",
        "Contact: biuro@platinus.pl",
        "No contact form or advertising trackers",
        "Rights under applicable data protection law",
      ],
    },
    "poradnik/ile-kosztuje-ksiegowosc-spolki-zoo": {
      short: "Limited company accounting costs",
      title: "How much does limited company accounting cost? | Platinus",
      h1: "How much does accounting for a limited company cost?",
      eyebrow: "Pricing guide",
      lead: "The number of invoices is only one factor. Bank operations, VAT, foreign currencies, employees, assets and management reporting can all affect workload and price.",
    },
    "poradnik/jak-zmienic-biuro-rachunkowe": {
      short: "Changing accounting office",
      title: "How to change accounting office during the year | Platinus",
      h1: "How to change accounting office during the year",
      eyebrow: "Transition guide",
      lead: "A well-planned change defines the handover date, required records and responsibility for current filings before the new office takes over.",
    },
    "poradnik/jak-przekazywac-dokumenty-online": {
      short: "Documents online",
      title: "How to send accounting documents online | Platinus",
      h1: "How to transfer documents to an accounting office online",
      eyebrow: "Document workflow",
      lead: "A good remote routine has a deadline, a responsible person and a consistent way to describe files and missing information.",
    },
    "poradnik/ksiegowosc-online-czy-lokalna": {
      short: "Online or local",
      title: "Online accounting or a local office? | Platinus",
      h1: "Online accounting or a local accounting office?",
      eyebrow: "Cooperation models",
      lead: "The best model depends on document flow, communication preferences, the company team and how often an in-person meeting is genuinely useful.",
    },
    "poradnik/co-obejmuje-pelna-ksiegowosc": {
      short: "Full accounting scope",
      title: "What does full accounting include? | Platinus",
      h1: "What does full accounting include?",
      eyebrow: "Scope guide",
      lead: "Accounting books, settlements, VAT, JPK, year-end closing and reports form a connected process. The exact service should always be specified in the agreement.",
    },
    "poradnik/jak-przygotowac-firme-do-ksef": {
      short: "Preparing for KSeF",
      title: "How to prepare a company for KSeF | Platinus",
      h1: "How to prepare your company for KSeF",
      eyebrow: "Practical checklist",
      lead: "Start with people and processes: users, permissions, corrections, purchase invoices and the hand-off from invoicing to accounting.",
    },
  },
  de: {
    uslugi: {
      short: "Leistungen",
      title: "Buchhaltungsleistungen in Warschau und online | Platinus",
      h1: "Buchhaltung passend zur Arbeitsweise Ihres Unternehmens",
      eyebrow: "Leistungen von Platinus",
      lead: "Entdecken Sie vereinfachte und doppelte Buchführung, Steuerberichte, Sozialversicherung sowie Personal- und Lohnabrechnung. Jede Seite erläutert den allgemeinen Umfang und die Vorbereitung auf ein Erstgespräch.",
      focus: [
        "Vereinfachte und doppelte Buchführung",
        "Umsatzsteuer, JPK, ZUS, Personal und Lohn",
        "Büro in Warschau und Online-Zusammenarbeit",
        "Klarer Umfang vor dem Start",
      ],
    },
    "ksiegowosc-online": {
      short: "Online-Buchhaltung",
      title: "Online-Buchhaltung für Unternehmen in Polen | Platinus",
      h1: "Online-Buchhaltung mit festem Ansprechpartner",
      eyebrow: "Digitale Zusammenarbeit",
      lead: "Dokumente können elektronisch übermittelt und laufende Fragen per E-Mail oder Telefon geklärt werden. Platinus nutzt das Modul Kancelaria im eSZOK-System für Dokumentenfluss, OCR und das Online-Archiv.",
      focus: [
        "Elektronischer Dokumentenfluss",
        "Online-Archiv rund um die Uhr",
        "Fester E-Mail- und Telefonkontakt",
        "Kancelaria-Modul mit OCR",
      ],
    },
    "pelna-ksiegowosc": {
      short: "Doppelte Buchführung",
      title: "Doppelte Buchführung für Unternehmen | Platinus",
      h1: "Doppelte Buchführung für Gesellschaften und Organisationen",
      eyebrow: "Rechnungswesen",
      lead: "Eine strukturierte Leistung für buchführungspflichtige Unternehmen. Der genaue Umfang richtet sich nach Rechtsform, Transaktionen, Berichtsbedarf und internem Dokumentenfluss.",
      focus: [
        "Geschäftsbücher und Abstimmungen",
        "Umsatzsteuer- und JPK-Berichte",
        "Unterstützung beim Jahresabschluss",
        "Umfang passend zur Organisation",
      ],
    },
    "kpir-i-ryczalt": {
      short: "KPiR und Pauschalsteuer",
      title: "KPiR und Pauschalsteuer-Buchhaltung | Platinus",
      h1: "KPiR und Pauschalsteuer für kleine Unternehmen",
      eyebrow: "Vereinfachte Buchhaltung",
      lead: "Laufende Buchhaltung für Einzelunternehmer und kleinere Firmen mit einem planbaren monatlichen Ablauf für Umsätze, Kosten und Abrechnungsinformationen.",
      focus: [
        "KPiR oder Einnahmenregister",
        "Monatlicher Dokumentenrhythmus",
        "Informationen zu Steuern und ZUS",
        "Begleitung bei Veränderungen",
      ],
    },
    "vat-jpk-i-raportowanie": {
      short: "Umsatzsteuer, JPK und Berichte",
      title: "Umsatzsteuer, JPK und Buchhaltungsberichte | Platinus",
      h1: "Umsatzsteuer, JPK und Berichte ohne Dokumentenchaos",
      eyebrow: "Steuerberichte",
      lead: "Ein klarer Prozess für Quelldokumente, Transaktionskontext und die Aufzeichnungen sowie Dateien, die zum vereinbarten Leistungsumfang gehören.",
      focus: [
        "Umsatzsteuerregister",
        "JPK-Dateien im vereinbarten Umfang",
        "Transaktionskontext und Nachweise",
        "Nützliche Unternehmensberichte",
      ],
    },
    "zus-i-zgloszenia": {
      short: "ZUS-Meldungen",
      title: "ZUS-Meldungen und Abrechnungen | Platinus",
      h1: "ZUS-Meldungen in einem geordneten Monatsrhythmus",
      eyebrow: "Sozialversicherung",
      lead: "Unterstützung bei üblichen Anmeldungen, Änderungen und Abrechnungsinformationen für Unternehmer und Arbeitgeber auf Grundlage rechtzeitig gelieferter Daten.",
      focus: [
        "Anmeldungen und Änderungen",
        "Abrechnungsunterlagen",
        "Informationen zu Zahlbeträgen",
        "Abstimmung mit der Lohnabrechnung",
      ],
    },
    "kadry-i-place": {
      short: "Personal und Lohn",
      title: "Personal- und Lohnabrechnung für Unternehmen | Platinus",
      h1: "Personal und Lohn für kleine und mittlere Unternehmen",
      eyebrow: "Mitarbeiter und Abrechnung",
      lead: "Laufende Personal- und Lohnadministration mit vereinbarten Fristen, vollständigen Mitarbeiterdaten und einer klaren Aufgabenverteilung.",
      focus: [
        "Personalunterlagen",
        "Lohn- und Gehaltsabrechnung",
        "ZUS-bezogene Meldungen",
        "Informationen für Arbeitgeber",
      ],
    },
    "ksiegowosc-spolki-zoo": {
      short: "Buchhaltung für Sp. z o.o.",
      title: "Buchhaltung für eine polnische Sp. z o.o. | Platinus",
      h1: "Buchhaltung für eine polnische Sp. z o.o.",
      eyebrow: "Spółka z o.o.",
      lead: "Doppelte Buchführung rund um Bankbewegungen, Rechnungen, Abstimmungen, Vermögen und Berichtspflichten. Der endgültige Umfang hängt von der tatsächlichen Tätigkeit ab.",
      focus: [
        "Vollständige Geschäftsbücher",
        "Forderungen und Verbindlichkeiten",
        "Umsatzsteuer und Berichte",
        "Koordination des Jahresabschlusses",
      ],
    },
    "ksiegowosc-jdg": {
      short: "Buchhaltung für Einzelunternehmer",
      title: "Buchhaltung für Einzelunternehmer in Polen | Platinus",
      h1: "Buchhaltung für ein Einzelunternehmen",
      eyebrow: "JDG",
      lead: "Übersichtliche Buchhaltung für Einzelunternehmer – von monatlichen Aufzeichnungen bis zu Steuer-, Umsatzsteuer- und ZUS-Informationen im vereinbarten Umfang.",
      focus: [
        "KPiR oder Pauschalsteuer",
        "Umsatzsteuer, falls relevant",
        "ZUS-Abrechnungen",
        "Online oder in Warschau",
      ],
    },
    "ksiegowosc-dla-ecommerce": {
      short: "E-Commerce-Buchhaltung",
      title: "Buchhaltung für E-Commerce-Unternehmen | Platinus",
      h1: "Buchhaltung für E-Commerce und Online-Verkauf",
      eyebrow: "Online-Handel",
      lead: "Ein allgemeiner Buchhaltungsrahmen für Online-Verkäufe mit Blick auf Vertriebskanäle, Zahlungsanbieter, Retouren und die Nachweise für jeden Transaktionsfluss.",
      focus: [
        "Verkaufsberichte und Rechnungen",
        "Abrechnung von Zahlungsanbietern",
        "Retouren und Korrekturen",
        "In- und ausländische Transaktionen",
      ],
    },
    "ksiegowosc-dla-it": {
      short: "Buchhaltung für IT",
      title: "Buchhaltung für IT und digitale Dienstleistungen | Platinus",
      h1: "Buchhaltung für IT und digitale Dienstleistungen",
      eyebrow: "Digitale Leistungen",
      lead: "Allgemeine Buchhaltungsunterstützung für Freelancer, Softwareunternehmen und digitale Dienstleister, organisiert rund um Verträge, Kosten und nationale oder internationale Umsätze.",
      focus: [
        "Dokumentation von Dienstleistungen",
        "In- und ausländische Transaktionen",
        "Wiederkehrende Softwarekosten",
        "Digitaler Arbeitsablauf",
      ],
    },
    "ksiegowosc-dla-lekarzy": {
      short: "Buchhaltung für Ärzte",
      title: "Buchhaltung für Ärzte und Praxen | Platinus",
      h1: "Buchhaltung für Ärzte und Einzelpraxen",
      eyebrow: "Medizinische Tätigkeit",
      lead: "Allgemeine Buchhaltung für medizinische Berufe mit Fokus auf geschäftliche Belege und einer klaren Trennung von vertraulichen Patientendaten.",
      focus: [
        "Betriebliche Einnahmen und Ausgaben",
        "Dokumentenfluss der Praxis",
        "Trennung von Patientendaten",
        "Online oder hybrid",
      ],
    },
    ksef: {
      short: "KSeF",
      title: "Unternehmen auf KSeF vorbereiten | Platinus",
      h1: "Ihr Unternehmen auf KSeF-Abläufe vorbereiten",
      eyebrow: "Strukturierte Rechnungen",
      lead: "Vorbereitung ist mehr als Software. Rollen, Berechtigungen, Korrekturen, Eingangsrechnungen und die Verbindung zwischen Fakturierung und Buchhaltung benötigen einen praktischen Prozess.",
      focus: [
        "Rollen und Berechtigungen",
        "Ausgangs- und Eingangsrechnungen",
        "Korrekturen und Ausnahmen",
        "Verbindung zur Buchhaltung",
      ],
    },
    cennik: {
      short: "Preise",
      title: "Preise für Buchhaltungsleistungen | Platinus",
      h1: "Preise nach dem tatsächlichen Arbeitsumfang",
      eyebrow: "Transparentes Angebot",
      lead: "Die monatliche Gebühr hängt von Buchführungsart, Zahl und Art der Belege, Beschäftigung, Umsatzsteuer und Zusatzberichten ab. Umfang und Preis werden vor dem Start bestätigt.",
      focus: [
        "Angebot vor dem Start",
        "Menge und Komplexität der Belege",
        "Personalabrechnung nach Umfang",
        "Zusatzarbeiten separat vereinbart",
      ],
    },
    "o-nas": {
      short: "Über uns",
      title: "Über die Buchhaltungskanzlei Platinus | Warschau",
      h1: "Eine Buchhaltungskanzlei mit beständiger Zusammenarbeit",
      eyebrow: "Über Platinus",
      lead: "Platinus ist seit 2005 tätig. Die Kanzlei verbindet persönliche Verantwortung mit elektronischem Dokumentenfluss und betreut Unternehmen in Warschau sowie online in ganz Polen.",
      focus: [
        "Tätig seit 2005",
        "Namentlich bekannter Inhaber",
        "Warschau und Online-Zusammenarbeit",
        "Berufshaftpflicht laut C.I.K.",
      ],
    },
    "andrzej-kowalczyk": {
      short: "Andrzej Kowalczyk",
      title: "Andrzej Kowalczyk — Inhaber von Platinus",
      h1: "Andrzej Kowalczyk",
      eyebrow: "Kanzleiinhaber",
      lead: "Inhaber von Platinus und Träger des Buchhalterzertifikats Nr. 10544/2005. Das öffentliche C.I.K.-Profil nennt außerdem eine Berufshaftpflicht bei PZU.",
      focus: [
        "Inhaber von Platinus",
        "Buchhalterzertifikat Nr. 10544/2005",
        "Unternehmen tätig seit 2005",
        "PZU-Haftpflicht laut C.I.K.",
      ],
    },
    kontakt: {
      short: "Kontakt",
      title: "Kontakt zur Buchhaltungskanzlei Platinus | Warschau",
      h1: "Sprechen wir über die Buchhaltung Ihres Unternehmens",
      eyebrow: "Kontakt und Anfahrt",
      lead: "Schreiben Sie an biuro@platinus.pl oder rufen Sie +48 664 496 913 an. Termine im Warschauer Büro werden vorab vereinbart.",
      focus: [
        "E-Mail: biuro@platinus.pl",
        "Telefon: +48 664 496 913",
        "Jugosłowiańska 17B/97, Warschau",
        "Online-Zusammenarbeit in ganz Polen",
      ],
    },
    poradnik: {
      short: "Ratgeber",
      title: "Buchhaltungsratgeber für Unternehmer | Platinus",
      h1: "Buchhaltung praktisch erklärt",
      eyebrow: "Wissensbereich",
      lead: "Allgemeine Ratgeber zum Vergleich von Leistungsmodellen, zur Organisation von Dokumenten und zur Vorbereitung guter Fragen für ein Erstgespräch.",
      focus: [
        "Verständliche Erklärungen",
        "Praktische Checklisten",
        "Allgemeine Information statt Einzelberatung",
        "Links zu passenden Leistungen",
      ],
    },
    "opinie-i-case-studies": {
      short: "So arbeiten wir",
      title: "Kundenbewertungen und Arbeitsstandard | Platinus",
      h1: "So arbeiten wir und schaffen Vertrauen",
      eyebrow: "Prüfbare Informationen",
      lead: "Vertrauen beginnt mit einem klaren Vertrag, einer verantwortlichen Person, Versicherung und einem planbaren Ablauf. Öffentliche Google-Bewertungen ergänzen diese Fakten.",
      focus: [
        "Tätig seit 2005",
        "Zertifikat Nr. 10544/2005",
        "Versicherung laut C.I.K.",
        "Google-Bewertung 5,0 aus 5 Rezensionen",
      ],
    },
    "polityka-prywatnosci": {
      short: "Datenschutz",
      title: "Datenschutzerklärung | Platinus",
      h1: "Datenschutzerklärung von Platinus.pl",
      eyebrow: "Datenschutz",
      lead: "Hier erklären wir, wie Daten beim Besuch der Website oder bei der Kontaktaufnahme verarbeitet werden können. Aktualisiert am 23. Juli 2026.",
      focus: [
        "Verantwortlicher: PLATINUS.PL Andrzej Kowalczyk",
        "Kontakt: biuro@platinus.pl",
        "Kein Kontaktformular oder Werbe-Tracking",
        "Rechte nach geltendem Datenschutzrecht",
      ],
    },
    "poradnik/ile-kosztuje-ksiegowosc-spolki-zoo": {
      short: "Kosten der GmbH-Buchhaltung",
      title: "Was kostet die Buchhaltung einer Sp. z o.o.? | Platinus",
      h1: "Was kostet die Buchhaltung einer polnischen Sp. z o.o.?",
      eyebrow: "Preisratgeber",
      lead: "Die Zahl der Rechnungen ist nur ein Faktor. Bankbewegungen, Umsatzsteuer, Fremdwährungen, Mitarbeiter, Anlagevermögen und Berichte beeinflussen Aufwand und Preis.",
    },
    "poradnik/jak-zmienic-biuro-rachunkowe": {
      short: "Kanzlei wechseln",
      title: "Buchhaltungskanzlei im laufenden Jahr wechseln | Platinus",
      h1: "Wie wechselt man die Buchhaltungskanzlei im laufenden Jahr?",
      eyebrow: "Übergaberatgeber",
      lead: "Ein geplanter Wechsel legt Übergabedatum, benötigte Unterlagen und die Verantwortung für laufende Meldungen fest, bevor die neue Kanzlei übernimmt.",
    },
    "poradnik/jak-przekazywac-dokumenty-online": {
      short: "Dokumente online",
      title: "Buchhaltungsunterlagen online übermitteln | Platinus",
      h1: "Wie übermittelt man Dokumente online an die Buchhaltung?",
      eyebrow: "Dokumentenfluss",
      lead: "Ein guter digitaler Ablauf hat eine Frist, eine verantwortliche Person und ein einheitliches System für Dateien und fehlende Angaben.",
    },
    "poradnik/ksiegowosc-online-czy-lokalna": {
      short: "Online oder vor Ort",
      title: "Online-Buchhaltung oder lokale Kanzlei? | Platinus",
      h1: "Online-Buchhaltung oder lokale Buchhaltungskanzlei?",
      eyebrow: "Modelle der Zusammenarbeit",
      lead: "Das passende Modell hängt vom Dokumentenfluss, den Kommunikationswünschen, dem Team und dem tatsächlichen Bedarf an persönlichen Treffen ab.",
    },
    "poradnik/co-obejmuje-pelna-ksiegowosc": {
      short: "Umfang der Buchführung",
      title: "Was umfasst die doppelte Buchführung? | Platinus",
      h1: "Was umfasst die doppelte Buchführung?",
      eyebrow: "Leistungsumfang",
      lead: "Geschäftsbücher, Abstimmungen, Umsatzsteuer, JPK, Jahresabschluss und Berichte bilden einen verbundenen Prozess. Der genaue Umfang gehört in die Vereinbarung.",
    },
    "poradnik/jak-przygotowac-firme-do-ksef": {
      short: "Vorbereitung auf KSeF",
      title: "Wie Sie Ihr Unternehmen auf KSeF vorbereiten | Platinus",
      h1: "Wie bereitet man ein Unternehmen auf KSeF vor?",
      eyebrow: "Praktische Checkliste",
      lead: "Beginnen Sie mit Personen und Abläufen: Nutzer, Berechtigungen, Korrekturen, Eingangsrechnungen und die Übergabe an die Buchhaltung.",
    },
  },
};

const labels = {
  en: {
    scope: "What the service covers",
    organisation: "How cooperation is organised",
    documents: "Documents and monthly workflow",
    fit: "When this service may fit",
    start: "Preparing the first conversation",
    scopeText:
      "The final scope is confirmed after reviewing the legal form, accounting method, transaction profile and reporting needs. The service can combine recurring records with related tax, ZUS or payroll work where agreed.",
    organisationText:
      "Cooperation starts with a short review of the company. The parties agree what information is transferred, by whom, on what date and through which channel. One repeatable process makes routine work easier to follow.",
    documentsText:
      "Complete and timely documents are essential. Source files should be readable and accompanied by context whenever the transaction cannot be understood from the invoice alone. Missing information is clarified before the relevant settlement is closed.",
    fitText:
      "This page is a general introduction, not an individual tax opinion. The right solution depends on how the business sells, hires people, pays suppliers and reports to owners or management.",
    startText:
      "For an initial quote, share the legal form, accounting method, approximate monthly document count, VAT status, number of employees and any foreign transactions or additional reports.",
    contact: "Contact details",
    contactText:
      'Email <a href="mailto:biuro@platinus.pl">biuro@platinus.pl</a> or call <a href="tel:+48664496913">+48 664 496 913</a>. The office is at ul. Jugosłowiańska 17B, unit 97, 03-984 Warsaw. Please arrange an in-person meeting in advance.',
    owner: "Responsibility and public credentials",
    ownerText:
      'Platinus is run by Andrzej Kowalczyk. The public <a href="https://www.cik.org.pl/biuro/biuro-rachunkowe-platinus-pl-andrzej-kowalczyk-2333" rel="external">C.I.K. profile</a> lists accounting certificate no. 10544/2005 and professional liability insurance with PZU.',
    privacy: "How contact data is used",
    privacyText:
      "When you email or call, the office processes the data you provide to answer the enquiry, prepare an offer, take pre-contract steps or manage an existing relationship. Do not send passwords or unnecessary sensitive documents in the first message.",
    technology: "Remote work and the Kancelaria system",
    technologyText:
      'For remote document work Platinus uses eSZOK and its Kancelaria module. According to the <a href="https://cti.org.pl/cti_optima_eszokbr.php" rel="external">producer’s information</a>, the module supports document transfer, OCR and online archive access. The detailed client workflow is agreed during onboarding.',
    guide: "A practical way to approach the topic",
    guideText:
      "Begin by describing the current situation and the result you need. Separate recurring monthly work from one-off clean-up, implementation or historical corrections. This makes both the handover and the quote easier to understand.",
    checklist: "Useful checklist",
    checklistItems: [
      "describe the current accounting and document flow,",
      "identify the people responsible on both sides,",
      "set a clear handover date and monthly deadlines,",
      "list unusual transactions and reporting expectations,",
      "confirm the scope and price in writing.",
    ],
  },
  de: {
    scope: "Was die Leistung umfasst",
    organisation: "Wie die Zusammenarbeit organisiert wird",
    documents: "Dokumente und Monatsablauf",
    fit: "Wann diese Leistung passen kann",
    start: "Vorbereitung auf das Erstgespräch",
    scopeText:
      "Der endgültige Umfang wird nach Prüfung von Rechtsform, Buchführungsart, Transaktionsprofil und Berichtsbedarf bestätigt. Vereinbarte Steuer-, ZUS- oder Personalaufgaben können mit den laufenden Aufzeichnungen verbunden werden.",
    organisationText:
      "Zu Beginn wird die Situation des Unternehmens kurz geprüft. Beide Seiten vereinbaren, welche Informationen von wem, zu welchem Termin und über welchen Kanal übermittelt werden. Ein wiederholbarer Prozess schafft Übersicht.",
    documentsText:
      "Vollständige und rechtzeitige Unterlagen sind entscheidend. Quelldokumente müssen lesbar sein und bei unklaren Vorgängen um Kontext ergänzt werden. Fehlende Angaben werden vor Abschluss der jeweiligen Abrechnung geklärt.",
    fitText:
      "Diese Seite bietet allgemeine Informationen und keine individuelle Steuerberatung. Die passende Lösung hängt von Vertrieb, Beschäftigung, Zahlungswegen und den Berichtsanforderungen der Geschäftsführung ab.",
    startText:
      "Für ein erstes Angebot nennen Sie Rechtsform, Buchführungsart, ungefähre Belegzahl, Umsatzsteuerstatus, Mitarbeiterzahl sowie Auslandstransaktionen oder zusätzliche Berichte.",
    contact: "Kontaktdaten",
    contactText:
      'Schreiben Sie an <a href="mailto:biuro@platinus.pl">biuro@platinus.pl</a> oder rufen Sie <a href="tel:+48664496913">+48 664 496 913</a> an. Das Büro befindet sich in der ul. Jugosłowiańska 17B, Raum 97, 03-984 Warschau. Persönliche Termine bitte vorab vereinbaren.',
    owner: "Verantwortung und öffentliche Nachweise",
    ownerText:
      'Platinus wird von Andrzej Kowalczyk geführt. Das öffentliche <a href="https://www.cik.org.pl/biuro/biuro-rachunkowe-platinus-pl-andrzej-kowalczyk-2333" rel="external">C.I.K.-Profil</a> nennt das Buchhalterzertifikat Nr. 10544/2005 und eine Berufshaftpflicht bei PZU.',
    privacy: "Verwendung von Kontaktdaten",
    privacyText:
      "Bei Kontakt per E-Mail oder Telefon verarbeitet die Kanzlei die mitgeteilten Daten, um zu antworten, ein Angebot vorzubereiten, vorvertragliche Maßnahmen durchzuführen oder eine bestehende Beziehung zu betreuen. Senden Sie in der ersten Nachricht keine Passwörter oder unnötigen sensiblen Dokumente.",
    technology: "Online-Arbeit mit dem Kancelaria-System",
    technologyText:
      'Für den digitalen Dokumentenfluss nutzt Platinus eSZOK und das Modul Kancelaria. Laut <a href="https://cti.org.pl/cti_optima_eszokbr.php" rel="external">Herstellerinformation</a> unterstützt das Modul Dokumentenübertragung, OCR und den Zugriff auf ein Online-Archiv. Der genaue Ablauf wird beim Start vereinbart.',
    guide: "Praktischer Einstieg in das Thema",
    guideText:
      "Beschreiben Sie zuerst die aktuelle Situation und das gewünschte Ergebnis. Trennen Sie laufende Monatsarbeit von einmaliger Bereinigung, Einführung oder historischen Korrekturen. So werden Übergabe und Angebot verständlicher.",
    checklist: "Nützliche Checkliste",
    checklistItems: [
      "aktuelle Buchhaltung und Dokumentenfluss beschreiben,",
      "verantwortliche Personen auf beiden Seiten festlegen,",
      "Übergabedatum und Monatsfristen vereinbaren,",
      "ungewöhnliche Transaktionen und Berichte nennen,",
      "Leistungsumfang und Preis schriftlich bestätigen.",
    ],
  },
};

function relatedItems(slug, locale) {
  const entries =
    slug === "poradnik"
      ? [
          "poradnik/ile-kosztuje-ksiegowosc-spolki-zoo",
          "poradnik/jak-zmienic-biuro-rachunkowe",
          "poradnik/jak-przekazywac-dokumenty-online",
          "poradnik/ksiegowosc-online-czy-lokalna",
          "poradnik/co-obejmuje-pelna-ksiegowosc",
          "poradnik/jak-przygotowac-firme-do-ksef",
        ]
      : ["uslugi", "cennik", "o-nas", "kontakt"];

  return entries.map((target) => ({
    label: content[locale][target].short,
    url: localizedPath(target, locale),
  }));
}

function serviceSections(data, locale) {
  const ui = labels[locale];
  return [
    {
      heading: ui.scope,
      paragraphs: [data.lead, ui.scopeText],
      items: data.focus,
    },
    {
      heading: ui.organisation,
      paragraphs: [ui.organisationText],
    },
    {
      heading: ui.documents,
      paragraphs: [ui.documentsText],
      items:
        locale === "en"
          ? [
              "sales and purchase documents,",
              "bank and payment information,",
              "contracts and explanations for unusual events,",
              "employee data where payroll is included.",
            ]
          : [
              "Verkaufs- und Einkaufsbelege,",
              "Bank- und Zahlungsinformationen,",
              "Verträge und Erläuterungen besonderer Vorgänge,",
              "Mitarbeiterdaten bei vereinbarter Lohnabrechnung.",
            ],
    },
    {
      heading: ui.fit,
      paragraphs: [ui.fitText],
    },
    {
      heading: ui.start,
      paragraphs: [ui.startText],
    },
  ];
}

function contactSections(locale) {
  const ui = labels[locale];
  return [
    { heading: ui.contact, paragraphs: [ui.contactText] },
    {
      heading:
        locale === "en"
          ? "What to include in a quote request"
          : "Was in eine Angebotsanfrage gehört",
      paragraphs: [ui.startText],
      items:
        locale === "en"
          ? [
              "legal form and current accounting method,",
              "approximate number of documents each month,",
              "VAT status and any foreign transactions,",
              "number of employees and contractors,",
              "whether the company is new or changing accounting office.",
            ]
          : [
              "Rechtsform und aktuelle Buchführungsart,",
              "ungefähre monatliche Belegzahl,",
              "Umsatzsteuerstatus und Auslandstransaktionen,",
              "Zahl der Mitarbeiter und Auftragnehmer,",
              "Neugründung oder Wechsel der Kanzlei.",
            ],
    },
    {
      heading:
        locale === "en"
          ? "Warsaw office and remote cooperation"
          : "Büro in Warschau und Online-Zusammenarbeit",
      paragraphs: [
        locale === "en"
          ? "Companies from Warsaw can combine electronic document transfer with an arranged office meeting. Businesses elsewhere in Poland can work remotely by email, phone and the agreed online document process."
          : "Unternehmen aus Warschau können den elektronischen Dokumentenfluss mit einem vereinbarten Bürotermin verbinden. Firmen in anderen Teilen Polens arbeiten per E-Mail, Telefon und über den festgelegten Online-Prozess.",
      ],
    },
    {
      heading:
        locale === "en"
          ? "Direct contact instead of a form"
          : "Direkter Kontakt statt Formular",
      paragraphs: [
        locale === "en"
          ? "The website does not use a contact form. Send your message directly to biuro@platinus.pl so that you keep a copy in your own mailbox. Do not send passwords or complete sensitive files before a secure transfer method has been agreed."
          : "Die Website verwendet kein Kontaktformular. Senden Sie Ihre Nachricht direkt an biuro@platinus.pl und behalten Sie eine Kopie im eigenen Postfach. Übermitteln Sie keine Passwörter oder vollständigen sensiblen Dateien, bevor ein sicherer Übertragungsweg vereinbart wurde.",
      ],
    },
  ];
}

function ownerSections(locale) {
  const ui = labels[locale];
  return [
    { heading: ui.owner, paragraphs: [ui.ownerText] },
    {
      heading:
        locale === "en"
          ? "Why the owner information has its own page"
          : "Warum der Inhaber eine eigene Seite hat",
      paragraphs: [
        locale === "en"
          ? "Credentials and liability information are easier to understand when shown together with the person responsible for the business. Service pages therefore focus on the service, while this profile collects the verifiable facts."
          : "Qualifikation und Haftpflicht sind verständlicher, wenn sie zusammen mit der verantwortlichen Person gezeigt werden. Leistungsseiten konzentrieren sich auf das Angebot; dieses Profil bündelt die prüfbaren Fakten.",
      ],
    },
    {
      heading:
        locale === "en"
          ? "A direct and predictable relationship"
          : "Direkte und planbare Zusammenarbeit",
      paragraphs: [
        locale === "en"
          ? "A small accounting office can combine direct responsibility with a structured digital workflow. Before work begins, the parties agree the scope, communication channel, document dates and any work outside the monthly service."
          : "Eine kleinere Kanzlei kann persönliche Verantwortung mit einem strukturierten digitalen Ablauf verbinden. Vor dem Start werden Umfang, Kommunikationsweg, Dokumententermine und Zusatzarbeiten vereinbart.",
      ],
    },
    { heading: ui.technology, paragraphs: [ui.technologyText] },
  ];
}

function privacySections(locale) {
  const ui = labels[locale];
  return [
    {
      heading: locale === "en" ? "Data controller" : "Verantwortlicher",
      paragraphs: [
        locale === "en"
          ? "The controller is PLATINUS.PL Andrzej Kowalczyk, ul. Jugosłowiańska 17B, unit 97, 03-984 Warsaw, NIP 951-110-02-56, REGON 140220457. Data enquiries can be sent to biuro@platinus.pl."
          : "Verantwortlicher ist PLATINUS.PL Andrzej Kowalczyk, ul. Jugosłowiańska 17B, Raum 97, 03-984 Warschau, NIP 951-110-02-56, REGON 140220457. Datenschutzanfragen können an biuro@platinus.pl gesendet werden.",
      ],
    },
    { heading: ui.privacy, paragraphs: [ui.privacyText] },
    {
      heading:
        locale === "en"
          ? "Technical data and external links"
          : "Technische Daten und externe Links",
      paragraphs: [
        locale === "en"
          ? "The public website does not use advertising or analytics trackers and does not contain a contact form. The hosting server may keep standard technical logs for security and troubleshooting. External websites apply their own privacy policies after you open them."
          : "Die öffentliche Website verwendet keine Werbe- oder Analyse-Tracker und enthält kein Kontaktformular. Der Hosting-Server kann aus Sicherheits- und Diagnosegründen technische Standardprotokolle speichern. Externe Websites verwenden nach dem Öffnen ihre eigenen Datenschutzregeln.",
      ],
    },
    {
      heading: locale === "en" ? "Your data rights" : "Ihre Datenschutzrechte",
      paragraphs: [
        locale === "en"
          ? "Depending on the legal basis, you may request access, correction, deletion, restriction or portability and may object to certain processing. You may also lodge a complaint with the President of the Polish Personal Data Protection Office."
          : "Je nach Rechtsgrundlage können Sie Auskunft, Berichtigung, Löschung, Einschränkung oder Übertragbarkeit verlangen und bestimmten Verarbeitungen widersprechen. Eine Beschwerde kann beim Präsidenten der polnischen Datenschutzbehörde eingereicht werden.",
      ],
    },
  ];
}

function guideSections(data, locale) {
  const ui = labels[locale];
  return [
    {
      heading: ui.guide,
      paragraphs: [data.lead, ui.guideText],
    },
    {
      heading: ui.checklist,
      paragraphs: [
        locale === "en"
          ? "A short written checklist prevents important details from disappearing during a phone call."
          : "Eine kurze schriftliche Checkliste verhindert, dass wichtige Details in einem Telefongespräch verloren gehen.",
      ],
      items: ui.checklistItems,
    },
    {
      heading:
        locale === "en"
          ? "What should be confirmed in writing"
          : "Was schriftlich bestätigt werden sollte",
      paragraphs: [
        locale === "en"
          ? "Confirm the start date, exact responsibilities, document deadlines, communication channel, fee and the method for pricing additional work. For a change of accounting office, also confirm which party handles each filing around the transition date."
          : "Bestätigen Sie Startdatum, Verantwortlichkeiten, Dokumentenfristen, Kommunikationsweg, Honorar und die Preisbildung für Zusatzarbeiten. Bei einem Kanzleiwechsel muss außerdem feststehen, wer welche Meldung rund um das Übergabedatum übernimmt.",
      ],
    },
    {
      heading:
        locale === "en"
          ? "General information has limits"
          : "Grenzen allgemeiner Informationen",
      paragraphs: [
        locale === "en"
          ? "Rules and deadlines may change and individual facts matter. Use this guide to prepare questions, then verify the current requirements for your own company before making a decision."
          : "Regeln und Fristen können sich ändern und der Einzelfall ist entscheidend. Nutzen Sie den Ratgeber zur Vorbereitung und prüfen Sie anschließend die aktuellen Anforderungen für Ihr Unternehmen.",
      ],
    },
  ];
}

function collectionCards(slug, locale) {
  const targets =
    slug === "uslugi"
      ? [
          "ksiegowosc-online",
          "pelna-ksiegowosc",
          "kpir-i-ryczalt",
          "vat-jpk-i-raportowanie",
          "zus-i-zgloszenia",
          "kadry-i-place",
          "ksiegowosc-spolki-zoo",
          "ksiegowosc-jdg",
          "ksiegowosc-dla-ecommerce",
          "ksiegowosc-dla-it",
          "ksiegowosc-dla-lekarzy",
          "ksef",
        ]
      : slug === "poradnik"
        ? [
            "poradnik/ile-kosztuje-ksiegowosc-spolki-zoo",
            "poradnik/jak-zmienic-biuro-rachunkowe",
            "poradnik/jak-przekazywac-dokumenty-online",
            "poradnik/ksiegowosc-online-czy-lokalna",
            "poradnik/co-obejmuje-pelna-ksiegowosc",
            "poradnik/jak-przygotowac-firme-do-ksef",
          ]
        : [];

  return targets.map((target) => {
    const item = content[locale][target];
    return {
      label:
        locale === "en"
          ? target.startsWith("poradnik/")
            ? "Guide"
            : "Service"
          : target.startsWith("poradnik/")
            ? "Ratgeber"
            : "Leistung",
      title: item.short,
      text: item.lead,
      url: localizedPath(target, locale),
    };
  });
}

function reviewContent(locale) {
  return locale === "en"
    ? {
        reviewsEyebrow: "Client feedback",
        reviewsTitle: "Experiences shared on Google",
        reviewsLead:
          "Public reviews mention helpful explanations, dependable long-term cooperation and competent support. The summaries below link to the complete external source.",
        reviewsScoreLabel: "Google score 5.0 out of 5",
        reviewsScoreText: "5 public reviews",
        reviewsNote:
          "Checked on 23 July 2026. Summaries translated from Polish; Google user reviews are not verified by Platinus.",
        reviewsLink: "View all reviews on Google",
        reviews: [
          {
            author: "Bartłomiej Szpak",
            meta: "Google review · 5/5",
            text: "The client values solid accounting support, fair pricing and help with unclear matters.",
          },
          {
            author: "Artur Sarba",
            meta: "Google review · 5/5",
            text: "A long-term relationship that began when the business was launched is described as very good.",
          },
          {
            author: "TELE-SERWIS Malbork",
            meta: "Google review · 5/5",
            text: "The reviewer recommends the team’s competence, advice and orderly handling of documents.",
          },
        ],
      }
    : {
        reviewsEyebrow: "Kundenstimmen",
        reviewsTitle: "Erfahrungen aus Google-Bewertungen",
        reviewsLead:
          "Öffentliche Bewertungen erwähnen hilfreiche Erklärungen, verlässliche langjährige Zusammenarbeit und kompetente Unterstützung. Die Zusammenfassungen führen zur vollständigen externen Quelle.",
        reviewsScoreLabel: "Google-Bewertung 5,0 von 5",
        reviewsScoreText: "5 öffentliche Bewertungen",
        reviewsNote:
          "Geprüft am 23. Juli 2026. Aus dem Polnischen zusammengefasst; Google-Nutzerbewertungen werden nicht von Platinus verifiziert.",
        reviewsLink: "Alle Bewertungen bei Google ansehen",
        reviews: [
          {
            author: "Bartłomiej Szpak",
            meta: "Google-Bewertung · 5/5",
            text: "Der Kunde schätzt solide Betreuung, faire Preise und Hilfe bei unklaren Fragen.",
          },
          {
            author: "Artur Sarba",
            meta: "Google-Bewertung · 5/5",
            text: "Die langjährige Zusammenarbeit seit der Unternehmensgründung wird als sehr gut beschrieben.",
          },
          {
            author: "TELE-SERWIS Malbork",
            meta: "Google-Bewertung · 5/5",
            text: "Die Bewertung empfiehlt Kompetenz, Beratung und einen geordneten Umgang mit Dokumenten.",
          },
        ],
      };
}

function localizePage(sourcePage, locale) {
  const data = content[locale]?.[sourcePage.slug];
  if (!data) {
    throw new Error(`Missing ${locale} content for ${sourcePage.slug}`);
  }

  const isArticle = sourcePage.kind === "article";
  const isService = sourcePage.kind === "service";
  let sections;

  if (sourcePage.slug === "kontakt") {
    sections = contactSections(locale);
  } else if (sourcePage.slug === "andrzej-kowalczyk") {
    sections = ownerSections(locale);
  } else if (sourcePage.slug === "polityka-prywatnosci") {
    sections = privacySections(locale);
  } else if (isArticle) {
    sections = guideSections(data, locale);
  } else if (isService) {
    sections = serviceSections(data, locale);
    if (sourcePage.slug === "ksiegowosc-online") {
      sections.splice(2, 0, {
        heading: labels[locale].technology,
        paragraphs: [labels[locale].technologyText],
      });
    }
  } else if (sourcePage.slug === "opinie-i-case-studies") {
    sections = [
      { heading: labels[locale].owner, paragraphs: [labels[locale].ownerText] },
      {
        heading:
          locale === "en"
            ? "What the public reviews highlight"
            : "Was öffentliche Bewertungen hervorheben",
        paragraphs: [
          locale === "en"
            ? `The Google profile has a 5.0 score based on 5 public reviews as checked on 23 July 2026. Reviewers describe helpful explanations, a good long-term relationship and orderly document support. <a href="${googleReviews}" rel="external">The current score and full Polish texts are available on Google</a>.`
            : `Das Google-Profil hat nach dem Stand vom 23. Juli 2026 eine Bewertung von 5,0 aus 5 öffentlichen Rezensionen. Genannt werden hilfreiche Erklärungen, gute langjährige Zusammenarbeit und geordnete Dokumentenarbeit. <a href="${googleReviews}" rel="external">Aktuelle Bewertung und vollständige polnische Texte finden Sie bei Google</a>.`,
        ],
      },
      {
        heading:
          locale === "en"
            ? "A clear standard before signing"
            : "Klarer Standard vor Vertragsabschluss",
        paragraphs: [labels[locale].organisationText, labels[locale].startText],
      },
      {
        heading:
          locale === "en"
            ? "Confidentiality before marketing"
            : "Vertraulichkeit vor Marketing",
        paragraphs: [
          locale === "en"
            ? "Client names, financial data and service details are not disclosed without clear permission. Public review summaries are kept separate from confidential accounting information."
            : "Kundennamen, Finanzdaten und Leistungsdetails werden nicht ohne eindeutige Zustimmung veröffentlicht. Öffentliche Bewertungszusammenfassungen bleiben von vertraulichen Buchhaltungsdaten getrennt.",
        ],
      },
    ];
  } else if (sourcePage.slug === "o-nas") {
    sections = ownerSections(locale);
  } else if (sourcePage.slug === "cennik") {
    sections = serviceSections(data, locale);
  } else if (sourcePage.slug === "uslugi" || sourcePage.slug === "poradnik") {
    sections = [
      {
        heading:
          locale === "en"
            ? "Choose by need, not by terminology"
            : "Nach Bedarf statt nach Fachbegriff wählen",
        paragraphs: [
          data.lead,
          locale === "en"
            ? "If you are unsure where to begin, start with the legal form and the area that needs organising. The initial conversation can then connect several services into one practical scope."
            : "Wenn Sie nicht wissen, wo Sie beginnen sollen, starten Sie mit Rechtsform und dem Bereich, der geordnet werden soll. Im Erstgespräch lassen sich mehrere Leistungen zu einem praktischen Umfang verbinden.",
        ],
      },
      {
        heading: labels[locale].start,
        paragraphs: [labels[locale].startText],
      },
    ];
  } else {
    sections = serviceSections(data, locale);
  }

  const reviews =
    sourcePage.slug === "opinie-i-case-studies" ? reviewContent(locale) : {};

  return {
    ...sourcePage,
    ...reviews,
    shortTitle: data.short,
    title: data.title,
    description: data.lead.replace(/<[^>]+>/g, "").slice(0, 158),
    eyebrow: data.eyebrow,
    h1: data.h1,
    lead: data.lead,
    highlights:
      data.focus ??
      (locale === "en"
        ? [
            "Clear, practical information",
            "A defined scope before the start",
            "Warsaw and remote cooperation",
            "Direct contact with the office",
          ]
        : [
            "Klare, praktische Informationen",
            "Definierter Umfang vor dem Start",
            "Warschau und Online-Zusammenarbeit",
            "Direkter Kontakt zur Kanzlei",
          ]),
    profile:
      sourcePage.kind === "person"
        ? {
            label: data.eyebrow,
            role:
              locale === "en"
                ? "Owner of Platinus accounting office"
                : "Inhaber der Buchhaltungskanzlei Platinus",
            facts: data.focus,
            link: {
              label:
                locale === "en"
                  ? "Verify the C.I.K. profile"
                  : "C.I.K.-Profil prüfen",
              url: "https://www.cik.org.pl/biuro/biuro-rachunkowe-platinus-pl-andrzej-kowalczyk-2333",
              external: true,
            },
          }
        : undefined,
    cards: collectionCards(sourcePage.slug, locale),
    cardsEyebrow: locale === "en" ? "Browse topics" : "Themen entdecken",
    cardsTitle:
      sourcePage.slug === "poradnik"
        ? locale === "en"
          ? "Practical guides for common decisions"
          : "Praktische Ratgeber für typische Entscheidungen"
        : locale === "en"
          ? "Select the area your company needs"
          : "Wählen Sie den passenden Bereich",
    cardsLead:
      locale === "en"
        ? "Every page provides a clear introduction and a route to the related contact information."
        : "Jede Seite bietet eine klare Einführung und führt zu den passenden Kontaktinformationen.",
    sections,
    faq: [
      {
        question:
          locale === "en"
            ? "Can cooperation be fully remote?"
            : "Ist eine vollständig digitale Zusammenarbeit möglich?",
        answer:
          locale === "en"
            ? "Yes. Documents and routine communication can be handled remotely. The detailed workflow is agreed before the service begins."
            : "Ja. Dokumente und laufende Kommunikation können digital abgewickelt werden. Der genaue Ablauf wird vor Beginn vereinbart.",
      },
      {
        question:
          locale === "en"
            ? "How can I request a quote?"
            : "Wie kann ich ein Angebot anfragen?",
        answer:
          locale === "en"
            ? "Open the contact page and email the legal form, accounting method, approximate document count, VAT status and number of employees."
            : "Öffnen Sie die Kontaktseite und senden Sie Rechtsform, Buchführungsart, ungefähre Belegzahl, Umsatzsteuerstatus und Mitarbeiterzahl per E-Mail.",
      },
    ],
    related: relatedItems(sourcePage.slug, locale),
    updated: "2026-07-23",
  };
}

export { content, localizePage };
