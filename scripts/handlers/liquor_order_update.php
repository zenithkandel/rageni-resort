<?php
include_once '../database_connection.php';
extract($_POST);

$id = mysqli_real_escape_string($conn, $id ?? '');
$status = mysqli_real_escape_string($conn, $status ?? '');

$sql = "UPDATE liquor_order SET status = '$status' WHERE id = '$id'";
if (mysqli_query($conn, $sql)) {
    echo "success";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    exit;
}
mysqli_close($conn);
?>
