// ================================
// Overlay / Button
// ================================
const button = document.querySelector(".button");
const overlay = document.querySelector(".overlay");

button.addEventListener("click", () => {
    overlay.style.display = "none";
    button.style.display = "none";
});

// ================================
// Top-Capture Container
// ================================
const topCapture = document.createElement("div");
topCapture.id = "top-capture";
document.body.appendChild(topCapture);

// ================================
// Wörter erfassen
// ================================
const words = [...document.querySelectorAll("span, h1")];
const usedWords = new Set();

// ================================
// Scroll-Logik
// ================================
window.addEventListener("scroll", () => {

    words.forEach(word => {

        if (usedWords.has(word)) return;

        const rect = word.getBoundingClientRect();

        if (rect.top <= 0) {
            usedWords.add(word);

            const clone = word.cloneNode(true);
            clone.classList.add("captured-word", "smoke-word");

            // ----------------------------
            // Buchstaben aufteilen (nur Klon)
            // ----------------------------
            const text = clone.textContent;
            clone.textContent = "";

            [...text].forEach(char => {
                const span = document.createElement("span");
                span.classList.add("char");
                span.textContent = char;

                // Rauch ist nie synchron
                span.style.animationDelay = `${Math.random() * 4}s`;
                span.style.animationDuration = `${4 + Math.random() * 6}s`;

                clone.appendChild(span);
            });

            // ----------------------------
            // Positionierung
            // ----------------------------
            clone.style.position = "fixed";

            const x = Math.random() * (window.innerWidth - 150);
            const y = 40 + Math.random() * 120;

            clone.style.left = `${x}px`;
            clone.style.top = `${y}px`;

            // ----------------------------
            // Rauch-Parameter
            // ----------------------------
            clone.style.setProperty("--rot", `${(Math.random() - 0.5) * 40}deg`);
            clone.style.setProperty("--driftX", `${20 + Math.random() * 60}px`);
            clone.style.setProperty("--rise", `${20 + Math.random() * 40}px`);
            clone.style.setProperty("--floatTime", `${12 + Math.random() * 12}s`);

            clone.style.display = "inline-block";

            topCapture.appendChild(clone);

            // Original unsichtbar
            word.style.visibility = "hidden";
        }
    });
});
