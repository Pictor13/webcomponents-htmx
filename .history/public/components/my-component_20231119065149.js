class CounterElement extends HTMLButtonElement {
  // count;

  constructor() {
    super();
    console.log('CONSTRUCTOR');

    this.count = 0;
    this.innerHTML = `count is ${this.count}`;
  }

  connectedCallback() {
    this.innerHTML = `count is ${this.count}`;
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

customElements.define("rom-counter", CounterElement, { extends: "button" });