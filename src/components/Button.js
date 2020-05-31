export default class Button {
  constructor($target, className, text) {
    this.button = document.createElement('button');
    this.button.className = className;
    this.button.textContent = text;

    this.button.addEventListener('mousedown', () => {
      this.button.classList.add('active');
    })
    this.button.addEventListener('mouseup', () => {  // 마우스를 땔 때
      this.button.classList.remove('active');
    })
    this.button.addEventListener('mouseout', () => { // 마우스가 요소를 벗어날 때
      this.button.classList.remove('active');
    })
    
    $target.appendChild(this.button);
  }
  get el() {
    return this.button;
  }
}