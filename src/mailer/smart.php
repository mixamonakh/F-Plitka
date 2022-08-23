<?php 

$service = $_POST['service'];
$address = $_POST['address'];
$square = $_POST['square'];
$email = $_POST['email'];
$name = $_POST['name'];
$phone = $_POST['phone'];

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

// $mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.mail.ru';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'mixa.monakh@mail.ru';                 // Наш логин
$mail->Password = 'gPNrBcKgV7rc679hWAix';                           // Наш пароль от ящика
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465;                                    // TCP port to connect to
 
$mail->setFrom('mixa.monakh@mail.ru', 'Плиточка');   // От кого письмо 
$mail->addAddress('eefrgrth@mail.ru');     // Add a recipient
//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Данные';
$mail->Body    = '
		Пользователь оставил данные <br> 
	Услуга: ' . $service . ' <br>
	Адрес: ' . $address . ' <br>
	Площадь: ' . $square . ' <br>
	Почта: ' . $email . ' <br>
	Имя: ' . $name . ' <br>
	Номер телефона: ' . $phone . '';

if(!$mail->send()) {
    return false;
} else {
    return true;
}

?>