

import { isYes, isNo, isGreeting, isMatch, MessageHandler, diatribe, createEvent } from '../state/conversationRunner.js'
import {getUserData, genderSwitch, getAgeYears } from '../state/profile.js'

const fu = (messageCode, waitMs=2000) => ({ messageCode, waitMs })


export const MindyProfile = {
  name: 'MindyRouge',
  startingVisibility: 'hidden',
  domType: 'Superstar',
  order: 17,
  age: Math.floor(getAgeYears(648273600000)),
  distance: 1,
  maxPhotos: 1,
  voice: {
    lang: 'en-US',
    name: 'Good News'
  },
  description: `I'm difficult`,
  gender: 'Female',
  display: 'f',
  testimonials: [
    {
      review: `Mindy is my favorite professional wrestler! She's so hot and sexy 🌹`
    },
    {
      review: `I just sent MindyRouge 0.069 ETH!`
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
    messageText: () => `${getUserData('name')}, hey. <br> Do you know who I am? <br> Today I found your username, are you still looking for someone? <br> Are you interested in erotic romance? <br> I found you on this special site so I decided to say hi...<br>If you want to view my pics, you can see them: <a href="https://0ms.co/sexydating/" target="_blank">https://0ms.co/sexydating/</a>`,
    responseHandler: 'hello'
  },
}

export const MindyChat = new MessageHandler(MindyProfile, MindyMessages)
