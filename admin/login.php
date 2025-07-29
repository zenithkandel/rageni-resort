<?php
//admin,rageni@123
include_once '../scripts/database_connection.php';
if (isset($_POST['username']) && isset($_POST['password'])) {
    extract($_POST);
    $username = htmlspecialchars($username, ENT_QUOTES, 'UTF-8');
    $password = htmlspecialchars($password, ENT_QUOTES, 'UTF-8');
    $password = hash("sha256", $password); // Assuming password is stored as MD5 hash
    $query = "SELECT * FROM user WHERE username = '$username' AND password_hash = '$password'";
    $result = mysqli_query($conn, $query);
    if (mysqli_num_rows($result) == 1) {
        $row = mysqli_fetch_assoc($result);
        session_start();
        $_SESSION['logged_in'] = true;
        header("Location: ../admin/index.php");
    }
    else{
        $_SESSION['logged_in'] = false;
        // session_destroy();
        echo "<script>alert('Invalid username or password');</script>";
    }
}

?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Rageni Agro Resort - Admin Dashboard</title>
    <meta name="description"
        content="Admin Dashboard for Rageni Agro Resort Pvt. Ltd. Manage messages, bookings, liquor orders, calendar events, and gallery images." />

    <!-- Link to Admin Dashboard specific CSS -->
    <link rel="stylesheet" href="../styles/admin_dashboard.css" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

    <!-- Font Awesome for icons -->
    <link rel="stylesheet" href="https://site-assets.fontawesome.com/releases/v6.7.2/css/all.css" />

    <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&family=Montserrat:wght@400;500;600;700;800&display=swap"
        rel="stylesheet" />
</head>

<body>
    <!-- Login Page -->
    <div id="login-page" class="login-container">
        <div class="login-card animate-on-load">
            <h2 class="login-title">Admin Login</h2>
            <form id="login-form" method="post" action="">
                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" id="username" name="username" required />
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" required />
                </div>
                <button type="submit" class="btn login-btn">Login</button>
                <p id="login-error" class="error-message"></p>
            </form>
        </div>
    </div>

</body>

</html>