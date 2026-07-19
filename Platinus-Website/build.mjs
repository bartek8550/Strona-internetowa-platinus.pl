import { cp, mkdir, readdir, rm, stat } from "node:fs/promises";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

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
  "composer.json",
  "composer.lock",
  "form.php",
  "index.html",
  "llms.txt",
  "robots.txt",
  "script.js",
  "sitemap.xml",
  "style.css",
  "variables.css",
];

const photoFiles = [
  "comarch-erp-xtv2.webp",
  "comarch-ibradv2.webp",
  "logo-iksiegowosc24v2.webp",
  "platinusnastrone2.webp",
  "zdj2-768.webp",
  "zdj2-1280.webp",
  "zdj2-1920.webp",
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
await mkdir(join(dist, "vendor", "phpmailer", "phpmailer"), {
  recursive: true,
});
await cp(
  join(root, "vendor", "autoload.php"),
  join(dist, "vendor", "autoload.php"),
);
await cp(join(root, "vendor", "composer"), join(dist, "vendor", "composer"), {
  recursive: true,
});
await cp(
  join(root, "vendor", "phpmailer", "phpmailer", "src"),
  join(dist, "vendor", "phpmailer", "phpmailer", "src"),
  { recursive: true },
);
await cp(
  join(root, "vendor", "phpmailer", "phpmailer", "LICENSE"),
  join(dist, "vendor", "phpmailer", "phpmailer", "LICENSE"),
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
