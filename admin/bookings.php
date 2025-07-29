<h2>Bookings</h2>
<table>
    <thead>
        <tr>
            <th>ID</th>
            <th>Event Name</th>
            <th>Event Date</th>
            <th>Time</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Message</th>
            <th>Status</th>
            <th>Timestamp</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
        <?php
        $query = "SELECT * FROM booking_request WHERE status != 'rejected' ORDER BY timestamp DESC";
        $result = mysqli_query($conn, $query);
        while ($row = mysqli_fetch_assoc($result)) {
        ?>
            <tr>
                <td><?php echo $row['id']; ?></td>
                <td><?php echo $row['name']; ?></td>
                <td><?php echo $row['event_date']; ?></td>
                <td><?php echo $row['time_from'] . ' - ' . $row['time_to']; ?></td>
                <td><?php echo $row['phone']; ?></td>
                <td><?php echo $row['email']; ?></td>
                <td><?php echo $row['message']; ?></td>
                <td><?php echo $row['status']; ?></td>
                <td><?php echo date('Y-m-d h:i:s A', $row['timestamp']); ?></td>
                <td>
                    <a href="dashboard.php?page=bookings&action=accept&id=<?php echo $row['id']; ?>" class="action-btn accept">Accept</a>
                    <a href="dashboard.php?page=bookings&action=reject&id=<?php echo $row['id']; ?>" class="action-btn reject">Reject</a>
                </td>
            </tr>
        <?php } ?>
    </tbody>
</table>
