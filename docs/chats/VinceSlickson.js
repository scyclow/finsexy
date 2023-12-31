import { isYes, isNo, isGreeting, MessageHandler } from '../state/conversationRunner.js'
import {getUserData, genderSwitch , interestedSwitch} from '../state/profile.js'

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


const VinceMessages = {
  // __contract() {},

  START: {
    responseHandler: () => `hello`
  },

  hello: {
    messageText: () => `Hey ${genderSwitch({m: 'buddy', w: 'sweetheart', nb: 'buddy'})}`,
    followUp: { messageCode: 'hello2', waitMs: 2000 },
  },

  hello2: {
    messageText: () => `I've seen you clicking around this website, looking for a real hunk`,
    followUp: { messageCode: 'hello3', waitMs: 3000 },
  },

  hello3: {
    messageText: () => `Well, today's your lucky day, because you finally found him`,
    followUp: { messageCode: 'hello4', waitMs: 4000 },
  },

  hello4: {
    messageText: () => `Hey, I know what you're thinking. I see that sparkle in your eye. You want a piece of this. Not just physically (obviously) but also something deeper. You want a taste of this success. You want to taste it covering your mouth and sliding back down your throat. You want to smell that sweet smell of money more than you want to take your next breath.`,
    followUp: { messageCode: 'hello5', waitMs: 10000 },
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
    followUp: { messageCode: 'daddy3', waitMs: 4500 },
  },

  daddy3: {
    messageText: () => `But keep in mind, you're going to owe me BIG for this one. This is the investment opportunity of a lifetime, and I'm handing it to you on a silver platter.`,
    followUp: { messageCode: 'daddy4', waitMs: 4500 },
  },

  daddy4: {
    messageText: () => `In fact, you'd have to be an <em>idiot</em> to not make money on this...`,
    followUp: ctx => ctx.state.totalPaid > 0
      ? { messageCode: 'alreadyPaid', waitMs: 3000 }
      : { messageCode: 'daddy5', waitMs: 3000 },
  },

  daddy5: {
    messageText: () => `But when you're as succesful as me, you learn one thing: Time = Money.`,
    followUp: { messageCode: 'daddy6', waitMs: 3000 },
  },

  daddy6: {
    messageText: () => `And my time isn't free, so if you really want this opportunity I'm going to need you to wet my whistle, if you know what I mean`,
    followUp: { messageCode: 'daddy7', waitMs: 3000 },
  },

  daddy7: {
    messageText: (response, ctx) => `All you need to do is send me 0.01 ETH, and I'll give you all the info you need to start making fast cash now`,
    event: (ctx) => {
      if (ctx.state.totalPaid > 0) {
        return { messageCode: 'paymentReceived', waitMs: 0 }
      }
    }
    // responseHandler: (response, ctx) => {
    //   if (ctx.)
    // }
  },

  alreadyPaid: {
    messageText: () => `And I see you've already wet my whistle a bit...`
  },

  paymentReceived: {
    messageText: () => `That's a good little pay piggie`
  },


}

export const VinceChat = new MessageHandler('VinceSlickson', VinceMessages, 'START')



/*


if asked about samantha
  ctx.global.mentionedSamanthaToVince = true
  oh, she's a humorless bitch. what a fucking killjoy. she never likes to have any fun. it's all audit this, and penalties that. way too uptight for my taste
  although, she does have a fabulous rack. I wouldn't mind itemizing THOSE deductions, if you know what I mean. Maybe give the

  I wouldn't mind staking her assets
  I wouldn't mind itemizing her deductions
  I wouldn't mind giving her the old FIFO

Oh yeah, I can't wait to stake <em>your</em> assets.


In fact, you'd have to be an <em>idiot</em> to not make money on this...

But when you're as succesful as me, you learn one thing: Time = Money.

And my time isn't free, so if you really want this opportunity I'm going to need you to wet my whistle, if you know what I mean

All you need to do is send me 0.01 ETH, and I'll give you all the info you need to start making fast cash now



any time accounting or samantha jones is mentioned: "I hate that fuckign bitch. I'm sure she had a lot ot say about me"


Oh yeah, you like it when i give you that alpha, don't you?





how does that alpha feel?


Whoa there, buddy. I'm not gay or anything. It's just... the money and power are _intoxicating_
  https://www.reddit.com/r/findomsupportgroup/comments/18twp5t/im_straight_but_dommed_another_guy_last_night/






*/