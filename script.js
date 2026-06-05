// ========================================
// CYBER PORTFOLIO JAVASCRIPT
// ========================================

document.addEventListener("DOMContentLoaded", () => {

    // ============================
    // MOBILE MENU TOGGLE
    // ============================

    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");

    if (menuBtn) {
        menuBtn.addEventListener("click", () => {
            navLinks.classList.toggle("active");

            menuBtn.innerHTML =
                navLinks.classList.contains("active")
                    ? "✕"
                    : "☰";
        });
    }

    // Close menu when clicking nav item

    document.querySelectorAll(".nav-links a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");

            if (menuBtn) {
                menuBtn.innerHTML = "☰";
            }

        });

    });

    // ============================
    // SCROLL REVEAL ANIMATION
    // ============================

    const revealElements = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("active");

                }

            });

        },
        {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });

    // ============================
    // ACTIVE NAVBAR LINK
    // ============================

    const sections = document.querySelectorAll("section[id]");
    const navItems = document.querySelectorAll(".nav-links a");

    function updateActiveNav() {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }

        });

        navItems.forEach(link => {

            link.classList.remove("active-link");

            const href = link.getAttribute("href");

            if (href === `#${currentSection}`) {
                link.classList.add("active-link");
            }

        });
    }

    updateActiveNav();

    window.addEventListener("scroll", updateActiveNav);

    // ============================
    // NAVBAR SCROLL EFFECT
    // ============================

    const navbar = document.querySelector(".navbar");

    function navbarScrollEffect() {

        if (window.scrollY > 50) {

            navbar.style.background =
                "rgba(7,11,20,.98)";

            navbar.style.boxShadow =
                "0 5px 30px rgba(0,0,0,.25)";

        } else {

            navbar.style.background =
                "rgba(7,11,20,.92)";

            navbar.style.boxShadow =
                "none";
        }
    }

    window.addEventListener("scroll", navbarScrollEffect);

    navbarScrollEffect();

    // ============================
    // SMOOTH BUTTON HOVER GLOW
    // ============================

    const buttons = document.querySelectorAll(".btn");

    buttons.forEach(button => {

        button.addEventListener("mousemove", (e) => {

            const rect = button.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            button.style.setProperty("--x", `${x}px`);
            button.style.setProperty("--y", `${y}px`);

        });

    });

    // ============================
    // SKILL BADGE STAGGER EFFECT
    // ============================

    const badges = document.querySelectorAll(".badges span");

    badges.forEach((badge, index) => {

        badge.style.transitionDelay =
            `${index * 40}ms`;

    });

    // ============================
    // SCROLL PROGRESS BAR
    // ============================

    const progressBar = document.createElement("div");

    progressBar.id = "scroll-progress";

    document.body.appendChild(progressBar);

    function updateScrollProgress() {

        const scrollTop =
            document.documentElement.scrollTop;

        const scrollHeight =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        const progress =
            (scrollTop / scrollHeight) * 100;

        progressBar.style.width =
            `${progress}%`;
    }

    window.addEventListener(
        "scroll",
        updateScrollProgress
    );

    updateScrollProgress();

    // ============================
    // HERO PARALLAX EFFECT
    // ============================

    const hero = document.querySelector(".hero");

    function heroParallax() {

        if (!hero) return;

        const scrolled = window.pageYOffset;

        hero.style.transform =
            `translateY(${scrolled * 0.15}px)`;
    }

    window.addEventListener(
        "scroll",
        heroParallax
    );

    // ============================
    // FADE IN CARDS
    // ============================

    const cards = document.querySelectorAll(
        ".skill-card, .achievement-card, .stat-box"
    );

    const cardObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";
                }

            });

        },
        {
            threshold: 0.1
        }
    );

    cards.forEach((card, index) => {

        card.style.opacity = "0";

        card.style.transform =
            "translateY(30px)";

        card.style.transition =
            `all .7s ease ${index * 0.08}s`;

        cardObserver.observe(card);

    });

});

// ========================================
// SCROLL TO TOP BUTTON
// ========================================

const scrollTopBtn = document.createElement("button");

scrollTopBtn.innerHTML = "↑";

scrollTopBtn.id = "scrollTopBtn";

document.body.appendChild(scrollTopBtn);

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        scrollTopBtn.classList.add("show");

    } else {

        scrollTopBtn.classList.remove("show");
    }

});

scrollTopBtn.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});
