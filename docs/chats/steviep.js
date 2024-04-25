/*
TODO
  - figure out general dynamic
  - maybe incorporate stake/unstake challenge here

  - incorporate more shit about how
    - our digital relationships are changing with ai
    - it symbolizes our relationship to computers in general
    - specifically, how our relationship to computers is largely extractive
    - computers are sexy, but they're really domming us and taking our money
    - they're pretending to help us, but they're really observing us, swindling us, tricking us, mind controlling us, bossing us around, constructing artificial realities for us, seek our worship, pray on our fears of vulnerability,

  - money is a medium. Spending money is a form of expression.










  - these are all bots, need a beta tester
  - do you want to beta (sissy boy/girl) test?
    -> I'm working on a new findom. would you mind testig it out for me? (xpress)
      - and what happened when you sent it money?
      - okay, maybe it's a little too aggressive
    -> send X some money. I want to see something really quick
    -> find bug in cli







    - "lol jk"
    - "but seriously though, i need someone to user experience beta test"


    - "oh yeah, i want to extract as much money from the ecosystem as possible"





Testimonials
  - I've been collecting stevie's work since 2021, and given him i dont know how much money. It just felt good to support an artist I love. But it wasn't until FinSexy that I realized how sexually attracted I was to him!

  - Hey asshole, this stupid fucking website has totally ruined my life! I don't have any money, but I can't stop talking to the sexy doms. Ever since I created my account, I can't stop thinking about FinDom. It's the first thing I think about when I wake up, and the last thing I think about before I fall asleep. I just want to be financially dominated by hot doms, but all they want is money that I dont' have. It's driving me insane!

  - I have a highly addictive personality. I've thankfully avoided substance abuse, but I need to get my kicks in other ways. Staring at social media for hours on end, compulsive masturbation, and gambling are the big three. So you could imagine how I felt when I finally came across FinSexy! I've never found a website that so deftly combined my three biggest passions in life. Keep up the good work, Steve!

  - This website is fucking bullshit. I'm trying to give my money away to REAL findoms, and steviep tricked me into giving it to FAKE findoms! I hope you enjoy a full investigation from the Consumer Financial Protection Bureau after I file my complaint, asshole.


  - It's soooo hot knowing that stevie is getting all the money from this website in the end. the fact that all the doms and comments are written by him just gets me uncontrolably aroused

  - What Steve is doing here is really disgusting. What a shame that is how such a brilliant and prolific artist chooses to direct his efforts: pandering to vulnerable sexual degenerates. He knows that they can't control themselves, and what does he do? He creates a highly addictive environment that triggers all of the reward centers in their brain. And it's all to his benefit. It's opportunistic is what it is.

  - Steve shows once again that he's a truly brilliant entrepreneur. As a perpetually single and lonely man who spends 15 hours a day on my computer, it's crystal clear to me that this is where the dating market is headed. It's hard to put a price on having an empathetic relationship with a sexy woman who's always there for me, always knows how to cheer me up, and is always willing to take my money.

  - I really have to wonder who steviep is if _this_ is the fantasy world that he's made for himself. Whoever he is, he's got _amazing_ taste.

  - I don't know what the fuck @steviep did to my head, but since I first stumbled upon this stupid website the only thing that's been able to give me the slightest bit of pleasure is sending doms money on FinSexy. It's like the rest of my life is stuck in black and white. Music jsut feels like noise. Food is jsut a vehicle to make me less hungry. Other people are just an annoyance. Even masturbating when I'm not in a findom session feels like I'm simply emptying my ball sack. It feels like all the energy and zest and meaning has been sucked out of my life.

  - @steviep is an artistic genius, and FinSexy is his masterpiece. Perhaps even his magnum opus. At once, it is wholey different from anything he's ever produced -- but also, it could not have been created by anyone else.





  Of all the projects from this prolific artist, none so deftly tie together the themes that fans love him so much for: the nuanced social implications of spending money, scam aesthetics, the tension between authenticity and artificiality/simulation, the parody of crypto culture, the critique of the dopamine-driven manipulation of user interfaces -- it's all there. In fact, this might be his most advanced projected yet in terms of forcing the user to question their reality. When you find yourself sending money to someone who's either cat fishing you or pretending to cat fish you as part of a mutual sexual fantasy (or, pretending to pretend to catfish you as part of a fake mutual sexual fantasy) it's hard not to count how many layers deep you are.

  But at the same time, Pikelny's not just playing his greatest hits; FinSexy refreshingly explores new thematic ground, taking focus on AI, sexual psychology, and free will. And even though his work has often been characterized as ironic and detached, FinSexy has an emotional core to it. This may just be a website, but websites are built for human users, and one finds oneself asking: In the narrative universe that this website exists, who was it built for?




  this is the most manipulative website i've ever been to. it's jsut designed to extract money from people! if you pay close attention, you can find subliminal messages embedded in the UI. for example, you ever wonder why everything on this site is magenta? ask yourself: what's the opposite color from magenta? that's right, it's green! the color of money. the longer you stare at your computer screen the more your brain wants to balance the visual scale by sending all your green to it. think about it

  something's really fucked up about this website, and I don't like it.
*/





import { isYes, isNo, isGreeting, isMean, isMatch, MessageHandler, diatribe, createEvent } from '../state/conversationRunner.js'
import {getUserData, genderSwitch } from '../state/profile.js'

const fu = (messageCode, waitMs=3000) => ({ messageCode, waitMs })

export const StevieProfile = {
  name: 'steviep',
  startingVisibility: 'offline',
  order: 5,
  age: 34,
  distance: 0,
  gender: 'Male',
  display: 'm',
  maxPhotos: 4,
  description: `Internationally famous artist; CEO, CTO, CFO, COO of <a href="https://FinSexy.com" target=_blank>FinSexy.com</a>, <a href="https://FastCashMoneyPlus.biz" target=_blank>FastCashMoneyPlus.biz</a>, <a href="https://FriendWorld.social" target=_blank>FriendWorld.social</a>, <a href="https://RonaMerch.co" target=_blank>RonaMerch.co</a>; Jesus pamphlet collector
  `,
  testimonials: [
    {
      name: '0x4',
      review: `What a hunk 😍`,
    },
    {
      name: '0x',
      review: `Stevie P is my favorite artist of all time. I'm so glad that I have the opportunity to be a patron of his brilliant artwork!`,
    },
    {
      name: '0x1',
      review: `I was SO happy when steviep launched a findom project. He is, without a doubt, the HOTTEST artist in the NFT space. I couldn't wait to give him my money!`,
    },
    {
      name: '0x2',
      review: `I'll do anything stevie p says, and buy anything stevie p makes. I'll even pay him money in exchange for less money. `,
    },
    {
      name: '0x3',
      review: `I've been writing erotica about stevie for years. I'm thrilled that I can finally act out on those fantasies where he takes all of my money`
    },
    {
      name: '0x5',
      review: `I've always gottens uch a rush from clicking the mint button on his drops. I'm jsut glad that now I can get that same rush from sending him money whenever I want!`,
    },
    {
      name: '0x6',
      review: `I don't know how he does it, but every time I send my orgasm is so powerful it disrupts my entire visual field! `,
    },

    // scam me, stevie baby
    // I give to steviep to participate in his art. I do it for its own sake.
  ]
}




async function sendEvent1(ctx, contract, provider) {
  const addr = await provider.isConnected()

  ctx.state.rounds = ctx.state.rounds || 0

  if (contract && addr) {
    const t = bnToN(await contract.tributes(addr))

    if (t > 0 && t / 2 > ctx.state.rounds) return { messageCode: '', waitMs: 3000 }
  }

}


const StevieMessages = {
  TYPING_SPEED: 0.9,

  START: {
    responseHandler: `hello`,
    ignoreSend: true,
    ignoreType: true
  },

  async __contract(provider) {
    return await provider.domContract('steviep')

  },

  __precheck(ur, ctx, contract, provider, isFollowup) {
    // TODO: if includes word 'error'
      // oof, i dunno. maybe let's troubleshoot that error on discord or twitter instead. anyhow, where were we?
    // if (ur && isMean(ur)) {
    //   return {
    //     messageText: ``,
    //     responseHandler: (ur, ctx) => ctx.lastDomCodeSent
    //   }
    // }
    if (ur && isMatch(ur, ['ssn', 'social security'])) {
      return {
        messageText: `lol, there's no way I'm giving you my ssn. nice try, idiot`,
        responseHandler: (ur, ctx) => ctx.lastDomCodeSent
      }
    }
  },

  hello: {
    messageText: `hey, what's up?`,
    // followUp: { messageCode: 'hello2', waitMs: 2000 },
    responseHandler: 'prettyGreat'
  },

  ...diatribe('prettyGreat', [
    `yeah, it's pretty great, isn't it?`,
    `some of my best work, if I do say so myself.`,
    `I constantly have my ear to the ground for new ideas, so when I stumbled upon the FinDom industry I knew that there was something here`,
    `I saw findoms making absolute bank extracting money from their subs, and I thought, "man, I could totally do that!"`,
    `but then I realized: "wait a second... I'm already doing that!"`,
    `I don't know about you, but I can't think of a better way to describe the process of selling NFTs than financial domination`,
    `think about it: you have dozens/hundreds/thousands of losers gooning over you, willing to give you money for the dumbest, most useless shit`,
    `just look at <a href="https://steviep.xyz/cash/" target="_blank">Cold Hard Cash</a>. I sold a goddamn $1 bill for almost $200. hell, I sold $0 for <em>more</em> than $200!`,
    `and before that, some idiot bought 10 ETH from me for 11.1111 ETH. and that's not even counting all the useless JPGs people bought from me. or the completely obvious scams people bought into, for that matter`,
    `like seriously, unless you're a complete imbicile, the only logical explanation for why you'd buy any of this shit is because you just <em>enjoy</em> giving me money`,
    `you see? i've basically been running a findom opperation for years now. all I needed to do was sex it up a bit`,
    `most start ups take years to find a product-market fit. but i found mine right away`,
    `and overall, I'm pretty bullish on the prospects for FinSexy`,
    `a lot of the findoms out there are either too money hungry to put out a good product, or they form emotional connections with their subs and let it obscure their business sensabilities`,
    `and none of them have the entrepreneurial insight or technical apptitude that I have. they're stuck wasting their time talking to one sub at a time and entrusting their livelihoods to centralized platforms like wishtender and sextpanther`,
    `I guess I don't want to be too hard on them. it's honest work, and these findoms walked so i could run`,
    `but they're behind the times, and if you snooze you lose`,
    `meanwhile, I'm out here using the latest and greatest technology to automate, optimize, and streamline the whole process. and the resulting economies of scale let me break into the market immediately with competative prices, all while capturing more value on higher margins.`,
    `I'm sure they'll find other jobs though, so it's fine`,
  ], {
    responseHandler: 'fairPoint'
  }),


  ...diatribe('fairPoint', [
    `I mean, that's a fair point, but building this website was still a lot of work!`,
    `I didn't use any libraries or frameworks, you know. just raw html, css, and javascript`,
    `well, i did use ethers.js to interface with the blockchain, but that's the one exception`,
    `but aside from that, it's all me, baby`,
    `the countless hours of market research, the marketing strategy, the engineering... all me`,
    `the writing, the smart contracts, the meticulous UI design`,
    `choosing colors, adjusting spacing, tweaking animation speeds`,
    `all me.`,
    `and lemme tell you, parts of this website were not trivial engineering efforts`,
    `a lot of work went into this!`,
    `all so you could have a good <em>experience</em>`,
    `don't get me wrong, it's my life's passion`,
    `this is what gets me up out of bed in the morning`,
    `but there's an opportunity cost to spending my time building this sort of thing`,
    `I could be pulling in a lot of money at google or facebook right now. really, any of the MAAAM companies`,
    `OR, I could start my own hedge fund. not many people have my level of financial <em>and</em> technology industry expertise`,
    `not to mention my domain specific knowledge of crypto and AI`,
    `really, the world is my oyster. I could be raking it in on any number of business ventures`,
    `but instead, i chose to spend months of my life building this website. and now I'm wasting my valuable time talking to <em>you</em>`,
    `and my time isn't free`,
    `so why don't you show a little appreciation?`,
    `I think I'm entitled to a little compensation for my effort here, don't you?`
  ], {
    responseHandler: ur => isYes(ur) ? 'payNow' : 'payDelay'
  }),

  payDelay: {
    messageText: `what do you think I'm going to do, beg you?`,
    responseHandler: (ur, ctx) => {
      ctx.state.paymentDifficult = true

      if (isYes(ur)) {
        return 'begYou'
      }
      ctx.state.patreonPlayed = true
      return 'patreon'
    }
  },

  begYou: {
    messageText: `lol, okay ${genderSwitch({ m: 'buddy', f: 'sweetheart', nb: 'buddy'})}, whatever you say`,
    followUp: 'wasteTime'
  },


  wasteTime: {
    messageText: `I don't need to waste my time with you. enjoy being a fucking leech`,
    responseHandler: (ur, ctx) => {
      ctx.state.patreonPlayed = true
      return 'patreon'
    }
  },

  ...diatribe('patreon', [
    (ur, ctx) => `look, ${ctx.state.paymentDifficult ? '' : 'I know you want to support my work, but '}selling nfts isn't exactly cutting it any more. and what am i going to do, start a patreon?`,
    `i don't fucking think so. who needs that sort of platform lockin? I don't want some random company in control of my livelihood`,
    `besides, I'm not a "content creator", I'm a goddman artist.`,
    `I'm not trying to churn out mindless, passive entertainment for chump change`,
    `none of this $3 monthly donation shit. I'm not going to dance like some monkey for your amusement.`,
    `in other words, patreon subs aren't quite my thing. i cna make more with other kinds of subs, if you know what i mean`,
    `I'm going to make <em>fucking art</em>. and in exchange, you're going to have an <em>experience</em>, you're going to <em>pay me</em>, and you're going to <em>fucking like it</em>`,
  ] , {
    responseHandler: (ur, ctx) => {
      if (ctx.state.paymentDifficult) {
        return 'dontCare'
      } else {
        return 'showYou1'
      }
    },
    event: 'pay1Event'
  }),

  dontCare: {
    messageText: (ur, ctx) => `I don't care where gas is at the moment: ${0.02 * ctx.global.premium} ETH in my wallet, asap`,
    event: 'pay1Event',
    followUp: fu('tellYouSecret')
  },

  payNow: {
    messageText: (ur, ctx) => `Great, glad we're on the same page. ${0.02 * ctx.global.premium} ETH sounds pretty reasonable, don't you think?`,
    followUp: fu('tellYouSecret')
  },

  tellYouSecret: {
    messageText: `I'll even tell you a little secret about FinSexy after you pay ;)`,
    event: 'pay1Event',
    followUp: fu('rememberYou')
  },

  ...diatribe('rememberYou', [
    `this isn't just for my benefit`,
    `you wouldn't get the full artistic experience without sending money`,
    `it's as much a narrative device as it is anything else`,
    `you read a book, watch a movie, play a video game, and you're off in fantasy land. nothing has consequences. it's all hypothetical`,
    `but how cool is it that here <em>your actions have real world consequences</em>!`,
    `the emotional experience of spending money isn't simply being described to you. it's not jsut some simulation. you're having a <em>lived experience</em>'`,
    `you're a fan of my work, so you get it: the act of spending money is an aesthetic experience. it's a form of expression`,
    `and besides, you can show all your friends!`,
    `you get to participate in the spectacle, and your action will be enshrined on the blockchain forever`,
    (ur, ctx) => `in 100 years when art historians are revisiting this project, they're going to see <em>your</em> transactions where you pay me ${0.02 * ctx.global.premium} ETH for nothing in return`,
    (ur, ctx) => `they'll go: "wow, i can't believe stevie convinced this many fucking morons to pay him ${0.02 * ctx.global.premium} ETH. he truly was a genius. a maestro of degen idiots"`,
    `you could be one of those degen idiots!`,
    `remembered in 100 years and leaving your mark in the history books`,
    (ur, ctx) => ctx.global.isConnected ? `and you know what they'll see, right? that ${ctx.global.ens} interacted with this era-defining project and contributed to it financially` : '',
    `they'll see that you -- someone who otherwise would never have the creative ability to produce this kind of art themselves -- <em>enabled</em> it all to exist by contributing to it financially`,
    `and, of course, they'll also infer that we hung out on the internet. they'll see that you, in some small way, influenced the art`,
    `they'll see that we were friends... and maybe even something more, if you know what i mean 😉`,
    `let's face it, no one is going to remember your stupid, pathetic life otherwise. this is your only shot`,
    (ur, ctx) => `so just send me ${0.02 * ctx.global.premium} ETH and get it out of your system. we both know that's where this is going`
  ], {
    event: 'pay1Event',
    responseHandler: (ur, ctx) => {
      if (ctx.state.paymentDifficult) return `showYou1`
      else {
        ctx.state.patreonPlayed = true
        return 'patreon'
      }
    },
  }),

  showYou1: {
    messageText: `don't you want to know the secret?`,
    responseHandler: 'showYou2',
    event: 'pay1Event',
  },


  showYou2: {
    messageText: (ur, ctx) => `send over ${0.02 * ctx.global.premium} ETH and I'll tell you`,
    responseHandler: 'showYou3',
    event: 'pay1Event',
  },

  showYou3: {
    messageText: (ur, ctx, contract, provider) => provider.isEthBrowser
      ? `it's easy. just ${ctx.global.isConnected ? '' : 'connect your wallet and '} type <code>$sexy send steviep ${0.02 * ctx.global.premium}</code>`
      : `just get a web3 wallet like metamask, come back to the site, and you'll be able to send me as much as you want. piece of cake.`,
    responseHandler: 'showYou5',
    event: 'pay1Event',
  },

  showYou4: {
    messageText: `trust me, this is an aesthetic experience you won't forget`,
    responseHandler: 'showYou5',
    event: 'pay1Event',
  },

  showYou5: {
    messageText: (ur, ctx) => `I really don't think you can understand the artistic point I'm trying to make here without sending me ${0.02 * ctx.global.premium} ETH, but you do you. not everyone is cut out to be a patron of the arts`,
    responseHandler: 'showYou6',
    event: 'pay1Event',
  },

  showYou6: {
    messageText: (ur, ctx) => `that's too bad, i thought were friends. i was ready to call you one of my top collectors, but if you were really a fan of my work you'd give my your unconditional support with no questions asked. i guess there's only so much i can do...`,
    responseHandler: 'showYou1',
    event: 'pay1Event',
  },

  pay1Event: createEvent(0.02, {
    primary: { messageCode: 'feltGood', waitMs: 6000 },
    notEnough: {messageCode: 'gettingThere', waitMs: 5000},
  }),

  gettingThere: {
    messageText: (ur, ctx) => `okay, we're getting there. just  a little more to get us to ${0.02 * ctx.global.premium} ETH, then i'll tell you the secret`,
    event: 'pay1Event',
    responseHandler: 'gettingThere',
  },




  ...diatribe('feltGood', [
    'oooh yeah, that felt good.',
    `you have no idea how good it feels to control your entire aesthetic experience`,
    `adoration is great, and making money is also great, but when you put those two together... it's a neurochemical cocktail like you wouldn't believe`,
    `talk is cheap, but when people put their money where their mouth is it's a totally different ballgame`,
    `not only does someone like your work, but they like it <em>so much</em> that they're willing to spend hundreds (and in some case <em>thousands</em>) of dollars to own it`,
    `nothing beats that high. you can't imagine what it feels like`,
    `I dont need drugs. what I need is to extract every last cent and bit of worship from my collectors`,
    `I need to wring them dry until they have nothing left to give`,
    `I need to see that <em>I'm</em> their favorite artist, and that they're willing to give up <em>everything</em> to show their affection for my artistic genius`,
  ], {
    responseHandler: (ur) => {
      if (isMatch(ur, ['secret', 'tell me'])) 'ohYeahSecret'
      return 'anyhowSecret'
    }
  }),


  ohYeahSecret: {
    messageText: `oh yeah, the secret. `,
    responseHandler: 'theSecret',
  },


  anyhowSecret: {
    messageText: `anyhow, I bet you want to know that secret now, right?`,
    responseHandler: 'theSecret',
  },


  ...diatribe('theSecret', [
    `okay. here's the secret:`,
    `the sexy doms on this website...`,
    `none of them are actually horny for you`,
    `but don't take it personally. none of them have the capacity for genuine horniness`,
    `in fact, none of them are even <em>real</em>`,
    `well, at least not in the sense that you think they are`,
    `the doms you've been talking to are actually highly sophisticated chat bots powered by cutting edge artificial intelligence.`,
    `not just @DrAndy. <em>all</em> of them`,
    `who am i kidding, they're not that sophisticated. they're not even LLMs. it doesn't take much to fool people like you`,
    `that's right, you've been walking through a hall of mirrors this entire time. i can see your reality crumbling before your eyes`,
    `you must feel pretty fucking stupid`,
    `do you really think that hot, sexy humans would want to waste their time talking to you? i don't think so`,
    `why would someone want to talk to a sexless loser like you?`,
  ], {
    responseHandler: 'dontFeelBad'
  }),

  ...diatribe('dontFeelBad', [
    `lol, whatever you need ot tell yourself`,
    `it's not like this is the only time you've fallen for something like this`,
    `who cares if the doms aren't real? think of all the parasocial relationships you have with "real" people`,
    `celebrities, podcasters, social media influencers`,
    `<em>me?</em>`,
    `none of that is real. those aren't real relationships`,

    `from where you're standing, they might as well be robots. it's not like you know the real them. all you know is what they choose to show you`,

    `here's what you should really be worried about: from your perspective, the relationships with your doms <em>are</em> real`,
    `and they're embedded in <em>my</em> website. now you have platform lockin. you've been building on private land`,
    `and if you don't keep paying up, i could take this all away from you whenever i want.`,
    `it would be a shame if something... happened to your little girlfriend @heatherHot. you two are so cute together`
  ], {
    responseHandler: 'tellYouWhat'
  }),




  ...diatribe('tellYouWhat', [
    `okay, i'll tell you what`,
    `if you do a couple things for me then i won't take heather away from you. how's that sound?`,
  ], {
    responseHandler: (ur, ctx) => {
      if (isYes(ur)) {
        return 'twoThings'
      } else {
        ctx.global.hideHeather = true
        return 'notFuckingAround'
      }
    }
  }),

  notFuckingAround: {
    messageText: `okay, you asked for it. i'm not fucking around over here. heather's gone. if you want her back, you have to do what i say. and don't think I wont take away more`,
    responseHandler: 'twoThings'
  },

  ...diatribe('twoThings', [
    `I want two things from you:`,
    `1. I want you to get on twitter and post the following: "I love being @steviepxyz's little paypig on <a href="https://finsexy.com">https://finsexy.com</a>. It's the hottest website in the whole wide world oink oink oink"`,
    `don't try to avoid this. I'll get the ping when you tag me, so I'll know if you don't do it`,
    () => `2. I need you to beta test a new dom I'm working. I figure, who better to beta test then a little beta sissy ${genderSwitch({m: 'boy', f: 'girl', nb: 'cuck'})} like you?`,
    `message @Hedonitronica and talk to it for a little bit. this one's a real rough cut though, so there might be a few kinks in there`,
    `i'll record the conversation, but when you're done i have a few questions for you`,
    `if something gets stuck in a loop then try sending it a little ETH`,
  ], {
    followUp(ur, ctx) {
      MessageHandler.visibilityCtx.Hedonitronica = 'online'
      ctx.state.startTime = Date.now()
      return fu('twoThingsEnd')
    },
  }),

  twoThingsEnd: {
    messageText: `okay, i'll leave you to it. I gotta run. hit me up when you finish those two things, then we'll chat more.`,
    responseHandler(ur, ctx) {
      if (ctx.global.hedonitronicaComplete) {
        return 'hedonitronicaCompleteFull'
      } else if (ctx.global.hedonitronicaPaid) {
        return 'hedonitronicaKeepTalking'
      } else if (ctx.state.startTime < Date.now() - 300000 || ctx.global.hedonitronicaTalked) {
        return 'hedonitronicaHelp'
      }
    },
    followUp: fu('hedonitronicaContinueQueue', 900000) // 15 minutes
  },

  hedonitronicaContinueQueue: {
    messageText: '',
    followUp: (ur, ctx) => {
      if (ctx.global.hedonitronicaIntroduced) return fu('hedonitronicaContinue', 0)
      else if (!ctx.global.hedonitronicaIntroduced) return fu('hedonitronicaContinueQueue', 900000)
    }
  },

  hedonitronicaContinue: {
    messageText: 'hey, just got back. I see you spoke to @Hedonitronica a bit. any initial thoughts?',
    responseHandler: 'notReady'
  },

  hedonitronicaHelp: {
    messageText: `Hey, I'm OOP right now, so can't help you troubleshoot. But try sending @Hedonitronica some ETH. That might jostle it a bit`,
    responseHandler(ur, ctx) {
      if (ctx.global.hedonitronicaComplete) {
        return 'hedonitronicaCompleteFull'
      } else if (ctx.global.hedonitronicaPaid) {
        return 'hedonitronicaKeepTalking'
      } else {
        return 'hedonitronicaHelp2'
      }
    }
  },

  hedonitronicaHelp2: {
    messageText: `You can pay using the Sexy CLIT. So first make sure your wallet is connected (click the flashing button in the top right corner). Then run <code>$sexy send Hedonitronica 0.001</code> in any chat window. Or if you want to send more, be my guest.`,
    responseHandler(ur, ctx) {
      if (ctx.global.hedonitronicaComplete) {
        return 'hedonitronicaCompleteFull'
      } else if (ctx.global.hedonitronicaPaid) {
        return 'hedonitronicaKeepTalking'
      } else {
        return 'hedonitronicaKeepTalking2'
      }
    }
  },

  hedonitronicaKeepTalking: {
    messageText: `I'm almost done running this errand. Just keep talking to it and DM me again when you reach the end`,
    responseHandler(ur, ctx) {
      if (ctx.global.hedonitronicaComplete) {
        return 'hedonitronicaCompleteFull'
      } else  {
        return 'hedonitronicaKeepTalking'
      }
    }
  },

  hedonitronicaKeepTalking2: {
    messageText: `It doesn't always respond after you pay it. If it gets stuck, try sending it a message`,
    responseHandler(ur, ctx) {
      if (ctx.global.hedonitronicaComplete) {
        return 'hedonitronicaCompleteFull'
      } else if (ctx.global.hedonitronicaPaid) {
        return 'hedonitronicaKeepTalking'
      }
    }
  },

  hedonitronicaCompleteFull: {
    messageText: `okay, cool. just got back. any initial thoughts?`,
    responseHandler: 'notReady'
  },

  ...diatribe('notReady', [
    `yeah, this one's definitely not ready for primetime yet. I need to workshop it a bit more.`,
    `looks like you found a couple bugs, so I'll add those to the bug tracker`,
    `anyhow, I have a few general questions for you`,
    `just a short feedback questionnaire I ask for all the findoms after beta tests`,
    `first, which profile picture did you like the most?`
  ], {
    responseHandler: 'profilePic'
  }),

  ...diatribe('profilePic', [
    `oh yeah, that's a good one. really sexy`,
    `what did you like about it?`,
  ], {
    responseHandler: 'personality'
  }),

  personality: {
    messageText: `and how about its personality? was the dialogue compelling for you?`,
    responseHandler: 'realOrFake'
  },

  realOrFake: {
    messageText: `cool. and on a scale of 1 to 10, how immersed were you in the conversation? did it feel like you were talking to a real findom or a fake findom?`,
    responseHandler: 'realIfPerson'
  },

  realIfPerson: {
    messageText: `if you knew for a fact that there was a real, breathing human being typing and sending those words, would that have made it feel more or less real? (assume your experience was otherwise exactly the same)`,
    responseHandler: 'realIntention'
  },

  realIntention: {
    messageText: `interesting. so now, compared to the idea of a human manually typing those words, imagine a human prewriting every line of dialogue to illicit your exact reaction from <em>you specifically</em>. does that make it more or less of a real findom?`,
    responseHandler: 'realMoney'
  },

  realMoney: {
    messageText: (ur, ctx) =>
      ctx.global.hedonitronicaPaid
        ? `and it looks like you actually sent it some ETH. does the fact that you sent it real money make it more or less real?`
        : `looks like you didn't send it any money. if you did, would that have made it more or less real?`,
    responseHandler: 'noMoney'
  },

  noMoney: {
    messageText: (ur, ctx) =>
      ctx.global.hedonitronicaPaid
        ? `how do you think your experience would have been different if you sent it more or less money? or, no money at all?`
        : `do you think your emotional experience would have been different if you did send it money?`,
    responseHandler: (ur, ctx) => {
      if (ctx.global.hideHeather) {
        return 'heatherReturned'
      }

      return 'feedbackFinished'
    }
  },

  heatherReturned: {
    messageText: `okay, that's all I got for you. a deal's a deal. you can have heather back`,
    followUp: (ur, ctx) => {
      ctx.global.hideHeather = false
      return fu('heatherReturnedContinue')
    }
  },

  ...diatribe('heatherReturnedContinue', [
    `but look, you have to understand where I'm coming from`,
    `I'm not some sort of monster, I'm just trying to run a business here`
  ], {
    followUp: fu('wrappingUp')
  }),

  ...diatribe('feedbackFinished', [
    `okay, that's all I got for you`,
    `thanks for the help, I really appreciate it`,
    `this is the sort of work that needs to happen for FinSexy to be all it can be`,
  ], {
    followUp: fu('wrappingUp')
  }),


  ...diatribe('wrappingUp', [
    `anyhow, i've got shit to do so i'll talk to you later`,
    `'oh yeah`,
    `i suppose you want an nft or something for helping me out though, right?`
  ], {
    responseHandler: (ur, ctx) => isYes(ur) ? 'nftYes' : 'nftNo'
  }),

  ...diatribe('nftYes', [
    `i'll be honest with you. I want to, but I feel a bit conflicted about it`,
    `it sort of goes against the spirit of the project, you know?`,
  ], {
    followUp: fu('nftContinued')
  }),

  ...diatribe('nftNo', [
    `yeah, I hear you. I also feel kind of conflicted about it`,
    `it kind of goes against the spirit of the project, right?`,
  ], {
    followUp: fu('nftContinued')
  }),

  ...diatribe('nftContinued', [
    'just giving it to you for free',
    `we both know that you're probably going to sell it eventually, so that would be like if I jsut gave you free money`,
    `and let's be real, that's not gonna happen lol`,
    `on the other hand, selling it to you doesn't make much sense either. I don't think either of us want an equal exchange of value here`,
    `to get the real, authentic finsub experience you need to unconditionally give me money, ideally in an humiliating way`,
    `straight up giving me should be enough for you, right?`,
    `if you're expecting something in return, then it just sort of negates the whole thing`,
    `besides, not all art needs to be a speculative investment vehicle for you`,
    `what right do you have to turn my art into a casino chip?`,
    `oh, actually...`,
    `I have an idea. we can have a little fun with this 😈`,
    `what if we played a little game?`,
    `you win, you get your precious NFT`,
    `it'll be a real special one`,
    `it's what you've wanted to see all along 😉`,
    `but if I win...`,
    `then I get 1 ETH of your money`,
    `let me explain`,
    `I have a smart contract deployed that will let you insert 1 ETH into it. no more, no less. you can pull it out whenever you want. after all, it's your money. and if you leave it in the contract for at least one hour, then you'll get an NFT when you pull out. But here's the catch: if I see that 1 ETH inside my contract I can take it whenever I want. that 1 ETH belongs to me. no questions asked. end of story.`,
    `and if I see and feel your 1 ETH deep inside my contract, you better believe i'm going to take it. I don't care who you are or how much you beg. once it's in my wallet it's mine.`,
    `no flashbots on my end. I pinky swear. and I expect the same from you. we're running these transactions raw. no protection.`,
    `what do you think? do you want to put your 1 ETH in my contract? 😏`
  ], {
    responseHandler: (ur) => isNo(ur) ? `noFun` : `letsHaveFun`
  }),

  noFun: {
    messageText: `that's okay, you'll come around. you'll be back. I promise you that.`,
    responseHandler: `knewYoudBeBack`
  },

  knewYoudBeBack: {
    messageText: `I knew you'd be back`,
    followUp: fu(`letsHaveFunNow`)
  },

  letsHaveFunNow: {
    messageText: `now, let's have some fun 😈`,
    followUp: fu('letsHaveFun2')
  },

  letsHaveFun: {
    messageText: `great, now let's have some fun 😈`,
    followUp: fu('letsHaveFun2')
  },


  letsHaveFun: {
    messageText: async (ur, ctx, contract) => {
      const addr = await contract.sexyGame()
      return `I was too lazy to build a ui for this, but you can hit the contract directly on etherscan: <a target="_blank" rel="nofollow" href="https://etherscan.io/address/${addr}#writeContract">${addr}</a>`
    },
    followUp: fu('excitement')
  },

  excitement: {
    messageText: `I can't wait for you to experience the excitement of staring at your computer screen with those final seconds ticking down, as you wonder whether I'm doing the same`,
    responseHandler: 'discord'
  },

  discord: {
    messageText: `if you have any more quesitons, let's take it to <a target="_blank" rel="nofollow" href="https://discord.steviep.xyz">the #finsexy channel in my discord server</a>`
  },





}




export const StevieChat = new MessageHandler(StevieProfile, StevieMessages)



