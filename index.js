/* ============================================
   WAIT FOR THE PAGE TO FULLY LOAD
============================================ */
document.addEventListener('DOMContentLoaded', function() {

    /* ============================================
       1. CLOSE MOBILE MENU WHEN A LINK IS CLICKED
    ============================================ */
    const navLinks = document.querySelectorAll('.nav-link');
    const navMenu = document.getElementById('navMenu');

    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            const bsCollapse = bootstrap.Collapse.getInstance(navMenu);
            if (bsCollapse) {
                bsCollapse.hide();
            }
        });
    });

    /* ============================================
       2. NAVBAR BACKGROUND CHANGE ON SCROLL
    ============================================ */
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });

    /* ============================================
       3. SMOOTH SCROLL FOR ANCHOR LINKS
    ============================================ */
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');

            if (targetId === '#') return;

            e.preventDefault();

            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* ============================================
       4. SCROLL ANIMATIONS (Fade in on scroll)
    ============================================ */
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(
        '.section-number, .section-title, .about-description, ' +
        '.about-stats, .tech-stack, .project-card, .gallery-item, ' +
        '.contact-title, .contact-subtitle, .contact-buttons, .social-links'
    );

    animatedElements.forEach(function(element) {
        element.classList.add('fade-up');
        observer.observe(element);
    });

    /* ============================================
       5. LIGHTBOX (Gallery Image Popup)
    ============================================ */
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const galleryItems = document.querySelectorAll('.gallery-item');

    // Open lightbox when a gallery item is clicked
    galleryItems.forEach(function(item) {
        item.addEventListener('click', function() {
            const img = item.querySelector('img');
            if (img) {
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                lightbox.classList.add('active');
            }
        });
    });

    // Close lightbox - click X button
    lightboxClose.addEventListener('click', function(e) {
        e.stopPropagation();
        lightbox.classList.remove('active');
    });

    // Close lightbox - click dark background
    lightbox.addEventListener('click', function() {
        lightbox.classList.remove('active');
    });

    // Prevent clicking the image from closing
    lightboxImg.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // Close lightbox - press Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            lightbox.classList.remove('active');
        }
    });

});