<h2>Calendar</h2>

<style>
    .calendar {
        width: 100%;
        border-collapse: collapse;
    }

    .calendar th, .calendar td {
        border: 1px solid #ccc;
        padding: 1rem;
        text-align: center;
    }

    .calendar th {
        background-color: #f4f7f6;
    }

    .calendar td {
        height: 100px;
        vertical-align: top;
    }

    .event {
        background-color: #2c5530;
        color: #fff;
        padding: 0.25rem;
        border-radius: 4px;
        margin-bottom: 0.25rem;
    }
</style>

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

<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
    <a href="dashboard.php?page=calendar&month=<?php echo $prev_month; ?>&year=<?php echo $prev_year; ?>">Previous</a>
    <h3><?php echo $title; ?></h3>
    <a href="dashboard.php?page=calendar&month=<?php echo $next_month; ?>&year=<?php echo $next_year; ?>">Next</a>
</div>

<table class="calendar">
    <tr>
        <th>Sun</th>
        <th>Mon</th>
        <th>Tue</th>
        <th>Wed</th>
        <th>Thu</th>
        <th>Fri</th>
        <th>Sat</th>
    </tr>
    <tr>
        <?php
        $day_of_week = date('w', $first_day);
        for ($i = 0; $i < $day_of_week; $i++) {
            echo '<td></td>';
        }

        while ($day_count <= $days_in_month) {
            if ($day_of_week == 7) {
                echo '</tr><tr>';
                $day_of_week = 0;
            }

            $date = $year . '-' . $month . '-' . $day_count;
            $query = "SELECT * FROM event_list WHERE event_date = '$date'";
            $result = mysqli_query($conn, $query);

            echo '<td>';
            echo '<strong>' . $day_count . '</strong>';
            while ($row = mysqli_fetch_assoc($result)) {
                echo '<div class="event">' . $row['name'] . '</div>';
            }
            echo '</td>';

            $day_count++;
            $day_of_week++;
        }

        while ($day_of_week < 7) {
            echo '<td></td>';
            $day_of_week++;
        }
        ?>
    </tr>
</table>

<h3>Add/Edit Event</h3>
<form action="dashboard.php?page=calendar" method="post">
    <input type="hidden" name="id" id="event-id">
    <div class="input-group">
        <label for="event_date">Date</label>
        <input type="date" name="event_date" id="event-date" required>
    </div>
    <div class="input-group">
        <label for="name">Event Name</label>
        <input type="text" name="name" id="event-name" required>
    </div>
    <div class="input-group">
        <label for="time_from">From</label>
        <input type="time" name="time_from" id="time-from" required>
    </div>
    <div class="input-group">
        <label for="time_to">To</label>
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

<?php
if (isset($_POST['save_event'])) {
    $id = $_POST['id'];
    $event_date = $_POST['event_date'];
    $name = $_POST['name'];
    $time_from = $_POST['time_from'];
    $time_to = $_POST['time_to'];
    $phone = $_POST['phone'];
    $email = $_POST['email'];

    if (empty($id)) {
        $query = "INSERT INTO event_list (event_date, name, time_from, time_to, phone, email, status, timestamp) VALUES ('$event_date', '$name', '$time_from', '$time_to', '$phone', '$email', 'accepted', '" . time() . "')";
    } else {
        $query = "UPDATE event_list SET event_date = '$event_date', name = '$name', time_from = '$time_from', time_to = '$time_to', phone = '$phone', email = '$email' WHERE id = $id";
    }

    mysqli_query($conn, $query);
    echo "<meta http-equiv='refresh' content='0;url=dashboard.php?page=calendar'>";
}

if (isset($_GET['action']) && $_GET['action'] == 'delete_event') {
    $id = $_GET['id'];
    $query = "DELETE FROM event_list WHERE id = $id";
    mysqli_query($conn, $query);
    echo "<meta http-equiv='refresh' content='0;url=dashboard.php?page=calendar'>";
}
?>
