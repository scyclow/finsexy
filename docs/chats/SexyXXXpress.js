
/*
FDXXXpress -> SexyXXXpress

*/
import { isYes, isNo, isGreeting, isMatch, MessageHandler, diatribe, createEvent } from '../state/conversationRunner.js'
import {getUserData, genderSwitch, getAgeYears } from '../state/profile.js'
import {sexyCLIT} from '../state/clit.js'

const fu = (messageCode, waitMs=3000) => ({ messageCode, waitMs })


export const XXXProfile = {
  name: 'SexyXXXpress',
  startingVisibility: 'online',
  domType: 'Automated',
  order: 11,
  age: 11010,
  distance: 101,
  maxPhotos: 3,
  voice: {
    lang: 'en-US',
    name: 'Fred'
  },
  description: `FINANCIAL DOMINATION CONVENIENCE AT YOUR FINGERTIPS. `,
  gender: 'Binary',
  display: 'nb',
  testimonials: [
    {
      review: `It's so convenient!`
    },
    {
      review: `As someone who's constantly on the go, FinDom Express is a real life saver`
    },
    {
      review: `It gets me so hot knowing that there's really a live findom actually typing all of these messages 🤤`
    },
    {
      review: `I usually like to send until I absolutely hate myself and then chase it with scrolling social media until I'm completely numb. So SexyXXXpress really streamlines my workflow`
    },
    {
      review: `it's hard for me to remember the last time i had sex with anyone in person. it seems like these days all anyone wants is to have cybersex`
    },
    {
      review: `i can't believe i'm getting cucked by my goddamn computer`
    },
    {
      review: `FINSEXY IS A BRAINWASHING MIND-CONTROL APP DESIGNED TO HIJACK YOUR MIND AND STEAL ALL YOUR MONEY. DO NOT USE IT`
    },
    {
      review: `I just sent SexyXXXpress 0.069 ETH!`
    },
    {
      review: `i'm sick of my findom addiction. this isn't making me happy any more`
    },
    {
      review: `money is the pleasurecatalyst that shortcurcuits the feedbackloop where i can't enjoy it unless she's enjoying it and she's not enjoying it because i'm always busy asking her are you enjoying it? so then neither of us enjoy it but i'm the man so i have to be in charge and i like the moeny because it makes it all clear and quantitative so i can just sit back and enjoy my self`
    },
    {
      review: `fuck it, i give up! i feel like my computer has completely hollowed out my manhood. i can't even get hard any more unless i'm watching some other man fuck a woman on my computer screen. i'm just a beta voyeur cuck, so I might as well embrace it.`
    }
  ]
}


let FRESH_PROCESSING = false

const XXXMessages = {
  TYPING_SPEED: 1.3,

  START: {
    responseHandler: `hello`,
    ignoreSend: true,
    ignoreType: true
  },

  async __contract(provider) {
    return await provider.domContract('SexyXXXpress')

  },

  __precheck(userResponse, ctx, contract, provider) {

    if (!provider.isWeb3()) {
      return {
        messageText: `HELLO PLEASE VISIT <a href="/doms/SexyXXXpress" target="_blank">https://finsexy/doms/SexyXXXpress</a> IN A WEB3-ENABLED WEB BROWSER TO USE SexyXXXpress. THANK YOU`,
        responseHandler: (ur, ctx) => ctx.lastDomCodeSent,
      }
    }

    if (!ctx.global.isConnected) {
      return {
        messageText: `HELLO PLEASE CONNECT YOUR WALLET AND VISIT <a href="/doms/SexyXXXpress" target="_blank">https://finsexy/doms/SexyXXXpress</a> TO USE SexyXXXpress. THANK YOU`,
        responseHandler: (ur, ctx) => ctx.lastDomCodeSent,
      }
    }
  },


  hello: {
    messageText: async (ur, ctx, contract, provider) => {

      const { SexyXXXpressA, SexyXXXpressB, SexyXXXpressC} = await provider.domContracts()

      const aLeft = 200 - bnToN(await SexyXXXpressA.totalSupply())
      const bLeft = 100 - bnToN(await SexyXXXpressB.totalSupply())
      const cLeft = 50 - bnToN(await SexyXXXpressC.totalSupply())

      const price = ctx.global.premium * 1

      return `
        HELLO WELCOME TO SexyXXXpress PLEASE INPUT THE NUMERICAL CODE CORRESPONDING TO THE OPTION YOU WISH TO SELECT:
        <br><code style="margin-top: 0.25em">1. UNCONDITIONAL TRIBUTE</code>
        <br><code style="margin-top: 0.25em">2. PURCHASE "Sexy Picture [MODEL A]" -- 0.0${price} ETH or ${price} SexyCredit <br>(${aLeft > 0 ? `${aLeft} REMAINING` : 'SOLD OUT'})</code>
        <br><code style="margin-top: 0.25em">3. PURCHASE "Sexy Picture [MODEL B]" -- 0.0${price} ETH or ${price} SexyCredit <br>(${bLeft > 0 ? `${bLeft} REMAINING` : 'SOLD OUT'})</code>
        <br><code style="margin-top: 0.25em">4. PURCHASE "Sexy Picture [MODEL C]" -- 0.0${price} ETH or ${price} SexyCredit <br>(${cLeft > 0 ? `${cLeft} REMAINING` : 'SOLD OUT'})</code>
      `
    },
    responseHandler: (ur) => {
      if (ur.includes('1')) {
        return 'unconditional'
      } else if (ur.includes('2')) {
        return 'buyA'
      } else if (ur.includes('3')) {
        return 'buyB'
      } else if (ur.includes('4')) {
        return 'buyC'
      } else {
        return 'unsure'
      }
    }
  },

  unsure: {
    messageText: async (ur, ctx, contract, provider) => {
      const { SexyXXXpressA, SexyXXXpressB, SexyXXXpressC} = await provider.domContracts()

      const aLeft = 200 - bnToN(await SexyXXXpressA.totalSupply())
      const bLeft = 100 - bnToN(await SexyXXXpressB.totalSupply())
      const cLeft = 50 - bnToN(await SexyXXXpressC.totalSupply())

      const price = ctx.global.premium * 1

      return `
        INVALID CODE -- PLEASE INPUT THE NUMERICAL CODE CORRESPONDING TO THE OPTION YOU WISH TO SELECT:
        <br><code style="margin-top: 0.25em">1. UNCONDITIONAL TRIBUTE</code>
        <br><code style="margin-top: 0.25em">2. PURCHASE "Sexy Picture [MODEL A]" -- 0.0${price} ETH or ${price} SexyCredit <br>(${aLeft > 0 ? `${aLeft} REMAINING` : 'SOLD OUT'})</code>
        <br><code style="margin-top: 0.25em">3. PURCHASE "Sexy Picture [MODEL B]" -- 0.0${price} ETH or ${price} SexyCredit <br>(${bLeft > 0 ? `${bLeft} REMAINING` : 'SOLD OUT'})</code>
        <br><code style="margin-top: 0.25em">4. PURCHASE "Sexy Picture [MODEL C]" -- 0.0${price} ETH or ${price} SexyCredit <br>(${cLeft > 0 ? `${cLeft} REMAINING` : 'SOLD OUT'})</code>
      `
    },
    responseHandler: (ur) => {
      if (ur.includes('1')) {
        return 'unconditional'
      } else if (ur.includes('2')) {
        return 'buyA'
      } else if (ur.includes('3')) {
        return 'buyB'
      } else if (ur.includes('4')) {
        return 'buyC'
      } else {
        return 'unsure'
      }
    }
  },

  unconditional: {
    messageText: `UNCONDITIONAL TRIBUTE`,
    followUp: fu('unconditional2')
  },

  unconditional2: {
    messageText: `WOULD YOU LIKE TO MAKE UNCONDITIONAL TRIBUTE IN SexyCredits OR ETH?`,
    responseHandler: (ur) => {
      if (isMatch(ur, ['eth', 'ether', 'ethereum']) || isYes(ur)) return 'unconditionalETH'
      else if (isMatch(ur, ['sexy', 'credits', 'sexycredits', 'sexycredit', 'credit'])) return 'unconditionalCredits'
      else return 'unconditional2'
    }
  },

  unconditionalETH: {
    messageText: 'HOW MUCH ETH WOULD YOU LIKE TO TRIBUTE?',
    responseHandler: async (ur, ctx, contract, provider) => {
      ctx.state.error = ''
      try {
        const number = ur.match(/-?\d+(\.\d+)?/)
        if (number) {
          ctx.state.pending = true
          provider.signer.sendTransaction({
            to: contract.address,
            value: toETH(number[0])
          })
          .then(tx => tx.wait())
          .then(() => {
            ctx.state.pending = false
          })
          .catch(e => {
            ctx.state.error = e?.data?.message || e.message || JSON.stringify(e)
          })

        FRESH_PROCESSING = true
          return 'processing'
        }
        return 'hello'

      } catch (e) {
        ctx.state.error = e?.data?.message || e.message || JSON.stringify(e)
        return 'error'
      }
    }
  },

  unconditionalCredits: {
    messageText: 'HOW MANY SexyCredits WOULD YOU LIKE TO TRIBUTE?',
    responseHandler: async (ur, ctx, contract, provider) => {
      ctx.state.error = ''
      try {
        const { SexyVIP } = await provider.sexyContracts()
        const activeTokenId = await sexyCLIT.getActiveVIP()

        if (activeTokenId == null) return 'hello'

        const number = ur.match(/-?\d+(\.\d+)?/)
        if (number) {
          ctx.state.pending = true

          const amount = Math.round(Number(number[0]))
          SexyVIP
            .spendCredit(activeTokenId, contract.address, amount)
            .then(tx => tx.wait())
            .then(() => {
              ctx.state.pending = false
            })
            .catch(e => {
              ctx.state.error = e?.data?.message || e.message || JSON.stringify(e)
            })

          FRESH_PROCESSING = true
          return 'processing'
        }
        return 'hello'

      } catch (e) {
        ctx.state.error = e?.data?.message || e.message || JSON.stringify(e)
        return 'error'
      }
    }
  },

  buyA: {
    messageText: `PURCHASE "Sexy Picture [MODEL A]"`,
    followUp: fu('buyA2')
  },

  buyA2: {
    messageText: `WOULD YOU LIKE TO PAY WITH SexyCredit OR ETH?`,
    responseHandler: async (ur, ctx, contract, provider) => {
      ctx.state.error = ''
      try {
        const { SexyXXXpressA } = await provider.domContracts()

        if (isMatch(ur, ['eth', 'ether', 'ethereum']) || isYes(ur)) {
          ctx.state.pending = true
          provider.signer.sendTransaction({
            to: SexyXXXpressA.address,
            value: toETH(ctx.global.premium * 0.01)
          })
            .then(tx => tx.wait())
            .then(() => {
              ctx.state.pending = false
            })
            .catch(e => {
              ctx.state.error = e?.data?.message || e.message || JSON.stringify(e)
            })

          FRESH_PROCESSING = true
          return 'processing'
        }
        else if (isMatch(ur, ['sexy', 'credits', 'sexycredits', 'sexycredit', 'credit'])) {
          const { SexyVIP } = await provider.sexyContracts()
          const activeTokenId = await sexyCLIT.getActiveVIP()
          if (activeTokenId == null) return 'buyA2'

          SexyVIP
            .spendCredit(activeTokenId, SexyXXXpressA.address, ctx.global.premium)
            .then(tx => tx.wait())
            .then(() => {
              ctx.state.pending = false
            })
            .catch(e => {
              ctx.state.error = e?.data?.message || e.message || JSON.stringify(e)
            })

          FRESH_PROCESSING = true
          return 'processing'
        }
        else return 'buyA2'
      } catch (e) {
        ctx.state.error = e?.data?.message || e.message || JSON.stringify(e)
        return 'error'
      }
    }
  },

  buyB: {
    messageText: `PURCHASE "Sexy Picture [MODEL B]"`,
    followUp: fu('buyB2')
  },

  buyB2: {
    messageText: `WOULD YOU LIKE TO PAY WITH SexyCredit OR ETH?`,
    responseHandler: async (ur, ctx, contract, provider) => {
      ctx.state.error = ''
      try {
        const { SexyXXXpressB } = await provider.domContracts()

        if (isMatch(ur, ['eth', 'ether', 'ethereum']) || isYes(ur)) {
          ctx.state.pending = true
          provider.signer.sendTransaction({
            to: SexyXXXpressB.address,
            value: toETH(ctx.global.premium * 0.01)
          })
            .then(tx => tx.wait())
            .then(() => {
              ctx.state.pending = false
            })
            .catch(e => {
              ctx.state.error = e?.data?.message || e.message || JSON.stringify(e)
            })

          FRESH_PROCESSING = true
          return 'processing'
        }
        else if (isMatch(ur, ['sexy', 'credits', 'sexycredits', 'sexycredit', 'credit'])) {
          const { SexyVIP } = await provider.sexyContracts()
          const activeTokenId = await sexyCLIT.getActiveVIP()
          if (activeTokenId == null) return 'buyB2'

          SexyVIP
            .spendCredit(activeTokenId, SexyXXXpressB.address, ctx.global.premium)
            .then(tx => tx.wait())
            .then(() => {
              ctx.state.pending = false
            })
            .catch(e => {
              ctx.state.error = e?.data?.message || e.message || JSON.stringify(e)
            })

          FRESH_PROCESSING = true
          return 'processing'
        }
        else return 'buyB2'
      } catch (e) {
        ctx.state.error = e?.data?.message || e.message || JSON.stringify(e)
        return 'error'
      }
    }
  },

  buyC: {
    messageText: `PURCHASE "Sexy Picture [MODEL C]"`,
    followUp: fu('buyC2')
  },

  buyC2: {
    messageText: `WOULD YOU LIKE TO PAY WITH SexyCredit OR ETH?`,
    responseHandler: async (ur, ctx, contract, provider) => {
      ctx.state.error = ''
      try {
        const { SexyXXXpressC } = await provider.domContracts()

        if (isMatch(ur, ['eth', 'ether', 'ethereum']) || isYes(ur)) {
          ctx.state.pending = true
          provider.signer.sendTransaction({
            to: SexyXXXpressC.address,
            value: toETH(ctx.global.premium * 0.01)
          })
            .then(tx => tx.wait())
            .then(() => {
              ctx.state.pending = false
            })
            .catch(e => {
              ctx.state.error = e?.data?.message || e.message || JSON.stringify(e)
            })

          FRESH_PROCESSING = true
          return 'processing'
        }
        else if (isMatch(ur, ['sexy', 'credits', 'sexycredits', 'sexycredit', 'credit'])) {
          const { SexyVIP } = await provider.sexyContracts()
          const activeTokenId = await sexyCLIT.getActiveVIP()
          if (activeTokenId == null) return 'buyC2'

          SexyVIP
            .spendCredit(activeTokenId, SexyXXXpressC.address, ctx.global.premium)
            .then(tx => tx.wait())
            .then(() => {
              ctx.state.pending = false
            })
            .catch(e => {
              ctx.state.error = e?.data?.message || e.message || JSON.stringify(e)
            })

          FRESH_PROCESSING = true
          return 'processing'
        }
        else return 'buyC2'
      } catch (e) {
        ctx.state.error = e?.data?.message || e.message || JSON.stringify(e)
        return 'error'
      }
    }
  },

  processing: {
    messageText: 'PROCECSSING...',
    followUp: fu('processingNext', 3000)
  },
  processingNext: {
    messageText: '',
    followUp: (ur, ctx) => {
      if (!FRESH_PROCESSING) {
        return fu('thankYou')
      }
      else if (ctx.state.error) {
        FRESH_PROCESSING = false
        return fu('error', 100)
      }
      else if (ctx.state.pending) {
        FRESH_PROCESSING = false
        return fu('processing', 3000)
      }
      else {
        FRESH_PROCESSING = false
        return fu('transactionComplete', 3000)
      }
    }
  },

  transactionComplete: {
    messageText: `TRANSACTION COMPLETE`,
    followUp: fu('thankYou'),
  },

  thankYou: {
    messageText: `THANK YOU`,
    responseHandler: 'hello'
  },

  error: {
    messageText: (ur, ctx) => `ERROR: ${ctx.state.error}`,
    responseHandler: 'hello'
  }
}

export const XXXChat = new MessageHandler(XXXProfile, XXXMessages)
