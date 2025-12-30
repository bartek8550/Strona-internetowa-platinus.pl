<?php
declare(strict_types=1);

header('X-Content-Type-Options: nosniff');

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

function json_out(bool $ok, string $message): void {
  header('Content-Type: application/json; charset=UTF-8');
  echo json_encode(['ok' => $ok, 'message' => $message], JSON_UNESCAPED_UNICODE);
  exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  exit('Method Not Allowed');
}

// proste anty-spam: honeypot
if (!empty($_POST['website'] ?? '')) {
  if (is_ajax()) json_out(true, 'Dziękujemy!');
  header('Location: index.html?sent=1#kontakt');
  exit;
}

$env = load_env(__DIR__ . '/.env');

$to        = $env['MAIL_TO'] ?? '';
$from      = $env['MAIL_FROM'] ?? '';
$fromName  = $env['MAIL_FROM_NAME'] ?? 'Formularz';
$subjectBase = $env['MAIL_SUBJECT'] ?? 'Wiadomość ze strony';

$smtpHost  = $env['SMTP_HOST'] ?? '';
$smtpPort  = (int)($env['SMTP_PORT'] ?? 587);
$smtpUser  = $env['SMTP_USER'] ?? '';
$smtpPass  = $env['SMTP_PASS'] ?? '';
$smtpSecure= $env['SMTP_SECURE'] ?? 'tls'; // tls lub ssl

$imie = trim((string)($_POST['Imie'] ?? ''));
$nazwisko = trim((string)($_POST['Nazwisko'] ?? ''));
$email = trim((string)($_POST['email'] ?? ''));
$telefon = trim((string)($_POST['telefon'] ?? ''));
$tresc = trim((string)($_POST['tresc'] ?? ''));

if ($imie === '' || $nazwisko === '' || $email === '' || $tresc === '') {
  if (is_ajax()) json_out(false, 'Uzupełnij wymagane pola.');
  header('Location: index.html?sent=0#kontakt'); exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  if (is_ajax()) json_out(false, 'Podaj poprawny adres e-mail.');
  header('Location: index.html?sent=0#kontakt'); exit;
}

if ($to === '' || $from === '' || $smtpHost === '' || $smtpUser === '' || $smtpPass === '') {
  if (is_ajax()) json_out(false, 'Brak konfiguracji wysyłki (sprawdź .env).');
  header('Location: index.html?sent=0#kontakt'); exit;
}

// nagłówki-safe
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

$subject = '=?UTF-8?B?' . base64_encode($subjectBase) . '?=';

// PHPMailer
require __DIR__ . '/lib/PHPMailer/src/Exception.php';
require __DIR__ . '/lib/PHPMailer/src/PHPMailer.php';
require __DIR__ . '/lib/PHPMailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

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
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // tls
  }

  // WAŻNE: From = Twoja skrzynka, Reply-To = klient
  $mail->setFrom($from, $fromName);
  $mail->addAddress($to);
  $mail->addReplyTo($email, "{$imie} {$nazwisko}");

  $mail->Subject = $subjectBase;
  $mail->Body = $body;

  $mail->send();

  if (is_ajax()) json_out(true, 'Wiadomość została wysłana. Odezwiemy się wkrótce.');
  header('Location: index.html?sent=1#kontakt');
  exit;

} catch (Exception $e) {
  if (is_ajax()) json_out(false, 'Nie udało się wysłać wiadomości. Spróbuj ponownie lub zadzwoń.');
  header('Location: index.html?sent=0#kontakt');
  exit;
}
