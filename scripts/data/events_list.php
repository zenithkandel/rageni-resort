<?php
include_once '../database_connection.php';

// Fetch all events
$query = "SELECT * FROM event_list ORDER BY event_date, time_from";
$result = mysqli_query($conn, $query);

// Organize data
$eventsByDate = [];

if ($result && mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        $date = $row['event_date'];
        $event = [
            "id" => "evt-" . $row['id'],
            "name" => $row['name'],
            "time" => $row['time_from'], // You can combine from/to if needed
            "email" => $row['email'],    // Replacing description with email
            "status" => $row['status']
        ];

        // Push to that date group
        if (!isset($eventsByDate[$date])) {
            $eventsByDate[$date] = [];
        }

        $eventsByDate[$date][] = $event;
    }
}

// Format output
$output = [];
foreach ($eventsByDate as $date => $events) {
    $output[] = [
        "date" => $date,
        "events" => $events
    ];
}

// Send JSON response
header('Content-Type: application/json');
echo json_encode($output, JSON_PRETTY_PRINT);

// Close connection
mysqli_close($conn);
?>
