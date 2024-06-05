import { getUserData } from './profile.js'
import { sexyCLIT, clitLS } from './clit.js'
import {ls, $} from '../$.js'
import {provider} from '../eth.js'
import {ProfileStats} from './all.js'
import {tabs} from './tabs.js'
import {voices, say} from '../fns/voices.js'
import {tributeLS} from './tributes.js'



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
  'better',
  'improving',
  'sexy'
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
  'yah',
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
  'absolutely',
  'very well',
  'you got it',
  'sure thing',
  'hell yes',
  'hell yeah',
  'fuck yeah',
  'fuck yes',
  'fine',
  'true',
  'i do',
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
  `i will`,
  `i want to`,
  `i want it`,
  `i was`,
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
  `i can not`,
  `i wont`,
  `i will not`,
  `i wasnt`,
  `i am not`,
  `wrong`,
  `incorrect`,
  `not bad`,
  `does not`,
  `doesnt`,
  'neither',
  'none'
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
  'depression',
  'anxious',
  'anxiety',
  'anhedonic',
  'anhedonia',
  'nauseous',
  'nausea',
  'meh'
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

export function isMatch(txt, phrases, strict=false) {
  const cleaned = responseParser(txt)
  const multipleWordPhrases = phrases.filter(phrase => phrase.split(' ').length > 1)
  const singleWordPhrases = phrases.filter(phrase => phrase.split(' ').length === 1)

  if (strict) {
    return (
      multipleWordPhrases.some(phrase => cleaned == phrase) ||
      singleWordPhrases.some(phrase => cleaned.split(' ') == phrase)
    )
  }
  return (
    multipleWordPhrases.some(phrase => cleaned.includes(phrase)) ||
    singleWordPhrases.some(phrase => cleaned.split(' ').includes(phrase))
  )
}

export const isNegate = txt => responseParser(txt).split(' ').some(word => ['no', 'not', 'dont'].includes(word))
export const isGreeting = txt => isMatch(txt, greetings)
export const isYes = txt => isMatch(txt, yeses) && !isNegate(txt)
export const isNo = txt => isMatch(txt, noes)
export const isPositive = txt => isMatch(txt, negativeNegatives) || isMatch(txt, positives) && !isNegate(txt)
export const isNegative = txt => isMatch(txt, negatives)
export const isMean = txt => isMatch(txt, meanResponses)


export const diatribe = (baseCode, messages, endAction, waitMs=2000, dynamicWait=false) => {
  return messages.reduce((nodes, messageText, i) => {
    const messageLength = messages[i].toString().length
    const waitAddition = Math.min(
      waitMs/2,
      dynamicWait ? messageLength  * 12.5 : 0,
    )

    const action = i === messages.length - 1
      ? endAction
      : {
          followUp: {
            messageCode: `${baseCode}${i+1}`,
            waitMs: waitMs + waitAddition
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
export function createEvent(threshold, responses={}, waitMs=600000) {
  return {
    async preEvent(ur, ctx, contract, provider) {

      ctx.state.nodeResponses = ctx.state.nodeResponses || {}
      ctx.state.lastResponded = Date.now()
      ctx.state.nodeResponses[ctx.lastDomCodeSent] = true

      ctx.state.startingBalance = (await tributeLS.getAdjustedTribute(ctx.chatName)).toString()

    },

    async check(ur, ctx, contract, provider) {
      const addr = await provider.isConnected()

      const amount = ctx.global.premium * threshold //2
      const alreadyPaid = provider.BN(ctx.state.startingBalance) // 1


      if (contract && addr) {
        const t = await tributeLS.getAdjustedTribute(ctx.chatName) // 1.5

        if (t.gte(toETH(amount))) {
          return responses.primary
        } else if (Date.now() - ctx.state.lastResponded > waitMs && !ctx.state?.nodeResponses?.[ctx.lastDomCodeSent]) {
          return responses.wait
        } else if (t.gt(alreadyPaid)) {
          return responses.notEnough
        }
      }
    },

    async postEvent(ur, ctx, contract, provider) {
      const addr = await provider.isConnected()
      ctx.state.startingBalance = (await tributeLS.getAdjustedTribute(ctx.chatName)).toString()
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
        this.pendingEvent = existingContext.pendingEvent || false

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
    this.chatLS.set('pendingEvent', this.pendingEvent)

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


function createLSCtx(lsKey, init) {
  const ctx = ls.get(lsKey) || init

  setRunInterval(() => {
    Object.assign(ctx, ls.get(lsKey) || init)
  }, 4000)


  return new Proxy(ctx, {
    set(obj, key, val) {
      obj[key] = val
      ls.set(lsKey, JSON.stringify(ctx))

      return Reflect.set(...arguments)
    },
    get(obj, key) {
      return obj[key]
    }
  })
}




let _notificationAudio
setTimeout(() => {
  if (Number(clitLS.get('notification'))) {
    _notificationAudio = new Audio(`/assets/notification${Number(clitLS.get('notification'))}.mp3`)
  }
})




export class MessageHandler {
  static chats = {}
  static globalCtx = createLSCtx('__CHAT_GLOBAL_CONTEXT', {
    premium: 1,
    isEthBrowser: false
  })

  static visibilityCtx = createLSCtx('__CHAT_VISIBILITY_CONTEXT', {})

  static provider = provider

  constructor(profile, messages, startingCode='START') {
    this.chatName = profile.name
    this.messages = messages
    this.registeredChatWindows = []
    this.followUpPending = {}

    MessageHandler.visibilityCtx[this.chatName] = MessageHandler.visibilityCtx[this.chatName] ?? profile.startingVisibility

    this.voice = voices.then(vs => {
      if (profile.voice) {
        return vs.find(v => v.voiceURI.includes(profile.voice.name) && v.lang === profile.voice.lang) || vs[0]
      } else {
        return vs[0]
      }
    })


    this.ctx = new ChatContext(this.chatName, startingCode, (history) =>
      this.registeredChatWindows.forEach(chatWindow => {
        if (chatWindow.state.history.length !== history.length) {
          chatWindow.setState({ history })
        }
      })
    )
    this.ctx.visibility = MessageHandler.visibilityCtx
    this.isActive = false
    this.ctx.global = MessageHandler.globalCtx
    this.provider = MessageHandler.provider
    this.ctx.global.isEthBrowser = this.provider.isEthBrowser

    if (messages.__contract) {
      this.connected = new Promise((res, rej) => {
        this.provider.onConnect(async addr => {
          try {
            this.contract = await messages.__contract(this.provider)
            res()
          } catch (e) {
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
      this.ctx.pendingEvent = !!eventNode
      if (eventNode) {
        const node = this.messages[eventNode]
        try {
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

            const now = Date.now()
            const {messageCode, waitMs, ignoreType} = event
            const messageToSend = this.getMessageToSend(messageCode, '', true)

            const estimatedMessageText = await this.sendMessage(messageToSend, '')
            const [typingWait, wait] = this.waitTimes(estimatedMessageText, 250, waitMs)

            this.ctx.addToEventQueue({
              userResponse: '',
              messageCode,
              timestamp: now + wait,
              startTyping: now + typingWait,
              isFollowup: true,
              referrer: messageCode,
              ignoreType,
            })
          }
        } catch (e) {
          console.error(e)
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
    const url = new URL(window.location)
    const existingActiveChat = url.searchParams.get('activeChat')
    const originalTitle = document.title

    const cleanedTitle =
      existingActiveChat
        ? `FinSexy | ${existingActiveChat} Chat`
        : originalTitle.replace(/\((\d+)\)/, '').trim()



    if (unreadCount > 0) {
      document.title = `(${unreadCount}) ${cleanedTitle}`
      $.id('favicon').href = $.id('favicon').href.replace('kiss.png', 'kissNotification.png')

    } else {
      document.title = cleanedTitle
      $.id('favicon').href = $.id('favicon').href.replace('kissNotification.png', 'kiss.png')
    }
  }

  async handleQueue() {
    const [isTabActive, isTabLastActive] = [tabs.isActive(), tabs.isLastActive()]
    if (!(isTabActive || isTabLastActive)) return
    if (!this.ctx.eventQueue.length) return

    this.ctx.updateLS()

    const nextMessage = this.ctx.eventQueue[0]
    const now = Date.now()

    if (
      nextMessage.startTyping <= now
      && !nextMessage.ignoreType
    ) {
      this.registeredChatWindows.forEach(chatWindow => {
        chatWindow.setState({ isTyping: true })
      })
    }

    if (nextMessage.timestamp > now || this.delayed) return
    const evt = this.ctx.eventQueue.shift()

    const { messageCode, userResponse, isFollowup, referrer } = evt


    const ur = this.reducedUserResponse || userResponse || this.ctx.lastUserResponse

    this.ctx.lastUserResponse = ur

    const messageToSend = this.getMessageToSend(messageCode, ur, isFollowup)


    if (messageToSend.event) {
      try {
        await this.messages[messageToSend.event]?.preEvent?.(ur, this.ctx, this.contract, this.provider)
      } catch (e) {
        console.error(e)
      }
    }

    if (!this.followUpPending[messageCode]) {
      const followUp = await this.sendFollowUp(messageToSend, ur, messageCode)
    }

    if (referrer) {
      this.followUpPending[referrer] = false
    }

    if (messageToSend.followUp || messageToSend.responseHandler) {
      this.ctx.lastDomCodeSent = messageCode
    }


    if (messageToSend.ignoreSend) return

    this.updateHistory({
      messageCode: messageCode,
      messageText: await this.sendMessage(messageToSend, ur),
      from: this.chatName,
      helpMessage: messageToSend.helpMessage,
      debugInfo: {
        updaterTabId: tabs.tabId,
        updaterIsTabActive: isTabActive,
        updaterIsTabLastActive: isTabLastActive,
        ts: Date.now(),
        referrerDebugInfo: messageToSend.referrerDebugInfo
      }
    })

    this.reducedUserResponse = ''
  }

  setResponseDelay(ms) {
    clearTimeout(this.delayTimeout)
    this.delayed = true
    this.delayTimeout = setTimeout(() => this.delayed = false, ms)
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

    const txt = typeof msg.messageText === 'string'
      ? msg.messageText
      : await msg.messageText(userResponse, this.ctx, this.contract, this.provider)

    return txt || ''
  }

  async getFollowUpMessage(msg, userResponse) {
    if (!msg.followUp) return

    if (typeof msg.followUp === 'string') {
      console.log(`INCORRECT FOLLOWUP FORMAT: ${msg.followUp}`)
      return { messageCode: msg.followUp, waitMs: 2000}
    }
    return msg?.followUp instanceof Function
      ? msg.followUp(userResponse, this.ctx, this.contract, this.provider)
      : msg.followUp
  }

  async sendFollowUp(messageToSend, userResponse, referrer) {
    this.followUpPending[referrer] = true
    const now = Date.now()
    const followUp = await this.getFollowUpMessage(messageToSend, userResponse)

    if (typeof followUp === 'string') console.error(`Incorrect followUp object: ${followUp}`)

    if (followUp) {
      const messageToSend = this.getMessageToSend(followUp.messageCode, userResponse, true)
      const estimatedMessageText = await this.sendMessage(messageToSend, userResponse)
      const [typingWait, wait] = this.waitTimes(estimatedMessageText, 250, followUp.waitMs)
      const [isTabActive, isTabLastActive] = [tabs.isActive(), tabs.isLastActive()]

      this.ctx.addToEventQueue({
        userResponse,
        messageCode: followUp.messageCode,
        timestamp: now + wait,
        startTyping: now + typingWait,
        isFollowup: true,
        ignoreType: messageToSend.ignoreType,
        referrer,
        referrerDebugInfo: {
          updaterTabId: tabs.tabId,
          updaterIsTabActive: isTabActive,
          updaterIsTabLastActive: isTabLastActive,
          ts: now
        }
      })
    }
  }

  async findNextNode(msg, userResponse) {
    if (msg.responseHandler) {
      return typeof msg.responseHandler === 'string'
        ? msg.responseHandler
        : msg.responseHandler(userResponse, this.ctx, this.contract, this.provider)

    } else if (msg.followUp && this.ctx.eventQueue.length === 0) {
      const {messageCode} = await this.getFollowUpMessage(msg, userResponse)
      return messageCode
    }
  }

  addChatWindow(chatWindow) {
    if (chatWindow) {
      this.registeredChatWindows.push(chatWindow)
      chatWindow.registerEventHandler('submit', message => {
        this.reducedUserResponse = [this.reducedUserResponse, message].filter(x => x).join(' ')
        this.toDom(message)
      })
      chatWindow.registerEventHandler('type', ms => this.setResponseDelay(ms))
      chatWindow.setState({ history: this.ctx.history })
    }
  }

  updateHistory({ from, messageText, messageCode, helpMessage, debugInfo }) {
    if (!messageText) return

    if (!this.isActive || document.hidden) {
      this.ctx.unread += 1
      MessageHandler.updateGlobalUnread()
      if (clitLS.get('pushNotifications')) {
        try {
          new Notification(`${from} says:`, {icon: '/assets/kiss.png', body: messageText})
        } catch (e) {
          console.error(e)
        }
      }
    } else if (from !== 'you') {
      if (_notificationAudio) {
        setTimeout(() => {
          try {
            _notificationAudio.play()

          } catch (e) {
            console.log(e)
          }
        }, 300)
      }

      if (clitLS.get('a11y')) {
        setTimeout(async () => {
          try {
            const cleanedText = messageText.replaceAll(/<\/?[^>]+(>|$)/g, '')
            const primaryVoice = await this.voice
            say(primaryVoice, cleanedText)
          } catch (e) {}
        }, 300)
      }


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
      timestamp: Date.now(),
      debugInfo
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

    if (lastMessage) {
      const codeToSend = await this.findNextNode(lastMessage, userResponse)
      this.next(userResponse, codeToSend)

      // if (lastMessage.responseHandler) {

      // }
      // else if (lastMessage.followUp && this.ctx.eventQueue.length === 0) {
      //   this.followUpPending[this.ctx.lastDomCodeSent]
      //   this.sendFollowUp({messageCode: codeToSend}, userResponse)
      // } else {
      // }


    }

    // if (lastMessage && !lastMessage.responseHandler && lastMessage.followUp) {

    // }

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

    return _waitTimes(estimatedMessageText, typingWaitFactor, waitMs, domTypingSpeed)
  }

  async next(userResponse, codeToSend) {
    const messageToSend = this.getMessageToSend(codeToSend, userResponse)

    if (messageToSend) {
      const estimatedMessageText = await this.sendMessage(messageToSend, userResponse)
      const [typingWait, wait] = this.waitTimes(estimatedMessageText, 750)

      if (estimatedMessageText) setTimeout(() => {
        this.registeredChatWindows.forEach(chatWindow => {
          if (this.ctx.eventQueue.length && !messageToSend.ignoreType) {
            chatWindow.setState({ isTyping: true })
          }
        })
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

provider.onConnect(async addr => {
  MessageHandler.globalCtx.isConnected = !!addr
  MessageHandler.globalCtx.connectedAddr = addr
  MessageHandler.globalCtx.ens = await provider.formatAddr(addr, false)
  MessageHandler.globalCtx.premium = await sexyCLIT.getPremium(addr)
}, e => console.error(`connection error: ${JSON.stringify(e)}, ${e}, ${e?.message}`))

setTimeout(() => {
  MessageHandler.updateGlobalUnread()
}, 2000)

window.MessageHandler = MessageHandler


tabs.onChange(hidden => {
  if (!hidden) MessageHandler.updateGlobalUnread()
})



function _waitTimes(estimatedMessageText, typingWaitFactor, waitMs, domTypingSpeed) {
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
    const modifier = Number(clitLS.get('responseModifier') || 1)
    return [Math.max(25, typingWait*modifier), Math.max(25, wait*modifier)]
  }
}