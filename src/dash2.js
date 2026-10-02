let totalIncome = 0;
let totalExpense = 0;
let activeAccountCard = null;

const currentBalanceEl = document.getElementById("current-balance-val");
const incomeValEl = document.getElementById("income-val");
const expenseValEl = document.getElementById("expense-val");
const statsIncomeEl = document.getElementById("stats-income-val");
const statsExpenseEl = document.getElementById("stats-expense-val");
const incomeProgressBar = document.getElementById("income-progress-bar");
const expenseProgressBar = document.getElementById("expense-progress-bar");
const transactionsContainer = document.getElementById("transactions-container");
const noTransactionsMsg = document.getElementById("no-transactions-msg");
const accountsGrid = document.getElementById("accounts-grid");

// Account Modal Elements
const accountModal = document.getElementById("account-modal");
const openAccountModalBtn = document.getElementById("open-account-modal-btn");
const cancelAccountBtn = document.getElementById("cancel-account-btn");
const accountForm = document.getElementById("account-form");
const newAccountNameInput = document.getElementById("new-account-name");
const newAccountBalanceInput = document.getElementById("new-account-balance");

// Fund Modal Elements
const fundModal = document.getElementById("fund-modal");
const cancelFundBtn = document.getElementById("cancel-fund-btn");
const fundForm = document.getElementById("fund-form");
const fundBankInput = document.getElementById("fund-bank-input");
const fundAccountNo = document.getElementById("fund-account-no");
const fundAmountInput = document.getElementById("fund-amount-input");

// Withdraw Modal Elements
const withdrawModal = document.getElementById("withdraw-modal");
const cancelWithdrawBtn = document.getElementById("cancel-withdraw-btn");
const withdrawForm = document.getElementById("withdraw-form");
const withdrawAmountInput = document.getElementById("withdraw-amount-input");

// Open / Close Account Modal
openAccountModalBtn.addEventListener("click", () => {
  accountModal.classList.remove("hidden");
});
cancelAccountBtn.addEventListener("click", () => {
  accountModal.classList.add("hidden");
  accountForm.reset();
});

// Recalculate total balance across all account cards
function updateOverallBalance() {
  let total = 0;
  const balanceEls = document.querySelectorAll(".account-balance");
  balanceEls.forEach((el) => {
    const cleanVal = parseFloat(el.innerText.replace(/[^0-9.-]+/g, "")) || 0;
    total += cleanVal;
  });
  currentBalanceEl.innerText =
    "₦ " +
    total.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
}

// Handle New Account Creation
accountForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = newAccountNameInput.value.trim();
  const initialBal = parseFloat(newAccountBalanceInput.value) || 0;
  if (!name) return;

  const formattedBal =
    "₦ " +
    initialBal.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const newCard = document.createElement("div");
  newCard.className =
    "bg-[#dcfce7] p-6 rounded-3xl shadow-sm flex flex-col justify-between account-card";
  newCard.innerHTML = `
          <div>
            <div class="flex justify-between items-center mb-3">
              <p class="text-sm font-semibold text-purple-900 account-name">${name}</p>
              <svg class="w-4 h-4 text-gray-600 cursor-pointer" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
            </div>
            <p class="account-balance text-2xl font-bold text-gray-900 tracking-tight mb-6">${formattedBal}</p>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <button class="fund-btn py-2.5 px-3 bg-emerald-500 text-white rounded-xl font-medium text-sm hover:bg-emerald-600 shadow-sm transition-all cursor-pointer flex items-center justify-center space-x-1">
              <span>Fund</span>
            </button>
            <button class="withdraw-btn py-2.5 px-3 bg-gray-300 text-gray-700 rounded-xl font-medium text-sm hover:bg-gray-400 shadow-sm transition-all cursor-pointer flex items-center justify-center space-x-1">
              <span>Withdraw</span>
            </button>
          </div>
        `;

  accountsGrid.appendChild(newCard);
  attachCardListeners(newCard);
  updateOverallBalance();

  accountForm.reset();
  accountModal.classList.add("hidden");
});

function attachCardListeners(cardElement) {
  const fundBtn = cardElement.querySelector(".fund-btn");
  const withdrawBtn = cardElement.querySelector(".withdraw-btn");

  fundBtn.addEventListener("click", () => {
    activeAccountCard = cardElement;
    fundModal.classList.remove("hidden");
  });

  withdrawBtn.addEventListener("click", () => {
    activeAccountCard = cardElement;
    withdrawModal.classList.remove("hidden");
  });
}

document
  .querySelectorAll(".account-card")
  .forEach((card) => attachCardListeners(card));

// Fund Modal Actions
cancelFundBtn.addEventListener("click", () => {
  fundModal.classList.add("hidden");
  fundForm.reset();
});

fundForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const amount = parseFloat(fundAmountInput.value);
  const bank = fundBankInput.value;
  const accNo = fundAccountNo.value;

  if (isNaN(amount) || amount <= 0 || !activeAccountCard) return;

  const accountNameEl = activeAccountCard.querySelector(".account-name");
  const accountBalanceEl = activeAccountCard.querySelector(".account-balance");
  const accountName = accountNameEl ? accountNameEl.innerText : "Main Account";

  let cardBalance =
    parseFloat(accountBalanceEl.innerText.replace(/[^0-9.-]+/g, "")) || 0;
  cardBalance += amount;
  totalIncome += amount;

  const formattedAmount =
    "₦ " +
    amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  const formattedCardBalance =
    "₦ " +
    cardBalance.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  const formattedIncome =
    "₦ " +
    totalIncome.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  const formattedExpense =
    "₦ " +
    totalExpense.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  accountBalanceEl.innerText = formattedCardBalance;
  updateOverallBalance();

  incomeValEl.innerText = formattedIncome;
  expenseValEl.innerText = formattedExpense;
  statsIncomeEl.innerText = formattedIncome;
  statsExpenseEl.innerText = formattedExpense;

  const maxScale = Math.max(totalIncome, totalExpense, 1);
  incomeProgressBar.style.width =
    Math.min(100, (totalIncome / maxScale) * 100) + "%";
  expenseProgressBar.style.width =
    Math.min(100, (totalExpense / maxScale) * 100) + "%";

  if (noTransactionsMsg) {
    noTransactionsMsg.remove();
  }

  const transactionItem = document.createElement("div");
  transactionItem.className =
    "flex items-center justify-between p-3 bg-gray-50 rounded-2xl";
  transactionItem.innerHTML = `
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-green-100 text-green-600 rounded-xl flex items-center justify-center font-bold text-sm">
              +
            </div>
            <div>
              <p class="text-sm font-bold text-gray-950">Fund via ${bank} (${accNo})</p>
              <p class="text-xs text-gray-400">${accountName} • Just now</p>
            </div>
          </div>
          <span class="text-sm font-bold text-green-600">+ ${formattedAmount}</span>
        `;

  transactionsContainer.prepend(transactionItem);

  fundForm.reset();
  fundModal.classList.add("hidden");
});

// Withdraw Modal Actions
cancelWithdrawBtn.addEventListener("click", () => {
  withdrawModal.classList.add("hidden");
  withdrawForm.reset();
});

withdrawForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const amount = parseFloat(withdrawAmountInput.value);

  if (isNaN(amount) || amount <= 0 || !activeAccountCard) return;

  const accountNameEl = activeAccountCard.querySelector(".account-name");
  const accountBalanceEl = activeAccountCard.querySelector(".account-balance");
  const accountName = accountNameEl ? accountNameEl.innerText : "Main Account";

  let cardBalance =
    parseFloat(accountBalanceEl.innerText.replace(/[^0-9.-]+/g, "")) || 0;
  cardBalance -= amount;
  totalExpense += amount;

  const formattedAmount =
    "₦ " +
    amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  const formattedCardBalance =
    "₦ " +
    cardBalance.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  const formattedIncome =
    "₦ " +
    totalIncome.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  const formattedExpense =
    "₦ " +
    totalExpense.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  accountBalanceEl.innerText = formattedCardBalance;
  updateOverallBalance();

  incomeValEl.innerText = formattedIncome;
  expenseValEl.innerText = formattedExpense;
  statsIncomeEl.innerText = formattedIncome;
  statsExpenseEl.innerText = formattedExpense;

  const maxScale = Math.max(totalIncome, totalExpense, 1);
  incomeProgressBar.style.width =
    Math.min(100, (totalIncome / maxScale) * 100) + "%";
  expenseProgressBar.style.width =
    Math.min(100, (totalExpense / maxScale) * 100) + "%";

  if (noTransactionsMsg) {
    noTransactionsMsg.remove();
  }

  const transactionItem = document.createElement("div");
  transactionItem.className =
    "flex items-center justify-between p-3 bg-gray-50 rounded-2xl";
  transactionItem.innerHTML = `
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-red-100 text-red-600 rounded-xl flex items-center justify-center font-bold text-sm">
              -
            </div>
            <div>
              <p class="text-sm font-bold text-gray-900">Withdrawal</p>
              <p class="text-xs text-gray-400">${accountName} • Just now</p>
            </div>
          </div>
          <span class="text-sm font-bold text-red-600">- ${formattedAmount}</span>
        `;

  transactionsContainer.prepend(transactionItem);

  withdrawForm.reset();
  withdrawModal.classList.add("hidden");
});

const searchInput = document.getElementById("search-input");
searchInput.addEventListener("input", function (e) {
  const query = e.target.value.toLowerCase();
  const transactionRows = document.querySelectorAll(
    "#transactions-container > div",
  );
  transactionRows.forEach((row) => {
    if (row.id === "no-transactions-msg") return;
    const text = row.innerText.toLowerCase();
    row.style.display = text.includes(query) ? "" : "none";
  });
});
