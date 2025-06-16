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

// Hamburger Menu Functionality
document.addEventListener("DOMContentLoaded", function () {
  // Hamburger menu toggle
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  hamburger.addEventListener("click", function () {
    navMenu.classList.toggle("active");
  });

  // Optional: Close menu when a link is clicked (for better UX)
  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
    });
  });
});
