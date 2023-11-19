class CounterElement extends HTMLButtonElement {
  // count;

  constructor() {
    super();

    this.count = 0;
    this.tpl = (s, count) => `count is ${count}`
    this.innerHTML = this.tpl`${this.count}`;
  }

  connectedCallback() {
    this.innerText = this.tpl`${this.count}`
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