import { isYes, isNo, isGreeting, isMean, MessageHandler, createEvent } from '../state/conversationRunner.js'
import {getUserData, genderSwitch } from '../state/profile.js'

/*
  T: I'm sick oflarge corporate entities...


*/



const fu = (messageCode, waitMs=2000) => ({ messageCode, waitMs })

export const RonaMerchProfile = {
  name: 'RonaMerch',
  sponsor: true,
  startingVisibility: 'online',
  domType: 'Service',
  order: 12,
  age: '.co',
  distance: 'Drop Shipping',
  maxPhotos: 5,
  voice: {
    lang: 'en-US',
    name: 'Eddy'
  },
  description: `Proud FinSexy sponsor! Your one-stop shop for Rona Merch! Dedicated to bringing you the freshest rona deals every day! Shop until you drop! Visit us at: <a href="https://ronamerch.co" target="_blank">RonaMerch.co</a>`,
  gender: 'Retail',
  display: 'nb',
  testimonials: [
    {
      review: `Without a doubt, Rona Merch Co. ovvers the hottest selection of stylish face masks on the internet -- and at ROCK BOTTOM prices to boot!`
    },
    {
      review: `The best face masks and t-shirts on the web. Period.`
    },
    {
      review: `Such high quality. Great prices, too!`
    },
    {
      review: `The shipping on my facemask absolutely destroyed my wallet 🥵`
    },
    {
      review: `I just sent RonaMerch 0.069 ETH!`
    },
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
    messageText: `Hello! If you're looking for the hottest merch deals then you've come to the right place! RonaMerch.co has been voted the top web e-store by <a href="http://fakebullshit.news/articles/small-business-thrives" target="_blank">multiple news outlets</a> several years running! Head on over to <a href="http://ronamerch.co" target="_blank">ronamerch.co</a> for all the hottest deals today!`,
    responseHandler: (ur) => {},

  },
}



export const RonaMerchChat = new MessageHandler(RonaMerchProfile, RonaMerchMessages)


