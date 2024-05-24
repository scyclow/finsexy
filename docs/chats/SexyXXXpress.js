
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
