<?php
include_once '../database_connection.php';

// Query to fetch all data from the liquor_order table
$query = "SELECT * FROM liquor_order";
$result = mysqli_query($conn, $query);

// Initialize an array to store the data
$liquorData = [];

if ($result && mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        $liquorData[] = $row;
    }
}

// Set header to JSON
header('Content-Type: application/json');

// Output the JSON data
echo json_encode($liquorData, JSON_PRETTY_PRINT);

// Close connection
mysqli_close($conn);
?>
