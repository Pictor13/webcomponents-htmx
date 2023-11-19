class CounterElement extends HTMLElement {
  // count;

  constructor() {
    super();
    console.log('CONSTRUCTOR');

    this.count = 0;
    this.innerHTML = `count is ${this.count}`;
  }

  connectedCallback() {
    this.button = document.createElement('button').innerHTML(`count is ${this.count}`);
    this.append(this.button));
    this.addEventListener("click", this.increment);
  }

  disconnectedCallback() {
    this.removeEventListener("click", this.increment);
  }

  increment() {
    this.count++;
    this.innerHTML = `count is ${this.count}`;
  }
}
console.log('REGISTER rom-counter');

customElements.define("rom-counter", CounterElement, { extends: "button" });