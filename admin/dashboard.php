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
        $query = "UPDATE booking_request SET status = 'accepted' WHERE id = $id";
        mysqli_query($conn, $query);

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
                    <li><a href="dashboard.php?page=messages">Messages</a></li>
                    <li><a href="dashboard.php?page=bookings">Bookings</a></li>
                    <li><a href="dashboard.php?page=calendar">Calendar</a></li>
                    <li><a href="dashboard.php?page=liquor_orders">Liquor Orders</a></li>
                    <li><a href="dashboard.php?page=gallery">Gallery</a></li>
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
                echo "<h2>Welcome to the Admin Dashboard</h2>";
            }
            ?>
        </main>
    </div>
</body>
</html>
