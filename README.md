# Platinus.pl

Strona internetowa biura rachunkowego Platinus. Oficjalny adres: [https://platinus.pl](https://platinus.pl).

## Lokalnie

W katalogu `Platinus-Website`:

```powershell
php -S 127.0.0.1:4173 -t .
```

Następnie otwórz `http://127.0.0.1:4173/`.

## Kontrola jakości

```powershell
npm install
npm run format
npm run lint
php -l form.php
composer validate --strict
npm run build
```

Build produkcyjny trafia do `Platinus-Website/dist/` i nie zawiera prywatnego pliku `.env`.
