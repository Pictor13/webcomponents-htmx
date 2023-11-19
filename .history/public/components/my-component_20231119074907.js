class CounterElement extends HTMLButtonElement {
  // count;

  constructor() {
    super();
    console.log('CONSTRUCTOR');

    this.count = 0;
    this.tpl = (s, count) => `count is ${count}`
    this.innerHTML = this.tpl`${this.count}`;
  }

  connectedCallback() {
    this.button = document.createElement('button');
    this.button.innerText = this.tpl`${this.count}`
    this.append(this.button);
    this.addEventListener("click", this.increment);
  }

  disconnectedCallback() {
    this.removeEventListener("click", this.increment);
  }

  increment() {
    this.count++;
    this.innerHTML = this.tpl`${this.count}`;
  }
}
console.log('REGISTER rom-counter');

customElements.define("rom-counter", CounterElement, { extends: "button" });