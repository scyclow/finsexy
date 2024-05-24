
import {createComponent, ls} from '../$.js'
import { clitLS } from '../state/clit.js'


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

      img {
        user-select: none;
      }

      iframe {
        max-width: 100%;
        margin-top: 0.25em;
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
        box-shadow: 0 -1px 8px var(--dark-color);
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
        text-shadow: 0 0 3px var(--dark-color);
        user-select: none;
      }

      #submit:hover, #submit:active, #submit:focus {
        box-shadow: 0 0 20px var(--primary-color);
        outline: none;
      }
      #submit:active, #submit:focus {
        opacity: 0.8;
      }

      #chat {
        display: flex;
        flex-direction: column;
        outline: 1px solid var(--border-color);
        height: 100%;
      }

      #display {
        display: flex;
        flex-direction: column;
        justify-content: end;
        padding: 0em 0.75em;
      }

      #displayContainer {
        height: 100%;
        overflow-y: scroll;
        padding: 0.5em;
        padding-top: 80px;
        z-index: 1;
      }

      .smoothScroll {
        scroll-behavior: smooth;
      }

      .message {
        font-size: ${clitLS.get('a11y') ? '1.3em' : '1em'};
        padding: 0.5em 1.25em 0.75em;
        margin-top: 0.75em;
        margin-bottom: 0.25em;
        border-radius: 1em;
        max-width: 35em;
        line-height: 1.2;
        word-break: break-word;
      }

      .message a {
        color: var(--light-link-color);
        text-shadow: 1px 1px 1px var(--dark-color), -1px 0px 3px var(--secondary-color);
        transition: 200ms;
      }

      .message a:hover {
        text-decoration: none;
        text-shadow: 2px 2px 2px var(--dark-color), -2px 0px 5px var(--secondary-color);
      }

      .messageContent img, .messageContent p + p {
        margin-top: 0.6em;
      }

      .messageContent img {
        width: 100%;
        border: 1px solid var(--light-color);
        box-shadow: 0 0 10px var(--light-color);
      }

      .messageContent {
        line-height: 1.3;
        padding-bottom: 0.25em;
      }

      .from-dom {
        text-shadow: ${clitLS.get('a11y') ? '1px 2px 0px var(--dark-color)' : '1px 1px 1px var(--dark-color), 1px 1px 2px var(--secondary-color), 0px 0px 15px var(--secondary-color)'};
      }

      .message:last-child {
        animation: fadeIn linear 0.2s;
      }

      .help-message {
        background: var(--help-color);
        color: var(--help-text-color);
        margin-bottom: 1.5em;
        align-self: flex-end;
        align-self: center;
        box-shadow: 0 0 20px var(--help-color);
        padding: 1.5em 3em;
        font-family: var(--code-font);
        padding: 1.25em;
        max-width: 470px;
      }
      .help-message .messageContent {
        font-family: var(--code-font);
        padding-bottom: 0;
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

      ul {
        margin-left: 2em;
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

        transition: 0.2s;
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
      #profileLink:hover, #profileLink:active, #profileLink:focus {
        text-decoration: underline;
      }

      #profileLink:active, #profileLink:focus {
        outline: 1px solid var(--primary-color);
      }

      #profileLink:hover #pfpContainer,
      #profileLink:active #pfpContainer,
      #profileLink:focus #pfpContainer {
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
        top: 0;
        z-index: 100;
      }

      .chatMessage {
        display: flex;
        flex-direction: column;
        margin-bottom: 1em;
        transition: 0.3s;
      }

      code {
        display: inline-block;
        padding: 0.5em;
        color: var(--light-color);
        border-radius: 0.25em;
        cursor: pointer;
        transition: 150ms;
        background: var(--bg-color);
        background: color-mix(in srgb, var(--bg-color) 75%, transparent);
      }

      code:hover {
        opacity: 0.8;
      }

      ::selection, .message ::selection  {
        background: var(--dark-color);
        color: var(--light-color);
      }

      time::selection, .date::selection, #input::selection {
        background: var(--light-color);
        color: var(--dark-color);
      }

      #back {
        display: none;
        text-decoration: none;
        padding: 1em;
        padding-left: 0;
        font-size: 1.25em;
        text-shadow: 3px 3px 0 var(--dark-color), -1px -1px 0 var(--dark-color), 3px 3px 5px var(--dark-color);
        transition: 0.2s;
      }

      #back:hover {
        color: var(--medium-color);
      }

      #newMessage {
        position: static;
        overflow: visible;
        height: 0;
        pointer-events: none;
        z-index: 10;
      }
      #newMessage * {
        position: relative;
        transform: translate(0, -96%);
        padding: 0.25em;
        text-align: center;
        background: linear-gradient(180deg, rgba(0,0,0,0) 0%, var(--primary-color) 100%);
        text-shadow: 1px 1px 2px var(--dark-color), 1px 1px 2px var(--secondary-color), 0px 0px 3px var(--secondary-color);
      }

      @media(max-width: 520px) {
        #back {
          display: initial;
        }
      }

      .dance:first-child {
        margin-left: 0.15em
      }
      .dance {
        display: inline-block;
        animation: Dance 1.75s ease-in-out infinite;
      }

      @keyframes Dance {
        0%, 50%, 100% {
          transform: translate(0, 0);
        }

        25% {
          transform: translate(0, -0.25em);
        }

        45% {
          transform: translate(0, 0.025em);
        }
      }



    </style>

    <section id="chat">
      <div id="headerContainer">
        <header>
          <a id="back" href="/chat">←</a>
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
        <div id="isTyping" class="hidden"></div>
      </div>
      <div id="newMessage" class="hidden"><div style="position: relative">New Message!</div></div>
      <div id="inputArea">
        <textarea id="input" placeholder="Type your message here..." autofocus></textarea>
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
    ctx.$newMessage = ctx.$('#newMessage')

    ctx.codeFns = {}

    const name = ctx.getAttribute('name')

    const submit = () => {
      // if (!ls.get('profileCompleted')) {
      //   window.location.pathname = './profile'
      //   return
      // }

      const message = ctx.$input.value
      ls.set(`__${name}_chat_cache`, null)
      if (!message.trim()) return

      ctx.events?.submit?.forEach(onSubmit => onSubmit(message))

      setTimeout(() => ctx.$input.value = '')
    }

    ctx.$pfp.src = `./thumbnails/${name}/pfp.png`
    ctx.$pfp.alt = `${name} avatar`
    ctx.$chatName.innerHTML = name
    ctx.$profileLink.href = `./profiles/${name}`

    ctx.$submit.addEventListener('click', submit)
    ctx.$input.addEventListener('keypress', (e) => {
      ls.set(`__${name}_chat_cache`, JSON.stringify({ value: ctx.$input.value }))
      if (e.key === 'Enter') submit()
      else {
        ctx.events?.type?.forEach(onType => onType(1000))
      }
    })

    ctx.$isTyping.innerHTML = `${name} is typing<span class="dance" >.</span><span class="dance" style="animation-delay:0.2s">.</span><span class="dance" style="animation-delay:0.4s">.</span>`

    ctx.isAtBottom = () => ctx.$displayContainer.scrollTop + window.innerHeight >= ctx.$displayContainer.scrollHeight //+ 75
    ctx.scroll = () => {
      ctx.$displayContainer.scrollTop = ctx.$displayContainer.scrollHeight
    }

    const chatCache = ls.get(`__${name}_chat_cache`)
    if (chatCache) {
      ctx.$input.value = chatCache.value
    }


    ctx.scroll()



    setTimeout(() => {
      ctx.$displayContainer.classList.add('smoothScroll')
    }, 200)

    ctx.$displayContainer.onscroll = () => {
      if (ctx.isAtBottom()) ctx.$newMessage.classList.add('hidden')
    }

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
        <div class="messageContent">${codify(linkify(h.messageText), ctx)}</div>
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

    const isAtBottom = ctx.isAtBottom()


    const lastMessage = last(ctx.state.history)


    let $lastMessage
    if (
      ctx.state.history.length &&
      ctx.state.history.length === ctx.oldState.history.length + 1
    ) {
      $lastMessage = renderMessage(lastMessage, ctx.state.history.length-1)
      ctx.$display.append($lastMessage)
      // if (last(ctx.state.history).from !== 'you' && FIRST_LOAD < Date.now() - 1000) {
      //   new Audio('/assets/notification4.mp3').play().catch(noop)
      // }

    } else if (ctx.state.history !== ctx.oldState.history) {
      ctx.$display.innerHTML = ''
      const $msgElems = ctx.state.history.map(renderMessage)
      $.render(ctx.$display, $msgElems)
    }


    if (isAtBottom || clitLS.get('devIgnoreWait')) {
      ctx.scroll()
    } else if (!ctx.state.isTyping && lastMessage?.from !== 'you') {
      ctx.$newMessage.classList.remove('hidden')
    }

    Object.keys(ctx.codeFns).forEach(id => {
      if (ctx.$(`#code-${id}`)) ctx.$(`#code-${id}`).onclick = ctx.codeFns[id]
    })
  },
)




function linkify(txt) {
  return txt.includes('@')
    ? txt.replaceAll(
      /@(\w+)/g,
      (match, mention) => `<a href="/profiles/${mention}">${match}</a>`
    )
    : txt
}

function codify(txt, ctx) {
  const matches = txt.match(/<code>\$sexy([\s\S]*?)<\/code>/g)

  if (matches) matches.forEach(match => {
    const id = String(Math.random()).replace('0.', '')
    const sexyCommand = match.replace('<code>', '').replace('</code>', '')
    // const code = `document.getElementById('input').value = '${sexyCommand}'`
    // const replacement = match.replace('<code>', `<code onclick="${code}">`)
    ctx.codeFns[id] = () => {
      ctx.$('#input').value = sexyCommand
      ctx.$('#input').focus()
    }

    const replacement = match.replace('<code>', `<code id="code-${id}">`)

    txt = txt.replace(match, replacement)


  })


  return txt

}

function getDateTime(ts) {
  const str = new Date(ts).toLocaleString()
  return str.split(', ')
}