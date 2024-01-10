import {ls} from '../$.js'
import { provider, toETH } from '../eth.js'
import {MessageHandler} from './conversationRunner.js'


export const clitLS = {
  get() {
    return ls.get('__CLIT_STATE') || {}
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

export const sexyCLIT = {
  nameToAddress: {},
  nameToContext: {},
  nameToCallback: {},


  register(name, addr, ctx, cb) {
    this.nameToAddress[name] = addr
    this.nameToContext[name] = ctx
    this.nameToCallback[name] = cb
  },

  run(name, input, ctx) {
    const [sexy, command, ...args] = input.trim().split(' ')
    const cb = name
      ? this.nameToCallback[name]
      : noop
    if (sexy !== '$sexy') return cb('Something went wrong...')

    if (command === 'help') {
      return cb(`
        <h3>$sexy Command Line Interface Tool (CLIT) commands</h3>

        <h5 style="margin-top: 2em; margin-bottom: 0.25em">Display Help</h5>
        <p><code>$sexy help</code></p>

        <h5 style="margin-top: 2em; margin-bottom: 0.25em">Send ETH</h5>
        <p><code>$sexy send [recipient name] [amount in ETH]</code></p>

        <h5 style="margin-top: 2em; margin-bottom: 0.25em">Input Premium Code</h5>
        <p><code>$sexy premium [premium-code]</code> </p>

        <h5 style="margin-top: 2em; margin-bottom: 0.25em">Purchase VIP Membership</h5>
        <p><code>$sexy vip buy</code></p>
      `)
    }
    else if (command === 'send') {
      setTimeout(async () => {
        const [recipient, amount] = args
        if (!MessageHandler.chats[recipient]) {
          return cb(`Invalid recipient: ${recipient}`)
        } else if (isNaN(Number(amount))) {
          return cb(`Invalid amount: ${amount}`)
        }

        try {
          const tx = await provider.signer.sendTransaction({
            to: MessageHandler.chats[recipient].contract.address,
            value: toETH(amount)
          })
          // console.log(tx)
        } catch (e) {
          console.log(e)
          cb(`ERROR: ${e.message || JSON.stringify(e)}`)
        }
      }, 1000)
      return cb(`Sending ${args[0]} ${args[1]} ETH...`)
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

          <h5 style="margin-top: 2em; margin-bottom: 0.25em">Toggle Debug Mode</h5>
          <p><code>$sexy dev debug [bool]</code></p>

          <h5 style="margin-top: 2em; margin-bottom: 0.25em">Toggle Message Wait Time</h5>
          <p><code>$sexy dev ignoreWait [bool]</code></p>

          <h5 style="margin-top: 2em; margin-bottom: 0.25em">GoTo Conversation Node</h5>
          <p><code>$sexy dev node [dom name] [node name]</code></p>

          <h5 style="margin-top: 2em; margin-bottom: 0.25em">Clear Chat History</h5>
          <p><code>$sexy dev clear</code></p>

        `)
      } else if (args[0] === 'debug') {
        const debugVal = args[1] === 'true' ? true : false

        if (debugVal) {
          document.body.classList.add('__debug')
        } else {
          document.body.classList.remove('__debug')
        }

        clitLS.set('devMode', debugVal)


        return cb(`__DEBUG__: ${debugVal}`)
      } else if (args[0] === 'ignorewait' || args[0] === 'ignoreWait') {

        const waitVal = args[1] === 'true' ? true : false

        clitLS.set('devIgnoreWait', waitVal)
        return cb(`Ignore Wait: ${waitVal}`)

      } else if (args[0] === 'clear') {
        localStorage.removeItem('__CHAT_CONTEXT')
        window.location.reload()

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
        <p>Invalid command: <code>${command}</code></p>
        <p>Run <code>$sexy help</code> for more options</p>
      `)
    }
  }
}

window.sexyCLIT = sexyCLIT

