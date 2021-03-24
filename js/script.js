document.addEventListener("DOMContentLoaded", () => {

// Global Variables

const formElement = document.querySelector("form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const jobRole = document.getElementById("title");
const otherJobRole = document.getElementById("other-job-role");
const shirtDesign = document.getElementById("design");
const shirtColor = document.getElementById("color");
const shirtColorOptions = shirtColor.children;
const activities = document.getElementById("activities");
const activitiesInputs = activities.querySelectorAll('input');
const totalCostP = document.getElementById("activities-cost");
const payment = document.getElementById("payment");
const creditCard = document.getElementById("credit-card");
const cardNumber = document.getElementById("cc-num");
const payPal = document.getElementById("paypal");
const btc = document.getElementById("bitcoin");
const zip = document.getElementById("zip");
const cvv = document.getElementById("cvv");
const expMonth = document.getElementById("exp-month");
const expYear = document.getElementById("exp-year");

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

  // Select "Main Conference" by default and disable
// let totalCost = 200;
// const mainConf = activities.querySelector("input[name='all']");
// mainConf.checked = true;
// mainConf.disabled = true;
// totalCostP.innerHTML = `Total: $${totalCost}`;

  // Function to check for overlapping activities

const activityCheck = activity => {
  const time = activity.getAttribute('data-day-and-time');
  if (activity.checked) {
    for (let i = 0; i < activitiesInputs.length; i++) {
      if (activitiesInputs[i].getAttribute('data-day-and-time') === time && !activitiesInputs[i].checked) {
        activitiesInputs[i].disabled = true;
        activitiesInputs[i].parentElement.style.backgroundColor = '#f1f1f1';
      }
    }
  } else {
    for (let i = 0; i < activitiesInputs.length; i++) {
      if (activitiesInputs[i].getAttribute('data-day-and-time') === time && !activitiesInputs[i].checked) {
        activitiesInputs[i].disabled = false;
        activitiesInputs[i].parentElement.style.backgroundColor = '';
      }
    }
  }
}

activities.addEventListener("change", e => {
  const activityCost = parseInt(e.target.getAttribute("data-cost"));

  activityCheck(e.target);

  e.target.checked ? totalCost += activityCost : totalCost -= activityCost;

  totalCostP.innerHTML = `Total: $${totalCost}`;
  if (totalCost >> 0) {
    activities.parentElement.classList.add('valid');
    activities.parentElement.classList.remove('not-valid');
  }
});

// "Payment Info" section

  // Hide PayPal & bitcoin unless selected
payPal.style.display = "none";
btc.style.display = "none";
creditCard.style.display = "block";

  // Credit Card (second option) is default selection
payment.children[1].setAttribute("selected", true);

payment.addEventListener("change", e => {
  const paymentChoices = {
    creditCard: 'credit-card',
    payPal: 'paypal',
    btc: 'bitcoin'
  };
  const paymentOption = e.target.value;

  for (choice in paymentChoices) {
    paymentOption === paymentChoices[choice] ? eval(choice).style.display = 'block' : eval(choice).style.display = 'none';
  }
});

// Form Validation

  // submit event listener

formElement.addEventListener("submit", (e) => {
  // e.preventDefault();

    // test functions
  let testFuncs = {
    emailInput: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(emailInput.value),
    nameInput: /^[a-z ,.'-]{2,}$/i.test(nameInput.value)
  }

  if (payment.value === 'credit-card') {
    // additional tests for credit card payment only
    testFuncs.cardNumber = /^[0-9]{13,16}$/.test(cardNumber.value);
    testFuncs.zip = /^\d{5}$/.test(zip.value);
    testFuncs.cvv = /^\d{3}$/.test(cvv.value);
    testFuncs.expMonth = !isNaN(parseInt(expMonth.value));
    testFuncs.expYear = !isNaN(parseInt(expYear.value));
  } else {
    delete testFuncs.expMonth;
    delete testFuncs.expYear;
    delete testFuncs.zip;
    delete testFuncs.cvv;
  }

    // run test functions
  for (const test in testFuncs) {
    const hint = eval(test).nextElementSibling;
    if (!testFuncs[test]) {
      // invalid
      e.preventDefault();
      console.log(`${test}: ${testFuncs[test]}`);
      console.log(eval(test).parentElement);
      if (hint) {
        // display hint if it exists
        hint.style.display = 'block';
      }
      eval(test).parentElement.classList.add('not-valid');
      eval(test).parentElement.classList.remove('valid');
    } else {
      if (hint) {
        hint.style.display = 'none';
      }
      // eval(test).parentElement.classList.add('valid');
      eval(test).parentElement.classList.remove('not-valid');
    } 
  }

  if (totalCost === 0) {
    e.preventDefault();
    console.log('No activities have been selected');
    activities.classList.add('not-valid');
    activities.classList.remove('valid');
  } else {
    activities.classList.add('valid');
    activities.classList.remove('not-valid');
  }
});

// Accessibility

  // Add focus highlight on activities
const checkboxes = activities.querySelectorAll('[type="checkbox"]');

for (let i = 0; i < checkboxes.length; i++) {
  checkboxes[i].addEventListener('focus', e => {
    e.target.parentElement.classList.add('focus');
  });
  checkboxes[i].addEventListener('blur', () => {
    document.querySelector('.focus').classList.remove('focus');
  });
}

});