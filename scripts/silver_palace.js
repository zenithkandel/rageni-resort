const togglePhoneNumbersBtn = document.getElementById('togglePhoneNumbers');
const additionalPhoneNumbers = document.getElementById('additionalPhoneNumbers');
const toggleIcon = togglePhoneNumbersBtn.querySelector('i');

if (togglePhoneNumbersBtn && additionalPhoneNumbers && toggleIcon) {
    togglePhoneNumbersBtn.addEventListener('click', function () {
        if (additionalPhoneNumbers.style.display === 'none') {
            additionalPhoneNumbers.style.display = 'block';
            togglePhoneNumbersBtn.innerHTML = 'Show Less Numbers <i class="fas fa-chevron-up"></i>';
        } else {
            additionalPhoneNumbers.style.display = 'none';
            togglePhoneNumbersBtn.innerHTML = 'Show More Numbers <i class="fas fa-chevron-down"></i>';
        }
    });
}

// Navigation functionality (No changes here)
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

// Close nav menu when a link is clicked
navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    });
});

// Enhanced header scroll effect with transparent to solid transition and logo swap (No changes here)
const header = document.getElementById("header");
const heroSection = document.querySelector(".hero");
const logoWhite = document.querySelector(".logo-white");
const logoBlack = document.querySelector(".logo-black");

function updateHeaderBackground() {
    if (!heroSection) return;

    const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
    const scrollPosition = window.scrollY + 100;

    if (scrollPosition >= heroBottom) {
        header.classList.add("scrolled");
        if (logoWhite) logoWhite.style.display = "none";
        if (logoBlack) logoBlack.style.display = "block";
    } else {
        header.classList.remove("scrolled");
        if (logoWhite) logoWhite.style.display = "block";
        if (logoBlack) logoBlack.style.display = "none";
    }
}

// Smooth scrolling for navigation links (No changes here)
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    });
});

// Active navigation link highlighting (No changes here, offset is already good)
const sections = document.querySelectorAll("section");

function updateActiveNav() {
    const scrollPos = window.scrollY + 150;

    sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute("id");

        if (scrollPos >= top && scrollPos < top + height) {
            navLinks.forEach((link) => {
                link.classList.remove("active");
                if (link.getAttribute("href") === `#${id}`) {
                    link.classList.add("active");
                }
            });
        }
    });
}

// FIX: Scroll-triggered animations (Intersection Observer) for accuracy
// Adjusted rootMargin for better trigger timing and simplified adding 'animated' class
const animationObserverOptions = {
    // Increased threshold slightly so elements animate sooner when they come into view
    threshold: 0.15,
    // rootMargin: '0px 0px -50px 0px' // Removed, let threshold handle it or adjust specifically
};

// Renamed from 'observer' to 'animationObserver' for clarity
const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("animated");
            // Stop observing once animated to prevent re-triggering
            animationObserver.unobserve(entry.target);
        }
    });
}, animationObserverOptions);

// Observe all elements with animation classes
document
    .querySelectorAll(".animate-on-scroll, .animate-left, .animate-right")
    .forEach((el) => {
        animationObserver.observe(el);
    });

// Parallax effect for hero section (No changes here)
window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector(".hero");
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.4}px)`;
    }
});

// Scroll to top button (No changes here)
const scrollTopBtn = document.getElementById("scroll-top");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add("visible");
    } else {
        scrollTopBtn.classList.remove("visible");
    }
});

scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
});

// Typing effect for hero subtitle (No changes here)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = "";

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

window.addEventListener("load", () => {
    const heroSubtitle = document.querySelector(".hero-subtitle");
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        heroSubtitle.textContent = "";
        setTimeout(() => {
            typeWriter(heroSubtitle, originalText, 100);
        }, 800);
    }
});

// Add loading animation (Initial body fade-in) (No changes here)
window.addEventListener("load", () => {
    document.body.style.opacity = "0";
    document.body.style.transition = "opacity 0.5s ease";

    setTimeout(() => {
        document.body.style.opacity = "1";
    }, 100);
});

// FIX: Stagger Animation (More accurate timing and integration with main observer)
// The stagger animation previously used its own observer. Now, we'll try to integrate
// the stagger directly with the 'animated' class and CSS `transition-delay` and ensure
// the main animationObserver handles adding `animated` and removing itself.
// The `addStaggerAnimation` is removed, and its logic is now within the general
// animation CSS and the `performanceObserver`'s `will-change` (though that's not its primary role).
// For staggered entry, the CSS will handle it using the :nth-child property or
// a single JS loop to apply inline `transition-delay` before the animation class is added.
// A simpler way for JS-driven stagger without a separate observer:
document.addEventListener("DOMContentLoaded", () => {
    document
        .querySelectorAll(".animate-on-scroll, .animate-left, .animate-right")
        .forEach((el, index) => {
            // Set a custom property for stagger delay which can be used in CSS
            // Or directly set inline style, but custom property is cleaner
            el.style.setProperty(
                "--animation-stagger-delay",
                `${index * 0.01}s`
            );
        });
});
// You would then add this to your CSS for the elements:
// .animate-on-scroll, .animate-left, .animate-right {
//     /* ... existing properties ... */
//     transition-delay: var(--animation-stagger-delay); /* Apply stagger only on initial transition */
// }
// However, the original structure added `animated` which then triggered the transition,
// so the `transition-delay` should be active *when* `animated` is added.
// The previous stagger implementation *was* correct for adding `transitionDelay` via JS
// before `animated` was added. Let's revert to a slightly modified version of it,
// ensuring it works with the single animationObserver.

// Re-introducing a refined addStaggerAnimation for JS-controlled delay
function addStaggerAnimationRefined() {
    const staggerElements = document.querySelectorAll(
        ".animate-on-scroll, .animate-left, .animate-right"
    );

    const staggerObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (
                    entry.isIntersecting &&
                    !entry.target.classList.contains("animated")
                ) {
                    const index = Array.from(staggerElements).indexOf(entry.target);
                    // Apply the delay before adding the 'animated' class
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                    entry.target.classList.add("animated");
                    observer.unobserve(entry.target); // Stop observing once animated

                    // Optional: reset delay after animation for normal hover behavior
                    // The animation duration is 0.8s, so 800ms + calculated delay
                    setTimeout(() => {
                        entry.target.style.transitionDelay = "0s";
                    }, 800 + index * 100); // Match animation duration + max stagger
                }
            });
        },
        {
            threshold: 0.1, // Trigger when 10% of element is visible
            rootMargin: "0px 0px -50px 0px", // Still useful to trigger slightly before full visibility
        }
    );

    staggerElements.forEach((element) => {
        staggerObserver.observe(element);
    });
}
// Call the refined stagger animation on DOMContentLoaded
document.addEventListener("DOMContentLoaded", addStaggerAnimationRefined);

// Performance optimization: Throttle scroll events (No changes here)
function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}

// Apply throttling to scroll events
window.addEventListener(
    "scroll",
    throttle(() => {
        updateActiveNav();
        updateHeaderBackground();
    }, 100)
);

// Add intersection observer for better performance (will-change) (No changes here)
const performanceObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.willChange = "transform, opacity";
        } else {
            entry.target.style.willChange = "auto";
        }
    });
});

document
    .querySelectorAll(".animate-on-scroll, .animate-left, .animate-right")
    .forEach((el) => {
        performanceObserver.observe(el);
    });

// --- NEW FEATURE: GALLERY WITH JSON & LIGHTBOX ---
const gallerySection = document.getElementById("gallery"); // Get the entire gallery section
const galleryGrid = document.getElementById("gallery-grid");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const lightboxClose = document.querySelector(".lightbox-close");

// NEW: Gallery Navigation Elements
const lightboxPrev = document.querySelector(".lightbox-prev"); // Assuming you'll add this button in HTML
const lightboxNext = document.querySelector(".lightbox-next"); // Assuming you'll add this button in HTML

let galleryImages = []; // Store the fetched images
let currentImageIndex = -1; // Track the currently viewed image index

// Hide gallery section by default in CSS, or add a class here
// For robustness, add a class in CSS like .gallery-hidden { display: none; }
// and then remove it if images load.
if (gallerySection) {
    gallerySection.style.display = "none"; // Initially hide the whole section
}

async function loadGalleryImages() {
    try {
        const response = await fetch("../data/images.json");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        galleryImages = await response.json(); // Assign fetched images to galleryImages array

        if (galleryImages.length === 0) {
            console.warn("images.json is empty or contains no images.");
            if (gallerySection) gallerySection.style.display = "none";
            return;
        }

        if (gallerySection) {
            gallerySection.style.display = "block";
        }

        galleryImages.forEach((image, index) => { // Added index to forEach
            const galleryItem = document.createElement("div");
            galleryItem.classList.add("gallery-item");

            const img = document.createElement("img");
            img.src = image.src;
            img.alt = image.alt;
            img.loading = "lazy";

            galleryItem.appendChild(img);
            galleryGrid.appendChild(galleryItem);

            galleryItem.addEventListener("click", () => {
                currentImageIndex = index; // Set current index when an image is clicked
                showImageInLightbox(currentImageIndex);
                lightbox.classList.add("active");
                document.body.style.overflow = "hidden";
            });
        });
    } catch (error) {
        console.error("Error loading gallery images:", error);
        if (gallerySection) gallerySection.style.display = "none";
    }
}

// NEW Function: Display image in lightbox
function showImageInLightbox(index) {
    if (galleryImages.length === 0) return;

    // Ensure index wraps around
    if (index < 0) {
        currentImageIndex = galleryImages.length - 1;
    } else if (index >= galleryImages.length) {
        currentImageIndex = 0;
    } else {
        currentImageIndex = index;
    }

    const imageToShow = galleryImages[currentImageIndex];
    lightboxImg.src = imageToShow.src;
    lightboxImg.alt = imageToShow.alt;
}


// Close lightbox (No changes here to existing logic, just added new event listeners)
if (lightboxClose) {
    lightboxClose.addEventListener("click", () => {
        lightbox.classList.remove("active");
        document.body.style.overflow = "";
    });
}

if (lightbox) {
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove("active");
            document.body.style.overflow = "";
        }
    });
}

// NEW: Lightbox navigation event listeners
if (lightboxPrev) {
    lightboxPrev.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent closing lightbox if clicking on arrow
        showImageInLightbox(currentImageIndex - 1);
    });
}

if (lightboxNext) {
    lightboxNext.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent closing lightbox if clicking on arrow
        showImageInLightbox(currentImageIndex + 1);
    });
}

// Optional: Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('active')) {
        if (e.key === 'ArrowLeft') {
            showImageInLightbox(currentImageIndex - 1);
        } else if (e.key === 'ArrowRight') {
            showImageInLightbox(currentImageIndex + 1);
        } else if (e.key === 'Escape') {
            lightbox.classList.remove("active");
            document.body.style.overflow = "";
        }
    }
});


// ... (Your existing JavaScript code above this section) ...

// --- NEW FEATURE: EVENT CALENDAR WITH JSON ---
const calendarGrid = document.getElementById("calendar-grid");
const currentMonthYear = document.getElementById("currentMonthYear");
const prevMonthBtn = document.getElementById("prevMonth");
const nextMonthBtn = document.getElementById("nextMonth");
const bookingFormDateInput = document.getElementById("eventDate");
const bookNowSection = document.getElementById("book-now");

// NEW: Event Details Modal elements
const eventDetailsModal = document.getElementById("eventDetailsModal");
const eventModalCloseBtn = document.querySelector(
    ".event-modal-close-btn"
);
const eventModalDate = document.getElementById("eventModalDate");
const eventModalDetails = document.getElementById("eventModalDetails");
const eventModalBookBtn = document.querySelector(".event-modal-book-btn");

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let eventsData = [];

async function fetchEvents() {
    try {
        const response = await fetch("../data/events_list.json");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        eventsData = await response.json();
        renderCalendar(currentMonth, currentYear);
    } catch (error) {
        console.error("Error fetching events:", error);
        renderCalendarFallback(
            currentMonth,
            currentYear,
            "Failed to load event data. Schedule might be empty."
        );
    }
}

function renderCalendar(month, year) {
    calendarGrid.innerHTML = "";
    const date = new Date(year, month, 1);
    const firstDayIndex = date.getDay();
    const lastDay = new Date(year, month + 1, 0).getDate();
    const prevLastDay = new Date(year, month, 0).getDate();

    currentMonthYear.textContent = new Date(year, month).toLocaleString(
        "en-US",
        {
            month: "long",
            year: "numeric",
        }
    );

    for (let i = firstDayIndex; i > 0; i--) {
        const dayDiv = document.createElement("div");
        dayDiv.classList.add("calendar-day", "inactive");
        dayDiv.textContent = prevLastDay - i + 1;
        calendarGrid.appendChild(dayDiv);
    }

    for (let i = 1; i <= lastDay; i++) {
        const dayDiv = document.createElement("div");
        dayDiv.classList.add("calendar-day");
        const dayNumberSpan = document.createElement("span");
        dayNumberSpan.classList.add("day-number");
        dayNumberSpan.textContent = i;
        dayDiv.appendChild(dayNumberSpan);

        const fullDate = `${year}-${String(month + 1).padStart(
            2,
            "0"
        )}-${String(i).padStart(2, "0")}`;
        dayDiv.dataset.date = fullDate;

        const today = new Date();
        if (
            i === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
        ) {
            dayDiv.classList.add("today");
        }

        const dayEvents = eventsData.find((e) => e.date === fullDate);
        if (dayEvents && dayEvents.events && dayEvents.events.length > 0) {
            const eventListDiv = document.createElement("div");
            eventListDiv.classList.add("event-list");
            dayEvents.events.slice(0, 4).forEach((event) => {
                const eventItem = document.createElement("div");
                eventItem.classList.add("event-item");
                eventItem.textContent = event.time;
                eventListDiv.appendChild(eventItem);
            });
            dayDiv.appendChild(eventListDiv);

            // NEW: Add event listener to open event details modal
            dayDiv.addEventListener("click", (e) => {
                // Prevent default booking scroll if events are present
                e.preventDefault();
                // Check if it's an inactive day (from previous/next month)
                if (dayDiv.classList.contains("inactive")) {
                    return;
                }

                // Populate and show event details modal
                eventModalDate.textContent = new Date(
                    fullDate
                ).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                });
                eventModalDetails.innerHTML = ""; // Clear previous details

                dayEvents.events.forEach((event) => {
                    const detailItem = document.createElement("p");
                    detailItem.classList.add("event-detail-item");
                    detailItem.innerHTML = `<i class="fa-regular fa-clock"></i> ${event.time} - ${event.name}`;
                    eventModalDetails.appendChild(detailItem);
                });

                eventDetailsModal.classList.add("active");
                document.body.style.overflow = "hidden"; // Prevent scrolling
            });
        } else {
            // Existing logic for clicking on empty days (no events)
            dayDiv.addEventListener("click", () => {
                if (dayDiv.classList.contains("inactive")) {
                    return;
                }
                const currentSelected = document.querySelector(
                    ".calendar-day.selected"
                );
                if (currentSelected) {
                    currentSelected.classList.remove("selected");
                }
                dayDiv.classList.add("selected");
                bookingFormDateInput.value = dayDiv.dataset.date;
                bookNowSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            });
        }
        calendarGrid.appendChild(dayDiv);
    }

    const totalDays = firstDayIndex + lastDay;
    const remainingCells = 42 - totalDays;

    for (let i = 1; i <= remainingCells; i++) {
        const dayDiv = document.createElement("div");
        dayDiv.classList.add("calendar-day", "inactive");
        dayDiv.textContent = i;
        calendarGrid.appendChild(dayDiv);
    }

    const oldMessage = calendarGrid.nextElementSibling;
    if (
        oldMessage &&
        oldMessage.classList.contains("calendar-error-message")
    ) {
        oldMessage.remove();
    }
}

function renderCalendarFallback(
    month,
    year,
    errorMessage = "Events not available."
) {
    calendarGrid.innerHTML = "";
    const date = new Date(year, month, 1);
    const firstDayIndex = date.getDay();
    const lastDay = new Date(year, month + 1, 0).getDate();
    const prevLastDay = new Date(year, month, 0).getDate();

    currentMonthYear.textContent = new Date(year, month).toLocaleString(
        "en-US",
        {
            month: "long",
            year: "numeric",
        }
    );

    for (let i = firstDayIndex; i > 0; i--) {
        const dayDiv = document.createElement("div");
        dayDiv.classList.add("calendar-day", "inactive");
        dayDiv.textContent = prevLastDay - i + 1;
        calendarGrid.appendChild(dayDiv);
    }

    for (let i = 1; i <= lastDay; i++) {
        const dayDiv = document.createElement("div");
        dayDiv.classList.add("calendar-day");
        const dayNumberSpan = document.createElement("span");
        dayNumberSpan.classList.add("day-number");
        dayNumberSpan.textContent = i;
        dayDiv.appendChild(dayNumberSpan);

        const fullDate = `${year}-${String(month + 1).padStart(
            2,
            "0"
        )}-${String(i).padStart(2, "0")}`;
        dayDiv.dataset.date = fullDate;

        const today = new Date();
        if (
            i === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
        ) {
            dayDiv.classList.add("today");
        }

        // For fallback, all days will scroll to booking
        dayDiv.addEventListener("click", () => {
            if (dayDiv.classList.contains("inactive")) {
                return;
            }
            const currentSelected = document.querySelector(
                ".calendar-day.selected"
            );
            if (currentSelected) {
                currentSelected.classList.remove("selected");
            }
            dayDiv.classList.add("selected");
            bookingFormDateInput.value = dayDiv.dataset.date;
            bookNowSection.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        });
        calendarGrid.appendChild(dayDiv);
    }

    const totalDays = firstDayIndex + lastDay;
    const remainingCells = 42 - totalDays;

    for (let i = 1; i <= remainingCells; i++) {
        const dayDiv = document.createElement("div");
        dayDiv.classList.add("calendar-day", "inactive");
        dayDiv.textContent = i;
        calendarGrid.appendChild(dayDiv);
    }

    let messageElement = calendarGrid.nextElementSibling;
    if (
        !messageElement ||
        !messageElement.classList.contains("calendar-error-message")
    ) {
        messageElement = document.createElement("p");
        messageElement.classList.add("calendar-error-message");
        messageElement.style.textAlign = "center";
        messageElement.style.color = "var(--text-light)";
        messageElement.style.marginTop = "20px";
        calendarGrid.insertAdjacentElement("afterend", messageElement);
    }
    messageElement.textContent = errorMessage;
}

prevMonthBtn.addEventListener("click", () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    if (eventsData && eventsData.length > 0) {
        renderCalendar(currentMonth, currentYear);
    } else {
        renderCalendarFallback(
            currentMonth,
            currentYear,
            "Event schedule not available."
        );
    }
});

nextMonthBtn.addEventListener("click", () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    if (eventsData && eventsData.length > 0) {
        renderCalendar(currentMonth, currentYear);
    } else {
        renderCalendarFallback(
            currentMonth,
            currentYear,
            "Event schedule not available."
        );
    }
});

// NEW: Close Event Details Modal
if (eventModalCloseBtn) {
    eventModalCloseBtn.addEventListener("click", () => {
        eventDetailsModal.classList.add("closing"); // Add closing class
        document.body.style.overflow = ""; // Restore scrolling immediately
        setTimeout(() => {
            eventDetailsModal.classList.remove("active", "closing"); // Remove active after animation
        }, 300); // Match fadeOut animation duration
    });
}

if (eventDetailsModal) {
    eventDetailsModal.addEventListener("click", (e) => {
        if (e.target === eventDetailsModal) {
            eventDetailsModal.classList.add("closing"); // Add closing class
            document.body.style.overflow = ""; // Restore scrolling immediately
            setTimeout(() => {
                eventDetailsModal.classList.remove("active", "closing"); // Remove active after animation
            }, 300); // Match fadeOut animation duration
        }
    });
}

// Handle "Book Now" button inside event details modal
if (eventModalBookBtn) {
    eventModalBookBtn.addEventListener("click", (e) => {
        e.preventDefault(); // Prevent default link behavior
        eventDetailsModal.classList.add("closing"); // Add closing class
        document.body.style.overflow = ""; // Restore scrolling immediately
        setTimeout(() => {
            eventDetailsModal.classList.remove("active", "closing"); // Remove active after animation
            // Now scroll to the booking section
            bookNowSection.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
            // The date should already be set by the calendar day click
        }, 300); // Match fadeOut animation duration
    });
}

// --- NEW FEATURE: BOOKING FORM HANDLING WITH MODAL ---
const bookingForm = document.getElementById("booking-form");
const successModal = document.getElementById("successModal");
const modalCloseBtn = document.querySelector(".modal-close-btn");

bookingForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const eventName = document.getElementById("eventName").value;
    const eventDate = document.getElementById("eventDate").value;
    const eventTimeFrom = document.getElementById("eventTimeFrom").value;
    const eventTimeTo = document.getElementById("eventTimeTo").value;
    const phoneNumber = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    if (
        !eventName ||
        !eventDate ||
        !eventTimeFrom ||
        !eventTimeTo ||
        !phoneNumber ||
        !email
    ) {
        alert("Please fill in all required fields.");
        return;
    }

    console.log("Booking Data:", {
        eventName,
        eventDate,
        eventTimeFrom,
        eventTimeTo,
        phoneNumber,
        email,
        message,
    });

    successModal.classList.add("active");
    document.body.style.overflow = "hidden";

    // NEW: Add fade-out animation for success modal
    setTimeout(() => {
        successModal.classList.add("closing"); // Add closing class to trigger fade-out
        // After fade-out animation, remove 'active' and 'closing' classes
        setTimeout(() => {
            successModal.classList.remove("active", "closing");
            document.body.style.overflow = ""; // Restore body scrolling
        }, 300); // Match fadeOut animation duration
    }, 3000); // Auto-close after 3 seconds

    bookingForm.reset();
});

// Close modal on click of 'x' button (for success modal)
if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", () => {
        successModal.classList.add("closing"); // Add closing class
        document.body.style.overflow = ""; // Restore scrolling immediately
        setTimeout(() => {
            successModal.classList.remove("active", "closing"); // Remove active after animation
        }, 300); // Match fadeOut animation duration
    });
}

// Close modal when clicking outside the content (for success modal)
if (successModal) {
    successModal.addEventListener("click", (e) => {
        if (e.target === successModal) {
            successModal.classList.add("closing"); // Add closing class
            document.body.style.overflow = ""; // Restore scrolling immediately
            setTimeout(() => {
                successModal.classList.remove("active", "closing"); // Remove active after animation
            }, 300); // Match fadeOut animation duration
        }
    });
}



// Initialize all features on page load (No changes here)
document.addEventListener("DOMContentLoaded", () => {
    loadGalleryImages();
    fetchEvents();
});