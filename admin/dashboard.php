<?php
session_start();
include_once '../scripts/database_connection.php';

if (!isset($_SESSION['user_id'])) {
    header('Location: index.php');
    exit;
}

if (isset($_GET['page']) && $_GET['page'] == 'messages' && isset($_GET['action'])) {
    $action = $_GET['action'];
    $id = $_GET['id'];

    if ($action == 'archive') {
        $query = "UPDATE form_message SET status = 'archived' WHERE id = $id";
        mysqli_query($conn, $query);
        header('Location: dashboard.php?page=messages');
        exit;
    }

    if ($action == 'delete') {
        $query = "DELETE FROM form_message WHERE id = $id";
        mysqli_query($conn, $query);
        header('Location: dashboard.php?page=messages');
        exit;
    }
}

if (isset($_POST['upload'])) {
    $alt_text = $_POST['alt_text'];
    $image = $_FILES['image']['name'];
    $target = "../images/apps/silver_gallery/" . basename($image);
    $img_location = "images/apps/silver_gallery/" . basename($image);

    $sql = "INSERT INTO gallery (img_location, alt_text, timestamp) VALUES ('$img_location', '$alt_text', '" . time() . "')";
    mysqli_query($conn, $sql);

    if (move_uploaded_file($_FILES['image']['tmp_name'], $target)) {
        header('Location: dashboard.php?page=gallery');
        exit;
    } else {
        $msg = "Failed to upload image";
    }
}

if (isset($_GET['page']) && $_GET['page'] == 'gallery' && isset($_GET['action']) && $_GET['action'] == 'delete') {
    $id = $_GET['id'];
    $query = "SELECT * FROM gallery WHERE id = $id";
    $result = mysqli_query($conn, $query);
    $row = mysqli_fetch_assoc($result);
    $img_location = $row['img_location'];
    unlink('../' . $img_location);

    $query = "DELETE FROM gallery WHERE id = $id";
    mysqli_query($conn, $query);
    header('Location: dashboard.php?page=gallery');
    exit;
}

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
    header('Location: dashboard.php?page=calendar');
    exit;
}

if (isset($_POST['edit_alt'])) {
    $id = $_POST['id'];
    $alt_text = $_POST['alt_text'];

    $query = "UPDATE gallery SET alt_text = '$alt_text' WHERE id = $id";
    mysqli_query($conn, $query);
    header('Location: dashboard.php?page=gallery');
    exit;
}

if (isset($_GET['page']) && $_GET['page'] == 'liquor_orders' && isset($_GET['action'])) {
    $action = $_GET['action'];
    $id = $_GET['id'];

    if ($action == 'accept') {
        $query = "UPDATE liquor_order SET status = 'accepted' WHERE id = $id";
        mysqli_query($conn, $query);
        header('Location: dashboard.php?page=liquor_orders');
        exit;
    }

    if ($action == 'reject') {
        $query = "UPDATE liquor_order SET status = 'rejected' WHERE id = $id";
        mysqli_query($conn, $query);
        header('Location: dashboard.php?page=liquor_orders');
        exit;
    }
}

if (isset($_GET['page']) && $_GET['page'] == 'bookings' && isset($_GET['action'])) {
    $action = $_GET['action'];
    $id = $_GET['id'];

    if ($action == 'accept') {
        $query = "SELECT * FROM booking_request WHERE id = $id";
        $result = mysqli_query($conn, $query);
        $booking = mysqli_fetch_assoc($result);

        $name = $booking['name'];
        $event_date = $booking['event_date'];
        $time_from = $booking['time_from'];
        $time_to = $booking['time_to'];
        $phone = $booking['phone'];
        $email = $booking['email'];
        $timestamp = $booking['timestamp'];

        $query = "INSERT INTO event_list (name, event_date, time_from, time_to, phone, email, status, timestamp) VALUES ('$name', '$event_date', '$time_from', '$time_to', '$phone', '$email', 'accepted', '$timestamp')";
        mysqli_query($conn, $query);

        $query = "DELETE FROM booking_request WHERE id = $id";
        mysqli_query($conn, $query);

        header('Location: dashboard.php?page=bookings');
        exit;
    }

    if ($action == 'reject') {
        $query = "UPDATE booking_request SET status = 'rejected' WHERE id = $id";
        mysqli_query($conn, $query);
        header('Location: dashboard.php?page=bookings');
        exit;
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="dashboard-container">
        <aside class="sidebar">
            <h2>Admin Panel</h2>
            <nav>
                <ul>
                    <li><a href="dashboard.php?page=messages" class="<?php echo (!isset($_GET['page']) || $_GET['page'] == 'messages') ? 'active' : ''; ?>">Messages</a></li>
                    <li><a href="dashboard.php?page=bookings" class="<?php echo (isset($_GET['page']) && $_GET['page'] == 'bookings') ? 'active' : ''; ?>">Bookings</a></li>
                    <li><a href="dashboard.php?page=calendar" class="<?php echo (isset($_GET['page']) && $_GET['page'] == 'calendar') ? 'active' : ''; ?>">Calendar</a></li>
                    <li><a href="dashboard.php?page=liquor_orders" class="<?php echo (isset($_GET['page']) && $_GET['page'] == 'liquor_orders') ? 'active' : ''; ?>">Liquor Orders</a></li>
                    <li><a href="dashboard.php?page=gallery" class="<?php echo (isset($_GET['page']) && $_GET['page'] == 'gallery') ? 'active' : ''; ?>">Gallery</a></li>
                </ul>
            </nav>
            <a href="logout.php" class="logout-btn">Logout</a>
        </aside>
        <main class="main-content">
            <?php
            if (isset($_GET['page'])) {
                $page = $_GET['page'];
                $page_file = $page . '.php';
                if (file_exists($page_file)) {
                    include $page_file;
                } else {
                    echo "<h2>Page not found</h2>";
                }
            } else {
                include 'messages.php';
            }
            ?>
        </main>
    </div>

    <div id="delete-modal" class="modal">
        <div class="modal-content">
            <span class="close-btn">&times;</span>
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete this item?</p>
            <button id="confirm-delete">Yes, Delete</button>
            <button id="cancel-delete">Cancel</button>
        </div>
    </div>

    <div id="accept-modal" class="modal">
        <div class="modal-content">
            <span class="close-btn">&times;</span>
            <h2>Confirm Accept</h2>
            <p>Are you sure you want to continue, this action will make this event and the email address public to the whole world.</p>
            <button id="confirm-accept">Yes, Accept</button>
            <button id="cancel-accept">Cancel</button>
        </div>
    </div>

    <div id="reject-modal" class="modal">
        <div class="modal-content">
            <span class="close-btn">&times;</span>
            <h2>Confirm Reject</h2>
            <p>Are you sure you want to reject, this action is irreversible and the data will be lost.</p>
            <button id="confirm-reject">Yes, Reject</button>
            <button id="cancel-reject">Cancel</button>
        </div>
    </div>

    <div id="calendar-modal" class="modal">
        <div class="modal-content">
            <span class="close-btn">&times;</span>
            <h2>Edit Event</h2>
            <form action="dashboard.php?page=calendar" method="post">
                <input type="hidden" name="id" id="modal-event-id">
                <div class="input-group">
                    <label for="modal-event-date">Date</label>
                    <input type="date" name="event_date" id="modal-event-date" required>
                </div>
                <div class="input-group">
                    <label for="modal-event-name">Event Name</label>
                    <input type="text" name="name" id="modal-event-name" required>
                </div>
                <div class="input-group">
                    <label for="modal-time-from">From</label>
                    <input type="time" name="time_from" id="modal-time-from" required>
                </div>
                <div class="input-group">
                    <label for="modal-time-to">To</label>
                    <input type="time" name="time_to" id="modal-time-to" required>
                </div>
                <div class="input-group">
                    <label for="modal-phone">Phone</label>
                    <input type="text" name="phone" id="modal-phone" required>
                </div>
                <div class="input-group">
                    <label for="modal-email">Email</label>
                    <input type="email" name="email" id="modal-email" required>
                </div>
                <button type="submit" name="save_event">Save Event</button>
            </form>
        </div>
    </div>

    <script src="admin.js"></script>
</body>
</html>
