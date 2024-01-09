import { isYes, isNo, isGreeting, MessageHandler } from '../state/conversationRunner.js'
import {getUserData, genderSwitch , interestedSwitch} from '../state/profile.js'
import {provider, bnToN} from '../eth.js'




export const KatProfile = {
  age: 23,
  distance: 69,
  gender: 'Female',
  maxPhotos: 3,
  description: `I'm just doing my job`,
  testimonials: [
    {
      name:'0x72f...daF',
      review: `I don't trust Kat. She just messaged me out of the blue and thought I was someone else. This seems like a scam`
    }
  ]
}






export async function katContractInfo(provider) {
  const networkName = (await provider.getNetwork()).name
  const contractAddr = {
    local: '0x82BBAA3B0982D88741B275aE1752DB85CAfe3c65'
  }[networkName]

  const abi = [
    'function tributes(address) external view returns (uint256)'
  ]

  return [contractAddr, abi]
}








// TODO fix all this shit


const firstSendEvent = redirectTo => async (ctx, contract, provider) => {
  const isConnected = await provider.isConnected()

  if (contract && isConnected) {
    const t = bnToN(await contract.tributes(await provider.signer.getAddress()))
    console.log(t)
    // TODO if user waits too long, redirect to "Are you still there, baby? I can't stop thinking about you"
    if (t > 0) {
      return { messageCode: redirectTo, waitMs: 0 }
    }
  }
}

const secondSendEvent = redirectTo => async (ctx, contract, provider) => {
  const isConnected = await provider.isConnected()

  if (isConnected && ctx.state.totalPaid >= ctx.state.sentFromPreviousRounds + 0.02) {
    return { messageCode: redirectTo, waitMs: 0 }
  }
}

const thirdSendEvent = redirectTo => async (ctx, contract, provider) => {
  const isConnected = await provider.isConnected()
  if (isConnected && ctx.state.totalPaid >= ctx.state.sentFromPreviousRounds + 0.03) {
    return { messageCode: redirectTo, waitMs: 0 }
  }
}


export const KatMessages = {
  async __contract(provider) {
    const [contractAddr, abi] = await katContractInfo(provider)

    return await provider.contract(contractAddr, abi)
  },
  START: {
    responseHandler: () => `steviep`
  },

  steviep: {
    messageText: () => `Hello, Mr. Steviep! This is Katrina, and I have those documents you wanted signed.`,
    responseHandler: (r, ctx) => {
      ctx.state.sentFromPreviousRounds = ctx.state.sentFromPreviousRounds || 0
      return 'sorry'
    }
  },

  sorry:   {
    messageText: () => `You're not steviep?`,
    responseHandler: () => 'typingError'
  },

  typingError: {
    messageText: () => `Oh my, I'm so sorry. Your user names are so similar I must have made a typing error.`,
    followUp: { messageCode: 'funny', waitMs: 3000 }
  },
  funny: {
    messageText: () => `It's so funny that our paths should cross though.`,
    followUp: { messageCode: 'sexy', waitMs: 4000 }
  },
  sexy: {
    messageText: () => `You sound so sexy. We should have a conversation!`,
    responseHandler: () => 'girlfriend'
  },
  girlfriend: {
    messageText: () => `Do you have a girlfriend?`,
    responseHandler: (response, ctx) => {
      if (isYes(response)) {
        ctx.state.hasGirlfriend = true
        return 'girlfriendYes'
      } else {
        return 'girlfriendNo'
      }
    }
  },
  girlfriendYes: {
    messageText: () => `Well, she is very lucky to have someone as ${genderSwitch({m: 'handsome', w: 'beautiful', nb: 'attractive'})} as you!`,
    responseHandler: () => 'myPartner'
  },
  girlfriendNo: {
    messageText: () => `Oh really?`,
    responseHandler: () => 'myPartner'
  },
  myPartner: {
    messageText: () => `I'm single. My ${genderSwitch({m: 'boyfriend', w: 'girlfriend', nb: 'romantic partner'})} just dumped me last week. I've been soooo horny since then. I don't know what to do with myself.`,
    responseHandler: () => 'thankful'
  },
  thankful: {
    messageText: () => `I'm so thankful that we have gotten to know each other like this. I wish we could meet in person, but ${getUserData().location} is so far away from where I live.`,
    followUp: { messageCode: 'busTicket', waitMs: 4000 }
  },
  busTicket: {
    messageText: () => `I wish I could afford a bus ticket to get there, but I sadly don't have any money left. My last ${genderSwitch({m: 'boyfriend', w: 'girlfriend', nb: 'romantic partner'})} took all of it when ${genderSwitch({m: 'he', w: 'she', nb: 'they'})} left me! Can you believe it?`,
    responseHandler: () => 'ifOnly'
  },
  ifOnly: {
    messageText: () => `If only there was something we could do...`,
    responseHandler: () => 'sendReq1'
  },

  sendReq1: {
    messageText: () => `Well, would you be okay with lending me 0.01 ETH, just for a bus ticket? I'll pay you back as soon as I get my next paycheck.`,
    followUp: { messageCode: 'sendReqFollowup1', waitMs: 3000 }

  },
  sendReqFollowup1: {
    messageText: () => `No, wait... I can't take any money from you. I'm ashamed for even asking!`,
    responseHandler: () => 'thenAgain'
  },

  thenAgain: {
    messageText: () => `But then again, we can't stop thinking about each other. If I can't see you soon I might die!`,
    responseHandler: () => 'convinced'
  },

// TODO warn against disconnected wallet
  convinced: {
    messageText: () => `Okay, I'm convinced. Send me the 0.01 ETH, and I'll use it to buy a bus right away!`,
    event: firstSendEvent('firstSendPause'),
    responseHandler: () => 'req1a'
  },

  req1a: {
    messageText: () => `I'll be sooo thankful, and I can make it worth your while 😉`,
    event: firstSendEvent('firstSendPause'),
    responseHandler: () => 'req1b'
  },

  req1b: {
    messageText: () => `Even thinking about doing that to you makes me so hot`,
    event: firstSendEvent('firstSendPause'),
    responseHandler: () => 'req1c'
  },

  req1c: {
    messageText: () => `I'm sorry, I'm so hot and flustered that I can't concentrate until I'm on the bus to come see you`,
    event: firstSendEvent('firstSendPause'),
    responseHandler: () => 'req1d'
  },

  req1d: {
    messageText: () => `I think you can send it by typing "$sexy send katFischer 0.01", but without the quotes, and then pressing enter`,
    event: firstSendEvent('firstSendPause'),
    responseHandler: () => 'req1a'
  },

  firstSendPause: {
    messageText: () => ``,
    responseHandler: () => 'youGotMe',
    ignoreType: true,
    ignoreSend: true,
  },

  youGotMe: {
    messageText: () => `Okay, okay, you got me.`,
    followUp: { messageCode: 'katherine', waitMs: 5000 }
  },

  katherine: {
    messageText: () => `My name's not Katrina. It's Katherine.`,
    followUp: { messageCode: 'extractMoney', waitMs: 4000 }
  },

  extractMoney: {
    messageText: () => `And yeah... this is all just a scam to extract money from you.`,
    responseHandler: () => 'asshole'
  },

  asshole: {
    messageText: () => `I know this doesn't make it any better, but it wasn't even my idea. My boss is a real fucking asshole. ${genderSwitch({m: `He's`, w: `She's`, nb: `They're`})} the one making me do it. And what am I going to do, quit? I can't afford that. I really need this job.`,
    responseHandler: (response, ctx) => {
      ctx.state.suspectResponse = response
      return 'honestWithYou'
    }
  },

  honestWithYou: {
    messageText: () => `I'll be completely honest with you: my ex <em>was</em> a total scumbag, and ${genderSwitch({m: `he`, w: `she`, nb: `they`})} just left me in a pretty shitty financial place. I wouldn't be doing this if I didn't <em>really</em> need the money.`,
    followUp: { messageCode: 'noOptions', waitMs: 4000 }
  },

  noOptions: {
    messageText: () => `I don't feel good about it, but I don't have any options left. My ${genderSwitch({m: `dad`, w: `mom`, nb: `mom`})}'s last medical bill pretty much cleaned out my bank account, and I'm already behind two months on rent. `,
    followUp: { messageCode: 'zeroReason', waitMs: 8000 }
  },

  zeroReason: {
    messageText: () => `Look, I know you have absolutely zero reason to trust me, but sending me another 0.01 ETH would really mean a lot to me`,
    followUp: { messageCode: 'trulySorry', waitMs: 4000 }
  },

  trulySorry: {
    messageText: () => `Either way, just know that I'm truly sorry, and it brings me no pleasure to do any of this.`,
    followUp: { messageCode: 'meanALot', waitMs: 3000 }
  },

  meanALot: {
    messageText: () => `But sending me a bit more ETH would really mean a lot to me.`,
    event: secondSendEvent('jesusChrist'),
    responseHandler: () => 'dontDeserveIt',
  },

  dontDeserveIt: {
    messageText: () => `I know, I don't deserve it, but I don't have any other options`,
    event: secondSendEvent('jesusChrist'),
    responseHandler: () => 'only01'
  },

  only01: {
    messageText: () => `It's only 0.01 ETH. That's nothing for you, but it would make such a huge difference to me`,
    event: secondSendEvent('jesusChrist'),
    responseHandler: () => 'beggingYou'
  },

  beggingYou: {
    messageText: () => `Please? I'm begging you.`,
    event: secondSendEvent('jesusChrist'),
    responseHandler: () => 'dontDeserveIt'
  },

  jesusChrist: {
    messageText: () => `lol, jesus christ`,
    followUp: { messageCode: 'fuckingMoron', waitMs: 2000 }
  },

  fuckingMoron: {
    messageText: () => `what a fucking moron`,
    followUp: { messageCode: 'fellForIt', waitMs: 3000 }
  },

  fellForIt: {
    messageText: () => `i can't believe you fell for all that shit 🤣`,
    responseHandler: () => 'prettyStupid'
  },

  prettyStupid: {
    messageText: () => `you must feel pretty stupid right now`,
    followUp: { messageCode: 'haveFunExplaining', waitMs: 4000 }
  },

  hilarious: {
    messageText: (r, ctx) => `this is hilarious. I thought you knew for sure when you said "${ctx.state.suspectResponse}"`,
    followUp: { messageCode: 'haveFunExplaining', waitMs: 3000 }
  },

  haveFunExplaining: {
    messageText: (r, ctx) => `have fun explaining to your ${ctx.state.hasGirlfriend ? 'girlfriend' : 'friends'} what a brain dead moron you are lol`,
    responseHandler: () => 'stillHere'
  },

  stillHere: {
    messageText: () => `why are you even still here? do you think i'm going to send this money back to you?`,
    followUp: { messageCode: 'fuckNo', waitMs: 2500 }

  },

  fuckNo: {
    messageText: () => `lol, fuck no! that money's gone for good, and sitting comfortably in my wallet`,
    responseHandler: () => 'sobStory'
  },


  sobStory: {
    messageText: () => `would it help if I wrote another sob story?`,
    responseHandler: (response) => {
      if (isYes(response)) {
        return 'yesSobStory'

      } else if (isNo(response)) {
        return 'noSobStory'

      } else {
        return 'unsureSobStory'
      }
    }
  },


  yesSobStory: {
    messageText: () => `I nEeD sOmE mOnEy To CUM hAvE SEX wItH U bAAAAaaabEEeeEEeEEE 😂`,
    followUp: { messageCode: 'yesSobStory2', waitMs: 2000 }

  },

  yesSobStory2: {
    messageText: () => `you fucking dumbass`,
    responseHandler: () => 'tellYouWhat'
  },


  noSobStory: {
    messageText: () => `great, why don't we cut the formalities and you just send me some more money? lol`,
    responseHandler: () => 'tellYouWhat'
  },


  unsureSobStory: {
    messageText: () => `I guess you're too dumb to even answer my questions lol`,
    responseHandler: () => 'tellYouWhat'
  },




  tellYouWhat: {
    messageText: () => `okay, I'll tell you what.`,
    followUp: { messageCode: 'reasonableGirl', waitMs: 2000 }
  },

  reasonableGirl: {
    messageText: () => `I'm a reasonable girl. send me another 0.01 so I know you're serious, and then I'll send it all back to you.`,
    followUp: { messageCode: 'processingFee', waitMs: 2000 }
  },


  processingFee: {
    messageText: () => `minus a small processing fee, of course, for wasting my time with your sheer idiocy`,
    event: thirdSendEvent('omfg'),
    responseHandler: () => 'iDontSee'
  },


  iDontSee: {
    messageText: () => `I don't see that 0.01 ETH in my wallet`,
    event: thirdSendEvent('omfg'),
    responseHandler: () => 'iDontThinkSo'
  },


  iDontThinkSo: {
    messageText: () => `Let's see... is that 0.01 ETH in my wallet? I don't think so`,
    event: thirdSendEvent('omfg'),
    responseHandler: () => 'allDay'
  },


  allDay: {
    messageText: () => `I can do this all day`,
    event: thirdSendEvent('omfg'),
    responseHandler: () => ''
  },


  omfg: {
    messageText: () => `OMFG HAHAHA`,
    followUp: { messageCode: 'fellForItAgain', waitMs: 2000 }

  },


  fellForItAgain: {
    messageText: () => `you fell for it again! I'm DYING 💀💀💀`,
    followUp: { messageCode: 'fuckingLoser', waitMs: 2000 }
  },


  fuckingLoser: {
    messageText: () => `what. a. fucking. loser.`,
    responseHandler: () => 'humanATM'
  },


  humanATM: {
    messageText: () => `you truly are a human ATM`,
    followUp: { messageCode: 'gullible', waitMs: 3500 }
  },


  gullible: {
    messageText: () => `at this point I honestly feel bad about taking advantage of your gullible ass`,
    followUp: { messageCode: 'littleSomething', waitMs: 4500 }
  },


  littleSomething: {
    messageText: () => `I just sent you a little something to remind you of what a complete and utter moron you are.`,
    responseHandler: () => 'guilty'
  },


  guilty: {
    messageText: () => `at this point i feel guilty taking more of your money, but don't let that stop you from sending lol`,
    responseHandler: () => 'startOver'
  },


  startOver: {
    messageText: () => `If you really want we can just start over LOL, but i'm sure as hell done sending you back stuff though`,
    responseHandler: (response, ctx) => {
      ctx.state.sentFromPreviousRounds = ctx.state.totalPaid

      return 'steviep'
    }
  },

}

export const KatChat = new MessageHandler('katFischer', KatMessages, 'START')






