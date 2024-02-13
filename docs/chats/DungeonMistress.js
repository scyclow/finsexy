/*
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






import { isYes, isNo, isGreeting, isMean, isMatch, diatribe, createEvent, MessageHandler } from '../state/conversationRunner.js'
import {getUserData, genderSwitch, interestedSwitch} from '../state/profile.js'

const fu = (messageCode, waitMs=1500) => ({ messageCode, waitMs })

export const MistressProfile = {
  name: 'DungeonMistress',
  display: 'f',
  age: 27,
  distance: 666,
  gender: '',
  maxPhotos: 4,
  description: ``,
  testimonials: [

  ]
}



/*
TODO - tavern
  - buy beer with eth
  - harlots recognize beer, unlock dialogue
  - integrate poker players

*/


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
    if (userResponse && isMean(userResponse)) {
      return {
        messageText: ``,
        responseHandler: (ur, ctx) => ctx.lastDomCodeSent
      }
    }
  },

  hello: {
    messageText: `You awaken in a dingy tavern, the sour taste of day-old ale clinging to your breath. As the room slowly comes into focus you realize that you are not alone. A bartender washes beer steins behind the counter. Two harlots cackle over a glass of wine. Three men silently play poker in the corner. In front of you, across the room, is a door leading outside.`,
    responseHandler: tavernActions
  },

  tavernDeliberate: {
    messageText: `You ponder your next move: talk to the bartender, approach the harlots, join the poker players, or open the door.`,
    responseHandler: tavernActions
  },

  bartender: {
    messageText: (ur, ctx) => `You walk over to the bar and take a seat. ${
      ctx.state.bartenderGoodSide
        ? `Unceremoniously, the bartender asks "What'll it be?"`
        : `The bartender stops washing the stein when he notices you. He throws his towel on the floor and leans on the counter, looking you dead in the eye.`
    }`,
    followUp: (ur, ctx) => {
      if (ctx.state.bartenderGoodSide) return
      else if (ctx.state.visitedBartender) return fu('bartenderPending')
      else {
        ctx.state.visitedBartender = true
        return !ctx.state.bartenderGoodSide && fu('bartender1')
      }
    },
    responseHandler: (ur, ctx) => {
      if (ctx.state.visitedBartender || ctx.state.bartenderGoodSide) return bartenderActions('bartenderPending')(ur, ctx)
      else {
        ctx.state.visitedBartender = true
        return bartenderActions('bartender1')(ur, ctx)
      }
    }
  },

  orderDrinkConnectFail: {
    messageText: `The bartender looks you up and down before saying "You gotta connect your wallet before ordering a drink, pal"`,
    responseHandler: bartenderActions('bartenderPending')

  },

  orderDrink: {
    messageText: async (ur, ctx, contract) => {
      try {
        const tributesPaid = fromWei(await contract.tributes(ctx.global.connectedAddr))

        if (ctx.state.preDrinkTributeAmount + 0.01 <= tributesPaid) {
          return `Before the words finish leaving your mouth, the bartender fills a glass to the brim with beer and slams it down on the counter`
        }
      } catch (e) {
        console.log(e)
      }

      return `Before the words finish leaving your mouth the bartender cuts you off: "If you want a drink, you're paying up front this time. And for you, a special price." He winks.`
    },
    followUp: async (ur, ctx, contract) => {
      try {
        const tributesPaid = fromWei(await contract.tributes(ctx.global.connectedAddr))

        if (ctx.state.preDrinkTributeAmount + 0.01 <= tributesPaid) {
          ctx.state.beerCount = (ctx.state.beerCount||0) + 1
          ctx.state.preDrinkTributeAmount = tributesPaid
          return fu('tavernDeliberate')
        }
      } catch (e) {
        console.log(e)
      }
      return fu('orderDrink1')
    }
  },

  orderDrink1: {
    messageText: (ur, ctx) => `"That'll be ${ctx.global.premium * 0.01} ETH. You gonna pay me or what?"`,
    responseHandler: (ur, ctx) => {
      console.log(ur, isYes(ur))
      if (isYes(ur) || isMatch(ur, ['pay'])) {
        return 'processDrinkOrder'
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
      ctx.state.preDrinkTributeAmount = fromWei(await contract.tributes(ctx.global.connectedAddr))
      return fu('processDrinkOrderExplain')

    },
  },

  processDrinkOrderExplain: {
    messageText: (ur, ctx) => `<em>(You can send me the ${ctx.global.premium * 0.01} ETH through my profile page or the Sexy CLIT. Then the bartender will give you your drink)</em>`,
    followUp: fu('bartenderPending')
  },





  orderDrinkBadSide: {
    messageText: `"I don't think so. You ain't getting another drink out of me until you pay your tab"`,
  },


  bartenderIgnore: {
    messageText: `The bartender clearly grows tired listening to you talk, and goes back to washing his stein.`,
    followUp: fu('bartenderPending')
  },

  bartender1: {
    messageText: `"Well, well, well. Look who finally decided to wake up from their beauty nap. Did you sleep well, sleeping beauty?"`,
    responseHandler: bartenderActions('bartender2')
  },

  bartender2: {
    messageText: `"That's nice. I hope you got a good rest because you're gonna be working here all night paying off all that money you owe me. The afternoon rush should start in a couple hours, so I suggest you either get real familiar with the mop in the back room, or get real comfortable on your knees behind the bar with your mouth around my cock."`,
    followUp: fu('bartender3')
  },

  bartender3: {
    messageText: `"I hear you owe money all over town. One more complaint and your ass is gonna end up in debtor's prison."`,
    followUp: fu('bartenderPending')
  },

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
    `The bartender looks around at the nearly empty room. No one seems to be paying much attention, nor do they seem to care.`,
    `"Alright, get back here"`,
    `You walk around to the other side of the bar and drop to you knees. The bartender throws his apron over your head and caresses the bak of your skull.`,
    `You slowly unbuckle the bartender's belt, pull his pants down to his knees, and come face-to-face with a partially erect member nestled in an overgrowth of pubic hair. The hair on the back of your neck stands up in excitement as the auroma of stale urine fills your nostrils.`,
    `You close your eyes and get to work.`,
    `The second you put your lips around the bartender's penis he pulls your head closer. You feel the head of his cock poke the back or your throat, causing you to gag.`,
    () => `Each bob of your head sends waves of euphoria down your spine, reminding you that you've been a bad little ${genderSwitch({m: 'boy', f: 'girl', nb: 'debtor'})}, owing money all over town. Nothing turns you on more than taking punishment for your debts.`,
    `Soon enough, a warm, viscous liquid fills your mouth, accompanied by a single grunt from the bartender.`,
    `He pulls you off of himself by the hair and pulls his pants up.`,
    `"Okay, let's call it square," says the bartender, before patting you on the head and getting back to work.`,
    `You stand up and collect yourself, still quivering from excitement. You catch a glance from one of the harlots. She whispers something to her friend and they both giggle.`,
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

  harlots: {
    messageText: `You meekly approach the pair of harlots. Looking up from their wine, they smirk at you`,
    followUp: (ur, ctx) => {
      // TODO if you have a drink, something happens
      if (ctx.state.spokeToHarlets) {
        return fu('harlotsRebuffed')
      } else {
        ctx.state.spokeToHarlets = true
        return fu('harlots1')
      }
    }
  },

  harlots1: {
    messageText: () => `"I didn't think you'd have the gall to show your face here, ${getUserData('name')}. Not considering how much you owe us..."`,
    followUp: fu('harlots2')
  },

  harlots2: {
    messageText: `"But if you buy us a drink then perhaps we will consider talking to you. The bartender seems to like you, so maybe he'll make it extra special." They both giggle. The condescension behind their laughs turns you on.`,
    followUp: fu('harlots3')
  },

  harlots3: {
    messageText: `You turn away in shame, but the arousal you feel in that moments forces the hint of a smile onto your face`,
    followUp: fu('tavernDeliberate')
  },

  harlotsRebuffed: {
    messageText: `"I don't see a drink in your hands." They giggle once more, and you turn away in shame`,
    followUp: fu('tavernDeliberate')
  },

  poker: {
    messageText: `The men stop playing poker and stare at you in disbelief.`,
    followUp: fu('poker1')
  },

  poker1: {
    messageText: `"You've got a lot of nerve coming back here and talking to us after the last game. You owe us a lot of money, you know that?"`,
    followUp: fu('poker2')
  },

  poker2: {
    messageText: `You sense that the men may physiclly harm you if you stick around, so you carefully back away.`,
    followUp: fu('tavernDeliberate')
  },

  exitTavern: {
    messageText: `You exit the tavern, squinting as the sun hits your eyes. As your retinas adjust to the light you can make out a market 10 meters in front of you. A dark forest sits to your left, a beautiful and stern woman on a horse to your right, and the tavern behind you.`,
    responseHandler: townSquareActions
  },

  townSquareDeliberate: {
    messageText: `You ponder your next move: enter the market, approach the beautiful woman, retreat to the tavern, or escape into the dark forest.`,
    responseHandler: tavernActions
  },

  enterTavern: {
    messageText: `You open the door to the tavern and enter the building`,
    followUp: fu('tavernDeliberate')
  },

  market: {
    messageText: ``,
  },
  enterDarkForest: {
    messageText: ``,
  },
  approachHorseWoman: {
    messageText: ``,
  },

}

const retreatPhrases = ['turn around', 'stand up', 'retreat', 'back', 'exit', 'cancel', 'something else']


function tavernActions(ur, ctx, contract, provider) {
  if (isMatch(ur, ['bar', 'bartender', 'stein', 'counter', 'left', '1', 'first', 'order', 'beer', 'wine', 'cider'])) {
    return 'bartender'
  } else if (isMatch(ur, ['harlot', 'harlots', 'prostitutes', 'cackle', 'cackling', 'women', 'wine', 'right', 'two', '2', 'second'])) {
    return 'harlots'
  } else if (isMatch(ur, ['men', 'poker', 'players', 'corner', 'silent', 'fellows', 'gamblers', 'three', '3', 'third'])) {
    return 'poker'
  } else if (isMatch(ur, ['door', 'outside', 'across the room', 'forward', 'fourth', '4', 'exit', 'leave'])) {
    return 'exitTavern'
  } else {
    return 'tavernDeliberate'
  }
}

function bartenderActions(defaultAction) {
  return (ur, ctx, contract, provider) => {

    if (isMatch(ur, [...retreatPhrases, 'poker', 'harlots', 'tavern'])) return 'tavernDeliberate'
    else if (isMatch(ur, ['mop', 'back room', 'clean', 'cleaning'])) return 'mop'
    else if (isMatch(ur, ['harlot', 'harlots', 'prostitutes', 'women'])) return 'harlots'
    else if (isMatch(ur, ['poker', 'men'])) return 'poker'
    else if (isMatch(ur, ['cock', 'dick', 'knees', 'penis', 'erection', 'behind the bar', 'blowjob', 'blow the bartender', 'suck', 'deepthroat', 'cum'])) return 'blowBartender'
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

function townSquareActions(ur, ctx, contract, provider) {
  if (isMatch(ur, ['market', 'forward', 'buy', 'forward', 'front', 'north'])) {
    return 'market'

  } else if (isMatch(ur, ['forest', 'darkness', 'left', 'west', 'trees', 'escape'])) {
    return 'enterDarkForest'

  } else if (isMatch(ur, ['right', 'east', 'woman', 'horse', 'beautiful', 'lady', 'stern'])) {
    return 'approachHorseWoman'

  } else if (isMatch(ur, ['back', 'retreat', 'tavern', 'door', 'south', 'behind', 'turn around'])) {
    return 'enterTavern'

  } else {
    return 'townSquarenDeliberate'
  }
}



export const MistressChat = new MessageHandler(MistressProfile.name, MistressMessages)