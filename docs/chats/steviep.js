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
    - "talk to a few of the doms and come back to me" (if not talked to doms: "come on now, you need to spend more time than that")
    - "ok, i have a few questions for you. please take a second to think deeply about each question before oyu answer:"
      - "the findoms you interacted with: would you consider them real or fake?"
      - "what would make them realer? or faker?"
      - "would anything feel different about your findom experience if all the doms were humans? (nothing else about the experience has changed)"
      - "how does the act of actually paying real money affect your experience? do you think that paying fake money would make you feel any differently?"
      - "does it feel like the doms have distinct personalities? do you feel like your relationship with the doms are closer to your relationship with a fictional character in a movie or tv show, with a social media influencer you've never spoken to directly before, or an internet friend you've never met in person?"

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

  - @steviep is an artistic genius, and FinSexy is his masterpiece. Perhaps even his magnum opus. Of all the projects from this prolific artist, none so deftly tie together the themes that fans love him so much for: the nuanced social implications of spending money, scam aesthetics, the tension between authenticity and artificiality/simulation, the parody of crypto culture, the critique of the dopamine-driven manipulation of user interfaces -- it's all there. And at the same time, he's not just playing his greatest hits; FinSexy refreshingly explores new thematic ground. In particular, FinSexy does an amazing job of bringing exploring the nuance of sexual i

  something's really fucked up about this website, and I don't like it.
*/





import { isYes, isNo, isGreeting, isMean, MessageHandler, diatribe, createEvent } from '../state/conversationRunner.js'
import {getUserData, genderSwitch , interestedSwitch} from '../state/profile.js'

const fu = (messageCode, waitMs=3000) => ({ messageCode, waitMs })

export const StevieProfile = {
  name: 'steviep',
  age: 34,
  distance: 0,
  gender: 'Male',
  display: 'm',
  maxPhotos: 4,
  description: ``,
  testimonials: [
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
      name: '0x4',
      review: `What a hunk 😍`,
    },
    {
      name: '0x5',
      review: `I've always gottens uch a rush from clicking the mint button on his drops. I'm jsut glad that now I can get that same rush from sending him money whenever I want!`,
    },
    {
      name: '0x6',
      review: `I don't know how he does it, but every time I send my orgasm is so powerful it disrupts my entire visual field! `,
    },

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
  TYPING_SPEED: 0.7,

  START: {
    responseHandler: `hello`,
    ignoreSend: true,
    ignoreType: true
  },

  async __contract(provider) {
    return await provider.domContract('steviep')

  },

  __precheck(userResponse, ctx, contract, provider, isFollowup) {
    // TODO: if includes word 'error'
      // oof, i dunno. maybe let's troubleshoot that error on discord or twitter instead. anyhow, where were we?
    if (userResponse && isMean(userResponse)) {
      return {
        messageText: ``,
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
    `you know, i built this whole website from scratch`,
    `no frameworks, libraries, or anything. just raw html, css, and javascript.`,
    `well, i did use ethers.js to interface with the blockchain, but that's the one exception`,
    `but aside from that, it's all me`,
    `the writing, the smart contracts, the meticulous UI design`,
    `choosing colors, adjusting spacing, tweaking animation speeds`,
    `and lemme tell you, parts of this website were not trivial engineering efforts`,
    `a lot of work went into this!`,
    `all so you could have a good <em>experience</em>`,
    `don't get me wrong, it's my life's passion`,
    `this is what gets me up out of bed in the morning`,
    `but there's an opportunity cost to spending my time building this sort of shit`,
    `making stupid NFTs and websites and shitposts on twitter for your amusement`,
    `I could be pulling in a lot of money at google or facebook right now. really, any of the MAAAM companies`,
    `Or, I could start my own hedgefund. not many people have my level of financial <em>and</em> technology industry expertise`,
    `not to mention my domain specific knowledge in crypto or AI`,
    `really, the world is my oyster. I could be raking it in on any number of business ventures`,
    `but instead, i chose to spend months building this ridiculous website, and now I'm wasting my time talking to <em>you</em>`,
    `I think I'm entitled to a little compensation for my effort here, don't you?`
  ], {
    responseHandler: ur => isYes(ur) ? 'payNow' : 'payDelay'
  }),

  payDelay: {
    messageText: `what do you think I'm going to do, beg you?`,
    responseHandler: ur => isYes(ur) ? 'begYou' : 'noBeg'
  },

  begYou: {
    messageText: `lol, okay ${genderSwitch({ m: 'buddy', f: 'sweetheart', nb: 'buddy'})}, whatever you say`,
    followUp: 'wasteTime'
  },

  wasteTime: {
    messageText: `I don't need to waste my time with you. enjoy being a fucking leech`,
    responseHandler: 'noBeg'
  },

  ...diatribe('noBeg', [
    `look, i don't think you understand`,
    `the adoration is great, and making money is also great, but putting those two together is a neurochemical cocktail like you wouldn't believe`,
    `talk is cheap, but when people put their money where their mouth is it's a totally different ballgame`,
    `not only does someone like your work, but they like it <em>so much</em> that they're willing to spend hundreds (and in some case <em>thousands</em>) of dollars to own it`,
    `nothing beats that high. you can't imagine what it feels like`,
    `I dont need drugs. what I need is to extract every last cent and bit of worship from my collectors`,
    `I need to wring them dry until they have nothing left to give`,
    `I need to see that <em>I'm</em> their favorite artist, and that they're willing to give up <em>everything</em> to show their affection for my artistic genius`,
    `So here's what's going to happen: you're going to pay me, and you're going to fucking like it`,
  ], {
    responseHandler: (ur, ctx) => {
      if (ctx.state.noBegPlayed) {
        return 'payNowPending1'
      }
      ctx.state.noBegPlayed = true
      return 'dontCare'
    },
    event: 'pay1Event'
  }),

  dontCare: {
    messageText: (ur, ctx) => `I don't care where gas is at the moment: ${0.02 * ctx.global.premium} ETH in my wallet, asap`,
    event: 'pay1Event',
    followUp: 'tellYouSecret'
  },

  payNow: {
    messageText: (ur, ctx) => `Great, glad we're on the same page. ${0.02 * ctx.global.premium} ETH sounds pretty reasonable, don't you think?`,
    followUp: fu('tellYouSecret')
  },

  tellYouSecret: {
    messageText: `I'll even tell you a little secret about FinSexy after you pay ;)`,
    responseHandler: (ur, ctx) => {
      if (ctx.state.noBegPlayed) {
        return 'payNowPending1'
      }

      ctx.state.noBegPlayed = true
      return 'noBeg'
    },
    event: 'pay1Event'
  },

  ...diatribe('payNowPending1', [
    `this isn't just for my benefit`,
    `i don't think you'd get the full artistic experience of this website without sending money`,
    `it's as much a narrative device as it is anything else`,
    `you read a book, watch a movie, play a video game, and you're off in fantasy land. nothing has consequences and it's all hypothetical`,
    `but how cool is it that here <em>your actions have real world consequences</em>!`,
    `you're not having the emotional experience of spending money simply described to you. it's not jsut some simulation. you actually get to experience it directly`,
    `and you can show all your friends! your action will be enshrined on the blockchain forever, and you get to participate in the spectacle`,
    `you've seen this before with some of my other projects: the act of spending money is an aesthetic social experience. it's a form of expression`,
    (ur, ctx) => `in 100 years when art historians are revisiting this project, they're going to see <em>your</em> transactions where you pay me ${0.02 * ctx.global.premium} ETH for nothing in return`,
    (ur, ctx) => `they'll go: "wow, i can't believe stevie convinced this many fucking morons to pay him ${0.02 * ctx.global.premium} ETH. he truly was a genius. a maestro of degen idiots"`,
    `you could be one of those degen idiots!`,
    `remembered in 100 years and leaving your mark in the history books`,
/*

and you know what they'll see, right? that <ens/address> interacted with this era-defining project and contributed to it financially
they'll see that you -- someone who otherwise would never have the creative ability to produce such work themselves -- _enabled_ the work to exist by contributing financially
and, of course, they'll also infer that we hung out on the internet. they'll see that you, in some small way, influenced the art.
they'll see that we were friend... and maybe even something more, if you know what i mean 😉

*/
    `and let's face it, no one is going to remember your stupid, pathetic life otherwise. this is your only shot`
  ], {
    event: 'pay1Event',
    responseHandler: `showYou`
  }),

  showYou1: {
    messageText: `i'm telling you, this is an aesthetic experience you won't forget`,
    responseHandler: 'showYou2',
    event: 'pay1Event',
  },

  showYou2: {
    messageText: (ur, ctx) => `look, i'll show you. send over ${0.02 * ctx.global.premium} ETH and you'll see`,
    responseHandler: 'showYou3',
    event: 'pay1Event',
  },

  showYou3: {
    messageText: (ur, ctx) => `hey, i really don't think you can understand the point i'm trying to make here without sending me ${0.02 * ctx.global.premium} ETH, but you do you. not everyone is cut out to be a patron of the arts`,
    responseHandler: 'showYou4',
    event: 'pay1Event',
  },

  showYou4: {
    messageText: (ur, ctx) => `that's too bad, i thought were friends. i was ready to call you one of my top collectors, but if you were really a fan of my work you'd give my your unconditional support with no questions asked. i guess there's only so much i can do...`,
    responseHandler: 'showYou4',
    event: 'pay1Event',
  },

  pay1Event: createEvent(0.02, {
    primary: { messageCode: 'feltGood', waitMs: 3000 },
    notEnough: {messageCode: 'TODO', waitMs: 2000}
  }),




  ...diatribe('feltGood', [
    'oooh yeah, that felt good.',
    `you have no idea how good it feels to control your entire aesthetic experience`,
    `I bet you want to know that secret now, right?`,
    `okay. here's the secret:`,
    `the sexy doms on this website...`,
    `none of them are actually horny for you`,
    `but don't take it personally. none of them actually have the capacity for horniness`,
    `in fact, none of them are even <em>real</em>`,
    `the doms you've been talking to are really highly sophisticated chat bots powered by cutting edge artificial intelligence.`,
    `not jsut Dr. Andy. <em>all</em> of them`,
    `you must feel pretty fucking stupid`,
    `who am i kidding, they're not that sophisticated. they're not even LLMs. it doesn't take much to fool people like you`,
    `regardless, the wool has been pulled over your eyes this entire time. you've been living in a den of lies. walking through a hall of mirrors. i can see your reality crumbling`,
    `do you really think that hot, sexy human doms would want to waste their time talking to you? i don't think so`,
    `why would someone want to talk to a sexless loser who wastes all their time messing around with fake internet money?`,
  ], {
    responseHandler: 'dontFeelBad'
  }),

  ...diatribe('dontFeelBad', [
    `I wouldn't feel too bad about it though. it's no big deal`,
    `it's not like this is the only time you've fallen for something like this`,
    `who cares if the doms aren't real? think of all the parasocial relationships you have with "real" people`,
    `celebrities, podcasters, social media influencers`,
    `<em>me?</em>`,
    `none of that is real. those aren't real relationships`,
    `from where you're standing, they might as well not even be real people. it's not like you know the real them. all you know is what they choose to show you on the internet`,
    `here's what you should really be worried about: from your perspective, the relationships <em>are</em> real`,
    `and they're embedded in <em>my</em> website. now you have platform lockin. you've been building on private land`,
    `and if you don't keep paying up, i could take this all away from you whenever i want.`,
    `it would be a shame if something... happened to your little girlfriend @heatherHot. you two are so cute together`
  ], {
    responseHandler: 'tellYouWhat'
  }),

  ...diatribe('tellYouWhat', [
    `okay, i'll tell you what`,
    `if you do a couple things for me then i won't take heather away from you. how's that sound?`
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
    `okay, I want two things from you:`,
    `1. I want you to get on twitter and post the following: "I love being @steviepxyz's little paypig on https://finsexy.com. It's the hottest website in the whole wide world. oink oink oink"`,
    `don't try to avoid this. I'll get the ping when you tag me, so I'll know if you don't do it`,
    () => `2. I'm working on a new dom, and I need to run it through some beta testing. so who better to beta test then a little beta sissy ${genderSwitch({m: 'boy', f: 'girl', nb: 'cuck'})} like you?`
  ])



}

/*


But I'll tell you another secret:
I've been watching you this entire time, sending money to my creations
And it's abolutely thrilling.
You can't imagine the rush I feel.
Not just from creating an experience so immersive that you've completely lost sight of reality
And not just from taking your money
But from doing both simulteneously.


But don't worry about it. It's no big deal.
It's not like this is the only time the wool's been pulled over your eyes.
Who cares if the doms aren't real?
Think of all the parasocial relationships you have with "real" people
celebrities, podcasters, social media influencers
those aren't real relationships. They're all parasocial.
From where you're standing they might as well not be real.

Do you really think that hot, sexy humans would want to talk to you?
Fuck no.
You're a goddamn loser.
Do you know how hard it would be to get an attractive (man/woman) to talk to you?
I know you're sexless loser

I have you wrapped around my finger.





In fact, none of them have the capacity for horniness
They're just putting on a show for your benefit
Trying to extract as much money out of you as possible







Thought Prompts

  - NFT-findom-content creator power dynamic
  - rewards
  - https://twitter.com/Aella_Girl/status/1750722719438536825

  - how does it feel to findommed by a bunchg of fucking chatbots in your web browser? they're not even LLMs!

  - yeah, you like it when i sell you totally worthless NFTs, don't you?





That's right, you're in the palm of my hand
I'm controlling your entire aesthetic experience

If you really appreciated my art you'd fucking pay me
Isn't experiencing my art good enough?
Why should i subject my art to being a casino chip that you can gamble on?


I feel like there are two ways to make a living as an artist on the internet. You can either be a dom or a sub. A lot of artists are subs. they're like cam girls who are dancing for the amusement of the viewer. They're just looking for sugar daddies. In a lot of ways they're also like strippers, dancing and trying to collect as much monetary ejaculation as they can.




where their monetary ejaculate is thrown my way. strip clubs are funny because people will show how they're feeling by throwing a wad of money at someone. people express themselves with money. and it's funny how throwing that wad of money constitutes a taxable event. that's a transaction.



hey, look
i'm just trying to create the sexiest possible experience here




[try to capture the simultaneous self-agrandizement and utter disdain for those who like my work]

general threat that i won't be your friend if you don't pay me money
guilt user into paying me money
parasocial relationship

"What do you think?........ I don't actually care what you think." (disregards statement and keeps going)



Hey there, how do you like the website so far?


Glad to hear it. it is pretty great, isn't it?


(if not much eth has been given)
  you know, you should really send some (more) ETH to the doms
(if sent a lot of eth)
  I'm glad to see that you're sending to the doms

after all, websites like this take a lot of time to build
you'd probably be surprised with how much time and effort goes into something like this
and not just anyone can do this sort of thing effectively
in fact, i'd say most people -- most artists, even -- don't have the ability to create an immersive web/crypto experience that's so far outside the box

these are the sorts of legacy-defining projects that differentiate internationally famous artists, such as myself, from the schlubus
and likewise, this is what separates patrons like you -- who clearly have taste -- from the cultureless swine on crypto twitter



I know what you're thinking though: you resonate with the piece, but you're hesitant to put some moeny down because there's nothing in it for you?
you think there's not much for you to buy and easily speculate on.
and yeah, that's true. but you're also smart enough to realize that there's more to life than making money
what do you plan to _do_ with all the money? you ultimately want to spend it on enriching your life, right? defining a legacy for yourself?


you understand that in 100 years, when the all aspects of culture and commerce are mediated by the blockchain, scholars will look back on this period






That's great because I put a lot of work into it.



Oh, you want a VIP membership? I don't think so. Those are reserved for

I could give you an NFT, but I dunno. These NFTs are reserved for _real_ collectors of my work.

Okay, I'll tell you what. If you send me







Here's what we're gonna do


I have a contract deployed at 0x...., where you're going to stake 1 ETH.
You can unstake this whenever
But here's the catch: This contract will let me drain its balance whenever i want.
If you leave it staked for at least 1 hour, I'll give you an NFT. But if you're a little bitch and unstake it before the hour's up, you get nothing.

Oh yeah, also I can also sell this drainer role to whoever i want.







"I dunno, I'll be honest with you. I'm a bit conflicted about sending you an NFT. "
"it kind of feels like it goes against the spirit of this project, you know what i mean?"
"finsubs get off on sending their doms money"
"collectors get off on supporting artists"
"and hell, patreon's entire business model is based around unconditionally giving money to content creators"
"why should i give you some fucking token that you can use as a speculative vehicle?"
"isn't just giving me the money enough?"
"I've sold people negative amounts of money, sold 10 ETH for 11.1111 ETh, and sold $0.00 for $213"
"I truly can't explain all of that other than by saying that NFT collectors are pay pigs"
"they have to get some satisfaction out of paying me money. "
"either because it's supporting me, or because it lets them participate in the spectacle of the project -- they understand that they're part of the art, and the more money they throw downt he drain the better the art is."
"they can't possibly think that this is a wise investment."
"well, i'm sure some idiots do. who knows."
"anyhow, my point is: why not just take the meaningless token out fo the equation?"

"you know what? i don't think i'm going to send you an NFT"
"supporting my art practice should be enough for you"
"what right do you have to turn my work into a casino chip?"
"I dont care if you don't make your money back"
"If you can't afford to give me your money with no strings attached, then you shouldn't even be playing around with NFTs. go spend your money on something else"
"I'm under no obligation to give you a goddamn thing."
"no, I won't give you an NFT."
"that is, not unless you beg for one..."

"say 'please'"

"'please stevie, give me an NFT to help fill the void of my meaningless existence'"

"yeah, you like begging, don't you?"



if ask for SSN
  lol, i'm not giving you my ssn.





making art is too much of a fucking pain in the ass. it's way easier to conStevie idiots like you to just give me money.

why bother grinding out these stupid generative art projects?
busting my ass to make sure that every output looks great
who fucking cares?




I'll tell you what.
I'm too lazy to build this into the UI, so you'll have to do this all directly from etherscan




I'll let you on on a little secret
Don't tell anyone though
Top secret info
But first, you gotta pay up.
You don't think I'd tell you for free, did you?



Okay






CHALLENGE:
  - some cheap NFT to mint with arbitrary stupid features
  - you need to collect a "full set" of findom tribute tokens to get some other stupid shit
  - riff on $GOO, or some stupid staking/erc20 metchanism





*/
export const StevieChat = new MessageHandler(StevieProfile.name, StevieMessages)



