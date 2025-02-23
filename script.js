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
  const result = operatorFunctions.get(operator)?.(x, y);
  console.log({ result });
};

const operatorFunctions = new Map([
  ["÷", add],
  ["-", subtract],
  ["᙮", multiply],
  ["/", divide],
]);

let displayNumber = "0";
let numberX = 0;
let numberY = 0;
let operator = "";

operate("᙮", 3, 54);

const display = document.querySelector(".display");
const buttons = Array.from(document.querySelectorAll(".pressable"));

const handleButtonClick = (e) => {
  console.log(e.target.textContent);
  if (display.textContent === "0") {
    displayNumber = e.target.textContent;
  } else {
    displayNumber += e.target.textContent;
  }
  display.textContent = displayNumber;
};

buttons.forEach((button) => {
  button.addEventListener("click", handleButtonClick);
});
