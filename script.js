(function () {
    'use strict';

    // ============================================
    // TIME-BASED THEME DETECTION
    // ============================================
    function getTimeTheme() {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) return 'morning';
        if (hour >= 12 && hour < 17) return 'afternoon';
        if (hour >= 17 && hour < 20) return 'evening';
        return 'night';
    }

    function getTimeGreeting() {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) return { greeting: 'Good Morning', icon: '🌅' };
        if (hour >= 12 && hour < 17) return { greeting: 'Good Afternoon', icon: '☀️' };
        if (hour >= 17 && hour < 20) return { greeting: 'Good Evening', icon: '🌇' };
        return { greeting: 'Good Night', icon: '🌙' };
    }

    // ============================================
    // SMOOTH SUN / MOON POSITIONING
    // ============================================
    function updateCelestialPosition() {
        const now = new Date();
        const hour = now.getHours();
        const minute = now.getMinutes();
        const totalMinutes = hour * 60 + minute;

        let topPercent, leftPercent;
        const celestialBody = document.getElementById('celestialBody');
        const sunRays = document.getElementById('sunRays');

        if (hour >= 5 && hour < 20) {
            // Sun arc: from 5:00 (left) to 20:00 (right)
            const startMin = 5 * 60;      // 300
            const endMin = 20 * 60;       // 1200
            const progress = (totalMinutes - startMin) / (endMin - startMin); // 0 to 1
            // Left: 10% to 90%
            leftPercent = 10 + progress * 80;
            // Top: high arc (low percent = higher on screen)
            // Parabolic: starts low (80%), peaks at noon (20%), ends low (80%)
            const noonProgress = Math.abs(progress - 0.5) * 2; // 0 at noon, 1 at edges
            topPercent = 20 + noonProgress * 60; // 20% (top) at noon, 80% (bottom) at sunrise/sunset
        } else {
            // Moon path (night): 20:00 to 5:00
            let nightProgress;
            if (hour >= 20) {
                // 20:00 - 23:59
                const startMin = 20 * 60;       // 1200
                const endMin = 24 * 60;         // 1440
                nightProgress = (totalMinutes - startMin) / (endMin - startMin); // 0 to 1
            } else {
                // 0:00 - 4:59
                const startMin = 0;
                const endMin = 5 * 60;          // 300
                nightProgress = totalMinutes / endMin; // 0 to 1
            }
            // Moon moves from left (0%) to right (100%) across the night
            leftPercent = 10 + nightProgress * 80;
            // Moon arc: highest around midnight (progress ~0.5)
            const midProgress = Math.abs(nightProgress - 0.5) * 2;
            topPercent = 20 + midProgress * 55; // 20% (high) at midnight, 75% at edges
        }

        // Apply positions
        if (celestialBody) {
            celestialBody.style.top = topPercent + '%';
            celestialBody.style.left = leftPercent + '%';
        }
        if (sunRays) {
            sunRays.style.top = topPercent + '%';
            sunRays.style.left = leftPercent + '%';
        }
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
            setTimeout(() => {
                if (document.body.dataset.currentTheme !== 'night') {
                    clearStars();
                }
            }, 1000);
        }
    }

    // ============================================
    // APPLY THEME (called on load and every hour)
    // ============================================
    function applyTheme() {
        const theme = getTimeTheme();
        const { greeting, icon } = getTimeGreeting();

        // Remove all theme classes
        document.body.classList.remove('theme-morning', 'theme-afternoon', 'theme-evening', 'theme-night');
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

        // Immediately update celestial position (so it's correct when theme changes)
        updateCelestialPosition();
    }

    // ============================================
    // MOBILE NAVIGATION
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

    allNavLinks.forEach(function (link) {
        link.addEventListener('click', closeNav);
    });

    document.addEventListener('click', function (e) {
        if (navLinks.classList.contains('open') &&
            !navLinks.contains(e.target) &&
            !navToggle.contains(e.target)) {
            closeNav();
        }
    });

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
    fadeElements.forEach(function (el) { el.classList.add('fade-in'); });

    const observerOptions = { root: null, rootMargin: '0px 0px -40px 0px', threshold: 0.1 };
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    fadeElements.forEach(function (el) { observer.observe(el); });

    // ============================================
    // BACK TO TOP & LOGO
    // ============================================
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        backToTop.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            closeNav();
        });
    }

    const navLogo = document.querySelector('.nav-logo');
    if (navLogo) {
        navLogo.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            closeNav();
        });
    }

    // ============================================
    // SET CURRENT YEAR
    // ============================================
    const yearEl = document.getElementById('currentYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // ============================================
    // INITIALIZATION & CONTINUOUS UPDATES
    // ============================================
    function init() {
        applyTheme();
        updateActiveNavLink();
        updateCelestialPosition();

        // Update celestial position every minute
        setInterval(updateCelestialPosition, 60000);

        // Re‑check theme every 2 minutes (to catch hour changes)
        setInterval(function () {
            const currentTheme = document.body.dataset.currentTheme;
            const newTheme = getTimeTheme();
            if (currentTheme !== newTheme) {
                applyTheme();
            }
        }, 120000);

        // Also check at the start of each hour
        function scheduleHourCheck() {
            const now = new Date();
            const msToNextHour = (60 - now.getMinutes()) * 60 * 1000 - now.getSeconds() * 1000 - now.getMilliseconds();
            setTimeout(function () {
                applyTheme();
                scheduleHourCheck();
            }, msToNextHour + 1000);
        }
        scheduleHourCheck();
    }

    window.addEventListener('scroll', updateActiveNavLink, { passive: true });

    let resizeTimeout;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(updateActiveNavLink, 200);
    });

    init();

    console.log('🌅 Portfolio ready! Continuous sun/moon movement active.');
    console.log('📍 Manisha E — Java Full Stack Developer | Chennai, India');
})();
