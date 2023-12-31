import { getUserData } from './profile.js'
import { sexyCLIT, clitLS } from './clit.js'
import {ls} from '../$.js'
import {provider} from '../eth.js'



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
  'yep',
  'oui',
  'si',
  'da',
  'sure',
  'ok',
  'okay',
  'k',
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
  'i sure do',
  'great',
  'awesome',
  'amazing',
  'perfect',
  'yay',
  'incredibly',
  'right',
  'correct',
  'i guess',
  'it is',
  'it does',
  'yessir',
  'more than anything',
  'go ahead',
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
  'not',
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


const positives = [
  'good',
  'great',
  'incredible',
  'fabulous',
  'amazing',
  'horny',
  'amazing',
  'awesome',
  'wonderful',
  'lovely',
  'terrific',
  'excellent',
  'superb',
  'fabulous',
  'phenominal',
  'spectacular',
  'marvelous',
  'spelendid',
  'outstanding',
  'happy',
  'love',
]

const negatives = [
  'bad',
  'bored',
  'terrible',
  'hate',
  'awful',
  'sad',
  'unhappy',
  'upset',
  'miserable',
  'stressed',
  'depressed',
  'scared',
]

const meanResponses = [
  'fuck you',
  'go fuck yourself',
  'get fucked',
  'suck my dick',
  'eat my ass',
  'bitch',
  'cunt',
  'whore',
  'shut up',
  'tranny'
]


export const responseParser = txt => txt.toLowerCase().trim().replaceAll('!', '').replaceAll('.', '').replaceAll('.', '')

function isMatch(txt, phrases) {
  const cleaned = txt.toLowerCase().trim().replaceAll('!', '').replaceAll('.', '').replaceAll('.', '')
  const multipleWordPhrases = phrases.filter(phrase => phrase.split(' ').length > 1)
  const singleWordPhrases = phrases.filter(phrase => phrase.split(' ').length === 1)

  return (
    multipleWordPhrases.some(phrase => txt.includes(phrase)) ||
    singleWordPhrases.some(phrase => txt.split(' ').includes(phrase))
  )
}

const isNegate = txt => responseParser(txt).split(' ').some(word => ['no', 'not'].includes(word))
export const isGreeting = txt => isMatch(txt, greetings)
export const isYes = txt => isMatch(txt, yeses) && !isNegate(txt)
export const isNo = txt => isMatch(txt, noes)
export const isPositive = txt => isMatch(txt, positives) && !isNegate(txt)
export const isNegative = txt => isMatch(txt, negatives)
export const isMean = txt => isMatch(txt, meanResponses)



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
  constructor(chatName, startingCode, onRehydrate) {
    this.user = getUserData
    this.chatName = chatName
    this.chatLS = chatNameLS(chatName)
    this.lastMessageTimestamp = 0
    this.lastUserMessageTimestamp = 0
    this.totalMessages = 0
    this.global = {}


    setRunInterval(
      () => {
        const existingContext = this.chatLS.get()
        this.lastDomCodeSent = existingContext.lastDomCodeSent || startingCode || 'START'
        this.state = existingContext.state || {}
        this.eventQueue = existingContext.eventQueue || []
        this.unread = existingContext.unread || 0
        this.history = existingContext.history || []
        onRehydrate(this.history)
      },
      4000
    )
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


function createGlobalCtx(init) {
  const ctx = ls.get('__CHAT_GLOBAL_CONTEXT') || init

  setInterval(() => {
    Object.assign(ctx, ls.get('__CHAT_GLOBAL_CONTEXT') || init)
  }, 4000)

  return new Proxy(ctx, {
    set(obj, key, val) {
      obj[key] = val
      ls.set('__CHAT_GLOBAL_CONTEXT', JSON.stringify(ctx))
      return val
    },
    get(obj, key) {
      return obj[key]
    }
  })
}



export class MessageHandler {
  static chats = {}
  static globalCtx = createGlobalCtx({
    premium: 1
  })

  static provider = provider

  constructor(chatName, messages, startingCode) {
    this.chatName = chatName
    this.messages = messages
    this.registeredChatWindows = []
    this.ctx = new ChatContext(chatName, startingCode, (history) =>
      this.registeredChatWindows.forEach(chatWindow => {
        if (chatWindow.state.history.length !== history.length) {
          chatWindow.setState({ history })
        }
      })
    )
    this.ctx.global = MessageHandler.globalCtx
    this.isActive = false
    this.provider = MessageHandler.provider

    if (messages.__contract) {
      this.provider.onConnect(async addr => {
        this.contract = await messages.__contract(this.provider)
        MessageHandler.globalCtx.isConnected = true
        MessageHandler.globalCtx.connectedAddr = addr
      })
    }

    sexyCLIT.register(chatName, '', this.ctx, messageText =>
      this.updateHistory({
        helpMessage: true,
        messageText
      })
    )

    setRunInterval(async () => {
      const currentNode = this.getMessageToSend(this.ctx.lastDomCodeSent)
      const event = await currentNode?.event?.(this.ctx, this.contract, this.provider)
      if (event) {
        this.ctx.addToEventQueue(event)
      }
    }, 1000)

    setRunInterval(async () => {
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
      const messageToSend = this.getMessageToSend(messageCode, userResponse)


      const followUp = await this.sendFollowup(messageToSend, userResponse)


      if (followUp) {
        const messageToSend = this.getMessageToSend(followUp.messageCode, userResponse)
        const estimatedMessageText = await this.sendMessage(messageToSend, userResponse)
        const typingWait = clitLS.get().devIgnoreWait
          ? 50
          :  Math.floor(1000*estimatedMessageText.length/80)
        const wait = clitLS.get().devIgnoreWait
          ? 0
          : (followUp.waitMs||0) + random(1000)

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
        messageText: await this.sendMessage(messageToSend, userResponse),
        from: this.chatName,
      })
    }, 100)

    MessageHandler.chats[chatName] = this
  }

  static totalUnreads() {
    return Object.keys(MessageHandler.chats).reduce((sum, k) => sum + MessageHandler.chats[k].ctx.unread, 0)
  }


  getMessageToSend(msgCode, userResponse) {
    const precheck = this.messages?.__precheck?.(userResponse, this.ctx)

    return precheck || this.messages[msgCode]
  }



  async sendMessage(msg, userResponse) {
    if (!msg.messageText) return

    return typeof msg.messageText === 'string'
      ? msg.messageText
      : msg.messageText(userResponse, this.ctx, this.contract, this.provider)
  }

  async sendFollowup(msg, userResponse) {
    if (!msg.followUp) return

    if (typeof msg.followUp === 'string') {
      console.log(`INCORRECT FOLLOWUP FORMAT: ${msg.followUp}`)
      return { messageCode: msg.followUp, waitMs: 3000}
    }
    return msg?.followUp instanceof Function
      ? msg.followUp(userResponse, this.ctx, this.contract, this.provider)
      : msg.followUp
  }

  async findNextNode(msg, userResponse) {
    if (!msg.responseHandler) return
    return typeof msg.responseHandler === 'string'
      ? msg.responseHandler
      : msg.responseHandler(userResponse, this.ctx, this.contract, this.provider)
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

  async toDom(userResponse) {
    const is$sexy = userResponse.match(/^(\$sexy\s)/)

    this.updateHistory({
      from: 'you',
      messageText: is$sexy ? `<code>${userResponse}</code>` : userResponse
    })

    if (is$sexy) {
      return sexyCLIT.run(this.chatName, userResponse, this.ctx)
    }

    const lastMessage = this.getMessageToSend(this.ctx.lastDomCodeSent, userResponse)

    if (lastMessage && lastMessage.responseHandler) {
      const codeToSend = await this.findNextNode(lastMessage, userResponse)
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

  async next(userResponse, codeToSend) {
    const messageToSend = this.getMessageToSend(codeToSend, userResponse)

    if (messageToSend) {
      const estimatedMessageText = await this.sendMessage(messageToSend, userResponse)
      let wait = 0
      let typingWait = 0

      if (!clitLS.get().devIgnoreWait) {
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