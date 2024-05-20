/*

TODO
  - add "you've been the victim of identity theft" dom







Testimonials
- i love being watched ☺️

*/

import { isYes, isNo, isGreeting, isMean, MessageHandler, createEvent } from '../state/conversationRunner.js'
import {getUserData, genderSwitch } from '../state/profile.js'
import {DianeChat} from './SpecialAgentDiane.js'


const fu = (messageCode, waitMs=3000) => ({ messageCode, waitMs })

export const HackerProfile = {
  name: '0x000000000000000000000000000000000',
  startingVisibility: 'hidden',
  domType: null,
  order: 12,
  age: NaN,
  distance: NaN,
  maxPhotos: 2,
  voice: {
    lang: 'en-US',
    name: 'Zarvox'
  },
  description: ``,
  gender: undefined,
  display: 'nb',
  testimonials: [
    {
      name: '0x72f...daF',
      review: `I don't like this dom at all. `
    },
    {
      name: '0x72f...daF',
      review: `I knew someone was watching me this entire time. This whole website gives me the creeps`
    }
  ]
}






const HackerMessages = {
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
    if (userResponse && isMean(userResponse)) {
      return {
        messageText: ``,
        responseHandler: (ur, ctx) => ctx.lastDomCodeSent
      }
    }
  },

  hello: {
    async messageText(ur, ctx, contract, provider) {
      let blackmailAddress = '0x47144372eb383466D18FC91DB9Cd0396Aa6c87A4'

      if (ctx.global.isConnected) blackmailAddress = contract.address

      return `
        <p>Send ${0.25 * ctx.global.premium} in eth to the underneath address (remove***from it):</p>

        <p>${blackmailAddress.slice(0, 4)}***${blackmailAddress.slice(4)}</p>

        <p>You may be thinking why the heck would you do that? Well, prepare yourself simply because I am going to move your world right now. I had a dangerous malware infect your laptop or computer and also record video of YOU (using your cam) when you looked at 'adult' web sites.</p>

        <p>Here's one of your password ${getUserData('password')}</p>

        <p>Still don't believe me? Reply 7 and I will be randomly share your video with 7 people you recognize (Yes, I've access to your address book also).</p>

        <p>Now, what can I want to get this to entire thing go away? Very well, I have already pointed out the particular offer in beginning of the message. Should you not fulfill it within Twenty-four hrs, I'm going to create your life horrible by mailing that video to Everyone you know. Your time frame begins now.</p>
      `
    },
    responseHandler: (ur) => {
      if (ur.includes('7')) {
        DianeChat.queueEvent('hello', 1)
        MessageHandler.visibilityCtx.SpecialAgentDiane = 'online'

        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      }
    },

    // event: 'blackmailEvent'
  },

  // finished: {
  //   responseHandler: (ur) => {
  //     if (ur.includes('7')) {
  //       navigator.mediaDevices.getUserMedia({ video: true, audio: false })
  //     }
  //   },
  // },

  // blackmailEvent: createEvent(0.05, {
  //   primary: { messageCode: 'finished' },
  //   postEvent: () => {console.log('identity theft')}
  // })


}

// TODO
  // after you send to 0x0, you get another message saying that you've been the victim of identity theft
  // -> need to get an audit from Samantha
  // -> Samantha wont give oyu an audi certificate until you're done
  // -> Samantha makes you talk to vince or steviep to complete challenge


  /*



  */



export const HackerChat = new MessageHandler(HackerProfile, HackerMessages)