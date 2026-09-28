const toggleBtn = document.getElementById("toggle-balance-btn");
const currentBalanceEl = document.getElementById("current-balance-val");
const incomeEl = document.getElementById("income-val");
const expenseEl = document.getElementById("expense-val");

let isHidden = false;
let realBalance = 133500.0; // Track total numerically
const realIncome = incomeEl.innerText;
const realExpense = expenseEl.innerText;

function formatCurrency(amount) {
  return (
    "₦ " +
    amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}

toggleBtn.addEventListener("click", () => {
  isHidden = !isHidden;
  if (isHidden) {
    currentBalanceEl.innerText = "••••••••";
    incomeEl.innerText = "••••••••";
    expenseEl.innerText = "••••••••";
  } else {
    currentBalanceEl.innerText = formatCurrency(realBalance);
    incomeEl.innerText = realIncome;
    expenseEl.innerText = realExpense;
  }
});

// 2. Month, Date, and Year Selector Script
const monthSelect = document.getElementById("month-select");
const daySelect = document.getElementById("day-select");
const yearSelect = document.getElementById("year-select");

function updateDays() {
  const month = parseInt(monthSelect.value);
  const year = parseInt(yearSelect.value);
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const currentSelectedDay = parseInt(daySelect.value) || 6;

  daySelect.innerHTML = "";
  for (let d = 1; d <= daysInMonth; d++) {
    const opt = document.createElement("option");
    opt.value = d;
    opt.innerText = d < 10 ? "0" + d : d;
    if (
      d === currentSelectedDay ||
      (d === 6 && currentSelectedDay > daysInMonth)
    ) {
      opt.selected = true;
    }
    daySelect.appendChild(opt);
  }
}

monthSelect.addEventListener("change", updateDays);
yearSelect.addEventListener("change", updateDays);

updateDays();
daySelect.value = "6";

// 3. Dynamic Account Creation Modal Script
const addAccountBtn = document.getElementById("add-account-btn");
const accountModal = document.getElementById("account-modal");
const cancelModalBtn = document.getElementById("cancel-modal-btn");
const accountForm = document.getElementById("account-form");
const accountsContainer = document.getElementById("accounts-container");
const accountNameInput = document.getElementById("account-name-input");
const accountAmountInput = document.getElementById("account-amount-input");

addAccountBtn.addEventListener("click", () => {
  accountModal.classList.remove("hidden");
});

cancelModalBtn.addEventListener("click", () => {
  accountModal.classList.add("hidden");
  accountForm.reset();
});

accountForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = accountNameInput.value.trim();
  const amount = parseFloat(accountAmountInput.value);

  if (name && !isNaN(amount)) {
    // Create new card element
    const card = document.createElement("div");
    card.className = "bg-white/80 p-5 rounded-2xl shadow-sm";
    card.innerHTML = `
            <p class="text-xs text-gray-500 font-medium mb-2">${name}</p>
            <p class="text-xl font-bold text-gray-900">${formatCurrency(amount)}</p>
          `;

    accountsContainer.appendChild(card);

    // Update total current balance
    realBalance += amount;
    if (!isHidden) {
      currentBalanceEl.innerText = formatCurrency(realBalance);
    }

    // Close modal and reset form
    accountModal.classList.add("hidden");
    accountForm.reset();
  }
});
