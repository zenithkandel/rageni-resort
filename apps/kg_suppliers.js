// Navigation functionality
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

if (navLinks) {
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger) hamburger.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active');
        });
    });
}

// Enhanced header scroll effect with transparent to solid transition
const header = document.getElementById('header');
const heroSection = document.querySelector('.hero');

function updateHeaderBackground() {
    if (!heroSection || !header) return;

    const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
    const scrollPosition = window.scrollY + 100; // Add offset for better timing

    const logoWhite = document.querySelector('.logo-white');
    const logoBlack = document.querySelector('.logo-black');

    if (scrollPosition >= heroBottom) {
        header.classList.add('scrolled');
        if (logoWhite) logoWhite.style.display = 'none';
        if (logoBlack) logoBlack.style.display = 'block';
    } else {
        header.classList.remove('scrolled');
        if (logoWhite) logoWhite.style.display = 'block';
        if (logoBlack) logoBlack.style.display = 'none';
    }
}

window.addEventListener('scroll', updateHeaderBackground);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active navigation link highlighting (Simplified as fewer sections)
const sections = document.querySelectorAll('.section');

function updateActiveNav() {
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${id}`) {
                if (scrollPos >= top && scrollPos < top + height) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            }
        });
    });
}

window.addEventListener('scroll', updateActiveNav);


// Scroll-triggered animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Observe all elements with animation classes
document.querySelectorAll('.animate-on-scroll, .animate-left, .animate-right').forEach(el => {
    observer.observe(el);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Scroll to top button
const scrollTopBtn = document.getElementById('scroll-top');

if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}


// Order form handling (formerly Contact form)
const orderForm = document.getElementById('order-form');

if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Simple form validation
        const liquorName = document.getElementById('liquorName').value;
        const quantity = document.getElementById('quantity').value;
        const phoneNumber = document.getElementById('phone').value;
        const additionalInfo = document.getElementById('additionalInfo').value;

        if (!liquorName || !quantity || !phoneNumber) {
            // Replaced alert with a more user-friendly message box if needed, or simply prevent submission
            // For now, using console.error as per previous instructions to avoid alert()
            console.error('Please fill in all required fields: Liquor Name, Quantity, and Phone Number.');
            return;
        }

        // Simulate form submission (in a real application, send this data to a server)
        console.log('Order Form Submitted:', {
            liquorName,
            quantity,
            phoneNumber,
            additionalInfo
        });

        // Provide user feedback (e.g., a simple message below the form or a modal)
        alert('Thank you for your order! We will contact you soon.'); // Using alert for immediate feedback as no modal specified
        orderForm.reset(); // Clear the form
    });
}


// Typing effect for hero subtitle (kept as is, but can be removed if static text is preferred)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Initialize typing effect on page load
window.addEventListener('load', () => {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const originalText = "Your Premium Liquor Partner"; // Set the new static subtitle here
        heroSubtitle.textContent = originalText; // Set immediately without typing effect if preferred
        // If you want the typing effect back:
        // setTimeout(() => {
        //     typeWriter(heroSubtitle, originalText, 150);
        // }, 1000);
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

function addStaggerAnimation() {
  const animateElements = document.querySelectorAll('.animate-on-scroll');

  animateElements.forEach((element, index) => {
    // Add staggered delay when element becomes visible
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          element.classList.add('in-view');
          element.style.transitionDelay = `${index * 0.1}s`;

          // Optional: remove observer after animation
          observer.unobserve(entry.target);

          // Optional: reset delay after animation so hover is normal
          setTimeout(() => {
            element.style.transitionDelay = '0s';
          }, 400 + index * 100); // match the animation duration + delay
        }
      });
    }, { threshold: 0.1 });

    observer.observe(element);
  });
}

addStaggerAnimation();


// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    updateActiveNav();
    updateHeaderBackground();
}, 100));

// Add intersection observer for better performance
const performanceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.willChange = 'transform';
        } else {
            entry.target.style.willChange = 'auto';
        }
    });
});

// Observe animated elements for performance
document.querySelectorAll('.animate-on-scroll, .animate-left, .animate-right').forEach(el => {
    performanceObserver.observe(el);
});
