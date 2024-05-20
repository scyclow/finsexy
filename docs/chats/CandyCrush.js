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
  domType: 'Sugar Baby',
  order: 10,
  age: 19,
  distance: 4,
  maxPhotos: 3,
  voice: {
    lang: 'en-GB',
    name: 'Sandy'
  },
  description: `I'm trouble`,
  gender: 'Female',
  display: 'f',
  testimonials: [
    {
      review: `I'm an executive at a large, well-known corporation in the cryptocurrency & blockchain sector. Every day I make decisions regarding millions of dollars in assets, which involves a copius amount of number crunching, optimizations, and cost minimization. After a long hard day at work I want nothing more than to be absolutely goddamn reckless and to blow all my fucking money without having to make a single decision. This is where CandyCrush really shines. She tells me what to do, she takes all of my money, and I regularly blow my load all over my computer. Simple as that.`
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
    // if (userResponse && isMean(userResponse)) {
    //   return {
    //     messageText: ``,
    //     responseHandler: (ur, ctx) => ctx.lastDomCodeSent
    //   }
    // }
  },


  hello: {
    messageText: `Do you like tattoos? 😈`,
    responseHandler: 'hello'
  },
}

export const CandyCrushChat = new MessageHandler(CandyCrushProfile, CandyCrushMessages)
