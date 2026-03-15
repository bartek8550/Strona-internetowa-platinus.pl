<?php
declare(strict_types=1);

header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('Referrer-Policy: no-referrer');
header('Permissions-Policy: geolocation=(), microphone=(), camera=()');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Pragma: no-cache');
header("Content-Security-Policy: default-src 'none'; frame-ancestors 'none'; base-uri 'none'; form-action 'self'");

const MIN_FORM_FILL_TIME_MS = 1500;
const MAX_FORM_AGE_MS = 86400000; // 24h
const DEFAULT_RATE_LIMIT_MAX_REQUESTS = 5;
const DEFAULT_RATE_LIMIT_WINDOW_SEC = 600;

function load_env(string $path): array {
  if (!file_exists($path)) return [];
  $data = parse_ini_file($path, false, INI_SCANNER_RAW);
  return is_array($data) ? $data : [];
}

function clean_header(string $v): string {
  return str_replace(["\r", "\n"], ' ', trim($v));
}

function is_ajax(): bool {
  $accept = $_SERVER['HTTP_ACCEPT'] ?? '';
  return str_contains($accept, 'application/json') || (($_POST['ajax'] ?? '') === '1');
}

function json_out(bool $ok, string $message, int $statusCode = 200): void {
  http_response_code($statusCode);
  header('Content-Type: application/json; charset=UTF-8');
  echo json_encode(['ok' => $ok, 'message' => $message], JSON_UNESCAPED_UNICODE);
  exit;
}

function fail_response(string $message, int $statusCode = 400): void {
  if (is_ajax()) json_out(false, $message, $statusCode);
  header('Location: index.html?sent=0#kontakt');
  exit;
}

function ok_response(): void {
  if (is_ajax()) json_out(true, 'Wiadomość została wysłana. Odezwiemy się wkrótce.', 200);
  header('Location: index.html?sent=1#kontakt');
  exit;
}

function env_int(array $env, string $key, int $default, int $min, int $max): int {
  $raw = trim((string)($env[$key] ?? ''));
  if ($raw === '' || !ctype_digit($raw)) return $default;

  $value = (int)$raw;
  if ($value < $min) return $min;
  if ($value > $max) return $max;
  return $value;
}

function enforce_rate_limit(int $maxRequests, int $windowSec): void {
  $ip = (string)($_SERVER['REMOTE_ADDR'] ?? '0.0.0.0');
  $hash = hash('sha256', $ip);
  $now = time();
  $windowStart = $now - $windowSec;

  $dir = rtrim(sys_get_temp_dir(), DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . 'platinus_rate_limit';
  if (!is_dir($dir) && !@mkdir($dir, 0700, true) && !is_dir($dir)) {
    return; // fail-open: nie blokuj formularza przez problem z FS
  }

  $path = $dir . DIRECTORY_SEPARATOR . "contact_{$hash}.json";
  $fp = @fopen($path, 'c+');
  if ($fp === false) {
    return; // fail-open
  }

  try {
    if (!flock($fp, LOCK_EX)) {
      return; // fail-open
    }

    $raw = stream_get_contents($fp);
    $data = is_string($raw) && $raw !== '' ? json_decode($raw, true) : null;
    $hits = [];

    if (is_array($data) && isset($data['hits']) && is_array($data['hits'])) {
      foreach ($data['hits'] as $ts) {
        if (is_int($ts) && $ts >= $windowStart && $ts <= ($now + 5)) {
          $hits[] = $ts;
        }
      }
    }

    if (count($hits) >= $maxRequests) {
      $oldest = min($hits);
      $retryAfter = max(1, ($oldest + $windowSec) - $now);
      header('Retry-After: ' . (string)$retryAfter);
      fail_response('Przekroczono limit wysyłek. Spróbuj ponownie za kilka minut.', 429);
    }

    $hits[] = $now;

    ftruncate($fp, 0);
    rewind($fp);
    fwrite($fp, json_encode(['hits' => $hits], JSON_THROW_ON_ERROR));
    fflush($fp);
  } catch (\Throwable $e) {
    // fail-open
  } finally {
    flock($fp, LOCK_UN);
    fclose($fp);
  }
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  exit('Method Not Allowed');
}

// Proste anty-spam: honeypot.
if (!empty($_POST['website'] ?? '')) {
  if (is_ajax()) json_out(true, 'Dziękujemy!');
  header('Location: index.html?sent=1#kontakt');
  exit;
}

$env = load_env(__DIR__ . '/.env');
$rateLimitMaxRequests = env_int($env, 'RATE_LIMIT_MAX_REQUESTS', DEFAULT_RATE_LIMIT_MAX_REQUESTS, 1, 50);
$rateLimitWindowSec = env_int($env, 'RATE_LIMIT_WINDOW_SEC', DEFAULT_RATE_LIMIT_WINDOW_SEC, 10, 86400);
enforce_rate_limit($rateLimitMaxRequests, $rateLimitWindowSec);

// Anty-spam: czas wypełniania formularza (gdy JS ustawi form_ts).
$formTsRaw = trim((string)($_POST['form_ts'] ?? ''));
if ($formTsRaw !== '') {
  if (!ctype_digit($formTsRaw)) {
    fail_response('Nieprawidłowe dane formularza. Odśwież stronę i spróbuj ponownie.');
  }

  $formTs = (int)$formTsRaw;
  $nowMs = (int)floor(microtime(true) * 1000);
  $ageMs = $nowMs - $formTs;

  if ($ageMs < MIN_FORM_FILL_TIME_MS) {
    fail_response('Formularz został wysłany zbyt szybko. Spróbuj ponownie.');
  }

  if ($ageMs > MAX_FORM_AGE_MS) {
    fail_response('Sesja formularza wygasła. Odśwież stronę i spróbuj ponownie.');
  }
} else {
  fail_response('Brak wymaganych danych formularza. Odśwież stronę i spróbuj ponownie.');
}

$to = $env['MAIL_TO'] ?? '';
$from = $env['MAIL_FROM'] ?? '';
$fromName = $env['MAIL_FROM_NAME'] ?? 'Formularz';
$subjectBase = $env['MAIL_SUBJECT'] ?? 'Wiadomość ze strony';

$smtpHost = $env['SMTP_HOST'] ?? '';
$smtpPort = (int)($env['SMTP_PORT'] ?? 587);
$smtpUser = $env['SMTP_USER'] ?? '';
$smtpPass = $env['SMTP_PASS'] ?? '';
$smtpSecureRaw = strtolower(trim((string)($env['SMTP_SECURE'] ?? 'tls')));
$smtpSecure = $smtpSecureRaw === 'ssl' ? 'ssl' : 'tls';

$imie = trim((string)($_POST['Imie'] ?? ''));
$nazwisko = trim((string)($_POST['Nazwisko'] ?? ''));
$email = trim((string)($_POST['email'] ?? ''));
$telefon = trim((string)($_POST['telefon'] ?? ''));
$tresc = trim((string)($_POST['tresc'] ?? ''));
$zgoda = (string)($_POST['zgoda'] ?? '') === '1';

if ($imie === '' || $nazwisko === '' || $email === '' || $tresc === '') {
  fail_response('Uzupełnij wymagane pola.');
}

if (!$zgoda) {
  fail_response('Zaznacz zgodę na kontakt, aby wysłać wiadomość.');
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  fail_response('Podaj poprawny adres e-mail.');
}

if ($to === '' || $from === '' || $smtpHost === '' || $smtpUser === '' || $smtpPass === '') {
  fail_response('Brak konfiguracji wysyłki (sprawdź .env).');
}

// Nagłówki-safe.
$imie = clean_header($imie);
$nazwisko = clean_header($nazwisko);
$email = clean_header($email);
$telefon = clean_header($telefon);

$ip = $_SERVER['REMOTE_ADDR'] ?? '';
$ua = $_SERVER['HTTP_USER_AGENT'] ?? '';

$body = "Nowa wiadomość z formularza Platinus.pl\n\n";
$body .= "Imię i nazwisko: {$imie} {$nazwisko}\n";
$body .= "E-mail: {$email}\n";
$body .= "Telefon: " . ($telefon !== '' ? $telefon : '-') . "\n\n";
$body .= "Wiadomość:\n{$tresc}\n\n";
$body .= "—\nIP: {$ip}\nUA: {$ua}\n";

$autoloadPath = __DIR__ . '/vendor/autoload.php';
if (!is_file($autoloadPath)) {
  fail_response('Brak bibliotek PHP (vendor). Uruchom composer install na hostingu.');
}
require $autoloadPath;

use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;

try {
  $mail = new PHPMailer(true);
  $mail->CharSet = 'UTF-8';

  $mail->isSMTP();
  $mail->Host = $smtpHost;
  $mail->SMTPAuth = true;
  $mail->Username = $smtpUser;
  $mail->Password = $smtpPass;
  $mail->Port = $smtpPort;

  if ($smtpSecure === 'ssl') {
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
  } else {
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
  }

  // From = firmowa skrzynka, Reply-To = klient.
  $mail->setFrom($from, $fromName);
  $mail->addAddress($to);
  $mail->addReplyTo($email, "{$imie} {$nazwisko}");

  $mail->Subject = $subjectBase;
  $mail->Body = $body;

  $mail->send();
  ok_response();
} catch (Exception $e) {
  fail_response('Nie udało się wysłać wiadomości. Spróbuj ponownie lub zadzwoń.');
}
