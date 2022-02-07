class Calculator {
  constructor(prevOperandText, currOperandText) {
    this.prevOperandText = prevOperandText;
    this.currOperandText = currOperandText;
    this.clear();
  }
  clear() {
    this.currOperand = "";
    this.prevoperand = "";
    this.operation = undefined;
  }
  delete() {
    this.currOperand = this.currOperand.toString.slice(0, -1);
  }
  appendNumber(number) {
    if (number === "." && this.currOperand.includes(".")) return;
    this.currOperand = this.currOperand.toString() + number.toString();
  }
  chooseOperation(operation) {
    if (this.currOperand === "") return;
    if (this.prevoperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.prevoperand = this.currOperand;
    this.currOperand = "";
  }
  compute() {
    let comp;
    const prev = parseFloat(this.prevoperand);
    const curr = parseFloat(this.currOperand);
    if (isNaN(prev) || isNaN(curr)) {
      return;
    }
    switch (this.operation) {
      case "+":
        comp = prev + curr;
        break;
      case "-":
        comp = prev - curr;
        break;
      case "*":
        comp = prev * curr;
        break;
      case "/":
        comp = prev * curr;
        break;
      default:
        return;
    }
    this.currOperand = comp;
    this.operation = undefined;
    this.prevoperand = "";
  }

  updateDisplay() {
    this.currOperandText.innerHTML = this.currOperand;
    if (this.operation !== undefined) {
      this.prevOperandText.innerHTML = this.prevoperand + this.operation;
    }
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const equalButton = document.querySelector("[data-equals]");
const delButton = document.querySelector("[data-del]");
const allClearButton = document.querySelector("[data-AllClear]");
const prevOperandText = document.querySelector("[data-prev]");
const currOperandText = document.querySelector("[data-curr]");

const calc = new Calculator(prevOperandText, currOperandText);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calc.appendNumber(button.innerHTML);
    calc.updateDisplay();
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calc.chooseOperation(button.innerHTML);
    calc.updateDisplay();
  });
});

equalButton.addEventListener("click", () => {
  calc.compute();
  calc.updateDisplay();
});

allClearButton.addEventListener("click", () => {
  calc.clear();
  calc.updateDisplay();
});

delButton.addEventListener("click", () => {
  calc.delete();
  calc.updateDisplay();
});
