
const greetings = [
  'hello',
  'hi',
  'hey',
  'hola',
  'good morning',
  'good afternoon',
  'good evening',
  'howdy',
  'greetings',
  'yo',
  'hi there',
  'hiya',
  'hey there',
  'hello there',
  `what's up`,
  'sup',
  `how's it going`,
  'how are you',
  'hiya there',
  'nice to meet you',
  'pleasure to meet you',
  'hey buddy',
  'good to see you',
  'hey you',
]

const yeses = [
  'yes',
  'yeah',
  'yea',
  'ya',
  'y',
  'yup',
  'oui',
  'si',
  'da',
  'sure',
  'ok',
  'okay',
  'alright',
  'definitely',
  'you bet',
  'indeed',
  'certainly',
  'aye',
  'affirmative',
  'very well',
  'you got it',
  'sure thing',
  'hell yes',
  'hell yeah',
  'fuck yeah',
  'fuck yes',
  'fine',
  '1',
  'true',
  'i do',
  'great',
  'awesome',
  'amazing',
  'perfect',
  'yay',
  'incredibly',
  'right',
  'correct',
]

const noes = [
  'no',
  'nope',
  'no way',
  'no way jose',
  'nah',
  'n',
  'nine',
  'negative',
  'absolutely not',
  'definitely not',
  'not really',
  'hell no',
  'fuck no',
  'heck no',
  'not at all',
  'no thanks',
  'no thank you',
  `i don't think so`,
  `i dont think so`,
  '0',
  'false',
  `i do not`,
  `i don't`,
  `i dont`,
  `wrong`,
  `incorrect`,
]


const responseParser = txt => txt.trim().replace('!', '').replace('.', '').replace('.', '')
const isGreeting = txt => greetings.some(t => responseParser(txt).includes(t))
const isYes = txt => yeses.some(t => responseParser(txt).includes(t))
const isNo = txt => noes.some(t => responseParser(txt).includes(t))



/*

TODO
  rude responses
  hanging responses
  blockchain updates
  gibberish/nonsense responses

*/



function genderSwitch(mapping) {
  return mapping[getUserData().gender]
}




const chatNameLS = chatName => ({
  get() {
    return ls.get('__CHAT_CONTEXT_' + chatName) || {}
  },

  set(k, v) {
    const props = this.get() || {}
    props[k] = v
    ls.set('__CHAT_CONTEXT_' + chatName, JSON.stringify(props))
  }
})







const sexyCLI = {

  nameToAddress: {},
  nameToContext: {},
  nameToCallback: {},


  register(name, addr, ctx, cb) {
    this.nameToAddress[name] = addr
    this.nameToContext[name] = ctx
    this.nameToCallback[name] = cb
  },

  run(name, input, ctx) {
    const [sexy, command, ...args] = input.toLowerCase().trim().split(' ')
    const cb = this.nameToCallback[name]
    if (sexy !== '$sexy') return cb('Something went wrong...')

    if (command === 'help') {
      return cb(`
        <h3>$sexy CLI commands</h3>

        <h5 style="margin-top: 2em; margin-bottom: 0.25em">Display Help</h5>
        <p><code>$sexy help</code></p>

        <h5 style="margin-top: 2em; margin-bottom: 0.25em">Send ETH</h5>
        <p><code>$sexy send [recipient name] [amount in ETH]</code></p>

        <h5 style="margin-top: 2em; margin-bottom: 0.25em">Purchase VIP Membership</h5>
        <p><code>$sexy vip buy</code></p>
      `)
    }
    else if (command === 'send') {
      setTimeout(() => {
        const [recipient, amount] = args
        if (!MessageHandler.chats[recipient]) {
          return cb(`Invalid recipient: ${recipient}`)
        } else if (isNaN(Number(amount))) {
          return cb(`Invalid amount: ${amount}`)
        }
        // TODO make this real
        MessageHandler.chats[recipient].ctx.state.totalPaid =
          (MessageHandler.chats[recipient].ctx.totalPaid || 0)
          + Number(amount)
      }, 2000)
      return cb(`Sending: ${JSON.stringify(args)}`)
    }
    else if (command === 'help') {
      return cb('... If you still require customer assistance, please text the following number during business hours: ‪(848) 225-7281‬. Mobile SMS messaging rates may apply.')
    } else if (command === 'dev') {
      if (args[0] === 'debug') {
        MessageHandler.__DEBUG__ = args[1] === 'true' ? true : false

        return cb(`__DEBUG__: ${MessageHandler.__DEBUG__}`)
      }
    }
    return cb()
  }
}




class ChatContext {
  constructor(chatName, startingCode) {
    this.user = getUserData
    this.chatName = chatName
    this.chatLS = chatNameLS(chatName)

    const existingContext = this.chatLS.get()
    this.lastDomCodeSent = existingContext.lastDomCodeSent || startingCode || 'START'
    this.state = existingContext.state || {}
    this.eventQueue = existingContext.eventQueue || []
    this.history = existingContext.history || []

    this.updateLS()

  }

  updateLS() {
    this.chatLS.set('lastDomCodeSent', this.lastDomCodeSent)
    this.chatLS.set('state', this.state)
    this.chatLS.set('eventQueue', this.eventQueue)
    this.chatLS.set('history', this.history)
  }

  addToEventQueue(msg) {
    this.eventQueue.push(msg)
    this.eventQueue.sort((a, b) => a.timestamp - b.timestamp)
    this.updateLS()
  }
}


class MessageHandler {
  static chats = {}
  static __DEBUG__ = false

  constructor(chatName, messages, startingCode) {
    this.chatName = chatName
    this.messages = messages
    this.registeredChatWindows = []
    this.ctx = new ChatContext(chatName, startingCode)
    sexyCLI.register(chatName, '', this.ctx, messageText =>
      this.updateHistory({
        helpMessage: true,
        messageText
      })
    )

    setRunInterval(async () => {
      const currentNode = this.messages[this.ctx.lastDomCodeSent]
      const event = currentNode?.event?.(this.ctx)
      if (event) {
        this.ctx.addToEventQueue(event)
      }
    }, 1000)

    setRunInterval(() => {
      if (
        this.ctx.eventQueue.length &&
        Date.now() + this.ctx.eventQueue[0].typingWait > this.ctx.eventQueue[0].timestamp
      ) {
        this.registeredChatWindows.forEach(chatWindow =>
          !this.ctx.eventQueue[0].ignoreType && chatWindow.setState({ isTyping: true })
        )
      }

      if (
        !this.ctx.eventQueue.length ||
        this.ctx.eventQueue[0].timestamp > Date.now()
      ) return


      const { messageCode, userResponse } = this.ctx.eventQueue.shift()
      const messageToSend = this.messages[messageCode]


      const followUp = messageToSend?.followUp instanceof Function
        ? messageToSend.followUp(this.ctx)
        : messageToSend.followUp

      if (followUp) {
        const messageToSend = this.messages[followUp.messageCode]
        const estimatedMessageText = messageToSend.messageText(userResponse, this.ctx)
        const typingWait = MessageHandler.__DEBUG__
          ? 0
          :  Math.floor(1000*estimatedMessageText.length/80)
        const wait = MessageHandler.__DEBUG__
          ? 0
          : followUp.waitMs + random(1000)

        this.ctx.addToEventQueue({
          userResponse,
          messageCode: followUp.messageCode,
          timestamp: Date.now() + wait,
          typingWait
        })
      }



      this.ctx.lastDomCodeSent = messageCode

      this.updateHistory({
        messageCode: messageCode,
        messageText: messageToSend.messageText(userResponse, this.ctx),
        from: this.chatName,
      })
    }, 100)

    MessageHandler.chats[chatName.toLowerCase()] = this
  }




  addChatWindow(chatWindow) {
    this.registeredChatWindows.push(chatWindow)
    chatWindow.registerEventHandler('submit', message => this.toDom(message))
    chatWindow.setState({ history: this.ctx.history })
  }

  updateHistory({ from, messageText, messageCode, helpMessage }) {
    const historyItem = { from, messageText, messageCode, helpMessage, timestamp: Date.now() }
    this.ctx.history.push(historyItem)
    this.registeredChatWindows.forEach(chatWindow => {
      if (helpMessage) {
        chatWindow.setState({ history: this.ctx.history })
      } else {
        chatWindow.setState({ isTyping: false })
        setTimeout(() => chatWindow.setState({ history: this.ctx.history }), 100)
      }
    })
    this.ctx.updateLS()
  }

  toDom(userResponse) {
    this.updateHistory({
      from: 'you',
      messageText: userResponse
    })

    if (userResponse.match(/^(\$sexy\s)/)) {
      return sexyCLI.run(this.chatName, userResponse, this.ctx)
    }

    const lastMessage = this.messages[this.ctx.lastDomCodeSent]

    if (lastMessage && lastMessage.responseHandler) {
      const codeToSend = lastMessage.responseHandler(userResponse, this.ctx)
      this.next(userResponse, codeToSend)
    }
  }

  next(userResponse, codeToSend) {
    const messageToSend = this.messages[codeToSend]

    if (messageToSend) {
      const estimatedMessageText = messageToSend.messageText(userResponse, this.ctx)
      const typingWait = 500 + random(750)
      const wait = MessageHandler.__DEBUG__
        ? 0
        : Math.floor(
          1000*estimatedMessageText.length/80
          + typingWait
          + 500 + random(750)
        )

      setTimeout(() => {
        this.registeredChatWindows.forEach(chatWindow =>
          chatWindow.setState({ isTyping: true })
        )
      }, typingWait)


      this.ctx.addToEventQueue({
        ignoreType: true,
        userResponse,
        messageCode: codeToSend,
        timestamp: Date.now() + wait
      })
    }
  }
}











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
        background: #292929;
        padding: 0.5em;
        box-sizing: border-box;
        transition: 0.2s;
        box-shadow: inset 0px 0px 10px #555;
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