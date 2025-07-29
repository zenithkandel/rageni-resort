<?php
include_once '../database_connection.php';

// Query to fetch all data from the booking_request table
$query = "SELECT * FROM booking_request";
$result = mysqli_query($conn, $query);

// Initialize an array to store the data
$bookingData = [];

if ($result && mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        $bookingData[] = $row;
    }
}

// Set header to JSON
header('Content-Type: application/json');

// Output the JSON data
echo json_encode($bookingData, JSON_PRETTY_PRINT);

// Close connection
mysqli_close($conn);
?>
