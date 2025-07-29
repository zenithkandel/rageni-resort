<?php
include_once '../scripts/database_connection.php';
// Query the form_message table
$query = "SELECT * FROM form_message ORDER BY timestamp DESC";
$result = mysqli_query($conn, $query);

// Prepare output array
$messages = [];

if ($result && mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        $messages[] = [
            "id" => "msg" . $row['id'],
            "sender" => $row['name'],
            "email" => $row['email'],
            "phone" => $row['phone'],
            "subject" => $row['subject'],
            "message" => $row['message'],
            "timestamp" => date('c', strtotime($row['timestamp'])), // ISO 8601 format
            "archived" => (bool)$row['archived'] // Cast to boolean
        ];
    }
}

// Set JSON header and output
header('Content-Type: application/json');
echo json_encode($messages, JSON_PRETTY_PRINT);

// Close the DB connection
mysqli_close($conn);
?>
