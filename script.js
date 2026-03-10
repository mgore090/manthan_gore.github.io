// =============================
// EMAILJS CONFIGURATION
// Replace these 3 values with your own from emailjs.com dashboard
// =============================
const EMAILJS_SERVICE_ID  = "service_tu41aq4";   // e.g. "service_abc123"
const EMAILJS_TEMPLATE_ID = "template_muaq4py";  // e.g. "template_xyz789"
const EMAILJS_PUBLIC_KEY  = "-kEOLbIe4yPcILkYG";   // e.g. "abcDEFghiJKL"

// Initialize EmailJS
(function () {
    emailjs.init(EMAILJS_PUBLIC_KEY);
})();

// =============================
// CONTACT FORM HANDLER
// =============================
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".contact-form form");
    const submitBtn = form.querySelector("button[type='submit']");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name    = form.querySelector("input[type='text']").value.trim();
        const email   = form.querySelector("input[type='email']").value.trim();
        const subject = form.querySelectorAll("input[type='text']")[1].value.trim();
        const message = form.querySelector("textarea").value.trim();

        // Basic validation
        if (!name || !email || !subject || !message) {
            showToast("Please fill in all fields.", "error");
            return;
        }

        submitBtn.textContent = "Sending...";
        submitBtn.disabled = true;

        const templateParams = {
            from_name:  name,
            from_email: email,
            subject:    subject,
            message:    message,
            to_email:   "mgore090@gmail.com"
        };

        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
            .then(function () {
                showToast("✅ Message sent! I'll get back to you soon.", "success");
                form.reset();
            })
            .catch(function (error) {
                console.error("EmailJS error:", error);
                showToast("❌ Failed to send. Please try again or email directly.", "error");
            })
            .finally(function () {
                submitBtn.textContent = "Send Message";
                submitBtn.disabled = false;
            });
    });
});

// =============================
// TOAST NOTIFICATION
// =============================
function showToast(message, type) {
    // Remove existing toast if any
    const existing = document.getElementById("toast");
    if (existing) existing.remove();

    const toast = document.createElement("div");
    toast.id = "toast";
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: ${type === "success" ? "#28a745" : "#dc3545"};
        color: #fff;
        padding: 14px 24px;
        border-radius: 8px;
        font-size: 15px;
        font-family: 'Poppins', sans-serif;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 9999;
        animation: fadeIn 0.3s ease;
    `;
    document.body.appendChild(toast);

    setTimeout(() => { if (toast) toast.remove(); }, 4000);
}

// =============================
// TYPEWRITER EFFECT
// =============================
const words = ["Java Backend Developer", "Spring Boot Expert", "Microservices Engineer"];
let i = 0;
let j = 0;
let currentWord = "";
let isDeleting = false;
const typewriterElement = document.getElementById("typewriter");

function type() {
    if (!typewriterElement) return;
    currentWord = words[i];

    if (isDeleting) {
        typewriterElement.textContent = currentWord.substring(0, j - 1);
        j--;
    } else {
        typewriterElement.textContent = currentWord.substring(0, j + 1);
        j++;
    }

    let typingSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && j === currentWord.length) {
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && j === 0) {
        isDeleting = false;
        i = (i + 1) % words.length;
        typingSpeed = 500;
    }

    setTimeout(type, typingSpeed);
}

window.onload = function () {
    type();
};
