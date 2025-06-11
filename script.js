// Fade-in effect for sections
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.content-section');
    const reveal = () => {
        const trigger = window.innerHeight * 0.85;
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < trigger) {
                section.classList.add('visible');
            }
        });
    };
    window.addEventListener('scroll', reveal);
    reveal();
});

// Simple form handler for demonstration
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for contacting Rageni Resort!');
    this.reset();
});