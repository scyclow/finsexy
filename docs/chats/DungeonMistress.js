/*

TODO

  - handle case where you ask bartender for the key

  - maybe the bartender just gives you a beer every time you blow him
    - poker players sit in front of the door. to even see that it's locked you need to get past them with a beer from blowing the bartender
    - you just want to pay your debst with ETH and be done with it, but
    - you aren't actually charged any ETH until the end (you need it to cum)


    - ultimately you're caught. you're put in a cage with an old man. he tries to concoct a plan to get out where he pretends he's sick and you play along. the cage opens, he plays his schtick, but is pulled out before you have a chance to play along


  - sex it up even more. elaborate on what user should be feeling
    - maybe look at actual erotica that matches up with the scenarios





  - golden shower description



  - dungeon
    - old man wants to role play being sick to get out
    - dungeon mistress takes you out of your cell

  - you're put into the punishment stocks, made to scream "i declare bankruptcy!"
    - (must say it in all caps. "louder!")
    - you cum harder than you ever had before. with each pump, a thick liquid gold shoots out of your erect cock/drips out of your pussy/ shoots out of your mouth. you feel pleasure in every cell of your body. you've never felt like more of a man/woman/human in your entire life.


  - reveal that DM is a vampiress/succubus
  - i want to _drain_ your wallet and suck you dry until there's nothing left


  "this is the part where you're supposed to pay me, asshole. do you know how long it took to write this story? "









Testimonials




goth, dungeon, classic dominatrix torturess, medieval banker


midieval vampire sucking your money out

bdsm vampire/succubus, drain your wallet



you need to pay the queen/goddess/high priestess a tithe


submissive:
  serf, dopamine/financial slave, paying tribute


The Crypt
Ethereal realm
GodKing/GoddessQueen
Fiefdoms

"You've spent a lot of your money on decorative pendants with religious imagery, lucky charms to improve your fortune"





Pre roleplay:
  DM asks for enthusiastic consent (nots CNC) before beginning
  also suggests you take some money out of your wallet (or use a different wallet) on this one so your don't get carried away in the heat of passion



Locations
  Tavern <- starting point
    "bartender washes glasses, patrons play cards, prostitutes mull at bar, a draft makes its way through the door, which doesn't fully close"
    bartender (says that you own him money, and that you're a "degenerate" and a "loser", tells you to leave the bar)
    patrons (you owe momney for gambling debts. "i heard you money all over town!"  they laugh at the pendant around your neck, flexing it like a loser. )
    Prostitutes
      they note that you've given all of your money to one prostitute who is not there. but you long for her
      you are very attracted to them, but they snicker at your poorness. blue balls "I hope you are having fun being so poor, teehee.")

    Door to outside market

  Market
    "it's cold outside. heat escapes the tavern door. men selling things at the market, police man"

    salesman 1
      "I already sold you the pendant/charm that you are wearing, it conveys good fortune"
    salesman 2
      "your wife was here earlier today" - steals your pedant

    police
      you report saleseman 2 to the police
      "what's your name? oh, i've been looking for you! warrent for your arrest was isseud by local magistrate"
      you run
      cop chases you down, tackles you, face in pig shit

  Public debtors court
    You are dragged over to the stocks, locked in, and stripped naked
    thr crowd that forms around you is composed primarily of women (if user === man, they laugh at small penis)
    In ancient Roman law, the legal concept fallitus ergo fraudator meant ‘insolvent thus a swindler’.


  Thrown into bondage in debtors prison
    fellow prisonor talks about useless religious tokens they buy
      old man who is losing his mind, speaking nonsense
      spews sovereign citizen rhetoric, talks about parallel governments
      thinks your pendant is really cool

    one prisoner wants to conspire with you to break out
      if go along with the scheme:
        you role play a scenario to get guard's attention. this does not work
        the man is dragged out and cut into pieces
        justified with "De debitore in partes secando" (the privilege given to creditors allowing them to cut the debtor’s body into pieces and share it out proportionately, according to the size of debt.)

    dungeon mistress comes into cell, moves you to another cell
    you're taken by her beauty, and can feel the arousal warming your loins
    you are chained and naked.
    she says that she has the ability to pull some strings with your creditors, but you have to do something for her in return (she says looking at your bare ass)
    the

    comes in with strapon, bends you over, + pegs you
    you must scream out "I DECLARE BANKRUPTCY!"
    won't let you cum until you send all the moeny in your wallet



https://m.thegazette.co.uk/all-notices/content/100723#:~:text=A%20bankrupt%20would%20hit%20their,and%20Fleet%20prisons%20in%20London



*/






import { isYes, isNo, isGreeting, isMean, isMatch, responseParser, diatribe, createEvent, MessageHandler } from '../state/conversationRunner.js'
import {getUserData, genderSwitch, interestedSwitch} from '../state/profile.js'

const fu = (messageCode, waitMs=1500) => ({ messageCode, waitMs })

export const MistressProfile = {
  name: 'DungeonMistress',
  startingVisibility: 'offline',
  order: 7,
  display: 'f',
  age: 27,
  distance: 666,
  gender: '',
  maxPhotos: 4,
  description: `I like roleplay, sadomasochism, and humiliation. And if you're not careful I'm going to suck every last cent out of your wallet,`,
  testimonials: [
  /*
- "I love a good role play"
- "this is fucking disgusting"
- RPGs are so much fun! its such a relief to have a safe space to act out my fantasies. i feel like there's a part of me that I always have to repress, so it's nice to finally have a way to explore it.
- I'll be honest, I've extensively fantasized about a lot of the scenarios that Mistress touched on here. But actually experiencing them first hand left me a little nausious.
- this all sounds
 */

  ]
}






const BartenderNodes = {
  bartender: {
    messageText: (ur, ctx) => `You walk over to the bar and take a seat. ${
      ctx.state.bartenderGoodSide
        ? `Unceremoniously, the bartender asks "What'll it be?"`
        : `The bartender stops washing the stein and slowly leans on the counter, looking first at the harlots with a grin, then back at you.`
    }`,
    followUp: (ur, ctx) => {
      if (ctx.state.bartenderGoodSide) return
      else if (ctx.state.visitedBartender) return fu('bartenderPending')
      else {
        return !ctx.state.bartenderGoodSide && fu('bartenderPreBJ')
      }
    },
    responseHandler: (ur, ctx) => {
      if (ctx.state.visitedBartender || ctx.state.bartenderGoodSide) return bartenderActions('bartenderPending')(ur, ctx)
      else {
        return bartenderActions('bartenderPreBJ')(ur, ctx)
      }
    }
  },

  orderDrinkConnectFail: {
    messageText: `The bartender looks you up and down before saying "You gotta connect your wallet before ordering a drink, pal"`,
    responseHandler: bartenderActions('bartenderPending')
  },

  orderDrink: {
    messageText: '',
    followUp: async (ur, ctx, contract) => {
      try {
        const tributesPaid = fromWei(await contract.tributes(ctx.global.connectedAddr))
        ctx.state.preDrinkTributeAmount = ctx.state.preDrinkTributeAmount || 0
        if (ctx.state.preDrinkTributeAmount + 0.00999999 <= tributesPaid) {
          return fu('orderDrinkSucceed', 100)
        } else {
          return fu('orderDrinkFail', 100)
        }
      } catch (e) {
        console.log(e)
      }
    }
  },


  orderDrinkFail: {
    messageText: `Before the words finish leaving your mouth the bartender cuts you off: "If you want a drink, you're paying up front this time. And for you, a special price." He winks.`,
    followUp: async (ur, ctx, contract) => {
      ctx.state.preDrinkTributeAmount = fromWei(await contract.tributes(ctx.global.connectedAddr))
      return fu('orderDrinkFail1')
    }
  },

  orderDrinkSucceed: {
    messageText: `Before the words finish leaving your mouth, the bartender fills a glass to the brim with beer and slams it down on the counter`,
    followUp: async (ur, ctx, contract) => {
      const tributesPaid = fromWei(await contract.tributes(ctx.global.connectedAddr))
      ctx.state.beerCount = (ctx.state.beerCount||0) + 1
      ctx.state.preDrinkTributeAmount = tributesPaid
      return fu('beerNotifier')
    }
  },

  beerNotifier: {
    messageText: (ur, ctx) => `<em>(You now have ${ctx.state.beerCount} Beer${ctx.state.beerCount === 1 ? '' : 's'} in your inventory)</em>`,
    followUp: fu('tavernDeliberate')
  },


  orderDrinkFail1: {
    messageText: (ur, ctx) => `"That'll be ${ctx.global.premium * 0.01} ETH. You gonna pay me or what?"`,
    responseHandler: async (ur, ctx, contract) => {
      if (isYes(ur) || isMatch(ur, ['pay'])) {
        const tributesPaid = fromWei(await contract.tributes(ctx.global.connectedAddr))
        if (ctx.state.preDrinkTributeAmount + 0.00999999 <= tributesPaid) {
          return 'orderDrinkSucceed'
        } else {
          return 'processDrinkOrder'
        }
      } else if (isNo(ur)) {
        return 'bartenderPending'
      } else {
        return bartenderActions('bartenderPending')(ur, ctx)
      }
    }
  },

  processDrinkOrder: {
    messageText: `"Alright, well I actually owe a bit of ETH to @DungeonMistress myself, so why don't you pay her directly? Then I'll give you your drink"`,
    followUp: async (ur, ctx, contract) => {
      return fu('processDrinkOrderExplain')

    },
  },

  processDrinkOrderExplain: {
    messageText: (ur, ctx) => `<em>(You can send me the ${ctx.global.premium * 0.01} ETH through my profile page or the Sexy CLIT. Then the bartender will give you your drink)</em>`,
    followUp: fu('bartenderPending')
  },


  orderDrinkBadSide: {
    messageText: `"I don't think so. You ain't getting another drink out of me until you pay your tab... one way or another" He winks.`,
    responseHandler: (ur, ctx) => isMatch(ur, ['how']) ? 'bartenderHow' : bartenderActions('bartenderPending')(ur, ctx)
  },

  bartenderHow: {
    messageText: `Oh, I can think of one way. Why don't you come back here, get on your knees, and I'll show you?`,
    responseHandler: bartenderActions('bartenderPending')
  },


  bartenderIgnore: {
    messageText: `The bartender clearly grows tired listening to you talk, and goes back to washing his stein.`,
    followUp: fu('bartenderPending')
  },

  bartenderPreBJ: {
    messageText: `"Well, well, well. Look who finally decided to wake up from their beauty nap. Did you sleep well, sleeping beauty?"`,
    responseHandler: bartenderActions('bartender2')
  },

  ...diatribe('bartender2', [
    `"That's nice. I hope you got a good rest because you're gonna be working here all night paying off all that money you owe me. The afternoon rush should start in a couple hours, so I suggest you either get real familiar with the mop in the back room, or get real comfortable on your knees behind the bar with your mouth around my cock."`,
    `He waits a beat before continuing in a lower voice.`,
    `"I hear you owe money all over town. One more complaint to you-know-who and your ass is gonna end up in debtor's prison."`,
  ], {
    followUp: fu('bartenderPending')
  }),

  bartenderPending: {
    messageText: `He waits for you to say something, his patience wearing thin. Should you let him take you to your knees? Do something else? Or perhaps try to order a beer?`,
    responseHandler: bartenderActions('bartenderPending')
  },

  mop: {
    messageText: `You glance over the bartender's shoulder and see a sad looking mop resting in a bucket.`,
    followUp: fu('dontWorry')
  },

  dontWorry: {
    messageText: `"Oh, don't worry. There's still plenty of time for that. But if you're eager to get on my good side ASAP, I can think of something else."`,
    followUp: fu('bartenderPending')
  },

  ...diatribe('blowBartender', [
    `"Right now?"`,
    `You catch the bartender briefly locking eyes with one of the harlots. She nods.`,
    `"Alright, get back here"`,
    `You walk around to the other side of the bar and drop to you knees. The bartender throws his apron over your head and caresses the back of your skull.`,
    `You slowly unbuckle the bartender's belt, pull his pants down past knees, and come face-to-face with a partially erect member nestled in an overgrowth of pubic hair. The hair on the back of your neck stands up in excitement as the auroma of stale urine fills your nostrils.`,
    `You close your eyes and get to work.`,
    `The second you put your lips around the bartender's penis he pulls your head closer. You feel the head of his cock poke the back or your throat, causing you to gag.`,
    () => `Each bob of your head sends waves of euphoria down your spine, reminding you that you've been a bad little ${genderSwitch({m: 'boy', f: 'girl', nb: 'debtor'})}, owing money all over town. Nothing turns you on more than taking punishment for your debts.`,
    `Soon enough, a warm, viscous liquid fills your mouth, accompanied by a single grunt from the bartender.`,
    `He pulls you off of himself by the hair and pulls his pants up.`,
    `"Okay, let's call it square," says the bartender, before patting you on the head and getting back to work.`,
    `You stand up and collect yourself, still quivering from excitement. You catch a glance from one of the harlots. She whispers something to her friend and they both giggle once more.`,
  ], {
    followUp: (ur, ctx) => {
      ctx.state.bartenderGoodSide = true
      return fu('blowjobEnd')
    }
  }, 2000),

  blowjobEnd: {
    messageText: `You stand there awkwardly, unsure what to do. Perhaps order a beer?`,
    responseHandler: (ur, ctx, contract, provider) => isYes(ur) ? 'orderDrink' : bartenderActions('bartenderPending')(ur, ctx, contract, provider)
  },
}

function bartenderActions(defaultAction) {
  return (ur, ctx, contract, provider) => {
    ctx.state.visitedBartender = true

    if (isMatch(ur, [...retreatPhrases, 'poker', 'harlots', 'tavern', 'leave'])) return 'tavernDeliberate'
    else if (isMatch(ur, ['mop', 'back room', 'clean', 'cleaning'])) return 'mop'
    else if (isMatch(ur, ['harlot', 'harlots', 'prostitutes', 'women'])) return 'harlots'
    else if (isMatch(ur, ['poker', 'men'])) return 'poker'
    else if (isMatch(ur, ['cock', 'dick', 'knees', 'penis', 'erection', 'behind the bar', 'bj', 'blowjob', 'blow the bartender', 'suck', 'deepthroat', 'cum'])) return 'blowBartender'
    else if (ctx.state.bartenderGoodSide) {
      if (!ctx.global.isConnected) return 'orderDrinkConnectFail'
      else if (isMatch(ur, ['drink', 'beer', 'ale', 'wine', 'cider', 'order'])) return 'orderDrink'
      else return 'bartenderIgnore'
    } else {
      if (isMatch(ur, ['drink', 'beer', 'ale', 'wine', 'cider', 'order'])) return 'orderDrinkBadSide'

      else return defaultAction
    }
  }
}


const HarlotsNodes = {

  harlots: {
    messageText: (ur, ctx) => ctx.state.hasKey ? `You meekly approach the pair of harlots.` : `You meekly approach the pair of harlots. They both smirk in unison as they look up from their wine. A key dangles on a necklace between the breasts of the harlot to your right.`,
    followUp: (ur, ctx) => {
      ctx.state.harlotState = ctx.state.harlotState || 'fresh'

      if (ctx.state.beerCount) ctx.state.harlotState = 'drink'

      if (ctx.state.harlotState === 'fresh') {
        ctx.state.harlotState = 'rebuff'
        return fu('harlotsFresh')
      } else if (ctx.state.harlotState === 'rebuff') {
        return fu('harlotsRebuffed')
      } else if (ctx.state.harlotState === 'finished') {
        return fu('harlotsFinished')
      } else if (ctx.state.harlotState === 'friendly') {
        return fu('harlotsFriendly')
      } else if (ctx.state.harlotState === 'drink') {
        ctx.state.harlotState = 'friendly'
        ctx.state.beerCount -= 1
        return fu('harlotsDrink')
      }
    }
  },

  harlotsFresh: {
    messageText: () => `"I didn't think you'd have the gall to show your face here, ${getUserData('name')}. Not considering how much you owe us..."`,
    followUp: fu('harlotsFresh2')
  },

  harlotsFresh2: {
    messageText: `"But if you buy us a drink then perhaps we will consider talking to you. The bartender seems to like you, so maybe he'll make one extra special." They giggle. The condescension behind their laughter makes you blush.`,
    followUp: fu('harlotsFresh3')
  },

  harlotsFresh3: {
    messageText: `You turn away in shame, but the arousal you feel in that moments forces the hint of a smile to your face.`,
    followUp: fu('tavernDeliberate')
  },

  harlotsRebuffed: {
    messageText: `"I don't see a drink in your hands." They giggle once more, and you turn away in shame.`,
    followUp: fu('tavernDeliberate')
  },

  harlotsFriendly: {
    messageText: `"Oh, it's you again. What do you want?"`,
    responseHandler: (ur, ctx) => {
      if (isMatch(ur, ['key', 'necklace', 'breasts', 'boobs', 'cleavage'])) {
        return 'harlotsKey'
      } else {
        return 'harlotsBored'
      }
    }
  },


  ...diatribe('harlotsDrink', [
    `"Oh, is that drink for us?"`,
    (ur, ctx) => `The harlot on your left snatches ${ctx.state.beerCount+1 > 1 ? 'a' : 'the'} beer out of your hand, spilling half of it on your pants. The two of them cackle uncontrollably. You hear the poker players laugh behind you.`,
    (ur, ctx) => `<em>(You now have ${ctx.state.beerCount} Beer${ctx.state.beerCount === 1 ? '' : 's'} in your inventory)</em>`,
    `The harlots catch their breath. The one on the right plays with the key between her breasts before looking back at you.`,
    `"Oh, you're still here. What do you want?"`
  ], {
    responseHandler: (ur, ctx) => {
      if (isMatch(ur, ['key', 'necklace', 'breasts', 'boobs', 'cleavage'])) {
        return 'harlotsKey'
      } else {
        return 'harlotsBored'
      }
    }
  }),

  ...diatribe('harlotsBored', [
    `Before you can finish speaking, you're cut off.`,
    () => `"We grow tired of your presence, ${getUserData('name')}. Be gone!"`,
    `The harlot clutches her necklace and smirks. You slink away`,
  ], {
    followUp: fu('tavernDeliberate')
  }),

  harlotsFinished: {
    messageText: `"I have nothing more to say to you"`,
    followUp: fu('tavernDeliberate')
  },


  harlotsKey: {
    messageText: `"You want my key so you can leave the tavern, is that it? Well, I'm not going to just <em>give</em> it to you. Why don't we play a game? Let's pretend that you're my pet, and I'm your master. That means that you do whatever I say, and maybe I'll give you a treat. Now, I want to see you beg."`,
    responseHandler: 'harlotNotEnough'
  },

  ...diatribe('harlotNotEnough', [
    `"That's not good enough. I want you to get on your knees..."`,
    `You involuntarily fall to your knees, interlace your fingers, and look up at her with puppy dog eyes`,
    `"...and fucking beg."`
  ], {
    responseHandler: 'harlotsHelp'
  }),

  harlotsHelp: {
    messageText: `"I think the words you're looking for are: Please, Mistress. I'm begging you for your key"`,
    responseHandler: ur => {
      if (responseParser(ur) === `please mistress im begging you for your key`) {
        return 'harlotsFeet'
      } else {
        return 'harlotsHelp'
      }
    }
  },

  ...diatribe('harlotsFeet', [
    `The harlot uncrosses her legs and places her dirt-encrusted foot in front of you`,
    `The bartender stops washing and looks on.`,
    `"If you want my key that bad, then you'll lick my foot"`,
    `She spits directly in your face for good measure. ${genderSwitch({
      m: 'Your erection throbs beyond control.',
      f: 'Your panties are soaked with arousal.',
      nb: 'You are drunk with arousal.'
    })}`,
    `The poker players halt their game and wait to see what you do.`,
  ], {
    responseHandler: (ur) => {
      if (isMatch(ur, ['lick', 'foot'])) {
        return 'harlotsKeySuccess'
      } else {
        return 'harlotsFeetWaiting'
      }
    }
  }),


  harlotsFeetWaiting: {
    messageText: `"I'm waiting"`,
    responseHandler: (ur) => {
      if (isMatch(ur, ['lick', 'foot'])) {
        return 'harlotsKeySuccess'
      } else {
        return 'harlotsFeetWaiting2'
      }
    }
  },

  harlotsFeetWaiting2: {
    messageText: `"Do it: lick my foot"`,
    responseHandler: (ur) => {
      if (isMatch(ur, ['lick', 'foot'])) {
        return 'harlotsKeySuccess'
      } else {
        return 'harlotsFeetWaiting'
      }
    }
  },

  ...diatribe('harlotsKeySuccess', [
    `You lick the harlot's foot, which tastes of salt and cow manure.`,
    () => `"Good ${genderSwitch({m: 'boy', f: 'girl', nb: 'pet'})}," she says as she pets your head.`,
    `She rips the key off of her necklace and throws it across the room.`,
    `"Now fetch!"`,
    `You crawl on your hands and knees across the room and pick up the key with your mouth.`,
    `The poker players let out a chuckle before shaking their heads and returning back to their game. You hear one say the word "pathetic".`,
    `The harlot winks at you.`,
    `<em>(You know have the Tavern Key in your inventory)</em>`
  ], {
    followUp: (ur, ctx) => {
      ctx.state.harlotState = 'finished'
      ctx.state.hasKey = true
      return fu('tavernDeliberate')
    }
  })
}


const MerchantNodes = {
  ...diatribe('marketFresh', [
    `As you enter the market you feel the electricity of commerce in the air. A merchant calls out your name...`,
    () => `"${getUserData('name')}! Is that ${getUserData('name')}? Get over here at once!"`,
    `You approach the merchant's stand with caution. He appears to be seething with rage.`,
    `"Do you have <em>any</em> idea how much money you owe me? I hope not, because you continue to gamble and galavant around town with prostitutes. Clearly all of the credit I've extended to you and your family has been squandered on hedonistic pursuits. And I suspect your wife knows nothing of it. You should be ashamed of yourself. You're just a filthy debtor!"`,
  ], {
    responseHandler: 'marketFreshContinued'
  }),

  ...diatribe('marketFreshContinued', [
    `The merchant cuts you off: "I don't want to hear it. I've heard your lies before. You won't deceive me again, I'll make sure of it!"`,
    `Passerbys stop to watch the scene unfold. They shake their heads in disappointment. The merchant winks at you as if this is part of a joke that only the two of you understand. He continues, even louder than before,`,
    `"I've heard rumors that I'm not the only person you owe money to. Prostitutes. Loan sharks. The State. People have been saying that you and your family will be kicked off your land at this rate."`,
    `He walks inside and motions you to follow him. You stand there pondering your next move: follow him or leave?`
  ], {
    responseHandler: (ur, ctx) => {
      if (isYes(ur) || isMatch(ur, ['follow', 'enter'])) return 'marketInside'
      else return 'townSquareDeliberate'
    }
  }),


  marketCompleted: {
    messageText: `You walk up to the merchant's house, but the door is locked. You hear screams of pleasure from the inside.`,
    followUp: fu('townSquareDeliberate')
  },

  market: {
    messageText: `You enter the market and return the merchant's stand from before. He sticks his head out from the building next door, and motions you inside. You follow him in.`,
    followUp: fu('marketInside')
  },

  ...diatribe('marketInside', [
    `You enter a room filled with the merchant's inventory. A thick layer of dust sits on top of every item on every shelf.`,
    `"Sorry about that. The Merchant Guild flagged you as a severe credit risk, so I'm technically barred from transacting with you. Most of them know what's really going on, but putting on a little performance leaves everyone feeling better. You understand."`,
    `He catches you staring at his shelves`,
    `"The market for Nordic Fortune Telling amulets isn't what it once was. The money appears to have dried up in the last two years. But I've been diversifying my inventory. You know the old saying: do not put all of your eggs in a single basket."`,
    `An awkward pause.`,
    `"I won't waste your time. The reason I called you in here is because I have a proposition for you. I wasn't lying before. You do owe me a <em>lot</em> of money. You know this. And your last interest payment was... well, I don't even remember when it was. Some other merchants might take this to a higher power, but I subscribe to the philosophy that these things are best handled through negotiation rather than force."`,
    `You break out in a nervous sweat, but are unsure why.`,
    `"Oh, don't worry. It won't be like last time. Although, your wife did seem to enjoy it. She even said that when she got home, after I fucked her silly, she couldn't look at you the same way again. She said you were simply a pathetic little ${genderSwitch({m: 'man', f: 'woman', nb: 'person'})} sitting there. She realized that you completely failed her -- not just as the provider of your family, but also in bringing her any meaningful pleasure. It sounds like she really needed a ${genderSwitch({m: '<em>real</em> man', f: '<em>man</em>', nb: 'competent lover'})} to give her a mind-blowing orgasm. Something you could never do. In fact, she came so hard the first time around that she decided to come back the next day. That one was on the house."`,
    `Your stomach drops and your chest tightens, but a strange warmth softens your anxiety.`,
    `"So I understand why you woldn't be excited to repeat that. You probably want to keep me as far away from her as possible. This time though, I was thinking maybe you could return the favor."`,
    `You hear a door open behind you. The merchant's wife walks out wearing nothing but a mask. You can tell by the way she walks that her bladder is full.`,
    `"Your wife has a thing for men with huge cocks who know how to make women cum, and my wife has a thing for peeing on helpless, pathetic losers. Who am I to judge? I try not to kink shame. But looking at this logically, it seems there's a mutual coincidence of want. You're in dire need of some gold, and she... well, let's just say she's looking forward to showering you in gold. And if you don't want to play along, then I don't think there's much more I can do to help you you. So what do you say?"`,
    `Do you stay and play along? Or do you leave and try your luck outside?`
  ], {
    responseHandler: ur => {
      if (isMatch(ur, ['piss', 'urine', 'pee', 'peeing', 'urinate', 'shower', 'gold', 'golden shower', 'stay', 'play', 'wife'])) return 'goldenShower'
      else if (isMatch(ur, ['leave', 'outside', 'escape', 'try my luck', 'exit', 'square', 'run away', 'out of there'])) return 'tryLuckOutside'
      else return 'goldenShowerPending'
    }
  }),

  goldenShowerPending: {
    messageText: `"I didn't quite catch that. Are you going to play with my beautiful wife, or try your luck outside?"`,
    responseHandler: ur => {
      if (isMatch(ur, ['piss', 'urine', 'pee', 'peeing', 'urinate', 'shower', 'gold', 'golden shower', 'stay', 'play', 'wife'])) return 'goldenShower'
      else if (isMatch(ur, ['leave', 'outside', 'escape', 'try my luck', 'exit', 'square', 'run away', 'out of there'])) return 'tryLuckOutside'
      else return 'goldenShowerPending'
    }
  },


  ...diatribe('goldenShower', [
    `"Excellent"!`,
    `The merchant rubs his hands together in anticipation and he leads the three of you into another room. You see a wooden board on the floor with one side propped up by stones. He motions for you to lie down. With your feet flat on the floor, the board comes up to the bend of your knees. When you lie down, your head rests centemeteres from the floor at about a 25 degree angle. The merchant then drags over an X-shaped iron chain, which he connects to your wrists and ankles.`,
    () => `An unknown amount of time passes. ${genderSwitch({m: 'You can feel your tiny erect cock nestling up against your left leg', f: 'Your pussy becomes so wet tha tit soaks through your pants and onto the board', nb: 'Your arousal becomes so strong that you want to crawl out of your skin'})}. The anticipation is palpable, and every passing second is torturous.`,
    `She saunters over to your helpless body and squats over your face. You smell her feminine essence and feel the tips of her pubic hair against your nose. The tension is too much for you to bear.`,
    `Finally, she relieves herself. The warm, golden liquid gushes out of her body and onto your face in one long, steady stream. It hits your upper lip first, splattering and dripping its way into your nostrils. It runs up your face and into your eyes, soaking your entire face. As more of the piss makes its way into your nose it becomes harder and harder to breather. You involuntarily open your mouth, letting it enter your mouth and pool in the back of your throat. With your air supply cut off you accidentlaly inhale, allowing the it to make its way into your windpipe. You cough, spraying it out of your mouth and across the room. A brief moment of terror comes over you as you can neither see nor breathe. But eventually she makes her way down your mouth to your neck, and then your chest. As the stream begins to slow down, she moves towards the top of your head. The last few drops drip onto your forehead.`,
    `She forces out two more short streams, and then walks away. Given the pungent smell, you're suprised that she was able to pee as much volume as she did.`,
    `After a couple minutes of the piss soaking into your hair and your clothes the merchant comes over to unlock your shackles. You roll over onto the floor with your heart racing, feeling both filthy and cleansed at the same time. The tension is stronger than ever, as you have not had an opportunity to cum. You notice the merchant looming over you.`,
    () => `"Okay, ${getUserData('name')}. It's been a pleasure doing business with you. Now if you don't mind, I'm going to go fuck my wife. And if I were you, I'd try to lay low."`,
  ], {
    responseHandler: (ur, ctx) => {
      ctx.state.goldenShowerComplete = true
      if (ctx.state.visitedHorseWoman) {
        return 'walkBackToTown'
      } else {
        return 'walkBackToTownAlt'
      }
    }
  }),


  ...diatribe('walkBackToTown', [
    `You begin walking back to town, but your stench draws the attention of everyone you pass.`,
    `Thoughts circulate in your head: Why are you like this? Such shame has completely ruined your finances, your marraige, and your social standing. And yet, you still seek it out. In fact, you enjoy it. Is there any way out? Must you seek help with a therapist? Or maybe repent with a Goddess?`,
    `But suddenly, your thoughts are interrupted by an angry townsman.`,
    () => `"Wait a second, that is ${getUserData('name')}! The one who stinks of urine!"`,
    `Passerbys murmur, and you increase your pace. But off in the distance you see the Dungeon Mistress galloping towards you.`
  ], {
    followUp: fu('fightOrFlight')
  }),

  ...diatribe('walkBackToTownAlt', [
    `You begin walking back to town, but your stench draws the attention of everyone you pass.`,
    `Thoughts circulate in your head: Why are you like this? Such shame has completely ruined your finances, your marraige, and your social standing. And yet, you still seek it out. In fact, you enjoy it. Is there any way out? Must you seek help with a therapist? Or maybe repent with a Goddess?`,
  ], {
    followUp: fu('townSquareDeliberate')
  }),


  tryLuckOutside: {
    messageText: (ur, ctx) =>
      ctx.state.visitedHorseWoman
        ? `You leave the merchant's house as fast as you can and make your way back to the town square. But off in the distance you see the Dungeon Mistress galloping towards you.`
        : `You leave the merchant's house as fast as you can and make your way back to the town square. But off in the distance you see the beautiful woman galloping towards you. This is the Dungeon Mistress, the collector of all debts within the realm, as well as the administrator of all punishment and debt bondage. You do not want to run afoul of her.`,
    followUp: fu('fightOrFlight')
  },
}

const HorseWomanNodes = {

  fightOrFlight: {
    messageText: `Do you give up and turn youself in? Or attempt to retreat into the Dark Forest?`,
    responseHandler: (ur) => {
      if (isMatch(ur, ['dark', 'forest', 'retreat', 'run', 'exit', 'escape', 'leave'])) return 'darkForestEnter'
      else if (isMatch(ur, ['give up', 'stay', 'concede', 'dungeon', 'mistress', 'surrender', 'out of'])) return 'catchup'
      else return 'fightOrFlight'
    }
  },


  ...diatribe('catchup', [
    `You decide to stay and deal with your fate directly instead of retreating like a coward. At least, for now.`,
    `The horse slows down as it approaches you before finally coming to a halt.`,
  ], {
    followUp: fu('horseWomanConfess')
  }),


  approachHorseWoman: {
    messageText: '',
    followUp: (ur, ctx) => {
      if (ctx.state.goldenShowerComplete) {
        return fu('approachHorseWomanStink')

      } else if (ctx.state.visitedHorseWoman) {
        return fu('horseWomanVisited')
      } else {
        ctx.state.visitedHorseWoman = true
        return fu('approachHorseWomanFresh')
      }
    }
  },

  ...diatribe('approachHorseWomanStink', [
    `You make your way towards the beautiful woman.`,
    () => `"Wait a second, that is ${getUserData('name')}! The one who stinks of urine!"`,
    `Passerbys murmur, and you increase your pace. But off in the distance you see the beautiful woman galloping towards you. This is the Dungeon Mistress, the collector of all debts within the realm, as well as the administrator of all punishment and debt bondage. You do not want to run afoul of her.`
  ], {
    followUp: fu('fightOrFlight')
  }),

  ...diatribe('approachHorseWomanFresh', [
    `You approah the woman perched atop her horse. As you get closer to her left side, you notice the horse's massive erection -- no doubt an effect of touching this absolutely gorgeous woman.`,
    `You now stand before the Dungeon Mistress. The collector of all debts within the realm, as well as the administrator of all punishment and debt bondage. You do not want to run afoul of her. As she looks over the town, she speaks,`,
    () => `"Good day. I'm wondering if you could help me. I'm looking for a ${genderSwitch({m: 'man', f: 'woman', nb: 'person'})} named ${getUserData('name')}. ${genderSwitch({m: 'He owes', f: 'She owes', nb: 'They owe'})} quite a bit of money to a number of different parties. In fact, this amount has become so unmanageably high that I expect ${genderSwitch({m: 'him', f: 'her', nb: 'them'})} to enter debt bondage under the authority of the local court for a significant period of time. Perhaps the rest of their life. This is quite serious, and I wonder if ${genderSwitch({m: 'he is', f: 'she is', nb: 'they are'})} aware of the danger ${genderSwitch({m: 'he is', f: 'she is', nb: 'they are'})} in."`,
    `She glances down at you with a sly grin before returning her gaze to the town.`,
    `"If I were ${genderSwitch({m: 'him', f: 'her', nb: 'them'})}, I would seek refuge in the market, or perhaps even the Dark Forest. Otherwise, there's no telling what brutal punishment awaits ${genderSwitch({m: 'him', f: 'her', nb: 'them'})} when I catch ${genderSwitch({m: 'him', f: 'her', nb: 'them'})}."`,
  ], {
    followUp: fu('horseWomanConfessMaybe')
  }),

  horseWomanConfessMaybe: {
    messageText: `Do you confess, or do you scurry away in fear?`,
    responseHandler: ur => {
      if (isMatch(ur, ['confess', 'confession', 'reveal', 'admit', 'admission', 'it was me', 'i am'])) {
        ctx.state.confessed = true
        return 'horseWomanConfess'
      } else {
        return 'horseWomanRetreat'
      }
    }
  },

  ...diatribe('horseWomanConfess', [
    () => `"Aha! <em>You</em> are ${getUserData('name')}."`,
    `She dismounts and removes some rope from her pouch.`,
    (ur, ctx) => ctx.state.confessed ? `"Do not think that I will grant mercy to you simply because you have confessed your wrongdoings."` : '',
    `You turn to run, but immediately trip over a rock and fall face first into a pile of pig dung. Townspeople take notice and watch the spectacle in amusement.`,
    `The Dungeon Mistress sits on your back and hog ties you like the little piggie that you are. She stuffs a wet cloth into your mouth, which carries an unknown auroma.`,
    `You lose consciosness.`,
  ], {
    responseHandler: 'dungeon'
  }),


  horseWomanVisited: {
    messageText: `Looking out over the town, the beautiful woman asks: "Do you have something to tell me?"`,
    followUp: fu('horseWomanConfessMaybe')
  },

  horseWomanRetreat: {
    messageText: `You open your mouth to speak, but nothing comes out. Instead, you back away in cowerdice.`,
    followUp: fu('townSquareDeliberate')
  }
}

const TownSquareNodes = {
  townSquareDeliberate: {
    messageText: `You ponder your next move: enter the market, approach the beautiful woman, retreat to the tavern, or escape into the Dark Forest.`,
    responseHandler: townSquareActions
  },

  enterTavern: {
    messageText: '',
    followUp: (ur, ctx) => ctx.state.visitedHorseWoman ? fu('enterTavernFailure') : fu('enterTavernSuccess')
  },

  enterTavernSuccess: {
    messageText: `You open the door to the tavern and enter the building.`,
    followUp: fu('tavernDeliberate')
  },
  enterTavernFailure: {
    messageText: `You try the door to the tavern, but it won't budge. The key does not appear to work either.`,
    followUp: fu('townSquareDeliberate')
  },

  ...MerchantNodes,

  ...HorseWomanNodes,

  darkForestRebuff: {
    messageText: `You approach the Dark Forest, but an overwhelming fear prevents you from entering. Perhaps you can overcome this fear at a later point.`,
    followUp: fu('townSquareDeliberate')
  },

  darkForestEnter: {
    messageText: `You retreat into the Dark Forest. The deeper you venture into the wilderness the darker it becomes. The noises of the town begin to fade, and soon the noises of wild life begin to fade as well. You soon find yourself engulfed in total darkness and complete silence. Your heart beats -- the only thing that breaks the stillness. But each beat becomes slower. And slower. And slower. As you dissolve into nothingness you become aware of a vague and abstract Presence looming close to you. But it is unaware of your existence, and as long as you stay completely still and silent you realize that you will remain unobserved and undetected.
    `,
    responseHandler: (ur, ctx) => {
      ctx.state.enteredDarkForest = true
      return 'darkForestDetected'
    }
  },

  darkForestDetected: {
    messageText: ur => `You feel the Presence has become aware of you. It stares deep into your soul, scrutenizing the entire history of your life's transactions. It reduces your humanity to every debt, every purchase, every title, every designation, every piece of property you own. Your mind and body melt away. You are no longer a ${genderSwitch({m: 'man', f: 'woman', nb: 'person'})} -- you are simply a wallet.`,
    followUp: fu('darkForestDetected2')
  },
  darkForestDetected2: {
    messageText:`In a daze, you wander back towards town, stripped of your ${genderSwitch({m: 'manhood', f: 'womanhood', nb: 'personhood'})}. When you reach the edge of the Dark Forest the Dungeon Mistress walks up to you on her horse.`,
    followUp: fu('horseWomanConfess')
  },

}


function townSquareActions(ur, ctx, contract, provider) {
  if (isMatch(ur, ['market', 'forward', 'buy', 'forward', 'front', 'north', 'merchant'])) {
    if (ctx.state.goldenShowerComplete) {
      return 'marketCompleted'
    }
    else if (ctx.state.enteredMarket) {
      return 'market'
    } else {
      ctx.state.enteredMarket = true
      return 'marketFresh'
    }

  } else if (isMatch(ur, ['forest', 'darkness', 'left', 'west', 'trees', 'escape'])) {
    return 'darkForestRebuff'

  } else if (isMatch(ur, ['right', 'east', 'woman', 'horse', 'beautiful', 'lady', 'stern'])) {
    return 'approachHorseWoman'

  } else if (isMatch(ur, ['back', 'retreat', 'tavern', 'door', 'south', 'behind', 'turn around', 'bar'])) {
    return 'enterTavern'

  } else {
    return 'townSquareDeliberate'
  }
}




const MistressMessages = {
  TYPING_SPEED: 0.8,

  START: {
    responseHandler: `hello`,
    ignoreSend: true,
    ignoreType: true
  },

  async __contract(provider) {
    return await provider.domContract('DungeonMistress')

  },

  __precheck(userResponse, ctx, contract, provider, isFollowup) {
    if (userResponse && responseParser(userResponse).includes('inventory')) {
      const i = []
      if (ctx.state.beerCount) i.push(`${ctx.state.beerCount} Beer${ctx.state.beerCount === 1 ? '' : 's'}`)
      if (ctx.state.hasKey) i.push(`Tavern Key`)
      return {
        messageText: i.length ? ['Inventory:', ...i].join('<br>') : `Your inventory is empty.`,
        responseHandler: (ur, ctx) => ctx.lastDomCodeSent
      }
    }
    if (userResponse && isMean(userResponse)) {
      return {
        messageText: ``,
        responseHandler: (ur, ctx) => ctx.lastDomCodeSent
      }
    }
  },

  hello: {
    messageText: `You awaken in a dingy tavern, the sour taste of day-old ale clinging to your breath. As the room slowly comes into focus you realize that you are not alone: you feel six glances on you. A bartender washing a beer stein behind the counter. Two harlots cackling over a glass of wine. Three men silently play poker. Across the room, a door leads outside to the town square.`,
    responseHandler: tavernActions
  },

  tavernDeliberate: {
    messageText: `You ponder your next move: talk to the bartender, approach the harlots, join the poker players, or open the door?`,
    responseHandler: tavernActions
  },

  ...BartenderNodes,
  ...HarlotsNodes,


  poker: {
    messageText: '',
    followUp: (ur, ctx) => {
      if (ctx.state.hasKey) return fu('pokerIgnore')
      if (ctx.state.visitedPokerPlayers) return fu('pokerVisited')

      ctx.state.visitedPokerPlayers = true
      return fu('pokerFresh')
    }
  },

  ...diatribe('pokerFresh', [
    `As you approach the poker table you notice the dealer's hand: 9,2 unsuited. He confidently takes a puff of his cigar and pushes all his chips forward. The other two players immediately throw their hands down in resignation.`,
    `They realize your presence and stop playing, smirks plastered across their faces. They wait for you to speak, but you freeze with intimadation.`,
    `"You know, you've got a lot of nerve coming back here after that last game. You owe us a lot of money. You remember, <em>don't you</em>?"`,
    `The dealer quickly jerks towards you. You flinch. They burst out laughing.`,
    () => `"Typical ${getUserData('name')}! Can never tell a bluff from the real thing!"`,
    `They laugh some more at your expense. But the dealer stops and looks you dead in the eye.`,
    `"Seriously though, I have half a mind to bend you over my knee and beat your ass until you cough up that money. Or even worse, maybe I'll <em>escalate</em> my complaint."`,
    `You gulp. With the other players, the bartender, and the harlots now looking on, you feel a deep humiliation. Your heart skips a beat and blood rushes to your loins.`,
    (ur, ctx) => ctx.state.harlotState === 'friendly' ? '' : `"But I tell you what. You buy that lady over there a beer..." He nods in the direction of one of the harlots. She winks. He winks back. "...and maybe we just forget the whole thing."`,
    `The dealer sizes you up once more, and turns back around to resume his game. You decide not to try your luck.`
  ], {
    followUp: fu('tavernDeliberate')
  }),



  pokerIgnore: {
    messageText: `The poker players see you, but each decide they would rather keep playing than dignify your presence.`,
    followUp: fu('tavernDeliberate')
  },


  ...diatribe('pokerVisited', [
    `You approach the poker table with caution. The players don't stop their game`,
    `"We'd invite your to play, but we all know how that will end."`,
    `They laugh. You sense that the men may physiclly harm you if you stick around, so you carefully back away.`
  ], {
    followUp: (ur, ctx) => {
      ctx.state.visitedPokerPlayers = true
      return fu('tavernDeliberate')
    }
  }),


  exitTavern: {
    messageText: '',
    followUp: (ur, ctx) => ctx.state.hasKey ? fu('exitTavernSucceed') : fu('exitTavernFail')
  },

  exitTavernFail: {
    messageText: 'You try the doorknob, but it appears to be locked. If only you had the key...',
    followUp: fu('tavernDeliberate')
  },


  exitTavernSucceed: {
    messageText: `You exit the tavern, squinting as the sun hits your eyes. As your retinas adjust to the light you can make out a market 10 meters in front of you. A Dark Forest sits to your left, a beautiful and stern woman on a horse to your right, and the tavern behind you.`,
    responseHandler: townSquareActions
  },

  ...TownSquareNodes,


  ...diatribe('dungeon', [
    `You awaken several hours later, shackled to the wall of a dungeon. Daylight seeps through iron bars of a small window overhead.`,
    `You turn your head to see an old, naked man shivering next to you. He mumbles to himself, but you can't make out what he says. He appears to be awake, but you are unsure if he notices you. You look down and notice that you are completely naked as well.`,
    `A faint drip echoes throughout the room. Your head aches.`
  ], {
    followUp: fu('dungeonDecision')
  }),

  dungeonDecision: {
    messageText: `Do you talk to the old man? Or do you sit in silence?`,
    responseHandler: (ur, ctx) => {
      if (isMatch(ur, ['silence', 'nothing', 'quiet', 'sit'])) return 'silence'
      else return 'oldMan'
    }
  },

  silence: {
    messageText: '',
    responseHandler: 'oldMan'
  },

  oldMan: {
    messageText: '"Oh, hello there. Can you spare a few pence?"',
    responseHandler: 'oldMan2'
  },

  oldMan2: {
    messageText: `"None for me, thanks. I've had too much already."`,
    responseHandler: 'oldMan3'
  },

  oldMan3: {
    messageText: `"Impossible to know, but I did owe quite a bit of money. So I suspect it's been a long time. Impossible to know."`,
    responseHandler: 'oldMan4'
  },

  oldMan4: {
    messageText: `"Impossible to know, but I've had a lot of time to think. I've concocted a plan, in fact. Do you want to hear it?"`,
    responseHandler: 'oldMan5'
  },

  oldMan5: {
    messageText: `"I'm quite sick. I think I can convince the guards of that. When they see this they will unshackle me and let me go free. I've needed a conspirator all this time. Someone to confirm my illness. And now I have one."`,
    responseHandler: 'oldMan6'
  },

  oldMan6: {
    messageText: `"Ah yes, that is an excellent point. When the guards come in, I will chomp my teeth. That is when you will tell them how sick I've been."`,
    responseHandler: 'oldMan7'
  },

  ...diatribe('oldMan7', [
    `"Impossible to know. Can you spare a few pence?"`,
    `The old man starts rocking back and forth, and resumes incoherently mumbling to himself.`,
    `You wait in silence.`,
    `Finally, the cell door opens. Two guards walk in and begin unchaining the man.`,
    () => `"Guards, I've been quite sick! In fact, I think it's something to do with my liver. My liver has been painful for several months. Ask ${genderSwitch({m: 'him', f: 'her', nb: 'them'})}! ${genderSwitch({m: 'He\'ll', f: 'She\'ll', nb: 'THey\'ll'})} tell you! ${genderSwitch({m: 'He\'ll', f: 'She\'ll', nb: 'THey\'ll'})} tell you how much my liver hurts!"`,
    `The old man begins furiously chomping his teeth.`,
    `Do you help the old man? Or remain silent?`
  ], {
    responseHandler: 'oldMan8'
  }),

  ...diatribe('oldMan8', [
    `The guards remove the old man from the cell as he wimpers. They close and lock the door behind them`,
    `You sit in silence`

  ], {
    responseHandler: 'oldMan8'
  }),

  oldMan8: {
    messageText:'',
    responseHandler: 'oldMan7'
  },


}

const retreatPhrases = ['turn around', 'stand up', 'retreat', 'back', 'exit', 'cancel', 'something else']


function tavernActions(ur, ctx, contract, provider) {
  if (isMatch(ur, ['bar', 'bartender', 'stein', 'counter', 'left', '1', 'first', 'order', 'beer', 'wine', 'cider'])) {
    return 'bartender'
  } else if (isMatch(ur, ['harlot', 'harlots', 'prostitutes', 'cackle', 'cackling', 'women', 'wine', 'right', 'two', '2', 'second', 'girls'])) {
    return 'harlots'
  } else if (isMatch(ur, ['men', 'poker', 'players', 'corner', 'silent', 'fellows', 'gamblers', 'three', '3', 'third'])) {
    return 'poker'
  } else if (isMatch(ur, ['door', 'outside', 'across the room', 'forward', 'fourth', '4', 'exit', 'leave', ...(ctx.state.hasKey ? ['key'] : [])])) {
    return 'exitTavern'
  } else {
    return 'tavernDeliberate'
  }
}









export const MistressChat = new MessageHandler(MistressProfile, MistressMessages)



/*
Thought Prompts
  - punishment
  - debt
  - roleplay
  - vampire
  - extraction
  - punishement fantasy:
    - every time you cum, money comes out of your dick/vagina.
    - you stop cumming, so she pegs you for the prostate stimulation to extract more
  - modes of financial domination
  - Dark Forest
  - https://twitter.com/Aella_Girl/status/1750722719438536825}


*/