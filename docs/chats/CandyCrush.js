/*

"I'm trouble"

"I like three things: tattoos, sex, and money"

time to make yourself useful, baby 😉

You know what i really want....


we _could_ go out on a nice date. you could spoil me, wine me, dine me...
or you can just give me the money, and i can spoil wine, and dine myself


I'd really like to

hmm, let's see. what will i buy with this


total tease
  " that's all you get for 0.01 ETH"

https://twitter.com/goddexvicious

*/



import { isYes, isNo, isGreeting, isMatch, MessageHandler, diatribe, createEvent } from '../state/conversationRunner.js'
import {getUserData, genderSwitch } from '../state/profile.js'

const fu = (messageCode, waitMs=2000) => ({ messageCode, waitMs })


export const CandyCrushProfile = {
  name: 'CandyCrush',
  startingVisibility: 'offline',
  domType: 'Soft',
  order: 10,
  age: 19,
  distance: 4,
  maxPhotos: 3,
  voice: {
    lang: 'en-GB',
    name: 'Sandy'
  },
  description: `I only like three things: Money, Sex, and Tattoos`,
  gender: 'Female',
  display: 'f',
  testimonials: [
    {
      review: `I'm an executive at a large, well-known corporation in the cryptocurrency & blockchain sector. Every day I make decisions regarding millions of dollars in assets, which involves a copius amount of number crunching, optimizations, and cost minimization. After a long hard day at work I want nothing more than to be absolutely goddamn reckless and to blow all my fucking money without having to make a single decision. This is where CandyCrush really shines. She tells me what to do, she takes all of my money, and I regularly blow my load all over my computer. Simple as that.`
    },
    {
      review: `How do I get rid of this stupid NFT? I don't want it any more! This should be illegal!`
    },
    {
      review: `FINSEXY IS A BRAINWASHING MIND-CONTROL APP DESIGNED TO HIJACK YOUR MIND AND STEAL ALL YOUR MONEY. DO NOT USE IT`
    },
    {
      review: `I just send CandyCrush 0.069 ETH!`
    },
  ]
}




const CandyCrushMessages = {
  TYPING_SPEED: 1,

  START: {
    responseHandler: `hello`,
    ignoreSend: true,
    ignoreType: true
  },

  async __contract(provider) {
    return await provider.domContract('CandyCrush')

  },

  __precheck(userResponse, ctx, contract, provider, isFollowup) {
    if (!provider.isWeb3()) {
      return {
        messageText: `This FinDom is offline`,
        responseHandler: (ur, ctx) => ctx.lastDomCodeSent,
        helpMessage: true,
        ignoreType: true
      }
    }
  },


  hello: {
    messageText: `Do you like tattoos? 😈`,
    responseHandler: 'send'
  },

  send: {
    messageText: (ur, ctx) => `Send me ${ctx.global.premium * 0.01} ETH and I'll give you a tattoo`,
    responseHandler: 'horny',
    event: 'sendEvent'
  },

  horny: {
    messageText: `It'll look great on you! Tattoos make me soooo horny`,
    event: 'sendEvent'
  },

  sendEvent: createEvent( 0.01, {
    primary: fu('likeIt', 7000),
  }),

  likeIt: {
    messageText: `Just gave your wallet a new tattoo. Do you like it? 🤭`,
    responseHandler: () => {
      MessageHandler.visibilityCtx.CandyCrush = 'offline'

      return 'offline'
    }
  },

  offline: {
    messageText: `This FinDom is offline`,
    responseHandler: 'offline',
    helpMessage: true,
    ignoreType: true
  }

}

export const CandyCrushChat = new MessageHandler(CandyCrushProfile, CandyCrushMessages)
