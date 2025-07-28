<?php
include_once '../database_connection.php';
// Query to fetch all data from the gallery table
$query = "SELECT * FROM gallery";
$result = mysqli_query($conn, $query);

// Initialize an array to store the data
$galleryData = [];

if ($result && mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        $galleryData[] = $row;
    }
}

// Set header to JSON
header('Content-Type: application/json');

// Output the JSON data
echo json_encode($galleryData, JSON_PRETTY_PRINT);

// Close connection
mysqli_close($conn);
