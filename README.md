# Platinus.pl

Strona internetowa biura rachunkowego Platinus. Oficjalny adres: [https://platinus.pl](https://platinus.pl).

## Lokalnie

W katalogu `Platinus-Website`:

```powershell
npm install
npm run build
php -S 127.0.0.1:4173 -t dist
```

Następnie otwórz `http://127.0.0.1:4173/`.

## Kontrola jakości

```powershell
npm install
npm run format
npm run lint
npm run verify
```

Build produkcyjny trafia do `Platinus-Website/dist/` i nie zawiera prywatnego pliku `.env`.

## Podgląd Netlify

Branch `main` jest automatycznie budowany pod adresem
[https://pl4at.netlify.app/](https://pl4at.netlify.app/). Plik `netlify.toml`
uruchamia generator i publikuje katalog `Platinus-Website/dist/`, dlatego
podgląd zawiera wszystkie 81 adresów w języku polskim, angielskim i niemieckim.

Instrukcja publikacji i uruchomienia formularza na home.pl znajduje się w
[`Platinus-Website/DEPLOY_HOME_PL.md`](Platinus-Website/DEPLOY_HOME_PL.md).
