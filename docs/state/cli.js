

const cliLS = {
  get() {
    return ls.get('__CLI_STATE') || {}
  },

  set(k, v) {
    const props = this.get() || {}
    props[k] = v
    ls.set('__CLI_STATE', JSON.stringify(props))
  },
}




if (cliLS.get().devMode) {
  setTimeout(() => document.body.classList.add('__debug'))
}

const sexyCLI = {

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
    const cb = this.nameToCallback[name]
    if (sexy !== '$sexy') return cb('Something went wrong...')

    if (command === 'help') {
      return cb(`
        <h3>$sexy CLI commands</h3>

        <h5 style="margin-top: 2em; margin-bottom: 0.25em">Display Help</h5>
        <p><code>$sexy help</code></p>

        <h5 style="margin-top: 2em; margin-bottom: 0.25em">Send ETH</h5>
        <p><code>$sexy send [recipient name] [amount in ETH]</code></p>

        <h5 style="margin-top: 2em; margin-bottom: 0.25em">Purchase VIP Membership</h5>
        <p><code>$sexy vip buy</code></p>
      `)
    }
    else if (command === 'send') {
      setTimeout(() => {
        const [recipient, amount] = args
        if (!MessageHandler.chats[recipient]) {
          return cb(`Invalid recipient: ${recipient}`)
        } else if (isNaN(Number(amount))) {
          return cb(`Invalid amount: ${amount}`)
        }
        // TODO make this real
        MessageHandler.chats[recipient].ctx.state.totalPaid =
          (MessageHandler.chats[recipient].ctx.totalPaid || 0)
          + Number(amount)
      }, 2000)
      return cb(`Sending: ${JSON.stringify(args)}`)
    }
    else if (command === 'help') {
      return cb('... If you still require customer assistance, please text the following number during business hours: ‪(848) 225-7281‬. Mobile SMS messaging rates may apply.')
    } else if (command === 'dev') {
      if (args[0] === 'debug') {
        const debugVal = args[1] === 'true' ? true : false

        if (debugVal) {
          document.body.classList.add('__debug')
        } else {
          document.body.classList.remove('__debug')
        }

        cliLS.set('devMode', debugVal)


        return cb(`__DEBUG__: ${debugVal}`)
      } else if (args[0] === 'ignorewait') {

        const waitVal = args[1] === 'true' ? true : false

        cliLS.set('devIgnoreWait', waitVal)
        return cb(`Ignore Wait: ${waitVal}`)
      } else {
        console.log(args[0])
      }
    }
    return cb()
  }
}

