// Grab the display and all calculator buttons
const display = document.querySelector('.calculator-screen-input');
const buttons = document.querySelectorAll('.calculator-button');

// State variables to track calculation progress
let firstOperand = null;
let operator = null;
let waitingForSecond = false;

// Performs the math based on the operator
const calculate = (first, op, second) => {
    if (op === '+') return first + second;
    if (op === '-') return first - second;
    if (op === '×') return first * second;
    if (op === '÷') {
        if (second === 0) return 'Error'; // Prevent divide by zero
        return first / second;
    }
    return second;
};

// Attach click handler to every button
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        // Clear everything and reset
        if (value === 'C') {
            display.value = '0';
            firstOperand = null;
            operator = null;
            waitingForSecond = false;

        // Backspace: remove last character
        } else if (value === '←') {
            if (display.value.length === 1) {
                display.value = '0'; // Default to 0 if empty
            } else {
                display.value = display.value.slice(0, -1);
            }

        // Handle operator buttons
        } else if (value === '+' || value === '-' || value === '×' || value === '÷') {
            // Chain operations: calculate previous result first
            if (firstOperand !== null && !waitingForSecond) {
                const result = calculate(firstOperand, operator, parseFloat(display.value));
                display.value = result;
                firstOperand = result;
            } else {
                // Store the first number
                firstOperand = parseFloat(display.value);
            }
            operator = value;
            waitingForSecond = true; // Next digit starts a new number

        // Equals: compute and show final result
        } else if (value === '=') {
            if (firstOperand !== null && operator !== null) {
                const result = calculate(firstOperand, operator, parseFloat(display.value));
                display.value = result;
                // Reset for next calculation
                firstOperand = null;
                operator = null;
                waitingForSecond = false;
            }

        // Otherwise it's a number/decimal button
        } else {
            if (waitingForSecond) {
                // Start fresh after an operator
                display.value = value;
                waitingForSecond = false;
            } else if (display.value === '0') {
                // Replace leading zero
                display.value = value;
            } else {
                // Append digit to current number
                display.value += value;
            }
        }
    });
});
