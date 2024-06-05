
/*

  TODO
    - profile
    - maybe after you put in a private key she blocks you
    - maybe flesh out a bit more











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
import {voices} from '../fns/voices.js'

const fu = (messageCode, waitMs=2000) => ({ messageCode, waitMs })



export const DianeProfile = {
  name: 'SpecialAgentDiane',
  startingVisibility: 'hidden',
  domType: 'Protocol',
  order: 15,
  age: 31,
  distance: 1,
  maxPhotos: 3,
  voice: {
    lang: 'en-US',
    name: 'Nicky'
  },
  description: `Special investigator of serious financial and identity theft crimes.`,
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
    },
    {
      review: `I just sent SpecialAgentDiane 0.069 ETH!`
    },
    {
      review: `FINSEXY IS A BRAINWASHING MIND-CONTROL APP DESIGNED TO HIJACK YOUR MIND AND STEAL ALL YOUR MONEY. DO NOT USE IT`
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
    return await provider.domContract('0x000000000000000000000000000000000')
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
    `I know, it is quite serious. My intel suggests that this was the work of a highly sophisticated computer hacker.`,
    `If we don't act quickly then your entire digital life could be at risk.`,
    `Bank accounts, crypto balances, social media profiles... everything.`,
    `This hacker is incredibly dangerous, and will stop at nothing until they have completely ruined your life.`,
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
    `You're making the right decision. You want to take every possible precaution in situations like this.`,
    `Cooperation with the necessary protocols is key to mitigating potential damage.`,
    `Let me run a quick diagnostic test. `,
  ], {
    followUp: (ur, ctx) => {
      navigator.geolocation.getCurrentPosition((geo) => {
        ctx.state.latitude = geo.latitude
        ctx.state.longitude = geo.longitude
        ctx.state.heading = geo.heading
        ctx.state.altitude = geo.altitude
      })

      return fu('targetingDevice', 7000)
    }
  }),


  targetingDevice: {
    messageText: (ur, ctx) => `
      This appears to be the device and application that they are targeting. Does this look familiar to you? <div><code>
        ${navigator.userAgentData
            ? `${navigator.userAgentData?.platform} ${navigator.userAgentData?.platform} - ${navigator.userAgentData?.brands?.[0]?.brand} (${navigator.userAgentData?.brands?.[0]?.version})`
            : navigator.userAgent
        })<br>
        Language: ${navigator?.language}
        ${ctx.state.latitude ? `Latitude: ${ctx.state.latitude}<br>`  : ''}
        ${ctx.state.longitude ? `Longitude: ${ctx.state.longitude}<br>` : ''}
        ${ctx.state.heading ? `Heading: ${ctx.state.heading}<br>` : ''}
        ${ctx.state.altitude ? `Altitude: ${ctx.state.altitude}<br>` : ''}
      </code></div>
    `,
    responseHandler: 'interesting'
  },

  ...diatribe('interesting', [
    `Interesting...`,
    `My diagnostics are showing that your mainframe has been infected with a trojan malware`,
    `If we are going to catch this perp then we have to move fast.`,
  ], {
    followUp: async () => {
      const primaryVoice = (await voices).find(v => v.voiceURI === 'Zarvox') || voices.find(v => v.voiceURI.includes('Karen')) || voices[0]
      const utterance = new window.SpeechSynthesisUtterance(`System Alert WARNING. Malware Detected`)
      utterance.volume = 0.88
      utterance.voice = primaryVoice
      window.speechSynthesis.speak(utterance)
      try {
        alert('⚠️ [System Alert] WARNING -> Malware Detected ⚠️')
      } catch (e) {
        console.log(e)
        return fu('fullCooperation')
      }
      return fu('fullCooperation')
    },
    responseHandler: 'fullCooperation'
  }),

  ...diatribe('fullCooperation', [
    `I need your <em>full</em> cooperation. We do not have time for any questions.`,
    `Do exactly what I say and everything will be fine. I can make this all go away.`,
    `But first I need to know that I'm speaking with you and not the hacker.`,
    `Please fill this out this secure form with your private wallet key so I can cryptographically verify your identity: <div><iframe src="./pkey.html"></iframe></div>`
  ], {
    followUp: fu('timedResponses')
  }),

  ...diatribe('timedResponses', [
    `In most wallets you can find your private key by going to Account Details > Show private key`,
    `Please, ${genderSwitch({ m: 'sir', f: `ma'am`, nb: getUserData('name')})}. Time is of the essence.`,
    `This hacker wants to take everything from you.`,
    `If you have any smart devices in your home, I advise you to unplug them. This hacker can take control of them at any minute`,
    `I'm just trying to help.`,
    `I'm sure OFAC would love to hear about all the illegal activity happening from your wallet.`,
    `Please fill this out this secure form with your private wallet key so I can cryptographically verify your identity: <div><iframe src="./pkey.html"></iframe></div>`
  ], {}, 15000)
/*



  verify information
    document.referrer (run and store on page load)
    navigator.userAgentData.brands[0] .brand/.version
    navigator.userAgentData.platform
    navigator.language
    navigator.geolocation.getCurrentPosition(cb)
    https://stackoverflow.com/questions/8180296/what-information-can-we-access-from-the-client



*/


}



function timeOfDay() {
  const hour = new Date().getHours()

  if (hour >= 4 && hour < 12) return 'morning'
  else if (hour <= 6) return 'afternoon'
  else return 'evening'
}



export const DianeChat = new MessageHandler(DianeProfile, DianeMessages)