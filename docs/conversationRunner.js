
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


const responseParser = txt => txt.trim().replace('!', '').replace('.', '')
const isGreeting = txt => greetings.includes(responseParser(txt))
const isYes = txt => yeses.includes(responseParser(txt))
const isNo = txt => noes.includes(responseParser(txt))



/*

TODO
  rude responses
  hanging responses
  blockchain updates
  gibberish/nonsense responses

*/

function getUserData() {
  return {
    submissiveTitle: 'boy',
    name: 'steviep',
    gender: 'm',
  }
}

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

class ChatContext {
  constructor(chatName, startingCode) {
    this.user = getUserData
    this.chatName = chatName
    this.chatLS = chatNameLS(chatName)

    const existingContext = this.chatLS.get()
    this.lastDomCodeSent = existingContext.lastDomCodeSent || startingCode || 'START'
    this.conversationState = existingContext.conversationState || {}
    this.history = existingContext.history || []
    this.messageEventQueue = existingContext.messageEventQueue || []

    this.updateLS()

  }

  updateLS() {
    this.chatLS.set('lastDomCodeSent', this.lastDomCodeSent)
    this.chatLS.set('conversationState', this.conversationState)
    this.chatLS.set('history', this.history)
    this.chatLS.set('messageEventQueue', this.messageEventQueue)
  }

  addToMessageEventQueue(msg) {
    this.messageEventQueue.push(msg)
    this.messageEventQueue.sort((a, b) => a.timestamp - b.timestamp)
    this.updateLS()
  }
}


class MessageHandler {
  constructor(chatName, messages, startingCode) {
    this.chatName = chatName
    this.messages = messages
    this.registeredChatWindows = []
    this.ctx = new ChatContext(chatName, startingCode)

    setRunInterval(() => {
      while (true) {
        if (
          this.ctx.messageEventQueue.length &&
          Date.now() + this.ctx.messageEventQueue[0].typingWait > this.ctx.messageEventQueue[0].timestamp
        ) {
          this.registeredChatWindows.forEach(chatWindow =>
            !this.ctx.messageEventQueue[0].ignoreType && chatWindow.setState({ isTyping: true })
          )
        }

        if (
          !this.ctx.messageEventQueue.length ||
          this.ctx.messageEventQueue[0].timestamp > Date.now()
        ) return


        const { messageCode, userResponse } = this.ctx.messageEventQueue.shift()
        const messageToSend = this.messages[messageCode]


        messageToSend?.followUpMessages?.forEach(followUp => {
          const messageToSend = this.messages[followUp.messageCode]
          const estimatedMessageText = messageToSend.messageText(userResponse, this.ctx)
          const typingWait = Math.floor(1000*estimatedMessageText.length/80)


          this.ctx.addToMessageEventQueue({
            userResponse,
            messageCode: followUp.messageCode,
            timestamp: Date.now() + followUp.waitMs + random(1000),
            typingWait
          })
        })


        this.ctx.lastDomCodeSent = messageCode

        this.updateHistory({
          messageCode: messageCode,
          messageText: messageToSend.messageText(userResponse, this.ctx),
          from: this.chatName,
        })

      }
    }, 100)
  }




  addChatWindow(chatWindow) {
    this.registeredChatWindows.push(chatWindow)
    chatWindow.registerEventHandler('submit', message => this.toDom(message))
    chatWindow.setState({ history: this.ctx.history })
  }

  updateHistory({ from, messageText, messageCode }) {
    const historyItem = { from, messageText, messageCode, timestamp: Date.now() }
    this.ctx.history.push(historyItem)
    this.registeredChatWindows.forEach(chatWindow => {
      chatWindow.setState({ isTyping: false })
      setTimeout(() => chatWindow.setState({ history: this.ctx.history }), 100)
    })
    this.ctx.updateLS()
  }

  toDom(userResponse) {
    this.updateHistory({
      from: 'you',
      messageText: userResponse
    })

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
      const wait = Math.floor(
        1000*estimatedMessageText.length/80
        + typingWait
        + 500 + random(750)
      )

      setTimeout(() => {
        this.registeredChatWindows.forEach(chatWindow =>
          chatWindow.setState({ isTyping: true })
        )
      }, typingWait)


      this.ctx.addToMessageEventQueue({
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
        font-family: Trebuchet MS;
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
        background: var(--primary-color);
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
        padding: 0.5em 1em 0.75em;
        margin-top: 0.75em;
        margin-bottom: 0.25em;
      }

      .message::selection {
        background: var(--dark-color);
        color: var(--light-color);
      }

      .message:last-child {
        animation: fadeIn linear 0.2s;
      }

      .from-you {
        border-radius: 1em;
        border-bottom-right-radius: 0;
        background: var(--light-color);
        color: var(--dark-color);
        margin-left: 3em;
        align-self: flex-end;
        box-shadow: 0 0 20px var(--light-color)fff;
      }

      .from-dom {
        background: var(--primary-color);
        color: var(--light-color);
        border-radius: 1em;
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
        font-family: cursive;
        font-style: italic;
        margin-left: 1em;

        opacity: 1;
      }

      .hidden {
        opacity: 0 !important;
      }

      header {
        background: linear-gradient(45deg, #18033b, var(--dark-color));
        height: 40px;
        border-bottom: #592ba2;

      }
    </style>

    <section id="chat">
      <!-- <header></header> -->
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
      <div class="message ${h.from === 'you' ? 'from-you' : 'from-dom'}">
        <h6 class="from">${h.from}</h6>
        <div class="messageContent">${h.messageText}</div>
      </div>
      <time datetime="${h.timestamp}" class="${h.from === 'you' ? 'alignRight' : 'alignLeft'}">
        ${getDateTime(h.timestamp)[1]}
      </time>
      `
    ).join('')
    ctx.$displayContainer.scrollTop = ctx.$displayContainer.scrollHeight;
  }
)

function getDateTime(ts) {
  const str = new Date(ts).toLocaleString()
  return str.split(', ')
}