document.addEventListener('DOMContentLoaded', () => {
    // Mobile navigation toggle
    const toggleBtn = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Swap icon between bars and times (using simple text/unicode for now, or FontAwesome if added)
            // If using standard unicode:
            if (navLinks.classList.contains('active')) {
                toggleBtn.innerHTML = '&#10005;'; // X mark
            } else {
                toggleBtn.innerHTML = '&#9776;'; // Hamburger
            }
        });
    }

    // Close mobile nav when clicking a link
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                toggleBtn.innerHTML = '&#9776;';
            }
        });
    });

    // Scroll reveal animation
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    // Trigger once on load
    revealOnScroll();

    // Active link highlighting depending on current page
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    links.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.style.color = 'var(--primary)';
        }
    });

    // Vanta.js Background Initialization
    const vantaContainer = document.getElementById('vanta-bg');
    if (vantaContainer && typeof VANTA !== 'undefined') {
        VANTA.NET({
            el: "#vanta-bg",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x8b5cf6, // Primary purple
            backgroundColor: 0x0f1115, // Match dark background
            points: 12.00,
            maxDistance: 22.00,
            spacing: 18.00
        });
    }

    // Lightbox Functionality
    const galleryItems = document.querySelectorAll('.gallery-item img');
    if (galleryItems.length > 0) {
        const lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        document.body.appendChild(lightbox);

        galleryItems.forEach(image => {
            image.addEventListener('click', e => {
                lightbox.classList.add('active');
                const img = document.createElement('img');
                img.src = image.src;
                while (lightbox.firstChild) {
                    lightbox.removeChild(lightbox.firstChild);
                }
                lightbox.appendChild(img);
            });
        });

        lightbox.addEventListener('click', e => {
            if (e.target !== e.currentTarget) return;
            lightbox.classList.remove('active');
        });
    }
});
