
/*
    Identity theft protector/SpecialAgent:
      - dom type: protocol
      - nft: ???
      - visibility: hidden, but cold dms after 0x0 presses 7
        - messages you after you press 7 with 0x0

      - acts like the cops at the beginning of the trial
      - "I'm just trying to help you"
      - "we have to move quickly to stop the hacker from stealing all of your funds"
      - "this isn't a game"
      - "this hacker is dangerous. we don't have much time"
      - "if your friends and family find out that you're into this disgusting, shameful fetish, it would be absolutely devistating"
      - pulls up all info known abotu your address/browser as proof it knows about you
      - tries to verify that you are human
        - "I'm going to need to verify your identity first. there are so many bots on this website"
        - collects SSN, date of birth, mother's maiden name
        - CAPTCHA: posts some distorted AI sex gibberish.
      - makes you give over private key via html input box + button in chat
        - button verifies that private key matches connected wallet
      - after verifying identity, accusess you of OFAC crimes ("I'm sure OFAC would love to hear about this")
      - "I'll be watching you"


*/
import { isYes, isNo, isGreeting, isMatch, MessageHandler, diatribe, createEvent } from '../state/conversationRunner.js'
import {getUserData, genderSwitch } from '../state/profile.js'

const fu = (messageCode, waitMs=3000) => ({ messageCode, waitMs })

export const DianeProfile = {
  name: 'SpecialAgentDiane',
  startingVisibility: 'hidden',
  domType: 'Protocol',
  order: 11,
  age: 31,
  distance: 1,
  maxPhotos: 3,
  description: ``,
  gender: 'Female',
  display: 'f',
  testimonials: [
    {
      review: `Boy, am I glad that Special Agent Diane found me! I was in a pretty rough spot!`
    },
    {
      review: `Oh no, I fucking knew I shouldn't have given that hacker any money 🥵`
    },
    {
      review: `I knew they were listening`
    }
  ]
}




const DianeMessages = {
  TYPING_SPEED: 1,

  START: {
    responseHandler: `hello`,
    ignoreSend: true,
    ignoreType: true
  },

  async __contract(provider) {
    return await provider.domContract('0x0')

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
    messageText: () => `Good ${timeOfDay()}, ${genderSwitch({m: 'Mr.', f: 'Ms.', nb: 'citizen'})} ${getUserData('name')}`,
    followUp: fu('haveAMoment')
  },

  haveAMoment: {
    messageText: `My name is Special Agent Diane. Do you have a moment?`,
    responseHandler: ur => isYes(ur) ? 'concerningNews' : 'makeTime'
  },

  makeTime: {
    messageText: `Well, this is quite serious, so I suggest you make some time to speak with me.`,
    responseHandler: 'concerningNews'
  },


  concerningNews: {
    messageText: `I have some very concerning news for you: its recently come to my attention that you may have been the victim of identity theft.`,
    responseHandler: 'quiteSerious'
  },

  ...diatribe('quiteSerious', [
    `I know, it is quite serious. My intel suggests that this was the work of an incredibly dangerous hacker.`,
    `If we don't act quickly then your entire digital life could be at risk.`,
    `Bank accounts, crypto balances, social media profiles... everything.`,
    `This hacker is highly sophisticated, and will stop at nothing until they have completely ruined your life.`,
    `It is only a matter of time before all of your funds are completely drained and your loved ones are made aware of your disgusting, shameful FinDom fetish.`,
    `It would be absolutely devistating.`,
    `Additionally, it appears that they have already conducted a fair amount of illegal activity using your identity, which opens you up to substantial legal ramifications.`,
    (ur, ctx) => {
      let output = ctx.global.walletCleansed ? `I'm seeing that they've already conducted a massive money laundering operation with one @CrystalGoddess where they "cleansed" your entire ETH balance.` : ''

      if (ctx.global.securitiesFraud) {
        if (output) output += ` Additionally, it `
        else output += `It `
        output += `seems that they attempted to commit securities fraud with one @VinceSlickson.`
      }

      return output
    },
    (ur, ctx) => {
      let output = `I don't think `
      if (ctx.global.walletCleansed && ctx.global.securitiesFraud) output += 'OFAC or the SEC need'
      else if (ctx.global.walletCleansed && !ctx.global.securitiesFraud) output += 'OFAC needs'
      else if (!ctx.global.walletCleansed && ctx.global.securitiesFraud) output += 'the SEC needs'
      else output += 'the relevant authorities need'

      return output + ` to be notified about this, do you?`
    },
    `Surely we can work something out.`
  ], {
    responseHandler: 'rightDecision'
  }),



  ...diatribe('rightDecision', [
    `You're making the right decision. `
  ], {
    responseHandler: 'rightDecision'
  }),
/*



  (no)





  ()
















  [if CG cleanse, mention washing. if VS, mention securities fraud. if SJ, mention accounting fraud]



  verify information
    document.referrer (run and store on page load)
    navigator.userAgentData.brands[0] .brand/.version
    navigator.userAgentData.platform
    navigator.language
    navigator.geolocation.getCurrentPosition(cb)
    https://stackoverflow.com/questions/8180296/what-information-can-we-access-from-the-client



  Do you have any smart devices in your home?

  isYes
    I suggest you unplug and disable them immediately. The hacker likely already has access to everything. They can see everything through your smart cameras, track your internet and television activity through your smart phone and smart TV, and lock your smart lock to prevent you from entering your house.
    They could make your life a living hell

  isNo
    Good. Because if you did, they would be able to see everything through your smart cameras, track your internet and television activity through your smart phone and smart TV, and lock your smart lock to prevent you from entering your house.
    They could make your life a living hell

  unsure
    Sir, Ma'am, $name, this is a yes or no question. We don't have much time





  pending send messages
    - "I'm just trying to help you"
    - "I'm sure OFAC would love to hear about this"
    - threaten to tell friends/family


*/


}



function timeOfDay() {
  const hour = new Date().getHours()

  if (hour >= 4 && hour < 12) return 'morning'
  else if (hour <= 6) return 'afternoon'
  else return 'evening'
}



export const DianeChat = new MessageHandler(DianeProfile, DianeMessages)