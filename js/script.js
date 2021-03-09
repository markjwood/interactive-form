// Global Variables

const nameInput = document.getElementById("name");
const jobRole = document.getElementById("title");
const otherJobRole = document.getElementById("other-job-role");
const shirtDesign = document.getElementById("design");
const shirtColor = document.getElementById("color");
const shirtColorOptions = shirtColor.children;

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

// Disable shirt color selection until style is chosen

shirtColor.disabled = true;

shirtDesign.addEventListener('change', e => {
  shirtColor.disabled = false;
  for (let i = 0; i < shirtColorOptions.length; i++) {
    const option = e.target.value;
    const dataTheme = shirtColorOptions[i].getAttribute("data-theme");
    shirtColorOptions[0].removeAttribute("selected");
    if (option === dataTheme) {
      shirtColorOptions[i].hidden = false;
      shirtColorOptions[i].setAttribute("selected", true);
    } else {
      shirtColorOptions[i].hidden = true;
    }
  }
});