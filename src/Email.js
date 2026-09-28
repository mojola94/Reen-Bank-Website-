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

// 2. Live Countdown Timer (45 seconds)
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
