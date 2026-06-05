// Mobile Menu

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// Close menu after click

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});

// Dynamic Greeting

const greeting = document.getElementById("greeting");
const hour = new Date().getHours();

if (hour < 12) {
    greeting.textContent = "☀️ Good Morning!";
} else if (hour < 18) {
    greeting.textContent = "🌤️ Good Afternoon!";
} else {
    greeting.textContent = "🌙 Good Evening!";
}
