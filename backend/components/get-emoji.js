const randomString = () => {
  return Math.floor(Math.random() * Date.now()).toString(36);
};

class EmojiLotteryElement extends HTMLButtonElement {
  // emoji;

  constructor() {
    super();

    this.tpl = (s, emoji) => `Here an emoji for you <span>${emoji}</span>`
    this.innerHTML = this.tpl`${this.emoji}`;
  }

  connectedCallback() {
    this.innerHTML = this.tpl`${this.emoji}`

    // emoji container
    this.emoji = this.querySelector('span')
    if (!this.emoji)
      throw new Error('Template contains no "span"')
    this.emoji.id = `emoji-lottery_container-${randomString()}`

    // swap emoji on button.click (request emoji to backend)
    this.setAttribute('hx-get','/emoji/lottery')
    this.setAttribute('hx-swap', 'innerHTML')
    this.setAttribute('hx-target', '#'+ this.emoji.id)
  }

  // disconnectedCallback() {
  //   this.removeEventListener("click", this.randomEmoji);
  // }

  // async randomEmoji() {
  //   fetch('/emoji/lottery')
  //     .then(response => response.text())
  //     .then(data => this.innerHTML = this.tpl`${data}`)
  //     .catch(error => console.error('Error:', error)
  //   );
  // }
}

customElements.define("be-emoji-lottery", EmojiLotteryElement, { extends: "button" });