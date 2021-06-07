const calculadora = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operador: null,
  };
  
  function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calculadora;
  
    if (waitingForSecondOperand === true) {
        calculadora.displayValue = digit;
        calculadora.waitingForSecondOperand = false;
    } else {
        calculadora.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
  }
  
  function inputDecimal(dot) {
    if (calculadora.waitingForSecondOperand === true) {
        calculadora.displayValue = "0."
        calculadora.waitingForSecondOperand = false;
      return
    }
  
    if (!calculadora.displayValue.includes(dot)) {
        calculadora.displayValue += dot;
    }
  }
  
  function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operador } = calculadora
    const inputValue = parseFloat(displayValue);
    
    if (operador && calculadora.waitingForSecondOperand)  {
        calculadora.operador = nextOperator;
      return;
    }
  
  
    if (firstOperand == null && !isNaN(inputValue)) {
        calculadora.firstOperand = inputValue;
    } else if (operador) {
      const result = calculate(firstOperand, inputValue, operador);
  
      calculadora.displayValue = `${parseFloat(result.toFixed(7))}`;
      calculadora.firstOperand = result;
    }
  
    calculadora.waitingForSecondOperand = true;
    calculadora.operador = nextOperator;
  }
  
  function calculate(firstOperand, secondOperand, operador) {
    if (operador === '+') {
      return firstOperand + secondOperand;
    } else if (operador === '-') {
      return firstOperand - secondOperand;
    } else if (operador === '*') {
      return firstOperand * secondOperand;
    } else if (operador === '/') {
      return firstOperand / secondOperand;
    }
  
    return secondOperand;
  }
  
  function resetCalculator() {
    calculadora.displayValue = '0';
    calculadora.firstOperand = null;
    calculadora.waitingForSecondOperand = false;
    calculadora.operador = null;
  }
  
  function updateDisplay() {
    const display = document.querySelector('.calculadora-tela');
    display.value = calculadora.displayValue;
  }
  
  updateDisplay();
  
  const keys = document.querySelector('.calculadora-chaves');
  keys.addEventListener('click', event => {
    const { target } = event;
    const { value } = target;
    if (!target.matches('button')) {
      return;
    }
  
    switch (value) {
      case '+':
      case '-':
      case '*':
      case '/':
      case '=':
        handleOperator(value);
        break;
      case '.':
        inputDecimal(value);
        break;
      case 'limpar-tudo':
        resetCalculator();
        break;
      default:
        if (Number.isInteger(parseFloat(value))) {
          inputDigit(value);
        }
    }
  
    updateDisplay();
  });