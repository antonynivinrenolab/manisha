// ==========================================================================
// CORE SYSTEM TELEMETRY AND ENGINE INITIALIZATION
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
    
    // Core Component Registry
    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");
    const navbar = document.querySelector(".navbar");
    const scrollTopBtn = document.getElementById("scrollTopBtn");
    const scrollProgress = document.getElementById("scroll-progress");
    const themeBadge = document.getElementById("current-theme-badge");

    // Initialize Chrono-Theming Engine
    evaluateChronoTheme(themeBadge);
    // Poll the timing signature engine every 60 seconds for absolute theme consistency
    setInterval(() => evaluateChronoTheme(themeBadge), 60000);

    // Initialize 3D Particle Constellation Engine
    initializeAmbientPhysicsEngine();

    // ==========================================================================
    // RESPONSIVE MENU AND NAVIGATION INTERACTION CONTROLLERS
    // ==========================================================================
    if (menuBtn && navLinks) {
        menuBtn.addEventListener("click", () => {
            menuBtn.classList.toggle("open-menu-state");
            navLinks.classList.toggle("open-menu-state");
        });
    }

    // Capture standard anchor navigation requests to gracefully dismiss responsive menus
    document.querySelectorAll(".nav-links a").forEach(anchor => {
        anchor.addEventListener("click", () => {
            if (menuBtn && navLinks) {
                menuBtn.classList.remove("open-menu-state");
                navLinks.classList.remove("open-menu-state");
            }
        });
    });

    // ==========================================================================
    // SCROLL TELEMETRY ENGINE (ACTIVE LINKS, PROGRESS, FOOTER INTERACTION)
    // ==========================================================================
    const trackingSections = document.querySelectorAll("section[id]");
    const targetNavItems = document.querySelectorAll(".nav-links a");

    function executeScrollTelemetryPipeline() {
        const currentScrollY = window.scrollY;

        // 1. Navbar Glass Density Shifting
        if (currentScrollY > 50) {
            navbar.classList.add("scrolled-mode");
        } else {
            navbar.classList.remove("scrolled-mode");
        }

        // 2. Floating Action Button Viewport Realization
        if (currentScrollY > 600) {
            scrollTopBtn.classList.add("reveal-active-btn");
        } else {
            scrollTopBtn.classList.remove("reveal-active-btn");
        }

        // 3. Real-time Viewport Progress Computation
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        if (docHeight > 0) {
            const calculatedProgress = (currentScrollY / docHeight) * 100;
            scrollProgress.style.width = `${calculatedProgress}%`;
        }

        // 4. Track Element Intersections to Update Navigation Bar Highlights
        let focusSectionId = "";
        trackingSections.forEach(section => {
            const boundaryOffsetTop = section.offsetTop - 160;
            const contextHeight = section.offsetHeight;
            if (currentScrollY >= boundaryOffsetTop && currentScrollY < boundaryOffsetTop + contextHeight) {
                focusSectionId = section.getAttribute("id");
            }
        });

        targetNavItems.forEach(item => {
            item.classList.remove("active-link-indicator");
            const structuralHref = item.getAttribute("href");
            if (structuralHref === `#${focusSectionId}`) {
                item.classList.add("active-link-indicator");
            }
        });
    }

    window.addEventListener("scroll", executeScrollTelemetryPipeline, { passive: true });
    executeScrollTelemetryPipeline(); // Execution pass to capture entry metrics

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // ==========================================================================
    // SYNCHRONIZED INTERSECTION OBSERVER FOR TRANSITION REVEALS
    // ==========================================================================
    const revealElements = document.querySelectorAll(".reveal");
    const sequentialCardClusters = document.querySelectorAll(".skill-matrix-card, .achievement-interactive-card, .metric-glass-tile");

    const layoutRevealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("synchronized-reveal-active");
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

    revealElements.forEach(element => layoutRevealObserver.observe(element));

    // Stagger animation delays automatically across modular grid cards
    sequentialCardClusters.forEach((card, cursorIndex) => {
        card.style.transition = "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
        card.style.transitionDelay = `${(cursorIndex % 4) * 75}ms`;
    });

    // ==========================================================================
    // RECRUITER ACQUISITION CLIPBOARD SUB-SYSTEM
    // ==========================================================================
    const copyTriggers = document.querySelectorAll("[data-copy-target]");
    copyTriggers.forEach(trigger => {
        trigger.addEventListener("click", () => {
            const extractionValue = trigger.getAttribute("data-copy-target");
            const visualLabel = trigger.querySelector(".copy-action-trigger");
            const priorLabelString = visualLabel.textContent;

            navigator.clipboard.writeText(extractionValue).then(() => {
                visualLabel.textContent = "Copied!";
                visualLabel.style.background = "#00ff66";
                visualLabel.style.color = "#000000";

                setTimeout(() => {
                    visualLabel.textContent = priorLabelString;
                    visualLabel.style.background = "";
                    visualLabel.style.color = "";
                }, 2000);
            }).catch(err => {
                console.error("Clipboard ingestion pipeline failure: ", err);
            });
        });
    });
});

// ==========================================================================
// CHRONO-THEME EVALUATION PIPELINE
// ==========================================================================
function evaluateChronoTheme(visualBadge) {
    const structuralDate = new Date();
    const metricHour = structuralDate.getHours();
    const targetedTarget = document.documentElement;
    let selectedTheme = "theme-night";
    let executionSignature = "Night Ops Mode";

    // Mathematical Evaluation of Structural Clock Boundaries
    if (metricHour >= 5 && metricHour < 8) {
        selectedTheme = "theme-dawn";
        executionSignature = "Dawn Phase";
    } else if (metricHour >= 8 && metricHour < 17) {
        selectedTheme = "theme-day";
        executionSignature = "Daylight Production";
    } else if (metricHour >= 17 && metricHour < 19) {
        selectedTheme = "theme-dusk";
        executionSignature = "Dusk Sequence";
    } else {
        selectedTheme = "theme-night";
        executionSignature = "Nightfall Architecture";
    }

    // Atomic Class Mutations
    targetedTarget.remove("theme-dawn", "theme-day", "theme-dusk", "theme-night");
    targetedTarget.classList.add(selectedTheme);
    
    if (visualBadge) {
        visualBadge.textContent = executionSignature;
    }
}

// ==========================================================================
// INTERACTIVE 3D PARTICLES CONSTELLATION FLUID PHYSICS ENGINE
// ==========================================================================
function initializeAmbientPhysicsEngine() {
    const hostCanvas = document.getElementById("interactive-ambient-canvas");
    if (!hostCanvas) return;
    
    const contextRender = hostCanvas.getContext("2d");
    let dynamicParticleArray = [];
    
    // Track pointer location metrics
    const pointerTelemetry = { x: null, y: null, targetProximityRadius: 160 };

    window.addEventListener("mousemove", (event) => {
        pointerTelemetry.x = event.clientX;
        pointerTelemetry.y = event.clientY;
    });

    window.addEventListener("mouseleave", () => {
        pointerTelemetry.x = null;
        pointerTelemetry.y = null;
    });

    function normalizeCanvasDimensions() {
        hostCanvas.width = window.innerWidth;
        hostCanvas.height = window.innerHeight;
    }
    normalizeCanvasDimensions();
    window.addEventListener("resize", normalizeCanvasDimensions);

    // Particle Object Core Structure
    class ArchitecturalParticle {
        constructor(widthBoundary, heightBoundary) {
            this.maxW = widthBoundary;
            this.maxH = heightBoundary;
            this.instantiateCoordinates();
            this.particleMassRadius = Math.random() * 1.5 + 0.5;
            this.driftVelocityX = (Math.random() - 0.5) * 0.4;
            this.driftVelocityY = (Math.random() - 0.5) * 0.4;
        }

        instantiateCoordinates() {
            this.coordinateX = Math.random() * this.maxW;
            this.coordinateY = Math.random() * this.maxH;
        }

        recomputePosition(w, h) {
            this.maxW = w;
            this.maxH = h;
            
            // Apply frame tracking delta computations
            this.coordinateX += this.driftVelocityX;
            this.coordinateY += this.driftVelocityY;

            // Boundary bounce computations
            if (this.coordinateX < 0 || this.coordinateX > this.maxW) this.driftVelocityX *= -1;
            if (this.coordinateY < 0 || this.coordinateY > this.maxH) this.driftVelocityY *= -1;

            // Handle track pointer interactions
            if (pointerTelemetry.x !== null && pointerTelemetry.y !== null) {
                const deltaDistanceX = this.coordinateX - pointerTelemetry.x;
                const deltaDistanceY = this.coordinateY - pointerTelemetry.y;
                const pythagoreanDistance = Math.sqrt(deltaDistanceX * deltaDistanceX + deltaDistanceY * deltaDistanceY);

                if (pythagoreanDistance < pointerTelemetry.targetProximityRadius) {
                    const repulsionScalarForce = (pointerTelemetry.targetProximityRadius - pythagoreanDistance) / pointerTelemetry.targetProximityRadius;
                    this.coordinateX += (deltaDistanceX / pythagoreanDistance) * repulsionScalarForce * 1.5;
                    this.coordinateY += (deltaDistanceY / pythagoreanDistance) * repulsionScalarForce * 1.5;
                }
            }
        }

        renderGraphicsPass() {
            const rootThemeStyles = getComputedStyle(document.documentElement);
            const coreAccentHex = rootThemeStyles.getPropertyValue('--accent-primary').trim() || "#00f5ff";
            
            contextRender.beginPath();
            contextRender.arc(this.coordinateX, this.coordinateY, this.particleMassRadius, 0, Math.PI * 2);
            contextRender.fillStyle = coreAccentHex;
            contextRender.fill();
        }
    }

    function constructEcosystemPool() {
        dynamicParticleArray = [];
        // Math density mapping constraint based on horizontal resolution profiles
        const calculatedNodeDensity = Math.floor((window.innerWidth * window.innerHeight) / 9000);
        const processingCap = Math.min(calculatedNodeDensity, 140); 

        for (let index = 0; index < processingCap; index++) {
            dynamicParticleArray.push(new ArchitecturalParticle(hostCanvas.width, hostCanvas.height));
        }
    }
    constructEcosystemPool();
    window.addEventListener("resize", constructEcosystemPool);

    function evaluateStructuralConnections() {
        const rootThemeStyles = getComputedStyle(document.documentElement);
        const secondaryAccentHex = rootThemeStyles.getPropertyValue('--accent-secondary').trim() || "#9d4edd";
        
        // Quad-tree proxy parsing array loops to draw interactive geometric meshes
        for (let parentIndex = 0; parentIndex < dynamicParticleArray.length; parentIndex++) {
            for (let comparisonIndex = parentIndex + 1; comparisonIndex < dynamicParticleArray.length; comparisonIndex++) {
                const nodeA = dynamicParticleArray[parentIndex];
                const nodeB = dynamicParticleArray[comparisonIndex];

                const operationalDeltaX = nodeA.coordinateX - nodeB.coordinateX;
                const operationalDeltaY = nodeA.coordinateY - nodeB.coordinateY;
                const distanceVector = Math.sqrt(operationalDeltaX * operationalDeltaX + operationalDeltaY * operationalDeltaY);

                if (distanceVector < 115) {
                    const mappedAlphaRatio = (115 - distanceVector) / 115 * 0.12;
                    contextRender.beginPath();
                    contextRender.moveTo(nodeA.coordinateX, nodeA.coordinateY);
                    contextRender.lineTo(nodeB.coordinateX, nodeB.coordinateY);
                    
                    // Convert color tracking profile natively to dynamic canvas rendering states
                    contextRender.strokeStyle = hexToRgbaConversionString(secondaryAccentHex, mappedAlphaRatio);
                    contextRender.lineWidth = 0.75;
                    contextRender.stroke();
                }
            }
        }
    }

    // High performance frame rendering loop
    function continuousRenderLoop() {
        contextRender.clearRect(0, 0, hostCanvas.width, hostCanvas.height);

        dynamicParticleArray.forEach(particle => {
            particle.recomputePosition(hostCanvas.width, hostCanvas.height);
            particle.renderGraphicsPass();
        });

        evaluateStructuralConnections();
        requestAnimationFrame(continuousRenderLoop);
    }
    requestAnimationFrame(continuousRenderLoop);
}

// Convert runtime variables safely into active alpha-channel canvas paths
function hexToRgbaConversionString(hexCode, alphaValue) {
    let sanitizedHex = hexCode.replace('#', '');
    if (sanitizedHex.length === 3) {
        sanitizedHex = sanitizedHex.split('').map(char => char + char).join('');
    }
    const internalBigInt = parseInt(sanitizedHex, 16);
    const channelR = (internalBigInt >> 16) & 255;
    const channelG = (internalBigInt >> 8) & 255;
    const channelB = internalBigInt & 255;

    return `rgba(${channelR}, ${channelG}, ${channelB}, ${alphaValue})`;
}
