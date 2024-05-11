/*

TODO
  Challenge:
    - game where she pings you at various points, you need to respond within 1 minute
    go to casino and lose money
      "Okay, I'm in the casino right now. Just sat down at a slot machine"
      "Oops, I lost."





  - be a good little money slut


  - money only has value because you give it to me (taxes)



  - you are an inanimate object to me
  - you are a NPC

  - if talked to AI, mention relapsing

  - incorporate dialogue at bottom

  - https://www.tiktok.com/@findomgoddesssj


  "You know, I have to admit... You're really fucking boring"

  "loser"

  Get cucked by vinceslickson/steviep. "They can provide me the pleasure that you never could because you're inadequate."; "he can make more money than you ever could"
    If woman: how does it feel to have a man make more than you?


  - let's keep something in mind: I don't owe you anything. You pay me compensation for having to talk to you. Consider it an "idiot tax". You're paying for the privilege ofspeaking to me
  - i'm in control of this conversation, not you


https://www.pornhub.com/view_video.php?viewkey=654837492a1db

  You will completely lose everything. You will be in complete financial ruin. You will go bankrupt.
  You will take out loans because you're so desperate and obsesses. You will borrow money from people you love and care about.
  You'll take money away from your own future. Just to feed your findom addiction. You're sick. You know that.
  A tribute is a sign of respect and admiration
  Financial abuse gives you such a headrush. Such a spike in dopamine. All those happy chemicals.





Testimonial:
  "i dont deserve my money. Queen deserves every cent"

  -

  - Men are truly the weaker of the two sexes...

*/







import { isYes, isNo, isGreeting, isMean, isMatch, diatribe, createEvent, MessageHandler } from '../state/conversationRunner.js'
import {getUserData, genderSwitch } from '../state/profile.js'
import {fromWei} from '../eth.js'



const fu = (messageCode, waitMs=2000) => ({ messageCode, waitMs })

export const QueenProfile = {
  name: 'QueenJessica',
  startingVisibility: 'offline',
  domType: 'Hard',
  order: 6,
  age: 29,
  distance: 13,
  gender: 'F',
  display: 'f',
  maxPhotos: 4,
  description: `I'm the reason your wife is going to leave you 💸 #findom 👑 #brat 🙇‍♀️🙇🙇‍♂️ #spoilme 🥵💦 #paypig 🐷
  <br/>💵 ${MessageHandler.globalCtx.premium * 0.01} ETH tribute to talk 💵
  `,
  testimonials: [
    {
      name: '0x',
      review: `QueenJessica completely ruined my life by extracting at least five figures from my wallet over the course of a weekend. When my wife found out she left me and took the kids. It was so hot. I don't think I've ever cum harder in my life`,
    },
    {
      name: '0x0',
      review: `I have a tiny pp and my huge bank account that belongs soley to Queen 🙏`,
    },
    {
      name: '0x1',
      review: `Queen completely ruined my life 💦😍`,
    },

    {
      name: '0x',
      review: `I like putting the pussy on a pedastal.`,
    },

    {
      review: `I'm a little sissy boy oink oink oink`
    },

    {
      name: '0x',
      review: `I haven't lost this much money since I aped into Fake Internet Money in 2021`,
    },

    {
      name: '0x',
      review: `She makes me feel useful. Sending to Queen gives my life purpose`,
    },

    {
      review: `it's soooo hot to see these amazing, strong women empowered to do this. sex work is work! it's a free market, and these women are making the decisions that best lead to their success. i see some of the other subs here don't like it, and that's too bad! Personally, i fund it unbearably hot watching these women work their magic. I just wish that I was able to do the same`
    },

    {
      review: `There's just so much pressure to be a man and keep it together these days. I want someone to absolutely fucking ruin me`
    }
  ]
}



const QueenMessages = {
  TYPING_SPEED: 1,

  START: {
    responseHandler: `hello`,
    ignoreSend: true,
    ignoreType: true
  },

  async __contract(provider) {
    return await provider.domContract('QueenJessica')

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
    messageText: `Hello, idiot`,
    followUp: { messageCode: 'helloResponseRouter', waitMs: 2000 },
  },




  helloResponseRouter: {
    messageText: '',
    ignoreType: true,
    async followUp(ur, ctx, contract, provider) {
      if (!provider.isWeb3 && !ctx.state.rejected1) return fu('helloResponse1', 1)
      else if (!ctx.global.isConnected && !ctx.state.rejected2) return fu('helloResponse2', 1)
      else if (await provider.getETHBalance(ctx.global.connectedAddr) < 0.25 && (
        !ctx.state.rejected3
        || bnToN(await contract.tributes(ctx.global.connectedAddr)) >= 0.01
      )) return fu('helloResponse3', 1)
      else if (bnToN(await contract.tributes(ctx.global.connectedAddr)) < 0.01 && !ctx.state.rejected4) return fu('helloResponse4', 1)
      else if (bnToN(await contract.tributes(ctx.global.connectedAddr)) >= 0.01) return fu('serveMe', 1)
      else return fu('helloResponseNothing', 1)
    }
  },

  helloResponseNothing: {
    ignoreType: true,
    responseHandler: 'helloResponseRouter'
  },

  ...diatribe('helloResponse1', [
    `Are you lost?`,
    `You don't even have a web3 browser`,
    `What a fucking loser 😂`
  ], {
    responseHandler(ur, ctx) {
      ctx.state.rejected1 = true
      return 'helloResponseRouter'
    }
  }),

  ...diatribe('helloResponse2', [
    `Ha, you think you can talk to me without even connecting your wallet?`,
    `You're out of your league`
  ], {
    responseHandler(ur, ctx) {
      ctx.state.rejected2 = true
      return 'helloResponseRouter'
    }
  }),

  ...diatribe('helloResponse3', [
    async (ur, ctx, contract, provider) => `${await provider.getETHBalance(ctx.global.connectedAddr)} ETH? I don't have time for poor people like you`,
    `Come back when you have at least 0.25 ETH in your wallet to show me`,
    `Go talk to @VinceSlickson. Maybe he can help you get some cash 🤣`,
  ], {
    responseHandler(ur, ctx) {
      ctx.state.rejected3 = true
      return 'helloResponseRouter'
    }
  }),

  ...diatribe('helloResponse4', [
    `Did you even read my profile?`,
    (ur, ctx) => `What don't you understand about "${ctx.global.premium * 0.01} ETH tribute to talk"?`
  ], {
    responseHandler(ur, ctx) {
      ctx.state.rejected4 = true
      return 'helloResponseRouter'
    }
  }),


  serveMe: {
    messageText: `Are you ready to serve me today?`,
    responseHandler: ur => isYes(ur) ? 'serveMeYes' : 'serveMeNo'
  },

  serveMeNo: {
    messageText: (ur, ctx) => [`Wrong answer, idiot`, 'Try again', `I don't have time for this`][ctx.state.wrongAnswers || 0],
    responseHandler: (ur, ctx) => {
      ctx.state.wrongAnswers = (ctx.state.wrongAnswers||0) + 1
      return isYes(ur) ? 'serveMeYes' : 'serveMeNo'
    }
  },

  serveMeYes: {
    messageText: `Good`,
    followUp: fu('budget')
  },


  budget: {
    messageText: `Do you have a budget you're trying to stick to?`,
    responseHandler: ur => isNo(ur) ? 'budgetNo' : 'budgetYes'
  },

  ...diatribe('budgetYes', [
    `Well too bad lol`,
     async (ur, ctx, contract, provider) => `I see ${await provider.getETHBalance(ctx.global.connectedAddr)} ETH left in your wallet. That's your budget`,
     `The real question is, are you going to send it to me all at once? Or am I going to drain you slowly and <em>really</em> savor it?`
  ], {
    responseHandler: 'rhetorical'
  }),

  ...diatribe('budgetNo', [
    `That's what I thought`,
     `The real question is, are you going to send it to me all at once? Or am I going to drain you slowly and <em>really</em> savor it?`
  ], {
    responseHandler: 'rhetorical'
  }),

  ...diatribe('rhetorical', [
    `That was a rhetorical question, dummy`,
     `I don't care what you think`,
     `You're basically just an NPC living in my world, and your only function is to send to me whenever I feel like it`,
     `If you're not sending then you don't fucking exist`,
     `In fact, I think it's time to send again right now`,
     (ur, ctx) => `Let's do ${ctx.global.premium * 0.02} this time`
  ], {
    responseHandler: 'timeToSend1',
    event: 'send1',
  }),

  send1: createEvent(0.02, {
    primary: fu('congrats', 8000)
  }),

  timeToSend1: {
    messageText: `You thought I was going to be <em>cheap</em>? 🤣`,
    event: 'send1',
    responseHandler: 'timeToSend5'
  },

  timeToSend2: {
    messageText: `I don't want to hear any fucking sass`,
    event: 'send1',
    responseHandler: 'timeToSend3'
  },


  timeToSend3: {
    messageText: `I know how stupid you are, so if you forgot how to send then don't waste my time. Ask someone else`,
    event: 'send1',
    responseHandler: 'timeToSend4'
  },

  timeToSend4: {
    messageText: `Remember: if you're not sending then you don't fucking exist`,
    event: 'send1',
    responseHandler: 'timeToSend5'
  },

  timeToSend5: {
    messageText: () => `What part of "send me ${MessageHandler.globalCtx.premium * 0.02} ETH" do you not understand?`,
    event: 'send1',
    responseHandler: 'timeToSend2'
  },


  congrats: {
    messageText: `Congrats, idiot. You bought yourself some more time before I stop caring about you`,
    followUp: fu('tellMeSomething')
  },

  tellMeSomething: {
    messageText: `I hope no one else has to put up with your stupidity`,
    followUp: fu('married')
  },


  married: {
    messageText: `Are you married?`,
    responseHandler: (ur, ctx) => {
      ctx.state.isMarried = isYes(ur)
      return isYes(ur) ? 'marriedYes' : 'marriedNo'
    }
  },

  marriedYes: {
    messageText: `Husband? Wife?`,
    responseHandler: (ur, ctx) => {
      if (isMatch(ur, ['husband', 'boy', 'boyfriend', 'male', 'man', 'masc', 'transmasc', 'masculine', 'ftm'])) ctx.state.partnerGender = 'm'
      else if (isMatch(ur, ['wife', 'girl', 'girlfriend', 'female', 'woman', 'fem', 'transfem', 'feminine', 'mtf'])) ctx.state.partnerGender = 'f'
      else ctx.state.partnerGender = 'nb'
      return 'leaveYou'
    }
  },

  marriedNo: {
    messageText: `Boyfriend? Girlfriend?`,
    responseHandler: (ur, ctx) => {
      if (isNo(ur) || isMatch(ur, ['single', 'alone', 'nothing', 'i wish'])) return 'isSingle'
      if (isMatch(ur, ['husband', 'boy', 'boyfriend', 'male', 'man', 'masc', 'transmasc', 'masculine', 'ftm'])) ctx.state.partnerGender = 'm'
      else if (isMatch(ur, ['wife', 'girl', 'girlfriend', 'female', 'woman', 'fem', 'transfem', 'feminine', 'mtf'])) ctx.state.partnerGender = 'f'
      else ctx.state.partnerGender = 'nb'
      return 'leaveYou'
    }
  },

  ...diatribe('leaveYou', [
    (ur, ctx) => `Well, ${{ m: `he's`, f: `she's`, nb: `they're`}[ctx.state.partnerGender]} about to leave you`,
    (ur, ctx) => `You thought ${{ m: `he was`, f: `she was`, nb: `they were`}[ctx.state.partnerGender]} mad after you lost all your money on your dumb little crypto investments? That was nothing`,
    `I'm going to absolutely <em>ruin</em> you`,
    `And you're going to love it`,
    `I won't feel any guilt about it either`,
  ], {
    responseHandler: 'anyKids'
  }),

  anyKids: {
    messageText: `Shut up. Next question: Do you have any kids?`,
    responseHandler: ur => isYes(ur)
      ? 'kidsYes'
      : isNo(ur) ? 'kidsNo' : 'kidsMaybe'
  },


  kidsYes: {
    messageText: `Well hopefully they're looking forward to community college because I'm about to drain your family's bank account`,
    followUp: fu(`collegeFund`)
  },

  collegeFund: {
    messageText: `Oops. No more college fund for little Jimmy. If he wants to pull your family out of its suffocating mountain of debt, he'll have to get used to the idea of finding a nice sugar daddy/mommy who will pay for it all`,
    followUp: fu('yourFault')
  },

  yourFault: {
    messageText: `And it'll all. be. your. fault.`,
    responseHandler: 'iDontCare'
  },

  kidsNo: {
    messageText: `Good, because you wouldn't be able to support them anyhow when I'm done with you`,
    responseHandler: 'iDontCare'
  },

  kidsMaybe: {
    messageText: (ur, ctx) => `It doesn't matter. Kids or no kids, I'm the most important person in your life now`,
    responseHandler: 'iDontCare'
  },


  ...diatribe('isSingle', [
    `That's probably for the best lol`,
    () => `I don't see why anyone would would want to date a little sissy cuck ${genderSwitch({m: 'boy', f: 'girl', nb: 'degen'})} like you`,
    `You don't deserve any love`,
    // `That is, not unless you make yourself useful and pay up`,
    // `Keep that in mind: if you're not sending me money you don't exist.`,
  ], {
    responseHandler: 'iDontCare'
  }),

  iDontCare: {
    messageText: `iDontCare TODO`
  },



  // send1: createEvent(0.02, {
  //   main: 'congrats'
  // }),



  // timeToSend: {
  //   messageText: `In fact, I think it's time for you to send right now.`,
  //   followUp: fu('timeToSend2')
  // },

  // timeToSend2: {
  //   messageText: () => `Let's say... ${MessageHandler.globalCtx.premium * 0.02} this time`,
  //   event: 'send1',
  //   responseHandler: 'timeToSend3'
  // },










  // TODO: why don't you send 0.01 ETH to my wallet and see what happens?
  //       have you checked your wallet to see what's there?
  //       that's right, nothing 😈
  //       you're going to need to send a lot more than that to get an nft from me






  /*

    do you know why you like sending to me?

    (if man)
      because men make $1 for every $0.70 a woman makes
      and you know, deep down, that this is to keep women down
      you know that women are the superior sex

    (if womane)
      because you're a woman
      you see men making $1 for your $0.70
      the only way for you to advance in your career is to perform sexual favors for them
      so whenever you see a strong, beautiful woman like me making bank you swoon






  */






  // congrats: {
  //   messageText: `Congrats, idiot. You just bought yourself a few more minutes of my precious time. Do you have any questions?`,
  //   responseHandler: 'noQuestions'
  // },

  noQuestion: {
    messageText: `Well, I don't care lol`,
    followUp: fu('lackOfJudgement')
  },

  lackOfJudgement: {
    messageText: `The fact that you're even talking to me shows a complete lack of judgement on your part. So why would I listen to anything you have to say?`,
    followUp: fu('rhetorical', 6000)
  },

  // rhetorical: {
  //   messageText: `Don't answer that. That was a rhetorical question, idiot.`,
  //   responseHandler: 'loveMakingMeRich'
  // },





// TODO: incorporate all of this


  loveMakingMeRich: {
    messageText: `You just love making me rich, don't you?`,
    responseHandler: ur => isYes(ur) ? 'loveMakingMeRichYes' : 'loveMakingMeRichNo'
  },

  loveMakingMeRichNo: {
    messageText:`Is that so? I beg to differ`,
    followUp: fu('doSoMuch')
  },

  loveMakingMeRichYes: {
    messageText:`Of course you do`,
    followUp: fu('doSoMuch')
  },


  ...diatribe('doSoMuch', [
    `You could do so much with your money`,
    `You could spend it on your loved ones, or use it to better your own life`,
    `You could donate it to charity, make the world a better place, help those in need...`,
    `But no. What do you do with it? You chose to give it to <em>me</em> instead. You decided to throw it all away for my benefit because that's what gets your idiot brain off`,
    `And I'm here for it. We both know that I'll make better use of your money than you ever would.`,
    `I deserve it and you don't `
  ], {
    responseHandler: 'tooStupid'
  }),











  ...diatribe('tooStupid', [
    `Do you know why you love sending to me? It's because you're too stupid to make money`,
    `And deep down you know that you're too much of a degenerate to even hold onto the money you already have`,
    `So you think: why not give it to my Queen? At least I can make her rich`,
    // `You tell yourself that you play this crypto game to get generational wealth, but you know that's really bullshit.`
    // `Why do you want to make money in crypto? To give to me. I deserve it, and you want ot make me happy`
    'TODO'
  ])








// I'll be honest, you sound like a complete degenerate loser
// you know you're a slave to your crypto addiction
// And yet, you're stupid enough to come talk to me
// Knowing damn well that I'm about to make it worse
  // dontBother: {

  // }






}


function firstPaymentEvent() {
  return fu('loveMakingMeRich')
}



/*

Thought Prompts:
  - this is really about ruining your life, not just with findom, but also with gambling and obsession. crypto. losing track of everything else going on due to one singular goal


  - gambling
  - hard feminism/misandry
  - bratty
  - life ruin fetish
  - humiliation
  - mean
  - degrading
  - hello idiot
    - you think you're worthy of talking to me? *I don't think so*
  - royalty power fantasy
  - influencer
  - parasocial
  - shows off how much money she's made
  - https://twitter.com/Aella_Girl/status/1750722719438536825






Do you think you deserve that money in your wallet?
I don't think so

where do you think all that money came from?
it came from exploiting the local poor
it came from extracting

But that's my job. I'm the only one who's allowed to exploit and etract money


if (m)
  There's nothing hotter than a man bowing down to a woman


95% of the largest companies in this country are run by men
women only make $0.70 for every dollar a man makes
so the way i see it, 30% of your wallet is mine
sex work is work








I want you to spend until it hurts




Who said you're entitled to my time and attention? You have to earn that




Hmm, I dunno. I only see X ETH in that wallet. That's a little on the 🤏 side.
I'm a bit of a size queen.



Unless you're sending me money you don't exist to me
Which, I'm sure is an idea you're very familiar with
Unless you've been too stupid to figure out that that's what all of your favorite NFT creators think of you
Not to mention all of your stupid little alpha groups designed for beta cucks like you




I can tell you want to lose it all
If you've ever wanted to be in a porno, then now's your chance
Because you're about to star in some epic loss porn
Are you ready to get absolutely fucking rekt?






This isn't fantasy land, sweetheart. The real world has consequences










crypto roulette, deposit money, and it's either gone or user gets it back

let's play a game. you send me money, and i'll manage a shitcoin for you
  coin immediately goes down
  the longer you wait the more you lose
  ""


oooo, yeah, you're a nasty fucking degen, aren't you.


"Do you know wha tI'm going to do with this ETH? I'm going to buy a crypto punk and fucking burn it"







https://twitter.com/GoddessAva22



https://twitter.com/hazelownsyou



https://www.reddit.com/r/findomsupportgroup/comments/19ahz41/unpopular_opinion_post_nut_clarity/
  Why the hell are men running the world if they cannot operate their brains at the same time as their genitals?
  Can you imagine vulva-owners blaming our genitals in the same way?
  I am however, socially encouraged to play babysitter to men-children who get to decide on everything from whether I earn the same amount as them, to whether I can obtain free contraception.


cuckholding: watch me make money


















Now that that's out of the way do you have any questions for me?

I don't care. I don't need to answer any of your stupid questions

The fact that you're even talking to me shows a complete lack of judgement on your part. So why would I listen to anything you have to say?







if less than 1 eth in your wallet:
  Didn't you read my profile, paypiggy? I'm not talking to you until you pay a $0.05 tribute
    I don't see 0.05 eth in my wallet
  ha, really? I don't have time for anyone with les than 1 eth in their wallet. have fun staying poor


you know, the rise of monogmous relationships can be directly tied to capitalism and property ownership. Many early, pre-aggricultural societies were primarily matriarchal.


  - won't respond to you if you give her backtalk. either play her game or don't
  - "I don't have time for your shit. whay are you even talking to me?"
  -
  - "Now say: thank you GoddessJessica"
  - "LOL. I can't believe how much money you've given me, you fucking idiot. what a goddamn loser. don't you have anything better to do?"
  - "I have a 0.099 unblock fee"
  - https://twitter.com/iwantnura/status/1667961128624836608




The problem with men is that they have idiotic standards of beauty
all they want are skinny bitches


https://twitter.com/GoddessLizzie3









https://twitter.com/iwantnura/status/1688496905519517697
  what makes you think i need another man in my life?
  men are the problem with this world
  the only way you can make yourself useful is by




[if interrupted]
  don't interrupt me when I'm speaking to you.

if i say something that doesn't respond to what you just said -- it isn't because i didn't understand it. it's because I didn't <em>want</em> to respond.
i want to talk about what i want to talk about.
in fact, if i ever so much as suspect that you're not paying attention and thoughtfully responding to every word i say, then i may stop responding to you all together.
and if you want a second chance do you know what you'll have to do to get me to respond?

that's right, you'll have to send.












wallet ratings - sort of like dick ratings, but based on what's in your wallet









you dont exist to me unless you're sending

*/


export const QueenChat = new MessageHandler(QueenProfile, QueenMessages)
