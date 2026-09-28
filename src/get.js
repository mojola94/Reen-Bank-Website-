const registerForm = document.getElementById("register-form");

registerForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Stop the form from traditional refreshing

  // Check if all required inputs and checkboxes are filled
  if (registerForm.checkValidity()) {
    // If everything is filled, redirect to the verification page
    window.location.href = "./verify.html";
  } else {
    // If empty, trigger the browser's native popup warnings
    registerForm.reportValidity();
  }
});
