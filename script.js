// element loading

const countDisplay = document.getElementById("count-display");
const decrementBtn = document.getElementById("decrement-btn");
const incrementBtn = document.getElementById("increment-btn");
const saveBtn = document.getElementById("save-btn");
const tallyList = document.getElementById("tally-list");
const totalDisplay = document.getElementById("total-display");
const averageDisplay = document.getElementById("average-display");
const resetBtn = document.getElementById("reset-btn");

// variable initializing

let count = 0;
let savedItems = [];

// decrement function

function decrement() {
  count--;
  countDisplay.textContent = count;
}

// increment function

function increment() {
  count++;
  countDisplay.textContent = count;
}

// tally sub-function

function tally() {
  if (savedItems.length === 0) {
    tallyList.innerHTML = `<p class="tally__placeholder">No counts saved yet</p>`;
    return;
  }
  tallyList.innerHTML = ``;

  for (let i = 0; i < savedItems.length; i++) {
    let indexNum = i + 1;
    tallyList.innerHTML += `<div class="tally__item" data-index="${i}">
        <p class="tally__item-index">#${indexNum}</p>
        <p class="tally__item-value">${savedItems[i]}</p>
        <button class="tally__item-close">x</button>
      </div>`;
  }
}

// save function

function save() {
  if (count === 0) {
    return;
  }
  savedItems.push(count);
  count = 0;
  countDisplay.textContent = count;

  tally();
  updateAverage();
  updateTotal();
}

// updateTotal function

function updateTotal() {
  if (savedItems.length === 0) {
    totalDisplay.textContent = 0;
    return;
  }

  let sumTotal = 0;

  for (let i = 0; i < savedItems.length; i++) {
    sumTotal += savedItems[i];
  }

  totalDisplay.textContent = sumTotal;
}

// updateAverage function

function updateAverage() {
  if (savedItems.length === 0) {
    averageDisplay.textContent = 0;
    return;
  }

  let sumAverage = 0;

  for (let i = 0; i < savedItems.length; i++) {
    sumAverage += savedItems[i];
  }
  sumAverage /= savedItems.length;
  averageDisplay.textContent = Number.isInteger(sumAverage)
    ? sumAverage
    : sumAverage.toFixed(1);
  sumAverage.toFixed(2);
}

// reset function

function reset() {
  savedItems = [];
  count = 0;
  countDisplay.textContent = count;
  tally();
  updateTotal();
  updateAverage();
}

// event listeners

decrementBtn.addEventListener("click", decrement);
incrementBtn.addEventListener("click", increment);
saveBtn.addEventListener("click", save);
resetBtn.addEventListener("click", reset);
tallyList.addEventListener("click", (event) => {
  const closeBtn = event.target.closest(".tally__item-close");
  if (!closeBtn) return;

  const item = closeBtn.closest(".tally__item");
  const index = Number(item.dataset.index);

  savedItems.splice(index, 1);

  tally();
  updateTotal();
  updateAverage();
});
