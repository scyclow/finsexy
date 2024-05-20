import { isYes, isNo, isGreeting, isMean, MessageHandler, createEvent } from '../state/conversationRunner.js'
import {getUserData, genderSwitch } from '../state/profile.js'

/*
  T: I'm sick oflarge corporate entities...


*/



const fu = (messageCode, waitMs=2000) => ({ messageCode, waitMs })

export const RonaMerchProfile = {
  name: 'RonaMerch',
  startingVisibility: 'offline',
  domType: 'Service',
  order: 12,
  age: '.co',
  distance: 'Drop Shipping',
  maxPhotos: 5,
  voice: {
    lang: 'en-US',
    name: 'Eddy'
  },
  description: ``,
  gender: 'Retail',
  display: 'nb',
  testimonials: [

  ]
}






const RonaMerchMessages = {
  TYPING_SPEED: 1,

  START: {
    responseHandler: `hello`,
    ignoreSend: true,
    ignoreType: true
  },

  async __contract(provider) {
    return await provider.domContract('RonaMerch')

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
    messageText: 'TODO',
    responseHandler: (ur) => {},

  },
}



export const RonaMerchChat = new MessageHandler(RonaMerchProfile, RonaMerchMessages)


