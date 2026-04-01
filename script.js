let current = 0;
let goal = 0;
let finished = false;

// 🔥 AUTO REDIRECT αν υπάρχουν δεδομένα
const hasData =
  localStorage.getItem("current") !== null &&
  localStorage.getItem("goal") !== null;

const isReset = sessionStorage.getItem("reset");

if (hasData && !isReset) {
  if (!window.location.pathname.includes("app.html")) {
    window.location.href = "app.html";
  }
}

// καθάρισε το reset flag ΜΕΤΑ
if (isReset) {
  sessionStorage.removeItem("reset");
}

// 👉 Σελίδα 1
function startApp() {
  current = parseFloat(document.getElementById("currentInput").value) || 0;
  goal = parseFloat(document.getElementById("goalInput").value) || 1;

  // αποθήκευση
  localStorage.setItem("current", current);
  localStorage.setItem("goal", goal);

  // μετάβαση
  window.location.href = "app.html";
}

// 👉 Σελίδα 2 - φόρτωμα δεδομένων
window.onload = function () {
  if (window.location.pathname.includes("app.html")) {
    current = parseFloat(localStorage.getItem("current")) || 0;
    goal = parseFloat(localStorage.getItem("goal")) || 1;

    updateUI();
  }
};

function updateProgress() {
  let change = parseFloat(document.getElementById("changeAmount").value) || 0;

  current += change;

  // αποθήκευση
  localStorage.setItem("current", current);

  updateUI();
}

function updateUI() {
  let percent = (current / goal) * 100;

  if (percent < 0) percent = 0;
  if (percent > 100) percent = 100;

  document.getElementById("bar").style.width = percent + "%";
  document.getElementById("character").style.left = percent + "%";

  document.getElementById("moneyDisplay").innerText = "💰 " + current + "€";

  // 🎉 CONFETTI
  if (current >= goal && !finished) {
    finished = true;

    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 }
    });
  }
}

// 🔴 RESET
function resetApp() {
  localStorage.removeItem("current");
  localStorage.removeItem("goal");

  sessionStorage.setItem("reset", "true");

  window.location.href = "./index.html";
}