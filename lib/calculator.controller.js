
// get all the button elements
const valButtons = document.querySelectorAll('[data-val]');
const operationsButtons = document.querySelectorAll('[data-operation]');
const clearButton = document.querySelector('[data-clear]');
const equalButton = document.querySelector('[data-equal]');
const backspaceButton = document.querySelector('[data-backspace]');
const calculator = new Calculator();

// get the output and formula elements
const output = document.querySelector('[data-output]');
const formula = document.querySelector('[data-formula]');
const display = document.querySelector('[data-display]');

const isOperator = (value) => {
    return value === '+' || value === '-' || value === '*' || value === '÷' || value === '/';
}

const updateDisplay = () => {
    const FONT_WIDTH_RATIO = 1.5;
    const DEFAULT_FONT_SIZE = 74;
    const shouldConvert = calculator.getOutput() ? calculator.getOutput().toString().length > 14 : false;
    // formula.animate({ opacity: [0, 1] }, { duration: 600, iterations: 1, easing: "ease-in" });
    formula.innerText = calculator.getFormula();

    //Check size of output and resize to fit or convert to scientific notation
    // output.animate({ opacity: [0,.5, 1] }, { duration: 600, iterations: 1, easing: "ease-in" });
    const adjustedFontSize = Math.min(DEFAULT_FONT_SIZE, (display.offsetWidth / calculator.getOutput().toString().length) * FONT_WIDTH_RATIO);
    const outputToModify = shouldConvert ? calculator.getOutput().toExponential(2) : calculator.getOutput();
    output.style.fontSize = `${shouldConvert ? DEFAULT_FONT_SIZE : adjustedFontSize}px`;
    output.innerText = outputToModify;
}

//-----------------Event Listeners-----------------//


valButtons.forEach(valButton => {
    const handleValButtonClick = () => {
        const lastArg = calculator.getFormula().split(/[-+÷*\/]/).pop();
        if (lastArg.includes('.') && valButton.innerText === '.') {
            return;
        }
        calculator.updateFormula(valButton.innerText);
        calculator.evaluate();
        updateDisplay();
    };
    valButton.addEventListener('click', handleValButtonClick);

})

const validateOperation = () => {
    if (calculator.getFormula() === '' && calculator.getOutput() === '') {
        return false;
    }
    const lastChar = calculator.getFormula().slice(-1);

    if (isOperator(lastChar) || lastChar === '.') {
        return false;
    }

    return true;

}

const handleOperation = (keyToAdd) => {
    const newKey = keyToAdd === '/' ? '÷' : keyToAdd;

    if (!validateOperation()) return;
        const stringToAdd = calculator.getFormula() === '' ? calculator.getOutput() + newKey : newKey;
        console.log('stringToAdd', stringToAdd);
        calculator.updateFormula(stringToAdd)
        updateDisplay();
}

operationsButtons.forEach(operationsButton => {
    operationsButton.addEventListener('click', () => handleOperation(operationsButton.innerText))
});

clearButton.addEventListener('click', () => {
    calculator.resetCalculator();
    updateDisplay();
});

backspaceButton.addEventListener('click', () => {
    calculator.handleBackspace();
    updateDisplay();
});

equalButton.addEventListener('click', () => {
    calculator.handleEnter();
    updateDisplay();
}
);

//handle accesibility cases with keypresses
document.addEventListener('keydown', (event) => {

    if (event.key >= 0 && event.key <= 9) {
        calculator.updateFormula(event.key);
        calculator.evaluate();
        updateDisplay();
    } else if (isOperator(event.key)) {
        handleOperation(event.key);
    } else if (event.key === 'Enter') {
        calculator.handleEnter();
        updateDisplay();
    }
    else if (event.key === 'Backspace') {
        calculator.handleBackspace();
        updateDisplay();
    }
    else if (event.key === 'Delete' || event.key === 'Escape') {
        calculator.resetCalculator();
        updateDisplay();
    }
});

//-----------------Event Listeners-----------------//