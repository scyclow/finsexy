/*

TODO
  - add "you've been the victim of identity theft" dom



Testimonials
- i love being watched ☺️

*/

import { isYes, isNo, isGreeting, isMean, MessageHandler, createEvent } from '../state/conversationRunner.js'
import {getUserData, genderSwitch } from '../state/profile.js'

const fu = (messageCode, waitMs=3000) => ({ messageCode, waitMs })

export const HackerProfile = {
  name: '0x000000000000000000000000000000000',
  startingVisibility: 'hidden',
  order: 10,
  age: NaN,
  distance: NaN,
  maxPhotos: 1,
  description: ``,
  gender: null,
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




async function sendEvent1(ctx, contract, provider) {
  const addr = await provider.isConnected()

  ctx.state.rounds = ctx.state.rounds || 0

  if (contract && addr) {
    const t = bnToN(await contract.tributes(addr))

    if (t > 0 && t / 2 > ctx.state.rounds) return { messageCode: '', waitMs: 3000 }
  }

}


const HackerMessages = {
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
    if (userResponse && isMean(userResponse)) {
      return {
        messageText: ``,
        responseHandler: (ur, ctx) => ctx.lastDomCodeSent
      }
    }
  },

  hello: {
    async messageText(ur, ctx, contract, provider) {
      if (!ctx.global.isConnected) return
      else return `
        <p>Send ${0.05 * ctx.global.premium} in eth to the underneath address (remove***from it):</p>

        <p>${contract.address.slice(0, 4)}***${contract.address.slice(4)}</p>

        <p>You may be thinking why the heck would you do that? Well, prepare yourself simply because I am going to move your world right now. I had a dangerous malware infect your laptop or computer and also record video of YOU (using your cam) when you looked at 'adult' web sites.</p>

        <p>Here's one of your password ${getUserData('password')}</p>

        <p>Still don't believe me? Reply 7 and I will be randomly share your video with 7 people you recognize (Yes, I've access to your address book also).</p>

        <p>Now, what can I want to get this to entire thing go away? Very well, I have already pointed out the particular offer in beginning of the message. Should you not fulfill it within Twenty-four hrs, I'm going to create your life horrible by mailing that video to Everyone you know. Your time frame begins now.</p>
      `
    },
    responseHandler: (ur) => {
      if (ur.includes('7')) {
        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      }
    },

    event: 'blackmailEvent'
  },

  finished: {
    responseHandler: (ur) => {
      if (ur.includes('7')) {
        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      }
    },
  },

  blackmailEvent: createEvent(0.05, {
    primary: { messageCode: 'finished' },
    postEvent: () => {console.log('identity theft')}
  })


}

// TODO
  // after you send to 0x0, you get another message saying that you've been the victim of identity theft
  // -> need to get an audit from Samantha
  // -> Samantha wont give oyu an audi certificate until you're done
  // -> Samantha makes you talk to vince or steviep to complete challenge


  /*



  */



export const HackerChat = new MessageHandler(HackerProfile, HackerMessages)