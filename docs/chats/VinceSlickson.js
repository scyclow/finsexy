import { isYes, isNo, isGreeting, isMean, MessageHandler } from '../state/conversationRunner.js'
import {getUserData, genderSwitch , interestedSwitch} from '../state/profile.js'

const fu = (messageCode, waitMs=2000) => ({ messageCode, waitMs })

export const VinceProfile = {
  age: 42,
  distance: 10,
  gender: '100% Male',
  maxPhotos: 4,
  description: `Your prayers have been answered because I'm the man you've been dreaming about`,
  testimonials: [
    { name: '0x', review: `Every session I have with Vince gets me hot. and. bothered. 🥵`},
    { name: '0x1', review: ``}
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
        messageText: `SamanthaJones? What a humorless bitch.`,
        followUp: fu('samanthaJones1')
      }
    }
  },

  samanthaJones1: {
    messageText: `She never likes to have any fun`,
    followUp: fu('samanthaJones2')
  },

  samanthaJones2: {
    messageText: `It's all "audit this" and "penalties that`,
    followUp: fu('samanthaJones3')
  },

  samanthaJones3: {
    messageText: `Way too uptight for my taste`,
    followUp: fu('samanthaJones4')
  },

  samanthaJones4: {
    messageText: `I like 'em nice and loose`,
    followUp: fu('samanthaJones5')
  },

  samanthaJones5: {
    messageText: `Although, she does have an incredible rack...`,
    followUp: fu('samanthaJones6')
  },

  samanthaJones6: {
    messageText: `I wouldn't mind itemizing THOSE deductions, if you know what I mean`,
    followUp: fu('samanthaJones7')
  },

  samanthaJones7: {
    messageText: `Maybe give her a little First In First Out`,
    followUp: fu('samanthaJones8')
  },

  samanthaJones8: {
    messageText: `Although with her it's probably more like Last In First Out`,
    followUp: fu('samanthaJones9')
  },

  samanthaJones9: {
    messageText: `We were talking about something else though, weren't we?`,
    followUp: fu('samanthaJones10')
  },

  samanthaJones10: {
    messageText: `Hold on a sec. I need to go pop my stack really quick`,
    responseHandler(ur, ctx) {
      return ctx.state.returnTo

    }
    // followUp: (ur, ctx) => {
    //   return {messageCode: ctx.state.returnTo, waitMs: 20, ignoreSend: true, ignoreType: true}
    // }
  },

  START: {
    responseHandler: `hello`,
    ignoreSend: true,
    ignoreType: true
  },

  hello: {
    messageText: () => `Hey ${genderSwitch({m: 'buddy', w: 'sweetheart', nb: 'buddy'})}`,
    followUp: { messageCode: 'hello2', waitMs: 2000 },
  },

  hello2: {
    messageText: () => `I've seen you clicking around this website, looking for a real hunk`,
    followUp: { messageCode: 'hello3', waitMs: 2000 },
  },

  hello3: {
    messageText: () => `Well, today's your lucky day, because you finally found him`,
    followUp: { messageCode: 'hello4', waitMs: 2000 },
  },

  hello4: {
    messageText: () => `Hey, I know what you're thinking. I see that sparkle in your eye. You want a piece of this. Not just physically (obviously) but also something deeper. You want a taste of this success. You want to taste it covering your mouth and sliding back down your throat. You want to smell that sweet smell of money more than you want to take your next breath.`,
    followUp: { messageCode: 'hello5', waitMs: 7000 },
  },

  hello5: {
    messageText: () => `And the thought of this all is making you unbearably ${genderSwitch({m: 'hard', w: 'wet', nb: 'aroused'})} 😉`,
    followUp: { messageCode: 'hello6', waitMs: 4000 },
  },

  hello6: {
    messageText: () => `I bet you can't take it any more. You need that taste right now. Isn't that right?`,
    responseHandler: 'hello7'
    // response => {
    //   if (isNo(response)) {
    //     return 'hello6no'
    //   } else if (isYes) {
    //     return 'hello6yes'
    //   } else {
    //     return 'hello6no'
    //   }
    // },
  },

  hello7: {
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

  daddy: {
    messageText: () => `That's right. I am your daddy. And do you know what daddies do? They look out for their little ${genderSwitch({m: 'boys', w: 'girls', nb: 'subs'})}.`,
    followUp: { messageCode: 'daddy2', waitMs: 3000 },
  },

  daddy2: {
    messageText: () => `So I'll tell you what I'm gonna do for you: I'm gonna key you in on a little investment opportunity. That's just the kind of generous guy I am.`,
    followUp: { messageCode: 'daddy3', waitMs: 3000 },
  },

  daddy3: {
    messageText: () => `But keep in mind, you're going to owe me BIG for this one. This is the investment opportunity of a lifetime, and I'm handing it to you on a silver platter.`,
    followUp: { messageCode: 'daddy4', waitMs: 3000 },
  },

  daddy4: {
    messageText: () => `In fact, you'd have to be an <em>idiot</em> to not make money on this...`,
    followUp: fu('daddy5', 3000)

  },

  daddy5: {
    messageText: () => `But when you're as succesful as me, you learn not to give anything away for free`,
    followUp: { messageCode: 'daddy6', waitMs: 3000 },
  },

  daddy6: {
    messageText: () => `So if you want in on this you're gonna need to wet my whistle`,
    followUp: { messageCode: 'daddy7', waitMs: 3000 },
  },

  daddy7: {
    messageText: (ur, ctx) => `Let's say... ${ctx.global.premium * 0.01} ETH`,
    event: sendEvent1,
    responseHandler: 'send1Response1'
  },

  send1Response1: {
    messageText: `C'mon, you know how to do it`,
    event: sendEvent1,
    responseHandler: 'send1Response2'
  },

  send1Response2: {
    messageText: (ur, ctx) => `Or maybe ${ctx.global.premium * 0.005} just to see how it feels.`,
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
    messageText: `And you just want to lick it up`,
    // followUp: fu('haveFun')
  },




}

export const VinceChat = new MessageHandler('VinceSlickson', VinceMessages, 'START')



/*




In fact, you'd have to be an <em>idiot</em> to not make money on this...

But when you're as succesful as me, you learn one thing: Time = Money.

And my time isn't free, so if you really want this opportunity I'm going to need you to wet my whistle, if you know what I mean

All you need to do is send me 0.01 ETH, and I'll give you all the info you need to start making fast cash now





Oh yeah, you like it when i give you that alpha, don't you?





how does that alpha feel?


Whoa there, buddy. I'm not gay or anything. It's just... the money and power are _intoxicating_
  https://www.reddit.com/r/findomsupportgroup/comments/18twp5t/im_straight_but_dommed_another_guy_last_night/






*/