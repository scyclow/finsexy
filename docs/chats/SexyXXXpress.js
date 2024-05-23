
/*
FDXXXpress -> SexyXXXpress

*/
import { isYes, isNo, isGreeting, isMatch, MessageHandler, diatribe, createEvent } from '../state/conversationRunner.js'
import {getUserData, genderSwitch, getAgeYears } from '../state/profile.js'

const fu = (messageCode, waitMs=3000) => ({ messageCode, waitMs })


export const XXXProfile = {
  name: 'SexyXXXpress',
  startingVisibility: 'online',
  domType: 'Automated',
  order: 11,
  age: 11010,
  distance: 1,
  maxPhotos: 3,
  voice: {
    lang: 'en-US',
    name: 'Fred'
  },
  description: `TODO`,
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
      review: `I usually like to send until I absolutely hate myself and then chase it with scrolling social media until I'm completely numb. So SexyXXXpress really streamlines my workflow`
    },
    {
      review: `it's hard for me to remember the last time i had sex with anyone in person. it seems like these days all anyone wants is to have cybersex`
    },
    {
      review: `i can't believe i'm getting cucked by my goddamn computer`
    },
    {
      review: `i'm sick of my findom addiction. this isn't making me happy any more`
    }
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
    return await provider.domContract('SexyXXXpress')

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
