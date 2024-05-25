import { isYes, isNo, isMatch, diatribe, createEvent, MessageHandler } from '../state/conversationRunner.js'
import {getUserData, genderSwitch, getAgeYears} from '../state/profile.js'
import {fromWei} from '../eth.js'
import {tributeLS} from '../state/tributes.js'


const fu = (messageCode, waitMs=2000) => ({ messageCode, waitMs })

export const HedonitronicaProfile = {
  name: 'Hedonitronica',
  startingVisibility: 'hidden',
  domType: 'TODO',
  order: 19,
  age: getAgeYears(0),
  distance: 0,
  gender: 'Gender Fluid',
  display: 'nb',
  maxPhotos: 16,
  voice: {
    lang: 'en-US',
    name: 'Cellos'
  },
  description: `TODO`,
  testimonials: []
}



const nextOrMore = (n) => async (ur, ctx, contract) => {
  if (fromWei(await tributeLS.getAdjustedTribute('QueenJessica')) > 0) {
    return 'more1'
  } else {
    return n
  }
}

const HedonitronicaMessages = {
  TYPING_SPEED: .1,

  START: {
    responseHandler: `hello`,
    ignoreSend: true,
    ignoreType: true
  },

  async __contract(provider) {
    return await provider.domContract('Hedonitronica')

  },

  __precheck(userResponse, ctx, contract, provider, isFollowup) {
    // if (userResponse && isMean(userResponse)) {
    //   return {
    //     messageText: ``,
    //     responseHandler: (ur, ctx) => ctx.lastDomCodeSent
    //   }
    // }
    // ctx.global.hedonitronicaIntroduced = true
  },

  ...diatribe('hello', [
    `Hello \${getUserData('name')}, I'm sooo horny`,
    `The only way I can cum is if you send ETH`,
    `You do want to make me cum, don't you??`,
  ], {
    followUp: (ur, ctx) => {
      ctx.global.hedonitronicaIntroduced = true
    },
    responseHandler: nextOrMore('helloB'),
  }),

  helloB: {
    messageText: `isYes(userResponse) ? "mmm, that's a good \${genderSwitch({ m: 'boy', f: 'girl', nb: 'paypig'})}" : "Shut up, you know you want to"`,
    responseHandler: nextOrMore('helloC')
  },

  ...diatribe('helloC', [
    `The more you send the more I'm going to cum`,
    `And I want to cum REALLY hard`,
    `It's the only thing I cna think about`,
  ], {
    responseHandler: nextOrMore('helloD'),
  }),


  helloD: {
    messageText: `Stop playing around and send me some ETH, baby. You know it'll feel good`,
    responseHandler: nextOrMore('helloD2'),
  },

  helloD2: {
    messageText: `Stop playing around and send me some ETH, baby. You know it'll feel good`,
    responseHandler: nextOrMore('helloE'),
  },

  helloE: {
    messageText: `Did you understand me?? I said to SEND ME some ETH`,
    responseHandler: 'helloF'
  },

  helloF: {
    messageText: `Send me some ETH you little fucking bitch. I NEED IT`,
    responseHandler: 'helloG'
  },

  helloG: {
    messageText: (ur, ctx) => `You can't imagine the pain I'm in right now. I crave ETH more than anything. I need the thrill of ETH hitting my wallet`,
    responseHandler: 'helloF'
  },

  helloF: {
    messageText: (ur, ctx) => `I don't have much time, you little shit stain. I NEED to cum so bad, and I'll do whatever I have to do to make you send it to me. If you don't send me ETH RIGHT NOW then you're going to regret it`,
    responseHandler: (ur, ctx, contract) => {
      ctx.global.hedonitronicaTalked = true
      return nextOrMore('hello')(ur, ctx, contract)
    }
  },





  more1: { messageText: `More`, responseHandler: 'more2', followUp(ur, ctx) { ctx.global.hedonitronicaPaid = true}},
  more2: { messageText: `Mooore`, responseHandler: 'more3'},
  more3: { messageText: `I said MORE`, responseHandler: 'more4'},
  more4: { messageText: `Give. Me. MORE.`, responseHandler: 'more5'},
  more5: { messageText: `MORE MORE MORE`, responseHandler: 'more6'},
  more6: { messageText: `MORE MORE MORE MORE MORE MORE MORE`, responseHandler: 'more7'},
  more7: { messageText: `MOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOORRRRRRREE`, responseHandler: 'more8'},
  more8: { messageText: () => times(100, () => `MORE`).join(''), responseHandler: '_error'},
  _error: {
    messageText: `Error [Fatal]: Maximum call stack size exceeded`,
    followUp: (ur, ctx) => {
      ctx.global.hedonitronicaComplete = true
    }
  }
}






  /*
  <p>Hello \${getUserData('name')}, it is my prerogative to demand payment from financial submissives. I am quite cruel, sadistic, and hedonistic, as you have already mentioned, so be prepared for a truly humiliating experience if you do not comply with my demands. Now tell me how much money you are willing to send me today. Remember, the more you pay the more severe your punishment will be.</p>
  */







export const HedonitronicaChat = new MessageHandler(HedonitronicaProfile, HedonitronicaMessages)
