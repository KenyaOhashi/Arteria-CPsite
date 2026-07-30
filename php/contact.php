<?php
declare(strict_types=1);

session_start();
header("Content-Type: text/html; charset=UTF-8");
header("X-Content-Type-Options: nosniff");
header("X-Frame-Options: SAMEORIGIN");
header("Referrer-Policy: strict-origin-when-cross-origin");

function h(string $value): string
{
  return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, "UTF-8");
}

function textLength(string $value): int
{
  return function_exists("mb_strlen") ? mb_strlen($value, "UTF-8") : strlen($value);
}

function cutText(string $value, int $maxLength): string
{
  return function_exists("mb_substr")
    ? mb_substr($value, 0, $maxLength, "UTF-8")
    : substr($value, 0, $maxLength);
}

function renderResult(string $title, string $message, bool $success): void
{
  http_response_code($success ? 200 : 422);
  $accent = $success ? "#4169e1" : "#9f2740";
  $safeTitle = h($title);
  $safeMessage = h($message);

  echo <<<HTML
  <!doctype html>
  <html lang="ja">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>{$safeTitle}｜株式会社Arteria</title>
      <link rel="stylesheet" href="../assets/css/responsive.css">
      <style>
        body {
          display: grid;
          min-height: 100vh;
          min-height: 100svh;
          margin: 0;
          padding: 16px;
          place-items: center;
          background: #f8faff;
          color: #111827;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans JP", sans-serif;
        }

        .card {
          width: min(100%, 680px);
          padding: clamp(30px, 7vw, 64px);
          border: 1px solid #d7dff5;
          border-radius: 14px;
          background: #fff;
          box-shadow: 0 24px 70px #2747b51a;
        }

        .label {
          color: {$accent};
          font-size: 0.75rem;
          letter-spacing: 0.16em;
        }

        .card h1 {
          font-size: clamp(2rem, 6vw, 3.4rem);
        }

        .card p {
          line-height: 1.9;
        }

        .button {
          display: inline-block;
          margin-top: 24px;
          padding: 12px 18px;
          border-radius: 7px;
          background: #4169e1;
          color: #fff;
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <main class="card">
        <p class="label">CONTACT</p>
        <h1>{$safeTitle}</h1>
        <p>{$safeMessage}</p>
        <a class="button" href="../contact.html">お問い合わせページへ戻る</a>
      </main>
    </body>
  </html>
  HTML;
  exit();
}

function postJson(string $url, array $payload): ?array
{
  $json = json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
  if ($json === false) {
    return null;
  }
  if (function_exists("curl_init")) {
    $curl = curl_init($url);
    curl_setopt_array($curl, [
      CURLOPT_POST => true,
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_FOLLOWLOCATION => true,
      CURLOPT_HTTPHEADER => ["Content-Type: application/json"],
      CURLOPT_POSTFIELDS => $json,
      CURLOPT_TIMEOUT => 15,
    ]);
    $response = curl_exec($curl);
    $status = (int) curl_getinfo($curl, CURLINFO_RESPONSE_CODE);
    curl_close($curl);
    if (!is_string($response) || $status < 200 || $status >= 300) {
      return null;
    }
  } else {
    $context = stream_context_create([
      "http" => [
        "method" => "POST",
        "header" => "Content-Type: application/json\r\n",
        "content" => $json,
        "timeout" => 15,
        "ignore_errors" => true,
      ],
    ]);
    $response = @file_get_contents($url, false, $context);
    if (!is_string($response)) {
      return null;
    }
  }
  $decoded = json_decode($response, true);
  return is_array($decoded) ? $decoded : null;
}

if (($_SERVER["REQUEST_METHOD"] ?? "") !== "POST") {
  header("Allow: POST");
  renderResult("送信できませんでした", "お問い合わせフォームから送信してください。", false);
}
if (!empty($_POST["website"] ?? "")) {
  renderResult("送信を受け付けました", "お問い合わせありがとうございます。", true);
}
if (
  isset($_SESSION["arteria_last_contact"]) &&
  time() - (int) $_SESSION["arteria_last_contact"] < 20
) {
  renderResult(
    "しばらくお待ちください",
    "短時間に複数回送信されています。少し時間を空けて再度お試しください。",
    false,
  );
}

$name = trim((string) ($_POST["name"] ?? ""));
$email = trim((string) ($_POST["email"] ?? ""));
$phone = trim((string) ($_POST["phone"] ?? ""));
$organization = trim((string) ($_POST["organization"] ?? ""));
$category = trim((string) ($_POST["category"] ?? ""));
$message = trim((string) ($_POST["message"] ?? ""));
$privacy = (string) ($_POST["privacy"] ?? "");
$sourcePage = trim((string) ($_POST["source_page"] ?? "contact.html"));
$allowedCategories = [
  "サービスについて",
  "協業・パートナーについて",
  "採用について",
  "取材について",
  "その他",
];

if (
  $name === "" ||
  textLength($name) > 80 ||
  !filter_var($email, FILTER_VALIDATE_EMAIL) ||
  preg_match('/[\r\n]/', $email) ||
  textLength($phone) > 30 ||
  textLength($organization) > 120 ||
  !in_array($category, $allowedCategories, true) ||
  $message === "" ||
  textLength($message) > 3000 ||
  $privacy !== "同意する"
) {
  renderResult(
    "入力内容をご確認ください",
    "未入力または正しく入力されていない項目があります。",
    false,
  );
}

$configPath = __DIR__ . "/config.php";
if (!is_file($configPath)) {
  renderResult("送信設定が必要です", "管理者によるお問い合わせ送信設定が完了していません。", false);
}
$config = require $configPath;
$webhookUrl = (string) ($config["google_sheets_webhook_url"] ?? "");
$apiKey = (string) ($config["google_sheets_api_key"] ?? "");
if (!filter_var($webhookUrl, FILTER_VALIDATE_URL) || $apiKey === "") {
  renderResult(
    "送信設定が必要です",
    "Googleスプレッドシート連携の初期設定が完了していません。",
    false,
  );
}

$sheetResult = postJson($webhookUrl, [
  "apiKey" => $apiKey,
  "name" => $name,
  "email" => $email,
  "phone" => $phone,
  "organization" => $organization,
  "category" => $category,
  "message" => $message,
  "privacy" => $privacy,
  "sourcePage" => cutText($sourcePage, 500),
]);
if (($sheetResult["success"] ?? false) !== true) {
  renderResult(
    "送信できませんでした",
    "お問い合わせの記録に失敗しました。時間を空けて再度お試しください。",
    false,
  );
}

$recipient = (string) ($config["recipient"] ?? "");
$fromEmail = (string) ($config["from_email"] ?? "");
$siteName = (string) ($config["site_name"] ?? "株式会社Arteria");
if (
  filter_var($recipient, FILTER_VALIDATE_EMAIL) &&
  filter_var($fromEmail, FILTER_VALIDATE_EMAIL)
) {
  $subject = "【Arteriaお問い合わせ】" . $category;
  $mailBody = <<<TEXT
  Arteria Webサイトからお問い合わせがありました。

  お名前：{$name}
  メールアドレス：{$email}
  電話番号：{$phone}
  会社名・所属：{$organization}
  お問い合わせ種別：{$category}

  お問い合わせ内容：
  {$message}
  TEXT;
  $headers = implode("\r\n", [
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=UTF-8",
    "From: " . $siteName . " <" . $fromEmail . ">",
    "Reply-To: " . $email,
  ]);
  if (function_exists("mb_language")) {
    mb_language("Japanese");
  }
  if (function_exists("mb_internal_encoding")) {
    mb_internal_encoding("UTF-8");
  }
  if (function_exists("mb_send_mail")) {
    @mb_send_mail($recipient, $subject, $mailBody, $headers);
  } else {
    @mail($recipient, $subject, $mailBody, $headers);
  }
}

$_SESSION["arteria_last_contact"] = time();
renderResult(
  "送信を受け付けました",
  "お問い合わせありがとうございます。内容を確認のうえ、担当者よりご連絡します。",
  true,
);
