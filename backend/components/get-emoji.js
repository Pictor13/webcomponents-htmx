class EmojiLotteryElement extends HTMLButtonElement {
  // emoji;

  constructor() {
    super();

    this.emoji = '❌';
    this.tpl = (s, emoji) => `Here an emoji for you ${emoji}`
    this.innerHTML = this.tpl`${this.emoji}`;
  }

  connectedCallback() {
    this.innerText = this.tpl`${this.emoji}`
    this.addEventListener("click", this.increment);
  }

  disconnectedCallback() {
    this.removeEventListener("click", this.increment);
  }

  increment() {
    this.emoji = this.randomEmoji();
    this.innerHTML = this.tpl`${this.emoji}`;
  }

  randomEmoji() {
    const offset = Math.floor(Math.random() * (128397 - 127000) + 127000); // Randomly select an offset within the emoji range
    return String.fromCodePoint(offset);
  }
}

customElements.define("be-emoji-lottery", EmojiLotteryElement, { extends: "button" });