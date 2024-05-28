/*

TODO

  vince: erroring out after ordering
  vince: maybe don't wet his whistle

  - give eth to vince, trust him to invest it on your behalf; sign something that says that you make him sole fiduciary, and it's a discretionary account, at his discretion.
    - oh, it just went up! don't take it out now
    - it jsut went down. better let me hold onto it. i need to protect you from yourself, and that's what daddy does.

  - alpha
    - new shitcoin?
    - pitch fastcash as alpha?
    - normally this would be a fincial security, but being on findom website gives us a perfect cover
    - i'm "selling" you a shit coin because it's your kink, got it?

    - make you beg "please give me some of your alpha, daddy"
  - dom type: role play

  - "i only sell at the top because i'm a top. you're a bottom. you're my exit liquidity. oh yeah, take all my liquidity"



Testimonial
  ""
  ""
  ""
  ""


*/


import { isYes, isNo, isGreeting, isMean, isMatch, diatribe, createEvent, responseParser, MessageHandler } from '../state/conversationRunner.js'
import {getUserData, genderSwitch } from '../state/profile.js'
import {provider} from '../eth.js'
import {tributeLS} from '../state/tributes.js'


const fu = (messageCode, waitMs=1000) => ({ messageCode, waitMs })
const hasNumber = ur => {
  const m = ur.match(/\d+(\.\d+)?/)
  if (m) return Number(m[0])
  else return null
}


export const VinceProfile = {
  name: 'VinceSlickson',
  startingVisibility: 'online',
  domType: 'Daddy',
  order: 2,
  age: 42,
  distance: 10,
  gender: '100% Man',
  display: 'm',
  maxPhotos: 4,
  voice: {
    lang: 'en-GB',
    name: 'Daniel'
  },
  description: `Your prayers have been answered because I'm the man you've been dreaming about`,
  testimonials: [
    { name: '0x1', review: `He totally turned my life around, both financially AND sexually!`},
    { name: '0x', review: `Every session I have with Vince gets me hot. and. bothered. 🥵`},
    { name: '0x1', review: `a true professional`},
    { name: '0x1', review: `Vince is a real dream boat. He also made me a TON of money!`},
    { name: '0x1', review: `vince has been a positive male role model in my life and is also very sexy. i like giving him my money`},
    {review: `I COuldn't BELIEVE IT! <a href="https://fastcashmoneyplus.biz/?ref=bangFAST_CLICKgr1SqKL+YojDRpoD" target="_blank">http://fastcashmoneyplus.biz/?ref=bangFAST_CLICKgr1SqKL+YojDRpoD</a>`},
    {review: `I COuldn't BELIEVE IT! <a href="https://fastcashmoneyplus.biz/?ref=bangFAST_CLICKgr1SqKL+YojDRpoD" target="_blank">http://fastcashmoneyplus.biz/?ref=bangFAST_CLICKgr1SqKL+YojDRpoD</a>`},
    {
      review: `i'm not gay or anything but i reread my DMs with vince at least once a day to motivate myself, espescially the part where he says he's going to pump me full of alpha.`
    },
    {review: `I COuldn't BELIEVE IT! <a href="https://fastcashmoneyplus.biz/?ref=bangFAST_CLICKgr1SqKL+YojDRpoD" target="_blank">http://fastcashmoneyplus.biz/?ref=bangFAST_CLICKgr1SqKL+YojDRpoD</a>`},
    { name: '0x1', review: `I like the photo where he's on the beach`},
    {
      review: `I can't believe how much I made with FastCashMoneyPlus! it completely turned my life around`
    },
    {review: `<a href="https://fast.plus?rf=euphoricREVOLUTION_PLUSIMOSNhU3KLGLn" target="_blank">http://fast.plus?rf=euphoricREVOLUTION_PLUSIMOSNhU3KLGLn</a>`},
    {
      review: `it makes me so hot watching vince get rich`
    },
    {
      review: `I didn't even know I liked men until I met Daddy`
    },
    {
      review: `yeah, daddy`
    },
    {
      review: `I just want to please my man. watching him take my money get's me sooo wet`
    },
    {
      review: `I don't know how my coworkers did it, but I watched them all find partners, settle down, and have kids. Before I knew it I was in my early 30s and had absolutely zero relationship experience. I didn't even know where to start. The more I thought about it the more I tried to distract myself with work. But I could only distract myself so much. When I was fired in 2023 I felt like I'd lost everything. I watched everything I'd worked towards for my entire career spiral down the drain. It was all for nothing. I basically spent my entire adult life focused on my career -- working long nights and weekends, endlessly checking emails in my free time, you name it. I was an absolute slave to my job, and it didn't leave much time for a relationship. It was a lucrative decision, for sure, but it left me deeply unfilfilled. Without someone by my side to share my wins with and console me through my losses, it all felt meaningless. I constantly found myself asking: What's the point of it all? Then I found Vince. Vince taught me to completely block out all of that self doubt and get back to making money. Now I'm back on track and making more money than ever!`
    },

    {
      review: `<a href="https://fastcashmoneyplus.biz/?ref=cleanBANG_FREEDOMQmwli0h5PhFDrSf" target="_blank">I never knew I could make this much! http://fastcashmoneyplus.biz/?ref=euphoricREVOLUTION_PLUSIMOSNhU3KLGLn COPY </a>`
    },
    {
      review: `I just sent VinceSlickson 0.069 ETH!`
    },
    {
      review: `call me crazy, but i just don't get off on making money any more. i've been in crypto for years, and I guess all the volatile ups and downs just desensitized me or something. to get off i need a little something extra. that's why when vince put me into one of his 'investment producs' i busted my nut so goddamn hard. it was exactly what i needed`
    },
    {
      review: `fastcashmoeny official site click here: <a href="https://0ms.co/fastcashmoneybiz.html" target="_blank">http://0ms.co/fastcashmoneybiz.html</a>`
    },
    {
      review: `A lot of men like participating in no-nut November. But I like saving up my money in november. now my wallet is ready to burst`
    },
    {
      review: `On one hand I'm a complete degenerate sex addict, but on the other hand I can't find any women who want to have sex with me. I think it's because I have a suboptimal facial bone structure. Women really want a man like Vince. Not only does he have an optimal facial bone structure, but also he also has a very high level of charisma, and his monetary displays of status really seal the deal. I'm just hoping that I can pick up some of his charisma and make some money so I can finally engage in the sexually addictive lifestyle I've always dreamed of.`
    },
    {
      review: `I'm such a goddamn loer that it's impossible for me to view myself in my own financial fantasies. I can only get off by seeing daddy make money`
    },

  ]
}



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

  __sendHandler(ctx, preAmount, postAmount, provider) {
    if (ctx.history.length === 0) {
      return {
        messageCode: 'hello',
        waitMs: 2000
      }
    } else {
      ctx.state.nextNode = ctx.lastDomCodeSent
      return {
        messageCode: 'headsAt',
        waitMs: 4000
      }
    }
  },

  __precheck(ur, ctx, contract, provider, isFollowup) {

    const ignoreAlphaNodes = [
      'verbalConfirmationPending',
      'anticlimax',
      'whadyaSay',
      'whatsNext',
      'simpleQuestion',
      'fcLimbo',
    ]

    const ignoreBetaNodes = [
      'whatsNext',
      'simpleQuestion',
      'fcLimbo',
      'alpha'
    ]
    if (ur && isMean(ur)) {
      return {
        messageText: `Okay, asshole. Have fun staying poor`,
        responseHandler: (ur, ctx) => ctx.lastDomCodeSent
      }
    } else if (
      ur
      && ur.trim().toLowerCase().includes('samantha')
      && !isFollowup
    ) {
      ctx.global.mentionedSamanthaToVince = true
      ctx.state.returnTo = ctx.lastDomCodeSent === 'START' ? 'hello' : ctx.lastDomCodeSent

      return {
        messageText: `@SamanthaJones? Total humorless bitch.`,
        followUp: fu('samanthaJones')
      }
    } else if (
      ctx.state.whistleIsWet
      && ur
      && isMatch(ur, ['alpha'])
      && !isFollowup
      && !ignoreAlphaNodes.some(n => ctx.lastDomCodeSent.includes(n))
    ) {
      ctx.eventQueue = []
      return {
        messageText: `Oh you want alpha now?`,
        followUp: fu('alpha')
      }
    } else if (
      ctx.state.whistleIsWet
      && ur
      && isMatch(ur, ['beta'])
      && !isFollowup
      && !ignoreBetaNodes.some(n => ctx.lastDomCodeSent.includes(n))
    ) {
      ctx.eventQueue = []
      return {
        messageText: `Oh you want beta now?`,
        followUp: fu('beta')
      }
    }
  },

  ...diatribe('headsAt', [
    `I like where your head's at, but we need to talk business before we get to pleasure`,
    `What were we talking about again?`,
    `Oh yeah`
  ], {
    followUp: (ur, ctx) => fu(ctx.state.nextNode)
  }),

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
    `@QueenJessica's`,
    `She drives me absolutely wild`,
    `World class knockers on her`,
    `And that brat schtick really turns me on`,
    `@CrystalGoddess is pretty sexy also`,
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
    () => `That's right. I am your daddy. And do you know what daddies do? They look out for their little ${genderSwitch({m: 'boys', f: 'girls', nb: 'paypigs'})}.`,
    `So I'll tell you what I'm gonna do for you: I'm gonna key you in on a little investment opportunity. That's just the kind of generous guy I am.`,
    `But keep in mind, you're going to owe me BIG for this one. This is the investment opportunity of a lifetime, and I'm handing it to you on a silver platter.`,
    `In fact, you'd have to be an <em>idiot</em> to not make money on this...`,

  ], {
    followUp: (ur, ctx) => {
      return fu('wetWhistle')
    }
  }),

  ...diatribe('wetWhistle', [
    `But when you're as succesful as me, you learn not to give anything away for free`,
    `So if you want in on this you're gonna need to wet my whistle`,
    (ur, ctx) => `Let's say... ${ctx.global.premium * 0.01} ETH`,
    `That seems reasonable, doesn't it?`,
    (ur, ctx) => `If you're in a rush you can just run <code>$sexy send VinceSlickson ${ctx.global.premium * 0.01}</code>`,
  ], {
    event: 'sendEvent1',
    responseHandler: (ur, ctx, contract, provider) => {
      if (!provider.isWeb3()) return 'noWeb3'
      return isNo(ur) ? 'rhetorical' : 'send1Response1'
    }
  }, 2000),


  ...diatribe('noWeb3', [
    `Wait a second`,
    `Hold on`,
    `You don't have a Web3 wallet...`,
    `Thanks for wasting my time, asshole`,
    `Come back when you're serious about making money`
  ], {
    followUp: (ur, ctx) => {
      ctx.visibility.VinceSlickson = 'offline'
      return fu('isOffline')
    }
  }),


  isOffline: {
    messageText: `This FinDom is offline`,
    responseHandler: (ur, ctx, contract, provider) => {
      if (provider.isWeb3()) {
        ctx.visibility.VinceSlickson = 'online'
        return 'daddy'
      } else {
        ctx.visibility.VinceSlickson = 'offline'
        return 'isOffline'
      }
    },
    helpMessage: true,
    ignoreType: true
  },

  sendEvent1: createEvent(0.01, {
    primary: { messageCode: 'thereWeGo', waitMs: 1500 },
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
    responseHandler: 'send1Response6'
  },

  send1Response6: {
    messageText: `It's so close you can taste it`,
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
    followUp: (ur, ctx) => {
      ctx.state.whistleIsWet = true
      ctx.global.securitiesFraud = true
      return fu('tellMe')
    }
  },

  tellMe: {
    messageText: `Tell me that didn't feel amazing`,
    followUp: fu('sendingMe')
  },

  sendingMe: {
    messageText: (ur, ctx) => `Sending me ${ctx.global.premium * 0.01} ETH`,
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
      ctx.state.path = 'beta'
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
    `And it's been stable at $100k ever since`,
    `Permanently high plateau, as the call it`,
    `FastCash is basically digital gold`,
    `And the value is encoded directly into the smart contract itself`,
    `That means it's physically impossible for the value to go down`,
    `There are a lot of complex blockchain mechanics that go into it`,
    `But I won't bore you with the details`,
    `If you're one of those math nerds and you really want to get into the weeds, check out the white paper: <a href="https://fastcashmoneyplus.biz/79f417c21b848aac16507c47f92abfbd.pdf" target="_blank">https://fastcashmoneyplus.biz/79f417c21b848aac16507c47f92abfbd.pdf</a>`
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
      if (isMatch(ur, ['alpha'])) return 'alpha'

      else if (isMatch(ur, ['dive', 'no more'])) {
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
      if (fastcashBalance >= 1) return fu('fastcashLeft')
      else return fu('noFastCashLeft')
    }
  },



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
      const fcPrice = fromWei(await contract.fastcashPrice())
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
      const fcPrice = fromWei(await contract.fastcashPrice())
      return `Okay, that'll cost you ${ctx.state.fcOrderAmount * fcPrice} ETH`
    },
    followUp: fu('fcOrderDirections')
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
    `In the meantime, my lawyer says that everyone should read through the FastCash terms of service <a href="https://fastcashmoneyplus.biz/terms" target="_blank">https://fastcashmoneyplus.biz/terms</a>`,
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
     (ur, ctx) => ctx.state.path === 'beta'
      ? `Whad'ya say we insert a little alpha into that portfolio of yours?`
      : `Whad'ya say we diversify your portfolio with a little beta?`
  ], {
    responseHandler: (ur, ctx) => {
      const investmentType = ctx.state.path === 'alpha' ? 'beta' : 'alpha'
      return isYes(ur)
        ? investmentType
        : 'prude'
    }
  }, 1000),

  prude: {
    messageText: `Oh, come on. Don't be such a prude`,
    responseHandler: ur => {
      return responseParser(ur).includes(ctx.state.path) || isYes(ur)
        ? ctx.state.path
        : 'prude'
    }
  },

  ...diatribe('fcError', [
    `Fuck, there was an error`,
    (ur, ctx) => `Whatever the hell this means: <code>${ctx.state.fcErrorMsg}</code>`,
    `Do you want to try again?`,
  ], {
    async responseHandler(ur, ctx, contract, provider) {
      const {FastCash} = await provider.steviepContracts()
      const fastcashBalance = fromWei(await FastCash.balanceOf(contract.address))

      if (fastcashBalance < 1) return 'noFastCashLeft'

      return responseParser(ur).includes('try again') || isYes(ur)
        ? 'processingOrder'
        : 'fcLimbo'
    }
  }, 1000),

  ...diatribe('fcLimbo', [
    `Okay, well I don't know what to tell you`,
    `Maybe report the error to @steviep`,
    (ur, ctx) => `We can try again, maybe change your order, get you some ${ctx.state.path === 'beta' ? 'real alpha' : 'beta instead'}, or just give up`
  ], {
    responseHandler: (ur, ctx, contract, provider) => {
      if (responseParser(ur).includes('alpha')) return 'alpha'
      else if (responseParser(ur).includes('beta')) return 'beta'
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
    `You can't possibly imagine how good it feels`,
    `Better than all of your wildest fantasies`,
    `In a couple minutes you'll send a bit of ETH my way and your life will never be the same`,
    `Do you want the juicy details of what I'm gonna do with that ETH?`,
    `Or do you want to skip the foreplay and jump straight to the action?`
  ], {
    responseHandler: (ur, ctx) => {
      if (isMatch(ur, ['beta'])) {
        return 'beta'
      }
      ctx.state.path = 'alpha'
      return isMatch(ur, ['action', 'jump', 'skip', 'straight'])
        ? 'straightToAction'
        : 'foreplay'
    }
  }, 1000),

  ...diatribe('foreplay', [
    () => `Oh, ${genderSwitch({m: 'man', f: 'baby', nb: 'baby'})}, I like where your head's at`,
    () => `You're gonna ${genderSwitch({ m: 'cream your pants', f: 'wet your panties', nb: 'cum your pants'})} when I explain this all to you`,
    `I've got this impeccable trading strategy I've been using the last six months`,
    `Absolutely <em>white hot</em>`,
    `I'm a fucking <em>God</em> out there on the trading floor`,
    `It's usually based on trading these meme-coins`,
    `They're completely worthless on their own`,
    `Total dog shit`,
    `But when the "meme" catches on people buy them`,
    `And that pushes the price up, makes the meme stronger, and causes more people to buy them`,
    `Number go up because number go up`,
    `As my math quant nerd likes to say, it's a "positive feedback loop"`,
    `Self-fulfilling prophecy`,
    `But I found this one coin that goes way beyond meme coins`,
    `It's called FastCash, and it's about to go nuclear`,
    `And I can hook you up with some of it`,
    `Directly to your potfolio`,
    `You'd have to be an <em>idiot</em> to not make money on this thing`,
    `I've got an amazing deal on this thing. Waaaaay below market`,
    `It's also go a sweet referral bonus, so we can both get rich on this`,
    `You scratch my back, I scratch yours`,
    `Here's the rundown:`,
    `FastCash was created by @steviep back in 2017, and launched in January of the following year`,
    `For the first 71 weeks of its existence the price went up by 20% each week`,
    `This means that the price went up from $0.25 to over $100k!`,
    `FastCash is basically digital gold`,
    `There's only 1 million FastCash in existence`,
    `That means that the supply is <em>fixed</em> and non-inflationary`,
    `And the value is encoded directly into the smart contract itself`,
    `That means it's physically impossible for the value to go down`,
    `There are a lot of complex blockchain mechanics that go into it`,
    `But I won't bore you with the details`,
    `If you're one of those math nerds and you really want to get into the weeds, check out the white paper: <a href="https://fastcashmoneyplus.biz/79f417c21b848aac16507c47f92abfbd.pdf" target="_blank">https://fastcashmoneyplus.biz/79f417c21b848aac16507c47f92abfbd.pdf</a>`,
    `This opportunity won't last long, so I say we just get right into it`,
  ], {
    followUp: fu('disclaimer')
  }, 1000),


    //
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
    `You're just buying something from me without the expectation of anything in return`,
    `But it's definitely <em>not</em> an investment of money with an expectation of future profits based on anyone's managerial effort`,
    `Got it?`,
    `I don't need @SamanthaJones on my ass more than she already is`,
    `That bitch won't leave me alone`,
    `You following all this?`
  ], {
    responseHandler: (ur) => isMatch(ur, ['beta']) ? 'beta' : 'diveInFastCash'
  }, 1000),




  ...diatribe('noFastCashLeft', [
    `Hold on a sec...`,
    `It looks like I'm fresh out of FastCash`,
    `Sorry about that, ${genderSwitch({m: 'buddy', f: 'sweetheart', nb: 'kiddo'})}`,
    `I don't know what to tell you`,
    `You snooze, you lose`,
    (ur, ctx) => ctx.state.path === 'alpha'
      ? `Maybe this is a sign from the universe that you just aren't cut out for alpha-level returns`
      : `That's what happens to betas who sit on the sidelines for too long`,
    `Tough break`
  ], {
    responseHandler: async () => {
      await tributeLS.resetTributeAdjustment('VinceSlickson')
      return `devistated`
    }
  }, 1000),


  ...diatribe('devistated', [
    `I can tell that you're pretty devistated from missing this opportunity`,
    `I know, it really sucks`,
    `Opportunities like this don't come along very often`,
    `Some say once in a lifetime`,
    `But hey, I'll tell you what`,
    `I like you, so I'm gonna do you a solid`,
    `I may have mentioned this before, but me and @steviep are buds`,
    `We go way back`,
    `I was there since the beginning`,
    `So let me hop on the horn with him and see if I can round up a bit more FC`,
    `He owes me a favor`,
    `The financial industry is a relationship game, after all`,
    `But this is a pretty big favor, and I can't just front that money for you`,
    `Besides, this type of sale isn't exactly seen as aboveboard by certain regulators`,

    `So here's what we're gonna do`,
    `You're going to give me an "unconditional gift"`,
    `If you know what I mean`,
    `If anyone asks, just say that you get off on sending people on the internet money`,
    `Without any expectation of profit`,
    `Tell them it's a sex thing`,

    `With you, of all people, no one will ask any questions`,
    `Between the shitcoins and the NFTs you flush your money down the toilet all the time`,
    `You're also on a findom website, for Christ's sake`,
    `You checked a disclaimer and everything`,
    `And besides, look at me`,
    `Who wouldn't want a piece of this?`,

    `Anyhow, completely unrelated to you, I'm going to have a chat with @steviep about FastCash`,
    `We're good friends, so nothing out of the ordinary there`,

    `And <em>if</em> that conversation results in me coming across some new FastCash, then that's totally normal`,
    `And since <em>we're</em> such good friends, I might even decide to gift you some FastCash`,

    `Also, all of these gifts are gong to be worth less thn $10,000.00 USD`,
    `It's all completely legal`,
    `We're just two friends who enjoy giving each other completely legal gifts as part of a totally normal sexual fetish`,
    `Nothing wrong with that, right?`
  ], {
    responseHandler: ur => isYes(ur) ? 'nothingWrong' : 'somethingWrong',
    event: 'unconditionalGift'
  }, 1000),

  somethingWrong: {
    messageText: `I said, there's nothing wrong with that. <em>Right</em>?`,
    responseHandler: ur => isYes(ur) ? 'nothingWrong' : 'somethingWrong',
    event: 'unconditionalGift'
  },

  ...diatribe('nothingWrong', [
    `Right. There's nothing wrong with that`,
    `100% legal`,
    `And if you <em>did</em> feel like giving me a completely unconditional gift with no strings attached, then I'd say to pick an amount of FastCash denominated in the price I quoted you earlier`,
    `So for example, if you wanted to gift me the equivalent value of 5 FastCash, then you could just type <code>$sexy send VinceSlickson 0.05</code>`,
    `I'd get my unconditional gift, you'd have your sexual climax, and that would be that.`
  ], {
    responseHandler: 'wheneverYouWant',
    event: 'unconditionalGift'
  }),

  wheneverYouWant: {
    messageText: `So feel free to send over your unconditional gift of ETH whenver you want`,
    responseHandler: 'giftToYou',
    event: 'unconditionalGift'
  },

  ...diatribe('giftToYou', [
    `And remember, my gift to you, if I choose to send you one, might take a little while`,
    `So don't worry about it`,
    `Just relax`,
    `And don't draw any unneccessary attention to yourself`,
    `Lay low, and it'll all be fine`
  ], {
    responseHandler: 'sexItUp',
    event: 'unconditionalGift'
  }),

  sexItUp: {
    messageText: `You want me to sex it up a little for you?`,
    responseHandler: ur => isYes(ur) ? 'sexItUpYes' : 'sexItUpNo'
  },

  sexItUpNo: {
    messageText: `Okay, whatever then`,
    responseHandler: `wheneverYouWant`,
    event: 'unconditionalGift'
  },


  ...diatribe('sexItUpYes', [
    `You're gonna send me that money, and you're gonna like it`,
    `You know you love watching me get rich`,
    `It makes you want to cum so hard`,
    `Yeah, you like that, don't you?`,
    `I bet you spend all night thinking about me, and my big, fat wallet`,
    `And you just want to give me some of that money without expectation of anything in return`,
    `It's all you can think about`,
    `And it's driving you absolutely <em>wild</em>`,
  ], {
    responseHandler: 'wheneverYouWant',
    event: 'unconditionalGift'
  }),

  unconditionalGift: createEvent(0.01, {
    primary: { messageCode: 'unconditionalGiftReceived', waitMs: 1500 },
  }),

  ...diatribe('unconditionalGiftReceived', [
    `Great, I got my unconditional gift from you`,
    `And maybe in the future you'll get an unconditional gift from me`,
    `Who knows?`,
    `Anything can happen.`,
    `In the meantime, do you want to hear more about some other opportunities I have?`,
  ], {
    responseHandler: async (ur, ctx) => {
      await tributeLS.resetTributeAdjustment('VinceSlickson')
      return isNo(ur) ? 'goodbye' : 'whatsNext'
    }
  }),

  goodbye: {
    messageText: `Alright, if you do then you know where to find me`,
    responseHandler: 'backForMore'
  },

  backForMore: {
    messageText: `So you're back for more?`,
    followUp: fu('whatsNext')
  }

}

async function fastCashOrderHandler(ur, ctx, contract, provider) {
  const {FastCash} = await provider.steviepContracts()
  const fastcashBalance = fromWei(await FastCash.balanceOf(contract.address))

  const amount = hasNumber(ur)
  ctx.state.fcOrderAmount = amount

  if (fastcashBalance < 1) {
    return 'noFastCashLeft'
  } else if (amount === null) {
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
  const fcPrice = fromWei(await contract.fastcashPrice())

  await contract.sellFastCash({
    value: toETH(ctx.state.fcOrderAmount * fcPrice)
  })
}






export const VinceChat = new MessageHandler(VinceProfile, VinceMessages)

/*


https://archive.drsusanblock.com/editorial/AdelphiaAccountingScandal.htm
Stocks Gone Limp?
Need Help With Your Figures?
(Personal, Not Accounting)
EXPERIENCE TELEPHONE SEX THERAPY
We're Here for You 24 Hours a Day
Call 310.454.5353




*/