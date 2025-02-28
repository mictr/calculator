const DEFAULT_STATE = {
  isOn: false,
  displayNumber: "0",
  numberX: null,
  numberY: null,
  previousOperator: null,
  operatorPressed: false,
};

const add = (x, y) => {
  return x + y;
};

const subtract = (x, y) => {
  return x - y;
};

const multiply = (x, y) => {
  return x * y;
};

const divide = (x, y) => {
  if (y === 0) {
    return NaN;
  }

  return x / y;
};

const operate = (operator, x, y) => {
  return operatorFunctions.get(operator)?.(x, y);
};

const clear = () => {
  state = { ...DEFAULT_STATE };
  display.textContent = state.displayNumber;
};

const operatorFunctions = new Map([
  ["+", add],
  ["-", subtract],
  ["᙮", multiply],
  ["÷", divide],
]);

let state = {
  ...DEFAULT_STATE,
};

const handleOnClearButton = () => {
  clear();
  state.isOn = true;
};

const handleNumbersButtonClick = (e) => {
  if (!state.isOn) {
    return;
  }

  const input = e.target.textContent;

  if (input === ".") {
    if (state.operatorPressed) {
      state.displayNumber = input;
      dotButton.disabled = true;
    } else if (!display.textContent.includes(".")) {
      state.displayNumber += input;
      dotButton.disabled = true;
    }
  } else if (display.textContent === "0" || state.operatorPressed) {
    state.displayNumber = input;
  } else {
    state.displayNumber += input;
  }
  dotButton.disabled = state.displayNumber.includes(".");
  state.operatorPressed = false;
  display.textContent = state.displayNumber;
};

const handleOperatorButtonClick = (e) => {
  if (!state.isOn) {
    return;
  }

  const operator = e.target.textContent;

  // Allow user to reselect operator mid operation
  if (state.operatorPressed) {
    if (operator !== "=") {
      state.previousOperator = operator;
    }
    return;
  }

  state.operatorPressed = true;

  if (state.numberX === null) {
    state.numberX = Number(state.displayNumber);
    state.previousOperator = operator;
    return;
  }

  if (operator === "=" && state.numberY !== null) {
    state.numberY = Number(state.displayNumber);
    const result = operate(
      state.previousOperator,
      state.numberX,
      state.numberY
    );

    if (result === undefined) {
      state.previousOperator = null;
      return;
    }

    state.numberX = result;
    state.numberY = null;
    state.displayNumber = String(result);
    dotButton.disabled = state.displayNumber.includes(".");
    state.previousOperator = null;
    display.textContent = result;

    return;
  }

  state.numberY = Number(state.displayNumber);

  if (state.numberX !== null && state.numberY !== null) {
    const result = operate(
      state.previousOperator,
      state.numberX,
      state.numberY
    );

    if (result === undefined) {
      return;
    }

    state.previousOperator = operator;
    state.numberX = result;
    state.numberY = null;
    state.displayNumber = String(result);
    dotButton.disabled = state.displayNumber.includes(".");
    display.textContent = result;
  }
};

const display = document.querySelector(".display");
const onClearButton = document.querySelector(".on-clear");
onClearButton.addEventListener("click", handleOnClearButton);

const numberButtons = Array.from(document.querySelectorAll(".number"));
numberButtons.forEach((button) => {
  button.addEventListener("click", handleNumbersButtonClick);
});

const operatorButtons = Array.from(document.querySelectorAll(".operator"));
operatorButtons.forEach((operatorButton) => {
  operatorButton.addEventListener("click", handleOperatorButtonClick);
});

const dotButton = document.querySelector(".dot");
