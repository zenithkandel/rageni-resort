
<?php
$month = isset($_GET['month']) ? $_GET['month'] : date('m');
$year = isset($_GET['year']) ? $_GET['year'] : date('Y');

$first_day = mktime(0, 0, 0, $month, 1, $year);
$title = date('F', $first_day) . ' ' . $year;
$day_of_week = date('D', $first_day);

$days_in_month = cal_days_in_month(0, $month, $year);
$day_count = 1;

$prev_month = $month == 1 ? 12 : $month - 1;
$prev_year = $month == 1 ? $year - 1 : $year;
$next_month = $month == 12 ? 1 : $month + 1;
$next_year = $month == 12 ? $year + 1 : $year;
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<h2>Calendar</h2>
<div class="calendar-header">
    <a href="dashboard.php?page=calendar&month=<?php echo $prev_month; ?>&year=<?php echo $prev_year; ?>"
        class="calendar-nav-btn">&laquo; Previous</a>
    <h3><?php echo $title; ?></h3>
    <a href="dashboard.php?page=calendar&month=<?php echo $next_month; ?>&year=<?php echo $next_year; ?>"
        class="calendar-nav-btn">Next &raquo;</a>
</div>

<div class="calendar-grid">
    <div class="calendar-weekday">Sun</div>
    <div class="calendar-weekday">Mon</div>
    <div class="calendar-weekday">Tue</div>
    <div class="calendar-weekday">Wed</div>
    <div class="calendar-weekday">Thu</div>
    <div class="calendar-weekday">Fri</div>
    <div class="calendar-weekday">Sat</div>
    <?php
    $day_of_week_start = date('w', $first_day); // 0 for Sunday, 6 for Saturday
    // Fill in leading empty days
    for ($i = 0; $i < $day_of_week_start; $i++) {
        echo '<div class="calendar-day empty"></div>';
    }

    $current_day = date('j'); // Current day of the month
    $current_month = date('n'); // Current month (1-12)
    $current_year = date('Y'); // Current year
    
    while ($day_count <= $days_in_month) {
        $date = $year . '-' . sprintf('%02d', $month) . '-' . sprintf('%02d', $day_count);
        $query = "SELECT * FROM event_list WHERE event_date = '$date' ORDER BY time_from ASC"; // Order events by time
        $result = mysqli_query($conn, $query);

        $day_classes = ['calendar-day'];
        if ($day_count == $current_day && $month == $current_month && $year == $current_year) {
            $day_classes[] = 'today';
        }
        // Add inactive class for days before today or other conditions if needed
        // if (strtotime($date) < strtotime(date('Y-m-d'))) {
        //     $day_classes[] = 'inactive';
        // }
    
        echo '<div class="' . implode(' ', $day_classes) . '">';
        echo '<div class="day-number">' . $day_count . '</div>';
        echo '<div class="event-container">';
        while ($row = mysqli_fetch_assoc($result)) {
            echo '<div class="event-item" onclick="editEvent(\'' . $row['id'] . '\', \'' . $date . '\', \'' . htmlspecialchars($row['name'], ENT_QUOTES) . '\', \'' . $row['time_from'] . '\', \'' . $row['time_to'] . '\', \'' . htmlspecialchars($row['phone'], ENT_QUOTES) . '\', \'' . htmlspecialchars($row['email'], ENT_QUOTES) . '\')">';
            echo '<strong>' . date('g:i A', strtotime($row['time_from'])) . '</strong> - ' . htmlspecialchars($row['name']);
            echo '</div>';
        }
        echo '</div>'; // .event-container
        echo '</div>'; // .calendar-day
    
        $day_count++;
    }

    // Fill in trailing empty days
    while (($day_of_week_start + $days_in_month) % 7 != 0) {
        echo '<div class="calendar-day empty"></div>';
        $day_of_week_start++;
    }
    ?>
</div>

<h3>Add/Edit Event</h3>
<form action="dashboard.php?page=calendar" method="post" class="event-form">
    <input type="hidden" name="id" id="event-id">
    <div class="input-group">
        <label for="event-date">Date</label>
        <input type="date" name="event_date" id="event-date" required>
    </div>
    <div class="input-group">
        <label for="event-name">Event Name</label>
        <input type="text" name="name" id="event-name" required>
    </div>
    <div class="input-group">
        <label for="time-from">From</label>
        <input type="time" name="time_from" id="time-from" required>
    </div>
    <div class="input-group">
        <label for="time-to">To</label>
        <input type="time" name="time_to" id="time-to" required>
    </div>
    <div class="input-group">
        <label for="phone">Phone</label>
        <input type="text" name="phone" id="phone" required>
    </div>
    <div class="input-group">
        <label for="email">Email</label>
        <input type="email" name="email" id="email" required>
    </div>
    <button type="submit" name="save_event">Save Event</button>
</form>

<script>
    function editEvent(id, date, name, from, to, phone, email) {
        document.getElementById('modal-event-id').value = id;
        document.getElementById('modal-event-date').value = date;
        document.getElementById('modal-event-name').value = name;
        document.getElementById('modal-time-from').value = from;
        document.getElementById('modal-time-to').value = to;
        document.getElementById('modal-phone').value = phone;
        document.getElementById('modal-email').value = email;
        document.getElementById('calendar-modal').style.display = 'flex';
    }
</script>    
</body>
</html>
