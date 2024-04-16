import { getUserData } from './profile.js'
import { sexyCLIT, clitLS } from './clit.js'
import {ls, $} from '../$.js'
import {provider} from '../eth.js'
import {ProfileStats} from './all.js'



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

const positives = [
  'positive',
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

const negativeNegatives = [
  'not bad',
  'not too bad',
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
  'true',
  // 'i do',
  'i did',
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
  'once or twice',
  'all the time',
  'sometimes',
  'confirm',
  'confirmation',
  'i consent',
  `lets do it`,
  `lets go`,
  `lets fucking go`,
  `lets do it`,
  `lets do this`,
  `im in`,
  ...positives
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
  `does not`,
  `doesnt`
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
  'not great',
  'not good',
  'not too good',
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


export const responseParser = txt => txt.toLowerCase().trim().replaceAll('!', '').replaceAll('.', '').replaceAll(',', '').replaceAll('"', '').replaceAll(`'`, '').replaceAll('?', '')

export function isMatch(txt, phrases) {
  const cleaned = responseParser(txt)
  const multipleWordPhrases = phrases.filter(phrase => phrase.split(' ').length > 1)
  const singleWordPhrases = phrases.filter(phrase => phrase.split(' ').length === 1)

  return (
    multipleWordPhrases.some(phrase => cleaned.includes(phrase)) ||
    singleWordPhrases.some(phrase => cleaned.split(' ').includes(phrase))
  )
}

const isNegate = txt => responseParser(txt).split(' ').some(word => ['no', 'not', 'dont'].includes(word))
export const isGreeting = txt => isMatch(txt, greetings)
export const isYes = txt => isMatch(txt, yeses) && !isNegate(txt)
export const isNo = txt => isMatch(txt, noes)
export const isPositive = txt => isMatch(txt, negativeNegatives) || isMatch(txt, positives) && !isNegate(txt)
export const isNegative = txt => isMatch(txt, negatives)
export const isMean = txt => isMatch(txt, meanResponses)


export const diatribe = (baseCode, messages, endAction, waitMs=2000) => {
  return messages.reduce((nodes, messageText, i) => {
    const action = i === messages.length - 1
      ? endAction
      : {
          followUp: {
            messageCode: `${baseCode}${i+1}`,
            waitMs
          },
          responseHandler: (ur, ctx) => {
            if (!ctx.eventQueue.length) {
              return `${baseCode}${i+1}`
            }
          }
        }

    const code = i ? `${baseCode}${i}` : baseCode

    nodes[code] = {
      messageText,
      ...action
    }

    return nodes
  }, {})
}


// primary, wait, notEnough, postEvent
export function createEvent(amount, responses={}, waitMs=600000) {
  return {
    async preEvent(ur, ctx, contract, provider) {
      const addr = await provider.isConnected()
      ctx.state.nodeResponses = ctx.state.nodeResponses || {}

      if (addr) {
        ctx.state.alreadyPaid = fromWei(await contract.tributes(addr))
        ctx.state.lastResponded = Date.now()
        ctx.state.nodeResponses[ctx.lastDomCodeSent] = true
      }
    },

    async check(ur, ctx, contract, provider) {
      const addr = await provider.isConnected()
      const price = ctx.global.premium * amount

      if (contract && addr) {
        const t = fromWei(await contract.tributes(addr))
        if (Number((t - ctx.state.alreadyPaid).toFixed(6)) >= price) {
          return responses.primary
        } else if (Date.now() - ctx.state.lastResponded > waitMs && !ctx.state.nodeResponses[ctx.lastDomCodeSent]) {
          return responses.wait
        } else if (t > ctx.state.alreadyPaid && t - ctx.state.alreadyPaid < price) {
          return responses.notEnough
        }
      }
    },

    async postEvent(ur, ctx, contract, provider) {
      if (responses.postEvent) return responses.postEvent(ur, ctx, contract, provider)
    },
  }
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
    this.visibility = {}
    this.lastLSRead = 0
    this.lastLSWrite = 0

    setRunInterval(
      () => {
        const lastReadAfterClear = this.lastLSRead > ls.get('__LAST_CLEAR_TIME')
        this.lastLSRead = Date.now()

        const existingContext = this.chatLS.get()
        const lsHistoryShorter = (
          this.history
          && existingContext.history
          && existingContext.history.length < this.history.length
        )
        const lsWriteOld = this.lastLSWrite > existingContext.lastLSWrite

        if (lsWriteOld || (lsHistoryShorter && lastReadAfterClear)) {
          return
        }

        this.lastMessageTimestamp = existingContext.lastMessageTimestamp || 0
        this.lastUserMessageTimestamp = existingContext.lastUserMessageTimestamp || 0
        this.lastUserResponse = existingContext.lastUserResponse || ''
        this.totalMessages = existingContext.totalMessages || 0
        this.lastDomCodeSent = existingContext.lastDomCodeSent || startingCode || 'START'
        this.state = existingContext.state || {}
        this.eventQueue = existingContext.eventQueue || []
        this.unread = existingContext.unread || 0
        this.history = existingContext.history || []

        MessageHandler.updateGlobalUnread()
        onRehydrate(this.history)
      },
      4000
    )
    this.updateLS()

  }

  updateLS() {
    if (this.lastLSRead < ls.get('__LAST_CLEAR_TIME')) return

    this.lastLSWrite = Date.now()
    this.chatLS.set('lastLSWrite', this.lastLSWrite)
    this.chatLS.set('lastDomCodeSent', this.lastDomCodeSent)
    this.chatLS.set('state', this.state)
    this.chatLS.set('eventQueue', this.eventQueue)
    this.chatLS.set('history', this.history)
    this.chatLS.set('unread', this.unread)
    this.chatLS.set('lastMessageTimestamp', this.lastMessageTimestamp)
    this.chatLS.set('lastUserMessageTimestamp', this.lastUserMessageTimestamp)
    this.chatLS.set('lastUserResponse', this.lastUserResponse)
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
    if (!document.hidden) {
      this.unread = 0
      this.updateLS()
      MessageHandler.updateGlobalUnread()
    }
  }
}


function createGlobalCtx(lsKey, init) {
  const ctx = ls.get(lsKey) || init

  setRunInterval(() => {
    Object.assign(ctx, ls.get(lsKey) || init)
  }, 4000)


  return new Proxy(ctx, {
    set(obj, key, val) {
      obj[key] = val
      ls.set(lsKey, JSON.stringify(ctx))

      return val
    },
    get(obj, key) {
      return obj[key]
    }
  })
}



export class MessageHandler {
  static chats = {}
  static globalCtx = createGlobalCtx('__CHAT_GLOBAL_CONTEXT', {
    premium: 1
  })

  static visibilityCtx = createGlobalCtx('__CHAT_VISIBILITY_CONTEXT', {})

  static provider = provider

  constructor(profile, messages, startingCode='START') {
    this.chatName = profile.name
    this.messages = messages
    this.registeredChatWindows = []

    MessageHandler.visibilityCtx[this.chatName] = MessageHandler.visibilityCtx[this.chatName] ?? profile.startingVisibility

    this.ctx = new ChatContext(this.chatName, startingCode, (history) =>
      this.registeredChatWindows.forEach(chatWindow => {
        if (chatWindow.state.history.length !== history.length) {
          chatWindow.setState({ history })
        }
      })
    )
    this.ctx.global = MessageHandler.globalCtx
    this.ctx.visibility = MessageHandler.visibilityCtx
    this.isActive = false
    this.provider = MessageHandler.provider

    if (messages.__contract) {
      this.connected = new Promise((res, rej) => {
        this.provider.onConnect(async addr => {
          try {
            this.contract = await messages.__contract(this.provider)
            MessageHandler.globalCtx.isConnected = !!addr
            MessageHandler.globalCtx.connectedAddr = addr
            res()
          } catch (e) {
            console.log(profile.name)
            rej(e)
          }
        })
      })
    }

    sexyCLIT.register(this.chatName, '', this.ctx, messageText =>
      this.updateHistory({
        helpMessage: true,
        messageText
      })
    )

    setRunInterval(async () => {
      const currentNode = this.getMessageToSend(this.ctx.lastDomCodeSent)
      const eventNode = currentNode.event
      if (eventNode) {
        const node = this.messages[eventNode]
        const event = await node.check(
          this.ctx.lastUserResponse,
          this.ctx,
          this.contract,
          this.provider
        )


        if (event) {
          if (node.postEvent) await node.postEvent(
            this.ctx.lastUserResponse,
            this.ctx,
            this.contract,
            this.provider
          )
          this.ctx.addToEventQueue(event)
        }
      }
    }, 1000)

    setRunInterval(this.handleQueue.bind(this), 100)

    MessageHandler.chats[this.chatName] = this
  }

  static totalUnreads() {
    return Object.keys(MessageHandler.chats).reduce((sum, k) => sum + MessageHandler.chats[k].ctx.unread, 0)
  }

  static updateGlobalUnread() {
    const unreadCount = MessageHandler.totalUnreads()
    const originalTitle = document.title
    const cleanedTitle = originalTitle.replace(/\((\d+)\)/, '').trim()
    if (unreadCount > 0) {
      document.title = `(${unreadCount}) ${cleanedTitle}`
      $.id('favicon').href = $.id('favicon').href.replace('kiss.png', 'kissNotification.png')

    } else {
      document.title = cleanedTitle
      $.id('favicon').href = $.id('favicon').href.replace('kissNotification.png', 'kiss.png')
    }
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


    if (nextMessage.timestamp > now) return

    const { messageCode, userResponse, isFollowup } = this.ctx.eventQueue.shift()
    const messageToSend = this.getMessageToSend(messageCode, userResponse, isFollowup)

    this.ctx.lastUserResponse = userResponse || this.ctx.lastUserResponse

    if (messageToSend.event && MessageHandler.globalCtx.isConnected) {
      await this.connected
      await this.messages[messageToSend.event]?.preEvent?.(userResponse, this.ctx, this.contract, this.provider)
    }

    const followUp = await this.sendFollowup(messageToSend, userResponse)


    if (followUp) {
      const messageToSend = this.getMessageToSend(followUp.messageCode, userResponse, true)
      const estimatedMessageText = await this.sendMessage(messageToSend, userResponse)
      const [typingWait, wait] = this.waitTimes(estimatedMessageText, 250, followUp.waitMs)

      this.ctx.addToEventQueue({
        userResponse,
        messageCode: followUp.messageCode,
        timestamp: now + wait,
        startTyping: now + typingWait,
        isFollowup: true
      })
    }

    if (messageToSend.followUp || messageToSend.responseHandler) {
      this.ctx.lastDomCodeSent = messageCode
    }


    if (messageToSend.ignoreSend) return

    this.updateHistory({
      messageCode: messageCode,
      messageText: await this.sendMessage(messageToSend, userResponse),
      from: this.chatName,
      helpMessage: messageToSend.helpMessage
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

    if (!this.isActive || document.hidden) {
      this.ctx.unread += 1
      MessageHandler.updateGlobalUnread()
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
    const is$sexy = userResponse.match(/^(\$sexy\s)/) || userResponse === '$sexy'

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

  waitTimes(estimatedMessageText, typingWaitFactor, waitMs=1000) {
    const domTypingSpeed = this.messages.TYPING_SPEED

    if (clitLS.get('devIgnoreWait')) {
      return [25, 25]
    } else {
      const typingWait = waitMs + random(typingWaitFactor)
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

      if (estimatedMessageText) setTimeout(() => {
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

setTimeout(() => {
  MessageHandler.updateGlobalUnread()
}, 2000)

window.MessageHandler = MessageHandler


document.onvisibilitychange = () => {
  if (!document.hidden) MessageHandler.updateGlobalUnread()
}


