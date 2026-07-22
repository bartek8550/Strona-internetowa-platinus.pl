import { cp, mkdir, readdir, rm, stat, writeFile } from "node:fs/promises";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { pages, renderPage, siteUrl } from "./site-pages.mjs";

const root = dirname(fileURLToPath(import.meta.url));
const dist = resolve(root, "dist");

if (
  !dist.startsWith(`${resolve(root)}\\`) &&
  !dist.startsWith(`${resolve(root)}/`)
) {
  throw new Error("Nieprawidłowa ścieżka katalogu build.");
}

const files = [
  ".htaccess",
  "404.html",
  "index.html",
  "llms.txt",
  "robots.txt",
  "script.js",
  "style.css",
  "variables.css",
];

const photoFiles = [
  "comarch-erp-xtv2.webp",
  "comarch-ibradv2.webp",
  "logo-iksiegowosc24v2.webp",
  "platinus-logo-480.webp",
  "platinusnastrone2.webp",
  "zdj2-768.webp",
  "zdj2-1280.webp",
  "zdj2-1920.webp",
  "zdj2-2560.webp",
  "zdj2-3840.webp",
];

await rm(dist, { recursive: true, force: true });
await mkdir(join(dist, "photos"), { recursive: true });

for (const file of files) {
  await cp(join(root, file), join(dist, file));
}

for (const file of photoFiles) {
  await cp(join(root, "photos", file), join(dist, "photos", file));
}

await cp(join(root, "icons"), join(dist, "icons"), { recursive: true });

for (const page of pages) {
  const directory = join(dist, ...page.slug.split("/"));
  await mkdir(directory, { recursive: true });
  await writeFile(join(directory, "index.html"), renderPage(page), "utf8");
}

const lastModified = new Date().toISOString().slice(0, 10);
const sitemapUrls = ["", ...pages.map((page) => page.slug)]
  .map((slug) => {
    const url = slug ? `${siteUrl}/${slug}/` : `${siteUrl}/`;
    return `  <url>\n    <loc>${url}</loc>\n    <lastmod>${lastModified}</lastmod>\n  </url>`;
  })
  .join("\n");

await writeFile(
  join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls}\n</urlset>\n`,
  "utf8",
);

async function summarize(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  let count = 0;
  let bytes = 0;

  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      const nested = await summarize(path);
      count += nested.count;
      bytes += nested.bytes;
    } else {
      count += 1;
      bytes += (await stat(path)).size;
    }
  }

  return { count, bytes };
}

const result = await summarize(dist);
const sizeMb = (result.bytes / 1024 / 1024).toFixed(2);

console.log(
  `Build gotowy: ${relative(root, dist)} (${result.count} plików, ${sizeMb} MB).`,
);
