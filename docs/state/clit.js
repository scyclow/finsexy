import {ls} from '../$.js'
import { provider, toETH, txValue, ethVal, ZERO_ADDR } from '../eth.js'
import {MessageHandler} from './conversationRunner.js'
import {analyticsLS} from './analytics.js'
import {getUserData} from './profile.js'
import {VinceChat} from './all.js'
import {tributeLS} from '../state/tributes.js'

import {createSource, MAX_VOLUME} from '../fns/audio.js'



export const clitLS = {
  get(k) {
    const s = ls.get('__CLIT_STATE') || {}
    return k ? s[k] : s
  },

  set(k, v) {
    const props = this.get() || {}
    props[k] = v
    ls.set('__CLIT_STATE', JSON.stringify(props))
  },
}


// provider.onConnect(async addr => {

//   await

// })





if (clitLS.get().devMode) {
  setTimeout(() => document.body.classList.add('__debug'))
}


export const clearChat = (ignoreReload=false) => {
  analyticsLS.set('firstEntry', Date.now())
  localStorage.removeItem('__CHAT_CONTEXT')
  localStorage.removeItem('__CHAT_GLOBAL_CONTEXT')
  localStorage.removeItem('__CHAT_VISIBILITY_CONTEXT')
  ls.set('__LAST_CLEAR_TIME', Date.now())
  tributeLS.resetAllTributeAdjustment().then(() => {
    if (!ignoreReload) window.location.reload()
  })
}


let downcasedChats

export const sexyCLIT = {
  nameToAddress: {},
  nameToContext: {},
  nameToCallback: {},


  register(name, addr, ctx, cb) {
    this.nameToAddress[name] = addr
    this.nameToContext[name] = ctx
    this.nameToCallback[name] = (...args) => setTimeout(() => cb(...args), 200)
  },

  run(name, input, ctx) {
    const [sexy, command, ...args] = input.trim().split(' ')
    const cb = name
      ? this.nameToCallback[name]
      : noop
    if (sexy !== '$sexy') return cb('Something went wrong...')

    if (command?.[0] === '[' || args[0]?.[0] === '[' || args[1]?.[0] === '[' || args[2]?.[0] === '[') {
      return cb(`Invalid $sexy argument`)
    }


    downcasedChats = Object.keys(MessageHandler.chats).reduce((a, c) => {
      a[c.toLowerCase()] = MessageHandler.chats[c]
      return a
    }, {})

    if (command === 'help' || !command) {
      return cb(`
        <h3>$sexy Command Line Interface Tool (CLIT) Commands</h3>

        <h5 style="margin-top: 1.5em">Display Help</h5>
        <p><code>$sexy help</code></p>

        <h5 style="margin-top: 1.5em">Connect Wallet</h5>
        <p><code>$sexy connect</code></p>

        <h5 style="margin-top: 1.5em">Send ETH to Findom</h5>
        <p><code>$sexy send [recipient name] [amount in ETH]</code></p>

        <h5 style="margin-top: 1.5em">Burn ETH</h5>
        <p><code>$sexy burn [amount in ETH]</code></p>

        <h5 style="margin-top: 1.5em">Input Premium Code</h5>
        <p><code>$sexy premium [premium code]</code> </p>

        <h5 style="margin-top: 1.5em">Purchase VIP Membership</h5>
        <p><code>$sexy vip buy [gold membership boolean]</code></p>

        <h5 style="margin-top: 1.5em">Spend SexyCredits <em style="font-size: 0.8em; margin-left: 1em">(1 SexyCredit = 0.01 ETH)</em></h5>
        <p><code>$sexy vip spend [findom name] [# of credits]</code></p>

        <h5 style="margin-top: 1.5em">Get SexyCredit Balance</h5>
        <p><code>$sexy vip balance [tokenId]</code></p>

        <h5 style="margin-top: 1.5em">List All Owned VIP Membership Token IDs</h5>
        <p><code>$sexy vip list</code></p>

        <h5 style="margin-top: 1.5em">Select Active VIP Membership Token</h5>
        <p><code>$sexy vip select [tokenId]</code></p>

        <h5 style="margin-top: 1.5em">Transfer SexyCredits to Other VIP Token</h5>
        <p><code>$sexy vip transfer [recipient tokenId] [amount]</code></p>

        <h5 style="margin-top: 1.5em">Approve Operator For SexyCredits</h5>
        <p><code>$sexy vip approve [operator address]</code></p>

        <h5 style="margin-top: 1.5em">Dev Commands (INTERNAL)</h5>
        <p><code>$sexy dev [command]</code></p>
      `)
    }
    else if (command === 'connect') {
      if (!provider.isWeb3()) return cb('Please revisit FinSexy in a Web3-enabled browser')

      this.connect(cb, cb)
    }
    else if (command === 'send') {
      if (!provider.isWeb3()) return cb('Please revisit FinSexy in a Web3-enabled browser')
      this.send(args[0], args[1], cb, cb, () => cb('Send Successful'))
    }

    else if (command === 'burn') {
      if (!provider.isWeb3()) return cb('Please revisit FinSexy in a Web3-enabled browser')
      this.burn(args[0], ctx, cb, cb, () => cb('Burn Successful'))
    }

    else if (command === 'vip') {
      if (!provider.isWeb3()) return cb('Please revisit FinSexy in a Web3-enabled browser')
      if (args[0] === 'buy') {
        const isGold = args[1] === 'true' ? true : false
        this.vipBuy(isGold, cb, cb, () => cb(`VIP ${isGold ? 'Gold ' : ''}Membership Purchased`))

      } else if (args[0] === 'spend') {
        this.vipSpend(args[1], args[2], cb, cb, () => `${args[2]} SexyCredits Sent to ${args[1]}`)

      } else if (args[0] === 'balance') {
        this.vipBalance(Number(args[1]))
          .then(b => {
            cb(`SexyCredit Balance: ${b}`)
          })
          .catch(e => cb(e.message))
      } else if (args[0] === 'list') {
        this.vipList()
          .then(([list, active]) => {
            if (list.length === 0) {
              cb(`No Sexy VIP Membership Tokens`)
            }
            cb(list.map(l => l == active ? `${l} (active)` : l).join(', '))
          })
          .catch(e => cb(e.message))

      } else if (args[0] === 'select') {
        this.vipSelect(args[1])
          .then(() => cb(`Active VIP Membership ID: ${args[1]}`))
          .catch(e => cb(e.message))

      } else if (args[0] === 'transfer') {
        this.vipTransfer(Number(args[1]), Number(args[2]), cb, cb, () => cb(`Transfer Complete`))

      } else if (args[0] === 'approve') {
        this.vipApprove(args[1], cb, cb, () => cb(`${args[1]} Approved`))

      } else {
        cb('Invalid VIP command')
      }
    }

    else if (command === 'premium') {
      const code = args[0]

      if (code === 'NothingToLose') {
        MessageHandler.globalCtx.premium = 1
        clitLS.set('paymentsFaked', true)
        return cb(`All prayments faked`)

      } else if (code === 'SingleSissySub') {
        return this.applyPremium(1, cb, cb, () => cb('All Prices: 1x'))


      } else if (code === 'DoubleTheFun') {
        return this.applyPremium(2, cb, cb, () => cb('All Prices: 2x'))


      } else if (code === 'ThirdTimesTheCharm') {
        return this.applyPremium(3, cb, cb, () => cb('All Prices: 3x'))

      } else if (!code || ['list', 'ls'].includes(code.toLowerCase())) {
        return cb(`
          <p>SingleSissySub: 1x All Prices</p>
          <p>DoubleTheFun: 2x All Prices</p>
          <p>ThirdTimesTheCharm: 3x All Prices</p>
        `)

      } else {
        return cb(`Invalid premium code: "${code}"`)
      }

    }
    // else if (command === 'help') {
    //   return cb('... If you still require customer assistance, please text the following number during business hours: ‪(848) 225-7281‬. Mobile SMS messaging rates may apply.')

    // }
    else if (command === 'dev') {
      const [devCommand, devArgs] = args
      if (args[0] === 'help') {
        return cb(`
          <h3>$sexy Command Line Interface Tool (CLIT) Dev Commands</h3>

          <h5 style="margin-top: 1.5em">Toggle Debug Mode</h5>
          <p><code>$sexy dev debug [bool]</code></p>

          <h5 style="margin-top: 1.5em">Toggle Message Wait Time</h5>
          <p><code>$sexy dev ignoreWait [bool]</code></p>

          <h5 style="margin-top: 1.5em">List All Conversation Nodes</h5>
          <p><code>$sexy dev list [dom name]</code></p>

          <h5 style="margin-top: 1.5em">View Conversation Node String</h5>
          <p><code>$sexy dev view [dom name] [node name]</code></p>

          <h5 style="margin-top: 1.5em">GoTo Conversation Node</h5>
          <p><code>$sexy dev node [dom name] [node name]</code></p>

          <h5 style="margin-top: 1.5em">Modify Dom State</h5>
          <p><code>$sexy dev state [dom name] [state key] [state value]</code></p>

          <h5 style="margin-top: 1.5em">Modify Global Dom State</h5>
          <p><code>$sexy dev global [state key] [state value]</code></p>

          <h5 style="margin-top: 1.5em">Clear All Chat History</h5>
          <p><code>$sexy dev clear</code></p>

          <h5 style="margin-top: 1.5em">Test Send Experience</h5>
          <p><code>$sexy dev testSend</code></p>

        `)
      } else if (devCommand === 'debug') {
        const debugVal = devArgs[0] === undefined
          ? !clitLS.get('devMode')
          : devArgs[0] === 'true' ? true : false


        clitLS.set('devMode', debugVal)


        return cb(`__DEBUG__: ${debugVal}`)
      } else if (devCommand === 'ignorewait' || devCommand === 'ignoreWait') {

        const waitVal = devArgs[0] === 'true' ? true : false

        clitLS.set('devIgnoreWait', waitVal)
        return cb(`Ignore Wait: ${waitVal}`)

      } else if (devCommand === 'clear') {
        clearChat()

      } else if (devCommand === 'view') {
        const [_, _chatName, node] = args
        const chatName = _chatName.toLowerCase()
        if (!(chatName in downcasedChats)) return cb(`Invalid chat name: ${_chatName}`)

        cb(stringifyNode(downcasedChats[chatName].messages[node]))

      } else if (devCommand === 'list') {
        const [_, _chatName] = args
        const chatName = _chatName.toLowerCase()


        if (!(chatName in downcasedChats)) return cb(`Invalid chat name: ${_chatName}`)

        const nodeNames = Object.keys(downcasedChats[chatName].messages).filter(n => !['START', 'TYPING_SPEED', '__contract', '__precheck'].includes(n))

        cb(nodeNames.map(n => `${n}<br/>`).join(''))

      } else if (devCommand === 'node') {
        const [_, _chatName, node] = args

        if (!node) cb(`Cannot move to empty node for ${_chatName}`)
        const chatName = _chatName.toLowerCase()

        if (!(chatName in downcasedChats)) return cb(`Invalid chat name: ${_chatName}`)

        cb(`Moving to node ${node} for ${_chatName}`)

        downcasedChats[chatName].queueEvent(node, 1000)

      } else if (devCommand === 'state') {
        const [_, _chatName, key, val] = args
        const chatName = _chatName.toLowerCase()
        const dom = downcasedChats[chatName]

        if (!dom) return cb(`Invalid chat name: ${_chatName}`)

        try {
          dom.ctx.state[key] = JSON.parse(val)
          cb(`Set ${_chatName} ctx state -> ${key}: ${val}`)

        } catch (e) {
          cb(e)
        }

      } else if (devCommand === 'global') {
        const [_, key, val] = args

        try {
          MessageHandler.globalCtx[key] = JSON.parse(val)
          cb(`Set global ctx state -> ${key}: ${val}`)

        } catch (e) {
          cb(e)
        }
      } else if (devCommand === 'testSend') {
        this.testSend()
      } else {
        return cb(`
          <p>Invalid dev command: <code>${devCommand}</code></p>
          <p>Run <code>$sexy dev help</code> for more options</p>
        `)
      }
    }
    else {
      return cb(`
        <p>Invalid command: <code>${command || 'undefined'}</code></p>
        <p>Run <code>$sexy help</code> for more options</p>
      `)
    }
  },


  async connect(cb, errorCb) {
    const alreadyConnectedAddr = await provider.isConnected()
    if (alreadyConnectedAddr) return cb(`Already connected as ${alreadyConnectedAddr}`)
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' }, [])
      const address = await provider.isConnected()
      provider.connect()
      cb(`Connected as ${address}`)

    } catch (error) {
      console.error(error)
      errorCb(`Error connecting wallet: ${error?.message}` || `Error connecting wallet`)
    }
  },

  async getActiveVIP() {
    const connectedAddr = await provider.isConnected()

    if (!connectedAddr) return null
    const { SexyVIP } = await provider.sexyContracts()
    const vipBalance = bnToN(await SexyVIP.balanceOf(connectedAddr))

    if (bnToN(vipBalance) === 0) return null
    const totalSupply = bnToN(await SexyVIP.totalSupply())

    const cachedVIP = clitLS.get('activeVIP')

    const exists = cachedVIP != null ? await SexyVIP.exists(cachedVIP) : false

    if (exists && cachedVIP || cachedVIP === '0') {
      const isOwner = await SexyVIP.ownerOf(cachedVIP)
      if (isOwner) return cachedVIP
    }

    for (let id = 0; id < totalSupply; id++) {
      if (await SexyVIP.ownerOf(id) === connectedAddr) {
        clitLS.set('activeVIP', id)
        return id
      }
    }

    return null
  },

  testSend() {
    const sources = []
    document.body.classList.add('preOrgasm')
    precumSound(sources)

    setTimeout(() => {
      document.body.classList.remove('preOrgasm')
      document.documentElement.classList.add('orgasm')
      orgasmSound(sources, 1.25)
      orgasmVibrate()
    }, 3000)
  },

  vipBuy(isGold, cb, errorCb, successCb=noop) {
    document.documentElement.classList.remove('orgasm')
    setTimeout(async () => {
      const sources = []
      try {
        document.body.classList.add('preOrgasm')
        precumSound(sources)

        const { SexyMinter } = await provider.sexyContracts()

        const standardPrice = ethVal(await SexyMinter.mintPrice())
        const goldPrice = ethVal(await SexyMinter.goldPrice())

        const name = getUserData('name') || 'PAYPIG_NAME'
        const price = isGold ? txValue(goldPrice) : txValue(standardPrice)



        const tx = await SexyMinter.mint(name, isGold, price)
        await tx.wait()
        document.body.classList.remove('preOrgasm')
        document.documentElement.classList.add('orgasm')

        successCb(tx)
        orgasmSound(sources, 1.25)
        orgasmVibrate()

      } catch (e) {
        console.log(e)
        document.body.classList.remove('preOrgasm')
        cancelSound(sources)

        errorCb(`ERROR: ${e?.data?.message || e.message || JSON.stringify(e)}`)
      }
    }, 300)
    return cb(`VIP ${isGold ? 'Gold ' : ''}Membership Pending...`)
  },

  vipSpend(domName, amount, cb, errorCb, successCb) {
    document.documentElement.classList.remove('orgasm')
    const recipient = domName.toLowerCase()

    const chat = Object.values(MessageHandler.chats).find(c => c.chatName.toLowerCase() === recipient)
    const domAddr = chat.contract.address
    const sendHandler = chat.messages?.__sendHandler

    setTimeout(async () => {
      const sources = []
      try {
        document.body.classList.add('preOrgasm')

        if (!clitLS.get('devIgnoreWait')) {
          precumSound(sources)
        }

        const presendTributeAmount = await tributeLS.getAdjustedTribute(chat.chatName)

        const { SexyVIP } = await provider.sexyContracts()
        const activeTokenId = await this.getActiveVIP()

        if (activeTokenId == null) return errorCb('Active VIP Token Unset')

        const tx = await SexyVIP.spendCredit(activeTokenId, domAddr, amount)
        await tx.wait()
        document.body.classList.remove('preOrgasm')
        successCb(tx)

        MessageHandler.globalCtx.hasPaid = true

        if (!clitLS.get('devIgnoreWait')) {
          document.documentElement.classList.add('orgasm')
          orgasmSound(sources, 1.25)
          orgasmVibrate()
        }

        if (sendHandler && !chat.ctx.pendingEvent) {
          const postsendTributeAmount = await tributeLS.getAdjustedTribute(chat.chatName)
          const action = await sendHandler(chat.ctx, fromWei(presendTributeAmount), fromWei(postsendTributeAmount), provider)

          if (action) chat.queueEvent(action.messageCode, action.waitMs)
        }

        if (!VinceChat.ctx.history.length && !VinceChat.ctx.eventQueue.length) {
          VinceChat.queueEvent('hello', 1)
          ls.set('TRIBUTE_EVENT_1', true)
        }


      } catch (e) {
        console.log(e)
        document.body.classList.remove('preOrgasm')
        cancelSound(sources)

        errorCb(`ERROR: ${e?.data?.message || e.message || JSON.stringify(e)}`)
      }
    })

    cb(`Sending ${domName} ${amount} SexyCredits...`)
  },

  async vipBalance(tokenId) {
    const connectedAddr = await provider.isConnected()
    const { SexyVIP } = await provider.sexyContracts()
    const totalSupply = bnToN(await SexyVIP.totalSupply())

    if (Number(tokenId) >= totalSupply) {
      throw new Error(`Invalid VIP Token ID: ${tokenId}`)
    }

    return await SexyVIP.creditBalance(tokenId)
  },

  async vipList() {
    const connectedAddr = await provider.isConnected()
    const { SexyVIP } = await provider.sexyContracts()
    const totalSupply = bnToN(await SexyVIP.totalSupply())

    const ids = []
    for (let id = 0; id < totalSupply; id++) {
      if (await SexyVIP.ownerOf(id) === connectedAddr) {
        ids.push(id)
      }
    }

    return [ids, await this.getActiveVIP()]
  },

  async vipSelect(id) {
    const connectedAddr = await provider.isConnected()
    const { SexyVIP } = await provider.sexyContracts()
    const totalSupply = bnToN(await SexyVIP.totalSupply())

    if (Number(id) >= totalSupply) {
      throw new Error(`Invalid VIP Membership #${id}`)
    }

    const owner = await SexyVIP.ownerOf(id)

    if (connectedAddr === owner) {
      clitLS.set('activeVIP', id)
    } else {
      throw new Error(`You do not own VIP Membership #${id}`)
    }
  },

  vipTransfer(recipientId, amount, cb, errorCb, successCb) {
    setTimeout(async () => {
      try {
        const { SexyVIP } = await provider.sexyContracts()
        const activeTokenId = await this.getActiveVIP()

        if (activeTokenId == null) return errorCb('Active VIP Token Unset')

        const tx = await SexyVIP.transferCredits(activeTokenId, recipientId, amount)
        await tx.wait()
        successCb(tx)

      } catch (e) {
        errorCb(`ERROR: ${e?.data?.message || e.message || JSON.stringify(e)}`)
      }
    })

    cb('SexyCredit Transfer Pending...')
  },

  vipApprove(operatorAddress, cb, errorCb, successCb) {
    setTimeout(async () => {
      try {
        const { SexyVIP } = await provider.sexyContracts()
        const activeTokenId = await this.getActiveVIP()

        if (activeTokenId == null) return errorCb('Active VIP Token Unset')

        const tx = await SexyVIP.approveCredits(activeTokenId, operatorAddress)
        await tx.wait()
        successCb(tx)

      } catch (e) {
        errorCb(`ERROR: ${e?.data?.message || e.message || JSON.stringify(e)}`)
      }
    })

    cb('SexyCredit Approval Pending...')
  },

  async getPremium(addr) {
    const { SexyRouter } = await provider.sexyContracts()
    return bnToN(await SexyRouter.premium(addr))
  },

  applyPremium(premiumAmount, cb, errorCb, successCb) {
    clitLS.set('paymentsFaked', false)

    setTimeout(async () => {
      try {
        const { SexyRouter } = await provider.sexyContracts()
        const tx = await SexyRouter.applyPremium(premiumAmount)
        await tx.wait()

        MessageHandler.globalCtx.premium = premiumAmount
        successCb(tx)

      } catch (e) {
        errorCb(`ERROR: ${e?.data?.message || e.message || JSON.stringify(e)}`)
      }
    })

    cb('Applying Sexy premium...')
  },

  send(_recipient, amount, cb, errorCb, successCb=noop) {
    document.documentElement.classList.remove('orgasm')
    const recipient = _recipient.toLowerCase()

    const chat = Object.values(MessageHandler.chats).find(c => c.chatName.toLowerCase() === recipient)

    if (!chat) {
      return cb(`Invalid recipient: ${recipient}`)
    } else if (isNaN(Number(amount))) {
      return cb(`Invalid amount: ${amount}`)
    }

    const addr = chat.contract.address
    const sendHandler = chat.messages?.__sendHandler
    setTimeout(async () => {
      const sources = []
      try {
        document.body.classList.add('preOrgasm')

        if (!clitLS.get('devIgnoreWait')) {
          precumSound(sources)
        }

        const presendTributeAmount = await tributeLS.getAdjustedTribute(chat.chatName)

        if (clitLS.get('paymentsFaked')) {
          await new Promise(res => setTimeout(res, 1000))
          const fakedKey = `__${addr}_fakedPayments`
          const fakedPayments = clitLS.get(fakedKey) || 0
          clitLS.set(fakedKey, fakedPayments + Number(amount))
          document.body.classList.remove('preOrgasm')
          successCb({})
        } else {
          const tx = await provider.signer.sendTransaction({
            to: addr,
            value: toETH(amount)
          })
          await tx.wait()
          document.body.classList.remove('preOrgasm')
          successCb(tx)
        }

        MessageHandler.globalCtx.hasPaid = true

        if (!VinceChat.ctx.history.length && !VinceChat.ctx.eventQueue.length) {
          VinceChat.queueEvent('hello', 1)
          ls.set('TRIBUTE_EVENT_1', true)
        }

        if (!clitLS.get('devIgnoreWait')) {
          document.documentElement.classList.add('orgasm')
          orgasmSound(sources, 1.25)
        }

        if (sendHandler && !chat.ctx.pendingEvent) {
          const postsendTributeAmount = await tributeLS.getAdjustedTribute(chat.chatName)
          const action = await sendHandler(chat.ctx, fromWei(presendTributeAmount), fromWei(postsendTributeAmount), provider)

          if (action) chat.queueEvent(action.messageCode, action.waitMs)
        }

      } catch (e) {
        console.log(e)
        document.body.classList.remove('preOrgasm')
        cancelSound(sources)

        errorCb(`ERROR: ${e?.data?.message || e.message || JSON.stringify(e)}`)
      }
    }, 300)
    return cb(`Sending ${recipient} ${amount} ETH...`)
  },

  burn(amount, ctx, cb, errorCb, successCb=noop) {
    document.documentElement.classList.remove('burn')

    setTimeout(async () => {
      try {
        document.body.classList.add('preOrgasm')
        const tx = await provider.signer.sendTransaction({
          to: ZERO_ADDR,
          value: toETH(amount)
        })
        await tx.wait()
        ctx.state.totalBurnt = ctx.state.totalBurnt ? Number(ctx.state.totalBurnt) + Number(amount) : Number(amount)
        document.body.classList.remove('preOrgasm')
        document.documentElement.classList.add('burn')
      } catch (e) {
        console.log(e)
        document.body.classList.remove('preOrgasm')

        errorCb(`ERROR: ${e.message || JSON.stringify(e)}`)
      }
    }, 300)
    return cb(`Burning ${amount} ETH...`)
  },


  setResponseSpeedModifier(modifier) {
    clitLS.set('responseModifier', modifier)
  },


}

function precumSound(sources) {
  sources[0] = createSource('sine')
  sources[1] = createSource('sine')
  sources[2] = createSource('sine')
  sources[3] = createSource('sine')
  sources[4] = createSource('sine')
  sources[5] = createSource('sine')
  sources[6] = createSource('sine')
  sources[7] = createSource('sine')
  sources[8] = createSource('sine')

  sources.forEach(s => s.smoothFreq(1, 0.1))

  sources[0].smoothFreq(110 * 1.25, 0.1)
  sources[1].smoothFreq(220 * 1.25, 0.1)
  sources[2].smoothFreq(220 * 1.25 - 0.25, 0.1)

  sources[0].smoothGain(MAX_VOLUME, 3)
  sources[1].smoothGain(MAX_VOLUME, 3)
  sources[2].smoothGain(MAX_VOLUME, 3)
}

function orgasmSound(sources, base) {
  sources[3].smoothGain(MAX_VOLUME/2, 0.2)
  sources[4].smoothGain(MAX_VOLUME/2, 0.2)
  sources[5].smoothGain(MAX_VOLUME/2, 0.2)
  sources[6].smoothGain(MAX_VOLUME/2, 0.2)
  sources[7].smoothGain(MAX_VOLUME/2, 0.2)
  sources[8].smoothGain(MAX_VOLUME/2, 0.2)

  setTimeout(() => {
    sources[0].smoothFreq(110 * base, 0.5)
    sources[1].smoothFreq(110 * base - 2, 0.5)
    sources[2].smoothFreq(440 * base, 0.5)
    sources[3].smoothFreq(550 * base, 0.5)
    sources[4].smoothFreq(660 * base, 0.5)
    sources[5].smoothFreq(880 * base, 0.5)
    sources[6].smoothFreq((440 * base)-2, 0.5)
    sources[7].smoothFreq((550 * base)-2, 0.5)
    sources[8].smoothFreq(220 * base, 0.5)
  }, 200)


  setTimeout(() => {
    sources.forEach(s => s.smoothGain(0.0000001, 7))
  }, 1000)


  setTimeout(() => {
    sources.forEach(s => s.smoothGain(0.0000001, 0.5))
  }, 30000)

  setTimeout(() => {
    sources.forEach(s => s.stop())
  }, 40000)
}


function cancelSound(sources) {
  sources.forEach(s => s.smoothGain(0.0000001, 0.5))
  setTimeout(() => {
    sources.forEach(s => s.stop())
  }, 5000)
}

function orgasmVibrate() {
  if (window.navigator) {
    window.navigator?.vibrate?.(50)

    setTimeout(() => {
      window.navigator?.vibrate?.(6000)
      setTimeout(() => {
        window.navigator?.vibrate?.(2000)

        setTimeout(() => {
          window.navigator?.vibrate?.(1000)
        }, 3000)
      }, 6500)
    }, 60)
  }
}


function stringifyNode(node) {
  return JSON.stringify({
    ...node,
    messageText: stringifyNodeComponent(node.messageText),
    responseHandler: stringifyNodeComponent(node.responseHandler),
    followUp: stringifyNodeComponent(node.followUp),
  })
}

function stringifyNodeComponent(c) {
  if (c instanceof Function) return c.toString()
  else return JSON.stringify(c)
}

window.sexyCLIT = sexyCLIT

