<?php
include_once '../database_connection.php';
extract($_POST);

$img_location = mysqli_real_escape_string($conn, $img_location ?? '');
$alt_text = mysqli_real_escape_string($conn, $alt_text ?? '');

$sql = "INSERT INTO gallery (img_location, alt_text) VALUES ('$img_location', '$alt_text')";
if (mysqli_query($conn, $sql)) {
    echo "success";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    exit;
}
mysqli_close($conn);
?>
