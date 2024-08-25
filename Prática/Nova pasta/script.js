const display = document.getElementById('display')
const calculator = document.querySelector('.calculator')

let firstValue = ''
let operator = ''
let secondValue = ''
let previousKeyType = ''

const updateCalculatorState = (key, calculator) => {
    const keyContent = key.textContent
    const action = key.dataset.action

    if (!action) {
        if (display.textContent === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate') {
            display.textContent = keyContent
        } else {
            display.textContent = displayedNum + keyContent
        }
        calculator.dataset.previousKeyType = 'number'
    }

    if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
        key.classList.add('is-depressed')
        firstValue = displayedNum
        operator = action
        calculator.dataset.previousKeyType = 'operator'
    }

    if (action === 'decimal') {
        display.textContent = displayedNum + '.'
    }

    if (action === 'clear') {
        if (key.textContent === 'AC') {
            calculator.dataset.firstValue = ''
            calculator.dataset.modValue = ''
            calculator.dataset.operator = ''
            calculator.dataset.previousKeyType = ''
        } else {
            key.textContent = 'AC'
        }
    }

    if (action === 'calculate') {
        if (firstValue) {
            if (previousKeyType === 'calculate') {
                firstValue = displayedNum
            }
            display.textContent = calculate(firstValue, operator, secondValue)
        }
        calculator.dataset.modValue = secondValue
        calculator.dataset.previousKeyType = 'calculate'
    }
}

const calculate = (n1, operator, n2) => {
    let result = ''
    if (operator === 'add') {
        result = parseFloat(n1) + parseFloat(n2)
    } else if (operator === 'subtract') {
        result = parseFloat(n1) - parseFloat(n2)
    } else if (operator === 'multiply'){
        result = parseFloat(n1) * parseFloat(n2)
    }
    }