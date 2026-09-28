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

// 2. Live Countdown Timer & Resend Code Logic
let timeLeft = 45;
let countdown;
const timerDisplay = document.getElementById("timer");
const resendBtn = document.getElementById("resend-btn");

function startTimer() {
  timeLeft = 45;
  timerDisplay.classList.remove("text-red-500");
  timerDisplay.classList.add("text-green-600");

  clearInterval(countdown);
  countdown = setInterval(() => {
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
}

// Initialize timer on load
startTimer();

// 3. Handle Resend Click to Generate/Send a New Code
resendBtn.addEventListener("click", (e) => {
  e.preventDefault();

  // Clear all input boxes when a new code is requested
  inputs.forEach((input) => (input.value = ""));
  inputs[0].focus();

  // Visual feedback that a new code was generated
  timerDisplay.textContent = "New code sent successfully!";
  timerDisplay.classList.remove("text-red-500");
  timerDisplay.classList.add("text-green-600");

  // Restart timer after a brief 1.5 second notice
  setTimeout(() => {
    startTimer();
  }, 1500);
});
