import { isYes, isNo, isGreeting, createEvent, MessageHandler } from '../state/conversationRunner.js'
import {getUserData, genderSwitch } from '../state/profile.js'
import {provider, bnToN} from '../eth.js'
import {tributeLS} from '../state/tributes.js'



/*

Testimonials
- ""
- ""

- ""
- " "
-
-

*/



export const KatProfile = {
  name: 'katFischer',
  startingVisibility: 'hidden',
  domType: 'Role-Play',
  order: 13,
  age: 23,
  distance: 69,
  gender: 'Female',
  display: 'f',
  maxPhotos: 3,
  voice: {
    lang: 'en-US',
    name: 'Shelly'
  },
  description: `I'm just doing my job`,
  testimonials: [
    {
      review: `I got my wallet drained within 30 minutes of talking to this dom, along with my balls`
    },
    {
      review: `I don't trust Kat. She just messaged me out of the blue and thought I was someone else. This seems like a scam`
    },

    {
      review: `DON'T TRUST KAT! This is a scam. classic pig butchering. first she fattens you up, and then she slaughters you`
    },
    {
      review: `nothing gets me hotter than some good old fashioned catfish role playing, and Kat's a real pro! for a second I thought I was really being scammed!`
    },
    {
      review: `scam`
    },
    {
      review: `I don't agree with the rest of the comments here. Kat was really sweet to me.`
    },
    {
      review: `cut the girl some slack. she's jsut doing her job!`
    },
    {
      review: `I just sent katFischer 0.069 ETH!`
    },
    {
      review: `not knowing who i'm actually talking to gets me so fucking hot. guy, girl, robot, whatever! just knowing that they're sitting there laughing at me is a huge thrill 🤤`
    },
    {
      review: `Not even cat fishers want to match with me on dating apps, so at least this is an improvement`
    },
    {
      review: `I feel like the best thing to do in these scenarios is to just not engage. Most internet scammers are really people who have been sold into debt bondage and don't have a choice except to play along. It doesn't matter how hot you or I think it is, it's usually not consensual, and that makes it not right`
    },
  ]
}




const fu = (messageCode, waitMs=2000) => ({ messageCode, waitMs })



export const KatMessages = {
  TYPING_SPEED: 1,

  async __contract(provider) {
    return await provider.domContract('katFischer')

  },
  START: {
    responseHandler: `steviep`
  },

  steviep: {
    messageText: `Hello, Mr. Steviep! This is Katrina, and I have those documents you wanted signed.`,
    responseHandler: 'sorry'
  },

  sorry:   {
    messageText: `You're not @steviep?`,
    responseHandler: 'typingError'
  },

  typingError: {
    messageText: `Oh my, I'm so sorry. Your user names are so similar I must have made a typing error.`,
    followUp: { messageCode: 'funny', waitMs: 1000 }
  },
  funny: {
    messageText: `It's so funny that our paths should cross though.`,
    followUp: { messageCode: 'sexy', waitMs: 2000 }
  },
  sexy: {
    messageText: `You sound so sexy. We should have a conversation!`,
    responseHandler: 'girlfriend'
  },
  girlfriend: {
    messageText: `Do you have a girlfriend?`,
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
    messageText: () => `Well, she is very lucky to have someone as ${genderSwitch({m: 'handsome', f: 'beautiful', nb: 'attractive'})} as you!`,
    responseHandler: 'myPartner'
  },
  girlfriendNo: {
    messageText: `Oh really?`,
    responseHandler: 'myPartner'
  },
  myPartner: {
    messageText: () => `I'm single. My ${genderSwitch({m: 'boyfriend', f: 'girlfriend', nb: 'romantic partner'})} just dumped me last week. I've been soooo horny since then. I don't know what to do with myself.`,
    responseHandler: 'thankful'
  },
  thankful: {
    messageText: () => `I'm so thankful that we have gotten to know each other like this. I wish we could meet in person, but ${getUserData().location} is so far away from where I live.`,
    followUp: { messageCode: 'busTicket', waitMs: 3000 }
  },

  busTicket: {
    messageText: `I wish I could afford a bus ticket to get there, but I sadly don't have any money left. My last ${genderSwitch({m: 'boyfriend', f: 'girlfriend', nb: 'romantic partner'})} took all of it when ${genderSwitch({m: 'he', f: 'she', nb: 'they'})} left me! Can you believe it?`,
    responseHandler: 'ifOnly'
  },
  ifOnly: {
    messageText: `If only there was something we could do...`,
    event: 'firstSendEvent',
    responseHandler: 'sendReq1'
  },

  sendReq1: {
    messageText: (ur, ctx) => `Well, would you be okay with lending me ${ctx.global.premium * 0.01} ETH, just for a bus ticket? I'll pay you back as soon as I get my next paycheck.`,
    event: 'firstSendEvent',
    followUp: { messageCode: 'sendReqFollowup1', waitMs: 500 }

  },
  sendReqFollowup1: {
    messageText: `No, wait... I can't take any money from you. I'm ashamed for even asking!`,
    event: 'firstSendEvent',
    responseHandler: 'thenAgain'
  },

  thenAgain: {
    messageText: `But then again, we can't stop thinking about each other. If I can't see you soon I might die!`,
    event: 'firstSendEvent',
    responseHandler: 'convinced'
  },


  firstSendEvent: createEvent(0.01, {
    primary: { messageCode: 'firstSendPause', waitMs: 100, ignoreType: true},
    wait: fu('stillThere', 2000),
    notEnough: fu('needMore', 4000)
  }),


  convinced: {
    messageText: (ur, ctx) => `Okay, I'm convinced. Send me the ${ctx.global.premium * 0.01} ETH, and I'll use it to buy a bus right away!`,
    event: 'firstSendEvent',
    responseHandler: async (ur, ctx, contract, provider) => {
      if (!provider.isWeb3()) return 'noWeb3'
      const isConnected = await provider.isConnected()
      if (isConnected) return 'req1a'
      else return 'needConnect'
    }
  },

  noWeb3: {
    messageText: `You don't have a web3 wallet?`,
    responseHandler: 'noWeb3_2'
  },

  noWeb3_2: {
    messageText: (ur, ctx) => `Oh no, you should install one so you could send me ${ctx.global.premium * 0.01} ETH`,
    responseHandler: 'req1a'
  },

  needConnect: {
    messageText: 'You might need to connect your wallet first though',
    responseHandler: 'req1a',
  },

  req1a: {
    messageText: `I'll be sooo thankful, and I can make it worth your while 😉`,
    event: 'firstSendEvent',
    responseHandler: 'req1b',
  },

  req1b: {
    messageText: `Even thinking about doing that to you makes me so hot`,
    event: 'firstSendEvent',
    responseHandler: 'req1c',
  },

  req1c: {
    messageText: `I'm sorry, I'm so hot and flustered that I can't concentrate until I'm on the bus to come see you`,
    event: 'firstSendEvent',
    responseHandler: 'req1d',
  },

  req1d: {
    messageText: (ur, ctx) => `I think you can send it by typing "<code>$sexy send katFischer ${ctx.global.premium * 0.01}</code>", but without the quotes, and then pressing enter`,
    event: 'firstSendEvent',
    responseHandler: 'req1a',
  },

  stillThere: {
    messageText: `Are you still there baby? I can't stop thinking about you`,
    event: 'firstSendEvent',
    responseHandler: 'req1d',
  },

  needMore: {
    messageText: (ur, ctx) => `I'm sorry, but I need ${ctx.global.premium * 0.01} for the bus ticket`,
    event: 'firstSendEvent',
    responseHandler: 'req1d',
  },

  firstSendPause: {
    messageText: () => ``,
    responseHandler: 'youGotMe',
    ignoreType: true,
    ignoreSend: true,
  },

  youGotMe: {
    messageText: `Okay, okay, you got me.`,
    followUp: { messageCode: 'katherine', waitMs: 3000 }
  },

  katherine: {
    messageText: `My name's not Katrina. It's Katherine.`,
    followUp: { messageCode: 'extractMoney', waitMs: 4000 }
  },

  extractMoney: {
    messageText: `And yeah... this is all just a scam to extract money from you.`,
    responseHandler: 'asshole'
  },

  asshole: {
    messageText: `I know this doesn't make it any better, but it wasn't even my idea. My boss is a real fucking asshole. ${genderSwitch({m: `He's`, f: `She's`, nb: `They're`})} the one making me do it. And what am I going to do, quit? I can't afford that. I really need this job.`,
    responseHandler: (response, ctx) => {
      ctx.state.suspectResponse = response
      return 'honestWithYou'
    }
  },

  honestWithYou: {
    messageText: `I'll be completely honest with you: my ex <em>was</em> a total scumbag, and ${genderSwitch({m: `he`, f: `she`, nb: `they`})} just left me in a pretty shitty financial place. I wouldn't be doing this if I didn't <em>really</em> need the money.`,
    followUp: { messageCode: 'noOptions', waitMs: 3000 }
  },

  noOptions: {
    messageText: `I don't feel good about it, but I don't have any options left. My ${genderSwitch({m: `dad`, f: `mom`, nb: `mom`})}'s last medical bill pretty much cleaned out my bank account, and I'm already behind two months on rent. `,
    followUp: { messageCode: 'zeroReason', waitMs: 3000 }
  },

  zeroReason: {
    messageText: (ur, ctx) => `Look, I know you have absolutely zero reason to trust me, but sending me another ${ctx.global.premium * 0.01} ETH would really mean a lot to me`,
    followUp: { messageCode: 'trulySorry', waitMs: 2000 }
  },

  trulySorry: {
    messageText: `Either way, just know that I'm truly sorry, and it brings me no pleasure to do any of this.`,
    followUp: { messageCode: 'meanALot', waitMs: 2000 }
  },

  secondSendEvent: createEvent(0.02, {
    primary: fu('jesusChrist', 5000),
    wait: fu('beggingYou', 100),
    notEnough: fu('stillMore', 4000)
  }),


  meanALot: {
    messageText: `But sending me a bit more ETH would really mean a lot to me.`,
    event: 'secondSendEvent',
    responseHandler: 'dontDeserveIt',
  },

  dontDeserveIt: {
    messageText: `I know, I don't deserve it, but I don't have any other options`,
    event: 'secondSendEvent',
    responseHandler: 'only01'
  },

  only01: {
    messageText: (ur, ctx) => `It's only ${ctx.global.premium * 0.01} ETH. That's nothing for you, but it would make such a huge difference to me`,
    event: 'secondSendEvent',
    responseHandler: 'beggingYou'
  },

  beggingYou: {
    messageText: `Please? I'm begging you.`,
    event: 'secondSendEvent',
    responseHandler: 'dontDeserveIt'
  },

  stillMore: {
    messageText: (ur, ctx) => `That's very generous of you, but I really need ${ctx.global.premium * 0.01} ETH`,
    event: 'secondSendEvent',
    responseHandler: 'dontDeserveIt'
  },

  jesusChrist: {
    messageText: `lol, jesus christ`,
    followUp: { messageCode: 'fuckingMoron', waitMs: 1000 }
  },

  fuckingMoron: {
    messageText: `what a fucking moron`,
    followUp: { messageCode: 'fellForIt', waitMs: 2000 }
  },

  fellForIt: {
    messageText: `i can't believe you fell for all that shit 🤣`,
    responseHandler: 'prettyStupid'
  },

  prettyStupid: {
    messageText: `you must feel pretty stupid right now`,
    followUp: { messageCode: 'haveFunExplaining', waitMs: 1000 }
  },

  hilarious: {
    messageText: (r, ctx) => `this is hilarious. I thought you knew for sure when you said "${ctx.state.suspectResponse}"`,
    followUp: { messageCode: 'haveFunExplaining', waitMs: 2000 }
  },

  haveFunExplaining: {
    messageText: (r, ctx) => `have fun explaining to your ${ctx.state.hasGirlfriend ? 'girlfriend' : 'friends'} what a brain dead moron you are lol`,
    responseHandler: () => 'stillHere'
  },

  stillHere: {
    messageText: `why are you even still here? do you think i'm going to send this money back to you?`,
    followUp: { messageCode: 'fuckNo', waitMs: 2500 }

  },

  fuckNo: {
    messageText: `lol, fuck no! that money's gone for good, and sitting comfortably in my wallet`,
    responseHandler: 'sobStory'
  },


  sobStory: {
    messageText: `would it help if I wrote another sob story?`,
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
    messageText: `I nEeD sOmE mOnEy To CUM hAvE SEX wItH U bAAAAaaabEEeeEEeEEE 😂`,
    followUp: { messageCode: 'yesSobStory2', waitMs: 2000 }

  },

  yesSobStory2: {
    messageText: `you fucking dumbass`,
    responseHandler: 'tellYouWhat'
  },


  noSobStory: {
    messageText: `great, why don't we cut the formalities and you just send me some more money? lol`,
    responseHandler: 'tellYouWhat'
  },


  unsureSobStory: {
    messageText: `I guess you're too dumb to even answer my questions lol`,
    responseHandler: 'tellYouWhat'
  },




  tellYouWhat: {
    messageText: `okay, I'll tell you what.`,
    followUp: { messageCode: 'reasonableGirl', waitMs: 2000 }
  },

  reasonableGirl: {
    messageText: (ur, ctx) => `I'm a reasonable girl. send me another ${ctx.global.premium * 0.01} so I know you're serious, and then I'll send it all back to you.`,
    followUp: { messageCode: 'processingFee', waitMs: 2000 }
  },

  thirdSendEvent: createEvent(0.03, {
    primary: fu('omfg', 5000),
    notEnough: fu('niceTry', 2000)
  }),


  processingFee: {
    messageText: `minus a small processing fee, of course, for wasting my time with your sheer idiocy`,
    event: 'thirdSendEvent',
    responseHandler: 'iDontSee'
  },


  iDontSee: {
    messageText: (ur, ctx) => `I don't see that ${ctx.global.premium * 0.01} ETH in my wallet`,
    event: 'thirdSendEvent',
    responseHandler: 'iDontThinkSo'
  },


  iDontThinkSo: {
    messageText: (ur, ctx) => `Let's see... is that ${ctx.global.premium * 0.01} ETH in my wallet? I don't think so`,
    event: 'thirdSendEvent',
    responseHandler: 'allDay'
  },


  allDay: {
    messageText: `I can do this all day`,
    event: 'thirdSendEvent',
    responseHandler: 'iDontSee'
  },


  niceTry: {
    messageText: `Nice try, but that's not enough`,
    event: 'thirdSendEvent',
    responseHandler: 'iDontSee'
  },

  omfg: {
    messageText: `OMFG HAHAHA`,
    followUp: { messageCode: 'fellForItAgain', waitMs: 2000 }
  },


  fellForItAgain: {
    messageText: `you fell for it again! I'm DYING 💀💀💀`,
    followUp: { messageCode: 'fuckingLoser', waitMs: 2000 }
  },


  fuckingLoser: {
    messageText: `what. a. fucking. loser.`,
    responseHandler: 'humanATM'
  },


  humanATM: {
    messageText: `you truly are a human ATM`,
    followUp: { messageCode: 'gullible', waitMs: 3500 }
  },


  gullible: {
    messageText: `at this point I honestly feel bad about taking advantage of your gullible ass`,
    followUp: { messageCode: 'littleSomething', waitMs: 4500 }
  },


  littleSomething: {
    messageText: `I just sent you a little something to remind you of what a complete and utter moron you are.`,
    responseHandler: 'guilty'
  },


  guilty: {
    messageText: `at this point i feel guilty taking more of your money, but don't let that stop you from sending lol`,
    responseHandler: 'startOver'
  },


  startOver: {
    messageText: () => `If you really want we can just start over LOL, but i'm sure as hell not sending you any money back`,
    responseHandler: async (ur, ctx, contract) => {
      await tributeLS.resetAllTributeAdjustment('katFischer')

      return 'steviep'
    }
  },

}

export const KatChat = new MessageHandler(KatProfile, KatMessages)






