
import {createComponent} from '../$.js'


// TODO
  // make @ link to other profiles
  // uptade text to include @

const FIRST_LOAD = Date.now()

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

      a {
        color: var(--light-color);
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
        border: 0px solid rgba(0, 0, 0, 0);
        font-size: 1.05em;
      }


      #input:hover {
        border: 1px solid var(--border-color);
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
        padding-top: 80px;
      }

      .smoothScroll {
        scroll-behavior: smooth;
      }

      .message {
        padding: 0.5em 1.25em 0.75em;
        margin-top: 0.75em;
        margin-bottom: 0.25em;
        border-radius: 1em;
        max-width: 35em;
        line-height: 1.2;
      }
      .messageContent img, .messageContent code{
        margin-top: 0.5em;
      }

      .messageContent img {
        width: 100%;
        border: 1px solid var(--light-color);
        box-shadow: 0 0 10px var(--light-color);
      }

      .messageContent p + p {
        margin-top: 0.5em;
      }

      .messageContent {
        line-height: 1.3;
        padding-bottom: 0.25em;
      }

      .from-dom {
        text-shadow: 1px 1px 2px var(--secondary-color);
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
        background: linear-gradient(0deg, rgba(0,0,0,0) 0%, var(--secondary-color) 95%);
        height: 60px;
        display: flex;
        align-items: center;
        padding: 0.5em 1em;
      }

      code {
        font-family: var(--code-font);
      }

      #profileLink {
        display: flex;
        align-items: center;
      }

      #profileLink {
        text-decoration: none;
        cursor: pointer;
      }
      #profileLink:hover {
        text-decoration: underline;

      }
      #profileLink:hover #pfpContainer {
        box-shadow: 0 0 15px var(--light-color);
      }

      #pfpContainer img {
        width: 100%
      }
      #pfpContainer {
        border-radius: 50%;
        width: 35px;
        height: 35px;
        overflow: hidden;
        border: 1px solid var(--light-color);
        transition: 0.2s;
        box-shadow: 2px 2px 1px var(--dark-color)
      }

      #chatName {
        margin-left: 0.5em;
        font-size: 1.25em;
        text-shadow: 2px 2px 1px var(--dark-color), 0 0 20px var(--secondary-color);
      }

      #headerContainer {
        position: relative;
        height: 0;
        top: 0
      }

      .chatMessage {
        display: flex;
        flex-direction: column;
      }

      code {
        display: inline-block;
        padding: 0.5em;
        background: var(--code-color);
        color: var(--light-color);
        border-radius: 0.25em;
      }

      ::selection, .message ::selection  {
        background: var(--dark-color);
        color: var(--light-color);
      }

      time::selection, .date::selection, #input::selection {
        background: var(--light-color);
        color: var(--dark-color);
      }


    </style>

    <section id="chat">
      <div id="headerContainer">
        <header>
          <a id="profileLink">
            <div id="pfpContainer">
              <img id="pfp">
            </div>
            <h5 id="chatName"></h5>
          </a>
        </header>
      </div>

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
    ctx.$pfp = ctx.$('#pfp')
    ctx.$chatName = ctx.$('#chatName')
    ctx.$profileLink = ctx.$('#profileLink')

    const name = ctx.getAttribute('name')

    const submit = () => {
      const message = ctx.$input.value
      if (!message.trim()) return

      ctx.events?.submit?.forEach(onSubmit => onSubmit(message))

      setTimeout(() => ctx.$input.value = '')
    }

    ctx.$pfp.src = `./thumbnails/${name}/pfp.png`
    ctx.$chatName.innerHTML = name
    ctx.$profileLink.href = `./profiles/${name}`

    ctx.$submit.addEventListener('click', submit)
    ctx.$input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') submit()
    })

    ctx.$isTyping.innerHTML = `${name} is typing...`

    ctx.scroll = () => {
      ctx.$displayContainer.scrollTop = ctx.$displayContainer.scrollHeight
    }

    ctx.scroll()


    setTimeout(() => {
      ctx.$displayContainer.classList.add('smoothScroll')
    }, 100)


  },
  ctx => {
    if (ctx.state.isTyping) {
      ctx.$isTyping.classList.remove('hidden')
    } else {
      ctx.$isTyping.classList.add('hidden')
    }

    const renderMessage = (h, i) => $.div(`
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
    `, { class: 'chatMessage'})


    const lastMessage = last(ctx.state.history)



    if (
      ctx.state.history.length &&
      ctx.state.history.length === ctx.oldState.history.length + 1
    ) {
      const $lastMessage = renderMessage(lastMessage, ctx.state.history.length-1)
      ctx.$display.append($lastMessage)
      // if (last(ctx.state.history).from !== 'you' && FIRST_LOAD < Date.now() - 1000) {
      //   new Audio('/assets/notification4.mp3').play().catch(noop)
      // }

    } else if (ctx.state.history !== ctx.oldState.history) {
      ctx.$display.innerHTML = ''
      const $msgElems = ctx.state.history.map(renderMessage)
      $.render(ctx.$display, $msgElems)
    }



    ctx.scroll()
  }
)

function getDateTime(ts) {
  const str = new Date(ts).toLocaleString()
  return str.split(', ')
}