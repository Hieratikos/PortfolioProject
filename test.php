<?php
if ($_SERVER["REQUEST_METHOD"]=="POST") {

    $_POST = array(); //workaround for broken PHPstorm
    parse_str(file_get_contents('php://input'), $_POST);

    $errors = '';
    $myemail = 'admin@hieratikos.cu.ma';//<-----Put Your email address here.
    if (empty($_POST['email_name']) || empty($_POST['subject_name']) || empty($_POST['message_name']) || empty($_POST['name_name'])) {
        $errors .= "\n Error: all fields are required";
    }
    $name = $_POST['name_name'];
    $subject = $_POST['subject_name'];
    $email_address = $_POST['email_name'];
    $message = $_POST['message_name'];
    if (!preg_match("/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i", $email_address)) {
        $errors .= "\n Error: Invalid email address";
    }

    if (empty($errors)) {
        $to = $myemail;
        $email_subject = "Contact form submission: $name";
        $email_body = "You have received a new message. " .
            " Here are the details:\n Name: $name \n " .
            "Email: $email_address\n Message \n $message";
        $headers = "From: $myemail\n";
        $headers .= "Reply-To: $email_address";
        mail($to, $email_subject, $email_body, $headers);
        //redirect to the 'thank you' page
        header('Location: contact-form-thank-you.html');
    }else{
        echo $errors;
    }

}
?>