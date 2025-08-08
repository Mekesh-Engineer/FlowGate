// ===================== FlowGate - Loading Screen & Theme Toggle =====================

document.addEventListener("DOMContentLoaded", () => {
  const spinnerStage = document.getElementById("spinner-stage");
  const greetingStage = document.getElementById("greeting-stage");
  const loadingScreen = document.getElementById("loading-screen");
  const bootText = document.getElementById("boot-text");

  // Boot messages to cycle
  const messages = [
    "Initializing AI-IoT systems...",
    "Optimizing secure access modules...",
    "Configuring real-time analytics...",
    "Loading FlowGate dashboard...",
  ];

  let index = 0;
  bootText.textContent = messages[index];

  const messageInterval = setInterval(() => {
    index = (index + 1) % messages.length;
    bootText.textContent = messages[index];
  }, 1200);

  // Step 1: Loader for 5 seconds
  setTimeout(() => {
    clearInterval(messageInterval);
    spinnerStage.classList.add("hidden");
    greetingStage.classList.remove("hidden");

    // Step 2: Greeting for 2 seconds
    setTimeout(() => {
      loadingScreen.classList.add(
        "opacity-0",
        "transition-opacity",
        "duration-1000"
      );
      setTimeout(() => loadingScreen.remove(), 1000);
    }, 2000);
  }, 5000);
});

// ===================== Theme Toggle =====================
function toggleTheme() {
  const html = document.documentElement;
  const icon = document.getElementById("themeIcon");

  // Get current theme
  const currentTheme = html.getAttribute("data-theme") || "light";
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  // Apply theme
  html.setAttribute("data-theme", newTheme);
  html.classList.toggle("dark", newTheme === "dark");

  // Save to localStorage
  localStorage.setItem("theme", newTheme);

  // Update icon
  if (icon) {
    icon.className =
      newTheme === "dark" ? "bi bi-moon-stars-fill" : "bi bi-sun-fill";
  }
}

// Initialize Theme on Load
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "light";
  const icon = document.getElementById("themeIcon");

  // Set initial theme
  document.documentElement.setAttribute("data-theme", savedTheme);
  document.documentElement.classList.toggle("dark", savedTheme === "dark");

  // Set correct icon
  if (icon) {
    icon.className =
      savedTheme === "dark" ? "bi bi-moon-stars-fill" : "bi bi-sun-fill";
  }
});

// ===================== Alerts & Notifications =====================

const notificationsBtn = document.getElementById("notificationsBtn");
const notificationsPanel = document.getElementById("notificationsPanel");
const notificationsList = document.getElementById("notificationsList");
const notificationsBadge = document.getElementById("notificationsBadge");

let unseenNotifications = 0;

const flowGateAlerts = [
  "🚨 Motion detected near Entry Point Alpha",
  "⚡ Power surge: Consumption exceeded threshold",
  "🛑 Emergency protocol activated manually",
  "📡 New smart module integrated into FlowNet",
  "🚪 Visitor access approved via FlowID",
  "🔋 Critical battery warning: Backup at 12%",
  "🛡️ Security policy updated on gateway firewall",
  "💾 System configuration successfully stored",
  "📊 FlowGate analytics report generated",
  "🌐 Latency anomaly in Zone Mesh B",
  "📦 Logistics update: Package scanned at Dock 2",
  "🔒 New login from unrecognized terminal",
  "🎯 Monitoring started for Event Objective Gamma",
  "📶 Enhanced signal detected on Node C7",
  "👥 Overcapacity alert: Zone C exceeds safe limit",
];

// Toggle alerts panel
function toggleNotifications() {
  if (!notificationsPanel) return;
  notificationsPanel.classList.toggle("hidden");

  if (!notificationsPanel.classList.contains("hidden")) {
    unseenNotifications = 0;
    notificationsBadge.classList.add("hidden");
  }
}

// Inject notifications dynamically
function loadNotifications() {
  if (!notificationsList) return;

  notificationsList.innerHTML = ""; // Clear old items
  const count = 10 + Math.floor(Math.random() * 6); // 10–15 items
  for (let i = 0; i < count; i++) {
    const message = alertMessages[i % alertMessages.length];
    const timestamp = new Date().toLocaleTimeString();
    const item = document.createElement("li");
    item.className = "bg-gray-100 dark:bg-gray-700 p-2 rounded text-sm";
    item.innerHTML = `
      <strong>${message}</strong><br>
      <small class="text-gray-500 dark:text-gray-300">${timestamp}</small>`;
    notificationsList.appendChild(item);
  }

  // Update badge
  unseenNotifications = count;
  notificationsBadge.textContent = unseenNotifications;
  notificationsBadge.classList.remove("hidden");
}

// Attach button click handler
notificationsBtn?.addEventListener("click", () => {
  toggleNotifications();
  loadNotifications();
});

// Close alerts panel when clicking outside
document.addEventListener("click", (e) => {
  if (
    !notificationsPanel.contains(e.target) &&
    !notificationsBtn.contains(e.target)
  ) {
    notificationsPanel.classList.add("hidden");
  }
});

// ===================== Search =====================
function triggerSearch() {
  const input = document.getElementById("searchInput");
  const query = input.value.trim();
  if (query !== "") {
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(
      query
    )}`;
    window.open(searchUrl, "_blank");
  }
}

// ===================== Unified Live Clock System =====================
function getFormattedTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

function updateLiveClocks() {
  const now = new Date();
  const clockText = document.getElementById("clockText");
  const calendarClock = document.getElementById("calendarClock");

  if (clockText) clockText.textContent = getFormattedTime();

  if (calendarClock) {
    calendarClock.textContent = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }
}

// Start unified clock interval
document.addEventListener("DOMContentLoaded", () => {
  updateLiveClocks();
  setInterval(updateLiveClocks, 1000);
});

// ===================== Calendar =====================
function toggleCalendarDropdown() {
  const dropdown = document.getElementById("calendarDropdown");
  if (dropdown) {
    dropdown.classList.toggle("hidden");
    if (!dropdown.classList.contains("hidden")) {
      generateCalendar(); // Only regenerate when opened
    }
  }
}

function closeCalendarDropdown() {
  document.getElementById("calendarDropdown")?.classList.add("hidden");
}

function generateCalendar() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();
  const monthName = today.toLocaleString("default", { month: "long" });

  document.getElementById(
    "calendarHeader"
  ).textContent = `${monthName} - ${year}`;

  const grid = document.getElementById("calendarGrid");
  grid.innerHTML = "";

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  days.forEach((day) => {
    grid.innerHTML += `<div class="font-bold text-center">${day}</div>`;
  });

  for (let i = 0; i < firstDay; i++) {
    grid.innerHTML += `<div></div>`;
  }

  for (let d = 1; d <= lastDate; d++) {
    const isToday = d === today.getDate();
    grid.innerHTML += `
      <div class="p-2 text-center rounded ${
        isToday
          ? "bg-[var(--accent-main)] text-white"
          : "hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
      }">${d}</div>`;
  }
}

// ===================== Sidebar Toggle & Tooltips =====================
const toggleBtn = document.getElementById("toggleBtn");
const toggleIcon = document.getElementById("toggleIcon");
const sidebar = document.getElementById("sidebar");
const sidebarFooter = document.getElementById("sidebarFooter");
const label = toggleBtn.querySelector(".sidebar-label");
const tooltip = toggleBtn.querySelector(".nav-tooltip");
const mainContent = document.getElementById("mainContent");

// Default collapsed state
sidebar.classList.add("sidebar-collapsed");
toggleIcon.className =
  "bi bi-chevron-double-right text-[var(--text-primary)] text-xl";
if (label) label.textContent = "Expand";
if (tooltip) tooltip.textContent = "Expand Sidebar";
if (sidebarFooter) sidebarFooter.classList.add("hidden");

document.querySelectorAll(".nav-tooltip").forEach((tip) => {
  tip.style.display = "none";
  tip.style.visibility = "hidden";
  tip.style.opacity = "0";
});

// Toggle behavior
toggleBtn.addEventListener("click", () => {
  const isCollapsed = sidebar.classList.toggle("sidebar-collapsed");

  toggleIcon.className = isCollapsed
    ? "bi bi-chevron-double-right text-[var(--text-primary)] text-xl"
    : "bi bi-chevron-double-left text-[var(--text-primary)] text-xl";

  if (label) label.textContent = isCollapsed ? "Expand" : "Collapse";
  if (tooltip)
    tooltip.textContent = isCollapsed ? "Expand Sidebar" : "Collapse Sidebar";
  if (sidebarFooter) sidebarFooter.classList.toggle("hidden", isCollapsed);

  document.querySelectorAll(".nav-tooltip").forEach((tip) => {
    tip.style.display = isCollapsed ? "block" : "none";
    tip.style.visibility = isCollapsed ? "visible" : "hidden";
    tip.style.opacity = isCollapsed ? "1" : "0";
  });

  // Adjust main content spacing
  if (isCollapsed) {
    mainContent.classList.remove("ml-64");
    mainContent.classList.add("ml-20"); // compact view
  } else {
    mainContent.classList.remove("ml-20");
    mainContent.classList.add("ml-64"); // expanded view
  }
});

// Inject user info
const usernameEl = document.getElementById("usernameDisplay");
const userRoleEl = document.getElementById("userRoleDisplay");
if (usernameEl) usernameEl.textContent = "Mekesh";
if (userRoleEl) userRoleEl.textContent = "Role: Administrator";

// Sidebar Active Link Highlight
document.querySelectorAll(".sidebar-link").forEach((link) => {
  if (link.href === window.location.href) {
    link.classList.add("active");
  } else {
    link.classList.remove("active");
  }
});

// ===================== Scrollable Gallery =====================
const container = document.querySelector(".scroll-container");
const sections = document.querySelectorAll(".scroll-section");
const dots = document.querySelectorAll(".fixed.right-8 button");

let isScrolling = false;
let currentIndex = 0;

function scrollToSection(index) {
  if (index < 0 || index >= sections.length || isScrolling) return;
  isScrolling = true;
  sections[index].scrollIntoView({ behavior: "smooth" });
  updateDots(index);
  currentIndex = index;

  setTimeout(() => {
    isScrolling = false;
  }, 1000);
}

function updateDots(index) {
  dots.forEach((dot, i) => {
    if (i === index) {
      dot.className =
        "dot w-3 h-3 rounded-full scale-150 bg-[var(--accent-main)] transition-all duration-300";
    } else {
      dot.className =
        "dot w-3 h-3 rounded-full bg-[var(--text-muted)] dark:bg-white/40 hover:bg-[var(--accent-main)] hover:scale-125 transition-all duration-300";
    }
  });
}

container.addEventListener("scroll", () => {
  const index = Math.round(container.scrollTop / window.innerHeight);
  if (index !== currentIndex) {
    updateDots(index);
    currentIndex = index;
  }
});

window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowDown") scrollToSection(currentIndex + 1);
  if (e.key === "ArrowUp") scrollToSection(currentIndex - 1);
});

updateDots(0);
// ===================== Get In Touch =====================
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#contact");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");

  // Utility function to show error
  function showError(input, message) {
    let errorEl = input.nextElementSibling;
    if (!errorEl || !errorEl.classList.contains("error-message")) {
      errorEl = document.createElement("p");
      errorEl.className = "error-message text-[var(--danger)] text-sm mt-1";
      input.insertAdjacentElement("afterend", errorEl);
    }
    errorEl.textContent = message;
    input.classList.add("border-[var(--danger)]");
    input.classList.remove("border-[var(--border-light)]");
  }

  // Utility function to clear error
  function clearError(input) {
    const errorEl = input.nextElementSibling;
    if (errorEl && errorEl.classList.contains("error-message")) {
      errorEl.remove();
    }
    input.classList.remove("border-[var(--danger)]");
    input.classList.add("border-[var(--border-light)]");
  }

  // Email validation regex
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Form submit handler
  form.addEventListener("submit", (e) => {
    let isValid = true;

    // Validate Name
    if (nameInput.value.trim() === "") {
      showError(nameInput, "Name is required.");
      isValid = false;
    } else {
      clearError(nameInput);
    }

    // Validate Email
    if (emailInput.value.trim() === "") {
      showError(emailInput, "Email is required.");
      isValid = false;
    } else if (!isValidEmail(emailInput.value.trim())) {
      showError(emailInput, "Enter a valid email address.");
      isValid = false;
    } else {
      clearError(emailInput);
    }

    // Validate Message
    if (messageInput.value.trim() === "") {
      showError(messageInput, "Message cannot be empty.");
      isValid = false;
    } else {
      clearError(messageInput);
    }

    // Stop submission if invalid
    if (!isValid) {
      e.preventDefault();
    }
  });
});

// ===================== Footer & Orb Cursor =====================
document.getElementById("year").textContent = new Date().getFullYear();

document.addEventListener("mousemove", (e) => {
  const orb = document.querySelector(".orb");
  orb.style.left = `${e.clientX}px`;
  orb.style.top = `${e.clientY}px`;
});

// ===================== Contact Form Validation =====================
document.addEventListener("DOMContentLoaded", () => {
  const form =
    document.querySelector("#contact form") ||
    document.querySelector("#contact");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");

  // Create error message elements dynamically
  [nameInput, emailInput, messageInput].forEach((input) => {
    const errorEl = document.createElement("p");
    errorEl.className = "text-red-500 text-xs mt-1 hidden";
    input.parentElement.appendChild(errorEl);
    input.errorEl = errorEl;
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Stop actual form submission
    let isValid = true;

    // Clear old errors
    [nameInput, emailInput, messageInput].forEach((input) => {
      input.errorEl.textContent = "";
      input.errorEl.classList.add("hidden");
      input.classList.remove("border-red-500");
    });

    // Validate Name
    if (nameInput.value.trim().length < 2) {
      showError(nameInput, "Please enter your full name.");
      isValid = false;
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      showError(emailInput, "Please enter a valid email address.");
      isValid = false;
    }

    // Validate Message
    if (messageInput.value.trim().length < 10) {
      showError(messageInput, "Message should be at least 10 characters long.");
      isValid = false;
    }

    // If valid, show success message
    if (isValid) {
      alert("✅ Thank you! Your message has been sent successfully.");
      form.reset();
    }
  });

  function showError(input, message) {
    input.classList.add("border-red-500");
    input.errorEl.textContent = message;
    input.errorEl.classList.remove("hidden");
  }
});

// ===================== Newsletter Validation =====================
document.addEventListener("DOMContentLoaded", () => {
  const newsletterForm = document.querySelector("footer form");
  const emailInput = newsletterForm.querySelector("input[type='email']");

  // Create error message element
  const errorEl = document.createElement("p");
  errorEl.className = "text-red-500 text-xs mt-2 hidden";
  newsletterForm.appendChild(errorEl);

  // Success message element
  const successEl = document.createElement("p");
  successEl.className = "text-green-400 text-xs mt-2 hidden";
  newsletterForm.appendChild(successEl);

  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Stop real submission
    const emailValue = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Reset states
    emailInput.classList.remove("border-red-500", "border-green-500");
    errorEl.textContent = "";
    successEl.textContent = "";
    errorEl.classList.add("hidden");
    successEl.classList.add("hidden");

    // Validate Email
    if (!emailRegex.test(emailValue)) {
      errorEl.textContent = "❌ Please enter a valid email address.";
      errorEl.classList.remove("hidden");
      emailInput.classList.add("border-red-500");
      return;
    }

    // Success Feedback
    successEl.textContent =
      "✅ Thank you! You've been subscribed to FlowGate updates.";
    successEl.classList.remove("hidden");
    emailInput.classList.add("border-green-500");

    // Reset input after 2 seconds
    setTimeout(() => {
      newsletterForm.reset();
      emailInput.classList.remove("border-green-500");
      successEl.classList.add("hidden");
    }, 2500);
  });
});
