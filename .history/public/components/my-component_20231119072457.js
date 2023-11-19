class CounterElement extends HTMLElement {
  // count;

  constructor() {
    super();
    console.log('CONSTRUCTOR');

    this.count = 0;
    this.tpl = function tag(s, count) { return `count is ${count}` }
    this.innerHTML = this.tpl`${this.count}`;
  }

  connectedCallback() {
    this.button = (new HTMLButtonElement()).innerHTML = this.tpl`${this.count}`;
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