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
  'i am',
  'i sure am',
  'i sure do',
  'i think so',
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
  'sounds good',
  'sounds great',
  'sort of',
  'sorta',
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
  `i dont think so`,
  '0',
  'false',
  `i do not`,
  `i dont`,
  `i cant`,
  `wrong`,
  `incorrect`,
  `not bad`,
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
  'ok',
  'okay',
  'alright',
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


export const responseParser = txt => txt.toLowerCase().trim().replaceAll('!', '').replaceAll('.', '').replaceAll(',', '').replaceAll('"', '').replaceAll(`'`, '')

export function isMatch(txt, phrases) {
  const cleaned = txt.toLowerCase().trim().replaceAll('!', '').replaceAll('.', '').replaceAll('.', '')
  const multipleWordPhrases = phrases.filter(phrase => phrase.split(' ').length > 1)
  const singleWordPhrases = phrases.filter(phrase => phrase.split(' ').length === 1)

  return (
    multipleWordPhrases.some(phrase => cleaned.includes(phrase)) ||
    singleWordPhrases.some(phrase => cleaned.split(' ').includes(phrase))
  )
}

const isNegate = txt => responseParser(txt).split(' ').some(word => ['no', 'not'].includes(word))
export const isGreeting = txt => isMatch(txt, greetings)
export const isYes = txt => isMatch(txt, yeses) && !isNegate(txt)
export const isNo = txt => isMatch(txt, noes)
export const isPositive = txt => isMatch(txt, positives) && !isNegate(txt)
export const isNegative = txt => isMatch(txt, negatives)
export const isMean = txt => isMatch(txt, meanResponses)

export const diatribe = (baseCode, messages, endAction, waitMs=2000) => {
  return messages.reduce((nodes, messageText, i) => {
    const action = i === messages.length - 1
      ? endAction
      : {
          followUp: {
            messageCode: `${baseCode}-${i+1}`,
            waitMs
          }
        }

    const code = i ? `${baseCode}-${i}` : baseCode

    nodes[code] = {
      messageText,
      ...action
    }

    return nodes
  }, {})
}


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
    this.global = {}
    this.lastLSRead = 0

    setRunInterval(
      () => {
        const existingContext = this.chatLS.get()

        // if (
        //   this.history
        //   && existingContext.history.length < this.history.length
        //   && this.lastLSRead < ls.get('__LAST_CLEAR_TIME')
        // ) return

        this.lastLSRead = Date.now()
        this.lastMessageTimestamp = existingContext.lastMessageTimestamp || 0
        this.lastUserMessageTimestamp = existingContext.lastUserMessageTimestamp || 0
        this.totalMessages = existingContext.totalMessages || 0
        this.lastDomCodeSent = existingContext.lastDomCodeSent || startingCode || 'START'
        this.state = existingContext.state || {}
        this.eventQueue = existingContext.eventQueue || []
        this.unread = existingContext.unread || 0
        this.lastLSRead = Date.now()
        this.history = existingContext.history || []


        onRehydrate(this.history)
      },
      4000
    )
    this.updateLS()

  }

  updateLS() {
    if (this.lastLSRead < ls.get('__LAST_CLEAR_TIME')) return

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

  constructor(chatName, messages, startingCode='START') {
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
        MessageHandler.globalCtx.isConnected = !!addr
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

    setRunInterval(this.handleQueue.bind(this), 100)

    MessageHandler.chats[chatName] = this
  }

  static totalUnreads() {
    return Object.keys(MessageHandler.chats).reduce((sum, k) => sum + MessageHandler.chats[k].ctx.unread, 0)
  }

  async handleQueue() {
    if (!this.ctx.eventQueue.length) return
    const nextMessage = this.ctx.eventQueue[0]
    const now = Date.now()

    if (
      nextMessage.startTyping <= now
      && !nextMessage.ignoreType
    ) {
      this.registeredChatWindows.forEach(chatWindow =>
        chatWindow.setState({ isTyping: true })
      )
    }
    // else {
    //   if (nextMessage.startTyping) console.log(now - nextMessage.startTyping)
    //   else if (nextMessage.isFollowup) debugger
    // }



    if (nextMessage.timestamp > now) return

    const { messageCode, userResponse, isFollowup } = this.ctx.eventQueue.shift()
    const messageToSend = this.getMessageToSend(messageCode, userResponse, isFollowup)

    const followUp = await this.sendFollowup(messageToSend, userResponse)


    if (followUp) {
      const messageToSend = this.getMessageToSend(followUp.messageCode, userResponse, true)
      const estimatedMessageText = await this.sendMessage(messageToSend, userResponse)
      const [typingWait, wait] = this.waitTimes(estimatedMessageText, 250)

      this.ctx.addToEventQueue({
        userResponse,
        messageCode: followUp.messageCode,
        timestamp: now + wait,
        startTyping: now + typingWait,
        isFollowup: true
      })
    }

    this.ctx.lastDomCodeSent = messageCode

    if (messageToSend.ignoreSend) return

    this.updateHistory({
      messageCode: messageCode,
      messageText: await this.sendMessage(messageToSend, userResponse),
      from: this.chatName,
    })
  }


  getMessageToSend(msgCode, userResponse, isFollowup) {
    const precheck = this.messages?.__precheck?.(
      userResponse,
      this.ctx,
      this.contract,
      this.provider,
      isFollowup
    )

    return precheck || this.messages[msgCode]
  }



  async sendMessage(msg, userResponse) {
    if (!msg.messageText) {
      return ''
    }

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
    if (!messageText) return

    if (!this.isActive) {
      this.ctx.unread += 1
    }
    if (from === 'you') {
      this.ctx.lastUserMessageTimestamp = Date.now()
    }
    this.ctx.lastMessageTimestamp = Date.now()
    this.ctx.totalMessages += 1

    const historyItem = {
      from,
      messageText,
      messageCode,
      helpMessage,
      id: this.ctx.history.length,
      timestamp: Date.now()
    }
    this.ctx.history = [...this.ctx.history, historyItem]
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

    if (lastMessage && (lastMessage.responseHandler || lastMessage.followUp)) {
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

  waitTimes(estimatedMessageText, typingWaitFactor) {
    const domTypingSpeed = this.messages.TYPING_SPEED

    if (clitLS.get().devIgnoreWait) {
      return [50, 50]
    } else {
      const typingWait = 1000 + random(typingWaitFactor)
      const wait = Math.floor(
        Math.max(
          1500,
          domTypingSpeed*25*estimatedMessageText.length
          + 500 + random(750)
        )
        + typingWait
      )
      return [typingWait, wait]
    }
  }

  async next(userResponse, codeToSend) {
    const messageToSend = this.getMessageToSend(codeToSend, userResponse)

    if (messageToSend) {
      const estimatedMessageText = await this.sendMessage(messageToSend, userResponse)
      const [typingWait, wait] = this.waitTimes(estimatedMessageText, 750)

      setTimeout(() => {
        this.registeredChatWindows.forEach(chatWindow =>
          !messageToSend.ignoreType && chatWindow.setState({ isTyping: true })
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