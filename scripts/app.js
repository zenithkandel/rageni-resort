// Back to Top Button functionality
document.addEventListener("DOMContentLoaded", function () {
  const blobDown = document.querySelector(".blob-down");
  const blobUp = document.querySelector(".blob-up");
  function loadScroll() {
    // scrollTop = document.documentElement.scrollTop;
    scrollTop = document.querySelector(".sections").scrollTop;
    windowHeight = window.innerHeight;
    percent = Math.round((100 * scrollTop) / windowHeight);
    if (percent >= 1) {
      blobDown.style.position = "fixed";
    } else {
      blobDown.style.position = "absolute";
    }
    if (percent >= 10) {
      blobDown.style.height = 50 - percent * 1 + "vh";
      blobDown.style.opacity = 100 - percent * 2.4 + "%";
    }
    if (percent >= 15) {
      // document.querySelector('.hero').style.height = 0+ 'vh';
      document.querySelector(".nav").style.height = 100 - percent + "px";
      document.querySelector(".nav").style.opacity = 100 - percent * 2.4 + "%";
    }
    if (percent <= 15) {
      // document.querySelector('.hero').style.height = 100 + 'vh';

      document.querySelector(".nav").style.height = 70 + "px";
      document.querySelector(".nav").style.opacity = 100 + "%";
    }
    if (percent < 10) {
      blobDown.style.height = 50 + "vh";

      blobDown.style.opacity = 100 + "%";
    }
  }
  document.querySelector(".sections").onscroll = loadScroll;
  window.onresize = loadScroll;
  loadScroll();
  // document.querySelector(".sections").scrollTop =600
  const backToTopBtn = document.getElementById("backToTop");
  const scrollContainer = document.querySelector(".sections");

  function toggleBackToTop() {
    if (scrollContainer.scrollTop > 200) {
      backToTopBtn.style.display = "block";
    } else {
      backToTopBtn.style.display = "none";
    }
  }

  scrollContainer.addEventListener("scroll", toggleBackToTop);

  backToTopBtn.addEventListener("click", function () {
    scrollContainer.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Initial state
  toggleBackToTop();
});

// Hamburger menu functionality
document.addEventListener("DOMContentLoaded", function () {
  // Hamburger menu logic
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.querySelector(".mobile-menu");

  hamburger.addEventListener("click", function (e) {
    e.stopPropagation();
    mobileMenu.classList.toggle("active");
  });

  // Hide menu when clicking outside
  document.addEventListener("click", function (e) {
    if (mobileMenu.classList.contains("active") && !mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
      mobileMenu.classList.remove("active");
    }
  });

  // Optional: Hide menu when a link is clicked
  mobileMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
    });
  });
});


(function() {
      const wrapper = document.getElementById("eventCalendarWrapper");
      const monthNames = ["January", "February", "March", "April", "May", "June",
                          "July", "August", "September", "October", "November", "December"];
      let currentDate = new Date();

      const events = {
        '2025-06-15': [
          {
            title: 'Project Meeting',
            time: '10:00 AM',
            venue: 'Room 101',
            description: 'Discuss progress on the magazine project.'
          }
        ],
        '2025-06-20': [
          {
            title: 'Tech Talk',
            time: '2:00 PM',
            venue: 'Auditorium',
            description: 'Presentation on modern UI/UX techniques.'
          },
          {
            title: 'Club Meet',
            time: '4:30 PM',
            venue: 'Library Hall',
            description: 'Chess club monthly gathering.'
          }
        ]
      };

      window.changeMonth = function(offset) {
        currentDate.setMonth(currentDate.getMonth() + offset);
        renderCalendar();
      };

      window.showEventDetails = function(date, event) {
        wrapper.querySelector('#eventTitle').textContent = event.title;
        wrapper.querySelector('#eventDate').textContent = date;
        wrapper.querySelector('#eventTime').textContent = event.time;
        wrapper.querySelector('#eventVenue').textContent = event.venue;
        wrapper.querySelector('#eventDesc').textContent = event.description;
        wrapper.querySelector('#eventModal').style.display = 'flex';
      };

      window.closeModal = function() {
        wrapper.querySelector('#eventModal').style.display = 'none';
      };

      function renderCalendar() {
        const grid = wrapper.querySelector('#calendarGrid');
        const monthYear = wrapper.querySelector('#monthYear');
        grid.innerHTML = '';

        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const firstDayIndex = firstDay.getDay();
        const totalDays = lastDay.getDate();

        monthYear.textContent = `${monthNames[month]} ${year}`;

        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        dayNames.forEach(day => {
          const div = document.createElement('div');
          div.textContent = day;
          div.className = 'day-name';
          grid.appendChild(div);
        });

        for (let i = 0; i < firstDayIndex; i++) {
          const empty = document.createElement('div');
          empty.className = 'day inactive';
          grid.appendChild(empty);
        }

        for (let day = 1; day <= totalDays; day++) {
          const fullDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const div = document.createElement('div');
          div.className = 'day';
          div.innerHTML = `<div class="day-number">${day}</div>`;

          if (events[fullDate]) {
            events[fullDate].forEach(event => {
              const chip = document.createElement('div');
              chip.className = 'event-chip';
              chip.textContent = event.title;
              chip.onclick = () => showEventDetails(fullDate, event);
              div.appendChild(chip);
            });
          }

          grid.appendChild(div);
        }
      }

      renderCalendar();
    })();