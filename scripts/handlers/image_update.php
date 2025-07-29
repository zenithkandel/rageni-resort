<?php
include_once '../database_connection.php';
extract($_POST);

$id = mysqli_real_escape_string($conn, $id ?? '');
$img_location = mysqli_real_escape_string($conn, $img_location ?? '');
$alt_text = mysqli_real_escape_string($conn, $alt_text ?? '');

$sql = "UPDATE gallery SET img_location = '$img_location', alt_text = '$alt_text' WHERE id = '$id'";
if (mysqli_query($conn, $sql)) {
    echo "success";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    exit;
}
mysqli_close($conn);
?>
