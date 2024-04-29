import {ls} from '../$.js'
import { provider, toETH, ZERO_ADDR } from '../eth.js'
import {MessageHandler} from './conversationRunner.js'


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




if (clitLS.get().devMode) {
  setTimeout(() => document.body.classList.add('__debug'))
}


export const clearChat = (ignoreReload=false) => {
  localStorage.removeItem('__CHAT_CONTEXT')
  localStorage.removeItem('__CHAT_GLOBAL_CONTEXT')
  ls.set('__LAST_CLEAR_TIME', Date.now())
  if (!ignoreReload) window.location.reload()
}

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

    if (command === 'help' || !command) {
      return cb(`
        <h3>$sexy Command Line Interface Tool (CLIT) commands</h3>

        <h5 style="margin-top: 1.5em">Display Help</h5>
        <p><code>$sexy help</code></p>

        <h5 style="margin-top: 1.5em">Connect Wallet</h5>
        <p><code>$sexy connect</code></p>

        <h5 style="margin-top: 1.5em">Send ETH</h5>
        <p><code>$sexy send [recipient name] [amount in ETH]</code></p>

        <h5 style="margin-top: 1.5em">Burn ETH</h5>
        <p><code>$sexy burn [amount in ETH]</code></p>

        <h5 style="margin-top: 1.5em">Input Premium Code</h5>
        <p><code>$sexy premium [premium-code]</code> </p>

        <h5 style="margin-top: 1.5em">Purchase VIP Membership</h5>
        <p><code>$sexy vip buy</code></p>
      `)
    }
    else if (command === 'connect') {
      this.connect(cb, cb)
    }
    else if (command === 'send') {
      this.send(args[0], args[1], cb, cb)
    }

    else if (command === 'burn') {
      this.burn(args[0], ctx, cb, cb)
    }

    else if (command === 'premium') {
      const code = args[0]

      if (code === 'SingleSissySub') {
        MessageHandler.globalCtx.premium = 1
        return cb(`All prices: 1x`)

      } else if (code === 'DoubleTheFun') {
        MessageHandler.globalCtx.premium = 2
        return cb(`All prices: 2x`)

      } else if (code === 'ThirdTimesTheCharm') {
        MessageHandler.globalCtx.premium = 3
        return cb(`All prices: 3x`)

      } else if (!code || ['list', 'ls'].includes(code.toLowerCase())) {
        return cb(`
          <p>SingleSissySub: 1x all prices</p>
          <p>DoubleTheFun: 2x all prices</p>
          <p>ThirdTimesTheCharm: 3x all prices</p>
        `)

      } else {
        return cb(`Invalid premium code: "${code}"`)
      }

    }
    // else if (command === 'help') {
    //   return cb('... If you still require customer assistance, please text the following number during business hours: ‪(848) 225-7281‬. Mobile SMS messaging rates may apply.')

    // }
    else if (command === 'dev') {
      if (args[0] === 'help') {
        return cb(`
          <h3>$sexy Command Line Interface Tool (CLIT) Dev commands</h3>

          <h5 style="margin-top: 1.5em">Toggle Debug Mode</h5>
          <p><code>$sexy dev debug [bool]</code></p>

          <h5 style="margin-top: 1.5em">Toggle Message Wait Time</h5>
          <p><code>$sexy dev ignoreWait [bool]</code></p>

          <h5 style="margin-top: 1.5em">List All Conversation Nodes</h5>
          <p><code>$sexy dev list [dom name]</code></p>

          <h5 style="margin-top: 1.5em">GoTo Conversation Node</h5>
          <p><code>$sexy dev node [dom name] [node name]</code></p>

          <h5 style="margin-top: 1.5em">Clear Chat History</h5>
          <p><code>$sexy dev clear</code></p>

        `)
      } else if (args[0] === 'debug') {
        const debugVal = args[1] === undefined
          ? !clitLS.get('devMode')
          : args[1] === 'true' ? true : false


        clitLS.set('devMode', debugVal)


        return cb(`__DEBUG__: ${debugVal}`)
      } else if (args[0] === 'ignorewait' || args[0] === 'ignoreWait') {

        const waitVal = args[1] === 'true' ? true : false

        clitLS.set('devIgnoreWait', waitVal)
        return cb(`Ignore Wait: ${waitVal}`)

      } else if (args[0] === 'clear') {
        clearChat()

        // return cb(`Clearing`)

      } else if (args[0] === 'list') {
        const [_, chatName] = args

        const nodeNames = Object.keys(MessageHandler.chats[chatName].messages).filter(n => !['START', 'TYPING_SPEED', '__contract', '__precheck'].includes(n))

        cb(nodeNames.map(n => `${n}<br/>`).join(''))


        // return cb(`Clearing`)
      } else if (args[0] === 'node') {
        const [_, chatName, node] = args

        if (!(chatName in MessageHandler.chats)) return cb(`Invalid chat name: ${chatName}`)

        cb(`Moving to node ${node} for ${chatName}`)

        MessageHandler.chats[chatName].queueEvent(node, 1000)

      } else {
        return cb(`
          <p>Invalid dev command: <code>${args[0]}</code></p>
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

  send(recipient, amount, cb, errorCb, successCb=noop) {
    document.documentElement.classList.remove('orgasm')

    setTimeout(async () => {
      if (!MessageHandler.chats[recipient]) {
        return cb(`Invalid recipient: ${recipient}`)
      } else if (isNaN(Number(amount))) {
        return cb(`Invalid amount: ${amount}`)
      }

      try {
        document.body.classList.add('preOrgasm')
        const tx = await provider.signer.sendTransaction({
          to: MessageHandler.chats[recipient].contract.address,
          value: toETH(amount)
        })
        await tx.wait()
        document.body.classList.remove('preOrgasm')
        successCb(tx)
        if (!clitLS.get('devIgnoreWait')) document.documentElement.classList.add('orgasm')
      } catch (e) {
        console.log(e)
        document.body.classList.remove('preOrgasm')

        errorCb(`ERROR: ${e.message || JSON.stringify(e)}`)
      }
    }, 300)
    return cb(`Sending ${recipient} ${amount} ETH...`)
  },

  burn(amount, ctx, cb, errorCb) {
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
  }
}

window.sexyCLIT = sexyCLIT

