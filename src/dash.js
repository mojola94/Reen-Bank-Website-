const toggleBtn = document.getElementById("toggle-balance-btn");
const currentBalanceEl = document.getElementById("current-balance-val");
const incomeEl = document.getElementById("income-val");
const expenseEl = document.getElementById("expense-val");

let isHidden = false;
let realBalance = 0;
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
    realBalance += amount;
    if (!isHidden) {
      currentBalanceEl.innerText = formatCurrency(realBalance);
    }
    accountModal.classList.add("hidden");
    accountForm.reset();
  }
});
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

  // 👇 ADD THIS LINE TO INSERT THE CARD INTO THE GRID
  accountsGrid.appendChild(newCard);

  // (Optional) Reset form & close modal after appending
  accountForm.reset();
  // accountModal.classList.add('hidden');
});
