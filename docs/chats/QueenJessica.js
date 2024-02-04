







import { isYes, isNo, isGreeting, isMean, diatribe, createEvent, MessageHandler } from '../state/conversationRunner.js'
import {getUserData, genderSwitch , interestedSwitch} from '../state/profile.js'
import {fromWei} from '../eth.js'



const fu = (messageCode, waitMs=3000) => ({ messageCode, waitMs })

export const QueenProfile = {
  name: 'QueenJessica',
  age: 29,
  distance: 13,
  gender: 'F',
  maxPhotos: 4,
  description: `
    <p>I'm the reason your wife is going to leave you 💸 #findom 👑 #brat 🙇‍♀️🙇🙇‍♂️ #spoilme 🥵💦 #paypig 🐷</p>
    <p>💵 ${MessageHandler.globalCtx.premium * 0.01} ETH tribute to talk 💵</p>
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
      name: '0x',
      review: `I haven't lost this much money since I aped into Fake Internet Money in 2021`,
    },
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
    followUp: { messageCode: 'helloResponse', waitMs: 2000 },
  },

  helloResponse: {
    async messageText(ur, ctx, contract, provider) {

      if (!ctx.global.isConnected) {
        return `Ha, you think you can talk to me without even connecting your wallet? `

      } else if (await provider.getETHBalance(ctx.global.connectedAddr) < 0.5) {
        return `${await provider.getETHBalance(ctx.global.connectedAddr)} ETH? I don't have time for poor people like you. Come back when you have at least 0.5 ETH in your wallet to show me.`

      } else if (contract) {
        const sendFilter = contract.filters.Send(ctx.global.connectedAddr)
        const sendEvents = await contract.queryFilter(sendFilter)
        const totalSent = sendEvents.reduce((sum, event) => sum + fromWei(event.args.amount), 0)
        if (totalSent >= ctx.global.premium * 0.01) {
          // return `You think you're worth my time just because you sent me ${totalSent} ETH?`
          return `Are you ready to serve me today?`
        } else {
          return `Did you even read my profile?`
        }
      } else {
        return `You think you deserve to talk to me? I don't think so`
      }
    },
    async followUp(ur, ctx, contract, provider) {
      if (!ctx.global.isConnected) {
        return fu('helloRejected1')
      } else if (await provider.getETHBalance(ctx.global.connectedAddr) < 1) {
        return fu('helloRejected2')
      } else if (contract) {
        const sendFilter = contract.filters.Send(ctx.global.connectedAddr)
        const sendEvents = await contract.queryFilter(sendFilter)
        const totalSent = sendEvents.reduce((sum, event) => sum + fromWei(event.args.amount), 0)
        if (totalSent < ctx.global.premium * 0.01) {
          return fu('helloRejected3')
        }
      }
    },
    async responseHandler(ur, ctx, contract, provider) {
      if (!ctx.global.isConnected || await provider.getETHBalance(ctx.global.connectedAddr) < 1) return

      if (ctx.global.isConnected) {
        const sendFilter = contract.filters.Send(ctx.global.connectedAddr)
        const sendEvents = await contract.queryFilter(sendFilter)
        const totalSent = sendEvents.reduce((sum, event) => sum + fromWei(event.args.amount), 0)
        if (totalSent >= ctx.global.premium * 0.01) {
          if (isYes(ur)) return 'serveMeYes'
          else return 'serveMeNo'
        }
      }
    }
  },

  helloRejected1: {
    messageText: `You're out of your league.`,
    responseHandler: 'helloResponse'
  },
  helloRejected2: {
    messageText: `Go talk to @VinceSlickson. Maybe he can help you get some cash`,
    responseHandler: 'helloResponse'
  },
  helloRejected3: {
    messageText: (ur, ctx) => `What don't you understand about "${ctx.global.premium * 0.01} ETH tribute to talk"?`,
    responseHandler: 'helloResponse'
  },

  helloAccepted: {
    messageText: `You're going to need to do more than that`,
    followUp: fu('serveMe')
  },

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
      if (isNo(ur)) return 'isSingle'
      if (isMatch(ur, ['husband', 'boy', 'boyfriend', 'male', 'man', 'masc', 'transmasc', 'masculine', 'ftm'])) ctx.state.partnerGender = 'm'
      else if (isMatch(ur, ['wife', 'girl', 'girlfriend', 'female', 'woman', 'fem', 'transfem', 'feminine', 'mtf'])) ctx.state.partnerGender = 'f'
      else ctx.state.partnerGender = 'nb'
      return 'leaveYou'
    }
  },

  ...diatribe('leaveYou', [
    (ur, ctx) => `Well, ${{ m: `he's`, f: `she's`, nb: `they're`}[ctx.state.partnerGender]} about to leave you`,
    (ur, ctx) => `You thought ${{ m: `he was`, f: `she was`, nb: `they were`}[ctx.state.partnerGender]} mad after you lost all your money on NFTs? That was nothing`,
    `I'm going ot absolutely <em>ruin</em> you`,
    `And you're going to love it`,
    `Do you have kids, ${getUserData('name')}?`,
  ], {
    responseHandler: ur => isYes('ur')
      ? 'kidsYes'
      : isNo('ur') ? 'kidsNo' : 'kidsMaybe'
  }),


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
    followUp: fu('timeToSend')
  },

  kidsNo: {
    messageText: `Good. Because when I'm done with you there's no chance in hell you would be able to support them`,
    followUp: fu('timeToSend')
  },

  kidsMaybe: {
    messageText: (ur, ctx) => `It doesn't matter. Your ${{ m: ctx.state.isMarried ? 'husband' : 'boyfriend', f: ctx.state.isMarried ? 'wife' : 'girlfriend', nb: `partner`}[ctx.state.partnerGender]} is going to leave you anyhow`,
    followUp: fu('timeToSend')
  },


  ...diatribe('isSingle', [
    () => `Figures that no one would want to date a crypto cuck sissy ${genderSwitch({m: 'boy', f: 'girl', nb: 'degen'})} like you`,
    `You don't deserve any love`,
    `That is, not unless you make yourself useful and pay up`,
    `Keep that in mind: if you're not sending me money you don't exist to me.`
  ], {
    followUp: fu('timeToSend')
  }),

  send1: createEvent(0.02, {
    main: 'congrats'
  }),

  timeToSend: {
    messageText: `In fact, I think it's time for you to send right now.`,
    followUp: fu('timeToSend2')
  },

  timeToSend2: {
    messageText: () => `Let's say... ${MessageHandler.globalCtx.premium * 0.02} this time`,
    event: 'send1',
    responseHandler: 'timeToSend3'
  },

  timeToSend3: {
    messageText: `You thought I was going to be <em>cheap</em>? 🤣`,
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
    responseHandler: 'timeToSend3'
  },






  congrats: {
    messageText: `Congrats, idiot. You just bought yourself a few more minutes of my precious time. Do you have any questions?`,
    responseHandler: 'noQuestions'
  },

  noQuestion: {
    messageText: `Well, I don't care lol`,
    followUp: fu('lackOfJudgement')
  },

  lackOfJudgement: {
    messageText: `The fact that you're even talking to me shows a complete lack of judgement on your part. So why would I listen to anything you have to say?`,
    followUp: fu('rhetorical', 6000)
  },

  rhetorical: {
    messageText: `Don't answer that. That was a rhetorical question, idiot.`
  },








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
  ]),











  ...diatribe('tooStupid', [
    `Do you know why you love sending to me? It's because you're too stupid to make money`,
    `And deep down you know that you're too much of a degenerate to even hold onto the money you already have`,
    `So you think: why not give it to my Queen? At least I can make her rich`,
    // `You tell yourself that you play this crypto game to get generational wealth, but you know that's really bullshit.`
    // `Why do you want to make money in crypto? To give to me. I deserve it, and you want ot make me happy`
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




















wallet ratings - sort of like dick ratings, but based on what's in your wallet


https://www.reddit.com/r/paypigsupportgroup/comments/19df9jo/budget_schmudget/
  "you have a _budget_? I don't think so lol"






you dont exist to me unless you're sending

*/


export const QueenChat = new MessageHandler(QueenProfile.name, QueenMessages)
