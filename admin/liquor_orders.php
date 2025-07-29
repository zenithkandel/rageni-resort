<h2>Liquor Orders</h2>
<table>
    <thead>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Quantity</th>
            <th>Message</th>
            <th>Status</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
        <?php
        $query = "SELECT * FROM liquor_order ORDER BY timestamp DESC";
        $result = mysqli_query($conn, $query);
        while ($row = mysqli_fetch_assoc($result)) {
        ?>
            <tr>
                <td><?php echo $row['id']; ?></td>
                <td><?php echo $row['name']; ?></td>
                <td><?php echo $row['phone']; ?></td>
                <td><?php echo $row['quantity']; ?></td>
                <td><?php echo $row['message']; ?></td>
                <td><?php echo $row['status']; ?></td>
                <td>
                    <a href="dashboard.php?page=liquor_orders&action=accept&id=<?php echo $row['id']; ?>">Accept</a>
                    <a href="dashboard.php?page=liquor_orders&action=reject&id=<?php echo $row['id']; ?>">Reject</a>
                </td>
            </tr>
        <?php } ?>
    </tbody>
</table>
