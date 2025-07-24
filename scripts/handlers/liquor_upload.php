<?php
include_once '../database_connection.php';
extract($_POST);

// $name,$email,$phone,$subject,$message;
$name = mysqli_real_escape_string($conn, $name ?? '');
$phone = mysqli_real_escape_string($conn, $phone ?? '');
$quantity = mysqli_real_escape_string($conn, $quantity ?? '');
$message = mysqli_real_escape_string($conn, $message ?? '');
$timestamp = mysqli_real_escape_string($conn, $timestamp ?? '');
$sql = "INSERT INTO liquor_order (name, quantity, phone, message, timestamp, status) VALUES ('$name', '$quantity', '$phone', '$message','$timestamp','pending')";
if (mysqli_query($conn, $sql)) {
    echo "success";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    exit;
}
mysqli_close($conn);
