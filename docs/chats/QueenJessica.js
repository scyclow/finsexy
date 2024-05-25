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
  ""

  -

  - Men are truly the weaker of the two sexes...

*/







import { isYes, isNo, isGreeting, isMean, isMatch, diatribe, createEvent, MessageHandler } from '../state/conversationRunner.js'
import {getUserData, genderSwitch } from '../state/profile.js'
import {provider} from '../eth.js'
import {sexyCLIT} from '../state/clit.js'
import {tributeLS} from '../state/tributes.js'


const hasNumber = ur => ur.match(/(\d+)/)

const fu = (messageCode, waitMs=2000) => ({ messageCode, waitMs })

export const QueenProfile = {
  name: 'QueenJessica',
  startingVisibility: 'online',
  domType: 'Hard',
  order: 6,
  age: 29,
  distance: 13,
  gender: 'F',
  display: 'f',
  maxPhotos: 4,
  voice: {
    lang: 'en-AU',
    name: 'Karen'
  },
  description: `I'm the reason your wife is going to leave you 💸 #findom 👑 #brat 🙇‍♀️🙇🙇‍♂️ #paypig 🐷 e/acc 🔥 #spoilme 🥵💦
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
      review: `i dont deserve my money. Queen deserves every cent`,
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
    },
    {
      review: `it's shameful that, as a man, i'm put in this position... that society has shifted in such a way where men are no longer assured the love of a woman. that family structure has broken down. that 80% of women now flock to 20% of the men, leaving men like me out to dry. and the fact that i'm force to pay women to pay attention to me would make me really upset if i didn't have this humiliation kink`
    },
    {
      review: `Yes! I thought I was the only person with an absolute societal collapse kink. Fuck these multinational corporations and fuck the global elite. WW3 can't come soon enough. Take me back to the fucking stone age. I jsut want to bang rocks together while Queen rules over my tribe. It's too bad this stupid fucking website only accepts dogshit alt coins like Ethereum and FastCash. My whole portfolio is split between Bitcoin and Gold. When contemporary society completely crumbles and centralized government fiat is completely worthless then I'm going to be sitting on a mountain of value. Then Queen will have no choice but to accept something other than Ethereum.`
    },
    {
      review: `I'm sorry, I usually keep my mouth shut on websites like this, but the commenter above me is an absolute fucking moron with no understanding of history whatsoever. As Graeber clearly outlines in Debt: The First 5,000 Years, money as we know it is an invention of the state. Historical evidence suggests that gold only really has something that resembles a "market value" because states need a system in which they can pay soldiers and exert control over everyone else through tax collection. In fact, the evidence suggests that, despite the standard origins of money touted by mainstream economists, markets and casual barter only really came into existence after with widespread circulation of government-backed currency. Without it, we'd likely revert back to a proto-communisic society with a gift-based economiy`
    },
    {
      review: `You clearly have no idea what you're talking about. Human societies have been using various forms of currency for thousands and thousdands of years -- way before centralized states were a thing. Everyone knows that humans used seashells and sacred rocks as primative forms of currency before switching over to gold. And in the age of the internet, Bitcoin is largely poised to replace gold. But since one is physical value and the other is digital value I'm hedging my bets by owning a little bit of both. Anyhow, there are economists, like Ludwig Von Mises, who focus on this sort of thing. You should read an <em>actual</em> book on the topic every once in a while.`
    },
    {
      review: `I'm a little sissy boy oink oink oink`
    },
    {
      review: `Do you realize how stupid you sound when you talk? Von Mises is a fucking joke. The whole school of Austrian Economics is just armchair philosophizing. It's not like actual historical <em>evidence</em> is necessary to make claims or anything... If you actually read Graeber though (or any reputable anthropologist, for that matter) you'd see that all the forms of "primative currency" you mention were completely different from the sorts of market-based currency we know and use today. Those earlier forms of currency were mainly used to create, maintain, and reorganize relations between people. Iriquois wampum (which, I think is what you're referring to) wasn't used to buy cows and tools. It was used to arrange marriages, establish paternity, settle feuds, negotiate trible disputes, etc. Gold is just another completely arbitrary form of currency, which admittedly has certain properties that make it well suited for that purpose. But there's nothing "intrinsic" about it, or bitocin for that matter`
    },
    {
      review: `That's fucking bullshit and you know it. Gold is a better store of value than any other substance. It's durable, noncorrusive, malleable, infinitely divisible, and has been used for millennia as an expression of wealth. It's a social schelling point in which everyone has agreed that it has value. So if everyone agrees on it, then I hate to break it to you: it has fucking value!! And we're seeing the same thing with Bitcoin now. I'll buy as many cows and chickens as I want! Fucking deal with it bitch.`
    },
    {
      review: `yes queen, take whatever you want from me 🙇🙇🙇`
    },
    {
      name: '0x',
      review: `I like putting the pussy on a pedastal.`,
    },
    {
      review: `Look, it doesn't matter what schelling points exist right now. If/when socity collapses we're just going to revert back to a communistic gift economy, and people will use whatever material is convenient and egalitarian for their social currencies. If you own all the gold no one is going to want to value something that arbitrarily gives you all the power. Value is a flexible concept`
    },
    {
      review: `ADDITIONALLY, what fucking world are you living in where we've gone through WW3 armageddon and the goddamn public internet is still functional enough for you to transact bitcoin? And even if you could, MARKETS CAN'T EXIST WITHOUT THE GOVERNMENT ENFORCING PROPERTY RIGHTS!!! At least Ethereum has a robust smart contract system. If you <em>really</em> wanted to enforce property rights without a government then you'd be all about ETH. But instead you're obsessed with BTC because it came first`
    },

    {
      review: `Shows what you know. Anyone can execute BTC transactions over HAM radio netowrks or the Blockstream satellite system. Anyhow, I don't have time for this shit. I'm just going to email @steviep to get Queen's email address and pay her in BTC.`
    },
    {
      review: `Have fun with that. I already sent Queen my 0.01 tribute, and I'm jacking off to her as we speak`
    },
    {
      review: 'Fuck you'
    },
    {
      review: 'Fuck <em>YOU</em>'
    },
    {
      review: `I just sent QueenJessica 0.069 ETH!`
    },
    {
      review: 'i want my wallet to be absolutely anihilated. ripped to shreds'
    },
    {
      review: 'one of the earlier commentors said that the findoms on this website accept fastcash?? How do i give queenjessica my fastcash??'
    },
    {
      review: `I think Queen Jessica might have overcharged me. What's the going market rate for a findom tribute??`
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
      if (!provider.isWeb3()) {
        if (ctx.state.rejected1) return
        else return fu('helloResponse1', 1)
      }
      else if (!ctx.global.isConnected) {
        if (ctx.state.rejected2) return
        else return fu('helloResponse2', 1)
      }

      const vipToken = await sexyCLIT.getActiveVIP()
      const creditBalance = vipToken === null ? 0 : await sexyCLIT.vipBalance(vipToken)
      const totalBalance = (await provider.getETHBalance(ctx.global.connectedAddr)) + creditBalance/10
      const totalTributes = fromWei(await tributeLS.getAdjustedTribute('QueenJessica'))
      console.log(totalTributes)

      if (totalBalance < 0.1) {
        if (ctx.state.rejected3) return
        else return fu('helloResponse3', 1)
      }
      else if (totalTributes < 0.01) {
        if (ctx.state.rejected4) return
        else return fu('helloResponse4', 1)
      }
      else if (totalTributes >= 0.01) {
        return fu('serveMe', 1)
      }
      else {
        return fu('helloResponseNothing', 1)
      }
    }
  },

  helloResponseNothing: {
    ignoreType: true,
    responseHandler: 'helloResponseRouter'
  },

  isOffline: {
    messageText: `This FinDom is offline`,
    responseHandler: (ur, ctx, contract, provider) => provider.isEthBrowser ? 'helloResponseRouter' : 'isOffline',
    helpMessage: true,
    ignoreType: true
  },

  ...diatribe('helloResponse1', [
    `Are you lost?`,
    `You don't even have a web3 browser`,
    `What a fucking loser 😂`
  ], {
    followUp: (ur, ctx) => {
      ctx.state.rejected1 = true
      ctx.visibility.QueenJessica = 'offline'
      return fu('isOffline')
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
    `Come back when you have at least 0.1 ETH in your wallet to show me`,
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
    messageText: `Before we start, do you have a budget you're trying to stick to?`,
    responseHandler: ur => isNo(ur) ? 'budgetNo' : 'budgetYes'
  },

  ...diatribe('budgetYes', [
    `Well too bad lol`,
     async (ur, ctx, contract, provider) => `I see ${await provider.getETHBalance(ctx.global.connectedAddr)} ETH left in your wallet. That's your budget`,
     `The real question is, do I want you to send it to me all at once? Or am I going to drain you slowly and <em>really</em> savor it?`
  ], {
    responseHandler: 'rhetorical'
  }),

  ...diatribe('budgetNo', [
    `Right answer`,
     `The real question is, are you going to send it to me all at once? Or am I going to drain you slowly and <em>really</em> savor it?`
  ], {
    responseHandler: 'rhetorical'
  }),

  ...diatribe('rhetorical', [
    `That was a rhetorical question, dummy`,
    `I hope no one else has to put up with your stupidity`,
    `Are you married?`,
  ], {
    responseHandler: (ur, ctx) => {
      if (isMatch(ur, ['husband'])) {
        ctx.state.partnerType = 'spouse'
        ctx.state.partnerGender = 'm'
        return 'leaveYou'
      } else if (isMatch(ur, ['wife'])) {
        ctx.state.partnerType = 'spouse'
        ctx.state.partnerGender = 'f'
        return 'leaveYou'
      }
      return isYes(ur) ? 'marriedYes' : 'marriedNo'
    }
  }),

  marriedYes: {
    messageText: `Husband? Wife?`,
    responseHandler: (ur, ctx) => {
      ctx.state.partnerType = 'spouse'
      if (isMatch(ur, ['husband', 'boy', 'boyfriend', 'male', 'man', 'masc', 'transmasc', 'masculine', 'ftm'])) {
        ctx.state.partnerGender = 'm'
      }
      else if (isMatch(ur, ['wife', 'girl', 'girlfriend', 'female', 'woman', 'fem', 'transfem', 'feminine', 'mtf'])) {
        ctx.state.partnerGender = 'f'
      }
      else ctx.state.partnerGender = 'nb'
      return 'leaveYou'
    }
  },

  marriedNo: {
    messageText: `Boyfriend? Girlfriend?`,
    responseHandler: (ur, ctx) => {
      ctx.state.partnerType = 'casual'
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
    `I won't feel guilty about it either`,
    `Because I'm the best, and I deserve every cent you give me`,
    (ur, ctx) => {
      let p
      if (ctx.state.partnerGender === 'f' && ctx.state.partnerType === 'spouse') p = 'wife'
      else if (ctx.state.partnerGender === 'f' && ctx.state.partnerType === 'casual') p = 'girlfriend'
      else if (ctx.state.partnerGender === 'm' && ctx.state.partnerType === 'spouse') p = 'husband'
      else if (ctx.state.partnerGender === 'm' && ctx.state.partnerType === 'casual') p = 'boyfriend'
      else p = 'partner'

      return `Does your ${p} know that you're busy gooning over the hottest findomme on the planet right now?`
    }
  ], {
    responseHandler: ur => isYes(ur) || isMatch(ur, ['he knows', 'she knows']) ? 'gooningYes' : 'gooningNo'
  }),

  gooningYes: {
    messageText: (ur, ctx) => `Of course ${
      ctx.state.partnerGender === 'm' ? 'he knows' :
      ctx.state.partnerGender === 'f' ? 'she knows' :
      'they know'
    }`,
    followUp: 'gooningBoth'
  },

  gooningNo: {
    messageText: (ur, ctx) => `Something tells me ${
      ctx.state.partnerGender === 'm' ? 'he does' :
      ctx.state.partnerGender === 'f' ? 'she does' :
      'they do'
    } know`,
    followUp: 'gooningBoth'
  },

  ...diatribe('gooningBoth', [
    (ur, ctx) => `In fact, ${
      ctx.state.partnerGender === 'm' ? `he's` :
      ctx.state.partnerGender === 'f' ? `she's` :
      `they're'`
    } probably simping for me from another account right now`,
    (ur, ctx) => `What a pathetic, unhappy ${ctx.state.partnerType === 'spouse' ? 'marriage' : 'relationship'} that must be`,
    (ur, ctx) => `And it's all your fault, of course. If you knew how to please ${
      ctx.state.partnerGender === 'm' ? 'him' :
      ctx.state.partnerGender === 'f' ? 'her' :
      'them'
    } like a real ${genderSwitch({m: 'man', f: 'woman', nb: 'lover'})} then maybe you wouldn't be in that mess`,
    `Oh well. More money for me`
  ], {
    responseHandler: 'anyKids'
  }),

  ...diatribe('isSingle', [
    `That's probably for the best lol`,
    () => `I don't see why anyone would would want to date a little sissy cuck ${genderSwitch({m: 'boy', f: 'girl', nb: 'degen'})} like you`,
    `You don't deserve any love`,
    `That is, unless you pay for it`,
  ], {
    responseHandler: 'anyKids'
  }),

  anyKids: {
    messageText: `Shut up. Next question: Do you have any kids?`,
    responseHandler: ur => isYes(ur)
      ? 'kidsYes'
      : isNo(ur) ? 'kidsNo' : 'kidsMaybe'
  },


...diatribe('kidsYes', [
    `Well hopefully they're looking forward to community college because you're going to have to drain your family's bank account to keep me happy`,
    `Oops. No more college fund for little Sussie. If she wants to pull your family out of its suffocating mountain of debt, she'll have to find herself a nice sugar daddy to pay for it all`,
    `Their life is pretty much over before it even started. So sad`,
    `And it'll all. be. your. fault.`,
    `You're not allowed to think about their needs any more`,
  ], {
    followUp: fu('onlyPurpose')
  }),

  kidsNo: {
    messageText: `Good, because you wouldn't be able to support them anyhow when I'm done with you`,
    followUp: fu('onlyPurpose')
  },

  kidsMaybe: {
    messageText: (ur, ctx) => `It doesn't matter. Kids or no kids, I'm the most important person in your life now`,
    followUp: fu('onlyPurpose')
  },

  ...diatribe('onlyPurpose', [
    `Your only purpose is to send to me`,
    `If you're not sending then you don't fucking exist`,
    `You're basically just an NPC living in my world, and your only function is to send whenever I feel like it`,
    `In fact, I see a cute little tanktop on <a href="https://ronamerch.co/" target="_blank">RonaMerch.co</a> right now. My tits would look great in it`,
    (ur, ctx) =>  `So, I think it might be time for you to send another  ${ctx.global.premium * 0.01} ETH`,
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
    messageText: () => `What part of "send me ${MessageHandler.globalCtx.premium * 0.01} ETH" do you not understand?`,
    event: 'send1',
    responseHandler: 'timeToSend2'
  },


  congrats: {
    messageText: `Congrats, idiot. You bought yourself some more time before I stop caring about you`,
    followUp: fu('tellMeSomething')
  },

  tellMeSomething: {
    messageText: `Tell me something interesting`,
    responseHandler: 'boring'
  },

  ...diatribe('boring', [
    `omg, you're so boring`,
    `What even makes you think you're worthy of talking to me? I'm hot, I'm rich, and my life is perfect`,
    `I basically get to be my own boss, and no man can tell me what to do`,
    `Well, technically @steviep is my boss, but he's super hot, so I don't mind`,
    `But I get to do whatever I want, wake up whenever I want, and fuck whoever I want`,
    `Meanwhile, you're life is... lol`,
    `The only thing you have going for you is that you get to live vicariously through me`,
    `How much do you even make in a year?`,
  ], {
    responseHandler: 'salary'
  }),

  ...diatribe('salary', [
    ur => `${hasNumber(ur) ? `Lol, that's it?` : `Well, I'm sure that`} I've already made more in the last seven days than you have in the last seven months`,
    `And normally that isn't easy for a woman to do in this economy`,
    `Women only make $0.80 for every $1.00 that men make, even though they're twice as dumb`,
    `It's a good thing I'm so hot, though. Men will do anything for you if they want to fuck you, even if you're totally out of their league`,
    () => genderSwitch({f: '(You better be taking notes, sweetheart)'}),
    `I'd never fuck any of the loser men ${genderSwitch({m: 'like you '})}who give me money. ${genderSwitch({m: `You're`, f: `They're`, nb: `They're`})} all such beta cucks. Even thinking about ${genderSwitch({m: `you all`, f: `them`, nb: `them`})} makes me cringe so hard`,
    `But it doesn't matter. ${genderSwitch({m: `You're`, f: `They're`, nb: `They're`})} too stupid to realize that. ${genderSwitch({m: `You`, f: `They`, nb: `They`})} think with ${genderSwitch({m: `your`, f: `their`, nb: `their`})} dicks first and ${genderSwitch({m: `your`, f: `their`, nb: `their`})} brains second`,
    `Have you taken a look at the comment section on my profile? Do you see the sort of idiocy I have to deal with from men on a daily basis?`,
    `It's really scary that cishet men run the world, despite being so stupid and helpless`,
    `85% of the largest publicly traded US companies by market cap are led by men!`,
    `But put me in front of any one of those CEOs, and I could turn him into my dirty little paypigs with a snap`,
    `Believe me, it wouldn't take much to convince those morons to embezzle corporate funds straight into my bank account`,
    `I could ruin multinational corporations, collapse supply chains, anihilate stockholder value, whatever I want`,
    `Hundreds of thousands of people would lose their jobs, their families and financial statements unwillingly ruined`,
    `All because of me 💅`,
    `Do you have anything interesting to say yet?`
  ], {
    responseHandler: 'stillBoring'
  }),

  ...diatribe('stillBoring', [
    ur => isNo(ur) ? `Didn't think so` : `Nope, still boring`,
    `You really need to work on your conversation skills`,
    `Maybe listen to the person you're talking to every once in a while?`,
    `Whatever, I'm not your mother. You're not my responsability.`,
    () => genderSwitch({
      m: `I know men would rather give all their money to findoms on the internet than go to therpy, but maybe send @DrAndy a DM and try to work on yourself a bit?`,
      f: `Maybe send @DrAndy a DM and try to work on yourself a bit?`,
      nb: `Maybe send @DrAndy a DM and try to work on yourself a bit?`,
    }),
    `Anyhow, where was I?`,
    ], {
      responseHandler: 'completeCollapse'
    }),

  ...diatribe('completeCollapse', [
    `Oh yeah. Complete societal collapse, and it's all my fault`,
    `It's going to happen eventually anyhow. Like Mark Fisher likes to say: it's easier to imagine the end of the world than it is to imagine the end of capitalism`,
    `I might as well speed it up a little bit. Don't you think?`,
    `Rip the bandaid off and get us back to the stone age ASAP`,
    // `I'd be a merciful Queen, though`,
    `Rebuild society with a matriarchal power structure`,
    `I'll obviously be at the top, and my lesser ${genderSwitch({m: 'female', f: 'female', nb: 'female and gender nonconforming'})} servants ${genderSwitch({f: 'like you ', nb: 'like you '})}would have little fiefdoms. Men would be at the bottom, of course, and they would have to do whatever the rest of us say`,
    `We'll raise boys from a young age to respect and serve all women, espescially me. They'll learn to get us food, do our chores, and sexually service us whenever we want. Whatever we say goes`,
    `We'll rectify the last 10,000 years of human history and trade <em>them</em> like property amongst ourselves. I think I'd like to collect the marriage rights to the ten hottest hunks around${genderSwitch({
      f: '. If you give me enough in male tribute then maybe I\'ll even sit on your face and let you pleasure me too',
      nb: '. If you give me enough in male tribute then maybe I\'ll even sit on your face and let you pleasure me too',
    })}`,
    `Sounds pretty good, doesn't it?`
  ], {
    responseHandler: ur => isNo(ur) ? 'soundsBad' : 'soundsGood'
  }),

  send2: createEvent(0.03, {
    primary: fu('checkWallet', 8000)
  }),

  ...diatribe('soundsBad', [
    `What? Our current society of globalized patriarchal capitalism is any better?`,
    `I don't think so.`,
    `In fact, that's such an idiot take that I think you need to pay up some more to make up for it`,
    `${MessageHandler.globalCtx.premium * 0.01} ETH. In my wallet. Now.`
  ], {
    event: 'send2',
    responseHandler: 'send2Pending1'
  }),

  ...diatribe('soundsGood', [
    `Of course it sounds good`,
    `Our current society of globalized patriarchal capitalism is absolute trash`,
    `But one step at a time. We're still here and now. But if you want to get on my good side for the future then you better pay up`,
    `${MessageHandler.globalCtx.premium * 0.01} ETH. In my wallet. Now.`
  ], {
    event: 'send2',
    responseHandler: 'send2Pending1'
  }),


  send2Pending1: {
    messageText: `Trust me, you want to be on my good side after society crumbles`,
    event: 'send2',
    responseHandler: 'send2Pending2'
  },

  send2Pending2: {
    messageText: () => genderSwitch({
      m: `As a man, you better be extra careful`,
      f: `Don't think I'd go easy on you just because you're also a woman. You still serve me`,
      nb: `Don't think I'd go easy on you just because you're not a man. You still serve me`,
    }),
    event: 'send2',
    responseHandler: 'send2Pending3'
  },

  send2Pending3: {
    messageText: `I don't have the patience for this. If you're not going to send then I have better things to do`,
    event: 'send2',
    responseHandler: 'send2Pending4'
  },

  send2Pending4: {
    messageText: ``,
    event: 'send2',
    responseHandler: 'send2Pending4'
  },


  checkWallet: {
    messageText: `Check your wallet. Do you see a little present from me?`,
    responseHandler: ur => isNo(ur) ? 'notThere' : 'notThereLie'
  },

  notThere: {
    messageText: `That's because it's not there 😂`,
    followUp: fu('unconditional2')
  },

  unconditional: {
    messageText: `I'm not giving you shit. Sending to me unconditionally should be enough`,
    followUp: fu('makingMeRich')
  },

  notThereLie: {
    messageText: `Well, you must be delusional because I didn't send you shit 😂`,
    followUp: fu('unconditional')
  },

  unconditional2: {
    messageText: `Sending to me unconditionally should be enough`,
    followUp: fu('makingMeRich')
  },

  makingMeRich: {
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
    `I deserve it and you don't`,
    `Isn't that right?`
  ], {
    responseHandler: ur => isYes(ur) ? 'thatsRightYes' : 'thatsRightNo'
  }),

  thatsRightYes: {
    messageText:`I hope you realize this isn't a game`,
    followUp: fu('roleplay')
  },

  thatsRightNo: {
    messageText:`This isn't a game`,
    followUp: fu('roleplay')
  },

  ...diatribe('roleplay', [
    `Some of the other doms on this website like to roleplay, but when you serve me... that's real`,
    `<em>This</em> is real life. <em>This</em> is who you are now.`,
    `The only roleplay you do from now on is when you leave this chat`,
    `I don't care what you need to do out there, how much you need to lie through your teeth, or whose dick you need to suck. Making money and giving it to me is priority number one.`,
    `You might need to get a second job, or donate your ${genderSwitch({ m: 'sperm', f: 'eggs', nb: 'plasma'})} for me. Give up all that makes you a ${genderSwitch({ m: 'man', f: 'woman', nb: 'human'})}. Whatever it takes to get money in my wallet`,
    `Is that clear?`,
  ], {
    responseHandler: ur => isYes(ur) || isMatch(ur, ['clear', 'crystal']) ? 'isClear' : 'isntClear',
  }),

  isClear: {
    messageText:() => `Good ${genderSwitch({m: 'boy', f: 'girl', nb: 'piggie'})}`,
    followUp: fu('excuseMe')
  },

  isntClear: {
    messageText:`Whatever, I'm bored with you`,
    responseHandler: 'readyForMore'
  },

  readyForMore: {
    messageText:`Oh, you wan't more now?`,
    responseHandler: 'oneMore'
  },

  oneMore: {
    messageText: ur => `Well, ${isYes(ur) ? 'too bad. ' : ''}I'm bored with you`,
    followUp: fu('excuseMe')
  },

  ...diatribe('excuseMe', [
    `Now if you'll excuse me, I'm going to go get lunch with the girls`,
    `Then maybe I'll come home, take a shower, and shave my hot little pussy`,
    `If you want to pay for my lunch like a good paypig then maaaaaaaybe I'll show it to you`,
    `In the meantime, I want you to brainstorm at least 10 different ways that you can make me money`,
    `Anyhow, I've got to run`,
    `Bye bye, idiot`
  ]),


/*



because what you've given me isn't enough

I need

I've got a


NFT: hot little pussy


hot little kitten money apocalypse










you don't identify as a man/woman/undefined
you identify as a sub



*/

// Do you have anything interesting to say?

// Nope, still boring.
// I really am jsut talking to an NPC. No signs of intelligent life whatsoever











// let's keep something in mind: I don't owe you anything. You pay me compensation for having to talk to you. Consider it an "idiot tax". You're paying for the privilege ofspeaking to me









  // TODO: why don't you send 0.01 ETH to my wallet and see what happens?
  //       have you checked your wallet to see what's there?
  //       that's right, nothing 😈
  //       you're going to need to send a lot more than that to get an nft from me










  // noQuestion: {
  //   messageText: `Well, I don't care lol`,
  //   followUp: fu('lackOfJudgement')
  // },

  // lackOfJudgement: {
  //   messageText: `The fact that you're even talking to me shows a complete lack of judgement on your part. So why would I listen to anything you have to say?`,
  //   followUp: fu('rhetorical', 6000)
  // },





// TODO: incorporate all of this













  // ...diatribe('tooStupid', [
  //   `Do you know why you love sending to me? It's because you're too stupid to make money`,
  //   `And deep down you know that you're too much of a degenerate to even hold onto the money you already have`,
  //   `So you think: why not give it to my Queen? At least I can make her rich`,
  //   // `You tell yourself that you play this crypto game to get generational wealth, but you know that's really bullshit.`
  //   // `Why do you want to make money in crypto? To give to me. I deserve it, and you want ot make me happy`
  //   'TODO'
  // ])











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
