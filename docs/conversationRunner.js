
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



// all conversation state is stored in ctx



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

class ChatContext {
  constructor(startingCode) {
    this.lastDomCodeSent = startingCode || 'START'
    this.history = []
    this.conversationState = {}
    this.user = getUserData
  }
}


class MessageHandler {
  constructor(chatName, messages, startingCode) {
    this.chatName = chatName
    this.messages = messages
    this.ctx = new ChatContext(startingCode)
    this.domSendEvents = []
  }

  addChatWindow(onDomSend, eventRegister) {
    this.domSendEvents.push(onDomSend)
    eventRegister('submit', message => this.toDom(message))
  }

  toDom(userResponse) {
    this.ctx.history.push({ from: 'sub', message: userResponse })

    const lastMessage = this.messages[this.ctx.lastDomCodeSent]

    if (lastMessage) {
      const codeToSend = lastMessage.responseHandler(userResponse, this.ctx)
      this.next(userResponse, codeToSend)
    }
  }

  next(userResponse, codeToSend) {

    this.ctx.history.push({ from: 'dom', messageCode: codeToSend })
    this.ctx.lastDomCodeSent = codeToSend

    const messageToSend = this.messages[codeToSend]

    if (messageToSend) {
      this.domSendEvents.forEach(onSend => onSend(messageToSend.messageText(userResponse, this.ctx)))

      messageToSend?.followUpMessages?.forEach(followUp => {
        // TODO UX of waiting
        this.next(userResponse, followUp.messageCode)
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
    </style>

    <section>
      <div id="display"></div>
      <input id="input"></input>
      <button id="submit">SUBMIT</button>
    </section>
  `,
  { history: [] },
  ctx => {
    ctx.$display = ctx.$('#display')
    ctx.$input = ctx.$('#input')
    ctx.$submit = ctx.$('#submit')

    ctx.submitMessage = (from, message) => ctx.setState({
      history: [...ctx.state.history, {from, message }]
    })

    const submit = () => {
      const message = ctx.$input.value
      if (!message.trim()) return


      ctx.submitMessage('you', message)
      ctx.$input.value = ''

      ctx.events?.submit?.forEach(onSubmit => onSubmit(message))

    }


    ctx.$submit.addEventListener('click', submit)
    ctx.$input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') submit()
    })

  },
  ctx => {
    ctx.$display.innerHTML = ctx.state.history.map(h =>
      `<div>${h.from}: ${h.message}</div>`
    ).join('')
  }
)