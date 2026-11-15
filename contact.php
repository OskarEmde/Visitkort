<?php
declare(strict_types=1);

// UDFYLD DIN EGEN MODTAGERE-MAIL HER. Lad ikke pladsholderen stå ved publicering.
$recipient = 'DIN_EMAIL@EKSEMPEL.DK';

function back(string $status): never {
    header('Location: contact.html?status=' . rawurlencode($status), true, 303);
    exit;
}
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { back('invalid'); }
if (!empty($_POST['website'])) { back('invalid'); } // spam-honeypot, ingen mail sendes
if ($recipient === 'DIN_EMAIL@EKSEMPEL.DK' || !filter_var($recipient, FILTER_VALIDATE_EMAIL)) { back('config'); }
$name = trim((string)($_POST['name'] ?? ''));
$email = trim((string)($_POST['email'] ?? ''));
$subject = trim((string)($_POST['subject'] ?? ''));
$message = trim((string)($_POST['message'] ?? ''));
if ($name === '' || mb_strlen($name) > 100 || !filter_var($email, FILTER_VALIDATE_EMAIL) || mb_strlen($email) > 160 || $subject === '' || mb_strlen($subject) > 150 || mb_strlen($message) < 10 || mb_strlen($message) > 5000) { back('invalid'); }
// Brug en afsender fra dit eget domæne for at mindske SPF/DMARC-problemer.
$sender = 'noreply@' . ($_SERVER['SERVER_NAME'] ?? 'example.invalid');
if (!filter_var($sender, FILTER_VALIDATE_EMAIL)) { back('config'); }
$safeSubject = 'Portfolio kontakt: ' . preg_replace('/[\r\n]+/', ' ', $subject);
$body = "Navn: {$name}\nMail: {$email}\nEmne: {$subject}\n\nBesked:\n{$message}\n";
$headers = ['From' => $sender, 'Reply-To' => $email, 'Content-Type' => 'text/plain; charset=UTF-8'];
$sent = mail($recipient, $safeSubject, $body, $headers);
back($sent ? 'sent' : 'error');
