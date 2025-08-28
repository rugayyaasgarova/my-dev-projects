const display = document.getElementById("display");
const numberButtons = document.querySelectorAll(".number");
const actionButtons = document.querySelectorAll(".action");

let firstNumber = "";
let secondNumber = "";
let operator = null;
let isSecond = false;

numberButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const value = btn.textContent;
    if (!isSecond) {
      firstNumber += value;
      display.textContent = firstNumber;
    } else {
      secondNumber += value;
      display.textContent = secondNumber;
    }
  });
});

actionButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const value = btn.textContent;
    if (["+", "-", "*", "/"].includes(value)) {
      if (firstNumber === "") return;
      if (isSecond && secondNumber !== "") return;
      operator = value;
      isSecond = true;
    } else if (value === "=") {
      const a = parseFloat(firstNumber);
      const b = parseFloat(secondNumber);
      let result = 0;

      if (operator === "+") result = a + b;
      else if (operator === "-") result = a - b;
      else if (operator === "*") result = a * b;
      else if (operator === "/") result = b !== 0 ? a / b : "Error";

      display.textContent = result;
      firstNumber = result.toString();
      secondNumber = "";
      isSecond = false;
      operator = null;
    } else if (value === "C") {
      firstNumber = "";
      secondNumber = "";
      operator = null;
      isSecond = false;
      display.textContent = "0";
    }
  });
});
