# Publikacja Platinus.pl na home.pl

## 1. Przygotowanie paczki

W katalogu `Platinus-Website` uruchom:

```sh
npm install
npm run lint
npm run build
```

Na serwer należy przesłać **zawartość** katalogu `dist`, a nie sam katalog.
Paczka zawiera już bibliotekę PHPMailer w `lib/phpmailer`, dlatego Composer nie musi
być dostępny na hostingu.

## 2. Ustawienia hostingu

W Panelu klienta home.pl ustaw interpreter PHP 8.4 lub 8.5 i upewnij się, że
domena korzysta z HTTPS. Plik `.htaccess` w paczce ustawia nagłówki
bezpieczeństwa, kompresję, cache plików statycznych i ochronę plików
konfiguracyjnych.

## 3. Konfiguracja formularza

Skopiuj lokalny `.env.example` do pliku `.env` umieszczonego na serwerze obok
`form.php`. Nie dodawaj `.env` do repozytorium ani nie udostępniaj go publicznie.

Uzupełnij:

- `SMTP_HOST` — adres serwera pocztowego widoczny w Panelu home.pl, np.
  `serwer123456.home.pl`;
- `SMTP_USER` — pełny adres skrzynki, zwykle taki sam jak `MAIL_FROM`;
- `SMTP_PASS` — hasło tej skrzynki.

Dla szyfrowanego SMTP home.pl użyj portu `465` oraz `SMTP_SECURE=ssl`.
`MAIL_FROM` powinien wskazywać skrzynkę używaną do logowania SMTP. Adres osoby
wypełniającej formularz jest ustawiany jako `Reply-To`, więc odpowiedź w
programie pocztowym trafi do klienta bez ryzyka podszywania się pod nadawcę.

Po zapisaniu `.env` nadaj mu możliwie restrykcyjne uprawnienia (na typowym
hostingu `600` lub `640`). Ochrona dostępu przez WWW jest dodatkowo ustawiona w
`.htaccess`.

## 4. Test po publikacji

1. Otwórz stronę przez adres `https://`.
2. Wyślij formularz z prawdziwego adresu e-mail po co najmniej 2 sekundach od
   załadowania strony.
3. Sprawdź komunikat powodzenia, skrzynkę odbiorczą i folder spam.
4. Odpowiedz na wiadomość testową i potwierdź, że odbiorcą odpowiedzi jest adres
   wpisany w formularzu.
5. Spróbuj wysłać formularz bez wymaganych pól oraz więcej niż 5 razy w ciągu
   10 minut — walidacja i ograniczenie liczby wysyłek powinny zadziałać.

Jeśli formularz zwraca komunikat o braku konfiguracji, sprawdź nazwę pliku
`.env`, jego położenie i uzupełnienie wszystkich pól SMTP. Jeżeli zwraca ogólny
błąd wysyłki, najczęstsze przyczyny to niewłaściwy `SMTP_HOST`, hasło lub
niezgodność `MAIL_FROM` z kontem `SMTP_USER`.
