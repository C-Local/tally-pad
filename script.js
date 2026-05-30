const countDisplay = document.getElementById("count-display");
const decrementBtn = document.getElementById("decrement-btn");
const incrementBtn = document.getElementById("increment-btn");
const saveBtn = document.getElementById("save-btn");
const tallyList = document.getElementById("tally-list");
const totalDisplay = document.getElementById("total-display");
const averageDisplay = document.getElementById("average-display");
const resetBtn = document.getElementById("reset-btn");

let count = 0;
let savedItems = [];

function decrement() {
  count--;
  countDisplay.textContent = count;
}

function increment() {
  count++;
  countDisplay.textContent = count;
}

// list rendering sub-function

function renderList() {
  if (savedItems.length === 0) {
    const placeholder = document.createElement("p");
    placeholder.id = "tally__placeholder";
    placeholder.textContent = "No counts saved yet";
    tallyList.replaceChildren(placeholder);
    return;
  }

  const placeholder = document.getElementById("tally__placeholder");

  if (placeholder !== null) {
    placeholder.remove();
  }

  tallyList.innerHTML = ``;

  for (let i = 0; i < savedItems.length; i++) {
    let indexNum = i + 1;

    let item = document.createElement("div");
    item.classList.add("tally__item");
    item.id = `${i}`;
    tallyList.appendChild(item);

    let index = document.createElement("p");
    index.classList.add("tally__item-index");
    index.textContent = `#${indexNum}`;
    item.appendChild(index);

    let value = document.createElement("p");
    value.classList.add("tally__item-value");
    value.textContent = `${savedItems[i]}`;
    item.appendChild(value);

    let button = document.createElement("button");
    button.classList.add("tally__item-close");
    button.textContent = "x";
    item.appendChild(button);
  }
}

function save() {
  if (count === 0) {
    return;
  }
  savedItems.push(count);
  count = 0;
  countDisplay.textContent = count;

  renderList();
  updateAverage();
  updateTotal();
}

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

function reset() {
  savedItems = [];
  count = 0;
  countDisplay.textContent = count;
  renderList();
  updateTotal();
  updateAverage();
}

decrementBtn.addEventListener("click", decrement);
incrementBtn.addEventListener("click", increment);
saveBtn.addEventListener("click", save);
resetBtn.addEventListener("click", reset);
tallyList.addEventListener("click", (event) => {
  const closeBtn = event.target.closest(".tally__item-close");
  if (!closeBtn) return;

  const item = closeBtn.closest(".tally__item");
  const index = item.id;

  savedItems.splice(index, 1);

  renderList();
  updateTotal();
  updateAverage();
});
