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
    this.addEventListener("click", this.randomEmoji);
  }

  disconnectedCallback() {
    this.removeEventListener("click", this.randomEmoji);
  }

  async randomEmoji() {
    fetch('/emoji/lottery')
      .then(response => response.text())
      .then(data => this.innerHTML = this.tpl`${data}`)
      .catch(error => console.error('Error:', error)
    );
  }
}

customElements.define("be-emoji-lottery", EmojiLotteryElement, { extends: "button" });