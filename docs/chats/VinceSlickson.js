/*

TODO
  - alpha
    - new shitcoin?
    - pitch fastcash as alpha?
    - normally this would be a fincial security, but being on findom website gives us a perfect cover
    - i'm "selling" you a shit coin because it's your kink, got it?

    - make you beg "please give me some of your alpha, daddy"
  - dom type: role play

  - "i only sell at the top because i'm a top. you're a bottom. you're my exit liquidity. oh yeah, take all my liquidity"



Testimonial
  "it makes me so hot watching vince get rich"
  "I just want to please my man. watching him take my money get's me sooo wet"
  "call me crazy, but i just don't get off on making money any more. i've been in crypto for years, and I guess all the volatile ups and downs just desensitized me or something. to get off i need a little something extra. that's why when vince put me into one of his 'investment producs' i came so goddamn hard. it was exactly what i needed"
  "On one hand I'm a complete degenerate sex addict, but on the other hand I can't find any women who want to have sex with me. I think it's because I have a suboptimal facial bone structure. Women really want a man like Vince. Not only does he have an optimal facial bone structure, but also he also has a very high level of charisma, and his monetary displays of status really seal the deal. I'm just hoping that I can pick up some of his charisma and make some money so I can finally engage in the sexually addictive lifestyle I've always dreamed of."


*/


import { isYes, isNo, isGreeting, isMean, isMatch, diatribe, createEvent, responseParser, MessageHandler } from '../state/conversationRunner.js'
import {getUserData, genderSwitch , interestedSwitch} from '../state/profile.js'

const fu = (messageCode, waitMs=1000) => ({ messageCode, waitMs })
const hasNumber = ur => {
  const m = ur.match(/\d+(\.\d+)?/)
  if (m) return Number(m[0])
  else return null
}


export const VinceProfile = {
  name: 'VinceSlickson',
  startingVisibility: 'visible',
  order: 3,
  age: 42,
  distance: 10,
  gender: '100% Man',
  display: 'm',
  maxPhotos: 4,
  description: `Your prayers have been answered because I'm the man you've been dreaming about`,
  testimonials: [
    { name: '0x1', review: `He totally turned my life around, both financially AND sexually!`},
    { name: '0x', review: `Every session I have with Vince gets me hot. and. bothered. 🥵`},
    { name: '0x1', review: `a true professional`},
    { name: '0x1', review: `Vince is a real dream boat. He also made me a TON of money!`},
    { name: '0x1', review: `vince has been a positive male role model in my life and is also very sexy. i like giving him my money`},
    { name: '0x1', review: `I like the photo where he's on the beach`},
    // A lot of men like participating in no-nut November. But I like saving up my money in november. now my wallet is ready to burst
  ]
}



// async function sendEvent1(ctx, contract, provider) {
//   const addr = await provider.isConnected()

//   ctx.state.rounds = ctx.state.rounds || 0

//   if (contract && addr) {
//     const t = bnToN(await contract.tributes(addr))

//     if (t > 0 && t / 2 > ctx.state.rounds) return { messageCode: 'thereWeGo', waitMs: 3000 }
//   }

// }


const VinceMessages = {
  TYPING_SPEED: 0.4,

  START: {
    responseHandler: `hello`,
    ignoreSend: true,
    ignoreType: true
  },

  async __contract(provider) {
    return await provider.domContract('VinceSlickson')

  },

  __precheck(userResponse, ctx, contract, provider, isFollowup) {
    if (userResponse && isMean(userResponse)) {
      return {
        messageText: `Okay, asshole. Have fun staying poor`,
        responseHandler: (ur, ctx) => ctx.lastDomCodeSent
      }
    } else if (
      userResponse
      && userResponse.trim().toLowerCase().includes('samantha')
      && !isFollowup
    ) {
      ctx.global.mentionedSamanthaToVince = true
      ctx.state.returnTo = ctx.lastDomCodeSent === 'START' ? 'hello' : ctx.lastDomCodeSent

      return {
        messageText: `@SamanthaJones? What a humorless bitch.`,
        followUp: fu('samanthaJones')
      }
    }
  },

  ...diatribe('samanthaJones', [
    `She never likes to have any fun`,
    `It's all "audit this" and "penalties that"`,
    `Way too uptight for my taste`,
    `I like 'em nice and loose`,
    `Although, she does have an incredible rack...`,
    `I wouldn't mind itemizing THOSE deductions, if you know what I mean`,
    `Maybe give her a little First In First Out`,
    `Although with her it's probably more like Last In First Out`,
    `You know whose wallet I'd <em>really</em> like to slide into though?`,
    `CrystalGoddess`,
    `She drives me absolutely wild`,
    `I'll listen to her talk about spiritual numistmatics or whatever the fuck it is all night long`,
    `She can balance my chakras whenever she wants`,
    `We were talking about something else though, weren't we?`,
    `Hold on a sec. I need to go pop my stack really quick`
  ], {
    responseHandler: (ur, ctx) => ctx.state.returnTo
  }),


  ...diatribe('hello', [
    () => `Hey ${genderSwitch({m: 'buddy', f: 'sweetheart', nb: 'buddy'})}`,
    `I've seen you clicking around this website, looking for a real hunk`,
    `Well, today's your lucky day, because you finally found him`,
    `Hey, I know what you're thinking`,
    `I see that sparkle in your eye`,
    `You want a piece of this`,
    `Not just physically (obviously) but also something deeper`,
    `You want a taste of this success`,
    `You want to taste it covering your mouth and sliding down the back of your throat`,
    `You want to smell that sweet smell of money more than you want to take your next breath`,
    () => `And the thought of this all is making you unbearably ${genderSwitch({m: 'hard', f: 'wet', nb: 'aroused'})} 😉`,
  ], {
    followUp: fu('needThatTaste', 2000)
  }, 1000),

  needThatTaste: {
    messageText: () => `I bet you can't take it any more. You need that taste right now. Isn't that right?`,
    responseHandler: 'cantResist'

  },

  cantResist: {
    messageText: userResponse => isNo(userResponse)
      ? `C'mon, don't play games. I know you want some of this`
      : `Haha, I thought so. I knew you couldn't resist.`,
    followUp: { messageCode: 'doAnything', waitMs: 1000 },
  },


  // hello6no: {
  //   messageText: () => `C'mon, don't play games. I know you want some of this`,
  //   followUp: { messageCode: 'doAnything', waitMs: 1000 },
  // },

  // hello6yes: {
  //   messageText: () => `Haha, I thought so. I knew you couldn't resist.`,
  //   followUp: { messageCode: 'doAnything', waitMs: 1000 },
  // },

  doAnything: {
    messageText: () => `I bet you'll do anything I say, right?`,
    responseHandler: response => {
      if (response.replace(',', '').toLowerCase().includes('yes daddy')) {
        return 'daddy'
      } else {
        return 'daddyRequest'
      }
    },
  },

  daddyRequest: {
    messageText: () => `You mean, "yes daddy"`,
    responseHandler: response => {
      if (response.replace(',', '').toLowerCase().includes('yes daddy')) {
        return 'daddy'
      } else {
        return 'daddyRequest'
      }
    },
  },

  ...diatribe('daddy', [
    () => `That's right. I am your daddy. And do you know what daddies do? They look out for their little ${genderSwitch({m: 'boys', f: 'girls', nb: 'subs'})}.`,
    `So I'll tell you what I'm gonna do for you: I'm gonna key you in on a little investment opportunity. That's just the kind of generous guy I am.`,
    `But keep in mind, you're going to owe me BIG for this one. This is the investment opportunity of a lifetime, and I'm handing it to you on a silver platter.`,
    `In fact, you'd have to be an <em>idiot</em> to not make money on this...`,
    `But when you're as succesful as me, you learn not to give anything away for free`,
    `So if you want in on this you're gonna need to wet my whistle`,
    (ur, ctx) => `Let's say... ${ctx.global.premium * 0.01} ETH`,
    `That seems reasonable, doesn't it?`
  ], {
    event: 'sendEvent1',
    responseHandler: ur => isNo(ur) ? 'rhetorical' : 'send1Response1'
  }, 2000),


  sendEvent1: createEvent(0.01, {
    primary: { messageCode: 'thereWeGo', waitMs: 3000 },
    wait: { messageCode: 'stillThere' },
    notEnough: {messageCode: 'moreThanThat', waitMs: 2000}
  }),

  stillThere: {
    messageText: `Hey, where'd you go?`,
    event: 'sendEvent1',
    responseHandler: 'send1Response4'
  },

  rhetorical: {
    messageText: `That was rhetorical`,
    event: 'sendEvent1',
    followUp: fu('notSmart')
  },

  notSmart: {
    messageText: `You're not too smart, are you?`,
    event: 'sendEvent1',
    followUp: fu('sendOrWhat')
  },

  sendOrWhat: {
    messageText: `Are you going to send or what?`,
    event: 'sendEvent1',
    responseHandler: 'send1Response1'
  },

  send1Response1: {
    messageText: `C'mon, you know how to do it`,
    event: 'sendEvent1',
    responseHandler: 'send1Response2'
  },

  send1Response2: {
    messageText: (ur, ctx) => `Or maybe ${ctx.global.premium * 0.005} first, just to see how it feels.`,
    event: 'sendEvent1',
    responseHandler: 'send1Response3'
  },

  send1Response3: {
    messageText: (ur, ctx) => `I've also been using that sleek new sexy pay system. I think you can send me the ETH by simply typing in <code>$sexy send VinceSlickson ${ctx.global.premium * 0.01}</code>`,
    event: 'sendEvent1',
    responseHandler: 'send1Response4'
  },

  send1Response4: {
    messageText: `This opportunity won't be around for long. You better get in while the gettin's good`,
    event: 'sendEvent1',
    responseHandler: 'send1Response5'
  },

  send1Response5: {
    messageText: `You know you want to`,
    event: 'sendEvent1',
    responseHandler: 'send1Response1'
  },

  moreThanThat: {
    messageText: `That's a good start, but I'm gonna need a little more than that`,
    event: 'sendEvent1',
    responseHandler: 'send1Response4'
  },

  thereWeGo: {
    messageText: `Oh yeah, there we go!`,
    followUp: fu('tellMe')
  },

  tellMe: {
    messageText: `Tell me that didn't feel amazing`,
    followUp: fu('sendingMe')
  },

  sendingMe: {
    messageText: (ur, ctx) => `Sending me ${ctx.global.premium * 0.01}`,
    followUp: fu('iKnow')
  },

  iKnow: {
    messageText: `I know it did`,
    followUp: fu('wantAlpha')
  },

  wantAlpha: {
    messageText: `You want that alpha, don't you?`,
    followUp: fu('wantAlphaYes')
  },

  wantAlphaYes: {
    messageText: `Yeah, you want that alpha real bad`,
    followUp: fu('alphaOoze')
  },

  alphaOoze: {
    messageText: `I've got alpha oozing out of every pore of my body`,
    followUp: fu('haveFun')
  },

  haveFun: {
    messageText: `And you just want to lick it up, don't you??`,
    responseHandler: ur => isNo(ur) ? 'games' : 'whatsNext'
  },

  games: {
    messageText: `Don't play games with me. I'm a busy guy`,
    followUp: fu('games2')
  },

  games2: {
    messageText: `Do you want that alpha or not?`,
    responseHandler: ur => isNo(ur) ? 'stayingPoor' : 'whatsNext'
  },

  stayingPoor: {
    messageText: `Okay, have fun staying poor, dumbass`,
    responseHandler: 'games2'
  },


  ...diatribe('whatsNext', [
    `Okay, here's the deal`,
    `I work with a lot of different clients`,
    `And they all have different risk tolerances`,
    `Some of them are real fucking pussies`,
    `What we in the investment industry like to call "passive" investors`,
    `They just want to set it and forget it`,
    `Like an easy bake oven`,
    `Just clip their little coupons and wait for the pennies to trickle in`,
    `Real pillow princesses who want to sit by and watch other people get rich`,
    `It takes a real BETA sissy cuck investor to want to go after that BETA market return`,
    `But some of my other clients want a bit more excitement in their lives`,
    `These folks are ALPHAs because they're only satisfied by one thing: ALPHA`,
    `They want to be <em>actively managed</em>`,
    () =>`They want to ride daddy like a ${genderSwitch({m: 'cowboy', f: 'cowgirl', nb: 'cowgirl'})}`,
    `Through all the ups and downs`,
    // `Pumped full of alpha until they can't take it any more and it's coming out of every hole in their body`,
    `Pumped so hard full of my alpha that it comes out every hole in their body`,
    `Experiencing the pleasure and the pain of the full market cycle`,
    `Espescially the pain`,
    `They love the pain because it makes the euphoria that much better`,
    `And it all tastes so much better because they took control of their own destiny`,
    `Fuck sitting on the sidelines while everyone else gets rich`,
    `These people want to grab the market by the balls and have it cum all over their face`,
    `Real gogetters`,
    () => `And when I look at you, ${getUserData('name')}... I see a gogetter`,
    `But hey, I don't want to make any snap judgements here`,
    `So what do you say?`,
    `Are you an ALPHA or a BETA?`
  ], {
    responseHandler: ur =>
      responseParser(ur).includes('alpha') ? 'alpha'
      : responseParser(ur).includes('beta') ? 'beta'
      : 'simpleQuestion'
  }, 1000),

  simpleQuestion: {
    messageText: `It's a simple question: Are you an ALPHA? Or are you a BETA?`,
    responseHandler: ur =>
      responseParser(ur).includes('alpha') ? 'alpha'
      : responseParser(ur).includes('beta') ? 'beta'
      : 'simpleQuestion'
  },


  ...diatribe('beta', [
    `Hey, that's okay`,
    `Some people are born winners, and some people are born losers`,
    `You can't help it`,
    `There's only so much that fragile little ${genderSwitch({m: 'dick', f: 'pussy', nb: 'heart'})} of yours can take`,
    () =>
      getUserData('age') > 62 ? `You are ${Math.floor(getUserData('age'))}, after all. Can't take any chances with that retirement income` :
      getUserData('age') > 50 ? `You are ${Math.floor(getUserData('age'))}, after all. Retirement's just around the corner` :
      getUserData('age') < 30 ? `You are ${Math.floor(getUserData('age'))}, after all. Probably a lot of student loan debt, right?` :
      `You're ${Math.floor(getUserData('age'))}, but I'm sure you have a good reason`,
    `I get it`,
    `Thankfully I've got just the financial product for you!`,
    `It's called FastCash, and it's <em>rock solid</em>`,
    `In fact, you'd have to be an <em>idiot</em> to not make money on this thing`,
  ], {
    followUp: (ur, ctx) => {
      ctx.state.moreInfoCount = 0
      return fu('fastcashA')
    }
  }, 1000),


  ...diatribe('fastcashA', [
    `FastCash has been a mainstay of the crypto landscape since January 2018, and it's not going away any time soon`,
    `In fact, its value has held constant at $104,666.06 for roughly ${Math.round((Date.now() - 1558954000000) / (1000 * 60 * 60 * 24 * 7))} weeks`,
    `That's an eternity in crypto terms!`,
    `At this point, FastCash is widly considered a stable coin across the industry`,
    `And I've got an amazing deal on this thing. Waaaaay below market`
  ], {
    followUp: fu('whadyaSay')
  }),


  ...diatribe('fastcashB', [
    `FastCash was created by @steviep back in 2017, and launched in January of the following year`,
    `For the first 71 weeks of its existence the price went up by 20% each week`,
    `This means that the price went up from $0.25 to over $100k!`,
    `And it's been stable ever since`,
    `Permanently high plateau, as the call it`,
    `FastCash is basically digital gold`,
    `And the value is encoded directly into the smart contract itself`,
    `That means it's physically impossible for the value to go down`,
    `There are a lot of complex blockchain mechanics that go into it`,
    `But I won't bore you with the details`,
    `If you're one of those math nerds and you really want to get into the weeds, check out the white paper: <a href="https://fastcashmoneyplus.biz/79f417c21b848aac16507c47f92abfbd.pdf" targe="_blank">https://fastcashmoneyplus.biz/79f417c21b848aac16507c47f92abfbd.pdf</a>`
  ], {
    followUp: fu('whadyaSay')
  }),

  ...diatribe('fastcashC', [
    `There's only 1 million FastCash in existence`,
    `That means that the supply is <em>fixed</em> and non-inflationary`,
    `Doesn't get more stable than that`,
    `Most of it has been sitting in the FastCash central bank for the last few years`,
    `But @steviep and I are buds`,
    `We go way back`,
    `FastCash also has a pretty sweet referral system`,
    `I won't get into it right now`,
    `But needless to say, you can make a <em>ton</em> of money on it`,
    `I'm living proof`
  ], {
    followUp: fu('whadyaSay')
  }),


  ...diatribe('fastcashD', [
    `Jesus Christ, you have a lot of questions`,
    `Look, I'm happy to sit and chat, but this opportunity won't last long`,
    `When you're as succesful as me, you learn one thing: Time = Money`,
    `I've got plenty of other folks who are eager to get in on this`,
    `Take my word for it, this is too good a deal to pass up`,
    `I don't know why I'm spending so much time on you anyhow`,
    `All my other clients are beating my door down, trying to get a piece of this action`,
    `Espescially considering where rates are these days`
  ], {
    followUp: fu('whadyaSay')
  }),


  whadyaSay: {
    messageText: `So whadya say? Do you want to dive right in? Or do you want to learn more about Fast Cash?`,
    responseHandler: (ur, ctx) => {

      if (isMatch(ur, ['dive', 'no more'])) {
        return 'diveInFastCash'
      } else if (ur.includes('?') || isMatch(ur, ['learn', 'more', 'question', 'questions', 'tell me', 'info', 'help'])) {
        ctx.state.moreInfoCount++
        const infoCount = ctx.state.moreInfoCount % 4

        if (infoCount === 0) {
          return 'fastcashA'

        } else if (infoCount === 1) {
          return 'fastcashB'

        } else if (infoCount === 2) {
          return 'fastcashC'

        } else {
          return 'fastcashD'
        }
      } else {
        return 'diveInFastCash'
      }
    },
  },


  diveInFastCash: {
    messageText: `Perfect`,
    followUp: async (ur, ctx, contract, provider) => {
      const {FastCash} = await provider.steviepContracts()
      const fastcashBalance = fromWei(await FastCash.balanceOf(contract.address))
      if (fastcashBalance) return fu('fastcashLeft')
      else return fu('noFastCashLeft')
    }
  },

  ...diatribe('noFastCashLeft', [
    `Hold on a sec...`,
    `It looks like I'm fresh out of FastCash`,
    `Sorry about that, ${genderSwitch({m: 'buddy', f: 'sweetheart', nb: 'buddy'})}`,
  ], {
    responseHandler: 'snoozeYouLose'
  }, 1000),

  ...diatribe('snoozeYouLose', [
    `I don't know what to tell you`,
    `You snooze, you lose`,
    `Maybe this is a sign from the universe that you just need some alpha in your blood`,
    `Just say the word, and I'll start spraying alpha all over you`
  ], {
    responseHandler: ur => responseParser(ur).includes('alpha') || isYes(ur)
      ? 'alpha'
      : 'snoozeYouLose'
  }, 1000),



  ...diatribe('fastcashLeft', [
    `Daddy's got you`,
    async (ur, ctx, contract, provider) => {
      const {FastCash} = await provider.steviepContracts()
      const fastcashBalance = fromWei(await FastCash.balanceOf(contract.address))
      return `Looks like I've got ${fastcashBalance} left in my inventory`
    },
    `But it's going fast!`,
    `Espescially since I'm selling them so far under market value`,
    async (ur, ctx, contract, provider) => {
      const fcPrice = fromWei(await contract.erc20Price())
      return `For you, and you only, I'm selling them for ${fcPrice} a pop`
    },
    `I dare you to try and find a better price somewhere else`,
    `That's because you can't`,
    `This is the best deal you're gonna get`,
    `So how much can I put you down for?`,
    `(If I were you, I'd err on the side of more, rather than less)`
  ], {
    responseHandler: fastCashOrderHandler
  }, 1000),

  didntGetThat: {
    messageText: `I didn't quite get that. How much?`,
    responseHandler: fastCashOrderHandler
  },

  wasteTime: {
    messageText: ur => `${hasNumber(ur)}? C'mon, don't waste my time here`,
    responseHandler: fastCashOrderHandler
  },

  fastcashTooHigh: {
    messageText: `I like the ambition, but I don't have that much in my inventory...`,
    responseHandler: fastCashOrderHandler
  },

  fastcashOrderConfirm: {
    messageText: (ur, ctx) => `${hasNumber(ur)}? ${ctx.state.upsold ? 'You sure' : `That's it`}?`,
    responseHandler: (ur, ctx, contract, provider) => {
      ctx.state.upsold = true
      if (hasNumber(ur)) return fastCashOrderHandler(ur, ctx, contract, provider)
      else if (isYes(ur)) return 'fastcashOrderConfirmYes'
      else return 'fastcashOrderConfirmNo'
    }
  },

  fastcashOrderConfirmNo: {
    messageText: `Well, how much then?`,
    responseHandler: fastCashOrderHandler
  },

  fastcashOrderConfirmYes: {
    messageText: async (ur, ctx, contract, provider) => {
      const fcPrice = fromWei(await contract.erc20Price())
      return `Okay, that'll cost you ${ctx.state.fcOrderAmount * fcPrice} ETH`
    },
    followUp: fu('verbalConfirmation')
  },

  ...diatribe('fcOrderDirections', [
    `Don't send the money to me directly`,
    `Well, you can if you want, but I can't send you any FastCash that way`,
    `The back office payment rail system is really particular`,
    `I just need a <em>verbal confirmation</em> from you, and I'll submit the transaction on my end`,
  ],{
    followUp: fu('showOnRoad')
  }, 1000),

  showOnRoad: {
    messageText: 'Then we can get this show on the road',
    responseHandler: (ur, ctx, contract, provider) => {
      if (hasNumber(ur) && hasNumber(ur) !== ctx.state.fcOrderAmount) {
        return fastCashOrderHandler(ur, ctx, contract, provider)
      } else if (isYes(ur)) {
        return 'processingOrder'
      } else {
        return 'verbalConfirmationPending'
      }
    }
  },

  ...diatribe('verbalConfirmationPending', [
    `Look, I'm a busy guy`,
    `So I'll spell it our real clear for you`,
    `You need to either:`,
    `1. Give me a verbal confirmation on your order`,
    `2. Tell me another amount of FastCash you want`,
    `3. Say the word "alpha", and we can really get this train rolling`
  ], {
    responseHandler: (ur, ctx, contract, provider) => {
      if (responseParser(ur).includes('alpha')) return 'alpha'
      else if (isYes(ur)) {
        return 'processingOrder'
      } else if (hasNumber(ur)) {
        return fastCashOrderHandler(ur, ctx, contract, provider)
      } else {
        return 'verbalConfirmationPending'
      }
    }
  }, 1000),

  processingOrder: {
    messageText: `Okay, I'll process this order right now`,
    followUp: async (ur, ctx, contract, provider) => {
      try {
        const connectedAddr = await provider.isConnected()
        if (!connectedAddr) throw new Error('User not connected')

        const {FastCash} = await provider.steviepContracts()
        const fcTransferEvents = await provider.contractEvents(
          FastCash,
          'Transfer',
          [contract.address, connectedAddr]
        )

        ctx.state.lastFcTransfer = last(fcTransferEvents)?.txHash

        await buyFastCash(ur, ctx, contract, provider)

        return fu('inTheSystem')

      } catch (e) {
        console.log(e)
        ctx.state.fcErrorMsg = e?.data?.message || e?.message || JSON.stringify(e)
        return fu('fcError')
      }

    }
  },

  fcOrderPending: {
    async check(ur, ctx, contract, provider) {
      const addr = await provider.isConnected()
      if (contract && addr) {
        const {FastCash} = await provider.steviepContracts()
        const fcTransferEvents = await provider.contractEvents(
          FastCash,
          'Transfer',
          [contract.address, addr]
        )

        const latestTransferHash = last(fcTransferEvents)?.txHash

        if (latestTransferHash !== ctx.state.lastFcTransfer) {
          ctx.state.lastFcTransfer = latestTransferHash
          return fu('fcSuccess')
        }
      }
    }
  },

  ...diatribe('inTheSystem', [
    `It's in the system`,
    `Let's give it a sec`,
    `In the meantime, my lawyer says that everyone should read through the FastCash terms of service <a href="https://fastcashmoneyplus.biz/terms" targe="_blank">https://fastcashmoneyplus.biz/terms</a>`,
    `Espescially "SECTION 2. Forward Looking Statements & Projections"`,
    `But honestly, it's not worth your time`,
    `It's all pretty intuative`,
    `Nothing you don't already know`,
  ], {
    event: 'fcOrderPending',
    responseHandler: ur => responseParser(ur).includes('cancel') ? 'fcLimbo' : 'holdOn'
  }, 3000),

  ...diatribe('holdOn', [
    `Hold your goddamn horses`,
    `I said the order's in the system`,
  ], {
    event: 'fcOrderPending',
    responseHandler: ur => responseParser(ur).includes('cancel') ? 'fcLimbo' : 'holdOn'
  }, 1000),

  ...diatribe('fcSuccess', [
    `Okay, it looks like your order processed`,
    `You're good to go`
  ], {
    responseHandler: 'anticlimax'
  }, 1000),


  ...diatribe('anticlimax', [
    `Yeah, you're right`,
    `This does feel a little anti climactic`,
    `I don't know about you, but talking about money <em>really</em> gets me going`,
    `Now I have all this pent up energy`,
    `I'm rock hard and ready to climax`,
    `Whad'ya say we insert a little alpha into that portfolio of yours?`
  ], {
    responseHandler: ur => responseParser(ur).includes('alpha') || isYes(ur)
      ? 'alpha'
      : 'prude'
  }, 1000),

  prude: {
    messageText: `Oh, come on. Don't be such a prude`,
    responseHandler: ur => responseParser(ur).includes('alpha') || isYes(ur)
      ? 'alpha'
      : 'prude'
  },

  ...diatribe('fcError', [
    `Fuck, there was an error`,
    (ur, ctx) => `Whatever the hell this means: <code>${ctx.state.fcErrorMsg}</code>`,
    `Do you want to try again?`,
  ], {
    responseHandler: ur => responseParser(ur).includes('try again') || isYes(ur)
      ? 'processingOrder'
      : 'fcLimbo'
  }, 1000),

  ...diatribe('fcLimbo', [
    `Okay, well I don't know what to tell you`,
    `Maybe report the error to @steviep`,
    `We can try again, change your order, get you some real alpha, or just give up`
  ], {
    responseHandler: (ur, ctx, contract, provider) => {
      if (responseParser(ur).includes('alpha')) return 'alpha'
      else if (isMatch(ur, ['give up', 'fuck it'])) {
        return 'giveUp'
      } else if (isYes(ur) || isMatch(ur, ['try', 'again', 'one more time'])) {
        return 'processingOrder'
      } else if (hasNumber(ur)) {
        return fastCashOrderHandler(ur, ctx, contract, provider)
      } else if (isMatch(ur, ['change'])) {
        return 'fastcashOrderConfirmNo'
      } else {
        return 'fcLimbo'
      }
    }
  }, 1000),

  giveUp: {
    messageText: `Okay asshole, have fun staying poor`,
    followUp: fu('biggerFish')
  },

  biggerFish: {
    messageText: `I've got bigger fish to fry`,
    responseHandler: 'whatsNext'
  },


  ...diatribe('alpha', [
    `That's what I like to hear!`,
    `You know how to make daddy happy 😉`,
    `You better reach into your back pocket and lube up that tight little wallet of yours`,
    `Because it's about to get absolutely REKT by my alpha`,
    `In a couple minutes you'll send a bit of ETH my way and your life will never be the same`,
    `Do you want the juicy details of what I'm gonna do with that ETH?`,
    `Or do you want to skip the foreplay and jump straight to the action?`
  ], {
    responseHandler: ur => isMatch(ur, ['action', 'jump', 'skip', 'straight'])
      ? 'straightToAction'
      : 'foreplay'
  }, 1000),

  ...diatribe('foreplay', [
    () => `Oh, ${genderSwitch({m: 'man', f: 'baby', nb: 'baby'})}, I'm glad you asked`,
    () => `You're gonna ${genderSwitch({ m: 'cream your pants', f: 'wet your panties', nb: 'cum your pants'})} when I explain this all to you`,
    `I've got this impeccable trading strategy I've been using the last six months`,
    `Absolutely <em>white hot</em>`,
    `I'm a fucking <em>God</em> out there on the trading floor`
  ]),


    // `I've been running a <em>hugely</em> successful (and volatile) trading strategy over the last six months`,
    // `It's based on trading these meme-coins`,
    // `They're completely worthless on their own`,
    // `Total dog shit`,
    // `But when the "meme" catches on, people buy them, which pushes the price up, makes the meme stronger, and causes more people to buy them`,
    // `Number go up because number go up`,
    // `As my math quant nerd likes to say, it's a "positive feedback loop"`,
    // `Self-fulfilling prophecy`,
    // `And there are all of these cheap memes out there that just need to be willed into existence`,





    // `How fucking ${genderSwitch({m: 'hard', f: 'wet', nb: 'aroused'})} are you right now?`


  straightToAction: {
    messageText: `Now we're talking`,
    followUp: fu('disclaimer')
  },


  ...diatribe('disclaimer', [
    `But look, here's the deal`,
    `Technically I'm not allowed to promise a positive return on this investment`,
    `Actually, this isn't even an investment`,
    `You're just giving me money without the expectation of anything in return`,
    `And <em>maybe</em> one day in the not-so-distant future I'll repay the favor 😉`,
    `But it's definitely <em>not</em> an investment of money with an expectation of future profits based on my managerial effort`,
    `Got it?`,
    `I don't need @SamanthaJones on my ass more than she already is`,
    `That bitch won't leave me alone`,
    `You following all this?`
  ], {
    responseHandler: 'followingAlong'
  }, 1000),


  ...diatribe('followingAlong', [
    `So here's what we're gonna do`,
    `You're going to give me an "unconditional gift"`,
    `If you know what I mean`,
    `If anyone asks, just say that you get off on sending people on the internet money`,
    `Without any expectation of profit`,
    `With you, of all people, no one will ask any questions`,
    `Between the shitcoins and the NFTs you flush your money down the toilet all the time`,
    `You're also on a findom website, for Christ's sake`,
    `You checked a disclaimer and everything`,
    `How's all that sound?`
  ], {
    responseHandler: ''
  }, 1000),






  // ], {
  //   responseHandler: ur => isYes(ur) ? 'alphaContinued' : 'alphaNo'
  // }, 1000),


  // alphaNo: {
  //   messageText: `Hey, if you want to be a little beta baby bitch, then just say so`,
  //   followUp: fu('alphaOrBeta')
  // },

  // alphaOrBeta: {
  //   messageText: `So what is it? Are you an alpha or a beta?`,
  //   responseHandler: ur => isMatch(ur, ['alpha']) ? 'alphaContinued'
  //     : isMatch(ur, ['beta']) ? 'beta'
  //     : 'alphaOrBeta'
  // },

  // ...diatribe('alphaContinued', [
  //   'Fantastic',
  //   () => `You're speaking my language, ${getUserData('name')}`,
  //   `Here's the deal`
  // ]),





// whoa whoa whoa, what did you think i was gonna do? send you <em>money</em>?
// no, i couldn't do that. that would be an illegal securities offering

/*
Jesus, do i have to explain everything?

it's not that hard

these pictures are _hot_

so you pump it and then you...
  dump it
    hey, you said it, not me

  ...
    no, you pump it and then you ........
      dump it
        hey, you said it, not me
      ...
        ....


trust me, after you dump that JPEG it'll feel <em>great</em>
haven't you ever noticed that market cycle graphs look a lot like refractory period diagrams?
i've done it a million times, and it feels amazing
(jacked off, that is. i've never )


*/



}

async function fastCashOrderHandler(ur, ctx, contract, provider) {
  const {FastCash} = await provider.steviepContracts()
  const fastcashBalance = fromWei(await FastCash.balanceOf(contract.address))

  const amount = hasNumber(ur)
  ctx.state.fcOrderAmount = amount

  if (amount === null) {
    return 'didntGetThat'
  } else if (amount < 1) {
    return 'wasteTime'
  } else if (amount > fastcashBalance) {
    return 'fastcashTooHigh'
  } else {
    return 'fastcashOrderConfirm'
  }
}

async function buyFastCash(ur, ctx, contract, provider) {
  const {FastCash} = await provider.steviepContracts()
  const fcPrice = fromWei(await contract.erc20Price())

  await contract.sellERC20(FastCash.address, {
    value: toETH(ctx.state.fcOrderAmount * fcPrice)
  })
}

    // `And just like gold, it's propped up `



/*




(if owns steviep)
  hell, you've given @steviep alone god knows how much money

besides, you're on a findom website for crying out loud

*/





// your wallet is going to get absolutely REKT by my alpha

// I'm the alpha, and you're the beta
// just a crypto beta cuck
// watching me get <em>rich</em> and you beg for some of that wealth to trickle down to you

// sure thing: fastcash, stable coin
// or, let me manage your money.
// deposit x with vince. goes down. 0.01 per minute. can withdraw at any time




export const VinceChat = new MessageHandler(VinceProfile, VinceMessages)



/*



  - will sell you FC as a stable coin. sure thing
  - or will manage your money for you.
  - gets off on making the sale




In fact, you'd have to be an <em>idiot</em> to not make money on this...

But

And my time isn't free, so if you really want this opportunity I'm going to need you to wet my whistle, if you know what I mean

All you need to do is send me 0.01 ETH, and I'll give you all the info you need to start making fast cash now





Oh yeah, you like it when i give you that alpha, don't you?





how does that alpha feel?


Whoa there, buddy. I'm not gay or anything. It's just... the money and power are _intoxicating_
  https://www.reddit.com/r/findomsupportgroup/comments/18twp5t/im_straight_but_dommed_another_guy_last_night/




https://archive.drsusanblock.com/editorial/AdelphiaAccountingScandal.htm
Stocks Gone Limp?
Need Help With Your Figures?
(Personal, Not Accounting)
EXPERIENCE TELEPHONE SEX THERAPY
We're Here for You 24 Hours a Day
Call 310.454.5353




*/