<?php
include_once '../database_connection.php';
extract($_POST);
echo "<script>console.log('Form data received: Name - $name, Email - $email, Phone - $phone, Subject - $subject, Message - $message');</script>";