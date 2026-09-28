const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Stop standard form submission refresh

  // Check if the email and password fields are filled out properly
  if (loginForm.checkValidity()) {
    // If filled, redirect to the dashboard
    window.location.href = "./dash.html";
  } else {
    // If empty, trigger the browser warning message
    loginForm.reportValidity();
  }
});
