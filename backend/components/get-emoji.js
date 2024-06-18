const defaultEmoji = '🙂'

const template = document.querySelector('#emoji-lottery')
if (!template)
  throw new Error('Unable to load emoji-lottery template')

const tpl = (s, emoji) =>
  `Here an emoji for you ${emoji ?? defaultEmoji}`


class EmojiLotteryElement extends HTMLButtonElement {

  constructor() {
    super();
  }

  tpl(emoji) {
    template?.content.cloneNode(true)
    const emojiContainer = template?.querySelector('span')
    if (!emojiContainer)
      throw new Error('Cannot find emojiContainer inside template')
    emojiContainer.innerText = emoji

    return template?.innerHTML.replace('{{emoji}}', emoji)
  }

  connectedCallback() {
    this.innerHTML = tpl(defaultEmoji)

    // swap emoji on button.click (request emoji to backend)
    this.setAttribute('hx-get','/emoji/lottery')
    this.setAttribute('hx-swap', 'innerHTML')
    // this.setAttribute('hx-trigger', 'process-template')
    // this.setAttribute('mustache-array-template', 'emoji-lottery')

    document.addEventListener('htmx:beforeSwap', event => {
      const content = event.detail.target.outerHTML; // Get the fetched content
      // Replace the target element content with the processed content
      event.detail.target.outerHTML = tpl(content);

      console.log('PROCESSED');
    });
    document.addEventListener('htmx:afterRequest', function(evt) {
      if(evt.detail.xhr.status == 404){
          /* Notify the user of a 404 Not Found response */
          return alert("Error: Could Not Find Resource");
      } 
      if (evt.detail.successful != true) {
          /* Notify of an unexpected error, & print error to console */
          alert("Unexpected Error");
          return console.error(evt);
      }
      if (evt.detail.target.id == 'info-div') {
          /* Execute code on the target of the HTMX request, which will
          be either the hx-target attribute if set, or the triggering 
          element itself if not set. */
          let infoDiv = document.getElementById('info-div');
          infoDiv.style.backgroundColor = '#000000';  // black background
          infoDiv.style.color = '#FFFFFF';  // white text
      }
  });
  }

  // disconnectedCallback() {
  //   this.removeEventListener("click", this.randomEmoji);
  // }
}

customElements.define("be-emoji-lottery", EmojiLotteryElement, { extends: "button" });