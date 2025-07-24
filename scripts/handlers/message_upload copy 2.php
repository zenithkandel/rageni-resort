<?php
include_once '../database_connection.php';
extract($_POST);

// $name,$email,$phone,$subject,$message;
$name = mysqli_real_escape_string($conn, $name ?? '');
$email = mysqli_real_escape_string($conn, $email ?? '');
$phone = mysqli_real_escape_string($conn, $phone ?? '');
$subject = mysqli_real_escape_string($conn, $subject ?? '');
$message = mysqli_real_escape_string($conn, $message ?? '');
$timestamp = mysqli_real_escape_string($conn, $timestamp ?? '');
$sql = "INSERT INTO form_message (name, email, phone, subject, message,timestamp,status) VALUES ('$name', '$email', '$phone', '$subject', '$message','$timestamp','pending')";
if (mysqli_query($conn, $sql)) {
    echo "success";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    exit;
}
mysqli_close($conn);
