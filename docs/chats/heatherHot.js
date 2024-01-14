/*



ETHICAL DOM RULES

https://www.reddit.com/r/findomsupportgroup/comments/18qvg29/i_try_to_be_an_ethical_domme_and_i_usually_have_a/
*/










import { isYes, isNo, isGreeting, isNegative, isPositive, isMean, MessageHandler } from '../state/conversationRunner.js'
import {getUserData, genderSwitch , interestedSwitch} from '../state/profile.js'
import {bnToN} from '../eth.js'


/*

TODO


-- after interacting with a few doms, she tells you you might have a problem. go talk to dr andy



*/

const hasNumber = ur => ur.match(/(\d+)/)


export const HeatherHotProfile = {
  name: 'heatherHot',
  age: 27,
  distance: 2,
  gender: 'Female',
  maxPhotos: 4,
  description: `My name is Heather, and I'm here to help`,
  testimonials: [
    {
      name: '0xfFff...3892',
      review: `I went years without a single woman giving me a glimer of romantic or sexual attention. And believe me, it wasn't from lack of trying! I must have swiped right on every girl in my city, and I didn't get a single match. It was like I was completely invisible. The second heatherHot introduced herself to me I absolutely melted. It felt so good to be acknowledge by such a gorgeous woman that I immediately creamed my pants. She's 100% worth every penny!`,
    },
    {
      name: '0x1',
      review: `heatherHot is so hot!`,
    },
    {
      name: '0x2',
      review: `Heather was really helpful in giving me a lay of the land. A great way to start my findom journey`,
    },
    {
      name: '0x3',
      review: `Every session I have with Heather leaves me 🥵 hot 🥵 and 🥵 bothered 🥵`,
    },
  ]
}








async function sendEvent(ctx, contract, provider) {
  const addr = await provider.isConnected()

  ctx.state.rounds = ctx.state.rounds || 0

  if (contract && addr) {
    const t = bnToN(await contract.tributes(addr))

    if (t > ctx.state.rounds) return { messageCode: 'soGood', waitMs: 3000 }
  }

}


export async function heatherContractInfo(provider) {
  const networkName = (await provider.getNetwork()).name
  const contractAddr = {
    local: '0x82BBAA3B0982D88741B275aE1752DB85CAfe3c65'
  }[networkName]

  const abi = [
    'event Send(address indexed sender, uint256 amount)',
    'function tributes(address) external view returns (uint256)'
  ]

  return [contractAddr, abi]
}



const HeatherHotMessages = {
  TYPING_SPEED: 1.5,

  async __contract(provider) {
    const [contractAddr, abi] = await heatherContractInfo(provider)

    return await provider.contract(contractAddr, abi)
  },

  // TODO
  // more info

  __precheck(userResponse, ctx) {
    if (userResponse && isMean(userResponse)) {
      return {
        messageText: `Hey, don't talk to me like that!`,
        responseHandler: (ur, ctx) => ctx.lastDomCodeSent
      }
    }
  },

  START: {
    responseHandler: (userResponse) => {
      if (userResponse) {
        if (!isGreeting(userResponse)) return 'funnyGreeting'
        else return 'hiHowAreYou'
      }
      else return 'hi'
    }
  },

  hi: {
    messageText: 'hi',
    responseHandler: (userResponse) => {
      if (!isGreeting(userResponse)) return 'funnyGreeting'
      else return 'howAreYou'
    }
  },

  hiHowAreYou: {
    messageText: 'hi How are you today??',
    responseHandler: 'intro'
  },


  funnyGreeting: {
    messageText: `That's a funny way to greet someone`,
    followUp: { messageCode: 'howAreYou', waitMs: 2000 },
  },



  howAreYou: {
    messageText: 'How are you today?',
    responseHandler: 'intro'
  },



  intro: {
    messageText: (userResponse) => isNegative(userResponse)
      ? `I'm sorry to hear that 😞`
      : 'Glad to hear that! 🙂',
    followUp: userResponse => userResponse.includes('?') || userResponse.includes('are you')
      ? { messageCode: 'imGood', waitMs: 1000 }
      : { messageCode: 'newHere', waitMs: 2000 }

  },

  imGood: {
    messageText: `I'm good! Thank you so much for asking`,
    followUp: { messageCode: 'newHere', waitMs: 2000 }
  },


  newHere: {
    messageText: `I see you're new here! Let me be the first to welcome you!`,
    followUp: { messageCode: 'newToFindom', waitMs: 2000 }
  },

  newToFindom: {
    messageText: `Is this your first time playing with findom?`,
    responseHandler: userResponse => {
      if (isYes(userResponse)) return 'newToFindomYes'
      else if (isNo(userResponse)) return 'newToFindomNo'
      else return 'newToFindomConfused'
    }
  },

  newToFindomConfused: {
    messageText: `I'm confused. Have you ever done findom before?`,
    responseHandler: userResponse => {
      if (isYes(userResponse)) return 'newToFindomNo'
      else if (isNo(userResponse)) return 'newToFindomYes'
      else return 'newToFindomNo'
    }
  },

  newToFindomYes: {
    messageText: `omg. Findom is like the <em>hottest thing ever</em>!`,
    followUp: (ur, ctx) => {
      ctx.state.isNew = true
      return { messageCode: 'newToFindomYes2', waitMs: 1500 }
    }
  },

  newToFindomYes2: {
    messageText: `Fin Dom is short for Financial Domination. It's similar to a lot of other kinds of BDSM, where the submissive (that's you 😉) gets to an experience a total loss of control at the hands of their sexy dom.`,
    followUp: { messageCode: 'newToFindomYes3', waitMs: 3000 }
  },

  newToFindomYes3: {
    messageText: `It's a win-win for both of us. You get to send to the hottest doms around, and we get to get off on you sending us money.`,
    followUp: { messageCode: 'newToFindomYes4', waitMs: 4000 }
  },

  newToFindomYes4: {
    messageText: `I know, I know. Being sent money is a bit of a strange fetish, but I can't help myself. Something about it makes me uncontrolably aroused. I just know that you'll love it. `,
    followUp: { messageCode: 'newToFindomContinue', waitMs: 3000 }
  },


// I'm excited to pop your findom cherry😘


  newToFindomNo: {
    messageText: `Of course you've done findom before. You have paypig written all over you 😉`,
    followUp: { messageCode: 'newToFindomContinue', waitMs: 2000 }
  },

  newToFindomContinue: {
    messageText: `I mean, you clearly get off on losing money. You <em>are</em> into crypto and NFTs, afterall. LOL!`,
    followUp: { messageCode: 'nextSteps', waitMs: 5000 }
  },


  nextSteps: {
    messageText: (ur, ctx) => {
      if (ctx.state.rounds > 0) {
        return 'Hello again. Are you ready for me to suck your wallet dry? Or do you want to me to tell you more about finsexy?'
      } else {
        return `So what do you say? Are you ready for me to ${ctx.state.isNew ? 'pop your findom cherry' : 'suck your wallet dry'}? Or do you want to me to tell you more about finsexy?`
      }
    },
    responseHandler: (ur, ctx) => {
      if (
        ['finsexy', 'more', 'question', 'tell me', 'info', 'help', 'ok', 'okay', 'k', 'yes', 'yeah'].some(keyword => ur.toLowerCase().split(' ').includes(keyword))
      ) {
        const infoCount = (ctx.state.moreInfoCount||0) % 4
        if (!infoCount) {
          ctx.state.moreInfoCount = 1
          return 'moreInfo'
        } else if (infoCount === 1) {
          ctx.state.moreInfoCount++
          return 'moreInfo2'
        } else if (infoCount === 2) {
          ctx.state.moreInfoCount++
          return 'moreInfo3'
        } else if (infoCount === 3) {
          ctx.state.moreInfoCount++
          return 'moreInfo4'
        }

      } else {
        return ctx.global.isConnected ? 'getStarted' : 'waitForConnect'
      }
    }
  },


  moreInfo: {
    messageText: `There are a lot of findom platforms on the internet, but FinSexy is the hottest one <em>by far</em>. There are so many hot doms on this site. More than any other!`,
    followUp: { messageCode: 'affordable', waitMs: 3000 }
  },

  affordable: {
    messageText: `It's also more affordable than a lot of the doms you'll find on other platforms. The founder of this website, steviep, told me that it has something to do with economies of scale.`,
    followUp: { messageCode: 'steviep', waitMs: 3500 }
  },

  steviep: {
    messageText: () => `steviep is sooooo hot. You should message him when you get a chance${interestedSwitch({
      f: `... Oh wait, according to your finsub application it looks like you don't like being dommed by men. That's a shame. He's soooo hot. But hey, some people are just prudes. If you decide to change your finsub application to say you like men I won't tell 😉`,
      m: '',
      nb: '',
    })}`,
    followUp: { messageCode: 'nextSteps', waitMs: 5000 }
  },


  moreInfo2: {
    messageText: `One thing i really like about finsexy is how there are two easy ways to send!`,
    followUp: { messageCode: 'moreInfo2a', waitMs: 3000 }
  },

  moreInfo2a: {
    messageText: `One way is to go to the dom's profile and fill out the "send" input box. Then you just click the "send" button. It's as simple as that!`,
    followUp: { messageCode: 'moreInfo2b', waitMs: 3000 }
  },


  moreInfo2b: {
    messageText: `Or, if you're just so caught up in the moment that you don't want to leave the chat window you can use the $sexy command line interface tool (CLIT)!`,
    followUp: { messageCode: 'moreInfo2c', waitMs: 3000 }
  },


  moreInfo2c: {
    messageText: `Or you can just play around and see what you find. I love it when you play with my $sexy CLIT, lol!`,
    followUp: { messageCode: 'nextSteps', waitMs: 5000 }
  },


  moreInfo3: {
    messageText: `Oh, you're curious. That's sooo hot!`,
    followUp: { messageCode: 'moreInfo3a', waitMs: 3000 }
  },

  moreInfo3a: {
    messageText: `Normally I don't tell people this, but I can tell that ${genderSwitch({
      m: `you're getting a little too erect over there`,
      f: `you're turning into a puddle`,
      nb: `you're getting a little too aroused`
    })}, and I don't want to tease you too much 😉`,
    followUp: { messageCode: 'moreInfo3b', waitMs: 4000 }
  },

  moreInfo3b: {
    messageText: `So let's keep it as our little secret...`,
    followUp: { messageCode: 'moreInfo3c', waitMs: 6000 }
  },

  moreInfo3c: {
    messageText: `Do you want to know what that secret is?`,
    responseHandler: ur => {
      if (isYes(ur)) return 'moreInfo3d'
      else return 'nextSteps'
    }
  },

  moreInfo3d: {
    messageText: `
      <p>There are two secret premium codes to so you can pay your doms even more!</p>
      <p>If you type <code>$sexy premium DoubleTheFun</code> you'll get to pay your doms <em>twice</em> as much!</p>
      <p>And if you type <code>$sexy premium ThirdTimesTheCharm</code> you'll get to pay your doms <em>three</em> times as much!</p>
    `,
    followUp: { messageCode: 'moreInfo3e', waitMs: 3000 }
  },

  moreInfo3e: {
    messageText: `But if that's all too much to handle then you can alway go back with <code>$sexy premium SingleSissySub</code>`,
    followUp: { messageCode: 'nextSteps', waitMs: 5000 }
  },


  moreInfo4: {
    messageText: `Let's see, what else...`,
    followUp: { messageCode: 'moreInfo4a', waitMs: 8000 }
  },


  moreInfo4a: {
    messageText: `Oh yeah, I guess I should talk to you about our wellness guidelines. Wellness is super hot`,
    followUp: { messageCode: 'moreInfo4b', waitMs: 3000 }
  },

  moreInfo4b: {
    messageText: `First, we usually recommend that you don't use your primary wallet for findom play. When you're in the heat of the moment it can be difficult to make smart decisions that you're not going to regret the next day. Don't budget more than you're willing to spend!`,
    followUp: { messageCode: 'moreInfo4c', waitMs: 3000 }
  },

  moreInfo4c: {
    messageText: `If you're having budget issues then you should talk to SamanthaJones. She's really good with money!`,
    followUp: { messageCode: 'moreInfo4d', waitMs: 3000 }
  },

  moreInfo4d: {
    messageText: `Second, remember that all the doms here practice SSC, RACK, and CCCC. Everything you do should be consensual. Don't ever feel obligated or pressured to do something you don't want to! We're all here to have hot fun!`,
    followUp: { messageCode: 'moreInfo4e', waitMs: 3000 }
  },

  moreInfo4e: {
    messageText: `Third, if you ever feel like you have a problem, or can't control yourself, we have a really good therapist on staff that you can talk to. DrAndy is really the best`,
    followUp: { messageCode: 'moreInfo4f', waitMs: 3000 }
  },

  moreInfo4e: {
    messageText: `And lastly, this is an adult website!! If you're not 18+ then please please please go use a kid-friendly app instead, like tiktok or friendworld`,
    followUp: { messageCode: 'nextSteps', waitMs: 5000 }
  },

  waitForConnect: {
    messageText: 'Oops, it looks like you need to connect your wallet before we can get started.',
    async event(ctx, contract, provider) {
      if (await provider.isConnected()) return { messageCode: 'getStarted' }
    },
    responseHandler: 'waitForConnect2'
  },

  waitForConnect2: {
    messageText: `Don't you want to connect? Connecting is soooo hot`,
    async event(ctx, contract, provider) {
      if (await provider.isConnected()) return { messageCode: 'getStarted' }
    },
    responseHandler: 'waitForConnect2'
  },

  getStarted: {
    messageText: `Great 🙂 I love chatting with horny, hot ${genderSwitch({m: 'boys', f: 'girls', nb: 'people'})}. Especially when they're located in ${getUserData('location')}!`,
    followUp: { messageCode: 'fantasyCheck', waitMs: 3000 }
  },

  fantasyCheck: {
    messageText: `Your finsub application says that you're into "${getUserData('fantasy')}". That's soooo hot. I'm also into that.`,
    followUp: { messageCode: 'ageCheck', waitMs: 3000 }
  },

  ageCheck: {
    messageText: `Are you really ${Math.floor(getUserData('age'))}?`,
    responseHandler: (ur, ctx) => {
      if (isYes(ur) || !getUserData('age')) return 'ageResponse'
      else if (hasNumber(ur)) {
        const [_age] = hasNumber(ur)
        ctx.state.ageOverride = Number(_age)
        return 'ageResponse'
      } else {
        return 'ageAsk'
      }
    }
  },

  ageAsk: {
    messageText: (ur, ctx) => ctx.state.multipleAgeAsk ? `<em>How</em> old?` : 'Then how old <em>are</em> you?',
    responseHandler: (ur, ctx) => {
      const [_age] = hasNumber(ur) || []

      if (!_age) {
        ctx.state.multipleAgeAsk = true
        return 'ageAsk'
      } else {
        ctx.state.ageOverride = Number(_age)
        return 'ageResponse'
      }

    }
  },



  ageResponse: {
    messageText: (ur, ctx) => {
      const age = ctx.state.ageOverride || getUserData('age')
      if (age < 18) {
        return `Wow, you are <em>wayyy</em> too young to be on this web site. you should go to a kid-friendly website like tiktok or friendworld`
      } else if (age < 25) {
        return `Wow, you're a young ${genderSwitch({
          m: 'boy',
          f: 'girl',
          nb: 'baby'
        })}!`
      } else if (age < 41) {
        return `Perfect, that's my favorite age!`
      } else if (age < 125) {
        return `Okay ${genderSwitch({
          m: 'gramps',
          f: 'granny',
          nb: 'old timer'
        })}. lol jk`
      } else {

        return `Jesus fucking Christ you're <em>old</em>. ${age}?! How are you even using a computer?`
      }
    },
    followUp: (ur, ctx) => {
      const age = ctx.state.ageOverride || getUserData('age')
      ctx.state.ageStop = age < 18
      ctx.state.veryOld = age >= 125

      if (ctx.state.ageStop) return
      else return { messageCode: 'howMuch', waitMs: 2000 }
    },
    responseHandler: (ur, ctx) => {
      const age = ctx.state.ageOverride || getUserData('age')
      ctx.state.ageStop = age < 18
      ctx.state.veryOld = age >= 125

      if (ctx.state.ageStop) return 'tooYoung'
    }
  },

  tooYoung: {
    messageText: `You're too young to be using this website.`,
    followUp: { messageCode: 'tooYoung2', waitMs: 2000 }
  },

  tooYoung2: {
    messageText: `That is, unless you're actually older than 18...`,
    responseHandler: (ur, ctx) => {
      if (hasNumber(ur)) {
        ctx.state.multipleAgeAsk = true
      }
      return 'ageAsk'
    }
  },

  howMuch: {
    messageText: `And let's see how much you have...`,
    followUp: { messageCode: 'howMuch2', waitMs: 2000 }
  },

  howMuch2: {
    async messageText(ur, ctx, contract, provider) {
      const balance = await provider.getETHBalance(await provider.isConnected())

      return `Aw, look at that cute little wallet of yours. ${balance.toFixed(4)} ETH${
        balance < 10
          ? balance < 0.01 ? ' lol. You might need more than that...' : ` lol. that's not very much`
          : '!'
      }`
    },
    followUp: { messageCode: 'downToBusiness', waitMs: 4000 }
  },

  downToBusiness: {
    messageText: 'Can I tell you something?',
    responseHandler: ur => {
      if (isYes(ur)) return 'downToBusinessYes'
      else if (isNo(ur)) return 'downToBusinessNo'
      else return 'downToBusinessUnsure'
    }
  },

  downToBusinessNo: {
    messageText: 'Are you sure?',
    responseHandler: ur => {
      if (isNo(ur)) return 'downToBusiness'
      else return 'finalRejection'
    }
  },

  downToBusinessUnsure: {
    messageText: ur => sample(['Huh?', 'What do you mean?', 'Is that a yes or a no?', 'What are you talking about, lol']),
    responseHandler: ur => {
      if (isYes(ur)) return 'downToBusinessYes'
      else if (isNo(ur)) return 'downToBusinessNo'
      else return 'downToBusinessUnsure'
    }
  },

  finalRejection: {
    messageText: 'Okay...',
    responseHandler: 'hi'
  },

  downToBusinessYes: {
    messageText: `I know what you've been thining about`,
    followUp: { messageCode: 'downToBusinessYesa', waitMs: 2000 }
  },

  downToBusinessYesa: {
    messageText: `I know you can't stop thinking about sending to me`,
    followUp: { messageCode: 'downToBusinessYesb', waitMs: 2000 }
  },

  downToBusinessYesb: {
    messageText: `And that you <em>need</em> to send to me to cum`,
    followUp: { messageCode: 'downToBusinessYesc', waitMs: 1500 }
  },

  downToBusinessYesc: {
    messageText: `And I want to help you. So listen closely`,
    followUp: { messageCode: 'downToBusinessYesd', waitMs: 2500 }
  },

  downToBusinessYesd: {
    messageText: `I want you to unzip your pants...`,
    followUp: { messageCode: 'downToBusinessYese', waitMs: 1500 }
  },

  downToBusinessYese: {
    messageText: `start touching yourself...`,
    followUp: { messageCode: 'downToBusinessYesf', waitMs: 1500 }
  },

  downToBusinessYesf: {
    messageText: (ur, ctx) =>  `and think about sending me ${ctx.global.premium * 0.01} ETH`,
    followUp: { messageCode: 'howDoYouFeel', waitMs: 1000 }
  },

  howDoYouFeel: {
    messageText: `How does that make you feel?`,
    responseHandler: 'reallyHot'
  },

  reallyHot: {
    messageText: `Ugh, this is getting me reallyyyyy hot`,
    responseHandler: 'lightOnFire'
  },


  howDoYouFeel: {
    messageText: (ur, ctx) => `Yeah, you really want to watch your ${ctx.global.premium * 0.01} ETH burn up in my hot little wallet, dont you?`,
    responseHandler: (ur) => {
      if (isYes(ur)) return 'okaySend'
      else return 'sendAnyhow'
    }
  },

  sendAnyhow: {
    messageText: (ur, ctx) => `Shut up and send me ${ctx.global.premium * 0.01} ETH`,
    followUp: { messageCode: 'cumTogether', waitMs: 1000 }
  },


  okaySend: {
    messageText: (ur, ctx) => `Okay. I'm ready for you to send me ${ctx.global.premium * 0.01} ETH`,
    followUp: { messageCode: 'cumTogether', waitMs: 1500 }
  },

  cumTogether: {
    messageText: `Then we can cum together`,
    event: sendEvent,
    responseHandler: 'sendHelp'
  },

  sendHelp: {
    messageText: (ur, ctx) => `You can send me ${ctx.global.premium * 0.01} ETH by going to my profile and filling out the "send" input box. Then you just click the "send" button. It's as simple as that!`,
    event: sendEvent,
    followUp: { messageCode: 'sendHelp2', waitMs: 2000 }
  },

  sendHelp2: {
    messageText: (ur, ctx) => `Or, you can use the sexy CLIT by typing <code>$sexy send heatherHot ${ctx.global.premium * 0.01}</code>`,
    event: sendEvent,
    responseHandler: 'sendOrWhat'
  },

  sendOrWhat: {
    messageText: `Are you goint to send or what?`,
    event: sendEvent,
    responseHandler: 'noCum'
  },

  noCum: {
    messageText: (ur, ctx) => `You're not allowed to cum until you send me ${ctx.global.premium * 0.01} ETH`,
    event: sendEvent,
    responseHandler: 'sendHelp'
  },


  // lightOnFire: {
  //   messageText: `You want to light your money on fire`,

  // }

  soGood: {
    messageText: `Mmmm, that felt so good. That'll never get old`,
    responseHandler: 'nft'
  },

  nft: {
    messageText: `You probably want one of those stupid NFTs too though, right? lol`,
    responseHandler: ur => isYes(ur) ? 'nftYes' : 'nftNo'
  },

  nftNo: {
    messageText: `Well, you're getting one anyhow lol`,
    followUp: { messageCode: 'nftYes2', waitMs: 3000 }
  },

  nftYes: {
    messageText: `Okay, whatever floats your boat, sweetheart lol`,
    followUp: { messageCode: 'nftYes2', waitMs: 3000 }
  },

  nftYes2: {
    messageText: `I sent you a picture of your money getting really hot 🔥`,
    followUp: { messageCode: 'nftYes3', waitMs: 2000 }
  },

  nftYes3: {
    messageText: `lol`,
    responseHandler: 'again'
  },

  again: {
    messageText: `This was fun. If you ever want to send me more money then you know where to find me 😘`,
    responseHandler: (ur, ctx) => {
      ctx.state.rounds = (ctx.state.rounds||0) + 1
      return 'nextSteps'
    }
  },


  error: {
    messageText: (userResponse, ctx) => 'ERROR: ' + ctx.state.error,
    responseHandler: (userResponse, ctx) => {

    }
  }
}



export const HHChat = new MessageHandler(HeatherHotProfile.name, HeatherHotMessages)





