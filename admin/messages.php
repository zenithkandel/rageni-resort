<h2>Messages</h2>
<table>
    <thead>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Subject</th>
            <th>Message</th>
            <th>Timestamp</th>
            <th>Status</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
        <?php
        $query = "SELECT * FROM form_message ORDER BY timestamp DESC";
        $result = mysqli_query($conn, $query);
        while ($row = mysqli_fetch_assoc($result)) {
        ?>
            <tr>
                <td><?php echo $row['id']; ?></td>
                <td><?php echo $row['name']; ?></td>
                <td><?php echo $row['email']; ?></td>
                <td><?php echo $row['subject']; ?></td>
                <td><?php echo $row['message']; ?></td>
                <td><?php echo date('Y-m-d H:i:s', $row['timestamp']); ?></td>
                <td><?php echo $row['status']; ?></td>
                <td>
                    <a href="dashboard.php?page=messages&action=archive&id=<?php echo $row['id']; ?>" class="action-btn archive">Archive</a>
                    <a href="dashboard.php?page=messages&action=delete&id=<?php echo $row['id']; ?>" class="action-btn delete">Delete</a>
                </td>
            </tr>
        <?php } ?>
    </tbody>
</table>
