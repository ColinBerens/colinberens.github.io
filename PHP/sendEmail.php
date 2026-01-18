<?php
// Show errors for debugging (remove in production)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Get and sanitize form data
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    // Recipient email
    $to = "colin.berens@hotmail.com"; // your receiving address

    // Subject
    $subject = "New message from $name via your website";

    // Email body (plain text)
    $body = "Name: $name\n";
    $body .= "Email: $email\n\n";
    $body .= "Message:\n$message\n";

    // Headers
    $headers  = "From: Website Form <no-reply@colinberens.be>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // Send email
    if (mail($to, $subject, $body, $headers)) {
        // Redirect on success
        header('Location: ../index.html?success=1');
        exit;
    } else {
        // Debugging output
        echo "❌ Mail sending failed. Check your server mail configuration.";
    }
}

/*
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Adjust the path if your sendEmail.php is in /PHP/ folder
require __DIR__ . '/../vendor/autoload.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host = 'smtp-auth.mailprotect.be';
        $mail->SMTPAuth = true;
        $mail->Username = 'no-reply@colinberens.be';
        $mail->Password = 'CoBe1102mail';       
        $mail->SMTPSecure = 'tls';             
        $mail->Port = 587;                     

        $mail->setFrom('no-reply@colinberens.be', 'Website Form'); 
        $mail->addAddress('col.beren.1102@gmail.com');        
        $mail->addReplyTo($email, $name);                    

        $mail->isHTML(false); 
        $mail->Subject = "New message from $name";
        $mail->Body    = "Name: $name\nEmail: $email\n\nMessage:\n$message";

        $mail->send();
        header('Location: ../index.html?success=1');
        exit;
    } catch (Exception $e) {
    echo "Mailer Error: {$mail->ErrorInfo}";
    exit;
}
}
*/
?>