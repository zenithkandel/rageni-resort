document.addEventListener('DOMContentLoaded', () => {
    const loginPage = document.getElementById('login-page');
    const dashboardPage = document.getElementById('dashboard-page');
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginError = document.getElementById('login-error');
    const logoutBtn = document.getElementById('logout-btn');
    const sidebarNavItems = document.querySelectorAll('.sidebar-nav .nav-item');
    const currentSectionTitle = document.getElementById('current-section-title');
    const dashboardSections = document.querySelectorAll('.dashboard-section');

    // --- Data Storage (In-Memory) ---
    // IMPORTANT: Data stored here will be LOST on page refresh.
    // In a real application, this would interact with a database.
    let messagesData = [];
    let bookingOrdersData = [];
    let liquorOrdersData = [];
    let calendarEventsData = [];
    let galleryImagesData = [];

    // --- Authentication ---
    const ADMIN_USERNAME = 'admin';
    const ADMIN_PASSWORD = 'password123'; // Replace with a strong password in a real app!

    function checkAuth() {
        if (sessionStorage.getItem('isAdminLoggedIn') === 'true') {
            showDashboard();
        } else {
            showLoginPage();
        }
    }

    function showLoginPage() {
        loginPage.classList.remove('hidden');
        dashboardPage.classList.add('hidden');
        loginError.textContent = '';
        loginForm.reset();
    }

    function showDashboard() {
        loginPage.classList.add('hidden');
        dashboardPage.classList.remove('hidden');
        loadAllData(); // Load data when dashboard is shown
        showSection('messages'); // Default to messages section
    }

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = usernameInput.value;
        const password = passwordInput.value;

        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
            sessionStorage.setItem('isAdminLoggedIn', 'true');
            showDashboard();
        } else {
            loginError.textContent = 'Invalid username or password.';
        }
    });

    logoutBtn.addEventListener('click', () => {
        sessionStorage.removeItem('isAdminLoggedIn');
        showLoginPage();
    });

    // --- Navigation ---
    sidebarNavItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = item.dataset.section;
            showSection(sectionId);

            // Update active class
            sidebarNavItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
        });
    });

    function showSection(sectionId) {
        dashboardSections.forEach(section => {
            section.classList.add('hidden');
        });
        document.getElementById(`${sectionId}-section`).classList.remove('hidden');
        currentSectionTitle.textContent = sectionId.replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }

    // --- Data Loading from JSON files ---
    async function loadJSON(filePath) {
        try {
            const response = await fetch(filePath);
            if (!response.ok) {
                console.error(`Failed to load ${filePath}: ${response.statusText}`);
                return [];
            }
            return await response.json();
        } catch (error) {
            console.error(`Error fetching ${filePath}:`, error);
            return [];
        }
    }

    async function loadAllData() {
        messagesData = await loadJSON('../data/messages.php');
        bookingOrdersData = await loadJSON('../data/booking_orders.php');
        liquorOrdersData = await loadJSON('../data/liquor_orders.php');
        calendarEventsData = await loadJSON('../data/events_list.php');
        galleryImagesData = await loadJSON('../data/images.php');

        renderMessages();
        renderBookings();
        renderLiquorOrders();
        renderCalendarManager();
        renderGalleryManager();
    }

    // --- Messages Management ---
    const messagesList = document.getElementById('messages-list');
    const toggleArchivedMessagesBtn = document.getElementById('toggle-archived-messages');
    let showArchivedMessages = false;

    toggleArchivedMessagesBtn.addEventListener('click', () => {
        showArchivedMessages = !showArchivedMessages;
        toggleArchivedMessagesBtn.textContent = showArchivedMessages ? 'Show Active Messages' : 'Show Archived Messages';
        renderMessages();
    });

    function renderMessages() {
        messagesList.innerHTML = '';
        const filteredMessages = messagesData.filter(msg => showArchivedMessages ? msg.status === 'archived' : msg.status === 'pending');

        if (filteredMessages.length === 0) {
            messagesList.innerHTML = `<p class="text-center text-gray-500 col-span-full">${showArchivedMessages ? 'No archived messages.' : 'No active messages.'}</p>`;
            return;
        }

        filteredMessages.forEach(msg => {
            const messageCard = document.createElement('div');
            messageCard.classList.add('card');
            messageCard.innerHTML = `
                <div class="card-header">
                    <h4>From: ${msg.name} (${msg.email})</h4>
                    <span class="text-sm text-gray-500">${new Date(msg.timestamp).toLocaleString()}</span>
                </div>
                <div class="card-body">
                    <p><strong>Subject:</strong> ${msg.subject}</p>
                    <p><strong>Message:</strong> ${msg.message}</p>
                </div>
                <div class="card-actions">
                    <button class="btn btn-secondary mark-read-btn" data-id="${msg.id}">
                        <i class="fas fa-check"></i> ${msg.status === 'archived' ? 'Mark Unread' : 'Mark Read & Archive'}
                    </button>
                </div>
            `;
            messagesList.appendChild(messageCard);
        });

        messagesList.querySelectorAll('.mark-read-btn').forEach(button => {
            button.addEventListener('click', async (e) => {
                const messageId = e.currentTarget.dataset.id;
                const message = messagesData.find(msg => msg.id === messageId);
                if (message) {
                    const newStatus = message.status === 'archived' ? 'pending' : 'archived';
                    try {
                        const response = await fetch('../handlers/message_update.php', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                            },
                            body: `id=${messageId}&status=${newStatus}`,
                        });
                        const result = await response.text();
                        if (result.trim() === 'success') {
                            message.status = newStatus;
                            renderMessages();
                        } else {
                            alert('Failed to update message status.');
                        }
                    } catch (error) {
                        alert('Error updating message status: ' + error);
                    }
                }
            });
        });
    }

    // --- Bookings Management ---
    const bookingsList = document.getElementById('bookings-list');
    const toggleArchivedBookingsBtn = document.getElementById('toggle-archived-bookings');
    let showArchivedBookings = false;

    toggleArchivedBookingsBtn.addEventListener('click', () => {
        showArchivedBookings = !showArchivedBookings;
        toggleArchivedBookingsBtn.textContent = showArchivedBookings ? 'Show Active Bookings' : 'Show Archived Bookings';
        renderBookings();
    });

    function renderBookings() {
        bookingsList.innerHTML = '';
        const filteredBookings = bookingOrdersData.filter(booking => showArchivedBookings ? (booking.status === 'accepted' || booking.status === 'rejected') : booking.status === 'pending');

        if (filteredBookings.length === 0) {
            bookingsList.innerHTML = `<p class="text-center text-gray-500 col-span-full">${showArchivedBookings ? 'No archived bookings.' : 'No pending bookings.'}</p>`;
            return;
        }

        filteredBookings.forEach(booking => {
            const bookingCard = document.createElement('div');
            bookingCard.classList.add('card');
            bookingCard.innerHTML = `
                <div class="card-header">
                    <h4>${booking.name} on ${booking.event_date}</h4>
                    <span class="text-sm text-gray-500">${booking.time_from} - ${booking.time_to}</span>
                </div>
                <div class="card-body">
                    <p><strong>Contact:</strong> ${booking.phone} (${booking.email})</p>
                    <p><strong>Message:</strong> ${booking.message || 'N/A'}</p>
                    <p><strong>Status:</strong> <span class="font-bold status-${booking.status}">${booking.status.toUpperCase()}</span></p>
                </div>
                <div class="card-actions">
                    ${booking.status === 'pending' ? `
                        <button class="btn accept-booking-btn" data-id="${booking.id}">
                            <i class="fas fa-check-circle"></i> Accept
                        </button>
                        <button class="btn btn-destructive reject-booking-btn" data-id="${booking.id}">
                            <i class="fas fa-times-circle"></i> Reject
                        </button>
                    ` : `
                        <button class="btn btn-secondary view-booking-btn" data-id="${booking.id}" disabled>
                            <i class="fas fa-eye"></i> View Details
                        </button>
                    `}
                </div>
            `;
            bookingsList.appendChild(bookingCard);
        });

        bookingsList.querySelectorAll('.accept-booking-btn').forEach(button => {
            button.addEventListener('click', async (e) => {
                const bookingId = e.currentTarget.dataset.id;
                const booking = bookingOrdersData.find(b => b.id === bookingId);
                if (booking) {
                    try {
                        const response = await fetch('../handlers/booking_update.php', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                            },
                            body: `id=${bookingId}&status=accepted`,
                        });
                        const result = await response.text();
                        if (result.trim() === 'success') {
                            booking.status = 'accepted';
                            addBookingToCalendar(booking);
                            renderBookings();
                            renderCalendarManager();
                        } else {
                            alert('Failed to accept booking.');
                        }
                    } catch (error) {
                        alert('Error accepting booking: ' + error);
                    }
                }
            });
        });

        bookingsList.querySelectorAll('.reject-booking-btn').forEach(button => {
            button.addEventListener('click', async (e) => {
                const bookingId = e.currentTarget.dataset.id;
                const booking = bookingOrdersData.find(b => b.id === bookingId);
                if (booking) {
                    try {
                        const response = await fetch('../handlers/booking_update.php', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                            },
                            body: `id=${bookingId}&status=rejected`,
                        });
                        const result = await response.text();
                        if (result.trim() === 'success') {
                            booking.status = 'rejected';
                            renderBookings();
                        } else {
                            alert('Failed to reject booking.');
                        }
                    } catch (error) {
                        alert('Error rejecting booking: ' + error);
                    }
                }
            });
        });
    }

    function addBookingToCalendar(booking) {
        const eventDate = booking.eventDate;
        const existingDateEntry = calendarEventsData.find(entry => entry.date === eventDate);

        const newEvent = {
            id: `evt-${Date.now()}`, // Unique ID for the event
            name: booking.eventName,
            time: booking.timeFrom,
            description: `Booking for ${booking.eventName} from ${booking.email}`,
            status: 'accepted' // Mark as accepted from booking
        };

        if (existingDateEntry) {
            existingDateEntry.events.push(newEvent);
        } else {
            calendarEventsData.push({
                date: eventDate,
                events: [newEvent]
            });
        }
        // Sort calendar events by date to maintain order
        calendarEventsData.sort((a, b) => new Date(a.date) - new Date(b.date));
    }


    // --- Liquor Orders Management ---
    const liquorOrdersList = document.getElementById('liquor-orders-list');
    const toggleArchivedLiquorOrdersBtn = document.getElementById('toggle-archived-liquor-orders');
    let showArchivedLiquorOrders = false;

    toggleArchivedLiquorOrdersBtn.addEventListener('click', () => {
        showArchivedLiquorOrders = !showArchivedLiquorOrders;
        toggleArchivedLiquorOrdersBtn.textContent = showArchivedLiquorOrders ? 'Show Active Orders' : 'Show Archived Orders';
        renderLiquorOrders();
    });

    function renderLiquorOrders() {
        liquorOrdersList.innerHTML = '';
        const filteredOrders = liquorOrdersData.filter(order => showArchivedLiquorOrders ? order.status === 'archived' : order.status === 'pending');

        if (filteredOrders.length === 0) {
            liquorOrdersList.innerHTML = `<p class="text-center text-gray-500 col-span-full">${showArchivedLiquorOrders ? 'No archived liquor orders.' : 'No pending liquor orders.'}</p>`;
            return;
        }

        filteredOrders.forEach(order => {
            const orderCard = document.createElement('div');
            orderCard.classList.add('card');
            orderCard.innerHTML = `
                <div class="card-header">
                    <h4>${order.name} (x${order.quantity})</h4>
                    <span class="text-sm text-gray-500">Status: ${order.status.toUpperCase()}</span>
                </div>
                <div class="card-body">
                    <p><strong>Phone:</strong> ${order.phone}</p>
                    <p><strong>Additional Info:</strong> ${order.message || 'N/A'}</p>
                </div>
                <div class="card-actions">
                    ${order.status === 'pending' ? `
                        <button class="btn btn-secondary archive-liquor-order-btn" data-id="${order.id}">
                            <i class="fas fa-archive"></i> Archive Order
                        </button>
                    ` : `
                        <button class="btn btn-outline unarchive-liquor-order-btn" data-id="${order.id}">
                            <i class="fas fa-box-open"></i> Unarchive
                        </button>
                    `}
                </div>
            `;
            liquorOrdersList.appendChild(orderCard);
        });

        liquorOrdersList.querySelectorAll('.archive-liquor-order-btn').forEach(button => {
            button.addEventListener('click', async (e) => {
                const orderId = e.currentTarget.dataset.id;
                const order = liquorOrdersData.find(o => o.id === orderId);
                if (order) {
                    try {
                        const response = await fetch('../handlers/liquor_order_update.php', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                            },
                            body: `id=${orderId}&status=archived`,
                        });
                        const result = await response.text();
                        if (result.trim() === 'success') {
                            order.status = 'archived';
                            renderLiquorOrders();
                        } else {
                            alert('Failed to archive liquor order.');
                        }
                    } catch (error) {
                        alert('Error archiving liquor order: ' + error);
                    }
                }
            });
        });

        liquorOrdersList.querySelectorAll('.unarchive-liquor-order-btn').forEach(button => {
            button.addEventListener('click', async (e) => {
                const orderId = e.currentTarget.dataset.id;
                const order = liquorOrdersData.find(o => o.id === orderId);
                if (order) {
                    try {
                        const response = await fetch('../handlers/liquor_order_update.php', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                            },
                            body: `id=${orderId}&status=pending`,
                        });
                        const result = await response.text();
                        if (result.trim() === 'success') {
                            order.status = 'pending';
                            renderLiquorOrders();
                        } else {
                            alert('Failed to unarchive liquor order.');
                        }
                    } catch (error) {
                        alert('Error unarchiving liquor order: ' + error);
                    }
                }
            });
        });
    }

    // --- Calendar Manager ---
    const calendarManagerList = document.getElementById('calendar-manager-list');
    const addEventBtn = document.getElementById('add-event-btn');
    const calendarManagerFormContainer = document.getElementById('calendar-manager-form-container');
    const eventForm = document.getElementById('event-form');
    const eventIdInput = document.getElementById('event-id');
    const eventDateInput = document.getElementById('event-date');
    const eventNameInput = document.getElementById('event-name');
    const eventTimeInput = document.getElementById('event-time');
    const eventDescriptionInput = document.getElementById('event-description');
    const eventStatusSelect = document.getElementById('event-status');
    const cancelEventEditBtn = document.getElementById('cancel-event-edit');

    addEventBtn.addEventListener('click', () => {
        calendarManagerFormContainer.classList.remove('hidden');
        eventForm.reset();
        eventIdInput.value = ''; // Clear ID for new event
    });

    cancelEventEditBtn.addEventListener('click', () => {
        calendarManagerFormContainer.classList.add('hidden');
    });

    eventForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = eventIdInput.value;
        const date = eventDateInput.value;
        const name = eventNameInput.value;
        const time = eventTimeInput.value;
        const email = eventDescriptionInput.value;
        const status = eventStatusSelect.value;

        const formData = new FormData();
        formData.append('event_date', date);
        formData.append('name', name);
        formData.append('time_from', time);
        formData.append('email', email);
        formData.append('status', status);

        let url = '../handlers/event_add.php';
        if (id) {
            formData.append('id', id);
            url = '../handlers/event_update.php';
        }

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: formData,
            });
            const result = await response.text();
            if (result.trim() === 'success') {
                await loadAllData();
                renderCalendarManager();
                calendarManagerFormContainer.classList.add('hidden');
            } else {
                alert('Failed to save event.');
            }
        } catch (error) {
            alert('Error saving event: ' + error);
        }
    });

    function renderCalendarManager() {
        calendarManagerList.innerHTML = '';

        if (calendarEventsData.length === 0) {
            calendarManagerList.innerHTML = `<p class="text-center text-gray-500 col-span-full">No events to display.</p>`;
            return;
        }

        calendarEventsData.forEach(dateEntry => {
            dateEntry.events.forEach(event => {
                const eventCard = document.createElement('div');
                eventCard.classList.add('card');
                eventCard.innerHTML = `
                    <div class="card-header">
                        <h4>${event.name} on ${dateEntry.date}</h4>
                        <span class="text-sm text-gray-500">${event.time}</span>
                    </div>
                    <div class="card-body">
                        <p><strong>Email:</strong> ${event.email || 'N/A'}</p>
                        <p><strong>Status:</strong> <span class="font-bold status-${event.status}">${event.status.toUpperCase()}</span></p>
                    </div>
                    <div class="card-actions">
                        <button class="btn btn-outline edit-event-btn" data-id="${event.id}" data-date="${dateEntry.date}">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="btn btn-destructive delete-event-btn" data-id="${event.id}" data-date="${dateEntry.date}">
                            <i class="fas fa-trash-alt"></i> Delete
                        </button>
                    </div>
                `;
                calendarManagerList.appendChild(eventCard);
            });
        });

        calendarManagerList.querySelectorAll('.edit-event-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const eventId = e.currentTarget.dataset.id;
                const eventDate = e.currentTarget.dataset.date;
                const dateEntry = calendarEventsData.find(entry => entry.date === eventDate);
                if (dateEntry) {
                    const eventToEdit = dateEntry.events.find(evt => evt.id === eventId);
                    if (eventToEdit) {
                        eventIdInput.value = eventToEdit.id;
                        eventDateInput.value = eventDate;
                        eventNameInput.value = eventToEdit.name;
                        eventTimeInput.value = eventToEdit.time;
                        eventDescriptionInput.value = eventToEdit.email;
                        eventStatusSelect.value = eventToEdit.status;
                        calendarManagerFormContainer.classList.remove('hidden');
                    }
                }
            });
        });

        calendarManagerList.querySelectorAll('.delete-event-btn').forEach(button => {
            button.addEventListener('click', async (e) => {
                const eventId = e.currentTarget.dataset.id;
                const eventDate = e.currentTarget.dataset.date;

                try {
                    const response = await fetch('../handlers/event_delete.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: `id=${eventId}`,
                    });
                    const result = await response.text();
                    if (result.trim() === 'success') {
                        calendarEventsData = calendarEventsData.map(dateEntry => {
                            if (dateEntry.date === eventDate) {
                                dateEntry.events = dateEntry.events.filter(evt => evt.id !== eventId);
                                return dateEntry.events.length > 0 ? dateEntry : null;
                            }
                            return dateEntry;
                        }).filter(Boolean);
                        renderCalendarManager();
                    } else {
                        alert('Failed to delete event.');
                    }
                } catch (error) {
                    alert('Error deleting event: ' + error);
                }
            });
        });
    }

    // --- Gallery Manager ---
    const galleryManagerList = document.getElementById('gallery-manager-list');
    const addImageBtn = document.getElementById('add-image-btn');
    const galleryManagerFormContainer = document.getElementById('gallery-manager-form-container');
    const imageForm = document.getElementById('image-form');
    const imageIdInput = document.getElementById('image-id');
    const imageSrcInput = document.getElementById('image-src');
    const imageAltInput = document.getElementById('image-alt');
    const cancelImageEditBtn = document.getElementById('cancel-image-edit');

    addImageBtn.addEventListener('click', () => {
        galleryManagerFormContainer.classList.remove('hidden');
        imageForm.reset();
        imageIdInput.value = ''; // Clear ID for new image
    });

    cancelImageEditBtn.addEventListener('click', () => {
        galleryManagerFormContainer.classList.add('hidden');
    });

    imageForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = imageIdInput.value;
        const src = imageSrcInput.value;
        const alt = imageAltInput.value;

        const formData = new FormData();
        formData.append('img_location', src);
        formData.append('alt_text', alt);

        let url = '../handlers/image_add.php';
        if (id) {
            formData.append('id', id);
            url = '../handlers/image_update.php';
        }

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: formData,
            });
            const result = await response.text();
            if (result.trim() === 'success') {
                await loadAllData();
                renderGalleryManager();
                galleryManagerFormContainer.classList.add('hidden');
            } else {
                alert('Failed to save image.');
            }
        } catch (error) {
            alert('Error saving image: ' + error);
        }
    });

    function renderGalleryManager() {
        galleryManagerList.innerHTML = '';

        if (galleryImagesData.length === 0) {
            galleryManagerList.innerHTML = `<p class="text-center text-gray-500 col-span-full">No gallery images to display.</p>`;
            return;
        }

        galleryImagesData.forEach(image => {
            const imageCard = document.createElement('div');
            imageCard.classList.add('card', 'gallery-card');
            imageCard.innerHTML = `
                <img src="${image.img_location}" alt="${image.alt_text}" onerror="this.onerror=null;this.src='https://placehold.co/300x180/E0E0E0/333333?text=Image+Not+Found';" />
                <p>${image.alt_text}</p>
                <div class="card-actions">
                    <button class="btn btn-outline edit-image-btn" data-id="${image.id}">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-destructive delete-image-btn" data-id="${image.id}">
                        <i class="fas fa-trash-alt"></i> Delete
                    </button>
                </div>
            `;
            galleryManagerList.appendChild(imageCard);
        });

        galleryManagerList.querySelectorAll('.edit-image-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const imageId = e.currentTarget.dataset.id;
                const imageToEdit = galleryImagesData.find(img => img.id === imageId);
                if (imageToEdit) {
                    imageIdInput.value = imageToEdit.id;
                    imageSrcInput.value = imageToEdit.img_location;
                    imageAltInput.value = imageToEdit.alt_text;
                    galleryManagerFormContainer.classList.remove('hidden');
                }
            });
        });

        galleryManagerList.querySelectorAll('.delete-image-btn').forEach(button => {
            button.addEventListener('click', async (e) => {
                const imageId = e.currentTarget.dataset.id;
                try {
                    const response = await fetch('../handlers/image_delete.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: `id=${imageId}`,
                    });
                    const result = await response.text();
                    if (result.trim() === 'success') {
                        galleryImagesData = galleryImagesData.filter(img => img.id !== imageId);
                        renderGalleryManager();
                    } else {
                        alert('Failed to delete image.');
                    }
                } catch (error) {
                    alert('Error deleting image: ' + error);
                }
            });
        });
    }

    // --- Initial Check ---
    checkAuth();
});
