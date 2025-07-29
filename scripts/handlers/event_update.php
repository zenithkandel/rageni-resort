<?php
include_once '../database_connection.php';
extract($_POST);

$id = mysqli_real_escape_string($conn, $id ?? '');
$event_date = mysqli_real_escape_string($conn, $event_date ?? '');
$name = mysqli_real_escape_string($conn, $name ?? '');
$time_from = mysqli_real_escape_string($conn, $time_from ?? '');
$email = mysqli_real_escape_string($conn, $email ?? '');
$status = mysqli_real_escape_string($conn, $status ?? '');

$sql = "UPDATE event_list SET event_date = '$event_date', name = '$name', time_from = '$time_from', email = '$email', status = '$status' WHERE id = '$id'";
if (mysqli_query($conn, $sql)) {
    echo "success";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    exit;
}
mysqli_close($conn);
?>
