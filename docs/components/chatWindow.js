
import {createComponent} from '../$.js'



createComponent(
  'chat-window',
  `
    <style>
      :host {
        display: block;
      }

      * {
        margin: 0;
        padding: 0;
        font-family: var(--default-font);

      }

      h6 {
        margin-top: 0.5em;
        margin-bottom: 1em;
      }

      #input {
        resize: none;
        width: 100%;
        height: 4em;
        color: var(--light-color);
        background: var(--input-color);
        padding: 0.5em;
        box-sizing: border-box;
        transition: 0.2s;
        box-shadow: inset 0px 0px 10px #555;
        border-right: 0;
      }


      #input:hover {
        box-shadow: inset 0px 0px 10px #ccc;
      }
      #input:focus, #input:focus:hover {
        outline: none !important;
        border: 1px solid var(--primary-color);
        box-shadow: inset 0px 0px 10px var(--primary-color);
      }

      #inputArea {
        display: flex;
        border-top: 1px solid var(--border-color);
      }

      #submit {
        cursor: pointer;
        background: linear-gradient(0deg, #fff -100%, var(--primary-color) 90%);
        border-width: 0;
        color: var(--light-color);
        font-weight: bold;
        padding: 0 1em;
        transition: 0.2s;
        font-size: 1em;
        text-shadow: 0 0 3px var(--dark-color)0ff;
      }

      #submit:hover {
        box-shadow: 0 0 20px var(--primary-color);
      }
      #submit:active {
        opacity: 0.9;
      }

      #chat {
        display: flex;
        flex-direction: column;
        border: 1px solid var(--border-color);
        height: 100%;
      }

      #display {
        display: flex;
        flex-direction: column;
        justify-content: end;
        padding: 0.75em;
        padding-top: 0em;
      }

      #displayContainer {
        height: 100%;
        overflow: scroll;
        padding: 0.5em;
        box-shadow: inset 0px 0px 10px #ccc;
      }

      .message {
        padding: 0.5em 1.25em 0.75em;
        margin-top: 0.75em;
        margin-bottom: 0.25em;
        border-radius: 1em;
        max-width: 35em;
        line-height: 1.2;
      }

      .messageContent p + p {
        margin-top: 0.5em;
      }

      .message::selection {
        background: var(--dark-color);
        color: var(--light-color);
      }

      .message:last-child {
        animation: fadeIn linear 0.2s;
      }

      .help-message {
        background: var(--help-color);
        color: var(--tertiary-color);
        margin: 0 3em;
        margin-bottom: 1.5em;
        align-self: flex-end;
        align-self: center;
        box-shadow: 0 0 20px var(--help-color);
        padding: 1.5em 3em;
      }
      .from-you {
        border-bottom-right-radius: 0;
        background: var(--light-color);
        color: var(--dark-color);
        margin-left: 3em;
        align-self: flex-end;
        box-shadow: 0 0 20px var(--light-color);
      }

      .from-dom {
        background: var(--primary-color);
        color: var(--light-color);
        border-bottom-left-radius: 0;
        margin-right: 3em;
        align-self: flex-start;
        box-shadow: 0 0 20px var(--primary-color);
      }


      @keyframes fadeIn {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
         }
      }

      .alignLeft {
        text-align: left;
      }

      .alignRight {
        text-align: right;
      }


      .alignCenter {
        text-align: center;
      }

      time {
        display: block;
        font-size: 0.5em;
        margin-top: 1em;
        margin-bottom: 2em;
        padding: 0 1em;
      }

      .date {
        text-align: center;
        margin: 1em;
      }

      #isTyping {
        font-family: var(--fancy-font);
        font-style: italic;
        margin-left: 1em;

        opacity: 1;
      }

      .hidden {
        opacity: 0 !important;
      }

      header {
        background: linear-gradient(180deg, #000 -25%, var(--secondary-color) 90%);
        height: 60px;
        border-bottom: #592ba2;
      }

      code {
        font-family: var(--code-font);
      }
    </style>

    <section id="chat">
      <header></header>
      <div id="displayContainer">
        <div id="display"></div>
        <div id="isTyping" class="hidden">heather is typing...</div>
      </div>
      <div id="inputArea">
        <textarea id="input"></textarea>
        <button id="submit">SUBMIT</button>
      </div>
    </section>



  `,
  { history: [], isTyping: false},
  ctx => {
    ctx.$display = ctx.$('#display')
    ctx.$displayContainer = ctx.$('#displayContainer')
    ctx.$input = ctx.$('#input')
    ctx.$submit = ctx.$('#submit')
    ctx.$isTyping = ctx.$('#isTyping')

    const submit = () => {
      const message = ctx.$input.value
      if (!message.trim()) return

      ctx.events?.submit?.forEach(onSubmit => onSubmit(message))

      setTimeout(() => ctx.$input.value = '')
    }


    ctx.$submit.addEventListener('click', submit)
    ctx.$input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') submit()
    })

    ctx.$isTyping.innerHTML = `${ctx.getAttribute('name')} is typing...`

    ctx.scroll = () => {
      ctx.$displayContainer.scrollTop = ctx.$displayContainer.scrollHeight
    }

    ctx.scroll()


  },
  ctx => {
    if (ctx.state.isTyping) {
      ctx.$isTyping.classList.remove('hidden')
    } else {
      ctx.$isTyping.classList.add('hidden')
    }


    ctx.$display.innerHTML = ctx.state.history.map((h, i) =>
      `
      ${
        i === 0 || getDateTime(ctx.state.history[i-1].timestamp)[0] !== getDateTime(h.timestamp)[0]
          ? `<h5 class="date">${getDateTime(h.timestamp)[0]}</h5>`
          : ''
      }
      <div class="message ${
        h.helpMessage
          ? 'help-message'
          : h.from === 'you' ? 'from-you' : 'from-dom'
      }">
        ${h.helpMessage ? '' : `<h6 class="from">${h.from}</h6>`}
        <div class="messageContent">${h.messageText}</div>
      </div>
      ${
        h.helpMessage
          ? ''
          : `
            <time datetime="${h.timestamp}" class="${
              h.from === 'you' ? 'alignRight' : 'alignLeft'
            }">
              ${getDateTime(h.timestamp)[1]}
            </time>
          `
      }
      `
    ).join('')

    ctx.scroll()
  }
)

function getDateTime(ts) {
  const str = new Date(ts).toLocaleString()
  return str.split(', ')
}