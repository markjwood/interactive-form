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

activities.addEventListener("change", e => {
  const activityCost = parseInt(e.target.getAttribute("data-cost"));
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

// Form Validation

  // submit event listener

formElement.addEventListener("submit", (e) => {
  e.preventDefault();

    // test functions
  const testFuncs = {
    emailInput: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(emailInput.value),
    nameInput: /^[a-z ,.'-]{2,}$/i.test(nameInput.value),
    cardNumber: /^[0-9]{13,16}$/.test(cardNumber.value),
    zip: /^\d{5}$/.test(zip.value),
    cvv: /^\d{3}$/.test(cvv.value)
  }

  for (const test in testFuncs) {
    if ((test !== 'cardNumber' && test !== 'zip' && test !== 'cvv') || payment.value === 'credit-card') {
      if (!testFuncs[test]) {
        console.log(`${test}: ${testFuncs[test]}`);
        console.log(eval(test).parentElement);
        eval(test).parentElement.classList.add('not-valid');
        eval(test).parentElement.classList.remove('valid');
      } else {
        eval(test).parentElement.classList.add('valid');
        eval(test).parentElement.classList.remove('not-valid');
      }
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
  
  // if (payment.value === 'credit-card') {
  //   if (!ccTest(cardNumber.value)) {
  //     e.preventDefault();
  //     console.log('Card number is invalid');
  //     cardNumber.parentElement.classList.add('not-valid');
  //     cardNumber.parentElement.classList.remove('valid');
  //   } else {
  //     cardNumber.parentElement.classList.add('valid');
  //     cardNumber.parentElement.classList.remove('not-valid');
  //   }
    
  //   if (!zipTest(zip.value)) {
  //     e.preventDefault();
  //     console.log('Zipcode is invalid.');
  //     zip.parentElement.classList.add('not-valid');
  //     zip.parentElement.classList.remove('valid');
  //   } else {
  //     zip.parentElement.classList.add('valid');
  //     zip.parentElement.classList.remove('not-valid');
  //   }

  //   if (!cvvTest(cvv.value)) {
  //     e.preventDefault();
  //     console.log('CVV is invalid.');
  //     cvv.parentElement.classList.add('not-valid');
  //     cvv.parentElement.classList.remove('valid');
  //   } else {
  //     cvv.parentElement.classList.add('valid');
  //     cvv.parentElement.classList.remove('not-valid');
  //   }

  //   if (isNaN(parseInt(expMonth.value)) || isNaN(parseInt(expYear.value))) {
  //     e.preventDefault();
  //     console.log('Please select card expiration date & year.');
  //     expMonth.parentElement.classList.add('not-valid');
  //     expYear.parentElement.classList.add('not-valid');
  //     expMonth.parentElement.classList.remove('valid');
  //     expYear.parentElement.classList.remove('valid');
  //   } else {
  //     expMonth.parentElement.classList.add('valid');
  //     expYear.parentElement.classList.add('valid');
  //     expMonth.parentElement.classList.remove('not-valid');
  //     expYear.parentElement.classList.remove('not-valid');
  //   }

  // } else {
  //   console.log(payment.value);
  // }
});

// Accessibility

  // Add focus highlight on activities
const checkboxes = activities.querySelectorAll('[type="checkbox"]');

for (let i = 0; i < checkboxes.length; i++) {
  checkboxes[i].addEventListener('focus', e => {
    e.target.parentElement.classList.add('focus');
  });
  checkboxes[i].addEventListener('blur', e => {
    e.target.parentElement.classList.remove('focus');
  });
}

});