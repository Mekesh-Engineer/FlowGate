// Toggle password show/hide
function togglePasswordVisibility() {
  const pwd = document.getElementById("password");
  pwd.type = pwd.type === "password" ? "text" : "password";
}

// Validate email or phone input
function validateUserIdentifier(value) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+?\d{10,15}$/; // +countrycode optional
  return emailRegex.test(value) || phoneRegex.test(value);
}

// Handle login submission
function handleLogin(event) {
  event.preventDefault();
  const emailOrPhone = document.getElementById("userIdentifier").value.trim();
  const password = document.getElementById("password").value.trim();

  // Validate format before checking credentials
  if (!validateUserIdentifier(emailOrPhone)) {
    Swal.fire({
      icon: "warning",
      title: "Invalid Input",
      text: "Please enter a valid email or phone number.",
    });
    return;
  }

  // Predefined credentials (replace with backend API)
  const validEmail = "mekesh@flowgate.com";
  const validPassword = "Mekesh@123";

  if (emailOrPhone === validEmail && password === validPassword) {
    confetti();
    Swal.fire({
      icon: "success",
      title: "Login Successful!",
      text: "Redirecting to home page...",
      showConfirmButton: false,
      timer: 2000,
    });

    setTimeout(() => {
      window.location.href = "home.html";
    }, 2000);
  } else {
    Swal.fire({
      icon: "error",
      title: "Login Failed",
      text: "Invalid email/phone or password. Please try again.",
    });
  }
}

// Theme toggle (Dark / Light mode)
function toggleTheme() {
  const htmlEl = document.documentElement;
  const icon = document.getElementById("themeIcon");

  if (htmlEl.classList.contains("dark")) {
    htmlEl.classList.remove("dark");
    if (icon) icon.classList.replace("bi-sun-fill", "bi-moon-stars-fill");
    localStorage.setItem("theme", "light");
  } else {
    htmlEl.classList.add("dark");
    if (icon) icon.classList.replace("bi-moon-stars-fill", "bi-sun-fill");
    localStorage.setItem("theme", "dark");
  }
}

// Restore theme preference
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("theme") === "dark") {
    document.documentElement.classList.add("dark");
    const icon = document.getElementById("themeIcon");
    if (icon) icon.classList.replace("bi-moon-stars-fill", "bi-sun-fill");
  }
});

// Social login stubs
function loginWithGoogle() {
  Swal.fire({
    icon: "info",
    title: "Google Login",
    text: "Google login integration is coming soon!",
  });
}

function loginWithGithub() {
  Swal.fire({
    icon: "info",
    title: "GitHub Login",
    text: "GitHub login integration is coming soon!",
  });
}
