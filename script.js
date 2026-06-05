(function () {
    "use strict";

    /* ========================================
       THEME / SKY CONFIG
       ======================================== */
    const THEMES = ["morning", "afternoon", "evening", "night"];
    let manualTheme = null;

    // Sun visible: 5:30 → 18:30  (rises left→arc→right)
    // Moon visible: 18:30 → 5:30 (rises left→arc→right)
    const SUN_RISE_HOUR = 5.5;   // 5:30 AM
    const SUN_SET_HOUR = 18.5;   // 6:30 PM
    const MOON_RISE_HOUR = 18.5; // 6:30 PM  
    const MOON_SET_HOUR = 5.5;   // 5:30 AM

    /* ---- helpers ---- */
    function hourNow() {
        const d = new Date();
        return d.getHours() + d.getMinutes() / 60;
    }

    function themeForHour(h) {
        if (h >= 5 && h < 12) return "morning";
        if (h >= 12 && h < 17) return "afternoon";
        if (h >= 17 && h < 20) return "evening";
        return "night";
    }

    function greetingForTheme(t) {
        return {
            morning: "Good Morning ☀️",
            afternoon: "Good Afternoon 🌤️",
            evening: "Good Evening 🌇",
            night: "Good Night 🌙",
        }[t];
    }

    function iconForTheme(t) {
        return { morning: "🌅", afternoon: "☀️", evening: "🌇", night: "🌙" }[t];
    }

    /* ---- celestial arc position ----
       Given the current hour and the rise/set hours,
       compute a progress 0→1 (left→right) and map
       onto a smooth parabolic arc. */
    function celestialPos(currentHour, riseH, setH) {
        let duration, elapsed;

        if (riseH < setH) {
            // simple case: rise and set same day
            duration = setH - riseH;
            elapsed = currentHour - riseH;
        } else {
            // wraps midnight
            duration = 24 - riseH + setH;
            elapsed = currentHour >= riseH
                ? currentHour - riseH
                : currentHour + 24 - riseH;
        }

        let progress = elapsed / duration;
        progress = Math.max(0, Math.min(1, progress));

        // X: 5% → 95%
        const x = 5 + progress * 90;

        // Y: parabolic arc — highest at midpoint
        // At edges (0,1) → bottom; at 0.5 → top
        const maxHeight = 78; // % from top of sky the peak reaches (lower = higher on screen)
        const minHeight = 10; // peak Y %
        const parabola = 4 * progress * (1 - progress); // 0→1→0
        const y = maxHeight - parabola * (maxHeight - minHeight);

        return { x, y, progress, visible: progress > 0 && progress < 1 };
    }

    function isSunUp(h) {
        return h >= SUN_RISE_HOUR && h <= SUN_SET_HOUR;
    }

    function isMoonUp(h) {
        return h >= MOON_RISE_HOUR || h <= MOON_SET_HOUR;
    }

    /* ========================================
       APPLY THEME + POSITION CELESTIALS
       ======================================== */
    const $body = document.body;
    const $sun = document.getElementById("sun");
    const $moon = document.getElementById("moon");
    const $horizonGlow = document.getElementById("horizonGlow");
    const $greeting = document.getElementById("greeting");
    const $timeIcon = document.getElementById("timeIcon");
    const $timeText = document.getElementById("timeText");
    const $timeLabel = document.getElementById("timeLabel");
    const $themeBtn = document.getElementById("themeBtn");

    function applyAll() {
        const h = manualTheme !== null ? fakeHourForTheme(manualTheme) : hourNow();
        const theme = manualTheme || themeForHour(h);

        $body.setAttribute("data-theme", theme);

        // Greeting & badge
        if ($greeting) $greeting.textContent = greetingForTheme(theme);
        if ($timeIcon) $timeIcon.textContent = iconForTheme(theme);
        if ($timeLabel) $timeLabel.textContent = theme.charAt(0).toUpperCase() + theme.slice(1);
        if ($timeText) {
            $timeText.textContent = new Date().toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
            });
        }

        // Theme toggle icon
        const btnIcon = $themeBtn?.querySelector("i");
        if (btnIcon) {
            btnIcon.className = {
                morning: "fas fa-sun",
                afternoon: "fas fa-cloud-sun",
                evening: "fas fa-cloud-moon",
                night: "fas fa-moon",
            }[theme];
        }

        positionCelestials(h);
    }

    function fakeHourForTheme(t) {
        return { morning: 8, afternoon: 14, evening: 18, night: 23 }[t];
    }

    function positionCelestials(h) {
        /* --- SUN --- */
        if (isSunUp(h)) {
            const pos = celestialPos(h, SUN_RISE_HOUR, SUN_SET_HOUR);
            $sun.style.left = pos.x + "%";
            $sun.style.top = pos.y + "%";
            $sun.style.opacity = 1;
            $sun.style.transform = "translate(-50%,-50%)";

            // Near horizon → enlarge & redden effect via CSS variables already handled by theme
            // Horizon glow follows sun horizontally
            $horizonGlow.style.setProperty("--glow-x", pos.x + "%");

            // Scale sun bigger near horizon
            const horizonScale = 1 + (1 - Math.sin(pos.progress * Math.PI)) * 0.5;
            $sun.style.transform = `translate(-50%,-50%) scale(${horizonScale})`;
        } else {
            $sun.style.opacity = 0;
        }

        /* --- MOON --- */
        if (isMoonUp(h)) {
            const pos = celestialPos(h, MOON_RISE_HOUR, MOON_SET_HOUR);
            $moon.style.left = pos.x + "%";
            $moon.style.top = pos.y + "%";
            $moon.style.opacity = 1;
            $moon.style.transform = "translate(-50%,-50%)";

            $horizonGlow.style.setProperty("--glow-x", pos.x + "%");
        } else {
            $moon.style.opacity = 0;
        }
    }

    // Manual theme cycling
    let manualIdx = -1;
    $themeBtn?.addEventListener("click", () => {
        manualIdx = (manualIdx + 1) % THEMES.length;
        manualTheme = THEMES[manualIdx];
        applyAll();
    });

    /* ========================================
       STARS
       ======================================== */
    function createStars() {
        const c = document.getElementById("stars");
        if (!c) return;
        for (let i = 0; i < 160; i++) {
            const s = document.createElement("div");
            s.className = "star twinkle";
            const size = Math.random() * 2.5 + 0.5;
            s.style.cssText = `
                width:${size}px;height:${size}px;
                top:${Math.random() * 75}%;
                left:${Math.random() * 100}%;
                --dur:${(Math.random() * 4 + 2).toFixed(1)}s;
                --del:${(Math.random() * 6).toFixed(1)}s;
            `;
            c.appendChild(s);
        }
    }

    /* ========================================
       SHOOTING STARS (night / evening only)
       ======================================== */
    function launchShootingStar() {
        const theme = $body.getAttribute("data-theme");
        if (theme !== "night" && theme !== "evening") return;

        const c = document.getElementById("shootingStars");
        if (!c) return;
        const s = document.createElement("div");
        s.className = "shooting-star";
        s.style.top = Math.random() * 40 + "%";
        s.style.left = Math.random() * 60 + "%";
        c.appendChild(s);

        requestAnimationFrame(() => s.classList.add("fly"));
        setTimeout(() => s.remove(), 1400);
    }
    setInterval(launchShootingStar, 5000);

    /* ========================================
       TREES (landscape detail)
       ======================================== */
    function createTrees() {
        const c = document.getElementById("trees");
        if (!c) return;
        for (let i = 0; i < 30; i++) {
            const t = document.createElement("div");
            t.className = "tree-shape";
            const h = Math.random() * 18 + 10;
            const w = h * 0.7;
            t.style.left = Math.random() * 100 + "%";
            t.innerHTML = `
                <div class="tree-trunk" style="width:${w * 0.18}px;height:${h * 0.4}px;"></div>
                <div class="tree-top" style="border-left-width:${w / 2}px;border-right-width:${w / 2}px;border-bottom-width:${h * 0.65}px;"></div>
            `;
            c.appendChild(t);
        }
    }

    /* ========================================
       NAVIGATION
       ======================================== */
    const $nav = document.getElementById("nav");
    const $menuBtn = document.getElementById("menuBtn");
    const $navLinks = document.getElementById("navLinks");
    const navAnchors = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {
        $nav.classList.toggle("scrolled", window.scrollY > 50);
    });

    $menuBtn?.addEventListener("click", () => {
        $menuBtn.classList.toggle("open");
        $navLinks.classList.toggle("open");
    });

    navAnchors.forEach((a) => {
        a.addEventListener("click", () => {
            $menuBtn?.classList.remove("open");
            $navLinks?.classList.remove("open");
        });
    });

    // Active link on scroll
    function updateActive() {
        const secs = document.querySelectorAll(".sec");
        const scrollY = window.scrollY + 200;
        secs.forEach((sec) => {
            const id = sec.id;
            if (scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight) {
                navAnchors.forEach((a) => {
                    a.classList.toggle("active", a.dataset.sec === id);
                });
            }
        });
    }
    window.addEventListener("scroll", updateActive);

    // Close menu on outside click
    document.addEventListener("click", (e) => {
        if (
            $navLinks?.classList.contains("open") &&
            !$navLinks.contains(e.target) &&
            !$menuBtn.contains(e.target)
        ) {
            $menuBtn.classList.remove("open");
            $navLinks.classList.remove("open");
        }
    });

    /* ========================================
       SMOOTH SCROLL
       ======================================== */
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
        a.addEventListener("click", (e) => {
            e.preventDefault();
            const target = document.querySelector(a.getAttribute("href"));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: "smooth",
                });
            }
        });
    });

    /* ========================================
       SCROLL REVEAL
       ======================================== */
    function initReveal() {
        const els = document.querySelectorAll(".fade-up");
        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((en, i) => {
                    if (en.isIntersecting) {
                        setTimeout(() => en.target.classList.add("visible"), i * 80);
                        obs.unobserve(en.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
        );
        els.forEach((el) => obs.observe(el));
    }

    /* ========================================
       SKILL BARS
       ======================================== */
    function initBars() {
        const items = document.querySelectorAll(".bar-item");
        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((en) => {
                    if (en.isIntersecting) {
                        const el = en.target;
                        el.classList.add("show");
                        const pct = el.dataset.pct;
                        const fill = el.querySelector(".bar-fill");
                        setTimeout(() => {
                            if (fill) fill.style.width = pct + "%";
                        }, 150);
                        obs.unobserve(el);
                    }
                });
            },
            { threshold: 0.25 }
        );
        items.forEach((el) => obs.observe(el));
    }

    /* ========================================
       COUNTER ANIMATION
       ======================================== */
    function initCounters() {
        const nums = document.querySelectorAll(".stat-num");
        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((en) => {
                    if (en.isIntersecting) {
                        const el = en.target;
                        const target = parseInt(el.dataset.target, 10);
                        const dur = 1800;
                        const start = performance.now();

                        function tick(now) {
                            const p = Math.min((now - start) / dur, 1);
                            const ease = 1 - Math.pow(1 - p, 3);
                            el.textContent = Math.round(ease * target);
                            if (p < 1) requestAnimationFrame(tick);
                        }
                        requestAnimationFrame(tick);
                        obs.unobserve(el);
                    }
                });
            },
            { threshold: 0.5 }
        );
        nums.forEach((el) => obs.observe(el));
    }

    /* ========================================
       TYPING EFFECT
       ======================================== */
    function initTyping() {
        const el = document.getElementById("roleText");
        if (!el) return;
        const text = el.textContent;
        el.textContent = "";
        el.style.borderRight = "2px solid var(--accent)";
        let i = 0;
        function type() {
            if (i < text.length) {
                el.textContent += text[i++];
                setTimeout(type, 55);
            } else {
                setTimeout(() => (el.style.borderRight = "none"), 1800);
            }
        }
        setTimeout(type, 1200);
    }

    /* ========================================
       CONTACT FORM
       ======================================== */
    document.getElementById("contactForm")?.addEventListener("submit", (e) => {
        e.preventDefault();
        const btn = e.target.querySelector(".btn");
        const orig = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        btn.disabled = true;
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-check"></i> Sent!';
            btn.style.background = "linear-gradient(135deg,#4caf50,#45a049)";
            setTimeout(() => {
                btn.innerHTML = orig;
                btn.style.background = "";
                btn.disabled = false;
                e.target.reset();
            }, 2500);
        }, 1200);
    });

    /* ========================================
       KEYBOARD: T = toggle theme, Esc = close menu
       ======================================== */
    document.addEventListener("keydown", (e) => {
        if (
            (e.key === "t" || e.key === "T") &&
            !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)
        ) {
            manualIdx = (manualIdx + 1) % THEMES.length;
            manualTheme = THEMES[manualIdx];
            applyAll();
        }
        if (e.key === "Escape") {
            $menuBtn?.classList.remove("open");
            $navLinks?.classList.remove("open");
        }
    });

    /* ========================================
       TICK — update clock + positions every second
       ======================================== */
    function tick() {
        if (manualTheme === null) {
            // auto mode: real time
            applyAll();
        } else {
            // manual mode: just update clock display
            if ($timeText) {
                $timeText.textContent = new Date().toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                });
            }
        }
    }

    /* ========================================
       INIT
       ======================================== */
    createStars();
    createTrees();
    applyAll();
    initReveal();
    initBars();
    initCounters();
    initTyping();

    // Update every second for smooth celestial movement
    setInterval(tick, 1000);
})();
