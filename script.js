const display = document.querySelector('.calculator-screen-input');
const buttons = document.querySelectorAll('.calculator-button');

let firstOperand = null;
let operator = null;
let waitingForSecond = false;

const calculate = (first, op, second) => {
    if (op === '+') return first + second;
    if (op === '-') return first - second;
    if (op === '×') return first * second;
    if (op === '÷') {
        if (second === 0) return 'Error';
        return first / second;
    }
    return second;
};

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (value === 'C') {
            display.value = '0';
            firstOperand = null;
            operator = null;
            waitingForSecond = false;

        } else if (value === '←') {
            if (display.value.length === 1) {
                display.value = '0';
            } else {
                display.value = display.value.slice(0, -1);
            }

        } else if (value === '+' || value === '-' || value === '×' || value === '÷') {
            if (firstOperand !== null && !waitingForSecond) {
                const result = calculate(firstOperand, operator, parseFloat(display.value));
                display.value = result;
                firstOperand = result;
            } else {
                firstOperand = parseFloat(display.value);
            }
            operator = value;
            waitingForSecond = true;

        } else if (value === '=') {
            if (firstOperand !== null && operator !== null) {
                const result = calculate(firstOperand, operator, parseFloat(display.value));
                display.value = result;
                firstOperand = null;
                operator = null;
                waitingForSecond = false;
            }

        } else {
            if (waitingForSecond) {
                display.value = value;
                waitingForSecond = false;
            } else if (display.value === '0') {
                display.value = value;
            } else {
                display.value += value;
            }
        }
    });
});