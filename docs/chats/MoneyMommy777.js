

import { isYes, isNo, isGreeting, isMean, MessageHandler, createEvent } from '../state/conversationRunner.js'
import {getUserData, genderSwitch } from '../state/profile.js'

/*
  T: I was sorely disappointed that, depite using the "Mommy" honorific, this findom was NOT a milf. It's pretty slim pickings for paypigs into older ladies. It looks like it's really @SamanthaJones or bust!

  - https://www.tiktok.com/@yournewaccountant/video/7343054916019047722?q=findom&t=1713874938713
  - https://www.tiktok.com/@mclovinshaii/video/7255800014470171950?q=findom&t=1713874938713
  - https://www.tiktok.com/@theelizamonique/video/7261508273520577793?q=findom&t=1713874938713
  - do you want to become a findom?
  - do you want to learn how to extract wealth out of countless losers who have more money than sense?
  - it's like shooting fish in a barrel

  - I'm manifesting big bags💰

  - "what, you think i'm just going to tell you for free?"
  - "you better be 18. some people think that you can do findom without technically doing sex work. i suppose it's not illegal for someone to pay you to be mean to them. but i don't care, it still freaks me out. so if you're under 18 go back to tiktok or wherever."




- Do you want to know ...

- I won't tell you for free

-> 0.01

-> dumps entire ebook in chat



*/



const fu = (messageCode, waitMs=2000) => ({ messageCode, waitMs })

export const MoneyMommyProfile = {
  name: 'MoneyMommy777',
  startingVisibility: 'offline',
  domType: 'Mentor',
  order: 9,
  age: 23,
  distance: 7,
  maxPhotos: 2,
  voice: {
    lang: 'en-ZA',
    name: 'Tessa'
  },
  description: `TODO`,
  gender: 'Female',
  display: 'f',
  testimonials: [
    {
      review: `I'm sick of these money-hungry findoms trying to make a quick buck off of my kink.`
    },
    {
      review: `Don't let anyone tell you any different: FinDom is a form of spicy work. It doesn't matter if you keep your clothes on: telling people to give you money is an inherently sexual act`
    }
  ]
}






const MoneyMommyMessages = {
  TYPING_SPEED: 1,

  START: {
    responseHandler: `hello`,
    ignoreSend: true,
    ignoreType: true
  },

  async __contract(provider) {
    return await provider.domContract('MoneyMommy777')

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



export const MoneyMommyChat = new MessageHandler(MoneyMommyProfile, MoneyMommyMessages)


