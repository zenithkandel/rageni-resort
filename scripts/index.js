
document.addEventListener('DOMContentLoaded', () => {// Navigation functionality
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Enhanced header scroll effect with transparent to solid transition
    const header = document.getElementById('header');
    const heroSection = document.querySelector('.hero');

    function updateHeaderBackground() {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        const scrollPosition = window.scrollY + 100; // Add offset for better timing

        if (scrollPosition >= heroBottom) {
            header.classList.add('scrolled');
            document.querySelector('.logo-white').style.display = 'none';
            document.querySelector('.logo-black').style.display = 'block';
        } else {
            header.classList.remove('scrolled');
            document.querySelector('.logo-white').style.display = 'block';
            document.querySelector('.logo-black').style.display = 'none';
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

    // Active navigation link highlighting
    const sections = document.querySelectorAll('section');

    function updateActiveNav() {
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
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

    // Contact form handling
    const contactForm = document.getElementById('contact-form');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Simple form validation and submission
        const formData = new FormData(contactForm);
        const formObject = {};

        for (let [key, value] of formData.entries()) {
            formObject[key] = value;
        }
        setTimeout(() => {
            showModal();
            // alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        }, 1500);
        // Simulate form submission
    });

    // Add hover effects to service cards
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Typing effect for hero subtitle
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
            const originalText = heroSubtitle.textContent;
            setTimeout(() => {
                typeWriter(heroSubtitle, originalText, 150);
            }, 1000);
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

    const successModal = document.getElementById('successModal');
            const closeModalBtn = document.getElementById('closeModalBtn');
            const okButton = document.getElementById('okButton');
            const showModalBtn = document.getElementById('showModalBtn'); // For demonstration
            let autoHideTimeout; // To store the timeout ID

            // Initialize confetti
            const confettiSettings = { target: 'confetti-canvas', max: 80, size: 1.2, props: ['circle', 'square', 'triangle', 'line'], colors: [[165,104,246],[230,61,135],[0,199,228],[253,214,126]], clock: 25, start_from_cover: false };
            const confetti = new ConfettiGenerator(confettiSettings);

            // Function to show the modal
            function showModal() {
                successModal.style.display = 'flex'; // Show the modal
                // Trigger fade-in animations by adding classes
                successModal.querySelector('.modal-overlay').classList.add('animate-fade-in');
                successModal.querySelector('.modal-content').classList.add('animate-fade-in');

                // Start confetti
                confetti.render();

                // Set timeout to auto-hide the modal after 5 seconds
                autoHideTimeout = setTimeout(hideModal, 5000);
            }

            // Function to hide the modal
            function hideModal() {
                // Clear any existing auto-hide timeout
                clearTimeout(autoHideTimeout);

                // Trigger fade-out animations by adding classes and removing fade-in
                successModal.querySelector('.modal-overlay').classList.remove('animate-fade-in');
                successModal.querySelector('.modal-content').classList.remove('animate-fade-in');
                successModal.querySelector('.modal-overlay').classList.add('animate-fade-out');
                successModal.querySelector('.modal-content').classList.add('animate-fade-out');

                // Stop confetti
                confetti.clear();

                // Hide the modal after the animation completes
                setTimeout(() => {
                    successModal.style.display = 'none'; // Hide the modal
                    // Remove fade-out classes for next time
                    successModal.querySelector('.modal-overlay').classList.remove('animate-fade-out');
                    successModal.querySelector('.modal-content').classList.remove('animate-fade-out');
                }, 500); // Match this with the CSS animation duration
            }

            // Event listeners
            closeModalBtn.addEventListener('click', hideModal);
            okButton.addEventListener('click', hideModal); // If you want the OK button to close it too

            // Close modal when clicking outside the content box
            successModal.addEventListener('click', (event) => {
                // Check if the click target is the overlay itself, not a child of the content box
                if (event.target === successModal.querySelector('.modal-overlay')) {
                    hideModal();
                }
            });

            // For demonstration purposes: show modal when button is clicked
            // showModalBtn.addEventListener('click', showModal);
            showModal()
});