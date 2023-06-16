const billInput = document.getElementById('bill');
const numberOfPeopleInput = document.getElementById('peopleInput');
const tipButtons = document.querySelectorAll('.percent-button');
const customTipInput = document.getElementById('customInput');
const personTipOutput = document.getElementById('person');
const totalTipOutput = document.getElementById('total');
const resetButton = document.getElementById('reset');
const errorMessagePeople = document.getElementById('errorMessagePeople');
const errorMessageBill = document.getElementById('errorMessageBill');

const totals = document.getElementById('totals');

let billValue = 0;
let numberOfPeopleValue = 1;
let tipPercentageValue = 0;

// Calculate Tip

function calculateTip() {
  if (numberOfPeopleValue === 0) {
    personTipOutput.innerHTML = '0.00';
    totalTipOutput.innerHTML = '0.00';
    return;
  } else {
    const tipAmount = (billValue * (tipPercentageValue / 100)) / numberOfPeopleValue;
    const totalAmount = (billValue / numberOfPeopleValue) + tipAmount;
    personTipOutput.innerHTML = '$' + tipAmount.toFixed(2);
    totalTipOutput.innerHTML = '$' + totalAmount.toFixed(2);
  }
}

// Bill Input

billInput.addEventListener('input', function (e) {
  if (isNaN(e.target.value)) {
    errorMessageBill.classList.remove('hide');
    errorMessageBill.classList.add('error-message');
    errorMessageBill.innerText = "Please enter a number.";
    billInput.style.borderColor = "red";
  } else {
    errorMessageBill.classList.add('hide');
    errorMessageBill.classList.remove('error-message');
    errorMessageBill.innerText = "";
    billInput.style.borderColor = "";
    billValue = Number(e.target.value);
  }
});

billInput.addEventListener('blur', calculateTip);

// Buttons

tipButtons.forEach(button => {
  button.addEventListener('click', function (e) {
    tipPercentageValue = Number(e.target.innerText.replace('%', ''));
    customTipInput.value = '';
    calculateTip();
  });
});

// Custom Input

customTipInput.addEventListener('change', function (e) {
  tipPercentageValue = Number(e.target.value);
  calculateTip();
});

// Number of People Input

numberOfPeopleInput.addEventListener('input', function (e) {
  numberOfPeopleValue = Number(e.target.value);
  if (numberOfPeopleValue <= 0) {
    errorMessagePeople.classList.remove('hide');
    errorMessagePeople.classList.add('error-message');
    errorMessagePeople.innerText = "Can't be zero";
    numberOfPeopleInput.style.borderColor = "red";  
  } else {
    errorMessagePeople.classList.add('hide');
    errorMessagePeople.classList.remove('error-message');
    numberOfPeopleInput.style.borderColor = "";
    errorMessagePeople.innerText = "";
  }
});

numberOfPeopleInput.addEventListener('blur',function (e) {
  if (isNaN(e.target.value)) {
    errorMessagePeople.classList.remove('hide');
    errorMessagePeople.classList.add('error-message');
    errorMessagePeople.innerText = "Please enter a number.";
    numberOfPeopleInput.style.borderColor = "red";
  } else {
    calculateTip();
  }
});


// Reset Button

resetButton.addEventListener('click', function () {
  billInput.value = '';
  numberOfPeopleInput.value = 1;
  customTipInput.value = '';
  tipPercentageValue = 0;
  billValue = 0;
  numberOfPeopleValue = 1;
  personTipOutput.innerHTML = '$0.00';
  totalTipOutput.innerHTML = '$0.00';
  resetButton.style.backgroundColor = '#F5907B';
  resetButton.style.outline = 'none';
  resetButton.style.color = '#000';
});
