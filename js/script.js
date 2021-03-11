document.addEventListener("DOMContentLoaded", () => {

// Global Variables

const nameInput = document.getElementById("name");
const jobRole = document.getElementById("title");
const otherJobRole = document.getElementById("other-job-role");
const shirtDesign = document.getElementById("design");
const shirtColor = document.getElementById("color");
const shirtColorOptions = shirtColor.children;
const activities = document.getElementById("activities");
const totalCostP = document.getElementById("activities-cost");
const payment = document.getElementById("payment");
const creditCard = document.getElementById("credit-card");
const payPal = document.getElementById("paypal");
const btc = document.getElementById("bitcoin");

// Give name input field focus

nameInput.focus();

// Hide "Other job role" field by default.
// Display when "other" is selected
otherJobRole.style.display = "none";

jobRole.addEventListener('change', (option) => {
  if (option.target.value === 'other') {
    otherJobRole.style.display = "";
  } else {
    otherJobRole.style.display = "none";
  }
});

// "T-shirt info" section

  // Disable shirt color selection until style is chosen

shirtColor.disabled = true;

shirtDesign.addEventListener('change', e => {
  shirtColor.disabled = false;
  let firstChoice = true;
  
  for (let i = 0; i < shirtColorOptions.length; i++) {
    const design = e.target.value;
    const dataTheme = shirtColorOptions[i].getAttribute("data-theme");

    if (design === dataTheme) {
      shirtColorOptions[i].hidden = false;
      if (firstChoice) {
        shirtColorOptions[i].setAttribute("selected", true);
        firstChoice = false;
      }
    } else {
      shirtColorOptions[i].hidden = true;
      shirtColorOptions[i].removeAttribute("selected");
    }
  }

});

// "Register for Activities" section

let totalCost = 0;

activities.addEventListener("change", e => {
  const activityCost = parseInt(e.target.getAttribute("data-cost"));
  if (e.target.checked) {
    totalCost += activityCost;
  } else {
    totalCost -= activityCost;
  }
  totalCostP.innerHTML = `Total: $${totalCost}`;
});

// "Payment Info" section

  // Hide PayPal & bitcoin unless selected
payPal.style.display = "none";
btc.style.display = "none";
creditCard.style.display = "block";

  // Credit Card (second option) is default selection
payment.children[1].setAttribute("selected", true);

payment.addEventListener("change", e => {
  const paymentOption = e.target.value;
  if (paymentOption === 'bitcoin') {
    btc.style.display = "block";
    payPal.style.display = "none";
    creditCard.style.display = "none";
  } else if (paymentOption === 'paypal') {
    payPal.style.display = "block";
    btc.style.display = "none";
    creditCard.style.display = "none";
  } else {
    payPal.style.display = "none";
    btc.style.display = "none";
    creditCard.style.display = "block";
  }
});

});