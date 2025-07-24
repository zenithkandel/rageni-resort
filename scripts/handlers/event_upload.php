<?php
include_once '../database_connection.php';
extract($_POST);

// $name,$email,$phone,$subject,$message;
$eventName = mysqli_real_escape_string($conn, $eventName ?? '');
$eventDate = mysqli_real_escape_string($conn, $eventDate ?? '');
$eventTimeForm = mysqli_real_escape_string($conn, $eventTimeForm ?? '');
$eventTimeTo = mysqli_real_escape_string($conn, $eventTimeTo ?? '');
$phone = mysqli_real_escape_string($conn, $phone ?? '');
$email = mysqli_real_escape_string($conn, $email ?? '');
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
