document.addEventListener("DOMContentLoaded", () => {
  // Load saved data on startup
  const savedProfile = localStorage.getItem("reenBank_profileData");
  if (savedProfile) {
    const data = JSON.parse(savedProfile);
    setProfileValues(data);
  }

  const editToggleBtn = document.getElementById("edit-toggle-btn");
  const cancelBtn = document.getElementById("cancel-btn");
  const saveBtn = document.getElementById("save-btn");

  const viewName = document.getElementById("view-name");
  const viewEmail = document.getElementById("view-email");
  const viewPhone = document.getElementById("view-phone");
  const viewGender = document.getElementById("view-gender");

  const inputName = document.getElementById("input-name");
  const inputEmail = document.getElementById("input-email");
  const inputPhone = document.getElementById("input-phone");
  const inputGender = document.getElementById("input-gender");

  const actionButtons = document.getElementById("action-buttons");
  const saveCancelButtons = document.getElementById("save-cancel-buttons");
   const visibilityToggles = document.querySelectorAll(".toggle-visibility");

  visibilityToggles.forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
      const card = e.target.closest(".account-card");
      if (!card) return;

      const balanceEl = card.querySelector(".account-balance");
      if (!balanceEl) return;

      const rawBalance = balanceEl.getAttribute("data-balance");
      const isHidden = balanceEl.getAttribute("data-hidden") === "true";

      if (isHidden) {
        // Show balance
        const formatted = Number(rawBalance).toLocaleString("en-NG", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
        balanceEl.textContent = `₦ ${formatted}`;
        balanceEl.setAttribute("data-hidden", "false");
        toggle.classList.remove("text-emerald-600");
        toggle.classList.add("text-gray-400");
      } else {
        // Hide balance
        balanceEl.textContent = "₦ ********";
        balanceEl.setAttribute("data-hidden", "true");
        toggle.classList.remove("text-gray-400");
        toggle.classList.add("text-emerald-600");
      }
    });
  });

  // 2. Notification Dropdown Toggle & Mark as Read
  const bellBtn = document.getElementById("notification-bell-btn");
  const dropdown = document.getElementById("notification-dropdown");
  const notificationBadge = document.getElementById("notification-badge");
  const markAllReadBtn = document.getElementById("mark-all-read-btn");

  if (bellBtn && dropdown) {
    bellBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdown.classList.toggle("hidden");
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (!dropdown.contains(e.target) && !bellBtn.contains(e.target)) {
        dropdown.classList.add("hidden");
      }
    });
  }

  if (markAllReadBtn && notificationBadge) {
    markAllReadBtn.addEventListener("click", () => {
      notificationBadge.style.display = "none";
      markAllReadBtn.textContent = "All read";
      markAllReadBtn.classList.remove("hover:underline", "cursor-pointer");
      markAllReadBtn.classList.add("text-gray-400", "cursor-default");
    });
  }

  // 3. Live Search Functionality (Filters Accounts & Transactions)
  const searchInput = document.getElementById("search-input");
  const accountCards = document.querySelectorAll("#accounts-grid > div");
  const transactionRows = document.querySelectorAll("#transactions-tbody > tr");

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const term = e.target.value.toLowerCase().trim();


  // Click Edit Icon to switch to input mode
  editToggleBtn.addEventListener("click", () => {
    inputName.value = viewName.textContent.trim();
    inputEmail.value = viewEmail.textContent.trim();
    inputPhone.value = viewPhone.textContent.trim();
    inputGender.value = viewGender.textContent.trim();

    viewName.classList.add("hidden");
    inputName.classList.remove("hidden");

    viewEmail.classList.add("hidden");
    inputEmail.classList.remove("hidden");

    viewPhone.classList.add("hidden");
    inputPhone.classList.remove("hidden");

    viewGender.classList.add("hidden");
    inputGender.classList.remove("hidden");

    actionButtons.classList.add("hidden");
    saveCancelButtons.classList.remove("hidden");
  });

  // Click Cancel
  cancelBtn.addEventListener("click", () => {
    exitEditMode();
  });

  // Click Save Changes
  saveBtn.addEventListener("click", () => {
    const newData = {
      name: inputName.value,
      email: inputEmail.value,
      phone: inputPhone.value,
      gender: inputGender.value,
    };

    localStorage.setItem("reenBank_profileData", JSON.stringify(newData));
    setProfileValues(newData);
    exitEditMode();
  });

  function exitEditMode() {
    inputName.classList.add("hidden");
    viewName.classList.remove("hidden");

    inputEmail.classList.add("hidden");
    viewEmail.classList.remove("hidden");

    inputPhone.classList.add("hidden");
    viewPhone.classList.remove("hidden");

    inputGender.classList.add("hidden");
    viewGender.classList.remove("hidden");

    saveCancelButtons.classList.add("hidden");
    actionButtons.classList.remove("hidden");
  }

  function setProfileValues(data) {
    viewName.textContent = data.name;
    viewEmail.textContent = data.email;
    viewPhone.textContent = data.phone;
    viewGender.textContent = data.gender;
    document.getElementById("header-name").textContent = data.name;
  }

  // Toggle Balance Visibility
  const toggleBalanceBtn = document.getElementById("toggle-balance");
  const accountBalance = document.getElementById("account-balance");
  let balanceVisible = true;
  toggleBalanceBtn.addEventListener("click", () => {
    balanceVisible = !balanceVisible;
    accountBalance.textContent = balanceVisible ? "₦ 44,500.00" : "₦ ••••••••";
  });
});
    document.addEventListener("DOMContentLoaded", () => {
        const toggleBtn = document.getElementById("balance-toggle-btn");
        const balanceEl = document.querySelector(".account-balance");
        let isVisible = true;

        if (toggleBtn && balanceEl) {
          toggleBtn.addEventListener("click", () => {
            isVisible = !isVisible;
            balanceEl.textContent = isVisible ? "₦ 44,500.00" : "₦ ••••••••";
          });
        }
      });
