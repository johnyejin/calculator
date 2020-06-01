import Button from './Button.js';
import Output from './Output.js';
export default class Calculator {
  constructor($target) {
    this.leftNumber = '';
    this.rightNumber = '';
    this.operator = '';

    const calculator = document.createElement('div');
    calculator.className = 'calculator';
    const calculatorBody = document.createElement('div');
    calculatorBody.className = 'calculator__body';

    this.output = new Output(calculator);

    /* 버튼 생성 */
    this.numberBtns = [];
    this.clearBtn = new Button(calculatorBody, 'clear', 'AC');
    this.invertBtn = new Button(calculatorBody, 'invert', '+/-');
    this.percentBtn = new Button(calculatorBody, 'percent', '%');
    this.divideBtn = new Button(calculatorBody, 'divide', '÷');      // operator
    this.numberBtns.push(new Button(calculatorBody, 'number', '7'));
    this.numberBtns.push(new Button(calculatorBody, 'number', '8'));
    this.numberBtns.push(new Button(calculatorBody, 'number', '9'));
    this.multiplyBtn = new Button(calculatorBody, 'multiply', '×');  // operator
    this.numberBtns.push(new Button(calculatorBody, 'number', '4'));
    this.numberBtns.push(new Button(calculatorBody, 'number', '5'));
    this.numberBtns.push(new Button(calculatorBody, 'number', '6'));
    this.minusBtn = new Button(calculatorBody, 'minus', '-');        // operator
    this.numberBtns.push(new Button(calculatorBody, 'number', '1'));
    this.numberBtns.push(new Button(calculatorBody, 'number', '2'));
    this.numberBtns.push(new Button(calculatorBody, 'number', '3'));
    this.plusBtn = new Button(calculatorBody, 'plus', '+');          // operator
    this.numberBtns.push(new Button(calculatorBody, 'number zero', '0'));
    this.dotBtn = new Button(calculatorBody, 'dot', '.');
    this.equalBtn = new Button(calculatorBody, 'equal', '=');

    /* 버튼 이벤트 바인딩 */
    this.numberBtns.forEach(({el}) => {
      el.addEventListener('click', (e) => this.handleNumber(e.target.childNodes[0].nodeValue));
    })
    this.clearBtn.el.addEventListener('click', this.handleClear);
    this.invertBtn.el.addEventListener('click', this.handleInvert);
    this.percentBtn.el.addEventListener('click', this.handlePercent);
    this.divideBtn.el.addEventListener('click', () => this.handleOperator('/'));
    this.multiplyBtn.el.addEventListener('click', () => this.handleOperator('*'));
    this.minusBtn.el.addEventListener('click', () => this.handleOperator('-'));
    this.plusBtn.el.addEventListener('click', () => this.handleOperator('+'));
    this.equalBtn.el.addEventListener('click', this.handleEqual);
    this.dotBtn.el.addEventListener('click', this.handleDot);

    calculator.appendChild(calculatorBody)
    $target.appendChild(calculator);
  }

  handleNumber = (number) => {
    console.log("handle number", number);
    if(this.operator) {
      this.rightNumber += number;
      this.output.render(this.rightNumber);
    } else {
      this.leftNumber += number;
      this.output.render(this.leftNumber);
    }
  };
  handleClear = () => {
    this.rightNumber = '';
    this.leftNumber = '';
    this.operator = '';
    this.output.render('0');
  };
  handleInvert = () => {
    if(this.operator) {
      this.rightNumber = -this.rightNumber;
      this.output.render(this.rightNumber);
    } else {
      this.leftNumber = -this.leftNumber;
      this.output.render(this.leftNumber);
    }
  };
  handlePercent = () => {
    if(this.operator) {
      this.rightNumber = Number(this.rightNumber) / 100;
      this.output.render(this.rightNumber);
    } else {
      this.leftNumber = Number(this.leftNumber) / 100;
      this.output.render(this.leftNumber);
    }
  };
  handleOperator = (operator) => {
    console.log('handle operator', operator);
    this.operator = operator;
    if(this.rightNumber) {
      this.leftNumber = this.calculate(this.leftNumber, this.rightNumber);
      this.rightNumber = '';
      this.output.render(this.leftNumber);
    }
  };
  handleEqual = () => {
    if(this.rightNumber) {
      this.leftNumber = this.calculate(this.leftNumber, this.rightNumber);
      this.rightNumber = '';
      this.operator = '';
    }
    this.output.render(this.leftNumber);
  };
  handleDot = () => {
    if(!this.leftNumber) {
      return;
    }
    if(this.operator && !this.rightNumber.includes('.')) {
      this.rightNumber += '.';
      this.output.render(this.rightNumber);
    } else if(!this.operator && !this.leftNumber.includes('.')) {
      this.leftNumber += '.';
      this.output.render(this.leftNumber);
    }
  }

  calculate = (left, right) => {
    return eval(`${left}${this.operator}${right}`);
  }
}