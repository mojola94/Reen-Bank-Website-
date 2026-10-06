document.addEventListener("DOMContentLoaded", () => {
  // 1. Toggle Balance Visibility
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

      // Filter Account Cards
      accountCards.forEach((card) => {
        const text = card.textContent.toLowerCase();
        if (text.includes(term)) {
          card.style.display = "";
        } else {
          card.style.display = "none";
        }
      });

      // Filter Transaction Table Rows
      transactionRows.forEach((row) => {
        const text = row.textContent.toLowerCase();
        if (text.includes(term)) {
          row.style.display = "";
        } else {
          row.style.display = "none";
        }
      });
    });
  }
});
