let displayValue = '';
let currentOperator = null;
let previousValue = '';

function updateDisplay() {
  document.getElementById('display').innerText = displayValue || '0';
}

function appendNumber(number) {
  displayValue += number;
  updateDisplay();
}

function chooseOperator(operator) {
  if (displayValue === '') return;
  if (previousValue !== '') {
    calculate();
  }
  currentOperator = operator;
  previousValue = displayValue;
  displayValue = '';
}

function calculate() {
  if (!currentOperator || displayValue === '') return;
  const currentValue = parseFloat(displayValue);
  const previousNum = parseFloat(previousValue);
  switch (currentOperator) {
    case '+':
      displayValue = (previousNum + currentValue).toString();
      break;
    case '-':
      displayValue = (previousNum - currentValue).toString();
      break;
    case '*':
      displayValue = (previousNum * currentValue).toString();
      break;
    case '/':
      displayValue = currentValue === 0 ? 'Error' : (previousNum / currentValue).toString();
      break;
  }
  currentOperator = null;
  previousValue = '';
  updateDisplay();
}

function appendDecimal() {
  if (displayValue.includes('.')) return;
  displayValue += '.';
  updateDisplay();
}

function clearDisplay() {
  displayValue = '';
  previousValue = '';
  currentOperator = null;
  updateDisplay();
}

function performOperation(operation) {
  const currentValue = parseFloat(displayValue);
  switch (operation) {
    case 'sqrt':
      displayValue = Math.sqrt(currentValue).toString();
      break;
    case '%':
      displayValue = (currentValue / 100).toString();
      break;
  }
  updateDisplay();
}

// Keyboard Support
document.addEventListener('keydown', (event) => {
  if (event.key >= '0' && event.key <= '9') {
    appendNumber(event.key);
  } else if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
    chooseOperator(event.key);
  } else if (event.key === 'Enter' || event.key === '=') {
    calculate();
  } else if (event.key === 'Backspace') {
    clearDisplay();
  } else if (event.key === '.') {
    appendDecimal();
  }
}); 
