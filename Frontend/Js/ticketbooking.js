// Ticket Booking JavaScript hero section
const phrases = [
  "Unified access.",
  "Real-time AI insights.",
  "Digital ticketing.",
  "Smarter city experiences.",
];
let i = 0,
  j = 0,
  current = "",
  isDeleting = false;

function type() {
  if (i < phrases.length) {
    if (!isDeleting && j <= phrases[i].length) {
      current = phrases[i].substring(0, j++);
    } else if (isDeleting && j >= 0) {
      current = phrases[i].substring(0, j--);
    }

    document.getElementById("typed").textContent = current;

    if (!isDeleting && j === phrases[i].length + 1) {
      isDeleting = true;
      setTimeout(type, 1000);
      return;
    }
    if (isDeleting && j === 0) {
      isDeleting = false;
      i = (i + 1) % phrases.length;
    }
  }

  setTimeout(type, isDeleting ? 40 : 80);
}

// Ensure the script runs after the DOM is fully loaded
