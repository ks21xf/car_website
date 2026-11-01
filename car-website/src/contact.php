<?php
$to = "koserravalle@gmail.com";
$subject = "Simple Text Email";
$message = "Hello!\r\nThis is a multi-line plain text email sent using native PHP.";

// Keep line lengths under 70 characters
$message = wordwrap($message, 70, "\r\n");

// Essential headers
$headers = "From: webmaster@yourdomain.com" . "\r\n" .
           "Reply-To: support@yourdomain.com" . "\r\n" .
           "X-Mailer: PHP/" . phpversion();

if (mail($to, $subject, $message, $headers)) {
    echo "Email successfully sent.";
} else {
    echo "Email delivery failed.";
}
?>
