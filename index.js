document.addEventListener('DOMContentLoaded', function() {

    // mobile collapse
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

//    navbar background scroll
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });

    // anchor link scroll
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
        // scroll animations
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
    // gallery pop up
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const galleryItems = document.querySelectorAll('.gallery-item, .design-item');

    // open lightbox when a gallery item is clicked
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

    // close lightbox 
    lightboxClose.addEventListener('click', function(e) {
        e.stopPropagation();
        lightbox.classList.remove('active');
    });

    // close lightbox  dark background
    lightbox.addEventListener('click', function() {
        lightbox.classList.remove('active');
    });

    // stop clicking the image from closing
    lightboxImg.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // close lightbox by pressing escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            lightbox.classList.remove('active');
        }
    });
    // Email template carousel
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');

    let currentSlide = 0;

    function goToSlide(index) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');

        currentSlide = index;

        if (currentSlide >= slides.length) currentSlide = 0;
        if (currentSlide < 0) currentSlide = slides.length - 1;

        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    prevBtn.addEventListener('click', function() {
        goToSlide(currentSlide - 1);
    });

    nextBtn.addEventListener('click', function() {
        goToSlide(currentSlide + 1);
    });

    dots.forEach(function(dot, index) {
        dot.addEventListener('click', function() {
            goToSlide(index);
        });
    });
});