<?php
include_once '../database_connection.php';
extract($_POST);

$event_date = mysqli_real_escape_string($conn, $event_date ?? '');
$name = mysqli_real_escape_string($conn, $name ?? '');
$time_from = mysqli_real_escape_string($conn, $time_from ?? '');
$email = mysqli_real_escape_string($conn, $email ?? '');
$status = mysqli_real_escape_string($conn, $status ?? '');

$sql = "INSERT INTO event_list (event_date, name, time_from, email, status) VALUES ('$event_date', '$name', '$time_from', '$email', '$status')";
if (mysqli_query($conn, $sql)) {
    echo "success";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    exit;
}
mysqli_close($conn);
?>
