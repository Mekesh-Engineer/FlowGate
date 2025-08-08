function togglePasswordVisibility(fieldId) {
  const input = document.getElementById(fieldId);
  input.type = input.type === "password" ? "text" : "password";
}

function updateStrengthMeter() {
  const strengthText = document.getElementById("strengthMeter");
  const password = document.getElementById("regPassword").value;
  if (!password) {
    strengthText.textContent = "";
    return;
  }
  const score = zxcvbn(password).score;
  const messages = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
  strengthText.textContent = `Strength: ${messages[score]}`;
  strengthText.style.color = ["red", "orange", "goldenrod", "blue", "green"][
    score
  ];
}

function handleRegistration(event) {
  event.preventDefault();
  const identifier = document.getElementById("regIdentifier").value.trim();
  const password = document.getElementById("regPassword").value.trim();
  const termsAccepted = document.getElementById("terms").checked;

  if (!termsAccepted) {
    Swal.fire({
      icon: "warning",
      title: "Agreement Required",
      text: "You must agree to the Terms & Privacy Policy before registering.",
    });
    return;
  }

  // Simple validation: In real use, send request to backend
  if (identifier && password.length >= 8) {
    confetti();
    Swal.fire({
      icon: "success",
      title: "Registration Successful!",
      text: "You can now login to FlowGate.",
      showConfirmButton: true,
    }).then(() => {
      window.location.href = "login.html";
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Registration Failed",
      text: "Please enter a valid email/phone and a strong password.",
    });
  }
}
