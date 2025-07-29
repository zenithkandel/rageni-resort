document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    const mainContent = document.querySelector('.main-content');

    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const url = link.href;

            mainContent.style.opacity = 0;

            setTimeout(() => {
                window.location.href = url;
            }, 300);
        });
    });

    const deleteButtons = document.querySelectorAll('a[href*="action=delete"]');
    const modal = document.getElementById('delete-modal');
    const confirmDeleteBtn = document.getElementById('confirm-delete');
    const cancelDeleteBtn = document.getElementById('cancel-delete');
    let deleteUrl = '';

    deleteButtons.forEach(button => {
        button.addEventListener('click', e => {
            e.preventDefault();
            deleteUrl = button.href;
            modal.style.display = 'block';
        });
    });

    if (modal) {
        confirmDeleteBtn.addEventListener('click', () => {
            window.location.href = deleteUrl;
        });

        cancelDeleteBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', e => {
            if (e.target == modal) {
                modal.style.display = 'none';
            }
        });
    }
});
