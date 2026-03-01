const words = ["Senior Java Backend Developer", "Spring Boot Expert", "Microservices Engineer"];
let i = 0; // Word index
let j = 0; // Character index
let currentWord = "";
let isDeleting = false;
const typewriterElement = document.getElementById("typewriter");

function type() {
    currentWord = words[i];

    if (isDeleting) {
        // Remove characters
        typewriterElement.textContent = currentWord.substring(0, j - 1);
        j--;
    } else {
        // Add characters
        typewriterElement.textContent = currentWord.substring(0, j + 1);
        j++;
    }

    // Typing speed control
    let typingSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && j === currentWord.length) {
        // Pause at the end of the word
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && j === 0) {
        // Move to the next word
        isDeleting = false;
        i++;
        if (i === words.length) {
            i = 0; // Loop back to the first word
        }
        typingSpeed = 500;
    }

    setTimeout(type, typingSpeed);
}

// Start the typing effect when the window loads
window.onload = function() {
    type();
};
