const registerForm = document.getElementById("register-form");

if (registerForm) {
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Stop automatic navigation

    // 1. Check if all required inputs and checkboxes are filled
    if (registerForm.checkValidity()) {
      // 2. Save the entered email to localStorage
      const emailInput = document.getElementById("user-email-input");
      if (emailInput && emailInput.value) {
        localStorage.setItem("registeredEmail", emailInput.value);
      }

      // 3. Redirect to the verification page
      window.location.href = "./Email1.html";
    } else {
      // 4. Show custom warning message and browser highlights
      alert(
        "Please fill out all required fields and accept the terms to register.",
      );
      registerForm.reportValidity();
    }
  });
}
