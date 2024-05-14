

import { isYes, isNo, isGreeting, isMatch, MessageHandler, diatribe, createEvent } from '../state/conversationRunner.js'
import {getUserData, genderSwitch, getAgeYears } from '../state/profile.js'

const fu = (messageCode, waitMs=3000) => ({ messageCode, waitMs })


export const MindyProfile = {
  name: 'MindyRouge',
  startingVisibility: 'online',
  domType: 'Superstar',
  order: 14,
  age: Math.floor(getAgeYears(648273600000)),
  distance: 1,
  maxPhotos: 1,
  description: `I'm difficult`,
  gender: 'Female',
  display: 'f',
  testimonials: [
    {
      review: `Mindy is my favorite professional wrestler! She's so hot and sexy 🌹`
    },
  ]
}




const MindyMessages = {
  TYPING_SPEED: 1,

  START: {
    responseHandler: `hello`,
    ignoreSend: true,
    ignoreType: true
  },

  async __contract(provider) {
    return await provider.domContract('MindyRouge')

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
    messageText: `Let's get off this site <a href="https://0ms.co/sexydating/" target="_blank">https://0ms.co/sexydating/</a>`,
    responseHandler: 'hello'
  },
}

export const MindyChat = new MessageHandler(MindyProfile, MindyMessages)
