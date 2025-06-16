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
