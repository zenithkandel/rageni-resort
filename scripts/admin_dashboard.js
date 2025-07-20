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
        messagesData = await loadJSON('../data/messages.json');
        bookingOrdersData = await loadJSON('../data/booking_orders.json');
        liquorOrdersData = await loadJSON('../data/liquor_orders.json');
        calendarEventsData = await loadJSON('../data/events_list.json');
        galleryImagesData = await loadJSON('../data/images.json');

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
        const filteredMessages = messagesData.filter(msg => showArchivedMessages ? msg.archived : !msg.archived);

        if (filteredMessages.length === 0) {
            messagesList.innerHTML = `<p class="text-center text-gray-500 col-span-full">${showArchivedMessages ? 'No archived messages.' : 'No active messages.'}</p>`;
            return;
        }

        filteredMessages.forEach(msg => {
            const messageCard = document.createElement('div');
            messageCard.classList.add('card');
            messageCard.innerHTML = `
                <div class="card-header">
                    <h4>From: ${msg.sender} (${msg.email})</h4>
                    <span class="text-sm text-gray-500">${new Date(msg.timestamp).toLocaleString()}</span>
                </div>
                <div class="card-body">
                    <p><strong>Subject:</strong> ${msg.subject}</p>
                    <p><strong>Message:</strong> ${msg.message}</p>
                </div>
                <div class="card-actions">
                    <button class="btn btn-secondary mark-read-btn" data-id="${msg.id}">
                        <i class="fas fa-check"></i> ${msg.archived ? 'Mark Unread' : 'Mark Read & Archive'}
                    </button>
                </div>
            `;
            messagesList.appendChild(messageCard);
        });

        messagesList.querySelectorAll('.mark-read-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const messageId = e.currentTarget.dataset.id;
                const messageIndex = messagesData.findIndex(msg => msg.id === messageId);
                if (messageIndex !== -1) {
                    messagesData[messageIndex].archived = !messagesData[messageIndex].archived;
                    renderMessages(); // Re-render to reflect change
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
                    <h4>${booking.eventName} on ${booking.eventDate}</h4>
                    <span class="text-sm text-gray-500">${booking.timeFrom} - ${booking.timeTo}</span>
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
            button.addEventListener('click', (e) => {
                const bookingId = e.currentTarget.dataset.id;
                const bookingIndex = bookingOrdersData.findIndex(b => b.id === bookingId);
                if (bookingIndex !== -1) {
                    bookingOrdersData[bookingIndex].status = 'accepted';
                    // Add to calendar events
                    addBookingToCalendar(bookingOrdersData[bookingIndex]);
                    renderBookings();
                    renderCalendarManager(); // Update calendar view
                }
            });
        });

        bookingsList.querySelectorAll('.reject-booking-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const bookingId = e.currentTarget.dataset.id;
                const bookingIndex = bookingOrdersData.findIndex(b => b.id === bookingId);
                if (bookingIndex !== -1) {
                    bookingOrdersData[bookingIndex].status = 'rejected';
                    renderBookings();
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
                    <h4>${order.liquorName} (x${order.quantity})</h4>
                    <span class="text-sm text-gray-500">Status: ${order.status.toUpperCase()}</span>
                </div>
                <div class="card-body">
                    <p><strong>Phone:</strong> ${order.phone}</p>
                    <p><strong>Additional Info:</strong> ${order.additionalInfo || 'N/A'}</p>
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
            button.addEventListener('click', (e) => {
                const orderId = e.currentTarget.dataset.id;
                const orderIndex = liquorOrdersData.findIndex(order => order.id === orderId);
                if (orderIndex !== -1) {
                    liquorOrdersData[orderIndex].status = 'archived';
                    renderLiquorOrders();
                }
            });
        });

        liquorOrdersList.querySelectorAll('.unarchive-liquor-order-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const orderId = e.currentTarget.dataset.id;
                const orderIndex = liquorOrdersData.findIndex(order => order.id === orderId);
                if (orderIndex !== -1) {
                    liquorOrdersData[orderIndex].status = 'pending';
                    renderLiquorOrders();
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

    eventForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = eventIdInput.value || `evt-${Date.now()}`; // Generate new ID if not editing
        const date = eventDateInput.value;
        const name = eventNameInput.value;
        const time = eventTimeInput.value;
        const description = eventDescriptionInput.value;
        const status = eventStatusSelect.value;

        const newEvent = { id, name, time, description, status };

        let dateEntry = calendarEventsData.find(entry => entry.date === date);

        if (eventIdInput.value) { // Editing existing event
            if (dateEntry) {
                const eventIndex = dateEntry.events.findIndex(evt => evt.id === id);
                if (eventIndex !== -1) {
                    dateEntry.events[eventIndex] = newEvent;
                }
            }
        } else { // Adding new event
            if (dateEntry) {
                dateEntry.events.push(newEvent);
            } else {
                calendarEventsData.push({ date, events: [newEvent] });
            }
        }

        // Sort calendar events by date and then by time within each date
        calendarEventsData.sort((a, b) => new Date(a.date) - new Date(b.date));
        calendarEventsData.forEach(entry => {
            entry.events.sort((a, b) => a.time.localeCompare(b.time));
        });

        renderCalendarManager();
        calendarManagerFormContainer.classList.add('hidden');
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
                        <h4>${event.name} on ${event.date}</h4>
                        <span class="text-sm text-gray-500">${event.time}</span>
                    </div>
                    <div class="card-body">
                        <p><strong>Description:</strong> ${event.description || 'N/A'}</p>
                        <p><strong>Status:</strong> <span class="font-bold status-${event.status}">${event.status.toUpperCase()}</span></p>
                    </div>
                    <div class="card-actions">
                        <button class="btn btn-outline edit-event-btn" data-id="${event.id}" data-date="${event.date}">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="btn btn-destructive delete-event-btn" data-id="${event.id}" data-date="${event.date}">
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
                        eventDateInput.value = eventToEdit.date;
                        eventNameInput.value = eventToEdit.name;
                        eventTimeInput.value = eventToEdit.time;
                        eventDescriptionInput.value = eventToEdit.description;
                        eventStatusSelect.value = eventToEdit.status;
                        calendarManagerFormContainer.classList.remove('hidden');
                    }
                }
            });
        });

        calendarManagerList.querySelectorAll('.delete-event-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const eventId = e.currentTarget.dataset.id;
                const eventDate = e.currentTarget.dataset.date;

                calendarEventsData = calendarEventsData.map(dateEntry => {
                    if (dateEntry.date === eventDate) {
                        dateEntry.events = dateEntry.events.filter(evt => evt.id !== eventId);
                        // Remove date entry if no events left for that date
                        return dateEntry.events.length > 0 ? dateEntry : null;
                    }
                    return dateEntry;
                }).filter(Boolean); // Remove null entries

                renderCalendarManager();
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

    imageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = imageIdInput.value || `img-${Date.now()}`; // Generate new ID if not editing
        const src = imageSrcInput.value;
        const alt = imageAltInput.value;

        const newImage = { id, src, alt };

        if (imageIdInput.value) { // Editing existing image
            const imageIndex = galleryImagesData.findIndex(img => img.id === id);
            if (imageIndex !== -1) {
                galleryImagesData[imageIndex] = newImage;
            }
        } else { // Adding new image
            galleryImagesData.push(newImage);
        }

        renderGalleryManager();
        galleryManagerFormContainer.classList.add('hidden');
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
                <img src="${image.src}" alt="${image.alt}" onerror="this.onerror=null;this.src='https://placehold.co/300x180/E0E0E0/333333?text=Image+Not+Found';" />
                <p>${image.alt}</p>
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
                    imageSrcInput.value = imageToEdit.src;
                    imageAltInput.value = imageToEdit.alt;
                    galleryManagerFormContainer.classList.remove('hidden');
                }
            });
        });

        galleryManagerList.querySelectorAll('.delete-image-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const imageId = e.currentTarget.dataset.id;
                galleryImagesData = galleryImagesData.filter(img => img.id !== imageId);
                renderGalleryManager();
            });
        });
    }

    // --- Initial Check ---
    checkAuth();
});
