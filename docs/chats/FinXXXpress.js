

import { isYes, isNo, isGreeting, isMatch, MessageHandler, diatribe, createEvent } from '../state/conversationRunner.js'
import {getUserData, genderSwitch, getAgeYears } from '../state/profile.js'

const fu = (messageCode, waitMs=3000) => ({ messageCode, waitMs })


export const XXXProfile = {
  name: 'FinXXXpress',
  startingVisibility: 'online',
  domType: 'Automated',
  order: 10,
  age: 0,
  distance: 1,
  maxPhotos: 1,
  description: `When you're on the move...`,
  gender: 'Binary',
  display: 'nb',
  testimonials: [
    {
      review: `It's so convenient!`
    },
    {
      review: `As someone who's constantly on the go, FinXXXpress is a real life saver`
    },
  ]
}




const XXXMessages = {
  TYPING_SPEED: 1,

  START: {
    responseHandler: `hello`,
    ignoreSend: true,
    ignoreType: true
  },

  async __contract(provider) {
    return await provider.domContract('FinXXXpress')

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

export const XXXChat = new MessageHandler(XXXProfile, XXXMessages)