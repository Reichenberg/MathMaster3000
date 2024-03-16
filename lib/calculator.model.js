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
        console.log(value);
        this.#formula += value;
    }

    resetCalculator() {
        this.#formula = '';
        this.#output = '';
    }

    handleBackspace() {
        if(this.#formula === '') return;
        this.#formula = this.#formula.slice(0, -1);
        this.evaluate();
    }

    handleEnter() {
        if(this.#formula === '') return;
        const lastChar = this.#formula.slice(-1);
        if(isOperator(lastChar) || lastChar === '') return;
        this.evaluate();
        this.#formula = '';
    }

    // Method to evaluate the formula and update the output
    evaluate() {
        //check for bigInt
        try {
            this.#output = eval(this.#formula.replace('÷', '/'));
            console.log('output: ',this.#output);
        } catch (error) {
            //TODO create more elegant error message
            console.log('error: ', error);
            this.#output = error;
        }
    }
}