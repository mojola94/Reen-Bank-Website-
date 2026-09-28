document.addEventListener("DOMContentLoaded", () => {
  const emailElement = document.getElementById("user-email");
  const savedEmail = localStorage.getItem("registeredEmail");

  if (savedEmail && emailElement) {
    emailElement.textContent = savedEmail;
  }
});

// 2. OTP Input Navigation
const inputs = document.querySelectorAll("#otp-container input");
inputs.forEach((input, index) => {
  input.addEventListener("input", (e) => {
    if (e.target.value.length === 1 && index < inputs.length - 1) {
      inputs[index + 1].focus();
    }
  });
  input.addEventListener("keydown", (e) => {
    if (e.key === "Backspace" && input.value === "" && index > 0) {
      inputs[index - 1].focus();
    }
  });
});

// 3. Live Countdown Timer (45 seconds)
let timeLeft = 45;
const timerDisplay = document.getElementById("timer");

const countdown = setInterval(() => {
  if (timeLeft <= 0) {
    clearInterval(countdown);
    timerDisplay.textContent = "Code expired. Click resend below.";
    timerDisplay.classList.remove("text-green-600");
    timerDisplay.classList.add("text-red-500");
  } else {
    let seconds = timeLeft < 10 ? "0" + timeLeft : timeLeft;
    timerDisplay.textContent = `0:${seconds} remaining`;
    timeLeft -= 1;
  }
}, 1000);

// 4. Handle Form Submission & Redirect to Dashboard
const verificationForm = document.querySelector("form");

if (verificationForm) {
  verificationForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Stop default form submit behavior

    // Optional: You can add validation here to check if all 6 digits are filled before redirecting

    // Redirect to the dashboard page
    window.location.href = "./dash.html";
  });
}
