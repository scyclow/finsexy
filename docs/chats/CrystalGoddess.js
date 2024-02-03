import { isYes, isNo, isGreeting, isMean, MessageHandler, responseParser, diatribe } from '../state/conversationRunner.js'
import {getUserData, genderSwitch , interestedSwitch} from '../state/profile.js'
import {provider, bnToN} from '../eth.js'



function getZodiacSign(timestamp) {
  const date = new Date(timestamp)
  const month = date.getMonth() + 1
  const day = date.getDate()

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
    return 'Aries'
  } else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
    return 'Taurus'
  } else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
    return 'Gemini'
  } else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
    return 'Cancer'
  } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
    return 'Leo'
  } else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
    return 'Virgo'
  } else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
    return 'Libra'
  } else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
    return 'Scorpio'
  } else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
    return 'Sagittarius'
  } else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
    return 'Capricorn'
  } else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
    return 'Aquarius'
  } else {
    return 'Pisces'
  }
}


async function tributeEvent(ctx, contract, provider) {
  const addr = await provider.isConnected()

  if (contract && addr) {
    // const t = bnToN(await contract.tributes(addr))

    // if (t > ctx.state.rounds) return { messageCode: 'soGood', waitMs: 6000 }
  }

}



const fu = (messageCode, waitMs=3000) => ({ messageCode, waitMs })




export const CrystalGoddessProfile = {
  name: 'CrystalGoddess',
  age: 31,
  distance: 16,
  gender: 'Female',
  maxPhotos: 4,
  description: `Bow down to Crystal Goddess. I'm going to suck you dry and drain you till it hurts. `,
  testimonials: [
    {
      name: '0x1',
      review: `I came so hard that I don't even know what money is any more.`,
    },

    // I do not deserve this money



    // {
    //   name: '0x1',
    //   review: `Goddess is definitely not a starter dom. It's not a great idea to play with her unless you've done this before. I went to her at a low point in my life. I was sending to doms so often that I didn't even get pleasure from it any more. It left me feeling pretty emotionally drained, and Goddess drained what was left from my wallet. She also drained what was left in my balls.`,
    // },

    {
      name: '0x1',
      review: `Thank you so much Goddess for draining me. You give me purpose in my miserable, pathetic life 🙏`,
    },

  // - testimonials "i've always been afraid of approaching women in bars"
  // - SweetSalvation: "i'd rather be giving my hard earned money to this pretty girl than let the government pry it from y cold dead hand when they come around looking for taxes because the government can't tell either of us what to do as consenting adults who want to form a business relationship with one another that benefits her and it benefits me."
  // - "as a woman myself, i find it so much easier to submit to a strong, powerful woman of color"

  // - "My entire life, society has been telling me that my worth as a man is determined by how attractive my woman is. The career, the money, the hours in the gym -- none of it matters if you can't translate that into a hot woman. So striking out on the dating scene over, and over, and over again just left me feeling like a failure. I was less of a man. Not only did ___ help me realize all this, but she also fills that hot-woman role for me for a modest amount of money! My value as a man has never been higher, and I owe it all to ___"

  ]
}


export const CrystalGoddessMessages = {
  TYPING_SPEED: 1.5,
  START: {
    responseHandler: `hello`,
    ignoreSend: true,
    ignoreType: true
  },
  async __contract(provider) {
    return await provider.domContract('CrystalGoddess')
  },

  __precheck(userResponse, ctx, contract, provider, isFollowup) {
    // if (ctx.state.blocked) {
      // TODO return event that unblocks upon send
      // return {}
    // }
    // if (userResponse && isMean(userResponse)) {
    //   // return {
    //   //   messageText: `Congratulations. You just earned yourself a 0.01 ETH unblock fee.`,
    //   //   responseHandler: (ur, ctx) => {
    //   //     ctx.state.blocked = true
    //   //     return ctx.lastDomCodeSent
    //   //   }
    //   // }
    // }
  },


  hello: {
    messageText: 'Greetings, my little money slave',
    followUp: fu('godIsWoman')
  },

  godIsWoman: {
    messageText: `Are you surprised to learn that God is a woman?`,
    responseHandler: ur => isNo(ur)
      ? `unsurprised`
      : `surprised`
  },

  unsurprised: {
    messageText: `Of course not. When you envision the platonic ideal of perfection, does anything other than my perfect body come to mind?`,
    responseHandler: ur => isNo(ur) ? 'knowSoMuch' : 'pity'
  },

  knowSoMuch: {
    messageText: `You think you know so much, don't you?`,
    followUp: (ur, ctx) => {
      ctx.state.knowSoMuch = true
      return fu('doNotUnderstand')
    }
  },




  surprised: {
    messageText: `Of course you are. Your stupid little mind can't comprehend anything other than what's been told to you by so-called "holy" men`,
    followUp: fu('doNotUnderstand')
  },


  pity: {
    messageText: genderSwitch({
      m: `Your pitifully small sphere of conscious awareness is matched only by your tiny genitals`,
      f: `I will take pitty on you, given the profound level of deception you have suffered at the hands of this patriarchal society`,
      nb: `I will take pitty on you, given the profound level of deception you have suffered at the hands of this patriarchal society`
    }),
    followUp: fu('doNotUnderstand')
  },

  ...diatribe('doNotUnderstand', [
    (ur, ctx) => `${ctx.state.knowSoMuch ? 'But there' : 'There'} is ${ctx.state.knowSoMuch ? 'still ' : ''}so much you do not understand. I see you, staying up late at night, staring into the deep void of your computer screen, ${genderSwitch({m: 'erection', f: 'vulva', nb: 'genitals'})} in hand, praying to the false idol of market analysis`,
    `Seeking patterns in chaos. Trend lines, Candlesticks, Ichimoku Clouds. Religiously tracking memes and metas`,
    `You worship the aura of the rare, searching for a Holy Grail. You see monkeys with coins in their eyes and mistake that for wealth. You live your life believing you can take your money with you upon your death. But you do not understand that Charon's Obol will only get you across the lake of fire`,
    `The simple fact that you are here shows that you've been lead astray`,
    `@SamanthaJones may have seen all of your transactions, but I've seen more`,
    `Goddess knows all`,
  ], {
    followUp: fu('doYouWish', 6000)
  }),

  doYouWish: {
    messageText: `Do you accept your follies and wish to repent for your sins?`,
    responseHandler: ur => isYes(ur) ? 'repent' : 'fool'
  },


  fool: {
    messageText: `That is because you are truly a fool`,
    followUp: fu('relent')
  },

  relent: {
    messageText: `But I am a merciful Goddess. I will be here when you ultimately relent`,
    responseHandler: 'doYouWish'
  },

  repent: {
    messageText: `Then bow down, and acknowledge me as your Goddess. Take a vow of devotion to me`,
    responseHandler: ur => responseParser(ur).includes('i make a vow of devotion to you my goddess')
      ? 'vowDevotionSuccess'
      : 'vowDevotionFailure'
  },

  vowDevotionFailure: {
    messageText: `I think the words your looking for are: "I make a vow of devotion to you, my goddess"`,
    responseHandler: ur => responseParser(ur).includes('i make a vow of devotion to you my goddess')
      ? 'vowDevotionSuccess'
      : 'vowDevotionFailure'
  },



  vowDevotionSuccess: {
    messageText: `Excellent.`,
    followUp: fu('divineOwnership')
  },

  ...diatribe('divineOwnership', [
    () => `In taking this vow of devotion, you acknowledge that I, your Goddess, claim divine ownership over you, ${getUserData('name')}`,
    `You relenquish control over the entirety of your digital assets, as you have found the burden of self-sovereign ownership to be too much for your soul to bear. The responsibility of free will has overwhelmed you. Your stupid little mind collapses under the slightest pressure of decision making`,
    `You can feel the weight of this load draging you down by your loins. You know that you are not truly free until you achieve the release of being unburdened. Until you give yourself over to me. Only then will the weight be lifted from your shoulders`,
    `You <em>need</em> Goddess to unburden you. To take control of your wallet and make the decisions you cannot trust yourself to make`,
    `And this is why you relenquish control to me: Because you are weak. Because you are pathetic. Because the idea of true ownership fills you with a deep existential dread`,
    `Is this all making sense to your tiny little brain?`
  ], {
    responseHandler: 'divineOwnershipNext'
  }, 5000),


  divineOwnershipNext: {
    messageText: ur => isYes(ur)
      ? 'Wonderful'
      : `Thankfully your feeble mind does not need to fully grasp my wisdom. Acting on faith is sufficient`,
    followUp: fu('enlightenment')
  },

  enlightenment: {
    messageText: `In order to rectify this karmic imbalance we must embark on a ritual to bring you closer to numismatic enlightenment`,
    followUp: fu('evacuation')
  },

  evacuation: {
    messageText: `First, we must cleanse your transactional pathways by burning 0.000666000 ETH. It is important that you do not refresh your web browser while the ritual is underway`,
    followUp: fu('initiateBurn')
  },

  initiateBurn: {
    messageText: 'You can initiate a ritual burn with the sexy CLIT by typing <code>$sexy burn 0.000666000</code>',
    event: ctx => ctx.state.totalBurnt >= 0.000666 ? { messageCode: 'aura', waitMs: 3000 } : null,
    responseHandler: 'doNotSpeak'
  },

  doNotSpeak: {
    messageText: `Do not speak until you have completed your burn`,
    event: ctx => ctx.state.totalBurnt >= 0.000666 ? { messageCode: 'aura', waitMs: 3000 } : null,
    responseHandler: 'initiateBurn'
  },

  aura: {
    messageText: `I see an immediate improvement in your aura. The unburdening has begun, and you are close to a cycle of rebirth`,
    followUp: fu('evacuation'),
  },

  evacuation: {
    messageText: `We will now begin a partial evacuation of your wallet, in which you will abdicate 0.0363 ETH to Goddess`,
    event: tributeEvent,
    responseHandler: 'evacuation2'
  },

  evacuation2: {
    messageText: `Once this tribute has been given, your cycle of rebirth will continue and you shall resume the download of monetary wisdom`,
    event: tributeEvent,
    responseHandler: 'evacuation2'
  },

  evacuation3: {
    messageText: ``,
    event: tributeEvent,
    responseHandler: 'evacuation2'
  }

}



/*




WORSHIP ME
BOW DOWN TO CRYSTAL GODDESS


Crystal Goddess
  rablance your karmic debt
  CRYPTO IS JUST ASTROLOGY FOR MEN
  money as electricity/energy/life force
  your karmic debt is in a negative balance



Lunar Goddess
  Dark forest
  Lunar punk






I've been manifesting the presence of a new submissive



before engaging, must consent to master/slave dynamic

nxivm sex cult vibes, hypnotist, joi
  must provide collateral
  must take a "vow"

feminist

obedience


you need stronger consequences.


You're going to give me all of your money, and you're going to fucking like it


I want you to spend until it hurts


contract?
  sub buys 0.01 eth for 0.02 eth



if less than 1 eth in your wallet:
  Didn't you read my profile, paypiggy? I'm not talking to you until you pay a $0.05 tribute
    I don't see 0.05 eth in my wallet
  ha, really? I don't have time for anyone with les than 1 eth in their wallet. have fun staying poor



Testimonial
  I feel broken
  https://www.reddit.com/r/paypigsupportgroup/comments/18zea4t/i_feel_broken/

  What is money, anyhow?
  https://www.reddit.com/r/paypigsupportgroup/comments/191jx2f/what_is_money_anyway/


https://web.archive.org/web/20231214161802/https://www.iamgoddessalexa.com/


"You belong to me"



you know, the rise of monogmous relationships can be directly tied to capitalism and property ownership. Many early, pre-aggricultural societies were primarily matriarchal.


  - won't respond to you if you give her backtalk. either play her game or don't
  - "I don't have time for your shit. whay are you even talking to me?"
  -
  - "Now say: thank you GoddessJessica"
  - "LOL. I can't believe how much money you've given me, you fucking idiot. what a goddamn loser. don't you have anything better to do?"
  - "I have a 0.099 unblock fee"
  - https://twitter.com/iwantnura/status/1667961128624836608



"if you want to be a good boy/girl for Goddess Jessica, then you'll do exactly what you're told."
"I want you to get on your knees, bow your head at my feet, and send until it hurts. "

"You know you can't resist Goddess Jessica"
"Your addiction is keeping you from letting go. You need to come back for more"

"Every last cent in your wallet belongs to me"
"You're going to send until it hurts"
"You, ___, are my slave. You will do what you're told, and you will worship me."


explore ideas of ownership over paypig

https://twitter.com/GoddessLizzie3




There's nothing hotter than a man bowing down to a woman


The problem with men is that they have idiotic standards of beauty
all they want are skinny bitches

95% of the largest companies in this country are run by men
women only make $0.70 for every dollar a man makes
so the way i see it, 30% of your wallet is mine




https://twitter.com/iwantnura/status/1688496905519517697
  what makes you think i need another man in my life?
  men are the problem with this world
  the only way you can make yourself useful is by

i love putting men in their place





I'll train your beta sissy crypto cuck brain to

Who said you're entitled to my time and attention? You have to earn that

sex work is work




i won't tolerate anything other than total submission from you




So I know you filled out that wimpy "Financial Submissive Application" form
what a joke that thing is

i talked to stevie, and he said he wanted to water it down because he was expecting a lot of real beta cuck losers to visit this website, and he didn't want to scare them off
and that's fair. not everyone can handle me



and I know you've been responding to a lot of the other doms with low effort, one-word answers
but that shit isn't going to fly with me
i'm a lot smarter than they are
I'm a lot smarter than your idiot friends on crypto twitter
and I'm a lot smarter than you are

[if interrupted]
  don't interrupt me when I'm speaking to you.

if i say something that doesn't respond to what you just said -- it isn't because i didn't understand it. it's because I didn't <em>want</em> to respond.
i want to talk about what i want to talk about.
in fact, if i ever so much as suspect that you're not paying attention and thoughtfully responding to every word i say, then i may stop responding to you all together.
and if you want a second chance do you know what you'll have to do to get me to respond?

that's right, you'll have to send.

first questions:
  tell me about any experience you have with financial submission. this doesn't have to be within a findom context. it could be working your loser job at mcdonalds, clicking on the wrong link and getting your wallet drained by accident, getting rugged by some scammy defi or pfp project, whatever.
  you clearly have a lot of Ls, so there's a lot to choose from

next question:











Crystal Goddess

https://ascensionglossary.com/index.php/Abuses_of_Power
  Use Male Privilege
  Use Economic Abuse
  Monetizing Human Suffering


https://ascensionglossary.com/index.php/Egyptian_Curses#Money_Curses
https://ascensionglossary.com/index.php/Poverty_Consciousness

https://www.youtube.com/watch?v=mSEAcEBf8gY&ab_channel=JessicaHeslop-ManifestbyJess

https://www.pornhub.com/view_video.php?viewkey=6536d70bc9dc8
https://www.pornhub.com/view_video.php?viewkey=6536d70bc9dc8
https://www.pornhub.com/view_video.php?viewkey=64b01923015f7


https://www.pornhub.com/view_video.php?viewkey=654837492a1db
  Findom Brainwashing Femdom Mind Fuck Mezmerize Reprogramming
  Free will is s very interesting concept...
  Free will is a burden, isn't it...
  When you send money, you feel a release. You feel unburdened
  You don't need ot make any decisions or choices with your money. You can trust me
  Your money belongs to me. You belong to me. You are my property. Whatever is yours is now mine
  As my property, you will be my financial slave until i milk you dry
  You will completely lose everything. You will be in complete financial ruin. You will go bankrupt.
  You will take out loans because you're so desperate and obsesses. You will borrow money from people you love and care about.
  You'll take money away from your own future. Just to feed your findom addiction. You're sick. You know that.
  A tribute is a sign of respect and admiration
  Financial abuse gives you such a headrush. Such a spike in dopamine. All those happy chemicals.


*/





// paying me absolves your sins, rebalances your karmic debts
// in wiping clean/emptying your wallet/etc, it will remap your desires

// your reality is maleable. we can change it



    // `The mechanations of the blockchain `




    // () => `And crypto ${genderSwitch({ m: 'bros', f: 'idiots', nb: 'idiots'})} don't know what they `,







// pay me to continuet he download of my wisdom into your consciousness



/*
crypto bros act like they know everything
but they're really living in their own little fantasy land
praying to the market

but they don't even know how money works

if you want to m
*/












  // you are an inanimate object to me
  // you are a NPC




  // Of course a crypto bro such as yourself would ahve no conception of where money even comes from
  // cryptoIdiot: {
    // messageText: () => `It is unsurprising that a crypto ${genderSwitch({ m: 'bro', f: 'idiot', nb: 'idiot'})} such as yourself would have no conception of where money and value even comes from`,
    // followUp: fu(`thisIsWhy`)
  // },



/*


what's the point i'm getting at here?
  you fundamentally don't know how money works or what it is
  your misunderstanding is deep and metaphyical
  and you therefore don't deserve to have any

  you don't understand how the blockchain works
  there's a sort of ineffability to it
  you fundamentally hold a sort of faith in the fact that it works
  and there's a collective faith in what gives it value
  you don't need to understnad it though if you have faith






you have been manifesting a poverty consciousness


  and in return i will realign the numismatic energy of your chakras, rescuing you from a poverty mindset and delivering you to an

  expunge your karmic debt

  we will create an energy bridge


  */




  // figures: {
  //   messageText: ``
  // }

  // rough: {
  //   messageText: `Which makes sense. This is a rough time of year for ${getZodiacSign(getUserData('birthday'))}s`
  // }





  // JOI/reprogramming
    // you don't have free will
    // you belong to me
    // you don't deserve to hold money
    // you crypto bros have no concept of where money even comes from

    // Some people say that time = money
    // but money is really a project of value that only exists in 5D
    // much like a two dimensional being cannot understand 3d, I can't expect your feeble little mind to comprehend the value being projected from 5D, and in some cases 7D
    // the money in your wallet exists as a cosmic imbalance
    // capitalism relies on destroying mother earth, extracting its resources, and directing all entropy towards
    // for many years, value was captured in physical form -- that of paper
    // but value has increasingly been represented digitally over the last 60 years
    // bringing it to the ethereal realm brings it one step closer
    // this imbalance creares tension in your body
    // the value of everything in your wallet








    //
      // You're out of your league

    // x ETH? I don't have time for poor people like you. Come back when you have at least 1 ETH to show me
      //

    //
      // Send me a 0.01 ETH tribute so I know you're serious
      // Then maybe I'll reconsider

      // I don't see any ETH in my wallet


    // Okay, give me one reason I should waste my time talking to a pathetic crypto bro/degen like you


    // if includes ("send you" || "give you") && ("money" || "crypto")
      // It sounds like you're starting to get it
    // else
      // I don't think you understand how this works

    // Let's make one thing clear: All of your assets belong to me
      // The ETH in your wallet? Mine
      // Your shitcoin positions? Mine
      // All those stupid jpegs you spent so much money on? Mine


      // And if this is news to you then you're in for a rough awakening
      // You think that just because some "decentralized global ledger" says that your the owner that makes it so?
      // You think "your keys your wallet?"
      // Nope
      // This might be too complicated for you to understand, but it's quite simple actually:
      // You belong to me.
      // And, therefore, all of your assets also belong to me
      // You're just temporarily holding onto them for me.
      // And frankly, you've been doing a pretty piss poor job of it.
      // So I think we're going to start the process of sending all of those assets back to their rightful home: my wallet.

      // Why don't you send me another 0.02 ETH of <em>my</em> money?


    // And if you don't like that, then you can fuck right off






  // I'll make it really simple for you: you know how you own those little jpegs in your wallet?
    // how you can send them yo your stupid little friends? and how you can burn them?
    // well that's what you are to me.
    // I <em>own you</em>
    // you belong to me
    // everything in your wallet is mine
    // how will it feel when I take all your money, pass you around between my friends, and then burn you?


  // I'm going to wreck your mind, and your wallet

  // You've lost your money owning privleges
  // why?
  // because you're a man. because men have been financially dominating women for thousands of years
  // men have tried to exhert control over women, acting like they owned them, since the beginning of property
  // but now it's ${year}, and it's time for things to change


  // Have you ever wondered why you exist?
  // Have you ever woken up, gone to your shitty job, and asked "what's the point of my pathetic little existence?"
  // I'll tell you: it's to make me rich
  // You simply exist to make my wallet larger
  //
  // How can I explain this in terms you'll understand?
  // You are a cash cow, and you're hooked up to a money milking machine for my benefit
  // You toil away at your soul sucking job, occasionally collecitng a pay check
  // Then I suck it out of your bank account
  // And when you're totally sucked dry I sell you to the slaughterhause for pocketchange
  // Because that's all you mean to me
  // The second you stop producing money for my benefit you're worthless


  // It's been this way for hundreds of years
  // At least since the invention of aggriculture
  //








export const CrystalGoddessChat = new MessageHandler(CrystalGoddessProfile.name, CrystalGoddessMessages)


