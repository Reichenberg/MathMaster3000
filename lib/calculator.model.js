const isOperator = (value) => {
    return value === '+' || value === '-' || value === '*' || value === '÷' || value === '/';
}

class Calculator {
    #formula;
    #output;
    constructor() {
        this.#formula = '';
        this.#output = '';
    }
    getFormula() {
        return this.#formula;
    }
    getOutput() {
        return this.#output;
    }

    // Method to update the formula
    updateFormula(value) {
        this.#formula += value;
    }

    validateOperation() {
        if (this.#formula === '' && this.#output === '') {
            return false;
        }
        const lastChar = this.#formula.slice(-1);

        if (isOperator(lastChar)) {
            return false;
        }

        return true;

    }

    //TODO: extract these to controller file
    resetCalculator() {
        this.#formula = '';
        this.#output = '';
    }
    handleOperation(keyToAdd) {
        const newKey = keyToAdd === '/' ? '÷' : keyToAdd;

        if (!this.validateOperation()) return;
        const stringToAdd = this.#formula === '' ? this.#output + newKey : newKey;
        this.updateFormula(stringToAdd)
    }

    handleValButtonClick(keyPress) {
        const lastArg = this.#formula.split(/[-+÷*\/]/).pop();
        if (lastArg.includes('.') && keyPress === '.') {
            return;
        }
        this.updateFormula(keyPress);
        this.evaluate();
    };

    handleBackspace() {
        if (this.#formula === '') return;
        //if last char is an operator, don't evaluate
        this.#formula = this.#formula.slice(0, -1);
        if(this.#formula === '') return;
        const lastChar = this.#formula.slice(-1);
        if (isOperator(lastChar)) return;
        this.evaluate();
    }

    handleEnter() {
        if (this.#formula === '') return;
        const lastChar = this.#formula.slice(-1);
        if (isOperator(lastChar) || lastChar === '') return;
        this.evaluate();
        this.#formula = '';
    }

    // Method to evaluate the formula and update the output
    evaluate() {
        //check for bigInt?
        try {
            //TODO: replace eval with more secure eval algorithm
            //can also validate eval contains expected characters
            // 0-9, +-*/÷.,e^ and whitespace
            this.#output = eval(this.#formula.replace('÷', '/'));
        } catch (error) {
            //TODO create more elegant error message
            this.#output = error;
        }
    }
}