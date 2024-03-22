let expression = '';

function appendToDisplay(value) {
    expression += value;
    document.getElementById('display').value = expression;
}

function clearDisplay() {
    expression = '';
    document.getElementById('display').value = '';
}

function deleteLast() {
    expression = expression.slice(0, -1);
    document.getElementById('display').value = expression;
}


function calculate() {
    try {
        const operators = ['+', '-', '*', '/'];
        let number = '';
        let numbers = [];
        let operatorsArray = [];




        for (let i = 0; i < expression.length; i++) {
            const char = expression[i];

            if (operators.includes(char)) {
                operatorsArray.push(char);
                if (number !== '') {
                    numbers.push(parseFloat(number));
                    number = '';
                }
            } else {
                number += char;
            }
        }

        // Push the last number if any
        if (number !== '') {
            numbers.push(parseFloat(number));
        }

        // Perform multiplication and division operations first
        for (let i = 0; i < operatorsArray.length; i++) {
            const operator = operatorsArray[i];
            if (operator === '*' || operator === '/') {
                const result = operator === '*' ? numbers[i] * numbers[i + 1] : numbers[i] / numbers[i + 1];
                numbers.splice(i, 2, result); // Replace operands with the result
                operatorsArray.splice(i, 1); // Remove the operator
                i--; // Adjust index for removed operator
            }
        }

        let result = numbers[0];

        // Perform addition and subtraction operations next
        for (let i = 0; i < operatorsArray.length; i++) {
            const operator = operatorsArray[i];
            const nextNumber = numbers[i + 1];

            if (isNaN(nextNumber)) {
                throw 'Invalid expression';
            }

            switch (operator) {
                case '+':
                    result += nextNumber;
                    break;
                case '-':
                    result -= nextNumber;
                    break;
                default:
                    throw 'Invalid operator';
            }
        }

        document.getElementById('display').value = result;
        expression = result.toString();
    } catch (error) {
        document.getElementById('display').value = 'Error';
        expression = '';
    }
}


document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    // Check if the pressed key is a number, operator, or special key
    if (!isNaN(key) || key === '.' || ['+', '-', '*', '/', 'Enter', 'Backspace', 'Delete'].includes(key)) {
        event.preventDefault(); // Prevent default behavior for keys that would trigger other actions (e.g., scrolling)

        // Handle the key press
        switch (key) {
            case 'Enter':
                calculate();
                break;
            case 'Backspace':
            case 'Delete':
                deleteLast();
                break;
            default:
                appendToDisplay(key);
                break;
        }
    }
});



// function clearAll() {
//     clearDisplay();
//     expression = '';
// }

