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
    const deleteModal = document.getElementById('delete-modal');
    const confirmDeleteBtn = document.getElementById('confirm-delete');
    const cancelDeleteBtn = document.getElementById('cancel-delete');
    let deleteUrl = '';

    deleteButtons.forEach(button => {
        button.addEventListener('click', e => {
            e.preventDefault();
            deleteUrl = button.href;
            deleteModal.style.display = 'block';
        });
    });

    if (deleteModal) {
        confirmDeleteBtn.addEventListener('click', () => {
            window.location.href = deleteUrl;
        });

        cancelDeleteBtn.addEventListener('click', () => {
            deleteModal.style.display = 'none';
        });

        window.addEventListener('click', e => {
            if (e.target == deleteModal) {
                deleteModal.style.display = 'none';
            }
        });
    }

    const acceptButtons = document.querySelectorAll('a[href*="action=accept"]');
    const acceptModal = document.getElementById('accept-modal');
    const confirmAcceptBtn = document.getElementById('confirm-accept');
    const cancelAcceptBtn = document.getElementById('cancel-accept');
    let acceptUrl = '';

    acceptButtons.forEach(button => {
        button.addEventListener('click', e => {
            e.preventDefault();
            acceptUrl = button.href;
            acceptModal.style.display = 'block';
        });
    });

    if (acceptModal) {
        confirmAcceptBtn.addEventListener('click', () => {
            window.location.href = acceptUrl;
        });

        cancelAcceptBtn.addEventListener('click', () => {
            acceptModal.style.display = 'none';
        });

        window.addEventListener('click', e => {
            if (e.target == acceptModal) {
                acceptModal.style.display = 'none';
            }
        });
    }

    const rejectButtons = document.querySelectorAll('a[href*="action=reject"]');
    const rejectModal = document.getElementById('reject-modal');
    const confirmRejectBtn = document.getElementById('confirm-reject');
    const cancelRejectBtn = document.getElementById('cancel-reject');
    let rejectUrl = '';

    rejectButtons.forEach(button => {
        button.addEventListener('click', e => {
            e.preventDefault();
            rejectUrl = button.href;
            rejectModal.style.display = 'block';
        });
    });

    if (rejectModal) {
        confirmRejectBtn.addEventListener('click', () => {
            window.location.href = rejectUrl;
        });

        cancelRejectBtn.addEventListener('click', () => {
            rejectModal.style.display = 'none';
        });

        window.addEventListener('click', e => {
            if (e.target == rejectModal) {
                rejectModal.style.display = 'none';
            }
        });
    }

    const calendarModal = document.getElementById('calendar-modal');
    const closeButtons = document.querySelectorAll('.close-btn');

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            modal.style.display = 'none';
        });
    });

    window.addEventListener('click', e => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
});
