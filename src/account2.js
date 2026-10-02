function getFormattedTimestamp() {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = months[now.getMonth()];
  const year = now.getFullYear();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${day}.${month}.${year} ${hours}:${minutes}`;
}
let activeCard = null;

const searchInput = document.getElementById("search-input");
if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase().trim();
    const accountCards = document.querySelectorAll(".account-card");

    accountCards.forEach((card) => {
      const accountName = card
        .querySelector(".account-name")
        .textContent.toLowerCase();
      if (accountName.includes(query)) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  });
}

const bellBtn = document.getElementById("notification-bell-btn");
const dropdown = document.getElementById("notification-dropdown");
const badge = document.getElementById("notification-badge");
let unreadCount = 1;

if (bellBtn) {
  bellBtn.addEventListener("click", () => {
    dropdown.classList.toggle("hidden");
  });
}

const markAllReadBtn = document.getElementById("mark-all-read-btn");
if (markAllReadBtn) {
  markAllReadBtn.addEventListener("click", () => {
    unreadCount = 0;
    if (badge) badge.style.display = "none";
  });
}

function addNotification(title, message) {
  unreadCount++;
  if (badge) {
    badge.style.display = "flex";
    badge.textContent = unreadCount;
  }

  const notificationList = document.getElementById("notification-list");
  if (notificationList) {
    const item = document.createElement("div");
    item.className = "p-3 hover:bg-gray-50 border-t border-gray-50 text-xs";
    item.innerHTML = `<p class="font-semibold text-gray-900">${title}</p><p class="text-gray-500">${message}</p>`;
    notificationList.prepend(item);
  }
}

function attachCardListeners(card) {
  const fundBtn = card.querySelector(".fund-btn");
  const withdrawBtn = card.querySelector(".withdraw-btn");
  const toggleBtn = card.querySelector(".toggle-visibility");

  if (fundBtn) {
    fundBtn.addEventListener("click", () => {
      activeCard = card;
      fundModal.classList.remove("hidden");
    });
  }

  if (withdrawBtn) {
    withdrawBtn.addEventListener("click", () => {
      activeCard = card;
      withdrawModal.classList.remove("hidden");
    });
  }

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const balanceEl = card.querySelector(".account-balance");
      const numericBalance = parseFloat(
        balanceEl.getAttribute("data-balance") || "0",
      );

      if (balanceEl.getAttribute("data-masked") === "true") {
        balanceEl.textContent =
          "₦ " +
          numericBalance.toLocaleString("en-US", { minimumFractionDigits: 2 });
        balanceEl.setAttribute("data-masked", "false");
      } else {
        balanceEl.textContent = "₦ ****";
        balanceEl.setAttribute("data-masked", "true");
      }
    });
  }
}

document.querySelectorAll(".account-card").forEach(attachCardListeners);

const fundModal = document.getElementById("fund-modal");
const cancelFundBtn = document.getElementById("cancel-fund-btn");
const fundForm = document.getElementById("fund-form");

if (cancelFundBtn) {
  cancelFundBtn.addEventListener("click", () => {
    fundModal.classList.add("hidden");
    fundForm.reset();
  });
}

if (fundModal) {
  fundModal.addEventListener("click", (e) => {
    if (e.target === fundModal) {
      fundModal.classList.add("hidden");
      fundForm.reset();
    }
  });
}

if (fundForm) {
  fundForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!activeCard) return;

    const method = document.getElementById("fund-method").value;
    const amount = parseFloat(document.getElementById("fund-amount").value);
    const formattedAmount =
      "+₦ " + amount.toLocaleString("en-US", { minimumFractionDigits: 2 });
    const timestamp = getFormattedTimestamp();

    const cardName = activeCard.querySelector(".account-name").textContent;
    const cardBalanceEl = activeCard.querySelector(".account-balance");
    let currentBalance = parseFloat(
      cardBalanceEl.getAttribute("data-balance") || "0",
    );

    currentBalance += amount;
    cardBalanceEl.setAttribute("data-balance", currentBalance);
    cardBalanceEl.textContent =
      "₦ " +
      currentBalance.toLocaleString("en-US", { minimumFractionDigits: 2 });

    const tbody = document.getElementById("transactions-tbody");
    if (tbody) {
      const tr = document.createElement("tr");
      tr.className = "hover:bg-gray-50/50 transition-colors";
      tr.innerHTML = `
        <td class="py-4"><div class="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-base">+</div></td>
        <td class="py-4 font-medium text-gray-900">${cardName}</td>
        <td class="py-4 text-gray-500">${method}</td>
        <td class="py-4 text-gray-500 text-xs">${timestamp}</td>
        <td class="py-4 font-bold text-right text-emerald-600">${formattedAmount}</td>
        <td class="py-4 text-center"><span class="px-4 py-1.5 rounded-full text-xs font-medium bg-emerald-500 text-white inline-block shadow-sm w-28 text-center">Completed</span></td>
      `;
      tbody.prepend(tr);
    }

    addNotification(
      "Account Funded",
      `Successfully funded ₦${amount.toLocaleString()} into ${cardName} via ${method}.`,
    );

    fundForm.reset();
    fundModal.classList.add("hidden");
  });
}

const withdrawModal = document.getElementById("withdraw-modal");
const cancelWithdrawBtn = document.getElementById("cancel-withdraw-btn");
const withdrawForm = document.getElementById("withdraw-form");

if (cancelWithdrawBtn) {
  cancelWithdrawBtn.addEventListener("click", () => {
    withdrawModal.classList.add("hidden");
    withdrawForm.reset();
  });
}

if (withdrawModal) {
  withdrawModal.addEventListener("click", (e) => {
    if (e.target === withdrawModal) {
      withdrawModal.classList.add("hidden");
      withdrawForm.reset();
    }
  });
}

if (withdrawForm) {
  withdrawForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!activeCard) return;

    const accName = document.getElementById("withdraw-account-name").value;
    const accNum = document.getElementById("withdraw-account-number").value;
    const method = document.getElementById("withdraw-method").value;
    const amount = parseFloat(document.getElementById("withdraw-amount").value);

    const cardBalanceEl = activeCard.querySelector(".account-balance");
    let currentBalance = parseFloat(
      cardBalanceEl.getAttribute("data-balance") || "0",
    );

    if (amount > currentBalance) {
      alert("Insufficient funds for this withdrawal.");
      return;
    }

    currentBalance -= amount;
    cardBalanceEl.setAttribute("data-balance", currentBalance);
    cardBalanceEl.textContent =
      "₦ " +
      currentBalance.toLocaleString("en-US", { minimumFractionDigits: 2 });

    const formattedAmount =
      "-₦ " + amount.toLocaleString("en-US", { minimumFractionDigits: 2 });
    const timestamp = getFormattedTimestamp();
    const tbody = document.getElementById("transactions-tbody");

    if (tbody) {
      const tr = document.createElement("tr");
      tr.className = "hover:bg-gray-50/50 transition-colors";
      tr.innerHTML = `
        <td class="py-4"><div class="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-base">-</div></td>
        <td class="py-4 font-medium text-gray-900">${accName}</td>
        <td class="py-4 text-gray-500">${method} (${accNum})</td>
        <td class="py-4 text-gray-500 text-xs">${timestamp}</td>
        <td class="py-4 font-bold text-right text-red-600">${formattedAmount}</td>
        <td class="py-4 text-center"><span class="px-4 py-1.5 rounded-full text-xs font-medium bg-emerald-500 text-white inline-block shadow-sm w-28 text-center">Completed</span></td>
      `;
      tbody.prepend(tr);
    }

    addNotification(
      "Withdrawal Successful",
      `Successfully withdrew ₦${amount.toLocaleString()} to ${accName}.`,
    );

    withdrawForm.reset();
    withdrawModal.classList.add("hidden");
  });
}
const addAccountModal = document.getElementById("add-account-modal");
const openAccountModalBtn = document.getElementById("open-account-modal-btn");
const cancelAddAccountBtn = document.getElementById("cancel-add-account-btn");
const addAccountForm = document.getElementById("add-account-form");
const accountsGrid = document.getElementById("accounts-grid");

if (openAccountModalBtn) {
  openAccountModalBtn.addEventListener("click", () => {
    addAccountModal.classList.remove("hidden");
  });
}

if (cancelAddAccountBtn) {
  cancelAddAccountBtn.addEventListener("click", () => {
    addAccountModal.classList.add("hidden");
    addAccountForm.reset();
  });
}

if (addAccountForm) {
  addAccountForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("new-account-name").value;
    const amount =
      parseFloat(document.getElementById("new-account-amount").value) || 0;

    const newCard = document.createElement("div");
    newCard.className =
      "bg-white p-6 rounded-3xl shadow-sm border border-emerald-100 flex flex-col justify-between account-card relative";
    newCard.innerHTML = `
      <div>
        <div class="flex justify-between items-center mb-4">
          <span class="text-sm font-semibold text-emerald-800 account-name">${name}</span>
          <svg class="w-4 h-4 text-gray-400 cursor-pointer toggle-visibility" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
          </svg>
        </div>
        <p class="account-balance text-2xl font-bold text-gray-900 tracking-tight mb-6 transition-all duration-200" data-balance="${amount.toFixed(2)}" data-masked="false">
          ₦ ${amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </p>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <button class="fund-btn py-2 px-3 bg-emerald-500 text-white rounded-xl font-medium text-xs hover:bg-emerald-600 shadow-sm transition-all cursor-pointer">Fund</button>
        <button class="withdraw-btn py-2 px-3 bg-gray-200 text-gray-700 rounded-xl font-medium text-xs hover:bg-gray-300 transition-all cursor-pointer">Withdraw</button>
      </div>
    `;

    accountsGrid.insertBefore(newCard, openAccountModalBtn);
    attachCardListeners(newCard);

    addAccountModal.classList.add("hidden");
    addAccountForm.reset();
  });
}
