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






import { isYes, isNo, isGreeting, isMean, MessageHandler } from '../state/conversationRunner.js'
import {getUserData, genderSwitch , interestedSwitch} from '../state/profile.js'

const fu = (messageCode, waitMs=3000) => ({ messageCode, waitMs })

export const MistressProfile = {
  name: 'DungeonMistress',
  age: 0,
  distance: 0,
  gender: '',
  maxPhotos: 4,
  description: ``,
  testimonials: [

  ]
}


export async function mistressContractInfo(provider) {
  const networkName = (await provider.getNetwork()).name
  const contractAddr = {
    local: '0x484242986F57dFcA98EeC2C78427931C63F1C4ce'
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

    if (t > 0 && t / 2 > ctx.state.rounds) return { messageCode: '', waitMs: 3000 }
  }

}


const MistressMessages = {
  TYPING_SPEED: 1,

  START: {
    responseHandler: `hello`,
    ignoreSend: true,
    ignoreType: true
  },

  async __contract(provider) {
    const [contractAddr, abi] = await mistressContractInfo(provider)

    return await provider.contract(contractAddr, abi)
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
    messageText: `hello`,
    // followUp: { messageCode: 'hello2', waitMs: 2000 },
  },
}



export const MistressChat = new MessageHandler(MistressProfile.name, MistressMessages)