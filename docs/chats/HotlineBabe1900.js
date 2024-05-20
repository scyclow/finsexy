
import { isYes, isNo, isGreeting, isMean, MessageHandler, createEvent } from '../state/conversationRunner.js'
import {getUserData, genderSwitch } from '../state/profile.js'

/*

      - DMs you after you buy VIP
        - if message without a vip: `This Findom is only available to VIP members`
        - congratulates you on your purchase
        - "ooo, and I see you're gold, too. Very nice 😉"
        - let me know if you have any questions. i'm here for you 24/7
        - "I'm sorry, I don't understand. Are you trying to:
          Send to a findom
          learn more about finsexy
          seek technical support
          speak to a representative
        "


*/


const fu = (messageCode, waitMs=2000) => ({ messageCode, waitMs })

export const HotlineBabeProfile = {
  name: 'HotlineBabe1900',
  startingVisibility: 'hidden',
  domType: 'Service',
  order: 16,
  age: '???',
  distance: 5345,
  maxPhotos: 1,
  voice: {
    lang: 'en-US',
    name: 'Ralph'
  },
  description: ``,
  gender: 'Unknown',
  display: 'nb',
  testimonials: [

  ]
}






const HotlineBabeMessages = {
  TYPING_SPEED: 1,

  START: {
    responseHandler: `hello`,
    ignoreSend: true,
    ignoreType: true
  },

  async __contract(provider) {
    return await provider.domContract('HotlineBabe1900')

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
    messageText: 'Hey baby, are you looking for a good time?',
    responseHandler: (ur) => isYes(ur) ? 'messageYes' : 'messageNo',
  },

  messageYes: {
    messageText: 'Text me here: <a href="sms:+18482257281&body=Hello">1.848.225.7281</a>',
    responseHandler: 'end'
  },

  messageNo: {
    messageText: 'Text me here when you are: <a href="sms:+18482257281&body=Hello">1.848.225.7281</a>',
    responseHandler: 'end'
  },

  end: {
    messageText: ''
  }
}



export const HotlineBabeChat = new MessageHandler(HotlineBabeProfile, HotlineBabeMessages)


