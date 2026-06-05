(function () {
    'use strict';

    // ============================================
    // TIME-BASED THEME DETECTION
    // ============================================
    function getTimeTheme() {
        const hour = new Date().getHours();

        if (hour >= 5 && hour < 12) {
            return 'morning';
        } else if (hour >= 12 && hour < 17) {
            return 'afternoon';
        } else if (hour >= 17 && hour < 20) {
            return 'evening';
        } else {
            return 'night';
        }
    }

    function getTimeGreeting() {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) return { greeting: 'Good Morning', icon: '🌅' };
        if (hour >= 12 && hour < 17) return { greeting: 'Good Afternoon', icon: '☀️' };
        if (hour >= 17 && hour < 20) return { greeting: 'Good Evening', icon: '🌇' };
        return { greeting: 'Good Night', icon: '🌙' };
    }

    function applyTheme() {
        const theme = getTimeTheme();
        const { greeting, icon } = getTimeGreeting();

        // Remove all theme classes
        document.body.classList.remove('theme-morning', 'theme-afternoon', 'theme-evening', 'theme-night');
        // Add current theme class
        document.body.classList.add('theme-' + theme);

        // Update greeting
        const greetingEl = document.getElementById('timeGreeting');
        const iconEl = document.getElementById('timeIcon');
        if (greetingEl) greetingEl.textContent = greeting;
        if (iconEl) iconEl.textContent = icon;

        // Manage stars
        manageStars(theme);

        // Store current theme
        document.body.dataset.currentTheme = theme;
    }

    // ============================================
    // STARS GENERATION (Night Theme)
    // ============================================
    let starsGenerated = false;
    const starsContainer = document.getElementById('starsContainer');

    function generateStars() {
        if (starsGenerated) return;
        starsContainer.innerHTML = '';
        const fragment = document.createDocumentFragment();
        const starCount = 120;

        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.classList.add('star-dot');
            const size = Math.random() * 3 + 1;
            star.style.width = size + 'px';
            star.style.height = size + 'px';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.setProperty('--twinkle-duration', (Math.random() * 3 + 2) + 's');
            star.style.setProperty('--twinkle-delay', (Math.random() * 4) + 's');
            star.style.opacity = Math.random() * 0.6 + 0.2;
            fragment.appendChild(star);
        }

        starsContainer.appendChild(fragment);
        starsGenerated = true;
    }

    function clearStars() {
        starsContainer.innerHTML = '';
        starsGenerated = false;
    }

    function manageStars(theme) {
        if (theme === 'night') {
            generateStars();
            starsContainer.style.opacity = '1';
        } else {
            starsContainer.style.opacity = '0';
            // Clear after transition
            setTimeout(() => {
                if (document.body.dataset.currentTheme !== 'night') {
                    clearStars();
                }
            }, 1000);
        }
    }

    // ============================================
    // MOBILE NAVIGATION TOGGLE
    // ============================================
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const allNavLinks = document.querySelectorAll('.nav-link');

    function closeNav() {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
        document.body.style.overflow = '';
    }

    function openNav() {
        navLinks.classList.add('open');
        navToggle.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    navToggle.addEventListener('click', function () {
        if (navLinks.classList.contains('open')) {
            closeNav();
        } else {
            openNav();
        }
    });

    // Close nav when a link is clicked
    allNavLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            closeNav();
        });
    });

    // Close nav when clicking outside
    document.addEventListener('click', function (e) {
        if (navLinks.classList.contains('open') &&
            !navLinks.contains(e.target) &&
            !navToggle.contains(e.target)) {
            closeNav();
        }
    });

    // Close nav on Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && navLinks.classList.contains('open')) {
            closeNav();
        }
    });

    // ============================================
    // ACTIVE NAV LINK HIGHLIGHT ON SCROLL
    // ============================================
    const sections = document.querySelectorAll('.section[id], .hero[id]');
    const navLinkElements = document.querySelectorAll('.nav-link');

    function updateActiveNavLink() {
        let currentSectionId = '';
        const scrollPos = window.scrollY + 100;

        sections.forEach(function (section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinkElements.forEach(function (link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSectionId) {
                link.classList.add('active');
            }
        });
    }

    // ============================================
    // FADE-IN ON SCROLL (Intersection Observer)
    // ============================================
    const fadeElements = document.querySelectorAll(
        '.card, .section-title, .about-text, .timeline-item, .achievement-card, .cert-card, .contact-item, .highlight-item, .education-card'
    );

    // Add fade-in class to elements
    fadeElements.forEach(function (el) {
        el.classList.add('fade-in');
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.1,
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: unobserve after becoming visible
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(function (el) {
        observer.observe(el);
    });

    // ============================================
    // SMOOTH SCROLL FOR BACK-TO-TOP
    // ============================================
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        backToTop.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            closeNav();
        });
    }

    // ============================================
    // NAV LOGO CLICK - SCROLL TO TOP
    // ============================================
    const navLogo = document.querySelector('.nav-logo');
    if (navLogo) {
        navLogo.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            closeNav();
        });
    }

    // ============================================
    // SET CURRENT YEAR IN FOOTER
    // ============================================
    const yearEl = document.getElementById('currentYear');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // ============================================
    // INITIALIZATION
    // ============================================
    function init() {
        applyTheme();
        updateActiveNavLink();
    }

    // ============================================
    // EVENT LISTENERS
    // ============================================
    window.addEventListener('scroll', function () {
        updateActiveNavLink();
    }, { passive: true });

    // Check theme every 2 minutes (in case time boundary is crossed)
    setInterval(function () {
        const currentTheme = document.body.dataset.currentTheme;
        const newTheme = getTimeTheme();
        if (currentTheme !== newTheme) {
            applyTheme();
        }
    }, 120000); // 2 minutes

    // Also check at the top of each hour boundary
    function scheduleHourCheck() {
        const now = new Date();
        const msToNextHour = (60 - now.getMinutes()) * 60 * 1000 - now.getSeconds() * 1000 - now.getMilliseconds();
        setTimeout(function () {
            applyTheme();
            scheduleHourCheck(); // Schedule next check
        }, msToNextHour + 1000); // 1 second past the hour
    }
    scheduleHourCheck();

    // Handle window resize for responsive adjustments
    let resizeTimeout;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function () {
            updateActiveNavLink();
        }, 200);
    });

    // Initialize everything
    init();

    console.log('🌅 Portfolio ready! Current theme:', getTimeTheme().toUpperCase());
    console.log('📍 Manisha E — Java Full Stack Developer | Chennai, India');
})();
