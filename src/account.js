let activeCard = null;
const accountsGrid = document.getElementById("accounts-grid");
const transactionsTbody = document.getElementById("transactions-tbody");
const noTransactionsMsg = document.getElementById("no-transactions");

// Notification Elements
const notificationBellBtn = document.getElementById("notification-bell-btn");
const notificationDropdown = document.getElementById("notification-dropdown");
const notificationList = document.getElementById("notification-list");
const notificationBadge = document.getElementById("notification-badge");
const markAllReadBtn = document.getElementById("mark-all-read-btn");

// Mock initial notifications
let notifications = [
  {
    id: 1,
    title: "Account Funded",
    desc: "Successfully funded Main Account with ₦ 10,000.00 via Direct Pay.",
    time: "06.Mar.2023 - 09:39",
    unread: true,
  },
  {
    id: 2,
    title: "Withdrawal Completed",
    desc: "Successfully withdrew ₦ 10,000.00 to account 0123456789 via Bank Transfer.",
    time: "06.Mar.2023 - 09:39",
    unread: true,
  },
];

function renderNotifications() {
  notificationList.innerHTML = "";
  let unreadCount = 0;

  notifications.forEach((notif) => {
    if (notif.unread) unreadCount++;
    const item = document.createElement("div");
    item.className = `p-3 hover:bg-gray-50 transition-colors flex items-start space-x-2 ${notif.unread ? "bg-emerald-50/40" : ""}`;
    item.innerHTML = `
            <div class="w-2 h-2 rounded-full ${notif.unread ? "bg-emerald-500" : "bg-transparent"} mt-1.5 shrink-0"></div>
            <div class="flex-1">
              <p class="font-bold text-gray-900">${notif.title}</p>
              <p class="text-gray-600 leading-relaxed">${notif.desc}</p>
              <span class="text-[10px] text-gray-400 mt-1 block">${notif.time}</span>
            </div>
          `;
    notificationList.appendChild(item);
  });

  if (unreadCount > 0) {
    notificationBadge.innerText = unreadCount;
    notificationBadge.classList.remove("hidden");
  } else {
    notificationBadge.classList.add("hidden");
  }

  if (notifications.length === 0) {
    notificationList.innerHTML = `<div class="p-4 text-center text-gray-400">No notifications yet.</div>`;
  }
}

renderNotifications();

// Toggle notification dropdown
notificationBellBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  notificationDropdown.classList.toggle("hidden");
});

document.addEventListener("click", (e) => {
  if (
    !notificationDropdown.contains(e.target) &&
    !notificationBellBtn.contains(e.target)
  ) {
    notificationDropdown.classList.add("hidden");
  }
});

markAllReadBtn.addEventListener("click", () => {
  notifications.forEach((n) => (n.unread = false));
  renderNotifications();
});

function pushNotification(title, desc) {
  notifications.unshift({
    id: Date.now(),
    title: title,
    desc: desc,
    time: getFormattedTimestamp(),
    unread: true,
  });
  renderNotifications();
}

// View All Modal elements
const viewAllBtn = document.getElementById("view-all-btn");
const viewAllModal = document.getElementById("view-all-modal");
const closeViewAllBtn = document.getElementById("close-view-all-btn");
const allTransactionsTbody = document.getElementById("all-transactions-tbody");

// Limit main table view to show only 4 transactions
function updateMainTableDisplay() {
  const rows = transactionsTbody.querySelectorAll("tr");
  rows.forEach((row, index) => {
    if (index < 4) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
  if (rows.length === 0 && noTransactionsMsg) {
    noTransactionsMsg.classList.remove("hidden");
  }
}

updateMainTableDisplay();

viewAllBtn.addEventListener("click", () => {
  populateAllTransactionsModal();
  viewAllModal.classList.remove("hidden");
});
closeViewAllBtn.addEventListener("click", () => {
  viewAllModal.classList.add("hidden");
});

// Modals
const accountModal = document.getElementById("account-modal");
const openAccountModalBtn = document.getElementById("open-account-modal-btn");
const cancelAccountBtn = document.getElementById("cancel-account-btn");
const accountForm = document.getElementById("account-form");

const fundModal = document.getElementById("fund-modal");
const cancelFundBtn = document.getElementById("cancel-fund-btn");
const fundForm = document.getElementById("fund-form");
const fundAmountInput = document.getElementById("fund-amount");
const fundMethodInput = document.getElementById("fund-method");

const withdrawModal = document.getElementById("withdraw-modal");
const cancelWithdrawBtn = document.getElementById("cancel-withdraw-btn");
const withdrawForm = document.getElementById("withdraw-form");
const withdrawAmountInput = document.getElementById("withdraw-amount");
const withdrawMethodInput = document.getElementById("withdraw-method");
const withdrawAccountInput = document.getElementById("withdraw-account-number");

// Open / Close Account Modal
openAccountModalBtn.addEventListener("click", () =>
  accountModal.classList.remove("hidden"),
);
cancelAccountBtn.addEventListener("click", () => {
  accountModal.classList.add("hidden");
  accountForm.reset();
});

// Handle New Account Creation
accountForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("new-account-name").value.trim();
  const initialBal =
    parseFloat(document.getElementById("new-account-balance").value) || 0;
  if (!name) return;

  const formattedBal =
    "₦ " +
    initialBal.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const newCard = document.createElement("div");
  newCard.className =
    "bg-white p-6 rounded-3xl shadow-sm border border-emerald-100 flex flex-col justify-between account-card relative";
  newCard.innerHTML = `
          <div>
            <div class="flex justify-between items-center mb-4">
              <span class="text-sm font-semibold text-purple-900 account-name">${name}</span>
              <svg class="w-4 h-4 text-gray-400 cursor-pointer toggle-visibility" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
              </svg>
            </div>
            <p class="account-balance text-2xl font-bold text-gray-900 tracking-tight mb-6 transition-all duration-200" data-balance="${initialBal}">${formattedBal}</p>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <button class="fund-btn py-2 px-3 bg-emerald-500 text-white rounded-xl font-medium text-xs hover:bg-emerald-600 shadow-sm transition-all cursor-pointer">Fund</button>
            <button class="withdraw-btn py-2 px-3 bg-gray-200 text-gray-700 rounded-xl font-medium text-xs hover:bg-gray-300 transition-all cursor-pointer">Withdraw</button>
          </div>
        `;

  accountsGrid.insertBefore(newCard, openAccountModalBtn);
  attachCardListeners(newCard);

  pushNotification(
    "New Account Created",
    `Successfully created account "${name}" with initial balance ${formattedBal}.`,
  );

  accountForm.reset();
  accountModal.classList.add("hidden");
});

// Attach button and icon toggle listeners to individual account cards
function attachCardListeners(card) {
  card.querySelector(".fund-btn").addEventListener("click", () => {
    activeCard = card;
    fundModal.classList.remove("hidden");
  });
  card.querySelector(".withdraw-btn").addEventListener("click", () => {
    activeCard = card;
    withdrawModal.classList.remove("hidden");
  });

  const toggleIcon = card.querySelector(".toggle-visibility");
  const balanceEl = card.querySelector(".account-balance");

  toggleIcon.addEventListener("click", () => {
    const isHidden = balanceEl.getAttribute("data-hidden") === "true";
    const rawValue = balanceEl.getAttribute("data-balance") || "0";
    const numericVal = parseFloat(rawValue) || 0;

    const formattedText =
      "₦ " +
      numericVal.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

    if (isHidden) {
      balanceEl.setAttribute("data-hidden", "false");
      balanceEl.innerText = formattedText;
      balanceEl.classList.remove(
        "blur-[3px]",
        "select-none",
        "text-transparent",
        "bg-clip-text",
        "bg-gray-800",
      );
      toggleIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>`;
    } else {
      balanceEl.setAttribute("data-hidden", "true");
      balanceEl.innerText = formattedText;
      balanceEl.classList.add(
        "blur-[3px]",
        "select-none",
        "text-transparent",
        "bg-clip-text",
        "bg-gray-800",
      );
      toggleIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>`;
    }
  });
}

document
  .querySelectorAll(".account-card")
  .forEach((card) => attachCardListeners(card));

// Fund actions
cancelFundBtn.addEventListener("click", () => {
  fundModal.classList.add("hidden");
  fundForm.reset();
});

fundForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const amount = parseFloat(fundAmountInput.value);
  const method = fundMethodInput.value;
  if (isNaN(amount) || amount <= 0 || !activeCard) return;

  const nameEl = activeCard.querySelector(".account-name");
  const balanceEl = activeCard.querySelector(".account-balance");
  const accountName = nameEl ? nameEl.innerText : "Account";

  let currentBal = parseFloat(balanceEl.getAttribute("data-balance")) || 0;
  currentBal += amount;
  balanceEl.setAttribute("data-balance", currentBal);

  const isHidden = balanceEl.getAttribute("data-hidden") === "true";
  const formattedText =
    "₦ " +
    currentBal.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  balanceEl.innerText = formattedText;
  if (isHidden) {
    balanceEl.classList.add(
      "blur-[3px]",
      "select-none",
      "text-transparent",
      "bg-clip-text",
      "bg-gray-800",
    );
  }

  addTransactionRecord({
    type: "deposit",
    name: accountName,
    method: method,
    amount: amount,
    status: "Completed",
  });

  const formattedAmtStr =
    "₦ " +
    amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  pushNotification(
    "Account Funded Successfully",
    `Added ${formattedAmtStr} to ${accountName} via ${method}.`,
  );

  fundForm.reset();
  fundModal.classList.add("hidden");
});

// Withdraw actions
cancelWithdrawBtn.addEventListener("click", () => {
  withdrawModal.classList.add("hidden");
  withdrawForm.reset();
});

withdrawForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const amount = parseFloat(withdrawAmountInput.value);
  const method = withdrawMethodInput.value;
  const accountNumber = withdrawAccountInput.value.trim();
  if (isNaN(amount) || amount <= 0 || !activeCard || !accountNumber) return;

  const nameEl = activeCard.querySelector(".account-name");
  const balanceEl = activeCard.querySelector(".account-balance");
  const accountName = nameEl ? nameEl.innerText : "Account";

  let currentBal = parseFloat(balanceEl.getAttribute("data-balance")) || 0;
  currentBal -= amount;
  balanceEl.setAttribute("data-balance", currentBal);

  const isHidden = balanceEl.getAttribute("data-hidden") === "true";
  const formattedText =
    "₦ " +
    currentBal.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  balanceEl.innerText = formattedText;
  if (isHidden) {
    balanceEl.classList.add(
      "blur-[3px]",
      "select-none",
      "text-transparent",
      "bg-clip-text",
      "bg-gray-800",
    );
  }

  const methodDisplay = `${method} (${accountNumber})`;

  addTransactionRecord({
    type: "withdraw",
    name: accountName,
    method: methodDisplay,
    amount: amount,
    status: "Completed",
  });

  const formattedAmtStr =
    "₦ " +
    amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  pushNotification(
    "Withdrawal Completed",
    `Withdrew ${formattedAmtStr} to account ${accountNumber} via ${method}.`,
  );

  withdrawForm.reset();
  withdrawModal.classList.add("hidden");
});

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
  const mins = String(now.getMinutes()).padStart(2, "0");
  return `${day}.${month}.${year} - ${hours}:${mins}`;
}

function addTransactionRecord({ type, name, method, amount, status }) {
  if (noTransactionsMsg) noTransactionsMsg.classList.add("hidden");

  const isDeposit = type === "deposit";
  const formattedAmount =
    (isDeposit ? "+" : "-") +
    "₦ " +
    amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  const timestamp = getFormattedTimestamp();

  let badgeClass = "bg-emerald-500 text-white";
  if (status === "Pending") badgeClass = "bg-gray-300 text-gray-700";
  if (status === "Canceled") badgeClass = "bg-red-500 text-white";

  const row = document.createElement("tr");
  row.className = "hover:bg-gray-50/50 transition-colors";
  row.innerHTML = `
          <td class="py-4">
            <div class="w-8 h-8 rounded-full ${isDeposit ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-600"} flex items-center justify-center font-bold text-base">
              ${isDeposit ? "+" : "-"}
            </div>
          </td>
          <td class="py-4 font-medium text-gray-900">${name}</td>
          <td class="py-4 text-gray-500">${method}</td>
          <td class="py-4 text-gray-500 text-xs">${timestamp}</td>
          <td class="py-4 font-bold text-right ${isDeposit ? "text-emerald-600" : "text-red-600"}">${formattedAmount}</td>
          <td class="py-4 text-center">
            <span class="px-4 py-1.5 rounded-full text-xs font-medium ${badgeClass} inline-block shadow-sm w-28 text-center">${status}</span>
          </td>
        `;

  transactionsTbody.prepend(row);
  updateMainTableDisplay();
}

function populateAllTransactionsModal() {
  allTransactionsTbody.innerHTML = "";
  const rows = transactionsTbody.querySelectorAll("tr");
  rows.forEach((row) => {
    allTransactionsTbody.appendChild(row.cloneNode(true));
  });
}

// Search Transactions functionality
document.getElementById("search-input").addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  const rows = transactionsTbody.querySelectorAll("tr");
  rows.forEach((row, index) => {
    const text = row.innerText.toLowerCase();
    const matchesQuery = text.includes(query);
    // If searching, display matching items; otherwise respect the 4-item limit on main interface
    if (query) {
      row.style.display = matchesQuery ? "" : "none";
    } else {
      row.style.display = index < 4 ? "" : "none";
    }
  });
});
