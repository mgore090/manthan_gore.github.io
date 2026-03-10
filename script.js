// =============================
// EMAILJS CONFIGURATION
// =============================
const EMAILJS_SERVICE_ID  = "service_tu41aq4";
const EMAILJS_TEMPLATE_ID = "template_muaq4py";
const EMAILJS_PUBLIC_KEY  = "-kEOLble4yPcILkYG";

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

        const inputs  = form.querySelectorAll("input");
        const name    = inputs[0].value.trim();
        const email   = inputs[1].value.trim();
        const subject = inputs[2].value.trim();
        const message = form.querySelector("textarea").value.trim();

        if (!name || !email || !subject || !message) {
            showToast("Please fill in all fields.", "error");
            return;
        }

        submitBtn.textContent = "Sending...";
        submitBtn.disabled = true;

        // Variables match kele EmailJS template sathi
        const templateParams = {
            name:    name,      // {{name}}
            email:   email,     // {{email}}
            title:   subject,   // {{title}}
            message: message    // {{message}}
        };

        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
            .then(function () {
                showToast("✅ Message sent successfully!", "success");
                form.reset();
            })
            .catch(function (error) {
                console.error("EmailJS error:", error);
                showToast("❌ Failed to send. Please try again.", "error");
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
    `;
    document.body.appendChild(toast);
    setTimeout(() => { if (toast) toast.remove(); }, 4000);
}

// =============================
// TYPEWRITER EFFECT
// =============================
const words = ["Java Backend Developer", "Spring Boot Expert", "Microservices Engineer"];
let i = 0, j = 0, isDeleting = false;
const typewriterElement = document.getElementById("typewriter");

function type() {
    if (!typewriterElement) return;
    const currentWord = words[i];

    typewriterElement.textContent = isDeleting
        ? currentWord.substring(0, j - 1)
        : currentWord.substring(0, j + 1);

    isDeleting ? j-- : j++;

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

window.onload = function () { type(); };