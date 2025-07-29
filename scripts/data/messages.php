<?php
include_once '../database_connection.php';

// Query to fetch all data from the form_message table
$query = "SELECT * FROM form_message";
$result = mysqli_query($conn, $query);

// Initialize an array to store the data
$messageData = [];

if ($result && mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        $messageData[] = $row;
    }
}

// Set header to JSON
header('Content-Type: application/json');

// Output the JSON data
echo json_encode($messageData, JSON_PRETTY_PRINT);

// Close connection
mysqli_close($conn);
?>
