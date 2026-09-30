/**
 * Letter-scramble hover effect for nav links.
 * Uses data-value attribute as the "true" text to resolve back to.
 */
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function scrambleElement(el) {
  if (el.dataset.scrambling === "true") return;
  el.dataset.scrambling = "true";

  const original = el.dataset.value || el.innerText.trim();
  if (!el.dataset.value) el.dataset.value = el.innerText.trim();

  let iterations = 0;
  clearInterval(el._scrambleTimer);

  el._scrambleTimer = setInterval(() => {
    el.innerText = original
      .split("")
      .map((char, i) => {
        if (char === " ") return " ";
        if (i < iterations) return original[i];
        return LETTERS[Math.floor(Math.random() * 26)];
      })
      .join("");

    if (iterations >= original.length) {
      clearInterval(el._scrambleTimer);
      el.innerText = original;
      el.dataset.scrambling = "false";
    }
    iterations += 1 / 5;
  }, 30);
}

// Attach to all nav links on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".nav-links a, .nav-links .scramble-btn").forEach(el => {
    const text = el.innerText.trim();
    el.dataset.value = text;
    el.addEventListener("mouseenter", () => scrambleElement(el));
  });
});
