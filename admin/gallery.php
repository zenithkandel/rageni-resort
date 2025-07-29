<h2>Gallery</h2>
<div class="gallery-container">
    <?php
    $query = "SELECT * FROM gallery ORDER BY timestamp DESC";
    $result = mysqli_query($conn, $query);
    while ($row = mysqli_fetch_assoc($result)) {
    ?>
        <div class="gallery-item">
            <img src="../<?php echo $row['img_location']; ?>" alt="<?php echo $row['alt_text']; ?>">
            <p><?php echo date('Y-m-d h:i:s A', $row['timestamp']); ?></p>
            <a href="#" class="action-btn edit" data-id="<?php echo $row['id']; ?>" data-alt="<?php echo $row['alt_text']; ?>">Edit</a>
            <a href="dashboard.php?page=gallery&action=delete&id=<?php echo $row['id']; ?>" class="action-btn delete">Delete</a>
        </div>
    <?php } ?>
</div>

<form action="dashboard.php?page=gallery" method="post" enctype="multipart/form-data">
    <h3>Upload New Image</h3>
    <div class="input-group">
        <label for="image">Image</label>
        <input type="file" name="image" id="image" required>
    </div>
    <div class="input-group">
        <label for="alt_text">Alt Text</label>
        <input type="text" name="alt_text" id="alt_text" required>
    </div>
    <button type="submit" name="upload">Upload</button>
</form>
