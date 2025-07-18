              // Navigation functionality
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
            } else {
                header.classList.remove('scrolled');
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
            
            // Simulate form submission
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
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

        // Enhanced scroll animations with stagger effect
        function addStaggerAnimation() {
            const animateElements = document.querySelectorAll('.animate-on-scroll');
            
            animateElements.forEach((element, index) => {
                element.style.transitionDelay = `${index * 0.1}s`;
            });
        }

        // Initialize stagger animations
        addStaggerAnimation();

        // Performance optimization: Throttle scroll events
        function throttle(func, limit) {
            let inThrottle;
            return function() {
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