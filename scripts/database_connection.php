<?php
$host = 'localhost';       // or '127.0.0.1'
$username = 'root';        // your MySQL username
$password = '';            // your MySQL password
$database = 'your_db_name';// replace with your database name

// Create connection
$conn = new mysqli($host, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    echo "<script>console.log('unable to make a connection with the database :(')</script>";
    die("Connection failed: " . $conn->connect_error);
}
else{
    echo "<script>console.log('successfully made a connection with the database :)')</script>";
}