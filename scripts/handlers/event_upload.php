<?php
include_once '../database_connection.php';
extract($_POST);

// $name,$email,$phone,$subject,$message;
$eventName = mysqli_real_escape_string($conn, $eventName ?? '');
$eventDate = mysqli_real_escape_string($conn, $eventDate ?? '');
$eventTimeFrom = mysqli_real_escape_string($conn, $eventTimeFrom ?? '');
$eventTimeTo = mysqli_real_escape_string($conn, $eventTimeTo ?? '');
$phone = mysqli_real_escape_string($conn, $phone ?? '');
$email = mysqli_real_escape_string($conn, $email ?? '');
$message = mysqli_real_escape_string($conn, $message ?? '');
$timestamp = mysqli_real_escape_string($conn, $timestamp ?? '');
$sql = "INSERT INTO booking_request (name, event_date, time_from, time_to, phone, email, message, status, timestamp) VALUES ('$eventName', '$eventDate', '$eventTimeFrom', '$eventTimeTo', '$phone', '$email', '$message', 'pending', '$timestamp')";
if (mysqli_query($conn, $sql)) {
    echo "success";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    exit;
}
mysqli_close($conn);
