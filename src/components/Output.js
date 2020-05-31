export default class Output {
  constructor($target) {
    this.output = document.createElement('output');
    this.output.classList.add('output');
    this.output.textContent = '0';
    $target.appendChild(this.output);
  }

  render = (text) => {
    this.output.textContent = text;
  }
}