<?php
session_start();
include_once '../scripts/database_connection.php';

if (isset($_POST['login'])) {
    $username = mysqli_real_escape_string($conn, $_POST['username']);
    $password = $_POST['password'];
    $password_hash = hash('sha256', $password);

    $query = "SELECT * FROM user WHERE username = '$username' AND password_hash = '$password_hash'";
    $result = mysqli_query($conn, $query);

    if (mysqli_num_rows($result) == 1) {
        $user = mysqli_fetch_assoc($result);
        $_SESSION['user_id'] = $user['ID'];
        header('Location: dashboard.php');
        exit;
    } else {
        $error = "Invalid username or password";
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Login</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="login-container">
        <form action="index.php" method="post">
            <h2>Admin Login</h2>
            <?php if(isset($error)) { echo "<p class='error'>$error</p>"; } ?>
            <div class="input-group">
                <label for="username">Username</label>
                <input type="text" name="username" id="username" required>
            </div>
            <div class="input-group">
                <label for="password">Password</label>
                <input type="password" name="password" id="password" required>
            </div>
            <button type="submit" name="login">Login</button>
        </form>
    </div>
</body>
</html>
