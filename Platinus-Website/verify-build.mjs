import { readFile, readdir, stat } from "node:fs/promises";
import { dirname, join, normalize, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const dist = join(root, "dist");
const failures = [];

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(path)));
    else files.push(path);
  }
  return files;
}

function matches(html, pattern) {
  return [...html.matchAll(pattern)].map((match) => match[1]);
}

function routeFor(file) {
  const relative = file.slice(dist.length).split(sep).join("/");
  if (relative === "/index.html") return "/";
  return relative.replace(/\/index\.html$/, "/");
}

function expectedLanguage(route) {
  if (route.startsWith("/en/")) return "en";
  if (route.startsWith("/de/")) return "de";
  return "pl";
}

function targetFor(href, currentFile) {
  const clean = href.split("#")[0].split("?")[0];
  if (!clean) return null;
  if (/^(?:https?:|mailto:|tel:|data:)/.test(clean)) return null;

  const absolute = clean.startsWith("/")
    ? resolve(dist, clean.slice(1))
    : resolve(dirname(currentFile), clean);
  const candidate = clean.endsWith("/")
    ? join(absolute, "index.html")
    : absolute;
  return candidate;
}

const files = await walk(dist);
const htmlFiles = files.filter(
  (file) => file.endsWith(".html") && !file.endsWith(`${sep}404.html`),
);
const pageFiles = htmlFiles.filter((file) => file.endsWith(`${sep}index.html`));

if (pageFiles.length !== 81) {
  failures.push(`Expected 81 index pages, found ${pageFiles.length}.`);
}

const canonicals = new Set();
const titles = new Set();

for (const file of pageFiles) {
  const html = await readFile(file, "utf8");
  const route = routeFor(file);
  const language = expectedLanguage(route);
  const lang = html.match(/<html lang="([^"]+)"/)?.[1];
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  const description = html.match(
    /<meta\s+name="description"\s+content="([^"]+)"/,
  )?.[1];
  const alternates = matches(html, /<link rel="alternate" hreflang="([^"]+)"/g);

  if (lang !== language) {
    failures.push(`${route}: expected lang=${language}, found ${lang}.`);
  }
  if (!canonical) failures.push(`${route}: missing canonical.`);
  else if (canonicals.has(canonical))
    failures.push(`${route}: duplicate canonical ${canonical}.`);
  else canonicals.add(canonical);

  if (!title) failures.push(`${route}: missing title.`);
  else if (titles.has(`${language}:${title}`))
    failures.push(`${route}: duplicate ${language} title "${title}".`);
  else titles.add(`${language}:${title}`);

  if (!description || description.length < 70) {
    failures.push(`${route}: description is missing or too short.`);
  }

  for (const code of ["pl", "en", "de", "x-default"]) {
    if (!alternates.includes(code)) {
      failures.push(`${route}: missing hreflang ${code}.`);
    }
  }

  const ids = matches(html, /\sid="([^"]+)"/g);
  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
  if (duplicates.length) {
    failures.push(
      `${route}: duplicate IDs ${[...new Set(duplicates)].join(", ")}.`,
    );
  }

  for (const json of matches(
    html,
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
  )) {
    try {
      JSON.parse(json);
    } catch (error) {
      failures.push(`${route}: invalid JSON-LD (${error.message}).`);
    }
  }

  if (/mailto:[^"]+\?subject=/i.test(html) && !route.endsWith("/kontakt/")) {
    failures.push(`${route}: quote CTA still uses a mailto subject.`);
  }

  for (const href of matches(html, /\shref="([^"]+)"/g)) {
    const target = targetFor(href, file);
    if (!target) continue;
    const normalised = normalize(target);
    if (
      !normalised.startsWith(`${normalize(dist)}${sep}`) &&
      normalised !== dist
    ) {
      failures.push(`${route}: href escapes dist (${href}).`);
      continue;
    }
    try {
      const info = await stat(normalised);
      if (info.isDirectory()) {
        await stat(join(normalised, "index.html"));
      }
    } catch {
      failures.push(`${route}: missing internal target ${href}.`);
    }
  }
}

const sitemap = await readFile(join(dist, "sitemap.xml"), "utf8");
const sitemapLocations = matches(sitemap, /<loc>([^<]+)<\/loc>/g);
if (sitemapLocations.length !== 81) {
  failures.push(
    `Expected 81 sitemap locations, found ${sitemapLocations.length}.`,
  );
}
if (new Set(sitemapLocations).size !== sitemapLocations.length) {
  failures.push("Sitemap contains duplicate locations.");
}

for (const forbidden of ["form.php", "lib", "composer.json", ".env"]) {
  if (files.some((file) => file.split(sep).includes(forbidden))) {
    failures.push(`Forbidden backend item found in dist: ${forbidden}.`);
  }
}

if (failures.length) {
  console.error(`Verification failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(
    `Verification passed: ${pageFiles.length} pages, ${sitemapLocations.length} sitemap URLs, all internal targets present.`,
  );
}
