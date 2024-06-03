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
  maxPhotos: 8,
  voice: {
    lang: 'en-US',
    name: 'Eddy'
  },
  description: `Proud FinSexy sponsor! Your one-stop shop for Rona Merch! High quality merchandise at affordable prices! Shop until you drop! Visit us at: <a href="https://ronamerch.co" target="_blank">RonaMerch.co</a><h4 style="margin-top: 0.5em">New Items:
  <div><a href="https://ronamerch.co/items/kissy-t" target="_blank">FinSexy Kissy T</a></div>
  <div><a href="https://ronamerch.co/items/property-wallet" target="_blank">FinSexy Property Wallet</a></div>
  <div><a href="https://ronamerch.co/items/paypig-t" target="_blank">FinSexy Paypig T</a></div>
  `,
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
    {
      review: `It's so sad seeing my favorite websites ruined by corporate sponsorships`
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
    responseHandler: 'paypig',
  },

  paypig: {
    messageText: `Get rid of that ugly shirt! You would look so much hotter in this 🔥<a href="https://ronamerch.co/items/paypig-t" target="_blank"><img src="/thumbnails/RonaMerch/3.png" />FinSexy.com Paypig T</a>`,
    responseHandler: 'wallet'
  },

  wallet: {
    messageText: `This wallet has your name written all over it. Well... it has @steviep's name written all over it 😉<a href="https://ronamerch.co/items/property-wallet" target="_blank"><img src="/thumbnails/RonaMerch/2.png" />FinSexy.com Property Wallet</a>`,
    responseHandler: 'kissy'
  },

  kissy: {
    messageText: `Celebrate #FinDomSummer by plastering FinSexy.com's iconic logo across your chest for the whole world to see! <a href="https://ronamerch.co/items/kissy-t" target="_blank"><img src="/thumbnails/RonaMerch/1.png" />FinSexy.com Kissy T</a>`,
    responseHandler: 'tanktop'
  },

  tanktop: {
    messageText: `There's no better way to say "thank you" to your favorite findom by buying them this cute tank top! <a href="https://ronamerch.co/items/flash-sale" target="_blank"><img src="/thumbnails/RonaMerch/5.png" />Flash Sale Tanktop</a>`,
    responseHandler: 'knotty'
  },

  knotty: {
    messageText: `From your local arts and crafts meetup to your monthly shibari bondage party, show everyone how much you enjoy tying knots! <a href="https://ronamerch.co/items/knotty-mask" target="_blank"><img src="/thumbnails/RonaMerch/6.png" />Knotty Pleated Mask</a>`,
    responseHandler: 'fastcash'
  },


  fastcash: {
    messageText: `If you're trying to combine the sex appeal of FastCashMoneyPlus.biz and skin-tight yoga pants, then look no further than! <a href="https://ronamerch.co/items/fastcash-leggings" target="_blank"><img src="/thumbnails/RonaMerch/4.png" />FastCash Leggings</a>`,
    responseHandler: 'hathat'
  },


  hathat: {
    messageText: `<a href="https://ronamerch.co/items/hat-hat" target="_blank"><img src="/thumbnails/RonaMerch/7.png" />Hat Hat</a>`,
    responseHandler: 'hello'
  },

}



export const RonaMerchChat = new MessageHandler(RonaMerchProfile, RonaMerchMessages)


