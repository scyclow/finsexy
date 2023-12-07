
const firstSendEvent = redirectTo => ctx => {
  // TODO if user waits too long, redirect to "Are you still there, baby? I can't stop thinking about you"
  if (ctx.state.totalPaid >= 0.01) {
    return { messageCode: redirectTo, waitMs: 0 }
  }
}

const secondSendEvent = redirectTo => ctx => {
  if (ctx.state.totalPaid >= 0.02) {
    return { messageCode: redirectTo, waitMs: 0 }
  }
}

const thirdSendEvent = redirectTo => ctx => {
  if (ctx.state.totalPaid >= 0.02) {
    return { messageCode: redirectTo, waitMs: 0 }
  }
}

const KatMessages = {
  START: {
    responseHandler: () => `steviep`
  },

  steviep: {
    messageText: () => `Hello, Mr. Steviep! This is Sophia, and I have those documents you wanted signed.`,
    responseHandler: () => 'sorry'
  },

  sorry:   {
    messageText: () => `You're not steviep?`,
    responseHandler: () => 'typingError'
  },

  typingError: {
    messageText: () => `Oh my, I'm so sorry. Your user names are so similar I must have made a typing error.`,
    followUp: { messageCode: 'funny', waitMs: 2000 }
  },
  funny: {
    messageText: () => `It's so funny that our paths should cross though.`,
    followUp: { messageCode: 'sexy', waitMs: 2000 }
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
    followUp: { messageCode: 'busTicket', waitMs: 3000 }
  },
  busTicket: {
    messageText: () => `I wish I could afford a bus ticket to get there, but I sadly don't have any money left. My last ${genderSwitch({m: 'boyfriend', w: 'girlfriend', nb: 'romantic partner'})} took all of it when ${genderSwitch({m: 'he', w: 'she', nb: 'they'})} left me! Can you believe it?`,
    responseHandler: () => 'ifOnly'
  },
  ifOnly: {
    messageText: () => `If only there was something we could do.`,
    followUp: { messageCode: 'soHot', waitMs: 1000 }
  },
  soHot: {
    messageText: () => `You're sooo hot, babe`,
    responseHandler: () => 'sendReq1'
  },
  sendReq1: {
    messageText: () => `Well, would you be okay with lending me 0.01 ETH, just for a bus ticket? I'll pay you back as soon as I get my next paycheck.`,
    followUp: { messageCode: 'sendReqFollowup1', waitMs: 1000 }

  },
  sendReqFollowup1: {
    messageText: () => `No, wait... I can't take any money from you. I'm ashamed for even asking!`,
    responseHandler: () => 'thenAgain'
  },

  thenAgain: {
    messageText: () => `But then again, we can't stop thinking about each other. If I can't see you soon I might die!`,
    responseHandler: () => 'convinced'
  },

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
    followUp: { messageCode: 'katherine', waitMs: 4000 }
  },

  katherine: {
    messageText: () => `My name's not Sophia. It's Katherine.`,
    followUp: { messageCode: 'extractMoney', waitMs: 2000 }
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
    followUp: { messageCode: 'noOptions', waitMs: 1000 }
  },

  noOptions: {
    messageText: () => `I don't feel good about it, but I don't have any options left. My ${genderSwitch({m: `dad`, w: `mom`, nb: `mom`})}'s last medical bill pretty much cleaned out my bank account, and I'm already behind two months on rent. `,
    followUp: { messageCode: 'zeroReason', waitMs: 8000 }
  },

  zeroReason: {
    messageText: () => `Look, I know you have absolutely zero reason to trust me, but sending me another 0.01 ETH would really mean a lot to me`,
    followUp: { messageCode: 'trulySorry', waitMs: 3000 }
  },

  trulySorry: {
    messageText: () => `Either way, just know that I'm truly sorry, and it brings me no pleasure to do any of this.`,
    followUp: { messageCode: 'meanALot', waitMs: 2000 }
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
    followUp: { messageCode: 'fuckingMoron', waitMs: 1000 }
  },

  fuckingMoron: {
    messageText: () => `what a fucking moron`,
    followUp: { messageCode: 'fellForIt', waitMs: 2000 }
  },

  fellForIt: {
    messageText: () => `i can't believe you fell for all that shit 🤣`,
    responseHandler: () => 'prettyStupid'
  },

  prettyStupid: {
    messageText: () => `you must feel pretty stupid right now`,
    responseHandler: () => 'hilarious'
  },

  hilarious: {
    messageText: (r, ctx) => `this is hilarious. I thought you knew for sure when you said "${ctx.state.suspectResponse}"`,
    followUp: { messageCode: 'haveFunExplaining', waitMs: 3000 }
  },

  haveFunExplaining: {
    messageText: (r, ctx) => `have fun explaining to your ${ctx.state.hasGirlfriend ? 'girlfriend' : 'friends'} what a brain dead moron you are lol`,
    responseHandler: () => ''
  },

  x: {
    messageText: () => ``,
    responseHandler: () => ''
  },

  x: {
    messageText: () => ``,
    responseHandler: () => ''
  },




  // regretToInform: {
  //   messageText: () => `,
  //     <p>Dear ${getUserData().name},</p>
  //     <p>I regret to inform you that your federal income tax return for the year ending December 31, 2023 has been selected for examination. Our records indicate potential discrepancies and irregularities concerning your reported cryptocurrency transactions.</p>
  //     <p>The examination will focus primarily on the accuracy and completeness of the information provided regarding your cryptocurrency activities, including but not limited to the acquisition, disposition, and valuation of digital assets. It is imperative that you provide comprehensive documentation, records, and details related to these transactions.</p>
  //   `,
  //   responseHandler: (userResponse) => `needsTribute`
  // }

}

const KatChat = new MessageHandler('katFischer', KatMessages, 'START')


if (!KatChat.ctx.history.length && !KatChat.ctx.eventQueue.length) {
  KatChat.next('', 'steviep')
}



/*





*/