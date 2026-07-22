# Publikacja Platinus.pl na home.pl

## 1. Przygotowanie paczki

W katalogu `Platinus-Website` uruchom:

```sh
npm install
npm run lint
npm run build
```

Na serwer należy przesłać **zawartość** katalogu `dist`, a nie sam katalog.
Paczka jest statyczna i nie wymaga PHP, Composera, PHPMailera ani pliku `.env`.

## 2. Katalog docelowy

Jeżeli domena `platinus.pl` jest skierowana na `/public_html/Platinus-Website`,
zastąp zawartość tego katalogu zawartością `dist`. Nie twórz dodatkowego poziomu
`dist/`, ponieważ wtedy strona główna znalazłaby się pod błędnym adresem.

Po rozpakowaniu bezpośrednio w katalogu domeny powinny znajdować się między innymi:

- `.htaccess`, `index.html`, `404.html`, `style.css`, `variables.css`, `script.js`;
- `robots.txt`, `sitemap.xml`, `llms.txt`;
- katalogi `icons/`, `photos/`, `ksiegowosc-online/`, `pelna-ksiegowosc/`,
  `kpir-i-ryczalt/`, `kadry-i-place/`, `poradnik/` oraz pozostałe podstrony.

Usuń ze starej wersji publicznego katalogu pliki i katalogi, których nie ma w
`dist`, w szczególności `form.php`, `.env`, `lib/`, `vendor/`, `composer.json`
i `composer.lock`.

## 3. Przekierowania i HTTPS

Plik `.htaccess` wymusza `https://platinus.pl/` jako jedyny wariant domeny oraz
usuwa `index.html` z adresów. Na hostingu nadal trzeba:

- przypisać domeny `platinus.pl`, `www.platinus.pl` i stary host do tego samego
  katalogu lub ustawić równoważne przekierowania w panelu;
- zapewnić ważny certyfikat TLS każdemu hostowi HTTPS, zanim żądanie dotrze do
  `.htaccess`;
- nie zmieniać docelowego adresu kanonicznego `https://platinus.pl/`.

## 4. Kontrola po publikacji

1. Otwórz `https://platinus.pl/` oraz kilka podstron, np. `/o-nas/`,
   `/ksiegowosc-online/` i `/poradnik/`.
2. Sprawdź `https://platinus.pl/sitemap.xml` — powinna zawierać 20 adresów.
3. Sprawdź faviconę i manifest w `/icons/`.
4. Wejdź przez `http://`, wariant `www` i adres kończący się `index.html` — każdy
   powinien wykonać pojedyncze przekierowanie 301 do HTTPS bez `www`.
5. Sprawdź przyciski e-mail. Na stronie nie ma formularza kontaktowego.
