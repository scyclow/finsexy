import { isYes, isNo, isGreeting, isMean, diatribe, MessageHandler } from '../state/conversationRunner.js'
import {getUserData, genderSwitch , interestedSwitch} from '../state/profile.js'

const fu = (messageCode, waitMs=2000) => ({ messageCode, waitMs })

export const VinceProfile = {
  age: 42,
  distance: 10,
  gender: '100% Male',
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


export async function vinceContractInfo(provider) {
  const networkName = (await provider.getNetwork()).name
  const contractAddr = {
    local: '0x02e8910B3B89690d4aeC9fcC0Ae2cD16fB6A4828'
  }[networkName]

  const abi = [
    'event Send(address indexed sender, uint256 amount)',
    'function tributes(address) external view returns (uint256)'
  ]

  return [contractAddr, abi]
}



async function sendEvent1(ctx, contract, provider) {
  const addr = await provider.isConnected()

  ctx.state.rounds = ctx.state.rounds || 0

  if (contract && addr) {
    const t = bnToN(await contract.tributes(addr))

    if (t > 0 && t / 2 > ctx.state.rounds) return { messageCode: 'thereWeGo', waitMs: 3000 }
  }

}


const VinceMessages = {
  TYPING_SPEED: 0.4,

  START: {
    responseHandler: `hello`,
    ignoreSend: true,
    ignoreType: true
  },

  async __contract(provider) {
    const [contractAddr, abi] = await vinceContractInfo(provider)

    return await provider.contract(contractAddr, abi)
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
    `You want to taste it covering your mouth and sliding back down your throat`,
    `You want to smell that sweet smell of money more than you want to take your next breath`,
    () => `And the thought of this all is making you unbearably ${genderSwitch({m: 'hard', f: 'wet', nb: 'aroused'})} 😉`,
  ], {
    followUp: fu('needThatTaste', 4000)
  }, 2000),

  needThatTaste: {
    messageText: () => `I bet you can't take it any more. You need that taste right now. Isn't that right?`,
    responseHandler: 'cantResist'

  },

  cantResist: {
    messageText: userResponse => isNo(userResponse)
      ? `C'mon, don't play games. I know you want some of this`
      : `Haha, I thought so. I knew you couldn't resist.`,
    followUp: { messageCode: 'doAnything', waitMs: 2000 },
  },


  // hello6no: {
  //   messageText: () => `C'mon, don't play games. I know you want some of this`,
  //   followUp: { messageCode: 'doAnything', waitMs: 2000 },
  // },

  // hello6yes: {
  //   messageText: () => `Haha, I thought so. I knew you couldn't resist.`,
  //   followUp: { messageCode: 'doAnything', waitMs: 2000 },
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
  ], {
    event: sendEvent1,
    responseHandler: 'send1Response1'
  }, 3000),


  send1Response1: {
    messageText: `C'mon, you know how to do it`,
    event: sendEvent1,
    responseHandler: 'send1Response2'
  },

  send1Response2: {
    messageText: (ur, ctx) => `Or maybe ${ctx.global.premium * 0.005} first, just to see how it feels.`,
    event: sendEvent1,
    responseHandler: 'send1Response3'
  },

  send1Response3: {
    messageText: `You know you want to`,
    event: sendEvent1,
    responseHandler: 'send1Response4'
  },

  send1Response4: {
    messageText: `This opportunity won't be around for long. You better get in while the gettin's good`,
    event: sendEvent1,
    responseHandler: 'send1Response5'
  },

  send1Response5: {
    messageText: (ur, ctx) => `I've also been using that sleek new sexy pay system. I think you can send me the ETH by simply typing in <code>$sexy send VinceSlickson ${ctx.global.premium * 0.01}</code>`,
    event: sendEvent1,
    responseHandler: 'send1Response1'
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

  whatsNext: {

  }



// your wallet is going to get absolutely REKT by my alpha

// I'm the alpha, and you're the beta
// just a crypto beta cuck
// watching me get <em>rich</em> and you beg for some of that wealth to trickle down to you

// sure thing: fastcash, stable coin
// or, let me manage your money.
// deposit x with vince. goes down. 0.01 per minute. can withdraw at any time



}

export const VinceChat = new MessageHandler('VinceSlickson', VinceMessages)



/*




In fact, you'd have to be an <em>idiot</em> to not make money on this...

But when you're as succesful as me, you learn one thing: Time = Money.

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