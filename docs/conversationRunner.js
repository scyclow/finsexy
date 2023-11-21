
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
  'fine',
  '1',
  'true',
  'i do',
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
  'not at all',
  'no thanks',
  'no thank you',
  `i don't think so`,
  `i dont think so`,
  '0',
  'false',
  `i do not`,
  `i don't`,
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
    gender: 'man',
  }
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
          !this.ctx.messageEventQueue.length ||
          this.ctx.messageEventQueue[0].timestamp > Date.now()
        ) return

        const { messageCode, userResponse } = this.ctx.messageEventQueue.shift()
        const messageToSend = this.messages[messageCode]

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
    this.registeredChatWindows.forEach(chatWindow =>
      chatWindow.setState({ history: this.ctx.history })
    )
    this.ctx.updateLS()
  }

  toDom(userResponse) {
    this.updateHistory({
      from: 'you',
      messageText: userResponse
    })

    const lastMessage = this.messages[this.ctx.lastDomCodeSent]

    if (lastMessage) {
      const codeToSend = lastMessage.responseHandler(userResponse, this.ctx)
      this.next(userResponse, codeToSend)
    }
  }

  next(userResponse, codeToSend) {
    const messageToSend = this.messages[codeToSend]

    if (messageToSend) {
      const estimatedMessageText = messageToSend.messageText(userResponse, this.ctx)
      const wait = Math.floor(
        Math.max(1000*estimatedMessageText.length/80, 250)
        + random(500)
      )


      this.ctx.addToMessageEventQueue({
        userResponse,
        messageCode: codeToSend,
        timestamp: Date.now() + wait
      })


      messageToSend?.followUpMessages?.forEach(followUp => {
        this.ctx.addToMessageEventQueue({
          userResponse,
          messageCode: followUp.messageCode,
          timestamp: Date.now() + followUp.waitMs
        })
      })



      // const send = () => {
      //   this.updateHistory({
      //     messageText,
      //     from: this.chatName,
      //     messageCode: codeToSend
      //   })

      //   let totalWaitTime = 0
      //   messageToSend?.followUpMessages?.forEach(followUp => {
      //     totalWaitTime += followUp.waitMs

      //     setTimeout(
      //       () => this.next(userResponse, followUp.messageCode),
      //       totalWaitTime + followUp.waitMs
      //     )
      //   })
      // }

      // setTimeout(
      //   send,
      //   Math.max(1000*messageText.length/80, 250) + Math.random() * 500
      // )
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
        border: 0;
        padding: 0;
        font-family: Trebuchet MS;
      }

      #input {
        resize: none;
        width: 100%;
        height: 4em;
        color: #fff;
        background: #292929;
        padding: 0.5em;
        box-sizing: border-box;
        transition: 0.2s;
      }


      #input:hover {
        box-shadow: inset 0px 0px 10px #ccc;
      }
      #input:focus, #input:focus:hover {
        outline: none !important;
        border: 1px solid #ff00c7;
        box-shadow: inset 0px 0px 10px #ff00c7;
      }

      #inputArea {
        display: flex;
      }

      #submit {
        cursor: pointer;
        background: #ff00c7;
        border-color: #ff00c7;
        color: #fff;
        font-weight: bold;
        padding: 0 1em;
        transition: 0.2s;
        font-size: 1.1em;
      }

      #submit:hover {
        box-shadow: 0 0 20px #ff00c7;
      }

      #chat {
        display: flex;
        flex-direction: column;
        border: 1px dashed;
        height: 100%;
      }

      #display {
        display: flex;
        flex-direction: column;
        justify-content: end;
      }

      #displayContainer {
        height: 100%;
        overflow: scroll;
        padding: 0.5em;
        box-shadow: inset 0px 0px 10px #ccc;
      }

      .message {
        padding: 0.5em;
        margin: 0.75em;
      }

      .message::selection {
        background: #000;
        color: #fff;
      }

      .from-you {
        border-radius: 1em;
        border-bottom-right-radius: 0;
        background: #fff;
        color: #000;
        margin-left: 3em;
        align-self: flex-end;
        box-shadow: 0 0 20px #ffffff;
      }

      .from-dom {
        background: #ff00c7;
        color: #fff;
        border-radius: 1em;
        border-bottom-left-radius: 0;
        margin-right: 3em;
        align-self: flex-start;
        box-shadow: 0 0 20px #ff00c7;

      }
    </style>

    <section id="chat">
      <div id="displayContainer">
        <div id="display"></div>
      </div>
      <div id="inputArea">
        <textarea id="input"></textarea>
        <button id="submit">SUBMIT</button>
      </div>
    </section>
  `,
  { history: [] },
  ctx => {
    ctx.$display = ctx.$('#display')
    ctx.$displayContainer = ctx.$('#displayContainer')
    ctx.$input = ctx.$('#input')
    ctx.$submit = ctx.$('#submit')

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
  },
  ctx => {
    ctx.$display.innerHTML = ctx.state.history.map(h =>
      `<div class="message ${h.from === 'you' ? 'from-you' : 'from-dom'}">${h.from}: ${h.messageText}</div>`
    ).join('')
    ctx.$displayContainer.scrollTop = ctx.$displayContainer.scrollHeight;

  }
)