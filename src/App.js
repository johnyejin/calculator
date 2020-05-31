import Calculator from './components/Calculator.js';
export default class App {
  constructor($target) {
    this.$target = $target;
    new Calculator($target);
  }
}