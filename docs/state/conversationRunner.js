import { getUserData } from './profile.js'
import { sexyCLI, cliLS } from './cli.js'
import {ls} from '../$.js'


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
  'i guess',
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
export const isGreeting = txt => greetings.some(t => responseParser(txt).includes(t))
export const isYes = txt => yeses.some(t => responseParser(txt).includes(t))
export const isNo = txt => noes.some(t => responseParser(txt).includes(t))



/*

TODO
  rude responses
  hanging responses
  blockchain updates
  gibberish/nonsense responses

*/







const chatNameLS = chatName => ({
  getFullCtx() {
    return ls.get('__CHAT_CONTEXT') || {}
  },

  get() {
    const chatContext = this.getFullCtx()
    return chatContext[chatName] || {}
  },

  set(k, v) {
    const ctx = this.getFullCtx()
    ctx[chatName] = ctx[chatName] || {}
    ctx[chatName][k] = v

    ls.set('__CHAT_CONTEXT', JSON.stringify(ctx))
  }
})









class ChatContext {
  constructor(chatName, startingCode) {
    this.user = getUserData
    this.chatName = chatName
    this.chatLS = chatNameLS(chatName)
    this.lastMessageTimestamp = 0
    this.lastUserMessageTimestamp = 0
    this.totalMessages = 0

    const existingContext = this.chatLS.get()
    this.lastDomCodeSent = existingContext.lastDomCodeSent || startingCode || 'START'
    this.state = existingContext.state || {}
    this.eventQueue = existingContext.eventQueue || []
    this.history = existingContext.history || []
    this.unread = existingContext.unread || 0

    this.updateLS()

  }

  updateLS() {
    this.chatLS.set('lastDomCodeSent', this.lastDomCodeSent)
    this.chatLS.set('state', this.state)
    this.chatLS.set('eventQueue', this.eventQueue)
    this.chatLS.set('history', this.history)
    this.chatLS.set('unread', this.unread)
    this.chatLS.set('lastMessageTimestamp', this.lastMessageTimestamp)
    this.chatLS.set('lastUserMessageTimestamp', this.lastUserMessageTimestamp)
    this.chatLS.set('totalMessages', this.totalMessages)
  }

  addToEventQueue(msg) {
    const pendingMessageCodes = this.eventQueue.map(event => event.messageCode)
    if (!pendingMessageCodes.includes(msg.messageCode)) {
      this.eventQueue.push(msg)
      this.eventQueue.sort((a, b) => a.timestamp - b.timestamp)
      this.updateLS()
    }
  }

  resetUnread() {
    this.unread = 0
    this.updateLS()
  }
}


export class MessageHandler {
  static chats = {}


  constructor(chatName, messages, startingCode) {
    this.chatName = chatName
    this.messages = messages
    this.registeredChatWindows = []
    this.ctx = new ChatContext(chatName, startingCode)
    this.isActive = false

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
        const typingWait = cliLS.get().devIgnoreWait
          ? 0
          :  Math.floor(1000*estimatedMessageText.length/80)
        const wait = cliLS.get().devIgnoreWait
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

      if (messageToSend.ignoreSend) return

      this.updateHistory({
        messageCode: messageCode,
        messageText: messageToSend.messageText(userResponse, this.ctx),
        from: this.chatName,
      })
    }, 100)

    MessageHandler.chats[chatName] = this
  }

  static totalUnreads() {
    return Object.keys(MessageHandler.chats).reduce((sum, k) => sum + MessageHandler.chats[k].ctx.unread, 0)
  }




  addChatWindow(chatWindow) {
    if (chatWindow) {
      this.registeredChatWindows.push(chatWindow)
      chatWindow.registerEventHandler('submit', message => this.toDom(message))
      chatWindow.setState({ history: this.ctx.history })
    }
  }

  updateHistory({ from, messageText, messageCode, helpMessage }) {
    if (!this.isActive) {
      this.ctx.unread += 1
    }
    if (from === 'you') {
      this.ctx.lastUserMessageTimestamp = Date.now()
    }
    this.ctx.lastMessageTimestamp = Date.now()
    this.ctx.totalMessages += 1

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

  queueEvent(codeToSend, wait) {
    this.ctx.addToEventQueue({
      ignoreType: true,
      userResponse: '',
      messageCode: codeToSend,
      timestamp: Date.now() + wait
    })
  }

  next(userResponse, codeToSend) {
    const messageToSend = this.messages[codeToSend]

    if (messageToSend) {
      const estimatedMessageText = messageToSend.messageText(userResponse, this.ctx)
      let wait = 0
      let typingWait = 0

      if (!cliLS.get().devIgnoreWait) {
        typingWait = 500 + random(750)
        wait = Math.floor(
          1000*estimatedMessageText.length/80
          + typingWait
          + 500 + random(750)
        )
      }

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

window.MessageHandler = MessageHandler