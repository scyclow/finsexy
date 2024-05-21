
import { isYes, isNo, isGreeting, isMean, MessageHandler, createEvent } from '../state/conversationRunner.js'
import {getUserData, genderSwitch } from '../state/profile.js'



const fu = (messageCode, waitMs=2000) => ({ messageCode, waitMs })

export const HotlineBabeProfile = {
  name: 'HotlineBabe1900',
  startingVisibility: 'hidden',
  domType: 'Anonymous',
  order: 16,
  age: '???',
  distance: 18482257281,
  maxPhotos: 1,
  voice: {
    lang: 'en-US',
    name: 'Ralph'
  },
  description: `You know you want to...`,
  gender: 'Unknown',
  display: 'nb',
  testimonials: [
    {
      review: `It's so fun! I have no idea who I'm talking to! The anonymity makes it so hot!`
    },
    {
      review: `i like glory hole 🥵`
    },
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


