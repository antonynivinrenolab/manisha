// Mobile Navigation

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// Close mobile menu

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});

// Scroll Reveal Animation

const observer = new IntersectionObserver(
(entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){
            entry.target.classList.add("active");
        }

    });

},
{
    threshold:0.15
});

document.querySelectorAll(".reveal").forEach(section => {
    observer.observe(section);
});

// Hero visible on first load

window.addEventListener("load", () => {
    document.querySelector("#hero").classList.add("active");
});
