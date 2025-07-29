<h2>Gallery</h2>
<div class="gallery-container">
    <?php
    $query = "SELECT * FROM gallery ORDER BY timestamp DESC";
    $result = mysqli_query($conn, $query);
    while ($row = mysqli_fetch_assoc($result)) {
    ?>
        <div class="gallery-item">
            <img src="../<?php echo $row['img_location']; ?>" alt="<?php echo $row['alt_text']; ?>">
            <form action="dashboard.php?page=gallery&action=edit" method="post">
                <input type="hidden" name="id" value="<?php echo $row['id']; ?>">
                <input type="text" name="alt_text" value="<?php echo $row['alt_text']; ?>">
                <button type="submit" name="edit_alt">Edit</button>
            </form>
            <a href="dashboard.php?page=gallery&action=delete&id=<?php echo $row['id']; ?>">Delete</a>
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
